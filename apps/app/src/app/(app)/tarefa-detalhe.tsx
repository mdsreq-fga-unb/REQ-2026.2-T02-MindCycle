import { dataLocal, formatarDataBr } from '@mindcycle/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { chaveTarefas, useTarefa } from '@/features/tarefas/consulta';
import { FormularioTarefa } from '@/features/tarefas/formulario-tarefa';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Tela, Texto, Titulo } from '@/ui/componentes';

// HU16/HU19 compartilham o detalhe; HU20 preserva a conclusão nesta mesma tarefa.
export default function TarefaDetalhe() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const consulta = useTarefa(id);
  const { conta } = useSessao();
  const queryClient = useQueryClient();
  const [editando, setEditando] = useState(false);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [confirmacao, setConfirmacao] = useState<string>();
  const concluir = useMutation({
    mutationFn: () => api.concluirTarefa(id!),
    onSuccess: async (atualizada) => {
      queryClient.setQueryData([...chaveTarefas, 'detalhe', id], atualizada);
      setConfirmacao(textos.tarefas.detalhe.concluida);
      await queryClient.invalidateQueries({ queryKey: chaveTarefas });
    },
  });
  const excluir = useMutation({
    mutationFn: () => api.excluirTarefa(id!),
    onSuccess: () => {
      router.replace('/tarefas');
      void queryClient.invalidateQueries({ queryKey: chaveTarefas });
    },
  });
  const tarefa = consulta.data;
  const ocupada = concluir.isPending || excluir.isPending;

  return (
    <Tela>
      <Titulo>{textos.tarefas.detalhe.titulo}</Titulo>
      {!id && <Aviso>{textos.tarefas.detalhe.idInvalido}</Aviso>}
      {id && consulta.isPending && <Texto suave>{textos.tarefas.carregando}</Texto>}
      {consulta.isError && (
        <>
          <Aviso>{mensagemDeErro(consulta.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void consulta.refetch()}
          />
        </>
      )}
      {tarefa && conta && (
        <>
          <Confirmacao>{confirmacao}</Confirmacao>
          {editando ? (
            <FormularioTarefa
              key={tarefa.id}
              hoje={conta.hoje}
              tarefa={tarefa}
              aoCancelar={() => setEditando(false)}
              aoConcluir={() => {
                setEditando(false);
                setConfirmacao(textos.tarefas.detalhe.salvo);
              }}
            />
          ) : (
            <>
              <Texto style={{ fontWeight: '700' }}>{tarefa.titulo}</Texto>
              <Texto suave>
                {textos.tarefas.item.dataPlanejada(formatarDataBr(tarefa.dataPlanejada))}
              </Texto>
              <Texto suave>{textos.tarefas.item.prazo(formatarDataBr(tarefa.prazo))}</Texto>
              <Texto suave>
                {textos.tarefas.item.prioridade(textos.tarefas.niveis[tarefa.prioridade])}
              </Texto>
              <Texto suave>
                {textos.tarefas.item.energia(textos.tarefas.niveis[tarefa.energia])}
              </Texto>
              {tarefa.duracaoMinutos !== null && (
                <Texto suave>{textos.tarefas.item.duracao(tarefa.duracaoMinutos)}</Texto>
              )}
              {tarefa.concluidaEm && (
                <Texto>
                  {textos.tarefas.concluidaEm(
                    formatarDataBr(dataLocal(new Date(tarefa.concluidaEm), conta.fuso)),
                  )}
                </Texto>
              )}
              <Aviso>
                {concluir.isError
                  ? mensagemDeErro(concluir.error)
                  : excluir.isError && mensagemDeErro(excluir.error)}
              </Aviso>
              {confirmandoExclusao ? (
                <>
                  <Texto>{textos.tarefas.detalhe.avisoExclusao}</Texto>
                  <Botao
                    titulo={textos.tarefas.detalhe.confirmarExclusao}
                    carregando={excluir.isPending}
                    onPress={() => excluir.mutate()}
                  />
                  <Botao
                    titulo={textos.tarefas.detalhe.cancelar}
                    variante="link"
                    onPress={() => {
                      if (!ocupada) setConfirmandoExclusao(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Botao
                    titulo={textos.tarefas.detalhe.editar}
                    variante="link"
                    onPress={() => {
                      if (!ocupada) {
                        setConfirmacao(undefined);
                        setEditando(true);
                      }
                    }}
                  />
                  {!tarefa.concluidaEm && (
                    <Botao
                      titulo={textos.tarefas.detalhe.concluir}
                      carregando={concluir.isPending}
                      onPress={() => concluir.mutate()}
                    />
                  )}
                  <Botao
                    titulo={textos.tarefas.detalhe.excluir}
                    variante="link"
                    onPress={() => {
                      if (!ocupada) setConfirmandoExclusao(true);
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
      <Botao
        titulo={textos.tarefas.detalhe.voltar}
        variante="link"
        onPress={() => {
          if (!ocupada) router.replace('/tarefas');
        }}
      />
    </Tela>
  );
}
