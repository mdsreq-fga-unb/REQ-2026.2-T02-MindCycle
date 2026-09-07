// ===== Scroll to Top Button: appears after scrolling down, smooth scrolls to top =====

(function () {
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  // RAF throttle pattern: intentionally duplicated across IIFE-isolated files
  // (main.js, reading-progress.js) to keep each script self-contained
  var SCROLL_THRESHOLD_PX = 400;
  var ticking = false;

  function updateVisibility() {
    if (window.scrollY > SCROLL_THRESHOLD_PX) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
})();
