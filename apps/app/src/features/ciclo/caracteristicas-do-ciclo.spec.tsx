import { describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { textos } from '@/textos';

import { CaracteristicasDoCiclo } from './caracteristicas-do-ciclo';
import { chaveCiclo } from './consulta';

jest.mock('@/api/endpoints', () => ({
  api: { informarPerfil: jest.fn(async (dados: object) => dados) },
}));

const t = textos.ciclo;

describe('CaracteristicasDoCiclo (HU07, HU05)', () => {
  // Critério 3 da HU05: mudar a HU07 não pode deixar a fase antiga na tela. A
  // situação é calculada pela API, então a consulta do ciclo precisa ser refeita.
  it('depois de salvar, pede o ciclo de novo à API', async () => {
    // gcTime infinito: sem ele o Jest espera os temporizadores de limpeza.
    const queryClient = new QueryClient({
      defaultOptions: { queries: { gcTime: Infinity }, mutations: { gcTime: Infinity } },
    });
    const invalidar = jest.spyOn(queryClient, 'invalidateQueries');
    await render(
      <QueryClientProvider client={queryClient}>
        <CaracteristicasDoCiclo perfil={{ duracaoMedia: 28, irregular: false }} />
      </QueryClientProvider>,
    );

    await fireEvent(screen.getByLabelText(t.duracao.irregular), 'valueChange', true);
    await fireEvent.press(screen.getByRole('button', { name: t.caracteristicas.botao }));

    await waitFor(() =>
      expect(invalidar).toHaveBeenCalledWith(expect.objectContaining({ queryKey: chaveCiclo })),
    );
  });
});
