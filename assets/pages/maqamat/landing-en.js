// English maqamat landing page renderer

const FAMILY_ORDER = [
  'saba',
  'nahawand',
  'ajam',
  'bayat',
  'sikah',
  'hijaz',
  'rast',
  'kurd',
  'nawa_athar'
];

function getFamilyLink(mainMaqam) {
  return `maqam-family-en.html?family=${mainMaqam.family}`;
}

function createFamilyCard(mainMaqam) {
  const page = getFamilyLink(mainMaqam);
  const color = mainMaqam.mood_color || '#c8a45a';

  const card = document.createElement('a');
  card.className = 'maqam-family-card';
  card.href = page;
  card.style.setProperty('--family-color', color);
  card.setAttribute('aria-label', `${mainMaqam.name} family`);

  card.innerHTML = `
    <div class="maqam-card-main">
      <div class="maqam-card-heading">
        <h3>${mainMaqam.name}</h3>
        <span class="latin">${mainMaqam.latin}</span>
      </div>
    </div>

    <div class="maqam-card-footer">
      <span class="maqam-card-cta">
        <span>Explore this maqam family</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M5 12h14"/>
          <path d="M13 6l6 6-6 6"/>
        </svg>
      </span>
    </div>
  `;

  return card;
}

const maqamatGrid = document.getElementById('maqamat-grid');

const mainMaqamatRaw = typeof getMainMaqamat === 'function'
  ? getMainMaqamat()
  : maqamat.filter(m => m.is_main);

const mainMaqamat = FAMILY_ORDER
  .map(familyId => mainMaqamatRaw.find(m => m.family === familyId))
  .filter(Boolean);

function renderFamilies() {
  if (!maqamatGrid) return;

  maqamatGrid.innerHTML = '';

  if (!mainMaqamat.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No maqam families are currently available';
    maqamatGrid.appendChild(empty);
    return;
  }

  mainMaqamat.forEach(m => {
    maqamatGrid.appendChild(createFamilyCard(m));
  });
}

renderFamilies();
