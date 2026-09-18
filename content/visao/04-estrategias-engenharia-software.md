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

A abordagem é híbrida porque a base — processo OpenUP e framework Kanban — é complementada
por um conjunto **delimitado e nominal** de práticas de Scrum e de XP. A estratégia não
acumula referências de forma aberta: cada elemento incorporado tem origem justificada e um
limite explícito, registrados no Quadro 4.1 a seguir. O que não consta do quadro está
deliberadamente fora do processo — não há papéis de *Scrum Master* ou *Product Owner*, não
há *sprints* de escopo congelado nem compromisso de *sprint*, não há estimativa por *story
points* nem *velocity*, e as únicas práticas técnicas de XP adotadas são as que o próprio
quadro nomeia.

| Referência | O que é utilizado | O que **não** é utilizado |
|---|---|---|
| **OpenUP** (processo) | Ciclo de vida iterativo e incremental; as quatro fases (Concepção, Elaboração, Construção e Transição) como marcos de governança; detalhamento progressivo dos requisitos; micro-incrementos com colaboração direta com os stakeholders; papéis enxutos (Analista, Desenvolvedor, Testador, Gerente de Projeto), descritos na [Seção 7.1](../07-interacao-equipe-cliente/#71-composição-da-equipe). | Disciplinas e artefatos pesados do Unified Process (RUP); documentação exaustiva antecipada. |
| **Kanban** (gerenciamento) | Quadro visual, colunas de fluxo, limites de trabalho em progresso (WIP), políticas explícitas de entrada e saída, tratamento de bloqueios e métricas de fluxo, detalhados na [Seção 4.4](#44-operacionalização-do-kanban). | Substituição do ciclo de vida iterativo por fluxo puramente contínuo; abolição das iterações de cadência fixa. |
| **Scrum** (framework, uso parcial) | Cerimônias de cadência (Planejamento, Revisão e Retrospectiva da Iteração) e o refinamento de *Product Backlog*, como ritmo de inspeção e adaptação, descritos na [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação). | Papéis do Scrum (*Scrum Master*, *Product Owner*); *sprints* de escopo congelado; compromisso e cancelamento de *sprint*; estimativa por *story points* e *velocity*. |
| **XP** (práticas técnicas, uso parcial) | Integração contínua, testes de aceitação automatizados e programação em pares, voltados à confiabilidade no tratamento de dados sensíveis. | *TDD* obrigatório em todo o código, *metaphor*, *planning game* e demais práticas não nomeadas. |

<span class="quadro-fonte">**Quadro 4.1** – Elementos utilizados de cada referência e limites da estratégia. Fonte: elaborado pela equipe.</span>

Os termos *iteração*, *Revisão*, *Retrospectiva*, *Planejamento da Iteração* e *Product
Backlog*, usados nas demais seções deste documento, referem-se a esses elementos
delimitados, e não à adoção integral do Scrum.

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
| Estrutura de Processos | Organizado nas quatro fases do UP (Concepção, Elaboração, Construção e Transição), que ordenam o ciclo de vida por marcos de governança, mas dentro das quais o desenvolvimento permanece iterativo e as atividades de Engenharia de Requisitos continuam ativas. Internamente, o trabalho operacional diário é gerido pelo fluxo visual e contínuo. | Focado em sprints curtas de 1 a 4 semanas, com planejamento, revisão e retrospectiva, entregas incrementais e adaptação contínua. |
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
As quatro fases do OpenUP — Concepção, Elaboração, Construção e Transição — ordenam o ciclo
de vida por marcos de governança, sem congelar o trabalho: dentro de cada fase o
desenvolvimento permanece iterativo e as atividades de Engenharia de Requisitos continuam
ativas, apenas com peso variável. Assim, o esforço de Engenharia de Requisitos concentra-se
nas Releases 1 e 2, mas não se encerra ao entrarem os incrementos funcionais na Release 3,
como detalha a [Seção 5.2](../05-engenharia-de-requisitos/). Por não prescrever práticas
técnicas específicas, o OpenUP deixa a equipe livre para adotar, no âmbito da abordagem
híbrida, práticas de qualidade adequadas ao tratamento de dados sensíveis, como a
integração contínua e os testes de aceitação automatizados. A essa disciplina de fases
soma-se a gestão de fluxo do Kanban, com o uso de quadro visual e limites de trabalho em
progresso (WIP), que torna visível o andamento do trabalho e sustenta uma cadência regular
de revisão e validação com o cliente ao longo do semestre.

### 4. Adaptação da estratégia: por que incorporar práticas de Scrum e de XP

Embora o quadro comparativo (Quadro 4) contraponha OpenUP + Kanban a Scrum + XP como
conjuntos, a estratégia final não é a escolha pura de um dos lados, e sim uma adaptação: o
par OpenUP + Kanban permanece como base — processo e gerenciamento — e dele se
**tomam emprestados**, de forma delimitada, elementos das duas referências da alternativa
não escolhida. Essa incorporação é deliberada e resolve duas lacunas que o OpenUP + Kanban,
sozinho, deixaria em aberto no contexto do MindCycle:

- **Do Scrum**, adotam-se apenas as cerimônias de cadência (Planejamento, Revisão e
  Retrospectiva da Iteração) e o refinamento de *Product Backlog*. O OpenUP não impõe esse
  ritmo fixo de inspeção e adaptação, e o Kanban, por si, trabalha em fluxo contínuo sem
  pontos obrigatórios de revisão. Como a validação de hipóteses sensíveis (motivo 2) exige
  momentos regulares de feedback com a cliente profissional de saúde e a usuária
  representativa, essas cerimônias dão à cadência quinzenal os marcos de sincronização de
  que o projeto precisa — sem trazer os papéis, os *sprints* de escopo congelado ou as
  métricas de *velocity* do Scrum.
- **Do XP**, adotam-se apenas integração contínua, testes de aceitação automatizados e
  programação em pares. O OpenUP não prescreve práticas técnicas (ver linha *Práticas de
  Desenvolvimento* do Quadro 4), lacuna crítica para um produto que manipula dados
  sensíveis de ciclo e saúde. Essas práticas suprem exatamente essa ausência, elevando a
  confiabilidade sem adotar o XP por inteiro.

A abordagem híbrida é, portanto, o mecanismo que autoriza e limita essas trocas: as
iterações de cadência fixa convivem com o fluxo contínuo do Kanban descrito na
[Seção 4.4](#44-operacionalização-do-kanban), e as práticas de qualidade escolhidas
convivem com a governança por fases do OpenUP, cada uma dentro das fronteiras fixadas no
Quadro 4.1.

## 4.4 Operacionalização do Kanban

O Kanban é o framework de gerenciamento efetivamente operado no dia a dia. Sua configuração
para o MindCycle é a seguinte.

**Colunas do fluxo.** O quadro, mantido no Notion (ver
[Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação)), organiza o trabalho em seis
colunas:

| Coluna | Significado |
|---|---|
| **Backlog do Produto** | Itens declarados e priorizados, ainda não puxados para a iteração. |
| **A Fazer (Iteração)** | Itens selecionados no Planejamento da Iteração, prontos pelo DoR. |
| **Em Desenvolvimento** | Item sendo implementado, em programação em pares. |
| **Em Verificação** | Revisão de código, testes de aceitação e checagem do DoD. |
| **Em Validação** | Aguardando validação com a cliente profissional de saúde ou a usuária representativa. |
| **Concluído** | Item que cumpriu o DoD e foi validado com os stakeholders. |

**Limites de WIP.** Cada coluna de trabalho ativo tem um limite explícito de itens
simultâneos, dimensionado à capacidade da equipe de sete integrantes que trabalham em
pares: *Em Desenvolvimento* e *Em Verificação* limitadas a **3** itens cada, e *Em
Validação* a **4**, para não acumular itens à espera das reuniões mensais de validação.
Atingido o limite, nenhum item novo é puxado até que um saia da coluna, o que expõe
gargalos e protege a equipe da sobrecarga — o mesmo princípio que o produto defende para as
usuárias.

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
itens bloqueados. Servem à Retrospectiva da Iteração como base objetiva de melhoria do
processo, sem se tornarem meta individual de produtividade.

**Relação entre fluxo contínuo e iterações quinzenais.** As duas dinâmicas coexistem sem
contradição: as iterações de duas semanas fixam a **cadência de planejamento e validação**
(as cerimônias da [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação)), enquanto o
Kanban governa o **fluxo diário** dentro e entre as iterações. Um item não precisa esperar o
fim da iteração para avançar de coluna ou ser concluído; o Planejamento da Iteração define
o conjunto puxado para o período, e o quadro determina como esse conjunto flui até
*Concluído*. Itens não finalizados não são penalizados: permanecem no fluxo e são
repriorizados no refinamento seguinte, coerentemente com a lógica não punitiva do produto.
