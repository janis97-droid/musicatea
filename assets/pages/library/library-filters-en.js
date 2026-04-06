// assets/pages/library/library-filters-en.js
// English library page filters and boot logic.

(function () {
  const list = document.getElementById('list');
  const systemSelect = document.getElementById('system');
  const typeSelect = document.getElementById('type');
  const searchInput = document.getElementById('search');

  if (!list || !systemSelect || !typeSelect || !searchInput) {
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

  function applyFilters() {
    const systemVal = systemSelect.value;
    const typeVal = typeSelect.value;
    const searchVal = normalize(searchInput.value);

    let filtered = [...indexedSheets];

    if (systemVal) {
      filtered = filtered.filter(sheet => sheet.system === systemVal);
    }

    if (typeVal) {
      filtered = filtered.filter(sheet => sheet.type === typeVal);
    }

    if (searchVal) {
      filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchVal));
    }

    window.renderLibraryList(list, filtered, window.createLibraryEnSheetCard, 'No sheets match the current filters');
  }

  systemSelect.addEventListener('change', applyFilters);
  typeSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  applyFilters();
})();
