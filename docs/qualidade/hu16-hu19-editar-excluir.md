# Verificacao das HUs 16 e 19 - editar e excluir tarefa

Issue: [#79](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/79).
Branch: `feat/issue-79-editar-excluir`, baseada na `main` em `28c15e4`.
Inclui a HU18 e os PRs #107 e #108 ja integrados. A conclusao de tarefas fica
na issue #80, fora desta entrega.

## Escopo e decisoes

- `Ver tarefa` abre o detalhe para consultar, editar ou confirmar a exclusao.
- A edicao reaproveita o formulario de cadastro, com os dados atuais preenchidos.
- `PUT /tarefas/:id` altera titulo, prazo, prioridade, energia e duracao opcional,
  sem duplicar a tarefa nem alterar planejamento, cadastro ou historico de adiamento.
- Duracao vazia ou `null` remove a estimativa. Prazo passado e aceito na edicao
  para permitir corrigir tarefas atrasadas; as regras de cadastro nao mudam.
- `DELETE /tarefas/:id` remove a tarefa e seu historico em cascata, apos confirmacao
  no app. Cancelar nao envia a exclusao.
- Consultar, editar e excluir exigem sessao e respeitam a conta dona (RNF03).
- Respostas confirmadas atualizam lista e detalhe antes da reconsulta. Consultas
  anteriores sao canceladas para nao sobrescrever essas respostas.
- O contrato expoe o campo `concluidaEm` ja existente no banco para respeitar o
  estado do registro; nao ha endpoint, botao ou lista de conclusao nesta branch.
- O seletor de prioridade/energia fica desabilitado durante o envio, assim como
  os campos e o cancelamento. Os valores padrao do componente nao mudam.

Nao ha migration nem alteracao de dependencias ou lockfile. Os testes do app
usam o Jest ja adotado na main; API e pacote compartilhado continuam no Vitest.

## Testes

Os testes unitarios do servico exercitam os caminhos internos de escrita,
propriedade, ausencia do registro e remocao concorrente (caixa branca).
Os testes HTTP verificam edicao, validacao, exclusao, historico e isolamento de
contas no PostgreSQL local (caixa preta da API, nao da interface Android).
Os testes de cache verificam atualizacao sem duplicacao, ordenacao, exclusao,
ausencia de lista carregada e resposta antiga em andamento.

Executar um comando por vez e usar apenas o banco local de testes:

```bash
npm run build -w @mindcycle/shared
npm run prisma:generate -w @mindcycle/api
npm run typecheck
npm run lint
npm run test -w @mindcycle/shared -- --maxWorkers=1
npm run test -w @mindcycle/api -- --maxWorkers=1
npm run test -w @mindcycle/app -- --runInBand
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1 manutencao-tarefa.e2e-spec.ts tarefas.e2e-spec.ts
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 1 --output-dir /tmp/mindcycle-issue79-android
```

### Resultado local em 15/11/2026

- 85 testes unitarios aprovados: 59 do pacote compartilhado e 26 da API.
- 55 testes HTTP de tarefas aprovados no banco local `mindcycle_test`.
- Bundle Android gerado com um unico worker e heap Node limitado a 512 MiB
  por processo; nenhuma dependencia foi instalada nesta verificacao.
- Tipos do pacote compartilhado e da API aprovados; build e lint da API aprovados.
- Tipos e lint do codigo de producao do app aprovados, com configuracao temporaria
  que exclui os arquivos de teste. Isso nao substitui as checagens completas do app.
- Seis verificacoes diretas do cache aprovadas com `node:test` e os modulos reais,
  em script temporario fora do repositorio; nao sao uma execucao da suite Jest.
- As novas dependencias de teste de tela da main (`@jest/globals` e
  `@testing-library/react-native`) nao estao instaladas no ambiente reaproveitado.
  Por isso, `npm run typecheck` e `npm run lint` completos falham por imports de
  teste ausentes, e a suite Jest fica pendente para o CI. Nao foi feita outra
  instalacao apos os encerramentos do VS Code por pressao de memoria.
- A suite e2e completa, a suite Jest, tipos/lint completos e o APK de release
  devem ser conferidos nos checks do PR antes do merge.

## Conferencia humana

- [ ] Abrir uma tarefa, editar, salvar e conferir a lista sem duplicacao.
- [ ] Cancelar a edicao e verificar que nada foi salvo.
- [ ] Editar uma tarefa adiada e conferir que a data planejada foi preservada.
- [ ] Remover a duracao opcional e corrigir um prazo passado.
- [ ] Cancelar uma exclusao; depois confirmar e conferir que a tarefa sumiu.
- [ ] Fechar e reabrir o app e verificar a persistencia das alteracoes.
- [ ] Conferir fonte ampliada, teclado, rede indisponivel e envio repetido.
- [ ] Ensaiar no APK de release e registrar evidencias na matriz Android.
- [ ] Outro integrante revisar os textos novos.

A recomendacao do dia (HU13) ainda nao existe nesta base; ao integra-la, conferir
tambem a remocao de tarefas excluidas. Bundle e testes HTTP nao substituem o APK.
