import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RelogioFixo } from '../../../test/relogio-fixo.js';
import { TarefasService } from './tarefas.service.js';

describe('Conclusão de tarefa: caminhos do serviço (HU20)', () => {
  const instante = new Date('2026-11-15T02:30:00Z');
  const original = {
    id: 'tarefa',
    usuariaId: 'dona',
    titulo: 'Ler',
    prazo: new Date('2026-11-20T00:00:00Z'),
    prioridade: 2,
    energia: 1,
    duracaoMinutos: 30,
    dataPlanejada: new Date('2026-11-19T00:00:00Z'),
    criadaEm: new Date('2026-11-10T12:00:00Z'),
    concluidaEm: null,
  };
  let tx: {
    tarefa: {
      findUnique: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
    };
  };
  let service: TarefasService;

  beforeEach(() => {
    tx = {
      tarefa: {
        findUnique: vi.fn().mockResolvedValue(original),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
    };
    service = new TarefasService(
      {
        $transaction: vi.fn((executar) => executar(tx)),
      } as unknown as PrismaService,
      new RelogioFixo(instante),
    );
  });

  it('recusa outra conta antes de escrever (RNF03)', async () => {
    tx.tarefa.findUnique.mockResolvedValue({ ...original, usuariaId: 'outra' });
    await expect(service.concluir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.AcessoNegado },
    });
    expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
  });

  it('recusa tarefa inexistente antes de escrever', async () => {
    tx.tarefa.findUnique.mockResolvedValue(null);
    await expect(service.concluir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.NaoEncontrado },
    });
    expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
  });

  it('grava somente a conclusão, usando o relógio injetado', async () => {
    tx.tarefa.findUnique
      .mockResolvedValueOnce(original)
      .mockResolvedValueOnce({ ...original, concluidaEm: instante });
    const resposta = await service.concluir('dona', 'tarefa');
    expect(tx.tarefa.updateMany).toHaveBeenCalledWith({
      where: { id: 'tarefa', usuariaId: 'dona', concluidaEm: null },
      data: { concluidaEm: instante },
    });
    expect(resposta).toMatchObject({
      id: original.id,
      titulo: original.titulo,
      dataPlanejada: '2026-11-19',
      prazo: '2026-11-20',
      concluidaEm: instante.toISOString(),
    });
  });

  it('preserva a data existente quando a escrita não encontra tarefa em aberto', async () => {
    const anterior = new Date('2026-11-14T12:00:00Z');
    tx.tarefa.findUnique.mockResolvedValue({
      ...original,
      concluidaEm: anterior,
    });
    tx.tarefa.updateMany.mockResolvedValue({ count: 0 });
    expect((await service.concluir('dona', 'tarefa')).concluidaEm).toBe(
      anterior.toISOString(),
    );
    expect(tx.tarefa.updateMany).toHaveBeenCalledWith({
      where: { id: 'tarefa', usuariaId: 'dona', concluidaEm: null },
      data: { concluidaEm: instante },
    });
  });

  it('trata exclusão concorrente como não encontrado', async () => {
    tx.tarefa.findUnique.mockResolvedValueOnce(original).mockResolvedValueOnce(null);
    await expect(service.concluir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.NaoEncontrado },
    });
  });

  it('consulta somente as concluídas da própria conta, da mais recente para a antiga', async () => {
    const findMany = vi.fn().mockResolvedValue([{ ...original, concluidaEm: instante }]);
    const consulta = new TarefasService(
      { tarefa: { findMany } } as unknown as PrismaService,
      new RelogioFixo(instante),
    );
    expect(await consulta.listarConcluidas('dona')).toMatchObject([
      { id: 'tarefa', concluidaEm: instante.toISOString() },
    ]);
    expect(findMany).toHaveBeenCalledWith({
      where: { usuariaId: 'dona', concluidaEm: { not: null } },
      orderBy: [{ concluidaEm: 'desc' }, { criadaEm: 'desc' }],
    });
  });

  it('reabrir altera somente a conclusão, com escrita restrita à dona', async () => {
    tx.tarefa.findUnique
      .mockResolvedValueOnce({ ...original, concluidaEm: instante })
      .mockResolvedValueOnce(original);
    expect((await service.reabrir('dona', 'tarefa')).concluidaEm).toBeNull();
    expect(tx.tarefa.updateMany).toHaveBeenCalledWith({
      where: { id: 'tarefa', usuariaId: 'dona' },
      data: { concluidaEm: null },
    });
  });

  it('reabrir recusa outra conta antes de escrever', async () => {
    tx.tarefa.findUnique.mockResolvedValue({ ...original, usuariaId: 'outra' });
    await expect(service.reabrir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.AcessoNegado },
    });
    expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
  });

  it('reabrir recusa tarefa ausente antes de escrever', async () => {
    tx.tarefa.findUnique.mockResolvedValue(null);
    await expect(service.reabrir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.NaoEncontrado },
    });
    expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
  });

  it('reabrir trata remoção concorrente na escrita', async () => {
    tx.tarefa.updateMany.mockResolvedValue({ count: 0 });
    await expect(service.reabrir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.NaoEncontrado },
    });
  });

  it('reabrir trata remoção concorrente na releitura', async () => {
    tx.tarefa.findUnique.mockResolvedValueOnce(original).mockResolvedValueOnce(null);
    await expect(service.reabrir('dona', 'tarefa')).rejects.toMatchObject({
      response: { codigo: CodigoErro.NaoEncontrado },
    });
  });
});
