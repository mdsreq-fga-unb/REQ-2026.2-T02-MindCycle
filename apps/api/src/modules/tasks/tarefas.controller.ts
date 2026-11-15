import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { z } from 'zod';
import {
  cadastroTarefaSchema,
  adiamentoTarefaSchema,
  type AdiamentoTarefaDto,
  type CadastroTarefaDto,
  type Tarefa,
} from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { TarefasService } from './tarefas.service.js';

// Sem ConsentGuard: tarefa não é dado de ciclo, sintoma ou disposição (RNF02).
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefas: TarefasService) {}

  @Post()
  cadastrar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Body({ schema: cadastroTarefaSchema }) dados: CadastroTarefaDto,
  ): Promise<Tarefa> {
    return this.tarefas.cadastrar(usuaria, dados);
  }

  @Get()
  listar(@CurrentUser() usuaria: UsuariaAutenticada): Promise<Tarefa[]> {
    return this.tarefas.listar(usuaria.id);
  }

  @Get(':id')
  consultar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
  ): Promise<Tarefa> {
    return this.tarefas.consultar(usuaria.id, id);
  }

  @Patch(':id/adiamento')
  adiar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
    @Body({ schema: adiamentoTarefaSchema }) dados: AdiamentoTarefaDto,
  ): Promise<Tarefa> {
    return this.tarefas.adiar(usuaria, id, dados);
  }
}
