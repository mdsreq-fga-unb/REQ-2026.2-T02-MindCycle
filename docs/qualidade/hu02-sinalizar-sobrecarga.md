# Verificacao da HU02: sinalizar sobrecarga

Referencia: [issue #85](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/85).
Regra do efeito: [issue #84](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/84) (HU15).

## Como funciona

- `POST /sobrecarga` grava a sinalizacao no dia da usuaria (no fuso dela) e
  responde 201 com `{ id, dataLocal, criadoEm }`. A rota passa pelo
  `ConsentGuard` (RNF02) e nao le corpo: a conta vem so do token (RNF03).
- Cada sinalizacao e uma linha de `sinalizacoes_sobrecarga`, com exclusao em
  cascata a partir de `usuarias` (HU36).
- A regra e uma funcao pura em `apps/api/src/modules/checkin/domain/disposicao-do-dia.ts`:
  entre o registro de disposicao e a sinalizacao mais recentes do dia, vale o que
  veio por ultimo, e a sinalizacao conta como disposicao baixa (1).
- `CheckinService.disposicaoVigente(usuaria)` manteve a assinatura e ja devolve 1
  depois de uma sinalizacao. `CheckinService.disposicaoDoDia(usuaria)` devolve
  tambem a origem (`registro` ou `sobrecarga`).
- `GET /planejamento/hoje` ganhou o campo `disposicaoPorSobrecarga`. Quando ele e
  verdadeiro, a lista do dia diz que considera disposicao baixa porque a usuaria
  avisou, e que um novo registro muda isso.
- Na aba Hoje, o cartao "O dia esta pesado?" fica no topo, antes do registro de
  disposicao:
  - toque 1: "Estou sobrecarregada ou indisposta" abre a explicacao do efeito;
  - toque 2: "Sim, avisar" grava.
- A confirmacao aparece assim que a API responde, sem esperar a lista nova. O
  leitor de tela anuncia a pergunta e a confirmacao. Depois, a lista do dia e
  refeita (`chavePlanoDoDia`).

## Cobertura automatizada

| Camada | Arquivo | Verificacao |
|---|---|---|
| Dominio | `apps/api/src/modules/checkin/domain/disposicao-do-dia.spec.ts` | Sem eventos; so registro; so sinalizacao; sinalizacao depois de registro de cada nivel; registro posterior encerrando o efeito (inclusive baixo); empate; diferenca de 1 ms |
| Dominio | `apps/api/src/modules/planning/domain/recomendar.spec.ts` | A origem chega a recomendacao; registro e media assumida nunca marcados como sobrecarga |
| Caixa preta da API | `apps/api/test/sobrecarga.e2e-spec.ts` | HTTP com banco real (lista abaixo) |
| Caixa preta da API | `apps/api/test/exclusao-conta.e2e-spec.ts` | `sinalizacoes_sobrecarga` entra na lista de tabelas da HU36 |
| Tela | `apps/app/src/features/sobrecarga/cartao-sobrecarga.spec.tsx` | Aba Hoje (lista abaixo) |
| Tela | `apps/app/src/features/plano-do-dia/plano-do-dia.spec.tsx` | Texto da disposicao vinda da sobrecarga |

O e2e da HU02 cobre:

- gravacao no dia da usuaria, inclusive em outro fuso;
- sinalizacao que nao vira check-in;
- varias sinalizacoes no dia;
- sessao obrigatoria;
- disposicao baixa sem registro e depois de registro alto, com a tarefa mudando
  de grupo;
- check-in posterior encerrando o efeito, e nova sinalizacao voltando a valer;
- correcao do registro anterior que nao encerra o efeito;
- `disposicaoVigente`, o contrato com a HU15;
- sinalizacao de outro dia ignorada, inclusive na virada do dia no fuso;
- RNF02, RNF03 e cascata.

O teste de tela parte da aba Hoje e cobre:

- 2 toques ate a confirmacao;
- anuncios ao leitor de tela;
- lista do dia invalidada sem a confirmacao esperar por ela;
- "Agora nao", inclusive enquanto grava;
- erro com motivo e nova tentativa;
- botao ocupado com nome acessivel e sem segunda gravacao;
- confirmacao anterior saindo ao abrir de novo.

Checagens de mutacao. O codigo foi quebrado, o teste falhou e o codigo foi
restaurado:

| Mutacao | Teste que falhou |
|---|---|
| Empate passa a favorecer o registro (`>=` virou `>`) em `disposicao-do-dia.ts` | `no mesmo instante, vale a sinalizacao` (dominio) |
| `onSuccess` do hook devolve a promessa da invalidacao (a confirmacao espera a lista) | `refaz a recomendacao do dia, e a confirmacao nao espera a lista nova (RNF08)` (tela) |
| `@UseGuards(ConsentGuard)` removido da rota | `sem o aceite, responde 403 e nada e gravado` (e2e) |
| Busca da sinalizacao sem o filtro do dia | os 3 casos de `a sinalizacao de outro dia e ignorada` (e2e) |
| Sem o anuncio da confirmacao ao leitor de tela | `anuncia a pergunta e a confirmacao ao leitor de tela...` (tela) |
| "Agora nao" desabilitado enquanto grava | `enquanto grava, "Agora nao" continua disponivel...` (tela) |

Comandos a partir da raiz, com PostgreSQL e Mailpit locais:

```bash
npm run build -w @mindcycle/shared
npm run typecheck
npm run lint
npm test
npm run test:e2e -w @mindcycle/api -- --maxWorkers=1
npm run build -w @mindcycle/api
npm exec -w @mindcycle/app -- expo export --platform android --max-workers 2 --output-dir /tmp/mindcycle-hu02-android
```

## Resultado local em 15/11/2026

Base: `feat/hu13-recomendar-tarefas` em `99cf7d9` (HU13, PR #110 ainda nao
integrado a `main`).

- Testes unitarios, todos aprovados:
  - 47 no shared;
  - 52 na API, 13 deles da HU02 (10 da regra da disposicao do dia e 3 da
    recomendacao);
  - 21 de tela no app, 9 deles da HU02.
- 261 testes e2e aprovados, 19 deles da HU02 (18 no arquivo proprio e 1 na lista
  da HU36), com PostgreSQL e Mailpit locais.
- Tipos, lint, build da API (Node 26.5) e bundle Android (1501 modulos) aprovados.
- O app nao foi aberto num aparelho: falta o ensaio.

## Decisoes e pendencias com a cliente

- **Tabela propria.** O rascunho de arquitetura previa a sobrecarga como um
  `Checkin` de origem `sobrecarga`. Ela ficou numa tabela propria por dois motivos:
  - nao tem sintomas, e o check-in exige sintomas ou "sem sintomas";
  - como check-in, apareceria em "Meus registros" e poderia ser corrigida como um
    registro.

  O valor `sobrecarga` do enum `origem_checkin` ficou sem uso. Remove-lo pede
  recriar o tipo no PostgreSQL e fica para uma limpeza a parte.
- **Ate quando vale.** Ate o proximo registro de disposicao do mesmo dia (HU15).
  No dia seguinte, nao vale mais. Corrigir um registro anterior nao encerra o
  efeito: a correcao nao e um registro novo e mantem o horario original.
- **Mais de uma vez no dia.** Cada sinalizacao grava uma linha, e vale a mais
  recente. Sinalizar de novo depois de um registro volta a valer.
- **Desfazer.** Nao ha botao de desfazer: um novo registro de disposicao encerra o
  efeito, e a lista do dia avisa isso. Validar com a cliente se basta.
- **Empate de horario.** Se registro e sinalizacao caem no mesmo milissegundo,
  vale a sinalizacao (na duvida, o dia fica mais leve).
- **Relogio da comparacao.** O `criadoEm` dos dois vem do `@default(now())`, que o
  Prisma 7 preenche no processo da API, nao no banco. Com uma instancia so, como
  no Render, a ordem e confiavel. Com varias, dependeria do acerto entre os
  relogios delas.
- **Dois toques.** O primeiro abre uma explicacao do efeito e o segundo confirma,
  para um toque sem querer nao mudar o dia. Fica dentro dos 3 toques do RNF04.
- **Confirmacao.** "Tudo bem, anotado. Va no seu ritmo." confirma o aviso sem
  afirmar a disposicao atual, porque um registro novo pode muda-la depois. Quem
  mostra a disposicao considerada e a lista do dia.
- **Cartao do check-in.** Depois da sinalizacao, o cartao "Seu registro de hoje"
  continua mostrando o ultimo registro (por exemplo, disposicao alta). Quem diz que
  vale a baixa e a lista do dia. O cartao nao foi alterado, para nao conflitar com
  a HU15.
- **Readequacao das tarefas (criterio 1).** Nesta HU, a recomendacao da HU13 e
  refeita com disposicao baixa; mover tarefas para o dia seguinte e o reajuste da
  HU15. O criterio 1 so fecha com a HU15 integrada, e o reajuste precisa disparar
  tambem em `POST /sobrecarga`, nao so na gravacao do check-in. Como o
  `PlanningModule` importa o `CheckinModule`, esse disparo nao cabe no
  `SobrecargaService`. Ha um "Pendente (HU15)" no codigo.

## Revisao independente

O diff passou por tres revisoes, com subagentes separados para API, app e testes.

Corrigidos:

- **Confirmacao desatualizada.** A confirmacao dizia que as tarefas "agora
  consideram" disposicao baixa e continuava na tela depois de um novo registro.
  Agora so confirma o aviso.
- **Leitor de tela.** As etapas trocam os botoes e o leitor perdia o foco sem
  anuncio. Agora a pergunta, a confirmacao e o erro sao anunciados.
- **"Agora nao".** Ficava desabilitado enquanto gravava, o que prendia a usuaria
  numa conexao parada.
- **Botao ocupado.** Ficava sem nome acessivel.
- **Cartao sem titulo.** Nao aparecia na navegacao por titulos.
- **Comentarios errados.** Diziam que o `criadoEm` vinha do banco e que a HU15 "ja
  consulta" a regra. O pendente do `corrigir` tambem nao falava da sobrecarga.
- **Testes.** Faltavam um caso em outro fuso e a prova de que a sinalizacao nao
  vira check-in. Um contador de toques era vazio, e um nome de teste era enganoso.

Nao corrigidos, por ja valerem para o resto do app:

- o cliente HTTP sem timeout;
- a mensagem de termos pendentes, que nao leva a tela de termos;
- dois toques no mesmo quadro, que gravam duas linhas com o mesmo efeito;
- nenhum teste confere caminho e metodo dos endpoints do app.

## Pendencias humanas do DoD

- [ ] Outro integrante revisar os textos novos em `apps/app/src/textos.ts` (secao `sobrecarga`).
- [ ] Medir no Android, em aparelho da [matriz Android](matriz-de-suporte-android.md), com a API ja acordada:
  - os toques da aba Hoje ate a confirmacao (RNF04, ate 3);
  - o tempo entre o toque em "Sim, avisar" e a confirmacao (RNF08, ate 2 s).

  No Render Free a API dorme depois de 15 min sem uso ([deploy](../deploy.md)): registrar as duas situacoes.
- [ ] Ensaio no aparelho:
  - sinalizar sem registro no dia e depois de um registro alto;
  - cancelar, inclusive com a gravacao em andamento;
  - erro de rede e termos pendentes;
  - novo registro encerrando o efeito;
  - lista do dia com o texto da sobrecarga;
  - TalkBack anunciando a pergunta e a confirmacao;
  - fonte ampliada.
- [ ] Registrar capturas e resultados, com o aparelho e o commit do APK.

O bundle Android nao substitui o ensaio visual, de acessibilidade ou de desempenho no aparelho.
