import {
  CodigoErro,
  DURACAO_MEDIA_MAXIMA,
  DURACAO_MEDIA_MINIMA,
  formatarDataBr,
  lerDataBr,
  mascararDataBr,
  type Ciclo,
  type PerfilCicloDto,
} from '@mindcycle/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Contador, Interruptor, Texto, Titulo } from '@/ui/componentes';

import { chaveCiclo } from './consulta';

// Ponto de partida do seletor, que a usuária ajusta antes de salvar. Não é
// presumido em cálculo nenhum: só vale o que ela salvar (HU05).
const DURACAO_INICIAL = 28;

/**
 * HU06 e HU07 num formulário só. Salva o início e as características juntos;
 * com os dois salvos, a aba Ciclo passa a mostrar "Seu ciclo".
 */
export function FormularioCiclo({ ciclo, hoje }: { ciclo: Ciclo; hoje: string }) {
  const queryClient = useQueryClient();
  const t = textos.ciclo;
  // Se parte já foi salva antes (só o início, por exemplo), o formulário volta preenchido.
  const [data, setData] = useState(formatarDataBr(ciclo.inicios[0]?.data ?? hoje));
  const [irregular, setIrregular] = useState(ciclo.perfil?.irregular ?? false);
  const [duracao, setDuracao] = useState(ciclo.perfil?.duracaoMedia ?? DURACAO_INICIAL);
  const [erroLocal, setErroLocal] = useState<string>();

  const salvamento = useMutation({
    mutationFn: async ({ inicio, perfil }: { inicio: string; perfil: PerfilCicloDto }) => {
      // Registrar de novo uma data existente devolve o mesmo registro (HU06).
      await api.registrarInicio(inicio);
      await api.informarPerfil(perfil);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: chaveCiclo }),
  });

  function salvar() {
    const inicio = lerDataBr(data);
    if (!inicio) {
      setErroLocal(t.dataInvalida);
      return;
    }
    if (inicio > hoje) {
      // A API também recusa; conferir aqui poupa a ida e volta.
      setErroLocal(textos.erros[CodigoErro.DataNoFuturo]);
      return;
    }
    setErroLocal(undefined);
    salvamento.mutate({
      inicio,
      perfil: irregular ? { irregular: true } : { irregular: false, duracaoMedia: duracao },
    });
  }

  function editar<T>(definir: (valor: T) => void) {
    return (valor: T) => {
      definir(valor);
      setErroLocal(undefined);
      salvamento.reset();
    };
  }

  return (
    <>
      <Titulo>{t.formulario.titulo}</Titulo>
      <Texto suave>{t.formulario.subtitulo}</Texto>
      <Campo
        rotulo={t.formulario.inicio}
        value={data}
        onChangeText={editar((novo: string) => setData(mascararDataBr(novo)))}
        keyboardType="number-pad"
        maxLength={10}
        placeholder={t.formatoData}
      />
      <Interruptor rotulo={t.duracao.irregular} valor={irregular} aoMudar={editar(setIrregular)} />
      {!irregular && (
        <Contador
          rotulo={t.duracao.rotulo}
          valor={duracao}
          texto={t.duracao.dias(duracao)}
          minimo={DURACAO_MEDIA_MINIMA}
          maximo={DURACAO_MEDIA_MAXIMA}
          aoMudar={editar(setDuracao)}
          rotuloDiminuir={t.duracao.diminuir}
          rotuloAumentar={t.duracao.aumentar}
        />
      )}
      <Aviso>{erroLocal ?? (salvamento.isError && mensagemDeErro(salvamento.error))}</Aviso>
      <Botao titulo={t.formulario.botao} carregando={salvamento.isPending} onPress={salvar} />
    </>
  );
}
