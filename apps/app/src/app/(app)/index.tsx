import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Botao, Tela, Texto, Titulo } from '@/ui/componentes';

// Ponto de partida da tela "Hoje" (HU13, HU15).
export default function Hoje() {
  const { conta, sair } = useSessao();

  return (
    <Tela>
      <Titulo>{textos.hoje.titulo}</Titulo>
      {conta && <Texto>{textos.hoje.saudacao(conta.email)}</Texto>}
      <Texto suave>{textos.hoje.emBreve}</Texto>
      <Botao titulo={textos.hoje.sair} variante="link" onPress={sair} />
    </Tela>
  );
}
