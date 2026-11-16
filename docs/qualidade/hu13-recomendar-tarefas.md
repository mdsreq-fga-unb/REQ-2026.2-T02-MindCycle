# Verificacao da HU13: recomendar tarefas do dia

Referencia: [issue #83](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/83).

## Como funciona

- `GET /planejamento/hoje` devolve as tarefas do dia em ordem de precedencia, a
  disposicao considerada e se ela foi assumida (sem registro no dia).
- As regras moram so em `apps/api/src/modules/planning/domain/recomendar.ts`, uma
  funcao pura. Se a cliente mudar a ordem, mudam esse arquivo e o teste dele.
- A aba Hoje do app mostra a lista abaixo do registro de disposicao. A tarefa
  urgente acima da disposicao mostra o aviso sem cobranca e o botao Adiar (HU18).
- Um novo registro ou uma correcao de disposicao, um cadastro e um adiamento de
  tarefa refazem a lista.

## Cobertura automatizada

| Camada | Arquivo | Verificacao |
|---|---|---|
| Dominio | `apps/api/src/modules/planning/domain/recomendar.spec.ts` | Um caso por regra: quais tarefas entram, disposicao (registrada e assumida), os tres grupos e o limite de energia igual a disposicao, os quatro desempates, a vencida mais antiga primeiro, o aviso, e que a tarefa volta inteira |
| Caixa preta da API | `apps/api/test/recomendacao.e2e-spec.ts` | HTTP com banco real: ordem completa, sem registro no dia, registro mais recente, registro de outro dia, atrasadas, concluidas e adiadas, RNF03, fase do ciclo fora do calculo, sessao obrigatoria |
| Tela | `apps/app/src/features/plano-do-dia/plano-do-dia.spec.tsx` | Ordem e posicao anunciadas ao leitor de tela, aviso e Adiar so na urgente acima da disposicao, disposicao considerada ou assumida, lista vazia, formulario de adiamento que nao reabre sozinho |

Nenhuma tabela nova: o e2e da HU36 nao muda.

Comandos a partir da raiz, com PostgreSQL e Mailpit locais:

```bash
npm run build -w @mindcycle/shared
npm run typecheck
npm run lint
npm test
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 2 --output-dir /tmp/mindcycle-hu13-android
```

## Resultado local em 15/11/2026

Base integrada: `main` em `28c15e4` (inclui HU17, HU04, HU18, HU21 e HU12).

- Testes unitarios: 47 no shared, 39 na API (21 do dominio da HU13) e 12 de tela
  no app (7 da HU13), todos aprovados.
- 242 testes e2e aprovados, 8 deles da HU13, com PostgreSQL e Mailpit locais.
- Tipos, lint e bundle Android aprovados.
- Build da API aprovado no Node 26.5. No Node 22.14 o `nest build` nao roda (o
  projeto pede 22.18 ou mais novo).
- Teste de fumaca com a API em modo dev (`npm run dev:api`) e o banco do
  `docker-compose.yml`, fazendo pela API o que o app faz na aba Hoje: conta nova
  com lista vazia e disposicao media assumida; quatro tarefas na ordem esperada,
  com aviso so na urgente acima da disposicao; registro alto e depois baixo
  refazendo a lista; tarefa adiada saindo da lista; outra conta vendo so a sua.
  Tudo aprovado. O app em si nao foi aberto: falta o ensaio no aparelho.
- Revisao independente em quatro frentes (regras, API, app e testes), cada achado
  com contraprova. Corrigidos: a lista do dia nao era refeita ao voltar ao app no
  dia seguinte, nem depois da troca de fuso; o formulario de adiamento podia ficar
  aberto depois de a lista mudar; faltavam testes para a vencida com aviso, a
  tarefa atrasada com prazo a frente, a disposicao registrada mudando o grupo e o
  cadastro como ultimo desempate.

## Decisoes e pendencias com a cliente

- As regras de ordem sao a proposta da equipe de 08/11/2026 e ainda nao foram
  validadas pela cliente (rotulo `aguarda-cliente` na issue).
- A regra diz "prazo mais proximo" dentro de cada grupo. No grupo 1, onde ha
  tarefas vencidas, a equipe decidiu em 15/11/2026 que a vencida ha mais tempo vem
  primeiro. Validar com a cliente junto com as demais regras.
- A fase do ciclo nao entra no calculo no MVP.

## Pendencias humanas do DoD

- [ ] Outro integrante revisar os textos da aba Hoje em `apps/app/src/textos.ts` (`hoje.plano`).
- [ ] Medir no Android o tempo entre abrir a aba Hoje e a lista aparecer (RNF06, ate 3 s), em aparelho da [matriz Android](matriz-de-suporte-android.md), com a API ja acordada. No Render Free a API dorme depois de 15 min sem uso e leva cerca de 1 min para acordar ([deploy](../deploy.md)); registrar as duas situacoes.
- [ ] Conferir no aparelho: lista vazia, sem registro de disposicao, registro novo refazendo a lista, aviso com Adiar, erro de rede e leitor de tela.
- [ ] Registrar capturas e resultados com fonte normal/ampliada, aparelho e commit do APK.

O bundle Android nao substitui o ensaio visual, de acessibilidade ou de desempenho no aparelho.
