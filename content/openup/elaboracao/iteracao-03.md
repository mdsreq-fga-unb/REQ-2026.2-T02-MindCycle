---
title: "Iteração 03"
weight: 1
---

Esta página declara os requisitos da [Seção 8](../../../visao/08-requisitos-de-software/) nos níveis de negócio, usuário e produto.

## Requisitos de negócio — Catálogo de metas

| Identificador | Meta | Indicador | Referência | Resultado esperado | Prazo | OE |
|---|---|---|---|---|---|:--:|
| RNEG-01 | Melhorar a percepção dos sintomas durante todo o ciclo menstrual | a definir com a LabLivre | a definir com a LabLivre | a definir com a LabLivre | a definir com a LabLivre | OE1 |
| RNEG-02 | Reduzir a sobrecarga executiva causada pelo planejamento de tarefas que desconsidera a fase do ciclo menstrual | a definir com a LabLivre | a definir com a LabLivre | a definir com a LabLivre | a definir com a LabLivre | OE2 |
| RNEG-03 | Reduzir a sobrecarga executiva na execução das tarefas diárias, ajustando-as à disposição real da usuária | a definir com a LabLivre | a definir com a LabLivre | a definir com a LabLivre | a definir com a LabLivre | OE3 |

RNEG-04 — Restrição externa: atender à LGPD (Lei nº 13.709/2018) no tratamento de dados pessoais sensíveis de saúde.

## Requisitos de usuário — Histórias de usuário

| HU | História | RF | CP · OE |
|---|---|:--:|:--:|
| US01 | Como usuária, quero consultar os sintomas comuns da fase atual do meu ciclo menstrual, para ter consciência do meu próprio estado ao longo do ciclo. | RF01 | CP1 · OE1 |
| US02 | Como usuária, quero sinalizar, a qualquer momento do dia, que estou sobrecarregada ou indisposta, para ter consciência do meu próprio estado ao longo do ciclo. | RF02 | CP1 · OE1 |
| US03 | Como usuária, quero receber um lembrete para registrar meus sintomas e minha disposição, para ter consciência do meu próprio estado ao longo do ciclo. | RF03 | CP1 · OE1 |
| US04 | Como usuária, quero registrar os sintomas sentidos, com a intensidade de cada um, e o meu nível de disposição, para ter consciência do meu próprio estado ao longo do ciclo. | RF04 | CP1 · OE1 |
| US05 | Como usuária, quero consultar a situação atual do meu ciclo menstrual, para acompanhar e compreender meu ciclo menstrual. | RF05 | CP2 · OE1 |
| US06 | Como usuária, quero registrar a data de início da minha menstruação, para acompanhar e compreender meu ciclo menstrual. | RF06 | CP2 · OE1 |
| US07 | Como usuária, quero informar a duração média do meu ciclo menstrual ou que meu ciclo é irregular, para acompanhar e compreender meu ciclo menstrual. | RF07 | CP2 · OE1 |
| US08 | Como usuária, quero obter uma estimativa da fase atual do meu ciclo menstrual informando meus sintomas atuais, para acompanhar e compreender meu ciclo menstrual. | RF08 | CP2 · OE1 |
| US09 | Como usuária, quero receber recomendações de conteúdos informativos relacionados à fase atual e aos sintomas registrados, para acompanhar e compreender meu ciclo menstrual. | RF09 | CP2 · OE1 |
| US10 | Como usuária, quero visualizar as fases do meu ciclo menstrual em um calendário, para melhorar a percepção dos meus sintomas durante todo o ciclo menstrual. | RF10 | CP3 · OE1 |
| US11 | Como usuária, quero proteger o acesso à minha conta com um PIN, para manter a privacidade dos meus dados. | RF11 | CP3 · OE1 |
| US12 | Como usuária, quero consultar e aceitar os termos de uso e de tratamento dos meus dados, para manter a privacidade dos meus dados. | RF12 | CP3 · OE1 |
| US13 | Como usuária, quero receber, a cada dia, a recomendação das tarefas a realizar em ordem de precedência, com base no registro de energia, prazo e prioridade, para que o planejamento das minhas tarefas não desconsidere a fase do meu ciclo menstrual. | RF13 | CP4 · OE2 |
| US14 | Como usuária, quero receber, a cada dia, um resumo do que está previsto para o dia, para que o planejamento das minhas tarefas não desconsidere a fase do meu ciclo menstrual. | RF14 | CP4 · OE2 |
| US15 | Como usuária, quero visualizar minhas tarefas do dia ajustadas ao nível de disposição registrado, para ajustar a execução das tarefas diárias à minha disposição real. | RF15 | CP5 · OE3 |
| US16 | Como usuária, quero alterar as informações de uma tarefa cadastrada, para gerir minha carga diária de forma flexível e sem culpa. | RF16 | CP5 · OE3 |
| US17 | Como usuária, quero cadastrar tarefas informando título, prazo e prioridade, para gerir minha carga diária de forma flexível e sem culpa. | RF17 | CP5 · OE3 |
| US18 | Como usuária, quero adiar uma tarefa para outra data, mantendo suas demais informações e seu prazo, para gerir minha carga diária de forma flexível e sem culpa. | RF18 | CP5 · OE3 |
| US19 | Como usuária, quero excluir uma tarefa cadastrada, para gerir minha carga diária de forma flexível e sem culpa. | RF19 | CP5 · OE3 |
| US20 | Como usuária, quero marcar uma tarefa como concluída, mantendo o registro da data de conclusão, para gerir minha carga diária de forma flexível e sem culpa. | RF20 | CP5 · OE3 |
| US21 | Como usuária, quero receber sugestões de atividades de acolhimento, para gerir minha carga diária de forma acolhedora. | RF21 | CP5 · OE3 |
| US22 | Como usuária, quero receber mensagens de acolhimento, para gerir minha carga diária de forma acolhedora. | RF22 | CP5 · OE3 |
| US23 | Como usuária, quero gerar, ao final de cada mês, uma retrospectiva das tarefas concluídas e das atividades de acolhimento realizadas, para reconhecer meu ritmo de trabalho sustentável. | RF23 | CP6 · OE3 |
| US24 | Como usuária, quero registrar as atividades de acolhimento que realizei, para reconhecer meu ritmo de trabalho sustentável. | RF24 | CP6 · OE3 |
| US25 | Como usuária, quero criar minha conta, para gerir minha conta e minhas preferências no produto. | RF25 | CP7 · OE3 |
| US26 | Como usuária, quero recuperar o acesso à minha conta, para gerir minha conta e minhas preferências no produto. | RF26 | CP7 · OE3 |
| US27 | Como usuária, quero conhecer o objetivo do sistema ao iniciar o uso, para ter uma experiência inicial clara no produto. | RF27 | CP7 · OE3 |
| US28 | Como usuária, quero consultar como o ciclo menstrual funciona e o que caracteriza cada uma de suas fases, para acompanhar e compreender meu ciclo menstrual. | RF28 | CP2 · OE1 |
| US29 | Como usuária, quero ativar, desativar e configurar as notificações do aplicativo, inclusive a exibição de informações do ciclo nelas, para gerir minha conta e minhas preferências no produto. | RF29 | CP7 · OE3 |
| US30 | Como usuária, quero cadastrar, alterar e excluir as medicações que utilizo, indicando se o uso é diário ou esporádico, para ter consciência do meu próprio estado ao longo do ciclo. | RF30 | CP1 · OE1 |
| US31 | Como usuária, quero comparar os relatórios mensais de meses diferentes, abrangendo ciclo, sintomas, disposição e tarefas, para reconhecer meu ritmo de trabalho sustentável. | RF31 | CP6 · OE3 |
| US32 | Como usuária, quero exportar o relatório mensal em arquivo, para reconhecer meu ritmo de trabalho sustentável. | RF32 | CP6 · OE3 |
| US33 | Como usuária, quero registrar as atividades de acolhimento de minha preferência, para gerir minha carga diária de forma acolhedora. | RF33 | CP5 · OE3 |
| US34 | Como usuária, quero registrar os diagnósticos de saúde que já possuo, como diabetes, hipertensão ou enxaqueca, para ter consciência do meu próprio estado ao longo do ciclo. | RF34 | CP1 · OE1 |

## Requisitos de produto — Casos de uso detalhados

Foram detalhados primeiro os requisitos de maior risco, como orienta o OpenUP:

- **RF04** — dado-fonte de RF02, RF08, RF13 e RF15; ainda sem card no quadro.
- **RF13** — regra de cálculo da ordem de precedência (energia, prazo, prioridade).
- **RF15** — reajuste dependente de RF04, com restrição de tempo (RNF07).
- **RF11** — restrição de design da senha de pétalas (RNF09).
- **RF02** — vínculo divergente com RNF04/RNF08.

### Registrar sintomas e disposição (RF04)

| | |
|---|---|
| **Ator principal** | Usuária |
| **Pré-condição** | A usuária está com acesso à conta e aceitou os termos de uso (RF12). |
| **Fluxo principal** | 1. A usuária abre o registro de sintomas e disposição a partir da tela inicial.<br>2. A usuária informa os sintomas sentidos e a intensidade de cada um.<br>3. A usuária informa seu nível de disposição.<br>4. A usuária confirma o registro.<br>5. O sistema salva o registro e exibe a confirmação. |
| **Fluxos alternativos** | — |
| **Exceções** | Termos de uso não aceitos: o sistema não salva o registro (RNF02). |

**Critérios de aceitação**

1. O registro só será considerado concluído quando for feito em no máximo 3 toques a partir da tela inicial (RNF04) e a confirmação aparecer em até 2 segundos (RNF08).
2. Nenhum sintoma ou disposição será salvo antes do aceite dos termos de uso (RNF02).
3. Uma requisição ao registro feita com a sessão de outra conta retornará acesso negado (RNF03).

### Recomendar tarefas do dia (RF13)

| | |
|---|---|
| **Ator principal** | Usuária |
| **Pré-condição** | A usuária tem tarefas do dia cadastradas com prazo e prioridade (RF17) e registrou sua disposição (RF04). |
| **Fluxo principal** | 1. A usuária acessa o produto.<br>2. O sistema calcula a ordem de precedência das tarefas do dia a partir do registro de energia, do prazo e da prioridade.<br>3. O sistema exibe a recomendação do dia. |
| **Fluxos alternativos** | — |
| **Exceções** | — |

**Critérios de aceitação**

1. A recomendação do dia só será aceita quando for exibida em até 3 segundos após o acesso, pela média de 5 medições no DevTools com a rede em Fast 4G (RNF06).
2. A recomendação do dia só será aceita quando contiver todas as tarefas do dia e nenhuma outra tarefa.

### Reajustar recomendação do dia (RF15)

| | |
|---|---|
| **Ator principal** | Usuária |
| **Pré-condição** | A recomendação do dia foi exibida (RF13). |
| **Fluxo principal** | 1. A usuária registra sua disposição (RF04).<br>2. O sistema reajusta a recomendação do dia ao nível de disposição registrado.<br>3. O sistema exibe as tarefas do dia atualizadas. |
| **Fluxos alternativos** | 1a. A usuária sinaliza sobrecarga (RF02); o fluxo segue no passo 2. |
| **Exceções** | — |

**Critérios de aceitação**

1. O reajuste só será aceito quando a lista atualizada aparecer em até 2 segundos após salvar o registro, pela média de 5 medições (RNF07).

### Proteger acesso com PIN (RF11)

| | |
|---|---|
| **Ator principal** | Usuária |
| **Pré-condição** | A usuária criou sua conta (RF25). |
| **Fluxo principal** | 1. A usuária escolhe proteger o acesso à conta com PIN.<br>2. O sistema exibe a senha de pétalas.<br>3. A usuária toca a sequência de 4 pétalas.<br>4. O sistema registra o PIN e passa a exigi-lo no acesso à conta. |
| **Fluxos alternativos** | 2a. Na primeira versão, a usuária informa um PIN numérico (glossário da Seção 8). |
| **Exceções** | — |

**Critérios de aceitação**

1. A tela de PIN só será aceita quando apresentar 6 pétalas selecionáveis e formar o PIN pela sequência de 4 toques, verificado por inspeção no protótipo e na aplicação (RNF09).
2. Uma requisição aos dados da usuária feita com a sessão de outra conta retornará acesso negado (RNF03).

### Sinalizar sobrecarga (RF02)

| | |
|---|---|
| **Ator principal** | Usuária |
| **Pré-condição** | A usuária está com acesso à conta. |
| **Fluxo principal** | 1. A usuária sinaliza que está sobrecarregada ou indisposta.<br>2. O sistema registra a sinalização.<br>3. O sistema readequa as tarefas do dia (RF15). |
| **Fluxos alternativos** | — |
| **Exceções** | — |

**Critérios de aceitação**

1. A opção de sinalizar sobrecarga estará disponível em qualquer horário do dia.
2. Se o vínculo com RNF04 e RNF08 for confirmado, a sinalização só será considerada concluída quando for feita em no máximo 3 toques a partir da tela inicial e a confirmação aparecer em até 2 segundos.
