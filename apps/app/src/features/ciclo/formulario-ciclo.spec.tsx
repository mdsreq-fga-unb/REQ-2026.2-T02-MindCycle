import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { Ciclo } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { textos } from '@/textos';

import { FormularioCiclo } from './formulario-ciclo';

// A API é a fronteira: o teste confere o que o formulário pede a ela.
jest.mock('@/api/endpoints', () => ({
  api: {
    registrarInicio: jest.fn(async (data: string) => ({ id: 'novo', data })),
    informarPerfil: jest.fn(async (dados: object) => dados),
  },
}));

const t = textos.ciclo;
const vazio: Ciclo = {
  inicios: [],
  perfil: null,
  situacao: { estimada: false, motivo: 'sem_inicio', diaDoCiclo: null },
};
const HOJE = '2026-11-15';

async function abrir(ciclo: Ciclo = vazio) {
  // gcTime infinito: sem ele, cada mutação agenda uma limpeza de 5 minutos e o
  // Jest fica esperando esse temporizador para encerrar.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity },
      mutations: { retry: false, gcTime: Infinity },
    },
  });
  await render(
    <QueryClientProvider client={queryClient}>
      <FormularioCiclo ciclo={ciclo} hoje={HOJE} />
    </QueryClientProvider>,
  );
}

const salvar = () => fireEvent.press(screen.getByRole('button', { name: t.formulario.botao }));

describe('FormularioCiclo (HU06, HU07)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Revisão do PR #106, pontos 2 e 3: nada pode ser salvo sem ela ter informado.
  it('começa com a data vazia e a duração sem valor', async () => {
    await abrir();

    expect(screen.getByLabelText(t.formulario.inicio).props.value).toBe('');
    expect(screen.getByText(t.duracao.vazio)).toBeTruthy();
  });

  it('não salva sem a data', async () => {
    await abrir();
    await fireEvent.press(screen.getByRole('button', { name: t.duracao.aumentar }));
    await salvar();

    expect(screen.getByText(t.formulario.faltaData)).toBeTruthy();
    expect(api.registrarInicio).not.toHaveBeenCalled();
    expect(api.informarPerfil).not.toHaveBeenCalled();
  });

  it('não salva sem a duração, a menos que o ciclo seja irregular', async () => {
    await abrir();
    await fireEvent.changeText(screen.getByLabelText(t.formulario.inicio), '10112026');
    await salvar();

    expect(screen.getByText(t.formulario.faltaDuracao)).toBeTruthy();
    expect(api.informarPerfil).not.toHaveBeenCalled();
  });

  it('com o ciclo irregular, salva sem pedir a duração', async () => {
    await abrir();
    await fireEvent.changeText(screen.getByLabelText(t.formulario.inicio), '10112026');
    await fireEvent(screen.getByLabelText(t.duracao.irregular), 'valueChange', true);
    await salvar();

    expect(api.informarPerfil).toHaveBeenCalledWith({ irregular: true });
    expect(api.registrarInicio).toHaveBeenCalledWith('2026-11-10');
  });

  // Ponto 4: a duração vai primeiro. Gravá-la de novo só sobrescreve, então uma
  // falha no meio nunca deixa um início pela metade no histórico.
  it('grava a duração escolhida antes do início', async () => {
    await abrir();
    await fireEvent.changeText(screen.getByLabelText(t.formulario.inicio), '10112026');
    await fireEvent.press(screen.getByRole('button', { name: t.duracao.aumentar }));
    await fireEvent.press(screen.getByRole('button', { name: t.duracao.aumentar }));
    await salvar();

    expect(api.informarPerfil).toHaveBeenCalledWith({ irregular: false, duracaoMedia: 29 });
    expect(api.registrarInicio).toHaveBeenCalledWith('2026-11-10');
    const perfil = jest.mocked(api.informarPerfil).mock.invocationCallOrder[0];
    const inicio = jest.mocked(api.registrarInicio).mock.invocationCallOrder[0];
    expect(perfil).toBeLessThan(inicio);
  });

  // Ponto 5: as fases (HU28) não dependem dos dados dela.
  it('mostra as fases do ciclo também no formulário', async () => {
    await abrir();

    expect(screen.getByText(t.fases.titulo)).toBeTruthy();
  });
});
