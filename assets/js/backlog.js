// ===== Backlog: situação operacional, carga e decomposição em tarefas =====

(() => {
  const { esc, caracteristica, responsavel } = MC;
  const cadastro = DADOS.backlog || {};
  const itens = cadastro.itens || {};
  const responsaveis = cadastro.responsaveis || {};
  const capacidade = cadastro.capacidadePorIteracao || {};

  const numero = (valor) => Number(String(valor).replace(',', '.'));
  const decimal = (valor) => valor.toFixed(1).replace('.', ',');
  const extra = (h) => itens[h.id] || {};
  const estaAtribuida = (h) => Boolean(responsaveis[h.id]);

  function situacaoDor(h) {
    if (typeof DADOS.situacaoDor === 'function') return DADOS.situacaoDor(h.id);
    return DADOS.dorAtendido.includes(h.id) ? 'Pronta' : 'Não pronta';
  }

  function dodConcluido(h) {
    const registro = DADOS.aplicacaoDod[h.id];
    if (!registro || registro.avaliacaoExterna !== 'Aceita') return false;
    return DADOS.dodCriterios.every((c) =>
      registro.criterios[c.id] && registro.criterios[c.id].resultado === 'Aprovado');
  }

  function situacao(h) {
    if (extra(h).situacao) return extra(h).situacao;
    if (!h.iteracao) return 'Backlog posterior';
    if (dodConcluido(h)) return 'Concluída';
    if (h.iteracao < DADOS.iteracaoAtual) return 'Situação não registrada';
    if (h.iteracao > DADOS.iteracaoAtual) return 'Planejada';
    const dor = situacaoDor(h);
    if (dor === 'Pronta') return 'A fazer';
    if (dor === 'Pronta com exceção') return 'A fazer com exceção';
    return 'Bloqueada pelo DoR';
  }

  function bloqueios(h) {
    const lista = [...(extra(h).bloqueios || [])];
    if (h.iteracao && !estaAtribuida(h)) lista.push('Sem responsável atribuído.');
    if (h.iteracao && capacidade[String(h.iteracao)] && capacidade[String(h.iteracao)].disponivel == null) {
      lista.push('Capacidade da Iteração ' + h.iteracao + ' não registrada.');
    }
    if (h.iteracao === DADOS.iteracaoAtual && !DADOS.dorAtendido.includes(h.id)) {
      lista.push('DoR ainda não atendido.');
    }
    if (h.iteracao && h.iteracao < DADOS.iteracaoAtual && !dodConcluido(h)) {
      lista.push('Resultado da iteração não registrado.');
    }
    return [...new Set(lista)];
  }

  function tarefas(h) {
    const estado = situacao(h);
    const dorPronto = DADOS.dorAtendido.includes(h.id);
    return (cadastro.tarefasPadrao || []).map((t, indice) => {
      let titulo = t.titulo;
      if (indice === 0 && extra(h).tarefaRefinamento) titulo = extra(h).tarefaRefinamento;
      let resultado = 'Bloqueada';
      if (!h.iteracao && estado !== 'Requer refinamento') resultado = 'Não planejada';
      else if (estado === 'Situação não registrada') resultado = 'Situação não registrada';
      else if (estado === 'Concluída') resultado = 'Concluída';
      else if (indice === 0) resultado = dorPronto ? 'Concluída' : 'A fazer';
      else if (indice === 1 && dorPronto) resultado = 'A fazer';
      return { id: h.id + '-' + t.id, titulo, etapa: t.etapa, resultado };
    });
  }

  function classeSituacao(texto) {
    const classes = {
      'A fazer': 'bk-ok',
      'A fazer com exceção': 'bk-atencao',
      'Concluída': 'bk-ok',
      'Planejada': 'bk-neutra',
      'Backlog posterior': 'bk-neutra',
      'Situação não registrada': 'bk-atencao',
      'Bloqueada pelo DoR': 'bk-bloqueio',
      'Requer refinamento': 'bk-bloqueio'
    };
    return classes[texto] || 'bk-neutra';
  }

  function periodoDaIteracao(n) {
    for (const fase of DADOS.fases) {
      const encontrada = fase.iteracoes.find((i) => i.nome === 'Iteração ' + n);
      if (encontrada) return encontrada.periodo;
    }
    return 'Não informado';
  }

  function renderCapacidade() {
    document.getElementById('bk-capacidade').innerHTML = [5, 6].map((n) => {
      const historias = DADOS.historias.filter((h) => h.iteracao === n);
      const carga = historias.reduce((soma, h) => soma + numero(h.esforco.consolidado), 0);
      const registro = capacidade[String(n)] || {};
      const disponivel = registro.disponivel == null ? 'Não registrada' : decimal(registro.disponivel);
      const relacao = registro.disponivel == null ? 'Não calculável' :
        decimal((carga / registro.disponivel) * 100) + '%';
      return '<tr><th scope="row">Iteração ' + n + '</th><td>' + esc(periodoDaIteracao(n)) + '</td>' +
        '<td>' + historias.length + '</td><td>' + decimal(carga) + '</td><td>' + esc(disponivel) + '</td>' +
        '<td><span class="bk-status ' + (registro.disponivel == null ? 'bk-atencao' : 'bk-ok') + '">' +
        esc(relacao) + '</span></td></tr>';
    }).join('');
  }

  function opcoes() {
    const situacoes = [...new Set(DADOS.historias.map(situacao))].sort();
    document.getElementById('bk-situacao').insertAdjacentHTML('beforeend', situacoes.map((s) =>
      '<option value="' + esc(s) + '">' + esc(s) + '</option>').join(''));
    document.getElementById('bk-cp').insertAdjacentHTML('beforeend', DADOS.caracteristicas.map((c) =>
      '<option value="' + c.id + '">' + esc(c.id + ' · ' + c.nome) + '</option>').join(''));
  }

  function corresponde(h) {
    const busca = document.getElementById('bk-busca').value.trim().toLocaleLowerCase('pt-BR');
    const iteracao = document.getElementById('bk-iteracao').value;
    const estado = document.getElementById('bk-situacao').value;
    const cp = document.getElementById('bk-cp').value;
    if (busca && !(h.id + ' ' + h.nome).toLocaleLowerCase('pt-BR').includes(busca)) return false;
    if (iteracao === 'atual' && h.iteracao !== DADOS.iteracaoAtual) return false;
    if (iteracao === 'posterior' && h.iteracao !== 0) return false;
    if (iteracao && !['atual', 'posterior'].includes(iteracao) && h.iteracao !== Number(iteracao)) return false;
    return (!estado || situacao(h) === estado) && (!cp || h.caracteristica === cp);
  }

  function linha(h) {
    const cp = caracteristica(h.caracteristica);
    const estado = situacao(h);
    const impedimentos = bloqueios(h);
    const listaTarefas = tarefas(h);
    const iteracao = h.iteracao ? 'Iteração ' + h.iteracao : 'Posterior ao MVP';
    return '<tr>' +
      '<th scope="row"><button class="bk-hu" type="button" data-historia="' + h.id + '">' +
        '<span class="mono">' + h.id + '</span><b>' + esc(h.nome) + '</b></button></th>' +
      '<td><span class="mono">' + h.caracteristica + '</span><small>' + esc(cp.nome) + '</small></td>' +
      '<td>' + esc(iteracao) + '</td><td>' + esc(h.esforco.consolidado) + '</td>' +
      '<td><span class="bk-status ' + classeSituacao(estado) + '">' + esc(estado) + '</span></td>' +
      '<td class="' + (estaAtribuida(h) ? '' : 'ph') + '">' + esc(responsavel(h)) + '</td>' +
      '<td><details class="bk-detalhes"><summary>' + listaTarefas.length + ' tarefas · ' +
        impedimentos.length + ' bloqueio' + (impedimentos.length === 1 ? '' : 's') + '</summary>' +
        (impedimentos.length ? '<ul class="bk-bloqueios">' + impedimentos.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul>' : '') +
        '<ol class="bk-tarefas">' + listaTarefas.map((t) => '<li><span><b class="mono">' + t.id + '</b> ' +
          esc(t.titulo) + '<small>' + esc(t.etapa) + '</small></span><span class="bk-task-state">' +
          esc(t.resultado) + '</span></li>').join('') + '</ol></details></td></tr>';
  }

  function renderItens() {
    const visiveis = DADOS.historias.filter(corresponde);
    const corpo = document.getElementById('bk-itens');
    corpo.innerHTML = visiveis.length ? visiveis.map(linha).join('') :
      '<tr><td colspan="7" class="bk-vazio">Nenhuma história corresponde aos filtros.</td></tr>';
    document.getElementById('bk-contagem').textContent = visiveis.length + ' de ' +
      DADOS.historias.length + ' histórias exibidas';
  }

  const todas = DADOS.historias;
  document.getElementById('bk-total').textContent = todas.length;
  document.getElementById('bk-atual').textContent = todas.filter((h) => h.iteracao === DADOS.iteracaoAtual).length;
  document.getElementById('bk-bloqueadas').textContent = todas.filter((h) => bloqueios(h).length).length;
  document.getElementById('bk-sem-responsavel').textContent = todas.filter((h) => h.iteracao && !estaAtribuida(h)).length;
  document.getElementById('bk-data').textContent = cadastro.atualizadoEm || 'data não informada';

  renderCapacidade();
  opcoes();
  renderItens();
  document.getElementById('bk-filtros').addEventListener('input', renderItens);
})();
