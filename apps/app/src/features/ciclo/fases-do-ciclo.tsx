import { FASES, type Fase } from '@mindcycle/shared';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, coresFase, coresFaseSuave, espaco, raio } from '@/ui/tema';

/**
 * HU28: as quatro fases em etiquetas pequenas, que também servem de legenda do
 * calendário (HU10). Cada uma abre a explicação da fase. A fase estimada de hoje
 * (HU05) ganha borda e o texto "estimada", não só destaque de cor.
 */
export function FasesDoCiclo({
  faseAtual,
  comIntroducao = false,
}: {
  faseAtual?: Fase;
  /** No formulário, sem calendário por perto, a introdução explica o que são. */
  comIntroducao?: boolean;
}) {
  const t = textos.ciclo.fases;
  return (
    <View style={{ gap: espaco.sm }}>
      {comIntroducao && (
        <>
          <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
            {t.titulo}
          </Texto>
          <Texto suave>{t.introducao}</Texto>
        </>
      )}
      <View style={styles.etiquetas}>
        {FASES.map((fase) => {
          const { nome } = t.porFase[fase];
          const atual = fase === faseAtual;
          return (
            // router.push em vez de <Link asChild>: o Link descarta o estilo em
            // função do Pressable, e a etiqueta perdia a cor e o retorno do toque.
            <Pressable
              key={fase}
              accessibilityRole="button"
              accessibilityLabel={atual ? t.rotuloAtual(nome) : t.rotuloAcessivel(nome)}
              accessibilityHint={t.dicaAcessivel}
              onPress={() => router.push({ pathname: '/fase/[fase]', params: { fase } })}
              hitSlop={4}
              style={({ pressed }) => [
                styles.etiqueta,
                { backgroundColor: coresFaseSuave[fase] },
                atual && styles.atual,
                pressed && styles.pressionada,
              ]}>
              <View style={[styles.ponto, { backgroundColor: coresFase[fase] }]} />
              <Text style={styles.nome}>{nome.toLowerCase()}</Text>
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
  etiquetas: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: raio.botao,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  atual: { borderColor: cores.ink },
  pressionada: { opacity: 0.8, transform: [{ scale: 0.96 }] },
  ponto: { width: 10, height: 10, borderRadius: 5 },
  nome: { fontSize: 14, fontWeight: '700', color: cores.ink },
  marcaAtual: { fontSize: 14, fontWeight: '600', color: cores.ink },
  dica: { fontSize: 13, lineHeight: 18 },
});
