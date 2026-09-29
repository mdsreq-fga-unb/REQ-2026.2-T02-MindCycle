---
title: "11. Rastreabilidade dos Requisitos"
numero: "11"
weight: 11
resumo: "Matriz de rastreabilidade do MindCycle: do problema raiz aos objetivos, características e requisitos, com os elos forward e backward, o catálogo de RNFs e os achados de consistência."
---

> **Fonte desta seção.** **Matriz de Rastreabilidade de Requisitos v1.0**, extraída do quadro
> *MindCycle – Figma* em **28/09/2026**. Cliente: **LabLivre · FCTE/UnB**. Este documento é a
> fonte oficial de requisitos do projeto, e sua numeração **RF01–RF27** / **RNF01–RNF11**
> ainda diverge da publicada na [Seção 8](../08-requisitos-de-software/) — pendência
> registrada nos achados 07 e 08 da Seção 11.6.

## 11.1 Introdução

A rastreabilidade de requisitos é a propriedade que permite acompanhar a vida de um requisito
em ambos os sentidos: **para trás**, até a necessidade que o originou, e **para frente**, até
os artefatos que o realizam e o verificam. No MindCycle, ela cumpre três funções concretas:

1. **Justificar a existência de cada requisito.** Todo requisito funcional do produto deve ser
   redutível a uma cadeia explícita **Problema → Objetivo Específico → Característica de
   Produto → Requisito**. Um requisito que não fecha essa cadeia é escopo sem justificativa, e
   a matriz o expõe.
2. **Sustentar as decisões de priorização e de MVP.** Os critérios de valor de negócio
   aplicados na [Seção 9](../09-priorizacao-de-requisitos/) — em particular "contribuição para
   o objetivo específico" e "dependência estrutural" — só são verificáveis sobre uma estrutura
   de rastreabilidade estabelecida. A composição do MVP da
   [Seção 10](../10-mvp/) é, na prática, um corte sobre esta matriz.
3. **Medir o impacto de mudanças.** Quando um requisito muda ou é removido, a matriz responde
   quais requisitos não funcionais deixam de ter alvo, qual característica perde cobertura e
   qual objetivo específico fica descoberto.

Além disso, o exercício de construção desta matriz teve um resultado próprio: a confrontação
sistemática entre as duas fontes de vínculo do quadro — a **seta desenhada** e a **lista escrita
no campo "RFs:"** de cada card de RNF — revelou **doze inconsistências** no material de origem,
registradas na Seção 11.6. Essas inconsistências não seriam visíveis sem a rastreabilidade
formalizada.

### 11.1.1 Dimensão do escopo rastreado

| Nível | Quantidade | Identificadores |
|---|:---:|---|
| Problema | 1 | Sobrecarga Executiva |
| Objetivos específicos | 3 | OE1 – OE3 |
| Características de produto | 7 | CP1 – CP7 |
| Requisitos funcionais | 27 | RF01 – RF27 — 26 com card no quadro e 1 apenas citado (RF04) |
| Requisitos não funcionais | 10 | RNF01 – RNF11, **sem RNF05** · 2 deles transversais (RNF10, RNF11) |

### 11.1.2 Notação adotada

O vínculo entre requisito não funcional e requisito funcional é registrado com a fonte de
evidência que o sustenta:

| Símbolo | Significado |
|:---:|---|
| **●** | Há **seta no quadro** *e* o RF é citado no campo "RFs:" do card do RNF — vínculo concordante. |
| **○** | O RF é citado no campo "RFs:", mas **não há seta** no quadro. |
| **◇** | Há **seta no quadro**, mas o RF **não** é citado no campo "RFs:" — **divergência**. |
| **▪** | Vínculo **transversal** — o card declara "RFs: todos". |
| **—** | Nenhum RNF específico; o RF é coberto apenas pelos transversais. |

Quando as duas fontes divergem, este documento **apresenta ambas** em vez de escolher uma, e
registra a divergência como achado de consistência.

## 11.2 Fluxo de rastreabilidade

Estrutura lida a partir das setas do quadro. Cada característica indica a quantidade de
requisitos funcionais que agrega e de requisitos não funcionais específicos vinculados a eles.

```text
                             PROBLEMA · Sobrecarga Executiva
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
      OE1                               OE2                               OE3
  Melhorar a percepção          Reduzir a sobrecarga            Reduzir a sobrecarga
  dos sintomas durante          executiva causada pelo          executiva na execução
  todo o ciclo menstrual.       planejamento de tarefas         das tarefas diárias,
                                que desconsidera a fase         ajustando-as à disposição
                                do ciclo menstrual.             real da usuária.
        │                                 │                                 │
  ┌─────┼─────┐                           │                 ┌───────────────┼───────────────┐
  │     │     │                           │                 │               │               │
 CP1   CP2   CP3                         CP4               CP5             CP6             CP7
 4 RF  5 RF  3 RF                       2 RF              8 RF            2 RF            3 RF
 5 RNF 3 RNF 3 RNF                      2 RNF             1 RNF           0 RNF           0 RNF

              RNF10 · RNF11 — transversais, valem para todos os 27 RFs
              (no quadro estão ligadas apenas à CP5 — ver achado 04)
```

| CP | Característica | OE | RF | RNF específicos |
|---|---|:--:|:--:|:--:|
| CP1 | Registro e análise de sintomas e disposição | OE1 | 4 | 5 |
| CP2 | Acompanhamento do ciclo menstrual | OE1 | 5 | 3 |
| CP3 | Privacidade dos dados da usuária | OE1 | 3 | 3 |
| CP4 | Planejamento adaptativo das tarefas | OE2 | 2 | 2 |
| CP5 | Gestão acolhedora da carga diária | OE3 | 8 | 1 |
| CP6 | Reconhecimento de ritmo sustentável | OE3 | 2 | 0 |
| CP7 | Conta e preferências da usuária | OE3 | 3 | 0 |

## 11.3 Detalhamento por objetivo e característica

Texto de cada requisito funcional **como está no quadro**, com os RNFs vinculados a ele. Os
RNFs aparecem na característica onde a seta deles chega.

### OE1 · Melhorar a percepção dos sintomas durante todo o ciclo menstrual

#### CP1 · Registro e análise de sintomas e disposição — 4 RF · 5 RNF

| RF | Requisito | Texto no quadro | RNFs vinculados |
|---|---|---|---|
| RF01 | Consultar sintomas comuns da fase | Deve ser possível à usuária consultar os sintomas comuns da fase atual do seu ciclo menstrual. | Só RNFs transversais |
| RF02 | Sinalizar sobrecarga | Deve ser possível à usuária sinalizar, a qualquer momento do dia, que está sobrecarregada ou indisposta, para que suas tarefas do dia sejam readequadas. | ◇ RNF04 · ◇ RNF08 |
| RF03 | Receber lembrete de registro | Deve ser possível à usuária receber um lembrete para registrar seus sintomas e sua disposição. | ● RNF01 |
| RF04 | Registrar sintomas e disposição | **Sem descrição no quadro.** Nome extraído do campo "RFs" das RNF02, RNF03, RNF04 e RNF08. | ○ RNF02 · ○ RNF03 · ○ RNF04 · ○ RNF08 |

> ⚠ **Atenção — RF04.** Não existe card deste requisito no quadro; ele aparece apenas citado
> pelos cards de RNF. Na prática, é o requisito central da CP1. Ver achado 01.

**RNFs com seta nesta característica**

| RNF | Categoria | Requisito | Critério de validação | RFs citados | Seta no quadro |
|---|---|---|---|---|---|
| RNF01 | Segurança da informação | As notificações não devem exibir informações sobre ciclo, sintomas ou disposição sem autorização da usuária. | Com a exibição de informações do ciclo desativada, as notificações de resumo e de lembrete não apresentam fase, sintomas nem disposição. | RF03 Receber lembrete de registro · RF14 Receber resumo do dia | → RF03 Receber lembrete de registro |
| RNF04 | Usabilidade | O registro de sintomas e disposição deve exigir poucas interações. | O registro é concluído em no máximo 3 toques a partir da tela inicial. | RF04 Registrar sintomas e disposição · RF08 Estimar fase do ciclo por sintomas | → RF02 Sinalizar sobrecarga — **diverge do campo RFs** |
| RNF08 | Desempenho | A confirmação do registro de sintomas e disposição deve aparecer em até 2 segundos. | Média de 5 medições no DevTools igual ou inferior a 2 s. | RF04 Registrar sintomas e disposição | → RF02 Sinalizar sobrecarga — **diverge do campo RFs** |

#### CP2 · Acompanhamento do ciclo menstrual — 5 RF · 3 RNF

| RF | Requisito | Texto no quadro | RNFs vinculados |
|---|---|---|---|
| RF05 | Consultar situação atual do ciclo | Deve ser possível à usuária consultar a situação atual do seu ciclo menstrual. | Só RNFs transversais |
| RF06 | Registrar início da menstruação | Deve ser possível à usuária registrar a data de início da sua menstruação. | ○ RNF02 · ○ RNF03 |
| RF07 | Informar características do ciclo | Deve ser possível à usuária informar a duração média do seu ciclo menstrual ou que seu ciclo é irregular. | ○ RNF02 |
| RF08 | Estimar fase do ciclo por sintomas | Deve ser possível à usuária obter uma estimativa da fase atual do seu ciclo menstrual informando seus sintomas atuais. | ○ RNF04 |
| RF09 | Recomendar conteúdos sobre o ciclo | Deve ser possível à usuária receber recomendações de conteúdos informativos sobre o ciclo menstrual, relacionados à fase atual e aos sintomas registrados. | Só RNFs transversais |

**RNFs com seta nesta característica:** nenhum.

#### CP3 · Privacidade dos dados da usuária — 3 RF · 3 RNF

| RF | Requisito | Texto no quadro | RNFs vinculados |
|---|---|---|---|
| RF10 | Visualizar calendário do ciclo | Deve ser possível à usuária visualizar as fases do seu ciclo menstrual em um calendário. | Só RNFs transversais |
| RF11 | Proteger acesso com PIN | Deve ser possível à usuária proteger o acesso à sua conta com um PIN. | ● RNF03 · ● RNF09 |
| RF12 | Aceitar termos de uso | Deve ser possível à usuária consultar e aceitar os termos de uso e de tratamento dos seus dados. | ● RNF02 |

**RNFs com seta nesta característica**

| RNF | Categoria | Requisito | Critério de validação | RFs citados | Seta no quadro |
|---|---|---|---|---|---|
| RNF02 | Externo (Legislativo) | O tratamento dos dados deve atender à LGPD (Lei nº 13.709/2018), considerando dados de saúde como dados pessoais sensíveis. | Nenhum dado de ciclo, sintoma ou disposição é salvo antes do aceite dos termos, e os termos descrevem a finalidade de cada tipo de dado. | RF12 Aceitar termos de uso · RF04 Registrar sintomas e disposição · RF07 Informar características do ciclo · RF06 Registrar início da menstruação | → RF12 Aceitar termos de uso |
| RNF03 | Segurança da informação | Os dados de ciclo, sintomas, disposição e tarefas devem ser acessíveis somente pela própria usuária. | Uma requisição aos dados de uma usuária feita com a sessão de outra conta retorna acesso negado. | RF04 Registrar sintomas e disposição · RF06 Registrar início da menstruação · RF11 Proteger acesso com PIN | → RF11 Proteger acesso com PIN |
| RNF09 | Restrição de design | O PIN deve ser informado pela sequência de toques em pétalas de uma flor. | A tela de PIN apresenta 6 pétalas selecionáveis e o PIN é formado pela sequência de 4 toques; verificado por inspeção no protótipo e na aplicação. | RF11 Proteger acesso com PIN | → RF11 Proteger acesso com PIN |

### OE2 · Reduzir a sobrecarga executiva causada pelo planejamento de tarefas que desconsidera a fase do ciclo menstrual

#### CP4 · Planejamento adaptativo das tarefas — 2 RF · 2 RNF

| RF | Requisito | Texto no quadro | RNFs vinculados |
|---|---|---|---|
| RF13 | Recomendar tarefas do dia | Deve ser possível à usuária receber, a cada dia, a recomendação das tarefas a realizar, em ordem de precedência, com base no registro de energia, prazo e prioridade. | ● RNF06 |
| RF14 | Receber resumo do dia | Deve ser possível à usuária receber, a cada dia, um resumo do que está previsto para o dia. | ○ RNF01 |

**RNFs com seta nesta característica**

| RNF | Categoria | Requisito | Critério de validação | RFs citados | Seta no quadro |
|---|---|---|---|---|---|
| RNF06 | Desempenho | A recomendação do dia deve ser exibida em até 3 segundos após o acesso. | Média de 5 medições no DevTools, com a rede em Fast 4G, igual ou inferior a 3 s. | RF13 Recomendar tarefas do dia | → RF13 Recomendar tarefas do dia |

### OE3 · Reduzir a sobrecarga executiva na execução das tarefas diárias, ajustando-as à disposição real da usuária

#### CP5 · Gestão acolhedora da carga diária — 8 RF · 1 RNF

| RF | Requisito | Texto no quadro | Título no quadro | RNFs vinculados |
|---|---|---|---|---|
| RF15 | Reajustar recomendação do dia | Deve ser possível à usuária visualizar suas tarefas do dia ajustadas ao nível de disposição registrado. | "A usuária deve poder receber a recomendação do dia reajustada de acordo com a disposição registrada" | ● RNF07 |
| RF16 | Editar tarefa | Deve ser possível à usuária alterar as informações de uma tarefa cadastrada. | "A usuária deve poder editar as informações de uma tarefa cadastrada" | Só RNFs transversais |
| RF17 | Cadastrar tarefa | Deve ser possível à usuária cadastrar tarefas informando título, prazo e prioridade. | "A usuária deve poder cadastrar uma tarefa" | Só RNFs transversais |
| RF18 | Adiar tarefa | Deve ser possível à usuária adiar uma tarefa para outra data, mantendo suas demais informações e seu prazo final, alterando apenas o dia que essa tarefa será feita. | "A usuária deve poder adiar uma tarefa para outro dia" | Só RNFs transversais |
| RF19 | Excluir tarefa | Deve ser possível o usuário deletar a tarefa criada. *(erro de redação no quadro — ver achado 10)* | "A usuária deve poder excluir uma tarefa cadastrada" | Só RNFs transversais |
| RF20 | Concluir tarefa | Deve ser possível à usuária marcar uma tarefa como concluída, mantendo o registro da data de conclusão. | "A usuária deve poder marcar uma tarefa como concluída" | Só RNFs transversais |
| RF21 | Sugerir atividades de acolhimento | Deve ser possível à usuária receber sugestões de atividades de acolhimento. | — | Só RNFs transversais |
| RF22 | Receber mensagens de acolhimento | Deve ser possível à usuária receber mensagens de acolhimento. | — | Só RNFs transversais |

**RNFs com seta nesta característica**

| RNF | Categoria | Requisito | Critério de validação | RFs citados | Seta no quadro |
|---|---|---|---|---|---|
| RNF07 | Desempenho | O reajuste da recomendação deve aparecer em até 2 segundos após o registro de disposição. | Média de 5 medições entre salvar o registro e a lista atualizada igual ou inferior a 2 s. | RF15 Reajustar recomendação do dia | → RF15 Reajustar recomendação do dia |

> Os cards transversais **RNF10** e **RNF11** também têm sua seta apontando para o card da
> CP5, embora declarem "RFs: todos". Ver achado 04.

#### CP6 · Reconhecimento de ritmo sustentável — 2 RF · 0 RNF

| RF | Requisito | Texto no quadro | RNFs vinculados |
|---|---|---|---|
| RF23 | Gerar retrospectiva mensal | Deve ser possível à usuária gerar, ao final de cada mês, uma retrospectiva das tarefas concluídas e das atividades de acolhimento realizadas no período. | Só RNFs transversais |
| RF24 | Registrar atividade de acolhimento | Deve ser possível à usuária registrar as atividades de acolhimento que realizou. | Só RNFs transversais |

**RNFs com seta nesta característica:** nenhum.

#### CP7 · Conta e preferências da usuária — 3 RF · 0 RNF

| RF | Requisito | Texto no quadro | RNFs vinculados |
|---|---|---|---|
| RF25 | Criar conta | Deve ser possível à usuária criar sua conta. | Só RNFs transversais |
| RF26 | Recuperar acesso à conta | Deve ser possível à usuária recuperar o acesso à sua conta. | Só RNFs transversais |
| RF27 | Conhecer a proposta do sistema | Deve ser possível à usuária conhecer o objetivo do sistema ao iniciar o uso. | Só RNFs transversais |

**RNFs com seta nesta característica:** nenhum.

### Requisitos não funcionais transversais — aplicam-se a todos os RFs

| RNF | Categoria | Requisito | Critério de validação | RFs citados | Seta no quadro |
|---|---|---|---|---|---|
| RNF10 | Suportabilidade (compatibilidade) | A interface deve funcionar em telas de celular e de computador. | No modo dispositivo do DevTools, as telas funcionam de 360 px a 1440 px de largura sem rolagem horizontal. | Todos os RFs | → CP5 (card da característica) |
| RNF11 | Usabilidade (acessibilidade) | Os textos devem ter contraste legível. | A auditoria do Lighthouse não aponta erros de contraste (WCAG 2.1 nível AA). | Todos os RFs | → CP5 (card da característica) |

## 11.4 Matriz de rastreabilidade vertical

Cada linha liga um requisito funcional à sua característica, ao objetivo específico e ao
problema raiz. Todos os RFs herdam, adicionalmente, os RNFs transversais **RNF10** e
**RNF11**.

| RF | Requisito funcional | CP | OE | Problema | RNFs específicos |
|---|---|---|:--:|---|---|
| | **OE1 — Melhorar a percepção dos sintomas durante todo o ciclo menstrual** | | | | |
| RF01 | Consultar sintomas comuns da fase | CP1 Registro e análise de sintomas e disposição | OE1 | Sobrecarga Executiva | — |
| RF02 | Sinalizar sobrecarga | CP1 Registro e análise de sintomas e disposição | OE1 | Sobrecarga Executiva | ◇ RNF04 · ◇ RNF08 |
| RF03 | Receber lembrete de registro | CP1 Registro e análise de sintomas e disposição | OE1 | Sobrecarga Executiva | ● RNF01 |
| RF04 | Registrar sintomas e disposição *(sem card)* | CP1 Registro e análise de sintomas e disposição | OE1 | Sobrecarga Executiva | ○ RNF02 · ○ RNF03 · ○ RNF04 · ○ RNF08 |
| RF05 | Consultar situação atual do ciclo | CP2 Acompanhamento do ciclo menstrual | OE1 | Sobrecarga Executiva | — |
| RF06 | Registrar início da menstruação | CP2 Acompanhamento do ciclo menstrual | OE1 | Sobrecarga Executiva | ○ RNF02 · ○ RNF03 |
| RF07 | Informar características do ciclo | CP2 Acompanhamento do ciclo menstrual | OE1 | Sobrecarga Executiva | ○ RNF02 |
| RF08 | Estimar fase do ciclo por sintomas | CP2 Acompanhamento do ciclo menstrual | OE1 | Sobrecarga Executiva | ○ RNF04 |
| RF09 | Recomendar conteúdos sobre o ciclo | CP2 Acompanhamento do ciclo menstrual | OE1 | Sobrecarga Executiva | — |
| RF10 | Visualizar calendário do ciclo | CP3 Privacidade dos dados da usuária | OE1 | Sobrecarga Executiva | — |
| RF11 | Proteger acesso com PIN | CP3 Privacidade dos dados da usuária | OE1 | Sobrecarga Executiva | ● RNF03 · ● RNF09 |
| RF12 | Aceitar termos de uso | CP3 Privacidade dos dados da usuária | OE1 | Sobrecarga Executiva | ● RNF02 |
| | **OE2 — Reduzir a sobrecarga executiva causada pelo planejamento de tarefas que desconsidera a fase do ciclo menstrual** | | | | |
| RF13 | Recomendar tarefas do dia | CP4 Planejamento adaptativo das tarefas | OE2 | Sobrecarga Executiva | ● RNF06 |
| RF14 | Receber resumo do dia | CP4 Planejamento adaptativo das tarefas | OE2 | Sobrecarga Executiva | ○ RNF01 |
| | **OE3 — Reduzir a sobrecarga executiva na execução das tarefas diárias, ajustando-as à disposição real da usuária** | | | | |
| RF15 | Reajustar recomendação do dia | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | ● RNF07 |
| RF16 | Editar tarefa | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF17 | Cadastrar tarefa | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF18 | Adiar tarefa | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF19 | Excluir tarefa | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF20 | Concluir tarefa | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF21 | Sugerir atividades de acolhimento | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF22 | Receber mensagens de acolhimento | CP5 Gestão acolhedora da carga diária | OE3 | Sobrecarga Executiva | — |
| RF23 | Gerar retrospectiva mensal | CP6 Reconhecimento de ritmo sustentável | OE3 | Sobrecarga Executiva | — |
| RF24 | Registrar atividade de acolhimento | CP6 Reconhecimento de ritmo sustentável | OE3 | Sobrecarga Executiva | — |
| RF25 | Criar conta | CP7 Conta e preferências da usuária | OE3 | Sobrecarga Executiva | — |
| RF26 | Recuperar acesso à conta | CP7 Conta e preferências da usuária | OE3 | Sobrecarga Executiva | — |
| RF27 | Conhecer a proposta do sistema | CP7 Conta e preferências da usuária | OE3 | Sobrecarga Executiva | — |

## 11.5 Matriz RF × RNF

Compara as duas fontes de vínculo do quadro: a **seta** desenhada a partir do card de RNF e a
**lista escrita no campo "RFs:"** do próprio card.

**Legenda:** ● seta no quadro *e* citado no campo RFs · ○ citado no campo RFs, sem seta ·
◇ seta no quadro, mas não citado no campo RFs (**divergência**) · ▪ transversal ("RFs: todos")

| RF | RNF01<br>Segurança | RNF02<br>Externo | RNF03<br>Segurança | RNF04<br>Usabilidade | RNF06<br>Desempenho | RNF07<br>Desempenho | RNF08<br>Desempenho | RNF09<br>Restr. design | RNF10<br>Suportab. | RNF11<br>Usabilidade |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **CP1 · Registro e análise de sintomas e disposição (OE1)** | | | | | | | | | | |
| RF01 Consultar sintomas comuns da fase | | | | | | | | | ▪ | ▪ |
| RF02 Sinalizar sobrecarga | | | | ◇ | | | ◇ | | ▪ | ▪ |
| RF03 Receber lembrete de registro | ● | | | | | | | | ▪ | ▪ |
| RF04 Registrar sintomas e disposição *(sem card)* | | ○ | ○ | ○ | | | ○ | | ▪ | ▪ |
| **CP2 · Acompanhamento do ciclo menstrual (OE1)** | | | | | | | | | | |
| RF05 Consultar situação atual do ciclo | | | | | | | | | ▪ | ▪ |
| RF06 Registrar início da menstruação | | ○ | ○ | | | | | | ▪ | ▪ |
| RF07 Informar características do ciclo | | ○ | | | | | | | ▪ | ▪ |
| RF08 Estimar fase do ciclo por sintomas | | | | ○ | | | | | ▪ | ▪ |
| RF09 Recomendar conteúdos sobre o ciclo | | | | | | | | | ▪ | ▪ |
| **CP3 · Privacidade dos dados da usuária (OE1)** | | | | | | | | | | |
| RF10 Visualizar calendário do ciclo | | | | | | | | | ▪ | ▪ |
| RF11 Proteger acesso com PIN | | | ● | | | | | ● | ▪ | ▪ |
| RF12 Aceitar termos de uso | | ● | | | | | | | ▪ | ▪ |
| **CP4 · Planejamento adaptativo das tarefas (OE2)** | | | | | | | | | | |
| RF13 Recomendar tarefas do dia | | | | | ● | | | | ▪ | ▪ |
| RF14 Receber resumo do dia | ○ | | | | | | | | ▪ | ▪ |
| **CP5 · Gestão acolhedora da carga diária (OE3)** | | | | | | | | | | |
| RF15 Reajustar recomendação do dia | | | | | | ● | | | ▪ | ▪ |
| RF16 Editar tarefa | | | | | | | | | ▪ | ▪ |
| RF17 Cadastrar tarefa | | | | | | | | | ▪ | ▪ |
| RF18 Adiar tarefa | | | | | | | | | ▪ | ▪ |
| RF19 Excluir tarefa | | | | | | | | | ▪ | ▪ |
| RF20 Concluir tarefa | | | | | | | | | ▪ | ▪ |
| RF21 Sugerir atividades de acolhimento | | | | | | | | | ▪ | ▪ |
| RF22 Receber mensagens de acolhimento | | | | | | | | | ▪ | ▪ |
| **CP6 · Reconhecimento de ritmo sustentável (OE3)** | | | | | | | | | | |
| RF23 Gerar retrospectiva mensal | | | | | | | | | ▪ | ▪ |
| RF24 Registrar atividade de acolhimento | | | | | | | | | ▪ | ▪ |
| **CP7 · Conta e preferências da usuária (OE3)** | | | | | | | | | | |
| RF25 Criar conta | | | | | | | | | ▪ | ▪ |
| RF26 Recuperar acesso à conta | | | | | | | | | ▪ | ▪ |
| RF27 Conhecer a proposta do sistema | | | | | | | | | ▪ | ▪ |
| **RFs vinculados** | **2** | **4** | **3** | **3** | **1** | **1** | **2** | **1** | **27** | **27** |

## 11.6 Catálogo de requisitos não funcionais

Texto dos cards de RNF como está no quadro, com o destino da seta e os RFs citados.

| ID | Categoria | Requisito | Critério de validação | RFs citados | Seta no quadro |
|---|---|---|---|---|---|
| RNF01 | Segurança da informação | As notificações não devem exibir informações sobre ciclo, sintomas ou disposição sem autorização da usuária. | Com a exibição de informações do ciclo desativada, as notificações de resumo e de lembrete não apresentam fase, sintomas nem disposição. | RF03, RF14 | → RF03 |
| RNF02 | Externo (Legislativo) | O tratamento dos dados deve atender à LGPD (Lei nº 13.709/2018), considerando dados de saúde como dados pessoais sensíveis. | Nenhum dado de ciclo, sintoma ou disposição é salvo antes do aceite dos termos, e os termos descrevem a finalidade de cada tipo de dado. | RF12, RF04, RF07, RF06 | → RF12 |
| RNF03 | Segurança da informação | Os dados de ciclo, sintomas, disposição e tarefas devem ser acessíveis somente pela própria usuária. | Uma requisição aos dados de uma usuária feita com a sessão de outra conta retorna acesso negado. | RF04, RF06, RF11 | → RF11 |
| RNF04 | Usabilidade | O registro de sintomas e disposição deve exigir poucas interações. | O registro é concluído em no máximo 3 toques a partir da tela inicial. | RF04, RF08 | → RF02 · **diverge** |
| RNF06 | Desempenho | A recomendação do dia deve ser exibida em até 3 segundos após o acesso. | Média de 5 medições no DevTools, com a rede em Fast 4G, igual ou inferior a 3 s. | RF13 | → RF13 |
| RNF07 | Desempenho | O reajuste da recomendação deve aparecer em até 2 segundos após o registro de disposição. | Média de 5 medições entre salvar o registro e a lista atualizada igual ou inferior a 2 s. | RF15 | → RF15 |
| RNF08 | Desempenho | A confirmação do registro de sintomas e disposição deve aparecer em até 2 segundos. | Média de 5 medições no DevTools igual ou inferior a 2 s. | RF04 | → RF02 · **diverge** |
| RNF09 | Restrição de design | O PIN deve ser informado pela sequência de toques em pétalas de uma flor. | A tela de PIN apresenta 6 pétalas selecionáveis e o PIN é formado pela sequência de 4 toques; verificado por inspeção no protótipo e na aplicação. | RF11 | → RF11 |
| RNF10 | Suportabilidade (compatibilidade) | A interface deve funcionar em telas de celular e de computador. | No modo dispositivo do DevTools, as telas funcionam de 360 px a 1440 px de largura sem rolagem horizontal. | Todos | → CP5 (card da característica) |
| RNF11 | Usabilidade (acessibilidade) | Os textos devem ter contraste legível. | A auditoria do Lighthouse não aponta erros de contraste (WCAG 2.1 nível AA). | Todos | → CP5 (card da característica) |

> **RNF05 não existe** no catálogo: a sequência do quadro salta de RNF04 para RNF06. Ver
> achado 03.

## 11.7 Elos de rastreabilidade — *backward* e *forward*

A matriz é percorrida em dois sentidos, que respondem a perguntas distintas.

### 11.7.1 Rastreabilidade *backward* — origem para requisito

Responde: **"por que este requisito existe?"** O elo parte da fonte que originou o requisito e
desce até ele.

```text
FONTE                    PROBLEMA              OBJETIVO           CARACTERÍSTICA        REQUISITO
Card do quadro    →   Sobrecarga        →   OE1 | OE2 | OE3   →   CP1 … CP7        →   RF01 … RF27
MindCycle – Figma     Executiva                                                           ↓
(28/09/2026)                                                                         RNF vinculado
                                                                                     (● ○ ◇ ▪)
```

| Elemento do elo | Como é evidenciado neste projeto |
|---|---|
| **Fonte primária** | Card individual no quadro *MindCycle – Figma*, capturado em 28/09/2026 e consolidado na Matriz de Rastreabilidade v1.0. Exceção: o **RF04** não possui card e foi derivado do campo "RFs:" dos cards RNF02, RNF03, RNF04 e RNF08 (achado 01). |
| **Problema → Objetivo** | Seta desenhada do card do problema para cada card de OE. |
| **Objetivo → Característica** | Seta desenhada do card de OE para cada card de CP: OE1 → CP1, CP2, CP3 · OE2 → CP4 · OE3 → CP5, CP6, CP7. |
| **Característica → Requisito** | Agrupamento dos cards de RF sob o card da CP, conforme a Seção 11.2. |
| **Requisito → Requisito não funcional** | Dupla evidência: a seta do card de RNF e a lista do campo "RFs:". A notação ● ○ ◇ ▪ da Seção 11.5 registra qual das duas sustenta cada vínculo. |

**Cobertura *backward*:** os **27 requisitos funcionais** fecham a cadeia completa até o
problema raiz — nenhum requisito órfão foi identificado. A rastreabilidade de origem está,
portanto, **íntegra em 27/27 (100 %)**, com a ressalva documental do RF04.

### 11.7.2 Rastreabilidade *forward* — requisito para realização e verificação

Responde: **"onde este requisito é realizado e como se comprova que foi atendido?"**

```text
REQUISITO      →   ALOCAÇÃO DE ENTREGA        →   CRITÉRIO DE VERIFICAÇÃO
RF01 … RF27        MVP (Release 3–4) ou            Critério de validação do RNF
                   release posterior               vinculado · inspeção do RF
                        ↓
                   Seção 10.1 / 10.1.2
```

> **Estado atual dos artefatos de saída.** Até esta entrega o projeto está na
> **Release 2**, cujo escopo é integralmente de Engenharia de Requisitos: os incrementos
> funcionais começam na Release 3 (20/10 – 23/11/2026), conforme o
> [cronograma](../06-cronograma-e-entregas/). Em consequência, **não existem ainda módulos,
> componentes de código, casos de teste ou histórias de usuário** aos quais ancorar o elo
> *forward* de implementação. Esta subseção registra, por isso, os dois elos *forward* que já
> são verificáveis — **alocação de entrega** e **critério de verificação** — e deixa
> explicitamente aberta a coluna de artefatos de implementação, a ser preenchida na Release 3.

| RF | Alocação de entrega | Critério de verificação disponível | Artefato de implementação |
|---|---|---|---|
| RF01 | MVP | Inspeção do RF · RNF10, RNF11 | A definir na Release 3 |
| RF02 | MVP | Inspeção do RF · RNF04 ◇, RNF08 ◇ | A definir na Release 3 |
| RF03 | *Release* posterior | RNF01 | A definir |
| RF04 | MVP | RNF02, RNF03, RNF04, RNF08 | A definir na Release 3 |
| RF05 | *Release* posterior | Inspeção do RF · transversais | A definir |
| RF06 | MVP | RNF02, RNF03 | A definir na Release 3 |
| RF07 | *Release* posterior | RNF02 | A definir |
| RF08 | *Release* posterior | RNF04 | A definir |
| RF09 | *Release* posterior | Inspeção do RF · transversais | A definir |
| RF10 | *Release* posterior | Inspeção do RF · transversais | A definir |
| RF11 | MVP — **escopo reduzido** (PIN numérico) | RNF03 · RNF09 **postergado** (evolutivo) | A definir na Release 3 |
| RF12 | MVP | RNF02 | A definir na Release 3 |
| RF13 | MVP | RNF06 | A definir na Release 3 |
| RF14 | *Release* posterior | RNF01 | A definir |
| RF15 | MVP | RNF07 | A definir na Release 3 |
| RF16 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF17 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF18 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF19 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF20 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF21 | *Release* posterior | Inspeção do RF · transversais | A definir |
| RF22 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF23 | *Release* posterior | Inspeção do RF · transversais | A definir |
| RF24 | *Release* posterior | Inspeção do RF · transversais | A definir |
| RF25 | MVP | Inspeção do RF · transversais | A definir na Release 3 |
| RF26 | *Release* posterior — 1º item | Inspeção do RF · transversais | A definir |
| RF27 | *Release* posterior | Inspeção do RF · transversais | A definir |

**Cobertura *forward* por critério de verificação**

| Situação | Quantidade | RFs |
|---|:---:|---|
| Possui RNF específico com critério de validação mensurável | 11 | RF02, RF03, RF04, RF06, RF07, RF08, RF11, RF12, RF13, RF14, RF15 |
| Coberto apenas pelos critérios transversais (RNF10, RNF11) + inspeção do RF | 16 | RF01, RF05, RF09, RF10, RF16, RF17, RF18, RF19, RF20, RF21, RF22, RF23, RF24, RF25, RF26, RF27 |

A concentração de critérios mensuráveis em 11 dos 27 requisitos é registrada como achado 11 —
não é erro, mas indica onde a especificação de qualidade ainda pode ser adensada.

### 11.7.3 Elo reverso dos requisitos não funcionais

Percurso inverso, do RNF para o conjunto de requisitos funcionais que ele condiciona.

| RNF | RFs condicionados | No MVP | Fora do MVP | Classificação no MVP |
|---|---|---|---|---|
| RNF01 | RF03, RF14 | — | RF03, RF14 | Associado ao MVP (via RF22) |
| RNF02 | RF04, RF06, RF07, RF12 | RF04, RF06, RF12 | RF07 | Obrigatório |
| RNF03 | RF04, RF06, RF11 | RF04, RF06, RF11 | — | Obrigatório |
| RNF04 | RF04, RF08 *(+ seta em RF02)* | RF04, RF02 | RF08 | Obrigatório |
| RNF06 | RF13 | RF13 | — | Associado ao MVP |
| RNF07 | RF15 | RF15 | — | Associado ao MVP |
| RNF08 | RF04 *(+ seta em RF02)* | RF04, RF02 | — | Obrigatório |
| RNF09 | RF11 | RF11 *(escopo reduzido)* | — | Evolutivo |
| RNF10 | Todos os 27 RFs | 15 | 12 | Obrigatório |
| RNF11 | Todos os 27 RFs | 15 | 12 | Obrigatório |

A coluna de classificação reproduz o tratamento definido na
[Seção 10.2](../10-mvp/#rnfs-mvp).

## 11.8 Achados de consistência e recomendações {#achados-consistencia}

Pontos em que o quadro de origem está incompleto, contraditório ou desalinhado com os demais
artefatos do projeto.

**Severidade:** ALTA: 2 · MÉDIA: 5 · BAIXA: 3 · INFO: 2

### 11.8.1 Severidade ALTA

**01 · RF citado pelas RNFs, mas sem card no quadro**
"Registrar sintomas e disposição" aparece no campo RFs de RNF02, RNF03, RNF04 e RNF08, mas não
há card desse RF em nenhuma característica. Ele é, na prática, o RF central da CP1.
→ *Recomendação:* criar o card em CP1 (proposto aqui como **RF04**) e ligar a ele as setas de
RNF04 e RNF08.

**02 · Setas de RNF04 e RNF08 apontam para o RF errado**
No quadro, as setas de RNF04 (Usabilidade) e RNF08 (Desempenho) chegam em "Sinalizar
sobrecarga" (RF02), mas o campo RFs dessas RNFs cita "Registrar sintomas e disposição", e não
RF02.
→ *Recomendação:* decidir se "Sinalizar sobrecarga" é o próprio registro de disposição — e
então renomear e unificar — ou mover as setas para o novo card RF04.

### 11.8.2 Severidade MÉDIA

**03 · Lacuna na numeração: RNF05 não aparece**
A sequência vai de RNF04 para RNF06. Pode ser um RNF descartado ou um card fora das capturas.
→ *Recomendação:* confirmar com a equipe; se foi descartado, registrar a exclusão ou renumerar.

**04 · RNFs transversais presas a uma única característica**
RNF10 (compatibilidade) e RNF11 (acessibilidade) declaram "RFs: todos", mas estão ligadas só à
CP5 no quadro. Quem lê a árvore entende que valem apenas para a gestão da carga diária.
→ *Recomendação:* mover as duas para um bloco "RNFs transversais" ligado ao produto (ou ao
Problema), fora das CPs.

**05 · CP7 "Conta e preferências" não tem RF de preferência**
A CP7 só tem Criar conta, Recuperar acesso e Conhecer a proposta. Mas o critério da RNF01
pressupõe uma configuração para desativar a exibição de informações do ciclo nas notificações,
e essa configuração não existe como RF.
→ *Recomendação:* criar um RF de preferência, por exemplo "Configurar privacidade das
notificações", em CP7 ou CP3.

**06 · "Visualizar calendário do ciclo" fora da característica natural**
O RF está sob CP3 (Privacidade), mas trata de acompanhar as fases do ciclo, que é o escopo da
CP2.
→ *Recomendação:* mover para CP2 "Acompanhamento do ciclo menstrual".

**07 · Quadro diverge do Documento de Visão**
O Documento de Visão do Produto ainda lista OE1–OE5 e CP1 "Taxonomia e classificação de
tarefas" / CP2 "Motor reativo de realocação silenciosa". O quadro usa OE1–OE3 e CP1–CP7 com
outro conteúdo.
→ *Recomendação:* atualizar as seções 2.2 e 2.3 da Visão (e o GitPages) com a estrutura do
quadro.

### 11.8.3 Severidade BAIXA

**08 · IDs de RF ausentes e colisão com o levantamento anterior**
Os RFs não têm ID no quadro — os IDs RF01–RF27 foram propostos na Matriz de Rastreabilidade. O
levantamento anterior (`requisitos-por-tela-mindcycle.md`) usa RF01–RF69 e RNF01–RNF10 com
outro conteúdo, o que gera dois significados para o mesmo ID.
→ *Recomendação:* adotar o quadro como fonte oficial, colocar os IDs nos cards e marcar o
levantamento anterior como histórico.

**09 · Vínculos só textuais (sem seta)**
Nove vínculos RF ↔ RNF existem apenas no campo RFs, sem seta no quadro: RNF01 → RF14;
RNF02 → RF04, RF06, RF07; RNF03 → RF04, RF06; RNF04 → RF04, RF08; RNF08 → RF04.
→ *Recomendação:* desenhar as setas que faltam ou manter a matriz deste documento como
referência oficial dos vínculos.

**10 · Padronização de redação**
"disposiçãol" no card da CP1; vírgula em "Melhorar, a percepção" (OE1); "o usuário deletar" no
card de excluir tarefa; cards da CP5 no formato "A usuária deve poder…" enquanto os demais usam
"Nome: Deve ser possível à usuária…"; número "10" solto ao lado do OE1.
→ *Recomendação:* padronizar como "Nome curto: Deve ser possível à usuária …" e corrigir os
erros de digitação.

### 11.8.4 Severidade INFO

**11 · Cobertura de RNFs específicos**
16 de 27 RFs só são cobertos pelas RNFs transversais: RF01, RF05, RF09, RF10, RF16, RF17, RF18,
RF19, RF20, RF21, RF22, RF23, RF24, RF25, RF26, RF27. CP6 e CP7 não têm nenhum RNF específico.
→ *Recomendação:* não é um erro. Vale avaliar RNFs para CRUD de tarefas (ex.: tempo de
resposta) e para Criar/Recuperar conta (ex.: segurança da senha).

**12 · Características habilitadoras sob OEs de negócio**
CP3 (Privacidade) sob OE1 e CP7 (Conta) sob OE3 são características de suporte e não contribuem
diretamente para "perceber sintomas" ou "reduzir a sobrecarga na execução".
→ *Recomendação:* considerar representá-las como características habilitadoras/transversais,
para deixar a árvore de valor mais nítida.

## 11.9 Método de construção da matriz

- Os vínculos **Problema → OE → CP → RF** foram lidos pelas **setas do quadro**.
- Para cada RNF foram registradas **duas fontes**: o destino da seta e a lista do campo
  "RFs:". Quando concordam, o vínculo é **●**; quando divergem, o documento apresenta ambas.
- Reações (estrelas, corações) e autoria dos cards **não** foram consideradas.
- Os RFs **não têm ID no quadro**; RF01–RF27 são propostos na Matriz de Rastreabilidade v1.0 e
  devem ser confirmados pela equipe.
