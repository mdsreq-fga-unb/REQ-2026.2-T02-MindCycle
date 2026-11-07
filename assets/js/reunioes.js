// ===== Reuniões: decisões com o momento exato do vídeo =====
//
// Uma reunião aberta por vez. O endereço #<código do vídeo> abre aquela
// reunião (os links das iterações, no cronograma, usam isso).

(() => {
  const { esc, tempo, video } = MC;
  const lista = document.getElementById('reunioes-lista');
  const pedida = location.hash.slice(1);
  let aberta = DADOS.reunioes.some((m) => m.id === pedida) ? pedida : 'PKoWLngGSRg';

  // Cor da etiqueta de cada tipo de decisão.
  const COR = {
    'Nota ajustada': 'fill', 'Requisito novo': 'fill', 'Requisito': 'tcor', 'Decisão': 'tbk', 'Tarefa': 'tcor',
    'Escopo': 'ghost', 'Fora do MVP': 'ghost', 'Confirmado': '', 'Refinamento': 'tbk', 'Encaminhamento': 'ghost'
  };
  const externo = ' target="_blank" rel="noopener"';

  function desenhar() {
    lista.innerHTML = DADOS.reunioes.map((m) => {
      const on = m.id === aberta;
      return '<article class="meet" id="' + m.id + '">' +
        '<button class="mh" type="button" data-reuniao="' + m.id + '" aria-expanded="' + on + '">' +
          '<span class="mht"><span class="phase">' + esc(m.tipo) + '</span><b>' + esc(m.nome) + '</b><span class="state">' + esc(m.meta) + '</span></span>' +
          '<span class="mhn mono">' + m.decisoes.length + ' decisões</span><span class="chev" aria-hidden="true">' + (on ? '▾' : '▸') + '</span>' +
        '</button>' +
        (!on ? '' :
          '<div style="margin-top: 12px"><a class="go" href="' + esc(video(m.id, 0)) + '"' + externo + '>▶ Assistir</a></div>' +
          '<div class="tblw" style="margin-top: 12px"><table>' +
            '<thead><tr><th style="width: 92px">Tempo</th><th style="width: 118px">Tipo</th><th>Decisão</th><th style="width: 170px">Histórias</th></tr></thead>' +
            '<tbody>' + m.decisoes.map((d) => '<tr>' +
              '<td><a class="time mono" href="' + esc(video(m.id, d.tempo)) + '"' + externo + ' aria-label="Abrir o vídeo em ' + tempo(d.tempo) + '">▶ ' + tempo(d.tempo) + '</a></td>' +
              '<td><span class="tag ' + (COR[d.tipo] || '') + '" style="margin: 0">' + esc(d.tipo) + '</span></td>' +
              '<td>' + esc(d.texto) + '</td>' +
              '<td><div class="rfl">' + d.historias.map((id) =>
                '<button class="rfb mono" type="button" data-historia="' + id + '">' + id + '</button>').join('') + '</div></td>' +
            '</tr>').join('') + '</tbody>' +
          '</table></div>') +
        '</article>';
    }).join('');
  }

  lista.addEventListener('click', (e) => {
    const b = e.target.closest('[data-reuniao]');
    if (!b) return;
    aberta = aberta === b.dataset.reuniao ? null : b.dataset.reuniao;
    desenhar();
    const novo = lista.querySelector('[data-reuniao="' + b.dataset.reuniao + '"]');
    if (novo) novo.focus();
  });

  document.getElementById('apresentacoes').innerHTML = DADOS.apresentacoes.map((v) =>
    '<a class="card vid" href="' + esc(video(v.video, 0)) + '"' + externo + '><span class="phase">' + esc(v.fase) + '</span>' +
    '<b>' + esc(v.nome) + '</b><span class="state">▶ Assistir no YouTube</span></a>').join('');

  desenhar();
  if (pedida === aberta) document.getElementById(aberta).scrollIntoView();
})();
