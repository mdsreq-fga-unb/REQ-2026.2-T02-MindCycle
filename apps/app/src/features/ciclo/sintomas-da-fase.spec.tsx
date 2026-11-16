import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { textos } from '@/textos';

import { SintomasDaFase } from './sintomas-da-fase';

// Na @testing-library/react-native 14, render é assíncrono.
const t = textos.ciclo.sintomasDaFase;
const nomes = textos.checkin.sintomas.nomes;

describe('SintomasDaFase (HU01)', () => {
  it('lista os sintomas comuns da fase estimada de hoje', async () => {
    await render(
      <SintomasDaFase situacao={{ estimada: true, diaDoCiclo: 21, fase: 'lutea', duracao: 28 }} />,
    );

    expect(
      screen.getByText(
        t.listaFimDaFase([nomes.cansaco, nomes.inchaco, nomes.irritabilidade, nomes.sensibilidade_nos_seios]),
      ),
    ).toBeTruthy();
  });

  it('monta a frase com "e" antes do último e em minúsculas', () => {
    expect(t.lista([nomes.colica, nomes.cansaco, nomes.dor_de_cabeca])).toBe(
      'Nesta fase, algumas pessoas sentem: cólica, cansaço e dor de cabeça.',
    );
    expect(t.lista([nomes.colica])).toBe('Nesta fase, algumas pessoas sentem: cólica.');
  });

  it('na fase folicular, diz que os sintomas costumam ser leves', async () => {
    await render(
      <SintomasDaFase situacao={{ estimada: true, diaDoCiclo: 8, fase: 'folicular', duracao: 28 }} />,
    );

    expect(screen.getByText(t.semSintomas)).toBeTruthy();
  });

  // Sem fase estimada (HU05), não há fase para dizer o que é comum.
  it('sem fase estimada, não mostra nada', async () => {
    await render(
      <SintomasDaFase situacao={{ estimada: false, motivo: 'irregular', diaDoCiclo: 4 }} />,
    );

    expect(screen.toJSON()).toBeNull();
  });
});
