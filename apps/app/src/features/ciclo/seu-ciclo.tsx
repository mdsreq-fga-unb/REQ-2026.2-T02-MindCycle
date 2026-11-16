import { formatarDataBr, type Ciclo } from '@mindcycle/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { View } from 'react-native';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Texto, Titulo } from '@/ui/componentes';
import { espaco } from '@/ui/tema';

import { chaveCiclo } from './consulta';
import { FasesDoCiclo } from './fases-do-ciclo';

/**
 * A aba Ciclo depois de informado o ciclo, como a tela "Seu ciclo" do protótipo.
 * A situação do ciclo (HU05) e o calendário (HU10) entram aqui, acima das fases.
 */
export function SeuCiclo({ ciclo, hoje }: { ciclo: Ciclo; hoje: string }) {
  const queryClient = useQueryClient();
  const t = textos.ciclo.seuCiclo;
  const ultimo = ciclo.inicios[0];
  const registradoHoje = ultimo?.data === hoje;

  // HU06 em um toque: o início de hoje. Outro dia, em "Editar meu ciclo".
  const registro = useMutation({
    mutationFn: () => api.registrarInicio(hoje),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chaveCiclo }),
  });

  return (
    <>
      <Titulo>{t.titulo}</Titulo>
      <View style={{ gap: espaco.xs }}>
        {ultimo && <Texto>{t.ultimoInicio(formatarDataBr(ultimo.data))}</Texto>}
        {ciclo.perfil && (
          <Texto suave>
            {ciclo.perfil.irregular || ciclo.perfil.duracaoMedia === null
              ? t.irregular
              : t.duracao(ciclo.perfil.duracaoMedia)}
          </Texto>
        )}
      </View>
      {registradoHoje ? (
        <Confirmacao>{t.registradoHoje}</Confirmacao>
      ) : (
        <Botao titulo={t.comecou} carregando={registro.isPending} onPress={() => registro.mutate()} />
      )}
      <Aviso>{registro.isError && mensagemDeErro(registro.error)}</Aviso>
      {/* Por enquanto as fases ficam no rodapé; HU05 e HU10 vão ocupar o meio. */}
      <View style={{ flexGrow: 1 }} />
      <FasesDoCiclo />
      <Botao titulo={t.editar} variante="link" onPress={() => router.push('/editar-ciclo')} />
    </>
  );
}
