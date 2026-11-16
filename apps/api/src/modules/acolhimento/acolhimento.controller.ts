import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import type {
  MensagemAcolhimentoDoDia,
  SugestoesDoDia,
} from '@mindcycle/shared';
import type { UsuariaAutenticada } from '../account/usuaria.js';
import { AcolhimentoService } from './acolhimento.service.js';

@Controller('acolhimento')
export class AcolhimentoController {
  constructor(private readonly acolhimento: AcolhimentoService) {}

  // Leitura, sem ConsentGuard: o guard protege o que grava dado da usuária, e
  // aqui nada é gravado. O guard global de autenticação segue valendo.
  @Get('sugestoes')
  sugestoes(@CurrentUser() usuaria: UsuariaAutenticada): SugestoesDoDia {
    return this.acolhimento.doDia(usuaria);
  }

  // HU22: leitura da mensagem diária, também sem gravação nem ConsentGuard.
  @Get('mensagem')
  mensagem(@CurrentUser() usuaria: UsuariaAutenticada): MensagemAcolhimentoDoDia {
    return this.acolhimento.mensagem(usuaria);
  }
}
