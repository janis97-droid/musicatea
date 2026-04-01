const list = document.getElementById('list');

const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');
const maqamSelect = document.getElementById('maqam');
const scaleSelect = document.getElementById('scale');
const tonicSelect = document.getElementById('tonic');
const searchInput = document.getElementById('search');

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
updateSystemSpecificControls(systemSelect.value);
applyFilters();
