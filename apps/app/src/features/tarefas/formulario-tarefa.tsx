import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  CodigoErro,
  DURACAO_MAXIMA_MINUTOS,
  DURACAO_MINIMA_MINUTOS,
  formatarDataBr,
  lerDataBr,
  mascararDataBr,
  type CadastroTarefaDto,
  type Nivel,
  type Tarefa,
} from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, SeletorNivel } from '@/ui/componentes';

import { chaveTarefas } from './consulta';
import { aplicarTarefa } from './cache';

/** HU17. O prazo começa em hoje; prioridade e energia a usuária escolhe. */
export function FormularioTarefa({
  hoje,
  tarefa,
  aoConcluir,
  aoCancelar,
}: {
  hoje: string;
  tarefa?: Tarefa;
  aoConcluir?: (tarefa: Tarefa) => void;
  aoCancelar?: () => void;
}) {
  const queryClient = useQueryClient();
  const [titulo, setTitulo] = useState(tarefa?.titulo ?? '');
  const [prazo, setPrazo] = useState(formatarDataBr(tarefa?.prazo ?? hoje));
  const [prioridade, setPrioridade] = useState<Nivel | undefined>(tarefa?.prioridade);
  const [energia, setEnergia] = useState<Nivel | undefined>(tarefa?.energia);
  const [duracao, setDuracao] = useState(tarefa?.duracaoMinutos?.toString() ?? '');
  const [erroLocal, setErroLocal] = useState<string>();
  const cadastro = useMutation({
    mutationFn: (dados: CadastroTarefaDto) =>
      tarefa
        ? api.editarTarefa(tarefa.id, { ...dados, duracaoMinutos: dados.duracaoMinutos ?? null })
        : api.cadastrarTarefa(dados),
    onSuccess: async (salva) => {
      await aplicarTarefa(queryClient, salva);
      await queryClient.invalidateQueries({ queryKey: chaveTarefas });
      if (aoConcluir) {
        aoConcluir(salva);
        return;
      }
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/tarefas');
      }
    },
  });

  function salvar() {
    if (cadastro.isPending) return;
    const dados = validar();
    if (typeof dados === 'string') {
      setErroLocal(dados);
      return;
    }
    setErroLocal(undefined);
    cadastro.mutate(dados);
  }

  function validar() {
    const prazoLido = lerDataBr(prazo);
    const minutos = duracao.trim();
    if (titulo.trim() === '') {
      return textos.tarefas.nova.tituloVazio;
    }
    if (!prazoLido) {
      return textos.tarefas.nova.prazoInvalido;
    }
    // A API também recusa; conferir aqui poupa a ida e volta.
    if (!tarefa && prazoLido < hoje) {
      return textos.erros[CodigoErro.PrazoNoPassado];
    }
    if (prioridade === undefined) {
      return textos.tarefas.nova.prioridadeVazia;
    }
    if (energia === undefined) {
      return textos.tarefas.nova.energiaVazia;
    }
    const duracaoMinutos = minutos === '' ? undefined : Number(minutos);
    if (
      duracaoMinutos !== undefined &&
      !(
        /^\d+$/.test(minutos) &&
        duracaoMinutos >= DURACAO_MINIMA_MINUTOS &&
        duracaoMinutos <= DURACAO_MAXIMA_MINUTOS
      )
    ) {
      return textos.tarefas.nova.duracaoInvalida(DURACAO_MINIMA_MINUTOS, DURACAO_MAXIMA_MINUTOS);
    }
    return { titulo: titulo.trim(), prazo: prazoLido, prioridade, energia, duracaoMinutos };
  }

  // Corrigir qualquer campo apaga o aviso anterior.
  const editando =
    <T,>(definir: (valor: T) => void) =>
    (valor: T) => {
      if (cadastro.isPending) return;
      definir(valor);
      setErroLocal(undefined);
      cadastro.reset();
    };

  return (
    <>
      <Campo
        rotulo={textos.tarefas.nova.campoTitulo}
        value={titulo}
        onChangeText={editando(setTitulo)}
        maxLength={120}
        editable={!cadastro.isPending}
        autoCapitalize="sentences"
      />
      <Campo
        rotulo={textos.tarefas.nova.campoPrazo}
        value={prazo}
        onChangeText={editando((novo: string) => setPrazo(mascararDataBr(novo)))}
        keyboardType="number-pad"
        maxLength={10}
        editable={!cadastro.isPending}
        placeholder={textos.tarefas.nova.formatoPrazo}
      />
      <SeletorNivel
        rotulo={textos.tarefas.nova.campoPrioridade}
        rotulos={textos.tarefas.niveis}
        valor={prioridade}
        aoMudar={editando(setPrioridade)}
        desabilitado={cadastro.isPending}
      />
      <SeletorNivel
        rotulo={textos.tarefas.nova.campoEnergia}
        rotulos={textos.tarefas.niveis}
        valor={energia}
        aoMudar={editando(setEnergia)}
        desabilitado={cadastro.isPending}
      />
      <Campo
        rotulo={textos.tarefas.nova.campoDuracao}
        value={duracao}
        onChangeText={editando(setDuracao)}
        keyboardType="number-pad"
        maxLength={3}
        editable={!cadastro.isPending}
      />
      <Aviso>{erroLocal ?? (cadastro.isError && mensagemDeErro(cadastro.error))}</Aviso>
      <Botao
        titulo={tarefa ? textos.tarefas.detalhe.salvar : textos.tarefas.nova.botao}
        carregando={cadastro.isPending}
        onPress={salvar}
      />
      <Botao
        titulo={textos.tarefas.nova.cancelar}
        variante="link"
        desabilitado={cadastro.isPending}
        onPress={() => {
          if (!cadastro.isPending) {
            if (aoCancelar) aoCancelar();
            else router.back();
          }
        }}
      />
    </>
  );
}
