import { textos } from '@/textos';
import { Tela, Texto, Titulo } from '@/ui/componentes';

// Ponto de partida das tarefas (HU17, HU16, HU19, HU20, HU18).
export default function Tarefas() {
  return (
    <Tela naAba>
      <Titulo>{textos.tarefas.titulo}</Titulo>
      <Texto suave>{textos.tarefas.emBreve}</Texto>
    </Tela>
  );
}
