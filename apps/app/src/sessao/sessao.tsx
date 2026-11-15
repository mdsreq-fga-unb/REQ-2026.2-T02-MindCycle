import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { AppState } from 'react-native';
import type {
  CadastroDto,
  ConfirmacaoRecuperacaoDto,
  EntradaDto,
  Tokens,
  Usuaria,
} from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { aoMudarTokens, carregarTokens, salvarTokens, tokensAtuais } from './tokens';

// HU11. Pendência: o tempo em segundo plano que reativa a trava do PIN ainda
// precisa de validação da equipe.
export const TRAVA_APOS_SEGUNDO_PLANO_MS = 60_000;

type Sessao = {
  /** Lendo os tokens salvos ou a conta: mantenha a splash. */
  carregando: boolean;
  autenticada: boolean;
  conta?: Usuaria;
  /** A conta não carregou (sem rede, por exemplo). */
  erroConta: boolean;
  recarregarConta: () => void;
  /** HU11: a conta tem PIN e a usuária ainda não o digitou nesta abertura. */
  travada: boolean;
  /** Marca o app como destravado, até fechar ou ficar um tempo em segundo plano. */
  destravar: () => void;
  entrar: (dados: EntradaDto) => Promise<void>;
  cadastrar: (dados: Omit<CadastroDto, 'fuso'>) => Promise<void>;
  /** HU26: confirma o código recebido por e-mail, troca a senha e já entra. */
  recuperar: (dados: ConfirmacaoRecuperacaoDto) => Promise<void>;
  sair: () => Promise<void>;
  /** Limpa a sessão só neste aparelho, sem avisar a API: a conta já foi excluída (HU36). */
  encerrarLocalmente: () => Promise<void>;
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
  // Só na memória do processo (HU11): fechar o app volta a travar. Entrar com
  // a senha, que é a credencial da conta, já conta como destravado.
  const [destravada, setDestravada] = useState(false);

  useEffect(() => {
    carregarTokens().then((salvos) => {
      setTokens(salvos);
      setTokensCarregados(true);
    });
    return aoMudarTokens((novos) => {
      setTokens(novos);
      if (!novos) {
        setDestravada(false);
      }
    });
  }, []);

  // De volta do segundo plano depois do tempo combinado, a trava reativa.
  useEffect(() => {
    let saiuEm: number | null = null;
    const ouvinte = AppState.addEventListener('change', (estado) => {
      if (estado === 'background') {
        saiuEm = Date.now();
      } else if (estado === 'active' && saiuEm !== null) {
        if (Date.now() - saiuEm >= TRAVA_APOS_SEGUNDO_PLANO_MS) {
          setDestravada(false);
        }
        saiuEm = null;
      }
    });
    return () => ouvinte.remove();
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
    setDestravada(true);
    await salvarTokens(novos);
  }

  const sessao: Sessao = {
    carregando: !tokensCarregados || (autenticada && conta.isPending),
    autenticada,
    conta: autenticada ? conta.data : undefined,
    erroConta: autenticada && conta.isError,
    recarregarConta: () => void conta.refetch(),
    travada:
      autenticada &&
      !destravada &&
      !!conta.data?.termosAceitos &&
      !!conta.data.tipoPin,
    destravar: () => setDestravada(true),
    entrar: async (dados) => iniciar(await api.entrar(dados)),
    cadastrar: async (dados) =>
      iniciar(
        await api.cadastrar({
          ...dados,
          fuso: fusoDoAparelho(),
        }),
      ),
    recuperar: async (dados) => iniciar(await api.confirmarRecuperacao(dados)),
    sair: async () => {
      const refreshToken = tokensAtuais()?.refreshToken;
      await salvarTokens(null);
      queryClient.clear();
      if (refreshToken) {
        // Revoga no servidor; se falhar, o token expira sozinho.
        await api.sair(refreshToken).catch(() => {});
      }
    },
    encerrarLocalmente: async () => {
      await salvarTokens(null);
      queryClient.clear();
    },
  };

  return <SessaoContext value={sessao}>{children}</SessaoContext>;
}

function fusoDoAparelho(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
