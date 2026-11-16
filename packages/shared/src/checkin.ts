import { z } from 'zod';
import type { DataLocal } from './datas.js';
import { nivelSchema, type Nivel } from './tarefas.js';

// HU04. A lista é PROVISÓRIA: a cliente pediu ajustes na reunião de 05/10/2026 e
// ainda vai revisá-la. Ela precisa distinguir cansaço de desânimo. Os ids são
// estáveis (ficam gravados); os rótulos moram em textos.ts do app. Mudar a lista é
// trocar esta constante e os rótulos, e migrar os ids antigos que mudarem.
export const SINTOMAS = [
  'colica',
  'dor_de_cabeca',
  'dor_nas_costas',
  'sensibilidade_nos_seios',
  'inchaco',
  'nausea',
  'acne',
  'cansaco',
  'desanimo',
  'irritabilidade',
  'ansiedade',
  'alteracao_do_sono',
  'dificuldade_de_concentracao',
] as const;
export type Sintoma = (typeof SINTOMAS)[number];

export const sintomaSchema = z.enum(SINTOMAS);

/** Intensidade de um sintoma: 1 leve, 2 moderada, 3 intensa. */
export const intensidadeSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export type Intensidade = z.infer<typeof intensidadeSchema>;

export const sintomaRegistradoSchema = z.object({
  sintoma: sintomaSchema,
  intensidade: intensidadeSchema,
});
export type SintomaRegistrado = z.infer<typeof sintomaRegistradoSchema>;

// O registro só é concluído com a disposição e, para os sintomas, a intensidade de
// cada selecionado OU a indicação explícita de que não há sintomas. Ausência de
// registro não significa ausência de sintomas, por isso "sem sintomas" é um campo.
// Também serve à correção: ela substitui o conteúdo inteiro, com as mesmas regras.
export const registroCheckinSchema = z
  .object({
    disposicao: nivelSchema,
    semSintomas: z.boolean(),
    sintomas: z.array(sintomaRegistradoSchema).max(SINTOMAS.length),
  })
  .superRefine((registro, ctx) => {
    if (registro.semSintomas && registro.sintomas.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['sintomas'],
        message: 'Sem sintomas não pode vir junto com sintomas selecionados.',
      });
    }
    if (!registro.semSintomas && registro.sintomas.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['sintomas'],
        message: 'Informe os sintomas ou indique que não há sintomas.',
      });
    }
    const vistos = new Set<Sintoma>();
    for (const { sintoma } of registro.sintomas) {
      if (vistos.has(sintoma)) {
        ctx.addIssue({
          code: 'custom',
          path: ['sintomas'],
          message: `Sintoma repetido: ${sintoma}.`,
        });
        return;
      }
      vistos.add(sintoma);
    }
  });
export type RegistroCheckinDto = z.infer<typeof registroCheckinSchema>;

/** Quantos registros o histórico devolve por padrão e no máximo. */
export const LIMITE_PADRAO_CHECKINS = 30;
export const LIMITE_MAXIMO_CHECKINS = 100;

export const limiteCheckinsSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(LIMITE_MAXIMO_CHECKINS)
  .default(LIMITE_PADRAO_CHECKINS);

/**
 * Todo check-in é `registro`. A sinalização de sobrecarga (HU02) ficou numa
 * tabela própria e não vira check-in: `sobrecarga` não é usado.
 */
export type OrigemCheckin = 'registro' | 'sobrecarga';

export interface Checkin {
  id: string;
  /** O dia do registro no calendário da usuária. */
  dataLocal: DataLocal;
  /** O instante em que foi criado: a correção não o muda. */
  criadoEm: string;
  atualizadoEm: string;
  disposicao: Nivel;
  semSintomas: boolean;
  /** Na ordem da lista `SINTOMAS`. */
  sintomas: SintomaRegistrado[];
  origem: OrigemCheckin;
}

export interface CheckinsDoDia {
  /**
   * O mais recente do dia. A disposição dele vale para a recomendação e o
   * reajuste (HU13, HU15), a menos que uma sinalização de sobrecarga venha
   * depois (HU02).
   */
  vigente: Checkin | null;
  /** Os de hoje, do mais recente para o mais antigo. */
  registros: Checkin[];
}
