import { describe, expect, it } from 'vitest';
import {
  dataLocal,
  diasEntre,
  formatarDataBr,
  fusoValido,
  horaLocal,
  lerDataBr,
  mascararDataBr,
  somarDias,
} from './datas.js';

describe('dataLocal', () => {
  it('usa o calendário do fuso, não o de UTC', () => {
    // 02:30 UTC de 15/11 ainda é 14/11 em São Paulo (UTC-3) e já é 15/11 em Tóquio.
    const instante = new Date('2026-11-15T02:30:00Z');
    expect(dataLocal(instante, 'America/Sao_Paulo')).toBe('2026-11-14');
    expect(dataLocal(instante, 'Asia/Tokyo')).toBe('2026-11-15');
    expect(dataLocal(instante, 'UTC')).toBe('2026-11-15');
  });

  it('vira o dia exatamente à meia-noite local', () => {
    expect(dataLocal(new Date('2026-11-15T02:59:59Z'), 'America/Sao_Paulo')).toBe('2026-11-14');
    expect(dataLocal(new Date('2026-11-15T03:00:00Z'), 'America/Sao_Paulo')).toBe('2026-11-15');
  });

  it('completa mês e dia com zero', () => {
    expect(dataLocal(new Date('2026-03-05T12:00:00Z'), 'UTC')).toBe('2026-03-05');
  });
});

describe('diasEntre', () => {
  it('conta dias de calendário', () => {
    expect(diasEntre('2026-11-14', '2026-11-14')).toBe(0);
    expect(diasEntre('2026-11-14', '2026-11-15')).toBe(1);
    expect(diasEntre('2026-11-15', '2026-11-14')).toBe(-1);
    expect(diasEntre('2026-10-30', '2026-11-02')).toBe(3);
    expect(diasEntre('2028-02-28', '2028-03-01')).toBe(2);
  });

  it('dá o dia 1 do ciclo no próprio dia de início (HU05)', () => {
    const inicio = '2026-11-14';
    expect(diasEntre(inicio, '2026-11-14') + 1).toBe(1);
    expect(diasEntre(inicio, '2026-12-11') + 1).toBe(28);
  });

  it('não depende das horas: 23h de um dia à 1h do outro é um dia', () => {
    const fuso = 'America/Sao_Paulo';
    const de = dataLocal(new Date('2026-11-15T02:00:00Z'), fuso); // 23h de 14/11
    const ate = dataLocal(new Date('2026-11-15T04:00:00Z'), fuso); // 1h de 15/11
    expect(diasEntre(de, ate)).toBe(1);
  });

  it('atravessa a mudança de horário sem perder nem ganhar dia', () => {
    // Nova York adianta o relógio em 08/03/2026: aquele dia tem 23 horas.
    const fuso = 'America/New_York';
    const de = dataLocal(new Date('2026-03-07T17:00:00Z'), fuso);
    const ate = dataLocal(new Date('2026-03-09T16:00:00Z'), fuso);
    expect(diasEntre(de, ate)).toBe(2);
  });

  it('recusa data fora do formato', () => {
    expect(() => diasEntre('14/11/2026', '2026-11-15')).toThrow(RangeError);
  });
});

describe('somarDias', () => {
  it('soma e subtrai atravessando mês e ano', () => {
    expect(somarDias('2026-11-30', 1)).toBe('2026-12-01');
    expect(somarDias('2026-12-31', 1)).toBe('2027-01-01');
    expect(somarDias('2026-03-01', -1)).toBe('2026-02-28');
    expect(somarDias('2026-11-14', 0)).toBe('2026-11-14');
  });
});

describe('fusoValido', () => {
  it('aceita fusos IANA e recusa o resto', () => {
    expect(fusoValido('America/Sao_Paulo')).toBe(true);
    expect(fusoValido('UTC')).toBe(true);
    expect(fusoValido('Brasil/Brasilia')).toBe(false);
    expect(fusoValido('GMT-3 qualquer')).toBe(false);
    expect(fusoValido('')).toBe(false);
  });

  it('recusa deslocamento fixo e abreviação, que ignoram o horário de verão', () => {
    expect(fusoValido('America/Argentina/Buenos_Aires')).toBe(true);
    expect(fusoValido('+03:00')).toBe(false);
    expect(fusoValido('EST')).toBe(false);
    expect(fusoValido('utc')).toBe(false);
  });
});

describe('formatarDataBr e lerDataBr', () => {
  it('vai e volta entre AAAA-MM-DD e DD/MM/AAAA', () => {
    expect(formatarDataBr('2026-11-05')).toBe('05/11/2026');
    expect(lerDataBr('05/11/2026')).toBe('2026-11-05');
    expect(lerDataBr(' 5/1/2026 ')).toBe('2026-01-05');
  });

  it('recusa o que não é uma data real', () => {
    for (const texto of ['', '31/02/2026', '29/02/2027', '2026-11-05', '5/11/26', '32/01/2026']) {
      expect(lerDataBr(texto)).toBeNull();
    }
    expect(lerDataBr('29/02/2028')).toBe('2028-02-29');
  });
});

describe('mascararDataBr', () => {
  it('põe as barras conforme os dígitos chegam', () => {
    expect(mascararDataBr('1')).toBe('1');
    expect(mascararDataBr('15')).toBe('15');
    expect(mascararDataBr('151')).toBe('15/1');
    expect(mascararDataBr('15112')).toBe('15/11/2');
    expect(mascararDataBr('15/11/2026')).toBe('15/11/2026');
  });

  it('ignora o que não é dígito e o que passa de oito', () => {
    expect(mascararDataBr('1a5-11 2026999')).toBe('15/11/2026');
    expect(mascararDataBr('')).toBe('');
  });
});

describe('horaLocal', () => {
  it('usa o relógio do fuso, com zero à esquerda e meia-noite como 00', () => {
    const instante = new Date('2026-11-15T02:05:00Z');
    expect(horaLocal(instante, 'America/Sao_Paulo')).toBe('23:05');
    expect(horaLocal(instante, 'UTC')).toBe('02:05');
    expect(horaLocal(new Date('2026-11-15T03:00:00Z'), 'America/Sao_Paulo')).toBe('00:00');
  });
});
