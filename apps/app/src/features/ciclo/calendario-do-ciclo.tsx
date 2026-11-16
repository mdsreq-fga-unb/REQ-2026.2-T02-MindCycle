import {
  faseDoDia,
  faseNoCalendario,
  gradeDoMes,
  type DataLocal,
  type Fase,
  type InicioMenstruacao,
  type PerfilCiclo,
} from '@mindcycle/shared';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, coresFase, coresFaseSuave, espaco, fonteTitulo, raio } from '@/ui/tema';

import { FasesDoCiclo } from './fases-do-ciclo';

/**
 * HU10: o mês com cada dia no fundo claro da sua fase estimada (modelo da HU05).
 * Dias depois do fim da duração informada ficam sem cor: não há previsão do
 * próximo ciclo. Hoje tem a cor cheia e os inícios registrados têm um ponto. As
 * etiquetas das fases (HU28) servem de legenda e abrem a explicação de cada uma.
 */
export function CalendarioDoCiclo({
  inicios,
  perfil,
  hoje,
  faseAtual,
}: {
  inicios: InicioMenstruacao[];
  perfil: PerfilCiclo | null;
  hoje: DataLocal;
  faseAtual?: Fase;
}) {
  const t = textos.ciclo.calendario;
  const [ano, mesHoje] = hoje.split('-').map(Number);
  const [mes, setMes] = useState({ ano, mes: mesHoje });
  const datasDeInicio = new Set(inicios.map((i) => i.data));
  const comCores =
    !!perfil &&
    !perfil.irregular &&
    perfil.duracaoMedia !== null &&
    faseDoDia(1, perfil.duracaoMedia) !== null;

  const mudarMes = (passo: number) =>
    setMes(({ ano: a, mes: m }) => {
      const indice = a * 12 + (m - 1) + passo;
      return { ano: Math.floor(indice / 12), mes: (indice % 12) + 1 };
    });

  return (
    <View style={styles.cartao}>
      <View style={styles.cabecalho}>
        <Text accessibilityRole="header" accessibilityLiveRegion="polite" style={styles.mes}>
          {t.mes(mes.ano, mes.mes)}
        </Text>
        <View style={styles.setas}>
          <BotaoMes simbolo="‹" rotulo={t.mesAnterior} onPress={() => mudarMes(-1)} />
          <BotaoMes simbolo="›" rotulo={t.proximoMes} onPress={() => mudarMes(1)} />
        </View>
      </View>

      <View style={styles.semana} importantForAccessibility="no-hide-descendants">
        {t.diasDaSemana.map((letra, i) => (
          <Text key={i} style={styles.diaDaSemana}>
            {letra}
          </Text>
        ))}
      </View>

      {gradeDoMes(mes.ano, mes.mes).map((semana, s) => (
        <View key={s} style={styles.semana}>
          {semana.map((data, d) => {
            if (!data) {
              return <View key={d} style={styles.celula} />;
            }
            const fase = comCores ? faseNoCalendario(data, { inicios, perfil }) : null;
            const inicio = datasDeInicio.has(data);
            const ehHoje = data === hoje;
            const fundo = fase
              ? ehHoje
                ? coresFase[fase]
                : coresFaseSuave[fase]
              : 'transparent';
            // key pela data: a célula é recriada ao trocar de mês. No Android, o
            // arredondamento some quando o fundo muda numa View reaproveitada.
            return (
              <View
                key={data}
                accessible
                accessibilityLabel={t.rotuloDia({ data, fase, inicio, hoje: ehHoje })}
                style={styles.celula}>
                <View
                  style={[
                    styles.dia,
                    { backgroundColor: fundo },
                    ehHoje && !fase && styles.hojeSemFase,
                  ]}>
                  <Text style={[styles.numero, ehHoje && styles.numeroHoje]}>
                    {Number(data.slice(8))}
                  </Text>
                  {inicio && <View style={styles.pontoInicio} />}
                </View>
              </View>
            );
          })}
        </View>
      ))}

      <View style={styles.legendaInicio} importantForAccessibility="no-hide-descendants">
        <View style={styles.pontoInicio} />
        <Texto suave style={styles.textoPequeno}>
          {t.legendaInicio}
        </Texto>
      </View>
      {!comCores && (
        <Texto suave style={styles.textoPequeno}>
          {t.semCores}
        </Texto>
      )}
      <FasesDoCiclo faseAtual={faseAtual} />
    </View>
  );
}

function BotaoMes({
  simbolo,
  rotulo,
  onPress,
}: {
  simbolo: string;
  rotulo: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.botaoMes, pressed && { opacity: 0.7 }]}>
      <Text style={styles.simboloMes}>{simbolo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartao: {
    gap: espaco.sm,
    padding: espaco.md,
    borderRadius: 20,
    backgroundColor: cores.white,
  },
  cabecalho: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mes: { fontFamily: fonteTitulo, fontSize: 20, lineHeight: 26, color: cores.ink },
  setas: { flexDirection: 'row', gap: espaco.xs },
  botaoMes: {
    width: 36,
    height: 36,
    borderRadius: raio.botao,
    backgroundColor: cores.blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simboloMes: { fontSize: 22, lineHeight: 24, fontWeight: '700', color: cores.ink },
  semana: { flexDirection: 'row' },
  diaDaSemana: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: cores.inkSoft,
    paddingVertical: espaco.xs,
  },
  celula: { flex: 1, aspectRatio: 1, padding: 3 },
  dia: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hojeSemFase: { borderWidth: 2, borderColor: cores.ink },
  numero: { fontSize: 14, fontWeight: '500', color: cores.ink },
  numeroHoje: { fontWeight: '800' },
  pontoInicio: { width: 5, height: 5, borderRadius: 3, backgroundColor: cores.ink },
  legendaInicio: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  textoPequeno: { fontSize: 13, lineHeight: 18 },
});
