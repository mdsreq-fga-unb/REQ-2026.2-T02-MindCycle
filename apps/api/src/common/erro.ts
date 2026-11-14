import { HttpException, HttpStatus } from '@nestjs/common';
import type { CodigoErro, RespostaErro } from '@mindcycle/shared';

/** Erro de domínio: o corpo leva só o código, o app escolhe o texto. */
export function erro(status: HttpStatus, codigo: CodigoErro): HttpException {
  const corpo: RespostaErro = { statusCode: status, codigo };
  return new HttpException(corpo, status);
}
