import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { View } from 'react-native';
import { CodigoErro, formatarDataBr, lerDataBr, mascararDataBr } from '@mindcycle/shared';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Confirmacao, Texto } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { chaveCiclo } from './consulta';

/** HU06. O padrão é hoje; para outro dia, a usuária digita a data. */
export function RegistrarInicio({ hoje }: { hoje: string }) {
  const queryClient = useQueryClient();
  const [texto, setTexto] = useState(formatarDataBr(hoje));
  const [erroLocal, setErroLocal] = useState<string>();
  const registro = useMutation({
    mutationFn: api.registrarInicio,
    onSuccess: () => {
      setTexto(formatarDataBr(hoje));
      return queryClient.invalidateQueries({ queryKey: chaveCiclo });
    },
  });

  function registrar() {
    const data = lerDataBr(texto);
    if (!data) {
      setErroLocal(textos.ciclo.inicio.dataInvalida);
    } else if (data > hoje) {
      // A API também recusa; conferir aqui poupa a ida e volta.
      setErroLocal(textos.erros[CodigoErro.DataNoFuturo]);
    } else {
      setErroLocal(undefined);
      registro.mutate(data);
    }
  }

  return (
    <View style={{ gap: espaco.md }}>
      <Texto accessibilityRole="header" style={{ fontWeight: '700' }}>
        {textos.ciclo.inicio.titulo}
      </Texto>
      <Campo
        rotulo={textos.ciclo.inicio.rotulo}
        value={texto}
        onChangeText={(novo) => {
          setTexto(mascararDataBr(novo));
          setErroLocal(undefined);
          registro.reset();
        }}
        keyboardType="number-pad"
        maxLength={10}
        placeholder={textos.ciclo.inicio.formato}
      />
      <Aviso>{erroLocal ?? (registro.isError && mensagemDeErro(registro.error))}</Aviso>
      <Confirmacao>
        {registro.isSuccess && textos.ciclo.inicio.registrado(formatarDataBr(registro.data.data))}
      </Confirmacao>
      <Botao
        titulo={textos.ciclo.inicio.botao}
        carregando={registro.isPending}
        onPress={registrar}
      />
    </View>
  );
}
