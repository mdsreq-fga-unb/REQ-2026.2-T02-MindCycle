import { Module } from '@nestjs/common';
import { ConsentModule } from '../consent/consent.module.js';
import { ContaController } from './conta.controller.js';
import { UsuariasRepository } from './usuarias.repository.js';

@Module({
  imports: [ConsentModule],
  controllers: [ContaController],
  providers: [UsuariasRepository],
  exports: [UsuariasRepository],
})
export class AccountModule {}
