import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import type { Usuaria } from '@mindcycle/shared';
import { ConsentService } from '../consent/consent.service.js';
import type { UsuariaAutenticada } from './usuaria.js';

@Controller('conta')
export class ContaController {
  constructor(private readonly consentService: ConsentService) {}

  @Get()
  async atual(@CurrentUser() usuaria: UsuariaAutenticada): Promise<Usuaria> {
    return {
      ...usuaria,
      termosAceitos: await this.consentService.temConsentimentoVigente(
        usuaria.id,
      ),
    };
  }
}
