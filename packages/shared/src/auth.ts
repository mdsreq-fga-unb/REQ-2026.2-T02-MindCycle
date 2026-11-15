import { z } from 'zod';
import { fusoSchema, type DataLocal } from './datas.js';
import type { TipoPin } from './pin.js';

// Normaliza antes de validar: " Ana@Exemplo.com " vira "ana@exemplo.com".
const email = z
  .string()
  .trim()
  .normalize('NFC')
  .toLowerCase()
  .pipe(z.email());

// A mesma regra vale no cadastro e na redefinição da senha (HU26).
const senhaNova = z.string().min(8).max(128);

// HU25: o fuso vem do aparelho e define o "hoje" da usuária (HU04, HU05, HU13).
export const cadastroSchema = z.object({
  email,
  senha: senhaNova,
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

// HU26: o código de recuperação enviado por e-mail tem sempre este tamanho.
export const TAMANHO_CODIGO_RECUPERACAO = 6;

export const pedidoRecuperacaoSchema = z.object({ email });
export type PedidoRecuperacaoDto = z.infer<typeof pedidoRecuperacaoSchema>;

// O código não é validado no formato aqui: qualquer código que não confere
// recebe a mesma resposta, sem dizer à usuária o que estava errado.
export const confirmacaoRecuperacaoSchema = z.object({
  email,
  codigo: z.string().trim().min(1).max(32),
  novaSenha: senhaNova,
});
export type ConfirmacaoRecuperacaoDto = z.infer<
  typeof confirmacaoRecuperacaoSchema
>;

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

// HU36: excluir é irreversível, então a usuária confirma com a senha.
export const exclusaoContaSchema = z.object({
  senha: z.string().min(1).max(128),
});
export type ExclusaoContaDto = z.infer<typeof exclusaoContaSchema>;

export interface Usuaria {
  id: string;
  email: string;
  fuso: string;
  /** Data de hoje no fuso da usuária, pelo relógio da API. */
  hoje: DataLocal;
  /** Aceitou a versão vigente dos termos (HU12, RNF02). */
  termosAceitos: boolean;
  /** Tipo do PIN que protege a conta (HU11), ou null sem PIN: o app mostra a trava ao abrir. */
  tipoPin: TipoPin | null;
}
