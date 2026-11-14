import { Controller, Get } from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from './prisma/prisma.service.js';

/**
 * Usada pelo provedor de hospedagem para saber se a API está de pé. Responde 503
 * quando o banco não responde, e o Terminus registra o erro no log.
 */
@Public()
@Controller('saude')
export class SaudeController {
  constructor(
    private readonly saude: HealthCheckService,
    private readonly prismaIndicador: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  verificar() {
    return this.saude.check([() => this.prismaIndicador.pingCheck('banco', this.prisma)]);
  }
}
