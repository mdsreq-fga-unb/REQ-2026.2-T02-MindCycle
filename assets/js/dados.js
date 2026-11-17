// ===== Dados do MindCycle =====
//
// Fonte única do que as páginas mostram sobre requisitos: histórias, RNFs,
// reuniões, histórico, fases e cronograma. A árvore, o MVP, a priorização,
// as reuniões, o histórico, o backlog e o cronograma são montados a partir daqui —
// mudar um dado aqui muda todas as páginas que o usam.
//
// Os textos corridos de cada página (Visão de produto, Engenharia de
// requisitos, DoR e DoD, Lições aprendidas) ficam no HTML da própria página.

const DADOS = {
  // Iteração em andamento. Muda a cada duas semanas, junto com o cronograma
  // (cronograma, abaixo) e o estado das iterações (fases[].iteracoes).
  iteracaoAtual: 6,

  // Histórias que já atenderam ao DoR. Não edite: a lista é calculada no fim
  // deste arquivo a partir de aplicacaoDor. Essa prontidao e independente
  // da presenca no backlog e da alocacao a uma iteracao.
  dorAtendido: [],

  // Critérios do DoR, compartilhados pela página DoR e DoD e pelos modais.
  // O ID é o número que a página mostra e identifica os resultados em
  // aplicacaoDor: ao mudar um critério de lugar, mude também os resultados.
  // admiteExcecao: true marca o critério que pode ficar em NÃO com exceção
  // autorizada no Planejamento; hoje nenhum admite.
  dorCriterios: [
    {
      id: '1',
      titulo: 'Rastreável',
      descricao: 'Deriva de um requisito funcional e está vinculada à característica e ao objetivo.',
      conferencia: 'A história aparece na árvore, sob uma característica ligada a um objetivo específico.',
      admiteExcecao: false
    },
    {
      id: '2',
      titulo: 'História de usuário declarada corretamente',
      descricao: 'Escrita como "Como usuária, quero … para …", com o ator, a ação e o benefício.',
      conferencia: 'Leitura da história no Planejamento: o ator, a ação e o benefício estão presentes e a ação descreve um objetivo só.',
      admiteExcecao: false
    },
    {
      id: '3',
      titulo: 'Critérios de aceitação',
      descricao: 'Objetivos e verificáveis, incluindo privacidade e ausência de linguagem punitiva.',
      conferencia: 'A história tem critérios registrados e cada um pode ser verificado sem interpretação.',
      admiteExcecao: false
    },
    {
      id: '4',
      titulo: 'Protótipo',
      descricao: 'Tela nova ou alterada tem protótipo vinculado.',
      conferencia: 'A história aparece em pelo menos uma tela do protótipo de baixa fidelidade do site, ou N/A quando não há tela.',
      admiteExcecao: false
    },
    {
      id: '5',
      titulo: 'Priorização feita',
      descricao: 'Tem nota MoSCoW e esforço consolidado registrados na priorização.',
      conferencia: 'A história aparece na página Priorização de requisitos com a nota MoSCoW e o esforço consolidado.',
      admiteExcecao: false
    },
    {
      id: '6',
      titulo: 'Requisito não funcional atribuído coerentemente',
      descricao: 'Os RNFs ligados à história são os que se aplicam ao que ela faz, e nenhum RNF aplicável ficou de fora.',
      conferencia: 'Os RNFs da história na árvore conferem com o que ela faz; RNF10 e RNF11 valem para todas.',
      admiteExcecao: false
    }
  ],

  // Aplicação do DoR por história, preenchida no Planejamento da Iteração.
  // Cada critério recebe resultado 'SIM', 'NÃO', 'N/A' ou 'Não conferido',
  // e motivo sempre que não for SIM. Exemplo:
  //   HU02: {
  //     conferencia: 'Planejamento da Iteração 6, em 03/11/2026',
  //     criterios: {
  //       '1': { resultado: 'SIM' },
  //       '6': { resultado: 'NÃO', motivo: 'Falta ligar o RNF de tempo de resposta.' }
  //     }
  //   }
  // Um critério com admiteExcecao (hoje nenhum) aceita NÃO com
  // excecao: { autorizadaPor, risco, prazo }, os três preenchidos.
  // A situação da história (Pronta, Pronta com exceção, Não pronta ou Não
  // conferida) é calculada no fim deste arquivo.
  aplicacaoDor: {
    // Iteração 6
    HU01: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP1.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Tela Seu ciclo no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03: mostra os sintomas da fase atual da usuária, calculada a partir dos dados do ciclo dela, como a HU09. Incluído em 16/11/2026.' }
      }
    },
    HU02: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP1.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '3 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Hoje e Dia reajustado no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 2,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF04, RNF08, RNF02, RNF03 e RNF07. O RNF02 entrou em 16/11/2026: a sinalização grava um dado de saúde, como a disposição da HU04.' }
      }
    },
    HU04: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP1.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '4 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Hoje e Registro do dia no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 2,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF02, RNF03, RNF04, RNF08 se aplicam ao que a história faz.' }
      }
    },
    HU05: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP2.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '3 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Hoje e Seu ciclo no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Could have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU06: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP2.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '3 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Sobre o seu ciclo e Seu ciclo no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF02, RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU07: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP2.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '2 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Sobre o seu ciclo e Eu no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF02, RNF03 se aplicam ao que a história faz.' }
      }
    },
    // Iteração 7
    HU09: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP2.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Telas Seu ciclo e Conteúdo sobre o ciclo no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU28: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP2.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Tela Conteúdo sobre o ciclo no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'Conteúdo informativo, igual para todas: só os transversais (RNF10 e RNF11) se aplicam.' }
      }
    },
    // Iteração 6
    HU11: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP3.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '2 critérios registrados, verificáveis. O PIN de pétalas tem 6 pétalas e é o padrão; o numérico é opção a mais (PR #96).' },
        '4': { resultado: 'SIM', motivo: 'Telas PIN e Eu no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 e RNF09 se aplicam ao PIN. O PIN de pétalas atende ao RNF09; o numérico é opção a mais.' }
      }
    },
    HU12: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP3.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '2 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Criar conta e Termos de uso e Eu no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF02 se aplicam ao que a história faz.' }
      }
    },
    HU36: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP3.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'NÃO', motivo: 'A história não tem critérios de aceitação registrados.' },
        '4': { resultado: 'SIM', motivo: 'Telas Eu e Excluir conta e dados no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF02, RNF03 se aplicam ao que a história faz.' }
      }
    },
    // Iteração 7
    HU13: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP4.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '2 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Tela Hoje no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 2,7, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF06, RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU15: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '2 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Tela Dia reajustado no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 2,7, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF07, RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU16: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Telas Nova tarefa e Detalhe da tarefa no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU17: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Telas Tarefas e Nova tarefa no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU18: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '3 critérios registrados, verificáveis.' },
        '4': { resultado: 'SIM', motivo: 'Telas Detalhe da tarefa e Adiar tarefa no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU19: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Telas Detalhe da tarefa e Excluir tarefa no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU20: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Telas Tarefas e Detalhe da tarefa no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU21: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Tela Acolhimento no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 2,0, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'As sugestões dependem só da data, sem dado da usuária: só os transversais se aplicam.' }
      }
    },
    HU22: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP5.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Telas Hoje e Dia reajustado no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,7, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'A mensagem depende só da data, sem dado da usuária: só os transversais se aplicam.' }
      }
    },
    // Iteração 6
    HU25: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP7.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Tela Criar conta no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Must have, esforço 1,3, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    },
    HU26: {
      conferencia: 'Verificação de 16/11/2026 no DoR revisado, a partir dos dados do site',
      criterios: {
        '1': { resultado: 'SIM', motivo: 'Na árvore, sob a CP7.' },
        '2': { resultado: 'SIM', motivo: 'No formato "Como usuária, quero … para …", com ator, ação e benefício.' },
        '3': { resultado: 'SIM', motivo: '1 critério registrado, verificável.' },
        '4': { resultado: 'SIM', motivo: 'Tela Recuperar acesso no protótipo de baixa fidelidade.' },
        '5': { resultado: 'SIM', motivo: 'Should have, esforço 1,7, na Priorização.' },
        '6': { resultado: 'SIM', motivo: 'RNF03 se aplicam ao que a história faz.' }
      }
    }
  },

  // Critérios gerais compartilhados pela página e pelos modais.
  // Preserve os IDs ao editar textos ou reordenar, pois identificam resultados.
  dodCriterios: [
    {
      id: '1',
      titulo: 'Aceitação da história',
      descricao: 'Todos os critérios de aceitação da história foram cumpridos, e a funcionalidade está integrada ao incremento da iteração e pode ser demonstrada. Por enquanto, os critérios de tempo de resposta ficam fora, como no critério 2.',
      protocolo: 'Verificar os fluxos principais, alternativos e as exceções dos critérios de aceite.'
    },
    {
      id: '2',
      titulo: 'Requisitos não funcionais',
      descricao: 'A funcionalidade atende a todos os requisitos não funcionais aplicáveis à história, conforme a árvore de requisitos. A conclusão técnica exige evidência de que cada requisito aplicável foi atendido. Por enquanto, ficam fora do DoD os RNFs de tempo de resposta (RNF06, RNF07 e RNF08), até a equipe escolher uma ferramenta para medi-los, e o ensaio em aparelho Android físico do RNF10.',
      protocolo: 'Verificar os requisitos aplicáveis: {rnfs}.'
    },
    {
      id: '3',
      titulo: 'Testes e verificações',
      descricao: 'Os testes unitários e de integração da história passaram na integração contínua do GitHub Actions. A evidência é o doc de qualidade da história (docs/qualidade, na main) ou o próprio PR, com o CI verde e os testes listados.',
      protocolo: 'Registrar o PR com o CI verde e, quando houver, o doc de qualidade da história.'
    },
    {
      id: '4',
      titulo: 'Revisão de código',
      descricao: 'O código foi aprovado por pelo menos um integrante que não é o autor, no pull request do GitHub ou no grupo do WhatsApp da equipe, antes da integração, e segue os padrões de codificação da equipe. Depois da aprovação, o próprio autor pode fazer o merge.',
      protocolo: 'Registrar quem aprovou e onde: a aprovação no PR do GitHub ou a mensagem no WhatsApp.'
    },
    {
      id: '5',
      titulo: 'Linguagem acolhedora',
      descricao: 'Os textos e as mensagens exibidos à usuária não contêm termos de cobrança, culpa ou contadores de falha.',
      protocolo: 'Revisar os textos e as mensagens da história.'
    },
    {
      id: '6',
      titulo: 'Rastreabilidade',
      descricao: 'A história está vinculada ao requisito funcional na árvore de requisitos, e a documentação de uso foi atualizada quando necessário.',
      protocolo: 'Conferir os vínculos na árvore e a documentação de uso.'
    }
  ],

  // O modal apresenta critérios não verificados para toda história do MVP.
  // Registre aqui os resultados reais por HU e pelo ID estável do critério.
  // Exemplo de criterios: { '1': { resultado: 'Aprovado', data: 'DD/MM/AAAA',
  // evidencia: 'Referência da evidência' } }. No critério 4, `revisor` diz quem aprovou.
  // Versão e avaliação externa ficam no registro da HU.
  aplicacaoDod: {
    HU01: {
      versao: 'PR #119, commit 8cf089d',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'sintomas-da-fase.spec.tsx: "lista os sintomas comuns da fase estimada de hoje"; a fase vem de GET /ciclo no fuso da usuária (ciclo.e2e-spec.ts, "conta os dias no calendário do fuso").' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: GET /ciclo só devolve a conta da sessão (ciclo.e2e-spec.ts, a consulta da outra conta vem vazia) e exige sessão (401). RNF11: inkSoft sobre ground 5,18 (tema.ts).' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #119 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', revisor: 'Ana Luisa', data: '16/11/2026', evidencia: 'Aprovação no PR #119 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo.sintomasDaFase: "algumas pessoas sentem", sem cobrança, culpa ou contador de falha.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP1, ligada à issue da história no quadro.' }
      }
    },
    HU02: {
      versao: 'PR #113, commit 9333e05',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Critério 1: sobrecarga.e2e-spec.ts "pode ser feita mais de uma vez no dia" e "sem registro no dia, a recomendação considera disposição baixa" (readequação pela HU15). Critério 2: cartao-sobrecarga.spec.tsx "conclui em 2 toques". Critério 3, de tempo, fora do DoD.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF04: cartao-sobrecarga.spec.tsx "a partir da aba Hoje, conclui em 2 toques". RNF02: sobrecarga.e2e-spec.ts "sem o aceite, responde 403". RNF03: "a sinalização de uma conta não muda a disposição da outra". RNF11: tema.ts.' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #113 com o CI verde e docs/qualidade/hu02-sinalizar-sobrecarga.md na main.' },
        '4': { resultado: 'Aprovado', revisor: 'Luana Carvalho', data: '16/11/2026', evidencia: 'Aprovação no PR #113 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, bloco sobrecarga: "Você pode avisar a qualquer hora", "Tudo bem, anotado. Vá no seu ritmo"; sem cobrança nem culpa.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP1, ligada à issue da história no quadro.' }
      }
    },
    HU04: {
      versao: 'PR #100, commit 667ad11',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Critérios 1 e 2: checkin.e2e-spec.ts "registra sintomas com intensidade e disposição", "registra sem sintomas com a disposição", "com dois registros no mesmo dia, o mais recente é o vigente" e o bloco "correção". Critério 3 por inspeção (RNF04). Critério 4, de tempo, fora do DoD.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF02: checkin.e2e-spec.ts "sem o aceite, POST e PUT respondem 403". RNF03: "nega a correção do registro de outra conta". RNF04: na aba Hoje o formulário já abre; disposição, Sem sintomas e Registrar = 3 toques (formulario-checkin.tsx). RNF11: tema.ts.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #100 entrou com o CI vermelho; a main voltou ao verde no commit 96febb5 e segue verde com os testes da HU04.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, bloco checkin: "Registre quando quiser", "Obrigada por se escutar"; sem cobrança, culpa nem contador.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP1, ligada à issue da história no quadro.' }
      }
    },
    HU05: {
      versao: 'PR #117, commit 58e3ec6',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Reprovado', data: '16/11/2026', evidencia: 'Critério 1 exige "modelo de cálculo validado", e o modelo não foi validado pela cliente (decisão do grupo no PR #122, aberto). Critérios 2 e 3 passam em ciclo.e2e-spec.ts (situação do ciclo, HU05).' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: ciclo.e2e-spec.ts, "acesso exclusivo da usuária": outra conta recebe 403 e a consulta dela não mostra os dados alheios. RNF11: tinta e inkSoft sobre os fundos da situação passam de 4,5 (tema.ts).' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #117 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', revisor: 'Ana Luisa', data: '16/11/2026', evidencia: 'Aprovação no PR #117 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo.situacao: sem termos de cobrança, culpa ou contador de falha.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP2, ligada à issue da história no quadro.' }
      }
    },
    HU06: {
      versao: 'PR #94, commit b146cc7',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'ciclo.e2e-spec.ts: "registra e lista" (critério 2), "não grava nada antes do aceite dos termos" (3) e "acompanha a mudança das entradas" (1, entrada da HU05).' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF02: ConsentGuard no POST /ciclo/inicios, e2e "consentimento (RNF02)" e cascata na exclusão da usuária. RNF03: e2e de acesso negado a outra conta. RNF11: cores de tema.ts acima de 4,5.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #94 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo (registro do início e formulário): sem termos de cobrança, culpa ou contador de falha.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP2, ligada à issue da história no quadro.' }
      }
    },
    HU07: {
      versao: 'PR #94, commit b146cc7',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'ciclo.e2e-spec.ts: "guarda a duração média", "guarda o ciclo irregular sem duração", "recusa duração inválida"; formulario-ciclo.spec.tsx exige duração ou ciclo irregular.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF02: ConsentGuard no PUT /ciclo/perfil e e2e "consentimento (RNF02)"; cascata do perfil. RNF03: "registrar e informar só afetam a conta da sessão". RNF11: cores de tema.ts acima de 4,5.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #94 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo (formulário): sem termos de cobrança, culpa ou contador de falha.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP2, ligada à issue da história no quadro.' }
      }
    },
    HU09: {
      versao: 'PR #120, commit ce7beb9',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'conteudos.spec.ts: "só recomenda conteúdo ligado à fase ou a um sintoma registrado"; seu-ciclo.spec.tsx põe primeiro o conteúdo do sintoma do check-in de hoje.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: GET /ciclo isolado por conta (ciclo.e2e-spec.ts) e checkin.e2e-spec.ts "os GETs de uma conta não mostram os registros da outra". RNF11: plum sobre branco 5,42; inkSoft 5,73.' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #120 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', revisor: 'Ana Luisa', data: '16/11/2026', evidencia: 'Aprovação no PR #120 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo.conteudos: sem cobrança, culpa ou contador de falha; trazem o aviso de que não substituem consulta.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP2, ligada à issue da história no quadro.' }
      }
    },
    HU28: {
      versao: 'PR #106, commit 54dbb13',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo.fases: caracterização de menstrual, folicular, ovulatória e lútea; fases.spec.ts lista as quatro fases; formulario-ciclo.spec.tsx mostra as fases.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Sem RNF próprio; RNF11: tinta sobre as cores das fases 4,86 a 8,52 e plum sobre ground 4,90, documentados em tema.ts.' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #106 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', revisor: 'Ana Luisa', data: '16/11/2026', evidencia: 'Aprovação no PR #106 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, ciclo.fases: "tudo bem precisar de mais pausas", "sem obrigação de render mais"; sem cobrança, culpa ou contador de falha.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP2, ligada à issue da história no quadro.' }
      }
    },
    HU11: {
      versao: 'PR #96, commit b3aded6',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Critério 1: apps/app/src/ui/pin-petalas.tsx com 6 pétalas (PIN_PETALAS) e PIN_TOQUES = 4 em packages/shared/src/pin.ts; o tipo padrão é pétalas e o numérico é opção a mais. Critério 2: pin.e2e-spec.ts "o PIN de A não destrava B".' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF09: pin.e2e-spec.ts "aceita dígitos e pétalas repetidos" e "uma pétala fora da faixa é PIN incorreto". RNF03: pin.e2e-spec.ts "a sessão de B não altera nem remove o PIN de A". RNF11: cores de tema.ts.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #96 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, bloco pin e erros PinIncorreto/PinBloqueado: "Respire e tente de novo quando quiser", "Vamos fazer uma pausa"; sem contador de tentativas à vista.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP3, ligada à issue da história no quadro.' }
      }
    },
    HU12: {
      versao: 'PR #108, commit 28c15e4',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Critério 1: consent.e2e-spec.ts "protege as rotas reais de ciclo, sintomas e disposição até o aceite". Critério 2: apps/api/src/modules/consent/termos.ts traz a finalidade de conta, ciclo, sintomas e disposição, e tarefas.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF02: consent.e2e-spec.ts "bloqueia a gravação de dado sensível até o aceite" e "recusa o aceite de uma versão que não é a vigente". RNF11: cores de tema.ts documentadas acima de 4,5:1.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #108 com o CI verde e docs/qualidade/hu12-termos-de-uso.md na main.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, bloco termos e erro ConsentimentoPendente: sem cobrança nem culpa ("Nada é registrado antes do seu aceite").' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP3, ligada à issue da história no quadro.' }
      }
    },
    HU36: {
      versao: 'PR #95, commit d5a6404',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Reprovado', data: '16/11/2026', evidencia: 'A história não tem critérios de aceitação registrados em dados.js; não há o que conferir. A exclusão em si está coberta por exclusao-conta.e2e-spec.ts.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF02: exclusao-conta.e2e-spec.ts "nenhuma linha da usuária sobra em …" (cascata) e revogação do aceite. RNF03: "a exclusão de A deixa B intacta". RNF11: cores de tema.ts.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #95 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, bloco excluirConta: "Entendemos se você quer ir embora, e a decisão é sua"; avisa que não há volta sem culpa nem pressão.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP3, ligada à issue da história no quadro.' }
      }
    },
    HU13: {
      versao: 'PR #110, commit 05b7c5b',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Ordem pelas regras da história em recomendacao.e2e-spec.ts (\'ordena pelos grupos e pelos desempates\', \'sem registro, disposição média\', \'inclui as atrasadas…\'). O critério de tempo fica fora.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: recomendacao.e2e-spec.ts \'traz só as tarefas e a disposição da própria usuária\'. RNF11: plum, ink e inkSoft sobre branco e blush, de 4,54 a 13,98 (tema.ts). RNF06 fora.' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #110 com o CI verde e docs/qualidade/hu13-recomendar-tarefas.md na main.' },
        '4': { resultado: 'Aprovado', revisor: 'Arthur Palhares', data: '16/11/2026', evidencia: 'Aprovação no PR #110 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.hoje.plano em textos.ts: o aviso de energia oferece o adiamento sem cobrança e sem contador; plano-do-dia.spec.tsx \'mostra o aviso sem cobrança\'.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP4, ligada à issue da história no quadro.' }
      }
    },
    HU15: {
      versao: 'PR #114, commit 2ec901c',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'reajuste.e2e-spec.ts: passa para amanhã com o mesmo prazo; prazo hoje ou vencido não sai; desfazer; volta quando a disposição sobe. O critério de tempo fica fora.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: reajuste.e2e-spec.ts \'o registro de uma conta não move as tarefas de outra\' e \'outra conta não vê nem desfaz a movida\'. RNF11 pelos tokens de tema.ts (≥4,54). RNF07 fora.' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #114 com o CI verde e docs/qualidade/hu15-reajustar-recomendacao.md na main.' },
        '4': { resultado: 'Aprovado', revisor: 'Luana Carvalho', data: '16/11/2026', evidencia: 'Aprovação no PR #114 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.reajuste em textos.ts: \'O prazo continua o mesmo\', sem cobrança; reajuste.spec.tsx \'sem contador: nenhum número na tela além das datas e das posições\'.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU16: {
      versao: 'PR #109, commit 82b02b0',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'manutencao-tarefa.e2e-spec.ts \'atualiza a mesma tarefa sem duplicar ou mudar planejamento e cadastro\'.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: manutencao-tarefa.e2e-spec.ts \'o detalhe não expõe a tarefa de outra conta\'. RNF11: telas de tarefa com ink e inkSoft sobre branco e blush (≥4,80, tema.ts).' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #109 com o CI verde e docs/qualidade/hu16-hu19-editar-excluir.md na main.' },
        '4': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.tarefas em textos.ts (\'Salvar alterações\', \'Alterações salvas.\'): sem cobrança, culpa nem contador.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU17: {
      versao: 'PR #98, commit 71a959b',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'tarefas.e2e-spec.ts \'registra a tarefa com todos os campos, planejada para hoje\' (título, prazo, prioridade e energia), com as recusas de campo vazio e prazo passado.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: tarefas.e2e-spec.ts \'nega o acesso à tarefa de outra conta\' e \'traz só as tarefas da própria usuária\'. RNF11 pelos tokens de tema.ts (≥4,80).' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #98 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos do formulário em textos.ts (\'Dê um nome para a tarefa.\', \'Confira o prazo…\'): orientam sem cobrança nem culpa.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU18: {
      versao: 'PR #102, commit 96febb5',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'adiamento-tarefa.e2e-spec.ts \'muda só a data planejada e mantém título, prazo, prioridade, energia, duração e cadastro\'.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: adiamento-tarefa.e2e-spec.ts \'não permite que outra conta adie a tarefa\'. RNF11: formulário de adiamento com ink sobre branco (13,98, tema.ts).' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #102 com o CI verde e docs/qualidade/hu18-adiar-tarefa.md na main.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Textos de adiamento em textos.ts (\'Confirmar nova data\', \'Confira a data…\') sem cobrança; nenhum contador de adiamentos no app. Os critérios 2 e 3 da HU estão no e2e de adiamento e no reajuste.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU19: {
      versao: 'PR #109, commit 82b02b0',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'manutencao-tarefa.e2e-spec.ts \'remove a tarefa das consultas, listas e seu histórico em cascata\'; a recomendação lê as tarefas por TarefasService.abertasAte, então a excluída some dela também.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: manutencao-tarefa.e2e-spec.ts \'nega outra conta sem alterar a tarefa\'. RNF11 pelos tokens de tema.ts (≥4,80).' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #109 com o CI verde e docs/qualidade/hu16-hu19-editar-excluir.md na main.' },
        '4': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts: \'Excluir esta tarefa e seu histórico? Não é possível desfazer.\' Informa sem culpa nem cobrança.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU20: {
      versao: 'PR #115, commit 9f08da4',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'conclusao-tarefa.e2e-spec.ts \'registra o instante e mantém os demais dados, separando abertas de concluídas\' e \'repetir a conclusão preserva a primeira data\'.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: conclusao-tarefa.e2e-spec.ts \'nega concluir a tarefa de outra conta\' e \'a lista de concluídas não expõe registros de outra conta\'. RNF11 pelos tokens de tema.ts.' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #115 com o CI verde e docs/qualidade/hu20-concluir-tarefa.md na main.' },
        '4': { resultado: 'Aprovado', revisor: 'Ana Luisa', data: '16/11/2026', evidencia: 'Aprovação no PR #115 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts: \'Tarefa concluída.\', \'Nenhuma tarefa concluída por enquanto.\' Sem contador nem cobrança.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU21: {
      versao: 'PR #107, commit 013130e',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'acolhimento.e2e-spec.ts \'só sugere prática dentro do teto de duração\' (DURACAO_MAXIMA_PRATICA_MINUTOS = 10 em shared/acolhimento.ts) e lista-sugestoes.spec.tsx.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Só o RNF11 se aplica (RNF10 fora): cartões com ink e inkSoft sobre branco, 13,98 e 5,73 (tema.ts).' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #107 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', revisor: 'Tiago Bittencourt', data: '15/11/2026', evidencia: 'Aprovação no PR #107 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.acolhimento.sugestoes: \'Práticas para hoje, se fizerem sentido agora. Nada aqui é tarefa.\' e \'Nada fica registrado.\' Convite, sem cobrança.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU22: {
      versao: 'PR #116, commit 6e26529',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'cartao-mensagem.spec.tsx \'tem texto não vazio e sem cobrança ou culpa para toda mensagem da lista\', com regex corrigida e testada contra frases de cobrança; acolhimento.e2e-spec.ts HU22.' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Só o RNF11 se aplica: rótulo plum sobre blush 4,54 e texto ink sobre blush 11,71 (cartao-mensagem.tsx, tema.ts).' },
        '3': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'PR #116 com o CI verde e docs/qualidade/hu22-mensagens-acolhimento.md na main.' },
        '4': { resultado: 'Aprovado', revisor: 'Ana Luisa', data: '16/11/2026', evidencia: 'Aprovação no PR #116 do GitHub.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'As 8 mensagens em textos.acolhimento.mensagem saíram como sugerido na revisão do #116 (por exemplo, \'Descansar também é uma forma de cuidar de você.\'), sem cobrança nem culpa.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP5, ligada à issue da história no quadro.' }
      }
    },
    HU25: {
      versao: 'PR #57, commit 156e7df',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'apps/api/test/auth.e2e-spec.ts "cadastra e entra de novo depois de sair".' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: auth.e2e-spec.ts "exige token nas rotas privadas" e "renova o token e revoga a família quando um refresh é reutilizado". RNF11: cores de apps/app/src/ui/tema.ts, combinações de texto documentadas acima de 4,5:1.' },
        '3': { resultado: 'Aprovado', data: '14/11/2026', evidencia: 'PR #57 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '14/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, blocos entrar e cadastro: sem cobrança, culpa nem contador de falha ("Que bom te ver", "Seu histórico fica só com você").' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP7, ligada à issue da história no quadro.' }
      }
    },
    HU26: {
      versao: 'PR #97, commit a078510',
      avaliacaoExterna: 'Pendente',
      criterios: {
        '1': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'apps/api/test/recuperacao.e2e-spec.ts "devolve a mesma conta, com o histórico, a quem confirma o código".' },
        '2': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'RNF03: recuperacao.e2e-spec.ts "não deixa o código de uma conta valer para outra" e "conta as tentativas erradas de cada conta separadamente". RNF11: cores de tema.ts documentadas acima de 4,5:1.' },
        '3': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'PR #97 com o CI verde e os testes listados no PR.' },
        '4': { resultado: 'Aprovado', data: '15/11/2026', evidencia: 'Aprovação no WhatsApp; a comprovação ainda vai ser registrada.' },
        '5': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'textos.ts, bloco recuperar e erro CodigoRecuperacaoInvalido: acolhedores ("Tudo bem, acontece"), sem cobrança nem culpa.' },
        '6': { resultado: 'Aprovado', data: '16/11/2026', evidencia: 'Na árvore, sob a CP7, ligada à issue da história no quadro.' }
      }
    }
  },

  // Nome de cada integrante pelo login do GitHub. A árvore cita quem está
  // atribuída à issue da HU no quadro Kanban (retrato em assets/js/kanban.js);
  // um login fora desta lista aparece como @login.
  pessoas: {
    ananunesv: 'Ana Luisa',
    Zaclonic: 'Allan Kelvin',
    TiagoSBittencourt: 'Tiago Bittencourt',
    'g-srodrigues': 'Gustavo Rodrigues',
    luanaa2005: 'Luana Carvalho',
    pedroiaan: 'Pedro Ian',
    arthurpalhares1: 'Arthur Palhares'
  },

  // Visão operacional do backlog. Os detalhes da HU continuam em `historias`;
  // aqui ficam apenas dados de planejamento que não pertencem ao requisito.
  // O responsável e o status vêm primeiro do quadro Kanban; `responsaveis` só
  // vale para a HU cuja issue ainda não tem ninguém atribuído.
  backlog: {
    atualizadoEm: '14/11/2026',
    // Estado inicial de 13/11; implementacoes posteriores ficam em itens[HU].andamento.
    andamentoPadrao: 'Não iniciada',
    responsavelPadrao: 'Não atribuído',
    responsaveis: {
      HU11: 'Pedro Ian',
      HU12: 'Pedro Ian',
      HU16: 'Arthur Palhares',
      HU17: 'Arthur Palhares',
      HU19: 'Arthur Palhares',
      HU20: 'Arthur Palhares',
      HU25: 'Allan Kelvin'
    },
    capacidadePorIteracao: {
      '6': {
        disponivel: null,
        observacao: 'A capacidade disponível da equipe não foi registrada para esta iteração.'
      },
      '7': {
        disponivel: null,
        observacao: 'A capacidade disponível da equipe não foi registrada para esta iteração.'
      },
      '8': {
        disponivel: null,
        observacao: 'A capacidade disponível da equipe não foi registrada para esta iteração.'
      }
    },
    tarefasPadrao: [
      { id: 'T01', titulo: 'Refinar a história e confirmar o DoR', etapa: 'Requisitos' },
      { id: 'T02', titulo: 'Construir e integrar o incremento', etapa: 'Desenvolvimento' },
      { id: 'T03', titulo: 'Verificar critérios de aceitação, RNFs e DoD', etapa: 'Verificação' },
      { id: 'T04', titulo: 'Validar o incremento com os stakeholders', etapa: 'Validação' }
    ],
    // Subtarefas por etapa; critérios e regras continuam na própria história.
    itens: {
      HU01: {
        tarefas: { T02: [
          'Preparar a consulta dos sintomas comuns por fase, com conteúdo revisado pela cliente.',
          'Integrar a consulta à fase atual apresentada em HU05.'
        ] }
      },
      HU02: {
        dependencias: ['HU15'],
        tarefas: { T02: [
          'Disponibilizar a ação de sinalizar sobrecarga durante o uso do aplicativo.',
          'Conectar a sinalização ao reajuste de HU15 e apresentar o resultado.'
        ] }
      },
      HU04: {
        bloqueios: ['Validar as regras propostas de registro e correção com a cliente.'],
        tarefas: { T02: [
          'Construir o formulário de sintomas, intensidades e disposição.',
          'Integrar gravação e correção dos registros ao histórico e ao reajuste de HU15, conforme as regras acordadas.'
        ] }
      },
      HU05: {
        bloqueios: ['Validar o modelo de cálculo das fases com a cliente.'],
        tarefas: { T02: [
          'Integrar as entradas de HU06 e HU07 à consulta da situação do ciclo.',
          'Apresentar a estimativa ou o motivo de indisponibilidade, aplicando o modelo de fases somente após sua validação.'
        ] }
      },
      HU06: {
        tarefas: { T02: [
          'Construir a entrada da data de início da menstruação.',
          'Salvar a data no histórico e disponibilizar a atualização para HU05, respeitando o aceite de HU12.'
        ] }
      },
      HU07: {
        tarefas: { T02: [
          'Construir a entrada da duração média e a opção de ciclo irregular.',
          'Salvar as informações e disponibilizá-las para a consulta de HU05.'
        ] }
      },
      HU09: {
        tarefas: { T02: [
          'Organizar os conteúdos informativos revisados pela cliente por fase e sintoma.',
          'Construir a consulta que relaciona os conteúdos à fase e aos sintomas da usuária.'
        ] }
      },
      HU11: {
        bloqueios: ['Conciliar o PIN numérico do escopo da v1, as seis pétalas do critério de aceite e a trava de sessão com quatro toques em seis pétalas descrita na arquitetura (PR #56).'],
        tarefas: { T02: [
          'Construir o cadastro e a entrada do PIN conforme o modelo confirmado no refinamento.',
          'Integrar a conferência do PIN ao acesso protegido da conta.'
        ] }
      },
      HU12: {
        andamento: 'Implementação integrada; verificação pendente',
        evidenciaImplementacao: { pr: 57, commit: '156e7df44373d28675e6b6bbe47a607bf5af7ce1' },
        bloqueios: ['Revisar o rascunho dos termos com a cliente e concluir as verificações do aplicativo Android e do DoD.'],
        tarefas: { T02: [
          'Disponibilizar a leitura dos termos e o registro do aceite.',
          'Integrar a verificação do aceite aos fluxos de coleta de ciclo, sintomas e disposição.'
        ] }
      },
      HU13: {
        bloqueios: ['Validar as regras propostas de ordenação com a cliente.'],
        tarefas: { T02: [
          'Integrar a consulta das tarefas cadastradas e da disposição vigente.',
          'Implementar e exibir a ordenação conforme as regras de negócio acordadas.'
        ] }
      },
      HU15: {
        bloqueios: ['Validar as regras propostas de reajuste com a cliente.'],
        tarefas: { T02: [
          'Conectar os registros de disposição e a sinalização de sobrecarga ao recálculo da lista.',
          'Integrar movimentação, retorno e desfazer das tarefas conforme as regras de reajuste acordadas.'
        ] }
      },
      HU16: {
        tarefas: { T02: [
          'Abrir os dados da tarefa cadastrada para edição.',
          'Salvar as alterações na mesma tarefa e atualizar sua apresentação na lista.'
        ] }
      },
      HU17: {
        tarefas: { T02: [
          'Montar o formulário de título, prazo, prioridade e energia necessária.',
          'Salvar a tarefa e disponibilizá-la para o planejamento de HU13.'
        ] }
      },
      HU18: {
        tarefas: { T02: [
          'Disponibilizar a escolha da nova data de execução da tarefa.',
          'Atualizar a data planejada e a lista, distinguindo o adiamento manual do reajuste automático de HU15.'
        ] }
      },
      HU19: {
        tarefas: { T02: [
          'Disponibilizar a ação de excluir uma tarefa cadastrada.',
          'Integrar a exclusão à lista de tarefas e à recomendação do dia.'
        ] }
      },
      HU20: {
        tarefas: { T02: [
          'Disponibilizar a marcação de tarefa concluída.',
          'Salvar o estado e a data de conclusão e atualizar a apresentação da tarefa.'
        ] }
      },
      HU21: {
        tarefas: { T02: [
          'Organizar as práticas breves de autocuidado revisadas pela cliente.',
          'Construir a apresentação das sugestões de acolhimento.'
        ] }
      },
      HU22: {
        tarefas: { T02: [
          'Preparar as mensagens de acolhimento para revisão de linguagem.',
          'Integrar a apresentação das mensagens ao fluxo acordado para a história.'
        ] }
      },
      HU25: {
        andamento: 'Implementação integrada; verificação pendente',
        evidenciaImplementacao: { pr: 57, commit: '156e7df44373d28675e6b6bbe47a607bf5af7ce1' },
        bloqueios: ['Concluir a verificação do cadastro no aplicativo Android e registrar as evidências do DoD.'],
        tarefas: { T02: [
          'Construir o fluxo de criação da conta com os dados acordados no refinamento.',
          'Integrar a criação ao acesso da conta, incluindo sair e entrar novamente.'
        ] }
      },
      HU26: {
        tarefas: { T02: [
          'Construir o fluxo de recuperação de acesso conforme o mecanismo acordado no refinamento.',
          'Integrar a recuperação à conta existente, preservando o histórico.'
        ] }
      },
      HU28: {
        tarefas: { T02: [
          'Organizar o conteúdo revisado pela cliente sobre o funcionamento das quatro fases.',
          'Construir a consulta das informações de cada fase do ciclo.'
        ] }
      },
      HU36: {
        bloqueios: ['Definir os critérios de aceitação da exclusão de conta e dados.'],
        tarefas: {
          T01: ['Definir os critérios de aceitação da exclusão de conta e dados antes do desenvolvimento.'],
          T02: [
            'Construir o fluxo de solicitação de exclusão da própria conta.',
            'Integrar a exclusão da conta e dos dados e a revogação do consentimento conforme os critérios acordados.'
          ]
        }
      },
      HU31: {
        situacao: 'Requer refinamento'
      },
      HU32: {
        situacao: 'Requer refinamento'
      }
    }
  },

  // Características do produto (CP), na ordem da árvore, com o objetivo
  // específico (OE) de cada uma. habilitadora: sustenta as demais, sem
  // contribuir sozinha para o resultado do objetivo.
  caracteristicas: [
    { id: 'CP1', nome: 'Registro e análise de sintomas e disposição', objetivo: 'OE1' },
    { id: 'CP2', nome: 'Acompanhamento do ciclo menstrual', objetivo: 'OE1' },
    { id: 'CP3', nome: 'Privacidade dos dados da usuária', objetivo: 'OE1', habilitadora: true },
    { id: 'CP4', nome: 'Planejamento adaptativo das tarefas', objetivo: 'OE2' },
    { id: 'CP5', nome: 'Gestão acolhedora da carga diária', objetivo: 'OE3' },
    { id: 'CP6', nome: 'Reconhecimento de ritmo sustentável', objetivo: 'OE3' },
    { id: 'CP7', nome: 'Conta e preferências da usuária', objetivo: 'OE3', habilitadora: true }
  ],

  // As 36 histórias de usuário.
  //   historia     o que vem depois de "Como usuária, quero"; o trecho depois de
  //                ", para " vira o benefício.
  //   valor        MoSCoW atribuído pela cliente: 4 Must, 3 Should, 2 Could.
  //   validadaCliente  true quando a nota foi confirmada na reunião de 05/10/2026.
  //   iteracao     iteração planejada (5 ou 6); 0 = fora do MVP.
  //   nota         papel no MVP, ou por que ficou fora.
  //   esforco      notas da equipe (1 a 4) e a média consolidada.
  //   relacionadas IDs de histórias referenciadas, sem repetir suas regras.
  //   regras       situacao e itens, conforme PR #49; origem indica o PR e
  //                pendencias explicita decisões ainda necessárias.
  historias: [
    {
      id: 'HU01',
      nome: 'Consultar sintomas comuns da fase',
      descricao: 'Deve ser possível à usuária consultar os sintomas comuns da fase atual do seu ciclo menstrual.',
      historia: 'consultar os sintomas comuns da fase atual do meu ciclo menstrual, para entender o que posso sentir neste momento',
      caracteristica: 'CP1',
      rnfs: ['RNF03'],
      valor: 3,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Conteúdo sobre os sintomas típicos da fase atual; reduz estranheza e autoculpa.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'A consulta só será considerada atendida quando apresentar os sintomas comuns da fase do ciclo em que a usuária está no dia da consulta.'
      ]
    },
    {
      id: 'HU02',
      nome: 'Sinalizar sobrecarga',
      descricao: 'Deve ser possível à usuária sinalizar, a qualquer momento do dia, que está sobrecarregada ou indisposta, para que suas tarefas do dia sejam readequadas (HU15).',
      historia: 'sinalizar, a qualquer momento do dia, que estou sobrecarregada ou indisposta, para que minhas tarefas do dia sejam readequadas',
      caracteristica: 'CP1',
      rnfs: ['RNF04', 'RNF08', 'RNF02', 'RNF03', 'RNF07'],
      valor: 4,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Resposta imediata à sobrecarga, a qualquer momento do dia.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'A sinalização só será considerada concluída quando puder ser feita em qualquer horário do dia e resultar na readequação das tarefas do dia (HU15).',
        'A sinalização deve ser concluída em no máximo 3 toques a partir da tela inicial (RNF04).',
        'A confirmação da sinalização deve aparecer em até 2 segundos (RNF08).'
      ]
    },
    {
      id: 'HU03',
      nome: 'Receber lembrete de registro',
      descricao: 'Deve ser possível à usuária receber um lembrete para registrar seus sintomas e sua disposição.',
      historia: 'receber um lembrete para registrar meus sintomas e minha disposição, para não deixar de fazer o registro',
      caracteristica: 'CP1',
      rnfs: ['RNF01'],
      valor: 2,
      validadaCliente: true,
      iteracao: 0,
      nota: 'O fluxo funciona sem lembrete.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'Com a exibição de informações do ciclo desativada, o lembrete não deve apresentar fase, sintomas nem disposição (RNF01).'
      ]
    },
    {
      id: 'HU04',
      nome: 'Registrar sintomas e disposição',
      descricao: 'Deve ser possível à usuária registrar os sintomas sentidos, com a intensidade de cada um, e o seu nível de disposição.',
      historia: 'registrar os sintomas que sinto, com a intensidade de cada um, e meu nível de disposição, para perceber meu estado ao longo do ciclo',
      caracteristica: 'CP1',
      rnfs: ['RNF02', 'RNF03', 'RNF04', 'RNF08'],
      valor: 4,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Check-in diário; dado-fonte de HU02, HU13 e HU15.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      relacionadas: ['HU13', 'HU15'],
      criterios: [
        'O registro só será considerado concluído quando incluir a disposição e, para os sintomas, a intensidade de cada um dos selecionados ou a indicação explícita de ausência de sintomas, conforme as regras desta história.',
        'Novos registros e correções devem preservar o histórico e identificar o registro vigente conforme as regras desta história.',
        'O registro deve ser concluído em no máximo 3 toques a partir da tela inicial (RNF04).',
        'A confirmação do registro deve aparecer em até 2 segundos (RNF08).'
      ],
      regras: {
        situacao: 'Proposta de detalhamento da equipe para a issue #38, pendente de validação. Em 05/10/2026 a cliente pediu ajustes na lista de sintomas e a distinção entre cansaço e desânimo; escalas, correção e frequência abaixo não foram confirmadas naquela reunião.',
        itens: [
          'Cada registro reúne a data local do dia, o instante de criação, a disposição e zero ou mais sintomas distintos. A opção sem sintomas não pode ser combinada com sintomas selecionados.',
          'Cada sintoma selecionado exige uma intensidade: 1 leve, 2 moderada ou 3 intensa. Sintomas não selecionados não recebem intensidade.',
          'A disposição usa os níveis definidos em HU13. A lista deve distinguir cansaço de desânimo e incorporar a revisão de sintomas registrada na reunião de 05/10/2026.',
          'Podem existir vários registros no mesmo dia. Para recomendação e reajuste vale o mais recente do dia, conforme HU13 e HU15; os anteriores permanecem no histórico.',
          'A usuária pode corrigir sintomas, intensidades e disposição de um registro próprio. A correção substitui o conteúdo sem duplicar o registro nem mudar seu instante de criação. Corrigir a disposição do registro mais recente de hoje dispara HU15; corrigir um registro anterior não muda a disposição vigente.',
          'A ausência de registro não significa ausência de sintomas. O comportamento da recomendação sem registro está definido em HU13.'
        ]
      }
    },
    {
      id: 'HU30',
      nome: 'Gerenciar medicações',
      descricao: 'Deve ser possível à usuária cadastrar, alterar e excluir as medicações que utiliza, indicando se o uso é diário ou esporádico.',
      historia: 'cadastrar, alterar e excluir as medicações que utilizo, indicando se o uso é diário ou esporádico, para consultar esses dados quando precisar informar meu uso de medicação',
      caracteristica: 'CP1',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Dado sensível sem uso no MVP.',
      esforco: { esforco: 2, complexidade: 1, lacuna: 1, consolidado: '1,3' },
      criterios: [
        'Cadastrar: a medicação deve ficar identificada pelo nome e pelo tipo de uso diário ou esporádico.',
        'Alterar: as novas informações devem substituir as anteriores na mesma medicação, sem criar um cadastro duplicado.',
        'Excluir: após confirmação da usuária, a medicação deixa de constar entre as medicações cadastradas; cancelar preserva o cadastro.',
        'Uma requisição às medicações da usuária feita com a sessão de outra conta deve retornar acesso negado (RNF03).'
      ],
      regras: {
        situacao: 'Proposta da equipe para a issue #38, pendente de validação.',
        itens: [
          'Cadastro, alteração e exclusão permanecem em uma única história de gerenciamento, com critérios independentes por operação. A estimativa de esforço representa o conjunto das três operações, e não uma operação isolada.',
          'A estimativa atual é provisória e deve ser revista coletivamente antes do planejamento desta história. Não comparar esse esforço com o de uma única operação sobre tarefas sem considerar essa diferença de escopo. A história continua fora do MVP.'
        ]
      }
    },
    {
      id: 'HU34',
      nome: 'Registrar diagnósticos prévios',
      descricao: 'Deve ser possível à usuária registrar os diagnósticos de saúde que já possui, como diabetes, hipertensão ou enxaqueca.',
      historia: 'registrar os diagnósticos de saúde que já possuo, como diabetes, hipertensão ou enxaqueca, para consultar essas condições ao acompanhar meus sintomas',
      caracteristica: 'CP1',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Dado sensível sem uso no MVP.',
      esforco: { esforco: 2, complexidade: 1, lacuna: 1, consolidado: '1,3' },
      criterios: [
        'Nenhum diagnóstico pode ser salvo antes do aceite dos termos de uso e de tratamento dos dados (RNF02).',
        'Uma requisição aos diagnósticos da usuária feita com a sessão de outra conta deve retornar acesso negado (RNF03).'
      ]
    },
    {
      id: 'HU35',
      nome: 'Exportar relatório de sintomas',
      descricao: 'Deve ser possível à usuária exportar um relatório com o histórico dos sintomas registrados, sua intensidade e frequência, para levar a uma consulta médica.',
      historia: 'exportar um relatório com o histórico dos meus sintomas, sua intensidade e frequência, para levar a uma consulta médica',
      caracteristica: 'CP1',
      rnfs: ['RNF02', 'RNF03'],
      valor: 3,
      validadaCliente: true,
      iteracao: 0,
      nota: 'Ficou fora por pouco: forte candidato à próxima release.',
      esforco: { esforco: 3, complexidade: 2, lacuna: 2, consolidado: '2,3' },
      criterios: []
    },
    {
      id: 'HU05',
      nome: 'Consultar situação atual do ciclo',
      descricao: 'Deve ser possível à usuária consultar a situação atual do seu ciclo menstrual.',
      historia: 'consultar a situação atual do meu ciclo menstrual, para saber em que fase estou',
      caracteristica: 'CP2',
      rnfs: ['RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Apresenta a estimativa a partir das entradas de HU06 e HU07; o modelo de fases depende de revisão da cliente.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      relacionadas: ['HU06', 'HU07', 'HU08', 'HU13'],
      criterios: [
        'A consulta apresenta a fase estimada entre menstrual, folicular, ovulatória e lútea somente quando houver entradas suficientes, pelo modelo de cálculo proposto pela equipe e sempre identificada como estimativa, conforme as regras desta história.',
        'Quando não for possível estimar, a consulta informa fase não estimada e o motivo, sem atribuir uma fase por padrão.',
        'A alteração das entradas de HU06 ou HU07 deve atualizar a consulta, sem manter uma estimativa baseada nos dados anteriores.'
      ],
      regras: {
        situacao: 'Modelo proposto pela equipe e implementado por decisão do grupo em 15/11/2026 (PR #117), com validação da cliente pendente.',
        itens: [
          'HU06 fornece a data mais recente de início da menstruação que não esteja no futuro; HU07 fornece a duração média em dias ou a indicação de irregularidade. Essas histórias registram entradas, e o cálculo pertence a HU05.',
          'O dia do ciclo é a diferença em dias de calendário local entre hoje e a data de início, mais um: o início é o dia 1. Não usar horas decorridas para contar dias.',
          'Sem data válida, sem duração média válida ou com indicação de ciclo irregular, informar fase não estimada e a respectiva razão. Não presumir duração de 28 dias nem estimar por sintomas: HU08 continua fora do MVP.',
          'Para ciclo regular, a conversão do dia do ciclo em fase usa o modelo proposto pela equipe: menstrual nos dias 1 a 5, ovulatória em três dias em torno de duração menos 14, folicular entre as duas e lútea até o fim, para durações de 21 a 35 dias. Fora dessa faixa, informar fase não estimada e o motivo. A cliente valida o método, os limites e as durações depois, e um ajuste muda só o modelo.',
          'Se o dia calculado ultrapassar a duração informada, não reiniciar o ciclo automaticamente: informar fase não estimada e solicitar atualização dos dados.',
          'Toda apresentação de fase deve identificá-la como estimativa. O uso direto da fase no planejamento não integra a proposta de HU13 do MVP.'
        ],
        pendencias: [
          'A cliente deve revisar o método, os limites de cada fase e as durações aceitas. O registro da decisão deve incluir a fonte, exemplos nos limites dos intervalos e o comportamento para dados insuficientes; não há fórmula clínica aprovada publicada.'
        ]
      }
    },
    {
      id: 'HU06',
      nome: 'Registrar início da menstruação',
      descricao: 'Deve ser possível à usuária registrar a data de início da sua menstruação.',
      historia: 'registrar a data de início da minha menstruação, para que o acompanhamento do ciclo parta de um dado objetivo',
      caracteristica: 'CP2',
      rnfs: ['RNF02', 'RNF03'],
      valor: 4,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Dado objetivo que calibra a fase do ciclo.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      relacionadas: ['HU05'],
      criterios: [
        'Os dados registrados ou corrigidos são entradas da estimativa de HU05; o comportamento do cálculo e suas limitações são definidos somente naquela história.',
        'O registro só será considerado concluído quando a data de início da menstruação ficar salva no histórico da usuária.',
        'Nenhuma data pode ser salva antes do aceite dos termos (RNF02).'
      ]
    },
    {
      id: 'HU07',
      nome: 'Informar características do ciclo',
      descricao: 'Deve ser possível à usuária informar a duração média do seu ciclo menstrual ou que seu ciclo é irregular.',
      historia: 'informar a duração média do meu ciclo ou que meu ciclo é irregular, para que o acompanhamento reflita a minha realidade',
      caracteristica: 'CP2',
      rnfs: ['RNF02', 'RNF03'],
      valor: 3,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Dependência estrutural do cálculo de fase.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      relacionadas: ['HU05'],
      criterios: [
        'Os dados registrados ou corrigidos são entradas da estimativa de HU05; o comportamento do cálculo e suas limitações são definidos somente naquela história.',
        'A informação só será considerada registrada quando aceitar uma duração média ou a indicação de ciclo irregular.'
      ]
    },
    {
      id: 'HU08',
      nome: 'Estimar fase do ciclo por sintomas',
      descricao: 'Deve ser possível à usuária obter uma estimativa da fase atual do seu ciclo menstrual informando seus sintomas atuais.',
      historia: 'obter uma estimativa da fase atual do meu ciclo informando meus sintomas atuais, para saber em que fase provavelmente estou',
      caracteristica: 'CP2',
      rnfs: ['RNF04', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Fora do MVP: a estimativa por sintomas não substitui o cálculo pelas entradas de HU06 e HU07 definido em HU05.',
      esforco: { esforco: 3, complexidade: 3, lacuna: 2, consolidado: '2,7' },
      criterios: [
        'A estimativa só será considerada entregue quando indicar uma das quatro fases do ciclo a partir dos sintomas informados.',
        'O informe dos sintomas deve ser concluído em no máximo 3 toques a partir da tela inicial (RNF04).'
      ]
    },
    {
      id: 'HU09',
      nome: 'Recomendar conteúdos sobre o ciclo',
      descricao: 'Deve ser possível à usuária receber recomendações de conteúdos informativos sobre o ciclo menstrual, relacionados à fase atual e aos sintomas registrados.',
      historia: 'receber recomendações de conteúdos sobre o ciclo relacionados à minha fase atual e aos sintomas registrados, para acessar informações relacionadas ao momento do meu ciclo',
      caracteristica: 'CP2',
      rnfs: ['RNF03'],
      valor: 3,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Reduz autoculpa; validado com entusiasmo pela cliente.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'Cada conteúdo recomendado só será considerado adequado quando estiver relacionado à fase atual ou a um sintoma registrado pela usuária.'
      ]
    },
    {
      id: 'HU28',
      nome: 'Consultar funcionamento do ciclo',
      descricao: 'Deve ser possível à usuária consultar informações sobre como o ciclo menstrual funciona e o que caracteriza cada uma de suas fases.',
      historia: 'consultar como o ciclo menstrual funciona e o que caracteriza cada fase, para diferenciar as quatro fases e reconhecer suas mudanças',
      caracteristica: 'CP2',
      rnfs: [],
      valor: 3,
      validadaCliente: false,
      iteracao: 7,
      nota: 'Educação sobre regularidade pedida pela cliente; nota ainda em hipótese.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'A consulta só será considerada completa quando apresentar a caracterização de cada uma das quatro fases do ciclo.'
      ]
    },
    {
      id: 'HU10',
      nome: 'Visualizar calendário do ciclo',
      descricao: 'Deve ser possível à usuária visualizar as fases do seu ciclo menstrual em um calendário.',
      historia: 'visualizar as fases do meu ciclo menstrual em um calendário, para enxergar quando cada fase ocorre',
      caracteristica: 'CP2',
      rnfs: ['RNF03'],
      valor: 2,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Pedida pela cliente em 05/10/2026 (aos 11:54 da gravação); entrou no MVP por decisão do grupo em 15/11/2026.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'O calendário só será considerado correto quando cada dia exibido indicar a fase do ciclo correspondente.'
      ],
      regras: {
        situacao: 'Proposta da equipe para a issue #121, implementada no PR #118, com validação da cliente pendente.',
        itens: [
          'Um dia é pintado pela fase do ciclo que o contém, contado a partir do início mais recente que não seja posterior a ele, com o modelo de fases de HU05.',
          'Num ciclo já fechado, isto é, com um início depois, vale a duração real dele; no ciclo atual, a duração média informada em HU07.',
          'Dias depois do fim da duração, ciclos fechados fora da faixa do modelo, ciclo irregular ou sem duração ficam sem fase. Não há previsão do próximo ciclo, pela mesma regra de HU05.',
          'A fase nunca depende só da cor: cada dia mostra a inicial da fase, e o leitor de tela lê a fase, o início e o dia de hoje.'
        ],
        pendencias: [
          'A cliente deve decidir o critério de aceite diante da regra de não prever o próximo ciclo, que deixa sem fase os dias depois do fim da duração.',
          'A cliente deve validar o uso da duração real nos ciclos já fechados.'
        ]
      }
    },
    {
      id: 'HU11',
      nome: 'Proteger acesso com PIN',
      descricao: 'Deve ser possível à usuária proteger o acesso à sua conta com um PIN.',
      historia: 'proteger o acesso à minha conta com um PIN, para que meus dados de saúde não fiquem expostos a terceiros',
      caracteristica: 'CP3',
      rnfs: ['RNF03', 'RNF09'],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Proteção do dado sensível de saúde, com PIN numérico na primeira versão.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'A tela de PIN deve apresentar 6 pétalas selecionáveis, e o PIN deve ser formado pela sequência de 4 toques (RNF09).',
        'Uma requisição aos dados da usuária feita com a sessão de outra conta deve retornar acesso negado (RNF03).'
      ]
    },
    {
      id: 'HU12',
      nome: 'Aceitar termos de uso',
      descricao: 'Deve ser possível à usuária consultar e aceitar os termos de uso e de tratamento dos seus dados.',
      historia: 'consultar e aceitar os termos de uso e de tratamento dos meus dados, para saber como meus dados de saúde serão usados antes de registrá-los',
      caracteristica: 'CP3',
      rnfs: ['RNF02'],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Pré-condição legal (LGPD) para coletar qualquer dado.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'Nenhum dado de ciclo, sintoma ou disposição pode ser salvo antes do aceite dos termos (RNF02).',
        'Os termos só serão considerados completos quando descreverem a finalidade de cada tipo de dado (RNF02).'
      ]
    },
    {
      id: 'HU36',
      nome: 'Excluir conta e dados',
      descricao: 'Deve ser possível à usuária excluir sua conta e todos os seus dados, revogando o consentimento dado no aceite dos termos de uso.',
      historia: 'excluir minha conta e todos os meus dados, revogando o consentimento dado no aceite dos termos de uso, para manter a privacidade dos meus dados',
      caracteristica: 'CP3',
      rnfs: ['RNF02', 'RNF03'],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Direito legal da titular (LGPD, art. 18).',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: []
    },
    {
      id: 'HU13',
      nome: 'Recomendar tarefas do dia',
      descricao: 'Deve ser possível à usuária receber, a cada dia, a recomendação das tarefas a realizar, em ordem de precedência, com base no registro de energia, prazo e prioridade.',
      historia: 'receber, a cada dia, a recomendação das tarefas a realizar em ordem de precedência, com base no meu registro de energia, nos prazos e nas prioridades, para planejar o dia de acordo com a minha capacidade real',
      caracteristica: 'CP4',
      rnfs: ['RNF06', 'RNF03'],
      valor: 4,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Promessa central do produto.',
      esforco: { esforco: 3, complexidade: 3, lacuna: 2, consolidado: '2,7' },
      relacionadas: ['HU04', 'HU15', 'HU17', 'HU18'],
      criterios: [
        'A recomendação só será considerada correta quando as tarefas do dia aparecerem na ordem definida pelas regras de negócio desta história.',
        'A recomendação do dia deve ser exibida em até 3 segundos após o acesso, conforme o método de medição do RNF06. O resultado é condição obrigatória de aceite da HU13.'
      ],
      regras: {
        origem: 49,
        situacao: 'Proposta da equipe em 08/11/2026. No teste com usuária, Daniela Soares pediu prioridade e duração no cadastro da tarefa, mas a ordem da recomendação não foi testada com ela. Em 05/10 a Dra. Cláudia aprovou o fluxo com prioridade, prazo e energia, mas não estas regras: validar a ordem na próxima reunião.',
        itens: [
          'Disposição, energia necessária e prioridade têm três níveis: 1 baixa, 2 média e 3 alta.',
          'Entram na recomendação as tarefas não concluídas com data planejada até hoje. A data planejada nasce no dia do cadastro e só muda pelo adiamento (HU18) ou pelo reajuste (HU15).',
          'As tarefas formam três grupos, nesta ordem: (1) prazo hoje ou vencido; (2) energia necessária menor ou igual à disposição; (3) energia necessária acima da disposição.',
          'Dentro de cada grupo vale a primeira diferença: prazo mais próximo, prioridade maior, energia necessária menor, cadastro mais antigo.',
          'A disposição considerada é a do registro mais recente do dia (HU04). Sem registro no dia, o cálculo assume média.',
          'Tarefa urgente acima da disposição continua no grupo 1, com aviso sem cobrança de que pode ser adiada (HU18).',
          'A fase do ciclo não entra no cálculo no MVP: o ciclo influencia a ordem pela disposição que a usuária registra. O uso direto da fase é hipótese a validar com a cliente.'
        ]
      }
    },
    {
      id: 'HU14',
      nome: 'Receber resumo do dia',
      descricao: 'Deve ser possível à usuária receber, a cada dia, um resumo do que está previsto para o dia.',
      historia: 'receber, a cada dia, um resumo do que está previsto para o dia, para começar o dia sabendo o que me espera',
      caracteristica: 'CP4',
      rnfs: ['RNF01', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'O plano já existe via HU13.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'O resumo só será considerado completo quando listar todas as tarefas do dia.',
        'Com a exibição de informações do ciclo desativada, o resumo não deve apresentar fase, sintomas nem disposição (RNF01).'
      ]
    },
    {
      id: 'HU15',
      nome: 'Reajustar recomendação do dia',
      descricao: 'Deve ser possível à usuária visualizar suas tarefas do dia ajustadas ao nível de disposição registrado.',
      historia: 'visualizar minhas tarefas do dia ajustadas ao nível de disposição que registrei, para executá-las de acordo com a minha disposição real',
      caracteristica: 'CP5',
      rnfs: ['RNF07', 'RNF03'],
      valor: 4,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Diferencial central: realocação por disposição.',
      esforco: { esforco: 3, complexidade: 3, lacuna: 2, consolidado: '2,7' },
      relacionadas: ['HU02', 'HU04', 'HU13', 'HU18'],
      criterios: [
        'O ajuste só será considerado feito quando as tarefas que ficam no dia e as que passam para o dia seguinte seguirem as regras de negócio desta história, com o prazo inalterado.',
        'O reajuste deve aparecer em até 2 segundos após o registro de disposição, conforme o método de medição do RNF07. O resultado é condição obrigatória de aceite da HU15.'
      ],
      regras: {
        origem: 49,
        situacao: 'Proposta da equipe em 08/11/2026. No teste com usuária, Daniela Soares entendeu e aprovou o dia reajustado só com o essencial, mas as regras de quais tarefas saem do dia não foram detalhadas com ela. Em 05/10 a Dra. Cláudia endossou o reajuste automático, mas não estas regras: validar na próxima reunião.',
        itens: [
          'O reajuste dispara com um novo registro de disposição (HU04) ou com a sinalização de sobrecarga (HU02), que conta como disposição baixa até o próximo registro.',
          'A lista do dia é recalculada com as regras de ordem da HU13.',
          'Tarefa com energia necessária acima da disposição e prazo depois de hoje passa para o dia seguinte: muda a data planejada, e o prazo continua o mesmo.',
          'Tarefa com prazo hoje ou vencido nunca é movida: continua no dia, com aviso sem cobrança.',
          'A usuária pode desfazer cada movimentação no mesmo dia; a tarefa desfeita não é movida de novo naquele dia.',
          'Se a disposição subir no mesmo dia, as tarefas movidas hoje pelo reajuste que agora cabem voltam para hoje. As adiadas pela usuária (HU18) não voltam.',
          'O reajuste não gera contador de falhas nem mensagem de cobrança.'
        ]
      }
    },
    {
      id: 'HU16',
      nome: 'Editar tarefa',
      descricao: 'Deve ser possível à usuária alterar as informações de uma tarefa cadastrada.',
      historia: 'alterar as informações de uma tarefa cadastrada, para corrigir ou atualizar o que mudou',
      caracteristica: 'CP5',
      rnfs: ['RNF03'],
      valor: 4,
      validadaCliente: false,
      iteracao: 7,
      nota: 'Correção de erro de cadastro.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'A alteração só será considerada concluída quando as novas informações aparecerem na própria tarefa, sem criar uma tarefa duplicada.'
      ]
    },
    {
      id: 'HU17',
      nome: 'Cadastrar tarefa',
      descricao: 'Deve ser possível à usuária cadastrar tarefas informando título, prazo, prioridade e energia necessária.',
      historia: 'cadastrar tarefas informando título, prazo, prioridade e energia necessária, para que elas entrem no meu planejamento do dia',
      caracteristica: 'CP5',
      rnfs: ['RNF03'],
      valor: 4,
      validadaCliente: false,
      iteracao: 7,
      nota: 'Laço mínimo de valor; registra a energia necessária usada por HU13 e HU15.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      relacionadas: ['HU13'],
      criterios: [
        'O cadastro só será considerado concluído quando a tarefa tiver título, prazo, prioridade e energia necessária registrados.'
      ]
    },
    {
      id: 'HU18',
      nome: 'Adiar tarefa',
      descricao: 'Deve ser possível à usuária adiar uma tarefa para outra data, mantendo suas demais informações e seu prazo final, alterando apenas o dia em que essa tarefa será feita.',
      historia: 'adiar uma tarefa para outra data, mantendo suas informações e seu prazo final, para reorganizar minha rotina sem culpa',
      caracteristica: 'CP5',
      rnfs: ['RNF03'],
      valor: 4,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Identidade do produto: adiar sem culpa.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      relacionadas: ['HU15'],
      criterios: [
        'O adiamento só será considerado correto quando a tarefa aparecer na nova data com título, prioridade e prazo inalterados.',
        'O adiamento não deve gerar contador de falhas nem mensagem de cobrança.',
        'A mudança de data feita pela usuária deve ser distinguida de uma movimentação automática de HU15; as condições de retorno automático estão definidas em HU15.'
      ]
    },
    {
      id: 'HU19',
      nome: 'Excluir tarefa',
      descricao: 'Deve ser possível à usuária excluir uma tarefa cadastrada.',
      historia: 'excluir uma tarefa cadastrada, para remover o que não faz mais sentido',
      caracteristica: 'CP5',
      rnfs: ['RNF03'],
      valor: 3,
      validadaCliente: false,
      iteracao: 7,
      nota: 'Fecha o CRUD de tarefas a custo nulo.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'A exclusão só será considerada concluída quando a tarefa deixar de aparecer nas tarefas do dia e na recomendação do dia.'
      ]
    },
    {
      id: 'HU20',
      nome: 'Concluir tarefa',
      descricao: 'Deve ser possível à usuária marcar uma tarefa como concluída, mantendo o registro da data de conclusão.',
      historia: 'marcar uma tarefa como concluída, mantendo a data de conclusão, para acompanhar o que realizei',
      caracteristica: 'CP5',
      rnfs: ['RNF03'],
      valor: 4,
      validadaCliente: false,
      iteracao: 7,
      nota: 'Fecha o laço mínimo de valor.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'A conclusão só será considerada registrada quando a tarefa ficar marcada como concluída com a data de conclusão.'
      ]
    },
    {
      id: 'HU21',
      nome: 'Sugerir atividades de acolhimento',
      descricao: 'Deve ser possível à usuária receber sugestões de atividades de acolhimento.',
      historia: 'receber sugestões de atividades de acolhimento, para incluir pausas de autocuidado na minha rotina',
      caracteristica: 'CP5',
      rnfs: [],
      valor: 3,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Atividade física e respiração defendidas pela cliente; sugestão estática na v1.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'Cada sugestão só será considerada válida quando apresentar uma prática breve de autocuidado.'
      ]
    },
    {
      id: 'HU22',
      nome: 'Receber mensagens de acolhimento',
      descricao: 'Deve ser possível à usuária receber mensagens de acolhimento.',
      historia: 'receber mensagens de acolhimento, para me sentir apoiada sem cobrança',
      caracteristica: 'CP5',
      rnfs: [],
      valor: 4,
      validadaCliente: true,
      iteracao: 7,
      nota: 'Tom acolhedor que atravessa todo o percurso.',
      esforco: { esforco: 2, complexidade: 1, lacuna: 2, consolidado: '1,7' },
      criterios: ['Nenhuma mensagem de acolhimento pode conter linguagem de cobrança ou de culpa.']
    },
    {
      id: 'HU33',
      nome: 'Registrar atividades de acolhimento favoritas',
      descricao: 'Deve ser possível à usuária registrar as atividades de acolhimento de sua preferência.',
      historia: 'registrar as atividades de acolhimento de minha preferência, para que minhas preferências de autocuidado fiquem guardadas',
      caracteristica: 'CP5',
      rnfs: ['RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Só faz diferença com sugestões não estáticas.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'A atividade só será considerada favorita quando ficar marcada como de preferência da usuária.'
      ]
    },
    {
      id: 'HU23',
      nome: 'Gerar retrospectiva mensal',
      descricao: 'Deve ser possível à usuária gerar uma retrospectiva mensal com os registros de ciclo, sintomas, disposição, tarefas concluídas e atividades de acolhimento realizadas no período.',
      historia: 'gerar uma retrospectiva mensal com meus registros de ciclo, sintomas, disposição, tarefas concluídas e atividades de acolhimento realizadas, para reconhecer meu ritmo e meu descanso',
      caracteristica: 'CP6',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: true,
      iteracao: 0,
      nota: 'Proposta de origem do relatório usado por HU31 e HU32; ampliação pendente de validação e fora do MVP.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      relacionadas: ['HU04', 'HU06', 'HU20', 'HU24', 'HU31', 'HU32', 'HU35'],
      criterios: [
        'A retrospectiva produz o relatório mensal com o conteúdo e o período definidos nas regras desta história, distinguindo dados ausentes de valores nulos ou ausência de sintomas.',
        'O relatório usa apenas os registros da própria usuária e não apresenta escore de desempenho.',
        'HU31 e HU32 devem utilizar o mesmo conteúdo mensal produzido por esta história, sem criar uma segunda definição do relatório.'
      ],
      regras: {
        situacao: 'Proposta da equipe para a issue #38: ampliar a retrospectiva como origem do relatório mensal, pendente de validação e reestimativa. Em 05/10/2026 a cliente pediu incluir o intervalo entre ciclos; a ampliação completa abaixo não foi confirmada naquela reunião.',
        itens: [
          'A usuária seleciona um mês e ano já encerrados. O período vai do primeiro ao último dia desse mês no calendário local, inclusive.',
          'O conteúdo mensal reúne datas de início da menstruação e intervalos entre inícios consecutivos (HU06), registros de sintomas com intensidade e disposição (HU04), tarefas concluídas com data de conclusão (HU20) e atividades de acolhimento realizadas (HU24).',
          'Para o intervalo entre ciclos, pode ser usada a data de início imediatamente anterior ao mês como referência, identificada como tal. Sem duas datas, informar intervalo não disponível, sem estimar um valor.',
          'Usar a data do registro para sintomas e disposição, a data de início para menstruação, a data de conclusão para tarefas e a data de realização para acolhimento. Vários registros de sintomas no mesmo dia permanecem identificados pelo instante de criação; uma correção usa o conteúdo atualizado.',
          'Cada seção sem registros informa sem dados no período, sem inferir que não houve sintomas ou atividades. Um mês totalmente vazio ainda produz o relatório com suas seções vazias identificadas.',
          'HU31 compara relatórios deste formato e HU32 exporta esse mesmo conteúdo. A retrospectiva não depende de comparação nem exportação. HU35 continua sendo o relatório específico de sintomas para consulta médica.',
          'A ampliação continua fora do MVP e exige validação e revisão de esforço antes de entrar no planejamento.'
        ]
      }
    },
    {
      id: 'HU24',
      nome: 'Registrar atividade de acolhimento',
      descricao: 'Deve ser possível à usuária registrar as atividades de acolhimento que realizou.',
      historia: 'registrar as atividades de acolhimento que realizei, para que meu autocuidado conte como parte da minha rotina',
      caracteristica: 'CP6',
      rnfs: ['RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Depende de histórico que o MVP não produz.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'Cada atividade registrada só será considerada válida quando entrar na retrospectiva do mês em que foi realizada.'
      ]
    },
    {
      id: 'HU31',
      nome: 'Comparar relatórios mensais',
      descricao: 'Deve ser possível à usuária comparar os relatórios mensais de meses diferentes, abrangendo ciclo, sintomas, disposição e tarefas.',
      historia: 'comparar os relatórios mensais de meses diferentes, abrangendo ciclo, sintomas, disposição e tarefas, para identificar mudanças e padrões entre os meses',
      caracteristica: 'CP6',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Depende do relatório mensal proposto em HU23; permanece fora do MVP e aguarda validação dessa definição.',
      esforco: { esforco: 3, complexidade: 2, lacuna: 2, consolidado: '2,3' },
      relacionadas: ['HU23'],
      criterios: [
        'A comparação apresenta lado a lado dois meses encerrados distintos escolhidos pela usuária, usando o conteúdo mensal definido em HU23.',
        'As seções sem dados em um dos meses permanecem identificadas, sem completar valores por suposição nem impedir a comparação com o outro mês.'
      ]
    },
    {
      id: 'HU32',
      nome: 'Exportar relatório mensal',
      descricao: 'Deve ser possível à usuária exportar o relatório mensal em arquivo.',
      historia: 'exportar o relatório mensal em arquivo, para arquivar ou compartilhar meu histórico fora do aplicativo',
      caracteristica: 'CP6',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Depende do relatório mensal proposto em HU23; permanece fora do MVP e aguarda validação dessa definição.',
      esforco: { esforco: 3, complexidade: 2, lacuna: 2, consolidado: '2,3' },
      relacionadas: ['HU23'],
      criterios: [
        'A exportação gera um arquivo legível, no formato definido nas regras desta história, do relatório mensal de HU23, com mês, ano e todas as seções, inclusive as identificadas sem dados.',
        'Uma tentativa de exportar o relatório com a sessão de outra conta deve retornar acesso negado (RNF03).'
      ],
      regras: {
        situacao: 'Proposta da equipe para a issue #38, pendente de validação do relatório de HU23 e do formato de exportação.',
        itens: [
          'O formato proposto é PDF, com o mesmo conteúdo apresentado em HU23. Esta história não acrescenta indicadores nem redefine os campos do relatório.'
        ]
      }
    },
    {
      id: 'HU25',
      nome: 'Criar conta',
      descricao: 'Deve ser possível à usuária criar sua conta.',
      historia: 'criar minha conta, para ter acesso exclusivo ao meu histórico',
      caracteristica: 'CP7',
      rnfs: ['RNF03'],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Pré-requisito estrutural de todo o produto.',
      esforco: { esforco: 2, complexidade: 1, lacuna: 1, consolidado: '1,3' },
      criterios: [
        'A conta só será considerada criada quando a usuária conseguir entrar nela novamente após sair.'
      ]
    },
    {
      id: 'HU26',
      nome: 'Recuperar acesso à conta',
      descricao: 'Deve ser possível à usuária recuperar o acesso à sua conta.',
      historia: 'recuperar o acesso à minha conta, para não perder o meu histórico',
      caracteristica: 'CP7',
      rnfs: ['RNF03'],
      valor: 3,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Evita o beco sem saída do PIN esquecido.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 1, consolidado: '1,7' },
      criterios: [
        'A recuperação só será considerada concluída quando a usuária voltar a acessar a própria conta, com o histórico preservado, sem criar uma conta nova.'
      ]
    },
    {
      id: 'HU27',
      nome: 'Conhecer a proposta do sistema',
      descricao: 'Deve ser possível à usuária conhecer o objetivo do sistema ao iniciar o uso.',
      historia: 'conhecer o objetivo do sistema ao iniciar o uso, para entender como ele pode me ajudar',
      caracteristica: 'CP7',
      rnfs: [],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Onboarding fora do núcleo do MVP.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'A apresentação só será considerada exibida quando o objetivo do sistema aparecer no início do primeiro uso.'
      ]
    },
    {
      id: 'HU29',
      nome: 'Gerenciar notificações',
      descricao: 'Deve ser possível à usuária ativar, desativar e configurar as notificações do aplicativo, inclusive a exibição de informações do ciclo nelas.',
      historia: 'ativar, desativar e configurar as notificações, inclusive a exibição de informações do ciclo, para controlar o que aparece na tela do meu aparelho',
      caracteristica: 'CP7',
      rnfs: ['RNF01', 'RNF03'],
      valor: 3,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Sem objeto no MVP.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'Com a exibição de informações do ciclo desativada, as notificações de resumo e de lembrete não devem apresentar fase, sintomas nem disposição (RNF01).',
        'Com as notificações desativadas, nenhum lembrete ou resumo deve ser enviado.'
      ]
    }
  ],

  // Protocolos compartilhados: definidos uma vez, exibidos nos RNFs consumidores.
  protocolosRnf: {
    desempenhoAndroid: [
        'Executar no aplicativo React Native em build de release e aparelho Android físico. Fixar commit/build, modelo, versão do Android, massa de dados e estado de armazenamento antes do ensaio.',
        'Registrar conexão, latência, limites de banda e ferramenta de controle de rede, com parâmetros reproduzíveis. Ensaiar partida fria e uso após aquecimento separadamente, sem misturar as amostras.',
        'Realizar cinco medições por cenário e ambiente. Usar instrumentação temporal da interação até o resultado utilizável ou gravação com resolução temporal adequada; informar método, precisão e possíveis interferências da instrumentação.',
        'Registrar início, fim, duração, resultado, data, executor, revisor e evidência no DoD da respectiva história de usuário. Emulador e build de desenvolvimento servem para diagnóstico, não para aprovação final de desempenho.',
        'Exemplo de reprovação: 1, 1, 1, 1 e 4 segundos têm média de 1,6 s, mas reprovam os três RNFs por uma ultrapassagem individual. O ensaio descreve apenas execuções observadas, sem garantir todo aparelho ou rede.'
      ]
  },

  // Campos opcionais dos RNFs: condicoes, verificacao, situacao, fontes e protocoloComum.
  // Resultados de execução permanecem nos registros do DoD.
  // Requisitos não funcionais. todasAsHistorias: vale para todas (RNF10 e RNF11).
  rnfs: [
    {
      id: 'RNF01',
      nome: 'Sigilo das notificações',
      descricao: 'As notificações não devem exibir informações sobre ciclo, sintomas ou disposição sem autorização da usuária.',
      classificacao: 'Segurança da informação',
      criterio: 'Com a exibição de informações do ciclo desativada, as notificações de resumo e de lembrete não apresentam fase, sintomas nem disposição.'
    },
    {
      id: 'RNF02',
      nome: 'Conformidade com a LGPD',
      descricao: 'O tratamento dos dados deve atender à LGPD (Lei nº 13.709/2018), considerando dados de saúde como dados pessoais sensíveis.',
      classificacao: 'Externo (legislativo)',
      criterio: 'Conferir todas as condições aplicáveis; aceite dos termos isolado não comprova conformidade com a LGPD.',
      situacao: 'Proposta da equipe para a #39, pendente de validação. Transparência e minimização incorporam o RNF-novo da documentação histórica; não há verificação do produto.',
      condicoes: [
        'Transparência: informar dados coletados, finalidades, duração do tratamento, compartilhamentos, responsável e contato.',
        'Consentimento: quando aplicável, registrar manifestação específica e destacada, data e versão dos termos. Bloquear coleta de dados de saúde antes do aceite previsto em HU12.',
        'Minimização: cada campo coletado deve possuir finalidade ligada a uma funcionalidade; não exigir dados sem finalidade demonstrada.',
        'Revogação e exclusão: oferecer procedimento facilitado e conferir HU36; distinguir revogar consentimento de eliminar dados. Impedir novos tratamentos baseados no consentimento revogado.',
        'Retenção: documentar prazos, eliminação e tratamento de backups; exceções legais exigem fundamento registrado e comunicação à titular.'
      ],
      verificacao: [
        'Inventariar campos, finalidade, base aplicável, retenção e compartilhamentos; revisar o inventário e os termos antes da aprovação.',
        'Com contas fictícias, tentar salvar dados de saúde antes e depois do aceite e após revogação. Verificar registros de consentimento e bloqueios.',
        'Solicitar exclusão em HU36 e conferir dados ativos, armazenamento local e política de backups. Registrar as evidências no DoD da respectiva história de usuário, sem dados pessoais reais.',
        'Registrar resultado por condição. O checklist técnico não é comprovação integral de conformidade legal.'
      ],
      fontes: [{ titulo: 'LGPD — texto atualizado, arts. 6, 8, 9, 11, 15, 16 e 18', url: 'https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html' }]
    },
    {
      id: 'RNF03',
      nome: 'Acesso exclusivo da usuária',
      descricao: 'Os dados pessoais de ciclo, sintomas, disposição, tarefas e demais registros da conta devem ser acessíveis somente pela própria usuária nos fluxos que os manipulam.',
      classificacao: 'Segurança da informação',
      criterio: 'Acesso próprio permitido e acesso indevido negado em todos os fluxos aplicáveis; conferir proteção criptográfica separadamente.',
      situacao: 'Cobertura revisada na #39; criptografia incorpora a proposta histórica RNF-novo e aguarda validação e definição técnica. Verificações do produto não executadas.',
      condicoes: [
        'Nos fluxos autenticados, validar a titularidade nas operações de leitura, criação, edição, exclusão e exportação. Cadastro da conta e solicitação de recuperação podem ocorrer sem sessão, mas não permitem acessar dados protegidos antes da comprovação de titularidade. Esconder controles não substitui autorização no serviço responsável.',
        'Proteger tarefas, recomendações, históricos, relatórios, preferências e fluxos de recuperação e exclusão, conforme as histórias ligadas.',
        'Em HU26, liberar dados somente após comprovar titularidade; conferir expiração e uso único das credenciais de recuperação. A solicitação não deve revelar se a conta existe.',
        'Criptografia proposta: proteger dados pessoais em trânsito e em repouso, incluindo armazenamento local e backups existentes. Não guardar chaves junto de dados exportados nem expor segredos nas evidências.'
      ],
      verificacao: [
        'Usar duas contas fictícias A e B. Inventariar operações por história e conferir sucesso de A nos próprios dados e negação com B, sem sessão e com sessão expirada.',
        'Repetir operações trocando identificadores de conta, tarefa, registro e relatório. A resposta não pode revelar nem modificar dados de terceiros.',
        'Em HU26, verificar titularidade, expiração e reutilização. Em HU36, negar exclusão por outra conta e invalidar acesso após exclusão da própria conta.',
        'Inspecionar transporte, banco, armazenamento Android e backups. Registrar mecanismos criptográficos e gestão de chaves sem revelar segredos. A equipe deve definir a solução técnica antes de aprovar essa condição.'
      ]
    },
    {
      id: 'RNF04',
      nome: 'Agilidade no registro',
      descricao: 'O registro de sintomas e disposição e a sinalização de sobrecarga devem exigir poucas interações.',
      classificacao: 'Usabilidade',
      criterio: 'Cada fluxo aplicável deve ser concluído em no máximo 3 toques desde a tela inicial, incluindo abertura, preenchimento e confirmação.',
      situacao: 'Roteiro proposto; viabilidade não comprovada. Ensaio pendente de protótipo publicado e execução.',
      condicoes: [
        'HU04: com sessão válida, registrar dois sintomas de intensidades diferentes e a disposição, partindo da tela inicial sem dados previamente preenchidos.',
        'HU02: sinalizar sobrecarga em ensaio separado. HU08: conferir o fluxo próprio de informe de sintomas quando for planejado, sem presumir cobertura pelo ensaio de HU04.',
        'Contar cada seleção e confirmação; gestos adicionais devem ser identificados, sem escondê-los da avaliação do esforço de interação.'
      ],
      verificacao: [
        'Publicar link e versão do protótipo clicável. Aproveitar o roteiro do PR #49 e alinhar os dados de HU04 com a #38 quando incorporada, sem duplicar suas regras.',
        'Registrar a sequência completa e a contagem observada. Não registrar aprovação sem ensaio; se ultrapassar o limite, reprovar e submeter mudança de interface ou meta à validação.',
        'Após implementação, repetir no app Android; aprovação do protótipo não substitui a verificação do produto.'
      ]
    },
    {
      id: 'RNF06',
      nome: 'Tempo de exibição da recomendação',
      descricao: 'A recomendação do dia deve ser exibida em até 3 segundos após o acesso.',
      classificacao: 'Desempenho',
      criterio: 'Cada uma das 5 medições por cenário e ambiente deve ser menor ou igual a 3 s; qualquer ultrapassagem reprova o ensaio.',
      situacao: 'Verificação adiada: fora do DoD até a equipe escolher uma ferramenta de medição. O protocolo fica documentado para quando ela for escolhida.',
      condicoes: [
        'Início: acionamento do acesso à recomendação. Fim: lista completa exibida e utilizável. Incluir comunicação, processamento e apresentação do resultado, sem incluir o tempo de preenchimento pela usuária.',
        'A média serve apenas para diagnóstico e não compensa uma execução acima do limite. Falha de operação ou ausência de resultado não conta como aprovação.'
      ],
      verificacao: [
        'Aplicar o protocolo comum de desempenho Android abaixo e registrar resultado individual para cada execução.'
      ],
      protocoloComum: 'desempenhoAndroid'
    },
    {
      id: 'RNF07',
      nome: 'Tempo de reajuste da recomendação',
      descricao: 'O reajuste da recomendação deve aparecer em até 2 segundos após o registro de disposição.',
      classificacao: 'Desempenho',
      criterio: 'Cada uma das 5 medições por cenário e ambiente deve ser menor ou igual a 2 s; qualquer ultrapassagem reprova o ensaio.',
      situacao: 'Verificação adiada: fora do DoD até a equipe escolher uma ferramenta de medição. O protocolo fica documentado para quando ela for escolhida.',
      condicoes: [
        'Início: acionamento de salvar a disposição ou sinalizar sobrecarga, em ensaios separados. Fim: lista reajustada exibida e utilizável. Incluir comunicação, processamento e apresentação do resultado, sem incluir o tempo de preenchimento pela usuária.',
        'A média serve apenas para diagnóstico e não compensa uma execução acima do limite. Falha de operação ou ausência de resultado não conta como aprovação.'
      ],
      verificacao: [
        'Aplicar o protocolo comum de desempenho Android abaixo e registrar resultado individual para cada execução.'
      ],
      protocoloComum: 'desempenhoAndroid'
    },
    {
      id: 'RNF08',
      nome: 'Tempo de confirmação do registro',
      descricao: 'A confirmação do registro de sintomas e disposição e da sinalização de sobrecarga deve aparecer em até 2 segundos.',
      classificacao: 'Desempenho',
      criterio: 'Cada uma das 5 medições por cenário e ambiente deve ser menor ou igual a 2 s; qualquer ultrapassagem reprova o ensaio.',
      situacao: 'Verificação adiada: fora do DoD até a equipe escolher uma ferramenta de medição. O protocolo fica documentado para quando ela for escolhida.',
      condicoes: [
        'Início: acionamento de salvar o registro ou sinalizar sobrecarga, em ensaios separados. Fim: confirmação visível da operação concluída, sem sucesso prematuro. Incluir comunicação, processamento e apresentação do resultado, sem incluir o tempo de preenchimento pela usuária.',
        'A média serve apenas para diagnóstico e não compensa uma execução acima do limite. Falha de operação ou ausência de resultado não conta como aprovação.'
      ],
      verificacao: [
        'Aplicar o protocolo comum de desempenho Android abaixo e registrar resultado individual para cada execução.'
      ],
      protocoloComum: 'desempenhoAndroid'
    },
    {
      id: 'RNF09',
      nome: 'Senha de pétalas',
      descricao: 'O PIN deve ser informado pela sequência de toques em pétalas de uma flor.',
      classificacao: 'Restrição de design',
      criterio: 'A tela de PIN apresenta 6 pétalas selecionáveis e o PIN é formado pela sequência de 4 toques.'
    },
    {
      id: 'RNF10',
      nome: 'Compatibilidade de telas',
      descricao: 'A interface deve funcionar nos dispositivos Android suportados pelo aplicativo, adaptando-se às telas e escalas de fonte definidas na matriz de suporte.',
      classificacao: 'Suportabilidade (compatibilidade)',
      criterio: 'Todos os fluxos devem funcionar nos aparelhos e versões Android da matriz de suporte, sem controles inacessíveis ou conteúdo cortado.',
      situacao: 'Verificação adiada: o ensaio em aparelho Android físico fica fora do DoD por enquanto.',
      condicoes: [
        'A plataforma desta entrega é o aplicativo React Native para Android. Não exigir compatibilidade com navegador, computador ou iOS.',
        'A matriz de suporte deve identificar versões Android, aparelhos, resolução, densidade e escalas de fonte normal e ampliada. Extrair o mínimo Android da configuração real do aplicativo, sem presumir uma versão.',
        'Conferir telas, diálogos, listas, formulários, teclado aberto, mensagens e confirmação das ações em cada configuração da matriz.'
      ],
      verificacao: [
        'Antes da execução, publicar a matriz de suporte com a build avaliada. Enquanto a matriz não estiver definida, registrar pendência e não aprovar compatibilidade.',
        'Executar os fluxos em aparelhos Android físicos representativos. Emuladores e inspeção de layout complementam o ensaio; não substituir todos os aparelhos por emulação.',
        'Registrar fluxo, aparelho, Android, configuração de tela/fonte, resultado e evidência conforme o DoD. Conferir ausência de sobreposição, corte e controles inacessíveis.'
      ],
      todasAsHistorias: true
    },
    {
      id: 'RNF11',
      nome: 'Contraste legível',
      descricao: 'Os textos devem ter contraste legível.',
      classificacao: 'Usabilidade (acessibilidade)',
      criterio: 'Textos devem atender ao contraste mínimo WCAG 2.1 AA, medido nas telas e estados do aplicativo Android.',
      situacao: 'Protocolo documentado; verificação do aplicativo não executada.',
      condicoes: [
        'Exigir contraste de pelo menos 4,5:1 para texto comum e 3:1 para texto grande segundo o critério 1.4.3. Documentar a classificação pelo tamanho efetivo e peso, sem equiparar automaticamente sp a pt.',
        'Conferir temas disponíveis e estados normal, foco, erro e seleção, incluindo diálogos e mensagens dinâmicas; registrar exceções previstas no critério quando aplicáveis.'
      ],
      verificacao: [
        'Inspecionar as telas da build Android e medir cores de texto e fundo com ferramenta de contraste. Android Accessibility Scanner e inspeção de layout podem apoiar a avaliação, sem substituir os estados não cobertos.',
        'Registrar elemento, tela, tema, estado, cores, tamanho efetivo, peso, razão medida, ferramenta e resultado. Conferir sobreposições e fundos variáveis.',
        'Relatórios do Lighthouse ou testes do Pages não constituem evidência de contraste do app. Anexar medições ao registro do DoD.'
      ],
      fontes: [{ titulo: 'W3C — contraste mínimo, WCAG 2.1, critério 1.4.3', url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum' }],
      todasAsHistorias: true
    }
  ],

  // Alterações em cada história ou RNF, com a data e o motivo. `video` aponta o
  // momento da reunião em que a decisão foi tomada.
  // Glossário do produto (Requisitos > Glossário). Veio da Seção 8 do antigo
  // Documento de Visão, com os RFs trocados pelas HUs de mesmo número.
  // historias e rnfs são os códigos onde o termo aparece.
  glossario: [
    { termo: 'Usuária', definicao: 'Pessoa que utiliza o MindCycle. Grafia única em todo o material.' },
    { termo: 'Fase do ciclo', definicao: 'Uma das quatro fases reconhecidas pelo produto: menstrual, folicular, ovulatória e lútea.', historias: ['HU05'] },
    { termo: 'Menstruação', definicao: 'Intervalo iniciado na data de início do sangramento registrada pela usuária. O termo "período" não é usado, para evitar ambiguidade.', historias: ['HU06'] },
    { termo: 'Ciclo irregular', definicao: 'Situação em que a usuária declara não ter duração média estável de ciclo.', historias: ['HU07'] },
    { termo: 'Registro de sintomas e disposição', definicao: 'Registro feito pela usuária com os sintomas sentidos e o seu nível de disposição. É a base da sinalização de sobrecarga, da estimativa de fase, da recomendação do dia, do reajuste e do relatório de sintomas.', historias: ['HU04', 'HU02', 'HU08', 'HU13', 'HU15', 'HU35'] },
    { termo: 'Disposição', definicao: 'Nível de energia e ânimo informado pela usuária no registro diário.', historias: ['HU04'] },
    { termo: 'Sobrecarga', definicao: 'Sinalização pontual, feita a qualquer momento do dia, de que a usuária está sobrecarregada ou indisposta e precisa que as tarefas do dia sejam readequadas.', historias: ['HU02'] },
    { termo: 'Sintoma', definicao: 'Manifestação física ou emocional associada ao ciclo, informada pela usuária no registro.', historias: ['HU04', 'HU01'] },
    { termo: 'Intensidade do sintoma', definicao: 'Grau com que a usuária sente um sintoma físico, informado no registro de sintomas e disposição.', historias: ['HU04'] },
    { termo: 'Medicação', definicao: 'Medicamento de uso diário (contínuo) ou esporádico informado pela usuária.', historias: ['HU30'] },
    { termo: 'Diagnóstico prévio', definicao: 'Condição de saúde já diagnosticada antes do uso do produto, como diabetes, hipertensão ou enxaqueca, informada pela usuária.', historias: ['HU34'] },
    { termo: 'Atividade de acolhimento favorita', definicao: 'Atividade de acolhimento que a usuária marca como de sua preferência.', historias: ['HU33'] },
    { termo: 'Prioridade', definicao: 'Importância da tarefa informada pela usuária no cadastro. Diferente da ordem de precedência, que o sistema calcula.', historias: ['HU17'] },
    { termo: 'Prazo', definicao: 'Data-limite da tarefa informada pela usuária no cadastro. Permanece inalterado quando a tarefa é adiada.', historias: ['HU17', 'HU18'] },
    { termo: 'Energia necessária', definicao: 'Nível de energia que a usuária estima que a tarefa exige, informado no cadastro e comparado à disposição registrada para compor a ordem de precedência.', historias: ['HU17', 'HU13'] },
    { termo: 'Tarefas do dia', definicao: 'Tarefas cuja execução está prevista para o dia corrente.', historias: ['HU13'] },
    { termo: 'Ordem de precedência', definicao: 'Sequência das tarefas do dia calculada pelo sistema a partir da disposição registrada, da energia necessária, do prazo e da prioridade de cada tarefa. Diferente de prioridade, que é informada pela usuária.', historias: ['HU13', 'HU15'] },
    { termo: 'Recomendação do dia', definicao: 'Lista das tarefas do dia em ordem de precedência, produzida pela recomendação e reajustada quando a usuária sinaliza sobrecarga ou muda a disposição.', historias: ['HU13', 'HU15'] },
    { termo: 'Atividade de acolhimento', definicao: 'Prática breve de autocuidado sugerida pelo produto e passível de registro pela usuária.', historias: ['HU21', 'HU24'] },
    { termo: 'Mensagem de acolhimento', definicao: 'Texto de apoio apresentado à usuária, sem linguagem de cobrança ou de culpa.', historias: ['HU22'] },
    { termo: 'Retrospectiva mensal', definicao: 'Consolidação, ao final de cada mês, das tarefas concluídas e das atividades de acolhimento realizadas no período.', historias: ['HU23'] },
    { termo: 'Relatório mensal', definicao: 'Consolidação completa do mês da usuária: fases do ciclo e menstruação, sintomas e disposição registrados e a retrospectiva mensal (tarefas concluídas e atividades de acolhimento).', historias: ['HU23', 'HU31', 'HU32'] },
    { termo: 'Relatório de sintomas', definicao: 'Histórico dos sintomas registrados, com intensidade e frequência, preparado para ser levado a uma consulta médica. Mais restrito que o relatório mensal.', historias: ['HU35'] },
    { termo: 'PIN', definicao: 'Credencial que protege o acesso à conta. Na primeira versão é numérico; a forma-alvo é a senha de pétalas.', historias: ['HU11'], rnfs: ['RNF09'] },
    { termo: 'Senha de pétalas', definicao: 'Forma de informar o PIN pela sequência de toques nas pétalas de uma flor exibida na tela, como um desenho de desbloqueio em que as pétalas ocupam o lugar dos pontos.', historias: ['HU11'], rnfs: ['RNF09'] }
  ],

  historico: {
    HU01: [
      {
        data: '16/11/2026',
        alteracao: 'Incluído vínculo com RNF03.',
        motivo: 'Verificação do DoR revisado: a consulta usa a fase atual, calculada a partir dos dados do ciclo da usuária, como a HU09.'
      }
    ],
    HU32: [
      {
        data: '12/11/2026',
        alteracao: 'Vinculada a exportação ao relatório de HU23; proposto formato PDF.',
        motivo: 'Issue #38: conteúdo e formato ainda dependem de validação, permanecendo fora do MVP.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Benefício especificado e lacuna de refinamento registrada no backlog.',
        motivo: 'Distinguir exportação de relatório de sua comparação e tornar visível a dependência da geração mensal.'
      }
    ],
    HU31: [
      {
        data: '12/11/2026',
        alteracao: 'Vinculada a comparação ao conteúdo mensal de HU23.',
        motivo: 'Issue #38: explicitar a origem do relatório e o tratamento de meses sem dados, sem duplicar seu conteúdo.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Benefício especificado e lacuna de refinamento registrada no backlog.',
        motivo: 'Distinguir comparação de relatórios de sua exportação e tornar visível a dependência da geração mensal.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluídos vínculos com RNF02 e RNF03 para tratamento e proteção dos dados do relatório.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU23: [
      {
        data: '12/11/2026',
        alteracao: 'Proposta ampliação da retrospectiva como origem do relatório mensal.',
        motivo: 'Issue #38: consolidar as entradas consumidas por HU31 e HU32. Ampliação e reestimativa pendentes; não altera o MVP nem representa confirmação da cliente.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluídos vínculos com RNF02 e RNF03 para tratamento e proteção dos dados do relatório.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU30: [
      {
        data: '12/11/2026',
        alteracao: 'Separados os critérios de cadastro, alteração e exclusão, mantendo uma única história.',
        motivo: 'Issue #38: esforço corresponde ao conjunto das operações e aguarda reestimativa antes do planejamento.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Benefício da história tornado específico.',
        motivo: 'Substituir a justificativa genérica de manter dados pela consulta do uso de medicação.'
      }
    ],
    HU18: [
      {
        data: '12/11/2026',
        alteracao: 'Distinguido o adiamento manual da movimentação automática de HU15.',
        motivo: 'Issue #38: referenciar as regras propostas do PR #49 sem duplicá-las.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU08: [
      {
        data: '12/11/2026',
        alteracao: 'Corrigida a justificativa de exclusão do MVP.',
        motivo: 'Issue #38: estimativa por sintomas é distinta do cálculo pelas entradas de HU06 e HU07.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU02: [
      {
        data: '16/11/2026',
        alteracao: 'Incluído vínculo com RNF02.',
        motivo: 'Verificação do DoR revisado: a sinalização grava que a usuária está sobrecarregada ou indisposta, um dado de saúde, como a disposição da HU04.'
      },
      {
        data: '08/11/2026',
        alteracao: 'Ganhou critérios explícitos de RNF04 e RNF08.',
        motivo: 'Decisão do achado 02: os dois RNFs valem para a sinalização e para o registro.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluídos vínculos com RNF03 para proteção dos dados e RNF07 para o tempo de reajuste após sinalizar sobrecarga.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU04: [
      {
        data: 'Sem data no site',
        alteracao: 'Entrou no catálogo com nome derivado do vínculo citado em RNF02, RNF03, RNF04 e RNF08.',
        motivo: 'Era citado por esses RNFs, mas não tinha card no quadro. Card ainda pendente.'
      },
      {
        data: '08/11/2026',
        alteracao: 'Card no quadro deixou de ser pendência.',
        motivo: 'Decisão do achado 01: o catálogo do site é o vigente, e o quadro do Figma é fotografia histórica de 28/09/2026.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Detalhados campos, intensidades, frequência e correção como proposta.',
        motivo: 'Issue #38: alinhar o dado-fonte ao registro mais recente usado pelas regras do PR #49; não atribuir escalas à validação de 05/10.'
      }
    ],
    HU10: [
      {
        data: '08/11/2026',
        alteracao: 'Característica: CP3 → CP2.',
        motivo: 'Decisão do achado 06: o calendário trata de acompanhar o ciclo, não de privacidade.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      },
      {
        data: '16/11/2026',
        alteracao: 'Incluída no MVP, na Iteração 7, com regras propostas e pendências com a cliente.',
        motivo: 'Pedido da cliente na reunião de 05/10/2026 (aos 11:54) e decisão do grupo em 15/11/2026. Issue #121.'
      }
    ],
    HU05: [
      {
        data: 'Sem data no site',
        alteracao: 'Fora do MVP → no MVP.',
        motivo: 'Sem ele, a fase calculada não seria exibida à usuária em lugar nenhum.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Explicitadas entradas, contagem do dia e situações sem estimativa; modelo clínico continua pendente.',
        motivo: 'Issue #38: HU06 e HU07 registram dados, e não definem o cálculo. Limites das fases precisam de revisão da cliente.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      },
      {
        data: '16/11/2026',
        alteracao: 'Critério 1 e regra do modelo: a fase passa a ser estimada pelo modelo proposto pela equipe, sempre como estimativa, em vez de modelo pendente.',
        motivo: 'Decisão do grupo em 15/11/2026, por causa do prazo até a homologação; a cliente valida o modelo depois. Registrada na issue #82.'
      }
    ],
    HU06: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Should have → Must have.',
        motivo: 'Ajuste da cliente na reunião de validação da priorização.',
        video: {
          id: 'PKoWLngGSRg',
          tempo: 514
        }
      },
      {
        data: '12/11/2026',
        alteracao: 'Vinculada a entrada de dados à estimativa de HU05.',
        motivo: 'Issue #38: concentrar o cálculo em uma única história.'
      }
    ],
    HU07: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Could have → Should have.',
        motivo: 'Ajuste da cliente na reunião de validação da priorização.',
        video: {
          id: 'PKoWLngGSRg',
          tempo: 378
        }
      },
      {
        data: '12/11/2026',
        alteracao: 'Vinculadas duração e irregularidade à estimativa de HU05.',
        motivo: 'Issue #38: explicitar as limitações sem repetir a regra de cálculo.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU09: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Won\'t have → Should have.',
        motivo: 'Ajuste da cliente, que validou o requisito com entusiasmo.',
        video: { id: 'PKoWLngGSRg', tempo: 748 }
      },
      {
        data: '12/11/2026',
        alteracao: 'Benefício diferenciado da consulta geral sobre o ciclo.',
        motivo: 'Explicitar que a recomendação entrega informação contextual à fase e aos sintomas.'
      },
      {
        data: '13/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteção das recomendações personalizadas.',
        motivo: 'Sugestão de Arthur Palhares na revisão do PR #54: HU09 utiliza fase e sintomas da usuária, portanto sua personalização deve integrar a verificação de acesso no DoD. Conteúdos informativos genéricos não precisam ser privados.'
      }
    ],
    HU11: [
      {
        data: 'Sem data no site',
        alteracao: 'Escopo da v1 reduzido a PIN numérico; esforço de 3,0 → 1,0.',
        motivo: 'A senha de pétalas passou para entrega futura. É a única redução de escopo do MVP.'
      }
    ],
    HU13: [
      {
        data: '08/11/2026',
        alteracao: 'Ganhou regras de ordenação; o critério de aceitação passou a apontar para elas.',
        motivo: 'O critério dizia apenas que a ordem usaria energia, prazo e prioridade, sem permitir conferir o resultado.'
      },
      {
        data: '10/11/2026',
        alteracao: 'RNF06 passou a ser condição obrigatória de aceite da recomendação de tarefas do dia.',
        motivo: 'Alinhar o critério de aceite ao DoD, que exige o cumprimento dos RNFs aplicáveis à história.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Reaproveitadas as regras propostas de ordenação do PR #49.',
        motivo: 'Issue #38: incluir precedência, urgência, desempates e ausência de disposição, mantendo pendente a validação da cliente e preservando o critério de RNF06 do PR #51.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU15: [
      {
        data: '08/11/2026',
        alteracao: 'Ganhou regras de reajuste; o critério de aceitação passou a apontar para elas.',
        motivo: 'O critério não dizia o que "reajustar" significa. A redistribuição automática segue o que a cliente endossou em 05/10.'
      },
      {
        data: '10/11/2026',
        alteracao: 'RNF07 passou a ser condição obrigatória de aceite do reajuste da recomendação do dia.',
        motivo: 'Alinhar o critério de aceite ao DoD, que exige o cumprimento dos RNFs aplicáveis à história.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Reaproveitadas as regras propostas de reajuste automático do PR #49.',
        motivo: 'Issue #38: explicitar movimentação, desfazer e retorno das tarefas, preservando o critério de RNF07 do PR #51. Regras ainda não validadas pela cliente.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU17: [
      {
        data: 'Sem data no site',
        alteracao: 'Passou a incluir "energia necessária".',
        motivo: 'Decisão da equipe; o dado é usado por HU13 e HU15.'
      },
      {
        data: '08/11/2026',
        alteracao: 'História e critério de aceitação passaram a citar a energia necessária.',
        motivo: 'Só a descrição citava o campo, e sem ele as regras de HU13 e HU15 não podem ser aplicadas.'
      },
      {
        data: '12/11/2026',
        alteracao: 'História e critério passaram a incluir energia necessária, conforme PR #49.',
        motivo: 'Issue #38: a entrada já constava da descrição e é necessária para HU13 e HU15.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU19: [
      {
        data: 'Sem data no site',
        alteracao: 'Redação padronizada a partir de "Deve ser possível o usuário deletar a tarefa criada".',
        motivo: 'Padronização da redação do catálogo.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU21: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Could have → Should have.',
        motivo: 'Ajuste da cliente, que defendeu atividade física e respiração.',
        video: {
          id: 'PKoWLngGSRg',
          tempo: 286
        }
      }
    ],
    HU22: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Should have → Must have.',
        motivo: 'Ajuste da cliente na reunião de validação da priorização.',
        video: {
          id: 'PKoWLngGSRg',
          tempo: 661
        }
      }
    ],
    HU26: [
      {
        data: 'Sem data no site',
        alteracao: 'Fora do MVP → no MVP.',
        motivo: 'O reset manual pela equipe contrariaria o RNF03.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU28: [
      {
        data: '12/10/2026',
        alteracao: 'Fora do MVP → no MVP.',
        motivo: 'Reavaliação: educação sobre regularidade pedida pela cliente. Nota ainda em hipótese.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Benefício diferenciado da recomendação contextual de conteúdo.',
        motivo: 'Explicitar que a consulta ensina a distinguir as quatro fases do ciclo.'
      }
    ],
    HU34: [
      {
        data: '12/11/2026',
        alteracao: 'Benefício da história tornado específico.',
        motivo: 'Relacionar a consulta dos diagnósticos ao acompanhamento dos sintomas.'
      }
    ],
    HU29: [
      {
        data: 'Sem data no site',
        alteracao: 'Incluído no catálogo.',
        motivo: 'Faltava um requisito de preferência na CP7 (achado 05).'
      },
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU35: [
      {
        data: '05/10/2026',
        alteracao: 'Levantado como requisito novo.',
        motivo: 'Sugestão da equipe, detalhada pela cliente: relatório para levar à consulta médica.',
        video: {
          id: 'PKoWLngGSRg',
          tempo: 973
        }
      },
      {
        data: '12/10/2026',
        alteracao: 'Numeração anterior: 28 → 35.',
        motivo: 'O mesmo número designava requisitos diferentes no catálogo e na priorização (achado 13).'
      }
    ],
    HU36: [
      {
        data: 'Iteração 4',
        alteracao: 'Incluído no catálogo.',
        motivo: 'Exigência da LGPD que estava fora do catálogo e do backlog.'
      },
      {
        data: '12/10/2026',
        alteracao: 'Numeração anterior: 29 → 36.',
        motivo: 'O mesmo número designava requisitos diferentes no catálogo e na priorização (achado 13).'
      },
      {
        data: 'Sem data no site',
        alteracao: 'Fora do MVP → no MVP.',
        motivo: 'Direito legal da titular (LGPD, art. 18), contrapartida do consentimento.'
      }
    ],
    RNF04: [
      {
        data: '08/11/2026',
        alteracao: 'Passou a valer também para a sinalização de sobrecarga (HU02).',
        motivo: 'Decisão do achado 02: sinalizar é um registro rápido de disposição, e o quadro apontava para as duas histórias.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF08: [
      {
        data: '08/11/2026',
        alteracao: 'Passou a valer também para a sinalização de sobrecarga (HU02).',
        motivo: 'Decisão do achado 02: sinalizar é um registro rápido de disposição, e o quadro apontava para as duas histórias.'
      },
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF09: [
      {
        data: 'Sem data no site',
        alteracao: 'Classificação no MVP: evolutivo.',
        motivo: 'A primeira versão usa PIN numérico; as pétalas ficam para depois.'
      }
    ],
    HU33: [
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU25: [
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU24: [
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU20: [
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU16: [
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    HU14: [
      {
        data: '12/11/2026',
        alteracao: 'Incluído vínculo com RNF03 para proteger os fluxos de dados da história.',
        motivo: 'Issue #39, em conjunto com #37: cobertura única no cadastro, sem duplicar critérios nem registrar aprovação do produto.'
      }
    ],
    RNF11: [
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF10: [
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF07: [
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF06: [
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF03: [
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ],
    RNF02: [
      {
        data: '12/11/2026',
        alteracao: 'Revisados critérios, condições e protocolo de verificação na issue #39.',
        motivo: 'Adequação ao app Android, métricas individuais e compromissos verificáveis; propostas e ensaios pendentes estão identificados no RNF. Evidências devem ser registradas no DoD da respectiva história de usuário.'
      }
    ]
  },

  // Reuniões gravadas. `id` é o código do vídeo no YouTube; `tempo` é o segundo
  // do vídeo em que cada decisão foi tomada.
  reunioes: [
    {
      id: 'eiYSegBAikA',
      tipo: 'Concepção · Iteração 1',
      nome: 'Definição do problema',
      meta: 'Gravação de 18:18 · Reunião da equipe',
      decisoes: [
        { tempo: 70, tipo: 'Decisão', texto: 'Usar o diagrama de Ishikawa para chegar ao problema real.', historias: [] },
        { tempo: 329, tipo: 'Escopo', texto: 'Focar primeiro no mercado de trabalho; expandir depois, se der.', historias: [] },
        { tempo: 453, tipo: 'Decisão', texto: 'O problema é o que o app alcança: adaptar a rotina da mulher, não mudar o mercado.', historias: [] },
        { tempo: 625, tipo: 'Escopo', texto: 'Retirar dos objetivos a interface que muda conforme a fase; basta um design limpo.', historias: [] },
        { tempo: 809, tipo: 'Requisito', texto: 'Indicar atividades mais leves nos períodos de baixa disposição.', historias: ['HU21'] },
        { tempo: 891, tipo: 'Requisito', texto: 'Criar uma retrospectiva ao fim do ciclo.', historias: ['HU23'] },
        { tempo: 1065, tipo: 'Tarefa', texto: 'Consolidar o PDF da proposta até domingo e enviar ao grupo para avaliação.', historias: [] }
      ]
    },
    {
      id: 'RH9t-HPfwcg',
      tipo: 'Concepção · Iteração 2',
      nome: 'Protótipo e objetivos',
      meta: 'Gravação de 2:18:52 · Reunião da equipe',
      decisoes: [
        { tempo: 32, tipo: 'Decisão', texto: 'Prototipar em baixa fidelidade no Figma e derivar os requisitos do protótipo.', historias: [] },
        {
          tempo: 679,
          tipo: 'Requisito',
          texto: 'Tratar ciclo regular e irregular; sem saber a fase, estimar por sintomas.',
          historias: ['HU07', 'HU08']
        },
        { tempo: 1503, tipo: 'Requisito', texto: 'A tela inicial mostra tarefas, sintomas, fase e dias até o próximo ciclo.', historias: ['HU05'] },
        {
          tempo: 2252,
          tipo: 'Requisito',
          texto: 'Cadastrar tarefa com prioridade e prazo, que definem a indicação do dia.',
          historias: ['HU13', 'HU17']
        },
        { tempo: 2484, tipo: 'Escopo', texto: 'Considerar só a integração com GitHub; outras ferramentas ficam para o futuro.', historias: [] },
        { tempo: 2699, tipo: 'Decisão', texto: 'Toda correção passa primeiro pelo Google Docs e só depois vai para o site.', historias: [] },
        { tempo: 3843, tipo: 'Decisão', texto: 'Manter o tema do ciclo menstrual, já validado pelo professor.', historias: [] },
        { tempo: 6417, tipo: 'Requisito', texto: 'Trocar o OE para melhorar a percepção dos sintomas, por ser mensurável.', historias: [] },
        {
          tempo: 7897,
          tipo: 'Tarefa',
          texto: 'Cada integrante lista seus requisitos a partir do Figma; Ana marca a comparação à noite.',
          historias: []
        }
      ]
    },
    {
      id: 'PKoWLngGSRg',
      tipo: 'Elaboração · Validação com a cliente',
      nome: 'Conversa com a Dra. Cláudia',
      meta: '05/10/2026 · Gravação de 34:41 · Equipe: Ana Luisa, Arthur Palhares, Luana, Tiago e Pedro Ian',
      decisoes: [
        { tempo: 0, tipo: 'Refinamento', texto: 'Rever a lista de sintomas: triste e chorosa, ansiosa, bem e com energia.', historias: ['HU04'] },
        { tempo: 200, tipo: 'Refinamento', texto: 'Separar cansaço de desânimo, por serem sensações diferentes.', historias: ['HU04'] },
        {
          tempo: 243,
          tipo: 'Confirmado',
          texto: 'Manter o botão de sobrecarga, o adiamento e o reajuste automático do dia.',
          historias: ['HU02', 'HU15', 'HU18']
        },
        { tempo: 286, tipo: 'Nota ajustada', texto: 'Atividade física faz parte do produto: sobe de Could para Should.', historias: ['HU21'] },
        {
          tempo: 378,
          tipo: 'Nota ajustada',
          texto: 'Ensinar a contar o ciclo e entender regularidade: sobe de Could para Should.',
          historias: ['HU07']
        },
        {
          tempo: 514,
          tipo: 'Nota ajustada',
          texto: 'A regularidade é "a grande dúvida", o que torna a data de início essencial: sobe de Should para Must.',
          historias: ['HU06']
        },
        { tempo: 568, tipo: 'Refinamento', texto: 'Incluir exercícios de respiração nas atividades de acolhimento.', historias: ['HU21'] },
        { tempo: 625, tipo: 'Confirmado', texto: 'Aprovar o fluxo de tarefas com prioridade, prazo e energia.', historias: ['HU13'] },
        { tempo: 644, tipo: 'Confirmado', texto: 'Lembrete no estilo de mensagem diária segue como Could.', historias: ['HU03'] },
        {
          tempo: 661,
          tipo: 'Nota ajustada',
          texto: 'Mensagens interativas de acolhimento completam o produto: sobem de Should para Must.',
          historias: ['HU22']
        },
        { tempo: 714, tipo: 'Confirmado', texto: 'Manter o calendário com cores por fase.', historias: ['HU10'] },
        { tempo: 748, tipo: 'Nota ajustada', texto: 'Explicação por fase reduz a autoculpa: sobe de Won\'t para Should.', historias: ['HU09'] },
        { tempo: 865, tipo: 'Refinamento', texto: 'Incluir o intervalo entre ciclos na retrospectiva, sem mudar a nota.', historias: ['HU23'] },
        { tempo: 973, tipo: 'Requisito novo', texto: 'Exportar relatório de sintomas para levar à consulta médica.', historias: ['HU35'] },
        {
          tempo: 1102,
          tipo: 'Fora do MVP',
          texto: 'Alertas que cruzam sintomas viram tema de pesquisa, pois exigem validação clínica e jurídica.',
          historias: []
        },
        {
          tempo: 1499,
          tipo: 'Escopo',
          texto: 'Fertilidade, vacina e exame preventivo ficam fora: o foco é produtividade e sobrecarga.',
          historias: []
        },
        {
          tempo: 1901,
          tipo: 'Encaminhamento',
          texto: 'Nova reunião em cerca de quatro semanas, após priorizar e validar com o professor.',
          historias: []
        }
      ]
    },
    {
      id: 'Je44KbpoASk',
      tipo: 'Elaboração · Iteração 4',
      nome: 'MoSCoW e andamento',
      meta: 'Gravação de 18:01 · Reunião da equipe',
      decisoes: [
        { tempo: 21, tipo: 'Decisão', texto: 'Classificar os requisitos por impacto e esforço, um a um.', historias: [] },
        { tempo: 213, tipo: 'Decisão', texto: 'O algoritmo de recomendação concentra o maior esforço técnico.', historias: ['HU13'] },
        { tempo: 272, tipo: 'Escopo', texto: 'Retrospectiva mensal perde prioridade, pensando no MVP.', historias: ['HU23'] },
        { tempo: 568, tipo: 'Tarefa', texto: 'Todos preenchem o formulário e a planilha de horários livres.', historias: [] },
        { tempo: 658, tipo: 'Decisão', texto: 'Reunir as evidências de cada iteração nas fases do OpenUP.', historias: [] },
        { tempo: 706, tipo: 'Decisão', texto: 'Deixar a documentação mais sucinta, com menos texto.', historias: [] },
        { tempo: 746, tipo: 'Tarefa', texto: 'Reorganizar a Engenharia de Requisitos por fases do OpenUP.', historias: [] },
        { tempo: 856, tipo: 'Tarefa', texto: 'Mapa de stakeholders regerado após a mudança de cliente e usuária.', historias: [] },
        { tempo: 973, tipo: 'Decisão', texto: 'Toda alteração por pull request, com revisão pedida no grupo.', historias: [] }
      ]
    },
    {
      id: 'YG6LqnZY8J4',
      tipo: 'Elaboração · Teste com usuária',
      nome: 'Teste com Usuária - MindFlow',
      meta: 'Gravação de 14:50 · Teste de usabilidade do protótipo com Daniela Soares',
      decisoes: [
        { tempo: 44, tipo: 'Refinamento', texto: 'O botão de criar conta está pequeno e foi difícil de achar.', historias: ['HU11'] },
        { tempo: 112, tipo: 'Refinamento', texto: 'Não ficou claro como encontrar e usar o PIN enviado por e-mail.', historias: ['HU12'] },
        { tempo: 214, tipo: 'Refinamento', texto: 'O botão "Estou sobrecarregada" não foi entendido sem explicação da equipe.', historias: ['HU02'] },
        { tempo: 256, tipo: 'Confirmado', texto: 'Entendeu e aprovou o dia reajustado só com o essencial: "coloca só as tarefas que é essencial para não me sobrecarregar".', historias: ['HU02', 'HU15'] },
        { tempo: 270, tipo: 'Refinamento', texto: 'A opção "Fazer uma pausa / adiar / cuidar de si" confundiu; pediu para esclarecer o objetivo dela.', historias: ['HU15', 'HU18'] },
        { tempo: 338, tipo: 'Refinamento', texto: 'Faltou um jeito de voltar da tela do dia reajustado, e a rolagem não foi percebida.', historias: ['HU15'] },
        { tempo: 407, tipo: 'Refinamento', texto: 'Prioridade e duração ajudam a organizar o tempo e tiram a pressão de terminar; horário ficou como "talvez".', historias: ['HU13'] },
        { tempo: 477, tipo: 'Refinamento', texto: 'Teve dúvida ao salvar a tarefa e ao marcá-la como concluída.', historias: ['HU13'] },
        { tempo: 597, tipo: 'Confirmado', texto: 'A explicação por fase é útil, porque muitas mulheres não entendem as próprias fases do ciclo.', historias: ['HU09'] },
        { tempo: 628, tipo: 'Refinamento', texto: 'Ao aceitar os termos e voltar, o app reiniciou a entrada e ela precisou refazer o acesso. Os termos foram aceitos sem comentário.', historias: ['HU11'] },
        { tempo: 763, tipo: 'Refinamento', texto: 'Sugeriu dicas explicativas e um guia no primeiro acesso, especialmente para "Estou sobrecarregada".', historias: ['HU02'] }
      ]
    }
  ],

  // Vídeos de apresentação das entregas (código do vídeo no YouTube).
  apresentacoes: [
    { fase: 'Entrega', nome: 'Apresentação da Unidade 1', video: 'NW8RUETjsws' },
    { fase: 'Entrega', nome: 'Apresentação da Unidade 2', video: 'v2rkFmI8DJ8' },
    { fase: 'Entrega', nome: 'Apresentação da Unidade 3', video: 'gMWrxOmBBQI' }
  ],

  // Atividades da engenharia de requisitos: as linhas do painel de fases.
  atividades: [
    'Elicitação e Descoberta',
    'Análise e Consenso',
    'Declaração',
    'Representação',
    'Verificação e Validação',
    'Organização e Atualização'
  ],

  // Fases do OpenUP. praticas[].atividade é o índice em `atividades`. Os links
  // das evidências são relativos à raiz do site; vídeos, endereços completos.
  // iteracoes[].numero liga a iteração às histórias (historias[].iteracao) e a
  // iteracaoAtual; o nome é só o que aparece na página.
  // iteracoes[].registro: compromisso, responsaveis, resultado, pendencias e
  // decisaoProxima. Campo sem fonte fica de fora e aparece como sem registro.
  fases: [
    {
      nome: 'Concepção',
      rotulo: 'Iterações 1 e 2',
      foco: 'Compreender o problema e definir a visão do produto, em trabalho conduzido pela própria equipe.',
      praticas: [
        {
          atividade: 0,
          pratica: 'Levantamento interno de alternativas e análise do mercado',
          tecnicas: ['Brainstorming', 'Análise de Produtos Concorrentes'],
          resultado: 'Alternativas não punitivas de acompanhamento e lacunas dos concorrentes identificadas.'
        },
        {
          atividade: 1,
          pratica: 'Análise das causas do problema pela equipe',
          tecnicas: ['Diagrama de Ishikawa'],
          resultado: 'Causas organizadas pelos 6M e objetivos específicos derivados delas.'
        },
        {
          atividade: 2,
          pratica: 'Declaração da visão do produto',
          tecnicas: ['Catálogo de Metas'],
          resultado: 'Objetivos e características declarados, com o valor de negócio de cada característica.'
        }
      ],
      iteracoes: [
        {
          nome: 'Iteração 1',
          numero: 1,
          periodo: '11/08 a 24/08/2026',
          estado: 'Executada',
          objetivo: 'Compreender o negócio e caracterizar o problema.',
          registro: {
            compromisso: 'Caracterizar o problema com Rich Picture e Ishikawa e consolidar o PDF da proposta para avaliação do grupo.',
            responsaveis: 'Equipe, em reunião gravada. Não há autoria individual registrada.',
            resultado: 'Rich Picture e Diagrama de Ishikawa produzidos em sessões internas, com o escopo focado no mercado de trabalho. Decidido que o problema é o que o app alcança: adaptar a rotina da mulher, e não mudar o mercado.',
            pendencias: ['As causas levantadas seguem como hipótese da equipe até haver confirmação externa.'],
            decisaoProxima: 'Declarar a solução e as estratégias a partir desse recorte do problema.'
          },
          evidencias: [
            { tipo: 'Figura', titulo: 'Rich Picture', link: 'visao/#figura-1' },
            { tipo: 'Figura', titulo: 'Diagrama de Ishikawa', link: 'visao/#figura-2' },
            { tipo: 'Decisões', titulo: 'Reunião da Iteração 1', link: 'reunioes/#eiYSegBAikA' },
            { tipo: 'Vídeo', titulo: 'Gravação da iteração', link: 'https://www.youtube.com/watch?v=eiYSegBAikA' }
          ]
        },
        {
          nome: 'Iteração 2',
          numero: 2,
          periodo: '25/08 a 07/09/2026',
          estado: 'Executada',
          objetivo: 'Declarar a solução e as estratégias de engenharia de software e de requisitos.',
          registro: {
            compromisso: 'Publicar o Documento de Visão e fazer cada integrante listar seus requisitos a partir do Figma.',
            responsaveis: 'Publicação do Documento de Visão: Ana Luisa. Marca: Tiago (PR 2). Comparação dos requisitos: Ana Luisa.',
            resultado: 'Documento de Visão 1.0 publicado em 07/09/2026, com objetivos, características e estratégias.',
            pendencias: ['O contato com a cliente só começou na Elaboração.'],
            decisaoProxima: 'Prototipar em baixa fidelidade no Figma e derivar os requisitos do protótipo.'
          },
          evidencias: [
            { tipo: 'Documento', titulo: 'Visão de produto', link: 'visao/' },
            { tipo: 'Documento', titulo: 'Estratégias e justificativas', link: 'engenharia-de-requisitos/' },
            { tipo: 'Decisões', titulo: 'Reunião da Iteração 2', link: 'reunioes/#RH9t-HPfwcg' },
            { tipo: 'Vídeo', titulo: 'Gravação da iteração', link: 'https://www.youtube.com/watch?v=RH9t-HPfwcg' }
          ]
        }
      ]
    },
    {
      nome: 'Elaboração',
      rotulo: 'Iterações 3, 4 e 5',
      foco: 'Declarar, priorizar e organizar os requisitos, apresentá-los à cliente e delimitar o escopo do MVP.',
      praticas: [
        {
          atividade: 0,
          pratica: 'Levantamento de necessidades com a cliente',
          tecnicas: ['Entrevistas'],
          resultado: 'Refinamentos e sugestões levantados com a cliente profissional de saúde.'
        },
        {
          atividade: 1,
          pratica: 'Priorização e negociação do escopo do MVP',
          tecnicas: ['MoSCoW', 'Matriz Valor × Esforço', 'Negociação'],
          resultado: 'Requisitos priorizados e foco do MVP acordado com a cliente.'
        },
        {
          atividade: 2,
          pratica: 'Declaração nos níveis de negócio, usuário e produto',
          tecnicas: ['Catálogo de Metas', 'Catálogo de RF e RNF', 'Histórias com critérios'],
          resultado: 'Requisitos e histórias declarados e rastreáveis.'
        },
        {
          atividade: 3,
          pratica: 'Representação das telas do MVP',
          tecnicas: ['Protótipo de baixa fidelidade'],
          resultado: 'Telas no Figma para discutir se a interface comunica apoio em vez de cobrança.'
        },
        {
          atividade: 4,
          pratica: 'Apresentação das telas à cliente',
          tecnicas: ['Critérios de aceitação e validação com a cliente'],
          resultado: 'Fluxos avaliados pela cliente em 05/10/2026, com os apontamentos registrados; privacidade e conta não foram avaliadas.'
        },
        {
          atividade: 5,
          pratica: 'Organização do backlog e da rastreabilidade',
          tecnicas: ['Backlog hierárquico', 'Matriz de Rastreabilidade'],
          resultado: 'Backlog por característica, história e tarefa, e matriz ligando tudo.'
        }
      ],
      iteracoes: [
        {
          nome: 'Iteração 3',
          numero: 3,
          periodo: '15/09 a 28/09/2026',
          estado: 'Encerrada com pendências',
          objetivo: 'Conversar com a cliente, elicitar e declarar os requisitos nos três níveis.',
          registro: {
            compromisso: 'Conversar com a cliente e declarar requisitos, histórias e critérios, com personas e jornadas de usuário.',
            responsaveis: 'Seção de solução: Gustavo. Seção de ER: Pedro Ian. Seção de estratégias: Luana. Cerimônias e acesso às usuárias: Tiago. Catálogo de requisitos: Ana Luisa. Lições da Unidade 1: Allan Kelvin.',
            resultado: 'Requisitos e histórias com critérios declarados, e casos de uso dos requisitos de maior risco.',
            pendencias: [
              'A conversa com a cliente só aconteceu em 05/10/2026, na Iteração 4, por causa da agenda dela.',
              'Personas e jornadas não foram publicadas como artefato.'
            ],
            decisaoProxima: 'Levar a validação com a cliente para a Iteração 4, junto com a priorização.'
          },
          evidencias: [
            { tipo: 'Documento', titulo: 'Árvore de requisitos', link: '' },
            { tipo: 'Documento', titulo: 'Catálogo de Metas', link: 'engenharia-de-requisitos/#metas' }
          ]
        },
        {
          nome: 'Iteração 4',
          numero: 4,
          periodo: '29/09 a 12/10/2026',
          estado: 'Encerrada com pendências',
          objetivo: 'Analisar, priorizar e acordar o backlog e o escopo do MVP.',
          registro: {
            compromisso: 'Priorizar com a cliente, delimitar o MVP, organizar rastreabilidade, DoR e DoD e apresentar as telas do protótipo.',
            responsaveis: 'Priorização, MVP e rastreabilidade: Tiago (PR 15) e Luana (PR 24). DoR, DoD e ER: Pedro Ian (PRs 17, 20 e 22). Estratégias: Luana (PR 14). Interação com a cliente: Arthur (PR 16). Solução: Gustavo (PR 18). Requisitos: Ana Luisa (PR 21).',
            resultado: 'MVP de 22 histórias delimitado. Em 05/10/2026, a Dra. Cláudia avaliou 13 requisitos: confirmou 8 notas e ajustou 5, todas para cima.',
            pendencias: [
              'O MVP consolidado não foi apresentado à cliente.',
              'Privacidade e conta não foram pauta da reunião de 05/10/2026.',
              'As mudanças de alocação e as histórias HU35 e HU36 ficaram por levar ao Notion.'
            ],
            decisaoProxima: 'Confirmar no Planejamento da Iteração 5 as prioridades em hipótese e agendar o acompanhamento com a cliente.'
          },
          evidencias: [
            { tipo: 'Documento', titulo: 'Priorização e cálculos', link: 'priorizacao/' },
            { tipo: 'Documento', titulo: 'Composição do MVP', link: 'mvp/' },
            { tipo: 'Documento', titulo: 'DoR e DoD', link: 'dor-e-dod/' },
            { tipo: 'Decisões', titulo: 'Conversa com a Dra. Cláudia', link: 'reunioes/#PKoWLngGSRg' },
            { tipo: 'Vídeo', titulo: 'Gravação da conversa', link: 'https://www.youtube.com/watch?v=PKoWLngGSRg' },
            { tipo: 'Decisões', titulo: 'Reunião de MoSCoW', link: 'reunioes/#Je44KbpoASk' },
            { tipo: 'Vídeo', titulo: 'Gravação da reunião', link: 'https://www.youtube.com/watch?v=Je44KbpoASk' },
            { tipo: 'PR', titulo: 'Priorização, MVP e rastreabilidade', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/15' },
            { tipo: 'PR', titulo: 'Validação real da cliente', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/24' },
            { tipo: 'PR', titulo: 'Correção de inconsistências', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/30' }
          ]
        },
        {
          nome: 'Iteração 5',
          numero: 5,
          periodo: '20/10 a 02/11/2026',
          estado: 'Executada',
          objetivo: 'Refatorar a documentação para que o site acompanhe os requisitos durante a construção.',
          nota: 'A Iteração 5 ficou na Elaboração porque a documentação precisou ser refatorada antes de começar os incrementos: o site saiu do Hugo e do Documento de Visão dividido em seções e passou a ser organizado pela árvore de requisitos.',
          evidencias: [
            { tipo: 'PR', titulo: '#47: troca o Hugo por HTML, CSS e JavaScript puros', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/47' },
            { tipo: 'PR', titulo: '#48: novo fluxo do site a partir do protótipo', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/48' },
            { tipo: 'Documento', titulo: 'Árvore de requisitos', link: '' },
            { tipo: 'Documento', titulo: 'Histórico de mudanças', link: 'historico/' },
            { tipo: 'Documento', titulo: 'Reuniões', link: 'reunioes/' },
            { tipo: 'Documento', titulo: 'Engenharia de requisitos', link: 'engenharia-de-requisitos/' },
            { tipo: 'Documento', titulo: 'DoR e DoD', link: 'dor-e-dod/' },
            { tipo: 'PR', titulo: '#49: regras de HU13 e HU15 e validações do processo de ER', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/49' },
            { tipo: 'PR', titulo: '#51: revisão do DoD e acompanhamento das HUs do MVP', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/51' },
            { tipo: 'PR', titulo: '#52: regra de entrada do DoR e aplicação por história', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/52' }
          ]
        }
      ]
    },
    {
      nome: 'Construção',
      rotulo: 'Iterações 6 e 7',
      foco: 'Preparar, verificar e validar os requisitos de cada incremento.',
      praticas: [
        {
          atividade: 0,
          pratica: 'Esclarecimento das histórias da iteração',
          tecnicas: ['Entrevistas'],
          resultado: 'Dúvidas esclarecidas antes do desenvolvimento e requisitos novos levantados.'
        },
        {
          atividade: 1,
          pratica: 'Priorização de novos requisitos e negociação de ajustes',
          tecnicas: ['MoSCoW', 'Matriz Valor × Esforço', 'Negociação'],
          resultado: 'Novos requisitos priorizados e ajustes acordados.'
        },
        {
          atividade: 2,
          pratica: 'Atualização do catálogo e refinamento das histórias',
          tecnicas: ['Catálogo de RF e RNF', 'Histórias com critérios'],
          resultado: 'Histórias da iteração com critérios verificáveis.'
        },
        {
          atividade: 3,
          pratica: 'Prototipação das histórias da iteração',
          tecnicas: ['Protótipo de baixa fidelidade'],
          resultado: 'Protótipo vinculado a cada história com tela nova ou alterada.'
        },
        {
          atividade: 4,
          pratica: 'Prontidão, conclusão e demonstração do incremento',
          tecnicas: [
            'Checklist do DoR',
            'Checklist do DoD',
            'Critérios de aceitação e validação com a cliente'
          ],
          resultado: 'Só entra o que atende ao DoR, só segue o que atende ao DoD, e o incremento é validado.'
        },
        {
          atividade: 5,
          pratica: 'Refinamento do backlog e da rastreabilidade',
          tecnicas: ['Backlog hierárquico', 'Matriz de Rastreabilidade'],
          resultado: 'Backlog e matriz atualizados com os ajustes acordados.'
        }
      ],
      iteracoes: [
        {
          nome: 'Iteração 6',
          numero: 6,
          periodo: '03/11 a 16/11/2026',
          estado: 'Iteração atual',
          objetivo: 'Entregar o primeiro incremento.',
          nota: 'Todas as HUs do MVP foram implementadas nesta iteração, entre 14 e 16/11, e também a HU10, que ainda vai entrar no MVP (PR #122). Cada evidência é o PR mergeado da história.',
          evidencias: [
            { tipo: 'PR #57', titulo: 'HU25: criar conta', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/57' },
            { tipo: 'PR #94', titulo: 'HU06 e HU07: registrar início da menstruação e informar características do ciclo', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/94' },
            { tipo: 'PR #95', titulo: 'HU36: excluir conta e dados', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/95' },
            { tipo: 'PR #96', titulo: 'HU11: proteger acesso com PIN', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/96' },
            { tipo: 'PR #97', titulo: 'HU26: recuperar acesso à conta', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/97' },
            { tipo: 'PR #98', titulo: 'HU17: cadastrar tarefa', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/98' },
            { tipo: 'PR #100', titulo: 'HU04: registrar sintomas e disposição', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/100' },
            { tipo: 'PR #102', titulo: 'HU18: adiar tarefa', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/102' },
            { tipo: 'PR #107', titulo: 'HU21: sugerir atividades de acolhimento', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/107' },
            { tipo: 'PR #108', titulo: 'HU12: aceitar termos de uso', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/108' },
            { tipo: 'PR #106', titulo: 'HU28: consultar funcionamento do ciclo', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/106' },
            { tipo: 'PR #109', titulo: 'HU16 e HU19: editar tarefa e excluir tarefa', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/109' },
            { tipo: 'PR #110', titulo: 'HU13: recomendar tarefas do dia', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/110' },
            { tipo: 'PR #113', titulo: 'HU02: sinalizar sobrecarga', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/113' },
            { tipo: 'PR #114', titulo: 'HU15: reajustar recomendação do dia', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/114' },
            { tipo: 'PR #115', titulo: 'HU20: concluir tarefa', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/115' },
            { tipo: 'PR #116', titulo: 'HU22: receber mensagens de acolhimento', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/116' },
            { tipo: 'PR #117', titulo: 'HU05: consultar situação atual do ciclo', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/117' },
            { tipo: 'PR #118', titulo: 'HU10: visualizar calendário do ciclo', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/118' },
            { tipo: 'PR #119', titulo: 'HU01: consultar sintomas comuns da fase', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/119' },
            { tipo: 'PR #120', titulo: 'HU09: recomendar conteúdos sobre o ciclo', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/120' }
          ],
          atual: true
        },
        {
          nome: 'Iteração 7',
          numero: 7,
          periodo: '17/11 a 23/11/2026',
          estado: 'Prevista',
          objetivo: 'Entregar o segundo incremento.',
          nota: 'Esta semana era a primeira metade da antiga Iteração 7, da Transição, que tinha duas semanas. Na mudança de 16/11/2026, ela passou para a Construção para manter o segundo incremento, porque a Iteração 5 ficou na Elaboração.',
          evidencias: []
        }
      ]
    },
    {
      nome: 'Transição',
      rotulo: 'Iteração 8',
      foco: 'Publicar o MVP (deploy), homologá-lo com a cliente e as usuárias representativas, ajustar e entregar a versão final.',
      praticas: [
        { atividade: 1, pratica: 'Negociação dos ajustes finais', tecnicas: ['Negociação'], resultado: 'Ajustes finais acordados com a cliente.' },
        {
          atividade: 4,
          pratica: 'Verificação dos ajustes e homologação do MVP',
          tecnicas: ['Checklist do DoD', 'Critérios de aceitação e validação com a cliente'],
          resultado: 'MVP validado com a cliente pelos critérios de aceitação das histórias.'
        },
        {
          atividade: 5,
          pratica: 'Consolidação do conjunto de requisitos',
          tecnicas: ['Matriz de Rastreabilidade'],
          resultado: 'Matriz consolidada e backlog remanescente registrado para evolução futura.'
        }
      ],
      iteracoes: [
        {
          nome: 'Iteração 8',
          numero: 8,
          periodo: '24/11 a 30/11/2026',
          estado: 'Prevista',
          objetivo: 'Publicar o MVP, homologá-lo e fechar a entrega.',
          nota: 'Esta semana era a segunda metade da antiga Iteração 7, da Transição, dividida em duas na mudança de 16/11/2026.',
          evidencias: []
        }
      ]
    }
  ],

  // Riscos investigados (Entregas e cronograma). As fases não isolam as
  // disciplinas, então a tabela mostra as investigações que mudaram requisito
  // ou escopo e os riscos ainda abertos.
  //   quando      momento e forma da investigação; `video` aponta o trecho.
  //               Sem `quando`, o risco aparece como sem investigação.
  //   efeitoEm    história cujas alterações em `historico` são o efeito do
  //               risco; a tabela lê de lá, para não repetir números.
  //   efeito      efeito escrito à mão, quando não há história para ler.
  //   historias, rnfs  o que o risco toca; viram os botões de "Ligados a".
  riscos: [
    {
      risco: 'Senha de pétalas cara demais para o MVP',
      quando: 'Elaboração: estimativa técnica da equipe na priorização',
      resultado: 'O gesto de pétalas encarecia a primeira versão',
      efeitoEm: 'HU11',
      aberto: false,
      historias: ['HU11'],
      rnfs: ['RNF09']
    },
    {
      risco: 'Recuperar o acesso sem violar o acesso exclusivo',
      quando: 'Elaboração: revisão técnica da equipe',
      resultado: 'O reset manual pela equipe contrariaria o RNF03',
      efeitoEm: 'HU26',
      aberto: false,
      historias: ['HU26'],
      rnfs: ['RNF03']
    },
    {
      risco: 'Dado de saúde sem direito de exclusão',
      quando: 'Iteração 4: conferência entre catálogo, priorização e LGPD',
      resultado: 'Exigência legal estava fora do catálogo e do backlog',
      efeitoEm: 'HU36',
      aberto: false,
      historias: ['HU36'],
      rnfs: ['RNF02']
    },
    {
      risco: 'Preferências sem requisito que as sustente',
      quando: 'Iteração 4: análise de rastreabilidade',
      resultado: 'O critério do RNF01 pressupunha uma configuração inexistente',
      efeitoEm: 'HU29',
      aberto: false,
      historias: ['HU29'],
      rnfs: ['RNF01']
    },
    {
      risco: 'Alertas que cruzam sintomas e quadros clínicos',
      quando: '05/10/2026: conversa com a cliente',
      video: { id: 'PKoWLngGSRg', tempo: 1102 },
      resultado: 'Exigem validação clínica e jurídica',
      efeito: 'Fora do MVP, como tema de pesquisa',
      aberto: false,
      historias: [],
      rnfs: []
    },
    {
      risco: 'Motor de recomendação sem regras definidas',
      quando: 'Sem investigação técnica na Elaboração. Apontado na Iteração 4 como o maior esforço técnico',
      video: { id: 'Je44KbpoASk', tempo: 213 },
      resultado: 'Regras tratadas na Iteração 6 (issue 36)',
      efeito: 'A definir com a validação das regras',
      aberto: true,
      historias: ['HU13', 'HU15'],
      rnfs: []
    },
    { risco: 'Isolamento dos dados de cada usuária', aberto: true, historias: [], rnfs: ['RNF03'] },
    { risco: 'Escolhas de arquitetura', aberto: true, historias: [], rnfs: [] }
  ],

  // Período da linha do tempo do cronograma.
  inicioDoSemestre: '2026-08-11',

  fimDoSemestre: '2026-12-10',

  // Barras da linha do tempo. fechamento: true para o fechamento de release.
  cronograma: [
    { nome: 'Iteração 1', inicio: '2026-08-11', fim: '2026-08-24', fechamento: false },
    { nome: 'Iteração 2', inicio: '2026-08-25', fim: '2026-09-07', fechamento: false },
    { nome: 'Fechamento R1', inicio: '2026-09-08', fim: '2026-09-14', fechamento: true },
    { nome: 'Iteração 3', inicio: '2026-09-15', fim: '2026-09-28', fechamento: false },
    { nome: 'Iteração 4', inicio: '2026-09-29', fim: '2026-10-12', fechamento: false },
    { nome: 'Fechamento R2', inicio: '2026-10-13', fim: '2026-10-19', fechamento: true },
    { nome: 'Iteração 5', inicio: '2026-10-20', fim: '2026-11-02', fechamento: false },
    { nome: 'Iteração 6', inicio: '2026-11-03', fim: '2026-11-16', fechamento: false },
    { nome: 'Iteração 7', inicio: '2026-11-17', fim: '2026-11-23', fechamento: false },
    { nome: 'Iteração 8', inicio: '2026-11-24', fim: '2026-11-30', fechamento: false },
    { nome: 'Fechamento R4', inicio: '2026-12-01', fim: '2026-12-10', fechamento: true }
  ],

  // Composição do MVP pela matriz valor × esforço (Priorização).
  quadrantesMvp: [
    {
      quadrante: 'Prioridade máxima',
      posicao: 'Valor 4, esforço 1',
      entraram: '9 de 9',
      decisao: 'Entram: alto valor a baixo custo.',
      historias: ['HU06', 'HU11', 'HU12', 'HU16', 'HU17', 'HU18', 'HU20', 'HU25', 'HU36']
    },
    {
      quadrante: 'Forte candidato ao MVP',
      posicao: 'Valor 4, esforço 2 ou valor 3, esforço 1',
      entraram: '8 de 8',
      decisao: 'Entram: bom valor com custo acessível.',
      historias: ['HU01', 'HU02', 'HU04', 'HU07', 'HU09', 'HU19', 'HU22', 'HU28']
    },
    {
      quadrante: 'Avaliar viabilidade',
      posicao: 'Valor 4, esforço 3',
      entraram: '2 de 2',
      decisao: 'Entram por decisão: são a promessa central e o diferencial do produto.',
      historias: ['HU13', 'HU15']
    },
    {
      quadrante: 'Candidato ao MVP',
      posicao: 'Valor 3, esforço 2',
      entraram: '2 de 4',
      decisao: 'Entram HU21, defendida pela cliente, e HU26, que evita o beco sem saída do PIN esquecido.',
      historias: ['HU21', 'HU26', 'HU29', 'HU35']
    },
    {
      quadrante: 'Avaliar oportunidade',
      posicao: 'Valor 2, esforço 1',
      entraram: '1 de 7',
      decisao: 'Só HU05 entra: sem ela, a fase calculada não seria exibida.',
      historias: ['HU05', 'HU14', 'HU24', 'HU27', 'HU30', 'HU33', 'HU34']
    },
    {
      quadrante: 'Entrega futura',
      posicao: 'Valor 2, esforço 2 ou 3',
      entraram: '1 de 6',
      decisao: 'Só HU10 entra, na Iteração 7, por pedido da cliente em 05/10/2026 (aos 11:54) e decisão do grupo em 15/11/2026. As demais ficam fora: adiáveis sem comprometer o fluxo central.',
      historias: ['HU03', 'HU08', 'HU10', 'HU23', 'HU31', 'HU32']
    }
  ],

  // Quadro impacto × esforço da equipe (Priorização).
  matrizImpacto: [
    { titulo: 'Baixo impacto, alto esforço', resumo: 'Nenhuma história neste quadrante', historias: [], destaque: false },
    { titulo: 'Alto impacto, alto esforço', resumo: '4 histórias', historias: ['HU02', 'HU08', 'HU13', 'HU23'], destaque: true },
    { titulo: 'Baixo impacto, baixo esforço', resumo: '4 histórias', historias: ['HU03', 'HU09', 'HU18', 'HU27'], destaque: false },
    {
      titulo: 'Alto impacto, baixo esforço',
      resumo: '18 histórias',
      historias: [
        'HU01',
        'HU05',
        'HU06',
        'HU07',
        'HU10',
        'HU11',
        'HU12',
        'HU14',
        'HU15',
        'HU16',
        'HU17',
        'HU19',
        'HU20',
        'HU21',
        'HU22',
        'HU24',
        'HU25',
        'HU26'
      ],
      destaque: true
    }
  ],

  foraDaMatriz: ['HU04', 'HU28', 'HU29', 'HU30', 'HU31', 'HU32', 'HU33', 'HU34', 'HU35', 'HU36']
};

// Situação de uma história no DoR, a partir de aplicacaoDor:
//   Pronta              todos os critérios em SIM ou N/A;
//   Pronta com exceção  o único NÃO está em critério que admite exceção,
//                       com autorização, risco e prazo registrados;
//   Não pronta          algum outro NÃO;
//   Não conferida       sem registro ou com critério ainda não conferido.
DADOS.situacaoDor = function (id) {
  const registro = DADOS.aplicacaoDor[id];
  if (!registro) return 'Não conferida';
  let pendente = false;
  let excecao = false;
  for (const c of DADOS.dorCriterios) {
    const r = (registro.criterios || {})[c.id] || {};
    if (r.resultado === 'SIM' || r.resultado === 'N/A') continue;
    if (r.resultado === 'NÃO') {
      const e = r.excecao;
      if (c.admiteExcecao && e && e.autorizadaPor && e.risco && e.prazo) excecao = true;
      else return 'Não pronta';
    } else {
      pendente = true;
    }
  }
  if (pendente) return 'Não conferida';
  return excecao ? 'Pronta com exceção' : 'Pronta';
};

DADOS.dorAtendido = DADOS.historias
  .filter((h) => ['Pronta', 'Pronta com exceção'].includes(DADOS.situacaoDor(h.id)))
  .map((h) => h.id);
