// assets/page-library-mobile.js
// Library-only mobile state hook.

(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const body = document.body;
  const libraryRoot = document.getElementById('list');
  const filters = document.querySelector('.filters');
  if (!body || !libraryRoot || !filters) return;

  const mobileQuery = window.matchMedia('(max-width: 760px)');

  function applyLibraryMobileState() {
    body.classList.toggle('is-library-mobile-layout', mobileQuery.matches);
  }

  applyLibraryMobileState();

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', applyLibraryMobileState);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(applyLibraryMobileState);
  }

  window.addEventListener('pageshow', applyLibraryMobileState);
})();
