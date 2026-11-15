import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CodigoErro,
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
}
