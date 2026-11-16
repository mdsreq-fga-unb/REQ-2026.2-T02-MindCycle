import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import type { RecomendacaoReajustada } from '@mindcycle/shared';
import { TERMOS } from '../src/modules/consent/termos.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Recomendação das tarefas do dia pela API (HU13, RNF03)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, onde as contas de teste estão.
  const relogio = new RelogioFixo(new Date('2026-11-15T02:30:00Z'));
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

  const tarefa = (dados: Record<string, unknown> = {}) => ({
    titulo: 'Tarefa',
    prazo: '2026-11-30',
    prioridade: 2,
    energia: 2,
    ...dados,
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
          .send(tarefa(dados))
          .expect(201);
        return body as { id: string };
      },
      registrar: (disposicao: number) =>
        auth(request(servidor()).post('/checkins'))
          .send({ disposicao, semSintomas: true, sintomas: [] })
          .expect(201),
      recomendacao: async () => {
        const { body } = await auth(
          request(servidor()).get('/planejamento/hoje'),
        ).expect(200);
        return body as RecomendacaoReajustada;
      },
    };
  }

  const ids = (r: RecomendacaoReajustada) => r.tarefas.map((t) => t.id);

  // Com registro no dia, a tarefa do grupo 3 passa para amanhã (HU15, em
  // reajuste.e2e-spec.ts); o grupo 3 na lista aparece no caso sem registro.
  it('ordena pelos grupos e pelos desempates, com a disposição do dia', async () => {
    const conta = await novaConta();
    await conta.registrar(2);
    const grupo3 = await conta.cadastrar({
      titulo: 'Acima da disposição',
      prazo: '2026-11-16',
      prioridade: 3,
      energia: 3,
    });
    const grupo2Depois = await conta.cadastrar({
      titulo: 'Cabe, prazo depois',
      prazo: '2026-11-20',
      prioridade: 1,
      energia: 1,
    });
    const grupo2Antes = await conta.cadastrar({
      titulo: 'Cabe, prazo antes',
      prazo: '2026-11-18',
      prioridade: 1,
      energia: 2,
    });
    const urgente = await conta.cadastrar({
      titulo: 'Vence hoje',
      prazo: HOJE,
      energia: 3,
    });
    const vencida = await conta.cadastrar({ titulo: 'Venceu', energia: 1 });
    await prisma.tarefa.update({
      where: { id: vencida.id },
      data: { prazo: data('2026-11-12') },
    });

    const recomendacao = await conta.recomendacao();

    expect(recomendacao).toMatchObject({
      hoje: HOJE,
      disposicao: 2,
      disposicaoAssumida: false,
    });
    expect(
      recomendacao.tarefas.map((t) => [t.id, t.grupo, t.avisoAdiamento]),
    ).toEqual([
      [vencida.id, 1, false],
      [urgente.id, 1, true],
      [grupo2Antes.id, 2, false],
      [grupo2Depois.id, 2, false],
    ]);
    expect(recomendacao.movidas.map((t) => t.id)).toEqual([grupo3.id]);
    // Cada item é a tarefa inteira, com o grupo e o aviso.
    expect(recomendacao.tarefas[1]).toEqual({
      ...urgente,
      grupo: 1,
      avisoAdiamento: true,
    });
  });

  it('sem registro no dia, assume disposição média', async () => {
    // Sem aceite dos termos não há registro de disposição, mas há tarefas.
    const conta = await novaConta({ aceitar: false });
    const alta = await conta.cadastrar({ energia: 3 });
    const media = await conta.cadastrar({ energia: 2 });

    const recomendacao = await conta.recomendacao();

    expect(recomendacao).toMatchObject({
      disposicao: 2,
      disposicaoAssumida: true,
    });
    expect(recomendacao.tarefas.map((t) => [t.id, t.grupo])).toEqual([
      [media.id, 2],
      [alta.id, 3],
    ]);
  });

  it('usa o registro mais recente do dia', async () => {
    const conta = await novaConta();
    await conta.registrar(3);
    await conta.registrar(1);
    // Prazo hoje: fica no dia (HU15), e o aviso mostra a disposição usada.
    const media = await conta.cadastrar({ energia: 2, prazo: HOJE });

    const recomendacao = await conta.recomendacao();

    expect(recomendacao.disposicao).toBe(1);
    expect(recomendacao.tarefas).toMatchObject([
      { id: media.id, grupo: 1, avisoAdiamento: true },
    ]);
  });

  it('não usa o registro de outro dia', async () => {
    const conta = await novaConta();
    const { body } = await conta.registrar(3);
    await prisma.checkin.update({
      where: { id: body.id },
      data: { dataLocal: data('2026-11-13') },
    });

    const recomendacao = await conta.recomendacao();

    expect(recomendacao).toMatchObject({
      disposicao: 2,
      disposicaoAssumida: true,
    });
  });

  it('inclui as atrasadas e deixa de fora as concluídas e as planejadas para depois', async () => {
    const conta = await novaConta();
    const deHoje = await conta.cadastrar({ titulo: 'De hoje' });
    const atrasada = await conta.cadastrar({ titulo: 'Atrasada' });
    await prisma.tarefa.update({
      where: { id: atrasada.id },
      data: { dataPlanejada: data('2026-11-10') },
    });
    const concluida = await conta.cadastrar({ titulo: 'Concluída' });
    await prisma.tarefa.update({
      where: { id: concluida.id },
      data: { concluidaEm: new Date() },
    });
    const adiada = await conta.cadastrar({ titulo: 'Adiada' });
    await conta
      .auth(request(servidor()).patch(`/tarefas/${adiada.id}/adiamento`))
      .send({ dataPlanejada: '2026-11-16' })
      .expect(200);

    const recomendacao = await conta.recomendacao();

    expect(ids(recomendacao).sort()).toEqual([deHoje.id, atrasada.id].sort());
  });

  it('traz só as tarefas e a disposição da própria usuária (RNF03)', async () => {
    const ana = await novaConta();
    const bia = await novaConta();
    const daAna = await ana.cadastrar({ titulo: 'Da Ana', energia: 3 });
    await bia.cadastrar({ titulo: 'Da Bia' });
    await bia.registrar(1);

    const recomendacao = await ana.recomendacao();

    expect(ids(recomendacao)).toEqual([daAna.id]);
    // O registro da Bia não vale para a Ana: sem registro, média.
    expect(recomendacao).toMatchObject({
      disposicao: 2,
      disposicaoAssumida: true,
    });
  });

  it('a fase do ciclo não entra no cálculo', async () => {
    const conta = await novaConta();
    await conta.registrar(2);
    await conta.cadastrar({ energia: 3, prioridade: 3 });
    await conta.cadastrar({ energia: 1, prioridade: 1 });
    await conta.cadastrar({ prazo: HOJE });
    const antes = await conta.recomendacao();

    await conta
      .auth(request(servidor()).post('/ciclo/inicios'))
      .send({ data: '2026-11-12' })
      .expect(201);

    expect(await conta.recomendacao()).toEqual(antes);
  });

  it('exige sessão', async () => {
    await request(servidor()).get('/planejamento/hoje').expect(401);
  });
});
