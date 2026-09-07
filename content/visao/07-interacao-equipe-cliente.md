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
conjunto com a representante do cliente. Por essa razão, cada integrante acumula mais de
um papel funcional e todos participam do desenvolvimento. A programação em pares, adotada
como prática de engenharia pela equipe, reforça esse compartilhamento: nenhuma parte do
código ou dos requisitos permanece sob responsabilidade exclusiva de uma única pessoa, o
que preserva a continuidade do trabalho ao longo do semestre letivo.

A equipe de desenvolvimento será composta por:

| Papel | Descrição | Responsável |
|---|---|---|
| Gerente de Projeto<br>Analista de Requisitos<br>(Gestor do Fluxo Kanban) | Coordena o planejamento e o acompanhamento das iterações, controla prazos e entregas e mantém a comunicação com a representante do cliente. Como analista de requisitos, conduz entrevistas e workshops, redige as histórias de usuário e mantém a matriz de rastreabilidade entre objetivos específicos, características de produto e histórias. | Ana Luisa Vieira Nunes |
| Analista de Requisitos<br>Analista de Dados | Participa da elicitação e da declaração dos requisitos, escrevendo histórias de usuário e seus critérios de aceitação. Como analista de dados, modela o histórico de estado, sintomas e fases do ciclo que sustenta a adaptação do planejamento por fase de ciclo (CP3) e as recomendações personalizadas apresentadas à usuária. | Allan Kelvin Dias Gomes Monteiro |
| Gerente de Projeto<br>Desenvolvedor Backend<br>(Responsável pelo Backlog) | Divide a coordenação do projeto, facilitando as reuniões de cadência e a gestão do fluxo no quadro Kanban, e removendo impedimentos. Como desenvolvedor backend, implementa as regras de adaptação do planejamento por fase de ciclo (CP3), o controle da carga diária visível (CP5), os alertas de prazo e os mecanismos de cifragem e controle de acesso dos dados sensíveis. | Tiago Santos Bittencourt |
| Desenvolvedor Frontend<br>Analista de QA | Implementa as telas de registro de estado, de planejamento diário e do painel de padrões pessoais. Como analista de QA, escreve e mantém os testes de aceitação automatizados que a equipe adota para definir formalmente quando uma história está concluída. | Gustavo Silva Rodrigues |
| Analista de Dados<br>Analista de Requisitos | Trata e analisa os dados de estado, sintomas e execução que alimentam as janelas de capacidade e o painel de padrões. Como analista de requisitos, participa da construção das personas e das jornadas de usuário e da revisão dos critérios de aceitação. | Luana Carvalho de Almeida |
| Analista de QA<br>Analista de Dados | Executa os testes de funcionalidade, desempenho e usabilidade e verifica o cumprimento dos critérios de aceitação e do Definition of Done. Como analista de dados, valida a consistência dos dados que sustentam as recomendações apresentadas à usuária. | Pedro Ian Guedes de Carvalho |
| Desenvolvedor Frontend<br>Analista de Requisitos | Implementa componentes de interface e o fluxo de decomposição de tarefas (CP1). Como analista de requisitos, apoia a declaração das histórias e revisa a linguagem do produto para garantir a ausência de termos de cobrança no reagendamento de tarefas não concluídas. | Arthur Palhares |

<span class="quadro-fonte">**Quadro 8** – Composição da equipe e papéis. Fonte: elaborado pela equipe.</span>

## 7.2 Comunicação

### Ferramentas de Comunicação

- **WhatsApp:** Será utilizado como canal de mensagens instantâneas para comunicação
  rápida e informal entre os membros da equipe, permitindo o alinhamento imediato de
  dúvidas, avisos e ajustes pontuais no dia a dia.
- **Google Meet:** As reuniões de cadência da iteração — planejamento, revisão e
  retrospectiva — e as sessões de refinamento do backlog com o cliente serão realizadas por
  videoconferência, utilizando Google Meet. Essas reuniões permitirão a validação das
  entregas, a coleta de feedback e a discussão das próximas atividades.
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
[Quadro 7 e das considerações da Seção 6](../06-cronograma-e-entregas/#63-considerações-importantes).

- **Planejamento da Iteração:** no primeiro dia de cada iteração, com toda a equipe.
  Seleciona os itens do backlog do produto que comporão o backlog da iteração, com base na
  capacidade da equipe e na prioridade por valor de negócio.
  *(Terça-feira, de 15 em 15 dias, online pela plataforma Google Meet.)*
- **Reunião semanal de sincronização:** quinze minutos, por videoconferência ou mensagem,
  para alinhar o andamento das tarefas e expor impedimentos, sustentando a comunicação
  constante exigida pela abordagem híbrida.
  *(Toda terça-feira, presencial, às 11h50.)*
- **Refinamento do Product Backlog:** uma sessão por iteração, com a equipe e a
  representante do cliente. Os itens são detalhados, estimados e priorizados antes de
  entrarem em uma iteração.
  *(Toda quarta-feira, às 15h, online na plataforma Google Meet.)*
- **Revisão da Iteração:** no último dia da iteração, com a representante do cliente e
  usuárias representativas. Demonstra o incremento produzido e coleta o feedback, que é
  incorporado ao backlog do produto.
  *(Segunda-feira, de 15 em 15 dias, online pela plataforma Google Meet.)*
- **Retrospectiva da Iteração:** logo após a revisão, apenas com a equipe. Analisa as causas
  do que funcionou e do que falhou e ajusta o fluxo de trabalho de engenharia de requisitos.
  *(Terça-feira, de 15 em 15 dias, online pela plataforma Google Meet.)*

### Frequência de Interações com o Cliente

A abordagem híbrida exige colaboração constante com os stakeholders, princípio central
tanto do OpenUP quanto do Kanban. Como a representante do LabLivre não está co-localizada,
essa presença é substituída por pontos de contato fixos somados a canais contínuos:

- **A cada duas semanas:** Revisão da Iteração com a representante do cliente, para validar
  o incremento entregue e verificar se a solução reduz a sobrecarga sem gerar nova cobrança.
- **A cada duas semanas:** participação da representante do cliente na sessão de refinamento
  do backlog do produto, definindo a prioridade por valor de negócio.
- **A cada release:** workshop com o LabLivre e com usuárias representativas dos segmentos
  definidos na [Seção 1.7](../01-cenario-atual/#17-segmentação-de-clientes), para elicitar os
  requisitos da próxima release e observar os efeitos emergentes previstos na
  [Seção 3](../03-intervencao-social/).
- **Contínuo:** canal assíncrono no WhatsApp e comentários no Notion para as dúvidas de
  detalhe que a colaboração direta resolveria em conversa. Toda decisão tomada por esse
  canal é registrada no backlog, para não se perder fora do documento.
- **Sob demanda:** escrita conjunta dos critérios de aceitação das histórias que tocam dados
  sensíveis, com a representante do cliente, conforme os testes de aceitação adotados pela
  equipe.

## 7.3 Processo de Validação

O processo de validação da solução será realizado em três etapas principais:

1. Para iniciar o desenvolvimento de uma funcionalidade, o **Definition of Ready (DoR)**
   será utilizado, verificando se os requisitos estão claramente definidos, se há
   documentação e se todos os critérios de aceitação estão estabelecidos.
2. O **Definition of Done (DoD)** será utilizado, onde a funcionalidade será considerada
   pronta apenas se passar pelos testes unitários e de integração, e houver aprovação visual
   e funcional pelos membros da equipe e pelo cliente.
3. Após a validação interna, o produto será entregue ao cliente para **testes de aceitação**.
   Durante essa fase, o cliente irá verificar se o sistema atende aos requisitos
   estabelecidos. Cada funcionalidade será validada com base nos critérios de aceitação
   definidos durante o DoR.

{{< notice type="info" title="DoR e DoD detalhados" >}}
Os critérios que compõem o DoR e o DoD serão declarados na **Seção 9**, entregue na
**Unidade 2**.
{{< /notice >}}
