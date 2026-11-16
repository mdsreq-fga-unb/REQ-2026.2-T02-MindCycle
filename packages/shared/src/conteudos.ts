import type { Sintoma } from './checkin.js';
import type { Fase } from './fases.js';

// HU09. Catálogo em rascunho da equipe, a revisar com a Dra. Cláudia. Cada
// conteúdo diz a que fases e sintomas se refere; os textos ficam no app.
export const CONTEUDOS = [
  { id: 'energia_lutea', fases: ['lutea'], sintomas: ['cansaco', 'desanimo'] },
  { id: 'alivio_colica', fases: ['menstrual'], sintomas: ['colica', 'dor_nas_costas'] },
  { id: 'inchaco_antes', fases: ['lutea'], sintomas: ['inchaco', 'sensibilidade_nos_seios'] },
  { id: 'humor_no_ciclo', fases: ['lutea'], sintomas: ['irritabilidade', 'ansiedade', 'desanimo'] },
  { id: 'sono_e_ciclo', fases: ['menstrual', 'lutea'], sintomas: ['alteracao_do_sono'] },
  { id: 'dor_de_cabeca', fases: ['menstrual'], sintomas: ['dor_de_cabeca', 'nausea'] },
  { id: 'energia_volta', fases: ['folicular'], sintomas: [] },
  { id: 'ovulacao', fases: ['ovulatoria'], sintomas: [] },
  { id: 'foco_no_ciclo', fases: [], sintomas: ['dificuldade_de_concentracao'] },
] as const satisfies readonly {
  id: string;
  fases: readonly Fase[];
  sintomas: readonly Sintoma[];
}[];

export type IdConteudo = (typeof CONTEUDOS)[number]['id'];

const MAXIMO = 3;

/**
 * Até três conteúdos ligados à fase estimada de hoje ou a um sintoma registrado
 * (critério da HU09). Primeiro os que tratam de um sintoma dela, que são mais
 * específicos; depois os da fase; na ordem do catálogo em caso de empate.
 */
export function recomendarConteudos({
  fase,
  sintomas,
}: {
  fase: Fase | null;
  sintomas: readonly Sintoma[];
}): IdConteudo[] {
  const peso = (c: (typeof CONTEUDOS)[number]) =>
    ((c.sintomas as readonly Sintoma[]).some((s) => sintomas.includes(s)) ? 2 : 0) +
    (fase && (c.fases as readonly Fase[]).includes(fase) ? 1 : 0);
  return CONTEUDOS.map((c, ordem) => ({ id: c.id, peso: peso(c), ordem }))
    .filter((c) => c.peso > 0)
    .sort((a, b) => b.peso - a.peso || a.ordem - b.ordem)
    .slice(0, MAXIMO)
    .map((c) => c.id);
}
