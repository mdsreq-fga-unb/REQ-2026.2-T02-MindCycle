import { z } from 'zod';
import { dataLocalSchema, type DataLocal } from './datas.js';
import type { SituacaoCiclo } from './estimador-de-fase.js';

// HU06, HU07: entradas do cálculo da fase (HU05). Aqui só se registra e consulta.

export const inicioMenstruacaoSchema = z.object({
  data: dataLocalSchema,
});
export type InicioMenstruacaoDto = z.infer<typeof inicioMenstruacaoSchema>;

// Limite só de sanidade: a faixa clínica aceita ainda depende da cliente (HU05).
export const DURACAO_MEDIA_MINIMA = 15;
export const DURACAO_MEDIA_MAXIMA = 60;

// Onde o seletor de duração do app começa quando a usuária toca nele pela
// primeira vez. Não é presumido em cálculo nenhum: só vale o que ela salvar (HU05).
export const DURACAO_MEDIA_REFERENCIA = 28;

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
  /** A situação de hoje, calculada pela API no fuso da usuária (HU05). */
  situacao: SituacaoCiclo;
}

/**
 * Já há um início (HU06) e as características (HU07): a aba Ciclo troca o
 * formulário pela tela "Seu ciclo". Faltando um dos dois, o formulário volta.
 */
export function cicloPreenchido(ciclo: Pick<Ciclo, 'inicios' | 'perfil'>): boolean {
  return ciclo.inicios.length > 0 && ciclo.perfil !== null;
}
