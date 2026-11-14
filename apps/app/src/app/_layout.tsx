import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SessaoProvider, useSessao } from '@/sessao/sessao';
import { textos } from '@/textos';
import { Botao, Tela, Texto, Titulo } from '@/ui/componentes';
import { cores } from '@/ui/tema';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessaoProvider>
        <StatusBar style="dark" />
        <Navegacao />
      </SessaoProvider>
    </QueryClientProvider>
  );
}

// Cada grupo de telas só existe no estado certo da sessão; fora dele, o
// Expo Router leva para a primeira tela disponível.
function Navegacao() {
  const { carregando, autenticada, conta, erroConta, recarregarConta } = useSessao();

  if (carregando) {
    return null;
  }
  SplashScreen.hide();

  if (erroConta) {
    return (
      <Tela>
        <Titulo>{textos.conexao.titulo}</Titulo>
        <Texto suave>{textos.conexao.texto}</Texto>
        <Botao titulo={textos.conexao.tentarDeNovo} onPress={recarregarConta} />
      </Tela>
    );
  }

  const termosAceitos = conta?.termosAceitos ?? false;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: cores.ground },
      }}>
      <Stack.Protected guard={!autenticada}>
        <Stack.Screen name="entrar" />
        <Stack.Screen name="cadastro" />
      </Stack.Protected>
      {/* HU12, RNF02: nada é registrado antes do aceite dos termos. */}
      <Stack.Protected guard={autenticada && !termosAceitos}>
        <Stack.Screen name="termos" />
      </Stack.Protected>
      <Stack.Protected guard={autenticada && termosAceitos}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
