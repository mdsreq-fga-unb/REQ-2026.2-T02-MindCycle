---
title: "6. Cronograma e Entregas"
numero: "6"
weight: 6
resumo: "Releases por unidade, iterações de duas semanas, entregas esperadas e o que o cliente valida em cada ciclo."
---

O cronograma decorre da estratégia declarada na
[Seção 4](../04-estrategias-engenharia-software/) — abordagem híbrida, ciclo de vida
iterativo e incremental, processo OpenUP e framework de gerenciamento Kanban — e das
fases de trabalho detalhadas no
[Quadro 5](../05-engenharia-de-requisitos/#52-engenharia-de-requisitos-e-a-abordagem-híbrida-openup--kanban).
O projeto é organizado em quatro releases, cada uma correspondente a uma unidade do
calendário da disciplina, e em iterações de duas semanas, cadência fixa compatível com as
iterações curtas admitidas pelo OpenUP e sustentada pelo quadro Kanban, que gerencia o
fluxo de trabalho dentro e entre as iterações por meio dos limites de trabalho em progresso
(WIP), conforme a [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação). Cada release
é encerrada por um período de fechamento, no qual ocorrem a Revisão da Iteração, a
Retrospectiva da Iteração, a entrega e a apresentação dos trabalhos em equipe e o
Planejamento da Próxima Release, fases já previstas no Quadro 5.

As iterações começam sempre em uma terça-feira e terminam na segunda-feira da segunda
semana seguinte, o que ancora no calendário as cerimônias descritas na
[Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação): o Planejamento da Iteração
ocorre no primeiro dia do ciclo, às terças-feiras, em cadência quinzenal, por Google Meet;
a Revisão da Iteração ocorre no último dia do ciclo, às segundas-feiras, também quinzenal,
por Google Meet, com a representante do LabLivre e usuárias representativas; e a
Retrospectiva da Iteração ocorre logo após a revisão, na terça-feira que abre o ciclo
seguinte, antes do Planejamento da Iteração e apenas com a equipe. Ao longo de cada ciclo
mantêm-se a reunião semanal de sincronização, de quinze minutos, às terças-feiras, às
11h50, presencial, e a sessão de Refinamento do Product Backlog, às quartas-feiras, às
15h, por Google Meet, com participação da representante do cliente na sessão que antecede
cada iteração. O backlog e o andamento das iterações são mantidos no Notion, e o canal
assíncrono de WhatsApp registra as decisões de detalhe, que são incorporadas ao backlog.

Até o encerramento da Release 2, em 13/10/2026, o trabalho restringe-se às atividades de
Engenharia de Requisitos — Elicitação e Descoberta, Análise e Consenso e Declaração —,
admitida a preparação do produto: repositório, arquitetura, ambiente de desenvolvimento,
integração contínua e prototipação. A construção de incrementos funcionais tem início na
Release 3, depois que o backlog e o escopo do MVP estiverem acordados com o cliente.

O Quadro 6 relaciona as releases às unidades da disciplina e aos marcos de entrega. O
Quadro 7 detalha as iterações e os fechamentos de release, com datas de início e de fim,
objetivo principal, entregas esperadas e validação a ser realizada pelo cliente, na forma
definida na [Seção 7.3](../07-interacao-equipe-cliente/#73-processo-de-validação).

| Release | Unidade | Período | Entrega | Data da entrega |
|---|---|---|---|---|
| Release 1 | Unidade 1 | 11/08/2026 a 14/09/2026 | Documento de Visão do Produto e Projeto, versão 1.0, com as Seções 1 a 7, publicado no GitPages | 08/09/2026 |
| Release 2 | Unidade 2 | 15/09/2026 a 19/10/2026 | Requisitos funcionais e não funcionais, matriz-síntese de rastreabilidade, DoR e DoD, e Backlog do Produto priorizado com o MVP delimitado (Seções 8 a 10) | 13/10/2026 |
| Release 3 | Unidade 3 | 20/10/2026 a 23/11/2026 | Incrementos funcionais correspondentes a CP1, CP2 e CP3, com os requisitos representados, verificados e validados | 17/11/2026 |
| Release 4 | Unidade 4 | 24/11/2026 a 10/12/2026 | MVP integrado e homologado pelo cliente e Documento de Visão consolidado no GitPages | 01/12/2026 |

<span class="quadro-fonte">**Quadro 6** – Releases, unidades da disciplina e marcos de entrega. Fonte: elaborado pela equipe.</span>

| Ciclo | Início | Fim | Objetivo Principal | Entregas Esperadas | Validação do Cliente |
|---|---|---|---|---|---|
| Iteração 1 | 11/08/2026 | 24/08/2026 | Compreender o negócio do LabLivre e caracterizar o problema | • Seções 1.1 a 1.7: identificação do cliente, contexto do negócio, Rich Picture, diagrama de Ishikawa, desafios, mapa de stakeholders e segmentação de clientes;<br>• Repositório no GitHub e GitPages criados. | Revisão da Iteração, por Google Meet, com a representante do LabLivre, para confirmar a caracterização do problema, o mapa de stakeholders e os segmentos de clientes. |
| Iteração 2 | 25/08/2026 | 07/09/2026 | Declarar a solução e as estratégias de engenharia de software e de requisitos | • Seções 2 a 7: objetivo geral, OE1 a OE3, características CP1 a CP6 e sua rastreabilidade (Quadro 2), tecnologias, análise competitiva, viabilidade, intervenção social, estratégia híbrida OpenUP + Kanban, atividades e técnicas de ER e composição da equipe;<br>• Documento de Visão v1.0 publicado no GitPages. | Revisão da Iteração com a representante do LabLivre, para aprovação do objetivo geral, dos objetivos específicos e das características de produto. |
| Fechamento da Release 1 | 08/09/2026 | 14/09/2026 | Retrospectivar a Iteração 2, entregar e apresentar a Unidade 1 e conduzir o Planejamento da Próxima Release | • Entrega da Unidade 1 em 08/09/2026 e apresentação em equipe em 08 ou 10/09/2026;<br>• Lições aprendidas registradas na Seção 11.1;<br>• Backlog da Release 2 definido e priorizado no Notion. | Sessão de Refinamento do Product Backlog com a representante do LabLivre, para revisar o Documento de Visão v1.0 e priorizar os requisitos de alto nível da Release 2. |
| Iteração 3 | 15/09/2026 | 28/09/2026 | Elicitar, descobrir e declarar os requisitos | • Personas e jornadas de usuário dos segmentos da Seção 1.7;<br>• Épicos derivados de CP1 a CP6, histórias de usuário e critérios de aceitação;<br>• Seções 8.1 e 8.2, com os requisitos não funcionais classificados em URPS+;<br>• Arquitetura, ambiente de desenvolvimento em Docker e integração contínua em GitHub Actions configurados. | Revisão da Iteração com a representante do LabLivre e com usuárias representativas dos segmentos, para revisar a lista preliminar de requisitos funcionais e não funcionais. |
| Iteração 4 | 29/09/2026 | 12/10/2026 | Analisar, priorizar e acordar o backlog e o escopo do MVP | • Seção 8.3, com a matriz-síntese de rastreabilidade entre OE, CP, VN, RF e RNF;<br>• Seção 9, com o DoR e o DoD;<br>• Seções 10.1 e 10.2, com o backlog geral, a priorização MoSCoW e o MVP delimitado;<br>• Wireframes das telas de registro de estado e de plano do dia, em Figma. | Revisão da Iteração e sessão de refinamento com a representante do LabLivre, para acordar o backlog priorizado, o escopo do MVP entregável no semestre e o DoR e o DoD que regem a validação (Seção 7.3). |
| Fechamento da Release 2 | 13/10/2026 | 19/10/2026 | Retrospectivar a Iteração 4, entregar e apresentar a Unidade 2 e conduzir o Planejamento da Próxima Release | • Entrega da Unidade 2 em 13/10/2026 e apresentação em equipe em 13 ou 15/10/2026;<br>• Lições aprendidas registradas na Seção 11.2;<br>• Backlog da Release 3 revisado, com todo objetivo específico coberto por ao menos uma característica e toda história vinculada a um objetivo. | Confirmação do backlog do produto e da ordem de implementação das características que compõem o MVP, com verificação do DoR das histórias que entram na Release 3. |
| Iteração 5 | 20/10/2026 | 02/11/2026 | Entregar o primeiro incremento: Registrar e acompanhar o ciclo menstrual (CP2) e Registrar nível de energia (CP4) sobre base de dados protegida | • Entrega Parcial 1: registro de energia, foco e sintomas em fluxo único, com armazenamento cifrado e acesso exclusivo da usuária;<br>• Protótipo de alta fidelidade e demais artefatos da atividade de Representação;<br>• Testes de aceitação automatizados das histórias entregues. | Revisão da Iteração, com demonstração do registro de estado ao LabLivre e a usuárias representativas, verificação de que nenhum dado de ciclo, sintoma ou estado é exposto a terceiros, e aprovação das histórias pelo DoD (Seção 7.3). |
| Iteração 6 | 03/11/2026 | 16/11/2026 | Entregar o segundo incremento: Adaptar planejamento por fase de ciclo (CP3) | • Entrega Parcial 2: projeção de períodos de maior e de menor capacidade e redistribuição das tarefas do dia quando o estado registrado diverge do previsto;<br>• Requisitos verificados e validados por checklist de critérios de qualidade e revisão dos critérios de aceitação. | Revisão da Iteração, com usuárias representativas, para validar que o replanejamento reduz o esforço de reorganização das demandas e não introduz linguagem de cobrança, e aprovação das histórias pelo DoD. |
| Fechamento da Release 3 | 17/11/2026 | 23/11/2026 | Retrospectivar a Iteração 6, entregar e apresentar a Unidade 3 e conduzir o Planejamento da Próxima Release | • Entrega da Unidade 3 em 17/11/2026 e apresentação em equipe em 17 ou 19/11/2026;<br>• Backlog e matriz de rastreabilidade atualizados;<br>• Lições aprendidas registradas na Seção 11.3. | Revisão dos incrementos entregues e repriorização do escopo restante do MVP, na sessão de Refinamento do Product Backlog com a representante do LabLivre. |
| Iteração 7 | 24/11/2026 | 30/11/2026 | Fechar o MVP: Decompor Tarefas (CP1) | • Entrega Parcial 3: fragmentação de tarefas em passos executáveis isoladamente, com indicação de um único próximo passo, e reagendamento de tarefas não concluídas sem contadores de falha nem linguagem de cobrança;<br>• MVP integrado, com todas as histórias aprovadas pelo DoD. | Testes de aceitação conduzidos pela representante do LabLivre e por usuárias representativas sobre o MVP integrado, com base nos critérios de aceitação definidos no DoR (Seção 7.3). |
| Fechamento da Release 4 | 01/12/2026 | 10/12/2026 | Homologar, entregar e apresentar o produto | • MVP homologado pelo cliente;<br>• Documento de Visão consolidado e publicado no GitPages, com as Seções 11.4 e 12 completas;<br>• Apresentação final em equipe entre 01 e 08/12/2026. | Homologação do MVP e aprovação final pela representante do LabLivre, com base nos critérios de aceitação definidos no DoR e verificados pelo DoD (Seção 7.3). |

<span class="quadro-fonte">**Quadro 7** – Cronograma de iterações e fechamentos de release. Fonte: elaborado pela equipe.</span>

## Considerações importantes

1. **Duração dos ciclos.** As iterações têm cadência fixa de duas semanas, de terça-feira a
   segunda-feira, à exceção da Iteração 7, de uma semana. A redução é decisão deliberada, e
   não atraso: o calendário da disciplina reserva o período de 01 a 08/12/2026 às
   apresentações finais, restando uma única semana útil entre o fechamento da Release 3 e a
   data em que o MVP precisa estar concluído. O OpenUP admite iterações de uma a quatro
   semanas.
2. **Semana Universitária.** O período de 22 a 24/09/2026 está compreendido na Iteração 3 e
   não tem aulas. No Planejamento da Iteração, o backlog da iteração é dimensionado sobre a
   capacidade efetiva da equipe nesse período, e não sobre a capacidade nominal de duas
   semanas cheias. A reunião semanal de sincronização dessa semana, normalmente presencial,
   e a sessão de Refinamento do Product Backlog são realizadas por Google Meet, conforme a
   [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação).
3. **Cerimônias que estruturam cada ciclo.** Cada ciclo é aberto pelo Planejamento da
   Iteração, na terça-feira, e encerrado pela Revisão da Iteração, na segunda-feira, ambos
   por Google Meet e em cadência quinzenal; a Retrospectiva da Iteração ocorre logo após a
   revisão, na terça-feira que abre o ciclo seguinte, apenas com a equipe. Dentro do ciclo,
   a reunião semanal de sincronização, presencial, às terças-feiras, às 11h50, expõe o
   andamento das tarefas e os impedimentos, e a sessão de Refinamento do Product Backlog,
   às quartas-feiras, às 15h, detalha, estima e prioriza os itens antes de entrarem em uma
   iteração. Nos períodos de fechamento de release acrescentam-se a entrega e a apresentação
   dos trabalhos em equipe e o Planejamento da Próxima Release, previstos no Quadro 5.
4. **Validação ao final de cada ciclo.** Cada iteração termina com a Revisão da Iteração,
   com demonstração ao LabLivre e a usuárias representativas, e é seguida pela Retrospectiva
   da Iteração, conforme o Quadro 5 e a
   [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação). A validação obedece às três
   etapas da [Seção 7.3](../07-interacao-equipe-cliente/#73-processo-de-validação): o
   Definition of Ready (DoR) condiciona a entrada de uma história na iteração, verificando
   se os requisitos estão claramente definidos, documentados e com critérios de aceitação
   estabelecidos; o Definition of Done (DoD) condiciona a conclusão da funcionalidade, que
   só é considerada pronta após os testes unitários e de integração e a aprovação visual e
   funcional pela equipe e pelo cliente; e os testes de aceitação conduzidos pelo cliente,
   sobre os critérios definidos no DoR, encerram a validação. O feedback obtido é
   incorporado às histórias de usuário e ao backlog, no Notion, antes do Planejamento da
   Iteração seguinte.
5. **Ordem das entregas parciais.** A ordem de implementação decorre das dependências entre
   as características declaradas na
   [Seção 2.3](../02-solucao-proposta/#23-características-do-produto-cp): a CP2 (Registrar e
   acompanhar o ciclo menstrual) e a CP4 (Registrar nível de energia) precedem as demais,
   porque sem esse histórico o planejamento por fase não se sustenta; a CP2 e a CP4 precedem
   a CP3 (Adaptar planejamento por fase de ciclo), que depende desses dados; a CP1 (Decompor
   Tarefas) é desenvolvida em paralelo e, com a CP3, fecha o núcleo do MVP. A
   confidencialidade dos dados de ciclo, sintomas e energia é tratada como requisito
   transversal desde o primeiro incremento, com armazenamento cifrado e acesso exclusivo da
   usuária.
6. **Características fora deste cronograma.** A CP5 (Adaptar a carga diária visível)
   e a CP6 (Sugerir atividades de Bem-Estar) permanecem no backlog do produto e não estão
   alocadas a nenhum ciclo, por não serem pré-requisito das demais e por excederem a
   capacidade da equipe no semestre.
7. **Atualização do planejamento.** Este planejamento é preliminar. Será atualizado ao final
   de cada iteração, na Revisão da Iteração, nos períodos de fechamento de release e sempre
   que a Retrospectiva da Iteração indicar necessidade de ajuste, e cada versão será
   registrada no Histórico de Revisão deste documento.
