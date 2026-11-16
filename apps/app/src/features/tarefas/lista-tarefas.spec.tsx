import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import type { Tarefa } from '@mindcycle/shared';

import { textos } from '@/textos';
import { ListaTarefas } from './lista-tarefas';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

const feita: Tarefa = {
  id: 'tarefa',
  titulo: 'Revisar relatorio',
  prazo: '2026-11-20',
  prioridade: 2,
  energia: 1,
  duracaoMinutos: null,
  dataPlanejada: '2026-11-14',
  criadaEm: '2026-11-10T12:00:00.000Z',
  concluidaEm: '2026-11-15T02:30:00.000Z',
};

describe('Lista de tarefas concluidas (HU20)', () => {
  beforeEach(() => jest.clearAllMocks());

  it('mostra a data da conclusao no fuso da usuaria, nao o dia UTC', async () => {
    await render(
      <ListaTarefas tarefas={[feita]} hoje="2026-11-14" fuso="America/Sao_Paulo" concluidas />,
    );
    expect(screen.getByText(feita.titulo)).toBeTruthy();
    expect(screen.getByText(textos.tarefas.concluidaEm('14/11/2026'))).toBeTruthy();
    expect(screen.queryByText(textos.tarefas.concluidaEm('15/11/2026'))).toBeNull();
  });

  it('nao oferece adiamento para uma tarefa concluida', async () => {
    await render(
      <ListaTarefas tarefas={[feita]} hoje="2026-11-14" fuso="America/Sao_Paulo" concluidas />,
    );
    expect(screen.queryByLabelText(textos.tarefas.adiamento.rotuloAbrir(feita.titulo))).toBeNull();
  });

  it('mantem o acesso ao detalhe da tarefa concluida', async () => {
    await render(
      <ListaTarefas tarefas={[feita]} hoje="2026-11-14" fuso="America/Sao_Paulo" concluidas />,
    );
    await fireEvent.press(screen.getByLabelText(textos.tarefas.detalhe.rotuloAbrir(feita.titulo)));
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/tarefa-detalhe', params: { id: feita.id },
    });
  });

  it('apresenta a mensagem especifica quando nao ha concluidas', async () => {
    await render(
      <ListaTarefas tarefas={[]} hoje="2026-11-14" fuso="America/Sao_Paulo" concluidas />,
    );
    expect(screen.getByText(textos.tarefas.concluidasVazias)).toBeTruthy();
    expect(screen.queryByText(textos.tarefas.vazio.titulo)).toBeNull();
  });

  it('continua oferecendo adiamento para uma tarefa em aberto', async () => {
    await render(
      <ListaTarefas
        tarefas={[{ ...feita, concluidaEm: null }]}
        hoje="2026-11-14"
        fuso="America/Sao_Paulo"
      />,
    );
    expect(screen.getByLabelText(textos.tarefas.adiamento.rotuloAbrir(feita.titulo))).toBeTruthy();
    expect(screen.queryByText(textos.tarefas.concluidaEm('14/11/2026'))).toBeNull();
  });
});
