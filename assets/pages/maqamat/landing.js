// Copy of current assets/maqamat.js for safe refactor prep
// Renders the family-card grid on maqamat.html
// Main families only, in a curated fixed order.

const FAMILY_ORDER = [
  'saba',
  'nahawand',
  'ajam',
  'bayati',
  'sikah',
  'hijaz',
  'rast',
  'kurd',
  'nawa_athar'
];

function getFamilyLink(mainMaqam) {
  return `interactive-scale.html?family=${mainMaqam.family}&maqam=${mainMaqam.id}`;
}

function createFamilyCard(mainMaqam) {
  const page = getFamilyLink(mainMaqam);
  const color = mainMaqam.mood_color || '#c8a45a';

  const card = document.createElement('a');
  card.className = 'maqam-family-card';
  card.href = page;
  card.style.setProperty('--family-color', color);
  card.setAttribute('aria-label', `عائلة ${mainMaqam.name}`);

  card.innerHTML = `
    <div class="maqam-card-main">
      <div class="maqam-card-heading">
        <h3>${mainMaqam.name}</h3>
        <span class="latin">${mainMaqam.latin}</span>
      </div>
    </div>

    <div class="maqam-card-footer">
      <span class="maqam-card-cta">
        <span>لنتعرّف على عائلة المقام</span>
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

const mainMaqamatRaw = typeof getInteractiveMainMaqamat === 'function'
  ? getInteractiveMainMaqamat()
  : maqamat.filter(m => m.is_main && m.interactive);

const mainMaqamat = FAMILY_ORDER
  .map(familyId => mainMaqamatRaw.find(m => m.family === familyId))
  .filter(Boolean);

function renderFamilies() {
  if (!maqamatGrid) return;

  maqamatGrid.innerHTML = '';

  if (!mainMaqamat.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'لا توجد عائلات مقامية متاحة حالياً';
    maqamatGrid.appendChild(empty);
    return;
  }

  mainMaqamat.forEach(m => {
    maqamatGrid.appendChild(createFamilyCard(m));
  });
}

renderFamilies();
