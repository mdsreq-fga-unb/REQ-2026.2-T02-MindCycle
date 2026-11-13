// ===== Dados do MindCycle =====
//
// Fonte única do que as páginas mostram sobre requisitos: histórias, RNFs,
// reuniões, histórico, fases e cronograma. A árvore, o MVP, a priorização,
// as reuniões, o histórico e o cronograma são montados a partir daqui —
// mudar um dado aqui muda todas as páginas que o usam.
//
// Os textos corridos de cada página (Visão de produto, Engenharia de
// requisitos, DoR e DoD, Lições aprendidas) ficam no HTML da própria página.

const DADOS = {
  // Iteração em andamento. Muda a cada duas semanas, junto com o cronograma
  // (cronograma, abaixo) e o estado das iterações (fases[].iteracoes).
  iteracaoAtual: 6,

  // Histórias que já atenderam ao DoR. Quem está aqui e no MVP aparece como
  // "Backlog" na árvore; se também estiver planejada para a iteração atual,
  // como "Iteração atual". Ex.: ['HU25', 'HU12'].
  dorAtendido: [],

  // Características do produto (CP), na ordem da árvore, com o objetivo
  // específico (OE) de cada uma.
  caracteristicas: [
    { id: 'CP1', nome: 'Registro e análise de sintomas e disposição', objetivo: 'OE1' },
    { id: 'CP2', nome: 'Acompanhamento do ciclo menstrual', objetivo: 'OE1' },
    { id: 'CP3', nome: 'Privacidade dos dados da usuária', objetivo: 'OE1' },
    { id: 'CP4', nome: 'Planejamento adaptativo das tarefas', objetivo: 'OE2' },
    { id: 'CP5', nome: 'Gestão acolhedora da carga diária', objetivo: 'OE3' },
    { id: 'CP6', nome: 'Reconhecimento de ritmo sustentável', objetivo: 'OE3' },
    { id: 'CP7', nome: 'Conta e preferências da usuária', objetivo: 'OE3' }
  ],

  // As 36 histórias de usuário.
  //   historia     o que vem depois de "Como usuária, quero"; o trecho depois de
  //                ", para " vira o benefício.
  //   valor        MoSCoW atribuído pela cliente: 4 Must, 3 Should, 2 Could.
  //   validadaCliente  true quando a nota foi confirmada na reunião de 05/10/2026.
  //   iteracao     iteração planejada (5 ou 6); 0 = fora do MVP.
  //   nota         papel no MVP, ou por que ficou fora.
  //   esforco      notas da equipe (1 a 4) e a média consolidada.
  historias: [
    {
      id: 'HU01',
      nome: 'Consultar sintomas comuns da fase',
      descricao: 'Deve ser possível à usuária consultar os sintomas comuns da fase atual do seu ciclo menstrual.',
      historia: 'consultar os sintomas comuns da fase atual do meu ciclo menstrual, para entender o que posso sentir neste momento',
      caracteristica: 'CP1',
      rnfs: [],
      valor: 3,
      validadaCliente: false,
      iteracao: 5,
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
      rnfs: ['RNF04', 'RNF08'],
      valor: 4,
      validadaCliente: true,
      iteracao: 5,
      nota: 'Resposta imediata à sobrecarga, a qualquer momento do dia.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'A sinalização só será considerada concluída quando puder ser feita em qualquer horário do dia e resultar na readequação das tarefas do dia (HU15).'
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
      iteracao: 5,
      nota: 'Check-in diário; dado-fonte de HU02, HU13 e HU15.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'O registro só será considerado concluído quando incluir cada sintoma com sua intensidade e o nível de disposição.',
        'O registro deve ser concluído em no máximo 3 toques a partir da tela inicial (RNF04).',
        'A confirmação do registro deve aparecer em até 2 segundos (RNF08).'
      ]
    },
    {
      id: 'HU30',
      nome: 'Gerenciar medicações',
      descricao: 'Deve ser possível à usuária cadastrar, alterar e excluir as medicações que utiliza, indicando se o uso é diário ou esporádico.',
      historia: 'cadastrar, alterar e excluir as medicações que utilizo, indicando se o uso é diário ou esporádico, para manter minhas medicações junto ao registro do meu estado',
      caracteristica: 'CP1',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Dado sensível sem uso no MVP.',
      esforco: { esforco: 2, complexidade: 1, lacuna: 1, consolidado: '1,3' },
      criterios: [
        'Cada medicação só será considerada cadastrada quando indicar se o uso é diário ou esporádico.',
        'Uma requisição às medicações da usuária feita com a sessão de outra conta deve retornar acesso negado (RNF03).'
      ]
    },
    {
      id: 'HU34',
      nome: 'Registrar diagnósticos prévios',
      descricao: 'Deve ser possível à usuária registrar os diagnósticos de saúde que já possui, como diabetes, hipertensão ou enxaqueca.',
      historia: 'registrar os diagnósticos de saúde que já possuo, como diabetes, hipertensão ou enxaqueca, para manter minhas condições de saúde junto ao registro do meu estado',
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
      rnfs: [],
      valor: 2,
      validadaCliente: false,
      iteracao: 5,
      nota: 'Exibe a fase que HU06 e HU07 já calculam no MVP.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'A consulta só será considerada atendida quando informar a fase atual entre menstrual, folicular, ovulatória e lútea.'
      ]
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
      iteracao: 5,
      nota: 'Dado objetivo que calibra a fase do ciclo.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
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
      rnfs: ['RNF02'],
      valor: 3,
      validadaCliente: true,
      iteracao: 5,
      nota: 'Dependência estrutural do cálculo de fase.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 2, consolidado: '1,3' },
      criterios: [
        'A informação só será considerada registrada quando aceitar uma duração média ou a indicação de ciclo irregular.'
      ]
    },
    {
      id: 'HU08',
      nome: 'Estimar fase do ciclo por sintomas',
      descricao: 'Deve ser possível à usuária obter uma estimativa da fase atual do seu ciclo menstrual informando seus sintomas atuais.',
      historia: 'obter uma estimativa da fase atual do meu ciclo informando meus sintomas atuais, para saber em que fase provavelmente estou',
      caracteristica: 'CP2',
      rnfs: ['RNF04'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'HU06 e HU07 cobrem a função.',
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
      historia: 'receber recomendações de conteúdos sobre o ciclo relacionados à minha fase atual e aos sintomas registrados, para compreender melhor o que estou vivendo',
      caracteristica: 'CP2',
      rnfs: [],
      valor: 3,
      validadaCliente: true,
      iteracao: 6,
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
      historia: 'consultar como o ciclo menstrual funciona e o que caracteriza cada fase, para compreender o meu próprio ciclo',
      caracteristica: 'CP2',
      rnfs: [],
      valor: 3,
      validadaCliente: false,
      iteracao: 6,
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
      caracteristica: 'CP3',
      rnfs: [],
      valor: 2,
      validadaCliente: true,
      iteracao: 0,
      nota: 'Não crítico ao fluxo diário.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'O calendário só será considerado correto quando cada dia exibido indicar a fase do ciclo correspondente.'
      ]
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
      iteracao: 5,
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
      iteracao: 5,
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
      iteracao: 5,
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
      rnfs: ['RNF06'],
      valor: 4,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Promessa central do produto.',
      esforco: { esforco: 3, complexidade: 3, lacuna: 2, consolidado: '2,7' },
      criterios: [
        'A recomendação só será considerada correta quando ordenar as tarefas do dia pelo registro de energia, pelo prazo e pela prioridade de cada tarefa.',
        'A recomendação do dia deve ser exibida em até 3 segundos após o acesso (RNF06).'
      ]
    },
    {
      id: 'HU14',
      nome: 'Receber resumo do dia',
      descricao: 'Deve ser possível à usuária receber, a cada dia, um resumo do que está previsto para o dia.',
      historia: 'receber, a cada dia, um resumo do que está previsto para o dia, para começar o dia sabendo o que me espera',
      caracteristica: 'CP4',
      rnfs: ['RNF01'],
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
      rnfs: ['RNF07'],
      valor: 4,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Diferencial central: realocação por disposição.',
      esforco: { esforco: 3, complexidade: 3, lacuna: 2, consolidado: '2,7' },
      criterios: [
        'O ajuste só será considerado feito quando a recomendação do dia for recalculada a partir do nível de disposição registrado.',
        'O reajuste deve aparecer em até 2 segundos após o registro de disposição (RNF07).'
      ]
    },
    {
      id: 'HU16',
      nome: 'Editar tarefa',
      descricao: 'Deve ser possível à usuária alterar as informações de uma tarefa cadastrada.',
      historia: 'alterar as informações de uma tarefa cadastrada, para corrigir ou atualizar o que mudou',
      caracteristica: 'CP5',
      rnfs: [],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
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
      historia: 'cadastrar tarefas informando título, prazo e prioridade, para que elas entrem no meu planejamento do dia',
      caracteristica: 'CP5',
      rnfs: [],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
      nota: 'Laço mínimo de valor; registra a energia necessária usada por HU13 e HU15.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'O cadastro só será considerado concluído quando a tarefa tiver título, prazo e prioridade registrados.'
      ]
    },
    {
      id: 'HU18',
      nome: 'Adiar tarefa',
      descricao: 'Deve ser possível à usuária adiar uma tarefa para outra data, mantendo suas demais informações e seu prazo final, alterando apenas o dia em que essa tarefa será feita.',
      historia: 'adiar uma tarefa para outra data, mantendo suas informações e seu prazo final, para reorganizar minha rotina sem culpa',
      caracteristica: 'CP5',
      rnfs: [],
      valor: 4,
      validadaCliente: true,
      iteracao: 6,
      nota: 'Identidade do produto: adiar sem culpa.',
      esforco: { esforco: 1, complexidade: 1, lacuna: 1, consolidado: '1,0' },
      criterios: [
        'O adiamento só será considerado correto quando a tarefa aparecer na nova data com título, prioridade e prazo inalterados.',
        'O adiamento não deve gerar contador de falhas nem mensagem de cobrança.'
      ]
    },
    {
      id: 'HU19',
      nome: 'Excluir tarefa',
      descricao: 'Deve ser possível à usuária excluir uma tarefa cadastrada.',
      historia: 'excluir uma tarefa cadastrada, para remover o que não faz mais sentido',
      caracteristica: 'CP5',
      rnfs: [],
      valor: 3,
      validadaCliente: false,
      iteracao: 6,
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
      rnfs: [],
      valor: 4,
      validadaCliente: false,
      iteracao: 6,
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
      iteracao: 6,
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
      iteracao: 6,
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
      rnfs: [],
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
      descricao: 'Deve ser possível à usuária gerar, ao final de cada mês, uma retrospectiva das tarefas concluídas e das atividades de acolhimento realizadas no período.',
      historia: 'gerar, ao final de cada mês, uma retrospectiva das tarefas concluídas e das atividades de acolhimento realizadas, para reconhecer meu ritmo e meu descanso',
      caracteristica: 'CP6',
      rnfs: [],
      valor: 2,
      validadaCliente: true,
      iteracao: 0,
      nota: 'Depende de histórico que o MVP não produz.',
      esforco: { esforco: 2, complexidade: 2, lacuna: 2, consolidado: '2,0' },
      criterios: [
        'A retrospectiva só será considerada completa quando reunir as tarefas concluídas e as atividades de acolhimento registradas no mês.',
        'A retrospectiva não deve apresentar escore de desempenho.'
      ]
    },
    {
      id: 'HU24',
      nome: 'Registrar atividade de acolhimento',
      descricao: 'Deve ser possível à usuária registrar as atividades de acolhimento que realizou.',
      historia: 'registrar as atividades de acolhimento que realizei, para que meu autocuidado conte como parte da minha rotina',
      caracteristica: 'CP6',
      rnfs: [],
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
      historia: 'comparar os relatórios mensais de meses diferentes, abrangendo ciclo, sintomas, disposição e tarefas, para perceber como meu ritmo varia',
      caracteristica: 'CP6',
      rnfs: [],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Nenhuma história do MVP gera relatórios mensais ainda.',
      esforco: { esforco: 3, complexidade: 2, lacuna: 2, consolidado: '2,3' },
      criterios: [
        'A comparação só será considerada completa quando apresentar ciclo, sintomas, disposição e tarefas de cada mês escolhido.'
      ]
    },
    {
      id: 'HU32',
      nome: 'Exportar relatório mensal',
      descricao: 'Deve ser possível à usuária exportar o relatório mensal em arquivo.',
      historia: 'exportar o relatório mensal em arquivo, para ter meu histórico fora do aplicativo',
      caracteristica: 'CP6',
      rnfs: ['RNF02', 'RNF03'],
      valor: 2,
      validadaCliente: false,
      iteracao: 0,
      nota: 'Nenhuma história do MVP gera relatórios mensais ainda.',
      esforco: { esforco: 3, complexidade: 2, lacuna: 2, consolidado: '2,3' },
      criterios: [
        'A exportação só será considerada concluída quando gerar um arquivo com o relatório mensal da usuária.',
        'Uma tentativa de exportar o relatório com a sessão de outra conta deve retornar acesso negado (RNF03).'
      ]
    },
    {
      id: 'HU25',
      nome: 'Criar conta',
      descricao: 'Deve ser possível à usuária criar sua conta.',
      historia: 'criar minha conta, para ter acesso exclusivo ao meu histórico',
      caracteristica: 'CP7',
      rnfs: [],
      valor: 4,
      validadaCliente: false,
      iteracao: 5,
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
      rnfs: [],
      valor: 3,
      validadaCliente: false,
      iteracao: 5,
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
      rnfs: ['RNF01'],
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
      criterio: 'Nenhum dado de ciclo, sintoma ou disposição é salvo antes do aceite dos termos, e os termos descrevem a finalidade de cada tipo de dado.'
    },
    {
      id: 'RNF03',
      nome: 'Acesso exclusivo da usuária',
      descricao: 'Os dados de ciclo, sintomas, disposição e tarefas devem ser acessíveis somente pela própria usuária.',
      classificacao: 'Segurança da informação',
      criterio: 'Uma requisição aos dados de uma usuária feita com a sessão de outra conta retorna acesso negado.'
    },
    {
      id: 'RNF04',
      nome: 'Agilidade no registro',
      descricao: 'O registro de sintomas e disposição deve exigir poucas interações.',
      classificacao: 'Usabilidade',
      criterio: 'O registro é concluído em no máximo 3 toques a partir da tela inicial.'
    },
    {
      id: 'RNF06',
      nome: 'Tempo de exibição da recomendação',
      descricao: 'A recomendação do dia deve ser exibida em até 3 segundos após o acesso.',
      classificacao: 'Desempenho',
      criterio: 'Média de 5 medições no DevTools, com a rede em Fast 4G, igual ou inferior a 3 s.'
    },
    {
      id: 'RNF07',
      nome: 'Tempo de reajuste da recomendação',
      descricao: 'O reajuste da recomendação deve aparecer em até 2 segundos após o registro de disposição.',
      classificacao: 'Desempenho',
      criterio: 'Média de 5 medições entre salvar o registro e a lista atualizada igual ou inferior a 2 s.'
    },
    {
      id: 'RNF08',
      nome: 'Tempo de confirmação do registro',
      descricao: 'A confirmação do registro de sintomas e disposição deve aparecer em até 2 segundos.',
      classificacao: 'Desempenho',
      criterio: 'Média de 5 medições no DevTools igual ou inferior a 2 s.'
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
      descricao: 'A interface deve funcionar em telas de celular e de computador.',
      classificacao: 'Suportabilidade (compatibilidade)',
      criterio: 'No modo dispositivo do DevTools, as telas funcionam de 360 px a 1440 px de largura sem rolagem horizontal.',
      todasAsHistorias: true
    },
    {
      id: 'RNF11',
      nome: 'Contraste legível',
      descricao: 'Os textos devem ter contraste legível.',
      classificacao: 'Usabilidade (acessibilidade)',
      criterio: 'A auditoria do Lighthouse não aponta erros de contraste (WCAG 2.1 nível AA).',
      todasAsHistorias: true
    }
  ],

  // Alterações em cada história ou RNF, com a data e o motivo. `video` aponta o
  // momento da reunião em que a decisão foi tomada.
  historico: {
    HU04: [
      {
        data: 'Sem data no site',
        alteracao: 'Entrou no catálogo com nome derivado do vínculo citado em RNF02, RNF03, RNF04 e RNF08.',
        motivo: 'Era citado por esses RNFs, mas não tinha card no quadro. Card ainda pendente.'
      }
    ],
    HU05: [
      {
        data: 'Sem data no site',
        alteracao: 'Fora do MVP → no MVP.',
        motivo: 'Sem ele, a fase calculada não seria exibida à usuária em lugar nenhum.'
      }
    ],
    HU06: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Should have → Must have.',
        motivo: 'Ajuste da cliente na reunião de validação da priorização.',
        video: { id: 'PKoWLngGSRg', tempo: 514 }
      }
    ],
    HU07: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Could have → Should have.',
        motivo: 'Ajuste da cliente na reunião de validação da priorização.',
        video: { id: 'PKoWLngGSRg', tempo: 378 }
      }
    ],
    HU09: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Won\'t have → Should have.',
        motivo: 'Ajuste da cliente, que validou o requisito com entusiasmo.',
        video: { id: 'PKoWLngGSRg', tempo: 748 }
      }
    ],
    HU11: [
      {
        data: 'Sem data no site',
        alteracao: 'Escopo da v1 reduzido a PIN numérico; esforço de 3,0 → 1,0.',
        motivo: 'A senha de pétalas passou para entrega futura. É a única redução de escopo do MVP.'
      }
    ],
    HU17: [
      { data: 'Sem data no site', alteracao: 'Passou a incluir "energia necessária".', motivo: 'Decisão da equipe; o dado é usado por HU13 e HU15.' }
    ],
    HU19: [
      {
        data: 'Sem data no site',
        alteracao: 'Redação padronizada a partir de "Deve ser possível o usuário deletar a tarefa criada".',
        motivo: 'Padronização da redação do catálogo.'
      }
    ],
    HU21: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Could have → Should have.',
        motivo: 'Ajuste da cliente, que defendeu atividade física e respiração.',
        video: { id: 'PKoWLngGSRg', tempo: 286 }
      }
    ],
    HU22: [
      {
        data: '05/10/2026',
        alteracao: 'Valor: Should have → Must have.',
        motivo: 'Ajuste da cliente na reunião de validação da priorização.',
        video: { id: 'PKoWLngGSRg', tempo: 661 }
      }
    ],
    HU26: [
      { data: 'Sem data no site', alteracao: 'Fora do MVP → no MVP.', motivo: 'O reset manual pela equipe contrariaria o RNF03.' }
    ],
    HU28: [
      {
        data: '12/10/2026',
        alteracao: 'Fora do MVP → no MVP.',
        motivo: 'Reavaliação: educação sobre regularidade pedida pela cliente. Nota ainda em hipótese.'
      }
    ],
    HU29: [
      { data: 'Sem data no site', alteracao: 'Incluído no catálogo.', motivo: 'Faltava um requisito de preferência na CP7 (achado 05).' }
    ],
    HU35: [
      {
        data: '05/10/2026',
        alteracao: 'Levantado como requisito novo.',
        motivo: 'Sugestão da equipe, detalhada pela cliente: relatório para levar à consulta médica.',
        video: { id: 'PKoWLngGSRg', tempo: 973 }
      },
      {
        data: '12/10/2026',
        alteracao: 'Numeração anterior: 28 → 35.',
        motivo: 'O mesmo número designava requisitos diferentes no catálogo e na priorização (achado 13).'
      }
    ],
    HU36: [
      { data: 'Iteração 4', alteracao: 'Incluído no catálogo.', motivo: 'Exigência da LGPD que estava fora do catálogo e do backlog.' },
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
    RNF09: [
      {
        data: 'Sem data no site',
        alteracao: 'Classificação no MVP: evolutivo.',
        motivo: 'A primeira versão usa PIN numérico; as pétalas ficam para depois.'
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
    }
  ],

  // Vídeos de apresentação das entregas (código do vídeo no YouTube).
  apresentacoes: [
    { fase: 'Entrega', nome: 'Apresentação da Unidade 1', video: 'NW8RUETjsws' },
    { fase: 'Entrega', nome: 'Apresentação da Unidade 2', video: 'v2rkFmI8DJ8' }
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
      rotulo: 'Iterações 3 e 4',
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
          resultado: 'Telas validadas com a cliente, com ajustes apontados em cada uma.'
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
        }
      ]
    },
    {
      nome: 'Construção',
      rotulo: 'Iterações 5 e 6',
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
          nome: 'Iteração 5',
          numero: 5,
          periodo: '20/10 a 02/11/2026',
          estado: 'Encerrada no cronograma',
          objetivo: 'Entregar o primeiro incremento.',
          registro: {
            pendencias: ['A equipe precisa publicar as histórias selecionadas, a aplicação do DoR, os resultados e os impedimentos.']
          },
          evidencias: []
        },
        {
          nome: 'Iteração 6',
          numero: 6,
          periodo: '03/11 a 16/11/2026',
          estado: 'Iteração atual',
          objetivo: 'Entregar o segundo incremento.',
          registro: {
            pendencias: [
              'A equipe precisa publicar as histórias selecionadas, a aplicação do DoR, os resultados e os impedimentos.',
              'As PRs 47 e 48, de Ana Luisa, migraram o site de documentação e não são evidência do incremento.'
            ]
          },
          evidencias: [
            { tipo: 'PR do site', titulo: 'Migração para HTML puro', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/47' },
            { tipo: 'PR do site', titulo: 'Novo fluxo do site', link: 'https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/48' }
          ],
          atual: true
        }
      ]
    },
    {
      nome: 'Transição',
      rotulo: 'Iteração 7',
      foco: 'Homologar o MVP com a cliente e as usuárias representativas, ajustar e entregar a versão final.',
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
        { nome: 'Iteração 7', numero: 7, periodo: '24/11 a 30/11/2026', estado: 'Prevista', objetivo: 'Fechar o MVP.', evidencias: [] }
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
    { nome: 'Fechamento R3', inicio: '2026-11-17', fim: '2026-11-23', fechamento: true },
    { nome: 'Iteração 7', inicio: '2026-11-24', fim: '2026-11-30', fechamento: false },
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
      entraram: '0 de 6',
      decisao: 'Ficam fora: adiáveis sem comprometer o fluxo central.',
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
