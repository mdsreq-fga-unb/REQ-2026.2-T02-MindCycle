import { router } from 'expo-router';
import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { ListaTarefas } from '@/features/tarefas/lista-tarefas';
import { useTarefas } from '@/features/tarefas/consulta';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU17/HU18. Editar, concluir e excluir entram nas respectivas histórias.
export default function Tarefas() {
  const tarefas = useTarefas();
  const { conta } = useSessao();

  return (
    <Tela naAba>
      <Titulo>{textos.tarefas.titulo}</Titulo>
      <Botao titulo={textos.tarefas.novaTarefa} onPress={() => router.push('/tarefa-nova')} />
      {tarefas.isPending && <Texto suave>{textos.tarefas.carregando}</Texto>}
      {tarefas.isError && (
        <View style={{ gap: espaco.sm }}>
          <Aviso>{mensagemDeErro(tarefas.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void tarefas.refetch()}
          />
        </View>
      )}
      {tarefas.data && conta && <ListaTarefas tarefas={tarefas.data} hoje={conta.hoje} />}
    </Tela>
  );
}
