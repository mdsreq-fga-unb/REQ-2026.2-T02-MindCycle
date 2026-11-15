import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { horaLocal } from '@mindcycle/shared';

import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Texto } from '@/ui/componentes';
import { cores, espaco, raio } from '@/ui/tema';

import { useCheckinsDoDia } from './consulta';
import { FormularioCheckin } from './formulario-checkin';
import { ResumoCheckin } from './resumo-checkin';

/**
 * HU04, RNF04: o registro rápido da tela inicial. Sem registro hoje, o formulário
 * já está aberto; com um, o cartão mostra o vigente do dia.
 */
export function CartaoCheckin() {
  const { conta } = useSessao();
  const doDia = useCheckinsDoDia();
  const [novoRegistro, setNovoRegistro] = useState(false);
  const [confirmacao, setConfirmacao] = useState<string>();

  const vigente = doDia.data?.vigente;
  return (
    <View style={styles.cartao}>
      <Texto accessibilityRole="header" style={styles.titulo}>
        {textos.checkin.titulo}
      </Texto>
      {doDia.isPending && <Texto suave>{textos.checkin.carregando}</Texto>}
      {doDia.isError && (
        <View style={{ gap: espaco.sm }}>
          <Aviso>{mensagemDeErro(doDia.error)}</Aviso>
          <Botao
            titulo={textos.conexao.tentarDeNovo}
            variante="link"
            onPress={() => void doDia.refetch()}
          />
        </View>
      )}
      {doDia.data && (!vigente || novoRegistro) && (
        <>
          {!vigente && <Texto suave>{textos.checkin.subtitulo}</Texto>}
          <FormularioCheckin
            aoConcluir={() => {
              setNovoRegistro(false);
              setConfirmacao(textos.checkin.registrado);
            }}
            aoCancelar={novoRegistro ? () => setNovoRegistro(false) : undefined}
          />
        </>
      )}
      {vigente && !novoRegistro && (
        <>
          <Confirmacao>{confirmacao}</Confirmacao>
          <Texto style={{ fontWeight: '600' }}>{textos.checkin.hoje.titulo}</Texto>
          {conta && (
            <Texto suave>
              {textos.checkin.hoje.registradoAs(horaLocal(new Date(vigente.criadoEm), conta.fuso))}
            </Texto>
          )}
          <ResumoCheckin checkin={vigente} />
          <Botao
            titulo={textos.checkin.hoje.corrigir}
            variante="link"
            onPress={() =>
              router.push({ pathname: '/registro-corrigir', params: { id: vigente.id } })
            }
          />
          <Botao
            titulo={textos.checkin.hoje.novo}
            variante="link"
            onPress={() => {
              setConfirmacao(undefined);
              setNovoRegistro(true);
            }}
          />
        </>
      )}
      <Botao
        titulo={textos.checkin.hoje.verRegistros}
        variante="link"
        onPress={() => router.push('/registros')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    padding: espaco.md,
    gap: espaco.md,
    borderRadius: raio.campo,
    backgroundColor: cores.white,
    borderWidth: 1,
    borderColor: cores.blush,
  },
  titulo: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
});
