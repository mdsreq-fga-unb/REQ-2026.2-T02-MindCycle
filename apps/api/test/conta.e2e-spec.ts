import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { cadastrar, criarApp, emailUnico } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Data local da usuária (fuso e relógio)', () => {
  let app: INestApplication<App>;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, já 15/11 em Tóquio.
  const relogio = new RelogioFixo(new Date('2026-11-15T02:30:00Z'));

  beforeAll(async () => {
    app = await criarApp({ relogio });
  });

  afterAll(async () => {
    await app.close();
  });

  it('calcula "hoje" no fuso da usuária pelo relógio da API', async () => {
    const { accessToken } = await cadastrar(app);

    const { body } = await request(app.getHttpServer())
      .get('/conta')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(body).toMatchObject({ fuso: 'America/Sao_Paulo', hoje: '2026-11-14' });
  });

  it('atualiza o fuso quando o aparelho muda', async () => {
    const { accessToken } = await cadastrar(app);

    const { body } = await request(app.getHttpServer())
      .patch('/conta')
      .auth(accessToken, { type: 'bearer' })
      .send({ fuso: 'Asia/Tokyo' })
      .expect(200);
    expect(body).toMatchObject({ fuso: 'Asia/Tokyo', hoje: '2026-11-15' });

    const conta = await request(app.getHttpServer())
      .get('/conta')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(conta.body.fuso).toBe('Asia/Tokyo');
  });

  it('recusa fuso inválido no cadastro e na atualização', async () => {
    await request(app.getHttpServer())
      .post('/auth/cadastro')
      .send({ email: emailUnico(), senha: 'senha-de-teste', fuso: 'Brasil/Brasilia' })
      .expect(400);

    const { accessToken } = await cadastrar(app);
    await request(app.getHttpServer())
      .patch('/conta')
      .auth(accessToken, { type: 'bearer' })
      .send({ fuso: 'GMT-3 qualquer' })
      .expect(400);
  });

  it('não deixa atualizar a conta sem sessão', async () => {
    await request(app.getHttpServer())
      .patch('/conta')
      .send({ fuso: 'Asia/Tokyo' })
      .expect(401);
  });
});
