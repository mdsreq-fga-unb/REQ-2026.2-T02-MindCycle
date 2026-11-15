import './auth-types.js';
import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module.js';
import { AuthController } from './auth.controller.js';
import { JwtAuth } from './jwt-auth.provider.js';
import { PrismaRefreshTokenStore } from './prisma-refresh-token.store.js';
import { RecuperacaoService } from './recuperacao.service.js';

@Module({
  imports: [AccountModule],
  controllers: [AuthController],
  providers: [JwtAuth, PrismaRefreshTokenStore, RecuperacaoService],
})
export class AuthModule {}
