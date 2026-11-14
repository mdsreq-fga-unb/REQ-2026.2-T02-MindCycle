import { router } from 'expo-router';
import { useState } from 'react';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Tela, Texto, Titulo } from '@/ui/componentes';

export default function Entrar() {
  const { entrar } = useSessao();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string>();
  const [enviando, setEnviando] = useState(false);

  async function enviar() {
    setEnviando(true);
    setErro(undefined);
    try {
      await entrar({ email, senha });
    } catch (e) {
      setErro(mensagemDeErro(e));
      setEnviando(false);
    }
  }

  return (
    <Tela>
      <Texto suave>{textos.marca.slogan}</Texto>
      <Titulo>{textos.entrar.titulo}</Titulo>
      <Campo
        rotulo={textos.entrar.email}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        inputMode="email"
      />
      <Campo
        rotulo={textos.entrar.senha}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoComplete="current-password"
        onSubmitEditing={enviar}
      />
      <Aviso>{erro}</Aviso>
      <Botao titulo={textos.entrar.botao} onPress={enviar} carregando={enviando} />
      <Botao
        titulo={textos.entrar.irParaCadastro}
        variante="link"
        onPress={() => router.replace('/cadastro')}
      />
    </Tela>
  );
}
