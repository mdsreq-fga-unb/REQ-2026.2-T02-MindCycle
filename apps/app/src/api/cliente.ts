import type { CodigoErro, RespostaErro, Tokens } from '@mindcycle/shared';

import { salvarTokens, tokensAtuais } from '@/sessao/tokens';

// No emulador Android, localhost é o próprio emulador: use EXPO_PUBLIC_API_URL=http://10.0.2.2:3000.
const BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export class ErroApi extends Error {
  constructor(
    readonly status: number,
    readonly codigo?: CodigoErro,
  ) {
    super(codigo ?? `HTTP ${status}`);
  }
}

type Opcoes = {
  metodo?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  corpo?: unknown;
  /** Rotas sem autenticação: não envia token nem tenta renovar. */
  publica?: boolean;
};

export async function pedir<T>(caminho: string, opcoes: Opcoes = {}): Promise<T> {
  let resposta = await enviar(caminho, opcoes);
  if (resposta.status === 401 && !opcoes.publica && tokensAtuais()) {
    if (await renovar()) {
      resposta = await enviar(caminho, opcoes);
    }
  }
  if (!resposta.ok) {
    const corpo = (await resposta.json().catch(() => ({}))) as RespostaErro;
    throw new ErroApi(resposta.status, corpo.codigo);
  }
  if (resposta.status === 204) {
    return undefined as T;
  }
  return (await resposta.json()) as T;
}

function enviar(caminho: string, { metodo = 'GET', corpo, publica }: Opcoes) {
  const headers: Record<string, string> = {};
  if (corpo !== undefined) {
    headers['content-type'] = 'application/json';
  }
  const tokens = tokensAtuais();
  if (!publica && tokens) {
    headers.authorization = `Bearer ${tokens.accessToken}`;
  }
  return fetch(`${BASE}${caminho}`, {
    method: metodo,
    headers,
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  });
}

// Várias requisições podem receber 401 ao mesmo tempo: todas esperam a mesma
// renovação, porque cada refresh token só vale uma vez.
let renovacao: Promise<boolean> | null = null;

function renovar(): Promise<boolean> {
  renovacao ??= (async () => {
    try {
      const refreshToken = tokensAtuais()?.refreshToken;
      const resposta = await fetch(`${BASE}/auth/renovacao`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!resposta.ok) {
        await salvarTokens(null);
        return false;
      }
      await salvarTokens((await resposta.json()) as Tokens);
      return true;
    } catch {
      // Sem rede: mantém a sessão e deixa a requisição original falhar.
      return false;
    } finally {
      renovacao = null;
    }
  })();
  return renovacao;
}
