function getHistoryPageStrings() {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  return isEnglish
    ? {
        sourcesTitle: 'References',
        sourcesIntro:
          'A short list of the references used to prepare this page. Each source appears once, followed by the figures or eras it helped inform.',
        usedForLabel: 'Related to',
        notesLabel: 'What was taken from it',
        sourceLinkLabel: 'Visit source',
        toggleShow: 'Show references',
        toggleHide: 'Hide references'
      }
    : {
        sourcesTitle: 'المراجع',
        sourcesIntro:
          'قائمة مختصرة بالمراجع المستخدمة في إعداد هذه الصفحة. يظهر كل مصدر مرة واحدة فقط، وتحتَه الشخصيات أو الحقب التي أفاد منها المحتوى.',
        usedForLabel: 'مرتبط بـ',
        notesLabel: 'ما الذي أُخذ منه',
        sourceLinkLabel: 'زيارة المصدر',
        toggleShow: 'إظهار المراجع',
        toggleHide: 'إخفاء المراجع'
      };
}

function normalizeHistoryLookupValue(value) {
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
  const requestedFigure = params.get('figure');
  if (!requestedFigure) return;

  const targetValue = normalizeHistoryLookupValue(requestedFigure);
  if (!targetValue) return;

  const items = Array.from(document.querySelectorAll('.history-item'));
  for (const item of items) {
    const chips = Array.from(item.querySelectorAll('.history-figure-chip'));
    const match = chips.find((chip) => normalizeHistoryLookupValue(chip.dataset.figureName || chip.textContent) === targetValue);
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

renderHistoryPage();
