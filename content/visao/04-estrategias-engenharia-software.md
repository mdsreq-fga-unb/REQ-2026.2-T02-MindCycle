---
title: "4. Estratégias de Engenharia de Software"
numero: "4"
weight: 4
resumo: "Abordagem, ciclo de vida, processo e framework de gerenciamento escolhidos, com o comparativo que sustenta a decisão."
---

## 4.1 Estratégia Priorizada

| Dimensão | Escolha |
|---|---|
| **Abordagem** | Híbrida |
| **Ciclo de Vida** | Iterativo e Incremental |
| **Processo** | OpenUP |
| **Framework de Gerenciamento** | Board Kanban |

O OpenUP é adotado como processo por inteiro: organiza o ciclo de vida em fases e
disciplinas, define papéis enxutos (Analista, Desenvolvedor, Testador e Gerente de
Projeto) e conduz as próprias tarefas de gerenciamento de projeto, como planejar a
iteração e avaliar seus resultados ao final dela. Do Kanban, usa-se apenas o board: o
quadro visual com colunas que organizam os itens de trabalho e dão visibilidade ao fluxo,
detalhado na [Seção 4.3](#43-uso-do-quadro-kanban); o projeto não adota as demais práticas
do método, como limites explícitos de trabalho em progresso (WIP), políticas formais de
fluxo ou métricas de lead time e cycle time, e quem gerencia o projeto continua sendo o
OpenUP. Papéis, cerimônias e artefatos do Scrum (Sprint Planning, Sprint Review, Sprint
Retrospective, Product Backlog como artefato formal do Scrum) não fazem parte da
estratégia declarada, assim como não fazem parte as práticas técnicas prescritas pelo XP
(programação em pares ou TDD como regra obrigatória do processo). Práticas de engenharia
como integração contínua e testes automatizados, quando adotadas pela equipe, são
escolhas de qualidade tomadas por conta própria, sem vínculo com o XP como framework.

## 4.2 Fases do OpenUP e Ciclo Iterativo

O OpenUP organiza o ciclo de vida do projeto em quatro fases. Essas fases não são
sequenciais no sentido de isolar atividades por período: são marcos de governança que
avaliam o risco, o escopo, a completude da arquitetura e a prontidão para entrega ao final
de cada uma. Cada fase comporta uma ou mais iterações, o desenvolvimento dentro delas
permanece iterativo e incremental, e todas as disciplinas do OpenUP, incluindo a
Engenharia de Requisitos, continuam ativas ao longo das quatro fases, apenas com ênfase
variável. O Quadro 4.1 associa cada fase à release correspondente do
[cronograma da Seção 6](../06-cronograma-e-entregas/).

| Fase | Descrição | No MindCycle |
|---|---|---|
| Concepção | Define o escopo, os objetivos e a viabilidade do projeto, entendendo o problema antes de detalhar a solução. | Release 1: caracterização do problema, mapa de stakeholders, segmentação de clientes e Documento de Visão inicial. |
| Elaboração | Detalha a arquitetura da solução e mitiga os riscos mais significativos. | Release 2: requisitos funcionais e não funcionais, matriz de rastreabilidade, DoR e DoD, e backlog priorizado com o MVP delimitado. |
| Construção | Concentra o desenvolvimento, a implementação e os testes dos incrementos funcionais. | Release 3: incrementos funcionais de CP1 a CP3, com requisitos representados, verificados e validados. |
| Transição | Consolida a entrega final do produto, com testes de aceitação e homologação. | Release 4: MVP integrado e homologado pelo cliente, e Documento de Visão consolidado. |

<span class="quadro-fonte">**Quadro 4.1** – Fases do OpenUP e sua correspondência com as releases do MindCycle. Fonte: elaborado pela equipe.</span>

A Engenharia de Requisitos tem maior intensidade na Concepção e na Elaboração, quando o
escopo do MVP é delimitado, mas a disciplina não se encerra quando a Construção começa.
Novos detalhes de requisitos, ajustes de critérios de aceitação e mudanças de prioridade
continuam sendo tratados nas Releases 3 e 4, à medida que os incrementos funcionais são
construídos e validados com o LabLivre e com as usuárias representativas. A Transição pode
inclusive reabrir requisitos, caso a validação de aceitação identifique lacunas.

## 4.3 Uso do Quadro Kanban

O quadro Kanban é usado apenas como ferramenta visual de organização das tarefas do
projeto, sem as demais práticas do método (WIP, políticas formais de fluxo, métricas). Ele
é organizado da seguinte forma:

- **Colunas do fluxo:** *Backlog* (itens priorizados, ainda não detalhados o suficiente
  para entrar em desenvolvimento), *A Fazer* (itens que atendem ao Definition of Ready,
  definido na [Seção 7.3](../07-interacao-equipe-cliente/#73-processo-de-validação)), *Em
  Desenvolvimento*, *Em Verificação* (revisão de código e testes), *Em Validação*
  (validação com a representante do cliente ou com usuárias representativas) e
  *Concluído* (itens que atendem ao Definition of Done). Um item bloqueado não muda de
  coluna: recebe uma marcação visual de impedimento sobre o cartão, permanecendo na coluna
  em que estava até que o impedimento seja resolvido, o que é acompanhado na reunião
  semanal de sincronização da equipe.
- **Fluxo contínuo e iterações quinzenais:** o quadro é atualizado continuamente. Um cartão
  pode ser criado, movido entre colunas e concluído a qualquer momento, sem depender do
  início ou do fim de uma iteração. A cadência quinzenal, definida na
  [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação), não fragmenta esse fluxo em
  lotes fechados: ela é o momento em que o backlog é reabastecido e priorizado e em que os
  itens concluídos são revisados com a representante do cliente, sem interromper cartões
  que estejam em andamento entre uma iteração e outra. O planejamento, o monitoramento e o
  fechamento de cada iteração são conduzidos pelo OpenUP; o quadro apenas torna esse
  andamento visível para toda a equipe.

## 4.4 Quadro Comparativo

O Quadro 4.2, a seguir, apresenta algumas características que podem ser relacionadas ao
OpenUP + Quadro Kanban e à combinação Scrum + XP, visando auxiliar no entendimento e na
justificativa da escolha mais adequada ao caso do MindCycle. A comparação avalia as duas
alternativas completas, e não uma combinação entre elas: a alternativa não escolhida serve
apenas de referência para evidenciar por que o OpenUP + Quadro Kanban é mais adequado.

| Características | OpenUP + Quadro Kanban | Scrum + XP |
|---|---|---|
| Ciclo de Vida | Ciclo de vida iterativo e incremental herdado do Unified Process, em versão simplificada e leve, no qual cada iteração produz uma versão incrementada do software, combinado a uma dinâmica de fluxo contínuo em que entregas e passagem de tarefas não dependem estritamente do término de iterações com tempo fixo. | Ciclo de vida ágil, que inclui e supõe o iterativo e incremental e acrescenta comunicação e colaboração constantes com os stakeholders, entrega contínua de partes funcionais e feedback rápido do cliente. |
| Foco em Arquitetura | Mantém os princípios do Unified Process, priorizando nas iterações iniciais os requisitos de maior risco ou prioridade, porém em versão enxuta. O quadro Kanban apoia isso ao dar visibilidade explícita a essas tarefas de infraestrutura. | A arquitetura evolui ao longo das sprints, conforme funcionalidades e riscos são validados com usuárias e stakeholders. |
| Estrutura de Processos | Organizado em quatro fases do UP (Concepção, Elaboração, Construção e Transição) que funcionam como marcos de governança, e não como blocos sequenciais isolados: o desenvolvimento dentro de cada fase é iterativo, e o trabalho operacional diário é gerido pelo fluxo visual e contínuo do quadro Kanban. | Focado em sprints curtas de 1 a 4 semanas, com planejamento, revisão e retrospectiva, entregas incrementais e adaptação contínua. |
| Flexibilidade de Requisitos | Os requisitos são detalhados progressivamente à medida que os cartões de trabalho se movem no fluxo, evitando especificações exaustivas de forma prematura. | Alta flexibilidade para mudanças no backlog a cada sprint, permitindo incorporar aprendizados sobre ciclo, sobrecarga, privacidade e bem-estar. |
| Colaboração com Cliente | Enfatiza a colaboração direta com stakeholders em vez de documentação extensiva, com validação contínua por revisões, demonstrações, testes e por quadro visual (priorização no topo e validação individual de itens concluídos). | Envolvimento constante do cliente e das usuárias, com feedback ao final de cada sprint e refinamento contínuo dos requisitos. |
| Complexidade do Processo | Combina a governança estruturada das fases do OpenUP com a simplicidade operacional do quadro Kanban (colunas visuais e políticas explícitas, sem cerimônias obrigatórias). | Organiza o trabalho por sprints de duração fixa, com papéis, cerimônias e artefatos definidos pelo Scrum e documentação reduzida ao essencial. |
| Qualidade Técnica | Qualidade apoiada em validação contínua com stakeholders e em ciclos de feedback rápidos ao longo das iterações. | Alta ênfase em qualidade técnica por meio das práticas do XP, relevantes para dados sensíveis e funcionalidades de apoio à decisão da usuária. |
| Práticas de Desenvolvimento | Não prescreve práticas técnicas específicas de engenharia; concentra-se no equilíbrio entre disciplina de governança e agilidade no fluxo, deixando a critério da equipe a adoção pontual de práticas de qualidade. | Inclui práticas como TDD, refatoração contínua, integração contínua e programação em pares, apoiando confiabilidade e manutenção. |
| Adaptação ao Projeto MindCycle | Adequado, pois há mitigação de riscos críticos (segurança de dados e motor de replanejamento) nas fases iniciais e o fluxo contínuo absorve descobertas de pesquisa e evita metas rígidas, mas depende de políticas explícitas de quadro para suprir a ausência de práticas técnicas de qualidade prescritas. | Permite investigar progressivamente experiências sensíveis de uso e ajustar as características do produto a cada ciclo de validação. |
| Documentação | Adota conjunto mínimo de artefatos (Visão, Casos de Uso ou Histórias de Usuário, Requisitos Técnicos e Requisitos Não Funcionais), criados apenas quando agregam valor tangível. | Minimiza a documentação formal, mantendo registros essenciais para rastreabilidade, backlog, critérios de aceite e validação. |
| Suporte a Equipes de Desenvolvimento | Indicado para equipes pequenas e co-localizadas, tipicamente de 3 a 10 pessoas, com comunicação direta preferível à documentação extensa e autonomia apoiada pela visibilidade do fluxo no quadro. | Mais indicado para equipes pequenas e colaborativas, com papéis flexíveis e forte comunicação ao longo das sprints. |

<span class="quadro-fonte">**Quadro 4.2** – Comparativo entre OpenUP + Quadro Kanban e Scrum + XP. Fonte: elaborado pela equipe.</span>

## 4.5 Justificativa

Com base no quadro comparativo e nas características do projeto, o conjunto declarado na
Seção 4.1 (abordagem híbrida, ciclo de vida iterativo e incremental, processo OpenUP e
board Kanban como framework de gerenciamento) apresenta-se como a alternativa mais adequada ao
desenvolvimento do MindCycle, pelos seguintes motivos:

### 1. Requisitos emergentes e refinamento contínuo

O produto depende da compreensão de experiências sensíveis e pouco documentadas, como
variações de energia ao longo do ciclo menstrual, sobrecarga executiva e culpa punitiva.
Projetos com requisitos voláteis ou mal compreendidos inicialmente são precisamente o
cenário de aplicação do OpenUP, que detalha os requisitos progressivamente ao longo das
iterações, evitando a especificação excessiva antecipada e elaborando os detalhes em
colaboração direta com os stakeholders no momento da implementação. Combinado ao
reabastecimento contínuo do backlog no quadro Kanban, isso permite ajustar o escopo a
cada iteração, incorporando o feedback dos pesquisadores do LabLivre e das usuárias
representativas dos segmentos definidos na
[Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes). Isso é decisivo em
características cujo comportamento correto não pode ser deduzido antecipadamente, como o
*Planejamento adaptativo das tarefas* (CP4) e o *Registro e análise de sintomas e
disposição* (CP1).

### 2. Validação frequente de hipóteses de valor

As características do MindCycle são, em boa medida, hipóteses sobre o que reduz a
sobrecarga sem gerar nova cobrança. É preciso verificar se o reagendamento sem penalização
de fato preserva a continuidade de uso, e se a *Gestão acolhedora da carga diária*
(CP5) é percebida como apoio e não como mais uma métrica de cobrança. A avaliação dos
resultados ao final de cada iteração, tarefa de gerenciamento de projeto prevista no
próprio OpenUP e não uma cerimônia do Scrum, permite testar essas hipóteses em ciclos
curtos, evitando que a equipe invista um semestre inteiro em uma solução distante da
realidade das usuárias.

### 3. Adequação ao porte da equipe e ao prazo acadêmico

O fator decisivo não é o porte da equipe, uma vez que tanto o OpenUP quanto o Scrum + XP
são indicados para equipes pequenas e co-localizadas. O que diferencia as duas
alternativas é a aderência à estrutura de trabalho imposta pelo calendário da disciplina.
As fases do OpenUP (Concepção, Elaboração, Construção e Transição) acomodam a governança
por marcos exigida pelas Unidades da disciplina, sem interromper a Engenharia de
Requisitos entre uma fase e outra, conforme descrito na
[Seção 4.2](#42-fases-do-openup-e-ciclo-iterativo). Por não prescrever práticas técnicas
específicas, o OpenUP deixa a equipe livre para adotar, por iniciativa própria, práticas de
qualidade adequadas ao tratamento de dados sensíveis, como a integração contínua e os
testes de aceitação automatizados. A essa disciplina de fases soma-se o quadro Kanban,
detalhado na [Seção 4.3](#43-uso-do-quadro-kanban), que torna visível o andamento do
trabalho ao longo do semestre.

### 4. Simplicidade da gestão do fluxo pelo quadro

A escolha de usar do Kanban apenas o quadro, e não o método completo como framework de
gestão, é deliberada. Para uma equipe pequena e co-localizada, com o prazo de um
semestre, o quadro oferece o essencial (organização dos itens e visibilidade do fluxo)
sem sobrepor ao OpenUP uma segunda camada de papéis, políticas e métricas. A governança
por fases e o caráter iterativo já vêm do OpenUP, detalhado na
[Seção 4.2](#42-fases-do-openup-e-ciclo-iterativo); ao quadro cabe apenas organizar os
itens e tornar visível como eles avançam, conforme a
[Seção 4.3](#43-uso-do-quadro-kanban).
