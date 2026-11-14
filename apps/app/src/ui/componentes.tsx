import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type TextProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cores, espaco, larguraMaxima, raio } from './tema';

export function Tela({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.rolagem}
        keyboardShouldPersistTaps="handled">
        <View style={styles.conteudo}>{children}</View>
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
}: {
  titulo: string;
  onPress: () => void;
  carregando?: boolean;
  variante?: 'primario' | 'link';
}) {
  const primario = variante === 'primario';
  return (
    <Pressable
      accessibilityRole="button"
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
  pressionado: { opacity: 0.8 },
  aviso: {
    padding: espaco.md,
    borderRadius: raio.campo,
    borderLeftWidth: 4,
    borderLeftColor: cores.roseDeep,
    backgroundColor: cores.blush,
  },
});
