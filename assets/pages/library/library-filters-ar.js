// assets/pages/library/library-filters-ar.js
// Arabic library page filters and boot logic.

(function () {
  const list = document.getElementById('list');
  const performerSelect = document.getElementById('performer');
  const maqamSelect = document.getElementById('maqam');
  const searchInput = document.getElementById('search');

  if (!list || !performerSelect || !maqamSelect || !searchInput) {
    return;
  }

  const indexedSheets = (Array.isArray(window.sheets) ? window.sheets : []).map((sheet, index) => ({
    ...sheet,
    _renderIndex: index,
    _searchBlob: [sheet.title, sheet.composer, sheet.performer]
      .map(normalize)
      .filter(Boolean)
      .join(' ')
  }));

  function buildUniqueValues(data, fieldName) {
    return [...new Set(data.map(item => item[fieldName]).filter(Boolean))]
      .sort((a, b) => localeCompare(a, b, 'ar'));
  }

  function localeCompare(a, b, locale) {
    return String(a).localeCompare(String(b), locale);
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
    fillSelect(performerSelect, buildUniqueValues(indexedSheets, 'performer'), المطرب);
    fillSelect(maqamSelect, buildUniqueValues(indexedSheets.filter(sheet => sheet.maqam), 'maqam'), 'كل المقامات');
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

    window.renderLibraryList(list, filtered, window.createLibraryArSheetCard, 'لا توجد نوتات مطابقة للفلتر');
  }

  performerSelect.addEventListener('change', applyFilters);
  maqamSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  populateFilters();
  applyFilters();
})();
