import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CodigoErro,
  type AdiamentoTarefaDto,
  type AtualizacaoTarefaDto,
  type CadastroTarefaDto,
  type DataLocal,
  type Nivel,
  type Tarefa,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import type { Tarefa as LinhaTarefa } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

// Colunas DATE chegam como meia-noite UTC: a data local é o prefixo do ISO.
const paraData = (data: DataLocal) => new Date(`${data}T00:00:00Z`);
const deData = (data: Date): DataLocal => data.toISOString().slice(0, 10);

function paraResposta(tarefa: LinhaTarefa): Tarefa {
  return {
    id: tarefa.id,
    titulo: tarefa.titulo,
    prazo: deData(tarefa.prazo),
    prioridade: tarefa.prioridade as Nivel,
    energia: tarefa.energia as Nivel,
    duracaoMinutos: tarefa.duracaoMinutos,
    dataPlanejada: deData(tarefa.dataPlanejada),
    criadaEm: tarefa.criadaEm.toISOString(),
    concluidaEm: tarefa.concluidaEm?.toISOString() ?? null,
  };
}

@Injectable()
export class TarefasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relogio: Relogio,
  ) {}

  async cadastrar(
    usuaria: UsuariaAutenticada,
    dados: CadastroTarefaDto,
  ): Promise<Tarefa> {
    const hoje = this.relogio.hoje(usuaria.fuso);
    // As datas AAAA-MM-DD se ordenam como texto. Prazo hoje é aceito.
    if (dados.prazo < hoje) {
      throw erro(HttpStatus.BAD_REQUEST, CodigoErro.PrazoNoPassado);
    }
    const tarefa = await this.prisma.tarefa.create({
      data: {
        usuariaId: usuaria.id,
        titulo: dados.titulo,
        prazo: paraData(dados.prazo),
        prioridade: dados.prioridade,
        energia: dados.energia,
        duracaoMinutos: dados.duracaoMinutos ?? null,
        dataPlanejada: paraData(hoje),
      },
    });
    return paraResposta(tarefa);
  }

  /** As não concluídas; a ordem de recomendação é da HU13. */
  async listar(usuariaId: string): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: { usuariaId, concluidaEm: null },
      orderBy: [{ dataPlanejada: 'asc' }, { criadaEm: 'asc' }],
    });
    return tarefas.map(paraResposta);
  }

  /** As não concluídas planejadas até a data, inclusive: as candidatas do dia (HU13). */
  async abertasAte(usuariaId: string, data: DataLocal): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: {
        usuariaId,
        concluidaEm: null,
        dataPlanejada: { lte: paraData(data) },
      },
    });
    return tarefas.map(paraResposta);
  }

  async consultar(usuariaId: string, id: string): Promise<Tarefa> {
    const tarefa = await this.prisma.tarefa.findUnique({ where: { id } });
    if (!tarefa) {
      throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
    }
    if (tarefa.usuariaId !== usuariaId) {
      throw erro(HttpStatus.FORBIDDEN, CodigoErro.AcessoNegado);
    }
    return paraResposta(tarefa);
  }

  async listarConcluidas(usuariaId: string): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: { usuariaId, concluidaEm: { not: null } },
      orderBy: [{ concluidaEm: 'desc' }, { criadaEm: 'desc' }],
    });
    return tarefas.map(paraResposta);
  }

  async editar(
    usuariaId: string,
    id: string,
    dados: AtualizacaoTarefaDto,
  ): Promise<Tarefa> {
    return this.prisma.$transaction(async (tx) => {
      const atual = await tx.tarefa.findUnique({ where: { id } });
      this.exigirDona(atual, usuariaId);
      const { count } = await tx.tarefa.updateMany({
        where: { id, usuariaId },
        data: {
          titulo: dados.titulo,
          prazo: paraData(dados.prazo),
          prioridade: dados.prioridade,
          energia: dados.energia,
          duracaoMinutos: dados.duracaoMinutos ?? null,
        },
      });
      if (count !== 1)
        throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
      return paraResposta(await tx.tarefa.findUniqueOrThrow({ where: { id } }));
    });
  }

  async excluir(usuariaId: string, id: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const atual = await tx.tarefa.findUnique({ where: { id } });
      this.exigirDona(atual, usuariaId);
      const { count } = await tx.tarefa.deleteMany({
        where: { id, usuariaId },
      });
      if (count !== 1)
        throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
    });
  }

  /** HU20: repetir a requisição preserva o primeiro instante de conclusão. */
  async concluir(usuariaId: string, id: string): Promise<Tarefa> {
    return this.prisma.$transaction(async (tx) => {
      const atual = await tx.tarefa.findUnique({ where: { id } });
      this.exigirDona(atual, usuariaId);
      await tx.tarefa.updateMany({
        where: { id, usuariaId, concluidaEm: null },
        data: { concluidaEm: this.relogio.agora() },
      });
      const concluida = await tx.tarefa.findUnique({ where: { id } });
      if (!concluida)
        throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
      return paraResposta(concluida);
    });
  }

  private exigirDona(tarefa: LinhaTarefa | null, usuariaId: string): void {
    if (!tarefa) throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
    if (tarefa.usuariaId !== usuariaId) {
      throw erro(HttpStatus.FORBIDDEN, CodigoErro.AcessoNegado);
    }
  }

  /** HU18. Data e origem são gravadas juntas; o prazo final não é atualizado. */
  async adiar(
    usuaria: UsuariaAutenticada,
    id: string,
    dados: AdiamentoTarefaDto,
  ): Promise<Tarefa> {
    const hoje = this.relogio.hoje(usuaria.fuso);
    return this.prisma.$transaction(async (tx) => {
      const atual = await tx.tarefa.findUnique({ where: { id } });
      if (!atual) throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
      if (atual.usuariaId !== usuaria.id) {
        throw erro(HttpStatus.FORBIDDEN, CodigoErro.AcessoNegado);
      }
      if (atual.concluidaEm) {
        throw erro(HttpStatus.CONFLICT, CodigoErro.TarefaConcluida);
      }
      if (
        dados.dataPlanejada < hoje ||
        dados.dataPlanejada <= deData(atual.dataPlanejada)
      ) {
        throw erro(HttpStatus.BAD_REQUEST, CodigoErro.DataAdiamentoInvalida);
      }

      // Não sobrescreve uma conclusão ou outro adiamento ocorrido durante a leitura.
      const alteracao = await tx.tarefa.updateMany({
        where: {
          id,
          usuariaId: usuaria.id,
          concluidaEm: null,
          dataPlanejada: atual.dataPlanejada,
        },
        data: { dataPlanejada: paraData(dados.dataPlanejada) },
      });
      if (alteracao.count !== 1) {
        throw erro(HttpStatus.CONFLICT, CodigoErro.TarefaAlterada);
      }
      await tx.movimentacaoTarefa.create({
        data: {
          tarefaId: id,
          dataAnterior: atual.dataPlanejada,
          dataNova: paraData(dados.dataPlanejada),
          origem: 'usuaria',
          criadaEm: this.relogio.agora(),
        },
      });
      return paraResposta(await tx.tarefa.findUniqueOrThrow({ where: { id } }));
    });
  }
}
