// ===== Sidebar — Mobile Toggle + Desktop Collapse + Scroll Isolation =====

(function () {
function safeGet(s, k) { try { return s.getItem(k); } catch(e) { return null; } }
function safeSet(s, k, v) { try { s.setItem(k, v); } catch(e) {} }

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
  // Get sidebar-related DOM elements
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebarToggle');
  var sidebarOverlay = document.getElementById('sidebarOverlay');
  var collapseBtn = document.getElementById('sidebarCollapse');

  if (!sidebar || !sidebarToggle || !sidebarOverlay) return;

  // ===== Desktop Collapse (icon-only mode) =====
  // Read mobile breakpoint from CSS custom property for sync
  var bp = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mobile-breakpoint')) || 900;
  var desktopQuery = window.matchMedia('(min-width: ' + (bp + 1) + 'px)');

  // Apply or remove collapsed state class
  function applyCollapsed(collapsed) {
    if (collapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }
  }

  // Toggle collapsed state and save to localStorage
  function toggleCollapse() {
    var isCollapsed = document.documentElement.classList.contains('sidebar-collapsed');
    var next = !isCollapsed;
    safeSet(localStorage, 'sidebar-collapsed', next);
    applyCollapsed(next);
  }

  // Apply saved collapsed state on load (head.html already added class for anti-flash,
  // but also handle the case where it wasn't set)
  if (desktopQuery.matches && safeGet(localStorage, 'sidebar-collapsed') === 'true') {
    applyCollapsed(true);
  }

  if (collapseBtn) {
    collapseBtn.addEventListener('click', toggleCollapse);
  }

  // When switching to mobile, remove collapsed class (keep localStorage)
  desktopQuery.addEventListener('change', function (e) {
    if (!e.matches) {
      document.documentElement.classList.remove('sidebar-collapsed');
    } else if (safeGet(localStorage, 'sidebar-collapsed') === 'true') {
      applyCollapsed(true);
    }
  });

  // Get all focusable elements in sidebar (for accessibility)
  function getFocusableElements() {
    return sidebar.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  }

  var cachedFocusable = null;

  // Saved scroll position for mobile sidebar open/close
  var savedScrollY = 0;

  // Open mobile sidebar: show panel + overlay + lock body scroll + focus first element
  function openSidebar() {
    savedScrollY = window.scrollY;
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    sidebarToggle.textContent = '\u2715';
    sidebarToggle.setAttribute('aria-expanded', 'true');
    scrollLock('sidebar');
    // iOS: position:fixed + top offset preserves scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + savedScrollY + 'px';
    document.body.style.width = '100%';
    // Focus first focusable element in sidebar
    cachedFocusable = getFocusableElements();
    if (cachedFocusable.length) cachedFocusable[0].focus();
  }

  // Close mobile sidebar: hide panel + overlay + unlock body scroll + restore position
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    sidebarToggle.textContent = '\u2630';
    sidebarToggle.setAttribute('aria-expanded', 'false');
    scrollUnlock('sidebar');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY);
    cachedFocusable = null;
    sidebarToggle.focus();
  }

  // Toggle button click event
  sidebarToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Overlay click closes sidebar
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Escape key closes sidebar + Tab focus trap when sidebar is open
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
      return;
    }
    // Focus trap: keep Tab cycling within sidebar when open
    if (e.key === 'Tab' && sidebar.classList.contains('open')) {
      var focusable = cachedFocusable || getFocusableElements();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // ===== Sidebar Scroll Isolation =====
  // Prevent wheel scroll from propagating to main content.
  // Only preventDefault at scroll boundaries to preserve native smooth scroll.
  var LINE_HEIGHT_PX = 40;   // approximate px per line for deltaMode=1
  var PAGE_HEIGHT_PX = 800;  // approximate px per page for deltaMode=2
  var SCROLL_BOUNDARY_TOLERANCE = 1; // sub-pixel rounding tolerance

  sidebar.addEventListener('wheel', function (e) {
    // Normalize deltaY based on deltaMode (0=pixels, 1=lines, 2=pages)
    var delta = e.deltaY;
    if (e.deltaMode === 1) delta *= LINE_HEIGHT_PX;
    if (e.deltaMode === 2) delta *= PAGE_HEIGHT_PX;

    // Scroll boundary check: prevent default at top/bottom
    var scrollTop = sidebar.scrollTop;
    var scrollHeight = sidebar.scrollHeight;
    var clientHeight = sidebar.clientHeight;
    var atTop = scrollTop <= 0 && delta < 0;
    var atBottom = scrollTop + clientHeight >= scrollHeight - SCROLL_BOUNDARY_TOLERANCE && delta > 0;

    if (atTop || atBottom) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, { passive: false });

  // Touch scroll isolation: record touchstart position, prevent at boundaries on touchmove
  var touchStartY = 0;
  sidebar.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  sidebar.addEventListener('touchmove', function (e) {
    if (e.touches.length !== 1) return;
    var touchY = e.touches[0].clientY;
    var deltaY = touchStartY - touchY;
    var scrollTop = sidebar.scrollTop;
    var scrollHeight = sidebar.scrollHeight;
    var clientHeight = sidebar.clientHeight;

    // At boundaries, prevent propagation
    if (
      (deltaY < 0 && scrollTop <= 0) ||
      (deltaY > 0 && scrollTop + clientHeight >= scrollHeight - SCROLL_BOUNDARY_TOLERANCE)
    ) {
      e.preventDefault();
    }
    touchStartY = touchY;
  }, { passive: false });
});
})();
