import { Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { z } from 'zod';
import type { RecomendacaoReajustada } from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { PlanejamentoService } from './planejamento.service.js';

// Sem ConsentGuard: as rotas leem a disposição e mudam só a data planejada das
// tarefas; o RNF02 vale para as rotas que gravam ciclo, sintoma ou disposição.
@Controller('planejamento')
export class PlanejamentoController {
  constructor(private readonly planejamento: PlanejamentoService) {}

  /**
   * HU13: as tarefas do dia em ordem de precedência. HU15: já reajustadas pela
   * disposição vigente, com as que passaram para amanhã.
   */
  @Get('hoje')
  hoje(@CurrentUser() usuaria: UsuariaAutenticada): Promise<RecomendacaoReajustada> {
    return this.planejamento.recomendacaoDoDia(usuaria);
  }

  /** HU15: traz de volta para o dia uma tarefa que o reajuste de hoje moveu. */
  @Post('hoje/movidas/:tarefaId/desfazimento')
  @HttpCode(HttpStatus.OK)
  desfazer(
    @CurrentUser() usuaria: UsuariaAutenticada,
    @Param('tarefaId', { schema: z.uuid() }) tarefaId: string,
  ): Promise<RecomendacaoReajustada> {
    return this.planejamento.desfazerReajuste(usuaria, tarefaId);
  }
}
