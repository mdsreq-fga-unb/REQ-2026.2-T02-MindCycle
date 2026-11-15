import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import {
  definicaoPinSchema,
  remocaoPinSchema,
  verificacaoPinSchema,
  type DefinicaoPinDto,
  type RemocaoPinDto,
  type VerificacaoPinDto,
} from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { PinService } from './pin.service.js';

// HU11. Sem ConsentGuard: o PIN não é dado de ciclo, sintoma nem disposição.
// O userId vem sempre do token (RNF03): uma sessão só mexe no PIN da própria conta.
@Controller('conta/pin')
export class PinController {
  constructor(private readonly pin: PinService) {}

  // Define ou troca o PIN e o tipo: exige a senha da conta.
  @Put()
  @HttpCode(204)
  async definir(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: definicaoPinSchema }) body: DefinicaoPinDto,
  ): Promise<void> {
    await this.pin.definir(usuaria, body.tipo, body.pin, body.senha);
  }

  @Delete()
  @HttpCode(204)
  async remover(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: remocaoPinSchema }) body: RemocaoPinDto,
  ): Promise<void> {
    await this.pin.remover(usuaria, body.senha);
  }

  // Destrava o app; o servidor conta os erros para o limite valer de verdade.
  @Post('verificacao')
  @HttpCode(204)
  async verificar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: verificacaoPinSchema }) body: VerificacaoPinDto,
  ): Promise<void> {
    await this.pin.verificar(usuaria.id, body.pin);
  }
}
