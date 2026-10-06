---
title: "5. Engenharia de Requisitos"
numero: "5"
weight: 5
resumo: "Quais atividades e técnicas de ER a equipe aplica em cada fase do processo, e o resultado esperado de cada uma."
---

## 5.1 Atividades e Técnicas de ER

As técnicas desta seção estão organizadas pelos eventos que estruturam o trabalho da
equipe. No OpenUP, cada fase é composta por uma ou mais iterações. Por isso, os eventos de
iteração (Planejamento, Execução, Revisão e Retrospectiva da Iteração) se repetem a cada
iteração da Concepção, da Elaboração e da Construção. Na Transição, que corresponde ao
fechamento da Release 4, ocorrem apenas a revisão de homologação do MVP e a retrospectiva
final. Já o Planejamento da Release ocorre uma única vez, no início do projeto, e o
Planejamento da Próxima Release ocorre no fechamento das Releases 1, 2 e 3. A
correspondência entre fases, atividades de ER e técnicas é apresentada no Quadro 5, na
[Seção 5.2](#52-engenharia-de-requisitos-e-a-abordagem-híbrida-openup--kanban).

### Planejamento da Release

**Elicitação e Descoberta:**

- **Entrevistas:** Entrevistas com a cliente profissional de saúde permitem compreender
  como sintomas, fases do ciclo e disposição podem ser tratados pelo produto sem
  recomendações clínicas indevidas, enquanto entrevistas com Daniela Soares, como usuária
  representativa, e com mulheres representativas dos segmentos
  definidos na [Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes) ajudam a
  entender como organizam hoje suas tarefas e como percebem as variações de energia, foco
  e disposição ao longo do mês. Por envolverem relatos sobre saúde e sofrimento no
  trabalho, as entrevistas serão conduzidas com consentimento explícito e registro
  anonimizado.
- **Brainstorming:** Sessões de brainstorming permitem que a equipe e os stakeholders
  discutam alternativas para mecanismos não punitivos de acompanhamento, incluindo formas
  de sinalizar sobrecarga sem reproduzir a lógica de cobrança identificada no problema,
  sustentando a característica *Gestão acolhedora da carga diária* (CP5) e a definição de
  mecanismos de retomada sem penalização.
- **Análise de Domínio de Negócio:** A análise do domínio de saúde menstrual, função
  executiva e produtividade ajuda a equipe a construir vocabulário compartilhado e a
  evitar o tratamento determinístico do ciclo, risco explicitamente mapeado como efeito
  emergente na [Seção 3](../03-intervencao-social/), e prepara os requisitos relacionados
  à saúde para a revisão da cliente profissional de saúde.
- **Personas e Jornadas de Usuário:** A construção de personas a partir dos três segmentos
  de clientes e do recorte transversal definidos na
  [Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes), somada ao mapeamento da
  jornada de um dia de trabalho em período de alta e de baixa capacidade, permite revelar
  necessidades latentes que não aparecem nas entrevistas, como o esforço compensatório e o
  presenteísmo silencioso.

**Análise e Consenso:**

- **Priorização MoSCoW:** No Planejamento da Release, a técnica MoSCoW é aplicada às
  características de produto (CP1 a CP7), classificando-as em Must have, Should have,
  Could have e Won't have for now, para indicar quais delas, como *Registro e análise de
  sintomas e disposição* (CP1) e *Planejamento adaptativo das tarefas* (CP4), são
  essenciais ao produto. O escopo do MVP entregável no semestre é delimitado depois, quando
  a técnica é reaplicada aos requisitos funcionais no Planejamento da Iteração e o
  resultado é levado à cliente profissional de saúde, a quem cabe a priorização final.
- **Matriz Valor de Negócio × Esforço Técnico:** Avaliar cada característica quanto ao
  valor percebido pela usuária e à complexidade de implementação permite identificar quais
  entregas produzem maior impacto com menor custo, decisão necessária diante do prazo
  acadêmico limitado e do tamanho reduzido da equipe.

**Declaração:**

- **Épicos, Critérios de Aceitação em nível alto:** Os objetivos específicos e as
  características de produto são declarados na Visão do Produto, registrada neste
  documento, e dão origem ao backlog do produto, mantido no Notion e acompanhado no quadro
  Kanban. A partir de cada
  característica, a equipe declara os épicos iniciais, acompanhados de critérios de
  aceitação em nível alto, que serão detalhados nas iterações seguintes. Cada épico é derivado de uma característica de produto (CP1 a CP7)
  e cada característica está vinculada a um objetivo específico (OE1 a OE3), preservando a rastreabilidade bidirecional estabelecida
  na [Seção 2.3](../02-solucao-proposta/#23-características-do-produto-cp) e evitando que
  funcionalidades entrem no backlog sem origem justificada.

### Planejamento da Iteração

**Elicitação e Descoberta:**

- **Entrevistas:** Realizar entrevistas complementares com usuárias representativas
  permite refinar detalhes dos requisitos da iteração, como quais sintomas devem estar
  disponíveis no registro de sintomas e disposição ou como a recomendação do dia deve se
  comportar em períodos de baixa capacidade, garantindo que não haja lacunas antes do
  desenvolvimento.
- **Análise Documental:** Revisar documentos existentes, como a análise das soluções
  concorrentes descrita na
  [Seção 2.5](../02-solucao-proposta/#25-pesquisa-de-mercado-e-análise-competitiva) e a
  literatura sobre função executiva, auxilia na identificação de padrões de solução já
  testados no mercado e contribui para o refinamento dos requisitos da iteração sem
  reelicitar o que já está documentado.
- **Análise de Tarefas:** Decompor em etapas menores as atividades reais da usuária em um
  dia de trabalho, identificando objetivos, decisões e pontos de erro, apoia a descoberta
  dos requisitos de usabilidade e desempenho das características *Planejamento adaptativo das
  tarefas* (CP4) e *Gestão acolhedora da carga diária* (CP5), e
  evidencia a diferença entre o trabalho prescrito pelo plano do dia e o trabalho realmente
  executado.

**Análise e Consenso:**

- **Facilitação Round Robin com Registro de Decisões:** No planejamento, a equipe analisa
  a ordem e as dependências entre os itens da iteração, como as partes da visão que
  dependem da caracterização do problema ou as dependências técnicas entre
  funcionalidades, a exemplo da relação entre o registro de sintomas e disposição e o
  acompanhamento do ciclo (CP1 e CP2) e o planejamento adaptativo das tarefas (CP4), ou dos
  mecanismos de proteção dos dados sensíveis (CP3). A análise é conduzida em round robin: cada integrante
  expõe, com o mesmo tempo de fala, sua avaliação sobre viabilidade, dependências e ordem
  de execução, o que evita que a decisão se concentre em quem fala mais. As divergências,
  os critérios usados e as decisões tomadas são registrados no card de cada item no
  Notion, o que torna o consenso rastreável.
- **Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico:** Quando os requisitos
  funcionais já estão declarados, as técnicas descritas no Planejamento da Release são
  reaplicadas a eles. A proposta de escopo do MVP resultante é levada à cliente
  profissional de saúde, que confirma a priorização final em sua reunião mensal.

**Declaração:**

- **Declarações Textuais Estruturadas (Templates), Texto Estruturado/Tabular:** Quando a
  iteração tem como objetivo declarar os requisitos, os requisitos funcionais e não
  funcionais são escritos a partir de cada característica de produto, no padrão "Deve ser
  possível à usuária" seguido da ação esperada, e organizados em tabelas com código, nome,
  descrição, requisitos não funcionais associados e vínculo com a característica e o
  objetivo específico. O padrão único reduz a variação de estilo entre os integrantes,
  facilita a revisão coletiva e mantém a rastreabilidade de cada requisito.
- **Critérios de Aceitação:** Definir critérios de aceitação claros e verificáveis para
  cada história de usuário derivada dos requisitos funcionais facilita a validação pelas partes interessadas e assegura que
  os desenvolvedores tenham informação suficiente antes de iniciar. No caso do MindCycle,
  os critérios devem incluir condições de privacidade e ausência de linguagem punitiva,
  pois esses atributos são parte do valor do produto e não detalhes de interface.

**Verificação e Validação:**

- **Checklist Estruturado com os Itens do DoR:** Antes de uma história entrar em
  desenvolvimento, a equipe percorre um checklist estruturado com os itens do Definition
  of Ready (DoR), verificando se os requisitos da história estão claramente definidos,
  documentados e com critérios de aceitação estabelecidos, conforme a
  [Seção 7.3](../07-interacao-equipe-cliente/#73-processo-de-validação). O DoR é o conjunto
  de critérios de prontidão, e o checklist é a técnica que verifica o seu cumprimento:
  apenas as histórias que atendem a todos os itens entram na coluna *A Fazer* do quadro
  Kanban e são liberadas para desenvolvimento.

**Organização e Atualização:**

- **Estruturação Hierárquica do Backlog:** No refinamento do backlog, feito em uma sessão
  por iteração conduzida pela equipe antes do início da iteração, os itens são organizados
  na hierarquia épico, história de usuário e tarefa. Essa estrutura permite detalhar,
  estimar e priorizar cada item sem perder o vínculo com a característica de produto que o
  origina, considerando as limitações de tempo do semestre letivo. A prioridade final é
  confirmada pela cliente profissional de saúde em sua reunião mensal.

### Execução da Iteração

**Declaração:**

- **Storyboards Descritivos:** Representar narrativamente a jornada da usuária em um dia
  de baixa capacidade, combinando texto e sequência de quadros, torna tangível o
  comportamento esperado do sistema em situações de exceção e serve de insumo para novos
  requisitos e critérios de aceitação.

**Representação:**

- **Prototipação de Baixa Fidelidade:** Criar wireframes conceituais e protótipos de baixa
  fidelidade em Figma para as telas de registro de sintomas e disposição, de recomendação
  do dia e de retrospectiva mensal ajuda a equipe a representar as interações esperadas e permite discutir
  com as usuárias se a interface comunica apoio em vez de cobrança, antes que qualquer
  código seja escrito. Protótipos de alta fidelidade, por detalharem aparência e layout,
  pertencem ao design da solução e não à Engenharia de Requisitos.

**Verificação e Validação:**

- **Checklist Estruturado de Critérios de Qualidade, Revisão de Critérios de Aceitação:**
  Durante a execução, a equipe percorre um checklist estruturado de critérios de qualidade
  sobre os requisitos declarados na iteração, sejam requisitos funcionais e não funcionais
  ou histórias de usuário, e revisa os critérios de aceitação de cada história, verificando
  se cada requisito é
  claro, consistente, necessário, verificável e rastreável a um objetivo específico, e se
  o tratamento dos dados sensíveis corresponde ao que foi declarado.

**Organização e Atualização:**

- **Estruturação Hierárquica do Backlog:** Durante a execução, a revisão do backlog da
  iteração mantém os itens organizados na hierarquia épico, história de usuário e tarefa,
  detalhados, estimados e priorizados. Isso preserva a organização do conjunto de
  requisitos e permite ajustes rápidos conforme a equipe recebe novos feedbacks ou
  encontra obstáculos técnicos.

### Revisão da Iteração

**Verificação e Validação:**

- **Coleta de Feedback com Validação por Cenários de Uso:** Na Revisão da Iteração, a
  equipe demonstra o que foi produzido e percorre cenários de uso concretos com a
  participante externa daquela revisão, já que as revisões se alternam entre a cliente
  profissional de saúde e Daniela Soares, sem reunião conjunta. A cliente avalia os
  conteúdos relacionados à saúde e realiza a aceitação formal, e Daniela avalia
  usabilidade, linguagem, privacidade e experiência de uso. O feedback de cada uma é
  registrado no Notion, e os itens avaliados ficam na coluna *Em Validação* do quadro
  Kanban até a aceitação. Com isso, a equipe valida se os requisitos e as funcionalidades
  entregues correspondem às necessidades dessas partes interessadas e, sobretudo, se a
  hipótese central do produto se confirma, ou seja, se a solução reduz a sobrecarga
  percebida sem gerar uma nova forma de cobrança.

**Análise e Consenso:**

- **Negociação:** A negociação com a cliente profissional de saúde e com Daniela Soares
  define quais ajustes apontados na revisão são prioritários, respeitando o escopo e o
  prazo do semestre. Questões de saúde seguem a decisão da cliente, questões de experiência
  de uso seguem a avaliação da usuária representativa, e um ajuste que envolva os dois
  domínios volta ao backlog até que a decisão seja registrada, conforme a
  [Seção 7.2](../07-interacao-equipe-cliente/#72-comunicação).

**Organização e Atualização:**

- **Matriz de Rastreabilidade:** O resultado da negociação é incorporado aos requisitos
  afetados, com os *trade-offs* acordados explicitados. Os ajustes podem recair sobre os
  objetivos e as características registrados na Visão do Produto ou sobre as histórias de
  usuário e os critérios de aceitação mantidos no Notion. A matriz de rastreabilidade é
  consultada e atualizada para identificar quais objetivos, características e histórias
  cada ajuste afeta, de modo que o conjunto de requisitos reflita os consensos obtidos na
  revisão.

### Retrospectiva da Iteração

**Análise e Consenso:**

- **Facilitação Round Robin com Registro de Decisões, Análise de Causas, Resolução de
  Conflito:** Na retrospectiva, cada integrante expõe, com o mesmo tempo de fala, o que
  funcionou bem e o que poderia ser melhorado na iteração. Os pontos levantados passam por
  análise de causas, inclusive as falhas recorrentes na compreensão dos requisitos, e as
  divergências são tratadas por resolução de conflito. As ações de melhoria acordadas são
  registradas no Notion, com responsável, para serem aplicadas nas próximas iterações.

**Organização e Atualização:**

- **Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade:** Com base nas ações
  acordadas na retrospectiva, a equipe ajusta o fluxo de trabalho de engenharia de
  requisitos e revisa a estrutura em que os requisitos são organizados (hierarquia de
  épicos, histórias de usuário e tarefas) e rastreados (matriz de rastreabilidade). Isso
  torna o processo mais adaptável às particularidades de um produto cujos requisitos
  dependem de experiências subjetivas ainda em compreensão.

### Planejamento da Próxima Release

**Elicitação e Descoberta:**

- **Entrevistas, Análise de Domínio de Negócio:** Entrevistas com a cliente profissional de
  saúde e com Daniela Soares, feitas separadamente, somadas à análise continuada do
  domínio, ajudam a identificar novos requisitos para a próxima release. Este evento é também o momento de observar os efeitos emergentes
  previstos na [Seção 3](../03-intervencao-social/), como sinais de dependência excessiva da
  ferramenta ou descolamento entre as recomendações automáticas e a experiência real da
  usuária.

**Análise e Consenso:**

- **Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico:** A priorização MoSCoW e
  a avaliação de cada item quanto ao valor de negócio e ao esforço técnico ajudam a decidir
  quais funcionalidades serão priorizadas para a próxima release, considerando o impacto
  sobre os objetivos específicos do produto e o valor entregue às usuárias.

**Declaração:**

- **Épicos, Histórias de Usuário e Critérios de Aceitação:** Criar épicos e
  histórias de usuário a partir dos requisitos funcionais, acompanhados de critérios de
  aceitação, garante que cada requisito da
  próxima release seja mensurável, isto é, passível de verificação objetiva, orientado pela
  perspectiva de quem usará o sistema e livre da imposição de uma solução técnica
  específica, mantendo o vínculo de cada história com a característica de produto que a
  origina.

**Organização e Atualização:**

- **Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade:** Revisar o backlog da
  release, mantendo seus itens organizados na hierarquia épico, história de usuário e
  tarefa, detalhados, estimados e priorizados, e atualizar a matriz de rastreabilidade
  assegura que todo objetivo específico permaneça coberto por ao menos uma
  característica e que toda história continue vinculada a um objetivo, facilitando a
  organização do trabalho e evitando crescimento não justificado do escopo.

## 5.2 Engenharia de Requisitos e o OpenUP {#52-engenharia-de-requisitos-e-a-abordagem-híbrida-openup--kanban}

| Fase do OpenUP | Atividade de ER | Prática | Técnica | Resultado Esperado |
|---|---|---|---|---|
| **Concepção**<br>Release 1: Iterações 1 e 2 (quinzenais) e fechamento.<br>Eventos: Planejamento da Release, eventos de iteração e Planejamento da Próxima Release | Elicitação e Descoberta | Levantamento do problema e das necessidades no Planejamento da Release e da Iteração | Entrevistas, Brainstorming, Análise de Domínio de Negócio, Análise Documental, Personas e Jornadas de Usuário | Problema, necessidades de alto nível e necessidades latentes identificados |
|  | Análise e Consenso | Priorização das características, acordo sobre a ordem de trabalho, negociação da visão e revisão do processo na retrospectiva | Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico, Facilitação Round Robin com Registro de Decisões, Negociação, Análise de Causas, Resolução de Conflito | Características de produto (CP1 a CP7) priorizadas e ajustes da visão acordados com a cliente profissional de saúde, com as decisões registradas no Notion |
|  | Declaração | Declaração da visão e do backlog inicial | Épicos, Critérios de Aceitação em nível alto | Visão do Produto com OE1 a OE3 e CP1 a CP7 declarados e backlog inicial com épicos derivados das características |
|  | Verificação e Validação (verificação) | Verificação dos objetivos e das características na Execução da Iteração | Checklist Estruturado de Critérios de Qualidade | Objetivos específicos e características de produto claros, consistentes, verificáveis e rastreáveis |
|  | Verificação e Validação (validação) | Validação da visão na Revisão da Iteração | Coleta de Feedback com Validação por Cenários de Uso | Visão validada com a cliente profissional de saúde e com a usuária representativa, em revisões separadas |
|  | Organização e Atualização | Atualização da visão após a revisão, ajuste do fluxo de requisitos após a retrospectiva e organização do backlog no Planejamento da Próxima Release | Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade | Backlog da Release 2 organizado e priorizado, com todo objetivo específico coberto por ao menos uma característica e toda história vinculada a um objetivo |
| **Elaboração**<br>Release 2: Iterações 3 e 4 (quinzenais) e fechamento.<br>Eventos: eventos de iteração e Planejamento da Próxima Release | Elicitação e Descoberta | Detalhamento dos requisitos no Planejamento da Iteração e identificação de novas necessidades no Planejamento da Próxima Release | Entrevistas, Análise Documental, Análise de Tarefas, Análise de Domínio de Negócio | Requisitos detalhados a partir das usuárias, dos documentos existentes e das atividades reais de trabalho |
|  | Análise e Consenso | Análise de dependências, priorização do backlog, negociação do MVP e revisão do processo na retrospectiva | Facilitação Round Robin com Registro de Decisões, Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico, Negociação, Análise de Causas, Resolução de Conflito | Backlog priorizado e escopo do MVP confirmados pela cliente profissional de saúde, com as decisões registradas no Notion |
|  | Declaração | Declaração dos requisitos funcionais e não funcionais a partir das características, com as situações de exceção, e, no Planejamento da Próxima Release, dos épicos e das histórias de usuário da Release 3 derivados deles | Declarações Textuais Estruturadas (Templates), Texto Estruturado/Tabular, Storyboards Descritivos, Épicos, Histórias de Usuário e Critérios de Aceitação | Requisitos funcionais e não funcionais declarados por característica de produto e rastreáveis aos objetivos específicos, e histórias da Release 3 derivadas dos requisitos funcionais |
|  | Representação | Representação das interações para discussão com as usuárias, na Execução da Iteração | Prototipação de Baixa Fidelidade | Wireframes conceituais em Figma que permitem validar os fluxos antes da codificação |
|  | Verificação e Validação (verificação) | Verificação dos requisitos funcionais e não funcionais na Execução da Iteração | Checklist Estruturado de Critérios de Qualidade | Requisitos funcionais e não funcionais claros, consistentes, verificáveis e rastreáveis |
|  | Verificação e Validação (validação) | Validação dos requisitos na Revisão da Iteração | Coleta de Feedback com Validação por Cenários de Uso | Requisitos e wireframes validados com a cliente profissional de saúde e com a usuária representativa, em revisões separadas |
|  | Organização e Atualização | Refinamento do backlog, atualização dos requisitos acordados e ajuste do fluxo de requisitos | Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade | Backlog da Release 3 organizado, com a matriz de rastreabilidade atualizada |
| **Construção**<br>Release 3: Iterações 5 e 6 (quinzenais) e fechamento; Release 4: Iteração 7 (semanal).<br>Eventos: eventos de iteração e Planejamento da Próxima Release no fechamento da Release 3 | Elicitação e Descoberta | Esclarecimento pontual de dúvidas das histórias do incremento no Planejamento da Iteração e revisão dos requisitos a partir do uso no fechamento da Release 3 | Entrevistas, Análise de Tarefas, Análise de Domínio de Negócio | Dúvidas das histórias esclarecidas antes do desenvolvimento e efeitos emergentes do uso observados |
|  | Análise e Consenso | Ordem de implementação, negociação de ajustes, repriorização do restante do MVP e revisão do processo na retrospectiva | Facilitação Round Robin com Registro de Decisões, Negociação, Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico, Análise de Causas, Resolução de Conflito | Ordem de implementação acordada, considerando que a CP4 depende dos dados da CP1 e da CP2 e que o reajuste da CP5 depende da CP4, e escopo restante do MVP repriorizado |
|  | Declaração | Detalhamento das histórias de usuário do incremento a partir dos requisitos funcionais | Histórias de Usuário, Critérios de Aceitação, Storyboards Descritivos | Histórias do incremento derivadas dos requisitos funcionais, com critérios de aceitação verificáveis, condições de privacidade, ausência de linguagem punitiva e situações de exceção descritas |
|  | Representação | Ajuste das representações a partir do feedback, na Execução da Iteração | Prototipação de Baixa Fidelidade | Fluxos ajustados e validados antes da implementação |
|  | Verificação e Validação (verificação) | Verificação de prontidão no Planejamento da Iteração e verificação das histórias na Execução da Iteração | Checklist Estruturado com os Itens do DoR, Checklist Estruturado de Critérios de Qualidade, Revisão de Critérios de Aceitação | Somente histórias que atendem ao DoR entram no incremento, e os requisitos do incremento são verificados antes da entrega |
|  | Verificação e Validação (validação) | Demonstração do incremento na Revisão da Iteração | Coleta de Feedback com Validação por Cenários de Uso | Incremento validado com a cliente profissional de saúde e com a usuária representativa, em revisões separadas, confirmando se reduz a sobrecarga sem gerar nova cobrança |
|  | Organização e Atualização | Refinamento do backlog, atualização dos requisitos acordados e ajuste do fluxo de requisitos | Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade | Backlog e matriz de rastreabilidade atualizados para o fechamento do MVP |
| **Transição**<br>Release 4: fechamento.<br>Eventos: revisão de homologação do MVP e retrospectiva final | Análise e Consenso | Negociação dos ajustes finais e retrospectiva final | Negociação, Facilitação Round Robin com Registro de Decisões, Análise de Causas | Ajustes finais acordados com a cliente profissional de saúde e lições aprendidas registradas |
|  | Verificação e Validação (validação) | Homologação do MVP na revisão final | Coleta de Feedback com Validação por Cenários de Uso | MVP validado pela usuária representativa e homologado pela cliente profissional de saúde |
|  | Organização e Atualização | Consolidação do conjunto de requisitos | Matriz de Rastreabilidade | Requisitos atualizados com os ajustes da homologação e backlog remanescente registrado para evolução futura |

<span class="quadro-fonte">**Quadro 5** – Atividades de Engenharia de Requisitos nas fases do OpenUP. Fonte: elaborado pela equipe.</span>
