import type { Nivel, Tarefa } from '@mindcycle/shared';
import { RelogioFixo } from '../../../test/relogio-fixo.js';
import type { PrismaService } from '../../prisma/prisma.service.js';
import type { CheckinService } from '../checkin/checkin.service.js';
import type { TarefasService } from '../tasks/tarefas.service.js';
import { PlanejamentoService } from './planejamento.service.js';

// RNF07: a API fica nos EUA e o banco em São Paulo (docs/deploy.md), e cada
// comando custa uma ida e volta. O reajuste grava em lote: o número de comandos
// não pode crescer com o número de tarefas.
describe('Reajuste: comandos ao banco por pedido do plano (HU15, RNF07)', () => {
  const usuaria = { id: 'dona', email: 'teste@exemplo.com', fuso: 'America/Sao_Paulo' };
  // 14/11 em São Paulo.
  const relogio = new RelogioFixo(new Date('2026-11-15T02:30:00Z'));
  const HOJE = '2026-11-14';
  const AMANHA = '2026-11-15';
  const data = (dia: string) => new Date(`${dia}T00:00:00Z`);

  function tarefas(quantas: number, dados: Partial<Tarefa>): Tarefa[] {
    return Array.from({ length: quantas }, (_, i) => ({
      id: `t${String(i).padStart(3, '0')}`,
      titulo: `Tarefa ${i}`,
      prazo: '2026-11-30',
      prioridade: 2,
      energia: 3,
      duracaoMinutos: null,
      dataPlanejada: HOJE,
      criadaEm: '2026-11-10T12:00:00.000Z',
      ...dados,
    }));
  }

  function montar(
    lista: Tarefa[],
    disposicao: Nivel,
    passagens: object[] = [],
    // As tarefas que outra requisição já mudou: o UPDATE não as devolve.
    jaMudadas: string[] = [],
  ) {
    const comandos: string[] = [];
    const registrar =
      (nome: string, resposta: (args: { where: { OR: { id: string }[] } }) => unknown) =>
      vi.fn((args) => {
        comandos.push(nome);
        return Promise.resolve(resposta(args));
      });
    const tx = {
      tarefa: {
        updateManyAndReturn: registrar('tarefa.updateManyAndReturn', ({ where }) =>
          where.OR.filter(({ id }) => !jaMudadas.includes(id)).map(({ id }) => ({ id })),
        ),
      },
      movimentacaoTarefa: {
        createMany: registrar('movimentacaoTarefa.createMany', () => ({})),
        updateMany: registrar('movimentacaoTarefa.updateMany', () => ({})),
      },
    };
    const prisma = {
      movimentacaoTarefa: { findMany: vi.fn().mockResolvedValue(passagens) },
      $transaction: vi.fn((executar: (banco: typeof tx) => unknown) => executar(tx)),
    };
    const service = new PlanejamentoService(
      { abertasAte: vi.fn().mockResolvedValue(lista) } as unknown as TarefasService,
      { disposicaoVigente: vi.fn().mockResolvedValue(disposicao) } as unknown as CheckinService,
      prisma as unknown as PrismaService,
      relogio,
    );
    return { service, comandos, tx };
  }

  it.each([1, 30])('passar %i tarefa(s) para amanhã leva os mesmos dois comandos', async (quantas) => {
    const { service, comandos, tx } = montar(tarefas(quantas, {}), 1);

    await service.recomendacaoDoDia(usuaria);

    expect(comandos).toEqual(['tarefa.updateManyAndReturn', 'movimentacaoTarefa.createMany']);
    expect(tx.movimentacaoTarefa.createMany.mock.calls[0]?.[0].data).toHaveLength(quantas);
  });

  it.each([1, 30])('trazer %i tarefa(s) de volta leva os mesmos dois comandos', async (quantas) => {
    const lista = tarefas(quantas, { dataPlanejada: AMANHA });
    const passagens = lista.map((t) => ({
      id: `m-${t.id}`,
      tarefaId: t.id,
      dataAnterior: data(HOJE),
      dataNova: data(AMANHA),
      desfeitaEm: null,
      devolvidaEm: null,
    }));
    const { service, comandos } = montar(lista, 3, passagens);

    await service.recomendacaoDoDia(usuaria);

    expect(comandos).toEqual(['tarefa.updateManyAndReturn', 'movimentacaoTarefa.updateMany']);
  });

  it('só registra a passagem das tarefas que o UPDATE de fato mudou', async () => {
    const lista = tarefas(3, {});
    const { service, tx } = montar(lista, 1, [], ['t001']);

    await service.recomendacaoDoDia(usuaria);

    expect(
      tx.movimentacaoTarefa.createMany.mock.calls[0]?.[0].data.map(
        (m: { tarefaId: string }) => m.tarefaId,
      ),
    ).toEqual(['t000', 't002']);
  });

  it('só marca como devolvidas as passagens das tarefas que voltaram', async () => {
    const lista = tarefas(3, { dataPlanejada: AMANHA });
    const passagens = lista.map((t) => ({
      id: `m-${t.id}`,
      tarefaId: t.id,
      dataAnterior: data(HOJE),
      dataNova: data(AMANHA),
      desfeitaEm: null,
      devolvidaEm: null,
    }));
    const { service, tx } = montar(lista, 3, passagens, ['t001']);

    await service.recomendacaoDoDia(usuaria);

    expect(tx.movimentacaoTarefa.updateMany.mock.calls[0]?.[0].where).toEqual({
      id: { in: ['m-t000', 'm-t002'] },
    });
  });

  it('sem nada a mudar, não abre transação', async () => {
    const { service, comandos } = montar(tarefas(5, { energia: 1 }), 1);

    await service.recomendacaoDoDia(usuaria);

    expect(comandos).toEqual([]);
  });
});
