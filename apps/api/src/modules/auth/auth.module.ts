import './auth-types.js';
import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module.js';
import { AuthController } from './auth.controller.js';
import { CredenciaisService } from './credenciais.service.js';
import { JwtAuth } from './jwt-auth.provider.js';
import { PrismaRefreshTokenStore } from './prisma-refresh-token.store.js';

@Module({
  imports: [AccountModule],
  controllers: [AuthController],
  providers: [JwtAuth, PrismaRefreshTokenStore, CredenciaisService],
})
export class AuthModule {}
