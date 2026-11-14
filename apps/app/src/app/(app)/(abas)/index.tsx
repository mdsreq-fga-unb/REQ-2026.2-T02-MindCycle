import { textos } from '@/textos';
import { Tela, Texto, Titulo } from '@/ui/componentes';

// Ponto de partida da tela "Hoje" (HU13, HU15).
export default function Hoje() {
  return (
    <Tela naAba>
      <Titulo>{textos.hoje.titulo}</Titulo>
      <Texto suave>{textos.hoje.emBreve}</Texto>
    </Tela>
  );
}
