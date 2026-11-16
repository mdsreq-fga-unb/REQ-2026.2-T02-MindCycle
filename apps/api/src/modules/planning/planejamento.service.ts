import { Injectable } from '@nestjs/common';
import type { RecomendacaoDoDia } from '@mindcycle/shared';
import { Relogio } from '../../common/relogio.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { CheckinService } from '../checkin/checkin.service.js';
import { TarefasService } from '../tasks/tarefas.service.js';
import { recomendar } from './domain/recomendar.js';

/** Carrega as tarefas e a disposição do dia e entrega as regras ao domínio. */
@Injectable()
export class PlanejamentoService {
  constructor(
    private readonly tarefas: TarefasService,
    private readonly checkins: CheckinService,
    private readonly relogio: Relogio,
  ) {}

  // HU13. As duas leituras correm juntas: a recomendação deve aparecer em até
  // 3 s depois do acesso (RNF06).
  async recomendacaoDoDia(
    usuaria: UsuariaAutenticada,
  ): Promise<RecomendacaoDoDia> {
    const hoje = this.relogio.hoje(usuaria.fuso);
    const [tarefas, disposicao] = await Promise.all([
      this.tarefas.abertasAte(usuaria.id, hoje),
      this.checkins.disposicaoVigente(usuaria),
    ]);
    return recomendar(tarefas, disposicao, hoje);
  }
}
