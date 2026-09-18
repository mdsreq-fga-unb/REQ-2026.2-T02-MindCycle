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

A abordagem é híbrida no sentido de combinar a **disciplina de processo do OpenUP** com a
**gestão visual de fluxo de um board Kanban**. O OpenUP é o processo adotado por inteiro:
ordena o ciclo de vida nas quatro fases descritas na Seção 4.2, mantém o desenvolvimento
iterativo e incremental e conduz as atividades de Engenharia de Requisitos ao longo de todo
o projeto. Do Kanban, adota-se **exclusivamente o board** — o quadro visual com colunas,
usado para organizar os itens de trabalho e dar visibilidade ao fluxo. Nenhum outro
framework compõe a estratégia: não há papéis, cerimônias, sprints ou artefatos de Scrum, nem
o conjunto de práticas do XP. O Quadro 4.1 delimita o que é utilizado de cada referência.

| Referência | O que é utilizado | O que **não** é utilizado |
|---|---|---|
| **OpenUP** (processo) | Ciclo de vida iterativo e incremental; as quatro fases (Concepção, Elaboração, Construção e Transição); detalhamento progressivo dos requisitos; micro-incrementos com colaboração direta com os stakeholders; papéis enxutos (Analista, Desenvolvedor, Testador, Gerente de Projeto), descritos na [Seção 7.1](../07-interacao-equipe-cliente/#71-composição-da-equipe). | Disciplinas e artefatos pesados do Unified Process (RUP); documentação exaustiva antecipada. |
| **Kanban** (gerenciamento) | Apenas o **board**: quadro visual com colunas para organização dos itens e visibilidade do fluxo, com limites de trabalho em progresso (WIP), políticas de entrada e saída, marcação de bloqueios e métricas de fluxo, detalhados na [Seção 4.5](#45-operacionalização-do-board-kanban). | O método Kanban como framework de gestão completo; substituição do ciclo de vida iterativo do OpenUP por fluxo puramente contínuo. |
| **Scrum** | — | Não utilizado: sem papéis (Scrum Master, Product Owner), sprints, cerimônias ou artefatos de Scrum. |
| **XP** | — | Não utilizado como framework de práticas. |

<span class="quadro-fonte">**Quadro 4.1** – Elementos utilizados de cada referência e limites da estratégia. Fonte: elaborado pela equipe.</span>

## 4.2 As Quatro Fases do OpenUP

O OpenUP organiza o ciclo de vida em quatro fases, que ordenam o projeto por marcos de
governança. As fases **não são etapas estanque**: dentro de cada uma o desenvolvimento
permanece iterativo e incremental, e as atividades de Engenharia de Requisitos continuam
ativas, com peso variável. O quadro a seguir descreve cada fase e a associa às releases do
[cronograma](../06-cronograma-e-entregas/).

| Fase | Descrição | No MindCycle |
|---|---|---|
| **Concepção** (Iniciação) | A equipe e os interessados definem o escopo, os objetivos, a viabilidade e o caso de negócio do projeto. O foco é entender o problema antes de detalhar a arquitetura. | Release 1: caracterização do problema, mapa de stakeholders, segmentação e Documento de Visão. |
| **Elaboração** | Dedicada ao detalhamento da arquitetura da solução e à mitigação dos riscos mais significativos; a estabilidade do projeto é validada nesta etapa. | Release 2: requisitos detalhados, arquitetura, mitigação dos riscos críticos (proteção dos dados sensíveis e motor de replanejamento), backlog e MVP delimitado. |
| **Construção** | Focada no desenvolvimento, implementação, testes e integração contínua do software; é onde a maior parte do produto é construída. | Release 3: incrementos funcionais das características priorizadas, com requisitos representados, verificados e validados. |
| **Transição** | Direcionada à entrega do produto final aos usuários, com testes finais, ajustes e implantação no ambiente de produção. | Release 4: homologação do MVP pelo cliente, ajustes finais e consolidação do Documento de Visão. |

<span class="quadro-fonte">**Quadro 4.2** – Fases do OpenUP e sua correspondência com as releases do MindCycle. Fonte: elaborado pela equipe.</span>

## 4.3 Quadro Comparativo

O Quadro 4.3, a seguir, apresenta algumas características que podem ser relacionadas ao
OpenUP + board Kanban e à combinação Scrum + XP, visando auxiliar no entendimento e na
justificativa da escolha mais adequada ao caso do MindCycle.

| Características | OpenUP + board Kanban | Scrum + XP |
|---|---|---|
| Ciclo de Vida | Ciclo de vida iterativo e incremental herdado do Unified Process, em versão simplificada e leve, no qual cada iteração produz uma versão incrementada do software, com o board dando visibilidade ao fluxo dos itens dentro e entre as iterações. | Ciclo de vida ágil, que inclui e supõe o iterativo e incremental e acrescenta comunicação e colaboração constantes com os stakeholders, entrega contínua de partes funcionais e feedback rápido do cliente. |
| Foco em Arquitetura | Mantém os princípios do Unified Process, priorizando na fase de Elaboração os requisitos de maior risco ou prioridade, porém em versão enxuta. O board apoia isso ao dar visibilidade explícita a essas tarefas de infraestrutura. | A arquitetura evolui ao longo das sprints, conforme funcionalidades e riscos são validados com usuárias e stakeholders. |
| Estrutura de Processos | Organizado nas quatro fases do UP (Concepção, Elaboração, Construção e Transição), que ordenam o ciclo de vida por marcos de governança, mas dentro das quais o desenvolvimento permanece iterativo e as atividades de Engenharia de Requisitos continuam ativas. O trabalho operacional diário é organizado no board. | Focado em sprints curtas de 1 a 4 semanas, com planejamento, revisão e retrospectiva, entregas incrementais e adaptação contínua. |
| Flexibilidade de Requisitos | Os requisitos são detalhados progressivamente à medida que os cartões de trabalho se movem no board, evitando especificações exaustivas de forma prematura. | Alta flexibilidade para mudanças no backlog a cada sprint, permitindo incorporar aprendizados sobre ciclo, sobrecarga, privacidade e bem-estar. |
| Colaboração com Cliente | Enfatiza a colaboração direta com stakeholders em vez de documentação extensiva, com validação contínua por demonstrações e pelo board (priorização no topo e validação individual de itens concluídos). | Envolvimento constante do cliente e das usuárias, com feedback ao final de cada sprint e refinamento contínuo dos requisitos. |
| Complexidade do Processo | Combina a governança estruturada das fases do OpenUP com a simplicidade operacional de um board (colunas visuais e políticas explícitas), sem introduzir um framework de gestão adicional. | Organiza o trabalho por sprints de duração fixa, com papéis, cerimônias e artefatos definidos pelo Scrum e documentação reduzida ao essencial. |
| Qualidade Técnica | Qualidade apoiada em validação contínua com stakeholders e em ciclos de feedback ao longo das iterações. O board adiciona limites de trabalho em progresso (WIP) para evitar sobrecarga. | Alta ênfase em qualidade técnica por meio das práticas do XP, relevantes para dados sensíveis e funcionalidades de apoio à decisão da usuária. |
| Práticas de Desenvolvimento | Não prescreve práticas técnicas específicas; a equipe adota, no âmbito do OpenUP, as práticas de qualidade que julgar adequadas ao tratamento de dados sensíveis (por exemplo, integração contínua e testes de aceitação automatizados). | Inclui práticas prescritas como TDD, refatoração contínua, integração contínua e programação em pares, apoiando confiabilidade e manutenção. |
| Adaptação ao Projeto MindCycle | Adequado, pois há mitigação de riscos críticos (segurança de dados e motor de replanejamento) na fase de Elaboração e o board torna visível o andamento e os gargalos, absorvendo descobertas de pesquisa e evitando metas rígidas. | Permite investigar progressivamente experiências sensíveis de uso e ajustar as características do produto a cada ciclo de validação. |
| Documentação | Adota conjunto mínimo de artefatos (Visão, Casos de Uso ou Histórias de Usuário, Requisitos Técnicos e Requisitos Não Funcionais), criados apenas quando agregam valor tangível. | Minimiza a documentação formal, mantendo registros essenciais para rastreabilidade, backlog, critérios de aceite e validação. |
| Suporte a Equipes de Desenvolvimento | Indicado para equipes pequenas e co-localizadas, tipicamente de 3 a 10 pessoas, com comunicação direta preferível à documentação extensa e autonomia por meio do fluxo visível no board. | Mais indicado para equipes pequenas e colaborativas, com papéis flexíveis e forte comunicação ao longo das sprints. |

<span class="quadro-fonte">**Quadro 4.3** – Comparativo entre OpenUP + board Kanban e Scrum + XP. Fonte: elaborado pela equipe.</span>

## 4.4 Justificativa

Com base no quadro comparativo e nas características do projeto, o conjunto declarado na
Seção 4.1 — abordagem híbrida, ciclo de vida iterativo e incremental, processo OpenUP e
gestão do fluxo por um board Kanban — apresenta-se como a alternativa mais adequada ao
desenvolvimento do MindCycle, pelos seguintes motivos:

### 1. Requisitos emergentes e refinamento contínuo

O produto depende da compreensão de experiências sensíveis e pouco documentadas, como
variações de energia ao longo do ciclo menstrual, sobrecarga executiva e culpa punitiva.
Projetos com requisitos voláteis ou mal compreendidos inicialmente são precisamente o
cenário de aplicação do OpenUP, que detalha os requisitos progressivamente ao longo das
iterações, evitando a especificação excessiva antecipada e elaborando os detalhes em
colaboração direta com os stakeholders no momento da implementação. Combinado ao
reabastecimento contínuo do backlog no board, isso permite ajustar o escopo a cada
iteração, incorporando o feedback dos pesquisadores do LabLivre e das usuárias
representativas dos segmentos definidos na
[Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes). Isso é decisivo em
características cujo comportamento correto não pode ser deduzido antecipadamente, como o
*Adaptar planejamento por fase de ciclo* (CP3) e o *Registrar nível de energia* (CP4).

### 2. Validação frequente de hipóteses de valor

As características do MindCycle são, em boa medida, hipóteses sobre o que reduz a
sobrecarga sem gerar nova cobrança. É preciso verificar se o reagendamento sem penalização
de fato preserva a continuidade de uso, e se a *Adaptabilidade da carga diária visível*
(CP5) é percebida como apoio e não como mais uma métrica de cobrança. O caráter iterativo e
incremental do OpenUP permite testar essas hipóteses em ciclos curtos, com incrementos
demonstráveis a cada iteração, evitando que a equipe invista um semestre inteiro em uma
solução distante da realidade das usuárias.

### 3. Governança por fases e adequação ao prazo acadêmico

As quatro fases do OpenUP — Concepção, Elaboração, Construção e Transição — ordenam o ciclo
de vida por marcos de governança, sem congelar o trabalho: dentro de cada fase o
desenvolvimento permanece iterativo e as atividades de Engenharia de Requisitos continuam
ativas, apenas com peso variável. Essa estrutura acomoda naturalmente o calendário da
disciplina, com o esforço de Engenharia de Requisitos concentrado na Concepção e na
Elaboração (Releases 1 e 2) e os incrementos funcionais nas fases de Construção e Transição
(Releases 3 e 4), sem que a Engenharia de Requisitos se encerre ao entrarem os incrementos,
como detalha a [Seção 5.2](../05-engenharia-de-requisitos/). Por não prescrever práticas
técnicas específicas, o OpenUP deixa a equipe livre para adotar práticas de qualidade
adequadas ao tratamento de dados sensíveis, como a integração contínua e os testes de
aceitação automatizados.

### 4. Simplicidade da gestão do fluxo pelo board

A escolha de usar do Kanban apenas o board — e não um framework de gestão adicional — é
deliberada: para uma equipe pequena e co-localizada, com o prazo de um semestre, o board
oferece o essencial (visibilidade do fluxo, limites de WIP e políticas explícitas de entrada
e saída) sem sobrepor ao OpenUP uma segunda camada de papéis e cerimônias. A governança por
fases e o caráter iterativo já vêm do OpenUP; ao board cabe apenas organizar os itens e
tornar visível como eles avançam, conforme detalhado na
[Seção 4.5](#45-operacionalização-do-board-kanban).

## 4.5 Operacionalização do Board Kanban

O board é o instrumento de organização e de fluxo operado no dia a dia. Sua configuração
para o MindCycle é a seguinte.

**Colunas do fluxo.** O board, mantido no Notion (ver
[Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação)), organiza o trabalho em seis
colunas:

| Coluna | Significado |
|---|---|
| **Backlog do Produto** | Itens declarados e priorizados, ainda não puxados para a iteração. |
| **A Fazer** | Itens selecionados para a iteração corrente, prontos pelo DoR. |
| **Em Desenvolvimento** | Item sendo implementado. |
| **Em Verificação** | Revisão de código, testes de aceitação e checagem do DoD. |
| **Em Validação** | Aguardando validação com a cliente profissional de saúde ou a usuária representativa. |
| **Concluído** | Item que cumpriu o DoD e foi validado com os stakeholders. |

**Limites de WIP.** Cada coluna de trabalho ativo tem um limite explícito de itens
simultâneos, dimensionado à capacidade da equipe: *Em Desenvolvimento* e *Em Verificação*
limitadas a **3** itens cada, e *Em Validação* a **4**, para não acumular itens à espera das
reuniões mensais de validação. Atingido o limite, nenhum item novo é puxado até que um saia
da coluna, o que expõe gargalos e protege a equipe da sobrecarga — o mesmo princípio que o
produto defende para as usuárias.

**Políticas de entrada e saída.** A passagem entre colunas é governada por critérios
explícitos: um item só entra em *A Fazer* se cumprir o **Definition of Ready (DoR)** e só
sai de *Em Verificação* se cumprir o **Definition of Done (DoD)**, ambos regidos pelo
processo de validação da
[Seção 7.3](../07-interacao-equipe-cliente/#73-processo-de-validação). Itens com conteúdo de
saúde só entram no fluxo após revisão do profissional de saúde.

**Tratamento de bloqueios.** Um item impedido recebe uma marcação visível de *bloqueado*,
com o motivo e o responsável registrados no cartão, e deixa de contar tempo de trabalho
ativo. Bloqueios são o primeiro assunto da reunião semanal de sincronização
([Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação)); os que não se resolvem nesse
âmbito são escalados pelo Gerente de Projeto.

**Métricas adotadas.** Acompanham-se três métricas simples de fluxo: o *lead time* (tempo
do Backlog ao Concluído), o *throughput* (itens concluídos por iteração) e a contagem de
itens bloqueados. Servem de base objetiva para a melhoria contínua do processo pela equipe,
sem se tornarem meta individual de produtividade.

**Relação entre o board e o ciclo de vida iterativo.** As duas dinâmicas coexistem sem
contradição: as fases e as iterações do OpenUP fornecem os marcos de governança e o ritmo de
planejamento e de avaliação dos incrementos, enquanto o board governa o fluxo diário dos
itens dentro e entre as iterações. Um item não precisa esperar o fim da iteração para
avançar de coluna ou ser concluído; no início de cada iteração a equipe puxa para o board o
conjunto de itens priorizados, e o board determina como esse conjunto flui até *Concluído*.
Itens não finalizados não são penalizados: permanecem no fluxo e são repriorizados na
iteração seguinte, coerentemente com a lógica não punitiva do produto.
