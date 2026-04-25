// assets/pages/arabic-music-intro/symbols/notation.js
(function () {
  const r = window.MUSICATEA_INTRO_SYMBOLS;
  if (!r) return;

  function drawStaffLines(svg, svgEl, GOLD, opacity = '0.55') {
    [12, 18, 24, 30, 36].forEach((y) => {
      svgEl('line', { x1: '6', y1: String(y), x2: '46', y2: String(y), stroke: GOLD, 'stroke-width': '1.35', opacity, 'stroke-linecap': 'round' }, svg);
    });
  }

  function drawNoteHead(svg, svgEl, GOLD, cx, cy, rx = 7.2, ry = 5.2) {
    svgEl('ellipse', { cx: String(cx), cy: String(cy), rx: String(rx), ry: String(ry), fill: GOLD, transform: `rotate(-18 ${cx} ${cy})` }, svg);
  }

  r.register('staff', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.78');
    drawNoteHead(svg, svgEl, GOLD, 29, 30, 6.4, 4.7);
    svgEl('line', { x1: '35', y1: '29', x2: '35', y2: '12', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round' }, svg);
  });

  r.register('treble-clef', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.28');
    svgEl('path', {
      d: 'M28 6 C19 13, 19 24, 29 28 C39 32, 38 43, 27 44 C17 45, 13 35, 21 30 C28 26, 35 30, 34 36 C33 42, 23 42, 23 36 M28 6 C34 16, 25 20, 25 31 C25 39, 30 45, 23 48',
      fill: 'none',
      stroke: GOLD,
      'stroke-width': '2.7',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, svg);
    svgEl('circle', { cx: '26', cy: '36', r: '2.4', fill: GOLD }, svg);
  });

  r.register('barline', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.55');
    svgEl('line', { x1: '24', y1: '9', x2: '24', y2: '39', stroke: GOLD, 'stroke-width': '2.8', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '31', y1: '9', x2: '31', y2: '39', stroke: GOLD, 'stroke-width': '1.5', opacity: '0.64', 'stroke-linecap': 'round' }, svg);
  });

  r.register('meter', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.25');
    svgEl('text', { x: '26', y: '24', fill: GOLD, 'font-size': '15', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
    svgEl('text', { x: '26', y: '40', fill: GOLD, 'font-size': '15', 'font-weight': '900', 'font-family': 'Cairo, sans-serif', 'text-anchor': 'middle' }, svg).textContent = '4';
  });

  r.register('quarter-note', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.22');
    drawNoteHead(svg, svgEl, GOLD, 23, 36, 7.5, 5.3);
    svgEl('line', { x1: '30', y1: '35', x2: '30', y2: '10', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('eighth-note', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.2');
    drawNoteHead(svg, svgEl, GOLD, 22, 36, 7.5, 5.2);
    svgEl('line', { x1: '29', y1: '35', x2: '29', y2: '11', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M29 11 C36 11, 42 15, 45 22 C39 20, 33 21, 29 25', fill: 'none', stroke: GOLD, 'stroke-width': '3.1', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  });

  r.register('beamed-notes', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.18');
    drawNoteHead(svg, svgEl, GOLD, 15, 36, 6.5, 4.8);
    drawNoteHead(svg, svgEl, GOLD, 34, 36, 6.5, 4.8);
    svgEl('line', { x1: '21', y1: '35', x2: '21', y2: '14', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '40', y1: '35', x2: '40', y2: '14', stroke: GOLD, 'stroke-width': '3', 'stroke-linecap': 'round' }, svg);
    svgEl('path', { d: 'M21 13 L40 13 L40 18 L21 18 Z', fill: GOLD }, svg);
  });

  r.register('quarter-rest', (svg, { svgEl, GOLD }) => {
    svgEl('path', {
      d: 'M28 8 L20 18 L29 27 L22 34 L30 44 M20 18 L31 20 M29 27 L18 26',
      fill: 'none',
      stroke: GOLD,
      'stroke-width': '4',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, svg);
  });

  r.register('eighth-rest', (svg, { svgEl, GOLD }) => {
    svgEl('circle', { cx: '21', cy: '17', r: '4.6', fill: GOLD }, svg);
    svgEl('path', { d: 'M25 18 C30 23, 34 27, 38 31 M38 31 C32 33, 29 38, 27 45', fill: 'none', stroke: GOLD, 'stroke-width': '4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('path', { d: 'M23 21 C27 23, 31 25, 36 27', fill: 'none', stroke: GOLD, 'stroke-width': '2.5', 'stroke-linecap': 'round', opacity: '0.72' }, svg);
  });

  r.register('tie', (svg, { svgEl, GOLD }) => {
    drawNoteHead(svg, svgEl, GOLD, 15, 32, 5, 3.8);
    drawNoteHead(svg, svgEl, GOLD, 37, 32, 5, 3.8);
    svgEl('path', { d: 'M10 24 C18 16, 34 16, 42 24', fill: 'none', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('slur', (svg, { svgEl, GOLD }) => {
    drawNoteHead(svg, svgEl, GOLD, 13, 34, 4.6, 3.5);
    drawNoteHead(svg, svgEl, GOLD, 26, 28, 4.6, 3.5);
    drawNoteHead(svg, svgEl, GOLD, 39, 34, 4.6, 3.5);
    svgEl('path', { d: 'M8 20 C18 9, 34 9, 44 20', fill: 'none', stroke: GOLD, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, svg);
  });

  r.register('repeat', (svg, { svgEl, GOLD }) => {
    drawStaffLines(svg, svgEl, GOLD, '0.26');
    svgEl('line', { x1: '17', y1: '10', x2: '17', y2: '42', stroke: GOLD, 'stroke-width': '2.4', 'stroke-linecap': 'round' }, svg);
    svgEl('line', { x1: '24', y1: '10', x2: '24', y2: '42', stroke: GOLD, 'stroke-width': '5.2', 'stroke-linecap': 'round' }, svg);
    svgEl('circle', { cx: '34', cy: '20', r: '3', fill: GOLD }, svg);
    svgEl('circle', { cx: '34', cy: '32', r: '3', fill: GOLD }, svg);
  });

  r.register('rest', r.drawers['quarter-rest']);
})();
