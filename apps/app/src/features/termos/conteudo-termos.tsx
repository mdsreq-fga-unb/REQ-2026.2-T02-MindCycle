import type { Termos } from '@mindcycle/shared';
import type { UseQueryResult } from '@tanstack/react-query';
import { View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

export function ConteudoTermos({ consulta }: { consulta: UseQueryResult<Termos> }) {
  return (
    <>
      {consulta.isPending && <Texto suave>{textos.termos.carregando}</Texto>}
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
      {consulta.data && <Texto suave>{textos.termos.versao(consulta.data.versao)}</Texto>}
      {consulta.data?.secoes.map((secao) => (
        <View key={secao.titulo} style={{ gap: espaco.xs }}>
          <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
            {secao.titulo}
          </Texto>
          <Texto>{secao.texto}</Texto>
        </View>
      ))}
    </>
  );
}
