# Verificacao da HU18: adiar tarefa

Referencia: [issue #81](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/81).

## Cobertura automatizada

| Camada | Arquivo | Verificacao |
|---|---|---|
| Contrato | `packages/shared/src/tarefas.spec.ts` | Data valida e recusa de campos que nao pertencem ao adiamento |
| Caixa branca | `apps/api/src/modules/tasks/tarefas.service.spec.ts` | Caminhos de autorizacao, validacao, concorrencia e propagacao de falha na transacao |
| Caixa preta da API | `apps/api/test/adiamento-tarefa.e2e-spec.ts` | HTTP com banco real: nova data, demais dados preservados, origem manual, historico, concorrencia e fuso |
| Exclusao de dados | `apps/api/test/exclusao-conta.e2e-spec.ts` | Historico removido em cascata, sem afetar outra conta |

Comandos a partir da raiz, com PostgreSQL e Mailpit locais:

```bash
npm run build -w @mindcycle/shared
npm run prisma:generate -w @mindcycle/api
npm run typecheck
npm run lint
npm test
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 2 --output-dir /tmp/mindcycle-hu18-android
```

## Resultado local em 15/11/2026

Base integrada: `main` em `64bc067` (inclui HU04 e o timeout dos e2e).

- 53 testes unitarios e 223 testes e2e aprovados.
- Tipos, lint, build da API e bundle Android aprovados.
- Schema Prisma valido e sem divergencia com o banco local migrado.
- Imagem `mindcycle-api:hu18-precommit` construida com o Dockerfile do CI.
- O build apontou alertas de dependencias existentes; nenhum pacote ou lockfile foi alterado.

## Integracao com HU15

O adiamento manual usa `PATCH /tarefas/:id/adiamento`, com corpo
`{ "dataPlanejada": "AAAA-MM-DD" }`. A resposta tem o mesmo formato de `Tarefa`.
O historico usa `MovimentacaoTarefa`, com datas anterior/nova e origem `usuaria`.
A origem `reajuste` esta disponivel para HU15; as regras de reajuste e retorno
automatico nao sao implementadas pela HU18.

## Pendencias humanas do DoD

- [ ] Outro integrante revisar os textos de adiamento em `apps/app/src/textos.ts`.
- [ ] Ensaiar o APK de release em aparelho fisico, conforme a [matriz Android](matriz-de-suporte-android.md).
- [ ] Conferir adiamento, cancelamento, erro de data, falha de rede e troca entre formularios de tarefas.
- [ ] Registrar capturas e resultados com fonte normal/ampliada, aparelho e commit do APK.

O bundle Android nao substitui o ensaio visual, de acessibilidade ou de desempenho no aparelho.
