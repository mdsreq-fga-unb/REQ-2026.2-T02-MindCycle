// ===== Banner Image Error Fallback =====
// Remove broken banner image container to show gradient-only fallback.

(function () {
  var bannerImg = document.getElementById('bannerImg');
  if (bannerImg) {
    bannerImg.addEventListener('error', function () {
      var parent = bannerImg.parentElement;
      if (parent) parent.remove();
    });
  }
})();
