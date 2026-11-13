// ===== Entregas e cronograma: linha do tempo e painel de fases =====

(() => {
  const { esc, url, video, tempo, abrirDialogo, botaoFechar, chipHistoria } = MC;
  const $ = (id) => document.getElementById(id);
  const dia = (iso) => Date.parse(iso + 'T00:00:00Z');
  const ini = dia(DADOS.inicioDoSemestre), fim = dia(DADOS.fimDoSemestre), total = fim - ini;
  const pct = (t) => ((t - ini) / total * 100).toFixed(2);

  // ---- Linha do tempo: o traço vertical é o dia de hoje -----------------
  const agora = new Date();
  const hoje = Math.min(Math.max(Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate()), ini), fim);
  const hojeTexto = new Date(hoje).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  const fmt = (t) => new Date(t).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', timeZone: 'UTC' });

  const linha = $('linha-do-tempo');
  linha.setAttribute('aria-label', 'Linha do tempo de ' + fmt(ini) + ' a ' + fmt(fim) +
    ' de 2026, com a data de hoje marcada em ' + fmt(hoje));
  linha.innerHTML = DADOS.cronograma.map((g) =>
    '<div class="gr"><span>' + esc(g.nome) + '</span><div class="track"><div class="bar' + (g.fechamento ? ' f' : '') +
    '" style="left: ' + pct(dia(g.inicio)) + '%; width: ' + ((dia(g.fim) - dia(g.inicio)) / total * 100).toFixed(2) + '%"></div>' +
    '<div class="now" style="left: ' + pct(hoje) + '%"></div></div></div>').join('');
  $('hoje').textContent = 'Traço vertical: hoje, ' + hojeTexto;

  // ---- Painel de fases --------------------------------------------------
  let fase = 1;

  function desenharPainel() {
    const cab = '<span></span>' + DADOS.fases.map((f, i) =>
      '<button class="mxh' + (i === fase ? ' on' : '') + '" type="button" data-fase="' + i + '" aria-pressed="' + (i === fase) + '">' +
      '<b>' + esc(f.nome) + '</b><small>' + esc(f.rotulo) + '</small></button>').join('');
    const linhas = DADOS.atividades.map((a, ai) => '<span class="mxl">' + esc(a) + '</span>' + DADOS.fases.map((f, fi) => {
      const n = f.praticas.filter((p) => p.atividade === ai).reduce((s, p) => s + p.tecnicas.length, 0);
      return '<span class="mxc' + (fi === fase ? ' on' : '') + (n ? '' : ' none') + '">' + (n || '–') + '</span>';
    }).join('')).join('');
    $('painel-fases').innerHTML = cab + linhas;

    const f = DADOS.fases[fase];
    $('fase-nome').textContent = f.nome + ' · ' + f.rotulo;
    $('fase-foco').textContent = f.foco;
    $('fase-iteracoes').innerHTML = f.iteracoes.map((it, i) =>
      '<button class="card cardb iter' + (it.atual ? ' cur' : '') + '" type="button" data-iteracao="' + i + '">' +
      '<span class="state">' + esc(it.estado) + '</span><b class="cardt">' + esc(it.nome) + '</b>' +
      '<span class="mono" style="font-size: 13px; color: var(--mut)">' + esc(it.periodo) + '</span>' +
      '<span class="cardg">' + (it.evidencias.length ? it.evidencias.length + ' evidências' : 'Ver iteração') + ' →</span></button>').join('');
  }

  // Planejado × realizado. Campo sem fonte aparece como sem registro, para a
  // lacuna ficar visível, inclusive quando falta o registro inteiro. Só a
  // iteração ainda prevista não tem o que registrar. As histórias planejadas e
  // o DoR vêm do catálogo.
  function registro(it) {
    if (!it.registro && it.estado === 'Prevista') return '';
    const r = it.registro || {};
    const linha = (rotulo, valor) => '<div class="dlr"><dt>' + rotulo + '</dt><dd>' +
      (valor || '<span class="ph">Sem registro publicado</span>') + '</dd></div>';
    const planejadas = DADOS.historias.filter((h) => h.iteracao === it.numero);
    return '<h3 style="margin-top: 18px">Planejado e realizado</h3><dl class="dl">' +
      linha('Compromisso', r.compromisso && esc(r.compromisso)) +
      (planejadas.length
        ? linha('Histórias planejadas', '<div class="rfl">' + planejadas.map(chipHistoria).join('') + '</div>') +
          linha('DoR marcado', planejadas.filter((h) => DADOS.dorAtendido.includes(h.id)).length + ' de ' + planejadas.length + ' histórias')
        : '') +
      linha('Responsáveis', r.responsaveis && esc(r.responsaveis)) +
      linha('Resultado', r.resultado && esc(r.resultado)) +
      linha('Pendências', r.pendencias && r.pendencias.map(esc).join('<br>')) +
      linha('Decisão para a próxima', r.decisaoProxima && esc(r.decisaoProxima)) +
      '</dl>';
  }

  function abrirIteracao(i) {
    const f = DADOS.fases[fase], it = f.iteracoes[i];
    const link = (e) => /^https?:/.test(e.link) ? e.link : url(e.link);
    const externo = (e) => /^https?:/.test(e.link) ? ' target="_blank" rel="noopener"' : '';
    abrirDialogo({
      rotulo: it.nome,
      fecharRotulo: 'Fechar iteração',
      conteudo:
        '<div class="dh"><div><span class="phase">' + esc(f.nome) + '</span>' +
        '<h2 style="margin: 2px 0 4px; border: 0; padding: 0">' + esc(it.nome) + '</h2>' +
        '<span class="mono state">' + esc(it.periodo) + ' · ' + esc(it.estado) + '</span></div>' + botaoFechar + '</div>' +
        '<p style="margin: 14px 0 0">' + esc(it.objetivo) + '</p>' +
        registro(it) +
        '<h3 style="margin-top: 18px">Evidências</h3>' +
        (it.evidencias.length ? '' : '<p class="ph" style="margin: 0">Sem evidência publicada ainda.</p>') +
        '<div class="evg">' + it.evidencias.map((e) =>
          '<a class="evb" href="' + esc(link(e)) + '"' + externo(e) + '><span class="evk">' + esc(e.tipo) + '</span><b>' +
          esc(e.titulo) + '</b></a>').join('') + '</div>' +
        '<h3 style="margin-top: 18px">Técnicas da fase</h3>' +
        '<dl class="dl">' + f.praticas.map((p) =>
          '<div class="dlr"><dt>' + esc(DADOS.atividades[p.atividade]) + '</dt><dd>' + esc(p.tecnicas.join(', ')) + '</dd></div>').join('') +
        '</dl>'
    });
  }

  // ---- Riscos investigados ---------------------------------------------
  // O efeito das investigações que mexeram numa história vem do histórico dela.
  const chipRnf = (id) => '<button class="rfb mono" type="button" data-rnf="' + id + '">' + id + '</button>';
  const celula = (texto, aberto, vazio) => texto
    ? '<td' + (aberto ? ' class="ph"' : '') + '>' + texto + '</td>'
    : '<td class="ph">' + vazio + '</td>';
  $('riscos').innerHTML = DADOS.riscos.map((r) => {
    const efeito = r.efeitoEm ? DADOS.historico[r.efeitoEm].map((e) => e.alteracao).join(' ') : r.efeito;
    const trecho = r.video ? ' <a class="time mono" href="' + esc(video(r.video.id, r.video.tempo)) +
      '" target="_blank" rel="noopener" aria-label="Abrir o vídeo da reunião em ' + tempo(r.video.tempo) + '">▶ ' +
      tempo(r.video.tempo) + '</a>' : '';
    const ligados = r.historias.map(chipHistoria).concat(r.rnfs.map(chipRnf));
    return '<tr><td>' + esc(r.risco) + '</td>' +
      celula(r.quando && esc(r.quando) + trecho, false, 'Sem investigação técnica registrada') +
      celula(r.resultado && esc(r.resultado), r.aberto, 'Sem registro') +
      celula(efeito && esc(efeito), r.aberto, 'Sem registro') +
      '<td><span class="tag ' + (r.aberto ? 'tcor' : 'fill') + '" style="margin: 0">' + (r.aberto ? 'Aberto' : 'Encerrado') + '</span></td>' +
      '<td>' + (ligados.length ? '<div class="rfl">' + ligados.join('') + '</div>' : '') + '</td></tr>';
  }).join('');

  $('painel-fases').addEventListener('click', (e) => {
    const b = e.target.closest('[data-fase]');
    if (!b) return;
    fase = Number(b.dataset.fase);
    desenharPainel();
    $('painel-fases').querySelector('[data-fase="' + fase + '"]').focus();
  });
  $('fase-iteracoes').addEventListener('click', (e) => {
    const b = e.target.closest('[data-iteracao]');
    if (b) abrirIteracao(Number(b.dataset.iteracao));
  });

  desenharPainel();
})();
