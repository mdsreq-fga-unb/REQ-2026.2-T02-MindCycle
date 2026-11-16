import { dataLocal, formatarDataBr } from '@mindcycle/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { api } from '@/api/endpoints';
import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { chaveTarefas, useTarefa } from '@/features/tarefas/consulta';
import { aplicarTarefa, removerTarefa } from '@/features/tarefas/cache';
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
  const [confirmandoConclusao, setConfirmandoConclusao] = useState(false);
  const [confirmacao, setConfirmacao] = useState<string>();
  async function tratarIndisponivel(erro: Error) {
    if (id && erro instanceof ErroApi && (erro.status === 404 || erro.status === 403)) {
      await removerTarefa(queryClient, id);
    }
  }
  const concluir = useMutation({
    mutationFn: () => api.concluirTarefa(id!),
    onSuccess: async (atualizada) => {
      await aplicarTarefa(queryClient, atualizada);
      setConfirmandoConclusao(false);
      setConfirmacao(textos.tarefas.detalhe.concluida);
      void queryClient.invalidateQueries({ queryKey: chaveTarefas });
    },
    onError: tratarIndisponivel,
  });
  const excluir = useMutation({
    mutationFn: () => api.excluirTarefa(id!),
    onSuccess: async () => {
      await removerTarefa(queryClient, id!);
      router.replace('/tarefas');
      void queryClient.invalidateQueries({ queryKey: chaveTarefas });
    },
    onError: tratarIndisponivel,
  });
  const reabrir = useMutation({
    mutationFn: () => api.reabrirTarefa(id!),
    onSuccess: async (atualizada) => {
      await aplicarTarefa(queryClient, atualizada);
      setConfirmacao(textos.tarefas.detalhe.reaberta);
      void queryClient.invalidateQueries({ queryKey: chaveTarefas });
    },
    onError: tratarIndisponivel,
  });
  const tarefa = consulta.data;
  const ocupada = concluir.isPending || excluir.isPending || reabrir.isPending;
  const erroDaAcao = excluir.error ?? concluir.error ?? reabrir.error;
  const indisponivel = [consulta.error, erroDaAcao].some(
    (erro) => erro instanceof ErroApi && (erro.status === 404 || erro.status === 403),
  );

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
      <Aviso>{erroDaAcao && mensagemDeErro(erroDaAcao)}</Aviso>
      {tarefa && conta && !indisponivel && (
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
              {confirmandoConclusao && !tarefa.concluidaEm ? (
                <>
                  <Texto>{textos.tarefas.detalhe.avisoConclusao}</Texto>
                  <Botao
                    titulo={textos.tarefas.detalhe.confirmarConclusao}
                    carregando={concluir.isPending}
                    onPress={() => {
                      if (!ocupada) concluir.mutate();
                    }}
                  />
                  <Botao
                    titulo={textos.tarefas.detalhe.cancelar}
                    variante="link"
                    desabilitado={ocupada}
                    onPress={() => {
                      concluir.reset();
                      setConfirmandoConclusao(false);
                    }}
                  />
                </>
              ) : confirmandoExclusao ? (
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
                    desabilitado={ocupada}
                    onPress={() => {
                      excluir.reset();
                      setConfirmandoExclusao(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Botao
                    titulo={textos.tarefas.detalhe.editar}
                    variante="link"
                    desabilitado={ocupada}
                    onPress={() => {
                      if (!ocupada) {
                        setConfirmacao(undefined);
                        concluir.reset();
                        excluir.reset();
                        reabrir.reset();
                        setEditando(true);
                      }
                    }}
                  />
                  {!tarefa.concluidaEm && (
                    <Botao
                      titulo={textos.tarefas.detalhe.concluir}
                      desabilitado={ocupada}
                      onPress={() => {
                        if (!ocupada) {
                          setConfirmacao(undefined);
                          excluir.reset();
                          concluir.reset();
                          reabrir.reset();
                          setConfirmandoConclusao(true);
                        }
                      }}
                    />
                  )}
                  {tarefa.concluidaEm && (
                    <Botao
                      titulo={textos.tarefas.detalhe.reabrir}
                      carregando={reabrir.isPending}
                      desabilitado={ocupada}
                      onPress={() => {
                        if (!ocupada) {
                          setConfirmacao(undefined);
                          concluir.reset();
                          excluir.reset();
                          reabrir.mutate();
                        }
                      }}
                    />
                  )}
                  <Botao
                    titulo={textos.tarefas.detalhe.excluir}
                    variante="link"
                    desabilitado={ocupada}
                    onPress={() => {
                      if (!ocupada) {
                        concluir.reset();
                        excluir.reset();
                        reabrir.reset();
                        setConfirmandoExclusao(true);
                      }
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
      {!editando && (
        <Botao
          titulo={textos.tarefas.detalhe.voltar}
          variante="link"
          desabilitado={ocupada}
          onPress={() => {
            if (!ocupada) router.replace('/tarefas');
          }}
        />
      )}
    </Tela>
  );
}
