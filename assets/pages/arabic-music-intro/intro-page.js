// assets/pages/arabic-music-intro/intro-page.js
// Renders the modular Arabic music intro page.
(function () {
  const data = window.ARABIC_MUSIC_INTRO_DATA;
  const symbols = window.MUSICATEA_INTRO_SYMBOLS;
  const root = document.getElementById('intro-page-root');

  if (!data || !root) return;

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function renderUiIcon(type) {
    const icon = el('span', 'intro-ui-icon');
    const drawer = symbols && symbols.drawers && symbols.drawers[type];

    if (drawer && symbols.svgEl) {
      const svg = symbols.svgEl('svg', { viewBox: '0 0 52 52', role: 'img', 'aria-hidden': 'true' }, icon);
      drawer(svg, symbols);
      return icon.outerHTML;
    }

    icon.innerHTML = '<span class="intro-ui-icon-fallback">♪</span>';
    return icon.outerHTML;
  }

  function renderHero() {
    const hero = el('header', 'intro-hero');
    const parts = [];

    if (data.hero && data.hero.tag) {
      parts.push(`<span class="intro-tag">${data.hero.tag}</span>`);
    }

    parts.push(`<h1>${data.hero && data.hero.title ? data.hero.title : 'المدخل إلى الموسيقى العربية'}</h1>`);

    if (data.hero && data.hero.description) {
      parts.push(`<p>${data.hero.description}</p>`);
    }

    hero.innerHTML = parts.join('');
    root.appendChild(hero);
  }

  function renderQuickLinks() {
    if (!Array.isArray(data.quickLinks) || !data.quickLinks.length) return;

    const wrap = el('nav', 'intro-quick-links');
    wrap.setAttribute('aria-label', 'روابط داخلية');

    data.quickLinks.forEach((link) => {
      const a = el('a', 'intro-pill');
      a.href = link.href;
      a.textContent = link.label;
      wrap.appendChild(a);
    });

    root.appendChild(wrap);
  }

  function renderMobileMiniNav() {
    if (!Array.isArray(data.quickLinks) || !data.quickLinks.length) return;

    const nav = el('nav', 'intro-mini-nav');
    nav.setAttribute('aria-label', 'تنقل سريع في صفحة المدخل');

    data.quickLinks.forEach((link) => {
      const a = el('a');
      a.href = link.href;
      a.textContent = link.label.replace('مسار التعلّم', 'المسار').replace('رموز النوتة', 'الرموز');
      nav.appendChild(a);
    });

    root.appendChild(nav);
  }

  function renderLearningPath() {
    if (!Array.isArray(data.learningPath) || !data.learningPath.length) return;

    const section = el('section', 'intro-learning-path');
    section.id = 'beginner-path-section';
    section.setAttribute('aria-labelledby', 'intro-learning-path-title');

    const cards = data.learningPath.map((item) => `
      <a class="intro-path-card" href="${item.href}">
        ${renderUiIcon(item.icon)}
        <span class="intro-step">${item.step}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </a>
    `).join('');

    section.innerHTML = `
      <div class="intro-learning-head">
        <span class="intro-kicker">خريطة للمبتدئ</span>
        <h2 id="intro-learning-path-title">كيف تستخدم هذا المدخل؟</h2>
        <p>لا تبدأ بحفظ كل المصطلحات. اتبع هذا المسار: افهم الرمز، ثم معنى المقام، ثم الإيقاع، ثم طبّق ذلك على نوتة حقيقية.</p>
      </div>
      <div class="intro-path-grid">${cards}</div>
    `;

    root.appendChild(section);
  }

  function renderSectionMap() {
    if (!Array.isArray(data.sectionMap) || !data.sectionMap.length) return;

    const section = el('section', 'intro-section-map');
    section.setAttribute('aria-labelledby', 'intro-section-map-title');

    const cards = data.sectionMap.map((item) => `
      <a href="${item.href}" class="intro-map-card">
        ${renderUiIcon(item.icon)}
        <div><strong>${item.title}</strong><span>${item.text}</span></div>
      </a>
    `).join('');

    section.innerHTML = `
      <div class="intro-map-head">
        <h2 id="intro-section-map-title">اختر ما تريد فهمه الآن</h2>
        <p>هذه الصفحة طويلة بطبيعتها. استخدم هذه البطاقات كمدخل سريع، ثم افتح التفاصيل حسب حاجتك.</p>
      </div>
      <div class="intro-map-grid">${cards}</div>
    `;

    root.appendChild(section);
  }

  function renderGoal() {
    if (!data.goal || (!data.goal.title && !data.goal.text)) return;
    const strong = data.goal.title ? `<strong>${data.goal.title}</strong> ` : '';
    root.appendChild(el('div', 'intro-note', `${strong}${data.goal.text || ''}`));
  }

  function renderCard(entry) {
    const card = el('article', 'intro-term-card');

    if (entry.symbol) {
      card.dataset.symbol = entry.symbol;
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

  function renderFocusNotes(section) {
    if (!Array.isArray(section.focus) || !section.focus.length) return null;

    const focus = el('aside', 'intro-focus-box');
    const items = section.focus.map((item) => `<li>${item}</li>`).join('');
    focus.innerHTML = `<strong>ركّز هنا</strong><ul>${items}</ul>`;
    return focus;
  }

  function renderExercise(section) {
    if (!data.showExercises) return null;

    const exercise = section.exercise;
    if (!exercise || !Array.isArray(exercise.steps) || !exercise.steps.length) return null;

    const box = el('aside', 'intro-exercise-box');
    const steps = exercise.steps.map((step, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${step}</p></li>`).join('');
    box.innerHTML = `
      <div class="intro-exercise-head">
        <span>تمرين قصير</span>
        <h3>${exercise.title}</h3>
        <p>${exercise.intro || ''}</p>
      </div>
      <ol>${steps}</ol>
      ${exercise.result ? `<p class="intro-exercise-result"><strong>النتيجة:</strong> ${exercise.result}</p>` : ''}
    `;
    return box;
  }

  function renderBody() {
    if (!Array.isArray(data.sections) || !data.sections.length) return;

    const stack = el('div', 'intro-stack');

    data.sections.forEach((section, sectionIndex) => {
      const sectionEl = el('section', 'intro-section');
      sectionEl.id = section.id;
      sectionEl.setAttribute('aria-labelledby', `${section.id}-title`);

      const head = el('div', 'intro-section-head');
      head.innerHTML = `<h2 id="${section.id}-title">${section.title}</h2><p>${section.description}</p>`;
      sectionEl.appendChild(head);

      const focus = renderFocusNotes(section);
      if (focus) sectionEl.appendChild(focus);

      const sub = el('div', 'intro-subsections');

      (section.groups || []).forEach((group, groupIndex) => {
        const shouldOpen = !!group.open || (sectionIndex === 0 && groupIndex === 0);
        const item = el('div', `intro-acc-item${shouldOpen ? ' is-open' : ''}`);
        const trigger = el('button', 'intro-acc-trigger');
        trigger.type = 'button';
        trigger.setAttribute('aria-expanded', String(shouldOpen));
        trigger.innerHTML = `<span>${group.title}</span><span>⌄</span>`;

        const panel = el('div', 'intro-acc-panel');
        if (!shouldOpen) panel.hidden = true;

        const grid = el('div', 'intro-term-grid');
        (group.items || []).forEach((entry) => grid.appendChild(renderCard(entry)));
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

      const exercise = renderExercise(section);
      if (exercise) sectionEl.appendChild(exercise);

      stack.appendChild(sectionEl);
    });

    root.appendChild(stack);
  }

  function renderNextCards() {
    if (!Array.isArray(data.nextCards) || !data.nextCards.length) return;

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

  renderHero();
  renderQuickLinks();
  renderMobileMiniNav();
  renderLearningPath();
  renderSectionMap();
  renderGoal();
  renderBody();
  renderNextCards();

  if (symbols && typeof symbols.drawAll === 'function') {
    symbols.drawAll();
  }
})();
