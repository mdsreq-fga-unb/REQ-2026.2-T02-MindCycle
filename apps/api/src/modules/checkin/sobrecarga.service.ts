import { Injectable } from '@nestjs/common';
import type { DataLocal, SinalizacaoSobrecarga } from '@mindcycle/shared';
import { Relogio } from '../../common/relogio.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

// Colunas DATE chegam como meia-noite UTC: a data local é o prefixo do ISO.
const paraData = (data: DataLocal) => new Date(`${data}T00:00:00Z`);
const deData = (data: Date): DataLocal => data.toISOString().slice(0, 10);

/**
 * HU02: grava a sinalização de sobrecarga. Quem a transforma em disposição baixa
 * é `CheckinService.disposicaoDoDia` (e `disposicaoVigente`), que a recomendação
 * do dia (HU13) consulta.
 */
@Injectable()
export class SobrecargaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relogio: Relogio,
  ) {}

  // Uma só ida ao banco: a confirmação deve aparecer em até 2 s (RNF08). Cada
  // sinalização é uma linha nova, mesmo no mesmo dia: vale a mais recente.
  async sinalizar(usuaria: UsuariaAutenticada): Promise<SinalizacaoSobrecarga> {
    const sinalizacao = await this.prisma.sinalizacaoSobrecarga.create({
      data: {
        usuariaId: usuaria.id,
        dataLocal: paraData(this.relogio.hoje(usuaria.fuso)),
      },
    });
    // Pendente (HU15): o reajuste tem de disparar também aqui, e não só na
    // gravação do check-in. A sinalização não é um check-in, e sem isso ela
    // mudaria só a ordem da lista, sem mover tarefa alguma. Como o
    // PlanningModule importa este módulo, o disparo não pode morar neste
    // service sem criar dependência circular.
    return {
      id: sinalizacao.id,
      dataLocal: deData(sinalizacao.dataLocal),
      criadoEm: sinalizacao.criadoEm.toISOString(),
    };
  }
}
