import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { MENSAGENS_ACOLHIMENTO, mensagemDoDia, type MensagemAcolhimentoId } from '@mindcycle/shared';

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

// Rede de segurança da HU22; a revisão humana dos textos continua necessária (DoD 5).
const LINGUAGEM_DE_COBRANCA_OU_CULPA =
  /\b(deve(r(ia)?)?|obrigad[ao]|obrigação|culpa(d[ao])?|falhou|falha|atrasad[ao]|atras[oa]|rendimento|desempenho|metas?|tem que)\b|\b(cobran|produtiv)/i;

describe('CartaoMensagem (HU22)', () => {
  it('exibe a mensagem de acolhimento e o rótulo acessível', async () => {
    const id = mensagemDoDia('2026-11-15');
    const esperado = t.textos[id];

    await render(<CartaoMensagemConteudo id={id} />);

    expect(screen.getByText(t.rotulo)).toBeTruthy();
    expect(screen.getByText(esperado)).toBeTruthy();
    expect(screen.getByLabelText(t.rotuloAcessivel(esperado))).toBeTruthy();
  });

  it('não exibe cartão enquanto busca a mensagem', async () => {
    mockConsulta.mockReturnValue({
      isPending: true,
      isError: false,
    } as ReturnType<typeof useMensagemAcolhimento>);

    await render(<CartaoMensagem />);

    expect(screen.toJSON()).toBeNull();
  });

  it('não exibe cartão nem alerta em caso de erro', async () => {
    mockConsulta.mockReturnValue({
      isPending: false,
      isError: true,
      error: new Error('falha de rede'),
    } as unknown as ReturnType<typeof useMensagemAcolhimento>);

    await render(<CartaoMensagem />);

    expect(screen.toJSON()).toBeNull();
  });

  it('exibe a mensagem recebida quando a consulta tem sucesso', async () => {
    const id = MENSAGENS_ACOLHIMENTO[0];
    mockConsulta.mockReturnValue({
      isPending: false,
      isError: false,
      data: { id, dataLocal: '2026-11-15' },
    } as ReturnType<typeof useMensagemAcolhimento>);

    await render(<CartaoMensagem />);

    expect(screen.getByText(t.textos[id])).toBeTruthy();
  });

  it('não exibe cartão nem rótulo acessível para um id desconhecido', async () => {
    // Simula uma API mais nova que a lista de textos do APK instalado.
    await render(<CartaoMensagemConteudo id={'mensagem_nova' as MensagemAcolhimentoId} />);

    expect(screen.toJSON()).toBeNull();
  });

  it.each([
    'Você deve continuar.',
    'Você deveria fazer mais.',
    'Você tem que terminar.',
    'Sem cobranças.',
    'Você é culpada.',
    'Isso é um atraso.',
    'Cumpra suas metas.',
    'Seja produtiva.',
  ])('detecta linguagem que exige revisão humana: %s', (mensagem) => {
    expect(mensagem).toMatch(LINGUAGEM_DE_COBRANCA_OU_CULPA);
  });

  it.each([
    'Seu caminho não precisa seguir o ritmo de ninguém.',
    'Você não precisa dar conta de tudo.',
  ])('permite linguagem de acolhimento: %s', (mensagem) => {
    expect(mensagem).not.toMatch(LINGUAGEM_DE_COBRANCA_OU_CULPA);
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
