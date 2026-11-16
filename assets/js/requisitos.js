// ===== Requisitos: a árvore do problema até as histórias e seus RNFs =====
//
// O problema e os objetivos estão no HTML da página; daqui saem as
// características, as histórias da característica escolhida, os requisitos
// não funcionais da história escolhida, os filtros e a busca.
//
// O estado fica no endereço, para o link abrir a mesma visão:
//   ?cp=CP4&filtro=mvp   característica e filtro;
//   ?hl=HU13             história escolhida (mostra os RNFs e o planejamento dela);
//   &plano=HU13          além disso, rola até o planejamento.
// Clicar numa característica troca as histórias; clicar numa história troca os
// requisitos não funcionais; clicar num cartão de RNF abre o detalhe completo.

(() => {
  const { esc, noMvp, pilula } = MC;
  const params = new URLSearchParams(location.search);
  const plano = PLANO_ARVORE;
  const estiloPlano = document.createElement('link');
  estiloPlano.rel = 'stylesheet';
  estiloPlano.href = 'assets/css/planejamento-arvore.css?v=29';
  document.head.appendChild(estiloPlano);
  document.querySelector('.lead').textContent = 'Do problema ao planejamento: características, histórias e requisitos no mesmo lugar. Escolha uma característica, depois uma história.';
  plano.montar();

  const FILTROS = ['all', 'mvp'];
  const historiaDe = (id) => DADOS.historias.find((h) => h.id === id);
  const inicial = historiaDe(params.get('hl'));
  const estado = {
    // A característica vem da história escolhida, quando há uma: evita link com CP e HU que não combinam.
    cp: inicial ? inicial.caracteristica
      : DADOS.caracteristicas.some((c) => c.id === params.get('cp')) ? params.get('cp') : 'CP1',
    filtro: FILTROS.includes(params.get('filtro')) ? params.get('filtro') : 'all',
    hu: inicial ? inicial.id : null,
    irAoPlano: !!inicial && params.get('plano') === inicial.id,
    busca: ''
  };

  // Posição horizontal de cada nó no desenho das ligações (0 a 700).
  const X_OE = { OE1: 150, OE2: 350, OE3: 550 };
  const xCp = (id) => 50 + 100 * DADOS.caracteristicas.findIndex((c) => c.id === id);

  const passa = (h) => (estado.filtro !== 'mvp' || noMvp(h)) && plano.passa(h);
  const conta = (f) => DADOS.historias.filter(f).length;
  const semMovimento = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rolar = (el, bloco) => el.scrollIntoView({ block: bloco, behavior: semMovimento() ? 'instant' : 'smooth' });

  const $ = (id) => document.getElementById(id);
  const ferramentas = $('ferramentas');

  // Cartão de uma história: código, nome e, no MVP, os selos de DoR e DoD.
  function folha(h) {
    const escolhida = estado.hu === h.id;
    const cls = (noMvp(h) ? '' : ' off') + (escolhida ? ' hl' : '');
    return '<button class="leaf' + cls + '" type="button" data-sel="' + h.id + '" aria-pressed="' + escolhida + '">' +
      '<span class="k mono">' + h.id + '</span><span>' + esc(h.nome) + '</span>' +
      (noMvp(h) ? '<span class="pills">' + pilula('DoR', DADOS.progressoDor(h)) + pilula('DoD', DADOS.progressoDod(h)) + '</span>' : '') +
      '</button>';
  }

  // Cartão de um requisito não funcional: título e tags logo de cara; o
  // detalhe completo abre num pop-up (data-rnf, tratado em site.js).
  function cartaoRnf(r, transversal) {
    const e = DADOS.estadoRnf(r);
    const ligadas = r.todasAsHistorias ? [] : DADOS.historias.filter((h) => h.rnfs.includes(r.id));
    const alcance = r.todasAsHistorias ? 'Todas as histórias'
      : ligadas.length + (ligadas.length === 1 ? ' história' : ' histórias') + ' (' + ligadas.filter(noMvp).length + ' no MVP)';
    return '<button class="rcard" type="button" data-rnf="' + r.id + '">' +
      '<span class="rcard-topo"><span class="k mono">' + r.id + '</span>' +
      pilula('Verificação', { nivel: e.nivel, total: 0, detalhe: e.detalhe }, e.rotulo) + '</span>' +
      '<b class="rcard-nome">' + esc(r.nome) + '</b>' +
      '<span class="rcard-crit">' + esc(r.criterio) + '</span>' +
      '<span class="rtags"><span class="rtag">' + esc(r.classificacao) + '</span><span class="rtag">' + esc(alcance) + '</span></span>' +
      '<span class="more" aria-hidden="true">Ver detalhes →</span></button>';
  }

  function desenharFiltros() {
    ferramentas.querySelectorAll('.btn').forEach((b) => b.remove());
    const rotulos = {
      all: 'Todas (' + DADOS.historias.length + ')',
      mvp: 'MVP (' + conta(noMvp) + ')'
    };
    FILTROS.forEach((k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn f-' + k + (estado.filtro === k ? ' on' : '');
      b.setAttribute('aria-pressed', estado.filtro === k);
      b.textContent = rotulos[k];
      b.addEventListener('click', () => { estado.filtro = k; atualizar(); });
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
      linhas.map((h) => '<div class="lc">' + folha(h) + '</div>').join('') + '</div>';
    $('sem-folhas').hidden = n > 0;

    desenharRequisitos(linhas);
  }

  // Os requisitos não funcionais da história escolhida. O bloco fica logo abaixo da
  // caixa da árvore (que rola para os lados no celular), com a história destacada acima.
  function desenharRequisitos(linhas) {
    const alvo = $('requisitos-hu'), transversais = $('rail-transversais');
    const h = estado.hu && linhas.find((x) => x.id === estado.hu);
    if (!h) {
      transversais.hidden = false;
      alvo.innerHTML = linhas.length
        ? '<p class="dica-hu">Escolha uma história para ver os requisitos não funcionais dela.</p>' : '';
      return;
    }
    transversais.hidden = true;
    const proprios = h.rnfs.map(MC.rnf);
    const todas = DADOS.rnfs.filter((r) => r.todasAsHistorias);
    alvo.innerHTML =
      '<section class="hu-bloco" aria-label="Requisitos não funcionais de ' + h.id + '">' +
      '<div class="hu-cab"><div><span class="k mono">' + h.id + ' · ' + h.caracteristica + '</span><h3>' + esc(h.nome) + '</h3></div>' +
      '<div class="tools"><button class="btn" type="button" data-historia="' + h.id + '">Ver HU</button>' +
      '<button class="btn" type="button" data-ir-plano>Ver planejamento</button></div></div>' +
      '<div class="ptags">' + MC.etiquetas(h, { semRnf: true }) + '</div>' +
      '<h4 class="hu-sub">Requisitos não funcionais desta história (' + proprios.length + ')</h4>' +
      (proprios.length
        ? '<div class="rgrid">' + proprios.map((r) => cartaoRnf(r)).join('') + '</div>'
        : '<p class="hu-vazio">Esta história não tem RNF específico. Vale só o que é comum a todas, abaixo.</p>') +
      '<h4 class="hu-sub">Valem para todas as histórias (' + todas.length + ')</h4>' +
      '<div class="rgrid">' + todas.map((r) => cartaoRnf(r, true)).join('') + '</div>' +
      '</section>';
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
    // A história escolhida só vale enquanto está na característica e passa nos filtros.
    const h = estado.hu && historiaDe(estado.hu);
    if (!h || h.caracteristica !== estado.cp || !passa(h)) estado.hu = null;

    const p = new URLSearchParams();
    if (estado.cp !== 'CP1') p.set('cp', estado.cp);
    if (estado.filtro !== 'all') p.set('filtro', estado.filtro);
    if (estado.hu) p.set('hl', estado.hu);
    history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '') + location.hash);

    desenharFiltros();
    desenharArvore();
    desenharBusca();
    if (estado.hu) plano.mostrar(historiaDe(estado.hu)); else plano.ocultar();
  }

  // Escolher uma história: de novo no mesmo cartão, desescolhe.
  function escolher(id) {
    if (estado.busca) {
      estado.busca = '';
      $('busca').value = '';
    }
    const h = historiaDe(id);
    estado.cp = h.caracteristica;
    estado.hu = estado.hu === id ? null : id;
    atualizar();
    if (estado.hu) {
      const bloco = document.querySelector('.hu-bloco');
      if (bloco) rolar(bloco, 'nearest');
    }
  }

  $('caracteristicas').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cp]');
    if (!b) return;
    estado.cp = b.dataset.cp;
    estado.hu = null;
    atualizar();
  });
  document.addEventListener('click', (e) => {
    const folhaClicada = e.target.closest('#folhas [data-sel], #resultados [data-sel]');
    if (folhaClicada) { escolher(folhaClicada.dataset.sel); return; }
    if (e.target.closest('[data-ir-plano]')) plano.irParaPlano();
  });
  $('busca').addEventListener('input', (e) => { estado.busca = e.target.value; desenharBusca(); });

  document.addEventListener('planejamento-filtro', atualizar);
  atualizar();
  if (estado.hu) {
    const alvo = estado.irAoPlano ? $('plano-historia') : document.querySelector('.leaf.hl');
    if (alvo) rolar(alvo, estado.irAoPlano ? 'start' : 'center');
  }
})();
