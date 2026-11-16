import { CartaoMensagem } from '@/features/acolhimento/cartao-mensagem';
import { CartaoCheckin } from '@/features/checkin/cartao-checkin';
import { textos } from '@/textos';
import { Tela, Texto, Titulo } from '@/ui/componentes';

// Ponto de partida da tela "Hoje" (HU13, HU15). A mensagem é da HU22 e o registro rápido é da HU04.
export default function Hoje() {
  return (
    <Tela naAba>
      <Titulo>{textos.hoje.titulo}</Titulo>
      <CartaoMensagem />
      <CartaoCheckin />
      <Texto suave>{textos.hoje.emBreve}</Texto>
    </Tela>
  );
}
