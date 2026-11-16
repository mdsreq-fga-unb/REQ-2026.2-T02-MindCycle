import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MENSAGENS_ACOLHIMENTO, mensagemDoDia } from '@mindcycle/shared';

import { textos } from '@/textos';

import { CartaoMensagem, CartaoMensagemConteudo } from './cartao-mensagem';
import { useMensagemAcolhimento } from './consulta';

jest.mock('./consulta', () => ({
  useMensagemAcolhimento: jest.fn(),
}));

const mockConsulta = useMensagemAcolhimento as jest.MockedFunction<
  typeof useMensagemAcolhimento
>;
const t = textos.acolhimento.mensagem;

// Padrões de cobrança ou culpa proibidos pelo critério de aceite da HU22.
const LINGUAGEM_DE_COBRANCA_OU_CULPA =
  /\b(deve|precisa|obrigad[ao]|obrigação|culpa|falhou|falha|atrasad[ao]|rendimento|desempenho|meta)\b/i;

describe('CartaoMensagem (HU22)', () => {
  it('exibe a mensagem de acolhimento e o rótulo acessível', async () => {
    const id = mensagemDoDia('2026-11-15');
    const esperado = t.textos[id];

    await render(<CartaoMensagemConteudo id={id} />);

    expect(screen.getByText(t.rotulo)).toBeTruthy();
    expect(screen.getByText(esperado)).toBeTruthy();
    expect(screen.getByLabelText(t.rotuloAcessivel(esperado))).toBeTruthy();
  });

  it('mostra estado de carregamento enquanto busca a mensagem', async () => {
    mockConsulta.mockReturnValue({
      isPending: true,
      isError: false,
    } as ReturnType<typeof useMensagemAcolhimento>);

    await render(<CartaoMensagem />);

    expect(screen.getByText(t.carregando)).toBeTruthy();
  });

  it('mostra aviso e permite tentar de novo em caso de erro', async () => {
    const refetch = jest.fn(async () => undefined);
    mockConsulta.mockReturnValue({
      isPending: false,
      isError: true,
      error: new Error('falha de rede'),
      refetch,
    } as unknown as ReturnType<typeof useMensagemAcolhimento>);

    await render(<CartaoMensagem />);

    const tentarDeNovo = screen.getByText(textos.conexao.tentarDeNovo);
    expect(tentarDeNovo).toBeTruthy();
    fireEvent.press(tentarDeNovo);
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  // Critério de aceite da HU22: nenhuma mensagem pode conter cobrança ou culpa.
  it('tem texto não vazio e sem cobrança ou culpa para toda mensagem da lista', async () => {
    for (const id of MENSAGENS_ACOLHIMENTO) {
      const mensagem = t.textos[id];
      expect(mensagem?.trim()).toBeTruthy();
      expect(mensagem).not.toMatch(LINGUAGEM_DE_COBRANCA_OU_CULPA);

      await render(<CartaoMensagemConteudo id={id} />);
      expect(screen.getByText(mensagem)).toBeTruthy();
    }
  });
});
