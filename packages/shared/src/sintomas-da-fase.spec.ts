import { describe, expect, it } from 'vitest';
import { SINTOMAS } from './checkin.js';
import { FASES } from './fases.js';
import { SINTOMAS_COMUNS_POR_FASE, sintomasComunsDaFase } from './sintomas-da-fase.js';

describe('sintomas comuns por fase (HU01, rascunho a validar com a cliente)', () => {
  it('cobre as quatro fases', () => {
    expect(Object.keys(SINTOMAS_COMUNS_POR_FASE).sort()).toEqual([...FASES].sort());
  });

  // Mesmos identificadores do registro (HU04), para a HU09 cruzar fase e sintomas.
  it('usa só sintomas da lista do registro, sem repetir', () => {
    for (const fase of FASES) {
      const lista = SINTOMAS_COMUNS_POR_FASE[fase];
      expect(lista.every((s) => (SINTOMAS as readonly string[]).includes(s))).toBe(true);
      expect(new Set(lista).size).toBe(lista.length);
    }
  });

  it('a menstrual traz cólica e a lútea traz cansaço, inchaço e irritabilidade', () => {
    expect(sintomasComunsDaFase('menstrual')).toContain('colica');
    expect(sintomasComunsDaFase('lutea')).toEqual(
      expect.arrayContaining(['cansaco', 'inchaco', 'irritabilidade']),
    );
  });
});
