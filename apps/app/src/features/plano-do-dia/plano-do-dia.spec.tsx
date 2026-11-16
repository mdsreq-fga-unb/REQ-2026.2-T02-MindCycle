import { describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import type { RecomendacaoDoDia, TarefaRecomendada } from '@mindcycle/shared';

import { textos } from '@/textos';

import { ListaDoDia } from './plano-do-dia';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

// A ordem e os grupos vêm prontos da API (testados no domínio e no e2e). Aqui
// o que se confere é o que a usuária vê e ouve na aba Hoje.
const t = textos.hoje.plano;
const HOJE = '2026-11-14';

function tarefa(dados: Partial<TarefaRecomendada> & { titulo: string }): TarefaRecomendada {
  return {
    id: dados.titulo,
    prazo: '2026-11-20',
    prioridade: 2,
    energia: 2,
    duracaoMinutos: null,
    dataPlanejada: HOJE,
    criadaEm: '2026-11-10T12:00:00.000Z',
    grupo: 2,
    avisoAdiamento: false,
    ...dados,
  };
}

function recomendacao(
  tarefas: TarefaRecomendada[],
  extra: Partial<RecomendacaoDoDia> = {},
): RecomendacaoDoDia {
  return { hoje: HOJE, disposicao: 2, disposicaoAssumida: false, tarefas, ...extra };
}

// O formulário de adiamento usa o React Query.
function comCache(no: ReactNode) {
  return <QueryClientProvider client={new QueryClient()}>{no}</QueryClientProvider>;
}

const urgente = tarefa({ titulo: 'Entregar relatório', prazo: HOJE, energia: 3, grupo: 1, avisoAdiamento: true });
const leve = tarefa({ titulo: 'Responder e-mail', energia: 1 });
const pesada = tarefa({ titulo: 'Arrumar o armário', energia: 3, grupo: 3 });

describe('Lista das tarefas do dia (HU13)', () => {
  it('mostra as tarefas na ordem recebida e anuncia a posição de cada uma', async () => {
    await render(comCache(<ListaDoDia recomendacao={recomendacao([urgente, leve, pesada])} />));

    const rotulos = screen
      .getAllByLabelText(/tarefa sugerida/)
      .map((item) => item.props.accessibilityLabel);
    expect(rotulos).toEqual([
      t.rotuloItem(1, urgente.titulo),
      t.rotuloItem(2, leve.titulo),
      t.rotuloItem(3, pesada.titulo),
    ]);
  });

  it('mostra o aviso sem cobrança e o Adiar só na tarefa urgente acima da disposição', async () => {
    await render(comCache(<ListaDoDia recomendacao={recomendacao([urgente, leve, pesada])} />));

    expect(screen.getAllByText(t.avisoAdiamento)).toHaveLength(1);
    expect(screen.getByLabelText(textos.tarefas.adiamento.rotuloAbrir(urgente.titulo))).toBeTruthy();
    expect(screen.queryByLabelText(textos.tarefas.adiamento.rotuloAbrir(leve.titulo))).toBeNull();
    expect(screen.queryByLabelText(textos.tarefas.adiamento.rotuloAbrir(pesada.titulo))).toBeNull();
  });

  it('diz qual disposição foi considerada', async () => {
    await render(comCache(<ListaDoDia recomendacao={recomendacao([leve], { disposicao: 1 })} />));

    expect(screen.getByText(t.disposicao('Baixa'))).toBeTruthy();
  });

  it('avisa quando a disposição foi assumida como média, sem registro no dia', async () => {
    await render(
      comCache(<ListaDoDia recomendacao={recomendacao([leve], { disposicaoAssumida: true })} />),
    );

    expect(screen.getByText(t.disposicaoAssumida)).toBeTruthy();
  });

  it('sem tarefas no dia, mostra o vazio e leva ao cadastro', async () => {
    await render(comCache(<ListaDoDia recomendacao={recomendacao([])} />));

    expect(screen.getByText(t.vazio.titulo)).toBeTruthy();
    await fireEvent.press(screen.getByText(textos.tarefas.novaTarefa));
    expect(router.push).toHaveBeenCalledWith('/tarefa-nova');
  });

  it('o Adiar abre o formulário de nova data', async () => {
    await render(comCache(<ListaDoDia recomendacao={recomendacao([urgente])} />));

    await fireEvent.press(screen.getByLabelText(textos.tarefas.adiamento.rotuloAbrir(urgente.titulo)));

    expect(screen.getByLabelText(textos.tarefas.adiamento.campoData)).toBeTruthy();
  });

  it('não reabre o formulário sozinho quando o aviso sai e depois volta', async () => {
    const cliente = new QueryClient();
    const lista = (dados: RecomendacaoDoDia) => (
      <QueryClientProvider client={cliente}>
        <ListaDoDia recomendacao={dados} />
      </QueryClientProvider>
    );
    const tela = await render(lista(recomendacao([urgente])));
    await fireEvent.press(screen.getByLabelText(textos.tarefas.adiamento.rotuloAbrir(urgente.titulo)));
    expect(screen.getByLabelText(textos.tarefas.adiamento.campoData)).toBeTruthy();

    // Registro de disposição alta: a tarefa cabe e o aviso sai.
    await tela.rerender(lista(recomendacao([{ ...urgente, avisoAdiamento: false }], { disposicao: 3 })));
    expect(screen.queryByLabelText(textos.tarefas.adiamento.campoData)).toBeNull();

    // Registro de disposição baixa de novo: o aviso volta, o formulário não.
    await tela.rerender(lista(recomendacao([urgente], { disposicao: 1 })));
    expect(screen.getByLabelText(textos.tarefas.adiamento.rotuloAbrir(urgente.titulo))).toBeTruthy();
    expect(screen.queryByLabelText(textos.tarefas.adiamento.campoData)).toBeNull();
  });
});
