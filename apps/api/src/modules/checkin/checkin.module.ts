import { Module } from '@nestjs/common';
import { ConsentModule } from '../consent/consent.module.js';
import { CheckinController } from './checkin.controller.js';
import { CheckinService } from './checkin.service.js';

@Module({
  imports: [ConsentModule],
  controllers: [CheckinController],
  providers: [CheckinService],
  exports: [CheckinService],
})
export class CheckinModule {}
