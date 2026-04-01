// assets/ui.js
// Deprecated compatibility loader for legacy pages.
// New pages should load only the needed split helpers directly.

(function () {
  const files = [
    'assets/shared-utils.js',
    'assets/sheet-card.js',
    'assets/maqam-card.js',
    'assets/history-ui.js'
  ];

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  console.info('assets/ui.js is deprecated. Load split helper files directly instead.');

  if (document.currentScript && document.readyState === 'loading') {
    document.write(files.map(src => `<script src="${src}"></script>`).join(''));
    return;
  }

  files.forEach(src => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      document.head.appendChild(script);
    }
  });
})();
