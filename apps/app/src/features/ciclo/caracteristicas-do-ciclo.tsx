import {
  DURACAO_MEDIA_MAXIMA,
  DURACAO_MEDIA_MINIMA,
  type Ciclo,
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
  const [duracao, setDuracao] = useState(perfil?.duracaoMedia ?? 28);
  const salvamento = useMutation({
    mutationFn: api.informarPerfil,
    onSuccess: (salvo) =>
      queryClient.setQueryData<Ciclo>(chaveCiclo, (atual) => atual && { ...atual, perfil: salvo }),
  });

  function editar<T>(definir: (valor: T) => void) {
    return (valor: T) => {
      definir(valor);
      salvamento.reset();
    };
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
          texto={t.duracao.dias(duracao)}
          minimo={DURACAO_MEDIA_MINIMA}
          maximo={DURACAO_MEDIA_MAXIMA}
          aoMudar={editar(setDuracao)}
          rotuloDiminuir={t.duracao.diminuir}
          rotuloAumentar={t.duracao.aumentar}
        />
      )}
      <Aviso>{salvamento.isError && mensagemDeErro(salvamento.error)}</Aviso>
      <Confirmacao>{salvamento.isSuccess && t.caracteristicas.salvo}</Confirmacao>
      <Botao
        titulo={t.caracteristicas.botao}
        carregando={salvamento.isPending}
        onPress={() =>
          salvamento.mutate(irregular ? { irregular: true } : { irregular: false, duracaoMedia: duracao })
        }
      />
    </View>
  );
}
