// assets/pages/arabic-music-intro/learning-page.js
// Draws intro SVG symbols on dedicated learning pages.
(function () {
  const symbols = window.MUSICATEA_INTRO_SYMBOLS;
  if (symbols && typeof symbols.drawAll === 'function') {
    symbols.drawAll();
  }
})();
