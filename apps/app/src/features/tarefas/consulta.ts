import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';
import { chaveTarefa, chaveTarefas } from './cache';

export { chaveTarefa, chaveTarefas } from './cache';

export function useTarefas() {
  return useQuery({
    queryKey: [...chaveTarefas, 'abertas'],
    queryFn: api.tarefas,
  });
}

export function useTarefa(id?: string) {
  return useQuery({
    queryKey: chaveTarefa(id ?? ''),
    queryFn: () => api.tarefa(id!),
    enabled: Boolean(id),
  });
}
