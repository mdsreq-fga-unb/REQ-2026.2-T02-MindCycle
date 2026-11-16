import type { SituacaoCiclo } from '@mindcycle/shared';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, coresFase, coresFaseSuave, espaco, fonteTitulo, raio } from '@/ui/tema';

const TAMANHO = 92;
const TRACO = 8;
const RAIO = (TAMANHO - TRACO) / 2;
const VOLTA = 2 * Math.PI * RAIO;

/**
 * HU05: a situação do ciclo hoje. O anel mostra quanto do ciclo já passou; a
 * fase vem sempre marcada como estimativa. Sem estimativa, o cartão diz o motivo
 * e nunca mostra uma fase por padrão.
 */
export function SituacaoDoCiclo({ situacao }: { situacao: SituacaoCiclo }) {
  const t = textos.ciclo.situacao;
  const progresso = situacao.estimada ? situacao.diaDoCiclo / situacao.duracao : 0;
  const corAnel = situacao.estimada ? coresFase[situacao.fase] : cores.inkSoft;

  return (
    <View accessibilityRole="summary" style={styles.cartao}>
      <View
        accessible
        accessibilityLabel={situacao.diaDoCiclo !== null ? t.dia(situacao.diaDoCiclo) : undefined}
        style={styles.anel}>
        <Svg width={TAMANHO} height={TAMANHO} style={StyleSheet.absoluteFill}>
          <Circle
            cx={TAMANHO / 2}
            cy={TAMANHO / 2}
            r={RAIO}
            stroke={situacao.estimada ? coresFaseSuave[situacao.fase] : cores.blush}
            strokeWidth={TRACO}
            fill="none"
          />
          {progresso > 0 && (
            <Circle
              cx={TAMANHO / 2}
              cy={TAMANHO / 2}
              r={RAIO}
              stroke={corAnel}
              strokeWidth={TRACO}
              strokeLinecap="round"
              strokeDasharray={`${VOLTA * progresso} ${VOLTA}`}
              fill="none"
              // Começa no alto do anel, como um relógio.
              transform={`rotate(-90 ${TAMANHO / 2} ${TAMANHO / 2})`}
            />
          )}
        </Svg>
        <Text style={styles.rotuloDia}>{t.rotuloAnel}</Text>
        <Text style={styles.numeroDia}>{situacao.diaDoCiclo ?? '–'}</Text>
        {situacao.estimada && <Text style={styles.deDias}>{t.deDias(situacao.duracao)}</Text>}
      </View>

      <View style={styles.texto}>
        {situacao.estimada ? (
          <>
            <View style={[styles.etiqueta, { backgroundColor: coresFaseSuave[situacao.fase] }]}>
              <View style={[styles.ponto, { backgroundColor: coresFase[situacao.fase] }]} />
              <Text style={styles.textoEtiqueta}>
                {t.fase(textos.ciclo.fases.porFase[situacao.fase].nome)}
              </Text>
            </View>
            <Text style={styles.frase}>{t.dia(situacao.diaDoCiclo)}</Text>
            <Texto suave style={styles.nota}>
              {t.estimativa}
            </Texto>
          </>
        ) : (
          <>
            <View style={[styles.etiqueta, { backgroundColor: cores.blush }]}>
              <Text style={styles.textoEtiqueta}>{t.naoEstimada}</Text>
            </View>
            <Texto style={styles.motivo}>{t.motivos[situacao.motivo]}</Texto>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    padding: espaco.md,
    borderRadius: 20,
    backgroundColor: cores.white,
  },
  anel: { width: TAMANHO, height: TAMANHO, alignItems: 'center', justifyContent: 'center' },
  rotuloDia: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: cores.inkSoft },
  numeroDia: { fontFamily: fonteTitulo, fontSize: 32, lineHeight: 36, color: cores.ink },
  deDias: { fontSize: 12, color: cores.inkSoft },
  texto: { flex: 1, gap: espaco.xs, alignItems: 'flex-start' },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: raio.botao,
  },
  ponto: { width: 8, height: 8, borderRadius: 4 },
  textoEtiqueta: { fontSize: 13, fontWeight: '700', color: cores.ink },
  frase: { fontFamily: fonteTitulo, fontSize: 19, lineHeight: 24, color: cores.ink },
  nota: { fontSize: 13, lineHeight: 18 },
  motivo: { fontSize: 15, lineHeight: 21 },
});
