import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import type { CadastroDto } from '@mindcycle/shared';
import { UsuariasRepository } from '../account/usuarias.repository.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

@Injectable()
export class CredenciaisService {
  constructor(
    private readonly usuarias: UsuariasRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async cadastrar({
    email,
    senha,
    fuso,
  }: CadastroDto): Promise<UsuariaAutenticada> {
    const senhaHash = await this.hasher.hash(senha);
    return this.usuarias.criar({ email, senhaHash, fuso });
  }

  /** A usuária, ou `null` quando o e-mail ou a senha não conferem. */
  async verificar(
    email: string,
    senha: string,
  ): Promise<UsuariaAutenticada | null> {
    const encontrada = await this.usuarias.buscarCredenciais(email);
    // Sem conta, verify() compara com um hash falso: o tempo de resposta não
    // revela quais e-mails estão cadastrados.
    const valida = await this.hasher.verify(senha, encontrada?.senhaHash);
    if (!valida || !encontrada) {
      return null;
    }
    if (this.hasher.needsRehash(encontrada.senhaHash)) {
      await this.usuarias.atualizarSenhaHash(
        encontrada.usuaria.id,
        await this.hasher.hash(senha),
      );
    }
    return encontrada.usuaria;
  }
}
