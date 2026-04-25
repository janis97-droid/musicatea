// assets/pages/arabic-music-intro/symbols/rhythm.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

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

  r.register('meter', (svg, { svgEl, GOLD }) => {
    svgEl('rect', { x: '10', y: '8', width: '32', height: '36', rx: '7', fill: 'none', stroke: GOLD, 'stroke-width': '2.4', opacity: '0.85' }, svg);
    svgEl('text', { x: '26', y: '22', fill: GOLD, 'font-size': '13', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
    svgEl('line', { x1: '17', y1: '26', x2: '35', y2: '26', stroke: GOLD, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '0.78' }, svg);
    svgEl('text', { x: '26', y: '40', fill: GOLD, 'font-size': '13', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
  });

  r.register('rhythm-cycle', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M15 18 C22 9, 37 11, 41 22', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M41 22 L43 14 L35 17', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M37 34 C30 43, 15 41, 11 30', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M11 30 L9 38 L17 35', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '18', cy: '26', r: '3.2', fill: GOLD }, svg);
    svgEl('circle', { cx: '34', cy: '26', r: '3.2', fill: GOLD, opacity: '0.74' }, svg);
  });
})();
