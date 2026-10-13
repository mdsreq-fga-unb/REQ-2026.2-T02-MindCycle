---
title: "14.2 Lições Aprendidas — Unidade 2"
numero: "14.2"
weight: 14
resumo: "Dificuldades enfrentadas pela equipe na Unidade 2 e as ações de melhoria adotadas."
---

## Lição 1: Consistência dos requisitos entre as seções do documento

**Dificuldade observada:** A equipe teve dificuldade em manter os requisitos consistentes entre as seções do documento. As Seções 8 a 12 foram escritas em paralelo, por integrantes diferentes, e cada uma acabou usando a sua própria versão dos objetivos, das características e dos requisitos. Chegaram a conviver três conjuntos de características (CP1 a CP6 na Seção 2.3, CP1 a CP8 na Seção 8 e CP1 a CP7 no quadro do Figma), o mesmo número de RF com significados diferentes em páginas diferentes, totais de requisitos distintos (27, 29 e 34 RFs) e um MVP no cronograma diferente do MVP da Seção 10.

**Causa:** A equipe não definiu, antes de começar a redação, qual artefato seria a fonte oficial dos requisitos, nem uma regra para criar e numerar requisitos novos. Os requisitos acrescentados depois da extração da Matriz de Rastreabilidade receberam números escolhidos dentro de cada seção, e as mudanças feitas em uma página não eram levadas às demais páginas que citavam os mesmos identificadores. Com isso, a dificuldade registrada na Lição 2 da [Unidade 1](../14-1-licoes-aprendidas-unidade-1/) voltou a aparecer, agora concentrada nos requisitos.

**Impacto no projeto:** O documento precisou de duas rodadas de realinhamento geral na Unidade 2. A primeira, ao incorporar as Seções 9 a 11, realinhou as Seções 2 e 4 a 8; a segunda, às vésperas da Entrega 2, corrigiu oito inconsistências entre as Seções 6, 8, 9, 10 e 11, as páginas das Iterações 3 e 4 e o README. Além do retrabalho, a divergência deixou fora do catálogo e do backlog, até a segunda rodada, um requisito obrigatório pela LGPD: a exclusão da conta e dos dados, hoje RF36.

**Como foi (ou não) superada:** Foi superada no documento publicado. A Matriz de Rastreabilidade de Requisitos v1.0 passou a ser a fonte oficial dos identificadores, e ficou definido que um RF novo recebe sempre o próximo número livre do catálogo da Seção 8, nunca um número já usado em outra seção. Por isso os requisitos novos da Seção 9 foram renumerados para RF35 e RF36 ([Seção 9.9](../09-priorizacao-de-requisitos/#reavaliacao-acrescentados)). O README do repositório passou a registrar o conjunto válido de cada nível e a lista de arquivos a conferir quando um identificador muda. A atualização do backlog no Notion com a mesma alocação ficou como encaminhamento da [Seção 10.4.3](../10-mvp/).

**Aprendizado resultante:** Quando várias pessoas escrevem em paralelo seções que citam os mesmos identificadores, a consistência não pode depender de uma revisão feita no fim. Ela exige uma fonte única definida antes da redação, regras explícitas para criar e numerar requisitos e a propagação de cada mudança a todos os lugares que a citam, no mesmo momento em que ela é feita.

**Ações concretas de melhoria:**

1. Tratar o catálogo da Seção 8 como fonte única: toda criação, exclusão ou renumeração de requisito é feita primeiro nele e só depois levada às demais seções.
2. Em toda alteração de identificador, percorrer a lista de arquivos do README, incluindo o backlog do Notion, e atualizá-los no mesmo pull request. O revisor só aprova depois de conferir essa lista.
3. Fazer a revisão cruzada de consistência (total de RFs, significado de cada identificador e composição do MVP) ao fim de cada iteração, e não apenas antes da entrega.

**Responsável e Prazo:** Analistas de Requisitos, com revisão de toda a equipe nos pull requests. As ações 1 e 2 valem a partir da Iteração 5 (13/10/2026), e a ação 3, ao fim de cada iteração, até o fim do semestre.

**Forma de verificar se a ação funcionou:** A ação será considerada eficaz se, na Entrega 3, o total de RFs, o significado de cada identificador e a composição do MVP forem os mesmos em todas as seções, nas páginas das iterações e no Notion, sem que seja necessária uma nova rodada de correção de consistência antes da entrega.

## Lição 2: Dificuldade de contato com a cliente

**Dificuldade observada:** A equipe teve dificuldade em conseguir horários com a cliente, a Dra. Cláudia Araújo Bottino. Por ser uma profissional de saúde muito requisitada, com a agenda lotada de compromissos, as janelas disponíveis para reuniões com a equipe foram poucas. A reunião de validação da priorização só pôde acontecer em 05/10/2026, já na Iteração 4, perto do fechamento da Entrega 2, e a reunião de acompanhamento, para validar o MVP consolidado, está prevista apenas para o final de outubro ou o início de novembro de 2026.

**Causa:** A disponibilidade da cliente é limitada pelos compromissos profissionais dela, algo fora do controle da equipe. O processo definido na [Seção 7](../07-interacao-equipe-cliente/), porém, depende dela em vários pontos: a reunião mensal de revisão, a decisão final sobre a priorização, a aceitação formal das entregas e a revisão dos conteúdos de saúde. Com tantas decisões concentradas em uma pessoa de agenda tão restrita, cada atraso para encontrar um horário atrasa também as validações.

**Impacto no projeto:** Com pouco tempo de contato, a validação ficou incompleta. Apenas 14 dos 36 RFs têm valor de negócio confirmado pela cliente; os demais, incluindo os RF28 a RF34, que ela mesma pediu, seguem como hipótese da equipe ([Seção 9.4](../09-priorizacao-de-requisitos/#avaliacao-valor-negocio)). A conversa se concentrou no conteúdo clínico e não chegou a tratar da privacidade dos dados (CP3) nem da conta da usuária (CP7). O MVP consolidado ainda não foi apresentado a ela, de modo que a Seção 10 não pode ser considerada fechada, e sete histórias da Iteração 5 ainda dependem da confirmação de prioridade exigida pelo item 2 do [DoR](../12-dor-e-dod/).

**Como foi (ou não) superada:** Foi contornada, mas ainda não superada. Para aproveitar ao máximo a reunião de 05/10/2026, a equipe preparou um roteiro de perguntas por característica de produto ([Seção 9.8.1](../09-priorizacao-de-requisitos/#roteiro-validacao)) e registrou com transparência o que foi e o que não foi validado, na coluna *Confirmado* da Seção 9.4. Para as notas que seguem em hipótese, adotou medidas que mantêm as decisões auditáveis e reversíveis até a próxima validação: critérios de valor fixados antes das notas, justificativa individual por requisito e separação entre o que depende e o que não depende da cliente ([Seção 10.4.2](../10-mvp/)). A dificuldade só será superada quando a reunião de acompanhamento validar o MVP consolidado.

**Aprendizado resultante:** Com uma cliente de agenda tão disputada, cada contato é um recurso escasso e precisa ser planejado. As datas devem ser garantidas com antecedência, e o tempo de reunião deve ir para o que só a cliente pode decidir, como o valor de negócio e os conteúdos de saúde. O que a equipe decide sozinha, como o esforço técnico, e o que cabe à usuária representativa, como usabilidade e linguagem, não deve ocupar esse tempo. Um canal assíncrono para validações pontuais reduz a dependência de reuniões.

**Ações concretas de melhoria:**

1. Agendar com a cliente, de uma só vez, todas as reuniões que restam no semestre: a reunião de acompanhamento, para validar o MVP consolidado, as revisões de iteração em que ela participa e a homologação da Iteração 7.
2. Enviar à cliente a pauta e um resumo curto dos itens a validar com pelo menos três dias de antecedência, ordenados pelo que bloqueia a próxima iteração: a prioridade das histórias da iteração seguinte e as notas dos RFs do MVP ainda em hipótese.
3. Combinar com a cliente um canal assíncrono, como mensagens ou um formulário curto, para validações pontuais de notas de RFs e de textos de saúde, sem depender de reunião síncrona.
4. Atualizar as Seções 9.4, 9.8 e 10.4.1 logo após cada contato, registrando o que passou de hipótese a validado.

**Responsável e Prazo:** Gerente de Projeto responsável pela comunicação com a cliente, com apoio dos Analistas de Requisitos. As ações 1 e 3 devem ser concluídas na primeira semana da Iteração 5 (até 20/10/2026), e as ações 2 e 4 valem para todos os contatos com a cliente até o fim do semestre.

**Forma de verificar se a ação funcionou:** A ação será considerada eficaz se as reuniões agendadas acontecerem nas datas combinadas, se o MVP consolidado for validado pela cliente na reunião de acompanhamento e se, ao fim da Unidade 3, nenhum RF do MVP permanecer com valor de negócio em hipótese.
