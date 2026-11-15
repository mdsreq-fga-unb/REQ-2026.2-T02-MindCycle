import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { CodigoErro } from '@mindcycle/shared';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useHistoricoCheckins } from '@/features/checkin/consulta';
import { FormularioCheckin } from '@/features/checkin/formulario-checkin';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU04. Abre por cima das abas, a partir do cartão da aba Hoje ou de "Meus registros".
// É uma tela própria, e não o cartão em modo de edição, para que o histórico
// também corrija registros anteriores com o mesmo formulário.
export default function RegistroCorrigir() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const historico = useHistoricoCheckins();
  const [corrigido, setCorrigido] = useState(false);
  const registro = historico.data?.find((checkin) => checkin.id === id);

  return (
    <Tela>
      <Titulo>{textos.checkin.corrigirTela.titulo}</Titulo>
      <Texto suave>{textos.checkin.corrigirTela.subtitulo}</Texto>
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
      {historico.data && !registro && <Aviso>{textos.erros[CodigoErro.NaoEncontrado]}</Aviso>}
      {registro && (
        <>
          <Confirmacao>{corrigido && textos.checkin.corrigido}</Confirmacao>
          <FormularioCheckin registro={registro} aoConcluir={() => setCorrigido(true)} />
        </>
      )}
      <Botao titulo={textos.checkin.corrigirTela.voltar} variante="link" onPress={voltar} />
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
