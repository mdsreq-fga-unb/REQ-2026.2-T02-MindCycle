// ===== Smart Back Links — remember entry listing page =====
// Non-article pages save their URL; article pages use it for back navigation.

(function () {
  function safeGet(s, k) { try { return s.getItem(k); } catch(e) { return null; } }
  function safeSet(s, k, v) { try { s.setItem(k, v); } catch(e) {} }
  function isSameOrigin(url) {
    try { return new URL(url, location.origin).origin === location.origin; }
    catch (e) { return false; }
  }

  var pageKind = document.body.getAttribute('data-page-kind');
  if (pageKind !== 'page') {
    // On listing pages (home, section, taxonomy, term): save URL as entry point
    safeSet(sessionStorage,'spectra-entry-list', window.location.href);
    // Collect post list for contextual prev/next navigation
    var postLinks = [];
    document.querySelectorAll('.post-card h3 a').forEach(function (a) {
      postLinks.push({ url: a.href, title: a.textContent.trim() });
    });
    if (postLinks.length > 0) {
      safeSet(sessionStorage,'spectra-post-list', JSON.stringify(postLinks));
    }
  } else {
    // On article pages: set back link to the stored entry point
    var entryList = safeGet(sessionStorage,'spectra-entry-list');
    if (entryList && isSameOrigin(entryList)) {
      document.querySelectorAll('.back-link[data-fallback]').forEach(function (link) {
        link.href = entryList;
      });
    }
    // Context-aware prev/next navigation based on entry listing
    var postListJson = safeGet(sessionStorage,'spectra-post-list');
    var postNav = document.querySelector('.post-nav');
    if (postListJson && postNav) {
      try { var postList = JSON.parse(postListJson); } catch (e) { postList = []; }
      var currentPath = window.location.pathname;
      function stripTrailingSlash(p) { return p.replace(/\/+$/, ''); }
      var currentIndex = -1;
      for (var i = 0; i < postList.length; i++) {
        try {
          if (stripTrailingSlash(new URL(postList[i].url).pathname) === stripTrailingSlash(currentPath)) {
            currentIndex = i;
            break;
          }
        } catch (e) { console.warn('Invalid post URL:', postList[i].url); }
      }
      if (currentIndex !== -1) {
        var prevLabel = document.body.getAttribute('data-i18n-prev') || 'Prev';
        var nextLabel = document.body.getAttribute('data-i18n-next') || 'Next';
        // list[0] = newest; ← = newer (i-1), → = older (i+1)
        var newerPost = currentIndex > 0 ? postList[currentIndex - 1] : null;
        var olderPost = currentIndex < postList.length - 1 ? postList[currentIndex + 1] : null;
        if (newerPost && !isSameOrigin(newerPost.url)) newerPost = null;
        if (olderPost && !isSameOrigin(olderPost.url)) olderPost = null;
        if (!newerPost && !olderPost) {
          postNav.style.display = 'none';
        } else {
          postNav.innerHTML = '';
          if (newerPost) {
            var prevLink = document.createElement('a');
            prevLink.href = newerPost.url;
            prevLink.className = 'post-nav-link post-nav-prev';
            var prevLabelSpan = document.createElement('span');
            prevLabelSpan.className = 'post-nav-label';
            prevLabelSpan.textContent = '\u2190 ' + prevLabel;
            var prevTitleSpan = document.createElement('span');
            prevTitleSpan.className = 'post-nav-title';
            prevTitleSpan.textContent = newerPost.title;
            prevLink.appendChild(prevLabelSpan);
            prevLink.appendChild(prevTitleSpan);
            postNav.appendChild(prevLink);
          }
          if (olderPost) {
            var nextLink = document.createElement('a');
            nextLink.href = olderPost.url;
            nextLink.className = 'post-nav-link post-nav-next';
            var nextLabelSpan = document.createElement('span');
            nextLabelSpan.className = 'post-nav-label';
            nextLabelSpan.textContent = nextLabel + ' \u2192';
            var nextTitleSpan = document.createElement('span');
            nextTitleSpan.className = 'post-nav-title';
            nextTitleSpan.textContent = olderPost.title;
            nextLink.appendChild(nextLabelSpan);
            nextLink.appendChild(nextTitleSpan);
            postNav.appendChild(nextLink);
          }
        }
      }
      // If currentIndex === -1, keep Hugo's static prev/next as fallback
    }
  }
})();
