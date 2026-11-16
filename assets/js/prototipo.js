// ===== Protótipo de baixa fidelidade =====
//
// As telas do MindCycle em wireframe: só estrutura, conteúdo e navegação, sem
// cor nem estilo. Cada tela parte das histórias de usuário (HUs) e do
// protótipo de alta fidelidade (TELAS_ALTA abaixo). Os botões de uma tela
// levam à tela seguinte (#tela-…); os códigos HU abrem a história.
//
// Para mudar uma tela, mude a lista TELAS. Cada tela tem `elementos` (de cima
// para baixo) e, se for uma folha sobre outra tela, `folha`. Cada elemento é
// { t: tipo, ... }; os tipos estão em `elemento()`. `vai` é o id da tela de
// destino.

(() => {
  const alvo = document.getElementById('prototipo');
  if (!alvo) return;
  const { esc, chipHistoria, noMvp } = MC;

  const TELAS_ALTA = 'https://claude.ai/artifact/1pCy3XxWqcCquR44PAPHfF';

  const FLUXOS = [
    ['entrada', 'Entrada e conta', 'Da primeira abertura ao PIN, com os termos aceitos e o ciclo informado uma vez.'],
    ['hoje', 'Hoje', 'O dia recomendado, o registro de como a usuária está e o reajuste quando ela se sente sobrecarregada.'],
    ['tarefas', 'Tarefas', 'Cadastrar, editar, concluir, adiar e excluir, sem contador nem cobrança.'],
    ['ciclo', 'Ciclo', 'A fase estimada, o calendário, os sintomas comuns e os conteúdos da fase.'],
    ['acolhimento', 'Acolhimento', 'Pausas breves sugeridas para o dia.'],
    ['eu', 'Eu', 'Ciclo, notificações, privacidade, retrospectiva e exclusão da conta.']
  ];

  // As abas do app: as quatro da alta fidelidade e a de Acolhimento, que a HU21 pede.
  const ABAS = [['Hoje', 'hoje'], ['Tarefas', 'tarefas'], ['Ciclo', 'ciclo'], ['Acolhimento', 'acolhimento'], ['Eu', 'eu']];

  const TELAS = [
    // ---------------- Entrada e conta ----------------
    {
      id: 'boas-vindas', nome: 'Boas-vindas', fluxo: 'entrada', hus: ['HU27'], alta: 'Boas-vindas',
      notas: ['Apresenta a proposta antes do cadastro.'],
      elementos: [
        { t: 'espaco' },
        { t: 'img', x: 'Ícone do app' },
        { t: 'titulo', x: 'Produtividade no seu ritmo.' },
        { t: 'texto', x: 'Suas tarefas organizadas de acordo com o seu ciclo e com como você está hoje.' },
        { t: 'espaco' },
        { t: 'botao', x: 'Começar', vai: 'conta' },
        { t: 'botao', x: 'Já tenho conta', vai: 'pin', tipo: 'texto' }
      ]
    },
    {
      id: 'conta', nome: 'Criar conta', fluxo: 'entrada', hus: ['HU25', 'HU12'], alta: 'Criar conta',
      notas: ['O aceite dos termos vem antes de qualquer dado do ciclo.'],
      elementos: [
        { t: 'barra', voltar: 'boas-vindas' },
        { t: 'titulo', x: 'Criar sua conta' },
        { t: 'campo', rotulo: 'E-mail', ph: 'voce@email.com' },
        { t: 'campo', rotulo: 'Senha', ph: 'Mínimo de 8 caracteres' },
        { t: 'check', x: 'Aceito os termos de uso e de dados', vai: 'termos', marcado: true },
        { t: 'espaco' },
        { t: 'botao', x: 'Continuar', vai: 'config-ciclo' }
      ]
    },
    {
      id: 'termos', nome: 'Termos de uso', fluxo: 'entrada', hus: ['HU12'], alta: 'Termos de uso',
      notas: ['Resume em três linhas o que é guardado e como apagar.'],
      elementos: [
        { t: 'barra', voltar: 'conta' },
        { t: 'titulo', x: 'Seus dados, suas regras' },
        { t: 'cartao', linhas: ['Guardamos ciclo, sintomas e tarefas.', 'Protegidos por PIN, nunca compartilhados.', 'Você pode apagar tudo quando quiser.'] },
        { t: 'link', x: 'Ler os termos completos' },
        { t: 'espaco' },
        { t: 'botao', x: 'Aceitar e continuar', vai: 'config-ciclo' },
        { t: 'botao', x: 'Agora não', vai: 'conta', tipo: 'texto' }
      ]
    },
    {
      id: 'config-ciclo', nome: 'Sobre o seu ciclo', fluxo: 'entrada', hus: ['HU06', 'HU07'], alta: 'Configurar ciclo',
      notas: ['Com o ciclo irregular, a duração fica desativada e a fase não é estimada pela data.'],
      elementos: [
        { t: 'barra', voltar: 'termos', acao: '1 de 2' },
        { t: 'titulo', x: 'Sobre o seu ciclo' },
        { t: 'campo', rotulo: 'Início da última menstruação', ph: 'dd/mm/aaaa' },
        { t: 'stepper', rotulo: 'Duração média', valor: '28 dias' },
        { t: 'check', x: 'Meu ciclo é irregular' },
        { t: 'espaco' },
        { t: 'botao', x: 'Continuar', vai: 'pin' }
      ]
    },
    {
      id: 'pin', nome: 'PIN', fluxo: 'entrada', hus: ['HU11'], alta: 'PIN',
      notas: ['O PIN protege a abertura do app.'],
      elementos: [
        { t: 'espaco' },
        { t: 'pin', rotulo: 'Digite seu PIN', cheios: 2 },
        { t: 'teclado' },
        { t: 'espaco' },
        { t: 'botao', x: 'Entrar', vai: 'hoje' },
        { t: 'botao', x: 'Esqueci meu PIN', vai: 'recuperar', tipo: 'texto' }
      ]
    },
    {
      id: 'recuperar', nome: 'Recuperar acesso', fluxo: 'entrada', hus: ['HU26'], alta: 'Recuperar acesso',
      notas: ['O código chega no e-mail da conta.'],
      elementos: [
        { t: 'barra', voltar: 'pin' },
        { t: 'titulo', x: 'Recuperar acesso' },
        { t: 'texto', x: 'Enviamos um código para o seu e-mail.' },
        { t: 'campo', rotulo: 'E-mail da conta', ph: 'voce@email.com' },
        { t: 'campo', rotulo: 'Código recebido', ph: '000000' },
        { t: 'espaco' },
        { t: 'botao', x: 'Criar novo PIN', vai: 'pin' }
      ]
    },

    // ---------------- Hoje ----------------
    {
      id: 'hoje', nome: 'Hoje', fluxo: 'hoje', hus: ['HU22', 'HU05', 'HU04', 'HU02', 'HU13'], alta: 'Hoje', aba: 'Hoje',
      notas: ['A mensagem do dia fica no topo, sem cobrança.', 'A ordem das tarefas considera disposição, prazo e prioridade.'],
      elementos: [
        { t: 'cap', x: 'Segunda, 5 de outubro' },
        { t: 'titulo', x: 'Olá, [nome]' },
        { t: 'aviso', rotulo: 'Para hoje', x: 'Mensagem de acolhimento do dia.' },
        { t: 'anel', dia: '21', x: 'Dia 21 de ~29', sub: 'Fase lútea (estimada)' },
        { t: 'linha', x: 'Como você está hoje?', acao: 'Registrar', vai: 'registro' },
        { t: 'botao', x: 'Estou sobrecarregada', vai: 'hoje-leve', tipo: 'secundario' },
        { t: 'secao', x: 'Para hoje', acao: 'Ver todas', vai: 'tarefas' },
        { t: 'tarefa', x: '1. Revisar requisitos', meta: 'Alta · hoje', vai: 'detalhe-tarefa' },
        { t: 'tarefa', x: '2. Organizar referências', meta: 'Baixa · qua, 7 out', vai: 'detalhe-tarefa' },
        { t: 'tarefa', x: '3. Responder a orientadora', meta: 'Média · sex, 9 out', vai: 'detalhe-tarefa' }
      ]
    },
    {
      id: 'registro', nome: 'Registro do dia', fluxo: 'hoje', hus: ['HU04'], alta: 'Registro do dia',
      notas: ['Com a disposição baixa, o dia se reajusta (HU15).'],
      elementos: [
        { t: 'barra', fechar: 'hoje' },
        { t: 'titulo', x: 'Como você está?' },
        { t: 'escala', rotulo: 'Disposição', opcoes: ['Baixa', 'Média', 'Alta'], marcada: 0 },
        { t: 'secao', x: 'Sintomas' },
        { t: 'chips', itens: ['Cólica', 'Cansaço', 'Inchaço', 'Dor de cabeça', 'Irritabilidade', 'Foco difícil'], marcados: ['Cansaço', 'Foco difícil'] },
        { t: 'espaco' },
        { t: 'botao', x: 'Registrar', vai: 'hoje-leve' }
      ]
    },
    {
      id: 'hoje-leve', nome: 'Dia reajustado', fluxo: 'hoje', hus: ['HU02', 'HU15', 'HU22'], alta: 'Dia reajustado', aba: 'Hoje',
      notas: ['Fica o que tem prazo hoje; o resto vai para os próximos dias, sem mudar o prazo.', 'Desfazer devolve o dia como era.'],
      elementos: [
        { t: 'cap', x: 'Dia mais leve' },
        { t: 'titulo', x: 'Só o essencial hoje' },
        { t: 'texto', x: 'Mantivemos o que não pode esperar.' },
        { t: 'tarefa', x: '1. Revisar requisitos', meta: 'Alta · hoje', vai: 'detalhe-tarefa' },
        { t: 'tarefa', x: '2. Organizar referências', meta: 'Baixa · qua, 7 out', vai: 'detalhe-tarefa' },
        { t: 'linha', x: '2 tarefas foram para os próximos dias', acao: '›', vai: 'tarefas' },
        { t: 'aviso', x: 'Adiar também é cuidar de si.', acao: 'Fazer uma pausa', vai: 'acolhimento' },
        { t: 'botao', x: 'Desfazer ajuste', vai: 'hoje', tipo: 'texto' }
      ]
    },

    // ---------------- Tarefas ----------------
    {
      id: 'tarefas', nome: 'Tarefas', fluxo: 'tarefas', hus: ['HU17', 'HU20'], alta: 'Tarefas', aba: 'Tarefas',
      notas: ['O botão + abre o cadastro.', 'Concluídas mostram a data em que foram feitas.'],
      elementos: [
        { t: 'titulo', x: 'Tarefas' },
        { t: 'chips', itens: ['Hoje', 'Semana', 'Concluídas'], marcados: ['Hoje'] },
        { t: 'tarefa', x: 'Revisar requisitos', meta: 'Alta · hoje', vai: 'detalhe-tarefa' },
        { t: 'tarefa', x: 'Organizar referências', meta: 'Baixa · qua, 7 out', vai: 'detalhe-tarefa' },
        { t: 'tarefa', x: 'Responder a orientadora', meta: 'Média · sex, 9 out', vai: 'detalhe-tarefa' },
        { t: 'fab', vai: 'nova-tarefa' }
      ]
    },
    {
      id: 'nova-tarefa', nome: 'Nova tarefa', fluxo: 'tarefas', hus: ['HU17', 'HU16'], alta: 'Nova tarefa',
      notas: ['A mesma tela, já preenchida, edita a tarefa (HU16).'],
      elementos: [
        { t: 'barra', fechar: 'tarefas' },
        { t: 'titulo', x: 'Nova tarefa' },
        { t: 'campo', rotulo: 'O que precisa fazer?', ph: 'Ex.: Estudar para a prova' },
        { t: 'campo', rotulo: 'Prazo', ph: 'dd/mm/aaaa' },
        { t: 'chips', rotulo: 'Prioridade', itens: ['Alta', 'Média', 'Baixa'], marcados: ['Média'] },
        { t: 'chips', rotulo: 'Energia que exige', itens: ['Leve', 'Média', 'Alta'], marcados: ['Média'] },
        { t: 'espaco' },
        { t: 'botao', x: 'Salvar', vai: 'tarefas' }
      ]
    },
    {
      id: 'detalhe-tarefa', nome: 'Detalhe da tarefa', fluxo: 'tarefas', hus: ['HU20', 'HU18', 'HU16', 'HU19'], alta: 'Detalhe da tarefa',
      notas: ['Concluir, adiar e excluir ficam na própria tarefa.'],
      elementos: [
        { t: 'barra', voltar: 'tarefas', acao: 'Editar', acaoVai: 'nova-tarefa' },
        { t: 'etiqueta', x: 'Prioridade alta' },
        { t: 'titulo', x: 'Revisar requisitos' },
        { t: 'cartao', pares: [['Prazo', 'Hoje, 5 out'], ['Energia', 'Média']] },
        { t: 'espaco' },
        { t: 'botao', x: 'Concluir', vai: 'tarefas' },
        { t: 'botao', x: 'Adiar', vai: 'adiar', tipo: 'secundario' },
        { t: 'botao', x: 'Excluir', vai: 'excluir-tarefa', tipo: 'texto' }
      ]
    },
    {
      id: 'adiar', nome: 'Adiar tarefa', fluxo: 'tarefas', hus: ['HU18'], alta: 'Adiar tarefa',
      notas: ['Adiar não muda o prazo final nem conta como falha.'],
      elementos: [{ t: 'barra' }, { t: 'titulo', x: 'Revisar requisitos' }, { t: 'linhas', n: 3 }],
      folha: [
        { t: 'secao', x: 'Fazer em outro dia' },
        { t: 'opcao', x: 'Amanhã', detalhe: 'ter, 6 out', marcada: true },
        { t: 'opcao', x: 'Quarta', detalhe: 'qua, 7 out' },
        { t: 'opcao', x: 'Escolher data', detalhe: 'calendário' },
        { t: 'texto', x: 'O prazo final não muda.' },
        { t: 'botao', x: 'Adiar', vai: 'tarefas' },
        { t: 'botao', x: 'Cancelar', vai: 'detalhe-tarefa', tipo: 'texto' }
      ]
    },
    {
      id: 'excluir-tarefa', nome: 'Excluir tarefa', fluxo: 'tarefas', hus: ['HU19'], alta: 'Detalhe da tarefa (confirmação)',
      notas: ['Lembra que adiar é uma saída, antes de apagar.'],
      elementos: [{ t: 'barra' }, { t: 'titulo', x: 'Revisar requisitos' }, { t: 'linhas', n: 3 }],
      folha: [
        { t: 'secao', x: 'Excluir esta tarefa?' },
        { t: 'texto', x: 'Não dá para desfazer. Se só não der hoje, você pode adiar.' },
        { t: 'botao', x: 'Excluir', vai: 'tarefas', tipo: 'secundario' },
        { t: 'botao', x: 'Cancelar', vai: 'detalhe-tarefa', tipo: 'texto' }
      ]
    },

    // ---------------- Ciclo ----------------
    {
      id: 'ciclo', nome: 'Seu ciclo', fluxo: 'ciclo', hus: ['HU05', 'HU01', 'HU10', 'HU06', 'HU09'], alta: 'Ciclo', aba: 'Ciclo',
      notas: ['A fase aparece sempre como estimativa.', 'No calendário, cada fase tem uma letra, não só um tom.', 'Os conteúdos seguem a fase e os sintomas de hoje.'],
      elementos: [
        { t: 'titulo', x: 'Seu ciclo' },
        { t: 'anel', dia: '21', x: 'Dia 21 de ~29', sub: 'Fase lútea (estimada)' },
        { t: 'texto', x: 'Nesta fase, algumas pessoas sentem: cansaço, inchaço e irritabilidade.' },
        { t: 'calendario', mes: 'Outubro 2026' },
        { t: 'legenda', vai: 'conteudo' },
        { t: 'botao', x: 'Minha menstruação começou', tipo: 'secundario' },
        { t: 'botao', x: 'Não sei em que fase estou', vai: 'estimar-fase', tipo: 'texto' },
        { t: 'secao', x: 'Para você' },
        { t: 'linha', x: 'Por que a energia pode cair na fase lútea', acao: '›', vai: 'conteudo' }
      ]
    },
    {
      id: 'conteudo', nome: 'Conteúdo sobre o ciclo', fluxo: 'ciclo', hus: ['HU28', 'HU09'], alta: null,
      notas: ['Abre pela legenda das fases (HU28) ou por um conteúdo recomendado (HU09).'],
      elementos: [
        { t: 'barra', fechar: 'ciclo' },
        { t: 'cap', x: 'Fase lútea' },
        { t: 'titulo', x: 'Como costuma ser' },
        { t: 'linhas', n: 3 },
        { t: 'secao', x: 'O que pode ajudar' },
        { t: 'linhas', n: 2 },
        { t: 'aviso', x: 'Informação geral, não substitui uma consulta.' }
      ]
    },
    {
      id: 'estimar-fase', nome: 'Estimar fase', fluxo: 'ciclo', hus: ['HU08'], alta: 'Estimar fase',
      notas: ['O resultado é uma estimativa, não um diagnóstico.'],
      elementos: [
        { t: 'barra', voltar: 'ciclo' },
        { t: 'titulo', x: 'O que você sente agora?' },
        { t: 'chips', itens: ['Cólica', 'Fluxo', 'Cansaço', 'Inchaço', 'Irritabilidade', 'Muita energia', 'Vontade de doce', 'Sono ruim'], marcados: ['Cansaço', 'Inchaço', 'Irritabilidade'] },
        { t: 'cartao', titulo: 'Provavelmente fase lútea', linhas: ['É uma estimativa, não um diagnóstico.'] },
        { t: 'espaco' },
        { t: 'botao', x: 'Usar esta fase', vai: 'ciclo' }
      ]
    },

    // ---------------- Acolhimento ----------------
    {
      id: 'acolhimento', nome: 'Acolhimento', fluxo: 'acolhimento', hus: ['HU21'], alta: null, aba: 'Acolhimento',
      notas: ['Cada prática cabe numa pausa de até 10 minutos.', 'As sugestões mudam a cada dia.'],
      elementos: [
        { t: 'titulo', x: 'Acolhimento' },
        { t: 'texto', x: 'Algumas pausas breves para hoje. Fazer ou não é escolha sua.' },
        { t: 'cartao', titulo: 'Respiração lenta', detalhe: '3 min', linhas: ['Como fazer, em uma linha.'] },
        { t: 'cartao', titulo: 'Alongamento curto', detalhe: '5 min', linhas: ['Como fazer, em uma linha.'] },
        { t: 'cartao', titulo: 'Pausa sem tela', detalhe: '5 min', linhas: ['Como fazer, em uma linha.'] }
      ]
    },

    // ---------------- Eu ----------------
    {
      id: 'eu', nome: 'Eu', fluxo: 'eu', hus: ['HU07', 'HU03', 'HU14', 'HU29', 'HU23', 'HU11', 'HU12', 'HU36'], alta: 'Eu', aba: 'Eu',
      notas: ['Lembrete e resumo do dia dependem das notificações (HU29).'],
      elementos: [
        { t: 'perfil', x: '[nome]' },
        { t: 'lista', itens: [{ x: 'Meu ciclo', detalhe: '29 dias · regular', vai: 'config-ciclo' }] },
        { t: 'interruptor', x: 'Lembrete de registro', detalhe: '20:00', ligado: true },
        { t: 'interruptor', x: 'Resumo do dia', detalhe: '08:00', ligado: true },
        { t: 'lista', itens: [
          { x: 'Retrospectivas', vai: 'retrospectiva' },
          { x: 'Alterar PIN', vai: 'pin' },
          { x: 'Termos e dados', vai: 'termos' },
          { x: 'Excluir minha conta', vai: 'excluir-conta' }
        ] },
        { t: 'espaco' },
        { t: 'botao', x: 'Sair', vai: 'boas-vindas', tipo: 'texto' }
      ]
    },
    {
      id: 'excluir-conta', nome: 'Excluir conta e dados', fluxo: 'eu', hus: ['HU36'], alta: null,
      notas: ['Mostra tudo o que é apagado e pede a senha antes.'],
      elementos: [
        { t: 'barra', voltar: 'eu' },
        { t: 'titulo', x: 'Excluir minha conta' },
        { t: 'texto', x: 'Veja o que é apagado:' },
        { t: 'marcadores', itens: ['Seu ciclo e os registros dele', 'Seus sintomas e a sua disposição', 'Suas tarefas', 'O aceite dos termos', 'Seu e-mail e sua senha'] },
        { t: 'texto', x: 'Não há como desfazer.' },
        { t: 'campo', rotulo: 'Sua senha, para confirmar', ph: '••••••••' },
        { t: 'espaco' },
        { t: 'botao', x: 'Excluir tudo definitivamente', vai: 'boas-vindas', tipo: 'secundario' },
        { t: 'botao', x: 'Voltar, quero manter minha conta', vai: 'eu', tipo: 'texto' }
      ]
    },
    {
      id: 'retrospectiva', nome: 'Retrospectiva mensal', fluxo: 'eu', hus: ['HU23'], alta: 'Retrospectiva mensal',
      notas: ['Reconhece o ritmo do mês, sem meta nem pontuação.'],
      elementos: [
        { t: 'barra', voltar: 'eu' },
        { t: 'cap', x: 'Setembro' },
        { t: 'titulo', x: 'Seu mês, no seu ritmo' },
        { t: 'stats', itens: [['18', 'tarefas concluídas'], ['7', 'pausas de cuidado']] },
        { t: 'barras', titulo: 'Concluídas por fase', itens: [['Menstrual', 3], ['Folicular', 7], ['Ovulatória', 4], ['Lútea', 4]] },
        { t: 'aviso', x: 'Isso é ritmo sustentável.' },
        { t: 'texto', x: 'Números de exemplo.', suave: true }
      ]
    }
  ];

  const porId = Object.fromEntries(TELAS.map((t) => [t.id, t]));
  const destino = (id) => porId[id] ? ' href="#tela-' + id + '" title="Vai para: ' + esc(porId[id].nome) + '"' : '';
  const SETA = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg>';
  const XIS = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';

  // Calendário de outubro de 2026 (1º de outubro é quinta), com a mesma
  // distribuição de fases da alta fidelidade: M, F, O e L em cada dia.
  function calendario(e) {
    const letra = (d) => { const c = ((d + 15) % 29) + 1; return c <= 5 ? 'M' : c <= 13 ? 'F' : c <= 16 ? 'O' : 'L'; };
    let celulas = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d) => '<span class="wf-cal-dia">' + d + '</span>').join('');
    for (let i = 0; i < 4; i++) celulas += '<span></span>';
    for (let d = 1; d <= 31; d++) {
      celulas += '<span class="wf-cal-c wf-f' + letra(d) + (d === 5 ? ' hoje' : '') + '">' + d + '<i>' + letra(d) + '</i></span>';
    }
    return '<div class="wf-cal"><div class="wf-cal-mes"><span>‹</span><b>' + esc(e.mes) + '</b><span>›</span></div>' +
      '<div class="wf-cal-grade">' + celulas + '</div></div>';
  }

  function elemento(e) {
    switch (e.t) {
      case 'espaco': return '<div class="wf-espaco"></div>';
      case 'barra':
        return '<div class="wf-barra">' +
          (e.voltar ? '<a class="wf-icone"' + destino(e.voltar) + ' aria-label="Voltar">' + SETA + '</a>'
            : e.fechar ? '<a class="wf-icone"' + destino(e.fechar) + ' aria-label="Fechar">' + XIS + '</a>' : '<span></span>') +
          (e.acao ? (e.acaoVai ? '<a class="wf-acao"' + destino(e.acaoVai) + '>' + esc(e.acao) + '</a>' : '<span class="wf-acao">' + esc(e.acao) + '</span>') : '') +
          '</div>';
      case 'cap': return '<p class="wf-cap">' + esc(e.x) + '</p>';
      case 'titulo': return '<p class="wf-titulo">' + esc(e.x) + '</p>';
      case 'texto': return '<p class="wf-texto' + (e.suave ? ' suave' : '') + '">' + esc(e.x) + '</p>';
      case 'linhas': return '<div class="wf-linhas" aria-hidden="true">' + '<span></span>'.repeat(e.n) + '</div>';
      case 'img': return '<div class="wf-img" role="img" aria-label="' + esc(e.x) + '"><span>' + esc(e.x) + '</span></div>';
      case 'link': return '<p class="wf-link">' + esc(e.x) + '</p>';
      case 'campo':
        return '<div class="wf-campo"><span class="wf-rotulo">' + esc(e.rotulo) + '</span><span class="wf-caixa">' + esc(e.ph || '') + '</span></div>';
      case 'botao':
        return '<a class="wf-botao ' + (e.tipo || 'primario') + '"' + destino(e.vai) + (e.vai ? '' : ' aria-disabled="true"') + '>' + esc(e.x) + '</a>';
      case 'check':
        return '<div class="wf-check"><span class="wf-quadro' + (e.marcado ? ' on' : '') + '" aria-hidden="true">' + (e.marcado ? '✓' : '') + '</span>' +
          (e.vai ? '<a' + destino(e.vai) + '>' + esc(e.x) + '</a>' : '<span>' + esc(e.x) + '</span>') + '</div>';
      case 'chips':
        return '<div class="wf-grupo">' + (e.rotulo ? '<span class="wf-rotulo">' + esc(e.rotulo) + '</span>' : '') +
          '<div class="wf-chips">' + e.itens.map((i) => {
            const on = (e.marcados || []).includes(i);
            return '<span class="wf-chip' + (on ? ' on' : '') + '">' + (on ? '✓ ' : '') + esc(i) + '</span>';
          }).join('') + '</div></div>';
      case 'escala':
        return '<div class="wf-grupo"><span class="wf-rotulo">' + esc(e.rotulo) + '</span><div class="wf-escala">' +
          e.opcoes.map((o, i) => '<span class="' + (i === e.marcada ? 'on' : '') + '">' + esc(o) + '</span>').join('') + '</div></div>';
      case 'stepper':
        return '<div class="wf-grupo"><span class="wf-rotulo">' + esc(e.rotulo) + '</span><div class="wf-stepper">' +
          '<span aria-hidden="true">−</span><b>' + esc(e.valor) + '</b><span aria-hidden="true">+</span></div></div>';
      case 'pin':
        return '<div class="wf-pin"><span class="wf-rotulo">' + esc(e.rotulo) + '</span><div>' +
          [0, 1, 2, 3].map((i) => '<i class="' + (i < e.cheios ? 'on' : '') + '"></i>').join('') + '</div></div>';
      case 'teclado':
        return '<div class="wf-teclado" aria-hidden="true">' + ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']
          .map((k) => '<span' + (k ? '' : ' class="vazia"') + '>' + k + '</span>').join('') + '</div>';
      case 'aviso':
        return '<div class="wf-aviso">' + (e.rotulo ? '<b>' + esc(e.rotulo) + '</b>' : '') + '<span>' + esc(e.x) + '</span>' +
          (e.acao ? '<a' + destino(e.vai) + '>' + esc(e.acao) + '</a>' : '') + '</div>';
      case 'anel':
        return '<div class="wf-anel"><span class="wf-circulo" aria-hidden="true">' + esc(e.dia) + '</span><span><b>' + esc(e.x) + '</b>' +
          '<span class="wf-texto suave">' + esc(e.sub) + '</span></span></div>';
      case 'linha':
        return '<a class="wf-linha"' + destino(e.vai) + '><span class="wf-ic" aria-hidden="true"></span><b>' + esc(e.x) + '</b>' +
          '<span class="wf-acao">' + esc(e.acao) + '</span></a>';
      case 'secao':
        return '<div class="wf-secao"><b>' + esc(e.x) + '</b>' + (e.acao ? '<a' + destino(e.vai) + '>' + esc(e.acao) + '</a>' : '') + '</div>';
      case 'tarefa':
        return '<a class="wf-tarefa"' + destino(e.vai) + '><span class="wf-bola" aria-hidden="true"></span><span><b>' + esc(e.x) + '</b>' +
          '<span class="wf-texto suave">' + esc(e.meta) + '</span></span></a>';
      case 'fab': return '<a class="wf-fab"' + destino(e.vai) + ' aria-label="Nova tarefa">+</a>';
      case 'etiqueta': return '<span class="wf-etiqueta">' + esc(e.x) + '</span>';
      case 'cartao':
        return '<div class="wf-cartao">' +
          (e.titulo ? '<div class="wf-cartao-topo"><b>' + esc(e.titulo) + '</b>' + (e.detalhe ? '<span>' + esc(e.detalhe) + '</span>' : '') + '</div>' : '') +
          (e.linhas || []).map((l) => '<p class="wf-texto">' + esc(l) + '</p>').join('') +
          (e.pares || []).map(([k, v]) => '<div class="wf-par"><span>' + esc(k) + '</span><b>' + esc(v) + '</b></div>').join('') + '</div>';
      case 'opcao':
        return '<div class="wf-opcao' + (e.marcada ? ' on' : '') + '"><b>' + esc(e.x) + '</b><span>' + esc(e.detalhe) + '</span></div>';
      case 'calendario': return calendario(e);
      case 'legenda':
        return '<div class="wf-legenda">' + [['M', 'Menstrual'], ['F', 'Folicular'], ['O', 'Ovulatória'], ['L', 'Lútea']]
          .map(([l, n]) => '<a class="wf-f' + l + '"' + destino(e.vai) + '><i>' + l + '</i>' + n + '</a>').join('') + '</div>';
      case 'perfil':
        return '<div class="wf-perfil"><span class="wf-circulo" aria-hidden="true"></span><p class="wf-titulo">' + esc(e.x) + '</p></div>';
      case 'lista':
        return '<div class="wf-lista">' + e.itens.map((i) => '<a' + destino(i.vai) + '><span><b>' + esc(i.x) + '</b>' +
          (i.detalhe ? '<span class="wf-texto suave">' + esc(i.detalhe) + '</span>' : '') + '</span><span aria-hidden="true">›</span></a>').join('') + '</div>';
      case 'interruptor':
        return '<div class="wf-interruptor"><span><b>' + esc(e.x) + '</b><span class="wf-texto suave">' + esc(e.detalhe) + '</span></span>' +
          '<span class="wf-chave' + (e.ligado ? ' on' : '') + '" aria-label="' + (e.ligado ? 'Ligado' : 'Desligado') + '" role="img"></span></div>';
      case 'marcadores': return '<ul class="wf-marcadores">' + e.itens.map((i) => '<li>' + esc(i) + '</li>').join('') + '</ul>';
      case 'stats':
        return '<div class="wf-stats">' + e.itens.map(([n, r]) => '<div><b>' + esc(n) + '</b><span>' + esc(r) + '</span></div>').join('') + '</div>';
      case 'barras': {
        const max = Math.max(...e.itens.map((i) => i[1]));
        return '<div class="wf-cartao"><b>' + esc(e.titulo) + '</b>' + e.itens.map(([n, v]) =>
          '<div class="wf-barra-linha"><span>' + esc(n) + '</span><i><s style="width: ' + Math.round(v / max * 100) + '%"></s></i><span>' + v + '</span></div>').join('') + '</div>';
      }
      default: return '';
    }
  }

  function abas(ativa) {
    return '<nav class="wf-abas" aria-label="Abas do app">' + ABAS.map(([nome, id]) =>
      '<a' + destino(id) + (nome === ativa ? ' class="on" aria-current="page"' : '') + '><i aria-hidden="true"></i>' + esc(nome) + '</a>').join('') + '</nav>';
  }

  function tela(t) {
    const corpo = t.folha
      ? '<div class="wf-fundo" aria-hidden="true" inert>' + t.elementos.map(elemento).join('') + '</div>' +
        '<div class="wf-folha"><span class="wf-alca" aria-hidden="true"></span>' + t.folha.map(elemento).join('') + '</div>'
      : t.elementos.map(elemento).join('') + (t.aba ? abas(t.aba) : '');
    return '<figure class="wf-tela" id="tela-' + t.id + '">' +
      '<div class="wf-fone' + (t.folha ? ' com-folha' : '') + (t.aba ? ' com-abas' : '') + '" aria-label="Tela: ' + esc(t.nome) + '" role="group">' +
        '<span class="wf-ilha" aria-hidden="true"></span>' + corpo + '</div>' +
      '<figcaption><b>' + esc(t.nome) + '</b>' +
        '<span class="rfl">' + t.hus.map((id) => chipHistoria(id)).join('') + '</span>' +
        '<span class="wf-origem">' + (t.alta ? 'Na alta fidelidade: ' + esc(t.alta) : 'Sem tela na alta fidelidade; vem só da HU') + '</span>' +
        (t.notas && t.notas.length ? '<ul>' + t.notas.map((n) => '<li>' + esc(n) + '</li>').join('') + '</ul>' : '') +
      '</figcaption></figure>';
  }

  // Rastreabilidade: cada HU e as telas em que aparece.
  function cobertura() {
    const telasDa = (id) => TELAS.filter((t) => t.hus.includes(id));
    const linhas = DADOS.historias.slice().sort((a, b) => a.id.localeCompare(b.id)).map((h) => {
      const ts = telasDa(h.id);
      return '<tr><td>' + chipHistoria(h) + '</td><td>' + esc(h.nome) + '</td><td>' + (noMvp(h) ? 'MVP' : 'Fora do MVP') + '</td><td>' +
        (ts.length ? ts.map((t) => '<a href="#tela-' + t.id + '">' + esc(t.nome) + '</a>').join(', ')
          : '<span class="ph">Sem tela' + (noMvp(h) ? '' : ': fora do MVP e fora da alta fidelidade') + '</span>') + '</td></tr>';
    }).join('');
    return '<div class="tblw"><table><thead><tr><th style="width: 72px">HU</th><th>História</th><th style="width: 110px">Escopo</th><th>Telas</th></tr></thead>' +
      '<tbody>' + linhas + '</tbody></table></div>';
  }

  const mvp = DADOS.historias.filter(noMvp);
  const mvpComTela = mvp.filter((h) => TELAS.some((t) => t.hus.includes(h.id)));
  document.getElementById('prototipo-resumo').innerHTML =
    '<div class="stat"><span>Telas</span><div class="val">' + TELAS.length + '</div></div>' +
    '<div class="stat"><span>Fluxos</span><div class="val">' + FLUXOS.length + '</div></div>' +
    '<div class="stat"><span>HUs do MVP com tela</span><div class="val">' + mvpComTela.length + ' de ' + mvp.length + '</div></div>';

  alvo.innerHTML = FLUXOS.map(([id, nome, descricao]) =>
    '<section class="wf-fluxo" aria-labelledby="fluxo-' + id + '"><h2 id="fluxo-' + id + '">' + esc(nome) + '</h2><p>' + esc(descricao) + '</p>' +
    '<div class="wf-grade">' + TELAS.filter((t) => t.fluxo === id).map(tela).join('') + '</div></section>').join('') +
    '<section aria-labelledby="fluxo-cobertura"><h2 id="fluxo-cobertura">Histórias e telas</h2>' +
    '<p>Cada história de usuário e as telas em que ela aparece. As telas sem par na alta fidelidade vêm só da HU.</p>' + cobertura() + '</section>';

  document.getElementById('link-alta').href = TELAS_ALTA;
  // Quem chega por #tela-… vê a tela destacada (o :target do CSS) e centralizada.
  const irParaTela = () => {
    const t = location.hash.startsWith('#tela-') && document.getElementById(location.hash.slice(1));
    if (t) t.scrollIntoView({ block: 'center' });
  };
  window.addEventListener('hashchange', irParaTela);
  irParaTela();
})();
