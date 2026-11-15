import { CodigoErro } from '@mindcycle/shared';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { api } from '@/api/endpoints';
import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Tela, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

// HU36, RNF02. Abre por cima das abas, a partir da aba Conta.
export default function ExcluirConta() {
  const { encerrarLocalmente } = useSessao();
  const [senha, setSenha] = useState('');
  const exclusao = useMutation({
    mutationFn: () => api.excluirConta({ senha }),
    // A conta já não existe: encerra só aqui, sem chamar /auth/saida. Sem a
    // sessão, a navegação leva sozinha à tela de entrada.
    onSuccess: encerrarLocalmente,
  });

  const erro = exclusao.isError
    ? exclusao.error instanceof ErroApi &&
      exclusao.error.codigo === CodigoErro.CredenciaisInvalidas
      ? textos.excluirConta.senhaIncorreta
      : mensagemDeErro(exclusao.error)
    : undefined;

  return (
    <Tela>
      <Titulo>{textos.excluirConta.titulo}</Titulo>
      <Texto>{textos.excluirConta.intro}</Texto>
      <View style={{ gap: espaco.xs }}>
        {textos.excluirConta.apagado.map((item) => (
          <Texto key={item}>{`• ${item}`}</Texto>
        ))}
      </View>
      <Texto suave>{textos.excluirConta.semVolta}</Texto>
      <Campo
        rotulo={textos.excluirConta.senha}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoComplete="current-password"
        onSubmitEditing={() => senha && exclusao.mutate()}
      />
      <Aviso>{erro}</Aviso>
      <Botao
        titulo={textos.excluirConta.confirmar}
        carregando={exclusao.isPending}
        onPress={() => senha && exclusao.mutate()}
      />
      <Botao
        titulo={textos.excluirConta.voltar}
        variante="link"
        onPress={() => router.back()}
      />
    </Tela>
  );
}
