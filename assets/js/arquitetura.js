// ===== Arquitetura: detalhes de cada parte do diagrama =====
//
// Cada <g class="alvo" data-det="auth"> do diagrama abre um painel com o
// <template id="det-auth"> da página. Com mouse, o painel abre ao passar por
// cima e fecha ao sair; clicar fixa o painel. No toque, um toque abre e outro
// fecha. Pelo teclado, Tab passa pelas partes, Enter fixa e leva o foco ao
// painel, Esc fecha.

(() => {
  const { esc, historia, rnf, chipHistoria } = MC;
  const figura = document.querySelector('.arq');
  if (!figura) return;

  const comMouse = window.matchMedia('(hover: hover) and (pointer: fine)');
  const alvos = [...figura.querySelectorAll('.alvo')];
  const ICONE_FECHAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';

  // Sem JavaScript, as partes não são botões: o diagrama continua legível.
  alvos.forEach((g) => {
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-controls', 'arq-det');
    g.setAttribute('aria-expanded', 'false');
  });

  const painel = document.createElement('section');
  painel.className = 'arq-det';
  painel.id = 'arq-det';
  painel.tabIndex = -1;
  painel.setAttribute('aria-labelledby', 'arq-det-t');
  painel.hidden = true;
  document.body.appendChild(painel);

  // A parte aberta e se ela foi fixada (clique, toque ou Enter).
  let atual = null;
  let timerFechar = 0;

  function chip(id) {
    if (historia(id)) return chipHistoria(id);
    const r = rnf(id);
    if (r) return '<button class="rfb mono" type="button" title="' + esc(r.nome) + '" data-rnf="' + id + '">' + id + '</button>';
    return esc(id);
  }

  function preencher(g) {
    const t = document.getElementById('det-' + g.dataset.det);
    painel.innerHTML = '<header class="arq-det-h"><div><p class="arq-det-k">' + esc(t.dataset.k) + '</p>' +
      '<h3 id="arq-det-t">' + esc(t.dataset.titulo) + '</h3></div>' +
      '<button class="x" type="button" aria-label="Fechar detalhes" data-fechar-det>' + ICONE_FECHAR + '</button></header>';
    const corpo = document.createElement('div');
    corpo.className = 'arq-det-c';
    corpo.appendChild(t.content.cloneNode(true));
    corpo.querySelectorAll('[data-ref]').forEach((el) => { el.outerHTML = chip(el.dataset.ref); });
    painel.appendChild(corpo);
  }

  // Com mouse, ao lado da parte (direita, esquerda, abaixo ou acima, o que
  // couber). No toque ou em tela estreita, uma folha presa ao pé da tela.
  function posicionar() {
    if (!atual) return;
    const folha = !comMouse.matches || window.innerWidth < 720;
    painel.classList.toggle('folha', folha);
    if (folha) {
      painel.style.left = painel.style.top = '';
      return;
    }
    const M = 12;
    const r = atual.g.getBoundingClientRect();
    const p = painel.getBoundingClientRect();
    const larg = window.innerWidth, alt = window.innerHeight;
    const prender = (v, min, max) => Math.max(min, Math.min(v, max));
    let left, top;
    if (r.right + M + p.width <= larg - M) left = r.right + M;
    else if (r.left - M - p.width >= M) left = r.left - M - p.width;
    if (left !== undefined) {
      top = prender(r.top + r.height / 2 - p.height / 2, M, alt - p.height - M);
    } else {
      left = prender(r.left + r.width / 2 - p.width / 2, M, larg - p.width - M);
      top = r.bottom + M + p.height <= alt - M ? r.bottom + M : prender(r.top - M - p.height, M, alt - p.height - M);
    }
    painel.style.left = Math.round(left) + 'px';
    painel.style.top = Math.round(top) + 'px';
  }

  function abrir(g, fixo) {
    clearTimeout(timerFechar);
    if (atual && atual.g === g) {
      atual.fixo = atual.fixo || fixo;
      return;
    }
    if (atual) {
      atual.g.classList.remove('ativo');
      atual.g.setAttribute('aria-expanded', 'false');
    }
    const novo = painel.hidden;
    atual = { g, fixo };
    preencher(g);
    g.classList.add('ativo');
    g.setAttribute('aria-expanded', 'true');
    painel.hidden = false;
    painel.classList.toggle('entra', novo);
    posicionar();
  }

  function fechar() {
    clearTimeout(timerFechar);
    if (!atual) return;
    atual.g.classList.remove('ativo');
    atual.g.setAttribute('aria-expanded', 'false');
    atual = null;
    painel.hidden = true;
  }

  // Um intervalo curto deixa o mouse atravessar o espaço até o painel.
  function fecharLogo() {
    clearTimeout(timerFechar);
    if (atual && !atual.fixo) timerFechar = setTimeout(fechar, 160);
  }

  function alternar(g) {
    if (atual && atual.g === g && atual.fixo) fechar();
    else abrir(g, true);
  }

  alvos.forEach((g) => {
    g.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (atual && atual.fixo && atual.g !== g) atual.fixo = false;
      abrir(g, false);
    });
    g.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') fecharLogo(); });
    g.addEventListener('click', () => alternar(g));
    g.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      abrir(g, true);
      painel.focus({ preventScroll: true });
    });
    // Só o foco do teclado abre: o do clique já é tratado no click.
    g.addEventListener('focus', () => { if (g.matches(':focus-visible')) abrir(g, false); });
    g.addEventListener('blur', (e) => {
      if (atual && atual.g === g && !atual.fixo && !painel.contains(e.relatedTarget)) fechar();
    });
  });

  painel.addEventListener('pointerenter', () => clearTimeout(timerFechar));
  painel.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') fecharLogo(); });
  painel.addEventListener('click', (e) => {
    if (!e.target.closest('[data-fechar-det]')) return;
    const g = atual && atual.g;
    fechar();
    if (g && comMouse.matches) g.focus({ preventScroll: true });
  });

  // Fora do painel e do diagrama, fecha. Com um diálogo aberto (a história de
  // um chip), o painel fica para quando o diálogo fechar.
  document.addEventListener('pointerdown', (e) => {
    if (!atual || document.body.classList.contains('com-dialogo')) return;
    if (painel.contains(e.target) || e.target.closest('.arq .alvo')) return;
    fechar();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !atual || document.body.classList.contains('com-dialogo')) return;
    const g = atual.g;
    fechar();
    g.focus({ preventScroll: true });
  });

  // A página e o diagrama (no celular) rolam: o painel acompanha a parte.
  let quadro = 0;
  const acompanhar = () => {
    if (!atual || quadro) return;
    quadro = requestAnimationFrame(() => { quadro = 0; posicionar(); });
  };
  window.addEventListener('scroll', acompanhar, { passive: true, capture: true });
  window.addEventListener('resize', acompanhar);
})();
