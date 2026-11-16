import { Module } from '@nestjs/common';
import { CheckinModule } from '../checkin/checkin.module.js';
import { TasksModule } from '../tasks/tasks.module.js';
import { PlanejamentoController } from './planejamento.controller.js';
import { PlanejamentoService } from './planejamento.service.js';

// HU13 (e HU15, depois): o domínio em domain/ é puro; o service orquestra.
@Module({
  imports: [TasksModule, CheckinModule],
  controllers: [PlanejamentoController],
  providers: [PlanejamentoService],
})
export class PlanningModule {}
