// ===== Sumário lateral: recolher e expandir grupos =====
//
// O estado vive em `localStorage` sob a chave `navFechados`, uma lista com os
// identificadores dos grupos recolhidos. Um script curto no início do <body>
// (baseof.html) lê essa mesma lista e aplica as classes antes da primeira
// pintura, então a página nunca abre com o sumário piscando.

(function () {
  var CHAVE = 'navFechados';
  var raiz = document.documentElement;

  function ler() {
    try { return JSON.parse(localStorage.getItem(CHAVE) || '[]'); }
    catch (e) { return []; }
  }

  function gravar(lista) {
    try { localStorage.setItem(CHAVE, JSON.stringify(lista)); }
    catch (e) { /* modo privado ou armazenamento cheio: segue sem persistir */ }
  }

  function estaFechado(id) {
    return raiz.classList.contains('nav-fechado-' + id);
  }

  // Um grupo pode ter dois controles — o botão da seta e, quando não tem
  // página própria, o rótulo do título. Os dois refletem o mesmo estado.
  var SELETOR = '.sidebar-group-btn, .sidebar-group-rotulo';

  function sincronizarGrupo(id, fechado) {
    var controles = document.querySelectorAll(SELETOR);
    Array.prototype.forEach.call(controles, function (c) {
      if (c.getAttribute('data-grupo') === id) {
        c.setAttribute('aria-expanded', fechado ? 'false' : 'true');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var botoes = document.querySelectorAll(SELETOR);
    if (!botoes.length) return;

    // Depois do primeiro quadro, libera a animação de abrir/fechar.
    requestAnimationFrame(function () { raiz.classList.add('nav-animado'); });

    Array.prototype.forEach.call(botoes, function (botao) {
      var id = botao.getAttribute('data-grupo');
      if (!id) return;

      sincronizarGrupo(id, estaFechado(id));

      botao.addEventListener('click', function () {
        var fechado = estaFechado(id);
        var lista = ler().filter(function (x) { return x !== id; });

        if (fechado) {
          raiz.classList.remove('nav-fechado-' + id);
        } else {
          raiz.classList.add('nav-fechado-' + id);
          lista.push(id);
        }

        gravar(lista);
        sincronizarGrupo(id, !fechado);
      });
    });
  });
})();
