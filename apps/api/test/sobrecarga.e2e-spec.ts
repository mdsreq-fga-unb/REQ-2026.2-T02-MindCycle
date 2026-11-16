import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import {
  CodigoErro,
  type CheckinsDoDia,
  type RecomendacaoDoDia,
  type SinalizacaoSobrecarga,
} from '@mindcycle/shared';
import { CheckinService } from '../src/modules/checkin/checkin.service.js';
import { TERMOS } from '../src/modules/consent/termos.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Sinalização de sobrecarga pela API (HU02, RNF02, RNF03)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, onde as contas de teste estão.
  const INSTANTE = new Date('2026-11-15T02:30:00Z');
  const relogio = new RelogioFixo(INSTANTE);
  const HOJE = '2026-11-14';
  const data = (dia: string) => new Date(`${dia}T00:00:00Z`);
  const servidor = () => app.getHttpServer();

  beforeAll(async () => {
    app = await criarApp({ relogio });
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  async function novaConta({ aceitar = true } = {}) {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(accessToken, { type: 'bearer' });
    if (aceitar) {
      await auth(request(servidor()).post('/termos/aceite'))
        .send({ versao: TERMOS.versao })
        .expect(204);
    }
    const { body: conta } = await auth(
      request(servidor()).get('/conta'),
    ).expect(200);
    return {
      id: conta.id as string,
      email: conta.email as string,
      fuso: conta.fuso as string,
      auth,
      sinalizar: () => auth(request(servidor()).post('/sobrecarga')),
      mudarFuso: (fuso: string) =>
        auth(request(servidor()).patch('/conta')).send({ fuso }).expect(200),
      checkinsDeHoje: async () => {
        const { body } = await auth(
          request(servidor()).get('/checkins/hoje'),
        ).expect(200);
        return body as CheckinsDoDia;
      },
      registrar: async (disposicao: number) => {
        const { body } = await auth(request(servidor()).post('/checkins'))
          .send({ disposicao, semSintomas: true, sintomas: [] })
          .expect(201);
        return body as { id: string };
      },
      cadastrarTarefa: async (energia: number) => {
        const { body } = await auth(request(servidor()).post('/tarefas'))
          .send({
            titulo: 'Tarefa',
            prazo: '2026-11-30',
            prioridade: 2,
            energia,
          })
          .expect(201);
        return body as { id: string };
      },
      recomendacao: async () => {
        const { body } = await auth(
          request(servidor()).get('/planejamento/hoje'),
        ).expect(200);
        return body as RecomendacaoDoDia;
      },
      sinalizacoes: () =>
        prisma.sinalizacaoSobrecarga.count({ where: { usuariaId: conta.id } }),
    };
  }

  const pelaSobrecarga = {
    disposicao: 1,
    disposicaoAssumida: false,
    disposicaoPorSobrecarga: true,
  };

  describe('sinalização', () => {
    it('grava no dia da usuária e responde 201', async () => {
      const conta = await novaConta();

      const { body } = await conta.sinalizar().expect(201);

      expect(body).toEqual({
        id: expect.any(String),
        dataLocal: HOJE,
        criadoEm: expect.any(String),
      } satisfies Record<keyof SinalizacaoSobrecarga, unknown>);
      const { criadoEm } = body as SinalizacaoSobrecarga;
      expect(new Date(criadoEm).toISOString()).toBe(criadoEm);
      const linha = await prisma.sinalizacaoSobrecarga.findUniqueOrThrow({
        where: { id: (body as SinalizacaoSobrecarga).id },
      });
      expect(linha).toMatchObject({
        usuariaId: conta.id,
        dataLocal: data(HOJE),
      });
    });

    it('usa o dia do fuso de cada usuária', async () => {
      const conta = await novaConta();
      // 02:30 UTC de 15/11 já é 11:30 de 15/11 em Tóquio.
      await conta.mudarFuso('Asia/Tokyo');

      const { body } = await conta.sinalizar().expect(201);

      expect((body as SinalizacaoSobrecarga).dataLocal).toBe('2026-11-15');
      expect(await conta.recomendacao()).toMatchObject({
        hoje: '2026-11-15',
        ...pelaSobrecarga,
      });
    });

    it('não vira check-in: o registro do dia e o histórico não mudam', async () => {
      const conta = await novaConta();
      const registro = await conta.registrar(3);
      const antes = await conta.checkinsDeHoje();

      await conta.sinalizar().expect(201);

      expect(await conta.checkinsDeHoje()).toEqual(antes);
      expect(antes.vigente?.id).toBe(registro.id);
      expect(
        await prisma.checkin.count({ where: { usuariaId: conta.id } }),
      ).toBe(1);
    });

    it('pode ser feita mais de uma vez no dia: cada uma é uma linha', async () => {
      const conta = await novaConta();
      await conta.sinalizar().expect(201);
      await conta.sinalizar().expect(201);

      expect(await conta.sinalizacoes()).toBe(2);
      expect(await conta.recomendacao()).toMatchObject(pelaSobrecarga);
    });

    it('exige sessão', async () => {
      await request(servidor()).post('/sobrecarga').expect(401);
    });
  });

  describe('vale como disposição baixa até o próximo registro', () => {
    it('sem registro no dia, a recomendação considera disposição baixa', async () => {
      const conta = await novaConta();
      const media = await conta.cadastrarTarefa(2);
      expect((await conta.recomendacao()).tarefas).toMatchObject([
        { id: media.id, grupo: 2 },
      ]);

      await conta.sinalizar().expect(201);

      const recomendacao = await conta.recomendacao();
      expect(recomendacao).toMatchObject(pelaSobrecarga);
      // Com disposição baixa, a tarefa média passa a pedir mais do que cabe.
      expect(recomendacao.tarefas).toMatchObject([{ id: media.id, grupo: 3 }]);
    });

    it('depois de um registro de disposição alta, a sinalização vale como baixa', async () => {
      const conta = await novaConta();
      await conta.registrar(3);
      const alta = await conta.cadastrarTarefa(3);
      expect((await conta.recomendacao()).tarefas).toMatchObject([
        { id: alta.id, grupo: 2 },
      ]);

      await conta.sinalizar().expect(201);

      const recomendacao = await conta.recomendacao();
      expect(recomendacao).toMatchObject(pelaSobrecarga);
      expect(recomendacao.tarefas).toMatchObject([{ id: alta.id, grupo: 3 }]);
    });

    it('um registro depois da sinalização encerra o efeito dela', async () => {
      const conta = await novaConta();
      await conta.sinalizar().expect(201);

      await conta.registrar(3);

      expect(await conta.recomendacao()).toMatchObject({
        disposicao: 3,
        disposicaoAssumida: false,
        disposicaoPorSobrecarga: false,
      });
    });

    it('uma nova sinalização depois desse registro volta a valer', async () => {
      const conta = await novaConta();
      await conta.sinalizar().expect(201);
      await conta.registrar(3);

      await conta.sinalizar().expect(201);

      expect(await conta.recomendacao()).toMatchObject(pelaSobrecarga);
    });

    it('corrigir o registro anterior não encerra o efeito: a correção não é um registro novo', async () => {
      const conta = await novaConta();
      const registro = await conta.registrar(1);
      await conta.sinalizar().expect(201);

      await conta
        .auth(request(servidor()).put(`/checkins/${registro.id}`))
        .send({ disposicao: 3, semSintomas: true, sintomas: [] })
        .expect(200);

      expect(await conta.recomendacao()).toMatchObject(pelaSobrecarga);
    });

    // Fora da caixa preta de propósito: é o contrato combinado com a HU15, que
    // ainda não tem chamador na API.
    it('CheckinService.disposicaoVigente, contrato com o reajuste da HU15, já devolve baixa', async () => {
      const conta = await novaConta();
      await conta.registrar(3);
      const checkins = app.get(CheckinService);
      const usuaria = { id: conta.id, email: conta.email, fuso: conta.fuso };
      expect(await checkins.disposicaoVigente(usuaria)).toBe(3);

      await conta.sinalizar().expect(201);

      expect(await checkins.disposicaoVigente(usuaria)).toBe(1);
      expect(await checkins.disposicaoDoDia(usuaria)).toEqual({
        disposicao: 1,
        origem: 'sobrecarga',
      });
    });
  });

  describe('a sinalização de outro dia é ignorada', () => {
    it('sem registro hoje, a sinalização de ontem não vale: a disposição volta a ser assumida', async () => {
      const conta = await novaConta();
      const { body } = await conta.sinalizar().expect(201);
      await prisma.sinalizacaoSobrecarga.update({
        where: { id: (body as SinalizacaoSobrecarga).id },
        data: { dataLocal: data('2026-11-13') },
      });

      expect(await conta.recomendacao()).toMatchObject({
        disposicao: 2,
        disposicaoAssumida: true,
        disposicaoPorSobrecarga: false,
      });
    });

    it('a sinalização de ontem não passa por cima do registro de hoje', async () => {
      const conta = await novaConta();
      await conta.registrar(3);
      const { body } = await conta.sinalizar().expect(201);
      // Mais recente que o registro, mas de outro dia.
      await prisma.sinalizacaoSobrecarga.update({
        where: { id: (body as SinalizacaoSobrecarga).id },
        data: { dataLocal: data('2026-11-13') },
      });

      expect(await conta.recomendacao()).toMatchObject({
        disposicao: 3,
        disposicaoPorSobrecarga: false,
      });
    });

    it('na virada do dia da usuária, a sinalização fica no dia anterior', async () => {
      const conta = await novaConta();
      try {
        // 02:59 UTC de 15/11: ainda 14/11 em São Paulo.
        relogio.ajustar(new Date('2026-11-15T02:59:00Z'));
        const { body } = await conta.sinalizar().expect(201);
        expect((body as SinalizacaoSobrecarga).dataLocal).toBe('2026-11-14');
        expect(await conta.recomendacao()).toMatchObject(pelaSobrecarga);

        // 03:00 UTC: já é 15/11 em São Paulo; a sinalização ficou em 14/11.
        relogio.ajustar(new Date('2026-11-15T03:00:00Z'));
        expect(await conta.recomendacao()).toMatchObject({
          hoje: '2026-11-15',
          disposicaoAssumida: true,
          disposicaoPorSobrecarga: false,
        });
      } finally {
        relogio.ajustar(INSTANTE);
      }
    });
  });

  describe('RNF02: termos aceitos', () => {
    it('sem o aceite, responde 403 e nada é gravado', async () => {
      const conta = await novaConta({ aceitar: false });

      const { body } = await conta.sinalizar().expect(403);

      expect(body.codigo).toBe(CodigoErro.ConsentimentoPendente);
      expect(await conta.sinalizacoes()).toBe(0);
      expect(await conta.recomendacao()).toMatchObject({
        disposicaoAssumida: true,
        disposicaoPorSobrecarga: false,
      });
    });
  });

  describe('RNF03: acesso exclusivo da usuária', () => {
    it('a sinalização de uma conta não muda a disposição da outra', async () => {
      const ana = await novaConta();
      const bia = await novaConta();
      await bia.registrar(3);

      await ana.sinalizar().expect(201);

      expect(await bia.sinalizacoes()).toBe(0);
      expect(await bia.recomendacao()).toMatchObject({
        disposicao: 3,
        disposicaoPorSobrecarga: false,
      });
      expect(await ana.recomendacao()).toMatchObject(pelaSobrecarga);
    });

    it('a conta vem só do token: um id de outra conta no corpo é ignorado', async () => {
      const ana = await novaConta();
      const bia = await novaConta();

      await ana
        .sinalizar()
        .send({ usuariaId: bia.id, dataLocal: '2026-11-10' })
        .expect(201);

      expect(await ana.sinalizacoes()).toBe(1);
      expect(await bia.sinalizacoes()).toBe(0);
      expect(
        await prisma.sinalizacaoSobrecarga.findFirstOrThrow({
          where: { usuariaId: ana.id },
        }),
      ).toMatchObject({ dataLocal: data(HOJE) });
      expect(await bia.recomendacao()).toMatchObject({
        disposicaoAssumida: true,
        disposicaoPorSobrecarga: false,
      });
    });
  });

  it('apaga as sinalizações junto com a usuária', async () => {
    const conta = await novaConta();
    await conta.sinalizar().expect(201);
    await conta.sinalizar().expect(201);
    expect(await conta.sinalizacoes()).toBe(2);

    await prisma.usuaria.delete({ where: { id: conta.id } });

    expect(await conta.sinalizacoes()).toBe(0);
  });
});
