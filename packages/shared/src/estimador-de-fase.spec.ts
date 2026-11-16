import { describe, expect, it } from 'vitest';
import type { InicioMenstruacao, PerfilCiclo } from './ciclo.js';
import { faseDoDia, situacaoDoCiclo } from './estimador-de-fase.js';
import type { Fase } from './fases.js';

const HOJE = '2026-11-15';
const inicio = (data: string): InicioMenstruacao => ({ id: data, data });
const regular = (duracaoMedia: number): PerfilCiclo => ({ duracaoMedia, irregular: false });

/** A fase de cada dia, do 1 ao último, para ler a tabela do modelo de uma vez. */
const fases = (duracao: number) =>
  Array.from({ length: duracao }, (_, i) => faseDoDia(i + 1, duracao));

const contar = (lista: (Fase | null)[], fase: Fase) => lista.filter((f) => f === fase).length;

describe('faseDoDia (modelo proposto pela equipe, a validar com a cliente)', () => {
  it('ciclo de 28 dias: menstrual 1-5, folicular 6-12, ovulatória 13-15, lútea 16-28', () => {
    const f = fases(28);
    expect(f.slice(0, 5).every((x) => x === 'menstrual')).toBe(true);
    expect(f[5]).toBe('folicular'); // dia 6
    expect(f[11]).toBe('folicular'); // dia 12
    expect(f[12]).toBe('ovulatoria'); // dia 13
    expect(f[14]).toBe('ovulatoria'); // dia 15
    expect(f[15]).toBe('lutea'); // dia 16
    expect(f[27]).toBe('lutea'); // dia 28
  });

  it('ciclo de 35 dias: ovulatória 20-22 e lútea 23-35', () => {
    const f = fases(35);
    expect(f[18]).toBe('folicular'); // dia 19
    expect(f[19]).toBe('ovulatoria'); // dia 20
    expect(f[21]).toBe('ovulatoria'); // dia 22
    expect(f[22]).toBe('lutea'); // dia 23
    expect(f[34]).toBe('lutea'); // dia 35
  });

  // Limite conhecido do modelo, a levar para a cliente: o ciclo curto fica sem folicular.
  it('ciclo de 21 dias: ovulatória logo depois da menstrual, sem dia folicular', () => {
    const f = fases(21);
    expect(f[4]).toBe('menstrual'); // dia 5
    expect(f[5]).toBe('ovulatoria'); // dia 6
    expect(f[7]).toBe('ovulatoria'); // dia 8
    expect(f[8]).toBe('lutea'); // dia 9
    expect(contar(f, 'folicular')).toBe(0);
  });

  it('a ovulatória dura sempre 3 dias e a lútea 13, dentro da faixa do modelo', () => {
    for (let duracao = 21; duracao <= 35; duracao++) {
      expect(contar(fases(duracao), 'ovulatoria')).toBe(3);
      expect(contar(fases(duracao), 'lutea')).toBe(13);
    }
  });

  it('não atribui fase fora do ciclo nem fora da faixa do modelo', () => {
    expect(faseDoDia(0, 28)).toBeNull();
    expect(faseDoDia(29, 28)).toBeNull();
    expect(faseDoDia(10, 20)).toBeNull();
    expect(faseDoDia(10, 36)).toBeNull();
  });
});

describe('situacaoDoCiclo (HU05)', () => {
  it('conta o início como dia 1 e estima a fase', () => {
    expect(
      situacaoDoCiclo({ inicios: [inicio(HOJE)], perfil: regular(28), hoje: HOJE }),
    ).toEqual({ estimada: true, diaDoCiclo: 1, fase: 'menstrual', duracao: 28 });
  });

  it('conta dias de calendário: de 10/11 a 15/11 é o dia 6', () => {
    const situacao = situacaoDoCiclo({
      inicios: [inicio('2026-11-10')],
      perfil: regular(28),
      hoje: HOJE,
    });
    expect(situacao).toEqual({ estimada: true, diaDoCiclo: 6, fase: 'folicular', duracao: 28 });
  });

  it('usa o início mais recente que não está no futuro', () => {
    const situacao = situacaoDoCiclo({
      inicios: [inicio('2026-11-20'), inicio('2026-11-01'), inicio('2026-10-04')],
      perfil: regular(28),
      hoje: HOJE,
    });
    expect(situacao).toMatchObject({ estimada: true, diaDoCiclo: 15 });
  });

  it('sem início, não estima', () => {
    expect(situacaoDoCiclo({ inicios: [], perfil: regular(28), hoje: HOJE })).toEqual({
      estimada: false,
      motivo: 'sem_inicio',
      diaDoCiclo: null,
    });
  });

  it('sem as características do ciclo, não estima nem presume 28 dias', () => {
    expect(situacaoDoCiclo({ inicios: [inicio(HOJE)], perfil: null, hoje: HOJE })).toEqual({
      estimada: false,
      motivo: 'sem_duracao',
      diaDoCiclo: 1,
    });
  });

  it('com ciclo irregular, não estima', () => {
    const situacao = situacaoDoCiclo({
      inicios: [inicio('2026-11-10')],
      perfil: { duracaoMedia: null, irregular: true },
      hoje: HOJE,
    });
    expect(situacao).toEqual({ estimada: false, motivo: 'irregular', diaDoCiclo: 6 });
  });

  it('com duração fora da faixa do modelo, não estima', () => {
    const situacao = situacaoDoCiclo({
      inicios: [inicio('2026-11-10')],
      perfil: regular(40),
      hoje: HOJE,
    });
    expect(situacao).toEqual({ estimada: false, motivo: 'fora_do_modelo', diaDoCiclo: 6 });
  });

  // Regra da HU05: não reiniciar o ciclo sozinho; pedir o novo início.
  it('passado o último dia do ciclo, não estima nem recomeça a contagem', () => {
    const situacao = situacaoDoCiclo({
      inicios: [inicio('2026-10-10')],
      perfil: regular(28),
      hoje: HOJE,
    });
    expect(situacao).toEqual({ estimada: false, motivo: 'alem_da_duracao', diaDoCiclo: 37 });
  });

  it('no último dia do ciclo ainda estima', () => {
    const situacao = situacaoDoCiclo({
      inicios: [inicio('2026-10-19')],
      perfil: regular(28),
      hoje: HOJE,
    });
    expect(situacao).toEqual({ estimada: true, diaDoCiclo: 28, fase: 'lutea', duracao: 28 });
  });
});
