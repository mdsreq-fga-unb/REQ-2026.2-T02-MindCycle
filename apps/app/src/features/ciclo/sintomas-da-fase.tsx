import { sintomasComunsDaFase, type SituacaoCiclo } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';

/**
 * HU01: os sintomas comuns da fase estimada de hoje, logo abaixo do cartão da
 * situação. Sem fase estimada (HU05), não aparece. Lista em rascunho, a revisar
 * com a Dra. Cláudia.
 */
export function SintomasDaFase({ situacao }: { situacao: SituacaoCiclo }) {
  if (!situacao.estimada) {
    return null;
  }
  const t = textos.ciclo.sintomasDaFase;
  const sintomas = sintomasComunsDaFase(situacao.fase);
  return (
    <Texto suave style={{ fontSize: 14, lineHeight: 20 }}>
      {sintomas.length === 0
        ? t.semSintomas
        : (situacao.fase === 'lutea' ? t.listaFimDaFase : t.lista)(
            sintomas.map((s) => textos.checkin.sintomas.nomes[s]),
          )}
    </Texto>
  );
}
