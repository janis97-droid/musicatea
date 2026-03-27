const list = document.getElementById('list');

const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');
const maqamSelect = document.getElementById('maqam');
const scaleSelect = document.getElementById('scale');
const tonicSelect = document.getElementById('tonic');
const searchInput = document.getElementById('search');

function render(data) {
  list.innerHTML = '';

  if (data.length === 0) {
    list.appendChild(createEmptyState('No sheets match the current filters'));
    return;
  }

  data.forEach((s, index) => {
    const card = createSheetCard(s);
    card.style.setProperty('--card-index', index);
    list.appendChild(card);
  });
}

function populateFilters() {
  maqamSelect.innerHTML = '<option value="">All Maqamat</option>';
  scaleSelect.innerHTML = '<option value="">All Scales</option>';
  tonicSelect.innerHTML = '<option value="">All Tonics</option>';

  const systemVal = systemSelect.value;
  let data = sheets;

  if (systemVal === 'arabic') {
    data = sheets.filter(s => s.system === 'arabic');
  } else {
    data = sheets.filter(s => s.system === 'western');
  }

  const maqams = [...new Set(data.map(s => s.maqam).filter(Boolean))];
  const scales = [...new Set(data.map(s => s.scale).filter(Boolean))];
  const tonics = [...new Set(data.map(s => s.tonic).filter(Boolean))];

  maqams.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    maqamSelect.appendChild(opt);
  });

  scales.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    scaleSelect.appendChild(opt);
  });

  tonics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    tonicSelect.appendChild(opt);
  });
}

function applyFilters() {
  let filtered = sheets;

  const systemVal = systemSelect.value;
  const typeVal = typeSelect.value;
  const maqamVal = maqamSelect.value;
  const scaleVal = scaleSelect.value;
  const tonicVal = tonicSelect.value;
  const searchVal = normalize(searchInput.value);

  if (systemVal === 'arabic') {
    filtered = filtered.filter(s => s.system === 'arabic');
    maqamSelect.style.display = 'inline';
    scaleSelect.style.display = 'none';
  } else {
    filtered = filtered.filter(s => s.system === 'western');
    maqamSelect.style.display = 'none';
    scaleSelect.style.display = 'inline';
  }

  if (typeVal) {
    filtered = filtered.filter(s => s.type === typeVal);
  }

  if (maqamVal) {
    filtered = filtered.filter(s => s.maqam === maqamVal);
  }

  if (scaleVal) {
    filtered = filtered.filter(s => s.scale === scaleVal);
  }

  if (tonicVal) {
    filtered = filtered.filter(s => s.tonic === tonicVal);
  }

  if (searchVal) {
    filtered = filtered.filter(s =>
      normalize(s.title).includes(searchVal) ||
      normalize(s.composer).includes(searchVal) ||
      normalize(s.performer).includes(searchVal)
    );
  }

  render(filtered);
}

systemSelect.addEventListener('change', () => {
  populateFilters();
  applyFilters();
});

typeSelect.addEventListener('change', applyFilters);
maqamSelect.addEventListener('change', applyFilters);
scaleSelect.addEventListener('change', applyFilters);
tonicSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

populateFilters();
applyFilters();
