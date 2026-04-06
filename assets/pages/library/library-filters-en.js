// assets/pages/library/library-filters-en.js
// English library page filters and boot logic.

(function () {
  const list = document.getElementById('list');
  const systemSelect = document.getElementById('system');
  const typeSelect = document.getElementById('type');
  const maqamSelect = document.getElementById('maqam');
  const scaleSelect = document.getElementById('scale');
  const tonicSelect = document.getElementById('tonic');
  const searchInput = document.getElementById('search');

  if (!list || !systemSelect || !typeSelect || !maqamSelect || !scaleSelect || !tonicSelect || !searchInput) {
    return;
  }

  const indexedSheets = (Array.isArray(window.sheets) ? window.sheets : []).map((sheet, index) => ({
    ...sheet,
    _renderIndex: index,
    _searchBlob: buildLibrarySearchBlob(sheet, ['title', 'composer', 'performer'])
  }));

  function getSystemData() {
    const systemValue = systemSelect.value;
    if (systemValue === 'western') {
      return indexedSheets.filter(sheet => sheet.system === 'western');
    }
    return indexedSheets.filter(sheet => sheet.system === 'arabic');
  }

  function populateFilters() {
    const currentMaqam = maqamSelect.value;
    const currentScale = scaleSelect.value;
    const currentTonic = tonicSelect.value;

    const systemData = getSystemData();

    fillLibrarySelect(
      maqamSelect,
      buildLibraryUniqueValues(systemData.filter(sheet => sheet.maqam), 'maqam', 'en'),
      'All Maqamat'
    );

    fillLibrarySelect(
      scaleSelect,
      buildLibraryUniqueValues(systemData.filter(sheet => sheet.scale), 'scale', 'en'),
      'All Scales'
    );

    fillLibrarySelect(
      tonicSelect,
      buildLibraryUniqueValues(systemData.filter(sheet => sheet.tonic), 'tonic', 'en'),
      'All Tonics'
    );

    if (currentMaqam && [...maqamSelect.options].some(opt => opt.value === currentMaqam)) {
      maqamSelect.value = currentMaqam;
    }

    if (currentScale && [...scaleSelect.options].some(opt => opt.value === currentScale)) {
      scaleSelect.value = currentScale;
    }

    if (currentTonic && [...tonicSelect.options].some(opt => opt.value === currentTonic)) {
      tonicSelect.value = currentTonic;
    }
  }

  function applyFilters() {
    const systemValue = systemSelect.value;
    const typeValue = typeSelect.value;
    const maqamValue = maqamSelect.value;
    const scaleValue = scaleSelect.value;
    const tonicValue = tonicSelect.value;
    const searchValue = normalize(searchInput.value);

    let filtered = getSystemData();

    if (systemValue === 'arabic') {
      maqamSelect.style.display = 'inline';
      scaleSelect.style.display = 'none';
    } else {
      maqamSelect.style.display = 'none';
      scaleSelect.style.display = 'inline';
    }

    if (typeValue) {
      filtered = filtered.filter(sheet => sheet.type === typeValue);
    }

    if (maqamValue) {
      filtered = filtered.filter(sheet => sheet.maqam === maqamValue);
    }

    if (scaleValue) {
      filtered = filtered.filter(sheet => sheet.scale === scaleValue);
    }

    if (tonicValue) {
      filtered = filtered.filter(sheet => sheet.tonic === tonicValue);
    }

    if (searchValue) {
      filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchValue));
    }

    renderLibraryList(list, filtered, createLibraryEnSheetCard, 'No sheets match the current filters');
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
})();
