import {
  CodigoErro,
  DURACAO_MEDIA_MAXIMA,
  DURACAO_MEDIA_MINIMA,
  DURACAO_MEDIA_REFERENCIA,
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
import { FasesDoCiclo } from './fases-do-ciclo';

/**
 * HU06 e HU07 num formulário só. Nada vem preenchido por conta do app: a data
 * começa vazia e a duração sem valor, para só o que ela informar ser salvo.
 * Com os dois salvos, a aba Ciclo passa a mostrar "Seu ciclo".
 */
export function FormularioCiclo({ ciclo, hoje }: { ciclo: Ciclo; hoje: string }) {
  const queryClient = useQueryClient();
  const t = textos.ciclo;
  // Se parte já foi salva antes (só a duração, por exemplo), ela volta preenchida.
  const [data, setData] = useState(ciclo.inicios[0] ? formatarDataBr(ciclo.inicios[0].data) : '');
  const [irregular, setIrregular] = useState(ciclo.perfil?.irregular ?? false);
  const [duracao, setDuracao] = useState<number | null>(ciclo.perfil?.duracaoMedia ?? null);
  const [erroLocal, setErroLocal] = useState<string>();

  const salvamento = useMutation({
    // A duração vai primeiro: gravá-la de novo só sobrescreve. Se o início falhar
    // depois, nada fica pela metade no histórico, e salvar de novo é seguro.
    mutationFn: async ({ inicio, perfil }: { inicio: string; perfil: PerfilCicloDto }) => {
      await api.informarPerfil(perfil);
      // Registrar de novo uma data existente devolve o mesmo registro (HU06).
      await api.registrarInicio(inicio);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: chaveCiclo }),
  });

  function salvar() {
    const inicio = lerDataBr(data);
    if (!data) {
      setErroLocal(t.formulario.faltaData);
      return;
    }
    if (!inicio) {
      setErroLocal(t.dataInvalida);
      return;
    }
    if (inicio > hoje) {
      // A API também recusa; conferir aqui poupa a ida e volta.
      setErroLocal(textos.erros[CodigoErro.DataNoFuturo]);
      return;
    }
    if (!irregular && duracao === null) {
      setErroLocal(t.formulario.faltaDuracao);
      return;
    }
    setErroLocal(undefined);
    salvamento.mutate({
      inicio,
      perfil:
        irregular || duracao === null
          ? { irregular: true }
          : { irregular: false, duracaoMedia: duracao },
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
          inicial={DURACAO_MEDIA_REFERENCIA}
          minimo={DURACAO_MEDIA_MINIMA}
          maximo={DURACAO_MEDIA_MAXIMA}
          aoMudar={editar(setDuracao)}
          formatar={t.duracao.dias}
          textoVazio={t.duracao.vazio}
          rotuloDiminuir={t.duracao.diminuir}
          rotuloAumentar={t.duracao.aumentar}
        />
      )}
      <Aviso>{erroLocal ?? (salvamento.isError && mensagemDeErro(salvamento.error))}</Aviso>
      <Botao titulo={t.formulario.botao} carregando={salvamento.isPending} onPress={salvar} />
      {/* As fases não dependem dos dados dela: quem ainda não sabe o próprio ciclo também vê. */}
      <FasesDoCiclo comIntroducao />
    </>
  );
}
