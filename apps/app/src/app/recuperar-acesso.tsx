import { TAMANHO_CODIGO_RECUPERACAO } from '@mindcycle/shared';
import { router } from 'expo-router';
import { useState } from 'react';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Tela, Texto, Titulo } from '@/ui/componentes';

// HU26: duas etapas, e-mail e depois o código recebido com a nova senha.
export default function RecuperarAcesso() {
  const { recuperar } = useSessao();
  const [etapa, setEtapa] = useState<'email' | 'codigo'>('email');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState<string>();
  const [aviso, setAviso] = useState<string>();
  const [enviando, setEnviando] = useState(false);

  async function pedirCodigo(reenvio: boolean) {
    setEnviando(true);
    setErro(undefined);
    setAviso(undefined);
    try {
      await api.pedirRecuperacao({ email });
      setEtapa('codigo');
      if (reenvio) {
        setAviso(textos.recuperar.reenviado);
      }
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
    setEnviando(false);
  }

  async function redefinir() {
    setEnviando(true);
    setErro(undefined);
    try {
      await recuperar({ email, codigo, novaSenha });
    } catch (e) {
      setErro(mensagemDeErro(e));
      setEnviando(false);
    }
  }

  function voltar() {
    setErro(undefined);
    setAviso(undefined);
    if (etapa === 'codigo') {
      setEtapa('email');
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/entrar');
    }
  }

  if (etapa === 'email') {
    return (
      <Tela>
        <Titulo>{textos.recuperar.titulo}</Titulo>
        <Texto suave>{textos.recuperar.subtitulo}</Texto>
        <Campo
          rotulo={textos.recuperar.email}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          inputMode="email"
          onSubmitEditing={() => pedirCodigo(false)}
        />
        <Aviso>{erro}</Aviso>
        <Botao
          titulo={textos.recuperar.enviarCodigo}
          onPress={() => pedirCodigo(false)}
          carregando={enviando}
        />
        <Botao titulo={textos.recuperar.voltar} variante="link" onPress={voltar} />
      </Tela>
    );
  }

  return (
    <Tela>
      <Titulo>{textos.recuperar.tituloCodigo}</Titulo>
      <Texto suave>{textos.recuperar.codigoEnviado(email)}</Texto>
      <Campo
        rotulo={textos.recuperar.codigo}
        value={codigo}
        onChangeText={(texto) => setCodigo(texto.replace(/\D/g, ''))}
        keyboardType="number-pad"
        inputMode="numeric"
        maxLength={TAMANHO_CODIGO_RECUPERACAO}
        autoComplete="one-time-code"
      />
      <Campo
        rotulo={textos.recuperar.novaSenha}
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        autoComplete="new-password"
        onSubmitEditing={redefinir}
      />
      <Aviso>{erro}</Aviso>
      {aviso && <Texto suave>{aviso}</Texto>}
      <Botao
        titulo={textos.recuperar.redefinir}
        onPress={redefinir}
        carregando={enviando}
      />
      <Botao
        titulo={textos.recuperar.reenviar}
        variante="link"
        onPress={() => pedirCodigo(true)}
      />
      <Botao titulo={textos.recuperar.voltar} variante="link" onPress={voltar} />
    </Tela>
  );
}
