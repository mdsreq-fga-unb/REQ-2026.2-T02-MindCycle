import { router } from 'expo-router';
import { useState } from 'react';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Tela, Texto, Titulo } from '@/ui/componentes';

// HU25
export default function Cadastro() {
  const { cadastrar } = useSessao();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string>();
  const [enviando, setEnviando] = useState(false);

  async function enviar() {
    setEnviando(true);
    setErro(undefined);
    try {
      await cadastrar({ email, senha });
    } catch (e) {
      setErro(mensagemDeErro(e));
      setEnviando(false);
    }
  }

  return (
    <Tela>
      <Titulo>{textos.cadastro.titulo}</Titulo>
      <Texto suave>{textos.cadastro.subtitulo}</Texto>
      <Campo
        rotulo={textos.cadastro.email}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        inputMode="email"
      />
      <Campo
        rotulo={textos.cadastro.senha}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoComplete="new-password"
        onSubmitEditing={enviar}
      />
      <Aviso>{erro}</Aviso>
      <Botao titulo={textos.cadastro.botao} onPress={enviar} carregando={enviando} />
      <Botao
        titulo={textos.cadastro.irParaEntrar}
        variante="link"
        onPress={() => router.replace('/entrar')}
      />
    </Tela>
  );
}
