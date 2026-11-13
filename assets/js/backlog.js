// ===== Backlog por iteração =====

(() => {
  const { esc, caracteristica, responsavel } = MC;
  const cadastro = DADOS.backlog;
  const numero = (valor) => Number(valor.replace(',', '.'));
  const decimal = (valor) => valor.toFixed(1).replace('.', ',');
  const mvp = DADOS.historias.filter((h) => h.iteracao > 0);
  const refino = DADOS.historias.filter((h) => cadastro.itens[h.id] && cadastro.itens[h.id].situacao === 'Requer refinamento');

  function situacao(h) {
    if (cadastro.itens[h.id] && cadastro.itens[h.id].situacao) return cadastro.itens[h.id].situacao;
    if (h.iteracao < DADOS.iteracaoAtual) return 'Situação não registrada';
    return DADOS.dorAtendido.includes(h.id) ? 'A fazer' : 'Bloqueada pelo DoR';
  }

  function bloqueio(h) {
    const especifico = cadastro.itens[h.id] && cadastro.itens[h.id].bloqueios;
    if (especifico && especifico.length) return especifico[0];
    if (!cadastro.responsaveis[h.id]) return 'Responsável não atribuído';
    if (!DADOS.dorAtendido.includes(h.id)) return 'DoR não atendido';
    return 'Nenhum bloqueio registrado';
  }

  function resumoIteracao(n) {
    const hs = mvp.filter((h) => h.iteracao === n);
    const carga = hs.reduce((soma, h) => soma + numero(h.esforco.consolidado), 0);
    return { hs, carga: decimal(carga), capacidade: 'Não registrada' };
  }

  function pendencia(h) {
    const lista = [];
    if (!cadastro.responsaveis[h.id]) lista.push('Definir responsável');
    if (h.iteracao < DADOS.iteracaoAtual) lista.push('Informar o resultado da iteração');
    else if (!DADOS.dorAtendido.includes(h.id)) lista.push('Conferir o DoR');
    return lista.length ? lista.join(' · ') + '.' : 'Nenhuma pendência registrada.';
  }

  function tabelaIteracao(n) {
    const { hs, carga, capacidade } = resumoIteracao(n);
    return '<section class="demo-iter"><div class="demo-iter-title"><div><h3>Iteração ' + n + '</h3>' +
      '<span>' + hs.length + ' histórias planejadas</span></div></div>' +
      '<dl class="simple-resumo"><div><dt>Esforço planejado</dt><dd>' + carga + '</dd></div>' +
      '<div><dt>Disponibilidade da equipe</dt><dd>' + capacidade + '</dd></div>' +
      '<div><dt>O trabalho cabe no período?</dt><dd>Ainda não avaliado</dd></div></dl>' +
      '<div class="tblw"><table class="simple-table"><thead><tr><th>História</th><th>Quem faz</th><th>Andamento</th><th>Pendência</th></tr></thead><tbody>' +
      hs.map((h) => '<tr class="hu-principal"><th scope="row"><button type="button" class="demo-hu" data-historia="' + h.id + '"><span class="mono">' + h.id + '</span>' + esc(h.nome) + '</button></th>' +
        '<td' + (cadastro.responsaveis[h.id] ? '' : ' class="ph"') + '>' + esc(responsavel(h)) + '</td>' +
        '<td><span class="bk-status ' + (n === DADOS.iteracaoAtual ? 'bk-bloqueio' : 'bk-atencao') + '">' +
          esc(situacao(h) === 'Bloqueada pelo DoR' ? 'Aguardando preparação' :
            situacao(h) === 'Situação não registrada' ? 'Andamento ainda não informado' : situacao(h)) + '</span></td>' +
        '<td><span class="simple-pendencia">' + esc(pendencia(h)) + '</span>' +
          '<details class="hu-planejamento"><summary>Ver planejamento</summary><div class="hu-planejamento-conteudo">' +
          '<dl class="hu-dados"><div><dt>Característica</dt><dd>' + h.caracteristica + ' · ' + esc(caracteristica(h.caracteristica).nome) + '</dd></div>' +
          '<div><dt>Esforço estimado</dt><dd>' + h.esforco.consolidado + '</dd></div>' +
          '<div><dt>Prontidão para desenvolver</dt><dd>' + (DADOS.dorAtendido.includes(h.id) ? 'DoR atendido' : 'DoR ainda não confirmado') + '</dd></div></dl>' +
          '<div class="hu-etapas"><h4>Planejamento do trabalho</h4><p class="state">Etapas de referência; tarefas específicas ainda precisam ser definidas.</p>' +
          '<ol>' + cadastro.tarefasPadrao.map((t) => '<li><span class="mono">' + h.id + '-' + t.id + '</span> ' + esc(t.titulo) + '</li>').join('') +
          '</ol></div></div></details></td></tr>').join('') +
      '</tbody></table></div></section>';
  }

  function blocoRefino() {
    return '<h3>Histórias que precisam ser detalhadas</h3><div class="demo-refino-list">' + refino.map((h) =>
      '<button type="button" data-historia="' + h.id + '"><span><b class="mono">' + h.id + '</b> ' + esc(h.nome) +
      '</span><small>' + esc(bloqueio(h)) + '</small></button>').join('') + '</div>';
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
  mostrarIteracao('6');
})();
