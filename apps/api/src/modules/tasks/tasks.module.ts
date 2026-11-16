import { Module } from '@nestjs/common';
import { TarefasController } from './tarefas.controller.js';
import { TarefasService } from './tarefas.service.js';

@Module({
  controllers: [TarefasController],
  providers: [TarefasService],
  exports: [TarefasService],
})
export class TasksModule {}
