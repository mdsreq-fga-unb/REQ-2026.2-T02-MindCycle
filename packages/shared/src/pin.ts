import { z } from 'zod';

/** Pétalas da flor na tela de PIN (RNF09). */
export const PIN_PETALAS = 6;
/** Toques que formam o PIN de pétalas (RNF09): 6^4 = 1296 combinações, com repetição. */
export const PIN_TOQUES = 4;
// Pendência: o tamanho do PIN numérico ainda precisa de validação da equipe.
/** Dígitos do PIN numérico: 10^4 = 10.000 combinações, com repetição. */
export const PIN_DIGITOS = 4;
/** O maior dígito do PIN numérico; o menor é 0. */
export const PIN_DIGITO_MAXIMO = 9;

// A usuária escolhe como digita o PIN: num teclado ou tocando as pétalas.
export const TIPOS_PIN = ['numerico', 'petalas'] as const;
export const tipoPinSchema = z.enum(TIPOS_PIN);
export type TipoPin = z.infer<typeof tipoPinSchema>;

// O PIN é sempre a sequência digitada, como [1, 6, 3, 3]: dígitos de 0 a 9 ou
// pétalas de 1 a 6, conforme o tipo.
export const pinNumericoSchema = z
  .array(z.number().int().min(0).max(PIN_DIGITO_MAXIMO))
  .length(PIN_DIGITOS);
export const pinPetalasSchema = z
  .array(z.number().int().min(1).max(PIN_PETALAS))
  .length(PIN_TOQUES);

/** Qualquer sequência que um dos tipos aceita, sem saber o tipo. */
export type Pin = number[];

// Definir ou trocar o PIN, e o tipo, exige a senha da conta, assim como
// removê-lo. Cada tipo valida a sua própria faixa.
export const definicaoPinSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('numerico'),
    pin: pinNumericoSchema,
    senha: z.string().max(128),
  }),
  z.object({
    tipo: z.literal('petalas'),
    pin: pinPetalasSchema,
    senha: z.string().max(128),
  }),
]);
export type DefinicaoPinDto = z.infer<typeof definicaoPinSchema>;

export const remocaoPinSchema = z.object({
  senha: z.string().max(128),
});
export type RemocaoPinDto = z.infer<typeof remocaoPinSchema>;

// A faixa mais larga: o servidor confere contra o tipo guardado, e uma pétala
// fora da faixa é só um PIN incorreto, que conta tentativa.
export const verificacaoPinSchema = z.object({
  pin: pinNumericoSchema,
});
export type VerificacaoPinDto = z.infer<typeof verificacaoPinSchema>;
