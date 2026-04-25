// assets/pages/arabic-music-intro/intro-symbols-extra.js
// Extra SVG visuals for beginner intro cards that are added by the expansion data.
(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const GOLD = '#f0d28a';

  function svgEl(tag, attrs, parent) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.appendChild(node);
    return node;
  }

  function baseSvg(slot) {
    slot.innerHTML = '';
    return svgEl('svg', { viewBox: '0 0 52 52', role: 'img', 'aria-hidden': 'true' }, slot);
  }

  function drawStaff(svg) {
    [12, 18, 24, 30, 36].forEach((y) => {
      svgEl('line', { x1: '6', y1: String(y), x2: '46', y2: String(y), stroke: GOLD, 'stroke-width': '1.8', opacity: '0.78', 'stroke-linecap': 'round' }, svg);
    });
    svgEl('ellipse', { cx: '29', cy: '30', rx: '6.3', ry: '4.4', fill: GOLD, transform: 'rotate(-18 29 30)' }, svg);
    svgEl('line', { x1: '34', y1: '29', x2: '34', y2: '12', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round' }, svg);
  }

  function drawTrebleClef(svg) {
    svgEl('text', {
      x: '26',
      y: '29',
      fill: GOLD,
      'font-size': '42',
      'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle'
    }, svg).textContent = '𝄞';
  }

  function drawBarline(svg) {
    [12, 18, 24, 30, 36].forEach((y) => {
      svgEl('line', { x1: '8', y1: String(y), x2: '44', y2: String(y), stroke: GOLD, 'stroke-width': '1.5', opacity: '0.55', 'stroke-linecap': 'round' }, svg);
    });
    svgEl('line', { x1: '26', y1: '9', x2: '26', y2: '39', stroke: GOLD, 'stroke-width': '4', 'stroke-linecap': 'round' }, svg);
  }

  function drawEighthRest(svg) {
    svgEl('text', {
      x: '26',
      y: '28',
      fill: GOLD,
      'font-size': '34',
      'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle'
    }, svg).textContent = '𝄾';
  }

  function drawDum(svg) {
    svgEl('circle', { cx: '26', cy: '26', r: '16', fill: 'none', stroke: GOLD, 'stroke-width': '4' }, svg);
    svgEl('circle', { cx: '26', cy: '26', r: '6', fill: GOLD, opacity: '0.88' }, svg);
    svgEl('text', { x: '26', y: '47', fill: GOLD, 'font-size': '9', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = 'دوم';
  }

  function drawTak(svg) {
    svgEl('circle', { cx: '26', cy: '26', r: '16', fill: 'none', stroke: GOLD, 'stroke-width': '2.6', opacity: '0.82' }, svg);
    svgEl('path', { d: 'M17 26 H35 M26 17 V35', stroke: GOLD, 'stroke-width': '3.4', 'stroke-linecap': 'round' }, svg);
    svgEl('text', { x: '26', y: '47', fill: GOLD, 'font-size': '9', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = 'تك';
  }

  function drawRhythmCycle(svg) {
    svgEl('path', { d: 'M15 18 C22 9, 37 11, 41 22', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M41 22 L43 14 L35 17', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M37 34 C30 43, 15 41, 11 30', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M11 30 L9 38 L17 35', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '18', cy: '26', r: '3.2', fill: GOLD }, svg);
    svgEl('circle', { cx: '34', cy: '26', r: '3.2', fill: GOLD, opacity: '0.74' }, svg);
  }

  function drawCardReading(svg) {
    svgEl('rect', { x: '11', y: '9', width: '30', height: '36', rx: '5', fill: 'none', stroke: GOLD, 'stroke-width': '2.8' }, svg);
    svgEl('line', { x1: '18', y1: '18', x2: '34', y2: '18', stroke: GOLD, 'stroke-width': '2.6', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '18', y1: '27', x2: '34', y2: '27', stroke: GOLD, 'stroke-width': '2.6', 'stroke-linecap': 'round', opacity: '0.72' }, svg);
    svgEl('line', { x1: '18', y1: '36', x2: '28', y2: '36', stroke: GOLD, 'stroke-width': '2.6', 'stroke-linecap': 'round', opacity: '0.72' }, svg);
    svgEl('circle', { cx: '40', cy: '40', r: '7', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '2' }, svg);
    svgEl('path', { d: 'M37 40 L39 43 L44 36', fill: 'none', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  }

  const map = {
    staff: drawStaff,
    'treble-clef': drawTrebleClef,
    barline: drawBarline,
    'eighth-rest': drawEighthRest,
    dum: drawDum,
    tak: drawTak,
    'rhythm-cycle': drawRhythmCycle,
    'card-reading': drawCardReading
  };

  function drawMissingSymbols() {
    document.querySelectorAll('.intro-term-card[data-symbol]').forEach((card) => {
      const slot = card.querySelector('.intro-symbol-visual');
      const type = card.dataset.symbol;
      if (!slot || !map[type]) return;
      if (slot.querySelector('svg')) return;
      map[type](baseSvg(slot));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', drawMissingSymbols);
  } else {
    drawMissingSymbols();
  }
})();
