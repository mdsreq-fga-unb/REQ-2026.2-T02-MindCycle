import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import {
  SINTOMAS,
  type Checkin,
  type Intensidade,
  type Nivel,
  type RegistroCheckinDto,
  type Sintoma,
} from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Chip, SeletorNivel, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { useAplicarCheckin } from './consulta';

type Marcados = Partial<Record<Sintoma, Intensidade>>;

// Um toque marca como leve; os seguintes sobem a intensidade e, depois de
// intensa, desmarcam.
const proxima = (atual?: Intensidade): Intensidade | undefined =>
  atual === undefined ? 1 : atual === 3 ? undefined : ((atual + 1) as Intensidade);

/**
 * HU04, RNF04: disposição, sintomas e "Registrar" bastam para concluir (3 toques).
 * Com `registro`, o mesmo formulário corrige aquele registro em vez de criar outro.
 */
export function FormularioCheckin({
  registro,
  aoConcluir,
  aoCancelar,
}: {
  registro?: Checkin;
  aoConcluir: (checkin: Checkin) => void;
  aoCancelar?: () => void;
}) {
  const aplicar = useAplicarCheckin();
  const [disposicao, setDisposicao] = useState<Nivel | undefined>(registro?.disposicao);
  const [semSintomas, setSemSintomas] = useState(registro?.semSintomas ?? false);
  const [marcados, setMarcados] = useState<Marcados>(() =>
    Object.fromEntries(registro?.sintomas.map((s) => [s.sintoma, s.intensidade]) ?? []),
  );
  const [erroLocal, setErroLocal] = useState<string>();
  const envio = useMutation({
    mutationFn: (dados: RegistroCheckinDto) =>
      registro ? api.corrigirCheckin(registro.id, dados) : api.registrarCheckin(dados),
    onSuccess: (checkin) => {
      void aplicar(checkin, !registro);
      aoConcluir(checkin);
    },
  });

  function editado() {
    setErroLocal(undefined);
    envio.reset();
  }

  function tocarSintoma(sintoma: Sintoma) {
    const intensidade = proxima(marcados[sintoma]);
    const { [sintoma]: _anterior, ...restantes } = marcados;
    setMarcados(intensidade === undefined ? restantes : { ...restantes, [sintoma]: intensidade });
    // Marcar um sintoma desfaz "Sem sintomas".
    setSemSintomas(false);
    editado();
    AccessibilityInfo.announceForAccessibility(
      textos.checkin.sintomas.anuncio(
        textos.checkin.sintomas.nomes[sintoma],
        intensidade && textos.checkin.sintomas.intensidades[intensidade],
      ),
    );
  }

  function tocarSemSintomas() {
    const marcar = !semSintomas;
    setSemSintomas(marcar);
    // "Sem sintomas" não convive com sintomas marcados.
    if (marcar) {
      setMarcados({});
    }
    editado();
  }

  function enviar() {
    if (disposicao === undefined) {
      setErroLocal(textos.checkin.disposicaoVazia);
      return;
    }
    const sintomas = SINTOMAS.flatMap((sintoma) => {
      const intensidade = marcados[sintoma];
      return intensidade === undefined ? [] : [{ sintoma, intensidade }];
    });
    if (!semSintomas && sintomas.length === 0) {
      setErroLocal(textos.checkin.sintomasVazios);
      return;
    }
    setErroLocal(undefined);
    envio.mutate({ disposicao, semSintomas, sintomas });
  }

  const { sintomas: textosSintomas } = textos.checkin;
  return (
    <View style={{ gap: espaco.md }}>
      <SeletorNivel
        rotulo={textos.checkin.disposicao.rotulo}
        rotulos={textos.checkin.disposicao.niveis}
        valor={disposicao}
        aoMudar={(nivel) => {
          setDisposicao(nivel);
          editado();
        }}
      />
      <View style={{ gap: espaco.xs }}>
        <Texto accessibilityRole="header" style={{ fontWeight: '600', fontSize: 14 }}>
          {textosSintomas.rotulo}
        </Texto>
        <Texto suave style={{ fontSize: 14 }}>
          {textosSintomas.dica}
        </Texto>
      </View>
      <View style={styles.chips}>
        <Chip
          rotulo={textosSintomas.semSintomas}
          marcado={semSintomas}
          dica={textosSintomas.semSintomasDica}
          onPress={tocarSemSintomas}
        />
        {SINTOMAS.map((sintoma) => {
          const intensidade = marcados[sintoma];
          const nome = textosSintomas.nomes[sintoma];
          const nivel = intensidade && textosSintomas.intensidades[intensidade];
          return (
            <Chip
              key={sintoma}
              rotulo={nome}
              detalhe={nivel}
              marcado={intensidade !== undefined}
              rotuloAcessivel={nivel ? `${nome}, ${nivel}` : nome}
              onPress={() => tocarSintoma(sintoma)}
            />
          );
        })}
      </View>
      <Aviso>{erroLocal ?? (envio.isError && mensagemDeErro(envio.error))}</Aviso>
      <Botao
        titulo={registro ? textos.checkin.salvarCorrecao : textos.checkin.registrar}
        carregando={envio.isPending}
        onPress={enviar}
      />
      {aoCancelar && (
        <Botao titulo={textos.checkin.cancelar} variante="link" onPress={aoCancelar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
});
