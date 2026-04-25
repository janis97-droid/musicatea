// assets/pages/arabic-music-intro/symbols/core.js
window.MUSICATEA_INTRO_SYMBOLS = window.MUSICATEA_INTRO_SYMBOLS || {};

(function () {
  const registry = window.MUSICATEA_INTRO_SYMBOLS;
  registry.SVG_NS = 'http://www.w3.org/2000/svg';
  registry.GOLD = '#f0d28a';
  registry.drawers = registry.drawers || {};

  registry.svgEl = function svgEl(tag, attrs, parent) {
    const node = document.createElementNS(registry.SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.appendChild(node);
    return node;
  };

  registry.register = function register(name, drawer) {
    if (!name || typeof drawer !== 'function') return;
    registry.drawers[name] = drawer;
  };

  registry.drawAll = function drawAll() {
    document.querySelectorAll('.intro-term-card[data-symbol]').forEach((card) => {
      const slot = card.querySelector('.intro-symbol-visual');
      const type = card.dataset.symbol;
      const drawer = registry.drawers[type];
      if (!slot || !drawer) return;
      slot.innerHTML = '';
      const svg = registry.svgEl('svg', { viewBox: '0 0 52 52', role: 'img', 'aria-hidden': 'true' }, slot);
      drawer(svg, registry);
    });
  };
})();
