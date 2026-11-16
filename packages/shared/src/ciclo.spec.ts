import { describe, expect, it } from 'vitest';
import { cicloPreenchido } from './ciclo.js';

const inicio = { id: 'a1b2', data: '2026-11-15' };

describe('cicloPreenchido', () => {
  it('é verdadeiro com um início e a duração média', () => {
    const ciclo = { inicios: [inicio], perfil: { duracaoMedia: 28, irregular: false } };
    expect(cicloPreenchido(ciclo)).toBe(true);
  });

  it('é verdadeiro com um início e a indicação de ciclo irregular', () => {
    const ciclo = { inicios: [inicio], perfil: { duracaoMedia: null, irregular: true } };
    expect(cicloPreenchido(ciclo)).toBe(true);
  });

  it('é falso sem nenhum início, mesmo com a duração informada', () => {
    const ciclo = { inicios: [], perfil: { duracaoMedia: 28, irregular: false } };
    expect(cicloPreenchido(ciclo)).toBe(false);
  });

  it('é falso sem as características do ciclo, mesmo com um início', () => {
    expect(cicloPreenchido({ inicios: [inicio], perfil: null })).toBe(false);
  });
});
