// assets/pages/arabic-music-intro/symbols/rhythm.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  function drawMeter44(svg, { svgEl, GOLD }) {
    [13, 19, 25, 31, 37].forEach((y) => {
      svgEl('line', { x1: '8', y1: String(y), x2: '44', y2: String(y), stroke: GOLD, 'stroke-width': '1.15', opacity: '0.22', 'stroke-linecap': 'round' }, svg);
    });
    svgEl('text', { x: '26', y: '24', fill: GOLD, 'font-size': '17', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
    svgEl('text', { x: '26', y: '41', fill: GOLD, 'font-size': '17', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
  }

  r.register('dum', (svg, { svgEl, GOLD }) => {
    svgEl('circle', { cx: '26', cy: '26', r: '16', fill: 'none', stroke: GOLD, 'stroke-width': '4' }, svg);
    svgEl('circle', { cx: '26', cy: '26', r: '6', fill: GOLD, opacity: '0.88' }, svg);
    svgEl('text', { x: '26', y: '47', fill: GOLD, 'font-size': '9', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = 'دوم';
  });

  r.register('tak', (svg, { svgEl, GOLD }) => {
    svgEl('circle', { cx: '26', cy: '26', r: '16', fill: 'none', stroke: GOLD, 'stroke-width': '2.6', opacity: '0.82' }, svg);
    svgEl('path', { d: 'M17 26 H35 M26 17 V35', stroke: GOLD, 'stroke-width': '3.4', 'stroke-linecap': 'round' }, svg);
    svgEl('text', { x: '26', y: '47', fill: GOLD, 'font-size': '9', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = 'تك';
  });

  r.register('pulse', (svg, { svgEl, GOLD }) => {
    [10, 18, 26, 34, 42].forEach((x, index) => {
      svgEl('line', { x1: String(x), y1: '18', x2: String(x), y2: index % 2 === 0 ? '38' : '33', stroke: GOLD, 'stroke-width': index === 0 ? '4' : '2.8', 'stroke-linecap': 'round', opacity: index === 0 ? '1' : '0.65' }, svg);
    });
    svgEl('path', { d: 'M8 43 H44', stroke: GOLD, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '0.38' }, svg);
  });

  r.register('meter', drawMeter44);
  r.register('meter-44', drawMeter44);
  r.register('rhythm', drawMeter44);

  r.register('rhythm-cycle', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M15 18 C22 9, 37 11, 41 22', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M41 22 L43 14 L35 17', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M37 34 C30 43, 15 41, 11 30', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M11 30 L9 38 L17 35', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '18', cy: '26', r: '3.2', fill: GOLD }, svg);
    svgEl('circle', { cx: '34', cy: '26', r: '3.2', fill: GOLD, opacity: '0.74' }, svg);
  });
})();
