import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CurrentUser, Public } from '@nestjs/authentication';
import { aceiteSchema, type AceiteDto, type Termos } from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { ConsentService } from './consent.service.js';
import { TERMOS } from './termos.js';

@Controller('termos')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  // Público: a usuária pode ler os termos antes de criar a conta.
  @Public()
  @Get()
  vigentes(): Termos {
    return TERMOS;
  }

  @Post('aceite')
  @HttpCode(204)
  async aceitar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: aceiteSchema }) body: AceiteDto,
  ): Promise<void> {
    await this.consentService.aceitar(usuaria.id, body.versao);
  }
}
