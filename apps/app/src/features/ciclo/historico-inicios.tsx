import { useMutation, useQueryClient } from '@tanstack/react-query';
import { View } from 'react-native';
import { formatarDataBr, type InicioMenstruacao } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { chaveCiclo } from './consulta';

/** HU06: o histórico, com a opção de corrigir um registro errado removendo-o. */
export function HistoricoInicios({ inicios }: { inicios: InicioMenstruacao[] }) {
  const queryClient = useQueryClient();
  const remocao = useMutation({
    mutationFn: api.removerInicio,
    // Também depois de um erro: a lista volta a refletir o que a API tem.
    onSettled: () => queryClient.invalidateQueries({ queryKey: chaveCiclo }),
  });

  return (
    <View style={{ gap: espaco.sm }}>
      <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
        {textos.ciclo.historico.titulo}
      </Texto>
      {inicios.length === 0 && <Texto suave>{textos.ciclo.historico.vazio}</Texto>}
      {inicios.map((inicio) => {
        const data = formatarDataBr(inicio.data);
        return (
          <View
            key={inicio.id}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Texto>{data}</Texto>
            <Botao
              titulo={textos.ciclo.historico.remover}
              rotuloAcessivel={textos.ciclo.historico.rotuloRemover(data)}
              variante="link"
              carregando={remocao.isPending && remocao.variables === inicio.id}
              onPress={() => remocao.mutate(inicio.id)}
            />
          </View>
        );
      })}
      <Aviso>{remocao.isError && mensagemDeErro(remocao.error)}</Aviso>
    </View>
  );
}
