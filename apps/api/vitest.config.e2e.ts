import 'dotenv/config';
import { configDefaults, defineConfig } from 'vitest/config';

// Os e2e rodam num banco à parte: o de DATABASE_URL_TEST ou, sem ela, o de
// DATABASE_URL com o nome trocado para mindcycle_test. setup-e2e.ts cria o
// banco se preciso e aplica as migrações.
function urlDoBancoDeTeste(): string {
  if (process.env.DATABASE_URL_TEST) {
    return process.env.DATABASE_URL_TEST;
  }
  const url = new URL(
    process.env.DATABASE_URL ??
      'postgresql://mindcycle:mindcycle@localhost:5432/mindcycle',
  );
  url.pathname = '/mindcycle_test';
  return url.toString();
}

// O contrato do RefreshTokenStore grava tokens no relógio fixo do pacote
// (nov/2023). Os outros e2e emitem tokens com a data de hoje, e cada
// saveRefreshToken() apaga as famílias vencidas de todo mundo: em paralelo,
// apagaria os tokens do contrato no meio do caso. Por isso o contrato roda
// num grupo à parte, depois dos outros arquivos.
const CONTRATO = 'test/prisma-refresh-token.store.e2e-spec.ts';

// Herdado pelos dois projects. O globalSetup fica só na raiz: com extends,
// cada project rodaria o seu e as migrações correriam três vezes.
const comum = {
  globals: true,
  // Senha e PIN passam pelo hash lento de propósito, e um caso de bloqueio do
  // PIN faz uns 12 deles em série. No runner do CI, com os arquivos em
  // paralelo, isso passa dos 5 s padrão do Vitest.
  testTimeout: 30_000,
  env: {
    DATABASE_URL: urlDoBancoDeTeste(),
    JWT_SECRET:
      process.env.JWT_SECRET || 'segredo-de-teste-com-pelo-menos-32-bytes',
    // Mailpit do docker-compose.yml (npm run db:up) e do CI.
    SMTP_URL: process.env.SMTP_URL_TEST || 'smtp://localhost:1025',
    MAILPIT_API_URL: process.env.MAILPIT_API_URL || 'http://localhost:8025',
  },
};

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    ...comum,
    root: './',
    globalSetup: ['./test/setup-e2e.ts'],
    projects: [
      {
        resolve: { tsconfigPaths: true },
        test: {
          ...comum,
          name: 'e2e',
          include: ['**/*.e2e-spec.ts'],
          exclude: [...configDefaults.exclude, CONTRATO],
          sequence: { groupOrder: 0 },
        },
      },
      {
        resolve: { tsconfigPaths: true },
        test: {
          ...comum,
          name: 'contrato',
          include: [CONTRATO],
          sequence: { groupOrder: 1 },
        },
      },
    ],
  },
});
