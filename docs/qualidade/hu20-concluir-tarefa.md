# Verificacao da HU20 - concluir tarefa

Issue: [#80](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/80).
Branch: `feat/issue-80-concluir-tarefa`, baseada na `main` em `82b02b0`, que ja
contem a edicao/exclusao da #79. Este PR acrescenta apenas a conclusao de tarefas.

## Escopo e decisoes

- `POST /tarefas/:id/conclusao` marca a tarefa como concluida com o instante do
  `Relogio` injetado. O corpo e vazio: a usuaria nao fornece a data de conclusao.
- Repetir a operacao preserva a primeira data; chamadas simultaneas nao duplicam
  o registro. A escrita condicional ocorre dentro de uma transacao.
- Titulo, prazo, prioridade, energia, duracao e planejamento nao mudam.
- `GET /tarefas` continua trazendo apenas abertas; `GET /tarefas/concluidas`
  traz as concluidas da conta, da mais recente para a mais antiga.
- Ambas as novas rotas exigem sessao. Concluir uma tarefa de outra conta e
  negado; a lista nao expoe registros de outra usuaria (RNF03).
- O detalhe oferece `Concluir tarefa`; apos a resposta confirmada, mostra a
  data no fuso da usuaria. O app separa `Em aberto` e `Concluidas`.
- A tarefa concluida continua consultavel, editavel e excluivel, sem perder a
  data de conclusao. Adiar continua bloqueado. Reabertura nao faz parte da HU20.
- O cache move a resposta confirmada entre as listas, sem duplicar, e remove
  uma exclusao tambem do historico de concluidas.

Nao ha migration, tabela, dependencia ou lockfile novo: `concluidaEm` ja existe
no banco e no contrato compartilhado integrado pela #79.

## Testes

- Caixa branca: testes de `concluir` e `listarConcluidas`, cobrindo conta dona,
  ausencia do registro, escrita condicional, relogio, repeticao e ordenacao.
- Caixa preta da API: HTTP com PostgreSQL local, cobrindo persistencia da data,
  listas, repeticao, chamadas concorrentes, corpo invalido, acesso indevido,
  identificadores invalidos e regressao de editar, excluir e adiar.
- A fixture da HU36 inclui uma tarefa adiada e concluida para verificar a
  remocao desses dados ao excluir a conta.
- Jest do app: amplia os testes de cache da #79 para movimentacao entre listas,
  repeticao, ordenacao, edicao de concluida e exclusao do historico.
- Testes de tela verificam a data no fuso da usuaria, o detalhe da concluida,
  a mensagem de lista vazia e a disponibilidade de adiamento apenas nas abertas.

Executar os comandos um por vez, com PostgreSQL e Mailpit locais:

```bash
npm run build -w @mindcycle/shared
npm run prisma:generate -w @mindcycle/api
npm run typecheck
npm run lint
npm run test -w @mindcycle/shared -- --maxWorkers=1
npm run test -w @mindcycle/api -- --maxWorkers=1
npm run test -w @mindcycle/app -- --runInBand
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 1 --output-dir /tmp/mindcycle-issue80-android
```

## Conferencia humana

- [ ] Concluir uma tarefa e conferir a data no detalhe e em `Concluidas`.
- [ ] Conferir que ela saiu de `Em aberto`, sem duplicar em `Concluidas`.
- [ ] Fechar/reabrir o app e verificar a persistencia da conclusao.
- [ ] Conferir a data perto da meia-noite no fuso do aparelho.
- [ ] Editar uma concluida e verificar que a data foi preservada.
- [ ] Excluir uma concluida e verificar sua remocao do historico.
- [ ] Conferir fonte ampliada, carregamento, rede indisponivel e envios repetidos.
- [ ] Outro integrante revisar os textos novos.
- [ ] Ensaiar no APK de release e registrar evidencias na matriz Android.

Bundle e testes HTTP nao substituem a verificacao da interface no aparelho.
Quando a HU13 for integrada, verificar tambem a retirada da tarefa concluida da
recomendacao do dia; sua fonte de tarefas abertas ja filtra `concluidaEm: null`.
