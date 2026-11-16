import { execSync } from 'node:child_process';
import type { TestProject } from 'vitest/node';
import pg from 'pg';

/** Cria o banco de teste se ele não existir e aplica as migrações. */
export default async function setup(project: TestProject) {
  const url = new URL(project.config.env.DATABASE_URL as string);
  const banco = url.pathname.slice(1);

  const servidor = new URL(url);
  servidor.pathname = '/postgres';
  const cliente = new pg.Client({ connectionString: servidor.toString() });
  await cliente.connect();
  try {
    const { rowCount } = await cliente.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [banco],
    );
    if (!rowCount) {
      await cliente.query(`CREATE DATABASE "${banco}"`);
    }
  } finally {
    await cliente.end();
  }

  // execSync passa pelo shell do sistema: no Windows o npx é npx.cmd, que o
  // execFileSync não acha sem shell (spawnSync npx ENOENT).
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: url.toString() },
    stdio: 'inherit',
  });
}
