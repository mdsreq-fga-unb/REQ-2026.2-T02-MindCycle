// ===== Requisitos: a árvore do problema até as histórias =====
//
// O problema e os objetivos estão no HTML da página; daqui saem as
// características, as histórias da característica escolhida, os filtros e a
// busca. O estado fica no endereço (?cp=CP4&filtro=mvp), para o link abrir
// a mesma visão; ?hl=HU13 destaca uma história ("Ver na árvore").

(() => {
  const { esc, noMvp, noBacklog, naIteracaoAtual } = MC;
  const params = new URLSearchParams(location.search);
  const FILTROS = ['all', 'mvp', 'bkl', 'cur'];
  const estado = {
    cp: DADOS.caracteristicas.some((c) => c.id === params.get('cp')) ? params.get('cp') : 'CP1',
    filtro: FILTROS.includes(params.get('filtro')) ? params.get('filtro') : 'all',
    destaque: params.get('hl'),
    busca: ''
  };

  // Posição horizontal de cada nó no desenho das ligações (0 a 700).
  const X_OE = { OE1: 150, OE2: 350, OE3: 550 };
  const xCp = (id) => 50 + 100 * DADOS.caracteristicas.findIndex((c) => c.id === id);

  const passa = (h) => estado.filtro === 'mvp' ? noMvp(h)
    : estado.filtro === 'bkl' ? noBacklog(h)
    : estado.filtro === 'cur' ? naIteracaoAtual(h) : true;
  const conta = (f) => DADOS.historias.filter(f).length;

  const $ = (id) => document.getElementById(id);
  const ferramentas = $('ferramentas');

  function etiquetasFolha(h) {
    return '<span class="ltags">' +
      (noBacklog(h) ? '<span class="tag tbk">Backlog</span>' : '') +
      (naIteracaoAtual(h) ? '<span class="tag tcur">Iteração atual</span>' : '') + '</span>';
  }

  function folha(h) {
    const cls = (noMvp(h) ? '' : ' off') + (estado.destaque === h.id ? ' hl' : '');
    return '<button class="leaf' + cls + '" type="button" data-historia="' + h.id + '">' +
      '<span class="k mono">' + h.id + '</span><span>' + esc(h.nome) + '</span>' + etiquetasFolha(h) + '</button>';
  }

  function desenharFiltros() {
    ferramentas.querySelectorAll('.btn').forEach((b) => b.remove());
    const rotulos = {
      all: 'Todas (' + DADOS.historias.length + ')',
      mvp: 'MVP (' + conta(noMvp) + ')',
      bkl: 'Backlog (' + conta(noBacklog) + ')',
      cur: 'Iteração atual (' + conta(naIteracaoAtual) + ')'
    };
    FILTROS.forEach((k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn f-' + k + (estado.filtro === k ? ' on' : '');
      b.setAttribute('aria-pressed', estado.filtro === k);
      b.textContent = rotulos[k];
      b.addEventListener('click', () => { estado.filtro = k; estado.destaque = null; atualizar(); });
      ferramentas.appendChild(b);
    });
  }

  function desenharArvore() {
    const sel = MC.caracteristica(estado.cp);
    const oeX = X_OE[sel.objetivo], cpX = xCp(sel.id);

    document.querySelectorAll('.node.oe').forEach((n) => n.classList.toggle('on', n.dataset.oe === sel.objetivo));
    $('caminho-oe').setAttribute('d', 'M350 0V20H' + oeX + 'V40');
    $('caminho-cp').setAttribute('d', 'M' + oeX + ' 0V20H' + cpX + 'V40');

    $('caracteristicas').innerHTML = DADOS.caracteristicas.map((c) => {
      const todas = DADOS.historias.filter((h) => h.caracteristica === c.id);
      const on = c.id === estado.cp;
      return '<button class="node cp' + (on ? ' on' : '') + '" type="button" data-cp="' + c.id + '" aria-pressed="' + on + '">' +
        '<span class="k mono">' + c.id + (c.habilitadora ? ' · hab.' : '') + '</span><span>' + esc(c.nome) + '</span>' +
        '<span class="c">' + todas.filter(passa).length + ' de ' + todas.length + ' HUs</span></button>';
    }).join('');

    const linhas = DADOS.historias.filter((h) => h.caracteristica === estado.cp && passa(h));
    const n = linhas.length;
    $('folhas').innerHTML = n === 0 ? '' :
      '<svg class="w" viewBox="0 0 700 40" preserveAspectRatio="none" aria-hidden="true"><path class="ln a" d="' +
      linhas.map((h, i) => 'M' + cpX + ' 0V20H' + ((i + 0.5) / n * 700) + 'V40').join('') + '"></path></svg>' +
      '<div class="leafs" style="grid-template-columns: repeat(' + n + ', minmax(0, 1fr))">' +
      linhas.map((h) => '<div class="lc">' + folha(h) + (h.rnfs.length
        ? '<i class="stem" aria-hidden="true"></i><div class="rnfs">' +
          h.rnfs.map((r) => '<button class="rnfc mono" type="button" data-rnf="' + r + '">' + r + '</button>').join('') + '</div>'
        : '') + '</div>').join('') + '</div>';
    $('sem-folhas').hidden = n > 0;
    $('backlog-vazio').hidden = !((estado.filtro === 'bkl' || estado.filtro === 'cur') && conta(noBacklog) === 0);
  }

  function desenharBusca() {
    const q = estado.busca.trim().toLowerCase();
    $('resultados').hidden = !q;
    $('arvore').hidden = !!q;
    if (!q) return;
    const achadas = DADOS.historias.filter((h) =>
      (h.id + ' ' + h.nome + ' Como usuária, quero ' + h.historia + '.').toLowerCase().includes(q) && passa(h));
    $('resultados-titulo').textContent = achadas.length + ' resultado(s)';
    $('resultados-lista').innerHTML = achadas.map(folha).join('');
  }

  function atualizar() {
    const p = new URLSearchParams();
    if (estado.cp !== 'CP1') p.set('cp', estado.cp);
    if (estado.filtro !== 'all') p.set('filtro', estado.filtro);
    if (estado.destaque) p.set('hl', estado.destaque);
    history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '') + location.hash);
    desenharFiltros();
    desenharArvore();
    desenharBusca();
  }

  $('caracteristicas').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cp]');
    if (!b) return;
    estado.cp = b.dataset.cp;
    estado.destaque = null;
    atualizar();
  });
  $('busca').addEventListener('input', (e) => { estado.busca = e.target.value; desenharBusca(); });

  // A legenda da iteração atual acompanha DADOS.iteracaoAtual.
  const iteracao = DADOS.fases.flatMap((f) => f.iteracoes).find((i) => i.numero === DADOS.iteracaoAtual);
  if (iteracao) {
    $('legenda-atual').textContent = 'Iteração atual: Backlog alocado à Iteração ' + DADOS.iteracaoAtual + ', de ' +
      iteracao.periodo.replace(/\/\d{4}$/, '');
  }

  atualizar();
  if (estado.destaque) {
    const alvo = document.querySelector('.leaf.hl');
    if (alvo) alvo.scrollIntoView({ block: 'center' });
  }
})();
