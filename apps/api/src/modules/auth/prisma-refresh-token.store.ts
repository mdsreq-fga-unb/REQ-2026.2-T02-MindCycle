import { Injectable } from '@nestjs/common';
import {
  AuthenticationStorage,
  type RefreshTokenRecord,
  type RefreshTokenStore,
} from '@nestjs/authentication';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

/**
 * Refresh tokens no PostgreSQL. As regras de cada método estão no contrato
 * `RefreshTokenStore` do @nestjs/authentication; a principal é que
 * `markRefreshTokenUsed()` seja uma única escrita condicional.
 */
@Injectable()
export class PrismaRefreshTokenStore implements RefreshTokenStore {
  constructor(
    private readonly prisma: PrismaService,
    storage: AuthenticationStorage,
  ) {
    storage.registerSource({ refreshTokens: this });
  }

  async getRefreshToken(id: string): Promise<RefreshTokenRecord | undefined> {
    const linha = await this.prisma.refreshToken.findUnique({ where: { id } });
    if (!linha) {
      return undefined;
    }
    const { revoked: _, usedAt, claims, ...token } = linha;
    // O contrato pede campos opcionais ausentes, nunca null.
    return {
      ...token,
      ...(usedAt && { usedAt }),
      ...(claims !== null && { claims: claims as Record<string, unknown> }),
    };
  }

  async saveRefreshToken(record: RefreshTokenRecord): Promise<void> {
    await this.prisma.refreshToken.create({
      data: { ...record, claims: record.claims as Prisma.InputJsonValue },
    });
    await this.prisma.refreshToken.deleteMany({
      where: { familyExpiresAt: { lte: record.createdAt } },
    });
  }

  async markRefreshTokenUsed(id: string, at: Date): Promise<boolean> {
    // Condicional: de dois refresh com o mesmo token, só um atualiza a linha.
    const { count } = await this.prisma.refreshToken.updateMany({
      where: { id, usedAt: null },
      data: { usedAt: at },
    });
    return count === 1;
  }

  async revokeRefreshTokenFamily(familyId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { familyId },
      data: { revoked: true },
    });
  }

  async isRefreshTokenFamilyRevoked(familyId: string): Promise<boolean> {
    // A família é revogada se qualquer token dela for: cobre o sucessor
    // salvo depois da revogação.
    const revogado = await this.prisma.refreshToken.findFirst({
      where: { familyId, revoked: true },
      select: { id: true },
    });
    return revogado !== null;
  }

  async revokeUserRefreshTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }
}
