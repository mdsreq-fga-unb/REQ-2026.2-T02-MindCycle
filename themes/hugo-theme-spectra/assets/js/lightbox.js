// ===== Lightbox: fullscreen image viewer for article images =====

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

document.addEventListener('DOMContentLoaded', function () {
  var overlay = null;
  var image = null;
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Select all images in article content
  var imgs = document.querySelectorAll('.article-content img');

  imgs.forEach(function (img) {
    // Skip images inside links
    if (img.closest('a')) return;
    // Skip avatar images
    if (img.closest('.avatar')) return;

    img.setAttribute('data-lightbox', '');

    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    if (motionQuery.matches) overlay.style.transition = 'none';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '\u00D7';
    closeBtn.addEventListener('click', closeLightbox);

    image = document.createElement('img');
    image.className = 'lightbox-image';

    overlay.appendChild(closeBtn);
    overlay.appendChild(image);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
  }

  function openLightbox(src, alt) {
    if (!overlay) createOverlay();
    image.src = src;
    image.alt = alt || '';
    scrollLock('lightbox');
    // Force reflow before adding active class for transition
    void overlay.offsetHeight;
    overlay.classList.add('active');
    document.addEventListener('keydown', onKeyDown);
  }

  function closeLightbox() {
    if (!overlay) return;
    overlay.classList.remove('active');
    scrollUnlock('lightbox');
    document.removeEventListener('keydown', onKeyDown);
    image.src = '';
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeLightbox();
  }
});
})();
