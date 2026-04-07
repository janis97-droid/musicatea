// assets/pages/library/library-filters-en.js
// English library page logic with translated sheet metadata.
// Renders English/transliterated titles, composers, performers, maqamat, and tonics
// from the shared Arabic-first sheets dataset without duplicating data.

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

  const TITLE_MAP = {
    "لونجا عجم": "Longa Ajam",
    "ليالي الأنس في فيينا": "Layali Al-Uns fi Vienna",
    "لو على قلبي": "Law Ala Albi",
    "قطف الزيتون": "Olive Harvest",
    "سماعي نهاوند (دو)": "Sama'i Nahawand (C)",
    "مينا يافا": "Mina Yafa",
    "وحدن بيبقوا": "Wahdon Biyeb'ou",
    "سماعي نهاوند (ري)": "Sama'i Nahawand (D)",
    "شكراً": "Shukran",
    "ومشينا يا حبيبي": "Wa Msheina Ya Habibi",
    "عالروزانا": "Ala Rozana",
    "أنا قلبي دليلي (دو)": "Ana Albi Dalili (C)",
    "أنا قلبي دليلي (فا)": "Ana Albi Dalili (F)",
    "أنا وليلى": "Ana wa Layla",
    "أنشودة الفن (دو)": "Anshoudat Al-Fann (C)",
    "أنشودة الفن (فا)": "Anshoudat Al-Fann (F)",
    "خسرت كل الناس": "Khesert Kol El Nas",
    "ما في ورد": "Ma Fi Ward",
    "ومنين أبدأ يا قلبي (ري)": "W Minen Abda Ya Albi (D)",
    "ومنين أبدأ يا قلبي (صول)": "W Minen Abda Ya Albi (G)",
    "على مودك انت وبس (ري)": "Ala Moodak Enta w Bas (D)",
    "على مودك انت وبس (صول)": "Ala Moodak Enta w Bas (G)",
    "قضية عم أحمد": "Qadiyat Amm Ahmad",
    "وحياة قلبي وافراحه": "Wehyat Albi wa Afraho",
    "صحاك الشوق": "Sahak El Shoq",
    "سجر البن": "Sajar El Bunn",
    "توبة": "Touba"
  };

  const COMPOSER_MAP = {
    "سامي خشيبون": "Sami Khashiboun",
    "فريد الأطرش": "Farid al-Atrash",
    "نادر نور": "Nader Nour",
    "سيمون شاهين": "Simon Shaheen",
    "مسعود جميل": "Masoud Jamil",
    "اخوين رحباني": "Rahbani Brothers",
    "وليد سعد": "Walid Saad",
    "امجد العاطفي": "Amjad Al-Atifi",
    "عثمان الموصلي": "Othman Al-Mosuli",
    "محمد القصبجي": "Mohamed El-Qasabgi",
    "كاظم الساهر": "Kadim Al Sahir",
    "محمد عبد الوهاب": "Mohammed Abdel Wahab",
    "نزار فرنسيس": "Nizar Francis",
    "فادي صعب": "Fadi Saab",
    "رائد الشامي": "Raed Al-Shami",
    "عمر خيرت": "Omar Khairat",
    "منير مراد": "Mounir Mourad",
    "جمانة جمال": "Jumana Jamal",
    "مارسيل خليفة": "Marcel Khalife"
  };

  const PERFORMER_MAP = {
    "أسمهان": "Asmahan",
    "فضل شاكر": "Fadel Shaker",
    "جوزيف عازر": "Joseph Azer",
    "فيروز": "Fairuz",
    "جورج وسوف": "George Wassouf",
    "تراث": "Traditional",
    "ليلى مراد": "Layla Murad",
    "كاظم الساهر": "Kadim Al Sahir",
    "محمد عبد الوهاب": "Mohammed Abdel Wahab",
    "ملحم بركات": "Melhem Barakat",
    "ماجد المهندس": "Majid Al Mohandis",
    "عبد الحليم حافظ": "Abdel Halim Hafez",
    "مارسيل خليفة": "Marcel Khalife",
    "فادي صعب": "Fadi Saab"
  };

  const MAQAM_MAP = {
    "عجم": "Ajam",
    "نهاوند": "Nahawand",
    "بيات": "Bayat",
    "كرد": "Kurd",
    "هزام": "Huzam",
    "راست": "Rast"
  };

  const TONIC_MAP = {
    "دو": "C",
    "ري": "D",
    "فا": "F",
    "صول": "G",
    "لا": "A",
    "سي نصف بيمول": "B half-flat"
  };

  function translateField(value, map) {
    if (!value) return '';
    return map[value] || value;
  }

  function toEnglishSheet(sheet, index) {
    const titleEn = translateField(sheet.title, TITLE_MAP);
    const composerEn = translateField(sheet.composer, COMPOSER_MAP);
    const performerEn = translateField(sheet.performer, PERFORMER_MAP);
    const maqamEn = translateField(sheet.maqam, MAQAM_MAP);
    const tonicEn = translateField(sheet.tonic, TONIC_MAP);

    return {
      ...sheet,
      _renderIndex: index,
      titleEn,
      composerEn,
      performerEn,
      maqamEn,
      tonicEn,
      _searchBlob: [
        sheet.title,
        titleEn,
        sheet.composer,
        composerEn,
        sheet.performer,
        performerEn,
        sheet.maqam,
        maqamEn,
        sheet.scale,
        sheet.tonic,
        tonicEn
      ]
        .map(value => normalize(value))
        .filter(Boolean)
        .join(' ')
    };
  }

  const sourceSheets = (typeof sheets !== 'undefined' && Array.isArray(sheets))
    ? sheets
    : (Array.isArray(window.sheets) ? window.sheets : []);

  const indexedSheets = sourceSheets.map((sheet, index) => toEnglishSheet(sheet, index));

  function createCard(sheet) {
    const card = document.createElement('div');
    card.className = 'card';

    const titleRow = document.createElement('div');
    titleRow.className = 'card-title-row';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = sheet.titleEn || sheet.title || '';

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
    composerValue.textContent = sheet.composerEn || sheet.composer || '';

    composerRow.appendChild(composerLabel);
    composerRow.appendChild(composerValue);
    credits.appendChild(composerRow);

    if (sheet.performerEn || sheet.performer) {
      const performerRow = document.createElement('div');
      performerRow.className = 'card-credit-row';

      const performerLabel = document.createElement('span');
      performerLabel.className = 'card-credit-label';
      performerLabel.textContent = 'Performer';

      const performerValue = document.createElement('span');
      performerValue.className = 'card-credit-value';
      performerValue.textContent = sheet.performerEn || sheet.performer || '';

      performerRow.appendChild(performerLabel);
      performerRow.appendChild(performerValue);
      credits.appendChild(performerRow);
    }

    header.appendChild(credits);

    const meta = document.createElement('div');
    meta.className = 'card-meta';

    const tagsRow = document.createElement('div');
    tagsRow.className = 'card-tags-row';

    const primaryTag = document.createElement('span');
    primaryTag.className = 'card-tag';
    primaryTag.textContent = sheet.system === 'arabic'
      ? (sheet.maqamEn || sheet.maqam || '')
      : (sheet.scale || '');
    if (primaryTag.textContent) tagsRow.appendChild(primaryTag);

    if (sheet.tonicEn || sheet.tonic) {
      const tonicTag = document.createElement('span');
      tonicTag.className = 'card-tag card-tag-muted';
      tonicTag.textContent = sheet.tonicEn || sheet.tonic || '';
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

  function uniqueValues(fieldName) {
    return [...new Set(indexedSheets.map(item => item[fieldName]).filter(Boolean))];
  }

  function sortByTranslatedDisplay(values, map) {
    return [...values].sort((a, b) => {
      const labelA = translateField(a, map);
      const labelB = translateField(b, map);
      return labelA.localeCompare(labelB, 'en', { sensitivity: 'base' });
    });
  }

  function fillSelect(selectEl, values, firstOptionLabel, map) {
    const previousValue = selectEl.value;
    selectEl.innerHTML = '';

    const firstOption = document.createElement('option');
    firstOption.value = '';
    firstOption.textContent = firstOptionLabel;
    selectEl.appendChild(firstOption);

    values.forEach(value => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = translateField(value, map);
      selectEl.appendChild(opt);
    });

    if (previousValue && values.includes(previousValue)) {
      selectEl.value = previousValue;
    }
  }

  function populateFilters() {
    fillSelect(
      performerSelect,
      sortByTranslatedDisplay(uniqueValues('performer'), PERFORMER_MAP),
      'Singers',
      PERFORMER_MAP
    );

    fillSelect(
      composerSelect,
      sortByTranslatedDisplay(uniqueValues('composer'), COMPOSER_MAP),
      'Composers',
      COMPOSER_MAP
    );

    fillSelect(
      maqamSelect,
      sortByTranslatedDisplay(uniqueValues('maqam'), MAQAM_MAP),
      'Maqams',
      MAQAM_MAP
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
      filtered = filtered.filter(sheet => sheet.performer === performerVal);
    }

    if (composerVal) {
      filtered = filtered.filter(sheet => sheet.composer === composerVal);
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
  composerSelect.addEventListener('change', applyFilters);
  maqamSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  applyStateFromUrl();
  populateFilters();
  applyFilters();
})();
