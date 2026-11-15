import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { TERMOS } from '../src/modules/consent/termos.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Ciclo (HU06, HU07)', () => {
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

  async function novaConta({ aceitar = true } = {}) {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(accessToken, { type: 'bearer' });
    if (aceitar) {
      await auth(request(servidor()).post('/termos/aceite'))
        .send({ versao: TERMOS.versao })
        .expect(204);
    }
    const { body } = await auth(request(servidor()).get('/conta')).expect(200);
    return {
      id: body.id as string,
      consultar: () => auth(request(servidor()).get('/ciclo')),
      registrar: (data: unknown) =>
        auth(request(servidor()).post('/ciclo/inicios')).send({ data }),
      remover: (id: string) =>
        auth(request(servidor()).delete(`/ciclo/inicios/${id}`)),
      informar: (perfil: unknown) =>
        auth(request(servidor()).put('/ciclo/perfil')).send(perfil as object),
    };
  }

  describe('início da menstruação', () => {
    it('começa sem nada registrado', async () => {
      const conta = await novaConta();
      const { body } = await conta.consultar().expect(200);
      expect(body).toEqual({ inicios: [], perfil: null });
    });

    it('registra e lista, do mais recente para o mais antigo', async () => {
      const conta = await novaConta();
      const antigo = await conta.registrar('2026-10-02').expect(201);
      const recente = await conta.registrar(HOJE).expect(201);
      expect(antigo.body).toEqual({
        id: expect.any(String),
        data: '2026-10-02',
      });
      expect(recente.body.data).toBe(HOJE);

      const { body } = await conta.consultar().expect(200);
      expect(body.inicios).toEqual([
        { id: recente.body.id, data: HOJE },
        { id: antigo.body.id, data: '2026-10-02' },
      ]);
    });

    it('recusa data no futuro pelo "hoje" da usuária, não o de UTC', async () => {
      const conta = await novaConta();
      // 15/11 já é hoje em UTC, mas ainda é amanhã em São Paulo.
      const { body } = await conta.registrar('2026-11-15').expect(400);
      expect(body.codigo).toBe(CodigoErro.DataNoFuturo);
      await conta.registrar('2027-01-01').expect(400);
      expect((await conta.consultar()).body.inicios).toEqual([]);
    });

    it('registrar a mesma data de novo devolve o registro existente', async () => {
      const conta = await novaConta();
      const primeiro = await conta.registrar('2026-11-01').expect(201);
      const segundo = await conta.registrar('2026-11-01').expect(201);
      expect(segundo.body).toEqual(primeiro.body);
      expect((await conta.consultar()).body.inicios).toHaveLength(1);
    });

    it('recusa data que não é uma data de calendário', async () => {
      const conta = await novaConta();
      for (const data of [
        '2026-02-30',
        '01/11/2026',
        '',
        20261101,
        undefined,
      ]) {
        await conta.registrar(data).expect(400);
      }
    });

    it('corrige um registro errado apagando-o', async () => {
      const conta = await novaConta();
      const { body: errado } = await conta.registrar('2026-11-05').expect(201);
      await conta.registrar('2026-11-03').expect(201);

      await conta.remover(errado.id).expect(204);
      expect(
        (await conta.consultar()).body.inicios.map(
          (i: { data: string }) => i.data,
        ),
      ).toEqual(['2026-11-03']);
      await conta.remover(errado.id).expect(404);
    });

    it('trata id inexistente como 404 e id que não é uuid como 400', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .remover('00000000-0000-4000-8000-000000000000')
        .expect(404);
      expect(body.codigo).toBe(CodigoErro.NaoEncontrado);
      await conta.remover('nao-e-um-uuid').expect(400);
    });
  });

  describe('características do ciclo', () => {
    it('guarda a duração média', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .informar({ irregular: false, duracaoMedia: 28 })
        .expect(200);
      expect(body).toEqual({ duracaoMedia: 28, irregular: false });
      expect((await conta.consultar()).body.perfil).toEqual(body);
    });

    it('guarda o ciclo irregular sem duração, mesmo que ela venha junto', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .informar({ irregular: true, duracaoMedia: 28 })
        .expect(200);
      expect(body).toEqual({ duracaoMedia: null, irregular: true });
    });

    it('atualizar o perfil troca os valores sem criar outro registro', async () => {
      const conta = await novaConta();
      await conta.informar({ irregular: false, duracaoMedia: 30 }).expect(200);
      await conta.informar({ irregular: true }).expect(200);
      expect((await conta.consultar()).body.perfil).toEqual({
        duracaoMedia: null,
        irregular: true,
      });

      await conta.informar({ irregular: false, duracaoMedia: 26 }).expect(200);
      expect((await conta.consultar()).body.perfil).toEqual({
        duracaoMedia: 26,
        irregular: false,
      });
      const prisma = app.get(PrismaService);
      expect(
        await prisma.perfilCiclo.count({ where: { usuariaId: conta.id } }),
      ).toBe(1);
    });

    it('recusa duração inválida ou perfil incompleto', async () => {
      const conta = await novaConta();
      const invalidos = [
        { irregular: false },
        { irregular: false, duracaoMedia: 14 },
        { irregular: false, duracaoMedia: 61 },
        { irregular: false, duracaoMedia: 28.5 },
        { irregular: false, duracaoMedia: '28' },
        { irregular: false, duracaoMedia: 0 },
        { duracaoMedia: 28 },
        {},
      ];
      for (const perfil of invalidos) {
        await conta.informar(perfil).expect(400);
      }
      await conta.informar({ irregular: false, duracaoMedia: 15 }).expect(200);
      await conta.informar({ irregular: false, duracaoMedia: 60 }).expect(200);
      expect((await conta.consultar()).body.perfil).toEqual({
        duracaoMedia: 60,
        irregular: false,
      });
    });
  });

  describe('consentimento (RNF02)', () => {
    it('não grava nada antes do aceite dos termos', async () => {
      const conta = await novaConta({ aceitar: false });

      const inicio = await conta.registrar(HOJE).expect(403);
      expect(inicio.body.codigo).toBe(CodigoErro.ConsentimentoPendente);
      const perfil = await conta.informar({ irregular: true }).expect(403);
      expect(perfil.body.codigo).toBe(CodigoErro.ConsentimentoPendente);

      const prisma = app.get(PrismaService);
      expect(
        await prisma.inicioMenstruacao.count({
          where: { usuariaId: conta.id },
        }),
      ).toBe(0);
      expect(
        await prisma.perfilCiclo.count({ where: { usuariaId: conta.id } }),
      ).toBe(0);
    });

    it('a consulta continua disponível sem aceite, vazia', async () => {
      const conta = await novaConta({ aceitar: false });
      const { body } = await conta.consultar().expect(200);
      expect(body).toEqual({ inicios: [], perfil: null });
    });

    it('apagar o próprio registro não depende do aceite', async () => {
      const conta = await novaConta({ aceitar: false });
      const prisma = app.get(PrismaService);
      // Um registro anterior ao aceite não poderia existir; o plantamos direto no banco.
      const { id } = await prisma.inicioMenstruacao.create({
        data: { usuariaId: conta.id, data: new Date('2026-11-01T00:00:00Z') },
      });
      await conta.remover(id).expect(204);
    });
  });

  describe('acesso exclusivo da usuária (RNF03)', () => {
    it('não deixa a sessão de outra conta apagar ou ver o registro alheio', async () => {
      const dona = await novaConta();
      const outra = await novaConta();
      const { body: inicio } = await dona.registrar('2026-11-01').expect(201);
      await dona.informar({ irregular: false, duracaoMedia: 29 }).expect(200);

      const { body } = await outra.remover(inicio.id).expect(403);
      expect(body.codigo).toBe(CodigoErro.AcessoNegado);

      expect((await dona.consultar()).body.inicios).toEqual([
        { id: inicio.id, data: '2026-11-01' },
      ]);
      expect((await outra.consultar()).body).toEqual({
        inicios: [],
        perfil: null,
      });
    });

    it('registrar e informar só afetam a conta da sessão', async () => {
      const a = await novaConta();
      const b = await novaConta();
      await a.registrar('2026-11-02').expect(201);
      await b.registrar('2026-11-02').expect(201);
      await a.informar({ irregular: true }).expect(200);

      expect((await b.consultar()).body.inicios).toHaveLength(1);
      expect((await b.consultar()).body.perfil).toBeNull();
    });

    it('exige sessão', async () => {
      await request(servidor()).get('/ciclo').expect(401);
      await request(servidor())
        .post('/ciclo/inicios')
        .send({ data: HOJE })
        .expect(401);
      await request(servidor())
        .put('/ciclo/perfil')
        .send({ irregular: true })
        .expect(401);
    });
  });

  it('apagar a usuária remove os inícios e o perfil dela (cascata)', async () => {
    const conta = await novaConta();
    await conta.registrar('2026-11-01').expect(201);
    await conta.registrar('2026-10-03').expect(201);
    await conta.informar({ irregular: false, duracaoMedia: 28 }).expect(200);

    const prisma = app.get(PrismaService);
    await prisma.usuaria.delete({ where: { id: conta.id } });

    expect(
      await prisma.inicioMenstruacao.count({ where: { usuariaId: conta.id } }),
    ).toBe(0);
    expect(
      await prisma.perfilCiclo.count({ where: { usuariaId: conta.id } }),
    ).toBe(0);
  });
});
