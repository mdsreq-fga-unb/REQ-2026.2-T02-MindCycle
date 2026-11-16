# Verificacao da HU15: reajustar recomendacao do dia

Referencia: [issue #84](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/84).

## Como funciona

- O reajuste nao tem gatilho proprio. A cada `GET /planejamento/hoje`, a API le a
  disposicao vigente (`CheckinService.disposicaoVigente`), calcula o que ainda falta
  mudar e grava so isso; pedir de novo nao muda nada. Um registro de disposicao (HU04),
  a correcao do registro vigente ou a sinalizacao de sobrecarga (HU02, que conta como
  disposicao baixa dentro de `disposicaoVigente`) reajustam a lista sem chamar codigo
  da HU15. No app, cada uma dessas acoes invalida `chavePlanoDoDia`, e a aba Hoje pede
  o plano de novo na hora (RNF07).
- As regras moram so em `apps/api/src/modules/planning/domain/reajustar.ts`, funcao
  pura. A lista que fica no dia segue a ordem da HU13 (`recomendar`).
- Tarefa com energia acima da disposicao e prazo depois de hoje passa para amanha: muda
  so a data planejada, e cada passagem vira uma linha de `movimentacoes_tarefa` com
  origem `reajuste`. Prazo hoje ou vencido nunca sai; a tarefa fica com o aviso sem
  cobranca da HU13.
- A aba Hoje mostra abaixo da lista a secao "Ficaram para amanha", com o prazo de cada
  uma e o botao "Trazer para hoje" (`POST /planejamento/hoje/movidas/:tarefaId/desfazimento`).
  A desfeita volta para a data planejada anterior e a linha ganha `desfeita_em`: ela nao
  sai de novo naquele dia.
- Se a disposicao sobe no mesmo dia, as movidas hoje pelo reajuste que agora cabem
  voltam para a data anterior e a linha ganha `devolvida_em`. A adiada pela usuaria
  (HU18), inclusive depois de uma passagem, nao volta. A movida cujo prazo passa a ser
  hoje (edicao da HU16) tambem volta, porque prazo hoje nunca fica fora do dia.
- A passagem de hoje e a que vai para amanha (`data_nova`): o dia sai da propria
  linha, como a `data_local` do check-in, e nao muda se a usuaria trocar de fuso.
- A gravacao e em lote: uma passagem de 1 ou de 30 tarefas custa os mesmos dois
  comandos na transacao. Com a API nos EUA e o banco em Sao Paulo
  ([deploy](../deploy.md)), um pedido do plano que reajusta faz cerca de seis idas e
  voltas ao banco (leituras, BEGIN, dois comandos, COMMIT, releitura), sem depender do
  numero de tarefas.
- Sem registro de disposicao no dia, nada se move: a media assumida da HU13 so ordena.
- Nenhum contador nem cobranca: a resposta so traz a lista, a disposicao e as movidas.

## Cobertura automatizada

| Camada | Arquivo | Verificacao |
|---|---|---|
| Dominio | `apps/api/src/modules/planning/domain/reajustar.spec.ts` | Um caso por regra: quem passa para amanha (energia, prazo, atrasadas, sem registro), prazo intacto e nunca ultrapassado, prazo hoje ou vencido no dia com aviso (inclusive atrasadas), desfazer (nao sai de novo hoje, sai no dia seguinte, so a passagem vigente, desfeita e depois adiada nao volta), volta quando a disposicao sobe (so as do reajuste de hoje que cabem, para a data anterior; adiadas pela usuaria nao voltam; passagem de ontem nao conta), prazo editado para hoje, sobe e desce, idempotencia, ordem da HU13 e resposta sem contador |
| Caixa branca | `apps/api/src/modules/planning/planejamento.service.spec.ts` | Mover ou trazer de volta 1 ou 30 tarefas custa os mesmos dois comandos; sem mudanca, nenhuma transacao (RNF07) |
| Caixa preta da API | `apps/api/test/reajuste.e2e-spec.ts` | HTTP com banco real: passagem com prazo intacto e historico, sem registro, prazo hoje e vencido, pedidos repetidos e simultaneos, correcao do registro vigente, desfazer (e no dia seguinte, 409 repetido ou sem passagem, concluida, 404/400/401), volta quando sobe, adiadas pela usuaria, prazo editado para hoje, trecho da API do RNF07 com 30 tarefas no banco local, RNF03 |
| Caixa preta da API | `apps/api/test/recomendacao.e2e-spec.ts` | Casos da HU13 ajustados: com registro no dia, a tarefa do grupo 3 passa para amanha |
| Exclusao de dados | `apps/api/test/exclusao-conta.e2e-spec.ts` | Passagem do reajuste desfeita apagada em cascata, sem afetar outra conta |
| Tela | `apps/app/src/features/plano-do-dia/reajuste.spec.tsx` | Secao das movidas com prazo e botao, nenhum numero alem de datas e posicoes, dia livre quando tudo saiu, trazer para hoje sem outra busca (inclusive a ultima, com a aba Tarefas carregando), aviso com o nome da tarefa quando ela mudou de lugar, aviso generico sem conexao, pedido do plano em andamento que nao desfaz o que voltou, lista reajustada na tela sem outro toque depois do registro, aba Tarefas refeita (inclusive na virada do dia), textos sem cobranca |

Comandos a partir da raiz, com PostgreSQL e Mailpit locais:

```bash
npm run build -w @mindcycle/shared
npm run prisma:generate -w @mindcycle/api
npm run typecheck
npm run lint
npm test
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 2 --output-dir /tmp/mindcycle-hu15-android
```

## Resultado local em 15/11/2026

Base: `feat/hu13-recomendar-tarefas` em `99cf7d9` (HU13, PR #110 ainda aberto, sobre
`main` em `28c15e4`). A `main` ja tem a HU16 (#109), que edita prazo e energia: o
dominio trata a movida cujo prazo passa a ser hoje; conferir o e2e da HU16 depois do
merge.

- Testes unitarios: 47 no shared, 79 na API (33 do dominio e 7 de caixa branca da
  HU15) e 27 de tela no app (15 da HU15), todos aprovados.
- 260 testes e2e aprovados, 18 deles da HU15 (17 em `reajuste.e2e-spec.ts` e o caso
  novo da HU36), com PostgreSQL e Mailpit locais.
- Tipos, lint, build da API (Node 26.5) e bundle Android aprovados.
- Checagem de mutacao: cada regra principal foi quebrada no codigo e derrubou ao menos
  um teste, depois foi restaurada. No dominio: prazo hoje ou vencido saindo do dia,
  desfeita saindo de novo, adiada pela usuaria voltando, energia igual a disposicao
  saindo, volta para hoje em vez da data anterior, volta sem caber, desfeita de outro
  dia bloqueando hoje, reajuste sem registro, passagem de outro dia valendo hoje e
  prazo editado para hoje ficando fora do dia. Na API (e2e): prazo hoje saindo do dia e
  desfazer sem marcar a passagem. No service: registrar passagem de tarefa que nao
  mudou. No app: esperar a aba Tarefas antes de confirmar, nao refazer o plano em
  andamento e ignorar a virada do dia.
- Trecho da API do RNF07 no banco local: registro e plano reajustado com 30 tarefas
  bem abaixo de 2 s. Nao vale como medicao do RNF07, que e no Android.
- Revisao independente em tres frentes (regras, API e app), cada achado conferido no
  codigo e corrigido, com nova conferencia dos revisores. Corrigidos: a confirmacao e o
  aviso do "Trazer para hoje" sumiam quando a ultima movida voltava; um pedido do plano
  em andamento podia trazer de volta a lista de antes do desfazer; a aba Tarefas nao era
  refeita quando a mesma tarefa mudava de dia na virada; texto de erro errado no
  desfazer; falha sem anuncio no iOS; mensagem antiga ficando depois de um novo registro;
  a gravacao fazia duas idas ao banco por tarefa (com a API nos EUA e o banco em Sao
  Paulo, 15 tarefas ja passariam de 2 s e do tempo limite da transacao); o dia da
  passagem dependia do fuso atual; a movida com prazo editado para hoje (HU16) ficava
  fora do dia; faltavam testes para a desfeita depois adiada, a atrasada que vence hoje
  e a passagem de ontem.
- Nao corrigido de proposito, para nao conflitar com a HU02: com todas as tarefas
  movidas, a lista ainda mostra o subtitulo da HU13 ("Uma ordem sugerida...") acima do
  texto de dia livre. Ver na revisao dos textos.
- O app nao foi aberto: falta o ensaio no aparelho.

## Decisoes e pendencias com a cliente

- As regras de quais tarefas saem do dia sao a proposta da equipe de 08/11/2026 e
  ainda nao foram validadas (rotulo `aguarda-cliente`). Validar na proxima reuniao com
  a Dra. Claudia.
- Gatilho: o reajuste e aplicado a partir do estado (disposicao vigente e passagens de
  hoje) a cada pedido do plano, e nao no momento do registro. A issue diz que ele
  dispara com o registro (HU04) ou a sobrecarga (HU02); esta e a leitura mais simples
  que reage aos dois sem acoplar os modulos. Efeitos a validar com a cliente:
  - uma tarefa cadastrada depois do registro, ou editada (HU16) para pedir mais energia,
    tambem passa para amanha no proximo pedido do plano;
  - uma atrasada que a usuaria adia (HU18) para hoje passa para amanha se pedir mais
    energia do que a disposicao.
  Nos dois casos ela aparece em "Ficaram para amanha" e pode voltar com um toque.
- Sem registro de disposicao no dia, nao ha reajuste.
- "Dia seguinte" e amanha no fuso da usuaria; como o prazo e depois de hoje, a nova data
  nunca passa do prazo.
- Desfazer e voltar levam a tarefa a data planejada que ela tinha antes do reajuste
  (hoje ou, para uma atrasada, o dia em que estava). Nos dois casos ela esta na lista
  de hoje.
- A desfeita nao sai de novo naquele dia, nem com um registro mais baixo; no dia
  seguinte as regras valem de novo para ela.
- A volta e automatica so para as passagens feitas pelo reajuste de hoje. A que a
  usuaria adiou (HU18), mesmo depois de uma passagem, fica onde ela escolheu.
- As movidas aparecem na ordem de desempate da HU13 (prazo, prioridade, energia,
  cadastro).

## Pendencias humanas do DoD

- [ ] Outro integrante revisar os textos novos em `apps/app/src/textos.ts` (secao `reajuste` e o erro `SEM_REAJUSTE_PARA_DESFAZER`).
- [ ] Medir no Android o RNF07: do toque em Registrar ate a lista reajustada aparecer (ate 2 s, condicao de aceite), em aparelho da [matriz Android](matriz-de-suporte-android.md), com a API ja acordada. No Render Free a API dorme depois de 15 min sem uso ([deploy](../deploy.md)); registrar as duas situacoes.
- [ ] Ensaiar no aparelho: registro baixo movendo tarefas, prazo hoje ficando com aviso, "Trazer para hoje", registro mais alto trazendo de volta, dia livre, erro de rede e leitor de tela.
- [ ] Registrar capturas e resultados com fonte normal/ampliada, aparelho e commit do APK.

O bundle Android nao substitui o ensaio visual, de acessibilidade ou de desempenho no aparelho.
