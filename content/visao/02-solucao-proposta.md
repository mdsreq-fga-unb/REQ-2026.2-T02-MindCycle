---
title: "2. Solução Proposta"
numero: "2"
weight: 2
resumo: "O que o produto se propõe a fazer: objetivos, características, tecnologias, diferenciais frente aos concorrentes e viabilidade."
---

## 2.1 Objetivo Geral do Produto

O objetivo do produto é reduzir a sobrecarga associada à disfunção executiva e às
flutuações do ciclo menstrual na produtividade da mulher, por meio de um aplicativo de
organização de tarefas que se adapta ao ciclo menstrual.

## 2.2 Objetivos Específicos (OE) do Produto

Para alcançar o objetivo geral do produto, foram definidos os seguintes objetivos
específicos, identificados por OE1 a OE3 para permitir a rastreabilidade bidirecional
entre objetivos, características de produto e, posteriormente, requisitos. Cada objetivo
expressa o estado ou resultado desejado; as características de produto (CP), na Seção
2.3, detalham como esse resultado será viabilizado:

- **(OE1)** Reduzir o abandono de tarefas planejadas pela usuária
- **(OE2)** Reduzir a sobrecarga percebida na organização da rotina
- **(OE3)** Adequar o planejamento de tarefas à fase do ciclo menstrual

## 2.3 Características do Produto (CP)

| ID (CP) | Característica (CP) | Descrição resumida | ID (VN) | Valor de Negócio (VN) principal | Contribuição Principal |
|---|---|---|---|---|---|
| CP1 | Decompor Tarefas | A solução deverá permitir que a usuária divida uma tarefa em passos menores e registre o primeiro passo executável de cada tarefa criada. | VN1 | Redução da barreira de iniciação, transformando tarefas amplas e difusas em ações concretas passíveis de começo imediato. | OE1 |
| CP2 | Registrar e acompanhar o ciclo menstrual | A solução deverá permitir o registro das datas do ciclo pela usuária e identificar a fase corrente a partir desses dados. | VN2 | Precisão da adaptação do planejamento à condição real da usuária, permitindo que a carga sugerida reflita a fase do ciclo em vez de padrões genéricos de produtividade. | OE3 |
| CP3 | Adaptar planejamento por fase de ciclo | A solução deverá sugerir a distribuição e a redistribuição das tarefas ao longo do ciclo, ajustando a carga planejada de cada dia à fase corrente. | VN3 | Alinhamento entre o que é planejado e a capacidade real da usuária no período, reduzindo o acúmulo de tarefas não cumpridas. | OE2 |
| CP4 | Registrar nível de energia | A solução deverá permitir o registro diário do nível de energia percebido pela usuária e utilizar esse histórico para calibrar as sugestões de planejamento. | VN4 | Personalização baseada no padrão real de cada usuária, evitando que a adaptação se apoie apenas em médias genéricas de ciclo. | OE3 |
| CP5 | Adaptar a carga diária visível | A solução deverá exibir apenas o conjunto de tarefas compatível com a capacidade planejada para o dia, mantendo as demais fora da visão principal. | VN5 | Redução do custo cognitivo de leitura da lista, atacando a sensação de sobrecarga provocada pelo excesso de itens simultâneos. | OE2 |
| CP6 | Sugerir atividades de Bem-Estar | A solução deverá indicar atividades de Bem-Estar durante a fase de baixa disposição, com objetivo de ajudar na regulação emocional. | VN6 | Redução do risco de esgotamento emocional nos períodos de baixa disposição, oferecendo um direcionamento de cuidado no lugar da cobrança por produtividade constante. | OE2 |

<span class="quadro-fonte">**Quadro 2** – Características de produto, valores de negócio e rastreabilidade com os objetivos específicos. Fonte: elaborado pela equipe.</span>

## 2.4 Tecnologias a Serem Utilizadas

| Tecnologia | Descrição | Área de Aplicação |
|---|---|---|
| React Native | Framework livre para desenvolvimento de aplicações móveis multiplataforma a partir de uma única base de código | Interface da aplicação, registro rápido de estado (CP1) e visualização do planejamento diário |
| TypeScript | Superconjunto tipado do JavaScript, reduzindo defeitos em tempo de desenvolvimento | Frontend e backend, apoiando as práticas de qualidade técnica do XP |
| Node.js com NestJS | Ambiente de execução e framework para construção de serviços web modulares e testáveis | Regras de replanejamento por capacidade (CP3), controle de carga (CP6) e alertas de prazo (CP5) |
| PostgreSQL | Sistema gerenciador de banco de dados relacional livre, com suporte a criptografia em repouso | Persistência do histórico de estado, tarefas e fases do ciclo, base do Painel de Padrões Pessoais |
| Docker | Containerização dos serviços, garantindo paridade entre ambientes de desenvolvimento e produção | Ambiente de desenvolvimento e implantação |
| Git e GitHub | Controle de versão distribuído e hospedagem do repositório | Versionamento de código e dos artefatos de requisitos |
| GitHub Actions | Automação de builds, testes e verificações a cada integração | Integração contínua, prática central do XP |
| Figma | Ferramenta de prototipação e design de interfaces | Wireframes e protótipos usados na atividade de Representação de Requisitos |
| GitHub Pages | Geração e publicação da documentação do projeto | Documento de Visão, backlog e rastreabilidade públicos |

<span class="quadro-fonte">**Quadro 3** – Tecnologias a serem utilizadas. Fonte: elaborado pela equipe.</span>

## 2.5 Pesquisa de Mercado e Análise Competitiva

No mercado atual de aplicativos de produtividade e organização pessoal, existem soluções
que combinam gerenciamento de tarefas, acompanhamento do ciclo menstrual e apoio a
pessoas com TDAH e disfunções executivas. No entanto, após a análise dos principais
concorrentes, foram identificadas algumas fragilidades em relação à adaptação das
demandas e à redução da sobrecarga e da culpa.

- **Lunar:** Possui integração entre ciclo menstrual, o nível de energia informada pela
  usuária e as necessidades relacionadas ao TDAH, filtrando as tarefas de acordo com a
  capacidade da usuária e adotando uma abordagem livre de culpa. Entretanto, não
  redistribui automaticamente as tarefas e não possui uma gamificação positiva que
  valorize o descanso.
- **Muna:** Considera as fases do ciclo menstrual, prevê níveis de energia e possui o
  "Grace Mode", que reduz expectativas e sugere o reagendamento de tarefas. Porém, a
  redistribuição das demandas ainda depende da usuária, não ocorrendo de forma automática
  e contínua.
- **Tiimo:** É voltado para pessoas neurodivergentes, isto é, pessoas cujo funcionamento
  cognitivo diverge do padrão típico, como no TDAH (Transtorno do Déficit de Atenção com
  Hiperatividade) e no autismo, e apresenta recursos de organização visual da rotina e
  gamificação sem punição. Entretanto, não considera o ciclo menstrual nem é direcionado
  especificamente para mulheres.
- **SheVinci:** Sincroniza o planejamento com o ciclo menstrual e adapta o agendamento às
  diferentes fases e níveis de energia. Porém, seu foco está principalmente em TDPM
  (Transtorno Disfórico Pré-Menstrual), SOP (Síndrome dos Ovários Policísticos) e TPM
  (Tensão Pré-menstrual), não apresentando como foco central neurodivergência ou disfunção
  executiva, além de não possuir gamificação.

A solução irá se diferenciar por:

- **Foco em Mulheres na Tecnologia:** Diferente dos concorrentes, o sistema será
  desenvolvido especificamente para mulheres que atuam ou estudam na área de tecnologia,
  considerando as características e demandas presentes nesse contexto.
- **Redistribuição Automática de Tarefas:** Enquanto os concorrentes filtram tarefas ou
  sugerem reagendamentos, a solução irá redistribuir as demandas de acordo com as
  variações de energia e capacidade de execução da usuária.
- **Reconhecimento do Descanso sem Lógica de Pontuação:** O Tiimo já evita punições, mas
  não reconhece o descanso como parte do trabalho. A solução tratará o reagendamento e a
  pausa como estados legítimos da rotina, sem contadores de falha, sequências perdidas ou
  escore de desempenho. Não haverá mecanismo de pontuação ou recompensa, uma vez que a
  gamificação punitiva foi identificada na [Seção 1.4](../01-cenario-atual/#14-identificação-da-oportunidade-ou-problema)
  como causa do problema.

## 2.6 Viabilidade da Proposta

A proposta é viável no contexto da disciplina, considerando o acesso ao cliente, o escopo
definido e a possibilidade de entrega de um MVP funcional ao final do semestre. A
familiaridade dos membros da equipe com as ferramentas escolhidas para a construção da
solução, aliada à boa dinâmica, comunicação e ao comprometimento da equipe, contribuirá
para a viabilidade do projeto. Além disso, as reuniões semanais entre os membros da
equipe, a priorização das funcionalidades essenciais da solução e o feedback frequente do
cliente viabilizam o desenvolvimento do projeto.

## 2.7 Benefícios Esperados

- **Para o cliente:** apoiar o LabLivre na promoção de soluções tecnológicas inclusivas
  voltadas à permanência e ao bem-estar de mulheres na área de tecnologia, além de
  contribuir para pesquisas sobre produtividade, saúde menstrual e disfunção executiva.
- **Para as usuárias:** oferecer uma organização de tarefas mais flexível e personalizada,
  considerando variações de energia, foco, humor e ciclo menstrual. A solução deverá
  reduzir a sobrecarga e a culpa associadas à produtividade, tratando o descanso e o
  autocuidado como parte legítima da rotina, e manter os dados de ciclo e sintomas sob
  controle exclusivo da usuária.
