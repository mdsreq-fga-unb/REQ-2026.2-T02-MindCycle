import { recomendarConteudos, type Fase, type Sintoma } from '@mindcycle/shared';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { textos } from '@/textos';
import { cores, espaco, raio } from '@/ui/tema';

/**
 * HU09: até três conteúdos ligados à fase estimada de hoje ou aos sintomas do
 * check-in de hoje. Sem nada relacionado, a seção não aparece.
 */
export function ConteudosRecomendados({
  fase,
  sintomas,
}: {
  fase: Fase | null;
  sintomas: readonly Sintoma[];
}) {
  const ids = recomendarConteudos({ fase, sintomas });
  if (ids.length === 0) {
    return null;
  }
  const t = textos.ciclo.conteudos;
  return (
    <View style={styles.cartao}>
      <Text accessibilityRole="header" style={styles.titulo}>
        {t.titulo}
      </Text>
      {ids.map((id, i) => (
        <Pressable
          key={id}
          accessibilityRole="link"
          accessibilityLabel={t.porConteudo[id].titulo}
          accessibilityHint={t.dicaAcessivel}
          onPress={() => router.push({ pathname: '/conteudo/[id]', params: { id } })}
          style={({ pressed }) => [styles.linha, i > 0 && styles.divisor, pressed && { opacity: 0.7 }]}>
          <Text style={styles.textoLinha}>{t.porConteudo[id].titulo}</Text>
          <Text style={styles.seta}>›</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: { paddingHorizontal: espaco.md, paddingTop: espaco.md, borderRadius: raio.cartao, backgroundColor: cores.white },
  titulo: { fontSize: 14, fontWeight: '700', color: cores.inkSoft, marginBottom: espaco.xs },
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm, minHeight: 52, paddingVertical: espaco.sm },
  divisor: { borderTopWidth: 1, borderTopColor: cores.blush },
  textoLinha: { flex: 1, fontSize: 16, lineHeight: 22, fontWeight: '700', color: cores.ink },
  seta: { fontSize: 22, color: cores.plum },
});
