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
import {
  disposicaoDoDia,
  type DisposicaoDoDia,
} from './domain/disposicao-do-dia.js';

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

  /**
   * A disposição que vale hoje: a do registro mais recente do dia (o vigente de
   * `doDia`) ou, se a sinalização de sobrecarga veio depois dele, baixa (HU02).
   * Null sem nenhum dos dois no dia. Para saber a origem, use `disposicaoDoDia`.
   */
  async disposicaoVigente(usuaria: UsuariaAutenticada): Promise<Nivel | null> {
    return (await this.disposicaoDoDia(usuaria))?.disposicao ?? null;
  }

  /**
   * A disposição que vale hoje e de onde ela veio, pela regra de
   * `domain/disposicao-do-dia.ts`. As duas leituras correm juntas e trazem só as
   * colunas da regra, para a recomendação do dia sair rápido (RNF06).
   */
  async disposicaoDoDia(
    usuaria: UsuariaAutenticada,
  ): Promise<DisposicaoDoDia | null> {
    const deHoje = {
      usuariaId: usuaria.id,
      dataLocal: paraData(this.relogio.hoje(usuaria.fuso)),
    };
    const [checkin, sobrecarga] = await Promise.all([
      this.prisma.checkin.findFirst({
        where: deHoje,
        orderBy: { criadoEm: 'desc' },
        select: { disposicao: true, criadoEm: true },
      }),
      this.prisma.sinalizacaoSobrecarga.findFirst({
        where: deHoje,
        orderBy: { criadoEm: 'desc' },
        select: { criadoEm: true },
      }),
    ]);
    return disposicaoDoDia(
      checkin && {
        disposicao: checkin.disposicao as Nivel,
        criadoEm: checkin.criadoEm,
      },
      sobrecarga,
    );
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
    // Pendente (HU15): a correção dispara o reajuste do plano só se mudar
    // `disposicaoDoDia`; compare antes e depois. Corrigir um registro anterior
    // não muda a disposição vigente, nem corrigir o vigente quando há uma
    // sinalização de sobrecarga depois dele (HU02).
    return paraResposta(checkin);
  }
}
