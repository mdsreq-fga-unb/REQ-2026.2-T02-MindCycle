import { z } from 'zod';

// Normaliza antes de validar: " Ana@Exemplo.com " vira "ana@exemplo.com".
const email = z
  .string()
  .trim()
  .normalize('NFC')
  .toLowerCase()
  .pipe(z.email());

// HU25: o fuso vem do aparelho e define o "hoje" da usuária (HU04, HU05, HU13).
export const cadastroSchema = z.object({
  email,
  senha: z.string().min(8).max(128),
  fuso: z.string().min(1).max(64),
});
export type CadastroDto = z.infer<typeof cadastroSchema>;

// Sem tamanho mínimo: uma senha criada sob uma regra antiga continua válida.
export const entradaSchema = z.object({
  email,
  senha: z.string().max(128),
});
export type EntradaDto = z.infer<typeof entradaSchema>;

export const renovacaoSchema = z.object({
  refreshToken: z.string().min(1),
});
export type RenovacaoDto = z.infer<typeof renovacaoSchema>;

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  /** Validade do access token, em segundos. */
  expiresIn: number;
}

export interface Usuaria {
  id: string;
  email: string;
  fuso: string;
  /** Aceitou a versão vigente dos termos (HU12, RNF02). */
  termosAceitos: boolean;
}
