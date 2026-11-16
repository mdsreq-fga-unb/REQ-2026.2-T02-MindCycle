import type { DataLocal } from './datas.js';
import type { Nivel } from './tarefas.js';

// HU02. A usuária sinaliza, a qualquer hora do dia, que está sobrecarregada ou
// indisposta. A sinalização conta como disposição baixa até o próximo registro de
// disposição (HU04): a recomendação do dia (HU13) e o reajuste (HU15) a tratam como
// tratariam esse registro.

/** A disposição que a sinalização de sobrecarga passa a valer no dia. */
export const DISPOSICAO_SOBRECARGA: Nivel = 1;

export interface SinalizacaoSobrecarga {
  id: string;
  /** O dia da sinalização no calendário da usuária. */
  dataLocal: DataLocal;
  /** O instante da sinalização: comparado ao dos registros de disposição do dia. */
  criadoEm: string;
}
