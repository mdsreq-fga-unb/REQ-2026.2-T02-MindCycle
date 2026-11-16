import { formatarDataBr, type Ciclo } from '@mindcycle/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

import { api } from '@/api/endpoints';
import { mensagemDeErro } from '@/api/mensagem-de-erro';
import { textos } from '@/textos';
import { Aviso, Botao, Confirmacao, Texto, Titulo } from '@/ui/componentes';
import { fonteTitulo } from '@/ui/tema';

import { CalendarioDoCiclo } from './calendario-do-ciclo';
import { chaveCiclo } from './consulta';
import { SintomasDaFase } from './sintomas-da-fase';
import { SituacaoDoCiclo } from './situacao-do-ciclo';

/**
 * A aba Ciclo depois de informado o ciclo, como a tela "Seu ciclo" do protótipo:
 * a situação (HU05), o calendário (HU10) com as fases como legenda (HU28) e o
 * registro do início em um toque (HU06).
 */
export function SeuCiclo({ ciclo, hoje }: { ciclo: Ciclo; hoje: string }) {
  const queryClient = useQueryClient();
  const t = textos.ciclo.seuCiclo;
  const registradoHoje = ciclo.inicios[0]?.data === hoje;

  // HU06 em um toque: o início de hoje. Outro dia, em "Editar meu ciclo".
  const registro = useMutation({
    mutationFn: () => api.registrarInicio(hoje),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chaveCiclo }),
  });

  return (
    <>
      <Titulo style={{ fontFamily: fonteTitulo, fontWeight: 'normal' }}>{t.titulo}</Titulo>
      <SituacaoDoCiclo situacao={ciclo.situacao} />
      {/* O que ela informou continua visível, mesmo sem estimativa. */}
      {ciclo.inicios[0] && (
        <Texto suave style={{ fontSize: 14, lineHeight: 20 }}>
          {t.resumo(
            formatarDataBr(ciclo.inicios[0].data),
            ciclo.perfil?.irregular ? null : (ciclo.perfil?.duracaoMedia ?? null),
          )}
        </Texto>
      )}
      <SintomasDaFase situacao={ciclo.situacao} />
      <CalendarioDoCiclo
        inicios={ciclo.inicios}
        perfil={ciclo.perfil}
        hoje={hoje}
        faseAtual={ciclo.situacao.estimada ? ciclo.situacao.fase : undefined}
      />
      {registradoHoje ? (
        <Confirmacao>{t.registradoHoje}</Confirmacao>
      ) : (
        <Botao
          titulo={t.comecou}
          variante="secundario"
          carregando={registro.isPending}
          onPress={() => registro.mutate()}
        />
      )}
      <Aviso>{registro.isError && mensagemDeErro(registro.error)}</Aviso>
      <Botao titulo={t.editar} variante="link" onPress={() => router.push('/editar-ciclo')} />
    </>
  );
}
