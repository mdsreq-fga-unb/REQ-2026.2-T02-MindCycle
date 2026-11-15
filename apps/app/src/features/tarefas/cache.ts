import type { Tarefa } from '@mindcycle/shared';
import type { QueryClient } from '@tanstack/react-query';

export const chaveTarefas = ['tarefas'];
export const chaveTarefa = (id: string) => [...chaveTarefas, 'detalhe', id];

/** Aplica apenas uma resposta confirmada da API, mesmo se a reconsulta falhar. */
export async function aplicarTarefa(client: QueryClient, tarefa: Tarefa) {
  await client.cancelQueries({ queryKey: chaveTarefas });
  client.setQueryData(chaveTarefa(tarefa.id), tarefa);
  client.setQueryData<Tarefa[]>([...chaveTarefas, 'abertas'], (lista) => {
    if (!lista) return undefined;
    const atualizada = lista.filter((item) => item.id !== tarefa.id);
    if (!tarefa.concluidaEm) atualizada.push(tarefa);
    return atualizada.sort(
      (a, b) =>
        a.dataPlanejada.localeCompare(b.dataPlanejada) || a.criadaEm.localeCompare(b.criadaEm),
    );
  });
}

export async function removerTarefa(client: QueryClient, id: string) {
  await client.cancelQueries({ queryKey: chaveTarefas });
  client.setQueryData<Tarefa[]>([...chaveTarefas, 'abertas'], (lista) =>
    lista?.filter((tarefa) => tarefa.id !== id),
  );
  client.removeQueries({ queryKey: chaveTarefa(id), exact: true });
}
