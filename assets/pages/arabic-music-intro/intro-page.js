(function () {
  const data = window.ARABIC_MUSIC_INTRO_DATA;
  if (!data) return;

  const root = document.getElementById('intro-page-root');
  if (!root) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SYMBOL_COLOR = '#f0d28a';

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

  function renderHero() {
    const hero = el('header', 'intro-hero');
    hero.innerHTML = `
      <span class="intro-tag">${data.hero.tag}</span>
      <h1>${data.hero.title}</h1>
      <p>${data.hero.description}</p>
    `;
    root.appendChild(hero);
  }

  function renderQuickLinks() {
    const wrap = el('div', 'intro-quick-links');
    wrap.setAttribute('aria-label', 'روابط داخلية');
    data.quickLinks.forEach((link) => {
      const a = el('a', 'intro-pill');
      a.href = link.href;
      a.textContent = link.label;
      wrap.appendChild(a);
    });
    root.appendChild(wrap);
  }

  function renderGoal() {
    const note = el('div', 'intro-note', `<strong>${data.goal.title}</strong> ${data.goal.text}`);
    root.appendChild(note);
  }

  function renderBody() {
    const stack = el('div', 'intro-stack');

    data.sections.forEach((section) => {
      const sectionEl = el('section', 'intro-section');
      sectionEl.id = section.id;
      sectionEl.setAttribute('aria-labelledby', `${section.id}-title`);

      const head = el('div', 'intro-section-head');
      head.innerHTML = `<h2 id="${section.id}-title">${section.title}</h2><p>${section.description}</p>`;
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
    if (entry.symbol) card.dataset.symbol = entry.symbol;

    if (entry.symbol) {
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

  function drawFlat(parent) {
    const g = svgEl('g', { transform: 'translate(6,4) scale(0.060,0.060)' }, parent);
    svgEl('path', { d: 'M200.438,214.712V0h-71.18v512c0,0,170.389-50.606,236.182-162.99C424.052,248.893,324.927,139.024,200.438,214.712z M300.508,302.609c-6.37,82.823-100.117,126.984-100.117,126.984v-156.27C239.449,239.14,305.394,239.14,300.508,302.609z', fill: SYMBOL_COLOR }, g);
  }

  function drawHalfFlat(parent) {
    drawFlat(parent);
    svgEl('rect', { x: '8', y: '10', width: '34', height: '4', rx: '2', fill: SYMBOL_COLOR }, parent);
  }

  function drawSharp(parent) {
    const g = svgEl('g', { transform: 'translate(10,12) scale(0.046,0.046)' }, parent);
    svgEl('path', { d: 'M418.562,173.34c5.999-1.291,10.281-6.582,10.281-12.724V103.86c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.425-10.912-2.6l-51.621,11.093V30.884c0-3.856-1.713-7.515-4.672-9.99c-2.964-2.475-6.869-3.507-10.662-2.816l-38.686,7.013c-6.192,1.121-10.694,6.51-10.694,12.805v78.242l-80.658,17.333V64.117c0-3.856-1.713-7.514-4.672-9.99c-2.958-2.475-6.864-3.506-10.662-2.816l-38.69,7.004c-6.192,1.12-10.693,6.511-10.693,12.806v76.25l-57.948,12.456c-5.999,1.282-10.281,6.59-10.281,12.724v56.756c0,3.927,1.776,7.649,4.834,10.124c3.062,2.466,7.07,3.426,10.917,2.601l52.478-11.281v108.39l-57.948,12.456c-5.999,1.282-10.281,6.582-10.281,12.715v56.737c0,3.928,1.776,7.649,4.834,10.125c3.062,2.466,7.07,3.425,10.917,2.6l52.478-11.281v76.492c0,3.856,1.712,7.515,4.672,9.99c2.959,2.476,6.864,3.507,10.662,2.816l38.686-6.995c6.192-1.12,10.698-6.51,10.698-12.805v-83.397l80.658-17.334v74.502c0,3.865,1.712,7.524,4.672,9.99c2.96,2.475,6.865,3.506,10.662,2.815l38.686-7.004c6.192-1.121,10.694-6.51,10.694-12.805V377.35l57.087-12.267c5.999-1.291,10.281-6.582,10.281-12.724v-56.729c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.426-10.912-2.6l-51.621,11.093v-108.39L418.562,173.34z M296.761,307.906l-80.658,17.326V216.85l80.658-17.334V307.906z', fill: SYMBOL_COLOR }, g);
  }

  function drawHalfSharp(parent) {
    const g = svgEl('g', { transform: 'translate(12,12)' }, parent);
    svgEl('line', { x1: '0', y1: '-10', x2: '0', y2: '10', stroke: SYMBOL_COLOR, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, g);
    svgEl('line', { x1: '-7', y1: '-4', x2: '8', y2: '-7', stroke: SYMBOL_COLOR, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, g);
    svgEl('line', { x1: '-7', y1: '6', x2: '7', y2: '3', stroke: SYMBOL_COLOR, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, g);
  }

  function drawNatural(parent) {
    svgEl('line', { x1: '18', y1: '9', x2: '18', y2: '39', stroke: SYMBOL_COLOR, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, parent);
    svgEl('line', { x1: '33', y1: '13', x2: '33', y2: '43', stroke: SYMBOL_COLOR, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, parent);
    svgEl('line', { x1: '18', y1: '24', x2: '33', y2: '20', stroke: SYMBOL_COLOR, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, parent);
    svgEl('line', { x1: '18', y1: '33', x2: '33', y2: '29', stroke: SYMBOL_COLOR, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, parent);
  }

  function drawQuarterNote(parent) {
    svgEl('ellipse', { cx: '23', cy: '36', rx: '8', ry: '5.8', fill: SYMBOL_COLOR }, parent);
    svgEl('line', { x1: '31', y1: '36', x2: '31', y2: '10', stroke: SYMBOL_COLOR, 'stroke-width': '3.8', 'stroke-linecap': 'round' }, parent);
  }

  function drawEighthNote(parent) {
    svgEl('ellipse', { cx: '26', cy: '36', rx: '8', ry: '5.5', fill: SYMBOL_COLOR }, parent);
    svgEl('line', { x1: '41', y1: '36', x2: '41', y2: '12', stroke: SYMBOL_COLOR, 'stroke-width': '3.8', 'stroke-linecap': 'round' }, parent);
    svgEl('path', { d: 'M41 12 C45 13, 49 16, 51 21 C47 20, 43 20, 39 22', fill: 'none', stroke: SYMBOL_COLOR, 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
  }

  function drawQuarterRest(parent) {
    svgEl('text', { x: '26', y: '27', fill: SYMBOL_COLOR, 'font-size': '34', 'font-family': 'Bravura, Noto Music, Segoe UI Symbol, serif', 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, parent).textContent = '𝄽';
  }

  function drawBeamedNotes(parent) {
    svgEl('ellipse', { cx: '15', cy: '36', rx: '7.5', ry: '6.2', fill: SYMBOL_COLOR, transform: 'rotate(-20 15 36)' }, parent);
    svgEl('ellipse', { cx: '33', cy: '36', rx: '7.5', ry: '6.2', fill: SYMBOL_COLOR, transform: 'rotate(-20 33 36)' }, parent);
    svgEl('line', { x1: '20', y1: '35', x2: '20', y2: '14', stroke: SYMBOL_COLOR, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, parent);
    svgEl('line', { x1: '38', y1: '35', x2: '38', y2: '14', stroke: SYMBOL_COLOR, 'stroke-width': '3.1', 'stroke-linecap': 'round' }, parent);
    svgEl('rect', { x: '20', y: '12', width: '18', height: '4.5', rx: '2', fill: SYMBOL_COLOR }, parent);
  }

  function drawTie(parent) {
    svgEl('path', { d: 'M8 31 C18 20, 34 20, 44 31', fill: 'none', stroke: SYMBOL_COLOR, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, parent);
    svgEl('ellipse', { cx: '11', cy: '33', rx: '4.5', ry: '3.8', fill: SYMBOL_COLOR, opacity: '0.95' }, parent);
    svgEl('ellipse', { cx: '41', cy: '33', rx: '4.5', ry: '3.8', fill: SYMBOL_COLOR, opacity: '0.95' }, parent);
  }

  function drawSlur(parent) {
    svgEl('path', { d: 'M6 18 C16 8, 36 8, 46 18', fill: 'none', stroke: SYMBOL_COLOR, 'stroke-width': '3.2', 'stroke-linecap': 'round' }, parent);
    svgEl('ellipse', { cx: '10', cy: '34', rx: '4.8', ry: '3.9', fill: SYMBOL_COLOR }, parent);
    svgEl('ellipse', { cx: '24', cy: '29', rx: '4.8', ry: '3.9', fill: SYMBOL_COLOR }, parent);
    svgEl('ellipse', { cx: '38', cy: '34', rx: '4.8', ry: '3.9', fill: SYMBOL_COLOR }, parent);
  }

  function drawRepeat(parent) {
    svgEl('line', { x1: '17', y1: '10', x2: '17', y2: '42', stroke: SYMBOL_COLOR, 'stroke-width': '3' }, parent);
    svgEl('line', { x1: '24', y1: '10', x2: '24', y2: '42', stroke: SYMBOL_COLOR, 'stroke-width': '6' }, parent);
    svgEl('circle', { cx: '32', cy: '20', r: '2.6', fill: SYMBOL_COLOR }, parent);
    svgEl('circle', { cx: '32', cy: '32', r: '2.6', fill: SYMBOL_COLOR }, parent);
  }

  const drawMap = {
    flat: drawFlat,
    sharp: drawSharp,
    natural: drawNatural,
    'half-flat': drawHalfFlat,
    'half-sharp': drawHalfSharp,
    'quarter-note': drawQuarterNote,
    'eighth-note': drawEighthNote,
    'quarter-rest': drawQuarterRest,
    rest: drawQuarterRest,
    'beamed-notes': drawBeamedNotes,
    tie: drawTie,
    slur: drawSlur,
    repeat: drawRepeat
  };

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