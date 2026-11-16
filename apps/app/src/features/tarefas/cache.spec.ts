import type { Tarefa } from '@mindcycle/shared';
import { QueryClient } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { aplicarTarefa, chaveTarefa, chaveTarefas, removerTarefa } from './cache';

const abertas = [...chaveTarefas, 'abertas'];
const concluidas = [...chaveTarefas, 'concluidas'];
const criar = (id: string, alteracao: Partial<Tarefa> = {}): Tarefa => ({
  id,
  titulo: id,
  prazo: '2026-11-20',
  prioridade: 2,
  energia: 1,
  duracaoMinutos: null,
  dataPlanejada: '2026-11-15',
  criadaEm: '2026-11-15T12:00:00Z',
  concluidaEm: null,
  ...alteracao,
});

describe('Listas depois da confirmação da API', () => {
  let client: QueryClient;
  beforeEach(() => {
    client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: Infinity } } });
  });
  afterEach(() => client.clear());

  it('reflete a edição na lista e no detalhe sem duplicar', async () => {
    const original = criar('uma');
    const lista = [original, criar('outra')];
    client.setQueryData(abertas, lista);
    const atualizada = { ...original, titulo: 'Nome corrigido' };
    await aplicarTarefa(client, atualizada);
    expect(client.getQueryData<Tarefa[]>(abertas)?.find((t) => t.id === original.id)).toEqual(
      atualizada,
    );
    expect(client.getQueryData<Tarefa[]>(abertas)).toHaveLength(2);
    expect(client.getQueryData(chaveTarefa(original.id))).toEqual(atualizada);
    expect(lista[0].titulo).toBe('uma');
  });

  it('reordena um adiamento pela nova data sem mutar a lista anterior', async () => {
    const a = criar('a'),
      b = criar('b', { dataPlanejada: '2026-11-16' });
    const lista = [a, b];
    client.setQueryData(abertas, lista);
    await aplicarTarefa(client, { ...a, dataPlanejada: '2026-11-17' });
    expect(client.getQueryData<Tarefa[]>(abertas)?.map((t) => t.id)).toEqual(['b', 'a']);
    expect(lista.map((t) => t.id)).toEqual(['a', 'b']);
  });

  it('não cria uma lista incompleta quando ela ainda não foi consultada', async () => {
    await aplicarTarefa(client, criar('a'));
    expect(client.getQueryData(abertas)).toBeUndefined();
    expect(client.getQueryData(chaveTarefa('a'))).toEqual(criar('a'));
  });

  it('não reintroduz na lista de abertas uma tarefa já concluída no banco', async () => {
    const antiga = criar('a');
    client.setQueryData(abertas, [antiga, criar('b')]);
    const salva = { ...antiga, titulo: 'Corrigida', concluidaEm: '2026-11-15T14:00:00Z' };
    await aplicarTarefa(client, salva);
    expect(client.getQueryData<Tarefa[]>(abertas)?.map((t) => t.id)).toEqual(['b']);
    expect(client.getQueryData(chaveTarefa('a'))).toEqual(salva);
  });

  it('remove uma exclusão das listas e do detalhe, preservando outras tarefas', async () => {
    const a = criar('a'),
      b = criar('b');
    client.setQueryData(abertas, [a, b]);
    client.setQueryData(chaveTarefa('a'), a);
    client.setQueryData(chaveTarefa('b'), b);
    await removerTarefa(client, 'a');
    expect(client.getQueryData(abertas)).toEqual([b]);
    expect(client.getQueryData(chaveTarefa('a'))).toBeUndefined();
    expect(client.getQueryData(chaveTarefa('b'))).toEqual(b);
  });

  it('uma consulta antiga em andamento não sobrescreve a edição confirmada', async () => {
    const original = criar('a');
    client.setQueryData(abertas, [original]);
    let responder!: (lista: Tarefa[]) => void;
    const consulta = client
      .fetchQuery({
        queryKey: abertas,
        queryFn: () =>
          new Promise<Tarefa[]>((resolve) => {
            responder = resolve;
          }),
      })
      .catch(() => undefined);
    const salva = { ...original, titulo: 'Nome novo' };
    await aplicarTarefa(client, salva);
    responder([original]);
    await consulta;
    expect(client.getQueryData(abertas)).toEqual([salva]);
  });

  it('move a tarefa confirmada de abertas para concluídas', async () => {
    client.setQueryData(abertas, [criar('a'), criar('b')]);
    client.setQueryData(concluidas, []);
    const feita = criar('a', { concluidaEm: '2026-11-15T14:00:00Z' });
    await aplicarTarefa(client, feita);
    expect(client.getQueryData(abertas)).toEqual([criar('b')]);
    expect(client.getQueryData(concluidas)).toEqual([feita]);
    expect(client.getQueryData(chaveTarefa('a'))).toEqual(feita);
  });

  it('a mesma conclusão repetida não duplica o histórico', async () => {
    client.setQueryData(concluidas, []);
    const feita = criar('a', { concluidaEm: '2026-11-15T14:00:00Z' });
    await aplicarTarefa(client, feita);
    await aplicarTarefa(client, feita);
    expect(client.getQueryData(concluidas)).toEqual([feita]);
  });

  it('reabrir move de concluídas para abertas sem duplicar em respostas repetidas', async () => {
    const feita = criar('a', { concluidaEm: '2026-11-15T14:00:00Z' });
    client.setQueryData(concluidas, [feita]);
    client.setQueryData(abertas, [criar('b')]);
    const reaberta = { ...feita, concluidaEm: null };
    await aplicarTarefa(client, reaberta);
    await aplicarTarefa(client, reaberta);
    expect(client.getQueryData(concluidas)).toEqual([]);
    expect(client.getQueryData(abertas)).toEqual([reaberta, criar('b')]);
    expect(client.getQueryData(chaveTarefa('a'))).toEqual(reaberta);
  });

  it('ordena concluídas da mais recente para a antiga', async () => {
    const antiga = criar('a', { concluidaEm: '2026-11-14T14:00:00Z' });
    const nova = criar('b', { concluidaEm: '2026-11-15T14:00:00Z' });
    client.setQueryData(concluidas, [antiga]);
    await aplicarTarefa(client, nova);
    expect(client.getQueryData(concluidas)).toEqual([nova, antiga]);
  });

  it('editar uma concluída mantém a data e não a reabre', async () => {
    client.setQueryData(abertas, []);
    const feita = criar('a', { concluidaEm: '2026-11-15T14:00:00Z' });
    client.setQueryData(concluidas, [feita]);
    await aplicarTarefa(client, { ...feita, titulo: 'Corrigida' });
    expect(client.getQueryData(abertas)).toEqual([]);
    expect(client.getQueryData<Tarefa[]>(concluidas)?.[0]).toEqual({
      ...feita,
      titulo: 'Corrigida',
    });
  });

  it('excluir uma concluída remove também do histórico e do detalhe', async () => {
    const feita = criar('a', { concluidaEm: '2026-11-15T14:00:00Z' });
    client.setQueryData(concluidas, [feita]);
    client.setQueryData(chaveTarefa('a'), feita);
    await removerTarefa(client, 'a');
    expect(client.getQueryData(concluidas)).toEqual([]);
    expect(client.getQueryData(chaveTarefa('a'))).toBeUndefined();
  });
});
