---
title: "9. Priorização de Requisitos"
numero: "9"
weight: 9
resumo: "Critérios e escalas de valor de negócio e de esforço técnico, avaliação dos 27 requisitos funcionais, tabela consolidada e matriz 4 × 4 de priorização."
---

> **Fonte e status desta seção.** Os requisitos aqui priorizados são os do quadro
> *MindCycle – Figma*, consolidados na **Matriz de Rastreabilidade de Requisitos v1.0**
> (extração de 28/09/2026), adotada pela equipe como fonte oficial de requisitos do
> projeto — conforme as recomendações 07 e 08 registradas na
> [Seção 11.8](../11-rastreabilidade/#achados-consistencia).
> A numeração **RF01–RF27** e **RNF01–RNF11** desta seção segue esse quadro e **ainda
> diverge** da numeração publicada na [Seção 8](../08-requisitos-de-software/), cujo
> alinhamento é uma pendência formal do projeto.
>
> **Versão:** 0.2 · **Data:** 28/09/2026 · **Status:** critérios definidos e revisados com
> a monitoria; avaliação de valor de negócio registrada em **hipótese da equipe**, pendente
> de validação com a cliente.

## 9.1 Introdução e metodologia

A priorização de requisitos do MindCycle tem por finalidade estabelecer uma ordem
defensável de construção do produto, de modo que o esforço da equipe seja aplicado
primeiro aos requisitos que produzem maior retorno para o problema central — a
**sobrecarga executiva** — e não àqueles que são apenas mais fáceis ou mais visíveis.

O método adotado avalia cada requisito funcional em **duas dimensões independentes**:

| Dimensão | Quem atribui | O que mede |
|---|---|---|
| **Valor de negócio** | Cliente (Dra. Cláudia Araújo Bottino, ginecologista consultada pela equipe) | O quanto o requisito contribui para os objetivos específicos e para o enfrentamento do problema raiz, na perspectiva de quem conhece o domínio. |
| **Esforço técnico** | Equipe de desenvolvimento | O custo de construção do requisito, combinando tempo, complexidade e maturidade técnica da equipe. |

O cruzamento das duas dimensões em uma **matriz 4 × 4** (Seção 9.7) posiciona cada
requisito em um quadrante que orienta — sem determinar automaticamente — sua inclusão no
MVP, detalhada na [Seção 10](../10-mvp/).

Três regras metodológicas foram fixadas antes da avaliação:

1. **Valor de negócio é atribuído pela cliente**, com justificativa registrada para cada
   requisito, e não apenas o rótulo MoSCoW. A justificativa é o que permite auditar a nota
   depois.
2. **Esforço técnico é atribuído pela equipe**, também com justificativa individual por
   requisito.
3. **Critérios e escalas são congelados antes da avaliação**, para que nenhuma nota seja
   ajustada *a posteriori* com o propósito de empurrar um requisito para um quadrante
   desejado.

> **Ressalva de validação.** O contato síncrono com a Dra. Cláudia Araújo Bottino não foi
> confirmado a tempo desta entrega. Em consequência, as notas de valor de negócio
> apresentadas nas Seções 9.4 e 9.6 são **hipóteses revisadas da equipe**, construídas a
> partir dos critérios da Seção 9.2, e não atribuições reais da cliente. O registro honesto
> do que foi tentado está na Seção 9.8. As notas de esforço técnico (Seção 9.5) **não**
> dependem da cliente e são avaliações efetivas da equipe.

## 9.2 Critérios e escalas de valor de negócio {#criterios-valor-negocio}

### 9.2.1 Critérios de avaliação

Cinco critérios foram fixados pela equipe **antes** da coleta das notas, para que cada
requisito tenha uma justificativa rastreável e não apenas um rótulo.

| # | Critério | O que avalia |
|---|---|---|
| 1 | **Contribuição para o objetivo específico** | O quanto o RF avança o OE1, OE2 ou OE3 ao qual a característica de produto (CP) correspondente está vinculada. |
| 2 | **Impacto na sobrecarga e na culpa** | O quanto o RF ataca o problema central sem reproduzir lógica de cobrança sobre a usuária. |
| 3 | **Obrigatoriedade legal (LGPD)** | Peso adicional para RFs que envolvem dados pessoais sensíveis de saúde (ciclo, sintomas, disposição). |
| 4 | **Frequência de uso no fluxo diário** | Uso diário (ex.: registrar disposição) pesa mais do que uso pontual (ex.: aceitar termos). |
| 5 | **Dependência estrutural** | Se o RF é pré-requisito técnico ou de fluxo para viabilizar outros RFs (ex.: criar conta precede quase tudo). |

### 9.2.2 Escala de valor de negócio

A escala é de quatro pontos, ancorada no vocabulário MoSCoW e interpretada para o contexto
do MindCycle.

| Nota | Classificação | Interpretação para o MindCycle |
|:---:|---|---|
| **4** | Must have | Indispensável para o enfrentamento da sobrecarga executiva, exigência legal sobre dados de saúde, ou pré-requisito técnico do fluxo. |
| **3** | Should have | Muito relevante para o OE correspondente, mas o produto ainda entrega valor sem ele em uma primeira versão. |
| **2** | Could have | Agrega valor complementar, adiável sem comprometer a hipótese central do produto. |
| **1** | Won't have now | Baixo uso esperado ou conveniência não central ao problema nesta *release*. |

## 9.3 Critérios e escalas de esforço técnico

O esforço técnico é avaliado pela equipe de desenvolvimento a partir de **três
sub-critérios medidos de forma independente** e depois consolidados em uma única nota por
requisito.

### 9.3.1 Esforço, em horas estimadas

| Nota | Interpretação | Faixa |
|:---:|---|---|
| **1** | Esforço baixo | até 2 horas |
| **2** | Esforço moderado | entre 2 e 6 horas |
| **3** | Esforço alto | entre 6 e 12 horas |
| **4** | Esforço muito alto | mais de 12 horas |

### 9.3.2 Complexidade

| Nota | Interpretação | Exemplo no MindCycle |
|:---:|---|---|
| **1** | Solução conhecida, poucas dependências | CRUD de tarefa (RF16–RF20) |
| **2** | Exige investigação ou integração | Estimar fase do ciclo por sintomas (RF08) |
| **3** | Várias dependências ou incertezas técnicas | Reajustar recomendação por disposição (RF15) |
| **4** | Incerteza elevada, integração crítica ou tecnologia não dominada | Nenhum RF do escopo inicial deveria cair aqui |

### 9.3.3 Lacuna de capacidade da equipe {#lacuna-capacidade}

| Nota | Interpretação |
|:---:|---|
| **1** | A equipe domina plenamente os conhecimentos necessários |
| **2** | Conhecimento suficiente, com pouca aprendizagem adicional |
| **3** | A equipe precisa desenvolver conhecimento relevante: interface de PIN por toques em pétalas (RNF09), acessibilidade WCAG (RNF11) |
| **4** | A equipe ainda não possui o conhecimento ou os recursos necessários |

> **Confirmado com a equipe · 28/09/2026.** A *stack* técnica tem boa base e lacunas
> pontuais (nota geral 2). A abordagem de implementação do PIN por pétalas (RNF09) ainda
> está em aberto; WCAG (RNF11) é conhecido em conceito, mas nunca foi aplicado na prática —
> ambos justificam nota 3. O controle de acesso a dados sensíveis (RNF02/RNF03) já é padrão
> dominado pela equipe (nota 1–2) e, portanto, **não** deve ser tratado como lacuna nos RFs
> relacionados.

### 9.3.4 Consolidação do esforço técnico

As três notas são consolidadas pela média aritmética simples:

```text
                        Esforço + Complexidade + Lacuna de Capacidade
Esforço Técnico  =  ─────────────────────────────────────────────────
                                          3
```

**Regra de arredondamento.** A nota consolidada mantém **uma casa decimal** nas tabelas
(ex.: 1,3 / 2,7). Para posicionar o requisito na matriz 4 × 4 (Seção 9.7), arredonda-se ao
**inteiro mais próximo**, com 0,5 arredondando para cima (ex.: 2,5 → 3).

## 9.4 Avaliação de valor de negócio dos RFs {#avaliacao-valor-negocio}

Avaliação agrupada por característica de produto (CP), para permitir a confirmação bloco a
bloco, na mesma ordem do roteiro de validação.

As notas abaixo são **hipótese revisada da equipe**; a coluna *Confirmado* registra que
nenhuma delas foi validada pela cliente até a data desta entrega.

### CP1 · Registro e análise de sintomas e disposição — OE1

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF01 | Consultar sintomas comuns da fase | 3 | Should have | Subiu de *Could*: sem um registro básico do estado, a usuária não tem o que sinalizar em RF02. | — |
| RF02 | Sinalizar sobrecarga | 4 | Must have | Ataca diretamente a sobrecarga: permite resposta imediata, não só registro passivo. | — |
| RF03 | Receber lembrete de registro | 2 | Could have | Melhora a adesão ao registro, mas o fluxo funciona sem lembrete. | — |
| RF04 | Registrar sintomas e disposição | 4 | Must have | Dado-fonte de RF02, RF08, RF13 e RF15. *Must have* se for o registro simples que alimenta a recomendação; se virar relatório/gráfico elaborado, isso pode esperar. | — |

### CP2 · Acompanhamento do ciclo menstrual — OE1

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF05 | Consultar situação atual do ciclo | 2 | Could have | Consulta pontual, complementa RF10 sem ser crítica isoladamente. | — |
| RF06 | Registrar início da menstruação | 3 | Should have | Dado estrutural para o cálculo de fase por data; alternativa ao RF08. | — |
| RF07 | Informar características do ciclo | 2 | Could have | Configuração pontual, refina a precisão mas não bloqueia o uso. | — |
| RF08 | Estimar fase do ciclo por sintomas | 2 | Could have | Desceu de *Should*: a data de início (RF06) é um dado objetivo; sintomas variam por pessoa e funcionam melhor como refinamento, não como base do cálculo. | — |
| RF09 | Recomendar conteúdos sobre o ciclo | 1 | Won't have now | Conteúdo informativo; não ataca a sobrecarga diretamente. | — |

### CP3 · Privacidade dos dados da usuária — OE1 {#cp3-privacidade}

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF10 | Visualizar calendário do ciclo | 2 | Could have | Visualização de apoio, não crítica ao fluxo diário. | — |
| RF11 | Proteger acesso com PIN | 4 | Must have | Dado de saúde sensível; exigência de segurança (RNF03) já definida. | — |
| RF12 | Aceitar termos de uso | 4 | Must have | Pré-condição legal (LGPD/RNF02) para coletar qualquer dado da usuária. | — |

> **Hipótese da equipe — possível RNF novo.** O PIN (RF11) protege o aparelho, mas o risco
> maior está no armazenamento. A equipe considera que **criptografia dos dados em repouso**,
> **minimização** (guardar apenas o necessário) e **transparência** sobre o que é coletado
> deveriam ter a mesma urgência. Hoje isso não está coberto por nenhum RNF explícito — o
> RNF03 cobre apenas controle de acesso. É candidato a novo RNF, a validar (ver
> [Seção 10.2](../10-mvp/#rnfs-mvp)).

### CP4 · Planejamento adaptativo das tarefas — OE2

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF13 | Recomendar tarefas do dia | 4 | Must have | Núcleo da adaptação diária; ataca a sobrecarga na raiz do planejamento. | — |
| RF14 | Receber resumo do dia | 2 | Could have | Conveniência de visualização; o plano já existe via RF13. | — |

### CP5 · Gestão acolhedora da carga diária — OE3

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF15 | Reajustar recomendação do dia | 4 | Must have | Parte do laço mínimo que já entrega valor, junto com RF17 e RF20. | — |
| RF16 | Editar tarefa | 4 | Must have | Todo mundo erra ao digitar; sem editar, um erro de cadastro vira tarefa permanente. | — |
| RF17 | Cadastrar tarefa | 4 | Must have | Parte do laço mínimo que já entrega valor, junto com RF15 e RF20. | — |
| RF18 | Adiar tarefa | 4 | Must have | Mesmo sendo "só um status", é a identidade do produto: o que o diferencia de uma lista de tarefas comum. | — |
| RF19 | Excluir tarefa | 3 | Should have | Necessário, mas menos frequente que editar/adiar/concluir. | — |
| RF20 | Concluir tarefa | 4 | Must have | Parte do laço mínimo que já entrega valor, junto com RF15 e RF17. | — |
| RF21 | Sugerir atividades de acolhimento | 2 | Could have | Pode seguir *Could* se o tom acolhedor já aparecer no resto da interface. | — |
| RF22 | Receber mensagens de acolhimento | 3 | Should have | Subiu de *Could*: é a alma do produto; sem isso, vira só mais uma lista de tarefas. | — |

### CP6 · Reconhecimento de ritmo sustentável — OE3

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF23 | Gerar retrospectiva mensal | 2 | Could have | Valor de médio prazo; não urgente para a primeira versão utilizável. | — |
| RF24 | Registrar atividade de acolhimento | 2 | Could have | Alimenta o RF23; mesma prioridade. | — |

### CP7 · Conta e preferências da usuária — OE3

| RF | Requisito | Nota (hipótese) | Classificação | Justificativa (equipe) | Confirmado |
|---|---|:---:|---|---|:---:|
| RF25 | Criar conta | 4 | Must have | Pré-requisito estrutural de tudo: nada funciona sem conta. | — |
| RF26 | Recuperar acesso à conta | 3 | Should have | Importante para retenção, mas contornável em um MVP de validação. | — |
| RF27 | Conhecer a proposta do sistema | 2 | Could have | *Onboarding*; ajuda a adesão, mas não bloqueia o uso. | — |

## 9.5 Avaliação de esforço técnico dos RFs

Avaliação exclusiva da equipe, sem dependência da cliente. As notas de **esforço** e
**complexidade** derivam da leitura de cada requisito; a **lacuna de capacidade** usa a
confirmação da equipe registrada na Seção 9.3.3.

### CP1 · Registro e análise de sintomas e disposição — OE1

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF01 | Consultar sintomas comuns da fase | 1 | 1 | 2 | 1,3 | Tela de leitura simples, conteúdo já mapeado por fase. |
| RF02 | Sinalizar sobrecarga | 2 | 2 | 2 | 2,0 | Ação rápida integrada ao motor de readequação (RF15). |
| RF03 | Receber lembrete de registro | 2 | 2 | 2 | 2,0 | Notificação local agendada; exige lidar com permissões da plataforma. |
| RF04 | Registrar sintomas e disposição | 2 | 2 | 2 | 2,0 | Formulário e persistência que alimentam quase todo o produto. |

### CP2 · Acompanhamento do ciclo menstrual — OE1

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF05 | Consultar situação atual do ciclo | 1 | 1 | 2 | 1,3 | Leitura de um dado já calculado por RF08. |
| RF06 | Registrar início da menstruação | 1 | 1 | 2 | 1,3 | Campo de data único, sem lógica adicional. |
| RF07 | Informar características do ciclo | 1 | 1 | 2 | 1,3 | Formulário de configuração, uso pontual. |
| RF08 | Estimar fase do ciclo por sintomas | 3 | 3 | 2 | 2,7 | Heurística de inferência de fase por sintomas, sem solução pronta. |
| RF09 | Recomendar conteúdos sobre o ciclo | 1 | 1 | 2 | 1,3 | Lista de conteúdo curado, sem personalização complexa. |

### CP3 · Privacidade dos dados da usuária — OE1

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF10 | Visualizar calendário do ciclo | 2 | 2 | 2 | 2,0 | Componente de calendário, padrão conhecido em React Native. |
| RF11 | Proteger acesso com PIN | 3 | 3 | 3 | 3,0 | Gesto customizado (PIN por pétalas) ainda sem abordagem técnica definida. |
| RF12 | Aceitar termos de uso | 1 | 1 | 1 | 1,0 | Tela de consentimento e persistência de uma *flag*. |

### CP4 · Planejamento adaptativo das tarefas — OE2

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF13 | Recomendar tarefas do dia | 3 | 3 | 2 | 2,7 | Motor de recomendação com várias variáveis (energia, prazo, prioridade). |
| RF14 | Receber resumo do dia | 1 | 1 | 2 | 1,3 | Agregação simples do que já foi calculado por RF13. |

### CP5 · Gestão acolhedora da carga diária — OE3

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF15 | Reajustar recomendação do dia | 3 | 3 | 2 | 2,7 | Motor de realocação em tempo real; maior incerteza técnica do escopo. |
| RF16 | Editar tarefa | 1 | 1 | 1 | 1,0 | CRUD padrão, já dominado pela *stack*. |
| RF17 | Cadastrar tarefa | 1 | 1 | 1 | 1,0 | CRUD padrão, já dominado pela *stack*. |
| RF18 | Adiar tarefa | 1 | 1 | 1 | 1,0 | Atualização de data, sem penalização a implementar. |
| RF19 | Excluir tarefa | 1 | 1 | 1 | 1,0 | CRUD padrão, uso menos frequente. |
| RF20 | Concluir tarefa | 1 | 1 | 1 | 1,0 | Atualização de status e *timestamp*. |
| RF21 | Sugerir atividades de acolhimento | 2 | 2 | 2 | 2,0 | Regra simples de sugestão a partir da fase ou disposição. |
| RF22 | Receber mensagens de acolhimento | 1 | 1 | 2 | 1,3 | Exibição de mensagem, reaproveita o padrão de notificação (RF03). |

### CP6 · Reconhecimento de ritmo sustentável — OE3

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF23 | Gerar retrospectiva mensal | 2 | 2 | 2 | 2,0 | Agregação de dados históricos e geração de retrospectiva simples. |
| RF24 | Registrar atividade de acolhimento | 1 | 1 | 1 | 1,0 | Registro simples de atividade, CRUD padrão. |

### CP7 · Conta e preferências da usuária — OE3

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF25 | Criar conta | 2 | 1 | 1 | 1,3 | Fluxo de cadastro; padrão de autenticação já dominado. |
| RF26 | Recuperar acesso à conta | 2 | 2 | 1 | 1,7 | Fluxo de recuperação via e-mail ou *token*. |
| RF27 | Conhecer a proposta do sistema | 1 | 1 | 2 | 1,3 | Tela estática de *onboarding*. |

## 9.6 Tabela consolidada de avaliações

Valor de negócio (hipótese, Seção 9.4) e esforço técnico (Seção 9.5) reunidos em um único
lugar. Esta é a base direta da matriz da Seção 9.7.

| Código | Requisito | Valor | Justificativa (hipótese) | Esforço | Complex. | Lacuna | Esforço técnico consolidado |
|---|---|:---:|---|:---:|:---:|:---:|:---:|
| RF01 | Consultar sintomas comuns da fase | 3 | Habilita sinalizar sobrecarga (RF02) | 1 | 1 | 2 | 1,3 |
| RF02 | Sinalizar sobrecarga | 4 | Ataca a sobrecarga diretamente | 2 | 2 | 2 | 2,0 |
| RF03 | Receber lembrete de registro | 2 | Melhora adesão, não bloqueia | 2 | 2 | 2 | 2,0 |
| RF04 | Registrar sintomas e disposição | 4 | Dado-fonte de várias *features* | 2 | 2 | 2 | 2,0 |
| RF05 | Consultar situação atual do ciclo | 2 | Consulta pontual, complementar | 1 | 1 | 2 | 1,3 |
| RF06 | Registrar início da menstruação | 3 | Dado objetivo de fase | 1 | 1 | 2 | 1,3 |
| RF07 | Informar características do ciclo | 2 | Configuração pontual | 1 | 1 | 2 | 1,3 |
| RF08 | Estimar fase do ciclo por sintomas | 2 | Refinamento, não é base do cálculo | 3 | 3 | 2 | 2,7 |
| RF09 | Recomendar conteúdos sobre o ciclo | 1 | Conteúdo informativo | 1 | 1 | 2 | 1,3 |
| RF10 | Visualizar calendário do ciclo | 2 | Visualização de apoio | 2 | 2 | 2 | 2,0 |
| RF11 | Proteger acesso com PIN | 4 | Dado de saúde sensível | 3 | 3 | 3 | 3,0 |
| RF12 | Aceitar termos de uso | 4 | Pré-condição legal (LGPD) | 1 | 1 | 1 | 1,0 |
| RF13 | Recomendar tarefas do dia | 4 | Núcleo da adaptação diária | 3 | 3 | 2 | 2,7 |
| RF14 | Receber resumo do dia | 2 | Conveniência de visualização | 1 | 1 | 2 | 1,3 |
| RF15 | Reajustar recomendação do dia | 4 | Diferencial central do produto | 3 | 3 | 2 | 2,7 |
| RF16 | Editar tarefa | 4 | CRUD essencial | 1 | 1 | 1 | 1,0 |
| RF17 | Cadastrar tarefa | 4 | CRUD essencial | 1 | 1 | 1 | 1,0 |
| RF18 | Adiar tarefa | 4 | Identidade do produto (sem culpa) | 1 | 1 | 1 | 1,0 |
| RF19 | Excluir tarefa | 3 | Uso menos frequente | 1 | 1 | 1 | 1,0 |
| RF20 | Concluir tarefa | 4 | Fecha o ciclo da tarefa | 1 | 1 | 1 | 1,0 |
| RF21 | Sugerir atividades de acolhimento | 2 | Reforço de bem-estar | 2 | 2 | 2 | 2,0 |
| RF22 | Receber mensagens de acolhimento | 3 | Alma do produto | 1 | 1 | 2 | 1,3 |
| RF23 | Gerar retrospectiva mensal | 2 | Valor de médio prazo | 2 | 2 | 2 | 2,0 |
| RF24 | Registrar atividade de acolhimento | 2 | Alimenta a retrospectiva | 1 | 1 | 1 | 1,0 |
| RF25 | Criar conta | 4 | Pré-requisito estrutural | 2 | 1 | 1 | 1,3 |
| RF26 | Recuperar acesso à conta | 3 | Importante, mas contornável | 2 | 2 | 1 | 1,7 |
| RF27 | Conhecer a proposta do sistema | 2 | *Onboarding* | 1 | 1 | 2 | 1,3 |

**Distribuição das notas de valor de negócio**

| Classificação | Nota | Quantidade | Requisitos |
|---|:---:|:---:|---|
| Must have | 4 | 11 | RF02, RF04, RF11, RF12, RF13, RF15, RF16, RF17, RF18, RF20, RF25 |
| Should have | 3 | 5 | RF01, RF06, RF19, RF22, RF26 |
| Could have | 2 | 10 | RF03, RF05, RF07, RF08, RF10, RF14, RF21, RF23, RF24, RF27 |
| Won't have now | 1 | 1 | RF09 |

## 9.7 Matriz 4 × 4 — valor de negócio × esforço técnico {#matriz-4x4}

O esforço técnico consolidado foi arredondado ao inteiro mais próximo (regra da
Seção 9.3.4) para posicionar cada requisito. As linhas representam o **valor de negócio**
(4 no topo) e as colunas o **esforço técnico** (1 à esquerda).

| Valor ↓ / Esforço → | **1** · Baixo | **2** · Moderado | **3** · Alto | **4** · Muito alto |
|---|---|---|---|---|
| **4** · Muito alto | **Prioridade máxima**<br>`RF12` `RF16` `RF17` `RF18` `RF20` `RF25` | **Forte candidato ao MVP**<br>`RF02` `RF04` | **Avaliar viabilidade**<br>`RF11` `RF13` `RF15` | **Planejar, reduzir ou decompor**<br>— |
| **3** · Alto | **Forte candidato ao MVP**<br>`RF01` `RF06` `RF19` `RF22` | **Candidato ao MVP**<br>`RF26` | **Avaliar contexto**<br>— | **Entrega futura**<br>— |
| **2** · Moderado | **Avaliar oportunidade**<br>`RF05` `RF07` `RF14` `RF24` `RF27` | **Entrega futura**<br>`RF03` `RF10` `RF21` `RF23` | **Entrega futura**<br>`RF08` | **Baixa prioridade**<br>— |
| **1** · Baixo | **Avaliar oportunidade**<br>`RF09` | **Baixa prioridade**<br>— | **Baixa prioridade**<br>— | **Não priorizar agora**<br>— |

### 9.7.1 Leitura dos quadrantes

| Quadrante | Requisitos | Encaminhamento |
|---|---|---|
| **Prioridade máxima** (valor 4 · esforço 1) | RF12, RF16, RF17, RF18, RF20, RF25 | Entram no MVP sem discussão: alto valor a custo mínimo. |
| **Forte candidato ao MVP** (valor 4 · esforço 2) | RF02, RF04 | Entram no MVP; custo moderado plenamente justificado. |
| **Avaliar viabilidade** (valor 4 · esforço 3) | RF11, RF13, RF15 | Exigem decisão explícita da equipe — tratada na [Seção 10.3](../10-mvp/#justificativas-mvp). |
| **Forte candidato ao MVP** (valor 3 · esforço 1) | RF01, RF06, RF19, RF22 | Entram no MVP: baixo custo e valor alto o bastante. |
| **Candidato ao MVP** (valor 3 · esforço 2) | RF26 | Decisão de corte; ficou de fora por não ser pré-requisito do fluxo mínimo. |
| **Avaliar oportunidade** (valor 2 e 1 · esforço 1) | RF05, RF07, RF09, RF14, RF24, RF27 | Baratos, mas de valor complementar: entram quando houver folga de escopo. |
| **Entrega futura** (valor 2 · esforço 2 e 3) | RF03, RF08, RF10, RF21, RF23 | Adiados para as *releases* seguintes. |
| **Quadrantes de esforço 4** | — | Nenhum requisito do escopo inicial caiu aqui, o que é coerente com a expectativa declarada na Seção 9.3.2. |

> **A matriz orienta, não decide.** Três requisitos de valor máximo (RF11, RF13 e RF15)
> caíram em *avaliar viabilidade*. Eles **não** entram nem saem do MVP automaticamente: a
> decisão de cada um está registrada e justificada na
> [Seção 10.3](../10-mvp/#justificativas-mvp).

## 9.8 Registro da validação da priorização

Esta subseção registra, de forma transparente, o que de fato ocorreu na tentativa de
validar as notas de valor de negócio com a cliente.

### 9.8.1 Roteiro de validação preparado {#roteiro-validacao}

O roteiro abaixo foi elaborado e organizado por característica de produto, mas **não chegou
a ser aplicado** com a Dra. Cláudia Araújo Bottino. As respostas registradas são o que a
**equipe imagina** que ela responderia — uma estimativa interna, não uma resposta real —
prontas para serem confrontadas com a cliente assim que o contato ocorrer.

**CP1 · Registro e análise de sintomas e disposição**

- **Pergunta:** "No dia a dia, o que ajuda mais: a paciente conseguir avisar na hora que
  está sobrecarregada (RF02), ou só registrar o sintoma para olhar depois (RF01, RF04)?
  Alguma dessas você diria que é indispensável já na primeira versão?"
- **Hipótese revisada:** RF02 e RF04 = 4 · *Must*; RF01 = 3 · *Should*; RF03 = 2 · *Could*.
- **Imaginado pela equipe — não confirmado:** quem está no limite não vai parar para
  preencher um diário para olhar depois; precisa de um gesto rápido de "não estou dando
  conta agora" (RF02). Mas, para sinalizar isso, o registro básico do estado (RF01) precisa
  existir — por isso sobe para *Should*.

**CP2 · Acompanhamento do ciclo menstrual**

- **Pergunta:** "Para estimar a fase do ciclo de uma paciente, é mais confiável ela informar
  a data de início (RF06) ou os sintomas que está sentindo (RF08)? As duas formas são
  igualmente necessárias já no início, ou uma pode vir depois?"
- **Hipótese revisada:** RF06 = 3 · *Should*; RF08, RF05 e RF07 = 2 · *Could*; RF09 = 1 ·
  *Won't*.
- **Imaginado pela equipe — não confirmado:** a data de início (RF06) é um dado objetivo e
  mais confiável; os sintomas (RF08) variam muito de pessoa para pessoa e funcionam melhor
  como complemento do que como base do cálculo — por isso desce de *Should* para *Could*.

**CP3 · Privacidade dos dados da usuária**

- **Pergunta:** "Proteger o acesso com PIN (RF11) e aceitar os termos de uso (RF12) tratam
  dado de saúde da paciente. Você concorda que isso é obrigatório já na primeira versão? Tem
  algo de privacidade que você trataria como ainda mais urgente?"
- **Hipótese revisada:** RF11 e RF12 = 4 · *Must*; RF10 = 2 · *Could*.
- **Imaginado pela equipe — não confirmado:** sem discussão, obrigatório na v1 — dado de
  saúde é exigência legal (LGPD) e ética antes de ser escolha de escopo. Mas o PIN protege o
  aparelho; o risco maior está no armazenamento. A equipe trataria criptografia, minimização
  de dados e transparência como igualmente urgentes (ver a nota de RNF novo na Seção 9.4).

**CP4 · Planejamento adaptativo das tarefas**

- **Pergunta:** "A recomendação diária de tarefas (RF13) é o coração do produto, na sua
  visão? E o resumo do dia (RF14): indispensável ou só uma conveniência?"
- **Hipótese revisada:** RF13 = 4 · *Must*; RF14 = 2 · *Could*.
- **Imaginado pela equipe — não confirmado:** a promessa central do produto é "me ajuda a
  organizar o dia respeitando minha energia". Sem RF13 não existe produto. RF14 é
  conveniência: reforça a sensação de dever cumprido, mas é possível lançar sem ele.

**CP5 · Gestão acolhedora da carga diária**

- **Pergunta:** "Das ações do dia a dia com as tarefas — reajustar (RF15),
  cadastrar/editar/concluir (RF16, RF17, RF20), adiar sem culpa (RF18), excluir (RF19),
  sugerir e receber mensagens de acolhimento (RF21, RF22) — quais têm que estar prontas já na
  primeira versão, e quais podem vir depois?"
- **Hipótese revisada:** RF15, RF16, RF17, RF18 e RF20 = 4 · *Must*; RF19 = 3 · *Should*;
  RF22 = 3 · *Should*; RF21 = 2 · *Could*.
- **Imaginado pela equipe — não confirmado:** o laço mínimo que já entrega valor é cadastrar
  (RF17), concluir (RF20) e reajustar (RF15). Editar (RF16) também é *Must*: todo mundo erra
  ao digitar. Adiar sem culpa (RF18) é *Must* mesmo sendo "só um status", porque é a
  identidade do produto. Excluir (RF19) é menos frequente, fica *Should*. As mensagens de
  acolhimento (RF22) sobem para *Should* — sem isso o produto vira só mais uma lista de
  tarefas; RF21 pode seguir *Could* se o tom acolhedor já aparecer no resto da interface.

**CP6 · Reconhecimento de ritmo sustentável**

- **Pergunta:** "A retrospectiva mensal (RF23) e o registro de atividades de acolhimento
  (RF24) fariam falta desde o início, ou é algo que pode vir numa versão futura?"
- **Hipótese revisada:** RF23 e RF24 = 2 · *Could* (quase "próxima versão").
- **Imaginado pela equipe — não confirmado:** na v1 a paciente mal tem um mês de dados para
  olhar; a retrospectiva teria pouco a mostrar. Ganha valor quando já existe histórico e
  retenção — ótimo material para a v2.

**CP7 · Conta e preferências da usuária**

- **Pergunta:** "Criar conta (RF25) é claramente pré-requisito. Já recuperar acesso (RF26) e
  conhecer a proposta do sistema (RF27): você trataria como essenciais no MVP ou como algo
  que dá para simplificar no início?"
- **Hipótese revisada:** RF25 = 4 · *Must*; RF26 = 3 · *Should*; RF27 = 2 · *Could*.
- **Imaginado pela equipe — não confirmado:** criar conta é pré-requisito óbvio, *Must*.
  Recuperar acesso quase vira *Must* (dado de saúde trancado é sério), mas como um *reset*
  simples resolve, fica *Should*. Conhecer a proposta pode ser uma tela simples ou até pulada
  no início, mas um mínimo de contexto ajuda na adesão, dado o tema sensível.

### 9.8.2 Registro real do que ocorreu

| Item | Registro |
|---|---|
| **Quem participou** | Ninguém. O contato com a Dra. Cláudia Araújo Bottino não foi confirmado a tempo desta entrega. |
| **Quando ocorreu** | Não ocorreu. Tentativas de contato até 28–29/09/2026, sem retorno. |
| **RFs confirmados sem alteração** | Nenhum. Não houve validação real. |
| **RFs com nota ajustada** | Não aplicável. As notas da Seção 9.4 são hipótese revisada da equipe, e não ajuste decorrente de validação. |
| **Divergências registradas** | Não aplicável. |
| **Próximos passos** | Agendar entrevista real com a Dra. Cláudia — ou com outra representante indicada pelo LabLivre — assim que possível; atualizar esta tabela com a validação real e sinalizar a pendência ao professor e à monitoria. |
