import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';

export const chaveTarefas = ['tarefas'];

export function useTarefas(concluidas = false) {
  return useQuery({
    queryKey: [...chaveTarefas, concluidas ? 'concluidas' : 'abertas'],
    queryFn: concluidas ? api.tarefasConcluidas : api.tarefas,
  });
}

export function useTarefa(id?: string) {
  return useQuery({
    queryKey: [...chaveTarefas, 'detalhe', id],
    queryFn: () => api.tarefa(id!),
    enabled: Boolean(id),
  });
}
