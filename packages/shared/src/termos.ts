import { z } from 'zod';

export interface SecaoTermos {
  titulo: string;
  texto: string;
}

export interface Termos {
  versao: string;
  secoes: SecaoTermos[];
}

export const aceiteSchema = z.object({
  versao: z.string().min(1),
});
export type AceiteDto = z.infer<typeof aceiteSchema>;
