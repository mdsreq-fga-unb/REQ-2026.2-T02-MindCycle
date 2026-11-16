import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { AccessibilityInfo } from 'react-native';
import { CodigoErro, type SinalizacaoSobrecarga } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { ErroApi } from '@/api/cliente';
import Hoje from '@/app/(app)/(abas)/index';
import { chavePlanoDoDia } from '@/features/plano-do-dia/consulta';
import { textos } from '@/textos';

jest.mock('@/api/endpoints', () => ({ api: { sinalizarSobrecarga: jest.fn() } }));
// Os outros cartões da aba Hoje têm testes próprios e buscam dados da API: aqui
// eles ficam de fora, e a tela é só o caminho até a sinalização.
jest.mock('@/features/checkin/cartao-checkin', () => ({ CartaoCheckin: () => null }));
jest.mock('@/features/plano-do-dia/plano-do-dia', () => ({ PlanoDoDia: () => null }));

const t = textos.sobrecarga;
const sinalizar = jest.mocked(api.sinalizarSobrecarga);
const gravada: SinalizacaoSobrecarga = {
  id: 's1',
  dataLocal: '2026-11-14',
  criadoEm: '2026-11-14T15:00:00.000Z',
};

// Sem coleta por tempo: o cache da mutação não deixa um timer de 5 min aberto,
// que impediria o jest de encerrar.
const novoCliente = () =>
  new QueryClient({ defaultOptions: { mutations: { gcTime: Infinity } } });

function naAbaHoje(cliente = novoCliente()): ReactElement {
  return (
    <QueryClientProvider client={cliente}>
      <Hoje />
    </QueryClientProvider>
  );
}

describe('Sinalização de sobrecarga na aba Hoje (HU02)', () => {
  beforeEach(() => {
    sinalizar.mockReset();
  });

  // RNF04: a aba Hoje é a tela inicial. O caminho abaixo tem exatamente dois
  // toques, sem rolagem, outro botão ou outra tela no meio.
  it('a partir da aba Hoje, conclui em 2 toques e mostra a confirmação (RNF04)', async () => {
    sinalizar.mockResolvedValue(gravada);
    await render(naAbaHoje());
    expect(screen.getByRole('header', { name: t.titulo })).toBeTruthy();

    await fireEvent.press(screen.getByText(t.abrir));
    // Antes de valer, a usuária vê o que muda no dia.
    expect(screen.getByText(t.pergunta)).toBeTruthy();
    await fireEvent.press(screen.getByText(t.confirmar));

    expect(await screen.findByText(t.sinalizado)).toBeTruthy();
    expect(sinalizar).toHaveBeenCalledTimes(1);
    // De volta ao início: dá para sinalizar de novo mais tarde.
    expect(screen.getByText(t.abrir)).toBeTruthy();
    expect(screen.queryByText(t.pergunta)).toBeNull();
  });

  it('anuncia a pergunta e a confirmação ao leitor de tela, que perde o foco a cada etapa', async () => {
    sinalizar.mockResolvedValue(gravada);
    const anunciar = jest.spyOn(AccessibilityInfo, 'announceForAccessibility');
    await render(naAbaHoje());

    await fireEvent.press(screen.getByText(t.abrir));
    expect(anunciar).toHaveBeenLastCalledWith(t.pergunta);
    await fireEvent.press(screen.getByText(t.confirmar));

    await screen.findByText(t.sinalizado);
    expect(anunciar).toHaveBeenLastCalledWith(t.sinalizado);
    anunciar.mockRestore();
  });

  it('refaz a recomendação do dia, e a confirmação não espera a lista nova (RNF08)', async () => {
    sinalizar.mockResolvedValue(gravada);
    const cliente = novoCliente();
    // A lista nova nunca chega: mesmo assim a confirmação aparece.
    const invalidar = jest
      .spyOn(cliente, 'invalidateQueries')
      .mockReturnValue(new Promise<void>(() => {}));
    await render(naAbaHoje(cliente));

    await fireEvent.press(screen.getByText(t.abrir));
    await fireEvent.press(screen.getByText(t.confirmar));

    expect(await screen.findByText(t.sinalizado)).toBeTruthy();
    expect(invalidar).toHaveBeenCalledWith({ queryKey: chavePlanoDoDia });
  });

  it('"Agora não" volta sem sinalizar', async () => {
    await render(naAbaHoje());

    await fireEvent.press(screen.getByText(t.abrir));
    await fireEvent.press(screen.getByText(t.cancelar));

    expect(sinalizar).not.toHaveBeenCalled();
    expect(screen.getByText(t.convite)).toBeTruthy();
    expect(screen.queryByText(t.sinalizado)).toBeNull();
  });

  it('se não grava, diz o motivo sem confirmar e deixa tentar de novo', async () => {
    sinalizar
      .mockRejectedValueOnce(new ErroApi(403, CodigoErro.ConsentimentoPendente))
      .mockResolvedValueOnce(gravada);
    await render(naAbaHoje());

    await fireEvent.press(screen.getByText(t.abrir));
    await fireEvent.press(screen.getByText(t.confirmar));

    expect(
      await screen.findByText(textos.erros[CodigoErro.ConsentimentoPendente]),
    ).toBeTruthy();
    expect(screen.queryByText(t.sinalizado)).toBeNull();

    await fireEvent.press(screen.getByText(t.confirmar));

    expect(await screen.findByText(t.sinalizado)).toBeTruthy();
    expect(screen.queryByText(textos.erros[CodigoErro.ConsentimentoPendente])).toBeNull();
    expect(sinalizar).toHaveBeenCalledTimes(2);
  });

  it('enquanto grava, o botão fica ocupado e um segundo toque não sinaliza de novo', async () => {
    let concluir: (valor: SinalizacaoSobrecarga) => void = () => {};
    sinalizar.mockReturnValue(
      new Promise<SinalizacaoSobrecarga>((resolve) => {
        concluir = resolve;
      }),
    );
    await render(naAbaHoje());

    await fireEvent.press(screen.getByText(t.abrir));
    await fireEvent.press(screen.getByText(t.confirmar));
    // O leitor de tela continua dizendo que botão é esse.
    const ocupado = await screen.findByRole('button', { busy: true, name: t.confirmar });
    await fireEvent.press(ocupado);

    expect(sinalizar).toHaveBeenCalledTimes(1);
    concluir(gravada);
    expect(await screen.findByText(t.sinalizado)).toBeTruthy();
  });

  it('enquanto grava, "Agora não" continua disponível; se a gravação termina, a confirmação aparece', async () => {
    let concluir: (valor: SinalizacaoSobrecarga) => void = () => {};
    sinalizar.mockReturnValue(
      new Promise<SinalizacaoSobrecarga>((resolve) => {
        concluir = resolve;
      }),
    );
    await render(naAbaHoje());
    await fireEvent.press(screen.getByText(t.abrir));
    await fireEvent.press(screen.getByText(t.confirmar));
    await screen.findByRole('button', { busy: true });

    await fireEvent.press(screen.getByText(t.cancelar));

    expect(screen.queryByText(t.pergunta)).toBeNull();
    concluir(gravada);
    expect(await screen.findByText(t.sinalizado)).toBeTruthy();
  });

  it('ao abrir de novo, a confirmação anterior sai de cena', async () => {
    sinalizar.mockResolvedValue(gravada);
    await render(naAbaHoje());
    await fireEvent.press(screen.getByText(t.abrir));
    await fireEvent.press(screen.getByText(t.confirmar));
    expect(await screen.findByText(t.sinalizado)).toBeTruthy();

    await fireEvent.press(screen.getByText(t.abrir));

    expect(screen.queryByText(t.sinalizado)).toBeNull();
    expect(screen.getByText(t.pergunta)).toBeTruthy();
  });
});
