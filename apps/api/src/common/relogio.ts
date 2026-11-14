import { Global, Injectable, Module } from '@nestjs/common';
import { dataLocal, type DataLocal } from '@mindcycle/shared';

/**
 * O instante atual. Os módulos pedem a hora a este provider, nunca a `new Date()`,
 * para que os testes fixem o relógio (veja `RelogioFixo` em test/).
 */
export abstract class Relogio {
  abstract agora(): Date;

  /** A data de hoje no calendário da usuária (HU04, HU05, HU13). */
  hoje(fuso: string): DataLocal {
    return dataLocal(this.agora(), fuso);
  }
}

@Injectable()
export class RelogioDoSistema extends Relogio {
  agora(): Date {
    return new Date();
  }
}

@Global()
@Module({
  providers: [{ provide: Relogio, useClass: RelogioDoSistema }],
  exports: [Relogio],
})
export class RelogioModule {}
