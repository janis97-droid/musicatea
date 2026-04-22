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

function normalizeHistoryFigure(figure) {
  const ui = getHistoryUiStrings();
  if (typeof figure === 'string') {
    return {
      name: figure,
      role: '',
      years: '',
      description: ui.fallbackDescription
    };
  }

  return {
    name: figure?.name || '',
    role: figure?.role || '',
    years: figure?.years || '',
    description: figure?.description || ui.fallbackDescription
  };
}

function normalizeHistoryMatchValue(value) {
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

function getHistoryAliasCanonical(value) {
  if (typeof resolveHistoryAlias === 'function') {
    return resolveHistoryAlias(value);
  }
  return value;
}

function getSharedSheetsData() {
  if (typeof sheets !== 'undefined' && Array.isArray(sheets)) return sheets;
  if (Array.isArray(globalThis.sheets)) return globalThis.sheets;
  return [];
}

function getRelatedSheetLinksForFigure(figureName) {
  const allSheets = getSharedSheetsData();
  if (!allSheets.length) return [];

  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  const requestedRaw = normalizeHistoryMatchValue(figureName);
  const requestedCanonical = normalizeHistoryMatchValue(getHistoryAliasCanonical(figureName));
  const seen = new Set();

  return allSheets
    .filter((sheet) => sheet && sheet.system === 'arabic')
    .filter((sheet) => {
      const values = [sheet.composer, sheet.composer_en, sheet.performer, sheet.performer_en].filter(Boolean);
      return values.some((value) => {
        const raw = normalizeHistoryMatchValue(value);
        const canonical = normalizeHistoryMatchValue(getHistoryAliasCanonical(value));
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

  const figures = Array.isArray(h.figures) ? h.figures.map(normalizeHistoryFigure) : [];
  const figuresMarkup = figures.length
    ? `
      <div class="history-figures-block">
        <div class="history-figures-label">${escapeHistoryHtml(ui.figuresLabel)}</div>
        <div class="history-figures">
          ${figures.map((figure, figureIndex) => `
            <button class="history-figure-chip" type="button"
              data-era-id="${escapeHistoryHtml(h.id)}"
              data-figure-index="${figureIndex}"
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
  const role = btn.dataset.figureRole || '';
  const years = btn.dataset.figureYears || '';
  const description = btn.dataset.figureDescription || '';
  const eraId = btn.dataset.eraId || '';
  const figureIndex = btn.dataset.figureIndex || '0';

  const metaParts = [role, years].filter(Boolean);
  block.querySelector('.history-figure-name').textContent = name;
  block.querySelector('.history-figure-meta').textContent = metaParts.join(' — ');
  block.querySelector('.history-figure-description').textContent = description;
  block.querySelector('.history-figure-actions').innerHTML = `
    <a class="history-figure-action" href="${escapeHistoryHtml(ui.personPageHref)}?era=${encodeURIComponent(eraId)}&figure=${encodeURIComponent(figureIndex)}">${escapeHistoryHtml(ui.openPersonPage)}</a>
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
