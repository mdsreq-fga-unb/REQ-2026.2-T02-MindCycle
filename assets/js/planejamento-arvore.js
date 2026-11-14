// Planejamento integrado a arvore, usando o cadastro operacional existente.
const PLANO_ARVORE = (() => {
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let iteracao = 'todas';
  function render(h) {
    const b = DADOS.backlog, item = b.itens[h.id] || {};
    const dor = typeof DADOS.situacaoDor === 'function' ? DADOS.situacaoDor(h.id) : DADOS.dorAtendido.includes(h.id) ? 'Atendido' : 'Não conferido';
    const dependenciaDor = ((DADOS.aplicacaoDor[h.id] || {}).criterios || {})['6'];
    const pendencias = [...(item.bloqueios || [])];
    (item.dependencias || []).forEach((id) => {
      const dep = DADOS.historias.find((x) => x.id === id);
      if (dep && dep.iteracao > h.iteracao) pendencias.push('Rever alocação: depende de ' + id + ' na Iteração ' + dep.iteracao);
    });
    if (dependenciaDor && dependenciaDor.resultado === 'NÃO' && !(item.dependencias || []).length) {
      pendencias.push(dependenciaDor.motivo);
    }
    if (!b.responsaveis[h.id]) pendencias.push('Definir responsável');
    if (!DADOS.dorAtendido.includes(h.id) && h.iteracao > 0) pendencias.push('Conferir o DoR');
    if (!(h.iteracao > 0)) pendencias.push(h.nota);
    const campos = [
      ['Iteração', h.iteracao > 0 ? 'Iteração ' + h.iteracao : 'Sem iteração definida'],
      ['Esforço', h.esforco.consolidado], ['Quem faz', b.responsaveis[h.id] || b.responsavelPadrao],
      ['Andamento', item.andamento || b.andamentoPadrao], ['DoR', dor]
    ];
    if (h.iteracao > 0) {
      campos.push(['Disponibilidade', 'A informar']);
      campos.push(['Capacidade', 'A informar']);
    }
    const refs = { T01: 'Conferir os critérios do DoR da história.', T03: 'Aplicar os critérios de aceitação, os RNFs vinculados e o DoD.', T04: 'Apresentar o incremento e registrar a avaliação dos stakeholders.' };
    return '<dl class="plano-campos">' + campos.map(([k, v]) => '<div><dt>' + esc(k) + '</dt><dd>' +
      (k === 'DoR' ? '<button class="lnk" type="button" data-historia="' + h.id + '" data-dor aria-label="Consultar DoR de ' + h.id + '">' + esc(v) + '</button>' : esc(v)) + '</dd></div>').join('') + '</dl>' +
      (item.evidenciaImplementacao ? '<p class="plano-evidencia">Implementação: <a href="https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/' +
        esc(item.evidenciaImplementacao.pr) + '">PR #' + esc(item.evidenciaImplementacao.pr) + '</a> · <a href="https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/commit/' +
        esc(item.evidenciaImplementacao.commit) + '">commit ' + esc(item.evidenciaImplementacao.commit.slice(0, 7)) + '</a></p>' : '') +
      '<h3>Pendências</h3><ul>' + (pendencias.length ? pendencias : ['Nenhuma pendência registrada.']).map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>' +
      (h.iteracao > 0 ? '<div class="tblw"><table class="plano-etapas"><thead><tr><th>Etapa</th><th>Trabalho previsto</th></tr></thead><tbody>' + b.tarefasPadrao.map((t) => {
        const tarefas = (item.tarefas || {})[t.id] || [refs[t.id] || t.titulo];
        return '<tr><th scope="row"><small class="mono">' + h.id + '-' + t.id + '</small>' + esc(t.titulo) + '</th><td><ul>' + tarefas.map((s) => '<li>' + esc(s) + '</li>').join('') + '</ul></td></tr>';
      }).join('') + '</tbody></table></div>' : '');
  }
  function montar() {
    const ferramentas = document.getElementById('ferramentas');
    const seletor = document.createElement('fieldset');
    seletor.className = 'plano-seletor';
    const opcoes = [{ valor: 'todas', titulo: 'Todas as iterações', detalhe: 'Visão completa' }];
    const periodos = DADOS.fases.flatMap((f) => f.iteracoes);
    [5, 6, 7].forEach((n) => {
      const registro = periodos.find((i) => i.nome === 'Iteração ' + n);
      const temHistorias = DADOS.historias.some((h) => h.iteracao === n);
      opcoes.push({ valor: String(n), titulo: 'Iteração ' + n, detalhe: !temHistorias ? 'Sem histórias alocadas' : registro ? registro.periodo.replace(/\/\d{4}$/, '') : '' });
    });
    opcoes.push({ valor: 'proximas', titulo: 'Próximas histórias', detalhe: 'Sem iteração definida' });
    seletor.innerHTML = '<legend>Planejamento por iteração</legend><div class="plano-opcoes">' + opcoes.map((o) =>
      '<label class="plano-opcao"><input type="radio" name="plano-iteracao" value="' + o.valor + '"' + (o.valor === 'todas' ? ' checked' : '') +
      '><span><b>' + esc(o.titulo) + '</b><small>' + esc(o.detalhe) + '</small></span></label>').join('') + '</div>';
    ferramentas.after(seletor);
    const resumo = document.createElement('div');
    resumo.className = 'plano-resumo-iteracao';
    resumo.hidden = true;
    resumo.setAttribute('aria-live', 'polite');
    seletor.after(resumo);
    seletor.addEventListener('change', (e) => {
      iteracao = e.target.value;
      const numero = Number(iteracao);
      resumo.hidden = !(numero > 0);
      if (numero > 0) {
        const historias = DADOS.historias.filter((h) => h.iteracao === numero);
        const esforco = historias.reduce((soma, h) => soma + Number(h.esforco.consolidado.replace(',', '.')), 0);
        resumo.innerHTML = '<dl class="plano-campos"><div><dt>Histórias alocadas</dt><dd>' + historias.length + '</dd></div>' +
          '<div><dt>Esforço planejado (pontos)</dt><dd>' + esforco.toFixed(1).replace('.', ',') + '</dd></div></dl>';
      }
      document.dispatchEvent(new Event('planejamento-filtro'));
    });
    const painel = document.createElement('section');
    painel.id = 'plano-historia';
    painel.className = 'plano-integrado';
    painel.hidden = true;
    document.getElementById('arvore').after(painel);
    document.addEventListener('click', (e) => {
      const botao = e.target.closest('#folhas [data-historia], #resultados [data-historia]');
      if (!botao) return;
      e.stopImmediatePropagation();
      const h = DADOS.historias.find((x) => x.id === botao.dataset.historia);
      painel.hidden = false;
      painel.innerHTML = '<div class="plano-titulo"><h2><span class="mono">' + h.id + '</span> · ' + esc(h.nome) + '</h2><div class="tools"><button class="btn plano-voltar" type="button">Voltar à árvore</button><button class="btn" type="button" data-historia="' + h.id + '">Ver requisito</button></div></div>' + render(h);
      painel.querySelector('.plano-voltar').addEventListener('click', () => {
        const origem = document.contains(botao) ? botao : document.getElementById('busca');
        origem.focus({ preventScroll: true });
        origem.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      });
      painel.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.querySelectorAll('.leaf').forEach((el) => el.classList.toggle('hl', el.dataset.historia === h.id));
    }, true);
    document.addEventListener('planejamento-filtro', () => { painel.hidden = true; });
  }
  return { render, montar, passa: (h) => iteracao === 'todas' || (iteracao === 'proximas' ? !(h.iteracao > 0) : h.iteracao === Number(iteracao)) };
})();
