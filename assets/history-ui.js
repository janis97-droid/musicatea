// assets/history-ui.js
// Shared history accordion helpers.

function createHistorySection(h, index) {
  const section = document.createElement('div');
  section.className = 'history-item';
  section.dataset.id = h.id;

  const highlights = h.highlights.map(hl =>
    `<span class="history-highlight">${escapeHtml(hl)}</span>`
  ).join('');

  section.innerHTML = `
    <button class="history-toggle" aria-expanded="false" onclick="toggleHistory(this)">
      <div class="history-toggle-left">
        <span class="history-index">${String(index + 1).padStart(2, '0')}</span>
        <div class="history-titles">
          <span class="history-title">${escapeHtml(h.title)}</span>
          <span class="history-subtitle">${escapeHtml(h.subtitle)}</span>
        </div>
      </div>
      <div class="history-toggle-right">
        <span class="history-period">${escapeHtml(h.period)}</span>
        <svg class="history-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </button>
    <div class="history-content" hidden>
      <p class="history-text">${escapeHtml(h.content)}</p>
      <div class="history-highlights">${highlights}</div>
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
