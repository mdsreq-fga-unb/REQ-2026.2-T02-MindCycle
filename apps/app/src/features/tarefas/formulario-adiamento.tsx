import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  CodigoErro,
  formatarDataBr,
  lerDataBr,
  mascararDataBr,
  somarDias,
  type AdiamentoTarefaDto,
  type Tarefa,
} from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Campo } from '@/ui/componentes';

import { chaveTarefas } from './consulta';

export function FormularioAdiamento({
  tarefa,
  hoje,
  aoCancelar,
  aoConcluir,
}: {
  tarefa: Tarefa;
  hoje: string;
  aoCancelar: () => void;
  aoConcluir: (tarefa: Tarefa) => void;
}) {
  const queryClient = useQueryClient();
  const [data, setData] = useState(() =>
    formatarDataBr(somarDias(tarefa.dataPlanejada > hoje ? tarefa.dataPlanejada : hoje, 1)),
  );
  const [erroLocal, setErroLocal] = useState<string>();
  const adiamento = useMutation({
    mutationFn: (dados: AdiamentoTarefaDto) => api.adiarTarefa(tarefa.id, dados),
    onSuccess: async (atualizada) => {
      await queryClient.invalidateQueries({ queryKey: chaveTarefas });
      aoConcluir(atualizada);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: chaveTarefas });
    },
  });

  function salvar() {
    const novaData = lerDataBr(data);
    if (!novaData) {
      setErroLocal(textos.tarefas.adiamento.dataInvalida);
      return;
    }
    if (novaData < hoje || novaData <= tarefa.dataPlanejada) {
      setErroLocal(textos.erros[CodigoErro.DataAdiamentoInvalida]);
      return;
    }
    setErroLocal(undefined);
    adiamento.mutate({ dataPlanejada: novaData });
  }

  return (
    <>
      <Campo
        rotulo={textos.tarefas.adiamento.campoData}
        placeholder={textos.tarefas.adiamento.formatoData}
        value={data}
        keyboardType="number-pad"
        maxLength={10}
        editable={!adiamento.isPending}
        onChangeText={(valor) => {
          setData(mascararDataBr(valor));
          setErroLocal(undefined);
          adiamento.reset();
        }}
      />
      <Aviso>{erroLocal ?? (adiamento.isError && mensagemDeErro(adiamento.error))}</Aviso>
      <Botao
        titulo={textos.tarefas.adiamento.salvar}
        carregando={adiamento.isPending}
        onPress={salvar}
      />
      <Botao
        titulo={textos.tarefas.adiamento.cancelar}
        variante="link"
        onPress={() => {
          if (!adiamento.isPending) aoCancelar();
        }}
      />
    </>
  );
}
