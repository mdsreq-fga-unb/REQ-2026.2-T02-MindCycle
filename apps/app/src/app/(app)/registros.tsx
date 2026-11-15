import { router } from 'expo-router';
import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useHistoricoCheckins } from '@/features/checkin/consulta';
import { ListaCheckins } from '@/features/checkin/lista-checkins';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU04. Abre por cima das abas, a partir do cartão da aba Hoje.
export default function Registros() {
  const { conta } = useSessao();
  const historico = useHistoricoCheckins();

  return (
    <Tela>
      <Titulo>{textos.checkin.registros.titulo}</Titulo>
      <Texto suave>{textos.checkin.registros.subtitulo}</Texto>
      {historico.isPending && <Texto suave>{textos.checkin.registros.carregando}</Texto>}
      {historico.isError && (
        <View style={{ gap: espaco.sm }}>
          <Aviso>{mensagemDeErro(historico.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void historico.refetch()}
          />
        </View>
      )}
      {historico.data && conta && <ListaCheckins checkins={historico.data} fuso={conta.fuso} />}
      <Botao titulo={textos.checkin.registros.voltar} variante="link" onPress={voltar} />
    </Tela>
  );
}

function voltar() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}
