import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { z } from 'zod';
import {
  limiteCheckinsSchema,
  registroCheckinSchema,
  type Checkin,
  type CheckinsDoDia,
  type RegistroCheckinDto,
} from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { ConsentGuard } from '../consent/consent.guard.js';
import { CheckinService } from './checkin.service.js';

@Controller('checkins')
export class CheckinController {
  constructor(private readonly checkins: CheckinService) {}

  @Post()
  @UseGuards(ConsentGuard)
  registrar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: registroCheckinSchema }) dados: RegistroCheckinDto,
  ): Promise<Checkin> {
    return this.checkins.registrar(usuaria, dados);
  }

  @Get('hoje')
  hoje(@CurrentUser() usuaria: UsuariaAutenticada): Promise<CheckinsDoDia> {
    return this.checkins.doDia(usuaria);
  }

  @Get()
  historico(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Query('limite', { schema: limiteCheckinsSchema }) limite: number,
  ): Promise<Checkin[]> {
    return this.checkins.historico(usuaria.id, limite);
  }

  @Put(':id')
  @UseGuards(ConsentGuard)
  corrigir(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
    @Body({ schema: registroCheckinSchema }) dados: RegistroCheckinDto,
  ): Promise<Checkin> {
    return this.checkins.corrigir(usuaria.id, id, dados);
  }
}
