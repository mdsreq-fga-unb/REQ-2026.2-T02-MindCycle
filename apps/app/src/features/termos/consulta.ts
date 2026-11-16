import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';

export function useTermos() {
  return useQuery({ queryKey: ['termos'], queryFn: api.termos });
}
