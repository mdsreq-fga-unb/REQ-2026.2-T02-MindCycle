---
title: "5. Engenharia de Requisitos"
numero: "5"
weight: 5
resumo: "Quais atividades e técnicas de ER a equipe aplica em cada fase do OpenUP, com os eventos e a cadência de cada fase, e o resultado esperado de cada uma."
---

## 5.1 Atividades e Técnicas de ER

As técnicas desta seção estão organizadas pelas quatro fases do OpenUP. Em cada fase são
indicadas as iterações, a cadência e os eventos em que o trabalho acontece, conforme o
[cronograma](../06-cronograma-e-entregas/) e a
[interação entre equipe e cliente](../07-interacao-equipe-cliente/), e, em seguida, as
atividades de ER com suas técnicas. Cada técnica é descrita por completo na primeira fase em
que aparece, e nas fases seguintes é indicado apenas o que muda no seu uso. A
correspondência entre fases, atividades e técnicas é consolidada no Quadro 5.

### Concepção

A Concepção compreende as Iterações 1 e 2, de duas semanas. Cada iteração começa
com o Planejamento da Iteração e termina com a Revisão e a Retrospectiva da Iteração. O foco
da fase é compreender o problema e definir a visão do produto, trabalho conduzido pela
própria equipe, já que o contato com a cliente começou na Elaboração.

**Elicitação e Descoberta:**

- **Brainstorming:** Em sessões internas, a equipe levanta alternativas para acompanhar a
  carga diária sem reproduzir a lógica de cobrança identificada no problema, como formas de
  sinalizar sobrecarga e de retomar tarefas adiadas sem penalização.
- **Análise de Produtos Concorrentes:** A equipe analisa aplicativos que já combinam
  gerenciamento de tarefas e acompanhamento do ciclo menstrual, como Lunar, Muna, Tiimo e
  SheVinci, para identificar o que eles oferecem e onde falham em adaptar as demandas e em
  reduzir a sobrecarga e a culpa. As lacunas encontradas orientam os diferenciais do
  produto, conforme a [pesquisa de mercado](../02-solucao-proposta/).

**Análise e Consenso:**

- **Análise de Causas com Diagrama de Ishikawa:** As causas do problema são organizadas pelos
  6M (Método, Mão de Obra, Máquina, Materiais, Medida e Meio Ambiente), o que permite à
  equipe chegar a um entendimento comum sobre quais causas o produto pode enfrentar e
  derivar delas os objetivos específicos, conforme o
  [cenário atual](../01-cenario-atual/).

**Declaração:**

- **Catálogo de Metas:** Os objetivos específicos e as características de produto são
  declarados na [Visão do Produto](../02-solucao-proposta/) em formato estruturado, que
  associa cada característica ao valor de negócio que entrega e ao objetivo específico de
  que deriva. Essa estrutura mostra como cada característica contribui para enfrentar o
  problema e serve de origem para todos os requisitos declarados nas fases seguintes.

### Elaboração

A Elaboração compreende as Iterações 3 e 4, de duas semanas. A partir desta
fase, cada iteração passa a contar também com uma sessão de Refinamento do Backlog, além do
Planejamento, da Revisão e da Retrospectiva da Iteração. O foco da fase é declarar,
priorizar e organizar os requisitos, apresentá-los à cliente e delimitar o escopo do MVP.

**Elicitação e Descoberta:**

- **Entrevistas:** As entrevistas com a cliente profissional de saúde são abertas e
  conduzidas a partir das telas do protótipo. A equipe apresenta o produto e pede que ela
  aponte necessidades ainda não consideradas, como estados de disposição mais próximos de
  como as mulheres descrevem o que sentem ou a forma de explicar a contagem do ciclo. Por
  envolverem temas de saúde, as entrevistas só são gravadas com a concordância da cliente, e
  o registro não inclui relatos pessoais sobre saúde.

**Análise e Consenso:**

- **Priorização MoSCoW:** Cada requisito funcional é classificado como Must have, Should
  have, Could have ou Won't have for now, com uma justificativa baseada na contribuição para
  o objetivo específico, no impacto sobre a sobrecarga, na obrigação legal da LGPD, na
  frequência de uso e na dependência entre requisitos. A classificação é proposta pela
  equipe, levada à cliente profissional de saúde para confirmação e convertida na nota de
  valor de negócio usada na matriz descrita a seguir, conforme a
  [priorização de requisitos](../09-priorizacao-de-requisitos/).
- **Matriz Valor de Negócio × Esforço Técnico:** A nota de valor vinda do MoSCoW é cruzada
  com o esforço técnico estimado pela equipe, que combina horas, complexidade e lacuna de
  capacidade, em uma matriz 4 × 4. A posição de cada requisito orienta, sem determinar
  automaticamente, a proposta de escopo do [MVP](../10-mvp/), o que é necessário diante do
  prazo do semestre e do tamanho da equipe.
- **Negociação:** A negociação com a cliente define o foco do MVP na organização das
  tarefas de acordo com o ciclo, deixando para evolução futura as sugestões que ampliam o
  produto para outros temas de saúde. As decisões e os
  *trade-offs* acordados são registrados em ata, o que torna o consenso rastreável.

**Declaração:**

- **Catálogo de Metas:** O catálogo é ampliado com os requisitos de negócio, cada um
  associado ao objetivo específico de origem, com indicador, referência, resultado esperado
  e prazo a serem definidos com a cliente, e com a LGPD registrada como restrição externa ao
  tratamento de dados de saúde, conforme a
  [Iteração 3](../../openup/elaboracao/iteracao-03/).
- **Catálogo de Requisitos Funcionais e Não Funcionais:** Os requisitos funcionais são
  escritos a partir de cada característica de produto, no padrão "Deve ser possível à
  usuária" seguido da ação esperada, e organizados em tabelas com código, nome, descrição,
  requisitos não funcionais associados e vínculo com a característica e o objetivo
  específico. Os não funcionais recebem classificação e critério verificável, conforme o
  [catálogo de requisitos](../08-requisitos-de-software/).
- **Histórias de Usuário com Critérios de Aceitação:** Cada requisito funcional dá origem a
  uma história no formato "Como usuária, quero... para...", em que o benefício expressa o
  valor da característica de produto correspondente. Os critérios de aceitação são
  verificáveis e incluem as condições de privacidade, os requisitos não funcionais
  aplicáveis e a ausência de linguagem punitiva, pois esses atributos fazem parte do valor
  do produto e não são detalhes de interface. Nesta fase, os critérios são definidos para os
  requisitos detalhados em casos de uso.
- **Casos de Uso Detalhados:** Os requisitos funcionais de maior risco, como os que
  fornecem dados para outros requisitos, os que contêm regras de cálculo ou os que têm
  restrições de tempo e de design, são detalhados em casos de uso com ator principal,
  pré-condição, fluxo principal, fluxos alternativos e exceções. O detalhamento antecipa as
  dúvidas desses requisitos antes da Construção, sem estender o mesmo esforço aos
  requisitos de menor risco.

**Representação:**

- **Prototipação de Baixa Fidelidade:** A equipe cria no Figma as telas do MVP, como as de
  registro de sintomas e disposição, de tarefas do dia e de acompanhamento do ciclo, para
  discutir com a cliente se a interface comunica apoio em vez de cobrança antes que
  qualquer código seja escrito.

**Verificação e Validação:**

- **Coleta de Feedback com Validação por Cenários de Uso:** Na revisão, a equipe apresenta o
  que foi produzido e percorre cenários de uso concretos com a participante externa,
  registrando o feedback no Notion. A cliente profissional de saúde avalia os conteúdos
  relacionados à saúde e realiza a aceitação formal, e Daniela Soares, como usuária
  representativa, avalia usabilidade, linguagem, privacidade e experiência de uso, em
  revisões separadas. Nesta fase, a cliente avalia as telas do protótipo e aponta os
  ajustes em cada uma.

**Organização e Atualização:**

- **Estruturação Hierárquica do Backlog:** O backlog do produto é organizado no Notion na
  hierarquia característica de produto, história de usuário e tarefa, com cada história
  vinculada ao requisito funcional de origem, o que permite detalhar, estimar e priorizar
  cada item sem perder sua origem.
- **Matriz de Rastreabilidade:** A [matriz](../11-rastreabilidade/) liga cada objetivo
  específico às características, aos requisitos funcionais e não funcionais e às histórias,
  de modo que todo objetivo esteja coberto por ao menos uma característica e toda história
  esteja vinculada a um objetivo, evitando que funcionalidades entrem no backlog sem origem
  justificada.

### Construção

A Construção compreende as Iterações 5 e 6, de duas semanas, cada uma dedicada a um
conjunto de requisitos funcionais do MVP. Em cada iteração ocorrem o Planejamento, o Refinamento do
Backlog, a Revisão e a Retrospectiva da Iteração. O foco da fase é preparar, verificar e
validar os requisitos de cada incremento.

**Elicitação e Descoberta:**

- **Entrevistas:** Nesta fase, as entrevistas são pontuais e servem para esclarecer dúvidas
  das histórias da iteração antes do desenvolvimento e para levantar os requisitos novos
  solicitados pela cliente.

**Análise e Consenso:**

- **Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico:** As duas técnicas são
  reaplicadas aos requisitos que entram depois da priorização inicial, para decidir se e
  quando cada um entra no MVP.
- **Negociação:** Nesta fase, a negociação define quais ajustes apontados em cada revisão
  são prioritários. Questões de saúde seguem a decisão da cliente, questões de experiência
  de uso seguem a avaliação da usuária representativa, e um ajuste que envolva os dois
  domínios volta ao backlog até que a decisão seja registrada.

**Declaração:**

- **Catálogo de Requisitos Funcionais e Não Funcionais:** O catálogo é atualizado sempre que
  entram requisitos novos ou que um ajuste acordado altera um requisito existente.
- **Histórias de Usuário com Critérios de Aceitação:** No Planejamento da Iteração, as
  histórias selecionadas são refinadas e todas recebem critérios de aceitação verificáveis.

**Representação:**

- **Prototipação de Baixa Fidelidade:** Toda história que envolve tela nova ou alterada tem
  seu protótipo vinculado, que é ajustado a partir do feedback das revisões.

**Verificação e Validação:**

- **Checklist Estruturado com os Itens do DoR:** No Planejamento da Iteração, a equipe
  percorre os itens do [Definition of Ready](../12-dor-e-dod/) para cada história candidata.
  Apenas as histórias que atendem a todos os itens entram na coluna *A Fazer* do quadro, e
  a verificação de cada uma é registrada com sua evidência.
- **Checklist Estruturado com os Itens do DoD:** Ao final do desenvolvimento de cada
  história, a equipe percorre os itens do [Definition of Done](../12-dor-e-dod/). A
  funcionalidade que atende a todos segue para a coluna *Em Validação*, e a que não atende
  volta para o desenvolvimento sem ser apresentada na revisão.
- **Coleta de Feedback com Validação por Cenários de Uso:** Nesta fase, é validado o
  incremento de cada iteração, verificando se a solução reduz a sobrecarga percebida sem
  gerar uma nova forma de cobrança.

**Organização e Atualização:**

- **Estruturação Hierárquica do Backlog:** No Refinamento do Backlog, os itens são
  detalhados, estimados e reordenados conforme a priorização confirmada pela cliente, o
  feedback das revisões e os obstáculos técnicos encontrados.
- **Matriz de Rastreabilidade:** A matriz é consultada e atualizada sempre que um ajuste
  acordado altera um objetivo, uma característica, um requisito ou uma história.

### Transição

A Transição compreende a Iteração 7, de duas semanas, dedicada à homologação do MVP com a
cliente e as usuárias representativas, aos ajustes finais e à entrega da versão final. A fase se encerra com a retrospectiva final.

**Análise e Consenso:**

- **Negociação:** Nesta fase, a negociação define com a cliente os ajustes finais apontados
  na homologação.

**Verificação e Validação:**

- **Checklist Estruturado com os Itens do DoD:** O checklist é reaplicado aos ajustes finais
  antes da entrega da versão final.
- **Coleta de Feedback com Validação por Cenários de Uso:** Nesta fase, o MVP integrado é
  validado pela usuária representativa e homologado pela cliente profissional de saúde.

**Organização e Atualização:**

- **Matriz de Rastreabilidade:** A matriz é consolidada com os ajustes da homologação, e o
  backlog remanescente é registrado para evolução futura.

## 5.2 Engenharia de Requisitos e o OpenUP

| Fase do OpenUP | Atividade de ER | Prática | Técnica | Resultado Esperado |
|---|---|---|---|---|
| **Concepção**<br>Iterações 1 e 2, de duas semanas.<br>Eventos: Planejamento, Revisão e Retrospectiva da Iteração | Elicitação e Descoberta | Levantamento interno de alternativas e análise do mercado | Brainstorming, Análise de Produtos Concorrentes | Alternativas não punitivas de acompanhamento e lacunas dos concorrentes identificadas |
|  | Análise e Consenso | Análise das causas do problema pela equipe | Análise de Causas com Diagrama de Ishikawa | Causas do problema organizadas pelos 6M e objetivos específicos derivados delas |
|  | Declaração | Declaração da visão do produto | Catálogo de Metas | Objetivos específicos e características de produto declarados na Visão do Produto, com o valor de negócio de cada característica |
| **Elaboração**<br>Iterações 3 e 4, de duas semanas.<br>Eventos: Planejamento, Refinamento do Backlog, Revisão e Retrospectiva da Iteração | Elicitação e Descoberta | Levantamento de necessidades com a cliente | Entrevistas | Refinamentos dos requisitos e sugestões de novas funcionalidades levantados com a cliente profissional de saúde |
|  | Análise e Consenso | Priorização dos requisitos funcionais e negociação do escopo do MVP | Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico, Negociação | Requisitos funcionais priorizados e foco do MVP acordado com a cliente |
|  | Declaração | Declaração dos requisitos nos níveis de negócio, usuário e produto | Catálogo de Metas, Catálogo de Requisitos Funcionais e Não Funcionais, Histórias de Usuário com Critérios de Aceitação, Casos de Uso Detalhados | Requisitos de negócio, requisitos funcionais e não funcionais e histórias declarados e rastreáveis, com os requisitos de maior risco detalhados em casos de uso |
|  | Representação | Representação das telas do MVP | Prototipação de Baixa Fidelidade | Telas do MVP no Figma para discussão com a cliente |
|  | Verificação e Validação (validação) | Apresentação das telas do protótipo à cliente | Coleta de Feedback com Validação por Cenários de Uso | Telas avaliadas pela cliente profissional de saúde, com ajustes apontados em cada uma |
|  | Organização e Atualização | Organização do backlog e construção da rastreabilidade | Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade | Backlog organizado por característica, história e tarefa, e matriz ligando objetivos, características, requisitos e histórias |
| **Construção**<br>Iterações 5 e 6, de duas semanas.<br>Eventos: Planejamento, Refinamento do Backlog, Revisão e Retrospectiva da Iteração | Elicitação e Descoberta | Esclarecimento das histórias da iteração e levantamento de requisitos novos | Entrevistas | Dúvidas esclarecidas antes do desenvolvimento e requisitos novos da cliente levantados |
|  | Análise e Consenso | Priorização dos requisitos novos e negociação dos ajustes das revisões | Priorização MoSCoW, Matriz Valor de Negócio × Esforço Técnico, Negociação | Requisitos novos priorizados e ajustes acordados com a cliente e com a usuária representativa |
|  | Declaração | Atualização do catálogo e refinamento das histórias da iteração | Catálogo de Requisitos Funcionais e Não Funcionais, Histórias de Usuário com Critérios de Aceitação | Catálogo atualizado e histórias da iteração com critérios de aceitação verificáveis, incluindo privacidade e ausência de linguagem punitiva |
|  | Representação | Prototipação e ajuste das telas das histórias da iteração | Prototipação de Baixa Fidelidade | Protótipo vinculado a cada história com tela nova ou alterada |
|  | Verificação e Validação (verificação) | Verificação de prontidão no Planejamento da Iteração e de conclusão ao final de cada história | Checklist Estruturado com os Itens do DoR, Checklist Estruturado com os Itens do DoD | Somente histórias que atendem ao DoR entram na iteração, e somente funcionalidades que atendem ao DoD seguem para validação |
|  | Verificação e Validação (validação) | Demonstração do incremento na Revisão da Iteração | Coleta de Feedback com Validação por Cenários de Uso | Incremento validado, confirmando se reduz a sobrecarga sem gerar nova cobrança |
|  | Organização e Atualização | Refinamento do backlog e atualização da rastreabilidade | Estruturação Hierárquica do Backlog, Matriz de Rastreabilidade | Backlog e matriz atualizados com os ajustes acordados |
| **Transição**<br>Iteração 7, de duas semanas.<br>Eventos: revisão de homologação do MVP e retrospectiva final | Análise e Consenso | Negociação dos ajustes finais | Negociação | Ajustes finais acordados com a cliente profissional de saúde |
|  | Verificação e Validação (verificação) | Verificação dos ajustes finais | Checklist Estruturado com os Itens do DoD | Ajustes finais concluídos conforme o DoD antes da entrega |
|  | Verificação e Validação (validação) | Homologação do MVP | Coleta de Feedback com Validação por Cenários de Uso | MVP validado pela usuária representativa e homologado pela cliente profissional de saúde |
|  | Organização e Atualização | Consolidação do conjunto de requisitos | Matriz de Rastreabilidade | Matriz consolidada e backlog remanescente registrado para evolução futura |

<span class="quadro-fonte">**Quadro 5** – Atividades de Engenharia de Requisitos nas fases do OpenUP. Fonte: elaborado pela equipe.</span>