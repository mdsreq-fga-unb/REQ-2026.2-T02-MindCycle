import { CONTEUDOS, type IdConteudo } from '@mindcycle/shared';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { textos } from '@/textos';
import { Botao, Texto } from '@/ui/componentes';
import { cores, espaco, fonteTitulo, larguraMaxima } from '@/ui/tema';

const ehConteudo = (id: unknown): id is IdConteudo => CONTEUDOS.some((c) => c.id === id);

// HU09: um conteúdo sobre o ciclo, aberto por cima da aba Ciclo.
export default function Conteudo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const valido = ehConteudo(id);
  // Conteúdo que não existe: fecha a folha em vez de mostrar a aba dentro dela.
  useEffect(() => {
    if (!valido) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/ciclo');
      }
    }
  }, [valido]);
  if (!valido) {
    return null;
  }
  const t = textos.ciclo.conteudos;
  const conteudo = t.porConteudo[id];

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.tela}>
      <ScrollView contentContainerStyle={styles.rolagem}>
        <View style={styles.conteudo}>
          <Text accessibilityRole="header" style={styles.titulo}>
            {conteudo.titulo}
          </Text>
          {conteudo.paragrafos.map((p) => (
            <Texto key={p}>{p}</Texto>
          ))}
          <Texto suave style={styles.aviso}>
            {t.aviso}
          </Texto>
          <Botao titulo={t.fechar} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.ground },
  rolagem: { padding: espaco.lg, paddingTop: espaco.xl },
  conteudo: { width: '100%', maxWidth: larguraMaxima, alignSelf: 'center', gap: espaco.md },
  titulo: { fontFamily: fonteTitulo, fontSize: 26, lineHeight: 32, color: cores.ink },
  aviso: { fontSize: 14, lineHeight: 20 },
});
