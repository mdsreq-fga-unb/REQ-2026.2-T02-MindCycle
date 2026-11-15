import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Manutenção de tarefas (HU16, HU19, RNF03)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const instante = new Date('2026-11-15T02:30:00Z');
  const relogio = new RelogioFixo(instante);
  const dados = {
    titulo: 'Ler',
    prazo: '2026-11-20',
    prioridade: 2,
    energia: 1,
    duracaoMinutos: 30,
  };
  const alterados = {
    titulo: '  Ler e revisar  ',
    prazo: '2026-11-21',
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
  beforeEach(() => relogio.ajustar(instante));

  async function preparar() {
    const tokens = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(tokens.accessToken, { type: 'bearer' });
    const { body: tarefa } = await auth(request(servidor()).post('/tarefas'))
      .send(dados)
      .expect(201);
    const { body: conta } = await auth(
      request(servidor()).get('/conta'),
    ).expect(200);
    return {
      auth,
      tarefa,
      conta,
      editar: (corpo: object = alterados, id = tarefa.id as string) =>
        auth(request(servidor()).put(`/tarefas/${id}`)).send(corpo),
      excluir: (id = tarefa.id as string) =>
        auth(request(servidor()).delete(`/tarefas/${id}`)),
      consultar: () => auth(request(servidor()).get(`/tarefas/${tarefa.id}`)),
    };
  }

  describe('editar (HU16)', () => {
    it('atualiza a mesma tarefa sem duplicar ou mudar planejamento e cadastro', async () => {
      const c = await preparar();
      const { body } = await c.editar().expect(200);
      expect(body).toEqual({
        ...c.tarefa,
        ...alterados,
        titulo: 'Ler e revisar',
      });
      expect((await c.consultar().expect(200)).body).toEqual(body);
      expect(
        await prisma.tarefa.count({ where: { usuariaId: c.conta.id } }),
      ).toBe(1);
    });

    it('não desfaz um adiamento nem altera seu histórico', async () => {
      const c = await preparar();
      await c
        .auth(request(servidor()).patch(`/tarefas/${c.tarefa.id}/adiamento`))
        .send({ dataPlanejada: '2026-11-19' })
        .expect(200);
      const { body } = await c.editar().expect(200);
      expect(body.dataPlanejada).toBe('2026-11-19');
      expect(
        await prisma.movimentacaoTarefa.count({
          where: { tarefaId: c.tarefa.id },
        }),
      ).toBe(1);
    });

    it('remove a duração opcional e permite corrigir prazo passado', async () => {
      const c = await preparar();
      const { body } = await c
        .editar({ ...alterados, prazo: '2026-11-01', duracaoMinutos: null })
        .expect(200);
      expect(body.duracaoMinutos).toBeNull();
      expect(body.prazo).toBe('2026-11-01');
    });

    it.each([
      {},
      { ...alterados, titulo: '' },
      { ...alterados, prazo: '2026-02-30' },
      { ...alterados, prioridade: 4 },
      { ...alterados, energia: 0 },
      { ...alterados, duracaoMinutos: 1 },
      { ...alterados, usuariaId: randomUUID() },
      { ...alterados, dataPlanejada: '2026-11-30' },
      { ...alterados, concluidaEm: instante.toISOString() },
    ])('recusa corpo inválido sem alterar dados: %j', async (corpo) => {
      const c = await preparar();
      await c.editar(corpo).expect(400);
      expect((await c.consultar().expect(200)).body).toEqual(c.tarefa);
    });
  });

  describe('excluir (HU19)', () => {
    it('remove a tarefa das consultas, listas e seu histórico em cascata', async () => {
      const c = await preparar();
      await c
        .auth(request(servidor()).patch(`/tarefas/${c.tarefa.id}/adiamento`))
        .send({ dataPlanejada: '2026-11-19' })
        .expect(200);
      await c.excluir().expect(204).expect('');
      await c.consultar().expect(404);
      expect(
        (await c.auth(request(servidor()).get('/tarefas')).expect(200)).body,
      ).toEqual([]);
      expect(
        await prisma.movimentacaoTarefa.count({
          where: { tarefaId: c.tarefa.id },
        }),
      ).toBe(0);
      await c.excluir().expect(404);
    });

    it('também permite excluir uma tarefa concluída', async () => {
      const c = await preparar();
      await prisma.tarefa.update({
        where: { id: c.tarefa.id },
        data: { concluidaEm: instante },
      });
      await c.excluir().expect(204);
      await c.consultar().expect(404);
    });
  });

  describe.each(['editar', 'excluir'] as const)('segurança: %s', (acao) => {
    it('nega outra conta sem alterar a tarefa (RNF03)', async () => {
      const dona = await preparar();
      const outra = await preparar();
      const res =
        acao === 'editar'
          ? await outra.editar(alterados, dona.tarefa.id)
          : await outra[acao](dona.tarefa.id);
      expect(res.status).toBe(403);
      expect(res.body.codigo).toBe(CodigoErro.AcessoNegado);
      expect((await dona.consultar().expect(200)).body).toEqual(dona.tarefa);
    });

    it.each([
      ['inexistente', randomUUID(), 404],
      ['inválido', 'nao-uuid', 400],
    ] as const)('recusa id %s', async (_nome, id, status) => {
      const c = await preparar();
      const res =
        acao === 'editar' ? await c.editar(alterados, id) : await c[acao](id);
      expect(res.status).toBe(status);
    });
  });

  it('o detalhe não expõe a tarefa de outra conta (RNF03)', async () => {
    const dona = await preparar();
    const outra = await preparar();
    const { body } = await outra
      .auth(request(servidor()).get(`/tarefas/${dona.tarefa.id}`))
      .expect(403);
    expect(body.codigo).toBe(CodigoErro.AcessoNegado);
    expect(body).not.toHaveProperty('titulo');
  });

  it('o detalhe recusa identificadores inexistentes e inválidos', async () => {
    const c = await preparar();
    await c
      .auth(request(servidor()).get(`/tarefas/${randomUUID()}`))
      .expect(404);
    await c.auth(request(servidor()).get('/tarefas/nao-uuid')).expect(400);
  });

  it('exige sessão em todas as novas rotas', async () => {
    const id = randomUUID();
    await request(servidor()).get(`/tarefas/${id}`).expect(401);
    await request(servidor()).put(`/tarefas/${id}`).send(alterados).expect(401);
    await request(servidor()).delete(`/tarefas/${id}`).expect(401);
  });
});
