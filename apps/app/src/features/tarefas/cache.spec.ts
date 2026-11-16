import type { Tarefa } from '@mindcycle/shared';
import { QueryClient } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { aplicarTarefa, chaveTarefa, chaveTarefas, removerTarefa } from './cache';

const abertas = [...chaveTarefas, 'abertas'];
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
});
