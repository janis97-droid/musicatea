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

  r.register('meter', (svg, { svgEl, GOLD }) => {
    svgEl('rect', { x: '10', y: '8', width: '32', height: '36', rx: '7', fill: 'none', stroke: GOLD, 'stroke-width': '2.4', opacity: '0.85' }, svg);
    svgEl('text', { x: '26', y: '22', fill: GOLD, 'font-size': '13', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
    svgEl('line', { x1: '17', y1: '26', x2: '35', y2: '26', stroke: GOLD, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '0.78' }, svg);
    svgEl('text', { x: '26', y: '40', fill: GOLD, 'font-size': '13', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
  });

  r.register('quarter-note', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '23', cy: '36', rx: '8', ry: '5.8', fill: GOLD, transform: 'rotate(-18 23 36)' }, svg);
    svgEl('line', { x1: '31', y1: '35', x2: '31', y2: '10', stroke: GOLD, 'stroke-width': '3.8', 'stroke-linecap': 'round' }, svg);
  });

  r.register('eighth-note', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '26', cy: '36', rx: '8', ry: '5.5', fill: GOLD, transform: 'rotate(-18 26 36)' }, svg);
    svgEl('line', { x1: '34', y1: '35', x2: '34', y2: '12', stroke: GOLD, 'stroke-width': '3.8', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M34 12 C40 13, 45 17, 47 23 C42 21, 38 22, 34 25', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });

  r.register('beamed-notes', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '16', cy: '36', rx: '7', ry: '5.4', fill: GOLD, transform: 'rotate(-18 16 36)' }, svg);
    svgEl('ellipse', { cx: '34', cy: '36', rx: '7', ry: '5.4', fill: GOLD, transform: 'rotate(-18 34 36)' }, svg);
    svgEl('line', { x1: '22', y1: '35', x2: '22', y2: '14', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '40', y1: '35', x2: '40', y2: '14', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('rect', { x: '22', y: '12', width: '18', height: '5', rx: '2', fill: GOLD }, svg);
  });

  r.register('quarter-rest', (svg, { svgEl, GOLD }) => {
    svgEl('text', { x: '26', y: '27', fill: GOLD, 'font-size': '34', 'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif', 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, svg).textContent = '𝄽';
  });

  r.register('eighth-rest', (svg, { svgEl, GOLD }) => {
    svgEl('text', { x: '26', y: '28', fill: GOLD, 'font-size': '34', 'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif', 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, svg).textContent = '𝄾';
  });

  r.register('tie', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '15', cy: '32', rx: '5', ry: '3.8', fill: GOLD, opacity: '0.9' }, svg);
    svgEl('ellipse', { cx: '37', cy: '32', rx: '5', ry: '3.8', fill: GOLD, opacity: '0.9' }, svg);
    svgEl('path', { d: 'M10 25 C18 16, 34 16, 42 25', fill: 'none', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('slur', (svg, { svgEl, GOLD }) => {
    svgEl('ellipse', { cx: '13', cy: '34', rx: '4.5', ry: '3.5', fill: GOLD }, svg);
    svgEl('ellipse', { cx: '26', cy: '28', rx: '4.5', ry: '3.5', fill: GOLD, opacity: '0.85' }, svg);
    svgEl('ellipse', { cx: '39', cy: '34', rx: '4.5', ry: '3.5', fill: GOLD }, svg);
    svgEl('path', { d: 'M8 20 C18 9, 34 9, 44 20', fill: 'none', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('repeat', (svg, { svgEl, GOLD }) => {
    svgEl('line', { x1: '18', y1: '10', x2: '18', y2: '42', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '25', y1: '10', x2: '25', y2: '42', stroke: GOLD, 'stroke-width': '6', 'stroke-linecap': 'round' }, svg);
    svgEl('circle', { cx: '35', cy: '20', r: '3', fill: GOLD }, svg);
    svgEl('circle', { cx: '35', cy: '32', r: '3', fill: GOLD }, svg);
  });

  r.register('rest', r.drawers['quarter-rest']);
})();
