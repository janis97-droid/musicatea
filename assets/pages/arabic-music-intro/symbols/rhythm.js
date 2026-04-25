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

  r.register('rhythm-cycle', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M15 18 C22 9, 37 11, 41 22', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M41 22 L43 14 L35 17', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M37 34 C30 43, 15 41, 11 30', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M11 30 L9 38 L17 35', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '18', cy: '26', r: '3.2', fill: GOLD }, svg);
    svgEl('circle', { cx: '34', cy: '26', r: '3.2', fill: GOLD, opacity: '0.74' }, svg);
  });
})();
