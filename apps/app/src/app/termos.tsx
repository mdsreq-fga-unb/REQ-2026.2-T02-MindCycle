import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { View } from 'react-native';
import { CodigoErro } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU12, RNF02
export default function TermosDeUso() {
  const { sair } = useSessao();
  const queryClient = useQueryClient();
  const termos = useQuery({ queryKey: ['termos'], queryFn: api.termos });
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
      {termos.isPending && <Texto suave>{textos.termos.carregando}</Texto>}
      {termos.isError && (
        <Botao titulo={textos.conexao.tentarDeNovo} variante="link" onPress={() => void termos.refetch()} />
      )}
      {termos.data?.secoes.map((secao) => (
        <View key={secao.titulo} style={{ gap: espaco.xs }}>
          <Texto style={{ fontWeight: '700' }}>{secao.titulo}</Texto>
          <Texto>{secao.texto}</Texto>
        </View>
      ))}
      <Aviso>
        {termos.isError
          ? mensagemDeErro(termos.error)
          : aceite.isError && mensagemDeErro(aceite.error)}
      </Aviso>
      {termos.data && (
        <Botao
          titulo={textos.termos.botao}
          carregando={aceite.isPending}
          onPress={() => aceite.mutate(termos.data.versao)}
        />
      )}
      <Botao titulo={textos.termos.sair} variante="link" onPress={sair} />
    </Tela>
  );
}
