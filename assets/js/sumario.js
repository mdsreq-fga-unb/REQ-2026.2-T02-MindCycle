// ===== Sumário lateral =====
//
// Os itens do sumário ficam só aqui. Cada página carrega este arquivo dentro
// do <nav class="sidebar-nav">, sem `defer`: ele escreve os links no próprio
// lugar enquanto a página é lida, antes da primeira pintura, então o sumário
// nunca aparece vazio. Para acrescentar uma página, basta incluir um item no
// grupo certo — nenhuma página precisa ser editada.
//
// O sumário segue as unidades da disciplina: cada unidade agrupa as seções do
// Documento de Visão entregues nela. Só entra no sumário o que já foi
// entregue — seção ainda não escrita não ganha entrada vazia. As páginas
// continuam em visao/, então os endereços e os links entre seções não mudam.
//
// A Seção 14 (Lições Aprendidas) é a exceção: cada unidade tem as suas
// lições, então há uma página por subseção (14.1, 14.2, …), listada no grupo
// da unidade correspondente. O endereço antigo da página única,
// visao/14-licoes-aprendidas/, redireciona para a 14.1.
//
// Dentro de cada unidade, os itens seguem o número da seção; o vídeo da
// unidade fica por último.
//
// Os cabeçalhos de unidade e de fase não têm página: são rótulos que
// recolhem e expandem o grupo (ver nav-collapse.js). O `id` de cada grupo é a
// chave usada para lembrar, entre uma página e outra, se ele está recolhido.

(function () {
  // Endereços relativos à raiz do site, sempre terminando em "/".
  var SUMARIO = [
    { titulo: 'Início', icone: '⌂', href: '' },

    { id: 'unidade-1', titulo: 'Unidade 1 — Concepção do Projeto', icone: '◈', itens: [
      { titulo: '1. Cenário Atual do Cliente e do Negócio', href: 'visao/01-cenario-atual/' },
      { titulo: '2. Solução Proposta', href: 'visao/02-solucao-proposta/' },
      { titulo: '3. Intervenção Social', href: 'visao/03-intervencao-social/' },
      { titulo: '4. Estratégias de Engenharia de Software', href: 'visao/04-estrategias-engenharia-software/' },
      { titulo: '5. Engenharia de Requisitos', href: 'visao/05-engenharia-de-requisitos/' },
      { titulo: '6. Cronograma e Entregas', href: 'visao/06-cronograma-e-entregas/' },
      { titulo: '7. Interação entre Equipe e Cliente', href: 'visao/07-interacao-equipe-cliente/' },
      { titulo: '14.1 Lições Aprendidas', href: 'visao/14-1-licoes-aprendidas-unidade-1/' },
      { titulo: 'Vídeo de Apresentação', href: 'entregas/unidade-1/' }
    ] },

    // A Seção 13 (Backlog do Produto) ainda não foi entregue. Quando existir,
    // entra aqui, entre a 12 e a 14.2.
    { id: 'unidade-2', titulo: 'Unidade 2 — Requisitos de Software', icone: '◈', itens: [
      { titulo: '8. Requisitos de Software', href: 'visao/08-requisitos-de-software/' },
      { titulo: '9. Priorização de Requisitos', href: 'visao/09-priorizacao-de-requisitos/' },
      { titulo: '10. Definição e Composição do MVP', href: 'visao/10-mvp/' },
      { titulo: '11. Rastreabilidade dos Requisitos', href: 'visao/11-rastreabilidade/' },
      { titulo: '12. DoR e DoD', href: 'visao/12-dor-e-dod/' },
      { titulo: '14.2 Lições Aprendidas', href: 'visao/14-2-licoes-aprendidas-unidade-2/' },
      { titulo: '15. Referências Bibliográficas', href: 'visao/15-referencias/' },
      { titulo: 'Vídeo de Apresentação', href: 'entregas/unidade-2/' }
    ] },

    // Fases do OpenUP: uma página por iteração, em openup/<fase>/.
    { id: 'openup-concepcao', titulo: 'OpenUP — Concepção', icone: '◇', itens: [
      { titulo: 'Iteração 01', href: 'openup/concepcao/iteracao-01/' },
      { titulo: 'Iteração 02', href: 'openup/concepcao/iteracao-02/' }
    ] },
    { id: 'openup-elaboracao', titulo: 'OpenUP — Elaboração', icone: '◇', itens: [
      { titulo: 'Iteração 03', href: 'openup/elaboracao/iteracao-03/' },
      { titulo: 'Iteração 04', href: 'openup/elaboracao/iteracao-04/' }
    ] },
    { id: 'openup-construcao', titulo: 'OpenUP — Construção', icone: '◇', itens: [
      { titulo: 'Iteração 05', href: 'openup/construcao/iteracao-05/' },
      { titulo: 'Iteração 06', href: 'openup/construcao/iteracao-06/' }
    ] },
    { id: 'openup-transicao', titulo: 'OpenUP — Transição', icone: '◇', itens: [
      { titulo: 'Iteração 07', href: 'openup/transicao/iteracao-07/' }
    ] }
  ];

  var script = document.currentScript;

  // A raiz do site é a pasta acima de assets/js/: funciona no GitHub Pages
  // (/REQ-2026.2-T02-MindCycle/), num servidor local e abrindo o arquivo.
  var raiz = script.src.replace(/assets\/js\/sumario\.js(\?.*)?$/, '');

  function semIndex(caminho) {
    return caminho.replace(/index\.html$/, '');
  }

  var aqui = semIndex(location.pathname);

  function endereco(href) {
    return raiz + href;
  }

  function ehAtual(href) {
    return semIndex(new URL(endereco(href)).pathname) === aqui;
  }

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
  function esc(texto) {
    return String(texto).replace(/[&<>"]/g, function (c) { return ESC[c]; });
  }

  function link(item, classe, icone) {
    var atual = ehAtual(item.href);
    return '<a href="' + esc(endereco(item.href)) + '" class="' + classe + (atual ? ' active' : '') + '"' +
      (atual ? ' aria-current="page"' : '') + '>\n' +
      (icone ? '<span class="nav-icon" aria-hidden="true">' + icone + '</span>\n' : '') +
      '<span class="nav-text">' + esc(item.titulo) + '</span>\n' +
      '</a>\n';
  }

  function grupo(g) {
    var temAtual = g.itens.some(function (item) { return ehAtual(item.href); });
    var html = '<div class="sidebar-group" data-grupo="' + g.id + '">\n' +
      '<div class="sidebar-group-cabeca">\n' +
      '<button class="sidebar-nav-item sidebar-group-rotulo' + (temAtual ? ' active' : '') + '" type="button" ' +
      'data-grupo="' + g.id + '" aria-expanded="true">\n' +
      '<span class="nav-icon" aria-hidden="true">' + g.icone + '</span>\n' +
      '<span class="nav-text">' + esc(g.titulo) + '</span>\n' +
      '</button>\n' +
      '<button class="sidebar-group-btn" type="button" data-grupo="' + g.id + '" aria-expanded="true" ' +
      'aria-label="Recolher ou expandir ' + esc(g.titulo) + '">\n' +
      '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>\n' +
      '</button>\n' +
      '</div>\n' +
      '<div class="sidebar-subnav">\n' +
      '<div class="sidebar-subnav-inner">\n';
    g.itens.forEach(function (item) { html += link(item, 'sidebar-subnav-item'); });
    return html + '</div>\n</div>\n</div>\n';
  }

  var html = '';
  SUMARIO.forEach(function (entrada) {
    html += entrada.itens ? grupo(entrada) : link(entrada, 'sidebar-nav-item', entrada.icone);
  });

  script.insertAdjacentHTML('beforebegin', html);
  script.parentNode.removeChild(script);

  // Aberto direto do disco (file://), o navegador não completa "pasta/" com
  // "index.html" como um servidor faz: os links internos ganham o nome do
  // arquivo, para a navegação funcionar também com um duplo clique.
  if (location.protocol === 'file:') {
    document.addEventListener('DOMContentLoaded', function () {
      Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
        var url = new URL(a.href);
        if (url.protocol === 'file:' && url.pathname.slice(-1) === '/') {
          url.pathname += 'index.html';
          a.href = url.href;
        }
      });
    });
  }
})();
