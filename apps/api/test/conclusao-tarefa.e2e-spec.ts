import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Conclusão de tarefas pela API (HU20, RNF03)', () => {
  let app: INestApplication<App>;
  const instante = new Date('2026-11-15T02:30:00Z');
  const relogio = new RelogioFixo(instante);
  const dados = {
    titulo: 'Ler',
    prazo: '2026-11-20',
    prioridade: 2,
    energia: 1,
    duracaoMinutos: 30,
  };
  const servidor = () => app.getHttpServer();

  beforeAll(async () => {
    app = await criarApp({ relogio });
  });
  afterAll(async () => {
    await app.close();
  });
  beforeEach(() => relogio.ajustar(instante));

  async function preparar() {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) => req.auth(accessToken, { type: 'bearer' });
    const { body: tarefa } = await auth(request(servidor()).post('/tarefas'))
      .send(dados)
      .expect(201);
    return {
      auth,
      tarefa,
      concluir: (id = tarefa.id as string, corpo: object = {}) =>
        auth(request(servidor()).post(`/tarefas/${id}/conclusao`)).send(corpo),
      reabrir: (id = tarefa.id as string) =>
        auth(request(servidor()).delete(`/tarefas/${id}/conclusao`)),
      concluidas: () => auth(request(servidor()).get('/tarefas/concluidas')),
      consultar: () => auth(request(servidor()).get(`/tarefas/${tarefa.id}`)),
    };
  }

  it('registra o instante e mantém os demais dados, separando abertas de concluídas', async () => {
    const c = await preparar();
    const { body } = await c.concluir().expect(200);
    expect(body).toEqual({ ...c.tarefa, concluidaEm: instante.toISOString() });
    expect((await c.consultar().expect(200)).body).toEqual(body);
    expect((await c.auth(request(servidor()).get('/tarefas')).expect(200)).body).toEqual(
      [],
    );
    expect((await c.concluidas().expect(200)).body).toEqual([body]);
  });

  it('lista as concluídas da mais recente para a mais antiga', async () => {
    const c = await preparar();
    await c.concluir().expect(200);
    const { body: segunda } = await c
      .auth(request(servidor()).post('/tarefas'))
      .send(dados)
      .expect(201);
    relogio.ajustar(new Date('2026-11-16T02:30:00Z'));
    await c.concluir(segunda.id).expect(200);
    const { body } = await c.concluidas().expect(200);
    expect(body.map((t: { id: string }) => t.id)).toEqual([segunda.id, c.tarefa.id]);
  });

  it('reabre sem alterar os dados e devolve a tarefa às abertas e à recomendação', async () => {
    const c = await preparar();
    await c.concluir().expect(200);
    const { body } = await c.reabrir().expect(200);
    expect(body).toEqual(c.tarefa);
    expect((await c.consultar().expect(200)).body).toEqual(body);
    expect((await c.concluidas().expect(200)).body).toEqual([]);
    expect((await c.auth(request(servidor()).get('/tarefas')).expect(200)).body).toEqual([
      body,
    ]);
    const plano = await c.auth(request(servidor()).get('/planejamento/hoje')).expect(200);
    expect(plano.body.tarefas.map((t: { id: string }) => t.id)).toContain(c.tarefa.id);
  });

  it('reabrir novamente é idempotente e uma nova conclusão recebe a nova data', async () => {
    const c = await preparar();
    await c.concluir().expect(200);
    await c.reabrir().expect(200);
    expect((await c.reabrir().expect(200)).body).toEqual(c.tarefa);
    const depois = new Date('2026-11-16T12:00:00Z');
    relogio.ajustar(depois);
    expect((await c.concluir().expect(200)).body.concluidaEm).toBe(depois.toISOString());
  });

  it('reabrir preserva o adiamento e permite adiar novamente', async () => {
    const c = await preparar();
    const adiar = (dataPlanejada: string) =>
      c
        .auth(request(servidor()).patch(`/tarefas/${c.tarefa.id}/adiamento`))
        .send({ dataPlanejada });
    await adiar('2026-11-19').expect(200);
    await c.concluir().expect(200);
    expect((await c.reabrir().expect(200)).body.dataPlanejada).toBe('2026-11-19');
    await adiar('2026-11-20').expect(200);
  });

  it('não permite reabrir a tarefa de outra conta', async () => {
    const dona = await preparar();
    const outra = await preparar();
    const { body } = await dona.concluir().expect(200);
    await outra.reabrir(dona.tarefa.id).expect(403);
    expect((await dona.consultar().expect(200)).body).toEqual(body);
  });

  it.each([
    [randomUUID(), 404],
    ['invalido', 400],
  ] as const)('reabrir %s retorna %s', async (id, status) => {
    const c = await preparar();
    await c.reabrir(id).expect(status);
  });

  it('reabrir exige sessão', async () => {
    await request(servidor()).delete(`/tarefas/${randomUUID()}/conclusao`).expect(401);
  });

  it('repetir a conclusão preserva a primeira data', async () => {
    const c = await preparar();
    await c.concluir().expect(200);
    relogio.ajustar(new Date('2026-11-16T12:00:00Z'));
    expect((await c.concluir().expect(200)).body.concluidaEm).toBe(
      instante.toISOString(),
    );
    expect((await c.concluidas().expect(200)).body).toHaveLength(1);
  });

  it('aceita duas conclusões simultâneas sem duplicar o registro', async () => {
    const c = await preparar();
    const respostas = await Promise.all([c.concluir(), c.concluir()]);
    expect(respostas.map((r) => r.status)).toEqual([200, 200]);
    expect(respostas[0].body).toEqual(respostas[1].body);
    expect((await c.concluidas().expect(200)).body).toHaveLength(1);
  });

  it('não aceita data de conclusão nem outros campos enviados pelo cliente', async () => {
    const c = await preparar();
    await c
      .concluir(c.tarefa.id, { concluidaEm: '2000-01-01', titulo: 'Outra' })
      .expect(400);
    expect((await c.consultar().expect(200)).body).toEqual(c.tarefa);
  });

  it('editar depois não remove a conclusão e adiar continua bloqueado', async () => {
    const c = await preparar();
    await c
      .auth(request(servidor()).patch(`/tarefas/${c.tarefa.id}/adiamento`))
      .send({ dataPlanejada: '2026-11-19' })
      .expect(200);
    await c.concluir().expect(200);
    const { body } = await c
      .auth(request(servidor()).put(`/tarefas/${c.tarefa.id}`))
      .send({ ...dados, titulo: 'Revisar' })
      .expect(200);
    expect(body.concluidaEm).toBe(instante.toISOString());
    expect(body.dataPlanejada).toBe('2026-11-19');
    await c
      .auth(request(servidor()).patch(`/tarefas/${c.tarefa.id}/adiamento`))
      .send({ dataPlanejada: '2026-11-21' })
      .expect(409);
  });

  it('excluir remove a tarefa também da lista de concluídas', async () => {
    const c = await preparar();
    await c.concluir().expect(200);
    await c.auth(request(servidor()).delete(`/tarefas/${c.tarefa.id}`)).expect(204);
    expect((await c.concluidas().expect(200)).body).toEqual([]);
    await c.consultar().expect(404);
  });

  it('nega concluir a tarefa de outra conta e não a altera (RNF03)', async () => {
    const dona = await preparar();
    const outra = await preparar();
    const { body } = await outra.concluir(dona.tarefa.id).expect(403);
    expect(body.codigo).toBe(CodigoErro.AcessoNegado);
    expect((await dona.consultar().expect(200)).body).toEqual(dona.tarefa);
  });

  it('a lista de concluídas não expõe registros de outra conta (RNF03)', async () => {
    const dona = await preparar();
    const outra = await preparar();
    await dona.concluir().expect(200);
    expect((await outra.concluidas().expect(200)).body).toEqual([]);
  });

  it.each([
    ['inexistente', randomUUID(), 404],
    ['inválido', 'nao-uuid', 400],
  ] as const)('recusa id %s', async (_nome, id, status) => {
    const c = await preparar();
    await c.concluir(id).expect(status);
    expect((await c.consultar().expect(200)).body).toEqual(c.tarefa);
  });

  it('exige sessão na conclusão e na lista de concluídas', async () => {
    await request(servidor())
      .post(`/tarefas/${randomUUID()}/conclusao`)
      .send({})
      .expect(401);
    await request(servidor()).get('/tarefas/concluidas').expect(401);
  });
});
