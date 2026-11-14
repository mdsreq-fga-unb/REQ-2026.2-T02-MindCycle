import { ConfigService } from '@nestjs/config';
import type { AuthenticationStorage } from '@nestjs/authentication';
import { authenticationStoreContract } from '@nestjs/authentication/testing';
import { PrismaRefreshTokenStore } from '../src/modules/auth/prisma-refresh-token.store.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

// Contrato oficial do RefreshTokenStore, com as corridas (concurrent), contra o PostgreSQL.
describe('PrismaRefreshTokenStore', () => {
  const prisma = new PrismaService(new ConfigService(process.env));
  const semRegistro = {
    registerSource() {},
  } as unknown as AuthenticationStorage;
  const store = new PrismaRefreshTokenStore(prisma, semRegistro);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const casos = authenticationStoreContract(() => ({ refreshTokens: store }), {
    contracts: ['refreshTokens'],
    concurrent: true,
  });
  for (const caso of casos) {
    it(caso.name, () => caso.run());
  }
});
