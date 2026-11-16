import type { Tarefa } from '@mindcycle/shared';
import type { QueryClient } from '@tanstack/react-query';

export const chaveTarefas = ['tarefas'];
export const chaveTarefa = (id: string) => [...chaveTarefas, 'detalhe', id];

function atualizarLista(lista: Tarefa[] | undefined, tarefa: Tarefa, concluidas: boolean) {
  if (!lista) return undefined;
  const pertence = Boolean(tarefa.concluidaEm) === concluidas;
  const nova = lista.filter((item) => item.id !== tarefa.id);
  if (pertence) nova.push(tarefa);
  return nova.sort((a, b) =>
    concluidas
      ? (b.concluidaEm ?? '').localeCompare(a.concluidaEm ?? '') ||
        b.criadaEm.localeCompare(a.criadaEm)
      : a.dataPlanejada.localeCompare(b.dataPlanejada) || a.criadaEm.localeCompare(b.criadaEm),
  );
}

/** Aplica apenas uma resposta confirmada da API, mesmo se a reconsulta falhar. */
export async function aplicarTarefa(client: QueryClient, tarefa: Tarefa) {
  await client.cancelQueries({ queryKey: chaveTarefas });
  client.setQueryData(chaveTarefa(tarefa.id), tarefa);
  for (const concluidas of [false, true]) {
    client.setQueryData<Tarefa[]>(
      [...chaveTarefas, concluidas ? 'concluidas' : 'abertas'],
      (lista) => atualizarLista(lista, tarefa, concluidas),
    );
  }
}

export async function removerTarefa(client: QueryClient, id: string) {
  await client.cancelQueries({ queryKey: chaveTarefas });
  for (const situacao of ['abertas', 'concluidas']) {
    client.setQueryData<Tarefa[]>([...chaveTarefas, situacao], (lista) =>
      lista?.filter((tarefa) => tarefa.id !== id),
    );
  }
  client.removeQueries({ queryKey: chaveTarefa(id), exact: true });
}
