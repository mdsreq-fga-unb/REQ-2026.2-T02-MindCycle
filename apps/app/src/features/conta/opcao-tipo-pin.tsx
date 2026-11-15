import { Pressable, StyleSheet, Text } from 'react-native';
import type { TipoPin } from '@mindcycle/shared';

import { textos } from '@/textos';
import { cores, espaco, raio } from '@/ui/tema';

/** Uma das duas escolhas de tipo de PIN: botão de rádio grande, com o nome e uma frase. */
export function OpcaoTipoPin({
  tipo,
  marcada,
  onPress,
}: {
  tipo: TipoPin;
  marcada: boolean;
  onPress: () => void;
}) {
  const { nome, descricao } = textos.pin.tipos[tipo];
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={`${nome}. ${descricao}`}
      accessibilityState={{ checked: marcada }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.opcao,
        marcada && styles.marcada,
        pressed && styles.pressionada,
      ]}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  opcao: {
    minHeight: 80,
    padding: espaco.md,
    gap: espaco.xs,
    justifyContent: 'center',
    borderRadius: raio.campo,
    borderWidth: 2,
    borderColor: cores.blush,
    backgroundColor: cores.white,
  },
  // A seleção não depende só da cor: a borda fica mais forte e ganha o tom da marca.
  marcada: { borderColor: cores.plum, backgroundColor: cores.blush },
  pressionada: { opacity: 0.8 },
  nome: { fontSize: 18, fontWeight: '700', color: cores.ink },
  descricao: { fontSize: 16, lineHeight: 24, color: cores.inkSoft },
});
