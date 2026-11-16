import { faseSchema } from '@mindcycle/shared';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { textos } from '@/textos';
import { Botao, Texto, Titulo } from '@/ui/componentes';
import { cores, coresFase, espaco, larguraMaxima, raio } from '@/ui/tema';

// HU28: explicação de uma fase, aberta por cima da aba Ciclo.
export default function ExplicacaoDaFase() {
  const parametro = faseSchema.safeParse(useLocalSearchParams<{ fase: string }>().fase);
  // Fase que não existe (endereço digitado errado): fecha a folha em vez de
  // abrir a aba dentro dela; sem tela anterior, vai para a aba Ciclo.
  useEffect(() => {
    if (!parametro.success) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/ciclo');
      }
    }
  }, [parametro.success]);
  if (!parametro.success) {
    return null;
  }
  const fase = parametro.data;
  const t = textos.ciclo.fases;
  const conteudo = t.porFase[fase];

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.tela}>
      <ScrollView contentContainerStyle={styles.rolagem}>
        <View style={styles.conteudo}>
          <View style={styles.cabecalho}>
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={[styles.marcador, { backgroundColor: coresFase[fase] }]}
            />
            <Titulo>{t.tituloModal(conteudo.nome)}</Titulo>
          </View>
          <Secao titulo={t.quando} texto={conteudo.quando} />
          <Secao titulo={t.corpo} texto={conteudo.corpo} />
          <Secao titulo={t.sentir} texto={conteudo.sentir} />
          <Texto suave style={styles.nota}>
            {t.nota}
          </Texto>
          <Botao titulo={t.fechar} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Secao({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <View style={{ gap: espaco.xs }}>
      <Text accessibilityRole="header" style={styles.secao}>
        {titulo}
      </Text>
      <Texto>{texto}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.ground },
  rolagem: { padding: espaco.lg, paddingTop: espaco.xl },
  conteudo: {
    width: '100%',
    maxWidth: larguraMaxima,
    alignSelf: 'center',
    gap: espaco.lg,
  },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  marcador: { width: 20, height: 20, borderRadius: raio.botao },
  secao: { fontSize: 14, fontWeight: '700', color: cores.plum },
  nota: { fontSize: 14, lineHeight: 20 },
});
