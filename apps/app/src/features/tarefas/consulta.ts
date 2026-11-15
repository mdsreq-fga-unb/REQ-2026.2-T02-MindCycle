import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';

export const chaveTarefas = ['tarefas'];

export function useTarefas() {
  return useQuery({ queryKey: chaveTarefas, queryFn: api.tarefas });
}
