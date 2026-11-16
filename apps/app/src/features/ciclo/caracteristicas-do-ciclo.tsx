import {
  DURACAO_MEDIA_MAXIMA,
  DURACAO_MEDIA_MINIMA,
  DURACAO_MEDIA_REFERENCIA,
  type PerfilCiclo,
} from '@mindcycle/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { View } from 'react-native';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Contador, Interruptor, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { chaveCiclo } from './consulta';

/** HU07: a duração média ou a indicação de ciclo irregular, em "Editar meu ciclo". */
export function CaracteristicasDoCiclo({ perfil }: { perfil: PerfilCiclo | null }) {
  const queryClient = useQueryClient();
  const t = textos.ciclo;
  const [irregular, setIrregular] = useState(perfil?.irregular ?? false);
  const [duracao, setDuracao] = useState<number | null>(perfil?.duracaoMedia ?? null);
  const [erroLocal, setErroLocal] = useState<string>();
  const salvamento = useMutation({
    mutationFn: api.informarPerfil,
    // Refaz a consulta em vez de só trocar o perfil no cache: a situação (HU05)
    // é calculada pela API e não pode ficar com a fase da duração antiga.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chaveCiclo }),
  });

  function editar<T>(definir: (valor: T) => void) {
    return (valor: T) => {
      definir(valor);
      setErroLocal(undefined);
      salvamento.reset();
    };
  }

  // Sem duração escolhida, só "irregular" pode ser salvo (HU07).
  function salvar() {
    if (irregular) {
      salvamento.mutate({ irregular: true });
    } else if (duracao === null) {
      setErroLocal(t.formulario.faltaDuracao);
    } else {
      salvamento.mutate({ irregular: false, duracaoMedia: duracao });
    }
  }

  return (
    <View style={{ gap: espaco.md }}>
      <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
        {t.caracteristicas.titulo}
      </Texto>
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
      <Confirmacao>{salvamento.isSuccess && t.caracteristicas.salvo}</Confirmacao>
      <Botao
        titulo={t.caracteristicas.botao}
        carregando={salvamento.isPending}
        onPress={salvar}
      />
    </View>
  );
}
