// ===== Glossário: busca de termos (página Requisitos) =====
//
// Lista DADOS.glossario em ordem alfabética e filtra enquanto a pessoa
// digita, pelo termo e pela definição, sem diferenciar maiúsculas nem
// acentos ("disposicao" acha "Disposição"). O trecho achado fica marcado e os
// termos cujo nome bate aparecem antes dos que só batem na definição.

(() => {
  const lista = document.getElementById('glossario-lista');
  if (!lista) return;
  const { esc, chipHistoria } = MC;
  const $ = (id) => document.getElementById(id);
  const campo = $('busca-termo');
  const termos = DADOS.glossario.slice().sort((a, b) => a.termo.localeCompare(b.termo, 'pt-BR'));

  // Tira acentos e caixa letra a letra, mantendo o tamanho do texto, para que
  // a posição achada no texto simplificado sirva para marcar o original.
  const base = (s) => s.split('').map((c) => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().charAt(0) || c).join('');

  function marcar(texto, q) {
    if (!q) return esc(texto);
    const b = base(texto);
    let saida = '', i = 0, k;
    while ((k = b.indexOf(q, i)) !== -1) {
      saida += esc(texto.slice(i, k)) + '<mark>' + esc(texto.slice(k, k + q.length)) + '</mark>';
      i = k + q.length;
    }
    return saida + esc(texto.slice(i));
  }

  const codigos = (t) => {
    const hus = (t.historias || []).map(chipHistoria).join('');
    const rnfs = (t.rnfs || []).map((r) => '<button class="rnfc mono" type="button" data-rnf="' + r + '">' + r + '</button>').join('');
    return hus || rnfs ? '<div class="rfl">' + hus + rnfs + '</div>' : '';
  };

  function desenhar() {
    const digitado = campo.value.trim();
    const q = base(digitado);
    const noTermo = (t) => base(t.termo).includes(q);
    const achados = termos.filter((t) => !q || noTermo(t) || base(t.definicao).includes(q))
      .sort((a, b) => (q ? noTermo(b) - noTermo(a) : 0));
    lista.innerHTML = achados.map((t) =>
      '<div class="gl-i"><dt>' + marcar(t.termo, q) + '</dt><dd><p>' + marcar(t.definicao, q) + '</p>' + codigos(t) + '</dd></div>').join('');
    $('glossario-total').textContent = q
      ? achados.length + (achados.length === 1 ? ' termo' : ' termos') + ' de ' + termos.length
      : termos.length + ' termos';
    $('glossario-vazio').hidden = achados.length > 0;
    $('glossario-vazio').textContent = 'Nenhum termo nem definição com "' + digitado + '".';
  }

  campo.addEventListener('input', desenhar);
  desenhar();
  // O glossário fica abaixo da árvore, que é montada por JavaScript: quem
  // chega por #glossario só vai ao lugar certo depois de tudo desenhado.
  if (location.hash === '#glossario') $('glossario').scrollIntoView();
})();
