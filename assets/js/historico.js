// ===== Histórico: o que mudou em cada história e RNF, e por quê =====

(() => {
  const { esc, tempo, video } = MC;
  const $ = (id) => document.getElementById(id);
  const H = DADOS.historico;

  const todos = DADOS.historias.map((h) => ({ id: h.id, nome: h.nome, tipo: 'HU' }))
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .concat(DADOS.rnfs.map((r) => ({ id: r.id, nome: r.nome, tipo: 'RNF' })));
  const comAlteracao = todos.filter((r) => H[r.id]);
  const FILTROS = [
    ['chg', 'Com alterações (' + comAlteracao.length + ')', (r) => !!H[r.id]],
    ['all', 'Todos (' + todos.length + ')', () => true],
    ['rf', 'HU (' + DADOS.historias.length + ')', (r) => r.tipo === 'HU'],
    ['rnf', 'RNF (' + DADOS.rnfs.length + ')', (r) => r.tipo === 'RNF']
  ];
  let filtro = 'chg';

  function desenhar() {
    $('filtros-historico').innerHTML = FILTROS.map(([k, rotulo]) =>
      '<button class="btn' + (k === filtro ? ' on' : '') + '" type="button" aria-pressed="' + (k === filtro) +
      '" data-filtro="' + k + '">' + rotulo + '</button>').join('');

    const passa = FILTROS.find((f) => f[0] === filtro)[2];
    $('historico-lista').innerHTML = todos.filter(passa).map((r) => {
      const mud = H[r.id] || [];
      return '<article class="card" style="padding: 14px 16px">' +
        '<div style="display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline"><span class="k mono" style="font-size: 13px">' + r.id + '</span>' +
        '<b>' + esc(r.nome) + '</b><span class="state">' +
        (mud.length ? mud.length + (mud.length > 1 ? ' alterações' : ' alteração') : 'Sem alteração registrada') + '</span></div>' +
        (!mud.length ? '' :
          '<div class="tblw" style="margin-top: 10px"><table>' +
          '<thead><tr><th style="width: 130px">Data</th><th>O que foi alterado</th><th>Motivo</th><th style="width: 92px">Vídeo</th></tr></thead>' +
          '<tbody>' + mud.map((c) => '<tr><td>' + esc(c.data) + '</td><td>' + esc(c.alteracao) + '</td><td>' + esc(c.motivo) + '</td><td>' +
            (c.video ? '<a class="time mono" href="' + esc(video(c.video.id, c.video.tempo)) + '" target="_blank" rel="noopener" ' +
              'aria-label="Abrir o vídeo da reunião em ' + tempo(c.video.tempo) + '">▶ ' + tempo(c.video.tempo) + '</a>' : '') +
            '</td></tr>').join('') + '</tbody></table></div>') +
        '</article>';
    }).join('');
  }

  $('filtros-historico').addEventListener('click', (e) => {
    const b = e.target.closest('[data-filtro]');
    if (!b) return;
    filtro = b.dataset.filtro;
    desenhar();
    $('filtros-historico').querySelector('[data-filtro="' + filtro + '"]').focus();
  });

  desenhar();
})();
