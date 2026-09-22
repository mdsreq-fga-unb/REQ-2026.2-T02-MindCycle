---
title: "8. Requisitos de Software"
numero: "8"
weight: 8
resumo: "Árvore de derivação do problema raiz aos objetivos e características, glossário do produto e os requisitos funcionais e não funcionais, com rastreabilidade e critérios verificáveis."
---

## Árvore de derivação

**Problema raiz: Sobrecarga Executiva.** Acúmulo de demandas pessoais e profissionais que
ultrapassa a capacidade de execução da usuária em um dado momento, agravado quando o
planejamento ignora as variações de energia, disposição e sintomas ao longo do ciclo
menstrual.

| Objetivo específico | Características de produto |
|---|---|
| **OE1:** Ampliar a percepção da usuária sobre seus sintomas e fases ao longo do ciclo menstrual | **CP2:** Análise dos sintomas por fase do ciclo menstrual<br>**CP3:** Acompanhamento do ciclo menstrual |
| **OE2:** Adequar o planejamento de tarefas à fase do ciclo menstrual e à disposição diária da usuária | **CP1:** Gestão acolhedora da carga diária<br>**CP4:** Planejamento adaptativo de tarefas<br>**CP5:** Pontuação e recompensas por tarefas |
| **OE3:** Garantir à usuária controle e privacidade sobre sua conta e seus dados sensíveis | **CP6:** Proteção e privacidade de dados<br>**CP7:** Controle de acesso da usuária<br>**CP8:** Perfil e preferências da usuária |

## Glossário

| Termo | Definição |
|---|---|
| Usuária | Pessoa que utiliza o MindCycle. Grafia única em todo o material. |
| Fase do ciclo | Uma das quatro fases reconhecidas pelo produto: menstrual, folicular, ovulatória e lútea. |
| Menstruação | Intervalo entre o início e o fim do sangramento registrado pela usuária. O termo "período" não é usado, para evitar ambiguidade. |
| Período pré-menstrual | Dias finais da fase lútea, antes da menstruação prevista. Não é uma fase; é um estado dentro da fase lútea (antes chamado de TPM no quadro). |
| Check-in diário | Registro feito uma vez por dia com o nível de disposição e os sintomas sentidos. |
| Nível de disposição | Escala de 1 (muito baixa) a 5 (muito alta) informada no check-in. |
| Sobrecarga | Sinalização pontual, feita a qualquer momento do dia, de que a usuária não dá conta da carga atual. |
| Sintoma | Item de uma lista predefinida de sintomas físicos e emocionais associados ao ciclo. |
| Prioridade | Importância da tarefa informada pela usuária no cadastro: baixa, média ou alta. |
| Nível de esforço | Demanda de energia da tarefa informada pela usuária no cadastro: leve, moderado ou intenso. |
| Ordem na agenda | Sequência das tarefas do dia calculada pelo sistema. Diferente de prioridade, que é informada pela usuária. |
| Tarefas do dia | Tarefas com data de execução no dia corrente. |
| Senha de pétalas | Alternativa ao PIN numérico: a senha é a sequência em que a usuária toca as pétalas de uma flor exibida na tela, como um desenho de desbloqueio em que as pétalas ocupam o lugar dos pontos. |
| Atividade de acolhimento | Sugestão breve de autocuidado (pausa, respiração, alongamento, hidratação) oferecida em momentos de sobrecarga ou no período pré-menstrual. |

## Requisitos Funcionais

### CP1: Gestão acolhedora da carga diária

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF01 | Cadastrar tarefa | O sistema deve permitir que a usuária cadastre uma tarefa informando título, data de execução, prazo final (opcional), prioridade e nível de esforço. | CP1 · OE2 |
| RF02 | Editar tarefa | O sistema deve permitir que a usuária altere qualquer informação de uma tarefa cadastrada. | CP1 · OE2 |
| RF03 | Excluir tarefa | O sistema deve permitir que a usuária exclua uma tarefa cadastrada, mediante confirmação. | CP1 · OE2 |
| RF04 | Concluir tarefa | O sistema deve permitir que a usuária marque uma tarefa como concluída, registrando a data de conclusão. | CP1 · OE2 |
| RF05 | Adiar tarefa | O sistema deve permitir que a usuária transfira uma tarefa não concluída para outra data de execução, mantendo as demais informações da tarefa. | CP1 · OE2 |
| RF06 | Sinalizar sobrecarga | O sistema deve permitir que a usuária sinalize, a qualquer momento do dia, que está sobrecarregada, iniciando a proposta de reajuste da agenda ([RF11](#cp4-planejamento-adaptativo-de-tarefas)) e a sugestão de atividades de acolhimento ([RF07](#cp1-gestão-acolhedora-da-carga-diária)). | CP1 · OE2 |
| RF07 | Sugerir atividades de acolhimento | O sistema deve sugerir atividades de acolhimento quando a usuária sinalizar sobrecarga ou estiver no período pré-menstrual, permitindo que ela aceite, dispense ou marque a atividade como realizada. | CP1 · OE2 |
| RF08 | Gerar relatório de produtividade | O sistema deve gerar um relatório mensal das tarefas concluídas pela usuária, agrupadas por fase do ciclo, permitindo navegar entre os meses. | CP1 · OE2 |
| RF09 | Enviar resumo diário | O sistema deve enviar à usuária, uma vez por dia e no horário definido por ela, uma notificação com as tarefas do dia e a fase atual do ciclo. | CP1 · OE2 |

### CP4: Planejamento adaptativo de tarefas

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF10 | Gerar agenda do dia | O sistema deve montar diariamente a agenda da usuária, definindo a ordem das tarefas do dia a partir do prazo final, da prioridade, do nível de esforço e da fase atual do ciclo. | CP4 · OE2 |
| RF11 | Propor reajuste da agenda | O sistema deve propor a redistribuição das tarefas restantes do dia quando a usuária registrar disposição baixa no check-in ou sinalizar sobrecarga, aplicando apenas as mudanças que ela aceitar. | CP4 · OE2 |
| RF12 | Reordenar agenda do dia | O sistema deve permitir que a usuária altere manualmente a ordem das tarefas na agenda do dia. | CP4 · OE2 |

### CP5: Pontuação e recompensas por tarefas

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF13 | Pontuar tarefa concluída | O sistema deve atribuir pontos à usuária a cada tarefa concluída, em quantidade proporcional ao nível de esforço da tarefa. | CP5 · OE2 |
| RF14 | Desbloquear recompensa | O sistema deve desbloquear uma recompensa sempre que a pontuação acumulada da usuária atingir uma nova faixa, permitindo que ela aplique a recompensa no aplicativo (por exemplo, temas visuais e ilustrações). | CP5 · OE2 |

### CP2: Análise dos sintomas por fase do ciclo menstrual

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF15 | Registrar check-in diário | O sistema deve permitir que a usuária registre, uma vez por dia, seu nível de disposição e os sintomas sentidos, podendo editar o registro até o fim do dia. | CP2 · OE1 |
| RF16 | Lembrar do check-in diário | O sistema deve notificar a usuária, no horário definido por ela, quando o check-in do dia ainda não tiver sido registrado. | CP2 · OE1 |
| RF17 | Identificar padrões de sintomas | O sistema deve cruzar os check-ins registrados com as fases do ciclo e apresentar à usuária os sintomas e níveis de disposição mais frequentes em cada fase, a partir do segundo ciclo completo registrado. | CP2 · OE1 |
| RF18 | Recomendar conteúdos sobre o ciclo | O sistema deve selecionar, na base de conteúdos revisados, os conteúdos relacionados à fase atual e aos sintomas registrados pela usuária, permitindo que ela abra, salve ou dispense cada recomendação. | CP2 · OE1 |

### CP3: Acompanhamento do ciclo menstrual

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF19 | Configurar ciclo menstrual | O sistema deve permitir que a usuária configure seu ciclo informando a data de início da última menstruação, a duração média do ciclo, a duração média da menstruação e se o ciclo é irregular. | CP3 · OE1 |
| RF20 | Estimar fase por sintomas | O sistema deve estimar a fase provável do ciclo a partir dos sintomas informados quando a usuária não souber a data da última menstruação, tratando a estimativa como provisória até o primeiro registro de menstruação. | CP3 · OE1 |
| RF21 | Registrar menstruação | O sistema deve permitir que a usuária registre o início e o fim de cada menstruação. | CP3 · OE1 |
| RF22 | Calcular fase atual do ciclo | O sistema deve calcular a fase atual e o dia do ciclo a partir dos registros de menstruação, recalculando a cada novo registro. | CP3 · OE1 |
| RF23 | Prever próxima menstruação | O sistema deve estimar a data de início da próxima menstruação e quantos dias faltam para ela, a partir da média dos ciclos registrados. | CP3 · OE1 |
| RF24 | Navegar no calendário do ciclo | O sistema deve apresentar um calendário mensal navegável com as menstruações registradas e as fases previstas, permitindo que a usuária selecione um dia para consultar o check-in e as tarefas daquele dia. | CP3 · OE1 |
| RF25 | Notificar mudança de fase | O sistema deve notificar a usuária antes do início de cada nova fase, informando qual será a fase e em quantos dias ela começa. | CP3 · OE1 |

### CP6: Proteção e privacidade de dados

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF26 | Registrar consentimento de uso de dados | O sistema deve apresentar os Termos de Uso e a Política de Privacidade no primeiro acesso e registrar o aceite da usuária, incluindo o consentimento específico para o tratamento de dados de saúde, impedindo o uso do aplicativo sem esse aceite. | CP6 · OE3 |
| RF27 | Criar bloqueio de acesso | O sistema deve permitir que a usuária crie um bloqueio para o aplicativo, definindo um PIN numérico ou uma senha de pétalas, durante a configuração inicial ou a qualquer momento nas configurações, podendo depois alterá-lo ou desativá-lo. | CP6 · OE3 |
| RF28 | Desbloquear aplicativo | O sistema deve solicitar o PIN ou a senha de pétalas sempre que o aplicativo for aberto com o bloqueio ativo. | CP6 · OE3 |
| RF29 | Redefinir bloqueio de acesso | O sistema deve permitir que a usuária redefina o PIN ou a senha de pétalas por meio de um código enviado ao e-mail de cadastro. | CP6 · OE3 |
| RF30 | Excluir conta e dados | O sistema deve permitir que a usuária exclua sua conta e todos os seus dados pessoais, mediante confirmação. | CP6 · OE3 |

### CP7: Controle de acesso da usuária

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF31 | Criar conta | O sistema deve permitir que a usuária crie uma conta informando nome, e-mail e senha, ativando-a somente após a confirmação do e-mail. | CP7 · OE3 |
| RF32 | Autenticar usuária | O sistema deve permitir que a usuária acesse sua conta informando e-mail e senha válidos. | CP7 · OE3 |
| RF33 | Recuperar senha da conta | O sistema deve permitir que a usuária redefina a senha da conta por meio de um link enviado ao e-mail de cadastro. | CP7 · OE3 |
| RF34 | Encerrar sessão | O sistema deve permitir que a usuária encerre sua sessão no aparelho em uso. | CP7 · OE3 |

### CP8: Perfil e preferências da usuária

| Código | Nome | Descrição | Rastreabilidade |
|---|---|---|---|
| RF35 | Realizar configuração inicial | O sistema deve conduzir a usuária, no primeiro acesso, pelas etapas de configuração do ciclo ([RF19](#cp3-acompanhamento-do-ciclo-menstrual)), de criação do bloqueio de acesso ([RF27](#cp6-proteção-e-privacidade-de-dados)) e das notificações ([RF36](#cp8-perfil-e-preferências-da-usuária)), permitindo pular etapas e retomá-las depois. | CP8 · OE3 |
| RF36 | Configurar notificações | O sistema deve permitir que a usuária ative ou desative cada tipo de notificação e defina o horário de envio. | CP8 · OE3 |
| RF37 | Editar perfil | O sistema deve permitir que a usuária altere o nome e o e-mail de cadastro. | CP8 · OE3 |

## Requisitos Não Funcionais

| Código | Nome | Descrição | Classificação | Critério verificável |
|---|---|---|---|---|
| RNF01 | Tempo de resposta da agenda | A agenda do dia deve ser exibida rapidamente após a abertura do aplicativo. | URPS+: Desempenho · Sommerville: Produto / Eficiência (desempenho) | Exibição em até 2 segundos em 95% das aberturas, em condições normais de uso. |
| RNF02 | Tempo de atualização após registro | Fase, previsão e agenda devem ser atualizadas logo após um registro de menstruação ou de check-in. | URPS+: Desempenho · Sommerville: Produto / Eficiência (desempenho) | Atualização concluída em até 1 segundo em 95% dos registros. |
| RNF03 | Disponibilidade | O serviço de conta e sincronização deve permanecer disponível para uso. | URPS+: Confiabilidade · Sommerville: Produto / Dependabilidade | Disponibilidade mínima de 99% ao mês. |
| RNF04 | Uso sem conexão | Tarefas, check-ins e registros de menstruação devem poder ser feitos sem internet e sincronizados depois, sem perda de dados. | URPS+: Confiabilidade · Sommerville: Produto / Dependabilidade | Em teste com o aparelho em modo avião, 100% dos registros são sincronizados em até 60 segundos após a reconexão. |
| RNF05 | Pontualidade das notificações | As notificações devem chegar no horário programado. | URPS+: Confiabilidade · Sommerville: Produto / Dependabilidade | Diferença máxima de 5 minutos em relação ao horário programado em 95% dos envios. |
| RNF06 | Proteção de dados sensíveis | Os dados de ciclo, sintomas, disposição e tarefas devem ser criptografados no armazenamento e na transmissão. | Sommerville: Produto / Segurança da informação | Inspeção do banco de dados e do tráfego de rede sem nenhum dado sensível legível. |
| RNF07 | Limite de tentativas de desbloqueio | O aplicativo deve resistir a tentativas repetidas de adivinhar o PIN ou a senha de pétalas. | Sommerville: Produto / Segurança da informação | Após 5 tentativas incorretas seguidas, o desbloqueio fica suspenso por 5 minutos. |
| RNF08 | Conformidade com a LGPD | Os dados de ciclo, sintomas e disposição devem ser tratados como dados pessoais sensíveis, conforme a Lei Geral de Proteção de Dados, sem compartilhamento com terceiros. | Sommerville: Externo / Legislativo | Checklist de conformidade aprovado antes de cada release: consentimento registrado, exclusão efetiva em até 15 dias após a solicitação e nenhum envio de dados a terceiros. |
| RNF09 | Confiabilidade do conteúdo de saúde | Todo conteúdo informativo sobre o ciclo deve indicar sua fonte e passar por revisão de profissional de saúde antes da publicação. | Sommerville: Externo / Ético | 100% dos conteúdos da base com fonte e revisão registradas. |
| RNF10 | Linguagem de convite | Mensagens e notificações devem usar linguagem de convite, sem mencionar ausência de registros, tarefas não concluídas ou períodos de inatividade. | URPS+: Usabilidade · Sommerville: Produto / Usabilidade | Nenhuma ocorrência dos termos da lista proibida na revisão de 100% dos textos antes de cada release. |
| RNF11 | Agilidade no registro | O check-in diário deve ser rápido de registrar. | URPS+: Usabilidade · Sommerville: Produto / Usabilidade | Em teste com usuárias, 90% concluem o check-in em até 3 interações e 30 segundos. |
| RNF12 | Acessibilidade | A interface deve seguir as diretrizes de acessibilidade WCAG 2.1. | URPS+: Usabilidade · Sommerville: Produto / Usabilidade | Nível AA atendido em auditoria automatizada e em teste com leitor de tela. |
| RNF13 | Compatibilidade de plataforma | O aplicativo deve funcionar em Android a partir da versão 8.0 e em iOS a partir da versão 13.0. | URPS+: Suportabilidade (compatibilidade) | Fluxos principais executados sem erro em aparelhos com as versões mínimas. |
