import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import type { CadastroDto, EntradaDto, Tokens, Usuaria } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { aoMudarTokens, carregarTokens, salvarTokens, tokensAtuais } from './tokens';

type Sessao = {
  /** Lendo os tokens salvos ou a conta: mantenha a splash. */
  carregando: boolean;
  autenticada: boolean;
  conta?: Usuaria;
  /** A conta não carregou (sem rede, por exemplo). */
  erroConta: boolean;
  recarregarConta: () => void;
  entrar: (dados: EntradaDto) => Promise<void>;
  cadastrar: (dados: Omit<CadastroDto, 'fuso'>) => Promise<void>;
  sair: () => Promise<void>;
};

const SessaoContext = createContext<Sessao | null>(null);

export function useSessao(): Sessao {
  const sessao = use(SessaoContext);
  if (!sessao) {
    throw new Error('useSessao precisa estar dentro de <SessaoProvider>');
  }
  return sessao;
}

export function SessaoProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [tokensCarregados, setTokensCarregados] = useState(false);
  const [tokens, setTokens] = useState<Tokens | null>(null);

  useEffect(() => {
    carregarTokens().then((salvos) => {
      setTokens(salvos);
      setTokensCarregados(true);
    });
    return aoMudarTokens(setTokens);
  }, []);

  const autenticada = tokens !== null;
  const conta = useQuery({
    queryKey: ['conta'],
    queryFn: api.conta,
    enabled: autenticada,
  });

  // O "hoje" da usuária segue o fuso do aparelho (T2): se ela viajou ou mudou
  // o fuso, a conta acompanha assim que carrega. Se falhar, tenta na próxima.
  useEffect(() => {
    const fuso = fusoDoAparelho();
    if (conta.data && conta.data.fuso !== fuso) {
      api
        .atualizarConta({ fuso })
        .then((atualizada) => queryClient.setQueryData(['conta'], atualizada))
        .catch(() => {});
    }
  }, [conta.data, queryClient]);

  async function iniciar(novos: Tokens) {
    queryClient.clear();
    await salvarTokens(novos);
  }

  const sessao: Sessao = {
    carregando: !tokensCarregados || (autenticada && conta.isPending),
    autenticada,
    conta: autenticada ? conta.data : undefined,
    erroConta: autenticada && conta.isError,
    recarregarConta: () => void conta.refetch(),
    entrar: async (dados) => iniciar(await api.entrar(dados)),
    cadastrar: async (dados) =>
      iniciar(
        await api.cadastrar({
          ...dados,
          fuso: fusoDoAparelho(),
        }),
      ),
    sair: async () => {
      const refreshToken = tokensAtuais()?.refreshToken;
      await salvarTokens(null);
      queryClient.clear();
      if (refreshToken) {
        // Revoga no servidor; se falhar, o token expira sozinho.
        await api.sair(refreshToken).catch(() => {});
      }
    },
  };

  return <SessaoContext value={sessao}>{children}</SessaoContext>;
}

function fusoDoAparelho(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
