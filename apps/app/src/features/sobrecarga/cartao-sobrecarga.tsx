import { useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

import { useSinalizarSobrecarga } from './consulta';

const t = textos.sobrecarga;

/**
 * HU02, RNF04: na aba Hoje, dois toques sinalizam a sobrecarga: abrir e
 * confirmar. A confirmação explica o efeito antes de valer, para um toque sem
 * querer não mudar o dia. Pode ser feita a qualquer hora e mais de uma vez.
 */
export function CartaoSobrecarga() {
  const sinalizacao = useSinalizarSobrecarga();
  const [confirmando, setConfirmando] = useState(false);
  const [confirmacao, setConfirmacao] = useState<string>();

  // Cada etapa troca os botões de lugar e o leitor de tela perde o foco: o
  // anúncio diz o que apareceu (RNF08 também para quem não vê a tela).
  function abrir() {
    setConfirmacao(undefined);
    sinalizacao.reset();
    setConfirmando(true);
    AccessibilityInfo.announceForAccessibility(t.pergunta);
  }

  function confirmar() {
    sinalizacao.mutate(undefined, {
      onSuccess: () => {
        setConfirmando(false);
        setConfirmacao(t.sinalizado);
        AccessibilityInfo.announceForAccessibility(t.sinalizado);
      },
      onError: (erro) => AccessibilityInfo.announceForAccessibility(mensagemDeErro(erro)),
    });
  }

  return (
    <View style={styles.cartao}>
      <Texto accessibilityRole="header" style={styles.titulo}>
        {t.titulo}
      </Texto>
      {confirmando ? (
        <>
          <Texto>{t.pergunta}</Texto>
          {sinalizacao.isError && <Aviso>{mensagemDeErro(sinalizacao.error)}</Aviso>}
          <Botao
            titulo={t.confirmar}
            rotuloAcessivel={t.confirmar}
            carregando={sinalizacao.isPending}
            onPress={confirmar}
          />
          {/* Sempre disponível: numa conexão parada, a usuária não fica presa. */}
          <Botao titulo={t.cancelar} variante="link" onPress={() => setConfirmando(false)} />
        </>
      ) : (
        <>
          {confirmacao ? <Confirmacao>{confirmacao}</Confirmacao> : <Texto suave>{t.convite}</Texto>}
          <Botao titulo={t.abrir} variante="link" onPress={abrir} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    padding: espaco.md,
    gap: espaco.sm,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
  },
  titulo: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
});
