// ===== Dark / Light Theme Toggle =====
//
// Do tema Spectra (MIT, © 2026 JoeYang1412 — ver assets/LICENSE-spectra.txt).

(function () {
  function safeGet(s, k) { try { return s.getItem(k); } catch(e) { return null; } }
  function safeSet(s, k, v) { try { s.setItem(k, v); } catch(e) {} }

  // Get toggle button, icon, and label text elements
  var html = document.documentElement;
  var body = document.body;
  if (!body) return;
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  var themeLabel = document.getElementById('themeLabel');

  // Button label: the theme the click switches to
  var labelLight = 'Tema claro';
  var labelDark = 'Tema escuro';

  // Apply theme: set data-theme attribute, update icon and label
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '\u2600' : '\u263D';
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? labelLight : labelDark;
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  // Load saved theme or follow system preference (skip if <head> inline script already set it)
  var saved = safeGet(localStorage, 'theme');
  var current = html.getAttribute('data-theme');
  if (saved && saved !== current) {
    applyTheme(saved);
  } else if (!saved) {
    var systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    if (systemTheme !== current) applyTheme(systemTheme);
  }

  // Listen for system theme changes (only follow when no manual override is set)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!safeGet(localStorage, 'theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Animate theme transition: add transitioning class, remove after done
  var THEME_TRANSITION_DURATION_MS = 600;
  var transitionTimer = null;
  function animateThemeSwitch(next) {
    // Clear any pending timer from a rapid double-click
    clearTimeout(transitionTimer);

    // Enable smooth color transitions on all elements
    html.classList.add('theme-transitioning');

    // Apply the new theme
    applyTheme(next);

    // Remove transitioning class after animation completes
    transitionTimer = setTimeout(function () {
      html.classList.remove('theme-transitioning');
      transitionTimer = null;
    }, THEME_TRANSITION_DURATION_MS);
  }

  // Toggle button click: swap dark/light and save to localStorage
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      animateThemeSwitch(next);
      safeSet(localStorage, 'theme', next);
    });
  }
})();
