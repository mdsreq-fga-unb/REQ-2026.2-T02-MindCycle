import type {
  AtualizacaoContaDto,
  CadastroDto,
  EntradaDto,
  Termos,
  Tokens,
  Usuaria,
} from '@mindcycle/shared';

import { pedir } from './cliente';

export const api = {
  cadastrar: (dados: CadastroDto) =>
    pedir<Tokens>('/auth/cadastro', { metodo: 'POST', corpo: dados, publica: true }),
  entrar: (dados: EntradaDto) =>
    pedir<Tokens>('/auth/entrada', { metodo: 'POST', corpo: dados, publica: true }),
  sair: (refreshToken: string) =>
    pedir<void>('/auth/saida', { metodo: 'POST', corpo: { refreshToken }, publica: true }),
  conta: () => pedir<Usuaria>('/conta'),
  atualizarConta: (dados: AtualizacaoContaDto) =>
    pedir<Usuaria>('/conta', { metodo: 'PATCH', corpo: dados }),
  termos: () => pedir<Termos>('/termos', { publica: true }),
  aceitarTermos: (versao: string) =>
    pedir<void>('/termos/aceite', { metodo: 'POST', corpo: { versao } }),
};
