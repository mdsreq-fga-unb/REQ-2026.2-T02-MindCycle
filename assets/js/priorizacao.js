// ===== Priorização: cálculo, composição do MVP, MoSCoW e matriz =====

(() => {
  const { esc, chipHistoria, historia, noMvp } = MC;
  const $ = (id) => document.getElementById(id);
  const porId = (a, b) => (a.id < b.id ? -1 : 1);

  // Cálculo das 36 histórias, aberto pelo botão dentro de "Como calculamos".
  const botao = $('ver-calculo');
  botao.addEventListener('click', () => {
    const abrir = $('calculo').hidden;
    $('calculo').hidden = !abrir;
    botao.setAttribute('aria-expanded', abrir);
    botao.textContent = abrir ? 'Ocultar o cálculo por história' : 'Ver o cálculo das 36 histórias';
  });
  $('calculo-linhas').innerHTML = DADOS.historias.slice().sort(porId).map((h) => {
    const e = h.esforco;
    return '<tr><td><button class="rfb mono" type="button" data-historia="' + h.id + '">' + h.id + '</button></td>' +
      '<td>' + esc(h.nome) + '</td><td>' + h.valor + '</td>' +
      '<td>' + e.esforco + '</td><td>' + e.complexidade + '</td><td>' + e.lacuna + '</td>' +
      '<td class="mono"><b>' + e.consolidado + '</b></td><td>' + Math.round(parseFloat(e.consolidado.replace(',', '.'))) + '</td>' +
      '<td>' + (noMvp(h) ? 'Sim' : 'Não') + '</td></tr>';
  }).join('');

  $('funil').innerHTML = DADOS.quadrantesMvp.map((q) =>
    '<tr><td><b>' + esc(q.quadrante) + '</b><span class="state" style="display: block">' + esc(q.posicao) + '</span></td>' +
    '<td class="mono"><b>' + esc(q.entraram) + '</b></td><td>' + esc(q.decisao) + '</td>' +
    '<td><div class="rfl">' + q.historias.map(chipHistoria).join('') + '</div></td></tr>').join('');

  $('moscow').innerHTML = [['Must have', 'Valor 4', 4], ['Should have', 'Valor 3', 3], ['Could have', 'Valor 2', 2]].map(([nome, sub, v]) => {
    const lista = DADOS.historias.filter((h) => h.valor === v).sort(porId);
    return '<section class="mscc"><h3>' + nome + ' <span class="state mono">' + lista.length + '</span></h3>' +
      '<p class="state" style="margin: 0 0 10px">' + sub + '</p>' +
      '<div class="rfl">' + lista.map(chipHistoria).join('') + '</div></section>';
  }).join('');

  $('matriz').innerHTML = DADOS.matrizImpacto.map((q) =>
    '<section class="vmc' + (q.destaque ? ' hot' : '') + '"><h3 style="margin: 0">' + esc(q.titulo) + '</h3>' +
    '<span class="state">' + esc(q.resumo) + '</span><div class="psts">' + q.historias.map((id) => {
      const h = historia(id);
      return '<button class="pst" type="button" data-historia="' + h.id + '"><b class="mono">' + h.id + '</b><span>' +
        esc(h.nome) + '</span></button>';
    }).join('') + '</div></section>').join('');

  $('fora-da-matriz').innerHTML = DADOS.foraDaMatriz.map(chipHistoria).join('');
})();
