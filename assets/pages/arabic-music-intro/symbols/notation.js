// assets/pages/arabic-music-intro/symbols/notation.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  r.register('staff', (svg, { svgEl, GOLD }) => {
    [12, 18, 24, 30, 36].forEach((y) => svgEl('line', { x1: '6', y1: String(y), x2: '46', y2: String(y), stroke: GOLD, 'stroke-width': '1.8', opacity: '0.78', 'stroke-linecap': 'round' }, svg));
    svgEl('ellipse', { cx: '29', cy: '30', rx: '6.3', ry: '4.4', fill: GOLD, transform: 'rotate(-18 29 30)' }, svg);
    svgEl('line', { x1: '34', y1: '29', x2: '34', y2: '12', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round' }, svg);
  });

  r.register('treble-clef', (svg, { svgEl, GOLD }) => {
    svgEl('text', { x: '26', y: '29', fill: GOLD, 'font-size': '42', 'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif', 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, svg).textContent = '𝄞';
  });

  r.register('barline', (svg, { svgEl, GOLD }) => {
    [12, 18, 24, 30, 36].forEach((y) => svgEl('line', { x1: '8', y1: String(y), x2: '44', y2: String(y), stroke: GOLD, 'stroke-width': '1.5', opacity: '0.55', 'stroke-linecap': 'round' }, svg));
    svgEl('line', { x1: '26', y1: '9', x2: '26', y2: '39', stroke: GOLD, 'stroke-width': '4', 'stroke-linecap': 'round' }, svg);
  });

  r.register('quarter-note', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '23', cy: '36', rx: '8', ry: '5.8', fill: GOLD }, svg);
    svgEl('line', { x1: '31', y1: '36', x2: '31', y2: '10', stroke: GOLD, 'stroke-width': '3.8', 'stroke-linecap': 'round' }, svg);
  });

  r.register('eighth-note', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '26', cy: '36', rx: '8', ry: '5.5', fill: GOLD }, svg);
    svgEl('line', { x1: '41', y1: '36', x2: '41', y2: '12', stroke: GOLD, 'stroke-width': '3.8', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M41 12 C45 13, 49 16, 51 21 C47 20, 43 20, 39 22', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });

  r.register('quarter-rest', (svg, { svgEl, GOLD }) => {
    svgEl('text', { x: '26', y: '27', fill: GOLD, 'font-size': '34', 'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif', 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, svg).textContent = '𝄽';
  });

  r.register('eighth-rest', (svg, { svgEl, GOLD }) => {
    svgEl('text', { x: '26', y: '28', fill: GOLD, 'font-size': '34', 'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif', 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, svg).textContent = '𝄾';
  });

  r.register('rest', r.drawers['quarter-rest']);
})();
