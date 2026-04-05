// assets/pages/history/ui.js
// Shared history accordion helpers.

function getHistoryUiStrings() {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  return isEnglish
    ? {
        figuresLabel: 'Figures associated with this era',
        fallbackDescription: 'One of the figures associated with this musical era.'
      }
    : {
        figuresLabel: 'الشخصيات المرتبطة بهذه الحقبة',
        fallbackDescription: 'من الشخصيات المرتبطة بهذه الحقبة الموسيقية.'
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

function createHistorySection(h, index) {
  const ui = getHistoryUiStrings();
  const section = document.createElement('div');
  section.className = 'history-item';
  section.dataset.id = h.id;

  const highlights = (h.highlights || []).map(hl =>
    `<span class="history-highlight">${hl}</span>`
  ).join('');

  const figures = Array.isArray(h.figures) ? h.figures.map(normalizeHistoryFigure) : [];
  const figuresMarkup = figures.length
    ? `
      <div class="history-figures-block">
        <div class="history-figures-label">${ui.figuresLabel}</div>
        <div class="history-figures">
          ${figures.map(figure => `
            <button class="history-figure-chip" type="button"
              data-figure-name="${escapeHistoryHtml(figure.name)}"
              data-figure-role="${escapeHistoryHtml(figure.role)}"
              data-figure-years="${escapeHistoryHtml(figure.years)}"
              data-figure-description="${escapeHistoryHtml(figure.description)}"
              onclick="selectHistoryFigure(this)">
              ${figure.name}
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
        </div>
      </div>
    `
    : '';

  section.innerHTML = `
    <button class="history-toggle" aria-expanded="false" onclick="toggleHistory(this)">
      <div class="history-toggle-left">
        <span class="history-index">${String(index + 1).padStart(2, '0')}</span>
        <div class="history-titles">
          <span class="history-title">${h.title}</span>
          <span class="history-subtitle">${h.subtitle}</span>
        </div>
      </div>
      <div class="history-toggle-right">
        <span class="history-period">${h.period}</span>
        <svg class="history-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </button>
    <div class="history-content" hidden>
      <p class="history-text">${h.content}</p>
      <div class="history-highlights">${highlights}</div>
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
  const block = btn.closest('.history-figures-block');
  if (!block) return;

  block.querySelectorAll('.history-figure-chip').forEach(chip => chip.classList.remove('active'));
  btn.classList.add('active');

  const panel = block.querySelector('.history-figure-panel');
  const name = btn.dataset.figureName || '';
  const role = btn.dataset.figureRole || '';
  const years = btn.dataset.figureYears || '';
  const description = btn.dataset.figureDescription || '';

  const metaParts = [role, years].filter(Boolean);
  block.querySelector('.history-figure-name').textContent = name;
  block.querySelector('.history-figure-meta').textContent = metaParts.join(' — ');
  block.querySelector('.history-figure-description').textContent = description;
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
