import { StyleSheet, View } from 'react-native';
import type { SugestaoAcolhimento } from '@mindcycle/shared';

import { textos } from '@/textos';
import { Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

const t = textos.acolhimento.sugestoes;

/**
 * HU21: as práticas sugeridas para o dia. Cada cartão mostra a prática e quanto
 * tempo ela leva — o "breve" do RF21 fica à vista, não só no contrato da API.
 *
 * Não há nada para tocar: a sugestão é um convite, e aceitar ou não é fora do app.
 */
export function ListaSugestoes({ sugestoes }: { sugestoes: SugestaoAcolhimento[] }) {
  if (sugestoes.length === 0) {
    return <Texto suave>{t.vazio}</Texto>;
  }
  return (
    <View style={styles.lista}>
      {sugestoes.map((sugestao) => {
        const nome = t.nomes[sugestao.id];
        return (
          <View
            key={sugestao.id}
            accessible
            accessibilityLabel={t.rotuloAcessivel(nome, sugestao.duracaoMinutos)}
            style={styles.cartao}>
            <View style={styles.cabecalho}>
              <Texto style={styles.nome}>{nome}</Texto>
              <Texto suave>{t.duracao(sugestao.duracaoMinutos)}</Texto>
            </View>
            <Texto suave>{t.comoFazer[sugestao.id]}</Texto>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  lista: { gap: espaco.sm },
  cartao: {
    padding: espaco.md,
    gap: espaco.xs,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
  },
  // A duração fica ao lado do nome, e desce para baixo dele na fonte ampliada.
  cabecalho: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: espaco.sm,
  },
  nome: { fontWeight: '700' },
});
