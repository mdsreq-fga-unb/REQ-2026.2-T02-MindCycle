import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro, type Pin, type TipoPin } from '@mindcycle/shared';
import { PIN_BLOQUEIO_MINUTOS, PIN_MAX_ERROS } from '../src/modules/auth/pin.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

const SENHA = 'senha-de-teste';

// Cada tipo tem os seus PINs válidos e os seus inválidos.
const tipos: {
  tipo: TipoPin;
  pin: Pin;
  outroPin: Pin;
  repetido: Pin;
  invalidos: [string, unknown][];
}[] = [
  {
    tipo: 'petalas',
    pin: [1, 6, 3, 3],
    outroPin: [2, 2, 5, 4],
    repetido: [4, 4, 4, 4],
    invalidos: [
      ['3 toques', [1, 2, 3]],
      ['5 toques', [1, 2, 3, 4, 5]],
      ['pétala 0', [0, 1, 2, 3]],
      ['pétala 7', [1, 2, 3, 7]],
      ['pétala fracionada', [1, 2, 3, 1.5]],
      ['texto no lugar da sequência', '1633'],
    ],
  },
  {
    tipo: 'numerico',
    pin: [1, 2, 3, 4],
    outroPin: [9, 0, 5, 7],
    repetido: [0, 0, 0, 0],
    invalidos: [
      ['3 dígitos', [1, 2, 3]],
      ['5 dígitos', [1, 2, 3, 4, 5]],
      ['dígito 10', [1, 2, 3, 10]],
      ['dígito -1', [-1, 2, 3, 4]],
      ['dígito fracionado', [1, 2, 3, 1.5]],
      ['texto no lugar da sequência', '1234'],
    ],
  },
];

describe('PIN (HU11, RNF09, RNF03)', () => {
  let app: INestApplication<App>;
  const relogio = new RelogioFixo(new Date('2026-11-15T12:00:00Z'));
  const http = () => request(app.getHttpServer());

  beforeAll(async () => {
    app = await criarApp({ relogio });
  });

  afterAll(async () => {
    await app.close();
  });

  /** Uma conta nova; com `pin`, já protegida por ele. */
  async function novaConta(tipo: TipoPin, pin?: Pin) {
    const conta = await cadastrar(app);
    if (pin) {
      await definir(conta.accessToken, tipo, pin).expect(204);
    }
    return conta;
  }

  const definir = (token: string, tipo: unknown, pin: unknown, senha = SENHA) =>
    http()
      .put('/conta/pin')
      .auth(token, { type: 'bearer' })
      .send({ tipo, pin, senha });

  const remover = (token: string, senha = SENHA) =>
    http().delete('/conta/pin').auth(token, { type: 'bearer' }).send({ senha });

  const verificar = (token: string, pin: unknown) =>
    http()
      .post('/conta/pin/verificacao')
      .auth(token, { type: 'bearer' })
      .send({ pin });

  const conta = async (token: string) => {
    const { body } = await http()
      .get('/conta')
      .auth(token, { type: 'bearer' })
      .expect(200);
    return body as { id: string; tipoPin: TipoPin | null };
  };
  const tipoPin = async (token: string) => (await conta(token)).tipoPin;

  const errar = async (token: string, pin: Pin, vezes: number) => {
    for (let i = 0; i < vezes; i++) {
      const { body } = await verificar(token, pin).expect(401);
      expect(body.codigo).toBe(CodigoErro.PinIncorreto);
    }
  };

  function minutosDepois(minutos: number): Date {
    return new Date(new Date('2026-11-15T12:00:00Z').getTime() + minutos * 60_000);
  }

  describe.each(tipos)('PIN $tipo', ({ tipo, pin, outroPin, repetido, invalidos }) => {
    describe('definir e trocar', () => {
      it('define o PIN com a senha certa', async () => {
        const { accessToken } = await novaConta(tipo);
        expect(await tipoPin(accessToken)).toBeNull();

        await definir(accessToken, tipo, pin).expect(204);
        expect(await tipoPin(accessToken)).toBe(tipo);
      });

      it('recusa a senha errada e não muda nada', async () => {
        const { accessToken } = await novaConta(tipo);

        const { body } = await definir(accessToken, tipo, pin, 'senha-errada').expect(401);
        expect(body.codigo).toBe(CodigoErro.CredenciaisInvalidas);
        expect(await tipoPin(accessToken)).toBeNull();
      });

      it.each(invalidos)('recusa PIN inválido: %s', async (_, invalido) => {
        const { accessToken } = await novaConta(tipo);

        await definir(accessToken, tipo, invalido).expect(400);
        expect(await tipoPin(accessToken)).toBeNull();
      });

      it('aceita dígitos e pétalas repetidos', async () => {
        const { accessToken } = await novaConta(tipo);

        await definir(accessToken, tipo, repetido).expect(204);
        await verificar(accessToken, repetido).expect(204);
      });

      it('troca o PIN: o antigo deixa de valer', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await definir(accessToken, tipo, outroPin).expect(204);

        await verificar(accessToken, outroPin).expect(204);
        const { body } = await verificar(accessToken, pin).expect(401);
        expect(body.codigo).toBe(CodigoErro.PinIncorreto);
      });

      it('exige a senha também para trocar', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await definir(accessToken, tipo, outroPin, 'senha-errada').expect(401);
        await verificar(accessToken, pin).expect(204);
      });
    });

    describe('remover', () => {
      it('remove o PIN com a senha certa', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await remover(accessToken).expect(204);

        expect(await tipoPin(accessToken)).toBeNull();
        const { body } = await verificar(accessToken, pin).expect(409);
        expect(body.codigo).toBe(CodigoErro.PinNaoDefinido);
      });

      it('recusa a senha errada e mantém o PIN', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        const { body } = await remover(accessToken, 'senha-errada').expect(401);
        expect(body.codigo).toBe(CodigoErro.CredenciaisInvalidas);
        expect(await tipoPin(accessToken)).toBe(tipo);
      });
    });

    describe('verificar', () => {
      it('aceita o PIN certo', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await verificar(accessToken, pin).expect(204);
      });

      it('recusa o PIN errado com PIN_INCORRETO', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        const { body } = await verificar(accessToken, outroPin).expect(401);
        expect(body.codigo).toBe(CodigoErro.PinIncorreto);
      });

      it('recusa PIN malformado sem contar como erro', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await verificar(accessToken, [1, 2, 3]).expect(400);
        await errar(accessToken, outroPin, PIN_MAX_ERROS - 1);
        await verificar(accessToken, pin).expect(204);
      });

      it('responde PIN_NAO_DEFINIDO (409) numa conta sem PIN', async () => {
        const { accessToken } = await novaConta(tipo);

        const { body } = await verificar(accessToken, pin).expect(409);
        expect(body.codigo).toBe(CodigoErro.PinNaoDefinido);
      });

      it('exige sessão', async () => {
        await http().post('/conta/pin/verificacao').send({ pin }).expect(401);
        await http().put('/conta/pin').send({ tipo, pin, senha: SENHA }).expect(401);
        await http().delete('/conta/pin').send({ senha: SENHA }).expect(401);
      });
    });

    describe('bloqueio por tentativas', () => {
      beforeEach(() => {
        relogio.ajustar(new Date('2026-11-15T12:00:00Z'));
      });

      it('bloqueia depois de 5 erros seguidos, até para o PIN certo', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await errar(accessToken, outroPin, PIN_MAX_ERROS);

        const certo = await verificar(accessToken, pin).expect(403);
        expect(certo.body.codigo).toBe(CodigoErro.PinBloqueado);
        const errado = await verificar(accessToken, outroPin).expect(403);
        expect(errado.body.codigo).toBe(CodigoErro.PinBloqueado);
      });

      it('volta a aceitar passados 15 minutos', async () => {
        const { accessToken } = await novaConta(tipo, pin);
        await errar(accessToken, outroPin, PIN_MAX_ERROS);

        relogio.ajustar(minutosDepois(PIN_BLOQUEIO_MINUTOS - 1));
        await verificar(accessToken, pin).expect(403);

        relogio.ajustar(minutosDepois(PIN_BLOQUEIO_MINUTOS));
        await verificar(accessToken, pin).expect(204);
      });

      it('dá tentativas novas depois do bloqueio', async () => {
        const { accessToken } = await novaConta(tipo, pin);
        await errar(accessToken, outroPin, PIN_MAX_ERROS);

        relogio.ajustar(minutosDepois(PIN_BLOQUEIO_MINUTOS));
        await errar(accessToken, outroPin, PIN_MAX_ERROS - 1);
        await verificar(accessToken, pin).expect(204);
      });

      it('um acerto no meio zera a contagem', async () => {
        const { accessToken } = await novaConta(tipo, pin);

        await errar(accessToken, outroPin, PIN_MAX_ERROS - 1);
        await verificar(accessToken, pin).expect(204);
        await errar(accessToken, outroPin, PIN_MAX_ERROS - 1);

        await verificar(accessToken, pin).expect(204);
      });

      it('trocar o PIN, com a senha, encerra o bloqueio', async () => {
        const { accessToken } = await novaConta(tipo, pin);
        await errar(accessToken, outroPin, PIN_MAX_ERROS);

        await definir(accessToken, tipo, outroPin).expect(204);

        await verificar(accessToken, outroPin).expect(204);
      });
    });

    describe('acesso exclusivo (RNF03)', () => {
      it('o PIN de A não destrava B', async () => {
        const a = await novaConta(tipo, pin);
        const b = await novaConta(tipo, outroPin);

        await verificar(b.accessToken, pin).expect(401);
        await verificar(b.accessToken, outroPin).expect(204);
        await verificar(a.accessToken, pin).expect(204);
      });

      it('o erro de A não conta tentativas de B', async () => {
        const a = await novaConta(tipo, pin);
        const b = await novaConta(tipo, pin);

        await errar(a.accessToken, outroPin, PIN_MAX_ERROS);

        await verificar(a.accessToken, pin).expect(403);
        await verificar(b.accessToken, pin).expect(204);
      });

      it('a sessão de B não altera nem remove o PIN de A', async () => {
        const a = await novaConta(tipo, pin);
        const b = await novaConta(tipo);

        // O corpo não escolhe a conta: o userId vem do token de B.
        await definir(b.accessToken, tipo, outroPin).expect(204);
        expect(await tipoPin(b.accessToken)).toBe(tipo);
        await remover(b.accessToken).expect(204);

        expect(await tipoPin(a.accessToken)).toBe(tipo);
        await verificar(a.accessToken, pin).expect(204);
      });

      it('não confunde a senha de B com a de A', async () => {
        const a = await novaConta(tipo, pin);
        const b = await cadastrarComSenha('outra-senha-de-b');

        // A senha de B não vale na sessão de A.
        await definir(a.accessToken, tipo, outroPin, 'outra-senha-de-b').expect(401);
        await remover(a.accessToken, 'outra-senha-de-b').expect(401);
        await verificar(a.accessToken, pin).expect(204);
        expect(await tipoPin(b.accessToken)).toBeNull();
      });
    });
  });

  describe('tipo do PIN', () => {
    it('mostra o tipo no GET /conta em cada estado', async () => {
      const { accessToken } = await novaConta('petalas');
      expect(await tipoPin(accessToken)).toBeNull();

      await definir(accessToken, 'petalas', [1, 6, 3, 3]).expect(204);
      expect(await tipoPin(accessToken)).toBe('petalas');

      await definir(accessToken, 'numerico', [1, 2, 3, 4]).expect(204);
      expect(await tipoPin(accessToken)).toBe('numerico');

      await remover(accessToken).expect(204);
      expect(await tipoPin(accessToken)).toBeNull();
    });

    it('define o numérico, depois confere o certo e o errado', async () => {
      const { accessToken } = await novaConta('numerico');
      await definir(accessToken, 'numerico', [0, 7, 0, 7]).expect(204);

      await verificar(accessToken, [0, 7, 0, 7]).expect(204);
      const { body } = await verificar(accessToken, [7, 0, 7, 0]).expect(401);
      expect(body.codigo).toBe(CodigoErro.PinIncorreto);
    });

    it('troca de pétalas para numérico: o PIN antigo falha e o novo passa', async () => {
      const { accessToken } = await novaConta('petalas', [1, 6, 3, 3]);

      await definir(accessToken, 'numerico', [9, 0, 5, 7]).expect(204);

      const { body } = await verificar(accessToken, [1, 6, 3, 3]).expect(401);
      expect(body.codigo).toBe(CodigoErro.PinIncorreto);
      await verificar(accessToken, [9, 0, 5, 7]).expect(204);
    });

    it('a mesma sequência de outro tipo não vale até ser definida de novo', async () => {
      const { accessToken } = await novaConta('petalas', [1, 2, 3, 4]);
      await verificar(accessToken, [1, 2, 3, 4]).expect(204);

      await definir(accessToken, 'numerico', [9, 9, 9, 9]).expect(204);
      await verificar(accessToken, [1, 2, 3, 4]).expect(401);

      await definir(accessToken, 'numerico', [1, 2, 3, 4]).expect(204);
      await verificar(accessToken, [1, 2, 3, 4]).expect(204);
    });

    it('o hash guardado leva o tipo: mudar só a coluna não faz o PIN valer no outro tipo', async () => {
      const prisma = app.get(PrismaService);
      const { accessToken } = await novaConta('petalas', [1, 2, 3, 4]);
      const { id } = await conta(accessToken);

      await prisma.usuaria.update({ where: { id }, data: { pinTipo: 'numerico' } });

      await verificar(accessToken, [1, 2, 3, 4]).expect(401);
    });

    it('trocar só o tipo encerra o bloqueio e zera as tentativas', async () => {
      relogio.ajustar(new Date('2026-11-15T12:00:00Z'));
      const { accessToken } = await novaConta('petalas', [1, 6, 3, 3]);
      await errar(accessToken, [2, 2, 5, 4], PIN_MAX_ERROS);
      await verificar(accessToken, [1, 6, 3, 3]).expect(403);

      await definir(accessToken, 'numerico', [1, 2, 3, 4]).expect(204);

      await verificar(accessToken, [1, 2, 3, 4]).expect(204);
    });

    it('uma pétala fora da faixa é PIN incorreto e conta tentativa', async () => {
      relogio.ajustar(new Date('2026-11-15T12:00:00Z'));
      const { accessToken } = await novaConta('petalas', [1, 6, 3, 3]);

      await errar(accessToken, [0, 7, 8, 9], PIN_MAX_ERROS);

      const { body } = await verificar(accessToken, [1, 6, 3, 3]).expect(403);
      expect(body.codigo).toBe(CodigoErro.PinBloqueado);
    });

    it('recusa tipo ausente ou desconhecido', async () => {
      const { accessToken } = await novaConta('petalas');

      await definir(accessToken, undefined, [1, 2, 3, 4]).expect(400);
      await definir(accessToken, 'biometria', [1, 2, 3, 4]).expect(400);
      expect(await tipoPin(accessToken)).toBeNull();
    });

    it('um dígito de numérico não vale como pétala', async () => {
      const { accessToken } = await novaConta('petalas');

      await definir(accessToken, 'petalas', [1, 2, 3, 8]).expect(400);
      await definir(accessToken, 'numerico', [1, 2, 3, 8]).expect(204);
    });
  });

  it('nenhuma resposta contém o hash do PIN', async () => {
    const { accessToken } = await novaConta('petalas');
    const respostas = [
      await definir(accessToken, 'petalas', [1, 6, 3, 3]),
      await verificar(accessToken, [2, 2, 5, 4]),
      await verificar(accessToken, [1, 6, 3, 3]),
      await definir(accessToken, 'numerico', [1, 2, 3, 4]),
      await verificar(accessToken, [9, 9, 9, 9]),
      await verificar(accessToken, [1, 2, 3, 4]),
      await http().get('/conta').auth(accessToken, { type: 'bearer' }),
      await http()
        .patch('/conta')
        .auth(accessToken, { type: 'bearer' })
        .send({ fuso: 'Asia/Tokyo' }),
    ];

    for (const resposta of respostas) {
      const texto = JSON.stringify(resposta.body) + JSON.stringify(resposta.headers);
      expect(texto).not.toMatch(/pinHash|pin_hash|pinTipo|pinTentativas|pinBloqueadoAte/);
      expect(texto).not.toContain('$');
    }
  });

  async function cadastrarComSenha(senha: string) {
    const email = `teste-${randomUUID()}@exemplo.com`;
    const { body } = await http()
      .post('/auth/cadastro')
      .send({ email, senha, fuso: 'America/Sao_Paulo' })
      .expect(201);
    return body as { accessToken: string };
  }
});
