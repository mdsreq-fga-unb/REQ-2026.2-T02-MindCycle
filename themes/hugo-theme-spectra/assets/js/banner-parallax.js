// ===== Banner Parallax (desktop only) =====

(function () {
  var PARALLAX_SPEED = 0.35;

  var bp = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mobile-breakpoint')) || 900;
  var mobileQuery = window.matchMedia('(max-width: ' + bp + 'px)');

  var bannerBg = document.getElementById('bannerBg');
  if (!bannerBg) return;

  var parallaxTicking = false;
  var parallaxEnabled = !mobileQuery.matches;

  function onScroll() {
    if (!parallaxEnabled) return;
    if (!parallaxTicking) {
      requestAnimationFrame(function () {
        bannerBg.style.transform = 'translateY(' + (window.scrollY * PARALLAX_SPEED) + 'px)';
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  mobileQuery.addEventListener('change', function (e) {
    parallaxEnabled = !e.matches;
    if (e.matches) {
      bannerBg.style.transform = '';
    }
  });
})();
