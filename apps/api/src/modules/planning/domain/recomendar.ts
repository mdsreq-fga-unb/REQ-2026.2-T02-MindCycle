import {
  DISPOSICAO_PADRAO,
  type DataLocal,
  type GrupoRecomendacao,
  type Nivel,
  type RecomendacaoDoDia,
  type Tarefa,
  type TarefaRecomendada,
} from '@mindcycle/shared';

// HU13 (issue #83). Função pura: sem Nest, Prisma nem relógio, para que cada
// regra tenha um teste (recomendar.spec.ts). As regras são proposta da equipe de
// 08/11/2026 e aguardam a validação da cliente; mudar a ordem é mudar só aqui.
//
// A fase do ciclo não entra no cálculo no MVP: o ciclo influencia a ordem pela
// disposição que a usuária registra. As concluídas não chegam aqui: quem chama
// entrega só as tarefas em aberto.

/**
 * As tarefas do dia, em ordem de precedência.
 * @param tarefas as tarefas em aberto da usuária
 * @param disposicaoRegistrada a que vale no dia (a do registro mais recente ou a
 *   da sinalização de sobrecarga posterior a ele), ou null sem nenhum dos dois
 * @param hoje o dia no calendário da usuária
 * @param porSobrecarga a disposição é a baixa da sinalização de sobrecarga (HU02)
 */
export function recomendar(
  tarefas: readonly Tarefa[],
  disposicaoRegistrada: Nivel | null,
  hoje: DataLocal,
  porSobrecarga = false,
): RecomendacaoDoDia {
  const disposicao = disposicaoRegistrada ?? DISPOSICAO_PADRAO;
  // As datas AAAA-MM-DD e os instantes ISO em UTC se ordenam como texto.
  const doDia = tarefas
    .filter((tarefa) => tarefa.dataPlanejada <= hoje)
    .map((tarefa): TarefaRecomendada => {
      const urgente = tarefa.prazo <= hoje;
      const acima = tarefa.energia > disposicao;
      return {
        ...tarefa,
        grupo: grupo(urgente, acima),
        avisoAdiamento: urgente && acima,
      };
    });
  return {
    hoje,
    disposicao,
    disposicaoAssumida: disposicaoRegistrada === null,
    // A sobrecarga só explica uma disposição que existe.
    disposicaoPorSobrecarga: disposicaoRegistrada !== null && porSobrecarga,
    tarefas: doDia.sort(precedencia),
  };
}

function grupo(urgente: boolean, acima: boolean): GrupoRecomendacao {
  if (urgente) return 1;
  return acima ? 3 : 2;
}

// Grupo; depois a primeira diferença entre prazo mais próximo (entre as
// vencidas, a mais antiga), prioridade maior, energia menor e cadastro mais
// antigo. O id só desempata o que é igual em tudo, para a ordem não variar.
function precedencia(a: TarefaRecomendada, b: TarefaRecomendada): number {
  return a.grupo - b.grupo || desempatar(a, b);
}

/** A ordem dentro de um grupo; o reajuste (HU15) ordena as movidas por ela. */
export function desempatar(a: Tarefa, b: Tarefa): number {
  return (
    comparar(a.prazo, b.prazo) ||
    b.prioridade - a.prioridade ||
    a.energia - b.energia ||
    comparar(a.criadaEm, b.criadaEm) ||
    comparar(a.id, b.id)
  );
}

function comparar(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
