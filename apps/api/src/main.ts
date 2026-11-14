import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  // Autenticação por bearer token, sem cookies: CORS só precisa liberar a origem do app web.
  app.enableCors({
    origin: (process.env.CORS_ORIGINS ?? '').split(',').filter(Boolean),
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
