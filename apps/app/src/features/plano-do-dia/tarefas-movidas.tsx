import { StyleSheet, View } from 'react-native';
import { CodigoErro, formatarDataBr, type Tarefa } from '@mindcycle/shared';

import { ErroApi } from '@/api/cliente';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Botao, Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

const t = textos.reajuste;

// A tarefa mudou de lugar enquanto a usuária tocava: a lista é refeita. A
// concluída fica com o texto dela, de textos.erros.
const MUDOU = new Set<CodigoErro>([
  CodigoErro.SemReajusteParaDesfazer,
  CodigoErro.TarefaAlterada,
]);

/** O aviso de quando trazer para hoje não deu certo, com o nome da tarefa. */
export function avisoDoDesfazer(titulo: string, erro: unknown): string {
  if (erro instanceof ErroApi && erro.codigo && MUDOU.has(erro.codigo)) {
    return t.naoTrazida(titulo);
  }
  return mensagemDeErro(erro);
}

/**
 * HU15: as tarefas que o reajuste de hoje passou para amanhã. Cada uma pode
 * voltar para hoje com um toque; a que volta não é movida de novo no dia. O
 * pedido fica com quem chama, que continua na tela quando a seção some.
 */
export function TarefasMovidas({
  movidas,
  trazendo,
  aoTrazer,
}: {
  movidas: Tarefa[];
  /** A tarefa que está voltando agora, se alguma. */
  trazendo?: string;
  aoTrazer: (tarefa: Tarefa) => void;
}) {
  return (
    <View style={styles.secao}>
      <Texto accessibilityRole="header" style={styles.titulo}>
        {t.titulo}
      </Texto>
      <Texto suave>{t.explicacao}</Texto>
      {movidas.map((tarefa) => (
        <View key={tarefa.id} style={styles.cartao}>
          <Texto style={styles.destaque}>{tarefa.titulo}</Texto>
          <Texto suave>{textos.tarefas.item.prazo(formatarDataBr(tarefa.prazo))}</Texto>
          <Texto suave>
            {textos.tarefas.item.energia(textos.tarefas.niveis[tarefa.energia])}
          </Texto>
          <Botao
            titulo={t.trazer}
            rotuloAcessivel={t.rotuloTrazer(tarefa.titulo)}
            variante="link"
            carregando={trazendo === tarefa.id}
            desabilitado={trazendo !== undefined}
            onPress={() => aoTrazer(tarefa)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { gap: espaco.sm, marginTop: espaco.sm },
  titulo: { fontSize: 17, lineHeight: 24, fontWeight: '700' },
  cartao: {
    padding: espaco.md,
    gap: espaco.xs,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
    borderStyle: 'dashed',
  },
  destaque: { fontWeight: '700' },
});
