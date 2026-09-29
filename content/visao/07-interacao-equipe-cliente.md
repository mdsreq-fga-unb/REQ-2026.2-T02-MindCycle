---
title: "7. Interação entre Equipe e Cliente"
numero: "7"
weight: 7
resumo: "Quem faz o quê na equipe, por quais canais e com que frequência o cliente participa, e como as entregas são validadas."
---

## 7.1 Composição da Equipe

A abordagem híbrida pressupõe equipes pequenas, auto-organizadas e com papéis flexíveis.
O OpenUP define um conjunto enxuto de papéis, como Analista, Desenvolvedor, Testador e
Gerente de Projeto; e o Kanban não impõe papéis adicionais, concentrando-se na gestão do
fluxo de trabalho; a responsabilidade pelo backlog do produto é exercida pela equipe em
conjunto com a cliente profissional de saúde, que possui a decisão final sobre a
priorização. A cliente também realiza a aceitação formal das entregas, considerando a
análise técnica da equipe e a perspectiva de uso apresentada por Daniela Soares, na
condição de usuária representativa. Por essa razão, cada integrante acumula mais de um
papel funcional e todos participam do desenvolvimento. A programação em pares, adotada
como prática de engenharia pela equipe, reforça esse compartilhamento: nenhuma parte do
código ou dos requisitos permanece sob responsabilidade exclusiva de uma única pessoa, o
que preserva a continuidade do trabalho ao longo do semestre letivo.

A equipe de desenvolvimento será composta por:

| Papel | Descrição | Responsável |
|---|---|---|
| Gerente de Projeto<br>Analista de Requisitos<br>(Gestor do Fluxo Kanban) | Coordena o planejamento e o acompanhamento das iterações, controla prazos e entregas e mantém a comunicação com a representante do cliente. Como analista de requisitos, conduz entrevistas e workshops, redige as histórias de usuário e mantém a matriz de rastreabilidade entre objetivos específicos, características de produto e histórias. | Ana Luisa Vieira Nunes |
| Analista de Requisitos<br>Analista de Dados | Participa da elicitação e da declaração dos requisitos, escrevendo histórias de usuário e seus critérios de aceitação. Como analista de dados, modela o histórico de estado, sintomas e fases do ciclo que sustenta o planejamento adaptativo das tarefas (CP4) e as recomendações personalizadas apresentadas à usuária. | Allan Kelvin Dias Gomes Monteiro |
| Gerente de Projeto<br>Desenvolvedor Backend<br>(Responsável pelo Backlog) | Divide a coordenação do projeto, facilitando as reuniões de cadência e a gestão do fluxo no quadro Kanban, e removendo impedimentos. Como desenvolvedor backend, implementa as regras do planejamento adaptativo das tarefas (CP4), o reajuste da carga diária por disposição (CP5), os alertas de prazo e os mecanismos de cifragem e controle de acesso dos dados sensíveis. | Tiago Santos Bittencourt |
| Desenvolvedor Frontend<br>Analista de QA | Implementa as telas de registro de estado, de planejamento diário e do painel de padrões pessoais. Como analista de QA, escreve e mantém os testes de aceitação automatizados que a equipe adota para definir formalmente quando uma história está concluída. | Gustavo Silva Rodrigues |
| Analista de Dados<br>Analista de Requisitos | Trata e analisa os dados de estado, sintomas e execução que alimentam as janelas de capacidade e o painel de padrões. Como analista de requisitos, participa da construção das personas e das jornadas de usuário e da revisão dos critérios de aceitação. | Luana Carvalho de Almeida |
| Analista de QA<br>Analista de Dados | Executa os testes de funcionalidade, desempenho e usabilidade e verifica o cumprimento dos critérios de aceitação e do Definition of Done. Como analista de dados, valida a consistência dos dados que sustentam as recomendações apresentadas à usuária. | Pedro Ian Guedes de Carvalho |
| Desenvolvedor Frontend<br>Analista de Requisitos | Implementa componentes de interface e o fluxo de registro de sintomas e disposição (CP1). Como analista de requisitos, apoia a declaração das histórias e revisa a linguagem do produto para garantir a ausência de termos de cobrança no reagendamento de tarefas não concluídas. | Arthur Palhares |

## 7.2 Comunicação

### Ferramentas de Comunicação

- **WhatsApp:** Será utilizado como canal de mensagens instantâneas para comunicação
  rápida e informal entre os membros da equipe, permitindo o alinhamento imediato de
  dúvidas, avisos e ajustes pontuais no dia a dia.
- **Google Meet:** As reuniões de cadência da iteração e as reuniões mensais separadas com
  a cliente profissional de saúde e com a usuária representativa serão realizadas por
  videoconferência. Esses encontros permitirão a demonstração e a validação das entregas,
  a coleta de feedback e a discussão das próximas atividades.
- **Notion:** Será a ferramenta de gerenciamento do backlog, controle de tarefas e
  acompanhamento do progresso de cada iteração. Ela permitirá que tanto a equipe quanto o
  cliente visualizem o andamento do projeto e participem ativamente do processo de
  priorização das funcionalidades.

### Métodos e Frequência de Reuniões

O trabalho é organizado em iterações de duas semanas, cadência fixa alinhada ao calendário
da disciplina e compatível com as iterações curtas do OpenUP. O Kanban gerencia o fluxo de
trabalho dentro e entre as iterações por meio do quadro visual e dos limites de trabalho em
progresso (WIP). Cada iteração começa com uma reunião de planejamento e termina com uma
revisão e uma retrospectiva, permitindo inspeção e adaptação contínuas. A única exceção é a
Iteração 7, de uma semana, cuja duração e justificativa constam do
[Quadro 7 e das considerações da Seção 6](../06-cronograma-e-entregas/#considerações-importantes).

- **Planejamento da Iteração:** no primeiro dia de cada iteração, com toda a equipe.
  Seleciona os itens do backlog do produto que comporão o backlog da iteração, com base na
  capacidade da equipe e na prioridade por valor de negócio.
  *(Terça-feira, de 15 em 15 dias, online pela plataforma Google Meet.)*
- **Reunião semanal de sincronização:** quinze minutos, por videoconferência ou mensagem,
  para alinhar o andamento das tarefas e expor impedimentos, sustentando a comunicação
  constante exigida pela abordagem híbrida.
  *(Toda terça-feira, presencial, às 11h50.)*
- **Refinamento do Product Backlog:** uma sessão por iteração, conduzida pela equipe. Os
  itens são detalhados e estimados antes de entrarem em uma iteração, e a prioridade final
  é confirmada pela cliente profissional de saúde em sua reunião mensal.
  *(Toda quarta-feira, às 15h, online na plataforma Google Meet.)*
- **Revisão da Iteração:** no último dia da iteração, demonstra o incremento produzido e
  coleta o feedback, que é incorporado ao backlog do produto. A participação externa é
  alternada: em uma revisão participa a cliente profissional de saúde e, na seguinte,
  Daniela Soares, como usuária representativa, sem reunião conjunta.
  *(Segunda-feira, de 15 em 15 dias, online pela plataforma Google Meet.)*
- **Retrospectiva da Iteração:** logo após a revisão, apenas com a equipe. Analisa as causas
  do que funcionou e do que falhou e ajusta o fluxo de trabalho de engenharia de requisitos.
  *(Terça-feira, de 15 em 15 dias, online pela plataforma Google Meet.)*

### Participação da Cliente e da Usuária Representativa

A cliente principal será uma profissional de saúde, com nome a definir. Ela participará de
uma reunião mensal de revisão por Google Meet, na qual avaliará as entregas, confirmará a
priorização do backlog e analisará os conteúdos relacionados à saúde. Sob demanda, também
revisará critérios de aceitação, textos e recomendações dessa natureza antes da aceitação
da funcionalidade.

Daniela Soares participará como usuária representativa em outra reunião mensal de revisão,
separada da reunião com a cliente. Sua participação fornecerá a perspectiva de uso sobre
usabilidade, linguagem, privacidade e experiência com a solução. Assim, haverá duas
reuniões externas por mês: uma com a cliente profissional de saúde e outra com a usuária
representativa.

Quando uma das participantes não puder comparecer, a equipe disponibilizará a demonstração
e um roteiro de verificação de forma assíncrona. O retorno e as decisões serão registrados
no espaço de acompanhamento do projeto antes do planejamento seguinte.

### Autoridade Decisória

- A priorização final do backlog cabe à cliente profissional de saúde, após considerar a
  perspectiva de uso apresentada por Daniela Soares e a análise de esforço e viabilidade
  técnica realizada pela equipe.
- A aceitação formal de cada funcionalidade cabe à cliente profissional de saúde, após a
  equipe comprovar o cumprimento do Definition of Done (DoD).
- Daniela Soares pode reprovar uma funcionalidade quanto a usabilidade, linguagem,
  privacidade e experiência de uso, fazendo com que o item retorne ao backlog para ajuste.
- Somente a cliente profissional de saúde pode aprovar ou reprovar declarações e
  recomendações relacionadas à saúde.
- Nas divergências, questões de saúde seguem a decisão da cliente e questões de experiência
  de uso seguem a avaliação da usuária representativa. Quando a divergência envolver ambos
  os domínios, o item retorna ao backlog para refinamento conjunto e não é aceito até que a
  decisão seja registrada.

## 7.3 Processo de Validação

O processo distingue preparação, verificação e validação, evitando tratar o DoR e o DoD
como etapas de validação:

1. **Preparação pelo Definition of Ready (DoR):** antes de entrar em uma iteração, a equipe
   verifica se o item está claro, rastreável, documentado, sem impedimentos conhecidos e
   com critérios de aceitação definidos. Quando houver conteúdo relacionado à saúde, o item
   também deverá estar revisado pela cliente profissional de saúde. O DoR indica que o item
   está preparado para desenvolvimento, mas não valida a solução.
2. **Verificação pelo Definition of Done (DoD):** após a implementação, a equipe verifica
   se a funcionalidade atende aos requisitos funcionais e não funcionais aplicáveis, aos
   critérios de aceitação, aos testes acordados e à documentação necessária. O DoD demonstra
   que o trabalho cumpre as condições de conclusão estabelecidas, sem substituir a validação
   com os stakeholders.
3. **Validação com os stakeholders:** ocorre nas Revisões de Iteração, em reuniões separadas
   e alternadas por Google Meet. A cliente profissional de saúde avalia a funcionalidade em
   relação aos critérios de saúde, realiza a aceitação formal e pode reprovar declarações
   relacionadas à saúde. Daniela Soares avalia usabilidade, linguagem, privacidade e
   experiência de uso, podendo solicitar ajustes nesses aspectos. Os feedbacks e as
   divergências retornam ao backlog para refinamento, e a funcionalidade não é aceita
   enquanto houver divergência não resolvida.

