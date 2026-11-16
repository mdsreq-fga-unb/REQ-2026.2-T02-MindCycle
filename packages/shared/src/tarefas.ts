import { z } from 'zod';
import { dataLocalSchema, type DataLocal } from './datas.js';

/** Disposição, energia necessária e prioridade (HU13): 1 baixa, 2 média, 3 alta. */
export const nivelSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export type Nivel = z.infer<typeof nivelSchema>;

/** Limites de sanidade para a duração, em minutos; a cliente ainda não os definiu. */
export const DURACAO_MINIMA_MINUTOS = 5;
export const DURACAO_MAXIMA_MINUTOS = 720;

// HU17. A duração é opcional (decisão da cliente); a data planejada não vem do
// app: nasce no "hoje" da usuária, no momento do cadastro.
export const cadastroTarefaSchema = z.object({
  titulo: z.string().trim().min(1).max(120),
  prazo: dataLocalSchema,
  prioridade: nivelSchema,
  energia: nivelSchema,
  duracaoMinutos: z
    .number()
    .int()
    .min(DURACAO_MINIMA_MINUTOS)
    .max(DURACAO_MAXIMA_MINUTOS)
    .optional(),
});
export type CadastroTarefaDto = z.infer<typeof cadastroTarefaSchema>;

/** HU16: altera os dados da tarefa, sem mover seu planejamento ou sua conclusão. */
export const atualizacaoTarefaSchema = cadastroTarefaSchema
  .extend({ duracaoMinutos: cadastroTarefaSchema.shape.duracaoMinutos.nullable() })
  .strict();
export type AtualizacaoTarefaDto = z.infer<typeof atualizacaoTarefaSchema>;

/** HU18: o adiamento manual altera somente o dia de execução, nunca o prazo. */
export const adiamentoTarefaSchema = z
  .object({
    dataPlanejada: dataLocalSchema,
  })
  .strict();
export type AdiamentoTarefaDto = z.infer<typeof adiamentoTarefaSchema>;

export interface Tarefa {
  id: string;
  titulo: string;
  prazo: DataLocal;
  prioridade: Nivel;
  energia: Nivel;
  duracaoMinutos: number | null;
  /** O dia em que a tarefa será feita: nasce no cadastro; HU18 e HU15 a movem. */
  dataPlanejada: DataLocal;
  criadaEm: string;
  /** Instante da conclusão (HU20); null enquanto a tarefa estiver em aberto. */
  concluidaEm: string | null;
}
