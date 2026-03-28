function createFamilyCard(mainMaqam) {
  const familyId    = mainMaqam.family;
  const page = familyId === 'rast'
    ? 'interactive-scale.html?family=rast&maqam=rast'
    : `maqam-family.html?family=${familyId}`;
  const desc        = FAMILY_DESCRIPTIONS[familyId] || mainMaqam.description;
  const subCount    = (mainMaqam.sub_maqamat || []).length;
  const totalCount  = subCount + 1;
  const color       = mainMaqam.mood_color || '#c8a45a';

  const card = document.createElement('a');
  card.className  = 'maqam-family-card';
  card.href       = page;
  card.style.setProperty('--family-color', color);
  card.setAttribute('aria-label', `عائلة ${mainMaqam.name} — ${totalCount} مقامات`);

  card.innerHTML = `
    <h3>${mainMaqam.name}</h3>
    <span class="latin">${mainMaqam.latin} Family</span>
    <p class="desc">${desc}</p>

    <div class="meta">
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>
        <span>الغالب: <strong>${mainMaqam.dominant || '—'}</strong></span>
      </div>
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
        <span>${mainMaqam.tonic_options?.join(' · ') || '—'}</span>
      </div>
    </div>

    <div class="tonic-options">
      ${(mainMaqam.feeling || []).map(f => `<span class="tonic-badge">${f}</span>`).join('')}
    </div>

    <div class="sub-count">
      ${totalCount} مقامات في العائلة
      ${subCount > 0 ? `· ${subCount} فروع` : ''}
      <span style="float:left; color: var(--gold);">←</span>
    </div>
  `;

  return card;
}
