// assets/sheet-card.js
// Shared sheet card helper.

function createSheetCard(s) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.system = s.system;
  card.dataset.maqam = s.maqam || '';

  const maqamRoute = s.system === 'arabic' && s.maqam
    ? getMaqamRoute(s.maqam)
    : null;

  const maqamDisplay = maqamRoute
    ? `<a href="${maqamRoute}" class="maqam-link" onclick="event.stopPropagation()">${s.maqam}</a>`
    : (s.scale || '');

  const performerLine = s.performer
    ? `<p class="card-performer">${s.performer}</p>`
    : '';

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
