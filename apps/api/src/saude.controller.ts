import { Controller, Get } from '@nestjs/common';
import { Public } from '@nestjs/authentication';

@Public()
@Controller('saude')
export class SaudeController {
  @Get()
  verificar() {
    return { status: 'ok' };
  }
}
