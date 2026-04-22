(function () {
  const data = window.ARABIC_MUSIC_INTRO_DATA;
  if (!data) return;

  const root = document.getElementById('intro-page-root');
  if (!root) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SYMBOL_COLOR = '#f0d28a';
  const STROKE = 2.2;

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function svgEl(tag, attrs, parent) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.appendChild(node);
    return node;
  }

  function line(parent, x1, y1, x2, y2, extra = {}) {
    return svgEl('line', {
      x1, y1, x2, y2,
      stroke: SYMBOL_COLOR,
      'stroke-width': STROKE,
      'stroke-linecap': 'round',
      ...extra
    }, parent);
  }

  function circle(parent, cx, cy, r, extra = {}) {
    return svgEl('circle', {
      cx, cy, r,
      fill: 'none',
      stroke: SYMBOL_COLOR,
      'stroke-width': STROKE,
      ...extra
    }, parent);
  }

  function rect(parent, x, y, width, height, extra = {}) {
    return svgEl('rect', {
      x, y, width, height,
      fill: 'none',
      stroke: SYMBOL_COLOR,
      'stroke-width': STROKE,
      rx: 3,
      ry: 3,
      ...extra
    }, parent);
  }

  function path(parent, d, extra = {}) {
    return svgEl('path', {
      d,
      fill: 'none',
      stroke: SYMBOL_COLOR,
      'stroke-width': STROKE,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      ...extra
    }, parent);
  }

  function filledCircle(parent, cx, cy, r, extra = {}) {
    return svgEl('circle', { cx, cy, r, fill: SYMBOL_COLOR, ...extra }, parent);
  }

  function staff(parent, yStart = 14, gap = 6, x1 = 6, x2 = 46) {
    for (let i = 0; i < 5; i += 1) {
      line(parent, x1, yStart + i * gap, x2, yStart + i * gap, { 'stroke-width': 1.4, opacity: 0.95 });
    }
  }

  function noteHead(parent, cx, cy, rx = 5.8, ry = 4.3) {
    return svgEl('ellipse', {
      cx, cy, rx, ry,
      fill: SYMBOL_COLOR,
      transform: `rotate(-18 ${cx} ${cy})`
    }, parent);
  }

  function noteWithStem(parent, cx, cy, stemTopY = 10) {
    noteHead(parent, cx, cy);
    line(parent, cx + 4.6, cy - 1, cx + 4.6, stemTopY, { 'stroke-width': 2.5 });
  }

  function arrow(parent, x1, y1, x2, y2) {
    line(parent, x1, y1, x2, y2);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const size = 4.5;
    const a1 = angle - Math.PI / 7;
    const a2 = angle + Math.PI / 7;
    line(parent, x2, y2, x2 - Math.cos(a1) * size, y2 - Math.sin(a1) * size);
    line(parent, x2, y2, x2 - Math.cos(a2) * size, y2 - Math.sin(a2) * size);
  }

  function textGlyph(parent, value, x = 26, y = 27, size = 30) {
    svgEl('text', {
      x, y,
      fill: SYMBOL_COLOR,
      'font-size': size,
      'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle'
    }, parent).textContent = value;
  }

  function drawNotation(parent) {
    rect(parent, 7, 9, 38, 34, { rx: 5, ry: 5, opacity: 0.95 });
    staff(parent, 17, 4.5, 12, 40);
    noteWithStem(parent, 23, 30, 14);
    line(parent, 32, 18, 32, 38, { 'stroke-width': 1.4, opacity: 0.75 });
  }

  function drawStaff(parent) {
    staff(parent, 14, 6, 5, 47);
    line(parent, 40, 12, 40, 40, { 'stroke-width': 1.6, opacity: 0.75 });
  }

  function drawMelodicPhrase(parent) {
    staff(parent, 18, 5, 6, 46);
    path(parent, 'M8 33 C14 27, 18 20, 24 22 C29 24, 33 31, 39 27 C42 25, 44 21, 46 18');
    filledCircle(parent, 8, 33, 1.8);
    filledCircle(parent, 46, 18, 1.8);
  }

  function drawBeat(parent) {
    path(parent, 'M9 28 C12 20, 16 16, 20 16 C24 16, 28 20, 31 28');
    path(parent, 'M21 10 L21 19');
    filledCircle(parent, 21, 35, 3.6);
    filledCircle(parent, 21, 27, 2.2);
  }

  function drawTempo(parent) {
    circle(parent, 26, 29, 14);
    line(parent, 26, 29, 26, 18);
    line(parent, 26, 29, 35, 24);
    line(parent, 11, 14, 15, 9);
    line(parent, 37, 9, 41, 14);
  }

  function drawImprovisation(parent) {
    path(parent, 'M8 34 C12 18, 18 14, 24 22 C28 28, 33 31, 38 20 C40 16, 42 14, 45 16');
    arrow(parent, 31, 31, 44, 17);
  }

  function drawTaqsim(parent) {
    noteWithStem(parent, 14, 34, 14);
    noteWithStem(parent, 26, 28, 10);
    noteWithStem(parent, 38, 34, 15);
    path(parent, 'M11 14 C17 8, 28 8, 41 14', { opacity: 0.9 });
  }

  function drawMaqam(parent) {
    staff(parent, 15, 5.3, 6, 46);
    noteWithStem(parent, 14, 36, 18);
    noteWithStem(parent, 24, 31, 13);
    noteWithStem(parent, 34, 26, 8);
    noteWithStem(parent, 42, 21, 10);
    path(parent, 'M8 40 C18 38, 26 32, 42 22', { opacity: 0.7 });
  }

  function drawJins(parent) {
    staff(parent, 18, 5.3, 8, 44);
    noteWithStem(parent, 14, 34, 17);
    noteWithStem(parent, 24, 30, 13);
    noteWithStem(parent, 34, 26, 9);
    rect(parent, 9, 11, 30, 30, { rx: 6, ry: 6, opacity: 0.35 });
  }

  function drawQarar(parent) {
    staff(parent, 16, 5.3, 6, 46);
    noteWithStem(parent, 18, 37, 13);
    circle(parent, 18, 37, 9, { opacity: 0.5 });
    path(parent, 'M28 17 C33 18, 37 21, 41 26');
  }

  function drawGhammaz(parent) {
    staff(parent, 16, 5.3, 6, 46);
    noteWithStem(parent, 18, 37, 13);
    noteWithStem(parent, 34, 27, 8);
    circle(parent, 34, 27, 9, { opacity: 0.5 });
    path(parent, 'M23 35 C27 32, 30 30, 34 27');
  }

  function drawTonalCenter(parent) {
    circle(parent, 26, 26, 14);
    filledCircle(parent, 26, 26, 3.2);
    path(parent, 'M8 26 H16');
    path(parent, 'M36 26 H44');
    path(parent, 'M26 8 V16');
    path(parent, 'M26 36 V44');
  }

  function drawModulation(parent) {
    noteWithStem(parent, 12, 34, 14);
    noteWithStem(parent, 38, 20, 8);
    arrow(parent, 18, 30, 32, 22);
  }

  function drawPath(parent) {
    path(parent, 'M8 37 C13 33, 15 22, 21 22 C27 22, 29 34, 35 34 C39 34, 43 28, 45 16');
    arrow(parent, 36, 32, 45, 16);
  }

  function drawRestingPoint(parent) {
    path(parent, 'M8 25 C15 18, 21 16, 26 24 C31 31, 36 31, 44 21');
    filledCircle(parent, 26, 24, 3.2);
    circle(parent, 26, 24, 9, { opacity: 0.5 });
  }

  function drawMaqamCharacter(parent) {
    path(parent, 'M10 35 C14 19, 22 13, 28 18 C32 21, 36 27, 42 17');
    path(parent, 'M11 14 C15 10, 19 10, 22 13');
    path(parent, 'M30 14 C34 9, 39 10, 43 15');
  }

  function drawMicrotone(parent) {
    line(parent, 12, 14, 12, 38);
    line(parent, 22, 12, 22, 36);
    line(parent, 12, 21, 22, 18);
    line(parent, 12, 30, 22, 27);
    line(parent, 33, 14, 33, 37);
    line(parent, 26, 22, 40, 19);
    line(parent, 26, 30, 39, 27);
  }

  function drawRhythm(parent) {
    filledCircle(parent, 12, 26, 4);
    filledCircle(parent, 24, 18, 3);
    filledCircle(parent, 36, 30, 3.4);
    path(parent, 'M8 39 C16 31, 22 27, 29 23 C34 20, 39 18, 44 12');
  }

  function drawCycle(parent) {
    circle(parent, 26, 26, 15);
    arrow(parent, 26, 11, 39, 17);
    filledCircle(parent, 26, 11, 2.4);
  }

  function drawDum(parent) {
    circle(parent, 20, 28, 10);
    filledCircle(parent, 20, 28, 5.4);
    path(parent, 'M33 18 L43 12');
    path(parent, 'M33 38 L43 44');
  }

  function drawTak(parent) {
    rect(parent, 13, 16, 18, 18, { rx: 4, ry: 4 });
    line(parent, 31, 17, 41, 11);
    line(parent, 31, 33, 41, 39);
    filledCircle(parent, 22, 25, 2.2);
  }

  function drawSilence(parent) {
    path(parent, 'M12 12 C17 18, 22 21, 27 24');
    path(parent, 'M27 24 C32 27, 36 31, 40 40');
    line(parent, 10, 42, 42, 10, { opacity: 0.55 });
  }

  function drawSimpleTime(parent) {
    rect(parent, 11, 12, 11, 28, { rx: 2, ry: 2 });
    rect(parent, 30, 12, 11, 28, { rx: 2, ry: 2 });
    line(parent, 26, 12, 26, 40, { opacity: 0.45, 'stroke-dasharray': '2 3' });
  }

  function drawCompoundTime(parent) {
    rect(parent, 7, 12, 9, 28, { rx: 2, ry: 2 });
    rect(parent, 21, 12, 9, 28, { rx: 2, ry: 2 });
    rect(parent, 35, 12, 9, 28, { rx: 2, ry: 2 });
  }

  function drawMetered(parent) {
    rect(parent, 9, 12, 34, 28, { rx: 4, ry: 4 });
    line(parent, 20, 12, 20, 40);
    line(parent, 31, 12, 31, 40);
    filledCircle(parent, 14.5, 26, 2.2);
    filledCircle(parent, 25.5, 26, 2.2);
    filledCircle(parent, 36.5, 26, 2.2);
  }

  function drawUnmetered(parent) {
    path(parent, 'M8 35 C14 18, 20 14, 26 23 C31 31, 36 30, 44 15');
    path(parent, 'M10 10 C13 8, 16 8, 18 10');
    path(parent, 'M24 9 C27 7, 30 7, 32 9');
  }

  function drawTimeSignature(parent) {
    svgEl('text', {
      x: '26', y: '17', fill: SYMBOL_COLOR, 'font-size': '15', 'font-family': 'Cairo, sans-serif', 'font-weight': '800', 'text-anchor': 'middle'
    }, parent).textContent = '4';
    svgEl('text', {
      x: '26', y: '35', fill: SYMBOL_COLOR, 'font-size': '15', 'font-family': 'Cairo, sans-serif', 'font-weight': '800', 'text-anchor': 'middle'
    }, parent).textContent = '4';
    line(parent, 18, 24, 34, 24, { opacity: 0.45 });
  }

  function drawClef(parent) {
    textGlyph(parent, '𝄞', 26, 27, 34);
  }

  function drawRest(parent) {
    textGlyph(parent, '𝄽', 26, 27, 34);
  }

  function drawBarline(parent) {
    staff(parent, 16, 5.3, 5, 47);
    line(parent, 25, 14, 25, 39, { 'stroke-width': 2.8 });
  }

  function drawDot(parent) {
    noteWithStem(parent, 20, 30, 10);
    filledCircle(parent, 34, 30, 2.2);
  }

  function drawFlat(parent) {
    const g = svgEl('g', { transform: 'translate(6,4) scale(0.060,0.060)' }, parent);
    svgEl('path', { d: 'M200.438,214.712V0h-71.18v512c0,0,170.389-50.606,236.182-162.99C424.052,248.893,324.927,139.024,200.438,214.712z M300.508,302.609c-6.37,82.823-100.117,126.984-100.117,126.984v-156.27C239.449,239.14,305.394,239.14,300.508,302.609z', fill: SYMBOL_COLOR }, g);
  }

  function drawHalfFlat(parent) {
    drawFlat(parent);
    svgEl('rect', { x: '8', y: '17', width: '22', height: '4', rx: '2', fill: SYMBOL_COLOR }, parent);
  }

  function drawSharp(parent) {
    const g = svgEl('g', { transform: 'translate(10,12) scale(0.046,0.046)' }, parent);
    svgEl('path', { d: 'M418.562,173.34c5.999-1.291,10.281-6.582,10.281-12.724V103.86c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.425-10.912-2.6l-51.621,11.093V30.884c0-3.856-1.713-7.515-4.672-9.99c-2.964-2.475-6.869-3.507-10.662-2.816l-38.686,7.013c-6.192,1.121-10.694,6.51-10.694,12.805v78.242l-80.658,17.333V64.117c0-3.856-1.713-7.514-4.672-9.99c-2.958-2.475-6.864-3.506-10.662-2.816l-38.69,7.004c-6.192,1.12-10.693,6.511-10.693,12.806v76.25l-57.948,12.456c-5.999,1.282-10.281,6.59-10.281,12.724v56.756c0,3.927,1.776,7.649,4.834,10.124c3.062,2.466,7.07,3.426,10.917,2.601l52.478-11.281v108.39l-57.948,12.456c-5.999,1.282-10.281,6.582-10.281,12.715v56.737c0,3.928,1.776,7.649,4.834,10.125c3.062,2.466,7.07,3.425,10.917,2.6l52.478-11.281v76.492c0,3.856,1.712,7.515,4.672,9.99c2.959,2.476,6.864,3.507,10.662,2.816l38.686-6.995c6.192-1.12,10.698-6.51,10.698-12.805v-83.397l80.658-17.334v74.502c0,3.865,1.712,7.524,4.672,9.99c2.96,2.475,6.865,3.506,10.662,2.815l38.686-7.004c6.192-1.121,10.694-6.51,10.694-12.805V377.35l57.087-12.267c5.999-1.291,10.281-6.582,10.281-12.724v-56.729c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.426-10.912-2.6l-51.621,11.093v-108.39L418.562,173.34z M296.761,307.906l-80.658,17.326V216.85l80.658-17.334V307.906z', fill: SYMBOL_COLOR }, g);
  }

  function drawHalfSharp(parent) {
    const g = svgEl('g', { transform: 'translate(12,12)' }, parent);
    line(g, 0, -10, 0, 10, { 'stroke-width': 3.1 });
    line(g, -7, -4, 8, -7, { 'stroke-width': 3.1 });
    line(g, -7, 6, 7, 3, { 'stroke-width': 3.1 });
  }

  function drawNatural(parent) {
    line(parent, 18, 9, 18, 39, { 'stroke-width': 3.2 });
    line(parent, 33, 13, 33, 43, { 'stroke-width': 3.2 });
    line(parent, 18, 24, 33, 20, { 'stroke-width': 3.2 });
    line(parent, 18, 33, 33, 29, { 'stroke-width': 3.2 });
  }

  function drawQuarterNote(parent) {
    noteWithStem(parent, 23, 36, 10);
  }

  function drawEighthNote(parent) {
    noteHead(parent, 26, 36);
    line(parent, 31, 35, 31, 11, { 'stroke-width': 3.2 });
    path(parent, 'M31 11 C36 12, 40 16, 41 22 C37 20, 34 20, 30 22', { 'stroke-width': 3 });
  }

  function drawQuarterRest(parent) {
    textGlyph(parent, '𝄽', 26, 27, 34);
  }

  function drawBeamedNotes(parent) {
    noteHead(parent, 15, 36);
    noteHead(parent, 33, 36);
    line(parent, 20, 35, 20, 14, { 'stroke-width': 3.1 });
    line(parent, 38, 35, 38, 14, { 'stroke-width': 3.1 });
    svgEl('rect', { x: '20', y: '12', width: '18', height: '4.5', rx: '2', fill: SYMBOL_COLOR }, parent);
  }

  function drawTie(parent) {
    path(parent, 'M8 31 C18 20, 34 20, 44 31', { 'stroke-width': 3.2 });
    filledCircle(parent, 11, 33, 4.5, { opacity: 0.95 });
    filledCircle(parent, 41, 33, 4.5, { opacity: 0.95 });
  }

  function drawSlur(parent) {
    path(parent, 'M6 18 C16 8, 36 8, 46 18', { 'stroke-width': 3.2 });
    filledCircle(parent, 10, 34, 3.9);
    filledCircle(parent, 24, 29, 3.9);
    filledCircle(parent, 38, 34, 3.9);
  }

  function drawRepeat(parent) {
    line(parent, 17, 10, 17, 42, { 'stroke-width': 3 });
    line(parent, 24, 10, 24, 42, { 'stroke-width': 6 });
    filledCircle(parent, 32, 20, 2.6);
    filledCircle(parent, 32, 32, 2.6);
  }

  const titleToSymbol = {
    'التدوين الموسيقي': 'notation',
    'النغمة': 'note-basic',
    'المدرج الموسيقي': 'staff',
    'المازورة': 'measure',
    'النبضة': 'beat',
    'السرعة (Tempo)': 'tempo',
    'الجملة اللحنية': 'phrase',
    'الارتجال': 'improvisation',
    'التقسيم': 'taqsim',
    'المقام': 'maqam',
    'الجنس': 'jins',
    'القرار': 'qarar',
    'الغمّاز': 'ghammaz',
    'المركز اللحني': 'tonal-center',
    'التحويل': 'modulation',
    'المسار اللحني / السير': 'melodic-path',
    'الاستقرار / الركوز': 'resting-point',
    'الطابع المقامي': 'maqam-character',
    'الميكروتون': 'microtone',
    'الإيقاع': 'rhythm',
    'النبض': 'pulse',
    'الدورة الإيقاعية': 'cycle',
    'الدم': 'dum',
    'التك': 'tak',
    'السكتة': 'silence',
    'الزمن البسيط': 'simple-time',
    'الزمن المركب': 'compound-time',
    'الإيقاع الموزون': 'metered',
    'الإيقاع غير الموزون': 'unmetered',
    'الميزان': 'time-signature',
    'المفتاح': 'clef',
    'خط المازورة': 'barline',
    'النقطة الإضافية': 'dot'
  };

  const drawMap = {
    notation: drawNotation,
    'note-basic': drawQuarterNote,
    staff: drawStaff,
    measure: drawBarline,
    beat: drawBeat,
    tempo: drawTempo,
    phrase: drawMelodicPhrase,
    improvisation: drawImprovisation,
    taqsim: drawTaqsim,
    maqam: drawMaqam,
    jins: drawJins,
    qarar: drawQarar,
    ghammaz: drawGhammaz,
    'tonal-center': drawTonalCenter,
    modulation: drawModulation,
    'melodic-path': drawPath,
    'resting-point': drawRestingPoint,
    'maqam-character': drawMaqamCharacter,
    microtone: drawMicrotone,
    rhythm: drawRhythm,
    pulse: drawBeat,
    cycle: drawCycle,
    dum: drawDum,
    tak: drawTak,
    silence: drawSilence,
    'simple-time': drawSimpleTime,
    'compound-time': drawCompoundTime,
    metered: drawMetered,
    unmetered: drawUnmetered,
    'time-signature': drawTimeSignature,
    clef: drawClef,
    rest: drawRest,
    barline: drawBarline,
    dot: drawDot,
    flat: drawFlat,
    sharp: drawSharp,
    natural: drawNatural,
    'half-flat': drawHalfFlat,
    'half-sharp': drawHalfSharp,
    'quarter-note': drawQuarterNote,
    'eighth-note': drawEighthNote,
    'quarter-rest': drawQuarterRest,
    'beamed-notes': drawBeamedNotes,
    tie: drawTie,
    slur: drawSlur,
    repeat: drawRepeat
  };

  function resolveSymbol(entry) {
    return entry.symbol || titleToSymbol[entry.title] || null;
  }

  function renderBody() {
    const stack = el('div', 'intro-stack');

    data.sections.forEach((section) => {
      const sectionEl = el('section', 'intro-section');
      sectionEl.id = section.id;
      sectionEl.setAttribute('aria-labelledby', `${section.id}-title`);

      const head = el('div', 'intro-section-head');
      head.innerHTML = `<h2 id="${section.id}-title" style="color: var(--gold-light);">${section.title}</h2><p>${section.description}</p>`;
      sectionEl.appendChild(head);

      const sub = el('div', 'intro-subsections');

      section.groups.forEach((group) => {
        const item = el('div', `intro-acc-item${group.open ? ' is-open' : ''}`);
        const trigger = el('button', 'intro-acc-trigger');
        trigger.type = 'button';
        trigger.setAttribute('aria-expanded', group.open ? 'true' : 'false');
        trigger.innerHTML = `<span>${group.title}</span><span>⌄</span>`;

        const panel = el('div', 'intro-acc-panel');
        if (!group.open) panel.hidden = true;

        const grid = el('div', 'intro-term-grid');
        group.items.forEach((entry) => grid.appendChild(renderCard(entry)));
        panel.appendChild(grid);

        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          item.classList.toggle('is-open', !isOpen);
          trigger.setAttribute('aria-expanded', String(!isOpen));
          panel.hidden = isOpen;
        });

        item.appendChild(trigger);
        item.appendChild(panel);
        sub.appendChild(item);
      });

      sectionEl.appendChild(sub);
      stack.appendChild(sectionEl);
    });

    root.appendChild(stack);
  }

  function renderCard(entry) {
    const card = el('article', 'intro-term-card');
    const symbolType = resolveSymbol(entry);
    if (symbolType) card.dataset.symbol = symbolType;

    if (symbolType) {
      const visual = el('div', 'intro-symbol-visual');
      visual.setAttribute('aria-hidden', 'true');
      card.appendChild(visual);
    }

    const title = el('h3');
    title.textContent = entry.title;
    card.appendChild(title);

    (entry.body || []).forEach((paragraph) => {
      const p = el('p');
      p.innerHTML = paragraph;
      card.appendChild(p);
    });

    return card;
  }

  function renderNextCards() {
    const section = el('section', 'intro-next');
    section.id = 'next-section';
    section.setAttribute('aria-label', 'إلى أين بعد ذلك');

    data.nextCards.forEach((card) => {
      const article = el('article', 'intro-next-card');
      article.innerHTML = `<h3>${card.title}</h3><p>${card.description}</p><a href="${card.href}">${card.cta}</a>`;
      section.appendChild(article);
    });

    root.appendChild(section);
  }

  function renderSymbols() {
    document.querySelectorAll('.intro-term-card[data-symbol]').forEach((card) => {
      const type = card.dataset.symbol;
      const slot = card.querySelector('.intro-symbol-visual');
      const draw = drawMap[type];
      if (!slot || !draw) return;
      const svg = svgEl('svg', { viewBox: '0 0 52 52', role: 'img', 'aria-hidden': 'true' }, slot);
      draw(svg);
    });
  }

  renderHero();
  renderQuickLinks();
  renderGoal();
  renderBody();
  renderNextCards();
  renderSymbols();
})();