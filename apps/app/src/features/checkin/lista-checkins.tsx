import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { formatarDataBr, horaLocal, type Checkin } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Botao, Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

import { ResumoCheckin } from './resumo-checkin';

/** HU04: o histórico, do mais recente para o mais antigo, com a opção de corrigir. */
export function ListaCheckins({ checkins, fuso }: { checkins: Checkin[]; fuso: string }) {
  if (checkins.length === 0) {
    return <Texto suave>{textos.checkin.registros.vazio}</Texto>;
  }
  return (
    <View style={styles.lista}>
      {checkins.map((checkin) => {
        const data = formatarDataBr(checkin.dataLocal);
        const hora = horaLocal(new Date(checkin.criadoEm), fuso);
        return (
          <View key={checkin.id} style={styles.cartao}>
            <Texto style={{ fontWeight: '700' }}>{textos.checkin.registros.data(data, hora)}</Texto>
            <ResumoCheckin checkin={checkin} />
            <Botao
              titulo={textos.checkin.registros.corrigir}
              rotuloAcessivel={textos.checkin.registros.rotuloCorrigir(data, hora)}
              variante="link"
              onPress={() =>
                router.push({ pathname: '/registro-corrigir', params: { id: checkin.id } })
              }
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  lista: { gap: espaco.sm },
  cartao: {
    padding: espaco.md,
    gap: espaco.xs,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
  },
});
