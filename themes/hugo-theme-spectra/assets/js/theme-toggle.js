// ===== Dark / Light Theme Toggle =====

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

  // Read i18n label text from body data attributes
  var labelLight = body.getAttribute('data-i18n-light') || 'Light Mode';
  var labelDark = body.getAttribute('data-i18n-dark') || 'Dark Mode';

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

  // Animate theme transition: add transitioning class, trigger scan-line, remove after done
  var THEME_TRANSITION_DURATION_MS = 600;
  var transitionTimer = null;
  function animateThemeSwitch(next) {
    // Clear any pending timer from a rapid double-click
    clearTimeout(transitionTimer);

    // Enable smooth color transitions on all elements
    html.classList.add('theme-transitioning');

    // Apply the new theme
    applyTheme(next);

    // Trigger scan-line sweep effect
    var scanLine = document.querySelector('.scan-line');
    if (scanLine) {
      scanLine.classList.remove('active');
      // Force reflow so re-adding the class restarts the animation
      void scanLine.offsetWidth;
      scanLine.classList.add('active');
    }

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
