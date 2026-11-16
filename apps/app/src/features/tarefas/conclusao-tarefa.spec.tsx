import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Tarefa } from '@mindcycle/shared';

import TarefaDetalhe from '@/app/(app)/tarefa-detalhe';
import { api } from '@/api/endpoints';
import { useTarefa } from './consulta';
import { textos } from '@/textos';

jest.mock('expo-router', () => ({
  router: { replace: jest.fn() },
  useLocalSearchParams: () => ({ id: 'tarefa' }),
}));
jest.mock('./consulta', () => ({
  chaveTarefas: ['tarefas'],
  useTarefa: jest.fn(),
}));
jest.mock('@/sessao/sessao', () => ({
  useSessao: () => ({
    conta: { hoje: '2026-11-15', fuso: 'America/Sao_Paulo' },
  }),
}));
jest.mock('./formulario-tarefa', () => ({ FormularioTarefa: () => null }));
jest.mock('@/api/endpoints', () => ({
  api: { concluirTarefa: jest.fn(), reabrirTarefa: jest.fn() },
}));

const tarefa: Tarefa = {
  id: 'tarefa',
  titulo: 'Revisar relatorio',
  prazo: '2026-11-20',
  prioridade: 2,
  energia: 1,
  duracaoMinutos: null,
  dataPlanejada: '2026-11-15',
  criadaEm: '2026-11-10T12:00:00.000Z',
  concluidaEm: null,
};

describe('Confirmacao da conclusao (HU20)', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.mocked(useTarefa).mockReturnValue({
      data: tarefa,
      isPending: false,
      isError: false,
    } as ReturnType<typeof useTarefa>);
  });

  async function abrir() {
    const concluir = jest.spyOn(api, 'concluirTarefa').mockResolvedValue({
      ...tarefa,
      concluidaEm: '2026-11-15T12:00:00.000Z',
    });
    const client = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: Infinity },
        mutations: { retry: false, gcTime: Infinity },
      },
    });
    // Uma reconsulta lenta nao deve prender os controles apos o sucesso.
    jest.spyOn(client, 'invalidateQueries').mockImplementation(() => new Promise<void>(() => {}));
    await render(
      <QueryClientProvider client={client}>
        <TarefaDetalhe />
      </QueryClientProvider>,
    );
    return concluir;
  }

  it('pede confirmacao antes de enviar e permite cancelar sem concluir', async () => {
    const concluir = await abrir();
    await fireEvent.press(screen.getByText(textos.tarefas.detalhe.concluir));
    expect(screen.getByText(textos.tarefas.detalhe.avisoConclusao)).toBeTruthy();
    expect(concluir).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByText(textos.tarefas.detalhe.cancelar));
    expect(screen.queryByText(textos.tarefas.detalhe.avisoConclusao)).toBeNull();
    expect(concluir).not.toHaveBeenCalled();
  });

  it('envia ao confirmar e libera os controles sem esperar a reconsulta', async () => {
    const concluir = await abrir();
    await fireEvent.press(screen.getByText(textos.tarefas.detalhe.concluir));
    await fireEvent.press(screen.getByText(textos.tarefas.detalhe.confirmarConclusao));
    expect(await screen.findByText(textos.tarefas.detalhe.concluida)).toBeTruthy();
    expect(concluir).toHaveBeenCalledTimes(1);
    expect(concluir).toHaveBeenCalledWith(tarefa.id);
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: textos.tarefas.detalhe.editar }).props.accessibilityState
          ?.disabled,
      ).not.toBe(true);
    });
    expect(screen.queryByText(textos.tarefas.detalhe.avisoConclusao)).toBeNull();
  });

  it('oferece reabertura apenas na concluida e envia a tarefa correta', async () => {
    jest.mocked(useTarefa).mockReturnValue({
      data: { ...tarefa, concluidaEm: '2026-11-15T12:00:00.000Z' },
      isPending: false,
      isError: false,
    } as ReturnType<typeof useTarefa>);
    const reabrir = jest.spyOn(api, 'reabrirTarefa').mockResolvedValue(tarefa);
    await abrir();
    expect(screen.queryByText(textos.tarefas.detalhe.concluir)).toBeNull();
    await fireEvent.press(screen.getByText(textos.tarefas.detalhe.reabrir));
    expect(await screen.findByText(textos.tarefas.detalhe.reaberta)).toBeTruthy();
    expect(reabrir).toHaveBeenCalledTimes(1);
    expect(reabrir).toHaveBeenCalledWith(tarefa.id);
  });
});
