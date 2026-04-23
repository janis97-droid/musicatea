// assets/pages/library/sheet-card.js
// Shared sheet card helper.

function createPersonPageLink(name) {
  const value = String(name || '').trim();
  if (!value) return '';
  const href = `person.html?name=${encodeURIComponent(value)}`;
  return `<a href="${escapeHtml(href)}" class="card-credit-link">${escapeHtml(value)}</a>`;
}

function createRhythmTags(sheet) {
  const rhythmIds = Array.isArray(sheet.rhythm_ids) ? sheet.rhythm_ids : [];
  const rhythmNames = Array.isArray(sheet.rhythms) ? sheet.rhythms : [];

  if (!rhythmIds.length || !rhythmNames.length) return '';

  return rhythmIds.map((id, index) => {
    const label = rhythmNames[index] || rhythmNames[0] || '';
    if (!id || !label) return '';
    const href = `rhythm.html?id=${encodeURIComponent(id)}`;
    return `<a href="${escapeHtml(href)}" class="card-tag card-tag-clickable" onclick="event.stopPropagation()">${escapeHtml(label)}</a>`;
  }).join('');
}

function createSheetCard(s) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.system = s.system;
  card.dataset.maqam = s.maqam || '';

  const maqamRoute = s.system === 'arabic' && s.maqam
    ? getMaqamRoute(s.maqam, s.tonic)
    : null;

  const maqamTagLabel = buildInteractiveMaqamTagLabel(s.maqam, s.tonic);

  const maqamDisplay = maqamRoute
    ? `<a href="${escapeHtml(maqamRoute)}" class="maqam-link card-tag card-tag-clickable" onclick="event.stopPropagation()">${escapeHtml(maqamTagLabel)}</a>`
    : `<span class="card-tag">${escapeHtml(s.system === 'arabic' ? maqamTagLabel : (s.scale || ''))}</span>`;

  const rhythmTags = createRhythmTags(s);

  const performerLine = s.performer
    ? `
      <div class="card-credit-row">
        <span class="card-credit-label">المؤدي</span>
        <span class="card-credit-value">${createPersonPageLink(s.performer)}</span>
      </div>`
    : '';

  const badge = s.type === 'song'
    ? `<span class="badge badge-song">أغنية</span>`
    : `<span class="badge badge-inst">معزوفة</span>`;

  const secondaryMeta = s.system === 'arabic'
    ? ''
    : (s.tonic ? `<span class="card-tag card-tag-muted">${escapeHtml(s.tonic)}</span>` : '');

  card.innerHTML = `
    <div class="card-header">
      <div class="card-title-row">
        <h3 class="card-title">${escapeHtml(s.title)}</h3>
        ${badge}
      </div>

      <div class="card-credits">
        <div class="card-credit-row">
          <span class="card-credit-label">الملحن</span>
          <span class="card-credit-value">${createPersonPageLink(s.composer)}</span>
        </div>
        ${performerLine}
      </div>
    </div>

    <div class="card-meta">
      <div class="card-tags-row">
        ${maqamDisplay}
        ${secondaryMeta}
        ${rhythmTags}
      </div>
    </div>

    <a href="${escapeHtml(s.pdf)}" target="_blank" rel="noopener" class="download-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      تحميل النوتة
    </a>`;

  return card;
}
