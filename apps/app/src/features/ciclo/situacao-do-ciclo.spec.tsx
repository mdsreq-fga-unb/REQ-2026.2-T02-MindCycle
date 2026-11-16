import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { FASES, type MotivoSemFase } from '@mindcycle/shared';

import { textos } from '@/textos';

import { FasesDoCiclo } from './fases-do-ciclo';
import { SituacaoDoCiclo } from './situacao-do-ciclo';

// Na @testing-library/react-native 14, render é assíncrono.
const t = textos.ciclo.situacao;
const nomes = textos.ciclo.fases.porFase;

describe('SituacaoDoCiclo (HU05)', () => {
  it('mostra o dia do ciclo e a fase, identificada como estimativa', async () => {
    await render(
      <SituacaoDoCiclo
        situacao={{ estimada: true, diaDoCiclo: 6, fase: 'folicular', duracao: 28 }}
      />,
    );

    expect(screen.getByText(t.dia(6))).toBeTruthy();
    expect(screen.getByText(t.fase(nomes.folicular.nome))).toBeTruthy();
    expect(screen.getByText(t.estimativa)).toBeTruthy();
  });

  // Critério 2: sem estimativa, informa o motivo e não atribui fase nenhuma.
  it.each<MotivoSemFase>(['sem_inicio', 'sem_duracao', 'irregular', 'fora_do_modelo', 'alem_da_duracao'])(
    'sem estimativa (%s), informa o motivo e não mostra fase',
    async (motivo) => {
      await render(
        <SituacaoDoCiclo
          situacao={{ estimada: false, motivo, diaDoCiclo: motivo === 'sem_inicio' ? null : 3 }}
        />,
      );

      expect(t.motivos[motivo]?.trim()).toBeTruthy();
      expect(screen.getByText(t.naoEstimada)).toBeTruthy();
      expect(screen.getByText(t.motivos[motivo])).toBeTruthy();
      for (const fase of FASES) {
        expect(screen.queryByText(t.fase(nomes[fase].nome))).toBeNull();
      }
    },
  );

  it('sem estimativa, ainda mostra o dia do ciclo quando há início', async () => {
    await render(
      <SituacaoDoCiclo situacao={{ estimada: false, motivo: 'irregular', diaDoCiclo: 9 }} />,
    );

    expect(screen.getByLabelText(t.dia(9))).toBeTruthy();
  });
});

describe('FasesDoCiclo com a fase atual (HU05)', () => {
  it('marca a fase atual com texto, não só com cor', async () => {
    await render(<FasesDoCiclo faseAtual="lutea" />);

    expect(screen.getByText(textos.ciclo.fases.atual)).toBeTruthy();
    expect(
      screen.getByRole('button', { name: textos.ciclo.fases.rotuloAtual(nomes.lutea.nome) }),
    ).toBeTruthy();
  });

  it('sem fase atual, não marca nenhuma', async () => {
    await render(<FasesDoCiclo />);

    expect(screen.queryByText(textos.ciclo.fases.atual)).toBeNull();
  });
});
