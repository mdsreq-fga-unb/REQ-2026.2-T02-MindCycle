import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { z } from 'zod';
import {
  inicioMenstruacaoSchema,
  perfilCicloSchema,
  type Ciclo,
  type InicioMenstruacao,
  type InicioMenstruacaoDto,
  type PerfilCiclo,
  type PerfilCicloDto,
} from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { ConsentGuard } from '../consent/consent.guard.js';
import { CicloService } from './ciclo.service.js';

@Controller('ciclo')
export class CicloController {
  constructor(private readonly ciclo: CicloService) {}

  @Get()
  consultar(@CurrentUser() usuaria: UsuariaAutenticada): Promise<Ciclo> {
    return this.ciclo.consultar(usuaria);
  }

  @Post('inicios')
  @UseGuards(ConsentGuard)
  registrarInicio(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: inicioMenstruacaoSchema }) dados: InicioMenstruacaoDto,
  ): Promise<InicioMenstruacao> {
    return this.ciclo.registrarInicio(usuaria, dados.data);
  }

  // Sem ConsentGuard: apagar o próprio dado não pode depender do aceite.
  @Delete('inicios/:id')
  @HttpCode(204)
  removerInicio(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
  ): Promise<void> {
    return this.ciclo.removerInicio(usuaria.id, id);
  }

  @Put('perfil')
  @UseGuards(ConsentGuard)
  informarPerfil(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: perfilCicloSchema }) dados: PerfilCicloDto,
  ): Promise<PerfilCiclo> {
    return this.ciclo.informarPerfil(usuaria.id, dados);
  }
}
