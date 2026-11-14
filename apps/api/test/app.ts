import { randomUUID } from 'node:crypto';
import type { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import type { Tokens } from '@mindcycle/shared';
import { AppModule } from '../src/app.module.js';

export async function criarApp(
  extras: { imports?: Type[]; controllers?: Type[] } = {},
): Promise<INestApplication<App>> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule, ...(extras.imports ?? [])],
    controllers: extras.controllers ?? [],
  }).compile();
  const app = moduleRef.createNestApplication<INestApplication<App>>();
  await app.init();
  return app;
}

/** Um e-mail novo por chamada: os testes não dependem de limpar o banco. */
export const emailUnico = () => `teste-${randomUUID()}@exemplo.com`;

export async function cadastrar(
  app: INestApplication<App>,
  email = emailUnico(),
): Promise<Tokens & { email: string }> {
  const { body } = await request(app.getHttpServer())
    .post('/auth/cadastro')
    .send({ email, senha: 'senha-de-teste', fuso: 'America/Sao_Paulo' })
    .expect(201);
  return { ...(body as Tokens), email };
}
