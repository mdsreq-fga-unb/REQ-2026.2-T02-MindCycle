import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CodigoErro } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { ConteudoTermos } from '@/features/termos/conteudo-termos';
import { useTermos } from '@/features/termos/consulta';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';

// HU12, RNF02
export default function TermosDeUso() {
  const { sair } = useSessao();
  const queryClient = useQueryClient();
  const termos = useTermos();
  const aceite = useMutation({
    mutationFn: api.aceitarTermos,
    // A conta passa a ter termosAceitos e a navegação libera o app.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['conta'] }),
    onError: (erro) => {
      if (erro instanceof ErroApi && erro.codigo === CodigoErro.VersaoTermosDesatualizada) {
        void termos.refetch();
      }
    },
  });

  return (
    <Tela>
      <Titulo>{textos.termos.titulo}</Titulo>
      <Texto suave>{textos.termos.subtitulo}</Texto>
      <ConteudoTermos consulta={termos} />
      <Aviso>{aceite.isError && mensagemDeErro(aceite.error)}</Aviso>
      {termos.data && (
        <Botao
          titulo={textos.termos.botao}
          carregando={aceite.isPending}
          desabilitado={termos.isFetching || termos.isError}
          onPress={() => aceite.mutate(termos.data.versao)}
        />
      )}
      <Botao
        titulo={textos.termos.sair}
        variante="link"
        desabilitado={aceite.isPending}
        onPress={sair}
      />
    </Tela>
  );
}
