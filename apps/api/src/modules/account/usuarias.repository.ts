import { HttpStatus, Injectable } from '@nestjs/common';
import { CodigoErro, type TipoPin } from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UsuariaAutenticada } from './usuaria.js';

const publica = { id: true, email: true, fuso: true } as const;

/** Só `UsuariaAutenticada` sai daqui: o hash da senha fica nesta classe. */
@Injectable()
export class UsuariasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dados: {
    email: string;
    senhaHash: string;
    fuso: string;
  }): Promise<UsuariaAutenticada> {
    try {
      return await this.prisma.usuaria.create({ data: dados, select: publica });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw erro(HttpStatus.CONFLICT, CodigoErro.EmailJaCadastrado);
      }
      throw e;
    }
  }

  buscarPorId(id: string): Promise<UsuariaAutenticada | null> {
    return this.prisma.usuaria.findUnique({ where: { id }, select: publica });
  }

  buscarPorEmail(email: string): Promise<UsuariaAutenticada | null> {
    return this.prisma.usuaria.findUnique({ where: { email }, select: publica });
  }

  /** Só para a entrada com senha. */
  async buscarCredenciais(
    email: string,
  ): Promise<{ usuaria: UsuariaAutenticada; senhaHash: string } | null> {
    const linha = await this.prisma.usuaria.findUnique({ where: { email } });
    if (!linha) {
      return null;
    }
    const { senhaHash, id, fuso } = linha;
    return { usuaria: { id, email: linha.email, fuso }, senhaHash };
  }

  atualizarFuso(id: string, fuso: string): Promise<UsuariaAutenticada> {
    return this.prisma.usuaria.update({
      where: { id },
      data: { fuso },
      select: publica,
    });
  }

  async atualizarSenhaHash(id: string, senhaHash: string): Promise<void> {
    await this.prisma.usuaria.update({ where: { id }, data: { senhaHash } });
  }

  // HU11. O hash do PIN também não sai desta classe: só `tipoPin` e o estado
  // de bloqueio.

  /** O tipo do PIN da conta, ou `null` quando ela não tem PIN. */
  async tipoPin(id: string): Promise<TipoPin | null> {
    const linha = await this.prisma.usuaria.findUnique({
      where: { id },
      select: { pinTipo: true },
    });
    return linha?.pinTipo ?? null;
  }

  async definirPin(
    id: string,
    pinHash: string,
    pinTipo: TipoPin,
  ): Promise<void> {
    await this.prisma.usuaria.update({
      where: { id },
      data: { pinHash, pinTipo, pinTentativas: 0, pinBloqueadoAte: null },
    });
  }

  async removerPin(id: string): Promise<void> {
    await this.prisma.usuaria.update({
      where: { id },
      data: {
        pinHash: null,
        pinTipo: null,
        pinTentativas: 0,
        pinBloqueadoAte: null,
      },
    });
  }

  buscarEstadoPin(id: string): Promise<{
    pinHash: string | null;
    pinTipo: TipoPin | null;
    pinBloqueadoAte: Date | null;
  } | null> {
    return this.prisma.usuaria.findUnique({
      where: { id },
      select: { pinHash: true, pinTipo: true, pinBloqueadoAte: true },
    });
  }

  async zerarTentativasPin(id: string): Promise<void> {
    await this.prisma.usuaria.update({
      where: { id },
      data: { pinTentativas: 0 },
    });
  }

  /**
   * Conta um erro e, no `maximo`-ésimo seguido, bloqueia até `bloqueadoAte` e
   * zera a contagem: passado o prazo, a usuária tem tentativas novas. O
   * incremento é atômico, então pedidos simultâneos não escapam da contagem.
   */
  async registrarErroPin(
    id: string,
    maximo: number,
    bloqueadoAte: Date,
  ): Promise<void> {
    const { pinTentativas } = await this.prisma.usuaria.update({
      where: { id },
      data: { pinTentativas: { increment: 1 } },
      select: { pinTentativas: true },
    });
    if (pinTentativas >= maximo) {
      await this.prisma.usuaria.update({
        where: { id },
        data: { pinTentativas: 0, pinBloqueadoAte: bloqueadoAte },
      });
    }
  }
}
