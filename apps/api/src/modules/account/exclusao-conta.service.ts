import { HttpStatus, Injectable } from '@nestjs/common';
import { CodigoErro } from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CredenciaisService } from './credenciais.service.js';
import type { UsuariaAutenticada } from './usuaria.js';

/** HU36: exclui a conta e todos os dados da usuária, de forma irreversível. */
@Injectable()
export class ExclusaoContaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly credenciais: CredenciaisService,
    private readonly relogio: Relogio,
  ) {}

  async excluir(usuaria: UsuariaAutenticada, senha: string): Promise<void> {
    if (!(await this.credenciais.verificar(usuaria.email, senha))) {
      throw erro(HttpStatus.UNAUTHORIZED, CodigoErro.CredenciaisInvalidas);
    }

    await this.prisma.$transaction([
      // Revoga antes de apagar, como o design doc prevê; a cascata remove a linha em seguida.
      this.prisma.consentimento.updateMany({
        where: { usuariaId: usuaria.id, revogadoEm: null },
        data: { revogadoEm: this.relogio.agora() },
      }),
      // TABELAS SEM FK para Usuaria não saem na cascata e são apagadas aqui à mão.
      // Quem criar uma tabela sem FK com dados da usuária deve incluí-la nesta lista
      // e ganhar um caso em test/exclusao-conta.e2e-spec.ts.
      this.prisma.refreshToken.deleteMany({ where: { userId: usuaria.id } }),
      // As demais tabelas têm FK com onDelete: Cascade e saem junto com a usuária.
      // deleteMany: uma exclusão repetida em paralelo não falha.
      this.prisma.usuaria.deleteMany({ where: { id: usuaria.id } }),
    ]);
  }
}
