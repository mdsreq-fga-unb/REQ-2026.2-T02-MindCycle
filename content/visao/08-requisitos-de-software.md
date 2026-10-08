---
title: "8. Requisitos de Software"
numero: "8"
weight: 8
resumo: "Árvore de derivação do problema raiz aos objetivos e características, glossário do produto e os 34 requisitos funcionais e 10 requisitos não funcionais, com rastreabilidade e critérios verificáveis."
---

> **Fonte deste catálogo.** **Matriz de Rastreabilidade de Requisitos v1.0**, extraída do
> quadro *MindCycle – Figma* em **28/09/2026** e adotada pela equipe como fonte oficial de
> requisitos do projeto. O detalhamento de cada vínculo, os critérios de validação e os
> achados de consistência do quadro estão na
> [Seção 11](../11-rastreabilidade/); a priorização destes requisitos está na
> [Seção 9](../09-priorizacao-de-requisitos/) e o recorte do MVP na
> [Seção 10](../10-mvp/).
>
> Esta seção substitui o catálogo anterior (RF01–RF37 / RNF01–RNF13), elaborado antes da
> consolidação do quadro e que usava os mesmos identificadores com outro significado. O
> levantamento anterior passa a ter caráter **histórico**, conforme a recomendação do achado
> 08 da [Seção 11.8](../11-rastreabilidade/#achados-consistencia).
>
> **Requisitos acrescentados após a Matriz v1.0.** Os requisitos **RF28 a RF34** foram
> incluídos pela equipe depois da extração do quadro e **não possuem card no Figma**. Foram
> numerados em sequência ao catálogo, sem renumerar os existentes, e alocados às
> características e aos objetivos específicos já definidos. Seus vínculos com RNF usam a
> notação △ (vínculo proposto pela equipe), e eles ainda não foram incorporados à priorização
> ([Seção 9](../09-priorizacao-de-requisitos/)), ao MVP ([Seção 10](../10-mvp/)) nem às
> matrizes da [Seção 11](../11-rastreabilidade/).

## Árvore de derivação {#arvore-de-derivacao}

**Problema raiz: Sobrecarga Executiva.** Acúmulo de demandas pessoais e profissionais que
ultrapassa a capacidade de execução da usuária em um dado momento, agravado quando o
planejamento ignora as variações de energia, disposição e sintomas ao longo do ciclo
menstrual.

| Objetivo específico | Características de produto |
|---|---|
| **OE1:** Melhorar a percepção dos sintomas durante todo o ciclo menstrual | **CP1:** Registro e análise de sintomas e disposição<br>**CP2:** Acompanhamento do ciclo menstrual<br>**CP3:** Privacidade dos dados da usuária |
| **OE2:** Reduzir a sobrecarga executiva causada pelo planejamento de tarefas que desconsidera a fase do ciclo menstrual | **CP4:** Planejamento adaptativo das tarefas |
| **OE3:** Reduzir a sobrecarga executiva na execução das tarefas diárias, ajustando-as à disposição real da usuária | **CP5:** Gestão acolhedora da carga diária<br>**CP6:** Reconhecimento de ritmo sustentável<br>**CP7:** Conta e preferências da usuária |

| Característica | RF | RNF específicos | OE |
|---|:--:|:--:|:--:|
| CP1 · Registro e análise de sintomas e disposição | 6 | 5 | OE1 |
| CP2 · Acompanhamento do ciclo menstrual | 6 | 3 | OE1 |
| CP3 · Privacidade dos dados da usuária | 3 | 3 | OE1 |
| CP4 · Planejamento adaptativo das tarefas | 2 | 2 | OE2 |
| CP5 · Gestão acolhedora da carga diária | 9 | 1 | OE3 |
| CP6 · Reconhecimento de ritmo sustentável | 4 | 2 | OE3 |
| CP7 · Conta e preferências da usuária | 4 | 1 | OE3 |
| **Total** | **34** | **10** | — |

> As contagens de CP6 e CP7 na coluna "RNF específicos" vêm dos vínculos propostos (△) de
> RF32 (RNF02, RNF03) e RF29 (RNF01); pelo quadro, ambas tinham 0.

> A CP3 (Privacidade) e a CP7 (Conta e preferências) são características **habilitadoras**:
> sustentam o uso do produto sem contribuir diretamente para "perceber sintomas" ou "reduzir
> a sobrecarga na execução". A representação delas como características transversais está
> registrada como recomendação no achado 12 da
> [Seção 11.8](../11-rastreabilidade/#achados-consistencia).

## Glossário {#glossario}

| Termo | Definição |
|---|---|
| Usuária | Pessoa que utiliza o MindCycle. Grafia única em todo o material. |
| Fase do ciclo | Uma das quatro fases reconhecidas pelo produto: menstrual, folicular, ovulatória e lútea. |
| Menstruação | Intervalo iniciado na data de início do sangramento registrada pela usuária. O termo "período" não é usado, para evitar ambiguidade. |
| Ciclo irregular | Situação em que a usuária declara não ter duração média estável de ciclo, informada em [RF07](#cp2). |
| Registro de sintomas e disposição | Registro feito pela usuária com os sintomas sentidos e seu nível de disposição, base de [RF02](#cp1), [RF08](#cp2), [RF13](#cp4) e [RF15](#cp5). |
| Disposição | Nível de energia e ânimo informado pela usuária no registro diário. |
| Sobrecarga | Sinalização pontual, feita a qualquer momento do dia, de que a usuária está sobrecarregada ou indisposta e precisa que as tarefas do dia sejam readequadas. |
| Sintoma | Manifestação física ou emocional associada ao ciclo, informada pela usuária no registro. |
| Intensidade do sintoma | Grau com que a usuária sente um sintoma físico, informado no registro de [RF04](#cp1). |
| Medicação | Medicamento de uso diário (contínuo) ou esporádico informado pela usuária em [RF30](#cp1). |
| Diagnóstico prévio | Condição de saúde já diagnosticada antes do uso do produto, como diabetes, hipertensão ou enxaqueca, informada pela usuária em [RF34](#cp1). |
| Atividade de acolhimento favorita | Atividade de acolhimento que a usuária marca como de sua preferência ([RF33](#cp5)). |
| Prioridade | Importância da tarefa informada pela usuária no cadastro. |
| Prazo | Data-limite da tarefa informada pela usuária no cadastro. Permanece inalterado quando a tarefa é adiada. |
| Tarefas do dia | Tarefas cuja execução está prevista para o dia corrente. |
| Ordem de precedência | Sequência das tarefas do dia calculada pelo sistema a partir do registro de energia, do prazo e da prioridade. Diferente de prioridade, que é informada pela usuária. |
| Recomendação do dia | Lista das tarefas do dia em ordem de precedência, produzida por [RF13](#cp4) e reajustada por [RF15](#cp5). |
| Atividade de acolhimento | Prática breve de autocuidado sugerida pelo produto ([RF21](#cp5)) e passível de registro pela usuária ([RF24](#cp6)). |
| Mensagem de acolhimento | Texto de apoio apresentado à usuária, sem linguagem de cobrança ou de culpa. |
| Retrospectiva mensal | Consolidação, ao final de cada mês, das tarefas concluídas e das atividades de acolhimento realizadas no período. |
| Relatório mensal | Consolidação completa do mês da usuária: fases do ciclo e menstruação, sintomas e disposição registrados e a retrospectiva mensal (tarefas concluídas e atividades de acolhimento). Comparado em [RF31](#cp6) e exportado em [RF32](#cp6). |
| PIN | Credencial que protege o acesso à conta. Na primeira versão é numérico; a forma-alvo é a senha de pétalas. |
| Senha de pétalas | Forma de informar o PIN pela sequência de toques nas pétalas de uma flor exibida na tela, como um desenho de desbloqueio em que as pétalas ocupam o lugar dos pontos. Especificada em [RNF09](#rnf). |

## Requisitos Funcionais

### CP1: Registro e análise de sintomas e disposição {#cp1}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF01 | Consultar sintomas comuns da fase | Deve ser possível à usuária consultar os sintomas comuns da fase atual do seu ciclo menstrual. | — | CP1 · OE1 |
| RF02 | Sinalizar sobrecarga | Deve ser possível à usuária sinalizar, a qualquer momento do dia, que está sobrecarregada ou indisposta, para que suas tarefas do dia sejam readequadas ([RF15](#cp5)). | ◇ [RNF04](#rnf) · ◇ [RNF08](#rnf) | CP1 · OE1 |
| RF03 | Receber lembrete de registro | Deve ser possível à usuária receber um lembrete para registrar seus sintomas e sua disposição. | ● [RNF01](#rnf) | CP1 · OE1 |
| RF04 | Registrar sintomas e disposição | Deve ser possível à usuária registrar os sintomas sentidos, com a intensidade de cada um, e o seu nível de disposição. | ○ [RNF02](#rnf) · ○ [RNF03](#rnf) · ○ [RNF04](#rnf) · ○ [RNF08](#rnf) | CP1 · OE1 |
| RF30 | Gerenciar medicações | Deve ser possível à usuária cadastrar, alterar e excluir as medicações que utiliza, indicando se o uso é diário ou esporádico. | △ [RNF02](#rnf) · △ [RNF03](#rnf) | CP1 · OE1 |
| RF34 | Registrar diagnósticos prévios | Deve ser possível à usuária registrar os diagnósticos de saúde que já possui, como diabetes, hipertensão ou enxaqueca. | △ [RNF02](#rnf) · △ [RNF03](#rnf) | CP1 · OE1 |

> ⚠ **Pendência de especificação — RF04.** Este requisito **não possui card no quadro**: seu
> nome foi derivado do campo "RFs" dos cards RNF02, RNF03, RNF04 e RNF08, e a descrição acima
> é uma redação mínima da equipe, ainda **não validada**, que inclui a intensidade de cada
> sintoma por decisão da equipe. Na prática é o requisito central da
> CP1 — é dado-fonte de RF02, RF08, RF13 e RF15 — e está classificado como *Must have* na
> [Seção 9.4](../09-priorizacao-de-requisitos/#avaliacao-valor-negocio). A criação do card é a
> recomendação do achado 01 da [Seção 11.8](../11-rastreabilidade/#achados-consistencia).


### CP2: Acompanhamento do ciclo menstrual {#cp2}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF05 | Consultar situação atual do ciclo | Deve ser possível à usuária consultar a situação atual do seu ciclo menstrual. | — | CP2 · OE1 |
| RF06 | Registrar início da menstruação | Deve ser possível à usuária registrar a data de início da sua menstruação. | ○ [RNF02](#rnf) · ○ [RNF03](#rnf) | CP2 · OE1 |
| RF07 | Informar características do ciclo | Deve ser possível à usuária informar a duração média do seu ciclo menstrual ou que seu ciclo é irregular. | ○ [RNF02](#rnf) | CP2 · OE1 |
| RF08 | Estimar fase do ciclo por sintomas | Deve ser possível à usuária obter uma estimativa da fase atual do seu ciclo menstrual informando seus sintomas atuais. | ○ [RNF04](#rnf) | CP2 · OE1 |
| RF09 | Recomendar conteúdos sobre o ciclo | Deve ser possível à usuária receber recomendações de conteúdos informativos sobre o ciclo menstrual, relacionados à fase atual e aos sintomas registrados. | — | CP2 · OE1 |
| RF28 | Consultar funcionamento do ciclo | Deve ser possível à usuária consultar informações sobre como o ciclo menstrual funciona e o que caracteriza cada uma de suas fases. | — | CP2 · OE1 |

### CP3: Privacidade dos dados da usuária {#cp3}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF10 | Visualizar calendário do ciclo | Deve ser possível à usuária visualizar as fases do seu ciclo menstrual em um calendário. | — | CP3 · OE1 |
| RF11 | Proteger acesso com PIN | Deve ser possível à usuária proteger o acesso à sua conta com um PIN. | ● [RNF03](#rnf) · ● [RNF09](#rnf) | CP3 · OE1 |
| RF12 | Aceitar termos de uso | Deve ser possível à usuária consultar e aceitar os termos de uso e de tratamento dos seus dados. | ● [RNF02](#rnf) | CP3 · OE1 |

> O RF10 trata de acompanhar as fases do ciclo, escopo da CP2, e está sob a CP3 apenas por
> como o quadro foi desenhado. A realocação para a CP2 é a recomendação do achado 06 da
> [Seção 11.8](../11-rastreabilidade/#achados-consistencia).

### CP4: Planejamento adaptativo das tarefas {#cp4}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF13 | Recomendar tarefas do dia | Deve ser possível à usuária receber, a cada dia, a recomendação das tarefas a realizar, em ordem de precedência, com base no registro de energia, prazo e prioridade. | ● [RNF06](#rnf) | CP4 · OE2 |
| RF14 | Receber resumo do dia | Deve ser possível à usuária receber, a cada dia, um resumo do que está previsto para o dia. | ○ [RNF01](#rnf) | CP4 · OE2 |

### CP5: Gestão acolhedora da carga diária {#cp5}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF15 | Reajustar recomendação do dia | Deve ser possível à usuária visualizar suas tarefas do dia ajustadas ao nível de disposição registrado. | ● [RNF07](#rnf) | CP5 · OE3 |
| RF16 | Editar tarefa | Deve ser possível à usuária alterar as informações de uma tarefa cadastrada. | — | CP5 · OE3 |
| RF17 | Cadastrar tarefa | Deve ser possível à usuária cadastrar tarefas informando título, prazo e prioridade. | — | CP5 · OE3 |
| RF18 | Adiar tarefa | Deve ser possível à usuária adiar uma tarefa para outra data, mantendo suas demais informações e seu prazo final, alterando apenas o dia em que essa tarefa será feita. | — | CP5 · OE3 |
| RF19 | Excluir tarefa | Deve ser possível à usuária excluir uma tarefa cadastrada. | — | CP5 · OE3 |
| RF20 | Concluir tarefa | Deve ser possível à usuária marcar uma tarefa como concluída, mantendo o registro da data de conclusão. | — | CP5 · OE3 |
| RF21 | Sugerir atividades de acolhimento | Deve ser possível à usuária receber sugestões de atividades de acolhimento. | — | CP5 · OE3 |
| RF22 | Receber mensagens de acolhimento | Deve ser possível à usuária receber mensagens de acolhimento. | — | CP5 · OE3 |
| RF33 | Registrar atividades de acolhimento favoritas | Deve ser possível à usuária registrar as atividades de acolhimento de sua preferência. | — | CP5 · OE3 |

> O card do RF19 está redigido no quadro como "Deve ser possível o usuário deletar a tarefa
> criada". A redação acima padroniza a forma ("Deve ser possível à usuária …") e a grafia de
> *usuária*, sem alterar o conteúdo do requisito — ver achado 10 da
> [Seção 11.8](../11-rastreabilidade/#achados-consistencia).

### CP6: Reconhecimento de ritmo sustentável {#cp6}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF23 | Gerar retrospectiva mensal | Deve ser possível à usuária gerar, ao final de cada mês, uma retrospectiva das tarefas concluídas e das atividades de acolhimento realizadas no período. | — | CP6 · OE3 |
| RF24 | Registrar atividade de acolhimento | Deve ser possível à usuária registrar as atividades de acolhimento que realizou. | — | CP6 · OE3 |
| RF31 | Comparar relatórios mensais | Deve ser possível à usuária comparar os relatórios mensais de meses diferentes, abrangendo ciclo, sintomas, disposição e tarefas. | — | CP6 · OE3 |
| RF32 | Exportar relatório mensal | Deve ser possível à usuária exportar o relatório mensal em arquivo. | △ [RNF02](#rnf) · △ [RNF03](#rnf) | CP6 · OE3 |

> O relatório mensal de RF31 e RF32 vai além da retrospectiva do [RF23](#cp6): reúne também
> os dados de ciclo, sintomas e disposição. Por isso esses requisitos contribuem para o OE1
> além do OE3, o que corresponde à contribuição secundária da CP6 declarada na
> [Seção 2](../02-solucao-proposta/). **Lacuna:** nenhum RF gera o relatório mensal completo,
> já que o RF23 gera apenas a retrospectiva. A equipe precisa ampliar o RF23 ou criar um
> requisito para gerar o relatório.

### CP7: Conta e preferências da usuária {#cp7}

| Código | Nome | Descrição | RNFs | Rastreabilidade |
|---|---|---|---|---|
| RF25 | Criar conta | Deve ser possível à usuária criar sua conta. | — | CP7 · OE3 |
| RF26 | Recuperar acesso à conta | Deve ser possível à usuária recuperar o acesso à sua conta. | — | CP7 · OE3 |
| RF27 | Conhecer a proposta do sistema | Deve ser possível à usuária conhecer o objetivo do sistema ao iniciar o uso. | — | CP7 · OE3 |
| RF29 | Gerenciar notificações | Deve ser possível à usuária ativar, desativar e configurar as notificações do aplicativo, inclusive a exibição de informações do ciclo nelas. | △ [RNF01](#rnf) | CP7 · OE3 |

> O RF29 é o requisito de preferência que faltava à CP7: ele fornece a configuração para
> desativar a exibição de informações do ciclo nas notificações, pressuposta pelo critério de
> validação do [RNF01](#rnf), e atende à recomendação do achado 05 da
> [Seção 11.8](../11-rastreabilidade/#achados-consistencia).

**Legenda dos vínculos com RNF:** ● seta no quadro *e* citado no campo "RFs:" ·
○ citado no campo "RFs:", sem seta · ◇ seta no quadro, mas não citado no campo "RFs:"
(**divergência**) · △ vínculo proposto pela equipe para requisito sem card no quadro
(RF28–RF34) · — apenas os RNFs transversais [RNF10](#rnf) e [RNF11](#rnf).

## Requisitos Não Funcionais {#rnf}

Todos os 34 requisitos funcionais estão sujeitos aos requisitos transversais **RNF10** e
**RNF11**.

| Código | Nome | Descrição | Classificação | Critério verificável | Rastreabilidade |
|---|---|---|---|---|---|
| RNF01 | Sigilo das notificações | As notificações não devem exibir informações sobre ciclo, sintomas ou disposição sem autorização da usuária. | Quadro: Segurança da informação · Sommerville: Produto / Segurança da informação | Com a exibição de informações do ciclo desativada, as notificações de resumo e de lembrete não apresentam fase, sintomas nem disposição. | [RF03](#cp1), [RF14](#cp4) · △ [RF29](#cp7) |
| RNF02 | Conformidade com a LGPD | O tratamento dos dados deve atender à LGPD (Lei nº 13.709/2018), considerando dados de saúde como dados pessoais sensíveis. | Quadro: Externo (Legislativo) · Sommerville: Externo / Legislativo | Nenhum dado de ciclo, sintoma ou disposição é salvo antes do aceite dos termos, e os termos descrevem a finalidade de cada tipo de dado. | [RF12](#cp3), [RF04](#cp1), [RF07](#cp2), [RF06](#cp2) · △ [RF30](#cp1), [RF32](#cp6), [RF34](#cp1) |
| RNF03 | Acesso exclusivo da usuária | Os dados de ciclo, sintomas, disposição e tarefas devem ser acessíveis somente pela própria usuária. | Quadro: Segurança da informação · Sommerville: Produto / Segurança da informação | Uma requisição aos dados de uma usuária feita com a sessão de outra conta retorna acesso negado. | [RF04](#cp1), [RF06](#cp2), [RF11](#cp3) · △ [RF30](#cp1), [RF32](#cp6), [RF34](#cp1) |
| RNF04 | Agilidade no registro | O registro de sintomas e disposição deve exigir poucas interações. | Quadro: Usabilidade · URPS+: Usabilidade · Sommerville: Produto / Usabilidade | O registro é concluído em no máximo 3 toques a partir da tela inicial. | [RF04](#cp1), [RF08](#cp2) · seta em [RF02](#cp1) |
| RNF06 | Tempo de exibição da recomendação | A recomendação do dia deve ser exibida em até 3 segundos após o acesso. | Quadro: Desempenho · URPS+: Desempenho · Sommerville: Produto / Eficiência (desempenho) | Média de 5 medições no DevTools, com a rede em Fast 4G, igual ou inferior a 3 s. | [RF13](#cp4) |
| RNF07 | Tempo de reajuste da recomendação | O reajuste da recomendação deve aparecer em até 2 segundos após o registro de disposição. | Quadro: Desempenho · URPS+: Desempenho · Sommerville: Produto / Eficiência (desempenho) | Média de 5 medições entre salvar o registro e a lista atualizada igual ou inferior a 2 s. | [RF15](#cp5) |
| RNF08 | Tempo de confirmação do registro | A confirmação do registro de sintomas e disposição deve aparecer em até 2 segundos. | Quadro: Desempenho · URPS+: Desempenho · Sommerville: Produto / Eficiência (desempenho) | Média de 5 medições no DevTools igual ou inferior a 2 s. | [RF04](#cp1) · seta em [RF02](#cp1) |
| RNF09 | Senha de pétalas | O PIN deve ser informado pela sequência de toques em pétalas de uma flor. | Quadro: Restrição de design · Sommerville: Externo / Restrição de design | A tela de PIN apresenta 6 pétalas selecionáveis e o PIN é formado pela sequência de 4 toques; verificado por inspeção no protótipo e na aplicação. | [RF11](#cp3) |
| RNF10 | Compatibilidade de telas | A interface deve funcionar em telas de celular e de computador. | Quadro: Suportabilidade (compatibilidade) · URPS+: Suportabilidade | No modo dispositivo do DevTools, as telas funcionam de 360 px a 1440 px de largura sem rolagem horizontal. | **Todos os RFs** |
| RNF11 | Contraste legível | Os textos devem ter contraste legível. | Quadro: Usabilidade (acessibilidade) · URPS+: Usabilidade · Sommerville: Produto / Usabilidade | A auditoria do Lighthouse não aponta erros de contraste (WCAG 2.1 nível AA). | **Todos os RFs** |

### Observações sobre o catálogo de RNFs

- **Não existe RNF05.** A numeração do quadro salta de RNF04 para RNF06. A lacuna é o achado
  03 da [Seção 11.8](../11-rastreabilidade/#achados-consistencia) e permanece em aberto: a
  equipe precisa confirmar se houve descarte, registrando-o, ou renumerar.
- **RNF10 e RNF11 são transversais**, mas no quadro suas setas apontam apenas para o card da
  CP5. A leitura correta é a declarada no próprio card ("RFs: todos") — achado 04.
- **RNF04 e RNF08 têm vínculo divergente.** A seta de ambos chega em [RF02](#cp1), enquanto o
  campo "RFs:" cita [RF04](#cp1). As duas leituras estão registradas com a notação ◇ e ○, sem
  que este documento escolha uma delas — achado 02.
- **Há um RNF proposto e ainda não incorporado:** criptografia dos dados em repouso,
  minimização e transparência sobre os dados coletados. Foi levantado pela equipe durante a
  priorização, está classificado como *obrigatório (proposto)* na
  [Seção 10.2](../10-mvp/#rnfs-mvp) e depende de validação para entrar formalmente neste
  catálogo.
- **19 dos 34 RFs são cobertos apenas pelos RNFs transversais** (os 16 do quadro mais RF28,
  RF31 e RF33). Não é erro, mas indica onde a
  especificação de qualidade pode ser adensada — por exemplo, tempo de resposta do CRUD de
  tarefas e segurança de credencial em criar/recuperar conta (achado 11).
