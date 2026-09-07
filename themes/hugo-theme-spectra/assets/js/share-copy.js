// ===== Share Copy Link: copies article URL to clipboard =====

(function () {
document.addEventListener('DOMContentLoaded', function () {
  var SHARE_FEEDBACK_DURATION_MS = 2000;
  var btns = document.querySelectorAll('.share-copy');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-url');
      if (!url) return;
      if (!navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(url).then(function () {
        btn.classList.add('copied');
        setTimeout(function () { btn.classList.remove('copied'); }, SHARE_FEEDBACK_DURATION_MS);
      }).catch(function (err) { console.warn('Share copy failed:', err); });
    });
  });
});
})();
