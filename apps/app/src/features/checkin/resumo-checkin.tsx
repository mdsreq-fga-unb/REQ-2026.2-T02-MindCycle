import { View } from 'react-native';
import type { Checkin } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

/** A disposição e os sintomas de um registro, com a intensidade escrita ao lado. */
export function ResumoCheckin({ checkin }: { checkin: Checkin }) {
  const { resumo, sintomas } = textos.checkin;
  return (
    <View style={{ gap: espaco.xs }}>
      <Texto>{resumo.disposicao(textos.checkin.disposicao.niveis[checkin.disposicao])}</Texto>
      <Texto>
        {checkin.semSintomas
          ? resumo.semSintomas
          : checkin.sintomas
              .map(({ sintoma, intensidade }) =>
                resumo.sintoma(sintomas.nomes[sintoma], sintomas.intensidades[intensidade]),
              )
              .join(', ')}
      </Texto>
    </View>
  );
}
