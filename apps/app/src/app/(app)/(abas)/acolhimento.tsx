import { textos } from '@/textos';
import { Tela, Texto, Titulo } from '@/ui/componentes';

// Ponto de partida do acolhimento (HU22, HU21).
export default function Acolhimento() {
  return (
    <Tela naAba>
      <Titulo>{textos.acolhimento.titulo}</Titulo>
      <Texto suave>{textos.acolhimento.emBreve}</Texto>
    </Tela>
  );
}
