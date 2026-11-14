import { HttpStatus, Injectable } from '@nestjs/common';
import { CodigoErro } from '@mindcycle/shared';
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
}
