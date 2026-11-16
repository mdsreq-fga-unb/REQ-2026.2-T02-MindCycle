import { Injectable } from '@nestjs/common';
import {
  mensagemDoDia,
  sugestoesDoDia,
  type MensagemAcolhimentoDoDia,
  type SugestoesDoDia,
} from '@mindcycle/shared';
import { Relogio } from '../../common/relogio.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

@Injectable()
export class AcolhimentoService {
  constructor(private readonly relogio: Relogio) {}

  /**
   * HU21: as sugestões de hoje no calendário da usuária. Nada aqui é gravado — a
   * lista nasce da data, então a aba não guarda dado nenhum da usuária e a HU36
   * não tem o que apagar.
   */
  doDia(usuaria: UsuariaAutenticada): SugestoesDoDia {
    const dataLocal = this.relogio.hoje(usuaria.fuso);
    return { dataLocal, sugestoes: sugestoesDoDia(dataLocal) };
  }

  /**
   * HU22: a mensagem de acolhimento do dia no calendário da usuária. Assim como
   * as sugestões, nasce apenas da data local e não grava dados.
   */
  mensagem(usuaria: UsuariaAutenticada): MensagemAcolhimentoDoDia {
    const dataLocal = this.relogio.hoje(usuaria.fuso);
    return { dataLocal, id: mensagemDoDia(dataLocal) };
  }
}
