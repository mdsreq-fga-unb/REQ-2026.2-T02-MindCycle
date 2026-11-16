import { Module } from '@nestjs/common';
import { ConsentModule } from '../consent/consent.module.js';
import { CheckinController } from './checkin.controller.js';
import { CheckinService } from './checkin.service.js';
import { SobrecargaController } from './sobrecarga.controller.js';
import { SobrecargaService } from './sobrecarga.service.js';

// HU04 e HU02: o registro de disposição e a sinalização de sobrecarga decidem
// juntos a disposição do dia (CheckinService.disposicaoDoDia).
@Module({
  imports: [ConsentModule],
  controllers: [CheckinController, SobrecargaController],
  providers: [CheckinService, SobrecargaService],
  exports: [CheckinService],
})
export class CheckinModule {}
