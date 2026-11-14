import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import {
  atualizacaoContaSchema,
  type AtualizacaoContaDto,
  type Usuaria,
} from '@mindcycle/shared';
import { Relogio } from '../../common/relogio.js';
import { ConsentService } from '../consent/consent.service.js';
import { UsuariasRepository } from './usuarias.repository.js';
import type { UsuariaAutenticada } from './usuaria.js';

@Controller('conta')
export class ContaController {
  constructor(
    private readonly consentService: ConsentService,
    private readonly usuarias: UsuariasRepository,
    private readonly relogio: Relogio,
  ) {}

  @Get()
  atual(@CurrentUser() usuaria: UsuariaAutenticada): Promise<Usuaria> {
    return this.paraResposta(usuaria);
  }

  @Patch()
  async atualizar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: atualizacaoContaSchema }) dados: AtualizacaoContaDto,
  ): Promise<Usuaria> {
    return this.paraResposta(
      await this.usuarias.atualizarFuso(usuaria.id, dados.fuso),
    );
  }

  private async paraResposta(usuaria: UsuariaAutenticada): Promise<Usuaria> {
    return {
      ...usuaria,
      hoje: this.relogio.hoje(usuaria.fuso),
      termosAceitos: await this.consentService.temConsentimentoVigente(
        usuaria.id,
      ),
    };
  }
}
