import { z } from 'zod';

// As quatro fases do ciclo, na ordem em que acontecem. HU28 explica cada uma;
// HU05, HU10, HU01 e HU09 usam os mesmos identificadores.
export const FASES = ['menstrual', 'folicular', 'ovulatoria', 'lutea'] as const;
export type Fase = (typeof FASES)[number];

export const faseSchema = z.enum(FASES);
