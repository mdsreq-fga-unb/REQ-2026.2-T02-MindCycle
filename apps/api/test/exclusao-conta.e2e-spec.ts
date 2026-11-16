import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro, type Tokens } from '@mindcycle/shared';
import { TERMOS } from '../src/modules/consent/termos.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';

const SENHA = 'senha-de-teste';

// Uma entrada por tabela com dados da usuária (HU36). Quem criar uma tabela nova
// acrescenta uma linha aqui, com o dado criado em `semear` se a tabela precisar de um.
const tabelasDaUsuaria: {
  tabela: string;
  contar: (prisma: PrismaService, usuariaId: string) => Promise<number>;
}[] = [
  {
    tabela: 'usuarias',
    contar: (prisma, id) => prisma.usuaria.count({ where: { id } }),
  },
  {
    tabela: 'consentimentos',
    contar: (prisma, usuariaId) =>
      prisma.consentimento.count({ where: { usuariaId } }),
  },
  {
    tabela: 'inicios_menstruacao',
    contar: (prisma, usuariaId) =>
      prisma.inicioMenstruacao.count({ where: { usuariaId } }),
  },
  {
    tabela: 'perfis_ciclo',
    contar: (prisma, usuariaId) =>
      prisma.perfilCiclo.count({ where: { usuariaId } }),
  },
  {
    tabela: 'recuperacoes_acesso',
    contar: (prisma, usuariaId) =>
      prisma.recuperacaoAcesso.count({ where: { usuariaId } }),
  },
  {
    tabela: 'tarefas',
    contar: (prisma, usuariaId) =>
      prisma.tarefa.count({ where: { usuariaId } }),
  },
  {
    tabela: 'movimentacoes_tarefa',
    contar: (prisma, usuariaId) =>
      prisma.movimentacaoTarefa.count({ where: { tarefa: { usuariaId } } }),
  },
  {
    // HU15: a passagem feita pelo reajuste, desfeita pela usuária.
    tabela: 'movimentacoes_tarefa (reajuste)',
    contar: (prisma, usuariaId) =>
      prisma.movimentacaoTarefa.count({
        where: {
          origem: 'reajuste',
          desfeitaEm: { not: null },
          tarefa: { usuariaId },
        },
      }),
  },
  {
    tabela: 'checkins',
    contar: (prisma, usuariaId) => prisma.checkin.count({ where: { usuariaId } }),
  },
  {
    tabela: 'checkin_sintomas',
    contar: (prisma, usuariaId) =>
      prisma.checkinSintoma.count({ where: { checkin: { usuariaId } } }),
  },
  {
    // Sem FK: a cascata não alcança, a exclusão apaga explicitamente.
    tabela: 'refresh_tokens',
    contar: (prisma, userId) =>
      prisma.refreshToken.count({ where: { userId } }),
  },
];

describe('Exclusão de conta e dados (HU36, RNF02, RNF03)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const servidor = () => app.getHttpServer();

  beforeAll(async () => {
    app = await criarApp();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  /** Uma conta com aceite dos termos, uma sessão com refresh token, dados de ciclo, tarefa, check-in e um pedido de recuperação de acesso. */
  async function criarContaComDados() {
    const tokens = await cadastrar(app);
    await request(servidor())
      .post('/termos/aceite')
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({ versao: TERMOS.versao })
      .expect(204);
    await request(servidor())
      .post('/ciclo/inicios')
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({ data: '2026-01-10' })
      .expect(201);
    await request(servidor())
      .put('/ciclo/perfil')
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({ irregular: false, duracaoMedia: 28 })
      .expect(200);
    // Prazo distante: o app usa o relógio real, e prazo no passado é recusado.
    const { body: tarefa } = await request(servidor())
      .post('/tarefas')
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({
        titulo: 'Regar as plantas',
        prazo: '2099-12-31',
        prioridade: 2,
        energia: 1,
      })
      .expect(201);
    await request(servidor())
      .post('/checkins')
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({
        disposicao: 2,
        semSintomas: false,
        sintomas: [{ sintoma: 'cansaco', intensidade: 1 }],
      })
      .expect(201);
    await request(servidor())
      .patch(`/tarefas/${tarefa.id}/adiamento`)
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({ dataPlanejada: '2099-12-31' })
      .expect(200);
    // HU15: com a disposição média do check-in acima, o plano do dia passa a
    // tarefa de energia alta para amanhã; a usuária desfaz a passagem.
    const { body: pesada } = await request(servidor())
      .post('/tarefas')
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({
        titulo: 'Arrumar o armário',
        prazo: '2099-12-31',
        prioridade: 2,
        energia: 3,
      })
      .expect(201);
    await request(servidor())
      .get('/planejamento/hoje')
      .auth(tokens.accessToken, { type: 'bearer' })
      .expect(200);
    await request(servidor())
      .post(`/planejamento/hoje/movidas/${pesada.id}/desfazimento`)
      .auth(tokens.accessToken, { type: 'bearer' })
      .expect(200);
    await request(servidor())
      .post(`/tarefas/${tarefa.id}/conclusao`)
      .auth(tokens.accessToken, { type: 'bearer' })
      .send({})
      .expect(200);
    await request(servidor())
      .post('/auth/recuperacao')
      .send({ email: tokens.email })
      .expect(202);
    const { body } = await request(servidor())
      .get('/conta')
      .auth(tokens.accessToken, { type: 'bearer' })
      .expect(200);
    return { ...tokens, id: body.id as string };
  }

  function excluir(accessToken: string, corpo: object = { senha: SENHA }) {
    return request(servidor())
      .post('/conta/exclusao')
      .auth(accessToken, { type: 'bearer' })
      .send(corpo);
  }

  async function linhasPorTabela(usuariaId: string) {
    return Object.fromEntries(
      await Promise.all(
        tabelasDaUsuaria.map(
          async ({ tabela, contar }) =>
            [tabela, await contar(prisma, usuariaId)] as const,
        ),
      ),
    );
  }

  describe('depois de excluir', () => {
    let conta: Awaited<ReturnType<typeof criarContaComDados>>;

    beforeAll(async () => {
      conta = await criarContaComDados();
      // Sem dado em todas as tabelas, "nada sobrou" seria uma verificação vazia.
      for (const [tabela, linhas] of Object.entries(
        await linhasPorTabela(conta.id),
      )) {
        expect(linhas, tabela).toBeGreaterThan(0);
      }
      await excluir(conta.accessToken).expect(204);
    });

    for (const { tabela, contar } of tabelasDaUsuaria) {
      it(`nenhuma linha da usuária sobra em ${tabela}`, async () => {
        expect(await contar(prisma, conta.id)).toBe(0);
      });
    }

    it('o access token usado perde o acesso na hora', async () => {
      await request(servidor())
        .get('/conta')
        .auth(conta.accessToken, { type: 'bearer' })
        .expect(401);
    });

    it('o refresh token antigo não renova a sessão', async () => {
      await request(servidor())
        .post('/auth/renovacao')
        .send({ refreshToken: conta.refreshToken })
        .expect(401);
    });

    it('a conta não entra mais com a senha', async () => {
      const { body } = await request(servidor())
        .post('/auth/entrada')
        .send({ email: conta.email, senha: SENHA })
        .expect(401);
      expect(body.codigo).toBe(CodigoErro.CredenciaisInvalidas);
    });

    it('o mesmo e-mail cria uma conta nova, sem histórico', async () => {
      const nova = await cadastrar(app, conta.email);
      const { body } = await request(servidor())
        .get('/conta')
        .auth(nova.accessToken, { type: 'bearer' })
        .expect(200);
      expect(body.id).not.toBe(conta.id);
      expect(body.termosAceitos).toBe(false);
    });
  });

  it('com a senha errada responde 401 e não apaga nada', async () => {
    const conta = await criarContaComDados();
    const antes = await linhasPorTabela(conta.id);

    const { body } = await excluir(conta.accessToken, {
      senha: 'outra-senha-qualquer',
    }).expect(401);
    expect(body.codigo).toBe(CodigoErro.CredenciaisInvalidas);

    expect(await linhasPorTabela(conta.id)).toEqual(antes);
    await request(servidor())
      .get('/conta')
      .auth(conta.accessToken, { type: 'bearer' })
      .expect(200);
  });

  it('recusa corpo inválido com 400 e não apaga nada', async () => {
    const conta = await criarContaComDados();
    const antes = await linhasPorTabela(conta.id);

    for (const corpo of [{}, { senha: '' }, { senha: 123 }]) {
      await excluir(conta.accessToken, corpo).expect(400);
    }

    expect(await linhasPorTabela(conta.id)).toEqual(antes);
  });

  it('não exclui sem sessão', async () => {
    await request(servidor())
      .post('/conta/exclusao')
      .send({ senha: SENHA })
      .expect(401);
  });

  it('exclui mesmo sem ter aceitado os termos', async () => {
    const { accessToken } = await cadastrar(app);
    await excluir(accessToken).expect(204);
  });

  describe('RNF03: uma conta só exclui a si mesma', () => {
    it('a exclusão de A deixa B intacta', async () => {
      const a = await criarContaComDados();
      const b = await criarContaComDados();
      const antesDeB = await linhasPorTabela(b.id);

      // O corpo não tem como apontar para outra conta: um id a mais é ignorado.
      await excluir(a.accessToken, { senha: SENHA, usuariaId: b.id }).expect(
        204,
      );

      expect(await linhasPorTabela(a.id)).toEqual(
        Object.fromEntries(tabelasDaUsuaria.map(({ tabela }) => [tabela, 0])),
      );
      expect(await linhasPorTabela(b.id)).toEqual(antesDeB);

      const conta = await request(servidor())
        .get('/conta')
        .auth(b.accessToken, { type: 'bearer' })
        .expect(200);
      expect(conta.body.termosAceitos).toBe(true);
      const renovada = await request(servidor())
        .post('/auth/renovacao')
        .send({ refreshToken: b.refreshToken })
        .expect(200);
      expect((renovada.body as Tokens).accessToken).toBeTruthy();
    });
  });
});
