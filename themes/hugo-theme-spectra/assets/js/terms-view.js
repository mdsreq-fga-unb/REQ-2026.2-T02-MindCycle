// ===== Terms View Toggle — Grid / List mode for categories page =====

(function() {
  function safeGet(s, k) { try { return s.getItem(k); } catch(e) { return null; } }
  function safeSet(s, k, v) { try { s.setItem(k, v); } catch(e) {} }

  var VIEW_FADE_DURATION = 400;
  var VIEW_TRANSLATE_Y = '8px';

  var btns = document.querySelectorAll('.view-btn');
  var container = document.getElementById('termsContainer');
  if (!btns.length || !container) return;

  // Load previously saved view mode from localStorage
  // (head.html inline script already set html.terms-view-list for FOUC prevention)
  var saved = safeGet(localStorage, 'termsView');
  if (saved === 'list' && btns.length >= 2) {
    container.classList.remove('terms-grid');
    container.classList.add('terms-list-view');
    btns[0].classList.remove('active');
    btns[1].classList.add('active');
  }
  // Remove FOUC class — JS has taken over
  document.documentElement.classList.remove('terms-view-list');

  // Button click: switch view mode with fade animation and save to localStorage
  var viewTimer = null;
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var view = this.getAttribute('data-view');
      var newClass = (view === 'grid') ? 'terms-grid' : 'terms-list-view';
      if (container.classList.contains(newClass)) return;

      btns.forEach(function(button) { button.classList.remove('active'); });
      this.classList.add('active');

      // Clear any pending transition from previous rapid click
      clearTimeout(viewTimer);

      // Fade out, switch layout, fade in
      container.style.opacity = '0';
      container.style.transform = 'translateY(' + VIEW_TRANSLATE_Y + ')';
      viewTimer = setTimeout(function() {
        container.classList.remove('terms-grid', 'terms-list-view');
        container.classList.add(newClass);
        void container.offsetHeight;
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        viewTimer = null;
      }, VIEW_FADE_DURATION);

      safeSet(localStorage, 'termsView', view);
    });
  });
})();
