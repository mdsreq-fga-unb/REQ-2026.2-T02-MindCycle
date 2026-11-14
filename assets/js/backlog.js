// ===== Backlog por iteração =====

(() => {
  const { esc, caracteristica, responsavel } = MC;
  const cadastro = DADOS.backlog;
  const dataAtualizacao = document.getElementById('backlog-data');
  if (dataAtualizacao && cadastro.atualizadoEm) {
    dataAtualizacao.textContent = 'Dados atualizados em ' + cadastro.atualizadoEm;
  }
  const numero = (valor) => Number(valor.replace(',', '.'));
  const decimal = (valor) => valor.toFixed(1).replace('.', ',');
  const mvp = DADOS.historias.filter((h) => h.iteracao > 0);
  const refino = DADOS.historias.filter((h) => !(h.iteracao > 0));
  const historiaAlvo = DADOS.historias.find((h) => h.id === new URLSearchParams(location.search).get('hu'));

  function prontidao(h) {
    if (typeof DADOS.situacaoDor === 'function') return DADOS.situacaoDor(h.id);
    return DADOS.dorAtendido.includes(h.id) ? 'Pronta' : 'Não conferida';
  }

  function situacao(h) {
    const item = cadastro.itens[h.id] || {};
    return item.andamento || cadastro.andamentoPadrao || 'Andamento ainda não informado';
  }

  function bloqueio(h) {
    const especifico = cadastro.itens[h.id] && cadastro.itens[h.id].bloqueios;
    if (especifico && especifico.length) return especifico[0];
    if (cadastro.itens[h.id] && cadastro.itens[h.id].situacao === 'Requer refinamento') return h.nota;
    if (!cadastro.responsaveis[h.id]) return 'Responsável não atribuído';
    if (!DADOS.dorAtendido.includes(h.id)) return 'Conferir o DoR';
    return 'Nenhum bloqueio registrado';
  }

  function resumoIteracao(n) {
    const hs = mvp.filter((h) => h.iteracao === n);
    const carga = hs.reduce((soma, h) => soma + numero(h.esforco.consolidado), 0);
    const registro = cadastro.capacidadePorIteracao[n];
    const capacidade = registro && registro.disponivel != null ? registro.disponivel + ' ' + registro.unidade + ' estimadas' : 'Não registrada';
    return { hs, carga: decimal(carga), capacidade };
  }

  function pendencia(h) {
    const item = cadastro.itens[h.id] || {};
    const lista = [...(item.bloqueios || [])];
    (item.dependencias || []).forEach((id) => {
      const dependencia = DADOS.historias.find((historia) => historia.id === id);
      if (dependencia && dependencia.iteracao > h.iteracao) {
        lista.push('Rever alocação: depende de ' + id + ', planejada para a Iteração ' + dependencia.iteracao);
      }
    });
    if (!cadastro.responsaveis[h.id]) lista.push('Definir responsável');
    if (!DADOS.dorAtendido.includes(h.id)) lista.push('Conferir o DoR');
    return lista.length ? lista.map((texto) => texto.replace(/\.$/, '')).join(' · ') + '.' : 'Nenhuma pendência registrada.';
  }

  function tarefas(h) {
    const detalhamento = (cadastro.itens[h.id] || {}).tarefas || {};
    const referencias = {
      T01: 'Conferir os critérios do DoR da história.',
      T03: 'Aplicar os critérios de aceitação, os RNFs vinculados e o checklist do DoD.',
      T04: 'Apresentar o incremento e registrar a avaliação dos stakeholders.'
    };
    return '<table class="hu-plano-tabela hu-plano-etapas"><caption>Planejamento do trabalho</caption>' +
      '<thead><tr><th scope="col">Etapa</th><th scope="col">Trabalho previsto</th></tr></thead><tbody>' + cadastro.tarefasPadrao.map((t) => {
      const subtarefas = detalhamento[t.id] || [];
      return '<tr><th scope="row"><span class="hu-tarefa-id mono">' + h.id + '-' + t.id + '</span>' + esc(t.titulo) + '</th><td>' +
        (subtarefas.length ? '<ul class="hu-subtarefas">' + subtarefas.map((s) =>
          '<li>' + esc(s) + '</li>').join('') + '</ul>' : esc(referencias[t.id] || t.titulo)) + '</td></tr>';
    }).join('') + '</tbody></table>';
  }

  function tabelaIteracao(n) {
    const { hs, carga, capacidade } = resumoIteracao(n);
    return '<section class="demo-iter"><div class="demo-iter-title"><div><h3>Iteração ' + n + '</h3>' +
      '<span>' + hs.length + ' histórias planejadas</span></div></div>' +
      '<dl class="simple-resumo"><div><dt>Esforço planejado</dt><dd>' + carga + '</dd></div>' +
      '<div><dt>Disponibilidade da equipe</dt><dd>' + capacidade + '</dd></div>' +
      '<div><dt>O trabalho cabe no período?</dt><dd>Ainda não avaliado</dd></div></dl>' +
      '<div class="tblw"><table class="simple-table"><thead><tr><th>História</th><th>Esforço</th><th>Quem faz</th><th>Andamento</th><th>Pendência</th></tr></thead><tbody>' +
      hs.map((h) => '<tr class="hu-principal" data-backlog-hu="' + h.id + '"><th scope="row"><button type="button" class="demo-hu" data-historia="' + h.id + '"><span class="mono">' + h.id + '</span>' + esc(h.nome) + '</button></th>' +
        '<td class="hu-esforco mono">' + esc(h.esforco.consolidado) + '</td>' +
        '<td' + (cadastro.responsaveis[h.id] ? '' : ' class="ph"') + '>' + esc(responsavel(h)) + '</td>' +
        '<td><span class="bk-status bk-neutra">' + esc(situacao(h)) + '</span></td>' +
        '<td><span class="simple-pendencia">' + esc(pendencia(h)) + '</span></td></tr>' +
        '<tr class="hu-planejamento-linha"><td colspan="5">' +
          '<details class="hu-planejamento"><summary>Ver planejamento</summary><div class="hu-planejamento-conteudo">' +
          '<table class="hu-plano-tabela hu-plano-dados"><caption>Dados de ' + h.id + '</caption><tbody>' +
          '<tr><th scope="row">Característica</th><td>' + h.caracteristica + ' · ' + esc(caracteristica(h.caracteristica).nome) + '</td></tr>' +
          '<tr><th scope="row">Prontidão para desenvolver</th><td>' + esc(prontidao(h)) +
          ' · <a href="../dor-e-dod/#' + h.id + '">Consultar DoR e DoD</a></td></tr>' +
          (h.regras ? '<tr><th scope="row">Regras da história</th><td>' + esc(h.regras.situacao) +
            '<br><button type="button" class="lnk" data-historia="' + h.id + '">Consultar regras e critérios</button></td></tr>' : '') +
          '</tbody></table>' + tarefas(h) + '</div></details></td></tr>').join('') +
      '</tbody></table></div></section>';
  }

  function blocoRefino() {
    return '<h3>Histórias sem iteração definida</h3><div class="demo-refino-list">' + refino.map((h) =>
      '<button type="button" data-backlog-hu="' + h.id + '" data-historia="' + h.id + '"><span><b class="mono">' + h.id + '</b> ' + esc(h.nome) +
      '</span><small>' + esc((cadastro.itens[h.id] || {}).situacao === 'Requer refinamento' ? bloqueio(h) : h.nota) + '</small></button>').join('') + '</div>';
  }

  const abasIteracao = [...document.querySelectorAll('[data-iteracao]')];
  function mostrarIteracao(valor) {
    abasIteracao.forEach((aba) => {
      const selecionada = aba.dataset.iteracao === valor;
      aba.setAttribute('aria-selected', selecionada);
      aba.tabIndex = selecionada ? 0 : -1;
    });
    const painel = document.getElementById('iter-selected');
    painel.setAttribute('aria-labelledby', 'iter-tab-' + valor);
    painel.innerHTML = valor === 'refino' ? blocoRefino() : tabelaIteracao(Number(valor));
  }
  abasIteracao.forEach((aba, indice) => {
    aba.addEventListener('click', () => mostrarIteracao(aba.dataset.iteracao));
    aba.addEventListener('keydown', (evento) => {
      let destino;
      if (evento.key === 'ArrowRight') destino = (indice + 1) % abasIteracao.length;
      if (evento.key === 'ArrowLeft') destino = (indice + abasIteracao.length - 1) % abasIteracao.length;
      if (evento.key === 'Home') destino = 0;
      if (evento.key === 'End') destino = abasIteracao.length - 1;
      if (destino === undefined) return;
      evento.preventDefault();
      mostrarIteracao(abasIteracao[destino].dataset.iteracao);
      abasIteracao[destino].focus();
    });
  });
  mostrarIteracao(historiaAlvo ? (historiaAlvo.iteracao > 0 ? String(historiaAlvo.iteracao) : 'refino') : '6');
  if (historiaAlvo) {
    const alvo = document.querySelector('[data-backlog-hu="' + historiaAlvo.id + '"]');
    if (alvo) {
      alvo.classList.add('backlog-destaque');
      alvo.scrollIntoView({ block: 'center' });
      window.setTimeout(() => alvo.classList.remove('backlog-destaque'), 2600);
    }
  }
})();
