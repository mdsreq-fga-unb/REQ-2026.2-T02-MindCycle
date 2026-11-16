import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { RecomendacaoReajustada } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { chaveTarefas } from '@/features/tarefas/consulta';

// Debaixo da chave das tarefas: cadastrar ou adiar uma tarefa já invalida as
// duas. Um novo registro de disposição invalida esta (useAplicarCheckin).
export const chavePlanoDoDia = [...chaveTarefas, 'hoje'];

// O dia entra junto: a mesma tarefa movida de novo no dia seguinte também muda
// a data planejada.
const assinaturaMovidas = (plano?: RecomendacaoReajustada) =>
  `${plano?.hoje}|${(plano?.movidas ?? []).map((tarefa) => tarefa.id).join()}`;

/**
 * HU13: as tarefas do dia em ordem de precedência, calculadas pela API. HU15: o
 * pedido já devolve a lista reajustada pela disposição vigente.
 */
export function useRecomendacaoDoDia() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: chavePlanoDoDia,
    queryFn: async () => {
      const anterior = queryClient.getQueryData<RecomendacaoReajustada>(chavePlanoDoDia);
      const plano = await api.recomendacaoDoDia();
      // O reajuste muda a data planejada: se as movidas mudaram, a lista da aba
      // Tarefas é refeita. Só ela (exact), para não pedir o plano de novo.
      if (assinaturaMovidas(anterior) !== assinaturaMovidas(plano)) {
        void queryClient.invalidateQueries({ queryKey: chaveTarefas, exact: true });
      }
      return plano;
    },
  });
}

/** HU15: traz de volta para hoje uma tarefa que o reajuste passou para amanhã. */
export function useDesfazerReajuste() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tarefaId: string) => api.desfazerReajuste(tarefaId),
    // A API devolve o plano já refeito: ele vai direto para a tela. Nada aqui
    // é esperado, para a confirmação aparecer na hora.
    onSuccess: (plano) => {
      // Um pedido do plano em andamento traria a lista de antes do desfazer.
      // Invalidar cancela esse pedido e faz outro, que já vê o desfazer.
      const buscava = queryClient.isFetching({ queryKey: chavePlanoDoDia, exact: true }) > 0;
      queryClient.setQueryData(chavePlanoDoDia, plano);
      if (buscava) {
        void queryClient.invalidateQueries({ queryKey: chavePlanoDoDia, exact: true });
      }
      void queryClient.invalidateQueries({ queryKey: chaveTarefas, exact: true });
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: chavePlanoDoDia, exact: true });
    },
  });
}
