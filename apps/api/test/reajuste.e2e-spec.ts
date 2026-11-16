import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro, type RecomendacaoReajustada } from '@mindcycle/shared';
import { TERMOS } from '../src/modules/consent/termos.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Reajuste da recomendação do dia pela API (HU15, RNF03, RNF07)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, onde as contas de teste estão.
  const instante = new Date('2026-11-15T02:30:00Z');
  const relogio = new RelogioFixo(instante);
  const HOJE = '2026-11-14';
  const AMANHA = '2026-11-15';
  const data = (dia: string) => new Date(`${dia}T00:00:00Z`);
  const servidor = () => app.getHttpServer();

  beforeAll(async () => {
    app = await criarApp({ relogio });
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    relogio.ajustar(instante);
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
    return {
      auth,
      cadastrar: async (dados: Record<string, unknown> = {}) => {
        const { body } = await auth(request(servidor()).post('/tarefas'))
          .send({
            titulo: 'Tarefa',
            prazo: '2026-11-30',
            prioridade: 2,
            energia: 2,
            ...dados,
          })
          .expect(201);
        return body as { id: string; prazo: string };
      },
      registrar: async (disposicao: number) => {
        const { body } = await auth(request(servidor()).post('/checkins'))
          .send({ disposicao, semSintomas: true, sintomas: [] })
          .expect(201);
        return body as { id: string };
      },
      plano: async () => {
        const { body } = await auth(
          request(servidor()).get('/planejamento/hoje'),
        ).expect(200);
        return body as RecomendacaoReajustada;
      },
      desfazer: (tarefaId: string) =>
        auth(
          request(servidor()).post(
            `/planejamento/hoje/movidas/${tarefaId}/desfazimento`,
          ),
        ),
      tarefa: async (id: string) => {
        const { body } = await auth(
          request(servidor()).get(`/tarefas/${id}`),
        ).expect(200);
        return body as { dataPlanejada: string; prazo: string };
      },
    };
  }

  const ids = (lista: { id: string }[]) => lista.map((t) => t.id);
  const passagens = (tarefaId: string) =>
    prisma.movimentacaoTarefa.findMany({ where: { tarefaId } });

  it('depois do registro, a tarefa acima da disposição com prazo à frente passa para amanhã com o mesmo prazo', async () => {
    const conta = await novaConta();
    await conta.registrar(2);
    const pesada = await conta.cadastrar({ energia: 3, prazo: '2026-11-20' });
    const leve = await conta.cadastrar({ energia: 1 });

    const plano = await conta.plano();

    expect(ids(plano.tarefas)).toEqual([leve.id]);
    expect(plano.movidas).toEqual([{ ...pesada, dataPlanejada: AMANHA }]);
    expect(await conta.tarefa(pesada.id)).toMatchObject({
      prazo: '2026-11-20',
      dataPlanejada: AMANHA,
    });
    expect(await passagens(pesada.id)).toEqual([
      expect.objectContaining({
        origem: 'reajuste',
        dataAnterior: data(HOJE),
        dataNova: data(AMANHA),
        criadaEm: instante,
        desfeitaEm: null,
        devolvidaEm: null,
      }),
    ]);
    // Sem contador nem cobrança: a resposta só tem a lista, a disposição e as movidas.
    expect(Object.keys(plano).sort()).toEqual([
      'disposicao',
      'disposicaoAssumida',
      'hoje',
      'movidas',
      'tarefas',
    ]);
  });

  it('sem registro de disposição no dia, nada se move', async () => {
    const conta = await novaConta();
    const pesada = await conta.cadastrar({ energia: 3 });

    const plano = await conta.plano();

    expect(plano).toMatchObject({ disposicaoAssumida: true, movidas: [] });
    expect(plano.tarefas).toMatchObject([{ id: pesada.id, grupo: 3 }]);
    expect(await passagens(pesada.id)).toEqual([]);
  });

  it('prazo hoje ou vencido nunca sai do dia: fica com o aviso sem cobrança', async () => {
    const conta = await novaConta();
    await conta.registrar(1);
    const venceHoje = await conta.cadastrar({ energia: 3, prazo: HOJE });
    const vencida = await conta.cadastrar({ energia: 3 });
    await prisma.tarefa.update({
      where: { id: vencida.id },
      data: { prazo: data('2026-11-10') },
    });

    const plano = await conta.plano();

    expect(plano.movidas).toEqual([]);
    expect(
      plano.tarefas.map((t) => [t.id, t.grupo, t.avisoAdiamento]),
    ).toEqual([
      [vencida.id, 1, true],
      [venceHoje.id, 1, true],
    ]);
    expect(await passagens(venceHoje.id)).toEqual([]);
    expect(await passagens(vencida.id)).toEqual([]);
  });

  it('pedir o plano de novo, mesmo ao mesmo tempo, não move nem registra nada a mais', async () => {
    const conta = await novaConta();
    await conta.registrar(1);
    const pesada = await conta.cadastrar({ energia: 3 });

    const planos = await Promise.all([
      conta.plano(),
      conta.plano(),
      conta.plano(),
    ]);
    const depois = await conta.plano();

    for (const plano of [...planos, depois]) {
      expect(ids(plano.movidas)).toEqual([pesada.id]);
    }
    expect(await passagens(pesada.id)).toHaveLength(1);
  });

  it('a correção do registro vigente também reajusta a lista', async () => {
    const conta = await novaConta();
    const registro = await conta.registrar(3);
    const pesada = await conta.cadastrar({ energia: 3 });
    expect((await conta.plano()).movidas).toEqual([]);

    await conta
      .auth(request(servidor()).put(`/checkins/${registro.id}`))
      .send({ disposicao: 1, semSintomas: true, sintomas: [] })
      .expect(200);

    expect(ids((await conta.plano()).movidas)).toEqual([pesada.id]);
  });

  describe('desfazer no mesmo dia', () => {
    it('a tarefa volta para hoje e não sai de novo, nem com um registro mais baixo', async () => {
      const conta = await novaConta();
      await conta.registrar(2);
      const pesada = await conta.cadastrar({ energia: 3 });
      await conta.plano();

      const { body } = await conta.desfazer(pesada.id).expect(200);

      const plano = body as RecomendacaoReajustada;
      expect(plano.movidas).toEqual([]);
      expect(plano.tarefas).toMatchObject([
        { id: pesada.id, grupo: 3, dataPlanejada: HOJE },
      ]);
      expect(await passagens(pesada.id)).toEqual([
        expect.objectContaining({ desfeitaEm: instante, devolvidaEm: null }),
      ]);

      await conta.registrar(1);
      const depois = await conta.plano();
      expect(ids(depois.tarefas)).toEqual([pesada.id]);
      expect(depois.movidas).toEqual([]);
      expect(await passagens(pesada.id)).toHaveLength(1);
    });

    it('no dia seguinte, a desfeita pode sair de novo', async () => {
      const conta = await novaConta();
      await conta.registrar(1);
      const pesada = await conta.cadastrar({ energia: 3 });
      await conta.plano();
      await conta.desfazer(pesada.id).expect(200);

      // 15/11 em São Paulo: a desfeita ficou planejada para ontem.
      relogio.ajustar(new Date('2026-11-16T02:30:00Z'));
      await conta.registrar(1);
      const plano = await conta.plano();

      expect(plano.movidas).toEqual([
        expect.objectContaining({ id: pesada.id, dataPlanejada: '2026-11-16' }),
      ]);
    });

    it('não desfaz duas vezes nem desfaz tarefa que o reajuste não moveu', async () => {
      const conta = await novaConta();
      await conta.registrar(2);
      const pesada = await conta.cadastrar({ energia: 3 });
      const leve = await conta.cadastrar({ energia: 1 });
      await conta.plano();
      await conta.desfazer(pesada.id).expect(200);

      for (const id of [pesada.id, leve.id]) {
        const { body } = await conta.desfazer(id).expect(409);
        expect(body.codigo).toBe(CodigoErro.SemReajusteParaDesfazer);
      }
      expect(await passagens(leve.id)).toEqual([]);
    });

    it('não desfaz tarefa concluída', async () => {
      const conta = await novaConta();
      await conta.registrar(1);
      const pesada = await conta.cadastrar({ energia: 3 });
      await conta.plano();
      await prisma.tarefa.update({
        where: { id: pesada.id },
        data: { concluidaEm: instante },
      });

      const { body } = await conta.desfazer(pesada.id).expect(409);

      expect(body.codigo).toBe(CodigoErro.TarefaConcluida);
      expect(await passagens(pesada.id)).toEqual([
        expect.objectContaining({ desfeitaEm: null }),
      ]);
    });

    it('distingue tarefa inexistente de id inválido e exige sessão', async () => {
      const conta = await novaConta();
      await conta.desfazer(randomUUID()).expect(404);
      await conta.desfazer('invalido').expect(400);
      await request(servidor())
        .post(`/planejamento/hoje/movidas/${randomUUID()}/desfazimento`)
        .expect(401);
    });
  });

  describe('quando a disposição sobe no mesmo dia', () => {
    it('voltam as movidas hoje que agora cabem; as que ainda não cabem ficam em amanhã', async () => {
      const conta = await novaConta();
      await conta.registrar(1);
      const media = await conta.cadastrar({ energia: 2 });
      const alta = await conta.cadastrar({ energia: 3 });
      expect(ids((await conta.plano()).movidas).sort()).toEqual(
        [media.id, alta.id].sort(),
      );

      await conta.registrar(2);
      const plano = await conta.plano();

      expect(ids(plano.tarefas)).toEqual([media.id]);
      expect(ids(plano.movidas)).toEqual([alta.id]);
      expect(await conta.tarefa(media.id)).toMatchObject({
        dataPlanejada: HOJE,
        prazo: '2026-11-30',
      });
      expect(await passagens(media.id)).toEqual([
        expect.objectContaining({ devolvidaEm: instante, desfeitaEm: null }),
      ]);
    });

    it('a adiada pela usuária (HU18) não volta', async () => {
      const conta = await novaConta();
      const adiada = await conta.cadastrar({ energia: 3 });
      await conta
        .auth(request(servidor()).patch(`/tarefas/${adiada.id}/adiamento`))
        .send({ dataPlanejada: AMANHA })
        .expect(200);
      await conta.registrar(1);
      await conta.plano();

      await conta.registrar(3);
      const plano = await conta.plano();

      expect(plano.tarefas).toEqual([]);
      expect(plano.movidas).toEqual([]);
      expect((await conta.tarefa(adiada.id)).dataPlanejada).toBe(AMANHA);
    });

    it('a movida pelo reajuste e depois adiada pela usuária não volta', async () => {
      const conta = await novaConta();
      await conta.registrar(1);
      const pesada = await conta.cadastrar({ energia: 3 });
      await conta.plano();
      await conta
        .auth(request(servidor()).patch(`/tarefas/${pesada.id}/adiamento`))
        .send({ dataPlanejada: '2026-11-18' })
        .expect(200);

      await conta.registrar(3);
      const plano = await conta.plano();

      expect(plano.tarefas).toEqual([]);
      expect(plano.movidas).toEqual([]);
      expect((await conta.tarefa(pesada.id)).dataPlanejada).toBe('2026-11-18');
    });
  });

  it('a movida cujo prazo passa a ser hoje (edição da HU16) volta para o dia, com o aviso', async () => {
    const conta = await novaConta();
    await conta.registrar(1);
    const pesada = await conta.cadastrar({ energia: 3 });
    await conta.plano();
    await prisma.tarefa.update({
      where: { id: pesada.id },
      data: { prazo: data(HOJE) },
    });

    const plano = await conta.plano();

    expect(plano.movidas).toEqual([]);
    expect(plano.tarefas).toMatchObject([
      { id: pesada.id, grupo: 1, avisoAdiamento: true, dataPlanejada: HOJE },
    ]);
  });

  // RNF07 pede a lista reajustada em até 2 s depois do registro, medida no
  // Android. Aqui se mede só o trecho da API, com o banco local: registro e
  // pedido do plano, como o app faz, com 30 tarefas para mover.
  it('registro e plano reajustado respondem juntos em menos de 2 s (trecho da API do RNF07)', async () => {
    const conta = await novaConta();
    await conta.registrar(3);
    for (let i = 0; i < 30; i += 1) {
      await conta.cadastrar({ titulo: `Pesada ${i}`, energia: 3 });
    }
    await conta.plano();

    const inicio = performance.now();
    await conta.registrar(1);
    const plano = await conta.plano();
    const duracao = performance.now() - inicio;

    expect(plano.movidas).toHaveLength(30);
    expect(duracao).toBeLessThan(2000);
  });

  describe('RNF03: o reajuste e o desfazer valem só para a própria conta', () => {
    it('o registro de uma conta não move as tarefas de outra', async () => {
      const ana = await novaConta();
      const bia = await novaConta();
      const daAna = await ana.cadastrar({ energia: 3 });
      await bia.registrar(1);

      await bia.plano();
      const plano = await ana.plano();

      expect(plano.movidas).toEqual([]);
      expect(ids(plano.tarefas)).toEqual([daAna.id]);
      expect(await passagens(daAna.id)).toEqual([]);
    });

    it('outra conta não vê nem desfaz a movida', async () => {
      const ana = await novaConta();
      const bia = await novaConta();
      await ana.registrar(1);
      const daAna = await ana.cadastrar({ energia: 3 });
      await ana.plano();

      expect((await bia.plano()).movidas).toEqual([]);
      const { body } = await bia.desfazer(daAna.id).expect(403);

      expect(body.codigo).toBe(CodigoErro.AcessoNegado);
      expect(ids((await ana.plano()).movidas)).toEqual([daAna.id]);
      expect(await passagens(daAna.id)).toEqual([
        expect.objectContaining({ desfeitaEm: null }),
      ]);
    });
  });
});
