import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RelogioFixo } from '../../../test/relogio-fixo.js';
import { TarefasService } from './tarefas.service.js';

describe('Adiamento de tarefa: caminhos do serviço (HU18)', () => {
  const usuaria = {
    id: 'dona',
    email: 'teste@exemplo.com',
    fuso: 'America/Sao_Paulo',
  };
  const instante = new Date('2026-11-15T02:30:00Z');
  const data = (dia: string) => new Date(`${dia}T00:00:00Z`);
  const original = () => ({
    id: 'tarefa',
    usuariaId: usuaria.id,
    titulo: 'Ler',
    prazo: data('2026-11-20'),
    prioridade: 3,
    energia: 2,
    duracaoMinutos: 30,
    dataPlanejada: data('2026-11-14'),
    criadaEm: instante,
    concluidaEm: null as Date | null,
  });
  let tx: {
    tarefa: {
      findUnique: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
      findUniqueOrThrow: ReturnType<typeof vi.fn>;
    };
    movimentacaoTarefa: { create: ReturnType<typeof vi.fn> };
  };
  let service: TarefasService;

  beforeEach(() => {
    tx = {
      tarefa: {
        findUnique: vi.fn().mockResolvedValue(original()),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: vi
          .fn()
          .mockResolvedValue({
            ...original(),
            dataPlanejada: data('2026-11-16'),
          }),
      },
      movimentacaoTarefa: { create: vi.fn().mockResolvedValue({}) },
    };
    const prisma = {
      $transaction: vi.fn((executar: (banco: typeof tx) => unknown) =>
        executar(tx),
      ),
    };
    service = new TarefasService(
      prisma as unknown as PrismaService,
      new RelogioFixo(instante),
    );
  });

  it('atualiza somente a data e registra origem manual com o relógio injetado', async () => {
    const resposta = await service.adiar(usuaria, 'tarefa', {
      dataPlanejada: '2026-11-16',
    });
    expect(tx.tarefa.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'tarefa',
        usuariaId: 'dona',
        concluidaEm: null,
        dataPlanejada: data('2026-11-14'),
      },
      data: { dataPlanejada: data('2026-11-16') },
    });
    expect(tx.movimentacaoTarefa.create).toHaveBeenCalledWith({
      data: {
        tarefaId: 'tarefa',
        dataAnterior: data('2026-11-14'),
        dataNova: data('2026-11-16'),
        origem: 'usuaria',
        criadaEm: instante,
      },
    });
    expect(resposta).toMatchObject({
      titulo: 'Ler',
      prazo: '2026-11-20',
      prioridade: 3,
      energia: 2,
      duracaoMinutos: 30,
      dataPlanejada: '2026-11-16',
    });
  });

  it.each([
    ['inexistente', null, 404, CodigoErro.NaoEncontrado],
    [
      'de outra conta',
      { ...original(), usuariaId: 'outra' },
      403,
      CodigoErro.AcessoNegado,
    ],
    [
      'concluída',
      { ...original(), concluidaEm: instante },
      409,
      CodigoErro.TarefaConcluida,
    ],
  ])('não altera tarefa %s', async (_caso, linha, status, codigo) => {
    tx.tarefa.findUnique.mockResolvedValue(linha);
    await expect(
      service.adiar(usuaria, 'tarefa', { dataPlanejada: '2026-11-16' }),
    ).rejects.toMatchObject({ response: { statusCode: status, codigo } });
    expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
    expect(tx.movimentacaoTarefa.create).not.toHaveBeenCalled();
  });

  it.each(['2026-11-13', '2026-11-14'])(
    'recusa dia anterior ou igual ao planejado: %s',
    async (dia) => {
      await expect(
        service.adiar(usuaria, 'tarefa', { dataPlanejada: dia }),
      ).rejects.toMatchObject({
        response: { codigo: CodigoErro.DataAdiamentoInvalida },
      });
      expect(tx.tarefa.updateMany).not.toHaveBeenCalled();
    },
  );

  it('recusa data passada mesmo que posterior ao planejamento antigo', async () => {
    tx.tarefa.findUnique.mockResolvedValue({
      ...original(),
      dataPlanejada: data('2026-11-10'),
    });
    await expect(
      service.adiar(usuaria, 'tarefa', { dataPlanejada: '2026-11-13' }),
    ).rejects.toMatchObject({
      response: { codigo: CodigoErro.DataAdiamentoInvalida },
    });
  });

  it('considera hoje no fuso da usuária, não no calendário UTC', async () => {
    tx.tarefa.findUnique.mockResolvedValue({
      ...original(),
      dataPlanejada: data('2026-11-10'),
    });
    await service.adiar(usuaria, 'tarefa', { dataPlanejada: '2026-11-14' });
    await expect(
      service.adiar({ ...usuaria, fuso: 'Asia/Tokyo' }, 'tarefa', {
        dataPlanejada: '2026-11-14',
      }),
    ).rejects.toMatchObject({
      response: { codigo: CodigoErro.DataAdiamentoInvalida },
    });
  });

  it('não registra movimento se a tarefa mudou durante a leitura', async () => {
    tx.tarefa.updateMany.mockResolvedValue({ count: 0 });
    await expect(
      service.adiar(usuaria, 'tarefa', { dataPlanejada: '2026-11-16' }),
    ).rejects.toMatchObject({
      response: { codigo: CodigoErro.TarefaAlterada },
    });
    expect(tx.movimentacaoTarefa.create).not.toHaveBeenCalled();
  });

  it('propaga falha no histórico para a transação poder desfazer a atualização', async () => {
    tx.movimentacaoTarefa.create.mockRejectedValue(
      new Error('falha de armazenamento'),
    );
    await expect(
      service.adiar(usuaria, 'tarefa', { dataPlanejada: '2026-11-16' }),
    ).rejects.toThrow('falha de armazenamento');
  });
});
