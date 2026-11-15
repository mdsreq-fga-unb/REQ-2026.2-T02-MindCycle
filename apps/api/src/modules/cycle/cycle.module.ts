import { Module } from '@nestjs/common';
import { ConsentModule } from '../consent/consent.module.js';
import { CicloController } from './ciclo.controller.js';
import { CicloService } from './ciclo.service.js';

@Module({
  imports: [ConsentModule],
  controllers: [CicloController],
  providers: [CicloService],
})
export class CycleModule {}
