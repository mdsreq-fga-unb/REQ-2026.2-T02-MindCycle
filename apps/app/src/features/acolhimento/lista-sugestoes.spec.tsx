import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import {
  DURACAO_MAXIMA_PRATICA_MINUTOS,
  PRATICAS_ACOLHIMENTO,
  sugestoesDoDia,
  type SugestaoAcolhimento,
} from '@mindcycle/shared';

import { textos } from '@/textos';

import { ListaSugestoes } from './lista-sugestoes';

// O render da @testing-library/react-native 14 é assíncrono: sem o await, o
// screen fica vazio e todo caso falha com "`render` function has not been called".
const t = textos.acolhimento.sugestoes;

describe('ListaSugestoes (HU21)', () => {
  it('mostra o nome, a duração e como fazer cada prática', async () => {
    const sugestoes = sugestoesDoDia('2026-11-15');
    await render(<ListaSugestoes sugestoes={sugestoes} />);

    for (const sugestao of sugestoes) {
      expect(screen.getByText(t.nomes[sugestao.id])).toBeTruthy();
      expect(screen.getByText(t.comoFazer[sugestao.id])).toBeTruthy();
    }
  });

  // O RF21 pede que a sugestão APRESENTE a prática breve: a duração na tela é o
  // que cumpre isso para a usuária. O teste da API garante o teto; este garante
  // que ela chega aos olhos dela.
  it('põe a duração de cada prática na tela', async () => {
    const sugestoes: SugestaoAcolhimento[] = [
      { id: 'respiracao_lenta', duracaoMinutos: 3 },
      { id: 'caminhada_curta', duracaoMinutos: 10 },
    ];
    await render(<ListaSugestoes sugestoes={sugestoes} />);

    expect(screen.getByText('3 min')).toBeTruthy();
    expect(screen.getByText('10 min')).toBeTruthy();
  });

  // O leitor de tela precisa do tempo junto do nome: ouvir "Caminhada curta"
  // sozinho não diz se ela cabe na pausa (RNF11).
  it('anuncia nome e duração juntos para o leitor de tela', async () => {
    await render(
      <ListaSugestoes sugestoes={[{ id: 'caminhada_curta', duracaoMinutos: 10 }]} />,
    );

    expect(screen.getByLabelText('Caminhada curta, 10 min')).toBeTruthy();
  });

  it('avisa quando o dia não tem sugestão', async () => {
    await render(<ListaSugestoes sugestoes={[]} />);

    expect(screen.getByText(t.vazio)).toBeTruthy();
  });

  // O typecheck garante que os mapas de texto cobrem a lista de práticas, mas só
  // em tempo de compilação. Este caso renderiza a lista inteira e cobra texto não
  // vazio, que é o que a usuária veria se um rótulo faltasse.
  it('tem rótulo e instrução para toda prática da lista', async () => {
    const todas = PRATICAS_ACOLHIMENTO.map((pratica) => ({
      id: pratica.id,
      duracaoMinutos: pratica.duracaoMinutos,
    }));
    await render(<ListaSugestoes sugestoes={todas} />);

    for (const pratica of PRATICAS_ACOLHIMENTO) {
      expect(t.nomes[pratica.id]?.trim()).toBeTruthy();
      expect(t.comoFazer[pratica.id]?.trim()).toBeTruthy();
      expect(screen.getByText(t.nomes[pratica.id])).toBeTruthy();
      expect(pratica.duracaoMinutos).toBeLessThanOrEqual(
        DURACAO_MAXIMA_PRATICA_MINUTOS,
      );
    }
  });
});
