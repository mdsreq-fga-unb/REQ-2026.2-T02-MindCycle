import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { z } from 'zod';
import {
  cadastroTarefaSchema,
  adiamentoTarefaSchema,
  atualizacaoTarefaSchema,
  type AdiamentoTarefaDto,
  type AtualizacaoTarefaDto,
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

  @Get('concluidas')
  listarConcluidas(
    @CurrentUser() usuaria: UsuariaAutenticada,
  ): Promise<Tarefa[]> {
    return this.tarefas.listarConcluidas(usuaria.id);
  }

  @Get(':id')
  consultar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
  ): Promise<Tarefa> {
    return this.tarefas.consultar(usuaria.id, id);
  }

  @Put(':id')
  editar(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
    @Body({ schema: atualizacaoTarefaSchema }) dados: AtualizacaoTarefaDto,
  ): Promise<Tarefa> {
    return this.tarefas.editar(usuaria.id, id, dados);
  }

  @Delete(':id')
  @HttpCode(204)
  excluir(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
  ): Promise<void> {
    return this.tarefas.excluir(usuaria.id, id);
  }

  @Post(':id/conclusao')
  @HttpCode(200)
  concluir(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('id', { schema: z.uuid() }) id: string,
    @Body({ schema: z.object({}).strict().default({}) })
    _dados: Record<string, never>,
  ): Promise<Tarefa> {
    return this.tarefas.concluir(usuaria.id, id);
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
