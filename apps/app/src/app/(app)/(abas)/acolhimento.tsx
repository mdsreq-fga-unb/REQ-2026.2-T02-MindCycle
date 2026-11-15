import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSugestoesAcolhimento } from '@/features/acolhimento/consulta';
import { ListaSugestoes } from '@/features/acolhimento/lista-sugestoes';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU21: as sugestões do dia. As mensagens de acolhimento (HU22) entram acima delas.
export default function Acolhimento() {
  const sugestoes = useSugestoesAcolhimento();
  const t = textos.acolhimento.sugestoes;

  return (
    <Tela naAba>
      <Titulo>{textos.acolhimento.titulo}</Titulo>
      <Texto suave>{textos.acolhimento.emBreve}</Texto>

      <Texto style={{ fontWeight: '700' }}>{t.titulo}</Texto>
      <Texto suave>{t.convite}</Texto>
      {sugestoes.isPending && <Texto suave>{t.carregando}</Texto>}
      {sugestoes.isError && (
        <View style={{ gap: espaco.sm }}>
          <Aviso>{mensagemDeErro(sugestoes.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void sugestoes.refetch()}
          />
        </View>
      )}
      {sugestoes.data && (
        <>
          <ListaSugestoes sugestoes={sugestoes.data.sugestoes} />
          <Texto suave>{t.rotacao}</Texto>
        </>
      )}
    </Tela>
  );
}
