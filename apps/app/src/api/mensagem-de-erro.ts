import { textos } from '@/textos';

import { ErroApi } from './cliente';

/** Texto acolhedor para um erro da API, a partir do código que ela devolve. */
export function mensagemDeErro(erro: unknown): string {
  if (erro instanceof ErroApi) {
    if (erro.codigo) {
      return textos.erros[erro.codigo];
    }
    if (erro.status === 400) {
      return textos.erros.validacao;
    }
  }
  return textos.erros.generico;
}
