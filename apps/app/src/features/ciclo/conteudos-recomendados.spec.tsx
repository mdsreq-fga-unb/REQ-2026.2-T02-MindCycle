import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { CONTEUDOS } from '@mindcycle/shared';

import { textos } from '@/textos';

import { ConteudosRecomendados } from './conteudos-recomendados';

// Na @testing-library/react-native 14, render é assíncrono.
const t = textos.ciclo.conteudos;

describe('ConteudosRecomendados (HU09)', () => {
  it('mostra os conteúdos da fase e dos sintomas de hoje como links', async () => {
    await render(<ConteudosRecomendados fase="menstrual" sintomas={['colica']} />);

    expect(screen.getByText(t.titulo)).toBeTruthy();
    expect(
      screen.getByRole('link', { name: t.porConteudo.alivio_colica.titulo }),
    ).toBeTruthy();
  });

  it('sem fase nem sintoma, não mostra a seção', async () => {
    await render(<ConteudosRecomendados fase={null} sintomas={[]} />);

    expect(screen.queryByText(t.titulo)).toBeNull();
  });

  // O typecheck garante as chaves; este caso cobra título e texto não vazios.
  it('todo conteúdo do catálogo tem título e texto', () => {
    for (const { id } of CONTEUDOS) {
      expect(t.porConteudo[id].titulo.trim()).toBeTruthy();
      expect(t.porConteudo[id].paragrafos.join('').trim()).toBeTruthy();
    }
  });
});
