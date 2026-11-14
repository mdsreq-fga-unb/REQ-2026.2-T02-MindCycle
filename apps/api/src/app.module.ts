import { Module, StandardSchemaValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from '@nestjs/authentication';
import { MailModule, SmtpTransport } from '@nestjs/mail';
import { TerminusModule } from '@nestjs/terminus';
import { RelogioModule } from './common/relogio.js';
import { type Ambiente, validarAmbiente } from './common/ambiente.js';
import { AccountModule } from './modules/account/account.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ConsentModule } from './modules/consent/consent.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SaudeController } from './saude.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validarAmbiente }),
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
    // E-mail da recuperação de acesso (HU26): Mailpit no desenvolvimento, o provedor
    // em produção, onde a conexão exige TLS (SMTP_STARTTLS).
    MailModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        from: config.getOrThrow<string>('EMAIL_REMETENTE'),
        transport: new SmtpTransport({
          url: config.getOrThrow<string>('SMTP_URL'),
          startTls: config.getOrThrow<Ambiente['SMTP_STARTTLS']>('SMTP_STARTTLS'),
          timeouts: { connect: '10s', greeting: '10s', command: '30s', data: '1m' },
        }),
      }),
    }),
    TerminusModule,
    PrismaModule,
    RelogioModule,
    AuthModule,
    AccountModule,
    ConsentModule,
  ],
  controllers: [SaudeController],
  providers: [{ provide: APP_PIPE, useClass: StandardSchemaValidationPipe }],
})
export class AppModule {}
