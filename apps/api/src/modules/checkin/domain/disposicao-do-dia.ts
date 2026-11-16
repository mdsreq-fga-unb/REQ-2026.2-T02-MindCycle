import { DISPOSICAO_SOBRECARGA, type Nivel } from '@mindcycle/shared';

// HU02 (issue #85), com a regra da HU15 (issue #84): a sinalização de sobrecarga
// conta como disposição baixa até o próximo registro de disposição. Função pura,
// para que cada caso tenha um teste (disposicao-do-dia.spec.ts).

/** De onde veio a disposição que vale no dia. */
export type OrigemDisposicao = 'registro' | 'sobrecarga';

export interface DisposicaoDoDia {
  disposicao: Nivel;
  origem: OrigemDisposicao;
}

/**
 * Entre o registro de disposição (HU04) e a sinalização de sobrecarga mais
 * recentes do dia, vale o que veio por último. Sem nenhum dos dois, null.
 *
 * Os dois `criadoEm` vêm do mesmo relógio: o `@default(now())` do Prisma 7 é
 * preenchido no processo da API, em milissegundos. Com mais de uma instância da
 * API, a ordem passaria a depender do acerto entre os relógios delas. No empate
 * vale a sobrecarga: na dúvida, o dia fica mais leve.
 *
 * @param checkin o registro mais recente do dia, ou null
 * @param sobrecarga a sinalização mais recente do dia, ou null
 */
export function disposicaoDoDia(
  checkin: { disposicao: Nivel; criadoEm: Date } | null,
  sobrecarga: { criadoEm: Date } | null,
): DisposicaoDoDia | null {
  if (
    sobrecarga &&
    (!checkin || sobrecarga.criadoEm.getTime() >= checkin.criadoEm.getTime())
  ) {
    return { disposicao: DISPOSICAO_SOBRECARGA, origem: 'sobrecarga' };
  }
  return checkin
    ? { disposicao: checkin.disposicao, origem: 'registro' }
    : null;
}
