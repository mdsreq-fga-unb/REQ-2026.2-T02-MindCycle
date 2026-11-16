import { diasEntre, type DataLocal } from './datas.js';

// HU21. O que torna uma sugestão válida é ela apresentar uma prática BREVE de
// autocuidado, e "breve" aqui é um limite de verdade, não uma intenção: nenhuma
// prática passa de DURACAO_MAXIMA_PRATICA_MINUTOS, e um teste cobra isso da lista. Assim o
// critério de aceite não depende de alguém reler a lista a cada mudança.

/**
 * Teto da duração de uma prática, em minutos. É a definição operacional de
 * "breve" do RF21: acima disso a atividade deixa de caber numa pausa e passa a
 * parecer mais uma cobrança na rotina da usuária.
 */
export const DURACAO_MAXIMA_PRATICA_MINUTOS = 10;

/** Quantas sugestões o dia oferece. Poucas, para a escolha não virar peso. */
export const SUGESTOES_POR_DIA = 3;

// A lista é PROVISÓRIA: a cliente ainda vai entregar as práticas que ela quer
// oferecer (pendência da #78). Estas servem para a tela e os testes rodarem, e
// são práticas genéricas e sem recomendação de saúde. Os ids são estáveis (podem
// ser gravados mais tarde, se alguma HU precisar); os rótulos e as descrições
// moram em textos.ts do app. Trocar a lista é mexer nesta constante e nos
// rótulos, mantendo toda duração dentro do teto acima.
export const PRATICAS_ACOLHIMENTO = [
  { id: 'respiracao_lenta', duracaoMinutos: 3 },
  { id: 'alongamento_curto', duracaoMinutos: 5 },
  { id: 'pausa_sem_tela', duracaoMinutos: 5 },
  { id: 'beber_agua', duracaoMinutos: 1 },
  { id: 'caminhada_curta', duracaoMinutos: 10 },
  { id: 'musica_calma', duracaoMinutos: 5 },
  { id: 'anotar_tres_coisas', duracaoMinutos: 5 },
  { id: 'compressa_morna', duracaoMinutos: 10 },
] as const;

export type PraticaAcolhimento = (typeof PRATICAS_ACOLHIMENTO)[number]['id'];

export interface SugestaoAcolhimento {
  id: PraticaAcolhimento;
  /** Sempre entre 1 e DURACAO_MAXIMA_PRATICA_MINUTOS. */
  duracaoMinutos: number;
}

export interface SugestoesDoDia {
  /** O dia da usuária a que estas sugestões pertencem. */
  dataLocal: DataLocal;
  sugestoes: SugestaoAcolhimento[];
}

// Data de referência da rotação. Qualquer data serve: ela só ancora a contagem
// de dias, e mudá-la só desloca quais práticas caem em qual dia.
const EPOCA: DataLocal = '2026-01-01';

/**
 * As sugestões do dia, sempre as mesmas para a mesma data: a usuária que abre a
 * aba de novo encontra o que já tinha visto, e o teste não precisa de sorteio.
 *
 * A janela anda SUGESTOES_POR_DIA práticas por dia, então dias seguidos não
 * repetem sugestão enquanto a lista tiver mais que uma janela, e com o tempo
 * todas as práticas aparecem.
 */
export function sugestoesDoDia(
  data: DataLocal,
  quantidade: number = SUGESTOES_POR_DIA,
): SugestaoAcolhimento[] {
  const total = PRATICAS_ACOLHIMENTO.length;
  const quantas = Math.min(Math.max(quantidade, 0), total);
  // diasEntre é negativo antes da época: o resto volta a ser positivo aqui.
  const passo = diasEntre(EPOCA, data) * quantas;
  const inicio = ((passo % total) + total) % total;
  return Array.from(
    { length: quantas },
    (_, i) => PRATICAS_ACOLHIMENTO[(inicio + i) % total]!,
  );
}
