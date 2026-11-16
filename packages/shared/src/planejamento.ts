import type { DataLocal } from './datas.js';
import type { Nivel, Tarefa } from './tarefas.js';

// HU13. As regras de ordem são proposta da equipe (08/11/2026) e aguardam a
// validação da cliente: elas moram só na função `recomendar` da API e nos testes
// dela, para que uma mudança fique restrita a esses dois arquivos.

/** Sem registro de disposição no dia, o cálculo assume média (HU13). */
export const DISPOSICAO_PADRAO: Nivel = 2;

/**
 * Os grupos da recomendação, nesta ordem:
 * 1. prazo hoje ou vencido;
 * 2. energia necessária menor ou igual à disposição;
 * 3. energia necessária acima da disposição.
 */
export type GrupoRecomendacao = 1 | 2 | 3;

export interface TarefaRecomendada extends Tarefa {
  grupo: GrupoRecomendacao;
  /**
   * Tarefa urgente (grupo 1) que pede mais energia do que a disposição: o app
   * mostra, sem cobrança, que ela pode ser adiada (HU18).
   */
  avisoAdiamento: boolean;
}

export interface RecomendacaoDoDia {
  /** O dia da recomendação, no calendário da usuária. */
  hoje: DataLocal;
  /** A disposição usada no cálculo: a do registro mais recente do dia (HU04). */
  disposicao: Nivel;
  /** Sem registro no dia: a disposição é a média assumida. */
  disposicaoAssumida: boolean;
  /** As tarefas do dia, na ordem de precedência. */
  tarefas: TarefaRecomendada[];
}
