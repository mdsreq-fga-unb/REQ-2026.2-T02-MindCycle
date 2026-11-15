import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { api } from '@/api/endpoints';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { mensagemDeErroDeSenha } from './erro-de-senha';

// HU11: na aba Conta, proteger, trocar ou remover o PIN.
export function SecaoPin() {
  const { conta } = useSessao();
  const queryClient = useQueryClient();
  const [removendo, setRemovendo] = useState(false);
  const [senha, setSenha] = useState('');

  const remocao = useMutation({
    mutationFn: api.removerPin,
    onSuccess: async () => {
      setRemovendo(false);
      setSenha('');
      await queryClient.invalidateQueries({ queryKey: ['conta'] });
    },
  });

  if (!conta) {
    return null;
  }

  const abrirDefinicao = () => router.push('/pin-definir');

  if (!conta.tipoPin) {
    return (
      <View style={{ gap: espaco.sm }}>
        <Texto suave>{textos.pin.conta.semPin}</Texto>
        <Botao titulo={textos.pin.conta.proteger} onPress={abrirDefinicao} />
      </View>
    );
  }

  return (
    <View style={{ gap: espaco.sm }}>
      <Texto suave>{textos.pin.conta.tipoAtual[conta.tipoPin]}</Texto>
      {removendo ? (
        <>
          <Texto>{textos.pin.conta.removerSubtitulo}</Texto>
          <Campo
            rotulo={textos.pin.definir.senha}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoComplete="current-password"
            onSubmitEditing={() => senha && remocao.mutate(senha)}
          />
          <Aviso>{remocao.isError && mensagemDeErroDeSenha(remocao.error)}</Aviso>
          <Botao
            titulo={textos.pin.conta.confirmarRemocao}
            carregando={remocao.isPending}
            onPress={() => senha && remocao.mutate(senha)}
          />
          <Botao
            titulo={textos.pin.conta.cancelar}
            variante="link"
            onPress={() => {
              setRemovendo(false);
              setSenha('');
              remocao.reset();
            }}
          />
        </>
      ) : (
        <>
          <Botao titulo={textos.pin.conta.trocar} onPress={abrirDefinicao} />
          <Botao
            titulo={textos.pin.conta.remover}
            variante="link"
            onPress={() => setRemovendo(true)}
          />
        </>
      )}
    </View>
  );
}
