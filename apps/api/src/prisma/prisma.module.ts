import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

// Global: quase todo módulo de domínio lê ou grava no banco.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
