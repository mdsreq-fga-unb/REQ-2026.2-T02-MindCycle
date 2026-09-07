// ===== Loading Animation — Three Phase Controller (Anime.js V4) =====
// First visit: full animation (spinner → sweep → reveal)
// Homepage first visit: spinner → welcome animation → reveal
// Subsequent visits: CSS handles instant display, JS just fires scan line

(function () {

function safeGet(s, k) { try { return s.getItem(k); } catch(e) { return null; } }
function safeSet(s, k, v) { try { s.setItem(k, v); } catch(e) {} }

// ---- Timing constants (ms unless noted) ----
var FADE_OUT_DURATION = 500;
var SCAN_EXPAND_DURATION = 450;
var SCAN_FADE_DURATION = 250;
var REVEAL_TRANSLATE_Y = 30;
var REVEAL_SCALE = 0.985;
var REVEAL_DURATION = 800;
var SPINNER_DURATION = 900;

// Welcome animation timing
var WELCOME_FADE_DURATION = 300;
var TEXT_ENTRANCE_DELAY = 200;
var TEXT_SLIDE_IN_DURATION = 700;
var TEXT_STAGGER_IN = 150;
var SUBTITLE_FADE_DURATION = 500;
var SUBTITLE_FADE_DELAY = 600;
var WELCOME_HOLD_MS = 1500;
var TEXT_SLIDE_OUT_DURATION = 600;
var TEXT_STAGGER_OUT = 100;
var SUBTITLE_OUT_DURATION = 400;
var WELCOME_EXIT_DELAY = 500;
var WELCOME_SCREEN_FADE_DURATION = 400;
var SCAN_LINE_DELAY = 150;
var REVEAL_DELAY = 250;
var FALLBACK_REVEAL_DELAY = 350;
var REVISIT_SCAN_DELAY = 80;

// ---- Shared animation helpers ----

function fadeOutLoading(el) {
  anime.animate(el, {
    opacity: [1, 0],
    duration: FADE_OUT_DURATION,
    ease: 'out(2)',
    onComplete: function () { el.style.display = 'none'; }
  });
}

function animateScanLine(el) {
  el.style.opacity = '1';
  el.style.transformOrigin = 'left';
  anime.animate(el, {
    scaleX: [0, 1],
    duration: SCAN_EXPAND_DURATION,
    ease: anime.cubicBezier(0.16, 1, 0.3, 1),
    onComplete: function () {
      anime.animate(el, {
        opacity: [1, 0],
        duration: SCAN_FADE_DURATION,
        ease: 'out(2)',
      });
    }
  });
}

function revealSite(siteWrapper) {
  anime.animate(siteWrapper, {
    opacity: [0, 1],
    translateY: [REVEAL_TRANSLATE_Y, 0],
    scale: [REVEAL_SCALE, 1],
    duration: REVEAL_DURATION,
    ease: anime.cubicBezier(0.25, 0.1, 0.25, 1),
    onComplete: function () {
      // Clear anime.js inline transform/opacity so CSS .revealed takes effect.
      // An inline identity transform (translateY(0) scale(1)) still creates a
      // containing block, breaking position:fixed on children like .mouse-glow.
      siteWrapper.style.transform = '';
      siteWrapper.style.opacity = '';
      siteWrapper.classList.add('revealed');
      siteWrapper.dispatchEvent(new Event('spectra:revealed'));
    }
  });
}

// ---- Welcome animation (homepage first visit only) ----

function showWelcomeAnimation(loadingEl, welcomeScreen, siteWrapper, scanLine) {
  var animate = anime.animate;
  var stagger = anime.stagger;
  var line1 = document.getElementById('welcomeLine1');
  var line2 = document.getElementById('welcomeLine2');
  var welcomeSub = document.getElementById('welcomeSub');

  if (!line1 || !line2) {
    fadeOutLoading(loadingEl);
    setTimeout(function () { revealSite(siteWrapper); }, FALLBACK_REVEAL_DELAY);
    return;
  }

  // 1. Fade out loading screen
  animate(loadingEl, {
    opacity: [1, 0],
    duration: WELCOME_FADE_DURATION,
    ease: 'out(2)',
    onComplete: function () {
      loadingEl.style.display = 'none';
    }
  });

  // 2. Show welcome screen
  welcomeScreen.classList.add('active');
  animate(welcomeScreen, {
    opacity: [0, 1],
    duration: WELCOME_FADE_DURATION,
    ease: 'out(2)',
  });

  // 3. Text slides in from below
  setTimeout(stageTextEntrance, TEXT_ENTRANCE_DELAY);

  function stageTextEntrance() {
    animate([line1, line2], {
      translateY: ['110%', '0%'],
      duration: TEXT_SLIDE_IN_DURATION,
      ease: 'out(3)',
      delay: stagger(TEXT_STAGGER_IN),
    });

    animate(welcomeSub, {
      opacity: [0, 1],
      duration: SUBTITLE_FADE_DURATION,
      ease: 'out(2)',
      delay: SUBTITLE_FADE_DELAY,
    });

    // 4. Hold then slide text up and out
    setTimeout(stageTextExit, WELCOME_HOLD_MS);
  }

  function stageTextExit() {
    animate([line1, line2], {
      translateY: ['0%', '-110%'],
      duration: TEXT_SLIDE_OUT_DURATION,
      ease: 'in(3)',
      delay: stagger(TEXT_STAGGER_OUT),
    });

    animate(welcomeSub, {
      opacity: [1, 0],
      duration: SUBTITLE_OUT_DURATION,
      ease: 'in(2)',
    });

    // 5. Fade out welcome screen, fire scan line, reveal content
    setTimeout(stageReveal, WELCOME_EXIT_DELAY);
  }

  function stageReveal() {
    animate(welcomeScreen, {
      opacity: [1, 0],
      duration: WELCOME_SCREEN_FADE_DURATION,
      ease: 'out(2)',
      onComplete: function () {
        welcomeScreen.classList.remove('active');
      }
    });

    if (scanLine) {
      setTimeout(function () { animateScanLine(scanLine); }, SCAN_LINE_DELAY);
    }

    setTimeout(function () { revealSite(siteWrapper); }, REVEAL_DELAY);
  }
}

// ---- Main entry ----

document.addEventListener('DOMContentLoaded', function () {
  var scanLine = document.getElementById('scanLine');
  var isRevisit = safeGet(sessionStorage, 'spectra-loaded');

  // Guard: if anime.js failed to load, skip animations and show content
  if (typeof anime === 'undefined') {
    var loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.style.display = 'none';
    var sw = document.querySelector('.site-wrapper');
    if (sw) {
      sw.classList.add('revealed');
      sw.dispatchEvent(new Event('spectra:revealed'));
    }
    return;
  }

  // Subsequent visits: quick scan line flourish, then return
  if (isRevisit) {
    if (scanLine) {
      setTimeout(function () { animateScanLine(scanLine); }, REVISIT_SCAN_DELAY);
    }
    return;
  }

  // First visit: mark as loaded and run full animation
  safeSet(sessionStorage, 'spectra-loaded', '1');

  var loadingEl = document.getElementById('loading');
  var siteWrapper = document.querySelector('.site-wrapper');
  if (!loadingEl || !siteWrapper) return;

  var isHomePage = document.body.getAttribute('data-page-kind') === 'home';
  var welcomeScreen = document.getElementById('welcomeScreen');

  // Phase 1: Spinner
  setTimeout(function () {
    if (isHomePage && welcomeScreen) {
      showWelcomeAnimation(loadingEl, welcomeScreen, siteWrapper, scanLine);
    } else {
      // Non-homepage: loading → scan line → reveal
      fadeOutLoading(loadingEl);

      if (scanLine) {
        setTimeout(function () { animateScanLine(scanLine); }, SCAN_LINE_DELAY);
      }

      setTimeout(function () { revealSite(siteWrapper); }, FALLBACK_REVEAL_DELAY);
    }
  }, SPINNER_DURATION);
});

})();
