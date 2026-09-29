---
title: "10. Definição e Composição do MVP"
numero: "10"
weight: 10
resumo: "Requisitos funcionais selecionados para o MVP, classificação dos requisitos não funcionais aplicáveis, justificativas da composição e registro da validação com a cliente."
---

> **Fonte e status desta seção.** A composição do MVP deriva diretamente da matriz 4 × 4 da
> [Seção 9.7](../09-priorizacao-de-requisitos/#matriz-4x4).
> A numeração **RF01–RF27** e **RNF01–RNF11** segue a **Matriz de Rastreabilidade de
> Requisitos v1.0** (quadro *MindCycle – Figma*, extração de 28/09/2026), fonte oficial de
> requisitos do projeto.
>
> **Versão:** 0.2 · **Data:** 28/09/2026 · **Status:** MVP proposto pela equipe, **pendente
> de validação formal com a cliente** (ver Seção 10.4).

## 10.1 Requisitos funcionais selecionados para o MVP

O MVP é composto por **15 dos 27 requisitos funcionais** do catálogo. A seleção combina
dois critérios: (i) o posicionamento do requisito nos quadrantes de prioridade da matriz
4 × 4 e (ii) a formação de um **fluxo de uso coerente e completo**, capaz de ser exercitado
de ponta a ponta por uma usuária real.

### 10.1.1 Requisitos incluídos

| # | RF | Requisito | CP | OE | Valor | Esforço | Quadrante de origem | Papel no MVP |
|:--:|---|---|---|:--:|:---:|:---:|---|---|
| 1 | RF25 | Criar conta | CP7 | OE3 | 4 | 1,3 | Prioridade máxima | Pré-requisito estrutural de todo o produto |
| 2 | RF12 | Aceitar termos de uso | CP3 | OE1 | 4 | 1,0 | Prioridade máxima | Pré-condição legal (LGPD) para coletar qualquer dado |
| 3 | RF11 | Proteger acesso com PIN | CP3 | OE1 | 4 | 3,0 | Avaliar viabilidade | Proteção do dado sensível de saúde — **escopo reduzido** (ver 10.3.1) |
| 4 | RF06 | Registrar início da menstruação | CP2 | OE1 | 3 | 1,3 | Forte candidato | Dado objetivo que calibra a fase do ciclo |
| 5 | RF01 | Consultar sintomas comuns da fase | CP1 | OE1 | 3 | 1,3 | Forte candidato | Base de leitura que habilita a sinalização do RF02 |
| 6 | RF04 | Registrar sintomas e disposição | CP1 | OE1 | 4 | 2,0 | Forte candidato | *Check-in* diário; dado-fonte de RF02, RF13 e RF15 |
| 7 | RF02 | Sinalizar sobrecarga | CP1 | OE1 | 4 | 2,0 | Forte candidato | Resposta imediata à sobrecarga, a qualquer momento do dia |
| 8 | RF13 | Recomendar tarefas do dia | CP4 | OE2 | 4 | 2,7 | Avaliar viabilidade | Promessa central do produto |
| 9 | RF17 | Cadastrar tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Laço mínimo de valor |
| 10 | RF16 | Editar tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Correção de erro de cadastro |
| 11 | RF18 | Adiar tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Identidade do produto: adiar sem culpa |
| 12 | RF19 | Excluir tarefa | CP5 | OE3 | 3 | 1,0 | Forte candidato | Fecha o CRUD de tarefas a custo nulo |
| 13 | RF20 | Concluir tarefa | CP5 | OE3 | 4 | 1,0 | Prioridade máxima | Fecha o laço mínimo de valor |
| 14 | RF15 | Reajustar recomendação do dia | CP5 | OE3 | 4 | 2,7 | Avaliar viabilidade | Diferencial central: realocação por disposição |
| 15 | RF22 | Receber mensagens de acolhimento | CP5 | OE3 | 3 | 1,3 | Forte candidato | Tom acolhedor que atravessa todo o percurso |

**Cobertura do MVP por característica e objetivo**

| CP | Característica | OE | RFs no MVP | RFs fora | Cobertura |
|---|---|:--:|---|---|:--:|
| CP1 | Registro e análise de sintomas e disposição | OE1 | RF01, RF02, RF04 | RF03 | 3/4 |
| CP2 | Acompanhamento do ciclo menstrual | OE1 | RF06 | RF05, RF07, RF08, RF09 | 1/5 |
| CP3 | Privacidade dos dados da usuária | OE1 | RF11, RF12 | RF10 | 2/3 |
| CP4 | Planejamento adaptativo das tarefas | OE2 | RF13 | RF14 | 1/2 |
| CP5 | Gestão acolhedora da carga diária | OE3 | RF15, RF16, RF17, RF18, RF19, RF20, RF22 | RF21 | 7/8 |
| CP6 | Reconhecimento de ritmo sustentável | OE3 | — | RF23, RF24 | 0/2 |
| CP7 | Conta e preferências da usuária | OE3 | RF25 | RF26, RF27 | 1/3 |

As sete características de produto estão representadas no MVP, **à exceção da CP6**
(Reconhecimento de ritmo sustentável), cuja natureza retrospectiva a torna inaplicável em
uma primeira versão — justificativa em 10.3.4.

### 10.1.2 Requisitos excluídos do MVP

| RF | Requisito | CP | Valor | Esforço | Motivo da exclusão |
|---|---|---|:---:|:---:|---|
| RF03 | Receber lembrete de registro | CP1 | 2 | 2,0 | Melhora a adesão ao registro, mas o fluxo funciona sem lembrete. |
| RF05 | Consultar situação atual do ciclo | CP2 | 2 | 1,3 | Consulta pontual e complementar ao RF10, que também ficou fora. |
| RF07 | Informar características do ciclo | CP2 | 2 | 1,3 | Configuração pontual; refina a precisão, não bloqueia o uso. |
| RF08 | Estimar fase do ciclo por sintomas | CP2 | 2 | 2,7 | Refinamento, não base do cálculo — o RF06 cobre a função no MVP a custo muito menor. |
| RF09 | Recomendar conteúdos sobre o ciclo | CP2 | 1 | 1,3 | Conteúdo informativo; não ataca a sobrecarga diretamente. |
| RF10 | Visualizar calendário do ciclo | CP3 | 2 | 2,0 | Visualização de apoio, não crítica ao fluxo diário. |
| RF14 | Receber resumo do dia | CP4 | 2 | 1,3 | Conveniência de visualização; o plano já existe via RF13. |
| RF21 | Sugerir atividades de acolhimento | CP5 | 2 | 2,0 | Dispensável enquanto o tom acolhedor for sustentado pelo RF22 e pela interface. |
| RF23 | Gerar retrospectiva mensal | CP6 | 2 | 2,0 | Valor de médio prazo; depende de histórico que o MVP ainda não produz. |
| RF24 | Registrar atividade de acolhimento | CP6 | 2 | 1,0 | Alimenta o RF23; sai junto com ele. |
| RF26 | Recuperar acesso à conta | CP7 | 3 | 1,7 | **Ficou fora por pouco** — ver a decisão registrada em 10.3.3. |
| RF27 | Conhecer a proposta do sistema | CP7 | 2 | 1,3 | *Onboarding*; ajuda a adesão, mas não bloqueia o uso. |

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
| RNF01 | As notificações não devem exibir informações sobre ciclo, sintomas ou disposição sem autorização da usuária. | Segurança da informação | **Associado a RF do MVP** | Os RFs originalmente citados (RF03 e RF14) ficaram fora do MVP, mas o princípio vale para o RF22, que está no MVP. |
| RNF02 | O tratamento dos dados deve atender à LGPD (Lei nº 13.709/2018), considerando dados de saúde como dados pessoais sensíveis. | Externo (Legislativo) | **Obrigatório** | Aplica-se a RF04, RF06 e RF12 — todos no MVP. |
| RNF03 | Os dados de ciclo, sintomas, disposição e tarefas devem ser acessíveis somente pela própria usuária. | Segurança da informação | **Obrigatório** | Aplica-se a RF04, RF06 e RF11 — todos no MVP. |
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
  seria o RNF01, cujos RFs citados no quadro (RF03 e RF14) ficaram ambos fora do MVP; a
  equipe optou por mantê-lo como *associado*, porque o mesmo princípio de não exposição de
  dado sensível em notificação incide sobre o RF22, que está no MVP.
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

A matriz 4 × 4 orienta, mas não decide sozinha. Três requisitos de **valor máximo (4)**
caíram no quadrante de **esforço alto (3)** — *avaliar viabilidade* — e exigiram decisão
explícita da equipe, em vez de entrada ou saída automática do MVP.

| RF | Requisito | Decisão | Fundamentação |
|---|---|---|---|
| **RF13** | Recomendar tarefas do dia | **Entra no MVP, sem redução de escopo** | É a promessa central do produto: "me ajuda a organizar o dia respeitando minha energia". Sem o RF13 não existe produto a validar, e o esforço alto é custo inerente ao diferencial. |
| **RF15** | Reajustar recomendação do dia | **Entra no MVP, sem redução de escopo** | Sem realocação em tempo real, o produto se reduz a uma lista de tarefas comum. É o requisito que distingue o MindCycle das ferramentas de produtividade concorrentes. |
| **RF11** | Proteger acesso com PIN | **Entra no MVP, com escopo reduzido** | Indispensável pelo valor legal e de segurança. Contudo, o esforço alto **não** vem da proteção em si, e sim de um detalhe de design: o gesto de toques em pétalas (RNF09), que a equipe ainda não domina. Na v1 implementa-se **PIN numérico padrão**; o gesto de pétalas fica para entrega futura, e o RNF09 é reclassificado como **evolutivo**. |

A decisão sobre o RF11 é a única redução de escopo do MVP e ilustra o princípio adotado: o
**valor** do requisito (proteger dado sensível) é preservado integralmente, enquanto a
**restrição de design** que encarece sua implementação é postergada.

### 10.3.2 Coerência da solução mínima e fluxo de valor

Os requisitos selecionados não formam uma lista de itens baratos: formam um **percurso
contínuo**, em que cada etapa produz o insumo da etapa seguinte.

```text
  [1] Cadastro e consentimento
      RF25 Criar conta → RF12 Aceitar termos → RF11 Proteger com PIN
                                  ↓
  [2] Calibração do ciclo
      RF06 Registrar início da menstruação → RF01 Consultar sintomas da fase
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

  RF22 Receber mensagens de acolhimento — atravessa todas as cinco etapas
```

O valor entregue pelo MVP pode ser enunciado em uma frase verificável: **a usuária cria uma
conta protegida, informa onde está no ciclo, registra como está se sentindo hoje, recebe uma
lista de tarefas coerente com essa disposição e vê essa lista se reorganizar quando sinaliza
sobrecarga — tudo isso em linguagem acolhedora, sem cobrança.** Essa é exatamente a hipótese
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
| RF02 Sinalizar sobrecarga | RF01 e RF04 (registro do estado) | ✅ Ambos incluídos |
| RF13 Recomendar tarefas do dia | RF04 (disposição) e RF17 (tarefas existentes) | ✅ Ambos incluídos |
| RF15 Reajustar recomendação | RF04, RF02 e RF13 | ✅ Todos incluídos |
| RF16, RF18, RF19, RF20 | RF17 Cadastrar tarefa | ✅ Incluído |
| RF11 Proteger acesso com PIN | RF25 Criar conta | ✅ Incluído |
| Cálculo da fase do ciclo | RF06 **ou** RF08 | ✅ RF06 incluído — resolve a dependência pela via de menor esforço (1,3 contra 2,7) |

Duas observações sobre dependências resolvidas por escolha de rota:

- **RF05 dependia do RF08.** O RF05 (consultar situação atual do ciclo) lê um dado calculado
  pelo RF08. Como o RF08 ficou fora do MVP em favor do RF06, o RF05 sairia por consequência —
  o que é coerente com sua nota de valor 2.
- **RF23 dependia do RF24.** A retrospectiva mensal se alimenta do registro de atividades de
  acolhimento. Os dois requisitos da CP6 saem em conjunto, preservando a consistência do
  recorte.

**Decisão de corte registrada — RF26 (Recuperar acesso à conta).** É o requisito que ficou
fora por menor margem: valor 3 (*Should have*) e esforço baixo (1,7), posicionado no
quadrante *candidato ao MVP*. A equipe reconhece que "dado de saúde trancado é sério" e que o
requisito quase se tornou *Must have*. Ficou de fora porque **(i)** é contornável em um MVP
de validação, no qual um *reset* manual conduzido pela equipe resolve o caso, e **(ii)** não
é pré-requisito de nenhum outro requisito do fluxo mínimo. Está encaminhado como primeiro
item da *release* seguinte.

### 10.3.4 Motivos de exclusão, por natureza do requisito

Os doze requisitos fora do MVP se distribuem em três naturezas, nenhuma delas essencial à
hipótese central do produto:

| Natureza | Requisitos | Por que é adiável |
|---|---|---|
| **Conteúdo informativo** | RF09 | Informa sobre o ciclo, mas não atua sobre a sobrecarga executiva — que é o problema raiz. |
| **Conveniência de visualização** | RF03, RF05, RF10, RF14, RF27 | Apresentam ou lembram informação que o MVP já produz ou já permite obter por outro caminho. |
| **Refinamento e valor de médio prazo** | RF07, RF08, RF21, RF23, RF24, RF26 | Aumentam precisão, bem-estar ou retenção sobre um produto que precisa, antes, existir e ser exercitado. |

O caso da **CP6 (Reconhecimento de ritmo sustentável)** merece registro próprio: é a única
característica sem nenhum requisito no MVP. A razão é temporal, não de valor — na primeira
versão a usuária mal terá um mês de dados registrados, e a retrospectiva teria pouco a
mostrar. O RF23 e o RF24 ganham valor quando já existirem histórico e retenção, o que os
torna material adequado para a v2.

## 10.4 Evidência da validação do MVP com a cliente

### 10.4.1 Registro da situação

| Item | Registro |
|---|---|
| **Quem participou** | Ninguém. O contato com a **Dra. Cláudia Araújo Bottino** (ginecologista consultada pela equipe) não foi confirmado a tempo desta entrega. |
| **Quando ocorreu** | Não ocorreu. Tentativas de contato até **28–29/09/2026**, sem retorno. |
| **RFs aprovados** | Nenhum aprovado formalmente. A lista de 15 requisitos da Seção 10.1 é **proposta da equipe**. |
| **RNFs aplicáveis** | A classificação da Seção 10.2 é **proposta da equipe**, pendente de confirmação. |
| **O que ficou para depois** | O RF26 e os demais requisitos fora do MVP (Seção 10.1.2); o gesto de pétalas do RNF09. |
| **Ajustes pedidos / divergências** | Não aplicável ainda — não houve interlocução a registrar. |
| **Artefatos preparados e não aplicados** | Roteiro de validação por característica de produto, registrado na [Seção 9.8.1](../09-priorizacao-de-requisitos/#roteiro-validacao). |

> **Declaração de transparência.** A equipe optou por **registrar a ausência da validação em
> vez de fabricar uma ata**. Nenhum participante, data ou aprovação apresentado nesta seção é
> presumido: onde a validação não ocorreu, está escrito que não ocorreu. As notas de valor de
> negócio da [Seção 9.4](../09-priorizacao-de-requisitos/#avaliacao-valor-negocio)
> e as respostas do roteiro da Seção 9.8.1 estão explicitamente marcadas como *hipótese da
> equipe* e *imaginado pela equipe — não confirmado*.

### 10.4.2 Critérios adotados pela equipe para mitigar a ausência da validação

Sem a interlocução com a cliente, a equipe adotou cinco medidas para que as decisões de
escopo permanecessem auditáveis e reversíveis:

1. **Congelamento prévio dos critérios.** Os cinco critérios de valor de negócio e as três
   sub-escalas de esforço técnico foram fixados **antes** de qualquer nota ser atribuída
   ([Seções 9.2 e 9.3](../09-priorizacao-de-requisitos/#criterios-valor-negocio)).
   Assim, nenhuma nota pôde ser ajustada depois para empurrar um requisito ao quadrante
   desejado, e cada nota é contestável pela cliente contra um critério explícito, não contra
   uma preferência da equipe.
2. **Justificativa individual e rastreável por requisito.** Cada um dos 27 RFs tem
   justificativa registrada de valor **e** de esforço. Quando a validação ocorrer, a cliente
   discutirá argumentos nomeados — e não rótulos MoSCoW isolados —, o que torna a revisão das
   notas um trabalho de conferência, e não de reconstrução.
3. **Separação entre o que depende e o que não depende da cliente.** A avaliação de **esforço
   técnico** (Seção 9.5) é atribuição exclusiva da equipe e não foi afetada pela ausência de
   contato. Apenas a dimensão de **valor de negócio** está em hipótese. Metade da matriz,
   portanto, é dado consolidado.
4. **Ancoragem em requisitos não negociáveis.** Nos casos em que a decisão não é de
   preferência, mas de obrigação, a equipe decidiu pela via mais conservadora,
   independentemente da confirmação da cliente: LGPD (RNF02), controle de acesso ao dado
   sensível (RNF03) e acessibilidade (RNF11) foram mantidos como **obrigatórios**, e o RF11 e
   o RF12 permaneceram *Must have*. Dado de saúde é exigência legal e ética antes de ser
   escolha de escopo.
5. **Preferência por reduzir escopo em vez de excluir valor.** Diante de requisito de alto
   valor e alto esforço, a equipe optou por reduzir o escopo preservando o valor — caso do
   RF11, que entra com PIN numérico e postergação do gesto de pétalas (10.3.1) — em lugar de
   excluir o requisito. Uma correção posterior da cliente sobre o *como* é barata; a exclusão
   de um requisito legalmente obrigatório não seria.

### 10.4.3 Encaminhamentos e condição de fechamento

| # | Ação | Responsável | Prazo |
|:--:|---|---|---|
| 1 | Agendar e realizar a entrevista de validação com a Dra. Cláudia Araújo Bottino, ou com outra representante indicada pelo LabLivre, aplicando o roteiro da Seção 9.8.1 | Analistas de Requisitos | Antes do fechamento da Release 2 (13/10/2026) |
| 2 | Atualizar as Seções 9.4, 9.8.2 e 10.4.1 com as notas efetivamente validadas, registrando as divergências em relação à hipótese | Analistas de Requisitos | Imediatamente após a entrevista |
| 3 | Submeter o **RNF-novo** (criptografia, minimização e transparência) à validação conjunta da equipe e da cliente, para incorporação formal ao catálogo | Analistas de Requisitos | Junto à ação 1 |
| 4 | Sinalizar formalmente a pendência ao professor e à monitoria da disciplina | Gerência de Projeto | Na entrega desta *release* |
| 5 | Alinhar a numeração de requisitos da [Seção 8](../08-requisitos-de-software/) à da Matriz de Rastreabilidade v1.0, encerrando os achados 07 e 08 da [Seção 11.8](../11-rastreabilidade/#achados-consistencia) | Analistas de Requisitos | Antes do fechamento da Release 2 |

Esta seção somente será considerada **fechada** quando a ação 1 for concluída e a
Seção 10.4.1 deixar de conter registros de não ocorrência.
