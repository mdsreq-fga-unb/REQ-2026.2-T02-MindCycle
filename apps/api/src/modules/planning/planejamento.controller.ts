import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import type { RecomendacaoDoDia } from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { PlanejamentoService } from './planejamento.service.js';

// Sem ConsentGuard: a rota só lê, como GET /checkins/hoje; o RNF02 vale para
// as rotas que gravam ciclo, sintoma ou disposição.
@Controller('planejamento')
export class PlanejamentoController {
  constructor(private readonly planejamento: PlanejamentoService) {}

  /** HU13: as tarefas do dia em ordem de precedência. */
  @Get('hoje')
  hoje(@CurrentUser() usuaria: UsuariaAutenticada): Promise<RecomendacaoDoDia> {
    return this.planejamento.recomendacaoDoDia(usuaria);
  }
}
