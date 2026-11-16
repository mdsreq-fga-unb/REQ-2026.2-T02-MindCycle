import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  formatarDataBr,
  type RecomendacaoDoDia,
  type TarefaRecomendada,
} from '@mindcycle/shared';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { FormularioAdiamento } from '@/features/tarefas/formulario-adiamento';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

import { useRecomendacaoDoDia } from './consulta';

/**
 * HU13: as tarefas do dia na ordem que a API calcula. Tarefa urgente acima da
 * disposição mostra, sem cobrança, que pode ser adiada (HU18).
 */
export function PlanoDoDia() {
  const recomendacao = useRecomendacaoDoDia();

  return (
    <View style={styles.secao}>
      <Texto accessibilityRole="header" style={styles.titulo}>
        {textos.hoje.plano.titulo}
      </Texto>
      {recomendacao.isPending && <Texto suave>{textos.hoje.plano.carregando}</Texto>}
      {recomendacao.isError && (
        <View style={{ gap: espaco.sm }}>
          <Aviso>{mensagemDeErro(recomendacao.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void recomendacao.refetch()}
          />
        </View>
      )}
      {recomendacao.data && <ListaDoDia recomendacao={recomendacao.data} />}
    </View>
  );
}

/** A lista em si, separada da busca para o teste de tela (plano-do-dia.spec.tsx). */
export function ListaDoDia({ recomendacao }: { recomendacao: RecomendacaoDoDia }) {
  const [adiando, setAdiando] = useState<string>();
  const [confirmacao, setConfirmacao] = useState<string>();

  // Se a lista foi refeita e a tarefa em adiamento saiu dela ou perdeu o aviso
  // (um novo registro de disposição, por exemplo), o formulário fecha.
  const aberta = recomendacao.tarefas.find((t) => t.id === adiando);
  if (adiando !== undefined && !aberta?.avisoAdiamento) {
    setAdiando(undefined);
  }

  return (
    <>
      <Confirmacao>{confirmacao}</Confirmacao>
      {recomendacao.tarefas.length === 0 ? (
        <View style={styles.vazio}>
          <Texto style={styles.destaque}>{textos.hoje.plano.vazio.titulo}</Texto>
          <Texto suave>{textos.hoje.plano.vazio.texto}</Texto>
          <Botao
            titulo={textos.tarefas.novaTarefa}
            variante="link"
            onPress={() => router.push('/tarefa-nova')}
          />
        </View>
      ) : (
        <>
          <Texto suave>{textos.hoje.plano.subtitulo}</Texto>
          <Texto suave>
            {recomendacao.disposicaoAssumida
              ? textos.hoje.plano.disposicaoAssumida
              : recomendacao.disposicaoPorSobrecarga
              ? textos.sobrecarga.disposicaoConsiderada
              : textos.hoje.plano.disposicao(
                  textos.checkin.disposicao.niveis[recomendacao.disposicao],
                )}
          </Texto>
          <View style={styles.lista}>
            {recomendacao.tarefas.map((tarefa, indice) => (
              <ItemDoDia
                key={tarefa.id}
                tarefa={tarefa}
                numero={indice + 1}
                hoje={recomendacao.hoje}
                adiando={adiando === tarefa.id}
                aoAbrirAdiamento={() => {
                  setConfirmacao(undefined);
                  setAdiando(tarefa.id);
                }}
                aoFecharAdiamento={() => setAdiando(undefined)}
                aoAdiar={(data) => {
                  setAdiando((atual) => (atual === tarefa.id ? undefined : atual));
                  setConfirmacao(textos.tarefas.adiamento.confirmado(formatarDataBr(data)));
                }}
              />
            ))}
          </View>
        </>
      )}
    </>
  );
}

function ItemDoDia({
  tarefa,
  numero,
  hoje,
  adiando,
  aoAbrirAdiamento,
  aoFecharAdiamento,
  aoAdiar,
}: {
  tarefa: TarefaRecomendada;
  numero: number;
  hoje: string;
  adiando: boolean;
  aoAbrirAdiamento: () => void;
  aoFecharAdiamento: () => void;
  aoAdiar: (dataPlanejada: string) => void;
}) {
  return (
    <View style={styles.cartao}>
      <View
        style={styles.cabecalho}
        accessible
        accessibilityLabel={textos.hoje.plano.rotuloItem(numero, tarefa.titulo)}>
        <Texto style={styles.posicao}>{textos.hoje.plano.posicao(numero)}</Texto>
        <Texto style={[styles.destaque, styles.tituloItem]}>{tarefa.titulo}</Texto>
      </View>
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
      {tarefa.avisoAdiamento && (
        <>
          <Texto style={styles.aviso}>{textos.hoje.plano.avisoAdiamento}</Texto>
          {adiando ? (
            <FormularioAdiamento
              tarefa={tarefa}
              hoje={hoje}
              aoCancelar={aoFecharAdiamento}
              aoConcluir={(atualizada) => aoAdiar(atualizada.dataPlanejada)}
            />
          ) : (
            <Botao
              titulo={textos.tarefas.adiamento.abrir}
              rotuloAcessivel={textos.tarefas.adiamento.rotuloAbrir(tarefa.titulo)}
              variante="link"
              onPress={aoAbrirAdiamento}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { gap: espaco.sm },
  titulo: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
  lista: { gap: espaco.sm },
  cartao: {
    padding: espaco.md,
    gap: espaco.xs,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
  },
  cabecalho: { flexDirection: 'row', gap: espaco.sm, alignItems: 'baseline' },
  posicao: { color: cores.plum, fontWeight: '700' },
  tituloItem: { flex: 1 },
  destaque: { fontWeight: '700' },
  // Em plum, como a confirmação: informa sem alarme nem cobrança.
  aviso: { color: cores.plum },
  vazio: {
    gap: espaco.sm,
    padding: espaco.md,
    borderRadius: raio.campo,
    backgroundColor: cores.blush,
  },
});
