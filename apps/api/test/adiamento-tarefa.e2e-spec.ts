import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Adiar tarefa pela API (HU18, RNF03)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const instante = new Date('2026-11-15T02:30:00Z');
  const relogio = new RelogioFixo(instante);
  const dados = {
    titulo: 'Preparar apresentação',
    prazo: '2026-11-20',
    prioridade: 3,
    energia: 2,
    duracaoMinutos: 60,
  };
  const servidor = () => app.getHttpServer();
  beforeAll(async () => {
    app = await criarApp({ relogio });
    prisma = app.get(PrismaService);
  });
  afterAll(async () => {
    await app.close();
  });

  async function preparar() {
    const tokens = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(tokens.accessToken, { type: 'bearer' });
    const { body: tarefa } = await auth(request(servidor()).post('/tarefas'))
      .send(dados)
      .expect(201);
    return {
      tokens,
      auth,
      tarefa,
      adiar: (corpo: object, id = tarefa.id as string) =>
        auth(request(servidor()).patch(`/tarefas/${id}/adiamento`)).send(corpo),
    };
  }

  it('muda só a data planejada e mantém título, prazo, prioridade, energia, duração e cadastro', async () => {
    const conta = await preparar();
    const { body } = await conta
      .adiar({ dataPlanejada: '2026-11-17' })
      .expect(200);
    expect(body).toEqual({ ...conta.tarefa, dataPlanejada: '2026-11-17' });
    const lista = await conta
      .auth(request(servidor()).get('/tarefas'))
      .expect(200);
    expect(lista.body).toEqual([body]);
    const movimentos = await prisma.movimentacaoTarefa.findMany({
      where: { tarefaId: body.id },
    });
    expect(movimentos).toHaveLength(1);
    expect(movimentos[0]).toMatchObject({
      origem: 'usuaria',
      dataAnterior: new Date('2026-11-14T00:00:00Z'),
      dataNova: new Date('2026-11-17T00:00:00Z'),
      criadaEm: instante,
    });
  });

  it('permite escolher depois do prazo sem alterar o prazo final', async () => {
    const conta = await preparar();
    const { body } = await conta
      .adiar({ dataPlanejada: '2026-11-25' })
      .expect(200);
    expect(body.prazo).toBe(dados.prazo);
    expect(body.dataPlanejada).toBe('2026-11-25');
  });

  it('preserva um movimento automático anterior e registra o novo como manual', async () => {
    const conta = await preparar();
    await prisma.movimentacaoTarefa.create({
      data: {
        tarefaId: conta.tarefa.id,
        origem: 'reajuste',
        dataAnterior: new Date('2026-11-13T00:00:00Z'),
        dataNova: new Date('2026-11-14T00:00:00Z'),
        criadaEm: new Date('2026-11-14T00:00:00Z'),
      },
    });
    await conta.adiar({ dataPlanejada: '2026-11-17' }).expect(200);
    const movimentos = await prisma.movimentacaoTarefa.findMany({
      where: { tarefaId: conta.tarefa.id },
      orderBy: { criadaEm: 'asc' },
    });
    expect(movimentos.map((m) => m.origem)).toEqual(['reajuste', 'usuaria']);
  });

  it('mantém a sequência de datas em dois adiamentos sucessivos', async () => {
    const conta = await preparar();
    await conta.adiar({ dataPlanejada: '2026-11-16' }).expect(200);
    await conta.adiar({ dataPlanejada: '2026-11-18' }).expect(200);
    const movimentos = await prisma.movimentacaoTarefa.findMany({
      where: { tarefaId: conta.tarefa.id },
      orderBy: { dataNova: 'asc' },
    });
    expect(
      movimentos.map((m) => [
        m.dataAnterior.toISOString().slice(0, 10),
        m.dataNova.toISOString().slice(0, 10),
      ]),
    ).toEqual([
      ['2026-11-14', '2026-11-16'],
      ['2026-11-16', '2026-11-18'],
    ]);
  });

  it.each([
    {},
    { dataPlanejada: '2026-02-30' },
    { dataPlanejada: '2026-11-13' },
    { dataPlanejada: '2026-11-14' },
    { dataPlanejada: '2026-11-17', prazo: '2099-01-01' },
    { dataPlanejada: '2026-11-17', origem: 'reajuste' },
    { dataPlanejada: '2026-11-17', usuariaId: randomUUID() },
  ])('recusa corpo inválido sem alterar a tarefa: %j', async (corpo) => {
    const conta = await preparar();
    await conta.adiar(corpo).expect(400);
    const consulta = await conta
      .auth(request(servidor()).get(`/tarefas/${conta.tarefa.id}`))
      .expect(200);
    expect(consulta.body).toEqual(conta.tarefa);
    expect(
      await prisma.movimentacaoTarefa.count({
        where: { tarefaId: conta.tarefa.id },
      }),
    ).toBe(0);
  });

  it('não permite que outra conta adie a tarefa (RNF03)', async () => {
    const dona = await preparar();
    const outra = await preparar();
    const { body } = await outra
      .adiar({ dataPlanejada: '2026-11-17' }, dona.tarefa.id)
      .expect(403);
    expect(body.codigo).toBe(CodigoErro.AcessoNegado);
    expect(
      await prisma.movimentacaoTarefa.count({
        where: { tarefaId: dona.tarefa.id },
      }),
    ).toBe(0);
    const depois = await dona
      .auth(request(servidor()).get(`/tarefas/${dona.tarefa.id}`))
      .expect(200);
    expect(depois.body).toEqual(dona.tarefa);
  });

  it('exige sessão', async () => {
    const conta = await preparar();
    await request(servidor())
      .patch(`/tarefas/${conta.tarefa.id}/adiamento`)
      .send({ dataPlanejada: '2026-11-17' })
      .expect(401);
  });

  it('distingue tarefa inexistente de id inválido', async () => {
    const conta = await preparar();
    await conta
      .adiar({ dataPlanejada: '2026-11-17' }, randomUUID())
      .expect(404);
    await conta.adiar({ dataPlanejada: '2026-11-17' }, 'invalido').expect(400);
  });

  it('não adia tarefa concluída', async () => {
    const conta = await preparar();
    await prisma.tarefa.update({
      where: { id: conta.tarefa.id },
      data: { concluidaEm: instante },
    });
    const { body } = await conta
      .adiar({ dataPlanejada: '2026-11-17' })
      .expect(409);
    expect(body.codigo).toBe(CodigoErro.TarefaConcluida);
    expect(
      await prisma.movimentacaoTarefa.count({
        where: { tarefaId: conta.tarefa.id },
      }),
    ).toBe(0);
  });

  it('duas requisições concorrentes para a mesma data não duplicam o histórico', async () => {
    const conta = await preparar();
    const respostas = await Promise.all([
      conta.adiar({ dataPlanejada: '2026-11-17' }),
      conta.adiar({ dataPlanejada: '2026-11-17' }),
    ]);
    expect(respostas.filter((r) => r.status === 200)).toHaveLength(1);
    expect([400, 409]).toContain(
      respostas.find((r) => r.status !== 200)?.status,
    );
    expect(
      await prisma.movimentacaoTarefa.count({
        where: { tarefaId: conta.tarefa.id },
      }),
    ).toBe(1);
  });

  it('usa o dia local na virada de UTC, inclusive para tarefa planejada antes de hoje', async () => {
    const conta = await preparar();
    await prisma.tarefa.update({
      where: { id: conta.tarefa.id },
      data: { dataPlanejada: new Date('2026-11-10T00:00:00Z') },
    });
    await conta.adiar({ dataPlanejada: '2026-11-14' }).expect(200);
    await conta
      .auth(request(servidor()).patch('/conta'))
      .send({ fuso: 'Asia/Tokyo' })
      .expect(200);
    await prisma.tarefa.update({
      where: { id: conta.tarefa.id },
      data: { dataPlanejada: new Date('2026-11-10T00:00:00Z') },
    });
    await conta.adiar({ dataPlanejada: '2026-11-14' }).expect(400);
  });
});
