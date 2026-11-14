import { Module } from '@nestjs/common';
import { ConsentController } from './consent.controller.js';
import { ConsentGuard } from './consent.guard.js';
import { ConsentService } from './consent.service.js';

@Module({
  controllers: [ConsentController],
  providers: [ConsentService, ConsentGuard],
  exports: [ConsentService, ConsentGuard],
})
export class ConsentModule {}
