import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { cadastrar, criarApp, emailUnico } from './app.js';

describe('Conta e autenticação (HU25)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    app = await criarApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('cadastra e entra de novo depois de sair', async () => {
    const email = emailUnico();
    const { accessToken, refreshToken } = await cadastrar(
      app,
      `  ${email.toUpperCase()} `,
    );

    const conta = await request(app.getHttpServer())
      .get('/conta')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(conta.body).toMatchObject({
      email,
      fuso: 'America/Sao_Paulo',
      termosAceitos: false,
    });
    expect(conta.body).not.toHaveProperty('senhaHash');

    await request(app.getHttpServer())
      .post('/auth/saida')
      .send({ refreshToken })
      .expect(204);
    await request(app.getHttpServer())
      .post('/auth/renovacao')
      .send({ refreshToken })
      .expect(401);

    const entrada = await request(app.getHttpServer())
      .post('/auth/entrada')
      .send({ email, senha: 'senha-de-teste' })
      .expect(200);
    expect(entrada.body.accessToken).toEqual(expect.any(String));
  });

  it('recusa e-mail já cadastrado', async () => {
    const { email } = await cadastrar(app);
    const { body } = await request(app.getHttpServer())
      .post('/auth/cadastro')
      .send({ email, senha: 'outra-senha', fuso: 'America/Sao_Paulo' })
      .expect(409);
    expect(body.codigo).toBe(CodigoErro.EmailJaCadastrado);
  });

  it('valida o corpo do cadastro', async () => {
    await request(app.getHttpServer())
      .post('/auth/cadastro')
      .send({ email: 'não é e-mail', senha: 'curta' })
      .expect(400);
  });

  it('responde igual para senha errada e e-mail inexistente', async () => {
    const { email } = await cadastrar(app);
    for (const tentativa of [
      { email, senha: 'senha-errada' },
      { email: emailUnico(), senha: 'senha-de-teste' },
    ]) {
      const { body } = await request(app.getHttpServer())
        .post('/auth/entrada')
        .send(tentativa)
        .expect(401);
      expect(body.codigo).toBe(CodigoErro.CredenciaisInvalidas);
    }
  });

  it('exige token nas rotas privadas', async () => {
    await request(app.getHttpServer()).get('/conta').expect(401);
  });

  it('renova o token e revoga a família quando um refresh é reutilizado', async () => {
    const { refreshToken } = await cadastrar(app);

    const renovada = await request(app.getHttpServer())
      .post('/auth/renovacao')
      .send({ refreshToken })
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/renovacao')
      .send({ refreshToken })
      .expect(401);
    // O reuso indica roubo: nem o sucessor legítimo vale mais.
    await request(app.getHttpServer())
      .post('/auth/renovacao')
      .send({ refreshToken: renovada.body.refreshToken })
      .expect(401);
  });
});
