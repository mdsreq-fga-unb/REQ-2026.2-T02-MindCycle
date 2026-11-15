import { router } from 'expo-router';

import { ConteudoTermos } from '@/features/termos/conteudo-termos';
import { useTermos } from '@/features/termos/consulta';
import { textos } from '@/textos';
import { Botao, Tela, Titulo } from '@/ui/componentes';

// HU12: consultar depois do aceite não cria nem altera um consentimento.
export default function TermosConsultar() {
  const termos = useTermos();
  return (
    <Tela>
      <Titulo>{textos.termos.consultar}</Titulo>
      <ConteudoTermos consulta={termos} />
      <Botao
        titulo={textos.termos.voltar}
        variante="link"
        onPress={() => {
          if (router.canGoBack()) router.back();
          else router.replace('/conta');
        }}
      />
    </Tela>
  );
}
