// assets/pages/history/ui.js
// Shared history page helpers.

function getHistoryUiStrings() {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  return isEnglish
    ? {
        figuresLabel: 'Figures in this era',
        fallbackDescription: 'One of the figures associated with this musical era.',
        relatedSheetsLabel: 'From the sheet library',
        openSheet: 'Open sheet',
        openEraPage: 'Explore this era',
        eraPageHref: 'history-era-en.html',
        openPersonPage: 'Open full profile',
        personPageHref: 'person-en.html',
        shortIntro: 'Below you can see a brief overview of each era; inside each one you can explore the era and open detailed pages for its figures.',
        groupLabels: {
          roots: 'Roots and early formations',
          classical: 'Classical theory and urban music',
          andalusia: 'Al-Andalus and later traditions',
          modern: 'Nahda, documentation, and modernity',
          golden: 'Golden age and major figures',
          other: 'Other eras'
        }
      }
    : {
        figuresLabel: 'شخصيات هذه الحقبة',
        fallbackDescription: 'من الشخصيات المرتبطة بهذه الحقبة الموسيقية.',
        relatedSheetsLabel: 'من مكتبة النوتات',
        openSheet: 'فتح النوتة',
        openEraPage: 'استكشاف الحقبة',
        eraPageHref: 'history-era.html',
        openPersonPage: 'افتح صفحة الشخصية',
        personPageHref: 'person.html',
        shortIntro: 'هنا ترى لمحة مختصرة عن كل حقبة، وداخل كل حقبة يمكنك استكشاف تفاصيلها وفتح الصفحات الكاملة لشخصياتها.',
        groupLabels: {
          roots: 'الجذور والبدايات',
          classical: 'العصر الكلاسيكي والتدوين',
          andalusia: 'الأندلس والتقاليد اللاحقة',
          modern: 'النهضة والتوثيق والحداثة',
          golden: 'العصر الذهبي والشخصيات الكبرى',
          other: 'حقب أخرى'
        }
      };
}

function getHistoryIsEnglish() {
  return document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
}

function getHistoryCharacterRegistry() {
  if (globalThis.historyCharacters) return globalThis.historyCharacters;
  if (typeof createHistoryCharacterRegistry === 'function' && Array.isArray(globalThis.history)) {
    globalThis.historyCharacters = createHistoryCharacterRegistry(globalThis.history, { isEnglish: getHistoryIsEnglish() });
    return globalThis.historyCharacters;
  }
  return null;
}

function normalizeHistoryFigure(figure, era) {
  const ui = getHistoryUiStrings();
  const registry = getHistoryCharacterRegistry();
  const character = registry && typeof findHistoryCharacter === 'function'
    ? findHistoryCharacter(registry, typeof figure === 'string' ? figure : figure?.id || figure?.name)
    : null;

  if (character && typeof displayHistoryCharacter === 'function') {
    const display = displayHistoryCharacter(character, getHistoryIsEnglish());
    const sourceEntry = (character.era_entries || []).find((entry) => !era || entry.era_id === era.id) || character.era_entries?.[0] || null;
    return {
      id: display.id,
      name: display.name,
      role: display.role,
      years: display.years,
      description: display.description || ui.fallbackDescription,
      figureIndex: sourceEntry?.figure_index ?? 0,
      eraId: sourceEntry?.era_id || era?.id || ''
    };
  }

  if (typeof figure === 'string') {
    return {
      id: '',
      name: figure,
      role: '',
      years: '',
      description: ui.fallbackDescription,
      figureIndex: 0,
      eraId: era?.id || ''
    };
  }

  return {
    id: figure?.id || '',
    name: figure?.name || '',
    role: figure?.role || '',
    years: figure?.years || '',
    description: figure?.description || ui.fallbackDescription,
    figureIndex: 0,
    eraId: era?.id || ''
  };
}

function getHistoryFiguresForEra(era) {
  const registry = getHistoryCharacterRegistry();
  if (registry && typeof getHistoryCharactersForEra === 'function' && typeof displayHistoryCharacter === 'function') {
    const characters = getHistoryCharactersForEra(registry, era);
    if (characters.length) {
      return characters.map((character) => {
        const display = displayHistoryCharacter(character, getHistoryIsEnglish());
        const sourceEntry = (character.era_entries || []).find((entry) => entry.era_id === era.id) || character.era_entries?.[0] || null;
        return {
          id: display.id,
          name: display.name,
          role: display.role,
          years: display.years,
          description: display.description || getHistoryUiStrings().fallbackDescription,
          figureIndex: sourceEntry?.figure_index ?? 0,
          eraId: sourceEntry?.era_id || era.id
        };
      });
    }
  }

  return Array.isArray(era.figures) ? era.figures.map((figure, index) => ({
    ...normalizeHistoryFigure(figure, era),
    figureIndex: index,
    eraId: era.id
  })) : [];
}

function normalizeHistoryMatchValue(value) {
  if (typeof normalizeHistoryCharacterValue === 'function') {
    return normalizeHistoryCharacterValue(value);
  }
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/طُوَيْس/g, 'طويس')
    .replace(/[\-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const historyFigureAliases = {
  'اخوين رحباني': 'الأخوان رحباني',
  'الاخوين رحباني': 'الأخوان رحباني',
  'الاخوان رحباني': 'الأخوان رحباني',
  'الرحابنه': 'الأخوان رحباني',
  'الرحابنة': 'الأخوان رحباني',
  'rahbani brothers': 'الأخوان رحباني',
  'assi and mansour rahbani': 'الأخوان رحباني',
  'assi & mansour rahbani': 'الأخوان رحباني',
  'عثمان الموصلي': 'عثمان الموصلي',
  'othman el mosley': 'عثمان الموصلي',
  'uthman al mawsili': 'عثمان الموصلي',
  'uthman al mawsily': 'عثمان الموصلي'
};

function resolveHistoryAlias(value) {
  const registry = getHistoryCharacterRegistry();
  const character = registry && typeof findHistoryCharacter === 'function' ? findHistoryCharacter(registry, value) : null;
  if (character) {
    const display = displayHistoryCharacter(character, getHistoryIsEnglish());
    return display.name || value;
  }

  const normalized = normalizeHistoryMatchValue(value);
  if (!normalized) return '';
  return historyFigureAliases[normalized] || value;
}

function getHistoryEraGroupId(era) {
  const id = era?.id || '';
  if (['pre-610', '7th-century-early-islam', 'umayyad-era'].includes(id)) return 'roots';
  if (['abbasid-era'].includes(id)) return 'classical';
  if (['andalusia', 'ottoman-post-classical'].includes(id)) return 'andalusia';
  if (['nahda-modern-beginnings', 'cairo-congress-1932'].includes(id)) return 'modern';
  if (['golden-age', 'modern-pop-transition', 'post-golden-age'].includes(id)) return 'golden';
  return 'other';
}

function renderHistoryPage() {
  const historyList = document.getElementById('history-list');
  if (!historyList || typeof history === 'undefined') return;

  if (typeof createHistoryCharacterRegistry === 'function') {
    globalThis.historyCharacters = createHistoryCharacterRegistry(history, { isEnglish: getHistoryIsEnglish() });
  }

  historyList.innerHTML = createHistoryVisibleIndexMarkup(history);

  renderHistorySourcesSection();
  openHistoryFigureFromQuery();
}

function createHistoryVisibleIndexMarkup(historyItems) {
  const ui = getHistoryUiStrings();
  const order = ['roots', 'classical', 'andalusia', 'modern', 'golden', 'other'];
  const groups = new Map(order.map((id) => [id, []]));

  historyItems.forEach((era, index) => {
    const groupId = getHistoryEraGroupId(era);
    if (!groups.has(groupId)) groups.set(groupId, []);
    groups.get(groupId).push({ era, index });
  });

  const intro = `
    <section class="history-index-intro" aria-label="${escapeHistoryHtml(getHistoryIsEnglish() ? 'History overview' : 'مقدمة صفحة التاريخ')}">
      <p>${escapeHistoryHtml(ui.shortIntro)}</p>
    </section>
  `;

  const groupMarkup = order
    .filter((groupId) => groups.get(groupId)?.length)
    .map((groupId) => `
      <section class="history-era-group" aria-labelledby="history-group-${groupId}">
        <h2 id="history-group-${groupId}" class="history-era-group-title">${escapeHistoryHtml(ui.groupLabels[groupId] || ui.groupLabels.other)}</h2>
        <div class="history-era-grid">
          ${groups.get(groupId).map(({ era, index }) => createHistorySectionMarkup(era, index)).join('')}
        </div>
      </section>
    `).join('');

  return intro + groupMarkup;
}

function createHistorySection(h, index) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = createHistorySectionMarkup(h, index).trim();
  return wrapper.firstElementChild;
}

function createHistorySectionMarkup(h, index) {
  const ui = getHistoryUiStrings();
  const figures = getHistoryFiguresForEra(h);
  const eraHref = `${ui.eraPageHref}?era=${encodeURIComponent(h.id)}`;
  const highlights = (h.highlights || []).slice(0, 5).map((hl) =>
    `<span class="history-highlight">${escapeHistoryHtml(hl)}</span>`
  ).join('');

  const figuresMarkup = figures.length
    ? `
      <div class="history-figures-block">
        <div class="history-figures-label">${escapeHistoryHtml(ui.figuresLabel)}</div>
        <div class="history-figures">
          ${figures.map((figure) => createHistoryFigureLinkMarkup(figure, h, ui)).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <article class="history-item history-era-card" data-id="${escapeHistoryHtml(h.id)}">
      <a class="history-era-card-main" href="${escapeHistoryHtml(eraHref)}" aria-label="${escapeHistoryHtml(ui.openEraPage)}: ${escapeHistoryHtml(h.title)}">
        <div class="history-era-card-head">
          <span class="history-index">${String(index + 1).padStart(2, '0')}</span>
          <div class="history-titles">
            <h3 class="history-title">${escapeHistoryHtml(h.title)}</h3>
            <span class="history-subtitle">${escapeHistoryHtml(h.subtitle || '')}</span>
          </div>
          <span class="history-period">${escapeHistoryHtml(h.period || '')}</span>
        </div>
        <p class="history-text">${escapeHistoryHtml(h.content || '')}</p>
        ${highlights ? `<div class="history-highlights">${highlights}</div>` : ''}
      </a>
      ${figuresMarkup}
      <div class="history-era-link-wrap">
        <a class="history-era-link" href="${escapeHistoryHtml(eraHref)}">${escapeHistoryHtml(ui.openEraPage)}</a>
      </div>
    </article>
  `;
}

function createHistoryFigureLinkMarkup(figure, era, ui) {
  const params = new URLSearchParams();
  if (figure.id) params.set('id', figure.id);
  params.set('name', figure.name || '');
  if (figure.eraId || era.id) params.set('era', figure.eraId || era.id);
  params.set('figure', String(figure.figureIndex ?? 0));

  const href = `${ui.personPageHref}?${params.toString()}`;
  const meta = [figure.role, figure.years].filter(Boolean).join(' — ');

  return `
    <a class="history-figure-chip" href="${escapeHistoryHtml(href)}"
      data-era-id="${escapeHistoryHtml(figure.eraId || era.id)}"
      data-figure-id="${escapeHistoryHtml(figure.id || '')}"
      data-figure-name="${escapeHistoryHtml(figure.name || '')}"
      title="${escapeHistoryHtml(meta || ui.openPersonPage)}">
      ${escapeHistoryHtml(figure.name || '')}
    </a>
  `;
}

function openHistoryFigureFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const requestedFigure = params.get('figure') || params.get('name');
  if (!requestedFigure) return;

  const resolvedFigure = resolveHistoryAlias(requestedFigure);
  const targetValue = normalizeHistoryMatchValue(resolvedFigure);
  if (!targetValue) return;

  const chips = Array.from(document.querySelectorAll('.history-figure-chip'));
  const match = chips.find((chip) => normalizeHistoryMatchValue(chip.dataset.figureName || chip.dataset.figureId || chip.textContent) === targetValue);
  if (match) match.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderHistorySourcesSection() {
  if (typeof historySources === 'undefined' || !Array.isArray(historySources) || !historySources.length) return;

  const main = document.getElementById('main-content');
  if (!main) return;

  const ui = getHistoryPageStrings();
  const existing = document.getElementById('history-sources-section');
  if (existing) existing.remove();

  const section = document.createElement('section');
  section.id = 'history-sources-section';
  section.className = 'history-sources-section';
  section.style.maxWidth = '1000px';
  section.style.margin = '0 auto 96px';
  section.style.padding = '0 5%';

  section.innerHTML = `
    <div style="border:1px solid var(--border, rgba(255,255,255,.12)); border-radius:18px; overflow:hidden; background:linear-gradient(180deg, rgba(255,255,255,.02) 0%, rgba(255,255,255,.01) 100%), var(--bg2, #111); box-shadow:0 14px 32px rgba(0,0,0,.16);">
      <button
        class="history-sources-toggle"
        type="button"
        aria-expanded="false"
        onclick="toggleHistorySources(this)"
        style="width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 22px; border:none; background:transparent; color:var(--text, #fff); font:inherit; cursor:pointer; text-align:start;"
      >
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span style="font-weight:900; font-size:1.02rem; color:var(--gold-light, #e2c07a);">${escapeHistoryPageHtml(ui.sourcesTitle)}</span>
          <span style="font-size:.82rem; color:var(--text-dim, #aaa);">${historySources.length} ${isSingleSource(historySources.length, document.documentElement.lang)}</span>
        </div>
        <span class="history-sources-toggle-text" style="font-size:.88rem; color:var(--text-dim, #bbb); font-weight:700;">${escapeHistoryPageHtml(ui.toggleShow)}</span>
      </button>

      <div class="history-sources-content" hidden style="padding:0 22px 22px; border-top:1px solid var(--border, rgba(255,255,255,.08)); background:rgba(0,0,0,.10);">
        <p style="margin:18px 0 16px; line-height:1.85; color:var(--text-muted, #d8d8d8); font-size:.94rem;">${escapeHistoryPageHtml(ui.sourcesIntro)}</p>
        <div style="display:grid; gap:12px;">
          ${historySources.map(source => createHistorySourceCardMarkup(source, ui)).join('')}
        </div>
      </div>
    </div>
  `;

  main.appendChild(section);
}

function createHistorySourceCardMarkup(source, ui) {
  const name = escapeHistoryPageHtml(source?.name || '');
  const url = escapeHistoryPageHtml(source?.url || '');
  const usedFor = Array.isArray(source?.usedFor) ? source.usedFor : [];
  const notes = Array.isArray(source?.notes) ? source.notes : [];

  const usedForMarkup = usedFor.length
    ? `<div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">${usedFor.map(item => `
        <span style="display:inline-flex; align-items:center; min-height:30px; padding:6px 12px; border-radius:999px; background:rgba(200,164,90,.08); border:1px solid rgba(200,164,90,.16); color:var(--gold-light, #e2c07a); font-size:.8rem; font-weight:700;">
          ${escapeHistoryPageHtml(item)}
        </span>
      `).join('')}</div>`
    : `<div style="margin-top:10px; color:var(--text-dim, #999);">—</div>`;

  const notesMarkup = notes.length
    ? `<ul style="margin:10px 0 0; padding-inline-start:20px;">${notes.map(item => `
        <li style="margin:5px 0; color:var(--text-muted, #d4d4d4); line-height:1.75;">
          ${escapeHistoryPageHtml(item)}
        </li>
      `).join('')}</ul>`
    : `<div style="margin-top:10px; color:var(--text-dim, #999);">—</div>`;

  const linkMarkup = url
    ? `<a href="${url}" target="_blank" rel="noopener noreferrer" style="font-size:.84rem; color:var(--gold-light, #e2c07a); text-decoration:none; font-weight:700;">${escapeHistoryPageHtml(ui.sourceLinkLabel)}</a>`
    : '';

  return `
    <article style="border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:16px; background:rgba(255,255,255,.018);">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-bottom:12px;">
        <div>
          <div style="font-weight:900; color:var(--text, #fff); font-size:.98rem; line-height:1.45;">${name}</div>
        </div>
        ${linkMarkup}
      </div>

      <div style="margin-bottom:14px;">
        <div style="font-size:.78rem; font-weight:800; letter-spacing:.02em; color:var(--text-dim, #aaa);">${escapeHistoryPageHtml(ui.usedForLabel)}</div>
        ${usedForMarkup}
      </div>

      <div>
        <div style="font-size:.78rem; font-weight:800; letter-spacing:.02em; color:var(--text-dim, #aaa);">${escapeHistoryPageHtml(ui.notesLabel)}</div>
        ${notesMarkup}
      </div>
    </article>
  `;
}

function toggleHistorySources(btn) {
  const ui = getHistoryPageStrings();
  const content = btn.nextElementSibling;
  if (!content) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  content.hidden = isOpen;

  const label = btn.querySelector('.history-sources-toggle-text');
  if (label) label.textContent = isOpen ? ui.toggleShow : ui.toggleHide;
}

function isSingleSource(count, lang) {
  if (lang === 'en') return count === 1 ? 'reference' : 'references';
  return count === 1 ? 'مرجع' : 'مراجع';
}

function escapeHistoryPageHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getHistoryPageStrings() {
  const isEnglish = getHistoryIsEnglish();
  return isEnglish
    ? {
        sourcesTitle: 'References',
        sourcesIntro: 'A short list of the references used to prepare this page. Each source appears once, followed by the figures or eras it helped inform.',
        usedForLabel: 'Related to',
        notesLabel: 'What was taken from it',
        sourceLinkLabel: 'Visit source',
        toggleShow: 'Show references',
        toggleHide: 'Hide references'
      }
    : {
        sourcesTitle: 'المراجع',
        sourcesIntro: 'قائمة مختصرة بالمراجع المستخدمة في إعداد هذه الصفحة. يظهر كل مصدر مرة واحدة فقط، وتحتَه الشخصيات أو الحقب التي أفاد منها المحتوى.',
        usedForLabel: 'مرتبط بـ',
        notesLabel: 'ما الذي أُخذ منه',
        sourceLinkLabel: 'زيارة المصدر',
        toggleShow: 'إظهار المراجع',
        toggleHide: 'إخفاء المراجع'
      };
}

function escapeHistoryHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function selectHistoryFigure() {
  return null;
}

function toggleHistory() {
  return null;
}

renderHistoryPage();
