// assets/pages/library/library-filters-en.js
// English library page logic.
// Reads bilingual fields directly from data/sheets.js with no extra translation map.

(function () {
  const list = document.getElementById('list');
  const performerSelect = document.getElementById('performer');
  const composerSelect = document.getElementById('composer');
  const maqamSelect = document.getElementById('maqam');
  const searchInput = document.getElementById('search');

  if (!list || !performerSelect || !composerSelect || !maqamSelect || !searchInput) {
    return;
  }

  const URL_KEYS = {
    performer: 'performer',
    composer: 'composer',
    maqam: 'maqam',
    search: 'q'
  };

  const sourceSheets = (typeof sheets !== 'undefined' && Array.isArray(sheets))
    ? sheets
    : (Array.isArray(window.sheets) ? window.sheets : []);

  const indexedSheets = sourceSheets.map((sheet, index) => {
    const titleDisplay = sheet.title_en || sheet.title || '';
    const composerDisplay = sheet.composer_en || sheet.composer || '';
    const performerDisplay = sheet.performer_en || sheet.performer || '';
    const maqamDisplay = sheet.maqam_en || sheet.maqam || '';
    const scaleDisplay = sheet.scale_en || sheet.scale || '';
    const tonicDisplay = sheet.tonic_en || sheet.tonic || '';
    const primaryTagDisplay = sheet.system === 'arabic' ? maqamDisplay : scaleDisplay;

    return {
      ...sheet,
      _renderIndex: index,
      _titleDisplay: titleDisplay,
      _composerDisplay: composerDisplay,
      _performerDisplay: performerDisplay,
      _maqamDisplay: maqamDisplay,
      _scaleDisplay: scaleDisplay,
      _tonicDisplay: tonicDisplay,
      _primaryTagDisplay: primaryTagDisplay,
      _searchBlob: [
        sheet.title,
        sheet.title_en,
        titleDisplay,
        sheet.composer,
        sheet.composer_en,
        composerDisplay,
        sheet.performer,
        sheet.performer_en,
        performerDisplay,
        sheet.maqam,
        sheet.maqam_en,
        maqamDisplay,
        sheet.scale,
        sheet.scale_en,
        scaleDisplay,
        sheet.tonic,
        sheet.tonic_en,
        tonicDisplay
      ]
        .map(value => normalize(value))
        .filter(Boolean)
        .join(' ')
    };
  });

  function createPersonPageLink(name) {
    const value = String(name || '').trim();
    if (!value) return '';
    return `<a href="person-en.html?name=${encodeURIComponent(value)}" class="card-credit-link">${escapeHtml(value)}</a>`;
  }

  function createCard(sheet) {
    const card = document.createElement('div');
    card.className = 'card';

    const titleRow = document.createElement('div');
    titleRow.className = 'card-title-row';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = sheet._titleDisplay;

    const badge = document.createElement('span');
    badge.className = sheet.type === 'song' ? 'badge badge-song' : 'badge badge-inst';
    badge.textContent = sheet.type === 'song' ? 'Song' : 'Instrumental';

    titleRow.appendChild(title);
    titleRow.appendChild(badge);

    const header = document.createElement('div');
    header.className = 'card-header';
    header.appendChild(titleRow);

    const credits = document.createElement('div');
    credits.className = 'card-credits';

    const composerRow = document.createElement('div');
    composerRow.className = 'card-credit-row';

    const composerLabel = document.createElement('span');
    composerLabel.className = 'card-credit-label';
    composerLabel.textContent = 'Composer';

    const composerValue = document.createElement('span');
    composerValue.className = 'card-credit-value';
    composerValue.innerHTML = createPersonPageLink(sheet._composerDisplay);

    composerRow.appendChild(composerLabel);
    composerRow.appendChild(composerValue);
    credits.appendChild(composerRow);

    if (sheet._performerDisplay) {
      const performerRow = document.createElement('div');
      performerRow.className = 'card-credit-row';

      const performerLabel = document.createElement('span');
      performerLabel.className = 'card-credit-label';
      performerLabel.textContent = 'Performer';

      const performerValue = document.createElement('span');
      performerValue.className = 'card-credit-value';
      performerValue.innerHTML = createPersonPageLink(sheet._performerDisplay);

      performerRow.appendChild(performerLabel);
      performerRow.appendChild(performerValue);
      credits.appendChild(performerRow);
    }

    header.appendChild(credits);

    const meta = document.createElement('div');
    meta.className = 'card-meta';

    const tagsRow = document.createElement('div');
    tagsRow.className = 'card-tags-row';

    if (sheet._primaryTagDisplay) {
      const primaryTag = document.createElement('span');
      primaryTag.className = 'card-tag';
      primaryTag.textContent = sheet._primaryTagDisplay;
      tagsRow.appendChild(primaryTag);
    }

    if (sheet._tonicDisplay) {
      const tonicTag = document.createElement('span');
      tonicTag.className = 'card-tag card-tag-muted';
      tonicTag.textContent = sheet._tonicDisplay;
      tagsRow.appendChild(tonicTag);
    }

    meta.appendChild(tagsRow);

    const link = document.createElement('a');
    link.className = 'download-btn';
    link.href = sheet.pdf || '#';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Download Sheet';

    card.appendChild(header);
    card.appendChild(meta);
    card.appendChild(link);

    return card;
  }

  function render(data) {
    list.innerHTML = '';

    if (!data.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No sheets match the current filters';
      list.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach((sheet, index) => {
      const card = createCard(sheet);
      card.style.setProperty('--card-index', index);
      fragment.appendChild(card);
    });

    list.appendChild(fragment);
  }

  function buildUniqueValues(data, fieldName) {
    return [...new Set(data.map(item => item[fieldName]).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
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
      buildUniqueValues(indexedSheets, '_performerDisplay'),
      'Singers'
    );

    fillSelect(
      composerSelect,
      buildUniqueValues(indexedSheets, '_composerDisplay'),
      'Composers'
    );

    fillSelect(
      maqamSelect,
      buildUniqueValues(indexedSheets.filter(sheet => sheet._maqamDisplay), '_maqamDisplay'),
      'Maqams'
    );
  }

  function getFilterState() {
    return {
      performer: performerSelect.value,
      composer: composerSelect.value,
      maqam: maqamSelect.value,
      search: searchInput.value.trim()
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

    if (requestedPerformer && [...performerSelect.options].some(opt => opt.value === requestedPerformer)) {
      performerSelect.value = requestedPerformer;
    }

    if (requestedComposer && [...composerSelect.options].some(opt => opt.value === requestedComposer)) {
      composerSelect.value = requestedComposer;
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
    const composerVal = composerSelect.value;
    const maqamVal = maqamSelect.value;
    const searchVal = normalize(searchInput.value);

    let filtered = [...indexedSheets];

    if (performerVal) {
      filtered = filtered.filter(sheet => sheet._performerDisplay === performerVal);
    }

    if (composerVal) {
      filtered = filtered.filter(sheet => sheet._composerDisplay === composerVal);
    }

    if (maqamVal) {
      filtered = filtered.filter(sheet => sheet._maqamDisplay === maqamVal);
    }

    if (searchVal) {
      filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchVal));
    }

    render(filtered);
    syncUrlFromState();
  }

  performerSelect.addEventListener('change', applyFilters);
  composerSelect.addEventListener('change', applyFilters);
  maqamSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  applyStateFromUrl();
  populateFilters();
  applyFilters();
})();
