// ===== Comportamento comum a todas as páginas =====
//
// Tema claro/escuro, diálogos (janelas sobre a página) e os dois detalhes que
// abrem de qualquer página: o de uma história de usuário e o de um RNF.
//
// Qualquer elemento com data-historia="HU13" abre a história; com
// data-rnf="RNF04", o RNF; com data-dialogo="metas", o <template id="metas">
// da página. O endereço acompanha: #HU13, #RNF04 ou #metas abrem o mesmo
// diálogo quando a página carrega, então dá para mandar o link.

const MC = (() => {
  // A raiz do site é a pasta acima de assets/js/: funciona no GitHub Pages
  // (/REQ-2026.2-T02-MindCycle/) e num servidor local.
  const RAIZ = new URL('../../', document.currentScript.src).href;
  const pagina = document.body.dataset.pagina;

  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESC[c]);

  const url = (caminho) => RAIZ + caminho;
  const tempo = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const video = (id, s) => 'https://www.youtube.com/watch?v=' + id + (s ? '&t=' + s + 's' : '');

  const historia = (id) => DADOS.historias.find((h) => h.id === id);
  const rnf = (id) => DADOS.rnfs.find((r) => r.id === id);
  const caracteristica = (id) => DADOS.caracteristicas.find((c) => c.id === id);
  const noMvp = (h) => h.iteracao > 0;
  const noBacklog = (h) => noMvp(h) && DADOS.dorAtendido.includes(h.id);
  const naIteracaoAtual = (h) => noBacklog(h) && h.iteracao === DADOS.iteracaoAtual;
  const MOSCOW = { 4: 'Must have', 3: 'Should have', 2: 'Could have', 1: "Won't have now" };

  // ---------------------------------------------------------------------
  // Tema
  // ---------------------------------------------------------------------
  const botaoTema = document.getElementById('tema');
  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    if (botaoTema) botaoTema.textContent = tema === 'dark' ? '☀ Tema claro' : '☾ Tema escuro';
  }
  aplicarTema(document.documentElement.getAttribute('data-theme') || 'light');
  if (botaoTema) {
    botaoTema.addEventListener('click', () => {
      const novo = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicarTema(novo);
      try { localStorage.setItem('tema', novo); } catch (e) { /* modo privado: vale só nesta página */ }
    });
  }

  // ---------------------------------------------------------------------
  // Diálogos
  // ---------------------------------------------------------------------
  const ICONE_FECHAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
  const botaoFechar = '<button class="x" type="button" aria-label="Fechar" data-fechar>' + ICONE_FECHAR + '</button>';

  let aberto = null;

  function fecharDialogo() {
    if (!aberto) return;
    const { el, voltarFoco, hash, voltar } = aberto;
    aberto = null;
    el.remove();
    document.body.classList.remove('com-dialogo');
    if (hash && location.hash === '#' + hash) history.replaceState(null, '', location.pathname + location.search);
    if (voltarFoco && document.contains(voltarFoco)) voltarFoco.focus();
    if (voltar) voltar();
  }

  // conteudo: o HTML de dentro da caixa (cabeçalho com botaoFechar incluso).
  // reabrir: função que desenha este diálogo de novo. Com ela, o que for aberto
  // de dentro dele (uma história, um RNF) volta para ele ao fechar.
  function abrirDialogo({ rotulo, conteudo, largo, hash, fecharRotulo, reabrir }) {
    const voltarFoco = aberto ? aberto.voltarFoco : document.activeElement;
    const voltar = aberto ? aberto.reabrir || aberto.voltar : null;
    if (aberto) { aberto.hash = null; aberto.voltar = null; fecharDialogo(); }
    const el = document.createElement('div');
    el.className = 'over';
    el.innerHTML = '<button class="shade" type="button" aria-label="' + esc(fecharRotulo || 'Fechar') + '" data-fechar></button>' +
      '<section class="dlg' + (largo ? ' wide' : '') + '" role="dialog" aria-modal="true" aria-label="' + esc(rotulo) + '">' +
      conteudo + '</section>';
    document.body.appendChild(el);
    document.body.classList.add('com-dialogo');
    aberto = { el, voltarFoco, hash, reabrir, voltar };
    if (hash) history.replaceState(null, '', '#' + hash);
    const x = el.querySelector('.x');
    if (x) x.focus();
    return el.querySelector('.dlg');
  }

  document.addEventListener('keydown', (e) => {
    if (!aberto) return;
    if (e.key === 'Escape') { fecharDialogo(); return; }
    if (e.key !== 'Tab') return;
    // O foco não sai do diálogo enquanto ele está aberto.
    const focaveis = aberto.el.querySelectorAll('.dlg a[href], .dlg button, .dlg input');
    if (!focaveis.length) return;
    const primeiro = focaveis[0], ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });

  // Diálogo cujo conteúdo está num <template> da página (figuras, metas).
  function abrirTemplate(id) {
    const t = document.getElementById(id);
    if (!t || t.tagName !== 'TEMPLATE') return false;
    const dlg = abrirDialogo({ rotulo: t.dataset.rotulo || '', conteudo: '', largo: 'largo' in t.dataset, hash: id,
      fecharRotulo: t.dataset.fechar });
    dlg.appendChild(t.content.cloneNode(true));
    const x = dlg.querySelector('.x');
    if (x) x.focus();
    return true;
  }

  // ---------------------------------------------------------------------
  // História de usuário
  // ---------------------------------------------------------------------
  function beneficio(h) {
    return 'P' + h.historia.slice(h.historia.lastIndexOf(', para ') + 3) + '.';
  }

  function decisoes(h) {
    const lista = [];
    DADOS.reunioes.forEach((m) => m.decisoes.forEach((d) => {
      if (d.historias.includes(h.id)) lista.push({ data: m.nome, texto: d.texto, tempo: tempo(d.tempo), url: video(m.id, d.tempo) });
    }));
    // As alterações com vídeo já aparecem acima, como decisões da reunião.
    (DADOS.historico[h.id] || []).filter((x) => !x.video).forEach((x) => {
      lista.push({ data: x.data, texto: x.alteracao + ' ' + x.motivo });
    });
    return lista;
  }

  function etiquetas(h) {
    const link = (texto, caminho, classe) => '<a class="ptag ' + classe + '" href="' + esc(url(caminho)) + '">' + esc(texto) + '</a>';
    const tags = [];
    if (noBacklog(h)) tags.push(link('Backlog', 'dor-e-dod/', 't-bk'));
    if (naIteracaoAtual(h)) tags.push(link('Iteração atual', 'cronograma/', 't-cur'));
    tags.push(noMvp(h) ? link('MVP', 'mvp/', 't-mvp') : link('Fora do MVP', 'mvp/', 't-out'));
    if (noMvp(h)) {
      tags.push(link('Planejada: Iteração ' + h.iteracao, 'cronograma/', 't-rel'));
      tags.push(link('Release 3', 'cronograma/', 't-rel'));
    }
    tags.push(link(MOSCOW[h.valor], 'priorizacao/', 't-p' + h.valor));
    tags.push(link('Esforço ' + h.esforco.consolidado, 'priorizacao/', 't-rel'));
    tags.push(h.validadaCliente ? link('Validada com a cliente', 'reunioes/#PKoWLngGSRg', 't-val')
      : '<span class="ptag plain">Hipótese da equipe</span>');
    if (h.rnfs.length) {
      h.rnfs.forEach((r) => tags.push('<button class="ptag t-rnf" type="button" data-rnf="' + r + '">' + r + '</button>'));
    } else {
      tags.push('<button class="ptag t-rnf" type="button" data-rnf="RNF10">RNFs transversais</button>');
    }
    return tags.join('');
  }

  function abrirHistoria(id, aba) {
    const h = historia(id);
    if (!h) return;
    const ev = decisoes(h);
    const ABAS = [['res', 'História de usuário'], ['pro', 'DoR e DoD'], ['his', 'Decisões']];
    aba = aba || 'res';
    const conteudo =
      '<div class="dh"><div><div class="crumbs"><span class="mono">' + h.id + '</span></div>' +
      '<h2 style="margin: 2px 0 8px">' + esc(h.nome) + '</h2></div>' + botaoFechar + '</div>' +
      '<div class="ptags">' + etiquetas(h) + '</div>' +
      '<div class="tabs" role="tablist">' + ABAS.map(([k, t]) =>
        '<button class="tab' + (k === aba ? ' on' : '') + '" type="button" role="tab" aria-selected="' + (k === aba) +
        '" data-aba="' + k + '">' + t + '</button>').join('') + '</div>' +
      '<div class="pane" data-painel="res"' + (aba === 'res' ? '' : ' hidden') + '>' +
        '<p class="story">Como usuária, quero ' + esc(h.historia) + '.</p>' +
        '<dl class="dl">' +
          '<div class="dlr"><dt>Benefício</dt><dd><b>' + esc(beneficio(h)) + '</b></dd></div>' +
          '<div class="dlr"><dt>Ator</dt><dd>Usuária</dd></div>' +
          '<div class="dlr"><dt>Responsável</dt><dd class="ph">[a definir]</dd></div>' +
          '<div class="dlr"><dt>' + (noMvp(h) ? 'Papel no MVP' : 'Por que ficou fora') + '</dt><dd>' + esc(h.nota) + '</dd></div>' +
        '</dl>' +
        '<h3 style="margin-top: 16px">Critérios de aceitação</h3>' +
        (h.criterios.length
          ? '<ol class="ol">' + h.criterios.map((c) => '<li>' + esc(c) + '</li>').join('') + '</ol>'
          : '<p class="ph" style="margin: 0">Sem critérios registrados no Story Map.</p>') +
      '</div>' +
      '<div class="pane" data-painel="pro"' + (aba === 'pro' ? '' : ' hidden') + '>' +
        '<dl class="dl">' +
          '<div class="dlr"><dt>DoR</dt><dd><a class="lnk" href="' + url('dor-e-dod/') + '">' + (noBacklog(h) ? 'Atendido' : 'Não marcado') + '</a></dd></div>' +
          '<div class="dlr"><dt>DoD</dt><dd><a class="lnk" href="' + url('dor-e-dod/') + '">Não marcado</a></dd></div>' +
        '</dl>' +
      '</div>' +
      '<div class="pane" data-painel="his"' + (aba === 'his' ? '' : ' hidden') + '>' +
        (ev.length
          ? '<ul class="evs">' + ev.map((e) => '<li><span class="state">' + esc(e.data) + '</span><span>' + esc(e.texto) + '</span>' +
              (e.url ? '<a class="time mono" href="' + esc(e.url) + '" target="_blank" rel="noopener" aria-label="Abrir o vídeo da reunião em ' + e.tempo + '">▶ ' + e.tempo + '</a>' : '') +
              '</li>').join('') + '</ul>'
          : '<p style="margin: 0; color: var(--mut)">Sem alteração ou decisão registrada.</p>') +
        '<div class="tools" style="margin-top: 10px"><a class="lnk" href="' + url('historico/') + '">Ver no Histórico</a>' +
        '<a class="lnk" href="' + url('reunioes/') + '">Ver em Reuniões</a></div>' +
      '</div>' +
      // Na árvore, a história já está à vista; nas outras páginas, o botão leva até ela.
      (pagina === 'requisitos' ? '' :
        '<div style="margin-top: 18px; display: flex; justify-content: flex-end"><a class="go" href="' +
        esc(url('?cp=' + h.caracteristica + '&hl=' + h.id)) + '">Ver na árvore</a></div>');

    const dlg = abrirDialogo({ rotulo: 'Detalhes da história de usuário', conteudo, hash: h.id, fecharRotulo: 'Fechar detalhes' });
    dlg.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      dlg.querySelectorAll('.tab').forEach((o) => {
        const on = o === t;
        o.classList.toggle('on', on);
        o.setAttribute('aria-selected', on);
      });
      dlg.querySelectorAll('.pane').forEach((p) => { p.hidden = p.dataset.painel !== t.dataset.aba; });
    }));
  }

  // ---------------------------------------------------------------------
  // Requisito não funcional
  // ---------------------------------------------------------------------
  function abrirRnf(id) {
    const r = rnf(id);
    if (!r) return;
    const ligadas = r.todasAsHistorias ? [] : DADOS.historias.filter((h) => h.rnfs.includes(r.id));
    const conteudo =
      '<div class="dh"><div><span class="k mono" style="font-size: 13px">' + r.id + '</span>' +
      '<h2 style="margin: 2px 0 8px; border: 0; padding: 0">' + esc(r.nome) + '</h2></div>' + botaoFechar + '</div>' +
      '<p class="story">' + esc(r.descricao) + '</p>' +
      '<dl class="dl"><div class="dlr"><dt>Classificação</dt><dd>' + esc(r.classificacao) + '</dd></div>' +
      '<div class="dlr"><dt>Critério verificável</dt><dd>' + esc(r.criterio) + '</dd></div></dl>' +
      '<h3 style="margin-top: 16px">Histórias ligadas</h3>' +
      (r.todasAsHistorias ? '<p style="margin: 0">Todas as histórias.</p>' : '') +
      '<div class="rfl">' + ligadas.map(chipHistoria).join('') + '</div>';
    abrirDialogo({ rotulo: r.nome, conteudo, hash: r.id, fecharRotulo: 'Fechar requisito' });
  }

  // Botão pequeno com o código da história (preenchido quando está no MVP).
  function chipHistoria(h) {
    if (typeof h === 'string') h = historia(h);
    return '<button class="rfb mono' + (noMvp(h) ? ' on' : '') + '" type="button" title="' + esc(h.nome) +
      '" data-historia="' + h.id + '">' + h.id + '</button>';
  }

  // ---------------------------------------------------------------------
  // Cliques e endereço
  // ---------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-fechar], [data-historia], [data-rnf], [data-dialogo]');
    if (!alvo) return;
    if ('fechar' in alvo.dataset) fecharDialogo();
    else if (alvo.dataset.historia) abrirHistoria(alvo.dataset.historia);
    else if (alvo.dataset.rnf) abrirRnf(alvo.dataset.rnf);
    else if (alvo.dataset.dialogo) abrirTemplate(alvo.dataset.dialogo);
  });

  function abrirPeloEndereco() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    if (historia(id)) abrirHistoria(id);
    else if (rnf(id)) abrirRnf(id);
    else abrirTemplate(id);
  }
  window.addEventListener('hashchange', abrirPeloEndereco);
  abrirPeloEndereco();

  return {
    RAIZ, pagina, esc, url, tempo, video, historia, rnf, caracteristica, noMvp, noBacklog, naIteracaoAtual,
    MOSCOW, abrirDialogo, fecharDialogo, abrirHistoria, abrirRnf, chipHistoria, botaoFechar
  };
})();
