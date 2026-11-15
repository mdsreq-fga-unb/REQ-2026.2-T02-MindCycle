import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RelogioFixo } from '../../../test/relogio-fixo.js';
import { TarefasService } from './tarefas.service.js';

describe('Caminhos de edição e exclusão', () => {
  const instante = new Date('2026-11-15T02:30:00Z');
  const data = new Date('2026-11-20T00:00:00Z');
  const original = {
    id: 'tarefa',
    usuariaId: 'dona',
    titulo: 'Ler',
    prazo: data,
    prioridade: 2,
    energia: 1,
    duracaoMinutos: 30,
    dataPlanejada: data,
    criadaEm: instante,
    concluidaEm: null as Date | null,
  };
  const dados = {
    titulo: 'Revisar',
    prazo: '2026-11-21',
    prioridade: 3 as const,
    energia: 2 as const,
    duracaoMinutos: null,
  };
  let tx: {
    tarefa: {
      findUnique: ReturnType<typeof vi.fn>;
      findUniqueOrThrow: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
      deleteMany: ReturnType<typeof vi.fn>;
    };
  };
  let service: TarefasService;

  beforeEach(() => {
    tx = {
      tarefa: {
        findUnique: vi.fn().mockResolvedValue(original),
        findUniqueOrThrow: vi.fn().mockResolvedValue(original),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
    };
    service = new TarefasService(
      {
        $transaction: vi.fn((executar) => executar(tx)),
      } as unknown as PrismaService,
      new RelogioFixo(instante),
    );
  });

  const executar = (acao: 'editar' | 'excluir') =>
    acao === 'editar'
      ? service.editar('dona', 'tarefa', dados)
      : service[acao]('dona', 'tarefa');

  it.each(['editar', 'excluir'] as const)(
    '%s recusa tarefa de outra conta antes de escrever',
    async (acao) => {
      tx.tarefa.findUnique.mockResolvedValue({
        ...original,
        usuariaId: 'outra',
      });
      await expect(executar(acao)).rejects.toMatchObject({
        response: { codigo: CodigoErro.AcessoNegado },
      });
      expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
      expect(tx.tarefa.deleteMany).not.toHaveBeenCalled();
    },
  );

  it.each(['editar', 'excluir'] as const)(
    '%s recusa tarefa inexistente antes de escrever',
    async (acao) => {
      tx.tarefa.findUnique.mockResolvedValue(null);
      await expect(executar(acao)).rejects.toMatchObject({
        response: { codigo: CodigoErro.NaoEncontrado },
      });
      expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
      expect(tx.tarefa.deleteMany).not.toHaveBeenCalled();
    },
  );

  it('a edição grava apenas os campos editáveis', async () => {
    await executar('editar');
    expect(tx.tarefa.updateMany).toHaveBeenCalledWith({
      where: { id: 'tarefa', usuariaId: 'dona' },
      data: {
        titulo: 'Revisar',
        prazo: new Date('2026-11-21T00:00:00Z'),
        prioridade: 3,
        energia: 2,
        duracaoMinutos: null,
      },
    });
  });

  it('a exclusão restringe a escrita à dona', async () => {
    await executar('excluir');
    expect(tx.tarefa.deleteMany).toHaveBeenCalledWith({
      where: { id: 'tarefa', usuariaId: 'dona' },
    });
  });

  it.each(['editar', 'excluir'] as const)(
    '%s trata remoção concorrente como não encontrado',
    async (acao) => {
      tx.tarefa.updateMany.mockResolvedValue({ count: 0 });
      tx.tarefa.deleteMany.mockResolvedValue({ count: 0 });
      await expect(executar(acao)).rejects.toMatchObject({
        response: { codigo: CodigoErro.NaoEncontrado },
      });
    },
  );
});
