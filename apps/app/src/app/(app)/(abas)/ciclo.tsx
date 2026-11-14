import { textos } from '@/textos';
import { Tela, Texto, Titulo } from '@/ui/componentes';

// Ponto de partida do ciclo (HU06, HU07, HU05, HU28, HU09).
export default function Ciclo() {
  return (
    <Tela naAba>
      <Titulo>{textos.ciclo.titulo}</Titulo>
      <Texto suave>{textos.ciclo.emBreve}</Texto>
    </Tela>
  );
}
