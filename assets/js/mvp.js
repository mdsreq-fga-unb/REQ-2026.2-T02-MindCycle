// ===== MVP: números e cobertura por característica =====

(() => {
  const { esc, url, noMvp } = MC;
  const mvp = DADOS.historias.filter(noMvp);

  // Os números do topo vêm dos dados, para não ficarem desatualizados.
  const preencher = (nome, valor) => document.querySelectorAll('[data-conta="' + nome + '"]')
    .forEach((el) => { el.textContent = valor; });
  preencher('mvp', mvp.length);
  preencher('total', DADOS.historias.length);
  preencher('validadas', mvp.filter((h) => h.validadaCliente).length);

  // Cada quadrado é uma história; a linha abre a característica na árvore.
  document.getElementById('cobertura').innerHTML = DADOS.caracteristicas.map((c) => {
    const todas = DADOS.historias.filter((h) => h.caracteristica === c.id);
    const dentro = todas.filter(noMvp).length;
    const quadrados = todas.map((h, i) => '<i class="sq' + (i < dentro ? ' on' : '') + '"></i>').join('');
    return '<a class="covr" href="' + esc(url('?cp=' + c.id + '&filtro=mvp')) + '" aria-label="' +
      esc(c.id + ', ' + c.nome + ': ' + dentro + ' de ' + todas.length + ' no MVP. Abrir na árvore.') + '">' +
      '<span class="k mono">' + c.id + '</span><span class="covn">' + esc(c.nome) + '</span>' +
      '<span class="waf" aria-hidden="true">' + quadrados + '</span>' +
      '<b class="mono covc">' + dentro + '/' + todas.length + '</b></a>';
  }).join('');
})();
