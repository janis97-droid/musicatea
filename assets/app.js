const list = document.getElementById('list');
const performerSelect = document.getElementById('performer');
const composerSelect = document.getElementById('composer');
const maqamSelect = document.getElementById('maqam');
const searchInput = document.getElementById('search');

if (!list || !performerSelect || !composerSelect || !maqamSelect || !searchInput) {
  console.warn('Library filters: one or more required elements are missing.');
}

const sourceSheets = (typeof sheets !== 'undefined' && Array.isArray(sheets))
  ? sheets
  : (Array.isArray(window.sheets) ? window.sheets : []);

const URL_KEYS = {
  performer: 'performer',
  composer: 'composer',
  maqam: 'maqam',
  search: 'q'
};

const indexedSheets = sourceSheets.map((sheet, index) => ({
  ...sheet,
  _renderIndex: index,
  _searchTitle: normalize(sheet.title),
  _searchComposer: normalize(sheet.composer),
  _searchPerformer: normalize(sheet.performer),
  _searchBlob: [sheet.title, sheet.composer, sheet.performer, sheet.maqam, sheet.scale, sheet.tonic]
    .map(normalize)
    .filter(Boolean)
    .join(' ')
}));

function render(data) {
  if (!list) return;

  list.innerHTML = '';

  if (data.length === 0) {
    list.appendChild(createEmptyState('لا توجد نوتات مطابقة للفلتر'));
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach((sheet, index) => {
    const card = createSheetCard(sheet);
    card.style.setProperty('--card-index', index);
    fragment.appendChild(card);
  });

  list.appendChild(fragment);
}

function buildUniqueValues(data, fieldName) {
  return [...new Set(data.map(item => item[fieldName]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'ar'));
}

function fillSelect(selectEl, values, firstOptionLabel) {
  if (!selectEl) return;

  const previousValue = selectEl.value;
  selectEl.innerHTML = '';

  const firstOption = document.createElement('option');
  firstOption.value = '';
  firstOption.textContent = firstOptionLabel;
  selectEl.appendChild(firstOption);

  values.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  });

  if (previousValue && values.includes(previousValue)) {
    selectEl.value = previousValue;
  }
}

function populateFilters() {
  fillSelect(
    performerSelect,
    buildUniqueValues(indexedSheets, 'performer'),
    'المطرب'
  );

  fillSelect(
    composerSelect,
    buildUniqueValues(indexedSheets, 'composer'),
    'كل الملحنين'
  );

  fillSelect(
    maqamSelect,
    buildUniqueValues(indexedSheets.filter(sheet => sheet.maqam), 'maqam'),
    'كل المقامات'
  );
}

function getFilterState() {
  return {
    performer: performerSelect ? performerSelect.value : '',
    composer: composerSelect ? composerSelect.value : '',
    maqam: maqamSelect ? maqamSelect.value : '',
    search: searchInput ? searchInput.value.trim() : ''
  };
}

function syncUrlFromState() {
  const state = getFilterState();
  const params = new URLSearchParams();

  if (state.performer) params.set(URL_KEYS.performer, state.performer);
  if (state.composer) params.set(URL_KEYS.composer, state.composer);
  if (state.maqam) params.set(URL_KEYS.maqam, state.maqam);
  if (state.search) params.set(URL_KEYS.search, state.search);

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, '', nextUrl);
}

function applyStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedPerformer = params.get(URL_KEYS.performer);
  const requestedComposer = params.get(URL_KEYS.composer);
  const requestedMaqam = params.get(URL_KEYS.maqam);
  const requestedSearch = params.get(URL_KEYS.search);

  populateFilters();

  if (requestedPerformer && performerSelect && [...performerSelect.options].some(option => option.value === requestedPerformer)) {
    performerSelect.value = requestedPerformer;
  }

  if (requestedComposer && composerSelect && [...composerSelect.options].some(option => option.value === requestedComposer)) {
    composerSelect.value = requestedComposer;
  }

  if (requestedMaqam && maqamSelect && [...maqamSelect.options].some(option => option.value === requestedMaqam)) {
    maqamSelect.value = requestedMaqam;
  }

  if (requestedSearch && searchInput) {
    searchInput.value = requestedSearch;
  }
}

function applyFilters() {
  const performerValue = performerSelect ? performerSelect.value : '';
  const composerValue = composerSelect ? composerSelect.value : '';
  const maqamValue = maqamSelect ? maqamSelect.value : '';
  const searchValue = normalize(searchInput ? searchInput.value : '');

  let filtered = [...indexedSheets];

  if (performerValue) {
    filtered = filtered.filter(sheet => sheet.performer === performerValue);
  }

  if (composerValue) {
    filtered = filtered.filter(sheet => sheet.composer === composerValue);
  }

  if (maqamValue) {
    filtered = filtered.filter(sheet => sheet.maqam === maqamValue);
  }

  if (searchValue) {
    filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchValue));
  }

  render(filtered);
  syncUrlFromState();
}

if (performerSelect) performerSelect.addEventListener('change', applyFilters);
if (composerSelect) composerSelect.addEventListener('change', applyFilters);
if (maqamSelect) maqamSelect.addEventListener('change', applyFilters);
if (searchInput) searchInput.addEventListener('input', applyFilters);

applyStateFromUrl();
populateFilters();
applyFilters();
