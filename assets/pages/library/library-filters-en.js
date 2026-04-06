// assets/pages/library/library-filters-en.js
// Self-contained English library page logic.

(function () {
  const list = document.getElementById('list');
  const systemSelect = document.getElementById('system');
  const typeSelect = document.getElementById('type');
  const searchInput = document.getElementById('search');

  if (!list || !systemSelect || !typeSelect || !searchInput) {
    return;
  }

  const sourceSheets = (typeof sheets !== 'undefined' && Array.isArray(sheets))
    ? sheets
    : (Array.isArray(window.sheets) ? window.sheets : []);

  const indexedSheets = sourceSheets.map((sheet, index) => ({
    ...sheet,
    _renderIndex: index,
    _searchBlob: [sheet.title, sheet.composer, sheet.performer]
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

  function applyFilters() {
    const systemVal = systemSelect.value;
    const typeVal = typeSelect.value;
    const searchVal = normalize(searchInput.value);

    let filtered = [...indexedSheets];

    if (systemVal) filtered = filtered.filter(sheet => sheet.system === systemVal);
    if (typeVal) filtered = filtered.filter(sheet => sheet.type === typeVal);
    if (searchVal) filtered = filtered.filter(sheet => sheet._searchBlob.includes(searchVal));

    render(filtered);
  }

  systemSelect.addEventListener('change', applyFilters);
  typeSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  applyFilters();
})();
