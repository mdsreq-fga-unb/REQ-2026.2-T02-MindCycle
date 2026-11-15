import { StyleSheet, View } from 'react-native';
import { formatarDataBr, type Tarefa } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

/** HU17. A ordem é a da API; a recomendação do dia (HU13) vem depois. */
export function ListaTarefas({ tarefas }: { tarefas: Tarefa[] }) {
  if (tarefas.length === 0) {
    return (
      <View style={styles.vazio}>
        <Texto accessibilityRole="header" style={styles.destaque}>
          {textos.tarefas.vazio.titulo}
        </Texto>
        <Texto suave>{textos.tarefas.vazio.texto}</Texto>
      </View>
    );
  }
  return (
    <View style={styles.lista}>
      {tarefas.map((tarefa) => (
        <View key={tarefa.id} style={styles.cartao}>
          <Texto style={styles.destaque}>{tarefa.titulo}</Texto>
          <Texto suave>{textos.tarefas.item.prazo(formatarDataBr(tarefa.prazo))}</Texto>
          <Texto suave>
            {[
              textos.tarefas.item.prioridade(textos.tarefas.niveis[tarefa.prioridade]),
              textos.tarefas.item.energia(textos.tarefas.niveis[tarefa.energia]),
            ].join(' · ')}
          </Texto>
          {tarefa.duracaoMinutos !== null && (
            <Texto suave>{textos.tarefas.item.duracao(tarefa.duracaoMinutos)}</Texto>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lista: { gap: espaco.sm },
  cartao: {
    padding: espaco.md,
    gap: espaco.xs,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
  },
  destaque: { fontWeight: '700' },
  vazio: { gap: espaco.sm, padding: espaco.md, borderRadius: raio.campo, backgroundColor: cores.blush },
});
