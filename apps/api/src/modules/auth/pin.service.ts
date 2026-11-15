import { HttpStatus, Injectable } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { CodigoErro, type Pin, type TipoPin } from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import { CredenciaisService } from '../account/credenciais.service.js';
import { UsuariasRepository } from '../account/usuarias.repository.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

// Pendência: os dois limites abaixo ainda precisam de validação da equipe.
/** Erros seguidos na verificação do PIN que bloqueiam novas tentativas. */
export const PIN_MAX_ERROS = 5;
/** Quanto tempo o bloqueio dura, em minutos. */
export const PIN_BLOQUEIO_MINUTOS = 15;

/** HU11: o PIN é uma trava da sessão; a credencial da conta segue sendo a senha. */
@Injectable()
export class PinService {
  constructor(
    private readonly usuarias: UsuariasRepository,
    private readonly credenciais: CredenciaisService,
    private readonly hasher: PasswordHasher,
    private readonly relogio: Relogio,
  ) {}

  /** Define ou troca o PIN e o tipo dele. */
  async definir(
    usuaria: UsuariaAutenticada,
    tipo: TipoPin,
    pin: Pin,
    senha: string,
  ): Promise<void> {
    await this.exigirSenha(usuaria, senha);
    await this.usuarias.definirPin(
      usuaria.id,
      await this.hasher.hash(chave(tipo, pin)),
      tipo,
    );
  }

  async remover(usuaria: UsuariaAutenticada, senha: string): Promise<void> {
    await this.exigirSenha(usuaria, senha);
    await this.usuarias.removerPin(usuaria.id);
  }

  /** Só retorna se o PIN confere; o resto vira erro de domínio. */
  async verificar(usuariaId: string, pin: Pin): Promise<void> {
    const estado = await this.usuarias.buscarEstadoPin(usuariaId);
    if (!estado?.pinHash || !estado.pinTipo) {
      throw erro(HttpStatus.CONFLICT, CodigoErro.PinNaoDefinido);
    }
    const agora = this.relogio.agora();
    // Durante o bloqueio, nem o PIN certo é aceito: senão o limite não valeria.
    if (estado.pinBloqueadoAte && estado.pinBloqueadoAte > agora) {
      throw erro(HttpStatus.FORBIDDEN, CodigoErro.PinBloqueado);
    }
    if (await this.hasher.verify(chave(estado.pinTipo, pin), estado.pinHash)) {
      await this.usuarias.zerarTentativasPin(usuariaId);
      return;
    }
    const bloqueadoAte = new Date(
      agora.getTime() + PIN_BLOQUEIO_MINUTOS * 60_000,
    );
    await this.usuarias.registrarErroPin(
      usuariaId,
      PIN_MAX_ERROS,
      bloqueadoAte,
    );
    throw erro(HttpStatus.UNAUTHORIZED, CodigoErro.PinIncorreto);
  }

  // Mesma verificação da entrada com senha.
  private async exigirSenha(
    usuaria: UsuariaAutenticada,
    senha: string,
  ): Promise<void> {
    if (!(await this.credenciais.verificar(usuaria.email, senha))) {
      throw erro(HttpStatus.UNAUTHORIZED, CodigoErro.CredenciaisInvalidas);
    }
  }
}

// O que vai para o hash: [1, 6, 3, 3] de pétalas vira "petalas:1633". O tipo
// entra na chave para que um PIN de um tipo nunca valide no outro.
const chave = (tipo: TipoPin, pin: Pin) => `${tipo}:${pin.join('')}`;
