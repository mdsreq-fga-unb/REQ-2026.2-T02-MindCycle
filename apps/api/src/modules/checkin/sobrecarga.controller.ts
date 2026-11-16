import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import type { SinalizacaoSobrecarga } from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { ConsentGuard } from '../consent/consent.guard.js';
import { SobrecargaService } from './sobrecarga.service.js';

@Controller('sobrecarga')
export class SobrecargaController {
  constructor(private readonly sobrecarga: SobrecargaService) {}

  /**
   * HU02. A sinalização vale como disposição baixa, então passa pelo
   * ConsentGuard (RNF02). A rota não lê corpo: a conta vem só do token (RNF03).
   */
  @Post()
  @UseGuards(ConsentGuard)
  sinalizar(
    @CurrentUser() usuaria: UsuariaAutenticada,
  ): Promise<SinalizacaoSobrecarga> {
    return this.sobrecarga.sinalizar(usuaria);
  }
}
