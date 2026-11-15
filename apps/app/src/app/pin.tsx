import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CodigoErro, type Pin } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { PinEntrada } from '@/ui/pin-entrada';

// HU11, RNF09: a trava da sessão. A conferência é no servidor, que conta os
// erros e bloqueia depois do limite.
export default function TravaPin() {
  const { conta, destravar, sair } = useSessao();
  const tipo = conta?.tipoPin ?? 'petalas';
  const queryClient = useQueryClient();
  const verificacao = useMutation({
    mutationFn: (pin: Pin) => api.verificarPin(pin),
    onSuccess: destravar,
    onError: (e) => {
      // O PIN foi removido em outro aparelho: a conta atualizada já não trava.
      if (e instanceof ErroApi && e.codigo === CodigoErro.PinNaoDefinido) {
        void queryClient.invalidateQueries({ queryKey: ['conta'] });
      }
    },
  });

  return (
    <Tela>
      <Titulo>{textos.pin.trava.titulo}</Titulo>
      <Texto suave>{textos.pin.trava.subtitulo[tipo]}</Texto>
      <PinEntrada
        tipo={tipo}
        aoCompletar={(pin) => verificacao.mutate(pin)}
        desabilitado={verificacao.isPending || verificacao.isSuccess}
      />
      <Aviso>{verificacao.isError && mensagemDeErro(verificacao.error)}</Aviso>
      <Texto suave>{textos.pin.trava.esqueciDica}</Texto>
      <Botao titulo={textos.pin.trava.esqueci} variante="link" onPress={sair} />
    </Tela>
  );
}
