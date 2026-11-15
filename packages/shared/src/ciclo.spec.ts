import { describe, expect, it } from 'vitest';
import {
  DURACAO_MEDIA_MAXIMA,
  DURACAO_MEDIA_MINIMA,
  cicloPreenchido,
  limitarDuracao,
  type Ciclo,
} from './ciclo.js';

const inicio = { id: 'a1b2', data: '2026-11-15' };

describe('cicloPreenchido', () => {
  it('é verdadeiro com um início e a duração média', () => {
    const ciclo: Ciclo = { inicios: [inicio], perfil: { duracaoMedia: 28, irregular: false } };
    expect(cicloPreenchido(ciclo)).toBe(true);
  });

  it('é verdadeiro com um início e a indicação de ciclo irregular', () => {
    const ciclo: Ciclo = { inicios: [inicio], perfil: { duracaoMedia: null, irregular: true } };
    expect(cicloPreenchido(ciclo)).toBe(true);
  });

  it('é falso sem nenhum início, mesmo com a duração informada', () => {
    const ciclo: Ciclo = { inicios: [], perfil: { duracaoMedia: 28, irregular: false } };
    expect(cicloPreenchido(ciclo)).toBe(false);
  });

  it('é falso sem as características do ciclo, mesmo com um início', () => {
    expect(cicloPreenchido({ inicios: [inicio], perfil: null })).toBe(false);
  });
});

describe('limitarDuracao', () => {
  it('mantém uma duração dentro da faixa', () => {
    expect(limitarDuracao(28)).toBe(28);
  });

  it('não deixa passar do mínimo nem do máximo', () => {
    expect(limitarDuracao(DURACAO_MEDIA_MINIMA - 1)).toBe(DURACAO_MEDIA_MINIMA);
    expect(limitarDuracao(DURACAO_MEDIA_MAXIMA + 1)).toBe(DURACAO_MEDIA_MAXIMA);
  });
});
