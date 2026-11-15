import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Pin } from '@mindcycle/shared';

import { textos } from '@/textos';

import { cores, espaco } from './tema';

// Tempo para a usuária ver o último marcador cheio antes de a sequência recomeçar.
const PAUSA_APOS_COMPLETAR_MS = 300;

/** A sequência de toques ou dígitos de um PIN, em construção, e o que dá para fazer com ela. */
export function useSequenciaPin(
  tamanho: number,
  aoCompletar: (pin: Pin) => void,
  desabilitado?: boolean,
) {
  // A sequência mora num ref para que dois toques seguidos, antes de o React
  // renderizar, não se percam; `toques` só serve para redesenhar.
  const sequencia = useRef<number[]>([]);
  const [toques, setToques] = useState(0);
  const recomeco = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (recomeco.current) {
        clearTimeout(recomeco.current);
      }
    },
    [],
  );

  function adicionar(valor: number) {
    if (desabilitado || sequencia.current.length >= tamanho) {
      return;
    }
    sequencia.current = [...sequencia.current, valor];
    setToques(sequencia.current.length);
    if (sequencia.current.length === tamanho) {
      aoCompletar(sequencia.current);
      recomeco.current = setTimeout(() => {
        sequencia.current = [];
        setToques(0);
      }, PAUSA_APOS_COMPLETAR_MS);
    }
  }

  function apagarUltimo() {
    if (sequencia.current.length === 0 || sequencia.current.length >= tamanho) {
      return;
    }
    sequencia.current = sequencia.current.slice(0, -1);
    setToques(sequencia.current.length);
  }

  return {
    toques,
    adicionar,
    apagarUltimo,
    podeApagar: toques > 0 && toques < tamanho,
  };
}

/** Os marcadores de progresso; o "n de 4" é anunciado a cada toque. */
export function MarcadoresPin({ toques, total }: { toques: number; total: number }) {
  return (
    <View
      accessible
      accessibilityLabel={textos.pin.progresso(toques, total)}
      accessibilityLiveRegion="polite"
      style={styles.marcadores}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.marcador, i < toques && styles.marcadorCheio]} />
      ))}
    </View>
  );
}

/** "Apagar último toque" ou "Apagar último dígito", com alvo de pelo menos 44 dp. */
export function BotaoApagarPin({
  rotulo,
  ativo,
  onPress,
}: {
  rotulo: string;
  ativo: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ disabled: !ativo }}
      disabled={!ativo}
      onPress={onPress}
      style={({ pressed }) => [
        styles.apagar,
        !ativo && styles.apagarInativo,
        pressed && styles.pressionado,
      ]}>
      <Text style={styles.apagarTexto}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  marcadores: { flexDirection: 'row', gap: espaco.md, padding: espaco.sm },
  marcador: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: cores.plum,
    backgroundColor: 'transparent',
  },
  marcadorCheio: { backgroundColor: cores.plum },
  apagar: {
    minWidth: 44,
    minHeight: 44,
    paddingHorizontal: espaco.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apagarInativo: { opacity: 0.4 },
  apagarTexto: { fontSize: 16, fontWeight: '600', color: cores.plum },
  pressionado: { opacity: 0.8 },
});
