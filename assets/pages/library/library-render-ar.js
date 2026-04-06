// assets/pages/library/library-render-ar.js
// Arabic-only sheet card renderer.

(function () {
  window.createLibraryArSheetCard = function createLibraryArSheetCard(sheet) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.system = sheet.system;
    card.dataset.maqam = sheet.maqam || '';

    const maqamRoute = sheet.system === 'arabic' && sheet.maqam
      ? getMaqamRoute(sheet.maqam, sheet.tonic)
      : null;

    const maqamTagLabel = buildInteractiveMaqamTagLabel(sheet.maqam, sheet.tonic);

    const maqamDisplay = maqamRoute
      ? `<a href="${escapeHtml(maqamRoute)}" class="maqam-link card-tag card-tag-clickable" onclick="event.stopPropagation()">${escapeHtml(maqamTagLabel)}</a>`
      : `<span class="card-tag">${escapeHtml(sheet.system === 'arabic' ? maqamTagLabel : (sheet.scale || ''))}</span>`;

    const performerLine = sheet.performer
      ? `
        <div class="card-credit-row">
          <span class="card-credit-label">المؤدي</span>
          <span class="card-credit-value">${escapeHtml(sheet.performer)}</span>
        </div>`
      : '';

    const badge = sheet.type === 'song'
      ? `<span class="badge badge-song">أغنية</span>`
      : `<span class="badge badge-inst">معزوفة</span>`;

    const secondaryMeta = sheet.system === 'arabic'
      ? ''
      : (sheet.tonic ? `<span class="card-tag card-tag-muted">${escapeHtml(sheet.tonic)}</span>` : '');

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-row">
          <h3 class="card-title">${escapeHtml(sheet.title)}</h3>
          ${badge}
        </div>

        <div class="card-credits">
          <div class="card-credit-row">
            <span class="card-credit-label">الملحن</span>
            <span class="card-credit-value">${escapeHtml(sheet.composer)}</span>
          </div>
          ${performerLine}
        </div>
      </div>

      <div class="card-meta">
        <div class="card-tags-row">
          ${maqamDisplay}
          ${secondaryMeta}
        </div>
      </div>

      <a href="${escapeHtml(sheet.pdf)}" target="_blank" rel="noopener" class="download-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        تحميل النوتة
      </a>`;

    return card;
  };
})();
