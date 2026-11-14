import { HttpStatus, Injectable } from '@nestjs/common';
import { CodigoErro } from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { TERMOS } from './termos.js';

@Injectable()
export class ConsentService {
  constructor(private readonly prisma: PrismaService) {}

  /** Só a versão vigente pode ser aceita: a usuária precisa ter lido o texto atual. */
  async aceitar(usuariaId: string, versao: string): Promise<void> {
    if (versao !== TERMOS.versao) {
      throw erro(HttpStatus.CONFLICT, CodigoErro.VersaoTermosDesatualizada);
    }
    if (await this.temConsentimentoVigente(usuariaId)) {
      return;
    }
    await this.prisma.consentimento.create({
      data: { usuariaId, versaoTermos: versao },
    });
  }

  async temConsentimentoVigente(usuariaId: string): Promise<boolean> {
    const aceite = await this.prisma.consentimento.findFirst({
      where: { usuariaId, versaoTermos: TERMOS.versao, revogadoEm: null },
      select: { id: true },
    });
    return aceite !== null;
  }
}
