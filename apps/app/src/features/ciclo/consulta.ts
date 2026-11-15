import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';

export const chaveCiclo = ['ciclo'];

export function useCiclo() {
  return useQuery({ queryKey: chaveCiclo, queryFn: api.ciclo });
}
