import { router } from 'expo-router';

import { SecaoPin } from '@/features/conta/secao-pin';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Botao, Tela, Texto, Titulo } from '@/ui/componentes';

// Dados da conta, saída, exclusão (HU36) e PIN (HU11).
export default function Conta() {
  const { conta, sair } = useSessao();

  return (
    <Tela naAba>
      <Titulo>{textos.conta.titulo}</Titulo>
      {conta && <Texto>{textos.conta.email(conta.email)}</Texto>}
      <SecaoPin />
      <Botao titulo={textos.conta.sair} variante="link" onPress={sair} />
      <Botao
        titulo={textos.conta.excluir}
        variante="link"
        onPress={() => router.push('/excluir-conta')}
      />
    </Tela>
  );
}
