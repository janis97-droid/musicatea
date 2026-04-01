const list = document.getElementById('list');

const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');
const maqamSelect = document.getElementById('maqam');
const scaleSelect = document.getElementById('scale');
const tonicSelect = document.getElementById('tonic');
const searchInput = document.getElementById('search');

const URL_KEYS = {
  system: 'system',
  type: 'type',
  maqam: 'maqam',
  scale: 'scale',
  tonic: 'tonic',
  search: 'q'
};

const indexedSheets = sheets.map((sheet, index) => ({
  ...sheet,
  _renderIndex: index,
  _searchTitle: normalize(sheet.title),
  _searchComposer: normalize(sheet.composer),
  _searchPerformer: normalize(sheet.performer),
  _searchBlob: [sheet.title, sheet.composer, sheet.performer]
    .map(normalize)
    .filter(Boolean)
    .join(' ')
}));

function render(data) {
  list.innerHTML = '';

  if (data.length === 0) {
    list.appendChild(createEmptyState('لا توجد نوتات مطابقة للفلتر'));
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach((s, index) => {
    const card = createSheetCard(s);
    card.style.setProperty('--card-index', index);
    fragment.appendChild(card);
  });

  list.appendChild(fragment);
}

function getSystemSheets(systemValue) {
  return indexedSheets.filter(sheet => sheet.system === systemValue);
}

function buildUniqueValues(data, fieldName) {
  return [...new Set(data.map(item => item[fieldName]).filter(Boolean))];
}

function fillSelect(selectEl, values, firstOptionLabel) {
  const previousValue = selectEl.value;
  selectEl.innerHTML = '';

  const firstOption = document.createElement('option');
  firstOption.value = '';
  firstOption.textContent = firstOptionLabel;
  selectEl.appendChild(firstOption);

  values.forEach(value => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    selectEl.appendChild(opt);
  });

  if (previousValue && values.includes(previousValue)) {
    selectEl.value = previousValue;
  }
}

function populateFilters() {
  const data = getSystemSheets(systemSelect.value);

  fillSelect(maqamSelect, buildUniqueValues(data, 'maqam'), 'كل المقامات');
  fillSelect(scaleSelect, buildUniqueValues(data, 'scale'), 'All Scales');
  fillSelect(tonicSelect, buildUniqueValues(data, 'tonic'), 'الدرجة');
}

function updateSystemSpecificControls(systemValue) {
  const isArabic = systemValue === 'arabic';
  maqamSelect.style.display = isArabic ? 'inline' : 'none';
  scaleSelect.style.display = isArabic ? 'none' : 'inline';

  if (isArabic) {
    scaleSelect.value = '';
  } else {
    maqamSelect.value = '';
  }
}

function getFilterState() {
  return {
    system: systemSelect.value,
    type: typeSelect.value,
    maqam: maqamSelect.value,
    scale: scaleSelect.value,
    tonic: tonicSelect.value,
    search: searchInput.value.trim()
  };
}

function syncUrlFromState() {
  const state = getFilterState();
  const params = new URLSearchParams();

  if (state.system && state.system !== 'arabic') params.set(URL_KEYS.system, state.system);
  if (state.type) params.set(URL_KEYS.type, state.type);
  if (state.maqam) params.set(URL_KEYS.maqam, state.maqam);
  if (state.scale) params.set(URL_KEYS.scale, state.scale);
  if (state.tonic) params.set(URL_KEYS.tonic, state.tonic);
  if (state.search) params.set(URL_KEYS.search, state.search);

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, '', nextUrl);
}

function applyStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedSystem = params.get(URL_KEYS.system);
  const requestedType = params.get(URL_KEYS.type);
  const requestedMaqam = params.get(URL_KEYS.maqam);
  const requestedScale = params.get(URL_KEYS.scale);
  const requestedTonic = params.get(URL_KEYS.tonic);
  const requestedSearch = params.get(URL_KEYS.search);

  if (requestedSystem && ['arabic', 'western'].includes(requestedSystem)) {
    systemSelect.value = requestedSystem;
  }

  populateFilters();
  updateSystemSpecificControls(systemSelect.value);

  if (requestedType && [...typeSelect.options].some(opt => opt.value === requestedType)) {
    typeSelect.value = requestedType;
  }

  if (requestedMaqam && [...maqamSelect.options].some(opt => opt.value === requestedMaqam)) {
    maqamSelect.value = requestedMaqam;
  }

  if (requestedScale && [...scaleSelect.options].some(opt => opt.value === requestedScale)) {
    scaleSelect.value = requestedScale;
  }

  if (requestedTonic && [...tonicSelect.options].some(opt => opt.value === requestedTonic)) {
    tonicSelect.value = requestedTonic;
  }

  if (requestedSearch) {
    searchInput.value = requestedSearch;
  }
}

function applyFilters() {
  const systemVal = systemSelect.value;
  const typeVal = typeSelect.value;
  const maqamVal = maqamSelect.value;
  const scaleVal = scaleSelect.value;
  const tonicVal = tonicSelect.value;
  const searchVal = normalize(searchInput.value);

  updateSystemSpecificControls(systemVal);

  let filtered = getSystemSheets(systemVal);

  if (typeVal) {
    filtered = filtered.filter(sheet => sheet.type === typeVal);
  }

  if (maqamVal) {
    filtered = filtered.filter(sheet => sheet.maqam === maqamVal);
  }

  if (scaleVal) {
    filtered = filtered.filter(sheet => sheet.scale === scaleVal);
  }

  if (tonicVal) {
    filtered = filtered.filter(sheet => sheet.tonic === tonicVal);
  }

  if (searchVal) {
    filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchVal));
  }

  render(filtered);
  syncUrlFromState();
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

applyStateFromUrl();
populateFilters();
updateSystemSpecificControls(systemSelect.value);
applyFilters();
