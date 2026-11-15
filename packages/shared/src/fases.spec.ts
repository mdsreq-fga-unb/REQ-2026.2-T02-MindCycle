import { describe, expect, it } from 'vitest';
import { FASES, faseSchema } from './fases.js';

describe('FASES', () => {
  it('lista as quatro fases na ordem em que acontecem no ciclo (HU28)', () => {
    expect(FASES).toEqual(['menstrual', 'folicular', 'ovulatoria', 'lutea']);
  });
});

describe('faseSchema', () => {
  it('aceita cada uma das quatro fases', () => {
    for (const fase of FASES) {
      expect(faseSchema.safeParse(fase).success).toBe(true);
    }
  });

  it('recusa o que não é uma fase, como um endereço digitado errado', () => {
    expect(faseSchema.safeParse('lútea').success).toBe(false);
    expect(faseSchema.safeParse('').success).toBe(false);
    expect(faseSchema.safeParse(undefined).success).toBe(false);
  });
});
