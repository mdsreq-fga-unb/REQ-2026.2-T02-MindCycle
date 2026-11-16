import {
  somarDias,
  type DataLocal,
  type Nivel,
  type RecomendacaoReajustada,
  type Tarefa,
} from '@mindcycle/shared';
import { desempatar, recomendar } from './recomendar.js';

// HU15 (issue #84). Função pura, como a da HU13: cada regra tem um teste em
// reajustar.spec.ts. As regras são proposta da equipe de 08/11/2026 e aguardam a
// validação da cliente.
//
// O reajuste parte do estado, não do evento: a cada pedido do plano do dia ele
// olha a disposição vigente e as movimentações de hoje e diz o que falta mudar.
// Aplicado duas vezes seguidas, o segundo não muda nada. Assim um registro de
// disposição (HU04), uma correção do registro vigente ou a sinalização de
// sobrecarga (HU02) reajustam a lista sem chamar código desta história.

/**
 * Uma passagem para o dia seguinte feita pelo reajuste, com o que houve depois.
 * Ela sempre vai para o dia seguinte ao dia em que foi feita: a de hoje é a que
 * tem `dataNova` amanhã. O dia sai da própria linha, como a `dataLocal` do
 * check-in, e não muda se a usuária trocar de fuso.
 */
export interface MovimentacaoReajuste {
  id: string;
  tarefaId: string;
  dataAnterior: DataLocal;
  dataNova: DataLocal;
  /** A usuária trouxe a tarefa de volta: ela não é movida de novo naquele dia. */
  desfeita: boolean;
  /** A disposição subiu e a tarefa voltou sozinha. */
  devolvida: boolean;
}

export type Mudanca =
  | { tipo: 'mover'; tarefa: Tarefa; para: DataLocal }
  | {
      tipo: 'devolver';
      tarefa: Tarefa;
      para: DataLocal;
      movimentacaoId: string;
    };

/**
 * O que o reajuste do dia ainda precisa mudar, dada a disposição vigente.
 * @param tarefas as tarefas em aberto planejadas até amanhã, inclusive
 * @param disposicao a vigente de hoje (HU04, ou a sobrecarga da HU02), ou null sem registro no dia
 * @param hoje o dia no calendário da usuária
 * @param movimentacoes as passagens feitas pelo reajuste, ao menos as que vão para amanhã
 */
export function reajustar(
  tarefas: readonly Tarefa[],
  disposicao: Nivel | null,
  hoje: DataLocal,
  movimentacoes: readonly MovimentacaoReajuste[],
): Mudanca[] {
  // Sem registro no dia não há reajuste: a média assumida só ordena (HU13).
  if (disposicao === null) return [];

  const amanha = somarDias(hoje, 1);
  const desfeitasHoje = new Set(
    movimentacoes
      .filter((m) => m.dataNova === amanha && m.desfeita)
      .map((m) => m.tarefaId),
  );
  const mudancas: Mudanca[] = [];
  for (const tarefa of tarefas) {
    if (tarefa.dataPlanejada <= hoje) {
      // Prazo hoje ou vencido nunca sai do dia. Como o prazo é amanhã ou
      // depois, a nova data planejada nunca passa do prazo.
      const sai =
        tarefa.energia > disposicao &&
        tarefa.prazo > hoje &&
        !desfeitasHoje.has(tarefa.id);
      if (sai) mudancas.push({ tipo: 'mover', tarefa, para: amanha });
      continue;
    }
    const passagem = passagemDeHoje(tarefa, movimentacoes, hoje);
    // Volta a que agora cabe e a que passou a vencer hoje ou antes, porque a
    // edição da tarefa (HU16) muda o prazo: essa nunca fica fora do dia.
    if (passagem && (tarefa.energia <= disposicao || tarefa.prazo <= hoje)) {
      mudancas.push({
        tipo: 'devolver',
        tarefa,
        para: passagem.dataAnterior,
        movimentacaoId: passagem.id,
      });
    }
  }
  return mudancas;
}

/**
 * A passagem para amanhã que o reajuste fez hoje e que ainda vale: não foi
 * desfeita nem devolvida, e a tarefa continua na data para onde foi. Uma tarefa
 * que a usuária adiou (HU18) depois disso já está em outra data e não tem
 * passagem vigente; por isso não volta.
 */
export function passagemDeHoje(
  tarefa: Pick<Tarefa, 'id' | 'dataPlanejada'>,
  movimentacoes: readonly MovimentacaoReajuste[],
  hoje: DataLocal,
): MovimentacaoReajuste | undefined {
  const amanha = somarDias(hoje, 1);
  return movimentacoes.find(
    (m) =>
      m.tarefaId === tarefa.id &&
      m.dataNova === amanha &&
      m.dataNova === tarefa.dataPlanejada &&
      !m.desfeita &&
      !m.devolvida,
  );
}

/**
 * O plano do dia depois do reajuste: a recomendação da HU13 e as tarefas que o
 * reajuste passou para amanhã, que a usuária pode trazer de volta.
 */
export function planoDoDia(
  tarefas: readonly Tarefa[],
  disposicao: Nivel | null,
  hoje: DataLocal,
  movimentacoes: readonly MovimentacaoReajuste[],
): RecomendacaoReajustada {
  const movidas = tarefas
    .filter((tarefa) => passagemDeHoje(tarefa, movimentacoes, hoje))
    .sort(desempatar);
  return { ...recomendar(tarefas, disposicao, hoje), movidas };
}
