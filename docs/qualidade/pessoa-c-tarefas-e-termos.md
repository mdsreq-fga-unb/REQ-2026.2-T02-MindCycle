# Verificacao das HUs da pessoa C

Base: `main` em `96febb5`, com o adiamento da HU18 integrado.

## Escopo e rastreabilidade

| Issue | Fluxo | Cobertura |
|---|---|---|
| [#79](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/79) | HU16: editar a mesma tarefa, sem duplicar ou mover o planejamento | Contrato compartilhado, teste unitario do servico e e2e de manutencao |
| #79 | HU19: confirmar exclusao e remover tarefa/historico | Teste unitario, e2e de exclusao, consultas e RNF03 |
| [#80](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/80) | HU20: concluir, preservar o instante inicial e consultar concluidas | Teste unitario, e2e sequencial/concorrente, ordenacao e RNF03 |
| [#69](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/69) | HU12: manter o texto aprovado e impedir gravacao de saude antes do aceite | Teste unitario de consentimento e e2e das rotas reais de ciclo/check-in |

Os testes unitarios verificam caminhos internos (caixa branca); os e2e verificam
o comportamento HTTP com PostgreSQL local (caixa preta da API), nao a interface Android.

## Decisoes de implementacao

- `PUT /tarefas/:id` altera titulo, prazo, prioridade, energia e duracao opcional.
  Omitir ou enviar `null` na duracao remove essa estimativa. A edicao aceita prazo
  passado, inclusive para corrigir tarefas atrasadas; cadastro e adiamento nao mudam.
- `DELETE /tarefas/:id` remove a tarefa e o historico em cascata, inclusive se concluida.
- `POST /tarefas/:id/conclusao` recebe corpo vazio e usa o `Relogio` injetado.
  Repetir a operacao nao altera a data original. Nao ha reabertura nesta entrega.
- `GET /tarefas` continua listando apenas abertas. `GET /tarefas/concluidas` lista
  somente as concluidas da propria conta, da mais recente para a mais antiga.
- A resposta de tarefa acrescenta `concluidaEm` (ISO ou `null`); o app apresenta
  a data no fuso da usuaria. O campo ja existia no banco: nao ha nova migration.
- O texto e a versao dos termos foram preservados. A aprovacao da cliente esta
  registrada na issue #69; apenas a identificacao obsoleta de rascunho foi retirada.
- A recomendacao do dia (HU13) ainda nao existe nesta base. A exclusao e a conclusao
  removem o item da fonte de tarefas abertas; o fluxo integrado deve ser ensaiado
  quando a recomendacao for incorporada.

## Comandos de verificacao

Usar apenas PostgreSQL e Mailpit locais, nunca o banco de producao.

```bash
npm run build -w @mindcycle/shared
npm run typecheck
npm run lint
npm test
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 2 --output-dir /tmp/mindcycle-pessoa-c-android
```

## Resultado local em 15/11/2026

- 80 testes unitarios e 257 testes e2e aprovados.
- Tipos, lint e build da API aprovados.
- Imagem Docker `mindcycle-api:pessoa-c` construida com sucesso.
- Bundle Android gerado; isso nao substitui a execucao no APK de release.
- Banco de desenvolvimento e banco de teste locais com migrations em dia.
- Nenhuma dependencia ou lockfile alterado; alertas de dependencias existentes nao foram corrigidos neste escopo.

## Pendencias humanas do DoD

- [ ] Outro integrante revisar os textos novos em `apps/app/src/textos.ts`.
- [ ] Ensaiar o APK de release, conforme a [matriz Android](matriz-de-suporte-android.md).
- [ ] Conferir editar/salvar/cancelar; excluir/confirmar/cancelar; concluir e consultar a data.
- [ ] Verificar fonte ampliada, teclado, falha de rede e tentativas repetidas de envio.
- [ ] Conferir consulta e aceite dos termos em uma conta nova, antes de gravar dados de saude.
- [ ] Registrar aparelho, versao do Android, commit do APK e capturas dos fluxos.

Gerar o bundle nao comprova usabilidade, acessibilidade ou desempenho em aparelho fisico.
