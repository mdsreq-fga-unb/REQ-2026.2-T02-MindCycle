import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { CaracteristicasDoCiclo } from '@/features/ciclo/caracteristicas-do-ciclo';
import { useCiclo } from '@/features/ciclo/consulta';
import { HistoricoInicios } from '@/features/ciclo/historico-inicios';
import { RegistrarInicio } from '@/features/ciclo/registrar-inicio';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU06, HU07. A fase estimada (HU05), HU28 e HU09 entram nesta aba depois.
export default function Ciclo() {
  const { conta } = useSessao();
  const ciclo = useCiclo();

  return (
    <Tela naAba>
      <Titulo>{textos.ciclo.titulo}</Titulo>
      <Texto suave>{textos.ciclo.subtitulo}</Texto>
      {ciclo.isPending && <Texto suave>{textos.ciclo.carregando}</Texto>}
      {ciclo.isError && (
        <View style={{ gap: espaco.sm }}>
          <Aviso>{mensagemDeErro(ciclo.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void ciclo.refetch()}
          />
        </View>
      )}
      {ciclo.data && conta && (
        <>
          <RegistrarInicio hoje={conta.hoje} />
          <HistoricoInicios inicios={ciclo.data.inicios} />
          <CaracteristicasDoCiclo perfil={ciclo.data.perfil} />
        </>
      )}
    </Tela>
  );
}
