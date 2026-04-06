// assets/pages/library/library-core.js
// Shared helpers for split library pages.

(function () {
  function toArray(value) {
    return Array.isArray(value) ? value : [];
  }

  window.renderLibraryList = function renderLibraryList(listEl, data, createCard, emptyMessage) {
    if (!listEl) return;

    listEl.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      listEl.appendChild(createEmptyState(emptyMessage));
      return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach((item, index) => {
      const card = createCard(item);
      if (!card) return;
      card.style.setProperty('--card-index', index);
      fragment.appendChild(card);
    });

    listEl.appendChild(fragment);
  };

  window.buildLibraryUniqueValues = function buildLibraryUniqueValues(data, fieldName, locale) {
    return [...new Set(toArray(data).map(item => item && item[fieldName]).filter(Boolean))]
      .sort((a, b) => String(a).localeCompare(String(b), locale || 'en'));
  };

  window.fillLibrarySelect = function fillLibrarySelect(selectEl, values, firstOptionLabel, getLabel) {
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
      option.textContent = typeof getLabel === 'function' ? getLabel(value) : value;
      selectEl.appendChild(option);
    });

    if (previousValue && values.includes(previousValue)) {
      selectEl.value = previousValue;
    }
  };

  window.buildLibrarySearchBlob = function buildLibrarySearchBlob(sheet, fields) {
    return toArray(fields)
      .map(field => normalize(sheet && sheet[field]))
      .filter(Boolean)
      .join(' ');
  };
})();
