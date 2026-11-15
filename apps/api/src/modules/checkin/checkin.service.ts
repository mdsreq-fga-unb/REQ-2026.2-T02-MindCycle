import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CodigoErro,
  SINTOMAS,
  type Checkin,
  type CheckinsDoDia,
  type DataLocal,
  type Intensidade,
  type Nivel,
  type OrigemCheckin,
  type RegistroCheckinDto,
  type Sintoma,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import type {
  Checkin as LinhaCheckin,
  CheckinSintoma as LinhaSintoma,
} from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

// Colunas DATE chegam como meia-noite UTC: a data local é o prefixo do ISO.
const paraData = (data: DataLocal) => new Date(`${data}T00:00:00Z`);
const deData = (data: Date): DataLocal => data.toISOString().slice(0, 10);

type CheckinComSintomas = LinhaCheckin & { sintomas: LinhaSintoma[] };

const incluirSintomas = { sintomas: true } as const;

function paraResposta(checkin: CheckinComSintomas): Checkin {
  return {
    id: checkin.id,
    dataLocal: deData(checkin.dataLocal),
    criadoEm: checkin.criadoEm.toISOString(),
    atualizadoEm: checkin.atualizadoEm.toISOString(),
    disposicao: checkin.disposicao as Nivel,
    semSintomas: checkin.semSintomas,
    // O banco não guarda ordem: a resposta segue a da lista, sempre igual.
    sintomas: checkin.sintomas
      .map((s) => ({
        sintoma: s.sintoma as Sintoma,
        intensidade: s.intensidade as Intensidade,
      }))
      .sort((a, b) => SINTOMAS.indexOf(a.sintoma) - SINTOMAS.indexOf(b.sintoma)),
    origem: checkin.origem as OrigemCheckin,
  };
}

@Injectable()
export class CheckinService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relogio: Relogio,
  ) {}

  // A escrita aninhada do Prisma grava o registro e os sintomas numa só
  // transação, em poucas idas ao banco (RNF08: confirmação em até 2 s).
  async registrar(
    usuaria: UsuariaAutenticada,
    dados: RegistroCheckinDto,
  ): Promise<Checkin> {
    const checkin = await this.prisma.checkin.create({
      data: {
        usuariaId: usuaria.id,
        dataLocal: paraData(this.relogio.hoje(usuaria.fuso)),
        disposicao: dados.disposicao,
        semSintomas: dados.semSintomas,
        sintomas: { create: dados.sintomas },
      },
      include: incluirSintomas,
    });
    return paraResposta(checkin);
  }

  async doDia(usuaria: UsuariaAutenticada): Promise<CheckinsDoDia> {
    const checkins = await this.prisma.checkin.findMany({
      where: {
        usuariaId: usuaria.id,
        dataLocal: paraData(this.relogio.hoje(usuaria.fuso)),
      },
      orderBy: { criadoEm: 'desc' },
      include: incluirSintomas,
    });
    const registros = checkins.map(paraResposta);
    return { vigente: registros[0] ?? null, registros };
  }

  /** Do mais recente para o mais antigo, os de hoje incluídos. */
  async historico(usuariaId: string, limite: number): Promise<Checkin[]> {
    const checkins = await this.prisma.checkin.findMany({
      where: { usuariaId },
      orderBy: { criadoEm: 'desc' },
      take: limite,
      include: incluirSintomas,
    });
    return checkins.map(paraResposta);
  }

  /**
   * Troca disposição e sintomas do registro, sem criar outro nem mexer em `criadoEm`.
   * A troca dos sintomas e a do registro acontecem numa só transação.
   */
  async corrigir(
    usuariaId: string,
    id: string,
    dados: RegistroCheckinDto,
  ): Promise<Checkin> {
    const existente = await this.prisma.checkin.findUnique({
      where: { id },
      select: { usuariaId: true },
    });
    if (!existente) {
      throw erro(HttpStatus.NOT_FOUND, CodigoErro.NaoEncontrado);
    }
    if (existente.usuariaId !== usuariaId) {
      throw erro(HttpStatus.FORBIDDEN, CodigoErro.AcessoNegado);
    }

    const checkin = await this.prisma.checkin.update({
      where: { id },
      data: {
        disposicao: dados.disposicao,
        semSintomas: dados.semSintomas,
        sintomas: { deleteMany: {}, create: dados.sintomas },
      },
      include: incluirSintomas,
    });
    // Pendente (HU15): se este for o vigente de hoje (o mais recente do dia da
    // usuária) e a disposição mudou, a correção dispara o reajuste do plano.
    // Corrigir um registro anterior não muda a disposição vigente.
    return paraResposta(checkin);
  }
}
