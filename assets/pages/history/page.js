function getHistoryPageStrings() {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  return isEnglish
    ? {
        sourcesTitle: 'Sources',
        sourcesIntro:
          'These sources were used to prepare the eras and figures on this page. Each source appears only once, with the related figures/eras and the type of information taken from it.',
        usedForLabel: 'Used for',
        notesLabel: 'Information taken from this source',
        sourceLinkLabel: 'Open source',
        toggleShow: 'Show sources',
        toggleHide: 'Hide sources'
      }
    : {
        sourcesTitle: 'المصادر',
        sourcesIntro:
          'استُخدمت هذه المصادر في إعداد الحقب والشخصيات في هذه الصفحة. ذُكر كل مصدر مرة واحدة فقط، مع توضيح الحقب أو الشخصيات المرتبطة به ونوع المعلومات المستقاة منه.',
        usedForLabel: 'استُخدم في',
        notesLabel: 'المعلومات المستقاة من هذا المصدر',
        sourceLinkLabel: 'فتح المصدر',
        toggleShow: 'إظهار المصادر',
        toggleHide: 'إخفاء المصادر'
      };
}

function renderHistoryPage() {
  const historyList = document.getElementById('history-list');
  if (!historyList || typeof history === 'undefined') return;

  historyList.innerHTML = '';
  history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));

  renderHistorySourcesSection();
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
  section.innerHTML = `
    <div class="history-sources-shell">
      <button class="history-sources-toggle" type="button" aria-expanded="false" onclick="toggleHistorySources(this)">
        <span class="history-sources-title">${escapeHistoryPageHtml(ui.sourcesTitle)}</span>
        <span class="history-sources-toggle-text">${escapeHistoryPageHtml(ui.toggleShow)}</span>
      </button>
      <div class="history-sources-content" hidden>
        <p class="history-sources-intro">${escapeHistoryPageHtml(ui.sourcesIntro)}</p>
        <div class="history-sources-list">
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
    ? `<ul class="history-sources-bullets">${usedFor.map(item => `<li>${escapeHistoryPageHtml(item)}</li>`).join('')}</ul>`
    : `<div class="history-sources-empty">—</div>`;

  const notesMarkup = notes.length
    ? `<ul class="history-sources-bullets">${notes.map(item => `<li>${escapeHistoryPageHtml(item)}</li>`).join('')}</ul>`
    : `<div class="history-sources-empty">—</div>`;

  const linkMarkup = url
    ? `<a class="history-source-link" href="${url}" target="_blank" rel="noopener noreferrer">${escapeHistoryPageHtml(ui.sourceLinkLabel)}</a>`
    : '';

  return `
    <article class="history-source-card">
      <div class="history-source-head">
        <div class="history-source-name">${name}</div>
        ${linkMarkup}
      </div>

      <div class="history-source-block">
        <div class="history-source-label">${escapeHistoryPageHtml(ui.usedForLabel)}</div>
        ${usedForMarkup}
      </div>

      <div class="history-source-block">
        <div class="history-source-label">${escapeHistoryPageHtml(ui.notesLabel)}</div>
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
  if (label) {
    label.textContent = isOpen ? ui.toggleShow : ui.toggleHide;
  }
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
