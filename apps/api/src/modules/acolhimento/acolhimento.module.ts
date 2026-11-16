import { Module } from '@nestjs/common';
import { AcolhimentoController } from './acolhimento.controller.js';
import { AcolhimentoService } from './acolhimento.service.js';

@Module({
  controllers: [AcolhimentoController],
  providers: [AcolhimentoService],
})
export class AcolhimentoModule {}
