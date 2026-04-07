// assets/pages/library/library-filters-en.js
// English library page logic: performer + composer + maqam + search.

(function () {
  const list = document.getElementById('list');
  const performerSelect = document.getElementById('performer');
  const composerSelect = document.getElementById('composer');
  const maqamSelect = document.getElementById('maqam');
  const searchInput = document.getElementById('search');

  if (!list || !performerSelect || !composerSelect || !maqamSelect || !searchInput) {
    return;
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
    _searchBlob: [sheet.title, sheet.composer, sheet.performer, sheet.maqam, sheet.scale, sheet.tonic]
      .map(value => normalize(value))
      .filter(Boolean)
      .join(' ')
  }));

  function createCard(sheet) {
    const card = document.createElement('div');
    card.className = 'card';

    const titleRow = document.createElement('div');
    titleRow.className = 'card-title-row';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = sheet.title || '';

    const badge = document.createElement('span');
    badge.className = sheet.type === 'song' ? 'badge badge-song' : 'badge badge-inst';
    badge.textContent = sheet.type === 'song' ? 'Song' : 'Instrumental';

    titleRow.appendChild(title);
    titleRow.appendChild(badge);

    const header = document.createElement('div');
    header.className = 'card-header';
    header.appendChild(titleRow);

    const composer = document.createElement('p');
    composer.className = 'card-composer';
    composer.textContent = sheet.composer || '';
    header.appendChild(composer);

    if (sheet.performer) {
      const performer = document.createElement('p');
      performer.className = 'card-performer';
      performer.textContent = sheet.performer;
      header.appendChild(performer);
    }

    const meta = document.createElement('div');
    meta.className = 'card-meta';

    const primaryTag = document.createElement('span');
    primaryTag.className = 'card-maqam';
    primaryTag.textContent = sheet.system === 'arabic' ? (sheet.maqam || '') : (sheet.scale || '');
    if (primaryTag.textContent) meta.appendChild(primaryTag);

    if (sheet.tonic) {
      const tonicTag = document.createElement('span');
      tonicTag.className = 'card-tonic';
      tonicTag.textContent = sheet.tonic;
      meta.appendChild(tonicTag);
    }

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
      .sort((a, b) => a.localeCompare(b));
  }

  function fillSelect(selectEl, values, firstOptionLabel) {
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
      'Singers'
    );

    fillSelect(
      composerSelect,
      buildUniqueValues(indexedSheets, 'composer'),
      'Composers'
    );

    fillSelect(
      maqamSelect,
      buildUniqueValues(indexedSheets.filter(sheet => sheet.maqam), 'maqam'),
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

    if (requestedPerformer && [...performerSelect.options].some(option => option.value === requestedPerformer)) {
      performerSelect.value = requestedPerformer;
    }

    if (requestedComposer && [...composerSelect.options].some(option => option.value === requestedComposer)) {
      composerSelect.value = requestedComposer;
    }

    if (requestedMaqam && [...maqamSelect.options].some(option => option.value === requestedMaqam)) {
      maqamSelect.value = requestedMaqam;
    }

    if (requestedSearch) {
      searchInput.value = requestedSearch;
    }
  }

  function applyFilters() {
    const performerValue = performerSelect.value;
    const composerValue = composerSelect.value;
    const maqamValue = maqamSelect.value;
    const searchValue = normalize(searchInput.value);

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

  performerSelect.addEventListener('change', applyFilters);
  composerSelect.addEventListener('change', applyFilters);
  maqamSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  applyStateFromUrl();
  populateFilters();
  applyFilters();
})();
