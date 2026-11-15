import { Module } from '@nestjs/common';
import { ConsentModule } from '../consent/consent.module.js';
import { CredenciaisService } from './credenciais.service.js';
import { ExclusaoContaService } from './exclusao-conta.service.js';
import { ContaController } from './conta.controller.js';
import { UsuariasRepository } from './usuarias.repository.js';

@Module({
  imports: [ConsentModule],
  controllers: [ContaController],
  providers: [UsuariasRepository, CredenciaisService, ExclusaoContaService],
  // O auth usa o repositório e a verificação de senha; o account não depende do auth.
  exports: [UsuariasRepository, CredenciaisService],
})
export class AccountModule {}
