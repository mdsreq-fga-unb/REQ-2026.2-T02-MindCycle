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

- **(OE1)** Melhorar a percepção dos sintomas durante todo o ciclo menstrual
- **(OE2)** Reduzir a sobrecarga executiva causada pelo planejamento de tarefas que
  desconsidera a fase do ciclo menstrual
- **(OE3)** Reduzir a sobrecarga executiva na execução das tarefas diárias, ajustando-as à
  disposição real da usuária

## 2.3 Características do Produto (CP)

| ID (CP) | Característica (CP) | Descrição resumida | ID (VN) | Valor de Negócio (VN) principal | Contribuição Principal |
|---|---|---|---|---|---|
| CP1 | Registro e análise de sintomas e disposição | A solução deverá permitir que a usuária registre os sintomas sentidos e o seu nível de disposição, consulte os sintomas comuns da fase atual e sinalize sobrecarga a qualquer momento do dia. | VN1 | Percepção do próprio estado ao longo do ciclo e possibilidade de resposta imediata à sobrecarga, em vez de registro passivo para consulta posterior. | OE1 |
| CP2 | Acompanhamento do ciclo menstrual | A solução deverá permitir o registro do início da menstruação e das características do ciclo, estimar a fase atual e recomendar conteúdos informativos relacionados a ela. | VN2 | Precisão da adaptação do planejamento à condição real da usuária, permitindo que a recomendação reflita a fase do ciclo em vez de padrões genéricos de produtividade. | OE1 |
| CP3 | Privacidade dos dados da usuária | A solução deverá tratar os dados de ciclo, sintomas e disposição como dados pessoais sensíveis, protegendo o acesso à conta e condicionando qualquer coleta ao aceite dos termos de uso. | VN3 | Confiança para registrar dado de saúde sem risco de exposição a gestores ou terceiros, condição sem a qual o produto não é utilizável no contexto profissional. | OE1 |
| CP4 | Planejamento adaptativo das tarefas | A solução deverá recomendar diariamente as tarefas a realizar em ordem de precedência, com base no registro de energia, no prazo e na prioridade, e apresentar um resumo do que está previsto para o dia. | VN4 | Alinhamento entre o que é planejado e a capacidade real da usuária no dia, reduzindo o acúmulo de tarefas não cumpridas. | OE2 |
| CP5 | Gestão acolhedora da carga diária | A solução deverá permitir cadastrar, editar, concluir, adiar e excluir tarefas, reajustar a recomendação do dia conforme a disposição registrada e oferecer sugestões e mensagens de acolhimento. | VN5 | Reorganização da rotina sem culpa: o adiamento é tratado como estado legítimo, sem contadores de falha nem linguagem de cobrança. | OE3 |
| CP6 | Reconhecimento de ritmo sustentável | A solução deverá permitir o registro das atividades de acolhimento realizadas e gerar, ao final de cada mês, uma retrospectiva das tarefas concluídas e dessas atividades. | VN6 | Reconhecimento do descanso como parte legítima do trabalho, devolvendo à usuária evidência do próprio ritmo em lugar de escore de desempenho. | OE3 |
| CP7 | Conta e preferências da usuária | A solução deverá permitir que a usuária crie sua conta, recupere o acesso a ela e conheça o objetivo do sistema ao iniciar o uso. | VN7 | Acesso contínuo e exclusivo ao próprio histórico, com contexto suficiente para adesão a um produto que trata de tema sensível. | OE3 |

<span class="quadro-fonte">**Quadro 2** – Características de produto, valores de negócio e rastreabilidade com os objetivos específicos. Fonte: elaborado pela equipe a partir da Matriz de Rastreabilidade de Requisitos v1.0.</span>

> **Origem e status deste quadro.** Os objetivos específicos e as características de produto
> acima são os consolidados na **Matriz de Rastreabilidade de Requisitos v1.0** (quadro
> *MindCycle – Figma*, 28/09/2026), adotada como fonte oficial do projeto — ver
> [Seção 11](../11-rastreabilidade/). Substituem o conjunto de OE1–OE3 e CP1–CP6 publicado na
> versão 1.0 do Documento de Visão, cujos nomes não correspondiam a nenhum requisito
> elicitado. As **descrições resumidas** foram derivadas dos requisitos funcionais que cada
> característica agrega ([Seção 8](../08-requisitos-de-software/)); os **valores de negócio
> (VN1–VN7)** foram redigidos pela equipe a partir dos critérios de valor da
> [Seção 9.2](../09-priorizacao-de-requisitos/#criterios-valor-negocio) e **aguardam validação
> com a cliente**, pendência registrada na
> [Seção 10.4](../10-mvp/#104-evidência-da-validação-do-mvp-com-a-cliente). A CP3 e a CP7 são
> características habilitadoras, conforme observado na
> [Seção 8](../08-requisitos-de-software/#arvore-de-derivacao).

## 2.4 Tecnologias a Serem Utilizadas

| Tecnologia | Descrição | Área de Aplicação |
|---|---|---|
| React Native | Framework livre para desenvolvimento de aplicações móveis multiplataforma a partir de uma única base de código | Interface da aplicação, registro rápido de sintomas e disposição (CP1) e visualização da recomendação do dia (CP4) |
| TypeScript | Superconjunto tipado do JavaScript, reduzindo defeitos em tempo de desenvolvimento | Frontend e backend, apoiando as práticas de qualidade técnica do XP |
| Node.js com NestJS | Ambiente de execução e framework para construção de serviços web modulares e testáveis | Motor de recomendação do dia (CP4), reajuste da carga diária por disposição (CP5) e controle de acesso aos dados sensíveis (CP3) |
| PostgreSQL | Sistema gerenciador de banco de dados relacional livre, com suporte a criptografia em repouso | Persistência do histórico de sintomas, disposição, tarefas e fases do ciclo, base da retrospectiva mensal (CP6) |
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
