import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CodigoErro } from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { ConsentService } from './consent.service.js';

/**
 * RNF02: nenhum dado de ciclo, sintoma ou disposição é gravado antes do aceite
 * dos termos vigentes. Use com `@UseGuards(ConsentGuard)` nas rotas que gravam
 * esses dados. Roda depois do guard global de autenticação.
 */
@Injectable()
export class ConsentGuard implements CanActivate {
  constructor(private readonly consentService: ConsentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context
      .switchToHttp()
      .getRequest<{ user?: UsuariaAutenticada }>();
    if (user && (await this.consentService.temConsentimentoVigente(user.id))) {
      return true;
    }
    throw erro(HttpStatus.FORBIDDEN, CodigoErro.ConsentimentoPendente);
  }
}
