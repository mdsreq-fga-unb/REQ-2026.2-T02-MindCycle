import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';
import { chaveTarefas } from '@/features/tarefas/consulta';

// Debaixo da chave das tarefas: cadastrar ou adiar uma tarefa já invalida as
// duas. Um novo registro de disposição invalida esta (useAplicarCheckin).
export const chavePlanoDoDia = [...chaveTarefas, 'hoje'];

/** HU13: as tarefas do dia em ordem de precedência, calculadas pela API. */
export function useRecomendacaoDoDia() {
  return useQuery({ queryKey: chavePlanoDoDia, queryFn: api.recomendacaoDoDia });
}
