import { FASES, type Fase } from '@mindcycle/shared';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, coresFase, espaco, raio } from '@/ui/tema';

/**
 * HU28: as quatro fases, cada uma abre a explicação dela. Com a fase estimada
 * de hoje (HU05), ela ganha borda e o texto "Fase atual", não só destaque de cor.
 */
export function FasesDoCiclo({ faseAtual }: { faseAtual?: Fase }) {
  const t = textos.ciclo.fases;
  return (
    <View style={{ gap: espaco.sm }}>
      <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
        {t.titulo}
      </Texto>
      <Texto suave>{t.introducao}</Texto>
      <View style={styles.grade}>
        {FASES.map((fase) => {
          const { nome } = t.porFase[fase];
          const atual = fase === faseAtual;
          return (
            // router.push em vez de <Link asChild>: o Link descarta o estilo em
            // função do Pressable, e o botão perdia a cor e o retorno do toque.
            <Pressable
              key={fase}
              accessibilityRole="button"
              accessibilityLabel={atual ? t.rotuloAtual(nome) : t.rotuloAcessivel(nome)}
              accessibilityHint={t.dicaAcessivel}
              onPress={() => router.push({ pathname: '/fase/[fase]', params: { fase } })}
              style={({ pressed }) => [
                styles.fase,
                { backgroundColor: coresFase[fase] },
                atual && styles.atual,
                pressed && styles.pressionada,
              ]}>
              <Text style={styles.nome}>{nome}</Text>
              {atual && <Text style={styles.marcaAtual}>{t.atual}</Text>}
            </Pressable>
          );
        })}
      </View>
      <Texto suave style={styles.dica}>
        {t.dica}
      </Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
  // Duas por linha: o nome mais longo ("Ovulatória") cabe sem quebrar.
  fase: {
    flexGrow: 1,
    flexBasis: '45%',
    minHeight: 48,
    paddingHorizontal: espaco.md,
    paddingVertical: espaco.xs,
    borderRadius: raio.campo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Ao tocar, a borda em plum confirma o toque sem depender só da cor.
  pressionada: { borderWidth: 2, borderColor: cores.plum, transform: [{ scale: 0.96 }] },
  nome: { fontSize: 16, fontWeight: '700', color: cores.ink },
  atual: { borderWidth: 3, borderColor: cores.ink },
  marcaAtual: { fontSize: 13, fontWeight: '600', color: cores.ink },
  dica: { fontSize: 14, lineHeight: 20 },
});
