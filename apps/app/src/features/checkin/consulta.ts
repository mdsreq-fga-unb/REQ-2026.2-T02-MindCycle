import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Checkin, CheckinsDoDia } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { chavePlanoDoDia } from '@/features/plano-do-dia/consulta';

export const chaveCheckins = ['checkins'];
const chaveHoje = [...chaveCheckins, 'hoje'];
const chaveHistorico = [...chaveCheckins, 'historico'];

export function useCheckinsDoDia() {
  return useQuery({ queryKey: chaveHoje, queryFn: api.checkinsDeHoje });
}

export function useHistoricoCheckins() {
  return useQuery({ queryKey: chaveHistorico, queryFn: api.historicoCheckins });
}

/**
 * Põe na tela o registro que a API acabou de devolver, sem esperar outra ida a
 * ela (RNF08). O mais recente do dia segue sendo o vigente, e a recomendação do
 * dia (HU13) é refeita com a disposição nova.
 */
export function useAplicarCheckin() {
  const queryClient = useQueryClient();
  return (checkin: Checkin, criado: boolean) => {
    queryClient.setQueryData<CheckinsDoDia>(chaveHoje, (atual) => {
      if (!atual) {
        return atual;
      }
      const existe = atual.registros.some((registro) => registro.id === checkin.id);
      if (!existe && !criado) {
        // Um registro de outro dia: nada muda em hoje.
        return atual;
      }
      const registros = existe
        ? atual.registros.map((registro) => (registro.id === checkin.id ? checkin : registro))
        : [checkin, ...atual.registros];
      return { vigente: registros[0] ?? null, registros };
    });
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: chaveHistorico }),
      queryClient.invalidateQueries({ queryKey: chavePlanoDoDia }),
    ]);
  };
}
