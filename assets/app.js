const list = document.getElementById('list');

const performerSelect = document.getElementById('performer');
const maqamSelect = document.getElementById('maqam');
const searchInput = document.getElementById('search');

const URL_KEYS = {
  performer: 'performer',
  maqam: 'maqam',
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

function buildUniqueValues(data, fieldName) {
  return [...new Set(data.map(item => item[fieldName]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'ar'));
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
  fillSelect(
    performerSelect,
    buildUniqueValues(indexedSheets, 'performer'),
    'المطرب'
  );

  fillSelect(
    maqamSelect,
    buildUniqueValues(indexedSheets.filter(sheet => sheet.maqam), 'maqam'),
    'كل المقامات'
  );
}

function getFilterState() {
  return {
    performer: performerSelect.value,
    maqam: maqamSelect.value,
    search: searchInput.value.trim()
  };
}

function syncUrlFromState() {
  const state = getFilterState();
  const params = new URLSearchParams();

  if (state.performer) params.set(URL_KEYS.performer, state.performer);
  if (state.maqam) params.set(URL_KEYS.maqam, state.maqam);
  if (state.search) params.set(URL_KEYS.search, state.search);

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, '', nextUrl);
}

function applyStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedPerformer = params.get(URL_KEYS.performer);
  const requestedMaqam = params.get(URL_KEYS.maqam);
  const requestedSearch = params.get(URL_KEYS.search);

  populateFilters();

  if (requestedPerformer && [...performerSelect.options].some(opt => opt.value === requestedPerformer)) {
    performerSelect.value = requestedPerformer;
  }

  if (requestedMaqam && [...maqamSelect.options].some(opt => opt.value === requestedMaqam)) {
    maqamSelect.value = requestedMaqam;
  }

  if (requestedSearch) {
    searchInput.value = requestedSearch;
  }
}

function applyFilters() {
  const performerVal = performerSelect.value;
  const maqamVal = maqamSelect.value;
  const searchVal = normalize(searchInput.value);

  let filtered = [...indexedSheets];

  if (performerVal) {
    filtered = filtered.filter(sheet => sheet.performer === performerVal);
  }

  if (maqamVal) {
    filtered = filtered.filter(sheet => sheet.maqam === maqamVal);
  }

  if (searchVal) {
    filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchVal));
  }

  render(filtered);
  syncUrlFromState();
}

performerSelect.addEventListener('change', applyFilters);
maqamSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

applyStateFromUrl();
populateFilters();
applyFilters();
