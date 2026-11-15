import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { dataLocal, formatarDataBr, type Tarefa } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Botao, Confirmacao, Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';
import { FormularioAdiamento } from './formulario-adiamento';

/** HU17. A ordem é a da API; a recomendação do dia (HU13) vem depois. */
export function ListaTarefas({
  tarefas,
  hoje,
  fuso,
  concluidas = false,
}: {
  tarefas: Tarefa[];
  hoje: string;
  fuso: string;
  concluidas?: boolean;
}) {
  const [adiando, setAdiando] = useState<string>();
  const [confirmacao, setConfirmacao] = useState<{
    id: string;
    texto: string;
  }>();
  if (tarefas.length === 0) {
    if (concluidas) return <Texto suave>{textos.tarefas.concluidasVazias}</Texto>;
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
          {tarefa.concluidaEm && (
            <Confirmacao>
              {textos.tarefas.concluidaEm(
                formatarDataBr(dataLocal(new Date(tarefa.concluidaEm), fuso)),
              )}
            </Confirmacao>
          )}
          <Texto suave>
            {textos.tarefas.item.dataPlanejada(formatarDataBr(tarefa.dataPlanejada))}
          </Texto>
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
          {confirmacao?.id === tarefa.id && <Confirmacao>{confirmacao.texto}</Confirmacao>}
          <Botao
            titulo={textos.tarefas.detalhe.abrir}
            rotuloAcessivel={textos.tarefas.detalhe.rotuloAbrir(tarefa.titulo)}
            variante="link"
            onPress={() => router.push({ pathname: '/tarefa-detalhe', params: { id: tarefa.id } })}
          />
          {!tarefa.concluidaEm &&
            (adiando === tarefa.id ? (
              <FormularioAdiamento
                tarefa={tarefa}
                hoje={hoje}
                aoCancelar={() => setAdiando(undefined)}
                aoConcluir={(atualizada) => {
                  setAdiando((atual) => (atual === tarefa.id ? undefined : atual));
                  setConfirmacao({
                    id: tarefa.id,
                    texto: textos.tarefas.adiamento.confirmado(
                      formatarDataBr(atualizada.dataPlanejada),
                    ),
                  });
                }}
              />
            ) : (
              <Botao
                titulo={textos.tarefas.adiamento.abrir}
                rotuloAcessivel={textos.tarefas.adiamento.rotuloAbrir(tarefa.titulo)}
                variante="link"
                onPress={() => {
                  setConfirmacao(undefined);
                  setAdiando(tarefa.id);
                }}
              />
            ))}
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
  vazio: {
    gap: espaco.sm,
    padding: espaco.md,
    borderRadius: raio.campo,
    backgroundColor: cores.blush,
  },
});
