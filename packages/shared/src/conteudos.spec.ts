import { describe, expect, it } from 'vitest';
import { SINTOMAS } from './checkin.js';
import { CONTEUDOS, recomendarConteudos } from './conteudos.js';
import { FASES } from './fases.js';

const porId = (id: string) => CONTEUDOS.find((c) => c.id === id)!;

describe('catálogo de conteúdos (HU09)', () => {
  it('todo conteúdo é ligado a pelo menos uma fase ou um sintoma válido', () => {
    for (const c of CONTEUDOS) {
      expect(c.fases.length + c.sintomas.length).toBeGreaterThan(0);
      expect(c.fases.every((f) => (FASES as readonly string[]).includes(f))).toBe(true);
      expect(c.sintomas.every((s) => (SINTOMAS as readonly string[]).includes(s))).toBe(true);
    }
  });

  it('cada fase tem pelo menos um conteúdo', () => {
    for (const fase of FASES) {
      expect(recomendarConteudos({ fase, sintomas: [] }).length).toBeGreaterThan(0);
    }
  });
});

describe('recomendarConteudos (HU09)', () => {
  // Critério de aceite: só entra o que se liga à fase atual ou a um sintoma registrado.
  it('só recomenda conteúdo ligado à fase ou a um sintoma registrado', () => {
    const ids = recomendarConteudos({ fase: 'lutea', sintomas: ['dor_de_cabeca'] });
    for (const id of ids) {
      const c = porId(id);
      expect(c.fases.includes('lutea') || c.sintomas.includes('dor_de_cabeca')).toBe(true);
    }
  });

  it('põe primeiro o que trata de um sintoma registrado', () => {
    const ids = recomendarConteudos({ fase: 'folicular', sintomas: ['colica'] });
    expect(porId(ids[0]).sintomas).toContain('colica');
  });

  it('recomenda no máximo três, sem repetir', () => {
    const ids = recomendarConteudos({ fase: 'lutea', sintomas: [...SINTOMAS] });
    expect(ids.length).toBeLessThanOrEqual(3);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('sem fase estimada, usa só os sintomas', () => {
    const ids = recomendarConteudos({ fase: null, sintomas: ['dificuldade_de_concentracao'] });
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((id) => porId(id).sintomas.includes('dificuldade_de_concentracao'))).toBe(true);
  });

  it('sem fase nem sintoma, não recomenda nada', () => {
    expect(recomendarConteudos({ fase: null, sintomas: [] })).toEqual([]);
  });
});
