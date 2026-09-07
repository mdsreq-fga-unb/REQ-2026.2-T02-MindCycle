---
title: "5. Engenharia de Requisitos"
numero: "5"
weight: 5
resumo: "Quais atividades e técnicas de ER a equipe aplica em cada fase do processo, e o resultado esperado de cada uma."
---

## 5.1 Atividades e Técnicas de ER

### Planejamento da Release

**Elicitação e Descoberta:**

- **Entrevistas:** Entrevistas realizadas com os pesquisadores do LabLivre permitem
  compreender os objetivos institucionais do laboratório em relação à permanência de
  mulheres na tecnologia, enquanto entrevistas com mulheres representativas dos segmentos
  definidos na [Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes) ajudam a
  entender como organizam hoje suas tarefas e como percebem as variações de energia, foco
  e disposição ao longo do mês. Por envolverem relatos sobre saúde e sofrimento no
  trabalho, as entrevistas serão conduzidas com consentimento explícito e registro
  anonimizado.
- **Brainstorming:** Sessões de brainstorming permitem que a equipe e os stakeholders
  discutam alternativas para mecanismos não punitivos de acompanhamento, incluindo formas
  de sinalizar sobrecarga sem reproduzir a lógica de cobrança identificada no problema,
  sustentando a característica *Decompor Tarefas* (CP1) e a definição de mecanismos de
  retomada sem penalização.
- **Análise de Domínio de Negócio:** A análise do domínio de saúde menstrual, função
  executiva e produtividade ajuda a equipe a construir vocabulário compartilhado e a
  evitar o tratamento determinístico do ciclo, risco explicitamente mapeado como efeito
  emergente na [Seção 3](../03-intervencao-social/), garantindo que os requisitos estejam
  alinhados aos princípios de inclusão do LabLivre.
- **Personas e Jornadas de Usuário:** A construção de personas a partir dos três segmentos
  de clientes e do recorte transversal definidos na
  [Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes), somada ao mapeamento da
  jornada de um dia de trabalho em período de alta e de baixa capacidade, permite revelar
  necessidades latentes que não aparecem nas entrevistas, como o esforço compensatório e o
  presenteísmo silencioso.

**Análise e Consenso:**

- **Priorização MoSCoW:** Utilizar a técnica MoSCoW ajuda a priorizar as características
  mais críticas para a primeira release do MindCycle, como o *Registrar nível de energia*
  (CP4) e o *Adaptar planejamento por fase de ciclo* (CP3), classificando-as em Must have,
  Should have, Could have e Won't have e delimitando o escopo do MVP entregável no
  semestre.
- **Matriz Valor de Negócio × Esforço Técnico:** Avaliar cada característica quanto ao
  valor percebido pela usuária e à complexidade de implementação permite identificar quais
  entregas produzem maior impacto com menor custo, decisão necessária diante do prazo
  acadêmico limitado e do tamanho reduzido da equipe.

**Declaração:**

- **Épicos, Histórias de Usuário e Tarefas:** A Visão do Produto, registrada neste
  documento, dá origem ao backlog do produto, que se decompõe em épicos, histórias de
  usuário e tarefas, organizados e priorizados no quadro Kanban. Cada épico é derivado de
  uma característica de produto (CP1 a CP6) e cada característica está vinculada a um
  objetivo específico (OE1 a OE3), preservando a rastreabilidade bidirecional estabelecida
  na [Seção 2.3](../02-solucao-proposta/#23-características-do-produto-cp) e evitando que
  funcionalidades entrem no backlog sem origem justificada.

### Planejamento da Iteração

**Elicitação e Descoberta:**

- **Entrevistas:** Realizar entrevistas complementares com usuárias representativas
  permite refinar detalhes dos requisitos da iteração, como quais sintomas devem estar
  disponíveis no registro rápido ou qual granularidade de decomposição de tarefas é útil
  em períodos de baixa capacidade, garantindo que não haja lacunas antes do
  desenvolvimento.
- **Análise Documental:** Revisar documentos existentes, como a análise das soluções
  concorrentes descrita na
  [Seção 2.5](../02-solucao-proposta/#25-pesquisa-de-mercado-e-análise-competitiva) e a
  literatura sobre função executiva, auxilia na identificação de padrões de solução já
  testados no mercado e contribui para o refinamento dos requisitos da iteração sem
  reelicitar o que já está documentado.
- **Análise de Tarefas:** Decompor em etapas menores as atividades reais da usuária em um
  dia de trabalho, identificando objetivos, decisões e pontos de erro, apoia a descoberta
  dos requisitos de usabilidade e desempenho da característica *Decompor Tarefas* (CP1) e
  evidencia a diferença entre o trabalho prescrito pelo plano do dia e o trabalho realmente
  executado.

**Análise e Consenso:**

- **Discussões em Equipe:** Reuniões com a equipe de desenvolvimento para discutir
  dependências técnicas, como a relação entre o registro de estado e o motor de
  replanejamento ou os mecanismos de criptografia dos dados sensíveis, ajudam a definir a
  melhor forma de realizar a implementação dentro da iteração.

**Declaração:**

- **Critérios de Aceitação Detalhados, Definition of Ready (DoR):** Definir critérios de
  aceitação claros para cada história de usuário e garantir que estejam prontos para
  desenvolvimento facilita a validação pelas partes interessadas e assegura que os
  desenvolvedores tenham informação suficiente antes de iniciar. No caso do MindCycle, os
  critérios devem incluir condições de privacidade e ausência de linguagem punitiva, pois
  esses atributos são parte do valor do produto e não detalhes de interface.

**Organização e Atualização:**

- **Refinamento do Product Backlog:** O refinamento do Product Backlog é uma atividade
  contínua na qual os itens são detalhados, estimados e priorizados com a equipe e com o
  cliente antes do início da iteração, considerando as limitações de tempo do semestre
  letivo e a disponibilidade dos pesquisadores do LabLivre para validação.

### Execução da Iteração

**Declaração:**

- **Storyboards Descritivos:** Representar narrativamente a jornada da usuária em um dia
  de baixa capacidade, combinando texto e sequência de quadros, torna tangível o
  comportamento esperado do sistema em situações de exceção e serve de insumo para novos
  critérios de aceitação.

**Representação:**

- **Protótipos, Wireframes:** Criar protótipos e wireframes em Figma para as telas de
  registro de estado, planejamento diário e painel de padrões pessoais ajuda a equipe a
  visualizar como as funcionalidades serão implementadas e permite discutir com as usuárias
  se a interface comunica apoio em vez de cobrança, antes que qualquer código seja escrito.

**Verificação e Validação:**

- **Checklist, Revisão de Critérios de Aceitação:** Utilizar checklists de qualidade e
  revisar os critérios de aceitação de cada funcionalidade desenvolvida garante que os
  pontos essenciais foram atendidos, verificando se cada requisito é claro, consistente,
  necessário, verificável e rastreável a um objetivo específico, e se o tratamento dos
  dados sensíveis atende ao que foi declarado.

**Organização e Atualização:**

- **Revisão do Backlog da Iteração:** Manter os itens do backlog da iteração detalhados,
  estimados e priorizados preserva a organização do conjunto de requisitos e permite
  ajustes rápidos conforme a equipe recebe novos feedbacks ou encontra obstáculos técnicos
  durante a execução.

### Revisão da Iteração

**Verificação e Validação:**

- **Coleta de Feedback, Workshop de Requisitos:** Coletar feedback dos pesquisadores do
  LabLivre e de usuárias representativas durante workshops ajuda a verificar se as
  funcionalidades entregues estão alinhadas às expectativas e, sobretudo, se a hipótese
  central do produto se confirma, ou seja, se a solução reduz a sobrecarga percebida sem
  gerar uma nova forma de cobrança.

**Análise e Consenso:**

- **Negociação:** A negociação com o LabLivre e com as usuárias define quais ajustes
  apontados na revisão são prioritários, respeitando o escopo e o prazo do semestre e
  mediando a tensão entre o interesse de pesquisa do laboratório e a exigência de
  privacidade da usuária.

**Declaração:**

- **Incorporação de Feedback:** O resultado da negociação é registrado nas histórias de
  usuário afetadas e nos respectivos critérios de aceitação, com os *trade-offs* acordados
  explicitados.

### Retrospectiva da Iteração

**Análise e Consenso:**

- **Discussões em Grupo, Análise de Causas, Resolução de Conflito:** Discutir em grupo o
  que funcionou bem e o que poderia ser melhorado, utilizando análise de causas e mediação
  dos conflitos surgidos durante a iteração, ajuda a equipe a identificar ações que
  aumentem a eficiência e melhorem a execução das próximas iterações, incluindo falhas
  recorrentes na compreensão dos requisitos.

**Organização e Atualização:**

- **Atualização do Fluxo de Trabalho de Requisitos:** Ajustar o fluxo de trabalho de
  engenharia de requisitos e manter atualizada a estrutura em que os requisitos são
  organizados, rastreados, refinados e priorizados torna o processo mais adaptável às
  particularidades de um produto cujos requisitos dependem de experiências subjetivas ainda
  em compreensão.

### Planejamento da Próxima Release

**Elicitação e Descoberta:**

- **Workshops, Análise de Domínio de Negócio:** Workshops com o LabLivre e com usuárias,
  somados à análise continuada do domínio, ajudam a identificar novos requisitos para a
  próxima release. Esta fase é também o momento de observar os efeitos emergentes previstos
  na [Seção 3](../03-intervencao-social/), como sinais de dependência excessiva da
  ferramenta ou descolamento entre as recomendações automáticas e a experiência real da
  usuária.

**Análise e Consenso:**

- **Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico:** A priorização MoSCoW e
  a avaliação de cada item quanto ao valor de negócio e ao esforço técnico ajudam a decidir
  quais funcionalidades serão priorizadas para a próxima release, considerando o impacto
  sobre os objetivos específicos do produto e o valor entregue às usuárias.

**Declaração:**

- **Criação de Épicos, Histórias de Usuário e Critérios de Aceitação:** Criar épicos e
  histórias de usuário acompanhados de critérios de aceitação garante que cada requisito da
  próxima release seja mensurável, isto é, passível de verificação objetiva, orientado pela
  perspectiva de quem usará o sistema e livre da imposição de uma solução técnica
  específica, mantendo o vínculo de cada história com a característica de produto que a
  origina.

**Organização e Atualização:**

- **Revisão do Backlog da Release, Matriz de Rastreabilidade:** Revisar o backlog da
  release, mantendo seus itens detalhados, estimados e priorizados, e atualizar a matriz de
  rastreabilidade assegura que todo objetivo específico permaneça coberto por ao menos uma
  característica e que toda história continue vinculada a um objetivo, facilitando a
  organização do trabalho e evitando crescimento não justificado do escopo.

## 5.2 Engenharia de Requisitos e a Abordagem Híbrida (OpenUP + Kanban)

| Fases do Processo | Atividades ER | Prática | Técnica | Resultado Esperado |
|---|---|---|---|---|
| Planejamento da Release | Elicitação e Descoberta | Levantamento de requisitos | Entrevistas, Brainstorming, Análise de Domínio de Negócio, Personas e Jornadas de Usuário | Requisitos de alto nível identificados, necessidades latentes reveladas e objetivos da release claramente definidos |
| | Análise e Consenso | Priorização de requisitos | Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico | Escopo do MVP priorizado e acordado com o LabLivre, com critérios de decisão explícitos |
| | Declaração | Registro dos requisitos | Épicos, Histórias de Usuário e Tarefas | Épicos derivados das características de produto (CP1 a CP6) e vinculados aos objetivos específicos (OE1 a OE3), preservando a rastreabilidade bidirecional |
| Planejamento da Iteração | Elicitação e Descoberta | Refinamento de requisitos | Entrevistas, Análise Documental, Análise de Tarefas | Requisitos refinados e específicos para o desenvolvimento da iteração |
| | Análise e Consenso | Análise de dependências | Discussões em Equipe | Consenso sobre a viabilidade técnica e a ordem de implementação dos requisitos |
| | Declaração | Definição de critérios de aceitação | Critérios de Aceitação Detalhados, Definition of Ready (DoR) | Histórias de usuário com critérios claros, incluindo condições de privacidade e ausência de linguagem punitiva |
| | Organização e Atualização | Refinamento dos requisitos | Refinamento do Product Backlog | Requisitos refinados e priorizados no backlog antes do início da iteração |
| Execução da Iteração | Declaração | Registro narrativo do comportamento esperado | Storyboards Descritivos | Narrativas em quadros que tornam tangível o comportamento do sistema em situações de exceção e geram novos critérios de aceitação |
| | Representação | Criação de protótipos | Wireframes e protótipos em Figma | Protótipos e wireframes que orientam a implementação e permitem discutir a interface antes da codificação |
| | Verificação e Validação | Verificação e validação de requisitos | Checklist de Critérios de Qualidade, Revisão de Critérios de Aceitação | Requisitos verificados quanto a clareza, consistência, necessidade, verificabilidade e rastreabilidade, e validados quanto ao alinhamento com as necessidades e os objetivos acordados |
| | Organização e Atualização | Revisão do backlog | Revisão do Backlog da Iteração | Backlog atualizado e alinhado aos objetivos da iteração em andamento |
| Revisão da Iteração | Verificação e Validação | Demonstração ao cliente | Coleta de Feedback, Workshop de Requisitos | Funcionalidades validadas com o LabLivre e com usuárias representativas, verificando se a solução reduz a sobrecarga sem gerar nova cobrança |
| | Análise e Consenso | Negociação dos ajustes | Negociação | Ajustes priorizados em acordo com o LabLivre e com as usuárias, mediando a tensão entre interesse de pesquisa e privacidade |
| | Declaração | Atualização das histórias de usuário | Incorporação de Feedback | Histórias de usuário ajustadas conforme o feedback recebido, com os *trade-offs* acordados registrados |
| Retrospectiva da Iteração | Análise e Consenso | Revisão do processo | Discussões em Grupo, Análise de Causas, Resolução de Conflito | Melhorias identificadas e aplicáveis ao processo de engenharia de requisitos |
| | Organização e Atualização | Ajustes no fluxo de trabalho de requisitos | Atualização do Fluxo de Trabalho de Requisitos | Ajustes implementados para aumentar a eficiência e a qualidade do processo de ER |
| Planejamento da Próxima Release | Elicitação e Descoberta | Identificação de novos requisitos | Workshops, Análise de Domínio de Negócio | Requisitos revisados a partir do uso real e dos efeitos emergentes observados |
| | Análise e Consenso | Priorização estratégica | Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico | Requisitos priorizados conforme o impacto sobre os objetivos específicos do produto |
| | Declaração | Definição de épicos e histórias de usuário | Criação de Épicos, Histórias de Usuário e Critérios de Aceitação | Histórias de usuário definidas e vinculadas às características de produto da próxima release |

<span class="quadro-fonte">**Quadro 5** – Engenharia de Requisitos na abordagem híbrida (OpenUP + Kanban). Fonte: elaborado pela equipe.</span>
