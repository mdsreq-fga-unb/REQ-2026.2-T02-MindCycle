import { cicloPreenchido } from '@mindcycle/shared';
import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useCiclo } from '@/features/ciclo/consulta';
import { FormularioCiclo } from '@/features/ciclo/formulario-ciclo';
import { SeuCiclo } from '@/features/ciclo/seu-ciclo';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// Enquanto o ciclo não foi informado, o formulário (HU06 e HU07); depois,
// "Seu ciclo" com as fases (HU28). HU05 e HU10 completam "Seu ciclo".
export default function Ciclo() {
  const { conta } = useSessao();
  const ciclo = useCiclo();
  const preenchido = ciclo.data !== undefined && cicloPreenchido(ciclo.data);

  return (
    <Tela naAba noTopo={preenchido}>
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
      {ciclo.data &&
        conta &&
        (preenchido ? (
          <SeuCiclo ciclo={ciclo.data} hoje={conta.hoje} />
        ) : (
          <FormularioCiclo ciclo={ciclo.data} hoje={conta.hoje} />
        ))}
    </Tela>
  );
}
