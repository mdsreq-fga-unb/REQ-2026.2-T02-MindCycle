import { Relogio } from '../src/common/relogio.js';

/** Relógio parado num instante: "hoje" não depende de quando o teste roda. */
export class RelogioFixo extends Relogio {
  constructor(private instante: Date) {
    super();
  }

  agora(): Date {
    return this.instante;
  }

  ajustar(instante: Date): void {
    this.instante = instante;
  }
}
