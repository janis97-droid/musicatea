// assets/pages/arabic-music-intro/symbols/practice.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  r.register('notation', (svg, { svgEl, GOLD }) => {
    [13, 19, 25, 31, 37].forEach((y) => {
      svgEl('line', { x1: '8', y1: String(y), x2: '44', y2: String(y), stroke: GOLD, 'stroke-width': '1.6', opacity: '0.62', 'stroke-linecap': 'round' }, svg);
    });
    svgEl('ellipse', { cx: '23', cy: '31', rx: '6.6', ry: '4.8', fill: GOLD, transform: 'rotate(-18 23 31)' }, svg);
    svgEl('line', { x1: '29', y1: '30', x2: '29', y2: '13', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M33 13 C38 14, 41 17, 43 22', fill: 'none', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round' }, svg);
  });

  r.register('apply', (svg, { svgEl, GOLD }) => {
    svgEl('rect', { x: '11', y: '8', width: '30', height: '36', rx: '5', fill: 'none', stroke: GOLD, 'stroke-width': '2.7' }, svg);
    svgEl('line', { x1: '18', y1: '18', x2: '34', y2: '18', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '18', y1: '27', x2: '34', y2: '27', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '0.7' }, svg);
    svgEl('line', { x1: '18', y1: '36', x2: '29', y2: '36', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '0.7' }, svg);
    svgEl('circle', { cx: '40', cy: '40', r: '7', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '2' }, svg);
    svgEl('path', { d: 'M37 40 L39 43 L44 36', fill: 'none', stroke: GOLD, 'stroke-width': '2.3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });

  r.register('card-reading', (svg, helpers) => {
    r.drawers.apply(svg, helpers);
  });
})();
