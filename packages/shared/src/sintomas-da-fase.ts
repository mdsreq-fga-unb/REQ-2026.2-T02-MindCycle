import type { Sintoma } from './checkin.js';
import type { Fase } from './fases.js';

// HU01. Rascunho da equipe a partir do que é comum em cada fase, para a Dra.
// Cláudia revisar. Usa os sintomas do registro (HU04) para a HU09 poder cruzar a
// fase com o que a usuária sentiu.
export const SINTOMAS_COMUNS_POR_FASE = {
  menstrual: ['colica', 'cansaco', 'dor_nas_costas', 'dor_de_cabeca'],
  folicular: [],
  ovulatoria: ['sensibilidade_nos_seios', 'inchaco'],
  // Alinhada à explicação da fase (HU28), que fala desses sintomas perto do fim.
  lutea: ['cansaco', 'inchaco', 'irritabilidade', 'sensibilidade_nos_seios'],
} as const satisfies Record<Fase, readonly Sintoma[]>;

/** Os sintomas comuns da fase; a folicular costuma não ter sintomas marcantes. */
export function sintomasComunsDaFase(fase: Fase): readonly Sintoma[] {
  return SINTOMAS_COMUNS_POR_FASE[fase];
}
