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
  type Nivel,
} from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, SeletorNivel } from '@/ui/componentes';

import { chaveTarefas } from './consulta';

/** HU17. O prazo começa em hoje; prioridade e energia a usuária escolhe. */
export function FormularioTarefa({ hoje }: { hoje: string }) {
  const queryClient = useQueryClient();
  const [titulo, setTitulo] = useState('');
  const [prazo, setPrazo] = useState(formatarDataBr(hoje));
  const [prioridade, setPrioridade] = useState<Nivel>();
  const [energia, setEnergia] = useState<Nivel>();
  const [duracao, setDuracao] = useState('');
  const [erroLocal, setErroLocal] = useState<string>();
  const cadastro = useMutation({
    mutationFn: api.cadastrarTarefa,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: chaveTarefas });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/tarefas');
      }
    },
  });

  function salvar() {
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
    if (prazoLido < hoje) {
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
  const editando = <T,>(definir: (valor: T) => void) => (valor: T) => {
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
        autoCapitalize="sentences"
      />
      <Campo
        rotulo={textos.tarefas.nova.campoPrazo}
        value={prazo}
        onChangeText={editando((novo: string) => setPrazo(mascararDataBr(novo)))}
        keyboardType="number-pad"
        maxLength={10}
        placeholder={textos.tarefas.nova.formatoPrazo}
      />
      <SeletorNivel
        rotulo={textos.tarefas.nova.campoPrioridade}
        rotulos={textos.tarefas.niveis}
        valor={prioridade}
        aoMudar={editando(setPrioridade)}
      />
      <SeletorNivel
        rotulo={textos.tarefas.nova.campoEnergia}
        rotulos={textos.tarefas.niveis}
        valor={energia}
        aoMudar={editando(setEnergia)}
      />
      <Campo
        rotulo={textos.tarefas.nova.campoDuracao}
        value={duracao}
        onChangeText={editando(setDuracao)}
        keyboardType="number-pad"
        maxLength={3}
      />
      <Aviso>{erroLocal ?? (cadastro.isError && mensagemDeErro(cadastro.error))}</Aviso>
      <Botao
        titulo={textos.tarefas.nova.botao}
        carregando={cadastro.isPending}
        onPress={salvar}
      />
      <Botao
        titulo={textos.tarefas.nova.cancelar}
        variante="link"
        onPress={() => router.back()}
      />
    </>
  );
}
