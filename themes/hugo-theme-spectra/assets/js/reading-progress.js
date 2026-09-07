// ===== Reading Progress Bar: shows scroll progress on article pages =====

(function () {
document.addEventListener('DOMContentLoaded', function () {
  var bar = document.getElementById('readingProgressBar');
  var container = document.getElementById('readingProgress');
  var article = document.querySelector('.article-content');
  if (!bar || !container || !article) return;

  // RAF throttle pattern: intentionally duplicated across IIFE-isolated files
  // (main.js, scroll-top.js) to keep each script self-contained
  var ticking = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    bar.style.transition = 'none';
  }

  var articleTop = 0;
  var articleHeight = 0;

  function measure() {
    articleTop = article.getBoundingClientRect().top + window.scrollY;
    articleHeight = article.offsetHeight;
  }

  function update() {
    var windowHeight = window.innerHeight;
    var progress = (window.scrollY - articleTop) / (articleHeight - windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    bar.style.width = (progress * 100) + '%';

    if (progress > 0) {
      container.classList.add('visible');
    } else {
      container.classList.remove('visible');
    }

    ticking = false;
  }

  measure();

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', measure, { passive: true });

  article.querySelectorAll('img').forEach(function (img) {
    if (!img.complete) img.addEventListener('load', measure, { once: true });
  });

  update();
});
})();
