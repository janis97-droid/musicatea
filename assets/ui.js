// ============================================================
//  ui.js — Shared UI helpers for Musicatea
//  Used by: app.js, wiki.js
// ============================================================

/**
 * Creates a sheet music card element
 * @param {Object} s - sheet object from sheets.js
 * @returns {HTMLElement}
 */
function createSheetCard(s) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.system = s.system;
  card.dataset.maqam = s.maqam || '';

  // Maqam link or scale text
  const maqamDisplay = s.system === 'arabic' && s.maqam
    ? `<a href="maqam.html?id=${slugify(s.maqam)}" class="maqam-link" onclick="event.stopPropagation()">${s.maqam}</a>`
    : (s.scale || '');

  // Performer line only if exists
  const performerLine = s.performer
    ? `<p class="card-performer">${s.performer}</p>`
    : '';

  // Badge
  const badge = s.type === 'song'
    ? `<span class="badge badge-song">أغنية</span>`
    : `<span class="badge badge-inst">معزوفة</span>`;

  card.innerHTML = `
    <div class="card-header">
      <div class="card-title-row">
        <h3 class="card-title">${s.title}</h3>
        ${badge}
      </div>
      <p class="card-composer">${s.composer}</p>
      ${performerLine}
    </div>
    <div class="card-meta">
      <span class="card-maqam">${maqamDisplay}</span>
      ${s.tonic ? `<span class="card-tonic">${s.tonic}</span>` : ''}
    </div>
    <a href="${s.pdf}" target="_blank" class="download-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      تحميل النوتة
    </a>`;

  return card;
}

/**
 * Creates a maqam wiki card element
 * @param {Object} m - maqam object from maqamat.js
 * @returns {HTMLElement}
 */
function createMaqamCard(m) {
  const card = document.createElement('a');
  card.className = 'maqam-card';
  card.href = `maqam.html?id=${m.id}`;

  const feelings = m.feeling.slice(0, 3).map(f =>
    `<span class="feeling-tag">${f}</span>`
  ).join('');

  card.innerHTML = `
    <div class="maqam-card-accent" style="background:${m.mood_color}22;border-color:${m.mood_color}44"></div>
    <div class="maqam-card-body">
      <div class="maqam-name-row">
        <h3 class="maqam-name">${m.name}</h3>
        <span class="maqam-latin">${m.latin}</span>
      </div>
      <p class="maqam-desc">${m.description.slice(0, 100)}...</p>
      <div class="maqam-feelings">${feelings}</div>
      <div class="maqam-footer">
        <span class="maqam-examples-count">${m.examples.length} أمثلة</span>
        <span class="maqam-arrow">←</span>
      </div>
    </div>`;

  return card;
}

/**
 * Creates an expandable history section element
 * @param {Object} h - history object from history.js
 * @param {number} index - position index
 * @returns {HTMLElement}
 */
function createHistorySection(h, index) {
  const section = document.createElement('div');
  section.className = 'history-item';
  section.dataset.id = h.id;

  const highlights = h.highlights.map(hl =>
    `<span class="history-highlight">${hl}</span>`
  ).join('');

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
    </div>`;

  return section;
}

/**
 * Toggle history accordion
 * @param {HTMLElement} btn
 */
function toggleHistory(btn) {
  const content = btn.nextElementSibling;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  content.hidden = isOpen;
  btn.querySelector('.history-chevron').style.transform = isOpen ? '' : 'rotate(180deg)';
}

/**
 * Convert Arabic maqam name to URL-safe id
 * Falls back to latin id lookup in maqamat array
 * @param {string} name - Arabic maqam name
 * @returns {string} id
 */
function slugify(name) {
  if (typeof maqamat === 'undefined') return name;
  const found = maqamat.find(m => m.name === name);
  return found ? found.id : name;
}

/**
 * Creates an empty state message
 * @param {string} message
 * @returns {HTMLElement}
 */
function createEmptyState(message) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <p>${message}</p>`;
  return div;
}

/**
 * Normalizes Arabic text for search
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u065F]/g, '');
}
