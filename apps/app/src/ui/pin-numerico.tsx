import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PIN_DIGITOS, type Pin } from '@mindcycle/shared';

import { textos } from '@/textos';

import { BotaoApagarPin, MarcadoresPin, useSequenciaPin } from './pin-comum';
import { cores, espaco, raio } from './tema';

// Alvos de pelo menos 56 dp, maiores que os 44 do mínimo, para o teclado ser
// confortável com o polegar.
const LARGURA_TECLA = 80;
const ALTURA_TECLA = 64;

const linhas = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]] as const;

type Props = {
  /** Chamada no 4º dígito, com a sequência de dígitos de 0 a 9. */
  aoCompletar: (pin: Pin) => void;
  /** Ignora toques, por exemplo enquanto o servidor confere o PIN. */
  desabilitado?: boolean;
};

// PIN numérico: o mesmo contrato do PinPetalas, num teclado de 0 a 9. Os
// dígitos digitados não aparecem na tela, só os marcadores.
export function PinNumerico({ aoCompletar, desabilitado }: Props) {
  const { toques, adicionar, apagarUltimo, podeApagar } = useSequenciaPin(
    PIN_DIGITOS,
    aoCompletar,
    desabilitado,
  );

  return (
    <View style={styles.bloco}>
      <MarcadoresPin toques={toques} total={PIN_DIGITOS} />
      <View accessibilityLabel={textos.pin.numerico.teclado} style={styles.teclado}>
        {linhas.map((linha) => (
          <View key={linha[0]} style={styles.linha}>
            {linha.map((digito) => (
              <Pressable
                key={digito}
                accessibilityRole="button"
                accessibilityLabel={textos.pin.numerico.digito(digito)}
                accessibilityState={{ disabled: desabilitado }}
                disabled={desabilitado}
                onPress={() => adicionar(digito)}
                style={({ pressed }) => [
                  styles.tecla,
                  desabilitado && styles.desabilitada,
                  pressed && styles.pressionada,
                ]}>
                <Text style={styles.digito}>{digito}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
      <BotaoApagarPin
        rotulo={textos.pin.numerico.apagar}
        ativo={podeApagar}
        onPress={apagarUltimo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: { alignItems: 'center', gap: espaco.lg },
  teclado: { gap: espaco.md },
  linha: { flexDirection: 'row', justifyContent: 'center', gap: espaco.md },
  tecla: {
    width: LARGURA_TECLA,
    height: ALTURA_TECLA,
    borderRadius: raio.campo,
    borderWidth: 1,
    borderColor: cores.plum,
    backgroundColor: cores.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digito: { fontSize: 28, fontWeight: '700', color: cores.ink },
  desabilitada: { opacity: 0.6 },
  pressionada: { backgroundColor: cores.blush },
});
