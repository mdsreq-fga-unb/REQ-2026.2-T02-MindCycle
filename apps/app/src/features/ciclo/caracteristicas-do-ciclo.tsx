import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { View } from 'react-native';
import {
  type Ciclo,
  DURACAO_MEDIA_MAXIMA,
  DURACAO_MEDIA_MINIMA,
  type PerfilCiclo,
  type PerfilCicloDto,
} from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Confirmacao, Interruptor, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { chaveCiclo } from './consulta';

/** HU07: a duração média ou a indicação de ciclo irregular. */
export function CaracteristicasDoCiclo({ perfil }: { perfil: PerfilCiclo | null }) {
  const queryClient = useQueryClient();
  const [irregular, setIrregular] = useState(perfil?.irregular ?? false);
  const [duracao, setDuracao] = useState(perfil?.duracaoMedia?.toString() ?? '');
  const [erroLocal, setErroLocal] = useState<string>();
  const salvamento = useMutation({
    mutationFn: api.informarPerfil,
    onSuccess: (salvo) =>
      queryClient.setQueryData<Ciclo>(chaveCiclo, (atual) => atual && { ...atual, perfil: salvo }),
  });

  function editar<T>(definir: (valor: T) => void) {
    return (valor: T) => {
      definir(valor);
      setErroLocal(undefined);
      salvamento.reset();
    };
  }

  function salvar() {
    let dados: PerfilCicloDto;
    if (irregular) {
      dados = { irregular: true };
    } else {
      const duracaoMedia = /^\d+$/.test(duracao) ? Number(duracao) : NaN;
      if (!(duracaoMedia >= DURACAO_MEDIA_MINIMA && duracaoMedia <= DURACAO_MEDIA_MAXIMA)) {
        setErroLocal(
          textos.ciclo.caracteristicas.duracaoInvalida(DURACAO_MEDIA_MINIMA, DURACAO_MEDIA_MAXIMA),
        );
        return;
      }
      dados = { irregular: false, duracaoMedia };
    }
    setErroLocal(undefined);
    salvamento.mutate(dados);
  }

  return (
    <View style={{ gap: espaco.md }}>
      <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
        {textos.ciclo.caracteristicas.titulo}
      </Texto>
      <Interruptor
        rotulo={textos.ciclo.caracteristicas.irregular}
        valor={irregular}
        aoMudar={editar(setIrregular)}
      />
      {!irregular && (
        <Campo
          rotulo={textos.ciclo.caracteristicas.duracao}
          value={duracao}
          onChangeText={editar((novo: string) => setDuracao(novo.replace(/\D/g, '')))}
          keyboardType="number-pad"
          maxLength={2}
        />
      )}
      <Aviso>{erroLocal ?? (salvamento.isError && mensagemDeErro(salvamento.error))}</Aviso>
      <Confirmacao>{salvamento.isSuccess && textos.ciclo.caracteristicas.salvo}</Confirmacao>
      <Botao
        titulo={textos.ciclo.caracteristicas.botao}
        carregando={salvamento.isPending}
        onPress={salvar}
      />
    </View>
  );
}
