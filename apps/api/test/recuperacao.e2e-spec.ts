import type { INestApplication } from '@nestjs/common';
import { Mailer } from '@nestjs/mail';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro, type Usuaria } from '@mindcycle/shared';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { TERMOS } from '../src/modules/consent/termos.js';
import { cadastrar, criarApp, emailUnico } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

const SENHA_ANTIGA = 'senha-de-teste';
const SENHA_NOVA = 'senha-nova-acolhedora';
const SEGUNDO = 1000;
const MINUTO = 60 * SEGUNDO;

describe('Recuperação de acesso (HU26)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const relogio = new RelogioFixo(new Date());

  const servidor = () => app.getHttpServer();
  const avancar = (ms: number) =>
    relogio.ajustar(new Date(relogio.agora().getTime() + ms));
  const pedir = (email: string) =>
    request(servidor()).post('/auth/recuperacao').send({ email });
  const confirmar = (email: string, codigo: string, novaSenha = SENHA_NOVA) =>
    request(servidor())
      .post('/auth/recuperacao/confirmacao')
      .send({ email, codigo, novaSenha });
  const entrar = (email: string, senha: string) =>
    request(servidor()).post('/auth/entrada').send({ email, senha });

  beforeAll(async () => {
    app = await criarApp({ relogio });
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  /** Cadastra a usuária e já aceita os termos: ela tem histórico a preservar. */
  async function usuariaComHistorico() {
    const conta = await cadastrar(app);
    await request(servidor())
      .post('/termos/aceite')
      .auth(conta.accessToken, { type: 'bearer' })
      .send({ versao: TERMOS.versao })
      .expect(204);
    return conta;
  }

  it('devolve a mesma conta, com o histórico, a quem confirma o código', async () => {
    const antes = await usuariaComHistorico();
    const contaAntes = await request(servidor())
      .get('/conta')
      .auth(antes.accessToken, { type: 'bearer' })
      .expect(200);
    expect((contaAntes.body as Usuaria).termosAceitos).toBe(true);

    await pedir(antes.email).expect(202).expect('');
    const [{ codigo }] = await aguardarCodigos(antes.email, 1);

    const { body } = await confirmar(antes.email, codigo).expect(200);
    expect(body.accessToken).toEqual(expect.any(String));
    expect(body.refreshToken).toEqual(expect.any(String));

    const contaDepois = await request(servidor())
      .get('/conta')
      .auth(body.accessToken, { type: 'bearer' })
      .expect(200);
    expect(contaDepois.body).toMatchObject({
      id: contaAntes.body.id,
      email: antes.email,
      termosAceitos: true,
    });

    await entrar(antes.email, SENHA_ANTIGA).expect(401);
    await entrar(antes.email, SENHA_NOVA).expect(200);
    // A sessão de antes não renova mais: quem tinha a senha antiga sai.
    await request(servidor())
      .post('/auth/renovacao')
      .send({ refreshToken: antes.refreshToken })
      .expect(401);
  });

  it('responde 202 sem enviar e-mail quando a conta não existe', async () => {
    const existente = await cadastrar(app);
    const inexistente = emailUnico();

    const comConta = await pedir(existente.email).expect(202);
    const semConta = await pedir(inexistente).expect(202);
    expect(semConta.body).toEqual(comConta.body);

    await aguardarCodigos(existente.email, 1);
    expect(await emailsPara(inexistente, { esperar: true })).toHaveLength(0);
  });

  it('não vira erro quando o envio do e-mail falha', async () => {
    const { email } = await cadastrar(app);
    const envio = vi
      .spyOn(app.get(Mailer), 'send')
      .mockRejectedValueOnce(new Error('SMTP fora do ar'));
    try {
      await pedir(email).expect(202).expect('');
      await vi.waitFor(() => expect(envio).toHaveBeenCalled());
    } finally {
      envio.mockRestore();
    }
    expect(await emailsPara(email, { esperar: true })).toHaveLength(0);
  });

  describe('códigos recusados', () => {
    async function comCodigo() {
      const { email } = await cadastrar(app);
      await pedir(email).expect(202);
      const [{ codigo }] = await aguardarCodigos(email, 1);
      return { email, codigo };
    }

    const recusado = (res: request.Response) => {
      expect(res.status).toBe(400);
      expect(res.body.codigo).toBe(CodigoErro.CodigoRecuperacaoInvalido);
    };

    it('recusa código errado e e-mail sem conta com o mesmo erro', async () => {
      const { email, codigo } = await comCodigo();
      recusado(await confirmar(email, outroCodigo(codigo)));
      recusado(await confirmar(emailUnico(), codigo));
      // Um código errado não impede o certo, enquanto sobram tentativas.
      await confirmar(email, codigo).expect(200);
    });

    it('esgota o código na quinta tentativa errada', async () => {
      const { email, codigo } = await comCodigo();
      for (let i = 0; i < 5; i++) {
        recusado(await confirmar(email, outroCodigo(codigo)));
      }
      recusado(await confirmar(email, codigo));
      await entrar(email, SENHA_NOVA).expect(401);
    });

    it('recusa o código vencido', async () => {
      const { email, codigo } = await comCodigo();
      avancar(16 * MINUTO);
      recusado(await confirmar(email, codigo));
    });

    it('recusa o código já usado', async () => {
      const { email, codigo } = await comCodigo();
      await confirmar(email, codigo).expect(200);
      recusado(await confirmar(email, codigo, 'outra-senha-nova'));
      await entrar(email, SENHA_NOVA).expect(200);
    });

    it('invalida o código anterior quando a usuária pede outro', async () => {
      const { email } = await cadastrar(app);
      await pedir(email).expect(202);
      const [{ codigo: primeiro }] = await aguardarCodigos(email, 1);

      avancar(61 * SEGUNDO);
      await pedir(email).expect(202);
      const [{ codigo: segundo }] = await aguardarCodigos(email, 2);

      // Dois sorteios iguais (1 em 1 milhão) não teriam o que distinguir.
      if (primeiro !== segundo) {
        recusado(await confirmar(email, primeiro));
      }
      await confirmar(email, segundo).expect(200);
    });
  });

  it('não reenvia em menos de 60 segundos', async () => {
    const { email } = await cadastrar(app);
    await pedir(email).expect(202);
    await aguardarCodigos(email, 1);

    avancar(30 * SEGUNDO);
    await pedir(email).expect(202);
    expect(await emailsPara(email, { esperar: true })).toHaveLength(1);

    avancar(31 * SEGUNDO);
    await pedir(email).expect(202);
    await aguardarCodigos(email, 2);
  });

  describe('acesso exclusivo da usuária (RNF03)', () => {
    it('não deixa o código de uma conta valer para outra', async () => {
      const a = await cadastrar(app);
      const b = await cadastrar(app);
      await pedir(a.email).expect(202);
      await pedir(b.email).expect(202);
      const [{ codigo: codigoA }] = await aguardarCodigos(a.email, 1);
      const [{ codigo: codigoB }] = await aguardarCodigos(b.email, 1);

      const res = await confirmar(b.email, codigoA);
      expect(res.status).toBe(400);
      expect(res.body.codigo).toBe(CodigoErro.CodigoRecuperacaoInvalido);
      await entrar(b.email, SENHA_NOVA).expect(401);

      await confirmar(b.email, codigoB).expect(200);
      await entrar(a.email, SENHA_ANTIGA).expect(200);
    });

    it('conta as tentativas erradas de cada conta separadamente', async () => {
      const a = await cadastrar(app);
      const b = await cadastrar(app);
      await pedir(a.email).expect(202);
      await pedir(b.email).expect(202);
      const [{ codigo: codigoA }] = await aguardarCodigos(a.email, 1);
      const [{ codigo: codigoB }] = await aguardarCodigos(b.email, 1);

      for (let i = 0; i < 5; i++) {
        await confirmar(a.email, outroCodigo(codigoA)).expect(400);
      }
      await confirmar(a.email, codigoA).expect(400);

      await confirmar(b.email, codigoB).expect(200);
    });
  });

  describe('validação', () => {
    it('recusa a nova senha curta', async () => {
      const { email } = await cadastrar(app);
      await pedir(email).expect(202);
      const [{ codigo }] = await aguardarCodigos(email, 1);

      await confirmar(email, codigo, 'curta').expect(400);
      // A recusa por validação não gasta o código.
      await confirmar(email, codigo).expect(200);
    });

    it('recusa corpos inválidos', async () => {
      await pedir('não é e-mail').expect(400);
      await request(servidor()).post('/auth/recuperacao').send({}).expect(400);
      await request(servidor())
        .post('/auth/recuperacao/confirmacao')
        .send({ email: emailUnico(), novaSenha: SENHA_NOVA })
        .expect(400);
    });
  });

  it('apaga as recuperações junto com a usuária (cascata)', async () => {
    const { email } = await cadastrar(app);
    await pedir(email).expect(202);
    await aguardarCodigos(email, 1);

    const usuaria = await prisma.usuaria.findUniqueOrThrow({ where: { email } });
    expect(
      await prisma.recuperacaoAcesso.count({ where: { usuariaId: usuaria.id } }),
    ).toBe(1);

    await prisma.usuaria.delete({ where: { id: usuaria.id } });
    expect(
      await prisma.recuperacaoAcesso.count({ where: { usuariaId: usuaria.id } }),
    ).toBe(0);
  });
});

function outroCodigo(codigo: string): string {
  return codigo === '000000' ? '111111' : '000000';
}

interface EmailRecebido {
  codigo: string;
}

/** Os e-mails para o destinatário, do mais novo ao mais antigo, ou falha por tempo. */
async function aguardarCodigos(
  email: string,
  quantidade: number,
): Promise<EmailRecebido[]> {
  for (let tentativa = 0; tentativa < 50; tentativa++) {
    const recebidos = await emailsPara(email);
    if (recebidos.length >= quantidade) {
      return recebidos;
    }
    await esperar(100);
  }
  throw new Error(`Esperava ${quantidade} e-mail(s) para ${email}`);
}

/** Com `esperar`, dá tempo de um envio indevido chegar antes de contar. */
async function emailsPara(
  email: string,
  { esperar: aguardar = false } = {},
): Promise<EmailRecebido[]> {
  if (aguardar) {
    await esperar(500);
  }
  const base = process.env.MAILPIT_API_URL;
  const busca = new URL('/api/v1/search', base);
  busca.searchParams.set('query', `to:"${email}"`);
  const { messages } = (await (await fetch(busca)).json()) as {
    messages: { ID: string }[];
  };
  return Promise.all(
    messages.map(async ({ ID }) => {
      const { Text } = (await (
        await fetch(new URL(`/api/v1/message/${ID}`, base))
      ).json()) as { Text: string };
      const codigo = /\b(\d{6})\b/.exec(Text)?.[1];
      if (!codigo) {
        throw new Error(`E-mail sem código: ${Text}`);
      }
      return { codigo };
    }),
  );
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));
