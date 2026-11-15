import { CodigoErro } from '@mindcycle/shared';

import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';

/** Na tela do PIN, "e-mail ou senha" não faz sentido: o e-mail já é conhecido. */
export function mensagemDeErroDeSenha(erro: unknown): string {
  if (erro instanceof ErroApi && erro.codigo === CodigoErro.CredenciaisInvalidas) {
    return textos.pin.senhaIncorreta;
  }
  return mensagemDeErro(erro);
}
