# Verificacao da HU12 - termos de uso

Issue: [#69](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/69).
Branch: `feat/issue-69-termos`, baseada em `main` (`96febb5`).
Esta entrega e independente das issues #79 e #80.

## Escopo

- Preservar o texto e a versao dos termos existentes; a aprovacao da cliente esta
  registrada na issue. Foi retirada apenas a identificacao obsoleta de rascunho.
- Compartilhar o conteudo entre a tela de aceite e `Conta > Termos de uso`.
- Tratar carregamento, erro de consulta, nova tentativa e versao desatualizada.
- Desabilitar o aceite durante a consulta ou seu erro e impedir a saida durante o envio.
- Permitir reler os termos depois do aceite, sem alterar o consentimento.
- Cobrir o bloqueio das rotas reais de ciclo, sintomas e disposicao antes do aceite.

O componente `Botao` ganha apenas a propriedade opcional `desabilitado`, com
estado acessivel e aparencia correspondentes; os usos existentes mantem o comportamento.
Nao ha alteracao de tarefas, dependencia, lockfile ou migration.

## Verificacao automatizada

Os testes unitarios de `ConsentService` exercitam os caminhos internos de versao
invalida, gravacao e repeticao do aceite (caixa branca). Os testes e2e exercitam
as rotas HTTP com PostgreSQL local (caixa preta da API, nao da interface Android).

```bash
npm run build -w @mindcycle/shared
npm run prisma:generate -w @mindcycle/api
npm run typecheck
npm run lint
npm run test -w @mindcycle/shared -- --maxWorkers=1
npm run test -w @mindcycle/api -- --maxWorkers=1
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1 consent.e2e-spec.ts
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 1 --output-dir /tmp/mindcycle-issue69-android
```

Usar apenas o banco de teste local; nunca o banco de producao. Executar os
comandos um por vez para limitar o consumo de memoria.

### Resultado local em 15/11/2026

- Tipos, lint e build da API aprovados.
- 56 testes unitarios aprovados: 38 do pacote compartilhado e 18 da API.
- 7 testes e2e dos termos aprovados no banco local `mindcycle_test`.
- Bundle Android gerado com um unico worker.
- A suite e2e completa e o APK de release devem ser conferidos nos checks do PR;
  esta verificacao local executou somente os e2e dos termos.
- Dependencias locais reaproveitadas, sem nova instalacao. Nenhum manifesto ou
  lockfile foi alterado. Processos Node limitados a 512 MiB de heap por processo.

## Conferencia no aparelho

- [ ] Em conta nova, ler os termos e testar `Agora nao, sair`, sem aceitar.
- [ ] Entrar novamente, aceitar e conferir a liberacao da area autenticada.
- [ ] Acessar `Conta > Termos de uso`, conferir o conteudo e voltar para a conta.
- [ ] Conferir fonte ampliada, rolagem e falha de rede na consulta dos termos.
- [ ] Ensaiar no APK de release e registrar as evidencias na matriz Android.
- [ ] Outro integrante revisar os textos apresentados no app.

Bundle Android e testes HTTP nao substituem o ensaio no APK de release.
