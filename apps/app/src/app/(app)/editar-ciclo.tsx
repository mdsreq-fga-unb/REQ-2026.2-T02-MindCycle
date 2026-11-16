import { router } from 'expo-router';
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

// HU06 e HU07: corrigir o que foi informado. Abre a partir de "Seu ciclo".
export default function EditarCiclo() {
  const { conta } = useSessao();
  const ciclo = useCiclo();
  const t = textos.ciclo;

  return (
    <Tela>
      <Titulo>{t.editar.titulo}</Titulo>
      {ciclo.isPending && <Texto suave>{t.carregando}</Texto>}
      {ciclo.isError && <Aviso>{mensagemDeErro(ciclo.error)}</Aviso>}
      {ciclo.data && conta && (
        <View style={{ gap: espaco.xl }}>
          <CaracteristicasDoCiclo perfil={ciclo.data.perfil} />
          <RegistrarInicio hoje={conta.hoje} />
          <HistoricoInicios inicios={ciclo.data.inicios} />
        </View>
      )}
      <Botao titulo={t.editar.voltar} variante="link" onPress={() => router.back()} />
    </Tela>
  );
}
