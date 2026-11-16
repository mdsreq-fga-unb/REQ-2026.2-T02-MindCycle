import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/endpoints';
import { chavePlanoDoDia } from '@/features/plano-do-dia/consulta';

/**
 * HU02: grava a sinalização e refaz a recomendação do dia, que passa a
 * considerar disposição baixa (como `useAplicarCheckin` depois de um registro).
 */
export function useSinalizarSobrecarga() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.sinalizarSobrecarga,
    // Sem esperar a lista nova: a confirmação aparece assim que a API grava
    // (RNF08, até 2 s). Um onSuccess que devolve a promessa a faria esperar.
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: chavePlanoDoDia });
    },
  });
}
