import { describe, expect, it } from 'vitest';
import { faseNoCalendario, gradeDoMes } from './calendario.js';
import { podeEstimar } from './estimador-de-fase.js';
import type { InicioMenstruacao, PerfilCiclo } from './ciclo.js';

const inicio = (data: string): InicioMenstruacao => ({ id: data, data });
const regular = (duracaoMedia: number): PerfilCiclo => ({ duracaoMedia, irregular: false });

describe('gradeDoMes', () => {
  // Novembro de 2026 começa num domingo e tem 30 dias.
  it('monta as semanas de domingo a sábado, com vazios fora do mês', () => {
    const grade = gradeDoMes(2026, 11);
    expect(grade[0]).toEqual([
      '2026-11-01',
      '2026-11-02',
      '2026-11-03',
      '2026-11-04',
      '2026-11-05',
      '2026-11-06',
      '2026-11-07',
    ]);
    expect(grade.at(-1)).toEqual(['2026-11-29', '2026-11-30', null, null, null, null, null]);
    expect(grade.flat().filter(Boolean)).toHaveLength(30);
  });

  // Outubro de 2026 começa numa quinta-feira.
  it('deixa vazios antes do primeiro dia', () => {
    expect(gradeDoMes(2026, 10)[0]).toEqual([
      null,
      null,
      null,
      null,
      '2026-10-01',
      '2026-10-02',
      '2026-10-03',
    ]);
  });

  it('acerta fevereiro de ano bissexto', () => {
    expect(gradeDoMes(2028, 2).flat().filter(Boolean)).toHaveLength(29);
  });
});

describe('faseNoCalendario (HU10)', () => {
  const ciclo = { inicios: [inicio('2026-11-01'), inicio('2026-10-04')], perfil: regular(28) };

  it('pinta cada dia pela fase do ciclo que o contém', () => {
    expect(faseNoCalendario('2026-11-01', ciclo)).toBe('menstrual');
    expect(faseNoCalendario('2026-11-14', ciclo)).toBe('ovulatoria');
    expect(faseNoCalendario('2026-11-28', ciclo)).toBe('lutea');
  });

  it('usa o início anterior para os dias de um ciclo passado', () => {
    expect(faseNoCalendario('2026-10-04', ciclo)).toBe('menstrual');
    expect(faseNoCalendario('2026-10-17', ciclo)).toBe('ovulatoria');
  });

  // Sem previsão do próximo ciclo, pela mesma regra da HU05.
  it('não pinta depois do fim da duração informada', () => {
    expect(faseNoCalendario('2026-11-29', ciclo)).toBeNull();
    expect(faseNoCalendario('2026-12-10', ciclo)).toBeNull();
  });

  it('não pinta antes do primeiro início registrado', () => {
    expect(faseNoCalendario('2026-10-03', ciclo)).toBeNull();
  });

  it('não pinta sem estimativa possível', () => {
    const inicios = [inicio('2026-11-01')];
    expect(faseNoCalendario('2026-11-02', { inicios, perfil: null })).toBeNull();
    expect(
      faseNoCalendario('2026-11-02', { inicios, perfil: { duracaoMedia: null, irregular: true } }),
    ).toBeNull();
    expect(faseNoCalendario('2026-11-02', { inicios, perfil: regular(40) })).toBeNull();
  });
});

// Revisão do PR #118, ponto 1: um ciclo que já fechou termina no próximo início.
describe('faseNoCalendario em ciclos já fechados', () => {
  it('usa a duração real do ciclo, sem deixar buraco no fim', () => {
    // 01/10 a 01/11: 32 dias reais, com média informada de 28.
    const ciclo = { inicios: [inicio('2026-11-02'), inicio('2026-10-01')], perfil: regular(28) };
    expect(faseNoCalendario('2026-10-29', ciclo)).toBe('lutea');
    expect(faseNoCalendario('2026-11-01', ciclo)).toBe('lutea');
  });

  it('põe a ovulatória pela duração real, não pela média', () => {
    // 04/10 a 27/10: 24 dias reais. A ovulatória fica nos dias 9 a 11 (12 a 14/10).
    const ciclo = { inicios: [inicio('2026-10-28'), inicio('2026-10-04')], perfil: regular(28) };
    expect(faseNoCalendario('2026-10-12', ciclo)).toBe('ovulatoria');
    expect(faseNoCalendario('2026-10-14', ciclo)).toBe('ovulatoria');
    expect(faseNoCalendario('2026-10-16', ciclo)).toBe('lutea');
  });

  it('ciclo fechado fora da faixa do modelo fica sem cor', () => {
    // 01/09 a 15/10: 45 dias.
    const ciclo = { inicios: [inicio('2026-10-16'), inicio('2026-09-01')], perfil: regular(28) };
    expect(faseNoCalendario('2026-09-02', ciclo)).toBeNull();
  });
});

describe('podeEstimar', () => {
  it('só com ciclo regular e duração dentro da faixa do modelo', () => {
    expect(podeEstimar(regular(28))).toBe(true);
    expect(podeEstimar(regular(40))).toBe(false);
    expect(podeEstimar({ duracaoMedia: null, irregular: true })).toBe(false);
    expect(podeEstimar(null)).toBe(false);
  });
});
