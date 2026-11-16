import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { textos } from '@/textos';

import { CalendarioDoCiclo } from './calendario-do-ciclo';

// Na @testing-library/react-native 14, render e fireEvent são assíncronos.
const t = textos.ciclo.calendario;
const HOJE = '2026-11-16';
const inicios = [{ id: 'a', data: '2026-11-15' }];
const regular = { duracaoMedia: 28, irregular: false };

describe('CalendarioDoCiclo (HU10)', () => {
  it('abre no mês de hoje', async () => {
    await render(<CalendarioDoCiclo inicios={inicios} perfil={regular} hoje={HOJE} />);

    expect(screen.getByText(t.mes(2026, 11))).toBeTruthy();
  });

  // A cor não é a única pista: o leitor de tela ouve a fase, o início e o hoje.
  it('anuncia a fase, o início e o dia de hoje de cada dia', async () => {
    await render(<CalendarioDoCiclo inicios={inicios} perfil={regular} hoje={HOJE} />);

    expect(
      screen.getByLabelText(t.rotuloDia({ data: '2026-11-15', fase: 'menstrual', inicio: true, hoje: false })),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(t.rotuloDia({ data: '2026-11-16', fase: 'menstrual', inicio: false, hoje: true })),
    ).toBeTruthy();
    // 13/12 é o dia 29: passou da duração e fica sem fase, sem prever o próximo ciclo.
    await fireEvent.press(screen.getByRole('button', { name: t.proximoMes }));
    expect(
      screen.getByLabelText(t.rotuloDia({ data: '2026-12-13', fase: null, inicio: false, hoje: false })),
    ).toBeTruthy();
  });

  it('troca de mês para trás e para a frente', async () => {
    await render(<CalendarioDoCiclo inicios={inicios} perfil={regular} hoje={HOJE} />);

    await fireEvent.press(screen.getByRole('button', { name: t.mesAnterior }));
    expect(screen.getByText(t.mes(2026, 10))).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: t.proximoMes }));
    await fireEvent.press(screen.getByRole('button', { name: t.proximoMes }));
    expect(screen.getByText(t.mes(2026, 12))).toBeTruthy();
  });

  it('sem estimativa, não pinta nenhum dia e explica por quê', async () => {
    await render(
      <CalendarioDoCiclo
        inicios={inicios}
        perfil={{ duracaoMedia: null, irregular: true }}
        hoje={HOJE}
      />,
    );

    expect(screen.getByText(t.semCores)).toBeTruthy();
    expect(
      screen.getByLabelText(t.rotuloDia({ data: '2026-11-15', fase: null, inicio: true, hoje: false })),
    ).toBeTruthy();
  });

  it('vira o ano entre dezembro e janeiro', async () => {
    await render(<CalendarioDoCiclo inicios={inicios} perfil={regular} hoje="2026-12-20" />);

    await fireEvent.press(screen.getByRole('button', { name: t.proximoMes }));
    expect(screen.getByText(t.mes(2027, 1))).toBeTruthy();
  });
});
