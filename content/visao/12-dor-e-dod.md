---
title: "12. DoR e DoD"
numero: "12"
weight: 12
resumo: "Critérios para que uma história de usuário entre em uma iteração (DoR) e para que uma funcionalidade seja considerada concluída (DoD)."
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

O DoR define quando uma história de usuário está preparada para entrar em uma iteração. As
histórias são derivadas dos requisitos funcionais da
[Seção 8](../08-requisitos-de-software/), conforme o processo descrito na
[Seção 5](../05-engenharia-de-requisitos/). No Planejamento da Iteração, a equipe percorre
o checklist abaixo para cada história candidata. Só as histórias que atendem a todos os
itens entram na coluna *A Fazer* do quadro; as demais permanecem no backlog até serem
refinadas.

| # | Critério | O que é verificado |
|---|---|---|
| 1 | Derivada de requisito | A história está vinculada a pelo menos um requisito funcional e, por meio dele, à característica de produto e ao objetivo específico registrados na [Seção 11](../11-rastreabilidade/). Os requisitos não funcionais aplicáveis estão identificados. |
| 2 | Declarada como história de usuário | A história segue o formato "Como usuária, quero … para …", com o valor para a usuária explícito. |
| 3 | Informação suficiente | A história tem detalhes suficientes para que a equipe entenda o que deve ser feito, sem ambiguidades, e usa os termos do glossário da [Seção 8](../08-requisitos-de-software/#glossario). |
| 4 | Critérios de aceitação verificáveis | Cada critério é objetivo e verificável, e inclui, quando aplicável, as condições de privacidade dos dados e a ausência de linguagem punitiva. |
| 5 | Cabe em uma iteração | A equipe estimou a história e ela cabe em uma iteração de duas semanas, ou de uma semana no caso da Iteração 7. A história que não cabe é dividida antes de entrar. |
| 6 | Interface esboçada | Quando a história envolve tela nova ou alterada, o protótipo de baixa fidelidade está no Figma e vinculado à história. |
| 7 | Conteúdo de saúde revisado | Quando a história envolve sintomas, fases do ciclo, recomendações ou mensagens relacionadas à saúde, o conteúdo foi revisado pela cliente profissional de saúde. |
| 8 | Sem impedimentos conhecidos | As dependências da história estão resolvidas ou planejadas para a mesma iteração, como a dependência do planejamento adaptativo (CP4) em relação aos registros de sintomas e disposição (CP1) e do ciclo (CP2). |
| 9 | Prioridade confirmada | A prioridade da história foi confirmada pela cliente profissional de saúde, a quem cabe a priorização final do backlog. |

<span class="quadro-fonte">**Quadro 12.1** – Checklist do Definition of Ready. Fonte: elaborado pela equipe, a partir do template da disciplina (Marsicano, 2026).</span>

## 12.2 Definition of Done (DoD)

O DoD define quando uma funcionalidade está concluída. Ele vale para as histórias de usuário
implementadas a partir da Release 3 e é verificado ao final do desenvolvimento de cada
história. A funcionalidade que atende a todos os itens segue para a coluna *Em Validação*
do quadro e só é aceita após a validação na Revisão da Iteração; a que não atende não é
apresentada na revisão e volta para o desenvolvimento.

| # | Critério | O que é verificado |
|---|---|---|
| 1 | Incremento entregue | A funcionalidade está integrada ao incremento da iteração e pode ser demonstrada. |
| 2 | Critérios de aceitação atendidos | Todos os critérios de aceitação da história foram cumpridos. |
| 3 | Requisitos não funcionais atendidos | A funcionalidade respeita os requisitos não funcionais aplicáveis, em especial os de privacidade e proteção dos dados sensíveis (CP3). |
| 4 | Testes aprovados | Os testes unitários e de integração foram executados e aprovados na integração contínua do GitHub Actions. |
| 5 | Código revisado | O pull request foi revisado e aprovado por um integrante que não é o autor, e o código segue os padrões de codificação da equipe. |
| 6 | Linguagem revisada | Textos e mensagens exibidos à usuária não contêm termos de cobrança, culpa ou contadores de falha. |
| 7 | Rastreabilidade e documentação atualizadas | A história está vinculada ao requisito funcional na matriz de rastreabilidade da [Seção 11](../11-rastreabilidade/), e a documentação de uso foi atualizada quando necessário. |

<span class="quadro-fonte">**Quadro 12.2** – Checklist do Definition of Done. Fonte: elaborado pela equipe, a partir do template da disciplina (Marsicano, 2026).</span>

## 12.3 Registro da aplicação

A partir da Release 3, a aplicação dos dois acordos é registrada por história de usuário: o
checklist do DoR é preenchido no Planejamento da Iteração, antes de a história entrar em
*A Fazer*, e o checklist do DoD é preenchido ao final do desenvolvimento, com os links para
o pull request, o resultado dos testes e o registro da validação na Revisão da Iteração.
Uma história que entrar na iteração sem atender ao DoR, ou que for apresentada sem atender
ao DoD, tem a justificativa registrada.