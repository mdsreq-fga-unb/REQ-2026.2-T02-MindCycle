import { FormularioTarefa } from '@/features/tarefas/formulario-tarefa';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Tela, Texto, Titulo } from '@/ui/componentes';

// HU17. Abre por cima das abas, a partir da aba Tarefas.
export default function TarefaNova() {
  const { conta } = useSessao();

  return (
    <Tela>
      <Titulo>{textos.tarefas.nova.titulo}</Titulo>
      <Texto suave>{textos.tarefas.nova.subtitulo}</Texto>
      {conta && <FormularioTarefa hoje={conta.hoje} />}
    </Tela>
  );
}
