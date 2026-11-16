import { CartaoMensagem } from "@/features/acolhimento/cartao-mensagem";
import { CartaoCheckin } from "@/features/checkin/cartao-checkin";
import { PlanoDoDia } from "@/features/plano-do-dia/plano-do-dia";
import { CartaoSobrecarga } from "@/features/sobrecarga/cartao-sobrecarga";
import { textos } from "@/textos";
import { Tela, Titulo } from "@/ui/componentes";

// A tela "Hoje": a sinalização de sobrecarga da HU02 no topo, ao alcance sem
// rolar (RNF04), a mensagem de acolhimento da HU22, o registro rápido da HU04 e
// as tarefas do dia da HU13. O reajuste pela disposição (HU15) entra nesta mesma lista.
export default function Hoje() {
  return (
    <Tela naAba>
      <Titulo>{textos.hoje.titulo}</Titulo>
      <CartaoMensagem />
      <CartaoSobrecarga />
      <CartaoCheckin />
      <PlanoDoDia />
    </Tela>
  );
}
