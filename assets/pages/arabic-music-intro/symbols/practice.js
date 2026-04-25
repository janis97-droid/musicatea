// assets/pages/arabic-music-intro/symbols/practice.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  r.register('card-reading', (svg, { svgEl, GOLD }) => {
    svgEl('rect', { x: '11', y: '9', width: '30', height: '36', rx: '5', fill: 'none', stroke: GOLD, 'stroke-width': '2.8' }, svg);
    svgEl('line', { x1: '18', y1: '18', x2: '34', y2: '18', stroke: GOLD, 'stroke-width': '2.6', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '18', y1: '27', x2: '34', y2: '27', stroke: GOLD, 'stroke-width': '2.6', 'stroke-linecap': 'round', opacity: '0.72' }, svg);
    svgEl('line', { x1: '18', y1: '36', x2: '28', y2: '36', stroke: GOLD, 'stroke-width': '2.6', 'stroke-linecap': 'round', opacity: '0.72' }, svg);
    svgEl('circle', { cx: '40', cy: '40', r: '7', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '2' }, svg);
    svgEl('path', { d: 'M37 40 L39 43 L44 36', fill: 'none', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });
})();
