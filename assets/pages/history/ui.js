// assets/pages/history/ui.js
// Shared history accordion helpers.

function getHistoryUiStrings() {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  return isEnglish
    ? {
        figuresLabel: 'Figures associated with this era',
        fallbackDescription: 'One of the figures associated with this musical era.',
        relatedSheetsLabel: 'From the sheet library',
        openSheet: 'Open sheet',
        openEraPage: 'Open the full era page',
        eraPageHref: 'history-era-en.html',
        openPersonPage: 'Open full profile',
        personPageHref: 'person-en.html'
      }
    : {
        figuresLabel: 'الشخصيات المرتبطة بهذه الحقبة',
        fallbackDescription: 'من الشخصيات المرتبطة بهذه الحقبة الموسيقية.',
        relatedSheetsLabel: 'من مكتبة النوتات',
        openSheet: 'فتح النوتة',
        openEraPage: 'افتح صفحة الحقبة الكاملة',
        eraPageHref: 'history-era.html',
        openPersonPage: 'افتح الصفحة الكاملة للشخصية',
        personPageHref: 'person.html'
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

  'عبده داغر': 'عبده داغر',
  'abdo dagher': 'عبده داغر',
  'abdu dagher': 'عبده داغر',

  'سيمون شاهين': 'سيمون شاهين',
  'simon shaheen': 'سيمون شاهين',
  'simon shahin': 'سيمون شاهين',

  'عمر خيرت': 'عمر خيرت',
  'omar khairat': 'عمر خيرت',
  'omar kheirat': 'عمر خيرت',
  'omar khayrat': 'عمر خيرت',

  'ملحم بركات': 'ملحم بركات',
  'melhem barakat': 'ملحم بركات',
  'melhem barkat': 'ملحم بركات',

  'ليلى مراد': 'ليلى مراد',
  'ليلي مراد': 'ليلى مراد',
  'layla murad': 'ليلى مراد',
  'laila murad': 'ليلى مراد',

  'جوزيف عازار': 'جوزيف عازار',
  'جوزيف عازر': 'جوزيف عازار',
  'يوسف عازار': 'جوزيف عازار',
  'joseph azar': 'جوزيف عازار',
  'josef azar': 'جوزيف عازار',
  'joseph azer': 'جوزيف عازار',
  'josef azer': 'جوزيف عازار',

  'نور الملاح': 'نور الملاح',
  'ننور الملاح': 'نور الملاح',
  'nour el mallah': 'نور الملاح',
  'nour mallah': 'نور الملاح',

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

function expandHistorySection(item) {
  if (!item) return;
  const toggle = item.querySelector('.history-toggle');
  const content = item.querySelector('.history-content');
  const chevron = item.querySelector('.history-chevron');
  if (!toggle || !content) return;
  toggle.setAttribute('aria-expanded', 'true');
  content.hidden = false;
  if (chevron) chevron.style.transform = 'rotate(180deg)';
}

function openHistoryFigureFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const requestedFigure = params.get('figure') || params.get('name');
  if (!requestedFigure) return;

  const resolvedFigure = resolveHistoryAlias(requestedFigure);
  const targetValue = normalizeHistoryMatchValue(resolvedFigure);
  if (!targetValue) return;

  const items = Array.from(document.querySelectorAll('.history-item'));
  for (const item of items) {
    const chips = Array.from(item.querySelectorAll('.history-figure-chip'));
    const match = chips.find((chip) => normalizeHistoryMatchValue(chip.dataset.figureName || chip.dataset.figureId || chip.textContent) === targetValue);
    if (!match) continue;

    expandHistorySection(item);
    selectHistoryFigure(match);
    item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    break;
  }
}

function renderHistoryPage() {
  const historyList = document.getElementById('history-list');
  if (!historyList || typeof history === 'undefined') return;

  if (typeof createHistoryCharacterRegistry === 'function') {
    globalThis.historyCharacters = createHistoryCharacterRegistry(history, { isEnglish: getHistoryIsEnglish() });
  }

  historyList.innerHTML = '';
  history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));

  renderHistorySourcesSection();
  openHistoryFigureFromQuery();
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

function getSharedSheetsData() {
  if (typeof sheets !== 'undefined' && Array.isArray(sheets)) return sheets;
  if (Array.isArray(globalThis.sheets)) return globalThis.sheets;
  return [];
}

function getRelatedSheetLinksForFigure(figureName) {
  const allSheets = getSharedSheetsData();
  if (!allSheets.length) return [];

  const isEnglish = getHistoryIsEnglish();
  const requestedRaw = normalizeHistoryMatchValue(figureName);
  const requestedCanonical = normalizeHistoryMatchValue(resolveHistoryAlias(figureName));
  const seen = new Set();

  return allSheets
    .filter((sheet) => sheet && sheet.system === 'arabic')
    .filter((sheet) => {
      const values = [sheet.composer, sheet.composer_en, sheet.performer, sheet.performer_en].filter(Boolean);
      return values.some((value) => {
        const raw = normalizeHistoryMatchValue(value);
        const canonical = normalizeHistoryMatchValue(resolveHistoryAlias(value));
        return raw === requestedRaw || raw === requestedCanonical || canonical === requestedRaw || canonical === requestedCanonical;
      });
    })
    .filter((sheet) => {
      const key = `${sheet.title || ''}|${sheet.pdf || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((sheet) => ({
      title: isEnglish ? (sheet.title_en || sheet.title || '') : (sheet.title || sheet.title_en || ''),
      pdf: sheet.pdf || '',
      tonic: isEnglish ? (sheet.tonic_en || sheet.tonic || '') : (sheet.tonic || sheet.tonic_en || '')
    }))
    .filter((sheet) => sheet.title && sheet.pdf);
}

function createRelatedSheetTagsMarkup(figureName) {
  const ui = getHistoryUiStrings();
  const links = getRelatedSheetLinksForFigure(figureName);
  if (!links.length) return '';

  const tags = links.map((sheet) => {
    const label = escapeHistoryHtml(sheet.title);
    const hint = sheet.tonic ? `<span class="history-related-sheet-tonic">${escapeHistoryHtml(sheet.tonic)}</span>` : '';
    return `<a class="history-related-sheet-tag" href="${escapeHistoryHtml(sheet.pdf)}" target="_blank" rel="noopener noreferrer" title="${escapeHistoryHtml(ui.openSheet)}">${label}${hint}</a>`;
  }).join('');

  return `
    <div class="history-related-sheets-block">
      <div class="history-related-sheets-label">${escapeHistoryHtml(ui.relatedSheetsLabel)}</div>
      <div class="history-related-sheets-tags">${tags}</div>
    </div>
  `;
}

function createHistorySection(h, index) {
  const ui = getHistoryUiStrings();
  const section = document.createElement('div');
  section.className = 'history-item';
  section.dataset.id = h.id;

  const highlights = (h.highlights || []).map(hl =>
    `<span class="history-highlight">${escapeHistoryHtml(hl)}</span>`
  ).join('');

  const eraPageLink = `
    <div class="history-era-link-wrap">
      <a class="history-era-link" href="${escapeHistoryHtml(ui.eraPageHref)}?era=${encodeURIComponent(h.id)}">${escapeHistoryHtml(ui.openEraPage)}</a>
    </div>
  `;

  const figures = getHistoryFiguresForEra(h);
  const figuresMarkup = figures.length
    ? `
      <div class="history-figures-block">
        <div class="history-figures-label">${escapeHistoryHtml(ui.figuresLabel)}</div>
        <div class="history-figures">
          ${figures.map((figure) => `
            <button class="history-figure-chip" type="button"
              data-era-id="${escapeHistoryHtml(figure.eraId || h.id)}"
              data-figure-id="${escapeHistoryHtml(figure.id || '')}"
              data-figure-index="${Number.isFinite(Number(figure.figureIndex)) ? Number(figure.figureIndex) : 0}"
              data-figure-name="${escapeHistoryHtml(figure.name)}"
              data-figure-role="${escapeHistoryHtml(figure.role)}"
              data-figure-years="${escapeHistoryHtml(figure.years)}"
              data-figure-description="${escapeHistoryHtml(figure.description)}"
              onclick="selectHistoryFigure(this)">
              ${escapeHistoryHtml(figure.name)}
            </button>
          `).join('')}
        </div>
        <div class="history-figure-panel" hidden>
          <div class="history-figure-panel-head">
            <div>
              <div class="history-figure-name"></div>
              <div class="history-figure-meta"></div>
            </div>
          </div>
          <p class="history-figure-description"></p>
          <div class="history-figure-actions"></div>
          <div class="history-figure-related"></div>
        </div>
      </div>
    `
    : '';

  section.innerHTML = `
    <button class="history-toggle" aria-expanded="false" onclick="toggleHistory(this)">
      <div class="history-toggle-left">
        <span class="history-index">${String(index + 1).padStart(2, '0')}</span>
        <div class="history-titles">
          <span class="history-title">${escapeHistoryHtml(h.title)}</span>
          <span class="history-subtitle">${escapeHistoryHtml(h.subtitle)}</span>
        </div>
      </div>
      <div class="history-toggle-right">
        <span class="history-period">${escapeHistoryHtml(h.period)}</span>
        <svg class="history-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </button>
    <div class="history-content" hidden>
      <p class="history-text">${escapeHistoryHtml(h.content)}</p>
      <div class="history-highlights">${highlights}</div>
      ${eraPageLink}
      ${figuresMarkup}
    </div>`;

  return section;
}

function toggleHistory(btn) {
  const content = btn.nextElementSibling;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  content.hidden = isOpen;
  btn.querySelector('.history-chevron').style.transform = isOpen ? '' : 'rotate(180deg)';
}

function selectHistoryFigure(btn) {
  const ui = getHistoryUiStrings();
  const block = btn.closest('.history-figures-block');
  if (!block) return;

  block.querySelectorAll('.history-figure-chip').forEach(chip => chip.classList.remove('active'));
  btn.classList.add('active');

  const panel = block.querySelector('.history-figure-panel');
  const name = btn.dataset.figureName || '';
  const figureId = btn.dataset.figureId || '';
  const role = btn.dataset.figureRole || '';
  const years = btn.dataset.figureYears || '';
  const description = btn.dataset.figureDescription || '';
  const eraId = btn.dataset.eraId || '';
  const figureIndex = btn.dataset.figureIndex || '0';

  const metaParts = [role, years].filter(Boolean);
  block.querySelector('.history-figure-name').textContent = name;
  block.querySelector('.history-figure-meta').textContent = metaParts.join(' — ');
  block.querySelector('.history-figure-description').textContent = description;
  const params = new URLSearchParams();
  if (figureId) params.set('id', figureId);
  params.set('name', name);
  if (eraId) params.set('era', eraId);
  params.set('figure', figureIndex);

  block.querySelector('.history-figure-actions').innerHTML = `
    <a class="history-figure-action" href="${escapeHistoryHtml(ui.personPageHref)}?${params.toString()}">${escapeHistoryHtml(ui.openPersonPage)}</a>
  `;
  block.querySelector('.history-figure-related').innerHTML = createRelatedSheetTagsMarkup(name);
  panel.hidden = false;
}

function escapeHistoryHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

renderHistoryPage();
