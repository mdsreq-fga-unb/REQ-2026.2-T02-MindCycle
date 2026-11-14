import { z } from 'zod';

// Datas de calendário no fuso da usuária (HU04, HU05, HU06, HU13). Os dias se
// contam pelo calendário, nunca por horas decorridas: de 23h de um dia à 1h do
// dia seguinte já é outro dia, e um dia com mudança de horário continua sendo
// um dia só.

/** Data de calendário local, no formato AAAA-MM-DD. */
export type DataLocal = string;

export const dataLocalSchema = z.iso.date();

/**
 * Aceita um fuso IANA que o Intl conheça, como "America/Sao_Paulo", ou "UTC". O
 * Intl também aceita deslocamentos fixos ("+03:00") e abreviações ("EST"), que
 * ignoram o horário de verão; esses ficam de fora.
 */
export function fusoValido(fuso: string): boolean {
  if (!/^(UTC|[A-Za-z_]+(\/[A-Za-z0-9_+-]+)+)$/.test(fuso)) {
    return false;
  }
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: fuso });
    return true;
  } catch {
    return false;
  }
}

export const fusoSchema = z.string().min(1).max(64).refine(fusoValido);

/** A data de calendário que o instante tem no fuso. */
export function dataLocal(instante: Date, fuso: string): DataLocal {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: fuso,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(instante);
  const parte = (tipo: Intl.DateTimeFormatPartTypes) =>
    partes.find((p) => p.type === tipo)?.value ?? '';
  return `${parte('year')}-${parte('month')}-${parte('day')}`;
}

/** Quantos dias de calendário vão de `de` até `ate` (negativo se `ate` vem antes). */
export function diasEntre(de: DataLocal, ate: DataLocal): number {
  return Math.round((emUtc(ate) - emUtc(de)) / MS_POR_DIA);
}

/** A data `dias` dias depois (ou antes, se negativo) de `data`. */
export function somarDias(data: DataLocal, dias: number): DataLocal {
  return new Date(emUtc(data) + dias * MS_POR_DIA).toISOString().slice(0, 10);
}

const MS_POR_DIA = 24 * 60 * 60 * 1000;

// Meia-noite UTC da data: em UTC não há mudança de horário, então a diferença
// entre duas datas é sempre um múltiplo exato de 24 horas.
function emUtc(data: DataLocal): number {
  if (!dataLocalSchema.safeParse(data).success) {
    throw new RangeError(`Data local inválida: ${data}`);
  }
  const [ano, mes, dia] = data.split('-').map(Number);
  return Date.UTC(ano!, mes! - 1, dia!);
}
