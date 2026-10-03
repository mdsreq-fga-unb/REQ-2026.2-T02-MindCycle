---
title: "12. DoR e DoD"
numero: "12"
weight: 12
resumo: "Critérios para que uma história de usuário entre em uma iteração (DoR) e para que uma funcionalidade seja considerada concluída (DoD), com os quadros de aplicação por história."
---

O Definition of Ready (DoR) e o Definition of Done (DoD) são os dois acordos que delimitam o
trabalho de cada item: o DoR garante que o item está bem definido antes de ser iniciado, e o
DoD garante que ele está completo antes de ser considerado pronto. No MindCycle, os dois
acordos seguem o processo OpenUP: valem para as iterações, são firmados entre a equipe e a
cliente profissional de saúde e marcam a entrada e a saída dos itens no quadro Kanban,
descrito na [Seção 4.3](../04-estrategias-engenharia-software/#43-uso-do-quadro-kanban).

O DoR e o DoD são instrumentos de preparação e de verificação, e não substituem a validação
com os stakeholders, que ocorre na Revisão da Iteração, conforme a
[Seção 7.3](../07-interacao-equipe-cliente/#73-processo-de-validação).

## 12.1 Definition of Ready (DoR)

O DoR define quando um requisito, representado como história de usuário, está preparado
para entrar em uma iteração. No Planejamento da Iteração, a equipe verifica cada história
candidata e só leva para a coluna *A Fazer* do quadro aquela que atende a todos os
critérios abaixo:

1. A história deriva de pelo menos um requisito funcional da
   [Seção 8](../08-requisitos-de-software/) e está vinculada à característica de produto e
   ao objetivo específico na matriz de rastreabilidade da
   [Seção 11](../11-rastreabilidade/).
2. A prioridade da história foi confirmada pela cliente profissional de saúde e, quando a
   história envolve sintomas, fases do ciclo, recomendações ou mensagens relacionadas à
   saúde, o conteúdo também foi revisado por ela.
3. A história está registrada no backlog do Notion no formato "Como usuária, quero … para
   …", usa os termos do glossário da [Seção 8](../08-requisitos-de-software/#glossario) e não
   tem dúvidas em aberto após o Planejamento da Iteração, de forma que qualquer integrante
   consiga implementá-la sem pedir esclarecimentos.
4. A história tem critérios de aceitação objetivos e verificáveis, que incluem, quando
   aplicável, as condições de privacidade dos dados e a ausência de linguagem punitiva.
5. A equipe avaliou coletivamente que a história cabe em uma iteração de duas semanas, ou
   de uma semana no caso da Iteração 7, considerando os demais itens planejados, e definiu
   o integrante responsável. A história que não cabe é dividida antes de entrar.
6. As dependências da história foram identificadas e estão disponíveis ou planejadas para
   a mesma iteração, como a dependência do planejamento adaptativo das tarefas (CP4) em
   relação aos registros de sintomas e disposição (CP1) e do ciclo (CP2).
7. Quando a história envolve tela nova ou alterada, o protótipo de baixa fidelidade está no
   Figma e vinculado à história.

A aplicação do DoR é registrada por história, a partir da Iteração 5. Cada critério recebe
SIM, NÃO ou N/A, quando não se aplica, e a coluna de evidência reúne os links para o item
no Notion, o protótipo e o registro da confirmação da cliente. A história que entrar na
iteração com algum NÃO tem a justificativa registrada na mesma coluna.

| História | RF | (1) Rastreável | (2) Confirmada pela cliente | (3) Clara | (4) Critérios de aceitação | (5) Cabe na iteração | (6) Dependências | (7) Protótipo | Evidência |
|---|---|---|---|---|---|---|---|---|---|
| A preencher a partir da Iteração 5 | - | - | - | - | - | - | - | - | - |

<span class="quadro-fonte">**Quadro 12.1** – Aplicação do Definition of Ready por história de usuário. Fonte: elaborado pela equipe, a partir do template da disciplina (Marsicano, 2026).</span>

## 12.2 Definition of Done (DoD)

O DoD define quando uma funcionalidade está concluída. Ele vale para as histórias
implementadas a partir da Release 3 e é verificado ao final do desenvolvimento de cada
uma. A funcionalidade que atende a todos os critérios abaixo segue para a coluna *Em
Validação* do quadro e só é aceita após a validação na Revisão da Iteração; a que não
atende não é apresentada na revisão e volta para o desenvolvimento.

1. Todos os critérios de aceitação da história foram cumpridos, e a funcionalidade está
   integrada ao incremento da iteração e pode ser demonstrada.
2. A funcionalidade respeita os requisitos não funcionais aplicáveis da
   [Seção 8](../08-requisitos-de-software/), em especial os de privacidade e proteção dos
   dados sensíveis (CP3).
3. Os testes unitários e de integração da funcionalidade foram escritos, executados e
   aprovados na integração contínua do GitHub Actions.
4. O código passou por revisão de pelo menos um integrante que não é o autor, via pull
   request no GitHub, segue os padrões de codificação da equipe e foi aprovado antes da
   integração.
5. Os textos e as mensagens exibidos à usuária foram revisados e não contêm termos de
   cobrança, culpa ou contadores de falha.
6. A história está vinculada ao requisito funcional na matriz de rastreabilidade da
   [Seção 11](../11-rastreabilidade/), e a documentação de uso foi atualizada quando
   necessário.

A aplicação do DoD é registrada por história concluída, a partir da Iteração 5, com os
links para o pull request, o resultado dos testes e o registro da validação na Revisão da
Iteração.

| História | (1) Critérios atendidos | (2) RNFs | (3) Testes | (4) Código revisado | (5) Linguagem | (6) Rastreabilidade | Evidência |
|---|---|---|---|---|---|---|---|
| A preencher a partir da Iteração 5 | - | - | - | - | - | - | - |

<span class="quadro-fonte">**Quadro 12.2** – Aplicação do Definition of Done por história de usuário. Fonte: elaborado pela equipe, a partir do template da disciplina (Marsicano, 2026).</span>