import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type TextProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Nivel } from '@mindcycle/shared';

import { cores, espaco, larguraMaxima, raio } from './tema';

// Numa aba, a barra de abas já ocupa a margem inferior do aparelho.
// noTopo: o conteúdo começa no alto e ocupa a altura toda, para um bloco poder
// ir ao rodapé (com um espaçador flex: 1); sem ele, o conteúdo fica centralizado.
export function Tela({
  children,
  naAba,
  noTopo,
}: PropsWithChildren<{ naAba?: boolean; noTopo?: boolean }>) {
  return (
    <SafeAreaView
      style={styles.tela}
      edges={naAba ? ['top', 'left', 'right'] : undefined}>
      <ScrollView
        contentContainerStyle={[styles.rolagem, noTopo && styles.rolagemNoTopo]}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.conteudo, noTopo && styles.conteudoNoTopo]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function Titulo({ style, ...rest }: TextProps) {
  return <Text accessibilityRole="header" style={[styles.titulo, style]} {...rest} />;
}

export function Texto({
  suave,
  style,
  ...rest
}: TextProps & { suave?: boolean }) {
  return <Text style={[styles.texto, suave && styles.textoSuave, style]} {...rest} />;
}

export function Campo({ rotulo, ...rest }: TextInputProps & { rotulo: string }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        accessibilityLabel={rotulo}
        placeholderTextColor={cores.inkSoft}
        style={styles.entrada}
        {...rest}
      />
    </View>
  );
}

export function Botao({
  titulo,
  onPress,
  carregando,
  variante = 'primario',
  rotuloAcessivel,
}: {
  titulo: string;
  onPress: () => void;
  carregando?: boolean;
  variante?: 'primario' | 'link';
  /** Quando só o título não diz a que o botão se refere, como "Remover" numa lista. */
  rotuloAcessivel?: string;
}) {
  const primario = variante === 'primario';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotuloAcessivel}
      accessibilityState={{ busy: carregando, disabled: carregando }}
      disabled={carregando}
      onPress={onPress}
      style={({ pressed }) => [
        primario ? styles.botao : styles.link,
        pressed && styles.pressionado,
      ]}>
      {carregando ? (
        <ActivityIndicator color={cores.ink} />
      ) : (
        <Text style={primario ? styles.botaoTexto : styles.linkTexto}>{titulo}</Text>
      )}
    </Pressable>
  );
}

export function Interruptor({
  rotulo,
  valor,
  aoMudar,
}: {
  rotulo: string;
  valor: boolean;
  aoMudar: (valor: boolean) => void;
}) {
  return (
    <View style={styles.interruptor}>
      <Text style={[styles.texto, styles.interruptorRotulo]}>{rotulo}</Text>
      <Switch
        accessibilityLabel={rotulo}
        value={valor}
        onValueChange={aoMudar}
        trackColor={{ false: cores.inkSoft, true: cores.roseDeep }}
        thumbColor={cores.white}
      />
    </View>
  );
}

/**
 * Número que se ajusta com "−" e "+", como os dias do ciclo. Para o leitor de
 * tela é um controle ajustável: deslizar para cima ou para baixo muda o valor.
 */
export function Contador({
  rotulo,
  valor,
  texto,
  minimo,
  maximo,
  aoMudar,
  rotuloDiminuir,
  rotuloAumentar,
}: {
  rotulo: string;
  valor: number;
  /** Como o valor aparece e é lido, como "28 dias". */
  texto: string;
  minimo: number;
  maximo: number;
  aoMudar: (valor: number) => void;
  rotuloDiminuir: string;
  rotuloAumentar: string;
}) {
  const mudar = (passo: number) => aoMudar(Math.min(maximo, Math.max(minimo, valor + passo)));
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={rotulo}
        accessibilityValue={{ min: minimo, max: maximo, now: valor, text: texto }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={({ nativeEvent }) =>
          mudar(nativeEvent.actionName === 'increment' ? 1 : -1)
        }
        style={styles.contador}>
        <PassoContador
          simbolo="−"
          rotulo={rotuloDiminuir}
          desativado={valor <= minimo}
          onPress={() => mudar(-1)}
        />
        <Text style={styles.contadorValor}>{texto}</Text>
        <PassoContador
          simbolo="+"
          rotulo={rotuloAumentar}
          desativado={valor >= maximo}
          onPress={() => mudar(1)}
        />
      </View>
    </View>
  );
}

function PassoContador({
  simbolo,
  rotulo,
  desativado,
  onPress,
}: {
  simbolo: string;
  rotulo: string;
  desativado: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ disabled: desativado }}
      disabled={desativado}
      onPress={onPress}
      hitSlop={espaco.xs}
      style={({ pressed }) => [
        styles.passo,
        desativado && styles.passoDesativado,
        pressed && styles.pressionado,
      ]}>
      <Text style={styles.passoSimbolo}>{simbolo}</Text>
    </Pressable>
  );
}

/** Confirmação de uma ação que deu certo: em plum, sem alarde, e lida pelo leitor de tela. */
export function Confirmacao({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }
  return (
    <Text accessibilityLiveRegion="polite" style={styles.confirmacao}>
      {children}
    </Text>
  );
}

/** Escolha entre os três níveis (1 baixa, 2 média, 3 alta); a usuária toca em um. */
export function SeletorNivel({
  rotulo,
  rotulos,
  valor,
  aoMudar,
}: {
  rotulo: string;
  rotulos: Record<Nivel, string>;
  valor?: Nivel;
  aoMudar: (valor: Nivel) => void;
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View accessibilityRole="radiogroup" accessibilityLabel={rotulo} style={styles.opcoes}>
        {([1, 2, 3] as const).map((nivel) => {
          const marcado = valor === nivel;
          return (
            <Pressable
              key={nivel}
              accessibilityRole="radio"
              accessibilityLabel={rotulos[nivel]}
              accessibilityState={{ checked: marcado }}
              onPress={() => aoMudar(nivel)}
              style={({ pressed }) => [
                styles.opcao,
                marcado && styles.opcaoMarcada,
                pressed && styles.pressionado,
              ]}>
              <Text style={[styles.opcaoTexto, marcado && styles.opcaoTextoMarcado]}>
                {rotulos[nivel]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Opção que se marca e desmarca, como um sintoma. O estado marcado aparece na
 * borda e no `detalhe` (texto), nunca só na cor.
 */
export function Chip({
  rotulo,
  detalhe,
  marcado,
  onPress,
  rotuloAcessivel,
  dica,
}: {
  rotulo: string;
  /** Texto sob o rótulo quando marcado, como a intensidade do sintoma. */
  detalhe?: string;
  marcado: boolean;
  onPress: () => void;
  /** O que o leitor de tela lê, quando difere de "rótulo" + estado. */
  rotuloAcessivel?: string;
  dica?: string;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={rotuloAcessivel ?? rotulo}
      accessibilityHint={dica}
      accessibilityState={{ checked: marcado }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        marcado && styles.opcaoMarcada,
        pressed && styles.pressionado,
      ]}>
      <Text style={[styles.opcaoTexto, marcado && styles.opcaoTextoMarcado]}>{rotulo}</Text>
      {marcado && detalhe ? <Text style={styles.chipDetalhe}>{detalhe}</Text> : null}
    </Pressable>
  );
}

/** Mensagem de erro: borda na cor da marca e texto em ink, sem vermelho de alarme. */
export function Aviso({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }
  return (
    <View accessibilityRole="alert" style={styles.aviso}>
      <Text style={styles.texto}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.ground },
  rolagem: { flexGrow: 1, justifyContent: 'center', padding: espaco.lg },
  rolagemNoTopo: { justifyContent: 'flex-start' },
  conteudoNoTopo: { flexGrow: 1 },
  conteudo: {
    width: '100%',
    maxWidth: larguraMaxima,
    alignSelf: 'center',
    gap: espaco.md,
  },
  titulo: { fontSize: 28, lineHeight: 36, fontWeight: '700', color: cores.ink },
  texto: { fontSize: 16, lineHeight: 24, color: cores.ink },
  textoSuave: { color: cores.inkSoft },
  campo: { gap: espaco.xs },
  rotulo: { fontSize: 14, fontWeight: '600', color: cores.ink },
  entrada: {
    minHeight: 48,
    paddingHorizontal: espaco.md,
    borderRadius: raio.campo,
    borderWidth: 1,
    borderColor: cores.inkSoft,
    backgroundColor: cores.white,
    fontSize: 16,
    color: cores.ink,
  },
  botao: {
    minHeight: 48,
    paddingHorizontal: espaco.lg,
    borderRadius: raio.botao,
    backgroundColor: cores.rose,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: { fontSize: 16, fontWeight: '700', color: cores.ink },
  link: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  linkTexto: { fontSize: 16, fontWeight: '600', color: cores.plum },
  interruptor: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  interruptorRotulo: { flex: 1 },
  confirmacao: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: cores.plum },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 64,
    paddingHorizontal: espaco.sm,
    borderRadius: raio.campo,
    borderWidth: 1,
    borderColor: cores.inkSoft,
    backgroundColor: cores.white,
  },
  contadorValor: { fontSize: 20, fontWeight: '700', color: cores.ink },
  passo: {
    width: 48,
    height: 48,
    borderRadius: raio.botao,
    backgroundColor: cores.blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // No limite o botão some pela metade, e o leitor de tela anuncia "desativado".
  passoDesativado: { opacity: 0.4 },
  passoSimbolo: { fontSize: 24, lineHeight: 28, fontWeight: '700', color: cores.ink },
  opcoes: { flexDirection: 'row', gap: espaco.sm },
  opcao: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: espaco.sm,
    borderRadius: raio.campo,
    borderWidth: 1,
    borderColor: cores.inkSoft,
    backgroundColor: cores.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // A seleção não depende só da cor: a borda engrossa e o texto fica em negrito.
  opcaoMarcada: { borderWidth: 3, borderColor: cores.plum, backgroundColor: cores.rose },
  opcaoTexto: { fontSize: 16, color: cores.ink },
  opcaoTextoMarcado: { fontWeight: '700' },
  chip: {
    minHeight: 48,
    paddingHorizontal: espaco.md,
    paddingVertical: espaco.sm,
    borderRadius: raio.campo,
    borderWidth: 1,
    borderColor: cores.inkSoft,
    backgroundColor: cores.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipDetalhe: { fontSize: 14, fontWeight: '700', color: cores.ink },
  pressionado: { opacity: 0.8 },
  aviso: {
    padding: espaco.md,
    borderRadius: raio.campo,
    borderLeftWidth: 4,
    borderLeftColor: cores.roseDeep,
    backgroundColor: cores.blush,
  },
});
