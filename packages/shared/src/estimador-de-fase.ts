import type { InicioMenstruacao, PerfilCiclo } from './ciclo.js';
import { diasEntre, type DataLocal } from './datas.js';
import type { Fase } from './fases.js';

// HU05. Modelo proposto pela equipe em 16/11/2026, implementado por decisão do
// grupo e pendente de validação da Dra. Cláudia. Mudar intervalos é mudar só aqui.
export const MODELO_FASES = {
  /** Faixa de duração em que o modelo vale; fora dela, a fase não é estimada. */
  duracaoMinima: 21,
  duracaoMaxima: 35,
  diasMenstrual: 5,
  /** A ovulação fica a 14 dias do fim do ciclo, com um dia antes e um depois. */
  diasDaOvulacaoAteOFim: 14,
} as const;

/** Por que a fase não foi estimada. O app escolhe o texto de cada motivo. */
export type MotivoSemFase =
  | 'sem_inicio'
  | 'sem_duracao'
  | 'irregular'
  | 'fora_do_modelo'
  | 'alem_da_duracao';

export type SituacaoCiclo =
  | { estimada: true; diaDoCiclo: number; fase: Fase; duracao: number }
  | { estimada: false; motivo: MotivoSemFase; diaDoCiclo: number | null };

/** A fase do dia, ou null fora do ciclo ou fora da faixa do modelo. */
export function faseDoDia(diaDoCiclo: number, duracao: number): Fase | null {
  const m = MODELO_FASES;
  if (duracao < m.duracaoMinima || duracao > m.duracaoMaxima) {
    return null;
  }
  if (diaDoCiclo < 1 || diaDoCiclo > duracao) {
    return null;
  }
  const ovulacao = duracao - m.diasDaOvulacaoAteOFim;
  if (diaDoCiclo <= m.diasMenstrual) {
    return 'menstrual';
  }
  if (diaDoCiclo < ovulacao - 1) {
    return 'folicular';
  }
  if (diaDoCiclo <= ovulacao + 1) {
    return 'ovulatoria';
  }
  return 'lutea';
}

/**
 * A situação do ciclo hoje (HU05): o dia do ciclo, contado em dias de
 * calendário com o início como dia 1, e a fase estimada, ou o motivo de não
 * estimar. Nunca atribui fase por padrão nem presume duração.
 */
export function situacaoDoCiclo({
  inicios,
  perfil,
  hoje,
}: {
  inicios: InicioMenstruacao[];
  perfil: PerfilCiclo | null;
  hoje: DataLocal;
}): SituacaoCiclo {
  // Início mais recente que não está no futuro (datas AAAA-MM-DD comparam como texto).
  const ultimo = inicios
    .map((i) => i.data)
    .filter((data) => data <= hoje)
    .sort()
    .at(-1);
  if (!ultimo) {
    return { estimada: false, motivo: 'sem_inicio', diaDoCiclo: null };
  }
  const diaDoCiclo = diasEntre(ultimo, hoje) + 1;
  if (!perfil) {
    return { estimada: false, motivo: 'sem_duracao', diaDoCiclo };
  }
  if (perfil.irregular) {
    return { estimada: false, motivo: 'irregular', diaDoCiclo };
  }
  if (perfil.duracaoMedia === null) {
    return { estimada: false, motivo: 'sem_duracao', diaDoCiclo };
  }
  const duracao = perfil.duracaoMedia;
  if (duracao < MODELO_FASES.duracaoMinima || duracao > MODELO_FASES.duracaoMaxima) {
    return { estimada: false, motivo: 'fora_do_modelo', diaDoCiclo };
  }
  const fase = faseDoDia(diaDoCiclo, duracao);
  if (!fase) {
    return { estimada: false, motivo: 'alem_da_duracao', diaDoCiclo };
  }
  return { estimada: true, diaDoCiclo, fase, duracao };
}
