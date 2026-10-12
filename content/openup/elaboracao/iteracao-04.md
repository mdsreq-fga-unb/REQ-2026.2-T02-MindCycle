---
title: "Iteração 04"
weight: 2
---

**Status:** Em andamento

Análise e consenso, organização e validação dos requisitos: priorização, definição do MVP, matriz de rastreabilidade, DoR e DoD e organização do backlog do produto, com cada história vinculada ao requisito de origem.

Ainda em andamento: protótipo de baixa fidelidade das telas do MVP e validação por cenários de uso com a cliente.

## Análise e Consenso

Priorização MoSCoW e matriz valor de negócio × esforço técnico, base para a definição do MVP.

{{< embed src="https://embed.figma.com/board/FKc15Xurl1JujbBhzMldpl/MindCycle---Figma?node-id=246-836&embed-host=share"
          titulo="Figma — Priorização MoSCoW dos requisitos funcionais" altura="560" >}}

{{< trecho pagina="/visao/09-priorizacao-de-requisitos" secao="9.7" >}}

## Organização e Atualização

Backlog do produto e acordos de entrada e saída das histórias (DoR e DoD).

### Backlog do produto

Histórias organizadas no Notion por característica de produto e objetivo específico, cada uma vinculada ao requisito funcional de mesmo número. Todas estão com status *Backlog*; as 15 do MVP já estão alocadas às Iterações 5 e 6, da Construção.

| História | Nome | CP | OE | Alocação |
|---|---|:--:|:--:|---|
| US01 | Consultar sintomas comuns da fase | CP1 | OE1 | Iteração 5 |
| US02 | Sinalizar sobrecarga | CP1 | OE1 | Iteração 5 |
| US03 | Receber lembrete de registro | CP1 | OE1 | Backlog posterior |
| US04 | Registrar sintomas e disposição | CP1 | OE1 | Iteração 5 |
| US05 | Consultar situação atual do ciclo | CP2 | OE1 | Backlog posterior |
| US06 | Registrar início da menstruação | CP2 | OE1 | Iteração 5 |
| US07 | Informar características do ciclo | CP2 | OE1 | Backlog posterior |
| US08 | Estimar fase do ciclo por sintomas | CP2 | OE1 | Backlog posterior |
| US09 | Recomendar conteúdos sobre o ciclo | CP2 | OE1 | Backlog posterior |
| US10 | Visualizar calendário do ciclo | CP3 | OE1 | Backlog posterior |
| US11 | Proteger acesso com PIN | CP3 | OE1 | Iteração 5 |
| US12 | Aceitar termos de uso | CP3 | OE1 | Iteração 5 |
| US13 | Recomendar tarefas do dia | CP4 | OE2 | Iteração 6 |
| US14 | Receber resumo do dia | CP4 | OE2 | Backlog posterior |
| US15 | Reajustar recomendação do dia | CP5 | OE3 | Iteração 6 |
| US16 | Editar tarefa | CP5 | OE3 | Iteração 6 |
| US17 | Cadastrar tarefa | CP5 | OE3 | Iteração 6 |
| US18 | Adiar tarefa | CP5 | OE3 | Iteração 6 |
| US19 | Excluir tarefa | CP5 | OE3 | Iteração 6 |
| US20 | Concluir tarefa | CP5 | OE3 | Iteração 6 |
| US21 | Sugerir atividades de acolhimento | CP5 | OE3 | Backlog posterior |
| US22 | Receber mensagens de acolhimento | CP5 | OE3 | Iteração 6 |
| US23 | Gerar retrospectiva mensal | CP6 | OE3 | Backlog posterior |
| US24 | Registrar atividade de acolhimento | CP6 | OE3 | Backlog posterior |
| US25 | Criar conta | CP7 | OE3 | Iteração 5 |
| US26 | Recuperar acesso à conta | CP7 | OE3 | Backlog posterior |
| US27 | Conhecer a proposta do sistema | CP7 | OE3 | Backlog posterior |
| US28 | Consultar funcionamento do ciclo | CP2 | OE1 | Backlog posterior |
| US29 | Gerenciar notificações | CP7 | OE3 | Backlog posterior |
| US30 | Gerenciar medicações | CP1 | OE1 | Backlog posterior |
| US31 | Comparar relatórios mensais | CP6 | OE3 | Backlog posterior |
| US32 | Exportar relatório mensal | CP6 | OE3 | Backlog posterior |
| US33 | Registrar atividades de acolhimento favoritas | CP5 | OE3 | Backlog posterior |
| US34 | Registrar diagnósticos prévios | CP1 | OE1 | Backlog posterior |

<span class="quadro-fonte">Fonte: backlog do produto no Notion, extraído em 12/10/2026.</span>

### Definition of Ready (DoR)

No Planejamento da Iteração, só vai para a coluna *A Fazer* do quadro a história que atende a todos os critérios abaixo:

1. A história deriva de pelo menos um requisito funcional da Seção 8 e está vinculada à característica de produto e ao objetivo específico na matriz de rastreabilidade da Seção 11.
2. A prioridade da história foi confirmada pela cliente profissional de saúde e, quando a história envolve sintomas, fases do ciclo, recomendações ou mensagens relacionadas à saúde, o conteúdo também foi revisado por ela.
3. A história está registrada no backlog do Notion no formato "Como usuária, quero … para …", usa os termos do glossário da Seção 8 e não tem dúvidas em aberto após o Planejamento da Iteração, de forma que qualquer integrante consiga implementá-la sem pedir esclarecimentos.
4. A história tem critérios de aceitação objetivos e verificáveis, que incluem, quando aplicável, as condições de privacidade dos dados e a ausência de linguagem punitiva.
5. A equipe avaliou coletivamente que a história cabe em uma iteração de duas semanas, considerando os demais itens planejados, e definiu o integrante responsável. A história que não cabe é dividida antes de entrar.
6. As dependências da história foram identificadas e estão disponíveis ou planejadas para a mesma iteração, como a dependência do planejamento adaptativo das tarefas (CP4) em relação aos registros de sintomas e disposição (CP1) e do ciclo (CP2).
7. Quando a história envolve tela nova ou alterada, o protótipo de alta ou de baixa fidelidade está no Figma e vinculado à história.
8. As regras de negócio que a história deve respeitar estão identificadas e registradas junto a ela.

### Definition of Done (DoD)

Uma funcionalidade só segue para a coluna *Em Validação* quando atende a todos os critérios abaixo, e só é aceita após a validação na Revisão da Iteração:

1. Todos os critérios de aceitação da história foram cumpridos, e a funcionalidade está integrada ao incremento da iteração e pode ser demonstrada.
2. A funcionalidade respeita os requisitos não funcionais aplicáveis da Seção 8, em especial os de privacidade e proteção dos dados sensíveis (CP3).
3. Os testes unitários e de integração da funcionalidade foram escritos, executados e aprovados na integração contínua do GitHub Actions, com cobertura de 100%.
4. O código passou por revisão de pelo menos um integrante que não é o autor, via pull request no GitHub, segue os padrões de codificação da equipe e foi aprovado antes da integração.
5. Os textos e as mensagens exibidos à usuária foram revisados e não contêm termos de cobrança, culpa ou contadores de falha.
6. A história está vinculada ao requisito funcional na matriz de rastreabilidade da Seção 11, e a documentação de uso foi atualizada quando necessário.

## Vídeo da iteração

<div class="video-embed">
{{< youtube id="Je44KbpoASk" title="Elaboração — Iteração 4 (MoSCoW) — MindCycle" >}}
</div>
