import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { PIN_PETALAS, PIN_TOQUES, type Pin } from '@mindcycle/shared';

import { textos } from '@/textos';

import { BotaoApagarPin, MarcadoresPin, useSequenciaPin } from './pin-comum';
import { cores, espaco } from './tema';

// RNF09: o PIN é a sequência de toques em pétalas de uma flor.
// Cada pétala é uma View arredondada, rotacionada em volta do centro da flor.
// Medidas de projeto, em dp, para uma flor de 300; tudo escala com a largura.
const TAMANHO_BASE = 300;
const LARGURA_PETALA = 60;
const COMPRIMENTO_PETALA = 100;
// Distância do centro da flor ao centro da pétala: com ela, as pontas de
// dentro de pétalas vizinhas não se encostam.
const RAIO_PETALA = 92;
const MIOLO = 44;

// Pétala 1 no topo, seguindo no sentido horário.
const petalas = [
  { fundo: cores.rose, borda: cores.white },
  { fundo: cores.lilac, borda: cores.white },
  { fundo: cores.coral, borda: cores.white },
  { fundo: cores.roseDeep, borda: cores.white },
  { fundo: cores.plum, borda: cores.white },
  { fundo: cores.white, borda: cores.plum },
] as const;

type Props = {
  /** Chamada no 4º toque, com a sequência de pétalas de 1 a 6. */
  aoCompletar: (pin: Pin) => void;
  /** Ignora toques, por exemplo enquanto o servidor confere o PIN. */
  desabilitado?: boolean;
};

export function PinPetalas({ aoCompletar, desabilitado }: Props) {
  const { width } = useWindowDimensions();
  const tamanho = Math.min(TAMANHO_BASE, width - 2 * espaco.lg);
  const escala = tamanho / TAMANHO_BASE;

  const { toques, adicionar, apagarUltimo, podeApagar } = useSequenciaPin(
    PIN_TOQUES,
    aoCompletar,
    desabilitado,
  );

  return (
    <View style={styles.bloco}>
      <MarcadoresPin toques={toques} total={PIN_TOQUES} />

      <View
        accessibilityLabel={textos.pin.petalas.flor}
        style={{ width: tamanho, height: tamanho }}>
        {petalas.map(({ fundo, borda }, i) => {
          const angulo = (i * 360) / PIN_PETALAS;
          const radianos = (angulo * Math.PI) / 180;
          const largura = LARGURA_PETALA * escala;
          const comprimento = COMPRIMENTO_PETALA * escala;
          const raio = RAIO_PETALA * escala;
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={textos.pin.petalas.petala(i + 1)}
              accessibilityState={{ disabled: desabilitado }}
              disabled={desabilitado}
              onPress={() => adicionar(i + 1)}
              style={({ pressed }) => [
                styles.petala,
                {
                  width: largura,
                  height: comprimento,
                  borderRadius: largura / 2,
                  backgroundColor: fundo,
                  borderColor: borda,
                  left: tamanho / 2 + raio * Math.sin(radianos) - largura / 2,
                  top: tamanho / 2 - raio * Math.cos(radianos) - comprimento / 2,
                  opacity: desabilitado ? 0.6 : 1,
                  transform: [{ rotate: `${angulo}deg` }, { scale: pressed ? 0.92 : 1 }],
                },
              ]}
            />
          );
        })}
        <View
          pointerEvents="none"
          style={[
            styles.miolo,
            {
              width: MIOLO * escala,
              height: MIOLO * escala,
              borderRadius: (MIOLO * escala) / 2,
              left: tamanho / 2 - (MIOLO * escala) / 2,
              top: tamanho / 2 - (MIOLO * escala) / 2,
            },
          ]}
        />
      </View>

      <BotaoApagarPin
        rotulo={textos.pin.petalas.apagar}
        ativo={podeApagar}
        onPress={apagarUltimo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: { alignItems: 'center', gap: espaco.lg },
  petala: { position: 'absolute', borderWidth: 2 },
  miolo: { position: 'absolute', backgroundColor: cores.blush },
});
