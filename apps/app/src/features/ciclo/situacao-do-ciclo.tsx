import type { SituacaoCiclo } from '@mindcycle/shared';
import { StyleSheet, Text, View } from 'react-native';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, coresFase, espaco, raio } from '@/ui/tema';

/**
 * HU05: a situação do ciclo hoje. A fase vem sempre marcada como estimativa;
 * sem estimativa, o cartão diz o motivo e nunca mostra uma fase por padrão.
 */
export function SituacaoDoCiclo({ situacao }: { situacao: SituacaoCiclo }) {
  const t = textos.ciclo.situacao;
  return (
    <View accessibilityRole="summary" style={styles.cartao}>
      {situacao.diaDoCiclo !== null && <Texto suave>{t.dia(situacao.diaDoCiclo)}</Texto>}
      {situacao.estimada ? (
        <>
          <View style={styles.fase}>
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={[styles.marcador, { backgroundColor: coresFase[situacao.fase] }]}
            />
            <Text style={styles.nomeFase}>
              {t.fase(textos.ciclo.fases.porFase[situacao.fase].nome)}
            </Text>
          </View>
          <Texto suave style={styles.nota}>
            {t.estimativa}
          </Texto>
        </>
      ) : (
        <>
          <Text style={styles.nomeFase}>{t.naoEstimada}</Text>
          <Texto>{t.motivos[situacao.motivo]}</Texto>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    gap: espaco.sm,
    padding: espaco.md,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
  },
  fase: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  marcador: { width: 16, height: 16, borderRadius: raio.botao },
  nomeFase: { fontSize: 22, lineHeight: 28, fontWeight: '700', color: cores.ink },
  nota: { fontSize: 14, lineHeight: 20 },
});
