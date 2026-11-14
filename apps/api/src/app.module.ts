import { Module, StandardSchemaValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from '@nestjs/authentication';
import { AccountModule } from './modules/account/account.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ConsentModule } from './modules/consent/consent.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SaudeController } from './saude.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Registra o guard global: toda rota exige usuária autenticada, exceto @Public().
    AuthenticationModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        accessToken: {
          key: config.getOrThrow<string>('JWT_SECRET'),
          issuer: 'mindcycle-api',
          audience: 'mindcycle-app',
          ttl: '15m',
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    AccountModule,
    ConsentModule,
  ],
  controllers: [SaudeController],
  providers: [{ provide: APP_PIPE, useClass: StandardSchemaValidationPipe }],
})
export class AppModule {}
