import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { ListaTarefas } from '@/features/tarefas/lista-tarefas';
import { useTarefas } from '@/features/tarefas/consulta';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

// HU16 a HU20: o detalhe edita/exclui/conclui; a lista mantém o adiamento.
export default function Tarefas() {
  const [concluidas, setConcluidas] = useState(false);
  const tarefas = useTarefas(concluidas);
  const { conta } = useSessao();

  return (
    <Tela naAba>
      <Titulo>{textos.tarefas.titulo}</Titulo>
      <Botao titulo={textos.tarefas.novaTarefa} onPress={() => router.push('/tarefa-nova')} />
      <View accessibilityRole="radiogroup" style={styles.abas}>
        {[false, true].map((valor) => (
          <Pressable
            key={String(valor)}
            accessibilityRole="radio"
            accessibilityState={{ checked: concluidas === valor }}
            onPress={() => setConcluidas(valor)}
            style={[styles.aba, concluidas === valor && styles.selecionada]}
          >
            <Texto>{valor ? textos.tarefas.concluidas : textos.tarefas.abertas}</Texto>
          </Pressable>
        ))}
      </View>
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
      {tarefas.data && conta && (
        <ListaTarefas
          key={String(concluidas)}
          tarefas={tarefas.data}
          hoje={conta.hoje}
          fuso={conta.fuso}
          concluidas={concluidas}
        />
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  abas: { flexDirection: 'row', gap: espaco.xs },
  aba: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: cores.blush,
    borderRadius: raio.campo,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.white,
  },
  selecionada: { borderWidth: 2, borderColor: cores.plum, backgroundColor: cores.blush },
});
