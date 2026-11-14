import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  JwtBearerProvider,
  type JwtClaims,
} from '@nestjs/authentication';
import { UsuariasRepository } from '../account/usuarias.repository.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

/** Bearer token no header Authorization: o mesmo fluxo para web e celular. */
@Injectable()
export class JwtAuth extends JwtBearerProvider<UsuariaAutenticada> {
  constructor(
    private readonly usuarias: UsuariasRepository,
    registry: AuthenticationRegistry,
  ) {
    super({ realm: 'mindcycle' });
    registry.registerProvider(this);
  }

  // Roda a cada requisição: uma conta excluída (HU36) perde o acesso na hora.
  validate({ sub }: JwtClaims) {
    return sub ? this.usuarias.buscarPorId(sub) : null;
  }
}
