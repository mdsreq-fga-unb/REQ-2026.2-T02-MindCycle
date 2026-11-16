import { StyleSheet, View } from 'react-native';
import type { MensagemAcolhimentoId } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

import { useMensagemAcolhimento } from './consulta';

const t = textos.acolhimento.mensagem;

/**
 * HU22: cartão da mensagem de acolhimento do dia. Não é tocável nem tem
 * contador — oferece apoio sem cobrança.
 */
export function CartaoMensagemConteudo({ id }: { id: MensagemAcolhimentoId }) {
  const texto = t.textos[id];
  if (!texto) return null;

  return (
    <View
      accessible
      accessibilityLabel={t.rotuloAcessivel(texto)}
      style={styles.cartao}>
      <Texto style={styles.rotulo}>{t.rotulo}</Texto>
      <Texto style={styles.texto}>{texto}</Texto>
    </View>
  );
}

/** Busca e exibe a mensagem de acolhimento do dia na tela Home (Hoje). */
export function CartaoMensagem() {
  const mensagem = useMensagemAcolhimento();

  if (mensagem.isPending || mensagem.isError) return null;

  return <CartaoMensagemConteudo id={mensagem.data.id} />;
}

const styles = StyleSheet.create({
  cartao: {
    padding: espaco.md,
    gap: espaco.xs,
    borderRadius: raio.campo,
    backgroundColor: cores.blush,
    borderWidth: 1,
    borderColor: cores.lilac,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.plum,
  },
  texto: {
    color: cores.ink,
  },
});
