import { z } from 'zod';
import { fusoSchema, type DataLocal } from './datas.js';

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
  fuso: fusoSchema,
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

// O app manda o fuso do aparelho quando ele muda (viagem, ajuste manual).
export const atualizacaoContaSchema = z.object({
  fuso: fusoSchema,
});
export type AtualizacaoContaDto = z.infer<typeof atualizacaoContaSchema>;

export interface Usuaria {
  id: string;
  email: string;
  fuso: string;
  /** Data de hoje no fuso da usuária, pelo relógio da API. */
  hoje: DataLocal;
  /** Aceitou a versão vigente dos termos (HU12, RNF02). */
  termosAceitos: boolean;
}
