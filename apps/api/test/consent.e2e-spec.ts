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
});
