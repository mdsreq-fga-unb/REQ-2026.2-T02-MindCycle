import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { Mailer } from '@nestjs/mail';
import { criarApp } from './app.js';

describe('Prontidão para hospedagem', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    app = await criarApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('responde à verificação de saúde conferindo o banco', async () => {
    const { body } = await request(app.getHttpServer()).get('/saude').expect(200);
    expect(body).toMatchObject({ status: 'ok', info: { banco: { status: 'up' } } });
  });

  it('entrega o e-mail por SMTP (Mailpit nos testes)', async () => {
    const assunto = `Teste de envio ${randomUUID()}`;
    await app.get(Mailer).send({
      to: 'usuaria@exemplo.com',
      subject: assunto,
      text: 'Mensagem de teste.',
    });

    const mensagem = await buscarNoMailpit(assunto);
    expect(mensagem).toMatchObject({
      Subject: assunto,
      To: [{ Address: 'usuaria@exemplo.com' }],
    });
  });
});

async function buscarNoMailpit(assunto: string) {
  const url = new URL('/api/v1/search', process.env.MAILPIT_API_URL);
  url.searchParams.set('query', `subject:"${assunto}"`);
  // O Mailpit indexa a mensagem logo depois de recebê-la; espera um pouco.
  for (let tentativa = 0; tentativa < 20; tentativa++) {
    const { messages } = (await (await fetch(url)).json()) as {
      messages: { Subject: string }[];
    };
    if (messages.length > 0) {
      return messages[0];
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  return undefined;
}
