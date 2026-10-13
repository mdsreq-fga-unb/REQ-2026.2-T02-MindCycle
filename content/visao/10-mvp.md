---
title: "10. Definição e Composição do MVP"
numero: "10"
weight: 10
resumo: "Requisitos funcionais selecionados para o MVP, classificação dos requisitos não funcionais aplicáveis, justificativas da composição e registro da validação com a cliente."
---

> **Fonte e status desta seção.** A composição do MVP deriva diretamente da matriz 4 × 4 da
> [Seção 9.7](../09-priorizacao-de-requisitos/#matriz-4x4).
> A numeração segue o catálogo da [Seção 8](../08-requisitos-de-software/): **RF01–RF27** e
> **RNF01–RNF11** vêm da **Matriz de Rastreabilidade de Requisitos v1.0** (quadro
> *MindCycle – Figma*, extração de 28/09/2026), fonte oficial de requisitos do projeto, e
> **RF28–RF36** foram acrescentados depois pela equipe.
>
> **Versão:** 0.5 · **Data:** 12/10/2026 · **Status:** MVP proposto pela equipe com 14 dos 36
> RFs validados individualmente com a cliente (Seção 9.8); validação formal do **MVP
> consolidado ainda pendente** (ver Seção 10.4). Na versão 0.5, "exportar relatório de
> sintomas" e "excluir conta e dados" passaram a ser **RF35** e **RF36** (eram RF28 e RF29,
> números que o catálogo já usava para outros requisitos), e os RF28–RF34 do catálogo foram
> avaliados pela primeira vez ([Seção 9.9](../09-priorizacao-de-requisitos/#reavaliacao-acrescentados)).

## 10.1 Requisitos funcionais selecionados para o MVP

O MVP é composto por **22 dos 36 requisitos funcionais** do catálogo: 18 depois da reunião
de validação de 05/10/2026, mais RF05, RF26 e RF36, incluídos depois de revisão técnica da
equipe, e RF28, incluído na reavaliação dos requisitos acrescentados ao catálogo, ambas em
12/10/2026. A seleção combina dois critérios: (i) o posicionamento do requisito nos
quadrantes de prioridade da matriz 4 × 4 e (ii) a formação de um **fluxo de uso coerente e
completo**, capaz de ser exercitado de ponta a ponta por uma usuária real.

### 10.1.1 Requisitos incluídos

| # | RF | Requisito | CP | OE | Valor | Esforço | Quadrante de origem | Papel no MVP |
|:--:|---|---|---|:--:|:---:|:---:|---|---|
| 1 | RF25 | Criar conta | CP7 | OE3 | 4 | 1,3 | Prioridade máxima | Pré-requisito estrutural de todo o produto |
| 2 | RF26 | Recuperar acesso à conta | CP7 | OE3 | 3 | 1,7 | Candidato ao MVP | Evita o beco sem saída do PIN esquecido (ver 10.3.1) |
| 3 | RF12 | Aceitar termos de uso | CP3 | OE1 | 4 | 1,0 | Prioridade máxima | Pré-condição legal (LGPD) para coletar qualquer dado |
| 4 | RF11 | Proteger acesso com PIN | CP3 | OE1 | 4 | 1,0 | Prioridade máxima | Proteção do dado sensível de saúde, com PIN numérico (**escopo reduzido**, ver 10.3.1) |
| 5 | RF36 | Excluir conta e dados | CP3 | OE1 | 4 | 1,0 | Prioridade máxima | Direito legal da titular (LGPD, art. 18); contrapartida do consentimento do RF12 |
| 6 | RF06 | Registrar início da menstruação | CP2 | OE1 | 4 | 1,3 | Prioridade máxima | Dado objetivo que calibra a fase do ciclo; valor confirmado com a cliente |
| 7 | RF07 | Informar características do ciclo | CP2 | OE1 | 3 | 1,3 | Forte candidato | Duração média do ciclo: dependência estrutural do cálculo de fase, não só educação |
| 8 | RF09 | Recomendar conteúdos sobre o ciclo | CP2 | OE1 | 3 | 1,3 | Forte candidato | Reduz autoculpa; validado com entusiasmo pela cliente |
| 9 | RF28 | Consultar funcionamento do ciclo | CP2 | OE1 | 3 | 1,3 | Forte candidato | Educação sobre regularidade pedida pela cliente; nota ainda em hipótese (ver 10.3.1) |
| 10 | RF05 | Consultar situação atual do ciclo | CP2 | OE1 | 2 | 1,3 | Avaliar oportunidade | Exibe a fase que o RF06+RF07 já calculam no MVP (ver 10.3.1) |
| 11 | RF01 | Consultar sintomas comuns da fase | CP1 | OE1 | 3 | 1,3 | Forte candidato | Conteúdo sobre os sintomas típicos da fase atual; reduz estranheza e autoculpa |
| 12 | RF04 | Registrar sintomas e disposição | CP1 | OE1 | 4 | 2,0 | Forte candidato | *Check-in* diário; dado-fonte de RF02, RF13 e RF15 |
| 13 | RF02 | Sinalizar sobrecarga | CP1 | OE1 | 4 | 2,0 | Forte candidato | Resposta imediata à sobrecarga, a qualquer momento do dia |
| 14 | RF13 | Recomendar tarefas do dia | CP4 | OE2 | 4 | 2,7 | Avaliar viabilidade | Promessa central do produto |
| 15 | RF17 | Cadastrar tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Laço mínimo de valor; registra a energia necessária usada por RF13 e RF15 |
| 16 | RF16 | Editar tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Correção de erro de cadastro |
| 17 | RF18 | Adiar tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Identidade do produto: adiar sem culpa; valor confirmado com a cliente |
| 18 | RF19 | Excluir tarefa | CP5 | OE3 | 3 | 1,0 | Forte candidato | Fecha o CRUD de tarefas a custo nulo |
| 19 | RF20 | Concluir tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Fecha o laço mínimo de valor |
| 20 | RF15 | Reajustar recomendação do dia | CP5 | OE3 | 4 | 2,7 | Avaliar viabilidade | Diferencial central: realocação por disposição; valor confirmado com a cliente |
| 21 | RF21 | Sugerir atividades de acolhimento | CP5 | OE3 | 3 | 2,0 | Candidato ao MVP | Atividade física e respiração defendidas com força pela cliente; v1 traz sugestão estática |
| 22 | RF22 | Receber mensagens de acolhimento | CP5 | OE3 | 4 | 1,7 | Forte candidato | Tom acolhedor que atravessa todo o percurso; valor confirmado com a cliente |

**Cobertura do MVP por característica e objetivo**

| CP | Característica | OE | RFs no MVP | RFs fora | Cobertura |
|---|---|:--:|---|---|:--:|
| CP1 | Registro e análise de sintomas e disposição | OE1 | RF01, RF02, RF04 | RF03, RF30, RF34, RF35 | 3/7 |
| CP2 | Acompanhamento do ciclo menstrual | OE1 | RF05, RF06, RF07, RF09, RF28 | RF08 | 5/6 |
| CP3 | Privacidade dos dados da usuária | OE1 | RF11, RF12, RF36 | RF10 | 3/4 |
| CP4 | Planejamento adaptativo das tarefas | OE2 | RF13 | RF14 | 1/2 |
| CP5 | Gestão acolhedora da carga diária | OE3 | RF15, RF16, RF17, RF18, RF19, RF20, RF21, RF22 | RF33 | 8/9 |
| CP6 | Reconhecimento de ritmo sustentável | OE3 | — | RF23, RF24, RF31, RF32 | 0/4 |
| CP7 | Conta e preferências da usuária | OE3 | RF25, RF26 | RF27, RF29 | 2/4 |

Seis das sete características de produto estão representadas no MVP. A CP5 tem 8 dos seus 9
RFs no MVP; fica de fora apenas o RF33, refinamento do RF21. A exceção é a **CP6**
(Reconhecimento de ritmo sustentável), cuja natureza retrospectiva a torna inaplicável em
uma primeira versão; justificativa em 10.3.4.

### 10.1.2 Requisitos excluídos do MVP

| RF | Requisito | CP | Valor | Esforço | Motivo da exclusão |
|---|---|---|:---:|:---:|---|
| RF03 | Receber lembrete de registro | CP1 | 2 | 2,0 | Validado como ideia pela cliente, mas o fluxo funciona sem lembrete. |
| RF08 | Estimar fase do ciclo por sintomas | CP2 | 2 | 2,7 | Refinamento, não base do cálculo: RF06 e RF07 cobrem a função no MVP a custo muito menor. |
| RF10 | Visualizar calendário do ciclo | CP3 | 2 | 2,0 | Validado como útil pela cliente, mas não crítico ao fluxo diário. |
| RF14 | Receber resumo do dia | CP4 | 2 | 1,3 | Conveniência de visualização; o plano já existe via RF13. |
| RF23 | Gerar retrospectiva mensal | CP6 | 2 | 2,0 | Validado e refinado pela cliente, mas depende de histórico que o MVP ainda não produz. |
| RF24 | Registrar atividade de acolhimento | CP6 | 2 | 1,0 | Alimenta o RF23; sai junto com ele. |
| RF27 | Conhecer a proposta do sistema | CP7 | 2 | 1,3 | *Onboarding*; ajuda a adesão, mas não bloqueia o uso. |
| RF29 | Gerenciar notificações | CP7 | 3 | 2,0 | Sem objeto no MVP, que não emite notificações; entra junto com RF03 e RF14 (ver 10.3.3). |
| RF30 | Gerenciar medicações | CP1 | 2 | 1,3 | Dado sensível sem uso no fluxo do MVP; coletá-lo agora contraria a minimização (RNF proposto, 10.2). |
| RF31 | Comparar relatórios mensais | CP6 | 2 | 2,3 | Exige ao menos dois meses de histórico e um relatório mensal que nenhum RF gera ainda. |
| RF32 | Exportar relatório mensal | CP6 | 2 | 2,3 | Mesma dependência do RF31; o uso clínico é atendido antes pelo RF35. |
| RF33 | Registrar atividades de acolhimento favoritas | CP5 | 2 | 1,0 | Só faz diferença quando as sugestões do RF21 deixarem de ser estáticas. |
| RF34 | Registrar diagnósticos prévios | CP1 | 2 | 1,3 | Mesmo caso do RF30; base dos alertas clínicos adiados na Seção 9.8.2. |
| RF35 | Exportar relatório de sintomas | CP1 | 3 | 2,3 | **Ficou fora por pouco:** forte candidato à próxima *release* (ver 10.3.3). |

### 10.1.3 Alocação às iterações da Construção {#alocacao-iteracoes}

Os 22 RFs do MVP foram distribuídos entre as duas iterações da Construção
([Seção 6](../06-cronograma-e-entregas/)) de forma que cada requisito chegue com as suas
dependências (10.3.3) na mesma iteração ou em uma anterior, como exige o item 6 do
[DoR](../12-dor-e-dod/).

| Iteração | Período | RFs | Foco | Esforço somado |
|---|---|---|---|:---:|
| **Iteração 5** | 13/10 a 27/10/2026 | RF25, RF12, RF11, RF26, RF36, RF06, RF07, RF05, RF01, RF04, RF02 | Conta, consentimento e acesso (LGPD); calibração do ciclo; *check-in* diário | 15,2 |
| **Iteração 6** | 27/10 a 10/11/2026 | RF17, RF16, RF18, RF19, RF20, RF13, RF15, RF09, RF28, RF21, RF22 | Tarefas, recomendação e reajuste; conteúdos e acolhimento; integração do MVP | 16,7 |

O RF07 vai para a Iteração 5 porque sem ele não há cálculo de fase, do qual dependem RF01 e
RF05. RF09 e RF28 ficam na Iteração 6 porque são conteúdo cuja curadoria corre em paralelo
com a cliente (nota da Seção 9.5). A coluna de esforço soma as notas consolidadas da
Seção 9.5 e serve só para comparar a carga das duas iterações; não é estimativa em horas.

## 10.2 Requisitos não funcionais aplicáveis ao MVP {#rnfs-mvp}

Cada RNF do catálogo foi classificado a partir do MVP definido em 10.1, segundo quatro
categorias:

| Categoria | Definição |
|---|---|
| **Obrigatório para o MVP** | Deve ser satisfeito na primeira versão. Sua ausência compromete legalidade, segurança ou usabilidade mínima do produto. |
| **Associado a RF do MVP** | Vincula-se a um RF incluído no MVP como **meta de qualidade** desse requisito; é perseguido na primeira versão, mas não é, isoladamente, condição de aceite do MVP. |
| **Evolutivo** | Só passa a valer quando um RF do MVP evoluir além do escopo reduzido adotado na primeira versão. |
| **Não aplicável ao MVP** | Vincula-se exclusivamente a RFs fora do MVP. |

### 10.2.1 Classificação dos RNFs

| RNF | Requisito | Categoria (URPS+/Sommerville) | Classificação | Observação |
|---|---|---|---|---|
| RNF01 | As notificações não devem exibir informações sobre ciclo, sintomas ou disposição sem autorização da usuária. | Segurança da informação | **Associado a RF do MVP** | Os RFs citados no quadro (RF03 e RF14) e o RF29, que dá à usuária o controle previsto no critério, ficaram fora do MVP. O princípio vale para RF21 e RF22, que estão no MVP; na primeira versão eles aparecem só dentro do aplicativo, sem notificação do sistema, o que atende ao RNF01 por padrão (ver 10.3.3). |
| RNF02 | O tratamento dos dados deve atender à LGPD (Lei nº 13.709/2018), considerando dados de saúde como dados pessoais sensíveis. | Externo (Legislativo) | **Obrigatório** | Aplica-se a RF04, RF06, RF07, RF12 e RF36 — todos no MVP. O RF36 (excluir conta e dados) é a contrapartida do art. 18 da LGPD ao consentimento coletado pelo RF12. |
| RNF03 | Os dados de ciclo, sintomas, disposição e tarefas devem ser acessíveis somente pela própria usuária. | Segurança da informação | **Obrigatório** | Aplica-se a RF04, RF06, RF11 e RF36 — todos no MVP. O RF26 (recuperar acesso) foi desenhado para não violar este RNF: ver 10.3.1. |
| RNF04 | O registro de sintomas e disposição deve exigir poucas interações (no máximo 3 toques). | Usabilidade | **Obrigatório** | Alvo direto do RF04, a ação mais frequente do produto. |
| RNF06 | A recomendação do dia deve ser exibida em até 3 segundos após o acesso. | Desempenho | **Associado a RF do MVP** | Meta de qualidade do RF13. |
| RNF07 | O reajuste da recomendação deve aparecer em até 2 segundos após o registro de disposição. | Desempenho | **Associado a RF do MVP** | Meta de qualidade do RF15. |
| RNF08 | A confirmação do registro de sintomas e disposição deve aparecer em até 2 segundos. | Desempenho | **Obrigatório** | O *check-in* (RF04) precisa parecer instantâneo, para não se tornar mais uma fricção. |
| RNF09 | O PIN deve ser informado pela sequência de toques em pétalas de uma flor. | Restrição de design | **Evolutivo** | Só volta a valer quando o RF11 evoluir do PIN numérico simples para o gesto de pétalas (ver 10.3.1). |
| RNF10 | A interface deve funcionar em telas de celular e de computador. | Suportabilidade (compatibilidade) | **Obrigatório** | Transversal: vale para todo RF do MVP. |
| RNF11 | Os textos devem ter contraste legível (WCAG 2.1 nível AA). | Usabilidade (acessibilidade) | **Obrigatório** | Adição da equipe além do que a Daniela sinalizaria: o enunciado pede para **não** adiar acessibilidade só porque ela é mais difícil para a equipe. |
| RNF-novo | Criptografia dos dados em repouso, minimização e transparência sobre os dados coletados. | Segurança da informação | **Obrigatório (proposto)** | Levantado na [Seção 9.4](../09-priorizacao-de-requisitos/#cp3-privacidade). Ainda **não** é item formal do catálogo; precisa ser validado com a equipe e com a cliente. |

**Resumo da classificação**

| Classificação | Quantidade | RNFs |
|---|:---:|---|
| Obrigatório para o MVP | 6 (+1 proposto) | RNF02, RNF03, RNF04, RNF08, RNF10, RNF11 · *proposto:* RNF-novo |
| Associado a RF do MVP | 3 | RNF01, RNF06, RNF07 |
| Evolutivo | 1 | RNF09 |
| Não aplicável ao MVP | 0 | — |

### 10.2.2 Observações sobre a classificação

- **Nenhum RNF foi classificado como "não aplicável ao MVP".** O único candidato natural
  seria o RNF01, cujos RFs vinculados (RF03, RF14 e RF29) ficaram todos fora do MVP; a
  equipe optou por mantê-lo como *associado*, porque o mesmo princípio de não exposição de
  dado sensível em notificação incide sobre RF21 e RF22, ambos no MVP.
- **Privacidade, LGPD e desempenho do *check-in* não foram adiados.** RNF02, RNF03, RNF04 e
  RNF08 permanecem obrigatórios, seguindo o cuidado já sinalizado pela equipe quanto ao
  tratamento de dado sensível de saúde.
- **Acessibilidade não foi adiada por dificuldade técnica.** O RNF11 recebeu nota 3 de
  lacuna de capacidade na [Seção 9.3.3](../09-priorizacao-de-requisitos/#lacuna-capacidade)
  e, ainda assim, foi mantido como obrigatório.
- **O RNF05 não existe no catálogo.** A sequência do quadro salta de RNF04 para RNF06. A
  lacuna está registrada como achado de consistência 03 na
  [Seção 11.8](../11-rastreabilidade/#achados-consistencia) e não
  representa omissão desta classificação.

## 10.3 Justificativas para a composição do MVP {#justificativas-mvp}

### 10.3.1 Decisão sobre os requisitos de "avaliar viabilidade"

A matriz 4 × 4 orienta, mas não decide sozinha. Dois requisitos de **valor máximo (4)**
caíram no quadrante de **esforço alto (3)** — *avaliar viabilidade* — e exigiram decisão
explícita da equipe, em vez de entrada ou saída automática do MVP.

| RF | Requisito | Decisão | Fundamentação |
|---|---|---|---|
| **RF13** | Recomendar tarefas do dia | **Entra no MVP, sem redução de escopo** | É a promessa central do produto: "me ajuda a organizar o dia respeitando minha energia". Sem o RF13 não existe produto a validar, e o esforço alto é custo inerente ao diferencial. |
| **RF15** | Reajustar recomendação do dia | **Entra no MVP, sem redução de escopo** | Sem realocação em tempo real, o produto se reduz a uma lista de tarefas comum. É o requisito que distingue o MindCycle das ferramentas de produtividade concorrentes. |

**RF11: proteger acesso com PIN.** Já não está no quadrante *avaliar viabilidade*: o esforço
técnico foi recalculado de 3,0 para **1,0** depois que a equipe decidiu reduzir o escopo da
v1 ao **PIN numérico padrão**, em vez do gesto de toques em pétalas (RNF09) que motivava a
nota original. O requisito é indispensável pelo valor legal e de segurança (proteção de dado
de saúde sensível), e com o escopo reduzido entra no MVP a baixo custo. O gesto de pétalas
fica para entrega futura, e o RNF09 é reclassificado como **evolutivo** (10.2.1). Essa é a
única redução de escopo do MVP e ilustra o princípio adotado: o **valor** do requisito
(proteger dado sensível) é preservado integralmente, enquanto a **restrição de design** que
encarecia sua implementação é postergada.

**RF21: sugerir atividades de acolhimento.** Não caiu em *avaliar viabilidade* (esforço
moderado, não alto) e por isso não exigia decisão especial, mas vale registrar por que
entrou: a Dra. Cláudia defendeu com muita força a sugestão de atividade física e exercícios
de respiração como parte do produto, descrevendo-a como parte da "autoajuda" que diferencia
o MindCycle de um gerenciador de tarefas comum. Custo baixo (esforço 2,0) e valor validado
pela cliente: entra no MVP sem redução de escopo. **Escopo da v1:** conteúdo estático, a
mesma sugestão para qualquer usuária na mesma situação. Um mecanismo de reforço progressivo,
que adapte a sugestão ao histórico de comportamento da usuária, é evolução futura, não parte
do MVP.

**RF05: consultar situação atual do ciclo.** Caiu no quadrante *avaliar oportunidade* (valor
2, esforço baixo 1,3), fora das faixas de inclusão automática, mas a equipe decidiu
incluí-lo: o MVP já calcula a fase do ciclo a partir de RF06 e RF07; sem o RF05, esse dado
existe no sistema mas não é exibido à usuária em lugar nenhum, o que esvazia parte do
propósito dos próprios RF06 e RF07. É leitura de um dado que o MVP já produz, a custo quase
nulo. A exclusão anterior fazia sentido apenas enquanto o RF05 dependia do RF08 (também fora
do MVP); deixou de fazer sentido quando RF06 e RF07 passaram a cobrir essa função (10.3.3).

**RF26: recuperar acesso à conta.** Está no quadrante *candidato ao MVP* (valor 3, esforço
1,7) e a equipe decidiu incluí-lo, revertendo a decisão anterior. A justificativa de exclusão
anterior ("um *reset* manual conduzido pela equipe resolve o caso") contradizia o próprio
RNF03 ("os dados... devem ser acessíveis somente pela própria usuária"): se a equipe pode
acessar ou resetar a conta de uma usuária para recuperar seu acesso, o controle de acesso não
é exclusivo dela. Sem o RF26, uma usuária que esquece o PIN do RF11 fica permanentemente
trancada para fora dos próprios dados de saúde, o que é uma falha grave de usabilidade num
produto cujo dado mais sensível está justamente atrás desse PIN. Entra no MVP sem redução de
escopo.

**RF28: consultar funcionamento do ciclo.** Está no quadrante *forte candidato ao MVP*
(valor 3, esforço 1,3) e entra como os demais requisitos desse quadrante. Vale registrar
que sua nota de valor é **hipótese da equipe**: a cliente pediu o requisito, mas ainda não
o pontuou (Seção 9.9). Se a validação baixar a nota para 2, o RF28 passa a *avaliar
oportunidade* e pode sair do MVP sem afetar nenhum outro requisito, pois nenhum depende dele.

### 10.3.2 Coerência da solução mínima e fluxo de valor

Os requisitos selecionados não formam uma lista de itens baratos: formam um **percurso
contínuo**, em que cada etapa produz o insumo da etapa seguinte.

```text
  [1] Cadastro e consentimento
      RF25 Criar conta → RF12 Aceitar termos → RF11 Proteger com PIN
      RF26 Recuperar acesso (contorno se o PIN for esquecido)
                                  ↓
  [2] Calibração do ciclo
      RF06 Registrar início da menstruação → RF07 Informar características do ciclo
      RF05 Consultar situação atual → RF01 Consultar sintomas da fase
      RF09 Receber conteúdo explicativo · RF28 Consultar funcionamento do ciclo
                                  ↓
  [3] Check-in diário
      RF04 Registrar sintomas e disposição → RF02 Sinalizar sobrecarga
                                  ↓
  [4] Lista do dia
      RF13 Recomendar tarefas do dia
      RF17 Cadastrar · RF16 Editar · RF18 Adiar · RF19 Excluir · RF20 Concluir
                                  ↓
  [5] Realocação
      RF15 Reajustar recomendação do dia

  RF21 Sugerir atividades de acolhimento e RF22 Receber mensagens de acolhimento
  atravessam todas as cinco etapas

  RF36 Excluir conta e dados é um fluxo de saída, à parte do percurso principal,
  disponível a qualquer momento nas configurações da conta
```

O valor entregue pelo MVP pode ser enunciado em uma frase verificável: **a usuária cria uma
conta protegida, entende seu ciclo, registra como está se sentindo hoje, recebe uma lista de
tarefas coerente com essa disposição e vê essa lista se reorganizar quando sinaliza
sobrecarga, tudo isso em linguagem acolhedora, sem cobrança.** Essa é exatamente a hipótese
central do produto, e é o que o MVP se propõe a colocar em teste.

O **laço mínimo de valor** dentro desse percurso é a tríade cadastrar (RF17) → concluir
(RF20) → reajustar (RF15), complementada por editar (RF16) e adiar (RF18). Se qualquer um
desses cinco requisitos for retirado, o MVP deixa de ser exercitável de ponta a ponta.

### 10.3.3 Tratamento de dependências técnicas e de fluxo

A seleção foi verificada quanto a dependências, para que nenhum requisito incluído dependa
de requisito excluído:

| Requisito no MVP | Depende de | Situação |
|---|---|---|
| Todos os RFs | RF25 Criar conta | ✅ Incluído — pré-requisito estrutural |
| Qualquer coleta de dado | RF12 Aceitar termos de uso | ✅ Incluído — pré-condição legal (RNF02) |
| RF02 Sinalizar sobrecarga | RF04 (registro do estado) | ✅ Incluído — o RF01 é conteúdo de leitura e não é dependência do RF02 (Seção 9.8.1) |
| RF01 Consultar sintomas comuns da fase | Cálculo da fase (RF06 + RF07) | ✅ Ambos incluídos |
| RF09 Recomendar conteúdos sobre o ciclo | Cálculo da fase (RF06 + RF07) e RF04 (sintomas registrados) | ✅ Todos incluídos |
| RF13 Recomendar tarefas do dia | RF04 (disposição) e RF17 (tarefas com energia necessária, prazo e prioridade) | ✅ Ambos incluídos |
| RF15 Reajustar recomendação | RF04, RF02 e RF13 | ✅ Todos incluídos |
| RF16, RF18, RF19, RF20 | RF17 Cadastrar tarefa | ✅ Incluído |
| RF11 Proteger acesso com PIN | RF25 Criar conta | ✅ Incluído |
| RF26 Recuperar acesso à conta | RF11 Proteger acesso com PIN (RF26 é o caminho de contorno do PIN esquecido) | ✅ Incluído |
| RF36 Excluir conta e dados | RF25 Criar conta | ✅ Incluído |
| RF05 Consultar situação atual do ciclo | RF06 + RF07 (fase do ciclo calculada) | ✅ Todos incluídos |
| Cálculo da fase do ciclo | RF06 (data de início) **+** RF07 (duração média do ciclo) | ✅ Ambos incluídos — RF06 isolado não basta: sem a duração média do RF07, não há como saber em que fase a usuária está. A alternativa RF08 (estimar por sintomas) ficou fora, por esforço maior (2,7 contra 1,3 de cada um de RF06/RF07) |

Três observações sobre dependências resolvidas por escolha de rota:

- **RF05 depende do cálculo de fase (RF06 + RF07), não do RF08.** O RF05 (consultar situação
  atual do ciclo) lê o dado de fase calculado. Na proposta anterior, esse cálculo vinha do
  RF08 (fora do MVP), o que levava o RF05 a sair por consequência. Com RF06 e RF07 cobrindo o
  cálculo de fase dentro do MVP, o RF05 passa a ter dado para exibir a custo quase nulo
  (esforço 1,3) e foi incluído (10.3.1).
- **RF23 dependia do RF24.** A retrospectiva mensal se alimenta do registro de atividades de
  acolhimento. Os dois requisitos da CP6 saem em conjunto, preservando a consistência do
  recorte.
- **RF31 e RF32 dependem de um relatório mensal que nenhum RF gera.** A lacuna está
  registrada na [Seção 8](../08-requisitos-de-software/#cp6) e os dois saem com o restante
  da CP6.

**Decisões de corte registradas — RF35 e RF29.** São os dois requisitos do quadrante
*candidato ao MVP* que ficaram fora.

- **RF35 (Exportar relatório de sintomas)** é o que ficou fora por menor margem: valor 3,
  validado com entusiasmo pela cliente, e esforço 2,3. Saiu porque **(i)** não ataca a
  sobrecarga executiva diretamente (10.3.4) e **(ii)** não é pré-requisito de nenhum outro
  requisito do fluxo mínimo. Está encaminhado como primeiro item da entrega seguinte.
- **RF29 (Gerenciar notificações)** não tem objeto no MVP. Nenhum requisito do MVP emite
  notificação do sistema (RF03 e RF14 estão fora), e as mensagens e sugestões de acolhimento
  (RF22 e RF21) aparecem só dentro do aplicativo. Assim, o RNF01 é atendido por padrão, já
  que nenhuma informação de ciclo, sintoma ou disposição é exibida fora do app. O RF29 entra
  junto com o primeiro requisito que emitir notificação.

### 10.3.4 Motivos de exclusão, por natureza do requisito

Os catorze requisitos fora do MVP se distribuem em cinco naturezas, nenhuma delas essencial
à hipótese central do produto:

| Natureza | Requisitos | Por que é adiável |
|---|---|---|
| **Conveniência de visualização** | RF03, RF10, RF14, RF27 | Apresentam ou lembram informação que o MVP já produz ou já permite obter por outro caminho. |
| **Refinamento e valor de médio prazo** | RF08, RF23, RF24, RF31, RF33 | Aumentam precisão, bem-estar, personalização ou retenção sobre um produto que precisa, antes, existir e ser exercitado. |
| **Funcionalidade nova, fora do núcleo** | RF32, RF35 | Boa relação valor/esforço no caso do RF35, bem recebido pela cliente, mas não atacam a sobrecarga executiva diretamente: são complementares ao problema central, não parte dele. |
| **Coleta de dado sensível sem uso no MVP** | RF30, RF34 | Acrescentariam dado de saúde que nenhum requisito do MVP usa; adiá-los segue a minimização proposta no RNF-novo (10.2.1). |
| **Preferência sem objeto no MVP** | RF29 | Configura notificações que o MVP não emite (10.3.3). |

O caso da **CP6 (Reconhecimento de ritmo sustentável)** merece registro próprio: é a única
característica sem nenhum requisito no MVP. A razão é temporal, não de valor — na primeira
versão a usuária mal terá um mês de dados registrados, e a retrospectiva teria pouco a
mostrar. RF23, RF24, RF31 e RF32 ganham valor quando já existirem histórico e retenção, o que
os torna material adequado para a v2.

## 10.4 Evidência da validação com a cliente

A reunião de 05/10/2026 validou o **valor de negócio de RFs individuais** (Seção 9.8), não
o MVP consolidado como um todo. A validação do **MVP consolidado**, isto é, da lista fechada
de 22 requisitos e das classificações de RNF desta Seção 10, é uma etapa posterior e
separada, já combinada com a cliente.

### 10.4.1 Registro da situação

| Item | Registro |
|---|---|
| **Quem participou (avaliação de RFs)** | Pela equipe: Ana Luisa, Arthur Palhares, Luana, Tiago e Pedro Ian. Pela cliente: Dra. Cláudia Araújo Bottino (ginecologista). |
| **Quando ocorreu** | 05/10/2026, avaliação de RFs individuais, não do MVP consolidado. |
| **MVP consolidado (Seção 10.1)** | Ainda não apresentado à cliente; é o resultado da análise de quadrantes feita depois da reunião. |
| **RNFs aplicáveis (Seção 10.2)** | Classificação da equipe, não discutida diretamente com a cliente (fora do escopo clínico da conversa). |
| **O que ficou para depois** | RF35 e os demais requisitos fora do MVP (Seção 10.1.2); o gesto de pétalas do RNF09; os temas fora de escopo registrados em 9.8.2. RF05, RF26 e RF36 foram incluídos por revisão técnica da equipe, e RF28 pela reavaliação dos requisitos acrescentados ao catálogo, ambas em 12/10/2026, sem contato direto com a cliente sobre essas inclusões. |
| **Próxima validação prevista** | Reunião de acompanhamento com a Dra. Cláudia em cerca de 4 semanas (final de outubro ou início de novembro de 2026), depois de fechar a lista com o professor e a monitoria, para validar o MVP consolidado. |

> **Declaração de transparência.** A equipe registra com precisão o que foi e o que não foi
> validado. Catorze dos 36 RFs têm nota de valor de negócio confirmada pela cliente, com
> justificativa real, na [Seção 9.8](../09-priorizacao-de-requisitos/#roteiro-validacao). Os
> demais seguem como *hipótese da equipe*. Nenhuma nota desta seção foi apresentada como
> validada sem efetivamente ter sido.

### 10.4.2 Critérios adotados pela equipe para as notas ainda em hipótese

Para os 22 RFs que permanecem em hipótese e para o MVP consolidado como um todo, a equipe
adotou cinco medidas para que as decisões de escopo permanecessem auditáveis e reversíveis
até a próxima validação:

1. **Congelamento prévio dos critérios.** Os cinco critérios de valor de negócio e as três
   sub-escalas de esforço técnico foram fixados **antes** de qualquer nota ser atribuída
   ([Seções 9.2 e 9.3](../09-priorizacao-de-requisitos/#criterios-valor-negocio)).
   Assim, nenhuma nota pôde ser ajustada depois para empurrar um requisito ao quadrante
   desejado, e cada nota é contestável pela cliente contra um critério explícito, não contra
   uma preferência da equipe.
2. **Justificativa individual e rastreável por requisito.** Cada um dos 36 RFs tem
   justificativa registrada de valor **e** de esforço. Na próxima validação, a cliente
   discutirá argumentos nomeados, não rótulos MoSCoW isolados, o que torna a revisão das
   notas um trabalho de conferência, e não de reconstrução.
3. **Separação entre o que depende e o que não depende da cliente.** A avaliação de **esforço
   técnico** (Seção 9.5) é atribuição exclusiva da equipe e não depende de contato externo.
   Apenas a dimensão de **valor de negócio** tem RFs em hipótese. Metade da matriz, portanto,
   é dado consolidado desde o início.
4. **Ancoragem em requisitos não negociáveis.** Nos casos em que a decisão não é de
   preferência, mas de obrigação, a equipe decidiu pela via mais conservadora,
   independentemente da confirmação da cliente: LGPD (RNF02), controle de acesso ao dado
   sensível (RNF03) e acessibilidade (RNF11) foram mantidos como **obrigatórios**, e o RF11,
   o RF12 e o RF36 permaneceram *Must have*. O RF36 (excluir conta e dados) é um exemplo
   direto deste princípio: nenhum RF correspondente existia no catálogo original, mas o art.
   18 da LGPD o torna obrigatório, com ou sem confirmação da cliente. Dado de saúde é
   exigência legal e ética antes de ser escolha de escopo.
5. **Preferência por reduzir escopo em vez de excluir valor.** Diante de requisito de alto
   valor e alto esforço, a equipe optou por reduzir o escopo preservando o valor: caso do
   RF11, que entra com PIN numérico e postergação do gesto de pétalas (10.3.1), em lugar de
   excluir o requisito. Uma correção posterior da cliente sobre o *como* é barata; a exclusão
   de um requisito legalmente obrigatório não seria.

### 10.4.3 Encaminhamentos e condição de fechamento

Duas ações das versões anteriores foram concluídas e saíram da lista: a formalização dos
requisitos novos no catálogo (RF35 e RF36, [Seção 8](../08-requisitos-de-software/)) e o
alinhamento das Seções 2.2 e 2.3 à Matriz v1.0 (achado 07 da
[Seção 11.8](../11-rastreabilidade/#achados-consistencia)).

| # | Ação | Responsável | Prazo |
|:--:|---|---|---|
| 1 | Fechar a lista de RFs do MVP (Seção 10.1) com o professor e a monitoria | Analistas de Requisitos | Antes do fechamento da Release 2 (13/10/2026) |
| 2 | Confirmar com a cliente, no Planejamento da Iteração 5, a prioridade das histórias da iteração que seguem em hipótese (RF25, RF12, RF11, RF26, RF36, RF05 e RF01), exigida pelo item 2 do [DoR](../12-dor-e-dod/); a história não confirmada entra com NÃO justificado no Quadro 12.1 | Analistas de Requisitos | Planejamento da Iteração 5 (13/10/2026) |
| 3 | Atualizar o backlog no Notion com a alocação da Seção 10.1.3 (US05, US07, US09, US21, US26 e US28 passam para as Iterações 5 e 6) e criar as histórias US35 e US36 | Analistas de Requisitos | Planejamento da Iteração 5 (13/10/2026) |
| 4 | Submeter o **RNF-novo** (criptografia, minimização e transparência) à validação conjunta da equipe e da cliente, para incorporação formal ao catálogo | Analistas de Requisitos | Junto à ação 5 |
| 5 | Agendar e realizar a reunião de acompanhamento com a Dra. Cláudia Araújo Bottino para validar o MVP consolidado, incluindo as notas em hipótese dos RFs acrescentados ao catálogo (RF28 a RF34 e RF36), em especial a do RF28, que entrou no MVP sem nota validada | Analistas de Requisitos | ~4 semanas após 05/10/2026 |
| 6 | Atualizar as Seções 9.4, 9.8 e 10.4.1 com as notas efetivamente validadas na reunião de acompanhamento, registrando as divergências em relação à hipótese | Analistas de Requisitos | Imediatamente após a reunião |

Esta seção somente será considerada **fechada** quando a ação 5 for concluída e o MVP
consolidado desta Seção 10 estiver validado pela cliente, não apenas os RFs individuais.
