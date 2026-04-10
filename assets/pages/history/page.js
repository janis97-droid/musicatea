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
  section.style.maxWidth = '1000px';
  section.style.margin = '0 auto 80px';
  section.style.padding = '0 5%';

  section.innerHTML = `
    <div style="border:1px solid var(--border, rgba(255,255,255,.12)); border-radius:16px; overflow:hidden; background:var(--bg2, #111);">
      <button
        class="history-sources-toggle"
        type="button"
        aria-expanded="false"
        onclick="toggleHistorySources(this)"
        style="width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 20px; border:none; background:var(--bg2, #111); color:var(--text, #fff); font:inherit; cursor:pointer; text-align:start;"
      >
        <span style="font-weight:800; font-size:1rem;">${escapeHistoryPageHtml(ui.sourcesTitle)}</span>
        <span class="history-sources-toggle-text" style="font-size:.88rem; color:var(--text-dim, #bbb);">${escapeHistoryPageHtml(ui.toggleShow)}</span>
      </button>
      <div class="history-sources-content" hidden style="padding:20px; border-top:1px solid var(--border, rgba(255,255,255,.12)); background:var(--bg, #0d0d0d);">
        <p style="margin:0 0 18px; line-height:1.8; color:var(--text-muted, #cfcfcf);">${escapeHistoryPageHtml(ui.sourcesIntro)}</p>
        <div style="display:grid; gap:14px;">
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
    ? `<ul style="margin:8px 0 0; padding-inline-start:20px;">${usedFor.map(item => `<li style="margin:4px 0; color:var(--text-muted, #d0d0d0);">${escapeHistoryPageHtml(item)}</li>`).join('')}</ul>`
    : `<div style="margin-top:8px; color:var(--text-dim, #aaa);">—</div>`;

  const notesMarkup = notes.length
    ? `<ul style="margin:8px 0 0; padding-inline-start:20px;">${notes.map(item => `<li style="margin:4px 0; color:var(--text-muted, #d0d0d0);">${escapeHistoryPageHtml(item)}</li>`).join('')}</ul>`
    : `<div style="margin-top:8px; color:var(--text-dim, #aaa);">—</div>`;

  const linkMarkup = url
    ? `<a href="${url}" target="_blank" rel="noopener noreferrer" style="font-size:.85rem; color:var(--gold-light, #d7b46a); text-decoration:none;">${escapeHistoryPageHtml(ui.sourceLinkLabel)}</a>`
    : '';

  return `
    <article style="border:1px solid var(--border, rgba(255,255,255,.12)); border-radius:12px; padding:16px; background:rgba(255,255,255,.02);">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:12px;">
        <div style="font-weight:800; color:var(--gold-light, #e3c17b);">${name}</div>
        ${linkMarkup}
      </div>

      <div style="margin-bottom:12px;">
        <div style="font-size:.82rem; font-weight:800; color:var(--text-dim, #aaa);">${escapeHistoryPageHtml(ui.usedForLabel)}</div>
        ${usedForMarkup}
      </div>

      <div>
        <div style="font-size:.82rem; font-weight:800; color:var(--text-dim, #aaa);">${escapeHistoryPageHtml(ui.notesLabel)}</div>
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

function escapeHistoryPageHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

renderHistoryPage();
