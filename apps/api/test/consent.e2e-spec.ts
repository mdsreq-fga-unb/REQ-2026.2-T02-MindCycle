import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  type INestApplication,
} from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { ConsentGuard } from '../src/modules/consent/consent.guard.js';
import { ConsentModule } from '../src/modules/consent/consent.module.js';
import { TERMOS } from '../src/modules/consent/termos.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';

// Faz o papel de uma rota que grava dado de saúde.
@Controller('teste-dado-sensivel')
class RotaComDadoSensivel {
  @Post()
  @HttpCode(201)
  @UseGuards(ConsentGuard)
  gravar() {
    return { gravado: true };
  }
}

describe('Termos de uso (HU12, RNF02)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    app = await criarApp({
      imports: [ConsentModule],
      controllers: [RotaComDadoSensivel],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('mostra os termos sem exigir conta', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/termos')
      .expect(200);
    expect(body.versao).toBe(TERMOS.versao);
    expect(body.secoes.length).toBeGreaterThan(0);
  });

  it('permite reler o mesmo texto depois do aceite sem alterar o consentimento', async () => {
    const { accessToken } = await cadastrar(app);
    const servidor = app.getHttpServer();
    const auth = (req: request.Test) =>
      req.auth(accessToken, { type: 'bearer' });
    const { body: antes } = await auth(request(servidor).get('/termos')).expect(
      200,
    );
    await auth(request(servidor).post('/termos/aceite'))
      .send({ versao: TERMOS.versao })
      .expect(204);
    const { body: conta } = await auth(request(servidor).get('/conta')).expect(
      200,
    );
    const prisma = app.get(PrismaService);
    const aceite = await prisma.consentimento.findMany({
      where: { usuariaId: conta.id },
    });
    expect(
      (await auth(request(servidor).get('/termos')).expect(200)).body,
    ).toEqual(antes);
    expect(
      await prisma.consentimento.findMany({ where: { usuariaId: conta.id } }),
    ).toEqual(aceite);
  });

  it('bloqueia a gravação de dado sensível até o aceite', async () => {
    const { accessToken } = await cadastrar(app);
    const servidor = app.getHttpServer();

    const bloqueada = await request(servidor)
      .post('/teste-dado-sensivel')
      .auth(accessToken, { type: 'bearer' })
      .expect(403);
    expect(bloqueada.body.codigo).toBe(CodigoErro.ConsentimentoPendente);

    await request(servidor)
      .post('/termos/aceite')
      .auth(accessToken, { type: 'bearer' })
      .send({ versao: TERMOS.versao })
      .expect(204);

    await request(servidor)
      .post('/teste-dado-sensivel')
      .auth(accessToken, { type: 'bearer' })
      .expect(201);
    const conta = await request(servidor)
      .get('/conta')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(conta.body.termosAceitos).toBe(true);
  });

  it('recusa o aceite de uma versão que não é a vigente', async () => {
    const { accessToken } = await cadastrar(app);
    const { body } = await request(app.getHttpServer())
      .post('/termos/aceite')
      .auth(accessToken, { type: 'bearer' })
      .send({ versao: 'versao-antiga' })
      .expect(409);
    expect(body.codigo).toBe(CodigoErro.VersaoTermosDesatualizada);
  });

  it('protege as rotas reais de ciclo, sintomas e disposição até o aceite', async () => {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(accessToken, { type: 'bearer' });
    const servidor = app.getHttpServer();
    const { body: conta } = await auth(request(servidor).get('/conta')).expect(
      200,
    );
    const ciclo = { data: '2026-01-10' };
    const perfil = { irregular: false, duracaoMedia: 28 };
    const checkin = {
      disposicao: 2,
      semSintomas: false,
      sintomas: [{ sintoma: 'cansaco', intensidade: 1 }],
    };
    for (const res of [
      await auth(request(servidor).post('/ciclo/inicios')).send(ciclo),
      await auth(request(servidor).put('/ciclo/perfil')).send(perfil),
      await auth(request(servidor).post('/checkins')).send(checkin),
    ]) {
      expect(res.status).toBe(403);
      expect(res.body.codigo).toBe(CodigoErro.ConsentimentoPendente);
    }
    const prisma = app.get(PrismaService);
    expect(
      await prisma.inicioMenstruacao.count({ where: { usuariaId: conta.id } }),
    ).toBe(0);
    expect(
      await prisma.perfilCiclo.count({ where: { usuariaId: conta.id } }),
    ).toBe(0);
    expect(await prisma.checkin.count({ where: { usuariaId: conta.id } })).toBe(
      0,
    );
    await auth(request(servidor).post('/termos/aceite'))
      .send({ versao: TERMOS.versao })
      .expect(204);
    await auth(request(servidor).post('/ciclo/inicios'))
      .send(ciclo)
      .expect(201);
    await auth(request(servidor).put('/ciclo/perfil')).send(perfil).expect(200);
    const { body: registro } = await auth(request(servidor).post('/checkins'))
      .send(checkin)
      .expect(201);
    await prisma.consentimento.updateMany({
      where: { usuariaId: conta.id },
      data: { revogadoEm: new Date() },
    });
    await auth(request(servidor).put(`/checkins/${registro.id}`))
      .send({ ...checkin, disposicao: 3 })
      .expect(403);
    expect(
      (await prisma.checkin.findUniqueOrThrow({ where: { id: registro.id } }))
        .disposicao,
    ).toBe(2);
  });

  it('o aceite de uma conta não libera os dados de saúde de outra', async () => {
    const a = await cadastrar(app);
    const b = await cadastrar(app);
    const servidor = app.getHttpServer();
    await request(servidor)
      .post('/termos/aceite')
      .auth(a.accessToken, { type: 'bearer' })
      .send({ versao: TERMOS.versao })
      .expect(204);
    await request(servidor)
      .post('/checkins')
      .auth(b.accessToken, { type: 'bearer' })
      .send({ disposicao: 2, semSintomas: true, sintomas: [] })
      .expect(403);
  });

  it('repetir o aceite preserva o registro existente', async () => {
    const { accessToken } = await cadastrar(app);
    const servidor = app.getHttpServer();
    const { body: conta } = await request(servidor)
      .get('/conta')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    for (let n = 0; n < 2; n++) {
      await request(servidor)
        .post('/termos/aceite')
        .auth(accessToken, { type: 'bearer' })
        .send({ versao: TERMOS.versao })
        .expect(204);
    }
    expect(
      await app
        .get(PrismaService)
        .consentimento.count({ where: { usuariaId: conta.id } }),
    ).toBe(1);
  });
});
