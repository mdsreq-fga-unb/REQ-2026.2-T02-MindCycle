// ===== Scroll Animation — IntersectionObserver staggered entrance =====

(function () {
if (typeof anime === 'undefined') return;

var animate = anime.animate;
var stagger = anime.stagger;
var spring = anime.spring;
var cubicBezier = anime.cubicBezier;

// ---- Animation config ----
var CARD_ANIM = { translateY: 80, scale: 0.96, stagger: 140 };
var ARTICLE_ANIM = { translateY: 60, scale: 0.97 };
var CATEGORY_ANIM = { translateY: 40, fadeDelay: 50 };
var SAFETY_TIMEOUT_MS = 3000;

document.addEventListener('DOMContentLoaded', function () {

  var started = false;

  function startObserving() {
    if (started) return;
    started = true;

    // --- Post cards: Anime.js V4 with spring easing ---
    var cards = document.querySelectorAll('.post-card');
    var cardBatch = [];
    var cardFlushTimer = null;

    function flushCardBatch() {
      if (cardBatch.length === 0) return;
      var targets = cardBatch.slice();
      cardBatch = [];

      animate(targets, {
        opacity: [0, 1],
        translateY: [CARD_ANIM.translateY, 0],
        scale: [CARD_ANIM.scale, 1],
        ease: spring({ stiffness: 90, damping: 11, mass: 1, velocity: 2 }),
        delay: stagger(CARD_ANIM.stagger),
        onComplete: function () {
          targets.forEach(function (el) { el.style.willChange = ''; });
        },
      });
    }

    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.willChange = 'transform, opacity';
          cardBatch.push(entry.target);
          cardObserver.unobserve(entry.target);
        }
      });

      cancelAnimationFrame(cardFlushTimer);
      cardFlushTimer = requestAnimationFrame(flushCardBatch);
    }, {
      // 0.15: cards are short — require 15% visible before animating
      // to avoid premature trigger at page bottom
      threshold: 0.15
    });

    cards.forEach(function (card) {
      cardObserver.observe(card);
    });

    // --- Article content: Anime.js V4 entrance ---
    var articles = document.querySelectorAll('.article-content');

    var articleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          articleObserver.unobserve(entry.target);
          var el = entry.target;
          el.style.willChange = 'transform, opacity';
          animate(el, {
            opacity: [0, 1],
            translateY: [ARTICLE_ANIM.translateY, 0],
            scale: [ARTICLE_ANIM.scale, 1],
            ease: spring({ stiffness: 80, damping: 14, mass: 1 }),
            onComplete: function () { el.style.willChange = ''; },
          });
        }
      });
    }, {
      // 0: article-content is tall, so any visibility suffices;
      // rootMargin handles the trigger timing instead
      threshold: 0,
      // -80px > translateY 60px so element starts animating before reaching
      // its final position, preventing a visible jump
      rootMargin: '0px 0px -80px 0px'
    });

    articles.forEach(function (el) {
      articleObserver.observe(el);
    });

    // --- Category cards: CSS transition fade entrance (與 grid/list 切換一致) ---
    // 先關掉 transition 讓 opacity:0 瞬間生效（不觸發淡出），
    // reflow 後重新啟用 transition，再設 opacity:1 觸發淡入。
    var catContainer = document.getElementById('termsContainer');
    if (catContainer) {
      catContainer.style.transition = 'none';
      catContainer.style.opacity = '0';
      catContainer.style.transform = 'translateY(' + CATEGORY_ANIM.translateY + 'px)';
      void catContainer.offsetHeight; // Force reflow
      catContainer.style.transition = '';
      // 給瀏覽器時間畫出 opacity:0，再觸發 CSS transition 淡入
      setTimeout(function () {
        catContainer.style.opacity = '1';
        catContainer.style.transform = 'translateY(0)';
      }, CATEGORY_ANIM.fadeDelay);
    }
  }

  // Subsequent visits (no loading screen): start observing immediately
  if (document.documentElement.classList.contains('spectra-revisit')) {
    startObserving();
    return;
  }

  // First visit: wait for custom event from loading.js reveal animation
  var siteWrapper = document.querySelector('.site-wrapper');
  if (siteWrapper) {
    siteWrapper.addEventListener('spectra:revealed', startObserving, { once: true });
    // Safety fallback: if event never fires, start after 3s
    setTimeout(startObserving, SAFETY_TIMEOUT_MS);
  } else {
    startObserving();
  }
});
})();
