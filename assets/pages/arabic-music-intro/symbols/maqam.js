// assets/pages/arabic-music-intro/symbols/maqam.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  function drawCurve(svg, { svgEl, GOLD }) {
    svgEl('path', { d: 'M8 39 C16 20, 27 32, 33 17 C38 5, 47 16, 49 8', fill: 'none', stroke: GOLD, 'stroke-width': '3.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '8', cy: '39', r: '3.4', fill: GOLD }, svg);
    svgEl('circle', { cx: '33', cy: '17', r: '3.4', fill: GOLD, opacity: '0.82' }, svg);
    svgEl('circle', { cx: '49', cy: '8', r: '3.4', fill: GOLD, opacity: '0.7' }, svg);
  }

  r.register('maqam', drawCurve);

  r.register('jins', (svg, { svgEl, GOLD }) => {
    [12, 18, 24, 30, 36].forEach((y) => svgEl('line', { x1: '7', y1: String(y), x2: '45', y2: String(y), stroke: GOLD, 'stroke-width': '1.35', opacity: '0.42', 'stroke-linecap': 'round' }, svg));
    [13, 22, 31, 40].forEach((x, index) => {
      svgEl('circle', { cx: String(x), cy: String(34 - index * 5), r: '3.8', fill: GOLD, opacity: index === 0 ? '1' : '0.78' }, svg);
    });
    svgEl('path', { d: 'M12 42 L42 42', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '0.75' }, svg);
  });

  r.register('qarar', (svg, { svgEl, GOLD }) => {
    [13, 20, 27, 34, 41].forEach((x) => svgEl('circle', { cx: String(x), cy: '27', r: '2.8', fill: GOLD, opacity: '0.38' }, svg));
    svgEl('circle', { cx: '13', cy: '27', r: '7', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '3' }, svg);
    svgEl('path', { d: 'M13 27 C24 12, 35 37, 43 20', fill: 'none', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });

  r.register('ghammaz', (svg, { svgEl, GOLD }) => {
    [10, 18, 26, 34, 42].forEach((x) => svgEl('circle', { cx: String(x), cy: '30', r: '2.8', fill: GOLD, opacity: '0.38' }, svg));
    svgEl('circle', { cx: '34', cy: '30', r: '7', fill: 'rgba(240,210,138,0.18)', stroke: GOLD, 'stroke-width': '3' }, svg);
    svgEl('path', { d: 'M11 39 C20 28, 27 22, 34 30 C40 37, 44 28, 47 20', fill: 'none', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });

  r.register('sayr', (svg, { svgEl, GOLD }) => {
    svgEl('path', { d: 'M8 38 C14 20, 22 22, 27 30 C32 38, 41 33, 46 13', fill: 'none', stroke: GOLD, 'stroke-width': '3.4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M46 13 L47 22 L39 18', fill: 'none', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M9 42 L44 42', stroke: GOLD, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '0.36' }, svg);
  });

  function drawFlat(svg, { svgEl, GOLD }) {
    const g = svgEl('g', { transform: 'translate(6,4) scale(0.060,0.060)' }, svg);
    svgEl('path', { d: 'M200.438,214.712V0h-71.18v512c0,0,170.389-50.606,236.182-162.99C424.052,248.893,324.927,139.024,200.438,214.712z M300.508,302.609c-6.37,82.823-100.117,126.984-100.117,126.984v-156.27C239.449,239.14,305.394,239.14,300.508,302.609z', fill: GOLD }, g);
  }

  r.register('flat', drawFlat);

  r.register('half-flat', (svg, helpers) => {
    drawFlat(svg, helpers);
    helpers.svgEl('rect', { x: '8', y: '10', width: '34', height: '4', rx: '2', fill: helpers.GOLD }, svg);
  });

  r.register('sharp', (svg, { svgEl, GOLD }) => {
    const g = svgEl('g', { transform: 'translate(10,12) scale(0.046,0.046)' }, svg);
    svgEl('path', { d: 'M418.562,173.34c5.999-1.291,10.281-6.582,10.281-12.724V103.86c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.425-10.912-2.6l-51.621,11.093V30.884c0-3.856-1.713-7.515-4.672-9.99c-2.964-2.475-6.869-3.507-10.662-2.816l-38.686,7.013c-6.192,1.121-10.694,6.51-10.694,12.805v78.242l-80.658,17.333V64.117c0-3.856-1.713-7.514-4.672-9.99c-2.958-2.475-6.864-3.506-10.662-2.816l-38.69,7.004c-6.192,1.12-10.693,6.511-10.693,12.806v76.25l-57.948,12.456c-5.999,1.282-10.281,6.59-10.281,12.724v56.756c0,3.927,1.776,7.649,4.834,10.124c3.062,2.466,7.07,3.426,10.917,2.601l52.478-11.281v108.39l-57.948,12.456c-5.999,1.282-10.281,6.582-10.281,12.715v56.737c0,3.928,1.776,7.649,4.834,10.125c3.062,2.466,7.07,3.425,10.917,2.6l52.478-11.281v76.492c0,3.856,1.712,7.515,4.672,9.99c2.959,2.476,6.864,3.507,10.662,2.816l38.686-6.995c6.192-1.12,10.698-6.51,10.698-12.805v-83.397l80.658-17.334v74.502c0,3.865,1.712,7.524,4.672,9.99c2.96,2.475,6.865,3.506,10.662,2.815l38.686-7.004c6.192-1.121,10.694-6.51,10.694-12.805V377.35l57.087-12.267c5.999-1.291,10.281-6.582,10.281-12.724v-56.729c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.426-10.912-2.6l-51.621,11.093v-108.39L418.562,173.34z M296.761,307.906l-80.658,17.326V216.85l80.658-17.334V307.906z', fill: GOLD }, g);
  });

  r.register('half-sharp', (svg, { svgEl, GOLD }) => {
    const g = svgEl('g', { transform: 'translate(26,26)' }, svg);
    svgEl('line', { x1: '0', y1: '-16', x2: '0', y2: '16', stroke: GOLD, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, g);
    svgEl('line', { x1: '-11', y1: '-6', x2: '12', y2: '-10', stroke: GOLD, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, g);
    svgEl('line', { x1: '-11', y1: '9', x2: '11', y2: '5', stroke: GOLD, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, g);
  });

  r.register('natural', (svg, { svgEl, GOLD }) => {
    svgEl('line', { x1: '18', y1: '9', x2: '18', y2: '39', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '33', y1: '13', x2: '33', y2: '43', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '18', y1: '24', x2: '33', y2: '20', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '18', y1: '33', x2: '33', y2: '29', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });
})();
