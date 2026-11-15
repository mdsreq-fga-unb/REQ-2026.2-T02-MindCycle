import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import {
  CodigoErro,
  TIPOS_PIN,
  type DefinicaoPinDto,
  type Pin,
  type TipoPin,
} from '@mindcycle/shared';

import { ErroApi } from '@/api/cliente';
import { api } from '@/api/endpoints';
import { mensagemDeErroDeSenha } from '@/features/conta/erro-de-senha';
import { OpcaoTipoPin } from '@/features/conta/opcao-tipo-pin';
import { useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Aviso, Botao, Campo, Tela, Texto, Titulo } from '@/ui/componentes';
import { PinEntrada } from '@/ui/pin-entrada';
import { espaco } from '@/ui/tema';

type Etapa = 'tipo' | 'senha' | 'pin' | 'confirmacao';

// HU11: definir ou trocar o PIN e o tipo dele. Pede o tipo, a senha, o PIN e o
// mesmo PIN de novo; o servidor confere a senha ao salvar. O tipo vem antes
// porque é a escolha que muda o resto da tela, e a senha só pesa quando a
// usuária já sabe o que vai fazer.
export default function DefinirPin() {
  const { conta, destravar } = useSessao();
  const queryClient = useQueryClient();
  const [etapa, setEtapa] = useState<Etapa>('tipo');
  // Ao trocar, o tipo atual já vem marcado.
  const [tipo, setTipo] = useState<TipoPin | undefined>(conta?.tipoPin ?? undefined);
  const [senha, setSenha] = useState('');
  const [primeiro, setPrimeiro] = useState<Pin>();
  const [aviso, setAviso] = useState<string>();

  const salvar = useMutation({
    mutationFn: api.definirPin,
    onSuccess: async () => {
      // A sessão atual já provou quem é: sem isto, a conta com PIN novo
      // travaria o app na hora.
      destravar();
      await queryClient.invalidateQueries({ queryKey: ['conta'] });
      router.back();
    },
    onError: (e) => {
      setAviso(mensagemDeErroDeSenha(e));
      setPrimeiro(undefined);
      // Senha errada volta para a senha; qualquer outra falha, para o PIN.
      setEtapa(
        e instanceof ErroApi && e.codigo === CodigoErro.CredenciaisInvalidas
          ? 'senha'
          : 'pin',
      );
    },
  });

  function escolher(pin: Pin) {
    setPrimeiro(pin);
    setAviso(undefined);
    setEtapa('confirmacao');
  }

  function confirmar(pin: Pin) {
    if (!tipo || !primeiro || primeiro.some((valor, i) => valor !== pin[i])) {
      setPrimeiro(undefined);
      setAviso(textos.pin.definir.diferente);
      setEtapa('pin');
      return;
    }
    // O servidor valida a faixa do tipo; aqui o tipo e o PIN vêm do mesmo componente.
    salvar.mutate({ tipo, pin, senha } as DefinicaoPinDto);
  }

  const titulo = conta?.tipoPin
    ? textos.pin.definir.tituloTroca
    : textos.pin.definir.tituloNovo;

  return (
    <Tela>
      <Titulo>{titulo}</Titulo>
      {etapa === 'tipo' && (
        <>
          <Texto>{textos.pin.definir.tipo}</Texto>
          <Texto suave>{textos.pin.definir.tipoSubtitulo}</Texto>
          <View accessibilityRole="radiogroup" style={{ gap: espaco.sm }}>
            {TIPOS_PIN.map((opcao) => (
              <OpcaoTipoPin
                key={opcao}
                tipo={opcao}
                marcada={tipo === opcao}
                onPress={() => setTipo(opcao)}
              />
            ))}
          </View>
          {tipo && (
            <Botao
              titulo={textos.pin.definir.continuar}
              onPress={() => setEtapa('senha')}
            />
          )}
        </>
      )}
      {etapa === 'senha' && (
        <>
          <Texto suave>{textos.pin.definir.senhaSubtitulo}</Texto>
          <Campo
            rotulo={textos.pin.definir.senha}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoComplete="current-password"
            onSubmitEditing={() => senha && setEtapa('pin')}
          />
          <Aviso>{aviso}</Aviso>
          <Botao
            titulo={textos.pin.definir.continuar}
            onPress={() => {
              if (senha) {
                setAviso(undefined);
                setEtapa('pin');
              }
            }}
          />
        </>
      )}
      {etapa === 'pin' && tipo && (
        <>
          <Texto>{textos.pin.definir.escolher}</Texto>
          <Texto suave>{textos.pin.definir.escolherSubtitulo[tipo]}</Texto>
          <PinEntrada tipo={tipo} aoCompletar={escolher} />
          <Aviso>{aviso}</Aviso>
        </>
      )}
      {etapa === 'confirmacao' && tipo && (
        <>
          <Texto>{textos.pin.definir.confirmar}</Texto>
          <Texto suave>{textos.pin.definir.confirmarSubtitulo}</Texto>
          <PinEntrada tipo={tipo} aoCompletar={confirmar} desabilitado={salvar.isPending} />
        </>
      )}
      <Botao
        titulo={textos.pin.definir.cancelar}
        variante="link"
        onPress={() => router.back()}
      />
    </Tela>
  );
}
