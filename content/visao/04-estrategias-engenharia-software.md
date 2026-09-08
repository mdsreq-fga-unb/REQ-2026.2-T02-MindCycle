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
| **Framework de Gerenciamento** | Kanban |

## 4.2 Quadro Comparativo

O Quadro 4, a seguir, apresenta algumas características que podem ser relacionadas ao
OpenUP + Kanban e à combinação Scrum + XP, visando auxiliar no entendimento e na
justificativa da escolha mais adequada ao caso do MindCycle. Como ambas as opções
combinam processos de desenvolvimento com frameworks de gerenciamento, a comparação
avalia o ecossistema sinérgico de cada conjunto integrado.

| Características | OpenUP + Kanban | Scrum + XP |
|---|---|---|
| Ciclo de Vida | Ciclo de vida iterativo e incremental herdado do Unified Process, em versão simplificada e leve, no qual cada iteração produz uma versão incrementada do software, combinado a uma dinâmica de fluxo contínuo em que entregas e passagem de tarefas não dependem estritamente do término de iterações com tempo fixo. | Ciclo de vida ágil, que inclui e supõe o iterativo e incremental e acrescenta comunicação e colaboração constantes com os stakeholders, entrega contínua de partes funcionais e feedback rápido do cliente. |
| Foco em Arquitetura | Mantém os princípios do Unified Process, priorizando nas iterações iniciais os requisitos de maior risco ou prioridade, porém em versão enxuta. O Kanban apoia isso ao dar visibilidade explícita a essas tarefas de infraestrutura. | A arquitetura evolui ao longo das sprints, conforme funcionalidades e riscos são validados com usuárias e stakeholders. |
| Estrutura de Processos | Organizado nas quatro fases sequenciais do UP (Concepção, Elaboração, Construção e Transição) para fins de governança de marcos. Internamente, o trabalho operacional diário é gerido pelo fluxo visual e contínuo. | Focado em sprints curtas de 1 a 4 semanas, com planejamento, revisão e retrospectiva, entregas incrementais e adaptação contínua. |
| Flexibilidade de Requisitos | Os requisitos são detalhados progressivamente à medida que os cartões de trabalho se movem no fluxo, evitando especificações exaustivas de forma prematura. | Alta flexibilidade para mudanças no backlog a cada sprint, permitindo incorporar aprendizados sobre ciclo, sobrecarga, privacidade e bem-estar. |
| Colaboração com Cliente | Enfatiza a colaboração direta com stakeholders em vez de documentação extensiva, com validação contínua por revisões, demonstrações, testes e por quadro visual (priorização no topo e validação individual de itens concluídos). | Envolvimento constante do cliente e das usuárias, com feedback ao final de cada sprint e refinamento contínuo dos requisitos. |
| Complexidade do Processo | Combina a governança estruturada das fases do OpenUP com a simplicidade operacional do Kanban (gerido por colunas visuais e políticas explícitas, sem cerimônias obrigatórias). | Organiza o trabalho por sprints de duração fixa, com papéis, cerimônias e artefatos definidos pelo Scrum e documentação reduzida ao essencial. |
| Qualidade Técnica | Qualidade apoiada em validação contínua com stakeholders e em ciclos de feedback rápidos ao longo das iterações. O Kanban adiciona limites de trabalho em progresso (limite de WIP) para evitar sobrecarga. | Alta ênfase em qualidade técnica por meio das práticas do XP, relevantes para dados sensíveis e funcionalidades de apoio à decisão da usuária. |
| Práticas de Desenvolvimento | Não prescreve práticas técnicas específicas de engenharia; concentra-se no equilíbrio entre disciplina de governança e agilidade no fluxo. | Inclui práticas como TDD, refatoração contínua, integração contínua e programação em pares, apoiando confiabilidade e manutenção. |
| Adaptação ao Projeto MindCycle | Adequado, pois há mitigação de riscos críticos (segurança de dados e motor de replanejamento) nas fases iniciais e o fluxo contínuo absorve descobertas de pesquisa e evita metas rígidas, mas a combinação depende de políticas explícitas para suprir a ausência de práticas técnicas de qualidade. | Permite investigar progressivamente experiências sensíveis de uso e ajustar as características do produto a cada ciclo de validação. |
| Documentação | Adota conjunto mínimo de artefatos (Visão, Casos de Uso ou Histórias de Usuário, Requisitos Técnicos e Requisitos Não Funcionais), criados apenas quando agregam valor tangível. | Minimiza a documentação formal, mantendo registros essenciais para rastreabilidade, backlog, critérios de aceite e validação. |
| Suporte a Equipes de Desenvolvimento | Indicado para equipes pequenas e co-localizadas, tipicamente de 3 a 10 pessoas, com comunicação direta preferível à documentação extensa e autonomia por meio do fluxo e limitação WIP. | Mais indicado para equipes pequenas e colaborativas, com papéis flexíveis e forte comunicação ao longo das sprints. |

<span class="quadro-fonte">**Quadro 4** – Comparativo entre OpenUP + Kanban e Scrum + XP. Fonte: elaborado pela equipe.</span>

## 4.3 Justificativa

Com base no quadro comparativo e nas características do projeto, o conjunto declarado na
Seção 4.1 — abordagem híbrida, ciclo de vida iterativo e incremental, processo OpenUP e
framework de gerenciamento Kanban, combinado com práticas de Scrum e XP — apresenta-se
como a alternativa mais adequada ao desenvolvimento do MindCycle, pelos seguintes
motivos:

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
*Adaptar planejamento por fase de ciclo* (CP3) e o *Registrar nível de energia* (CP4).

### 2. Validação frequente de hipóteses de valor

As características do MindCycle são, em boa medida, hipóteses sobre o que reduz a
sobrecarga sem gerar nova cobrança. É preciso verificar se o reagendamento sem penalização
de fato preserva a continuidade de uso, e se o *Adaptar a carga diária visível*
(CP5) é percebido como apoio e não como mais uma métrica de cobrança. As revisões ao final
de cada iteração permitem testar essas hipóteses em ciclos curtos, evitando que a equipe
invista um semestre inteiro em uma solução distante da realidade das usuárias.

### 3. Adequação ao porte da equipe e ao prazo acadêmico

O fator decisivo não é o porte da equipe, uma vez que tanto o OpenUP quanto o Scrum + XP
são indicados para equipes pequenas e co-localizadas. O que diferencia as duas
alternativas é a aderência à estrutura de trabalho imposta pelo calendário da disciplina.
As quatro fases do OpenUP — Concepção, Elaboração, Construção e Transição — acomodam
naturalmente o esforço de Engenharia de Requisitos concentrado nas Releases 1 e 2, antes
que os incrementos funcionais tenham início na Release 3. Por não prescrever práticas
técnicas específicas, o OpenUP deixa a equipe livre para adotar, no âmbito da abordagem
híbrida, práticas de qualidade adequadas ao tratamento de dados sensíveis, como a
integração contínua e os testes de aceitação automatizados. A essa disciplina de fases
soma-se a gestão de fluxo do Kanban, com o uso de quadro visual e limites de trabalho em
progresso (WIP), que torna visível o andamento do trabalho e sustenta uma cadência regular
de revisão e validação com o cliente ao longo do semestre.
