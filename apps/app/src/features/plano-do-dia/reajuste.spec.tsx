import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import {
  CodigoErro,
  type Checkin,
  type RecomendacaoReajustada,
  type Tarefa,
  type TarefaRecomendada,
} from '@mindcycle/shared';

import { ErroApi } from '@/api/cliente';
import { api } from '@/api/endpoints';
import { useAplicarCheckin } from '@/features/checkin/consulta';
import { useTarefas } from '@/features/tarefas/consulta';
import { textos } from '@/textos';

import { chavePlanoDoDia } from './consulta';
import { ListaDoDia, PlanoDoDia } from './plano-do-dia';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));
jest.mock('@/api/endpoints', () => ({
  api: { recomendacaoDoDia: jest.fn(), desfazerReajuste: jest.fn(), tarefas: jest.fn() },
}));

// As regras do reajuste são testadas no domínio e no e2e da API. Aqui o que se
// confere é o que a usuária vê na aba Hoje e que a lista reajustada chega à
// tela sem outro toque depois do registro.
const t = textos.reajuste;
const HOJE = '2026-11-14';
const AMANHA = '2026-11-15';
const recomendacaoDoDia = jest.mocked(api.recomendacaoDoDia);
const desfazerReajuste = jest.mocked(api.desfazerReajuste);
const tarefasDaAba = jest.mocked(api.tarefas);

function tarefa(titulo: string, dados: Partial<Tarefa> = {}): Tarefa {
  return {
    id: titulo,
    titulo,
    prazo: '2026-11-20',
    prioridade: 2,
    energia: 3,
    duracaoMinutos: null,
    dataPlanejada: AMANHA,
    criadaEm: '2026-11-10T12:00:00.000Z',
    ...dados,
  };
}

function noDia(dados: Tarefa, grupo: 1 | 2 | 3 = 2): TarefaRecomendada {
  return { ...dados, dataPlanejada: HOJE, grupo, avisoAdiamento: false };
}

function plano(
  tarefas: TarefaRecomendada[],
  movidas: Tarefa[],
  extra: Partial<RecomendacaoReajustada> = {},
): RecomendacaoReajustada {
  return { hoje: HOJE, disposicao: 2, disposicaoAssumida: false, tarefas, movidas, ...extra };
}

/** Uma promessa que o caso resolve quando quiser. */
function adiada<T>() {
  let resolver!: (valor: T) => void;
  const promessa = new Promise<T>((r) => {
    resolver = r;
  });
  return { promessa, resolver };
}

const pesada = tarefa('Arrumar o armário', { prazo: '2026-11-22' });
const outra = tarefa('Pintar a parede');
const leve = noDia(tarefa('Responder e-mail', { energia: 1 }));

// Sem coleta de cache nem novas tentativas: nenhum temporizador fica vivo
// depois do caso, e o Jest termina sozinho.
const novoCliente = () =>
  new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity, retry: false },
      mutations: { gcTime: Infinity },
    },
  });

function comCache(no: ReactNode, cliente = novoCliente()) {
  return <QueryClientProvider client={cliente}>{no}</QueryClientProvider>;
}

// A aba Tarefas montada ao lado, como no app: o desfazer refaz a lista dela.
function AbaTarefas() {
  useTarefas();
  return null;
}

beforeEach(() => {
  recomendacaoDoDia.mockReset();
  desfazerReajuste.mockReset();
  tarefasDaAba.mockReset();
  tarefasDaAba.mockResolvedValue([]);
});

describe('Tarefas que ficaram para amanhã (HU15)', () => {
  it('mostra cada movida com o prazo e o botão para trazer de volta', async () => {
    await render(comCache(<ListaDoDia recomendacao={plano([leve], [pesada, outra])} />));

    expect(screen.getByText(t.titulo)).toBeTruthy();
    expect(screen.getByText(t.explicacao)).toBeTruthy();
    expect(screen.getByText(pesada.titulo)).toBeTruthy();
    expect(screen.getByText(textos.tarefas.item.prazo('22/11/2026'))).toBeTruthy();
    expect(screen.getByLabelText(t.rotuloTrazer(pesada.titulo))).toBeTruthy();
    expect(screen.getByLabelText(t.rotuloTrazer(outra.titulo))).toBeTruthy();
    // A da lista do dia não ganha o botão.
    expect(screen.queryByLabelText(t.rotuloTrazer(leve.titulo))).toBeNull();
  });

  it('sem contador: nenhum número na tela além das datas e das posições', async () => {
    await render(comCache(<ListaDoDia recomendacao={plano([leve], [pesada, outra])} />));

    const comNumero = screen
      .queryAllByText(/\d/)
      .map((no) => [no.props.children].flat().join(''));
    expect(comNumero.length).toBeGreaterThan(0);
    for (const texto of comNumero) {
      expect(texto).toMatch(/^(Prazo: \d{2}\/\d{2}\/\d{4}|\dª)$/);
    }
  });

  it('sem movidas, a seção não aparece', async () => {
    await render(comCache(<ListaDoDia recomendacao={plano([leve], [])} />));

    expect(screen.queryByText(t.titulo)).toBeNull();
  });

  it('com todas as tarefas para amanhã, o dia aparece livre, não vazio', async () => {
    await render(comCache(<ListaDoDia recomendacao={plano([], [pesada], { disposicao: 1 })} />));

    expect(screen.getByText(t.diaLivre)).toBeTruthy();
    expect(screen.queryByText(textos.hoje.plano.vazio.titulo)).toBeNull();
    expect(screen.getByText(textos.hoje.plano.disposicao('Baixa'))).toBeTruthy();
    expect(screen.getByText(t.titulo)).toBeTruthy();
  });

  it('trazer para hoje põe a tarefa de volta na lista e confirma, sem outra busca do plano', async () => {
    recomendacaoDoDia.mockResolvedValueOnce(plano([leve], [pesada, outra]));
    desfazerReajuste.mockResolvedValueOnce(plano([leve, noDia(pesada, 3)], [outra]));
    await render(comCache(<PlanoDoDia />));
    await screen.findByText(t.titulo);

    await fireEvent.press(screen.getByLabelText(t.rotuloTrazer(pesada.titulo)));

    expect(desfazerReajuste).toHaveBeenCalledWith(pesada.id);
    await screen.findByText(t.trazida(pesada.titulo));
    expect(
      screen.getByLabelText(textos.hoje.plano.rotuloItem(2, pesada.titulo)),
    ).toBeTruthy();
    expect(screen.queryByLabelText(t.rotuloTrazer(pesada.titulo))).toBeNull();
    expect(screen.getByLabelText(t.rotuloTrazer(outra.titulo))).toBeTruthy();
    expect(recomendacaoDoDia).toHaveBeenCalledTimes(1);
  });

  it('trazer a última confirma mesmo com a seção sumindo e a aba Tarefas ainda carregando', async () => {
    recomendacaoDoDia.mockResolvedValueOnce(plano([], [pesada]));
    desfazerReajuste.mockResolvedValueOnce(plano([noDia(pesada, 3)], []));
    await render(
      comCache(
        <>
          <AbaTarefas />
          <PlanoDoDia />
        </>,
      ),
    );
    await screen.findByText(t.titulo);
    // A lista da aba Tarefas fica pendurada no recarregamento.
    tarefasDaAba.mockReturnValue(new Promise(() => {}));

    await fireEvent.press(screen.getByLabelText(t.rotuloTrazer(pesada.titulo)));

    await screen.findByText(t.trazida(pesada.titulo));
    expect(screen.queryByText(t.titulo)).toBeNull();
    expect(screen.getByLabelText(textos.hoje.plano.rotuloItem(1, pesada.titulo))).toBeTruthy();
  });

  it.each([
    [CodigoErro.SemReajusteParaDesfazer, t.naoTrazida(pesada.titulo)],
    [CodigoErro.TarefaAlterada, t.naoTrazida(pesada.titulo)],
    [CodigoErro.TarefaConcluida, textos.erros[CodigoErro.TarefaConcluida]],
  ])('se a tarefa mudou (%s), avisa sem alarme e refaz a lista', async (codigo, aviso) => {
    recomendacaoDoDia
      .mockResolvedValueOnce(plano([leve], [pesada]))
      .mockResolvedValueOnce(plano([leve, noDia(pesada, 2)], []));
    desfazerReajuste.mockRejectedValueOnce(new ErroApi(409, codigo));
    await render(comCache(<PlanoDoDia />));
    await screen.findByText(t.titulo);

    await fireEvent.press(screen.getByLabelText(t.rotuloTrazer(pesada.titulo)));

    await screen.findByText(aviso);
    await waitFor(() => expect(screen.queryByText(t.titulo)).toBeNull());
    expect(recomendacaoDoDia).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(t.trazida(pesada.titulo))).toBeNull();
  });

  it('sem conexão, mostra o aviso genérico e mantém a tarefa entre as movidas', async () => {
    recomendacaoDoDia.mockResolvedValue(plano([leve], [pesada]));
    desfazerReajuste.mockRejectedValueOnce(new TypeError('Network request failed'));
    await render(comCache(<PlanoDoDia />));
    await screen.findByText(t.titulo);

    await fireEvent.press(screen.getByLabelText(t.rotuloTrazer(pesada.titulo)));

    await screen.findByText(textos.erros.generico);
    expect(screen.getByLabelText(t.rotuloTrazer(pesada.titulo))).toBeTruthy();
  });

  it('um pedido do plano em andamento não desfaz o que a usuária trouxe de volta', async () => {
    const antigo = adiada<RecomendacaoReajustada>();
    recomendacaoDoDia
      .mockResolvedValueOnce(plano([leve], [pesada]))
      .mockReturnValueOnce(antigo.promessa)
      .mockResolvedValueOnce(plano([leve, noDia(pesada, 3)], []));
    desfazerReajuste.mockResolvedValueOnce(plano([leve, noDia(pesada, 3)], []));
    const cliente = novoCliente();
    await render(comCache(<PlanoDoDia />, cliente));
    await screen.findByText(t.titulo);
    // Um registro de disposição, por exemplo, pediu o plano de novo.
    await act(async () => {
      void cliente.invalidateQueries({ queryKey: chavePlanoDoDia });
    });

    await fireEvent.press(screen.getByLabelText(t.rotuloTrazer(pesada.titulo)));
    await screen.findByText(t.trazida(pesada.titulo));
    // A resposta antiga chega depois e é descartada; o plano é pedido de novo.
    await act(async () => {
      antigo.resolver(plano([leve], [pesada]));
    });

    await waitFor(() => expect(recomendacaoDoDia).toHaveBeenCalledTimes(3));
    expect(screen.queryByText(t.titulo)).toBeNull();
    expect(screen.getByLabelText(textos.hoje.plano.rotuloItem(2, pesada.titulo))).toBeTruthy();
  });
});

describe('Lista reajustada logo depois do registro (HU15, RNF07)', () => {
  // O registro de disposição usa o mesmo caminho do cartão da aba Hoje.
  function Registro({ checkin }: { checkin: Checkin }) {
    const aplicar = useAplicarCheckin();
    return (
      <Pressable accessibilityRole="button" onPress={() => void aplicar(checkin, true)}>
        <Text>Registrar</Text>
      </Pressable>
    );
  }

  const checkin: Checkin = {
    id: 'c1',
    dataLocal: HOJE,
    criadoEm: '2026-11-14T12:00:00.000Z',
    atualizadoEm: '2026-11-14T12:00:00.000Z',
    disposicao: 1,
    semSintomas: true,
    sintomas: [],
    origem: 'registro',
  };

  // Os mocks respondem na hora: o caso mostra que nenhum outro toque é preciso.
  // O tempo de até 2 s se mede no Android (pendência humana do DoD).
  it('o registro refaz o plano e a tarefa pesada passa para amanhã na tela, sem outro toque', async () => {
    recomendacaoDoDia
      .mockResolvedValueOnce(plano([leve, noDia(pesada, 3)], [], { disposicao: 3 }))
      .mockResolvedValueOnce(plano([leve], [pesada], { disposicao: 1 }));
    const cliente = novoCliente();
    await render(
      comCache(
        <>
          <Registro checkin={checkin} />
          <PlanoDoDia />
        </>,
        cliente,
      ),
    );
    await screen.findByLabelText(textos.hoje.plano.rotuloItem(2, pesada.titulo));
    expect(screen.queryByText(t.titulo)).toBeNull();
    // Só conta o que vem depois do registro.
    const invalidar = jest.spyOn(cliente, 'invalidateQueries');

    await fireEvent.press(screen.getByText('Registrar'));

    await screen.findByText(t.titulo);
    expect(screen.getByLabelText(t.rotuloTrazer(pesada.titulo))).toBeTruthy();
    expect(screen.getByText(textos.hoje.plano.disposicao('Baixa'))).toBeTruthy();
    // As datas planejadas mudaram: a lista da aba Tarefas é refeita.
    expect(invalidar).toHaveBeenCalledWith({ queryKey: ['tarefas'], exact: true });
  });

  it('a confirmação de uma tarefa trazida de volta some quando um novo registro refaz o plano', async () => {
    recomendacaoDoDia
      .mockResolvedValueOnce(plano([leve], [pesada, outra]))
      .mockResolvedValueOnce(plano([leve], [pesada, outra], { disposicao: 1 }));
    desfazerReajuste.mockResolvedValueOnce(plano([leve, noDia(pesada, 3)], [outra]));
    await render(
      comCache(
        <>
          <Registro checkin={checkin} />
          <PlanoDoDia />
        </>,
      ),
    );
    await screen.findByText(t.titulo);
    await fireEvent.press(screen.getByLabelText(t.rotuloTrazer(pesada.titulo)));
    await screen.findByText(t.trazida(pesada.titulo));

    await fireEvent.press(screen.getByText('Registrar'));

    await screen.findByText(textos.hoje.plano.disposicao('Baixa'));
    expect(screen.queryByText(t.trazida(pesada.titulo))).toBeNull();
  });

  it('a mesma tarefa movida de novo no dia seguinte também refaz a aba Tarefas', async () => {
    recomendacaoDoDia
      .mockResolvedValueOnce(plano([], [pesada]))
      .mockResolvedValueOnce(plano([], [{ ...pesada, dataPlanejada: '2026-11-16' }], { hoje: AMANHA }));
    const cliente = novoCliente();
    await render(comCache(<PlanoDoDia />, cliente));
    await screen.findByText(t.titulo);
    const invalidar = jest.spyOn(cliente, 'invalidateQueries');

    await act(async () => {
      await cliente.refetchQueries({ queryKey: chavePlanoDoDia });
    });

    expect(invalidar).toHaveBeenCalledWith({ queryKey: ['tarefas'], exact: true });
  });
});

describe('Textos do reajuste (DoD, critério 5)', () => {
  it('não cobram, não culpam e não contam falhas', () => {
    const exibidos = [
      t.titulo,
      t.explicacao,
      t.diaLivre,
      t.trazer,
      t.rotuloTrazer('X'),
      t.trazida('X'),
      t.naoTrazida('X'),
      textos.erros[CodigoErro.SemReajusteParaDesfazer],
    ];
    for (const texto of exibidos) {
      expect(texto).not.toMatch(/falh|atras|deveria|culpa|cobr|não conseguiu|\d/i);
    }
  });
});
