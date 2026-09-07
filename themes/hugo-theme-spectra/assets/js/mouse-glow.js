// ===== Mouse Glow Effect (desktop only) =====

(function () {
  var GLOW_LERP_FACTOR = 0.1;
  var GLOW_OPACITY_LERP = 0.12;
  var GLOW_OPACITY_THRESHOLD = 0.01;
  var GLOW_BANNER_FADE_ZONE = 280;

  var rootStyles = getComputedStyle(document.documentElement);
  var bp = parseInt(rootStyles.getPropertyValue('--mobile-breakpoint')) || 900;
  var mobileQuery = window.matchMedia('(max-width: ' + bp + 'px)');

  var glow = document.getElementById('mouseGlow');
  if (!glow) return;

  // Glow size — read from CSS custom property for sync
  var glowSize = parseInt(rootStyles.getPropertyValue('--glow-size')) || 180;
  var halfGlow = glowSize / 2;
  var glowX = 0;
  var glowY = 0;
  var mouseX = 0;
  var mouseY = 0;
  var active = false;
  var glowOpacity = 0;
  var bannerEl = document.querySelector('.banner');
  var bannerBottom = 0;
  var rafId = null;

  // Cache banner bottom position (only changes on resize, not scroll —
  // parallax uses translateY which doesn't affect layout rect)
  // RAF throttle pattern: intentionally duplicated across IIFE-isolated files
  // (reading-progress.js, scroll-top.js) to keep each script self-contained.
  // passive: true prevents scroll jank; RAF coalesces updates to one per frame
  var ticking = false;
  function updateBannerBottom() {
    if (bannerEl) bannerBottom = bannerEl.getBoundingClientRect().bottom;
    ticking = false;
  }
  window.addEventListener('resize', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateBannerBottom); }
  }, { passive: true });
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateBannerBottom); }
  }, { passive: true });
  updateBannerBottom();

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) {
      active = true;
      if (!rafId) {
        // Snap to current mouse position to avoid lerp delay from (0,0)
        glowX = mouseX;
        glowY = mouseY;
        animateGlow();
      }
    }
  }

  function onMouseLeave() {
    active = false;
  }

  // Lerp animation loop: smooth interpolation + fade out near banner
  function animateGlow() {
    glowX += (mouseX - glowX) * GLOW_LERP_FACTOR;
    glowY += (mouseY - glowY) * GLOW_LERP_FACTOR;
    glow.style.transform = 'translate(' + (glowX - halfGlow) + 'px,' + (glowY - halfGlow) + 'px)';

    var target = 0;
    if (active) {
      target = 1;
      // Fade out near banner — quadratic ease-in keeps glow from overlapping gradient
      if (bannerEl) {
        var fadeZone = GLOW_BANNER_FADE_ZONE;
        if (glowY < bannerBottom) {
          target = 0;
        } else if (glowY < bannerBottom + fadeZone) {
          var t = (glowY - bannerBottom) / fadeZone;
          target = t * t; // quadratic: slow start near banner, fast end
        }
      }
    }

    glowOpacity += (target - glowOpacity) * GLOW_OPACITY_LERP;
    glow.style.opacity = glowOpacity < GLOW_OPACITY_THRESHOLD ? 0 : glowOpacity;

    if (!active && glowOpacity < GLOW_OPACITY_THRESHOLD) {
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(animateGlow);
  }

  function enableGlow() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
  }

  function disableGlow() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    active = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    glow.style.opacity = 0;
  }

  function handleMobileChange(e) {
    if (e.matches) {
      disableGlow();
    } else {
      enableGlow();
    }
  }

  if (!mobileQuery.matches) {
    enableGlow();
  }
  mobileQuery.addEventListener('change', handleMobileChange);
})();
