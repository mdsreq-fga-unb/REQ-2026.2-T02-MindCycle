// ===== Table of Contents — Scroll Tracking + Highlight + Mobile Floating Panel =====

(function () {
document.addEventListener('DOMContentLoaded', function () {
  // ---- Scroll tracking (works for both desktop and mobile TOC) ----
  var tocNavs = document.querySelectorAll('.toc-nav');
  if (tocNavs.length === 0) return;

  var allTocLinks = document.querySelectorAll('.toc-nav a');

  // Build href → [links] map for O(1) highlight lookup
  var tocLinkMap = {};
  allTocLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href) {
      if (!tocLinkMap[href]) tocLinkMap[href] = [];
      tocLinkMap[href].push(link);
    }
  });
  var currentActiveLinks = [];

  // Collect heading IDs from TOC links
  var headingIds = [];
  var firstTocNav = tocNavs[0];
  var firstLinks = firstTocNav.querySelectorAll('a');
  firstLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      headingIds.push(href.substring(1));
    }
  });

  // Observe heading elements: highlight corresponding TOC link when entering viewport
  var observer = new IntersectionObserver(function (entries) {
    // Find the topmost visible heading among all entries
    var topmostVisibleId = null;
    var topmostTop = Infinity;
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var top = entry.boundingClientRect.top;
        if (top < topmostTop) {
          topmostTop = top;
          topmostVisibleId = entry.target.getAttribute('id');
        }
      }
    });
    if (topmostVisibleId) {
      highlightTocLink(topmostVisibleId);
    } else {
      // All entries leaving: handle scroll-up case
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          var id = entry.target.getAttribute('id');
          var idx = headingIds.indexOf(id);
          if (idx > 0) {
            highlightTocLink(headingIds[idx - 1]);
          }
        }
      });
    }
  }, {
    // -60% bottom inset: headings activate when entering the top 40% of
    // the viewport, matching reader eye position on long articles
    rootMargin: '0px 0px -60% 0px',
    threshold: 0
  });

  headingIds.forEach(function (id) {
    var heading = document.getElementById(id);
    if (heading) {
      observer.observe(heading);
    }
  });

  // Highlight TOC link matching the given heading ID
  function highlightTocLink(id) {
    currentActiveLinks.forEach(function (link) {
      link.classList.remove('active');
    });
    currentActiveLinks = tocLinkMap['#' + id] || [];
    currentActiveLinks.forEach(function (link) {
      link.classList.add('active');
    });
  }

  // TOC link click: smooth scroll to target heading + close floating panel
  allTocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.getElementById(href.substring(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // replaceState can throw in sandboxed iframes — safe to ignore
          try { history.replaceState(null, null, href); } catch (err) {}
        }
        // Close floating panel if open
        closeTocPanel();
      }
    });
  });

  // ---- Mobile Floating TOC Panel ----
  var tocToggle = document.getElementById('tocFloatToggle');
  var tocPanel = document.getElementById('tocFloatPanel');
  var tocClose = document.getElementById('tocFloatClose');
  var tocOverlay = document.getElementById('tocFloatOverlay');

  if (!tocToggle || !tocPanel) return;

  // Open floating TOC panel
  function openTocPanel() {
    tocPanel.classList.add('open');
    if (tocOverlay) tocOverlay.classList.add('visible');
    tocToggle.setAttribute('aria-expanded', 'true');
  }

  // Close floating TOC panel
  function closeTocPanel() {
    if (!tocPanel) return;
    tocPanel.classList.remove('open');
    if (tocOverlay) tocOverlay.classList.remove('visible');
    tocToggle.setAttribute('aria-expanded', 'false');
  }

  // TOC toggle button click
  tocToggle.addEventListener('click', function () {
    if (tocPanel.classList.contains('open')) {
      closeTocPanel();
    } else {
      openTocPanel();
    }
  });

  // Close button and overlay click close panel
  if (tocClose) {
    tocClose.addEventListener('click', closeTocPanel);
  }

  if (tocOverlay) {
    tocOverlay.addEventListener('click', closeTocPanel);
  }

  // Escape key closes floating TOC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && tocPanel.classList.contains('open')) {
      closeTocPanel();
    }
  });
});
})();
