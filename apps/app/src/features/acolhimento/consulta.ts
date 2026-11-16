import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/endpoints';

export const chaveAcolhimento = ['acolhimento'];
const chaveSugestoes = [...chaveAcolhimento, 'sugestoes'];
const chaveMensagem = [...chaveAcolhimento, 'mensagem'];

/**
 * HU21: as sugestões de hoje. Sem staleTime de propósito — com o app aberto na
 * virada da meia-noite, a volta para a aba busca o dia novo em vez de manter as
 * sugestões de ontem na tela.
 */
export function useSugestoesAcolhimento() {
  return useQuery({ queryKey: chaveSugestoes, queryFn: api.sugestoesAcolhimento });
}

/**
 * HU22: a mensagem de acolhimento de hoje. Também sem staleTime para acompanhar
 * a virada do dia no aparelho.
 */
export function useMensagemAcolhimento() {
  return useQuery({ queryKey: chaveMensagem, queryFn: api.mensagemAcolhimento });
}
