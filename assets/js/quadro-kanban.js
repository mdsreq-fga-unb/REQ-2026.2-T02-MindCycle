// ===== Quadro kanban: as colunas do GitHub Project =====
//
// Desenha o retrato do quadro gravado em assets/js/kanban.js (gerado por
// .github/scripts/atualizar_kanban.py). Cada cartão leva à issue no GitHub;
// os botões filtram por tipo de item, lido do prefixo do título.

(() => {
  const alvo = document.getElementById('quadro-kanban');
  if (!alvo || typeof KANBAN === 'undefined') return;
  const { esc } = MC;

  // Nome de cada coluna do quadro, em português.
  const COLUNA = { 'Backlog': 'Backlog', 'Ready': 'Pronto', 'In progress': 'Em andamento', 'In review': 'Em revisão', 'Done': 'Concluído' };

  // "[RF25 · HU25] Criar conta" → código "RF25 · HU25" e título "Criar conta".
  function partes(item) {
    const m = item.titulo.match(/^\[([^\]]+)\]\s*(.*)$/);
    const codigo = m ? m[1] : '';
    const tipo = /\b(HU|RF)\d/.test(codigo) ? 'historia'
      : /^T\d/.test(codigo) ? 'tecnica'
      : /^CP\d/.test(codigo) ? 'caracteristica' : 'documentacao';
    return { codigo, titulo: m ? m[2] : item.titulo, tipo };
  }

  const TIPOS = [
    ['todos', 'Todos'], ['historia', 'Histórias'], ['tecnica', 'Técnicas'],
    ['caracteristica', 'Características'], ['documentacao', 'Documentação']
  ];
  const todos = KANBAN.colunas.flatMap((c) => c.itens.map(partes));
  const conta = (t) => (t === 'todos' ? todos.length : todos.filter((p) => p.tipo === t).length);
  let filtro = 'todos';

  const [data, hora] = KANBAN.atualizadoEm.split('T');
  document.getElementById('kanban-fonte').innerHTML = 'Retrato do <a href="' + esc(KANBAN.quadro.url) +
    '" target="_blank" rel="noopener">quadro do GitHub</a> em ' + data.split('-').reverse().join('/') + ', ' + hora + '.';

  function cartao(item) {
    const p = partes(item);
    const quem = item.responsaveis.length > 2
      ? item.responsaveis.slice(0, 2).map((r) => '@' + r).join(', ') + ' +' + (item.responsaveis.length - 2)
      : item.responsaveis.map((r) => '@' + r).join(', ');
    return '<a class="kb-card" href="' + esc(item.url) + '" target="_blank" rel="noopener">' +
      '<span class="kb-topo"><i class="kb-ponto ' + p.tipo + '" aria-hidden="true"></i>' +
        (p.codigo ? '<span class="kb-cod mono">' + esc(p.codigo) + '</span>' : '') +
        '<span class="kb-num mono">#' + item.numero + '</span></span>' +
      '<span class="kb-tit">' + esc(p.titulo) + '</span>' +
      (item.marco || quem ? '<span class="kb-rodape">' +
        (item.marco ? '<span class="tag ghost">' + esc(item.marco.titulo) + '</span>' : '') +
        (quem ? '<span>' + esc(quem) + '</span>' : '') + '</span>' : '') +
      '</a>';
  }

  function desenhar() {
    document.getElementById('kanban-filtros').innerHTML = TIPOS.map(([t, nome]) =>
      '<button class="btn' + (t === filtro ? ' on' : '') + '" type="button" data-tipo="' + t + '" aria-pressed="' + (t === filtro) + '">' +
      (t === 'todos' ? '' : '<i class="kb-ponto ' + t + '" aria-hidden="true"></i> ') + nome + ' (' + conta(t) + ')</button>').join('');

    alvo.innerHTML = KANBAN.colunas.map((col) => {
      const itens = col.itens.filter((i) => filtro === 'todos' || partes(i).tipo === filtro);
      const nome = COLUNA[col.nome] || col.nome;
      return '<section class="kb-col" aria-label="' + esc(nome) + ', ' + itens.length + ' itens">' +
        '<div class="kb-cab"><span>' + esc(nome) + '</span><span class="kb-qtd">' + itens.length + '</span></div>' +
        '<div class="kb-lista">' + (itens.length ? itens.map(cartao).join('') : '<p class="kb-vazio">Nada aqui</p>') + '</div>' +
        '</section>';
    }).join('');
  }

  document.getElementById('kanban-filtros').addEventListener('click', (e) => {
    const b = e.target.closest('[data-tipo]');
    if (!b) return;
    filtro = b.dataset.tipo;
    desenhar();
    document.querySelector('#kanban-filtros [data-tipo="' + filtro + '"]').focus();
  });

  desenhar();
})();
