import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Contador } from './componentes';

// Na @testing-library/react-native 14, render e fireEvent são assíncronos: sem o
// await, o toque fica pendente e atrapalha a renderização do caso seguinte.

const props = {
  rotulo: 'Quantos dias seu ciclo costuma durar',
  minimo: 15,
  maximo: 60,
  inicial: 28,
  rotuloDiminuir: 'Diminuir um dia',
  rotuloAumentar: 'Aumentar um dia',
  textoVazio: 'Escolha a duração',
  formatar: (dias: number) => `${dias} dias`,
};

describe('Contador', () => {
  // Sem valor escolhido, nada aparece como se fosse dela (revisão do PR #106, ponto 2).
  it('começa sem valor quando ainda não houve escolha', async () => {
    const aoMudar = jest.fn();
    await render(<Contador {...props} valor={null} aoMudar={aoMudar} />);

    expect(screen.getByText('Escolha a duração')).toBeTruthy();
    expect(aoMudar).not.toHaveBeenCalled();
  });

  it('o primeiro toque, em qualquer botão, põe o valor inicial', async () => {
    const aoMudar = jest.fn();
    await render(<Contador {...props} valor={null} aoMudar={aoMudar} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Diminuir um dia' }));
    expect(aoMudar).toHaveBeenLastCalledWith(28);
    await fireEvent.press(screen.getByRole('button', { name: 'Aumentar um dia' }));
    expect(aoMudar).toHaveBeenLastCalledWith(28);
  });

  it('com um valor, "−" e "+" mudam um dia', async () => {
    const aoMudar = jest.fn();
    await render(<Contador {...props} valor={30} aoMudar={aoMudar} />);

    expect(screen.getByText('30 dias')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Aumentar um dia' }));
    expect(aoMudar).toHaveBeenLastCalledWith(31);
    await fireEvent.press(screen.getByRole('button', { name: 'Diminuir um dia' }));
    expect(aoMudar).toHaveBeenLastCalledWith(29);
  });

  it('não passa do máximo', async () => {
    const aoMudar = jest.fn();
    await render(<Contador {...props} valor={60} aoMudar={aoMudar} />);

    const aumentar = screen.getByRole('button', { name: 'Aumentar um dia' });
    expect(aumentar).toBeDisabled();
    await fireEvent.press(aumentar);
    expect(aoMudar).not.toHaveBeenCalled();
  });

  it('não passa do mínimo', async () => {
    const aoMudar = jest.fn();
    await render(<Contador {...props} valor={15} aoMudar={aoMudar} />);

    const diminuir = screen.getByRole('button', { name: 'Diminuir um dia' });
    expect(diminuir).toBeDisabled();
    await fireEvent.press(diminuir);
    expect(aoMudar).not.toHaveBeenCalled();
  });
});
