import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import {
  atualizacaoContaSchema,
  exclusaoContaSchema,
  type AtualizacaoContaDto,
  type ExclusaoContaDto,
  type Usuaria,
} from '@mindcycle/shared';
import { Relogio } from '../../common/relogio.js';
import { ConsentService } from '../consent/consent.service.js';
import { ExclusaoContaService } from './exclusao-conta.service.js';
import { UsuariasRepository } from './usuarias.repository.js';
import type { UsuariaAutenticada } from './usuaria.js';

@Controller('conta')
export class ContaController {
  constructor(
    private readonly consentService: ConsentService,
    private readonly usuarias: UsuariasRepository,
    private readonly relogio: Relogio,
    private readonly exclusao: ExclusaoContaService,
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

  // HU36. Sem ConsentGuard: excluir não pode depender de aceite. Sem id na rota
  // (RNF03): a conta excluída é sempre a da sessão.
  @Post('exclusao')
  @HttpCode(204)
  async excluir(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: exclusaoContaSchema }) { senha }: ExclusaoContaDto,
  ): Promise<void> {
    await this.exclusao.excluir(usuaria, senha);
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
