import { router } from 'expo-router';
import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { ListaTarefas } from '@/features/tarefas/lista-tarefas';
import { useTarefas } from '@/features/tarefas/consulta';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU17. Editar (HU16), concluir (HU20), adiar (HU18) e excluir (HU19) entram nesta lista depois.
export default function Tarefas() {
  const tarefas = useTarefas();

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
      {tarefas.data && <ListaTarefas tarefas={tarefas.data} />}
    </Tela>
  );
}
