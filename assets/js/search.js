// ===== Search: Fuse.js client-side full-text search =====

(function () {

// Scroll-lock with reference counting — multiple overlays can coexist
function scrollLock(key) {
  var locks = (document.body.dataset.scrollLocks || '').split(',').filter(Boolean);
  if (locks.indexOf(key) === -1) locks.push(key);
  document.body.dataset.scrollLocks = locks.join(',');
  document.body.style.overflow = 'hidden';
}
function scrollUnlock(key) {
  var locks = (document.body.dataset.scrollLocks || '').split(',').filter(Boolean);
  var idx = locks.indexOf(key);
  if (idx !== -1) locks.splice(idx, 1);
  document.body.dataset.scrollLocks = locks.join(',');
  if (locks.length === 0) document.body.style.overflow = '';
}

var MAX_RESULTS = 20;
var DEBOUNCE_MS = 300;

// ---------------------------------------------------------------------
// ALTERAÇÃO 1 DE 2 EM RELAÇÃO AO TEMA:
// o Spectra é um tema de blog e trata o corpo do texto como último
// recurso, com `ignoreLocation` desligado — o Fuse.js então só procura
// perto do início da string, e uma busca por um termo que aparece no meio
// de uma seção não retorna nada. Esta é uma documentação: buscar dentro do
// texto é o caso principal. Por isso `ignoreLocation: true`, peso maior em
// `content` e `minMatchCharLength` para evitar ruído de duas letras.
// Se atualizar o tema, recopie themes/hugo-theme-spectra/assets/js/search.js
// e reaplique este bloco e a ALTERAÇÃO 2 (linha do `search-result-meta`).
// ---------------------------------------------------------------------
var SEARCH_CONFIG = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.2 },
    { name: 'section', weight: 0.1 },
    { name: 'content', weight: 0.3 }
  ],
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 3,
  includeMatches: true
};

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var resultsEl = document.getElementById('searchResults');
  var emptyEl = document.getElementById('searchEmpty');
  var closeBtn = document.getElementById('searchClose');
  var triggers = document.querySelectorAll('#searchTrigger');

  if (!overlay || !input || !closeBtn || !resultsEl || !emptyEl) return;

  var body = document.body;
  var txtHint = body.getAttribute('data-i18n-search-hint') || 'Type to search posts';
  var txtNoResults = body.getAttribute('data-i18n-search-no-results') || 'No results found';
  var txtLoading = body.getAttribute('data-i18n-search-loading') || 'Loading search index...';

  var fuse = null;
  var indexLoaded = false;
  var debounceTimer = null;
  var activeIndex = -1;
  var cachedItems = null;

  // Open search
  function openSearch() {
    overlay.classList.add('active');
    scrollLock('search');
    input.focus();
    if (!indexLoaded) loadIndex();
  }

  // Close search
  function closeSearch() {
    clearTimeout(debounceTimer);
    overlay.classList.remove('active');
    scrollUnlock('search');
    input.value = '';
    resultsEl.innerHTML = '';
    emptyEl.textContent = txtHint;
    emptyEl.style.display = '';
    activeIndex = -1;
  }

  // Load search index lazily
  function loadIndex() {
    indexLoaded = true;
    var url = overlay.getAttribute('data-index');
    if (!url) return;

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!Array.isArray(data)) {
          console.error('Search index is not an array');
          emptyEl.textContent = 'Search unavailable';
          return;
        }
        fuse = new Fuse(data, SEARCH_CONFIG);
        // Auto-search if user already typed while index was loading
        if (input.value.trim()) renderResults(input.value);
      })
      .catch(function (err) {
        console.error('Search index load failed:', err);
        emptyEl.textContent = 'Search unavailable';
        indexLoaded = false;
      });
  }

  // Render search results
  function renderResults(query) {
    if (!query.trim()) {
      resultsEl.innerHTML = '';
      cachedItems = null;
      emptyEl.textContent = txtHint;
      emptyEl.style.display = '';
      activeIndex = -1;
      return;
    }

    if (!fuse) {
      emptyEl.textContent = txtLoading;
      emptyEl.style.display = '';
      resultsEl.innerHTML = '';
      return;
    }

    var results = fuse.search(query).slice(0, MAX_RESULTS);
    activeIndex = -1;

    if (results.length === 0) {
      resultsEl.innerHTML = '';
      cachedItems = null;
      emptyEl.textContent = txtNoResults;
      emptyEl.style.display = '';
      return;
    }

    emptyEl.style.display = 'none';
    var html = '';

    results.forEach(function (result) {
      var item = result.item;
      var title = highlightMatches(item.title, result.matches, 'title');
      var desc = item.description || '';
      html += '<div class="search-result-item" data-href="' + escapeAttr(item.permalink) + '">' +
        '<a href="' + escapeAttr(item.permalink) + '">' +
        '<div class="search-result-title">' + title + '</div>' +
        // ALTERAÇÃO 2 DE 2: o tema mostra a data do post aqui. As páginas
        // desta documentação não têm data, então mostramos a seção.
        '<div class="search-result-meta">' + escapeHtml(item.section || '') + '</div>' +
        (desc ? '<div class="search-result-desc">' + escapeHtml(desc) + '</div>' : '') +
        '</a></div>';
    });

    resultsEl.innerHTML = html;
    cachedItems = resultsEl.querySelectorAll('.search-result-item');
  }

  // Highlight matched text in title
  function highlightMatches(text, matches, key) {
    if (!matches) return escapeHtml(text);

    var titleMatch = null;
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].key === key) {
        titleMatch = matches[i];
        break;
      }
    }

    if (!titleMatch || !titleMatch.indices) return escapeHtml(text);

    var result = '';
    var lastIndex = 0;
    // Sort indices by start position
    var indices = titleMatch.indices.slice().sort(function (a, b) { return a[0] - b[0]; });

    indices.forEach(function (pair) {
      result += escapeHtml(text.substring(lastIndex, pair[0]));
      result += '<mark>' + escapeHtml(text.substring(pair[0], pair[1] + 1)) + '</mark>';
      lastIndex = pair[1] + 1;
    });

    result += escapeHtml(text.substring(lastIndex));
    return result;
  }

  var ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) { return ESC_MAP[c]; });
  }

  function escapeAttr(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keyboard navigation
  function navigateResults(direction) {
    var items = cachedItems || resultsEl.querySelectorAll('.search-result-item');
    if (items.length === 0) return;

    if (activeIndex >= 0 && activeIndex < items.length) {
      items[activeIndex].classList.remove('active');
    }

    activeIndex += direction;
    if (activeIndex < 0) activeIndex = items.length - 1;
    if (activeIndex >= items.length) activeIndex = 0;

    items[activeIndex].classList.add('active');
    items[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  // Event listeners
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openSearch();
    });
  });

  closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      renderResults(input.value);
    }, DEBOUNCE_MS);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // Ctrl+K / Cmd+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
      return;
    }

    // Only handle keys when search is open
    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateResults(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateResults(-1);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      var items = resultsEl.querySelectorAll('.search-result-item');
      if (items[activeIndex]) {
        var link = items[activeIndex].querySelector('a');
        if (link) window.location.href = link.href;
      }
    }
  });

  // Click on result item
  resultsEl.addEventListener('click', function (e) {
    var item = e.target.closest('.search-result-item');
    if (item) {
      var link = item.querySelector('a');
      if (link) window.location.href = link.href;
    }
  });
});
})();
