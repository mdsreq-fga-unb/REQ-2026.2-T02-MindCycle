import type { Tokens } from '@mindcycle/shared';

import { gravarItem, lerItem } from './armazenamento';

const CHAVE = 'mindcycle.tokens';

// Fonte única dos tokens: o cliente HTTP lê daqui e a sessão escuta as mudanças
// (por exemplo, quando a renovação falha e a usuária precisa entrar de novo).
let atuais: Tokens | null = null;
const ouvintes = new Set<(tokens: Tokens | null) => void>();

export async function carregarTokens(): Promise<Tokens | null> {
  const salvo = await lerItem(CHAVE);
  try {
    atuais = salvo ? (JSON.parse(salvo) as Tokens) : null;
  } catch {
    atuais = null;
  }
  return atuais;
}

export function tokensAtuais(): Tokens | null {
  return atuais;
}

export async function salvarTokens(tokens: Tokens | null): Promise<void> {
  atuais = tokens;
  ouvintes.forEach((ouvinte) => ouvinte(tokens));
  await gravarItem(CHAVE, tokens && JSON.stringify(tokens));
}

export function aoMudarTokens(ouvinte: (tokens: Tokens | null) => void): () => void {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}
