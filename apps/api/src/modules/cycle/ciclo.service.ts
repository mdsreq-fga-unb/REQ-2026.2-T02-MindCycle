import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CodigoErro,
  type Ciclo,
  type DataLocal,
  type InicioMenstruacao,
  type PerfilCiclo,
  type PerfilCicloDto,
  situacaoDoCiclo,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

// Colunas DATE chegam como meia-noite UTC: a data local é o prefixo do ISO.
const paraData = (data: DataLocal) => new Date(`${data}T00:00:00Z`);
const deData = (data: Date): DataLocal => data.toISOString().slice(0, 10);

@Injectable()
export class CicloService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relogio: Relogio,
  ) {}

  /** As entradas (HU06, HU07) e a situação de hoje no fuso da usuária (HU05). */
  async consultar(usuaria: UsuariaAutenticada): Promise<Ciclo> {
    const [registros, registroPerfil] = await Promise.all([
      this.prisma.inicioMenstruacao.findMany({
        where: { usuariaId: usuaria.id },
        orderBy: { data: 'desc' },
      }),
      this.prisma.perfilCiclo.findUnique({ where: { usuariaId: usuaria.id } }),
    ]);
    const inicios = registros.map(({ id, data }) => ({ id, data: deData(data) }));
    const perfil = registroPerfil && {
      duracaoMedia: registroPerfil.duracaoMedia,
      irregular: registroPerfil.irregular,
    };
    // Calculada a cada consulta: mudar a HU06 ou a HU07 já muda a situação.
    const situacao = situacaoDoCiclo({ inicios, perfil, hoje: this.relogio.hoje(usuaria.fuso) });
    return { inicios, perfil, situacao };
  }

  /** Registrar de novo um dia já registrado devolve o registro que existe. */
  async registrarInicio(
    usuaria: UsuariaAutenticada,
    data: DataLocal,
  ): Promise<InicioMenstruacao> {
    // As datas AAAA-MM-DD se ordenam como texto.
    if (data > this.relogio.hoje(usuaria.fuso)) {
      throw erro(HttpStatus.BAD_REQUEST, CodigoErro.DataNoFuturo);
    }
    const inicio = await this.prisma.inicioMenstruacao.upsert({
      where: {
        usuariaId_data: { usuariaId: usuaria.id, data: paraData(data) },
      },
      create: { usuariaId: usuaria.id, data: paraData(data) },
      update: {},
    });
    return { id: inicio.id, data };
  }

  async removerInicio(usuariaId: string, id: string): Promise<void> {
    const inicio = await this.prisma.inicioMenstruacao.findUnique({
      where: { id },
      select: { usuariaId: true },
    });
    if (!inicio) {
      throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
    }
    if (inicio.usuariaId !== usuariaId) {
      throw erro(HttpStatus.FORBIDDEN, CodigoErro.AcessoNegado);
    }
    // deleteMany: se outra requisição apagou no meio, não falha.
    await this.prisma.inicioMenstruacao.deleteMany({
      where: { id, usuariaId },
    });
  }

  async informarPerfil(
    usuariaId: string,
    dados: PerfilCicloDto,
  ): Promise<PerfilCiclo> {
    const perfil = {
      irregular: dados.irregular,
      duracaoMedia: dados.irregular ? null : dados.duracaoMedia,
    };
    return this.prisma.perfilCiclo.upsert({
      where: { usuariaId },
      create: { usuariaId, ...perfil },
      update: perfil,
      select: { duracaoMedia: true, irregular: true },
    });
  }
}
