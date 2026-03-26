const maqamatGrid = document.getElementById('maqamat-grid');
const searchInput = document.getElementById('maqam-search');

function createFamilyCard(maqam) {
  const card = document.createElement('div');
  card.className = 'maqam-family-card';
  card.style.setProperty('--family-color', maqam.mood_color);

  const subCount = maqam.sub_maqamat ? maqam.sub_maqamat.length : 0;
  const totalInFamily = subCount + 1;

  card.innerHTML = `
    <h3>${maqam.name}</h3>
    <span class="latin">${maqam.latin}</span>

    <p class="desc">${maqam.description}</p>

    <div class="meta">
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13M9 13l12-2"/>
        </svg>
        <div class="tonic-options">
          ${(maqam.tonic_options || []).map(t => `<span class="tonic-badge">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="family-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      عائلة ${maqam.name}
    </div>

    ${subCount > 0 ? `<div class="sub-count">${totalInFamily} مقامات في هذه العائلة</div>` : ''}
  `;

  card.addEventListener('click', () => {
    window.location.href = `maqam-family.html?family=${maqam.family}`;
  });

  return card;
}

function renderMaqamat(filter = '') {
  maqamatGrid.innerHTML = '';
  const q = normalize(filter);

  const mainMaqamat = getMainMaqamat();
  const filtered = mainMaqamat.filter(m =>
    !q ||
    normalize(m.name).includes(q) ||
    normalize(m.latin).includes(q) ||
    normalize(m.description).includes(q) ||
    normalize(m.family).includes(q)
  );

  if (!filtered.length) {
    maqamatGrid.appendChild(createEmptyState('لا توجد مقامات مطابقة'));
    return;
  }

  filtered.forEach(m => maqamatGrid.appendChild(createFamilyCard(m)));
}

if (searchInput) {
  searchInput.addEventListener('input', e => renderMaqamat(e.target.value));
}

renderMaqamat();
