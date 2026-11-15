import { z } from 'zod';
import { dataLocalSchema, type DataLocal } from './datas.js';

// HU06, HU07: entradas do cálculo da fase (HU05). Aqui só se registra e consulta.

export const inicioMenstruacaoSchema = z.object({
  data: dataLocalSchema,
});
export type InicioMenstruacaoDto = z.infer<typeof inicioMenstruacaoSchema>;

// Limite só de sanidade: a faixa clínica aceita ainda depende da cliente (HU05).
export const DURACAO_MEDIA_MINIMA = 15;
export const DURACAO_MEDIA_MAXIMA = 60;

/** Mantém a duração dentro da faixa aceita, como no seletor de "−" e "+" do app. */
export function limitarDuracao(dias: number): number {
  return Math.min(DURACAO_MEDIA_MAXIMA, Math.max(DURACAO_MEDIA_MINIMA, dias));
}

// Ciclo irregular não tem duração média: se vier junto, é ignorada.
export const perfilCicloSchema = z.discriminatedUnion('irregular', [
  z.object({ irregular: z.literal(true) }),
  z.object({
    irregular: z.literal(false),
    duracaoMedia: z.number().int().min(DURACAO_MEDIA_MINIMA).max(DURACAO_MEDIA_MAXIMA),
  }),
]);
export type PerfilCicloDto = z.infer<typeof perfilCicloSchema>;

export interface InicioMenstruacao {
  id: string;
  data: DataLocal;
}

export interface PerfilCiclo {
  duracaoMedia: number | null;
  irregular: boolean;
}

export interface Ciclo {
  /** Do mais recente para o mais antigo. */
  inicios: InicioMenstruacao[];
  /** Null enquanto a usuária não informou nada (HU07). */
  perfil: PerfilCiclo | null;
}

/**
 * Já há um início (HU06) e as características (HU07): a aba Ciclo troca o
 * formulário pela tela "Seu ciclo". Faltando um dos dois, o formulário volta.
 */
export function cicloPreenchido(ciclo: Ciclo): boolean {
  return ciclo.inicios.length > 0 && ciclo.perfil !== null;
}
