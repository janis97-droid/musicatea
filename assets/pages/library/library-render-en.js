// assets/pages/library/library-render-en.js
// English-only sheet card renderer.

(function () {
  window.createLibraryEnSheetCard = function createLibraryEnSheetCard(sheet) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.system = sheet.system;
    card.dataset.maqam = sheet.maqam || '';

    const maqamRoute = sheet.system === 'arabic' && sheet.maqam && typeof getMaqamRoute === 'function'
      ? getMaqamRoute(sheet.maqam, sheet.tonic)
      : null;

    const maqamDisplay = sheet.system === 'arabic'
      ? (sheet.maqam
          ? (maqamRoute
              ? `<a href="${escapeHtml(maqamRoute)}" class="maqam-link" onclick="event.stopPropagation()">${escapeHtml(sheet.maqam)}</a>`
              : escapeHtml(sheet.maqam))
          : '')
      : escapeHtml(sheet.scale || '');

    const performerLine = sheet.performer
      ? `<p class="card-performer">${escapeHtml(sheet.performer)}</p>`
      : '';

    const badge = sheet.type === 'song'
      ? '<span class="badge badge-song">Song</span>'
      : '<span class="badge badge-inst">Instrumental</span>';

    const maqamChip = maqamDisplay
      ? `<span class="card-maqam">${maqamDisplay}</span>`
      : '';

    const tonicChip = sheet.tonic
      ? `<span class="card-tonic">${escapeHtml(sheet.tonic)}</span>`
      : '';

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-row">
          <h3 class="card-title">${escapeHtml(sheet.title)}</h3>
          ${badge}
        </div>
        <p class="card-composer">${escapeHtml(sheet.composer || '')}</p>
        ${performerLine}
      </div>
      <div class="card-meta">
        ${maqamChip}
        ${tonicChip}
      </div>
      <a href="${escapeHtml(sheet.pdf)}" target="_blank" rel="noopener" class="download-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Sheet
      </a>
    `;

    return card;
  };
})();
