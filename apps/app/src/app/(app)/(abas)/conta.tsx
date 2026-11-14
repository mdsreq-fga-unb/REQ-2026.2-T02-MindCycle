import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Botao, Tela, Texto, Titulo } from '@/ui/componentes';

// Dados da conta e saída. PIN (HU11) e exclusão da conta (HU36) entram aqui.
export default function Conta() {
  const { conta, sair } = useSessao();

  return (
    <Tela naAba>
      <Titulo>{textos.conta.titulo}</Titulo>
      {conta && <Texto>{textos.conta.email(conta.email)}</Texto>}
      <Botao titulo={textos.conta.sair} variante="link" onPress={sair} />
    </Tela>
  );
}
