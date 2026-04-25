// assets/pages/arabic-music-intro/symbols/maqam.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  function drawGuide(svg, svgEl, GOLD) {
    [13, 19, 25, 31, 37].forEach((y) => {
      svgEl('line', { x1: '7', y1: String(y), x2: '45', y2: String(y), stroke: GOLD, 'stroke-width': '1.15', opacity: '0.2', 'stroke-linecap': 'round' }, svg);
    });
  }

  function drawCurve(svg, { svgEl, GOLD }) {
    drawGuide(svg, svgEl, GOLD);
    svgEl('path', { d: 'M8 39 C15 21, 25 33, 32 18 C38 5, 45 17, 49 9', fill: 'none', stroke: GOLD, 'stroke-width': '3.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '8', cy: '39', r: '3.2', fill: GOLD }, svg);
    svgEl('circle', { cx: '32', cy: '18', r: '3.2', fill: GOLD, opacity: '0.82' }, svg);
    svgEl('circle', { cx: '49', cy: '9', r: '3.2', fill: GOLD, opacity: '0.7' }, svg);
  }

  r.register('maqam', drawCurve);

  r.register('jins', (svg, { svgEl, GOLD }) => {
    drawGuide(svg, svgEl, GOLD);
    svgEl('path', { d: 'M11 39 L41 23', stroke: GOLD, 'stroke-width': '2.3', 'stroke-linecap': 'round', opacity: '0.45' }, svg);
    [12, 21, 30, 39].forEach((x, index) => {
      svgEl('circle', { cx: String(x), cy: String(36 - index * 5), r: index === 0 ? '4.2' : '3.6', fill: GOLD, opacity: index === 0 ? '1' : '0.78' }, svg);
    });
    svgEl('path', { d: 'M10 44 L42 44', stroke: GOLD, 'stroke-width': '2.3', 'stroke-linecap': 'round', opacity: '0.62' }, svg);
  });

  r.register('qarar', (svg, { svgEl, GOLD }) => {
    drawGuide(svg, svgEl, GOLD);
    [12, 20, 28, 36, 44].forEach((x) => svgEl('circle', { cx: String(x), cy: '30', r: '2.4', fill: GOLD, opacity: '0.28' }, svg));
    svgEl('circle', { cx: '12', cy: '30', r: '7.5', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '3' }, svg);
    svgEl('path', { d: 'M12 30 C20 16, 33 40, 43 20', fill: 'none', stroke: GOLD, 'stroke-width': '2.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M8 42 H24', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '0.75' }, svg);
  });

  r.register('ghammaz', (svg, { svgEl, GOLD }) => {
    drawGuide(svg, svgEl, GOLD);
    [10, 18, 26, 34, 42].forEach((x) => svgEl('circle', { cx: String(x), cy: '30', r: '2.4', fill: GOLD, opacity: '0.28' }, svg));
    svgEl('circle', { cx: '34', cy: '30', r: '7.4', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '3' }, svg);
    svgEl('path', { d: 'M11 39 C19 28, 27 23, 34 30 C40 37, 44 28, 47 20', fill: 'none', stroke: GOLD, 'stroke-width': '2.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M34 12 V20', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '0.7' }, svg);
  });

  r.register('sayr', (svg, { svgEl, GOLD }) => {
    drawGuide(svg, svgEl, GOLD);
    svgEl('path', { d: 'M8 38 C14 20, 22 22, 27 30 C32 38, 41 33, 46 13', fill: 'none', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M46 13 L47 22 L39 18', fill: 'none', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M9 43 L44 43', stroke: GOLD, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '0.32' }, svg);
  });

  function drawFlat(svg, { svgEl, GOLD }) {
    svgEl('path', { d: 'M22 8 V42', fill: 'none', stroke: GOLD, 'stroke-width': '4.2', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M22 28 C30 19, 42 23, 40 33 C38 43, 27 44, 22 42', fill: 'none', stroke: GOLD, 'stroke-width': '4.2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  }

  r.register('flat', drawFlat);

  r.register('half-flat', (svg, helpers) => {
    drawFlat(svg, helpers);
    helpers.svgEl('path', { d: 'M12 17 H35', stroke: helpers.GOLD, 'stroke-width': '4', 'stroke-linecap': 'round' }, svg);
  });

  r.register('sharp', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M20 10 V43 M33 8 V41', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M14 22 L39 17 M13 34 L38 29', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('half-sharp', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M26 10 V43', stroke: GOLD, 'stroke-width': '3.4', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M15 21 L38 16 M15 34 L37 29', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('natural', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M18 9 V39 M34 13 V43', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M18 24 L34 20 M18 33 L34 29', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });
})();
