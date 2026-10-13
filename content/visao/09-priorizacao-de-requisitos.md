---
title: "9. Priorização de Requisitos"
numero: "9"
weight: 9
resumo: "Critérios e escalas de valor de negócio e de esforço técnico, avaliação dos 29 requisitos funcionais, tabela consolidada e matriz 4 × 4 de priorização."
---

> **Fonte e status desta seção.** Os requisitos aqui priorizados são os do quadro
> *MindCycle – Figma*, consolidados na **Matriz de Rastreabilidade de Requisitos v1.0**
> (extração de 28/09/2026), adotada pela equipe como fonte oficial de requisitos do
> projeto — conforme as recomendações 07 e 08 registradas na
> [Seção 11.8](../11-rastreabilidade/#achados-consistencia).
> A numeração **RF01–RF27** e **RNF01–RNF11** desta seção é a mesma do catálogo da
> [Seção 8](../08-requisitos-de-software/). O **RF28** é um requisito novo, descoberto na
> reunião de validação de 05/10/2026 (Seção 9.8), ainda não formalizado no catálogo oficial.
> O **RF29** é outro requisito novo, identificado em revisão técnica da equipe (não na
> reunião clínica), também ainda não formalizado.
>
> **Versão:** 0.4 · **Data:** 12/10/2026 · **Status:** critérios definidos e revisados com
> a monitoria; 14 dos 29 RFs com valor de negócio validado com a cliente em reunião real; os
> demais seguem como hipótese da equipe, pendente de validação.

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

> **Ressalva de validação.** O contato síncrono com a Dra. Cláudia Araújo Bottino ocorreu em
> **05/10/2026**. Na reunião, 14 dos 29 RFs foram discutidos diretamente e têm nota validada
> com justificativa real da cliente; os demais não entraram na conversa e permanecem como
> **hipótese da equipe**, construída a partir dos critérios da Seção 9.2. A coluna
> *Confirmado* da Seção 9.4 distingue os dois casos linha a linha. O registro completo da
> reunião (participantes, o que mudou, o que ficou para depois) está na Seção 9.8. As
> notas de esforço técnico (Seção 9.5) **não** dependem da cliente e são avaliações
> efetivas da equipe, inalteradas pela reunião.

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
| **1** | Won't have now | Baixo uso esperado ou conveniência não central ao problema nesta entrega. |

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

Avaliação agrupada por característica de produto (CP), na mesma ordem do roteiro de
validação (Seção 9.8.1), aplicado na reunião de 05/10/2026 com a Dra. Cláudia Araújo
Bottino.

A coluna *Confirmado* distingue os RFs discutidos diretamente na reunião (`✓ 05/10`) dos
que permanecem em **hipótese da equipe** (`—`), ainda pendentes de validação.

### CP1 · Registro e análise de sintomas e disposição — OE1

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF01 | Consultar sintomas comuns da fase | 3 | Should have | Não comentado diretamente na reunião; mantém a hipótese da equipe. Conteúdo educativo sobre sintomas típicos da fase, no mesmo espírito do RF09 (reduzir estranheza e autoculpa, validado pela cliente). | — |
| RF02 | Sinalizar sobrecarga | 4 | Must have | Validado: a Dra. Cláudia confirmou o fluxo de sinalizar sobrecarga com reajuste automático das tarefas ("eu acho importante"). | ✓ 05/10 |
| RF03 | Receber lembrete de registro | 2 | Could have | Validado como ideia ("tipo Duolingo, que manda mensagem"), mas segue como conveniência, não bloqueante. Nota mantida. | ✓ 05/10 |
| RF04 | Registrar sintomas e disposição | 4 | Must have | Validado: "não precisa escrever, ela vai pontuando". A Dra. Cláudia endossou o registro por cliques e ajudou a refinar a lista de sintomas (Seção 9.8.3). | ✓ 05/10 |

### CP2 · Acompanhamento do ciclo menstrual — OE1

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF05 | Consultar situação atual do ciclo | 2 | Could have | Não comentado diretamente; mantém a hipótese da equipe. | — |
| RF06 | Registrar início da menstruação | 4 | Must have | Subiu de *Should*: a Dra. Cláudia chamou a confusão sobre regularidade do ciclo de "a grande dúvida" de praticamente toda paciente; a data de início é a base para resolver isso. | ✓ 05/10 |
| RF07 | Informar características do ciclo | 3 | Should have | Subiu de *Could*: é dependência estrutural do cálculo de fase (a data de início do RF06 sozinha não basta; é preciso a duração média do ciclo para saber em que fase a usuária está), além de sustentar a educação sobre regularidade que a Dra. Cláudia pediu para incluir no *onboarding*. | ✓ 05/10 |
| RF08 | Estimar fase do ciclo por sintomas | 2 | Could have | Não comentado diretamente; mantém a hipótese (RF06 cobre o caso comum). | — |
| RF09 | Recomendar conteúdos sobre o ciclo | 3 | Should have | Subiu de *Won't have*: a Dra. Cláudia validou fortemente o conteúdo explicativo por fase como forma de reduzir a autoculpa: "ela vai entender por que não tá conseguindo ser produtiva, não vai ficar achando que é algo da cabeça dela". | ✓ 05/10 |

### CP3 · Privacidade dos dados da usuária — OE1 {#cp3-privacidade}

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF10 | Visualizar calendário do ciclo | 2 | Could have | Validado como útil; sugestão de personalização de cor por usuária (melhoria futura, não eleva a nota). | ✓ 05/10 |
| RF11 | Proteger acesso com PIN | 4 | Must have | Fora do escopo clínico da conversa; mantém a hipótese por exigência de segurança (RNF03) já definida. | — |
| RF12 | Aceitar termos de uso | 4 | Must have | Não comentado; mantém a hipótese por exigência legal (LGPD/RNF02). | — |
| RF29 | Excluir conta e dados | 4 | Must have | Requisito novo, identificado em revisão técnica (não na reunião clínica): a LGPD (art. 18) garante à titular o direito de eliminação dos dados e revogação do consentimento. Coletar consentimento (RF12) sem oferecer a saída é incoerente, ainda mais tratando dado de saúde. | — |

> **Hipótese da equipe: possível RNF novo.** Levantado pela equipe antes da reunião: o PIN
> (RF11) protege o aparelho, mas o risco maior está no armazenamento. A equipe considera que
> **criptografia dos dados em repouso**, **minimização** (guardar apenas o necessário) e
> **transparência** sobre o que é coletado deveriam ter a mesma urgência. Hoje isso não está
> coberto por nenhum RNF explícito: o RNF03 cobre apenas controle de acesso. Este ponto não
> foi pauta da reunião clínica de 05/10; segue como candidato a novo RNF, a validar (ver
> [Seção 10.2](../10-mvp/#rnfs-mvp)).

### CP4 · Planejamento adaptativo das tarefas — OE2

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF13 | Recomendar tarefas do dia | 4 | Must have | Validado: o fluxo de tarefas com prioridade, prazo e energia foi apresentado e aprovado sem objeções. | ✓ 05/10 |
| RF14 | Receber resumo do dia | 2 | Could have | Não comentado diretamente; mantém a hipótese da equipe. | — |

### CP5 · Gestão acolhedora da carga diária — OE3

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF15 | Reajustar recomendação do dia | 4 | Must have | Validado: "eu acho importante", disse a Dra. Cláudia ao endossar o reajuste automático das tarefas. | ✓ 05/10 |
| RF16 | Editar tarefa | 4 | Must have | CRUD básico não comentado isoladamente; mantém a hipótese da equipe. | — |
| RF17 | Cadastrar tarefa | 4 | Must have | CRUD básico não comentado isoladamente; mantém a hipótese da equipe. Critério de aceite inclui os campos prioridade, prazo e energia necessária, pois são eles que alimentam o reajuste automático de RF13/RF15. | — |
| RF18 | Adiar tarefa | 4 | Must have | Validado: a possibilidade de adiar foi mencionada e confirmada como parte do fluxo de reajuste por sobrecarga. | ✓ 05/10 |
| RF19 | Excluir tarefa | 3 | Should have | Não comentado isoladamente; mantém a hipótese da equipe. | — |
| RF20 | Concluir tarefa | 4 | Must have | Não comentado isoladamente; mantém a hipótese da equipe. | — |
| RF21 | Sugerir atividades de acolhimento | 3 | Should have | Subiu de *Could*: a Dra. Cláudia defendeu com força sugestões de atividade física e exercícios de respiração ("atividade física é remédio"). Na v1, o escopo é sugestão estática (mesmo conteúdo para qualquer usuária na mesma situação); o reforço progressivo que se adapte ao comportamento repetido da usuária é evolução futura (Seção 10.3.1), não parte do MVP. | ✓ 05/10 |
| RF22 | Receber mensagens de acolhimento | 4 | Must have | Subiu de *Should*: a Dra. Cláudia destacou mensagens interativas de acolhimento ("você tá melhor hoje?") como o que torna o produto completo, não só mais uma lista de tarefas. | ✓ 05/10 |

### CP6 · Reconhecimento de ritmo sustentável — OE3

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF23 | Gerar retrospectiva mensal | 2 | Could have | Validado e refinado: incluir também o intervalo entre ciclos, não só produtividade de tarefas. Nota mantida. | ✓ 05/10 |
| RF24 | Registrar atividade de acolhimento | 2 | Could have | Não comentado isoladamente; mantém a hipótese da equipe. | — |

### CP7 · Conta e preferências da usuária — OE3

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF25 | Criar conta | 4 | Must have | Pré-requisito óbvio, não comentado isoladamente; mantém a hipótese da equipe. | — |
| RF26 | Recuperar acesso à conta | 3 | Should have | Não comentado; mantém a hipótese da equipe. | — |
| RF27 | Conhecer a proposta do sistema | 2 | Could have | Não comentado isoladamente (a educação sobre o ciclo ficou registrada em RF07/RF09); mantém a hipótese da equipe. | — |

### CP novo · Requisito descoberto na reunião {#cp-novo}

| RF | Requisito | Nota | Classificação | Justificativa | Confirmado |
|---|---|:---:|---|---|:---:|
| RF28 | Exportar relatório de sintomas para consulta médica | 3 | Should have | Sugestão da própria equipe, validada com entusiasmo pela Dra. Cláudia: relatório exportável de sintomas, intensidade de cólica e frequência, para levar à consulta médica. Ainda não está no catálogo formal de RFs (Seção 8); ver Seção 9.8.2. | ✓ 05/10 |

## 9.5 Avaliação de esforço técnico dos RFs

Avaliação exclusiva da equipe, sem dependência da cliente. As notas de **esforço** e
**complexidade** derivam da leitura de cada requisito; a **lacuna de capacidade** usa a
confirmação da equipe registrada na Seção 9.3.3. A reunião de 05/10/2026 tratou só de valor
de negócio; as notas abaixo permanecem inalteradas, com exceção do RF28, novo.

> **Nota sobre RF01 e RF09.** O esforço técnico avaliado aqui cobre apenas a construção do
> software (tela de leitura, lista curada). A curadoria e a validação clínica do conteúdo
> (lista de sintomas, textos explicativos por fase) é um trabalho de conteúdo, não de
> engenharia, e corre em paralelo com apoio da Dra. Cláudia; não está representada nas notas
> de esforço, complexidade ou lacuna abaixo (o refinamento já feito pela Dra. Cláudia para o
> RF04, de natureza equivalente, está na Seção 9.8.3).

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
| RF11 | Proteger acesso com PIN | 1 | 1 | 1 | 1,0 | Recalculado para o escopo reduzido (PIN numérico padrão, 10.3.1). A versão completa com gesto de pétalas (RNF09) teria esforço 3,0 (3+3+3), a reavaliar quando essa evolução entrar em pauta. |
| RF12 | Aceitar termos de uso | 1 | 1 | 1 | 1,0 | Tela de consentimento e persistência de uma *flag*. |
| RF29 | Excluir conta e dados | 1 | 1 | 1 | 1,0 | Fluxo de confirmação e exclusão em cascata; padrão de acesso a dado sensível já dominado pela equipe (RNF02/RNF03). |

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
| RF22 | Receber mensagens de acolhimento | 2 | 1 | 2 | 1,7 | Recalculado: o RF03 (padrão de notificação que seria reaproveitado) está fora do MVP, então o mecanismo de exibição precisa ser construído do zero. |

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

### CP novo · Requisito descoberto na reunião

| RF | Requisito | Esforço | Complex. | Lacuna | Consolidado | Justificativa |
|---|---|:---:|:---:|:---:|:---:|---|
| RF28 | Exportar relatório de sintomas | 3 | 2 | 2 | 2,3 | Recalculado: o RF23 (agregação que seria reaproveitada) está fora do MVP, então a agregação de dados para o relatório precisa ser construída à parte, além da geração do arquivo exportável/compartilhável. |

## 9.6 Tabela consolidada de avaliações

Valor de negócio (Seção 9.4, parte validada na reunião de 05/10) e esforço técnico
(Seção 9.5) reunidos em um único lugar. Esta é a base direta da matriz da Seção 9.7.

| Código | Requisito | Valor | Justificativa | Esforço | Complex. | Lacuna | Esforço técnico consolidado |
|---|---|:---:|---|:---:|:---:|:---:|:---:|
| RF01 | Consultar sintomas comuns da fase | 3 | Reduz estranheza, mesmo espírito do RF09 | 1 | 1 | 2 | 1,3 |
| RF02 | Sinalizar sobrecarga | 4 | Validado com a cliente | 2 | 2 | 2 | 2,0 |
| RF03 | Receber lembrete de registro | 2 | Validado, não bloqueante | 2 | 2 | 2 | 2,0 |
| RF04 | Registrar sintomas e disposição | 4 | Validado com a cliente | 2 | 2 | 2 | 2,0 |
| RF05 | Consultar situação atual do ciclo | 2 | Consulta pontual, complementar | 1 | 1 | 2 | 1,3 |
| RF06 | Registrar início da menstruação | 4 | Resolve "a grande dúvida" da regularidade | 1 | 1 | 2 | 1,3 |
| RF07 | Informar características do ciclo | 3 | Dependência do cálculo de fase (junto com RF06) | 1 | 1 | 2 | 1,3 |
| RF08 | Estimar fase do ciclo por sintomas | 2 | Refinamento, não é base do cálculo | 3 | 3 | 2 | 2,7 |
| RF09 | Recomendar conteúdos sobre o ciclo | 3 | Reduz autoculpa, validado pela cliente | 1 | 1 | 2 | 1,3 |
| RF10 | Visualizar calendário do ciclo | 2 | Validado, visualização de apoio | 2 | 2 | 2 | 2,0 |
| RF11 | Proteger acesso com PIN | 4 | Dado de saúde sensível | 1 | 1 | 1 | 1,0 |
| RF12 | Aceitar termos de uso | 4 | Pré-condição legal (LGPD) | 1 | 1 | 1 | 1,0 |
| RF13 | Recomendar tarefas do dia | 4 | Validado com a cliente | 3 | 3 | 2 | 2,7 |
| RF14 | Receber resumo do dia | 2 | Conveniência de visualização | 1 | 1 | 2 | 1,3 |
| RF15 | Reajustar recomendação do dia | 4 | Validado com a cliente | 3 | 3 | 2 | 2,7 |
| RF16 | Editar tarefa | 4 | CRUD essencial | 1 | 1 | 1 | 1,0 |
| RF17 | Cadastrar tarefa | 4 | CRUD essencial | 1 | 1 | 1 | 1,0 |
| RF18 | Adiar tarefa | 4 | Validado com a cliente | 1 | 1 | 1 | 1,0 |
| RF19 | Excluir tarefa | 3 | Uso menos frequente | 1 | 1 | 1 | 1,0 |
| RF20 | Concluir tarefa | 4 | Fecha o ciclo da tarefa | 1 | 1 | 1 | 1,0 |
| RF21 | Sugerir atividades de acolhimento | 3 | Defendido pela cliente (atividade física) | 2 | 2 | 2 | 2,0 |
| RF22 | Receber mensagens de acolhimento | 4 | O que torna o produto "completo" | 2 | 1 | 2 | 1,7 |
| RF23 | Gerar retrospectiva mensal | 2 | Validado e refinado (intervalo de ciclo) | 2 | 2 | 2 | 2,0 |
| RF24 | Registrar atividade de acolhimento | 2 | Alimenta a retrospectiva | 1 | 1 | 1 | 1,0 |
| RF25 | Criar conta | 4 | Pré-requisito estrutural | 2 | 1 | 1 | 1,3 |
| RF26 | Recuperar acesso à conta | 3 | Importante, mas contornável | 2 | 2 | 1 | 1,7 |
| RF27 | Conhecer a proposta do sistema | 2 | *Onboarding* | 1 | 1 | 2 | 1,3 |
| RF28 | Exportar relatório de sintomas | 3 | Novo, validado com entusiasmo pela cliente | 3 | 2 | 2 | 2,3 |
| RF29 | Excluir conta e dados | 4 | Direito legal da titular (LGPD, art. 18) | 1 | 1 | 1 | 1,0 |

**Distribuição das notas de valor de negócio**

| Classificação | Nota | Quantidade | Requisitos |
|---|:---:|:---:|---|
| Must have | 4 | 14 | RF02, RF04, RF06, RF11, RF12, RF13, RF15, RF16, RF17, RF18, RF20, RF22, RF25, RF29 |
| Should have | 3 | 7 | RF01, RF07, RF09, RF19, RF21, RF26, RF28 |
| Could have | 2 | 8 | RF03, RF05, RF08, RF10, RF14, RF23, RF24, RF27 |
| Won't have now | 1 | 0 | — |

## 9.7 Matriz 4 × 4 — valor de negócio × esforço técnico {#matriz-4x4}

O esforço técnico consolidado foi arredondado ao inteiro mais próximo (regra da
Seção 9.3.4) para posicionar cada requisito. As linhas representam o **valor de negócio**
(4 no topo) e as colunas o **esforço técnico** (1 à esquerda). Além das cinco mudanças de
posição da reunião de 05/10 (RF06, RF07, RF09, RF21, RF22), a revisão técnica da equipe
recalculou o esforço de RF11 (escopo reduzido), RF22 e RF28 (não podem mais reaproveitar
RF03 e RF23, que ficaram fora do MVP) e acrescentou o RF29, novo.

| Valor ↓ / Esforço → | **1** · Baixo | **2** · Moderado | **3** · Alto | **4** · Muito alto |
|---|---|---|---|---|
| **4** · Muito alto | **Prioridade máxima**<br>`RF06` `RF11` `RF12` `RF16` `RF17` `RF18` `RF20` `RF25` `RF29` | **Forte candidato ao MVP**<br>`RF02` `RF04` `RF22` | **Avaliar viabilidade**<br>`RF13` `RF15` | **Planejar, reduzir ou decompor**<br>— |
| **3** · Alto | **Forte candidato ao MVP**<br>`RF01` `RF07` `RF09` `RF19` | **Candidato ao MVP**<br>`RF21` `RF26` `RF28` | **Avaliar contexto**<br>— | **Entrega futura**<br>— |
| **2** · Moderado | **Avaliar oportunidade**<br>`RF05` `RF14` `RF24` `RF27` | **Entrega futura**<br>`RF03` `RF10` `RF23` | **Entrega futura**<br>`RF08` | **Baixa prioridade**<br>— |
| **1** · Baixo | **Avaliar oportunidade**<br>— | **Baixa prioridade**<br>— | **Baixa prioridade**<br>— | **Não priorizar agora**<br>— |

### 9.7.1 Leitura dos quadrantes

| Quadrante | Requisitos | Encaminhamento |
|---|---|---|
| **Prioridade máxima** (valor 4 · esforço 1) | RF12, RF16, RF17, RF18, RF20, RF25 | Entram no MVP sem discussão: alto valor a custo mínimo. |
| **Forte candidato ao MVP** (valor 4 · esforço 2) | RF02, RF04 | Entram no MVP; custo moderado plenamente justificado. |
| **Avaliar viabilidade** (valor 4 · esforço 3) | RF11, RF13, RF15 | Exigem decisão explícita da equipe — tratada na [Seção 10.3](../10-mvp/#justificativas-mvp). |
| **Forte candidato ao MVP** (valor 3 · esforço 1) | RF01, RF06, RF19, RF22 | Entram no MVP: baixo custo e valor alto o bastante. |
| **Candidato ao MVP** (valor 3 · esforço 2) | RF26 | Decisão de corte; ficou de fora por não ser pré-requisito do fluxo mínimo. |
| **Avaliar oportunidade** (valor 2 e 1 · esforço 1) | RF05, RF07, RF09, RF14, RF24, RF27 | Baratos, mas de valor complementar: entram quando houver folga de escopo. |
| **Entrega futura** (valor 2 · esforço 2 e 3) | RF03, RF08, RF10, RF21, RF23 | Adiados para as entregas seguintes. |
| **Quadrantes de esforço 4** | — | Nenhum requisito do escopo inicial caiu aqui, o que é coerente com a expectativa declarada na Seção 9.3.2. |

> **A matriz orienta, não decide.** Dois requisitos de valor máximo (RF13 e RF15) caíram em
> *avaliar viabilidade*. Eles **não** entram nem saem do MVP automaticamente: a decisão de
> cada um, e de mais dois casos fora dessa faixa (RF05 e RF26), está registrada e justificada
> na
> [Seção 10.3](../10-mvp/#justificativas-mvp).

## 9.8 Validação da priorização com a cliente

Esta subseção registra, de forma transparente, a reunião de validação realizada em
05/10/2026 e o que ela confirmou, ajustou ou deixou em aberto.

### 9.8.1 Roteiro aplicado na reunião {#roteiro-validacao}

O roteiro abaixo foi elaborado por característica de produto e efetivamente aplicado com a
Dra. Cláudia Araújo Bottino em 05/10/2026. Cada bloco traz a pergunta feita e o que ela
respondeu, em transcrição resumida da reunião.

**CP1 · Registro e análise de sintomas e disposição**

- **Pergunta:** "No dia a dia, o que ajuda mais: a paciente conseguir avisar na hora que
  está sobrecarregada (RF02), ou só registrar o sintoma para olhar depois (RF01, RF04)?
  Alguma dessas você diria que é indispensável já na primeira versão?"
- **Resposta validada:** RF02 e RF04 = 4 · *Must*. RF03, confirmado em outro momento da
  conversa (sugestão de lembrete estilo *Duolingo*), mantém 2 · *Could*.
- **Síntese da resposta:** quem está no limite não vai parar para preencher um diário para
  olhar depois; precisa de um gesto rápido de "não estou dando conta agora" (RF02). A Dra.
  Cláudia também revisou em detalhe a lista de sintomas do RF04 (Seção 9.8.3).
- **RF01 não foi comentado diretamente.** Permanece como hipótese da equipe em 3 · *Should*,
  por analogia ao RF09 (conteúdo educativo que reduz estranheza), não por habilitar o RF02
  como constava em versão anterior desta seção.

**CP2 · Acompanhamento do ciclo menstrual**

- **Pergunta:** "Para estimar a fase do ciclo de uma paciente, é mais confiável ela informar
  a data de início (RF06) ou os sintomas que está sentindo (RF08)? As duas formas são
  igualmente necessárias já no início, ou uma pode vir depois?"
- **Resposta validada:** RF06 = 4 · *Must*; RF07 e RF09 = 3 · *Should*; RF05 e RF08 = 2 ·
  *Could*.
- **Síntese da resposta:** a Dra. Cláudia chamou a confusão sobre regularidade do ciclo de
  "a grande dúvida" de praticamente toda paciente, o que elevou o RF06 a *Must* e trouxe o
  RF07 (educação sobre regularidade) e o RF09 (conteúdo explicativo por fase, para reduzir a
  autoculpa) para *Should*. O RF08 permanece como refinamento: a data de início é um dado
  objetivo, e os sintomas variam muito de pessoa para pessoa.

**CP3 · Privacidade dos dados da usuária**

- **Pergunta:** "Proteger o acesso com PIN (RF11) e aceitar os termos de uso (RF12) tratam
  dado de saúde da paciente. Você concorda que isso é obrigatório já na primeira versão? Tem
  algo de privacidade que você trataria como ainda mais urgente?"
- **Não foi pauta da reunião clínica.** O roteiro previa essa pergunta, mas a conversa com a
  Dra. Cláudia não chegou a tratar de segurança de dados; ela se concentrou no conteúdo
  clínico (Seções 9.8.1, CP1–CP2, CP5). RF11 e RF12 permanecem como hipótese da equipe
  (Seção 9.4), por exigência legal e de segurança já definida independentemente da cliente.
  **RF10 não entra nessa lacuna:** embora catalogado sob CP3 (herdado do catálogo original de
  requisitos), seu conteúdo é visualização de calendário e cores por fase, tema do
  acompanhamento do ciclo (CP2), e foi confirmado na conversa sobre esse tópico (Seção 9.8.4).
  A classificação de RF10 em CP3 é uma inconsistência de categorização a corrigir em revisão
  futura do catálogo, não uma lacuna de validação.

**CP4 · Planejamento adaptativo das tarefas**

- **Pergunta:** "A recomendação diária de tarefas (RF13) é o coração do produto, na sua
  visão? E o resumo do dia (RF14): indispensável ou só uma conveniência?"
- **Resposta validada:** RF13 = 4 · *Must*; RF14 = 2 · *Could* (hipótese mantida).
- **Síntese da resposta:** o fluxo de tarefas com prioridade, prazo e energia foi apresentado
  e aprovado sem objeções. O RF14 não foi comentado isoladamente.

**CP5 · Gestão acolhedora da carga diária**

- **Pergunta:** "Das ações do dia a dia com as tarefas — reajustar (RF15),
  cadastrar/editar/concluir (RF16, RF17, RF20), adiar sem culpa (RF18), excluir (RF19),
  sugerir e receber mensagens de acolhimento (RF21, RF22) — quais têm que estar prontas já na
  primeira versão, e quais podem vir depois?"
- **Resposta validada:** RF15, RF18 e RF22 = 4 · *Must*; RF21 = 3 · *Should*; RF16, RF17 e
  RF20 seguem hipótese em 4 · *Must*; RF19 segue hipótese em 3 · *Should*.
- **Síntese da resposta:** "eu acho importante", disse a Dra. Cláudia ao endossar o reajuste
  automático (RF15). A possibilidade de adiar sem culpa (RF18) foi confirmada como parte
  desse fluxo. Ela defendeu com força sugestões de atividade física e exercícios de
  respiração como parte do produto ("atividade física é remédio"), o que elevou o RF21 de
  *Could* para *Should*. As mensagens interativas de acolhimento ("você tá melhor hoje?")
  foram destacadas como o que torna o produto completo, não só mais uma lista de tarefas, o
  que elevou o RF22 de *Should* para *Must*. RF16, RF17, RF19 e RF20 (CRUD básico) não foram
  comentados isoladamente.

**CP6 · Reconhecimento de ritmo sustentável**

- **Pergunta:** "A retrospectiva mensal (RF23) e o registro de atividades de acolhimento
  (RF24) fariam falta desde o início, ou é algo que pode vir numa versão futura?"
- **Resposta validada:** RF23 = 2 · *Could*, refinado; RF24 = 2 · *Could* (hipótese mantida).
- **Síntese da resposta:** na v1 a paciente mal tem um mês de dados para olhar; a
  retrospectiva teria pouco a mostrar. A Dra. Cláudia sugeriu incluir também o intervalo
  entre ciclos na retrospectiva, não só a produtividade de tarefas, o que refina o escopo do
  RF23 sem mudar sua nota.

**CP7 · Conta e preferências da usuária**

- **Pergunta:** "Criar conta (RF25) é claramente pré-requisito. Já recuperar acesso (RF26) e
  conhecer a proposta do sistema (RF27): você trataria como essenciais no MVP ou como algo
  que dá para simplificar no início?"
- **Não foi pauta da reunião clínica.** RF25, RF26 e RF27 permanecem como hipótese da equipe
  (Seção 9.4): criar conta como pré-requisito óbvio, recuperar acesso como *Should* por ser
  contornável, e conhecer a proposta como *Could*.

### 9.8.2 Requisito novo e decisões de escopo {#descobertas-reuniao}

Além de validar notas de valor de negócio, a reunião trouxe um requisito novo e esclareceu
os limites do escopo do produto.

**RF28: exportar relatório de sintomas.** Sugestão da própria equipe, detalhada pela Dra.
Cláudia: um relatório com o histórico de sintomas, intensidade de cólica e frequência,
exportável para levar a uma consulta médica. Boa relação valor/esforço (Seção 9.7), mas não
é essencial ao problema central (sobrecarga executiva); por isso ficou de fora do MVP
(Seção 10.1.2) como forte candidato à próxima *release*. Ainda não está formalizado no
catálogo oficial de RFs (Seção 8).

**Fora de escopo: sugestões voltadas à fertilidade.** A Dra. Cláudia sugeriu
funcionalidades como alerta de período fértil, lembrete de vacina HPV e de exame preventivo.
A equipe esclareceu, na própria reunião, que o produto propositalmente foge do foco em
fertilidade, comum nos concorrentes, para manter o foco em produtividade e sobrecarga
executiva. Registrado como decisão de escopo, não como pendência.

**Fora do MVP: alertas de saúde cruzando sintomas.** A equipe mencionou um aplicativo (Flo)
que cruza sintomas registrados com possíveis quadros clínicos (por exemplo, indícios de SOP
ou contraindicação de estrogênio em enxaqueca com aura). A Dra. Cláudia validou a ideia com
exemplos clínicos reais, mas esse tipo de alerta exige validação clínica e jurídica adicional
antes de virar requisito. Não entra no catálogo agora; fica registrado como tema de pesquisa
para versões futuras.

### 9.8.3 Refinamento da lista de sintomas do RF04 {#refinamento-rf04}

A Dra. Cláudia revisou a lista de sintomas em detalhe: separar "cansada" de "desânimo" (são
sensações diferentes), permitir "triste" e "chorosa" como opções distintas, manter "ansiosa"
e "bem/com energia". Isso não muda a nota de negócio do RF04 (já era *Must*), mas deve
orientar o conteúdo da tela quando o requisito for implementado.

### 9.8.4 Registro real do que ocorreu

| Item | Registro |
|---|---|
| **Quem participou** | Pela equipe: Ana Luisa, Arthur Palhares, Luana, Tiago e Pedro Ian. Pela cliente: Dra. Cláudia Araújo Bottino (ginecologista). |
| **Quando ocorreu** | 05/10/2026, 15h00, 45 minutos, chamada de vídeo com transcrição automática. |
| **RFs confirmados sem alteração de nota** | RF02, RF03, RF04, RF10, RF13, RF15, RF18, RF23. |
| **RFs com nota ajustada** | RF06 (*Should* → *Must*), RF07 (*Could* → *Should*), RF09 (*Won't* → *Should*), RF21 (*Could* → *Should*), RF22 (*Should* → *Must*). |
| **Requisito novo** | RF28, exportar relatório de sintomas (Seção 9.8.2), ainda não formalizado no catálogo oficial. |
| **Divergências registradas** | A cliente sugeriu funcionalidades de fertilidade e alertas clínicos cruzando sintomas; a equipe optou por manter o escopo em produtividade e sobrecarga executiva (Seção 9.8.2). |
| **Próximos passos** | Fechar a lista de RFs do MVP com o professor e a monitoria; formalizar o RF28 no catálogo (Seção 8); nova reunião com a Dra. Cláudia prevista para cerca de 4 semanas depois (final de outubro ou início de novembro de 2026) para validar o MVP consolidado (Seção 10.4). |
