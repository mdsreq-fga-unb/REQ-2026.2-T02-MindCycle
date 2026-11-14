import 'dotenv/config';
import { defineConfig } from 'vitest/config';

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

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    globalSetup: ['./test/setup-e2e.ts'],
    env: {
      DATABASE_URL: urlDoBancoDeTeste(),
      JWT_SECRET:
        process.env.JWT_SECRET || 'segredo-de-teste-com-pelo-menos-32-bytes',
    },
  },
});
