import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CodigoErro,
  somarDias,
  type DataLocal,
  type RecomendacaoReajustada,
  type Tarefa,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { CheckinService } from '../checkin/checkin.service.js';
import { TarefasService } from '../tasks/tarefas.service.js';
import {
  passagemDeHoje,
  planoDoDia,
  reajustar,
  type Mudanca,
  type MovimentacaoReajuste,
} from './domain/reajustar.js';

// Colunas DATE chegam como meia-noite UTC: a data local é o prefixo do ISO.
const paraData = (data: DataLocal) => new Date(`${data}T00:00:00Z`);
const deData = (data: Date): DataLocal => data.toISOString().slice(0, 10);

type Cliente = PrismaService | Prisma.TransactionClient;

interface Estado {
  tarefas: Tarefa[];
  movimentacoes: MovimentacaoReajuste[];
}

/** Carrega tarefas, disposição e passagens do dia e entrega as regras ao domínio. */
@Injectable()
export class PlanejamentoService {
  constructor(
    private readonly tarefas: TarefasService,
    private readonly checkins: CheckinService,
    private readonly prisma: PrismaService,
    private readonly relogio: Relogio,
  ) {}

  /**
   * HU13 e HU15. Antes de recomendar, aplica o reajuste pela disposição vigente.
   * O reajuste não tem gatilho próprio: ele acontece aqui, a cada pedido do
   * plano, e só grava o que ainda falta (domain/reajustar.ts). O app pede o
   * plano logo depois de cada registro de disposição (RNF07, até 2 s).
   */
  async recomendacaoDoDia(
    usuaria: UsuariaAutenticada,
  ): Promise<RecomendacaoReajustada> {
    const hoje = this.relogio.hoje(usuaria.fuso);
    // As leituras correm juntas: a lista deve aparecer em até 3 s (RNF06).
    const [disposicao, lido] = await Promise.all([
      this.checkins.disposicaoVigente(usuaria),
      this.carregar(usuaria, hoje),
    ]);
    let estado = lido;
    const mudancas = reajustar(
      estado.tarefas,
      disposicao,
      hoje,
      estado.movimentacoes,
    );
    if (mudancas.length > 0) {
      await this.aplicar(usuaria.id, hoje, mudancas);
      // Relê em vez de supor: outra requisição pode ter mudado uma tarefa.
      estado = await this.carregar(usuaria, hoje);
    }
    return planoDoDia(estado.tarefas, disposicao, hoje, estado.movimentacoes);
  }

  /**
   * HU15: traz de volta uma tarefa que o reajuste de hoje passou para amanhã.
   * Ela volta para a data anterior e não é movida de novo hoje.
   */
  async desfazerReajuste(
    usuaria: UsuariaAutenticada,
    tarefaId: string,
  ): Promise<RecomendacaoReajustada> {
    const hoje = this.relogio.hoje(usuaria.fuso);
    await this.prisma.$transaction(async (tx) => {
      const atual = await tx.tarefa.findUnique({ where: { id: tarefaId } });
      if (!atual) throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
      if (atual.usuariaId !== usuaria.id) {
        throw erro(HttpStatus.FORBIDDEN, CodigoErro.AcessoNegado);
      }
      if (atual.concluidaEm) {
        throw erro(HttpStatus.CONFLICT, CodigoErro.TarefaConcluida);
      }
      const passagem = passagemDeHoje(
        { id: atual.id, dataPlanejada: deData(atual.dataPlanejada) },
        await this.passagens(tx, usuaria.id, hoje, tarefaId),
        hoje,
      );
      if (!passagem) {
        throw erro(HttpStatus.CONFLICT, CodigoErro.SemReajusteParaDesfazer);
      }
      // Não sobrescreve uma mudança feita por outra requisição durante a leitura.
      const volta = await tx.tarefa.updateMany({
        where: {
          id: tarefaId,
          usuariaId: usuaria.id,
          concluidaEm: null,
          dataPlanejada: paraData(passagem.dataNova),
        },
        data: { dataPlanejada: paraData(passagem.dataAnterior) },
      });
      if (volta.count !== 1) {
        throw erro(HttpStatus.CONFLICT, CodigoErro.TarefaAlterada);
      }
      await tx.movimentacaoTarefa.update({
        where: { id: passagem.id },
        data: { desfeitaEm: this.relogio.agora() },
      });
    });
    return this.recomendacaoDoDia(usuaria);
  }

  /** As abertas até amanhã (as movidas hoje estão lá) e as passagens de hoje. */
  private async carregar(
    usuaria: UsuariaAutenticada,
    hoje: DataLocal,
  ): Promise<Estado> {
    const [tarefas, movimentacoes] = await Promise.all([
      this.tarefas.abertasAte(usuaria.id, somarDias(hoje, 1)),
      this.passagens(this.prisma, usuaria.id, hoje),
    ]);
    return { tarefas, movimentacoes };
  }

  /** As passagens feitas hoje pelo reajuste: as que vão para amanhã. */
  private async passagens(
    cliente: Cliente,
    usuariaId: string,
    hoje: DataLocal,
    tarefaId?: string,
  ): Promise<MovimentacaoReajuste[]> {
    const linhas = await cliente.movimentacaoTarefa.findMany({
      where: {
        origem: 'reajuste',
        dataNova: paraData(somarDias(hoje, 1)),
        tarefa: { usuariaId },
        ...(tarefaId && { tarefaId }),
      },
    });
    return linhas.map((linha) => ({
      id: linha.id,
      tarefaId: linha.tarefaId,
      dataAnterior: deData(linha.dataAnterior),
      dataNova: deData(linha.dataNova),
      desfeita: linha.desfeitaEm !== null,
      devolvida: linha.devolvidaEm !== null,
    }));
  }

  /**
   * Grava as mudanças numa transação, em lote: o número de comandos não cresce
   * com o de tarefas, porque a API (EUA) fala com o banco (São Paulo) a cada um
   * (RNF07). Cada tarefa só muda se ainda está como o domínio a viu: duas
   * requisições ao mesmo tempo não duplicam a passagem, e uma tarefa desfeita no
   * meio do caminho não sai de novo.
   */
  private async aplicar(
    usuariaId: string,
    hoje: DataLocal,
    mudancas: Mudanca[],
  ): Promise<void> {
    const agora = this.relogio.agora();
    const amanha = paraData(somarDias(hoje, 1));
    const saidas = mudancas.filter((m) => m.tipo === 'mover');
    const voltas = mudancas.filter((m) => m.tipo === 'devolver');
    // As voltas vão para a data anterior de cada uma: um comando por data,
    // quase sempre um só.
    const voltasPorData = new Map<DataLocal, typeof voltas>();
    for (const volta of voltas) {
      voltasPorData.set(volta.para, [
        ...(voltasPorData.get(volta.para) ?? []),
        volta,
      ]);
    }

    await this.prisma.$transaction(async (tx) => {
      if (saidas.length > 0) {
        const sairam = await tx.tarefa.updateManyAndReturn({
          where: {
            usuariaId,
            concluidaEm: null,
            OR: saidas.map((m) => ({
              id: m.tarefa.id,
              dataPlanejada: paraData(m.tarefa.dataPlanejada),
            })),
            movimentacoes: {
              none: {
                origem: 'reajuste',
                dataNova: amanha,
                desfeitaEm: { not: null },
              },
            },
          },
          data: { dataPlanejada: amanha },
          select: { id: true },
        });
        const anterior = new Map(
          saidas.map((m) => [m.tarefa.id, m.tarefa.dataPlanejada]),
        );
        if (sairam.length > 0) {
          await tx.movimentacaoTarefa.createMany({
            data: sairam.map(({ id }) => ({
              tarefaId: id,
              dataAnterior: paraData(anterior.get(id) as DataLocal),
              dataNova: amanha,
              origem: 'reajuste' as const,
              criadaEm: agora,
            })),
          });
        }
      }
      for (const [para, grupo] of voltasPorData) {
        const voltaram = await tx.tarefa.updateManyAndReturn({
          where: {
            usuariaId,
            concluidaEm: null,
            dataPlanejada: amanha,
            OR: grupo.map((m) => ({
              id: m.tarefa.id,
              movimentacoes: {
                some: {
                  id: m.movimentacaoId,
                  desfeitaEm: null,
                  devolvidaEm: null,
                },
              },
            })),
          },
          data: { dataPlanejada: paraData(para) },
          select: { id: true },
        });
        const ids = new Set(voltaram.map(({ id }) => id));
        if (ids.size > 0) {
          await tx.movimentacaoTarefa.updateMany({
            where: {
              id: {
                in: grupo
                  .filter((m) => ids.has(m.tarefa.id))
                  .map((m) => m.movimentacaoId),
              },
            },
            data: { devolvidaEm: agora },
          });
        }
      }
    });
  }
}
