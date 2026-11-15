import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Tarefas (HU17)', () => {
  let app: INestApplication<App>;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, onde as contas de teste estão.
  const relogio = new RelogioFixo(new Date('2026-11-15T02:30:00Z'));
  const HOJE = '2026-11-14';

  beforeAll(async () => {
    app = await criarApp({ relogio });
  });

  afterAll(async () => {
    await app.close();
  });

  const servidor = () => app.getHttpServer();

  const tarefaCompleta = {
    titulo: 'Entregar o relatório',
    prazo: '2026-11-20',
    prioridade: 3,
    energia: 2,
    duracaoMinutos: 90,
  };

  async function novaConta() {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(accessToken, { type: 'bearer' });
    const { body } = await auth(request(servidor()).get('/conta')).expect(200);
    return {
      id: body.id as string,
      cadastrar: (dados: unknown) =>
        auth(request(servidor()).post('/tarefas')).send(dados as object),
      listar: () => auth(request(servidor()).get('/tarefas')),
      consultar: (id: string) =>
        auth(request(servidor()).get(`/tarefas/${id}`)),
    };
  }

  describe('cadastro', () => {
    it('registra a tarefa com todos os campos, planejada para hoje', async () => {
      const conta = await novaConta();
      const { body } = await conta.cadastrar(tarefaCompleta).expect(201);
      expect(body).toEqual({
        id: expect.any(String),
        titulo: 'Entregar o relatório',
        prazo: '2026-11-20',
        prioridade: 3,
        energia: 2,
        duracaoMinutos: 90,
        dataPlanejada: HOJE,
        criadaEm: expect.any(String),
      });
    });

    it('planeja para o hoje da usuária, não o de UTC', async () => {
      // Às 02:30 UTC de 15/11 ainda é 14/11 em São Paulo; às 12:00 UTC já é 15/11.
      const conta = await novaConta();
      relogio.ajustar(new Date('2026-11-15T02:30:00Z'));
      const naVirada = await conta.cadastrar(tarefaCompleta).expect(201);
      expect(naVirada.body.dataPlanejada).toBe('2026-11-14');

      relogio.ajustar(new Date('2026-11-15T12:00:00Z'));
      try {
        const depois = await conta
          .cadastrar({ ...tarefaCompleta, prazo: '2026-11-15' })
          .expect(201);
        expect(depois.body.dataPlanejada).toBe('2026-11-15');
      } finally {
        relogio.ajustar(new Date('2026-11-15T02:30:00Z'));
      }
    });

    it('aceita a tarefa sem duração', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .cadastrar({ ...tarefaCompleta, duracaoMinutos: undefined })
        .expect(201);
      expect(body.duracaoMinutos).toBeNull();
    });

    it('guarda o título sem os espaços das pontas', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .cadastrar({ ...tarefaCompleta, titulo: '  Regar as plantas  ' })
        .expect(201);
      expect(body.titulo).toBe('Regar as plantas');
    });

    it.each([
      ['sem título', { titulo: undefined }],
      ['sem prazo', { prazo: undefined }],
      ['sem prioridade', { prioridade: undefined }],
      ['sem energia', { energia: undefined }],
      ['com título só de espaços', { titulo: '   ' }],
      ['com título acima de 120 caracteres', { titulo: 'a'.repeat(121) }],
      ['com prazo que não é uma data', { prazo: '2026-02-30' }],
      ['com prioridade 0', { prioridade: 0 }],
      ['com prioridade 4', { prioridade: 4 }],
      ['com energia 0', { energia: 0 }],
      ['com energia 4', { energia: 4 }],
      ['com duração 0', { duracaoMinutos: 0 }],
      ['com duração abaixo do mínimo', { duracaoMinutos: 4 }],
      ['com duração 721', { duracaoMinutos: 721 }],
      ['com duração fracionada', { duracaoMinutos: 30.5 }],
    ])('recusa a tarefa %s', async (_caso, alteracao) => {
      const conta = await novaConta();
      await conta.cadastrar({ ...tarefaCompleta, ...alteracao }).expect(400);
      const { body } = await conta.listar().expect(200);
      expect(body).toEqual([]);
    });

    it('aceita as pontas dos limites da duração', async () => {
      const conta = await novaConta();
      await conta
        .cadastrar({ ...tarefaCompleta, duracaoMinutos: 5 })
        .expect(201);
      await conta
        .cadastrar({ ...tarefaCompleta, duracaoMinutos: 720 })
        .expect(201);
    });

    it('recusa prazo anterior a hoje', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .cadastrar({ ...tarefaCompleta, prazo: '2026-11-13' })
        .expect(400);
      expect(body.codigo).toBe(CodigoErro.PrazoNoPassado);
    });

    it('aceita prazo igual a hoje', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .cadastrar({ ...tarefaCompleta, prazo: HOJE })
        .expect(201);
      expect(body.prazo).toBe(HOJE);
      expect(body.dataPlanejada).toBe(HOJE);
    });

    it('não exige o aceite dos termos', async () => {
      // novaConta não aceita os termos: tarefa não é dado de ciclo, sintoma ou disposição.
      const conta = await novaConta();
      await conta.cadastrar(tarefaCompleta).expect(201);
    });

    it('exige sessão', async () => {
      await request(servidor())
        .post('/tarefas')
        .send(tarefaCompleta)
        .expect(401);
      await request(servidor()).get('/tarefas').expect(401);
    });
  });

  describe('listagem', () => {
    it('traz só as tarefas da própria usuária, por data planejada e cadastro', async () => {
      const ana = await novaConta();
      const bia = await novaConta();
      const primeira = await ana.cadastrar(tarefaCompleta).expect(201);
      const segunda = await ana
        .cadastrar({ ...tarefaCompleta, titulo: 'Outra' })
        .expect(201);
      await bia.cadastrar({ ...tarefaCompleta, titulo: 'Da Bia' }).expect(201);

      const { body } = await ana.listar().expect(200);
      expect(body.map((t: { id: string }) => t.id)).toEqual([
        primeira.body.id,
        segunda.body.id,
      ]);
      const daBia = await bia.listar().expect(200);
      expect(daBia.body.map((t: { titulo: string }) => t.titulo)).toEqual([
        'Da Bia',
      ]);
    });

    it('ordena pela data planejada antes do cadastro', async () => {
      const conta = await novaConta();
      const prisma = app.get(PrismaService);
      const hoje = await conta.cadastrar(tarefaCompleta).expect(201);
      const antes = await conta
        .cadastrar({ ...tarefaCompleta, titulo: 'Planejada antes' })
        .expect(201);
      await prisma.tarefa.update({
        where: { id: antes.body.id },
        data: { dataPlanejada: new Date('2026-11-10T00:00:00Z') },
      });

      const { body } = await conta.listar().expect(200);
      expect(body.map((t: { id: string }) => t.id)).toEqual([
        antes.body.id,
        hoje.body.id,
      ]);
    });

    it('deixa de fora as tarefas concluídas', async () => {
      const conta = await novaConta();
      const prisma = app.get(PrismaService);
      const feita = await conta.cadastrar(tarefaCompleta).expect(201);
      const aberta = await conta
        .cadastrar({ ...tarefaCompleta, titulo: 'Em aberto' })
        .expect(201);
      await prisma.tarefa.update({
        where: { id: feita.body.id },
        data: { concluidaEm: new Date() },
      });

      const { body } = await conta.listar().expect(200);
      expect(body.map((t: { id: string }) => t.id)).toEqual([aberta.body.id]);
    });
  });

  describe('consulta (RNF03)', () => {
    it('devolve a tarefa da própria usuária', async () => {
      const conta = await novaConta();
      const criada = await conta.cadastrar(tarefaCompleta).expect(201);
      const { body } = await conta.consultar(criada.body.id).expect(200);
      expect(body).toEqual(criada.body);
    });

    it('nega o acesso à tarefa de outra conta', async () => {
      const dona = await novaConta();
      const outra = await novaConta();
      const criada = await dona.cadastrar(tarefaCompleta).expect(201);
      const { body } = await outra.consultar(criada.body.id).expect(403);
      expect(body.codigo).toBe(CodigoErro.AcessoNegado);
    });

    it('responde 404 para uma tarefa que não existe', async () => {
      const conta = await novaConta();
      const { body } = await conta.consultar(randomUUID()).expect(404);
      expect(body.codigo).toBe(CodigoErro.NaoEncontrado);
    });

    it('responde 400 para um id que não é uuid', async () => {
      const conta = await novaConta();
      await conta.consultar('nao-e-uuid').expect(400);
    });
  });

  it('apaga as tarefas junto com a usuária', async () => {
    const conta = await novaConta();
    const prisma = app.get(PrismaService);
    await conta.cadastrar(tarefaCompleta).expect(201);
    await conta.cadastrar({ ...tarefaCompleta, titulo: 'Outra' }).expect(201);
    expect(await prisma.tarefa.count({ where: { usuariaId: conta.id } })).toBe(
      2,
    );

    await prisma.usuaria.delete({ where: { id: conta.id } });
    expect(await prisma.tarefa.count({ where: { usuariaId: conta.id } })).toBe(
      0,
    );
  });
});
