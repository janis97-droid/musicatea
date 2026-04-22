(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const loader = window.MaqamContentLoader || null;

  function getPageLanguage() {
    const lang = (document.documentElement.getAttribute('lang') || 'ar').toLowerCase();
    return lang.startsWith('en') ? 'en' : 'ar';
  }

  function getUiText() {
    const lang = getPageLanguage();
    if (lang === 'en') {
      return {
        definition: 'Maqam definition',
        placeholderDefinition: 'The maqam definition will be added here later.',
        path: 'How the maqam moves',
        rest: 'Resting tones',
        motion: 'Motion tones',
        mods: 'Where the maqam goes',
        examplesBlock: 'Examples',
        songs: 'Songs and pieces',
        songsPlaceholder: 'Songs and instrumental examples for this maqam will be added here later.',
        librarySheets: 'Examples from the sheet library',
        librarySheetsPlaceholder: 'No sheet-library examples have been linked to this maqam yet.',
        relatedFigures: 'Related figures from the linked works',
        relatedFiguresPlaceholder: 'No related figures have been inferred from the linked sheet-library works yet.',
        videos: 'Video examples',
        videosPlaceholder: 'Video examples for this maqam will be added here later.',
        references: 'Sources and references',
        referencesPlaceholder: 'Sources and references for this maqam will be added here later.',
        video: 'Video',
        audio: 'Audio',
        link: 'Link',
        openSheet: 'Open sheet',
        openProfile: 'Open profile',
        singer: 'Singer',
        composer: 'Composer',
        tonics: 'Available keys',
        instrumental: 'Instrumental'
      };
    }
    return {
      definition: 'تعريف المقام',
      placeholderDefinition: 'سيُضاف تعريف هذا المقام لاحقًا.',
      path: 'كيف يسير المقام',
      rest: 'درجات الارتكاز',
      motion: 'درجات الحركة',
      mods: 'أين يذهب المقام',
      examplesBlock: 'أمثلة',
      songs: 'أغاني وقطع',
      songsPlaceholder: 'ستُضاف أمثلة الأغاني والقطع لهذا المقام لاحقًا.',
      librarySheets: 'أمثلة من مكتبة النوتات',
      librarySheetsPlaceholder: 'لا توجد بعد أمثلة مرتبطة من مكتبة النوتات لهذا المقام.',
      relatedFigures: 'شخصيات مرتبطة من الأعمال الموصولة',
      relatedFiguresPlaceholder: 'لم تُستنتج بعد شخصيات مرتبطة من الأعمال الموصولة في مكتبة النوتات.',
      videos: 'أمثلة مرئية / فيديو',
      videosPlaceholder: 'ستُضاف أمثلة الفيديو لهذا المقام لاحقًا.',
      references: 'مصادر ومراجع',
      referencesPlaceholder: 'ستُضاف المصادر والمراجع لهذا المقام لاحقًا.',
      video: 'فيديو',
      audio: 'صوت',
      link: 'رابط',
      openSheet: 'فتح النوتة',
      openProfile: 'افتح الصفحة الكاملة',
      singer: 'المؤدي',
      composer: 'الملحن',
      tonics: 'الطبقات المتوفرة',
      instrumental: 'آلة / قطعة موسيقية'
    };
  }

  function escapeHtml(v) {
    return String(v || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function createContentCard(title, body, ph = false) {
    return `<section class="maqam-content-card ${ph ? 'maqam-content-card-placeholder' : ''}"><h3>${title}</h3>${body}</section>`;
  }

  function createBulletList(items) {
    const v = Array.isArray(items) ? items.filter(Boolean) : [];
    return v.length ? `<ul class="maqam-content-list">${v.map((i) => `<li>${escapeHtml(String(i))}</li>`).join('')}</ul>` : '';
  }

  function createPlaceholderBody(m) {
    return `<p class="maqam-content-copy">${escapeHtml(m)}</p>`;
  }

  function createAccordionItem(id, title, body, open = false, level = 'sub') {
    return `<div class="maqam-acc-item ${open ? 'is-open' : ''}" data-acc-item="${id}" data-acc-level="${level}"><button type="button" class="maqam-acc-trigger" data-acc-trigger="${id}" aria-expanded="${open ? 'true' : 'false'}"><span>${title}</span></button><div class="maqam-acc-panel" data-acc-panel="${id}" ${open ? '' : 'hidden'}>${body}</div></div>`;
  }

  function createDefinitionCard(model) {
    const t = getUiText();
    const sayr = model && model.sayr ? model.sayr : null;
    if (!sayr) {
      return `<section class="maqam-content-card maqam-content-card-placeholder maqam-definition-card"><div class="maqam-acc-root" data-acc-root="definition">${createAccordionItem('def-main', t.definition, createPlaceholderBody(t.placeholderDefinition), true, 'main')}</div></section>`;
    }

    const summary = sayr.summary ? `<p class="maqam-content-copy">${escapeHtml(sayr.summary)}</p>` : createPlaceholderBody(t.placeholderDefinition);
    const path = createBulletList(sayr.common_path);
    const rest = createBulletList(sayr.resting_tones);
    const motion = createBulletList(sayr.motion_notes);
    const mods = createBulletList(model && (model.common_modulations || model.modulations || model.modulation_paths));

    const subItems = [
      path ? createAccordionItem('def-path', t.path, path, false, 'sub') : '',
      rest ? createAccordionItem('def-rest', t.rest, rest, false, 'sub') : '',
      motion ? createAccordionItem('def-motion', t.motion, motion, false, 'sub') : '',
      mods ? createAccordionItem('def-mods', t.mods, mods, false, 'sub') : ''
    ].filter(Boolean).join('');

    const mainBody = `<div class="maqam-definition-summary">${summary}</div>${subItems ? `<div class="maqam-sub-accordion" data-acc-group="definition-sub">${subItems}</div>` : ''}`;
    return `<section class="maqam-content-card maqam-definition-card"><div class="maqam-acc-root" data-acc-root="definition">${createAccordionItem('def-main', t.definition, mainBody, true, 'main')}</div></section>`;
  }

  function bindExclusiveAccordions(scope) {
    scope.querySelectorAll('[data-acc-trigger]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.accTrigger;
        const item = scope.querySelector(`[data-acc-item="${id}"]`);
        const level = item ? item.dataset.accLevel : 'sub';
        const group = level === 'main' ? scope.querySelector('[data-acc-root="definition"]') : item && item.parentElement;
        if (!item || !group) return;

        const willOpen = !item.classList.contains('is-open');
        group.querySelectorAll(':scope > .maqam-acc-item').forEach((other) => {
          other.classList.remove('is-open');
          const p = other.querySelector(':scope > [data-acc-panel]');
          const tr = other.querySelector(':scope > [data-acc-trigger]');
          if (p) p.hidden = true;
          if (tr) tr.setAttribute('aria-expanded', 'false');
        });

        if (willOpen) {
          item.classList.add('is-open');
          const panel = item.querySelector(':scope > [data-acc-panel]');
          if (panel) panel.hidden = false;
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function normalizeExampleEntries(items) {
    return (Array.isArray(items) ? items : []).filter(Boolean).map((i) => (typeof i === 'string' ? { title: i } : i));
  }

  function pickFirstUrl(item, keys) {
    for (const k of keys) {
      const v = item && item[k];
      if (v && String(v).trim()) return String(v).trim();
    }
    return '';
  }

  function normalizeCompareValue(v) {
    return String(v || '')
      .trim()
      .toLowerCase()
      .replace(/[_\-]+/g, ' ')
      .replace(/\s+/g, ' ');
  }

  function getCurrentMaqamCandidates(lang) {
    const candidates = new Set();
    const maqamId = ns && ns.state ? ns.state.maqamId : null;
    if (!maqamId) return candidates;

    const addMaqamValues = (maqam) => {
      if (!maqam) return;
      [maqam.id, maqam.name, maqam.latin].forEach((value) => {
        const normalized = normalizeCompareValue(value);
        if (normalized) candidates.add(normalized);
      });
    };

    if (typeof getMaqamById === 'function') {
      addMaqamValues(getMaqamById(maqamId));
    }
    if (typeof getEnglishMaqamById === 'function') {
      addMaqamValues(getEnglishMaqamById(maqamId));
    }

    if (lang === 'ar' && maqamId === 'bayati') candidates.add(normalizeCompareValue('بيات'));
    if (lang === 'en' && maqamId === 'bayati') candidates.add(normalizeCompareValue('bayat'));

    return candidates;
  }

  function getAllSheets() {
    if (typeof globalThis !== 'undefined' && Array.isArray(globalThis.sheets)) {
      return globalThis.sheets;
    }
    if (typeof sheets !== 'undefined' && Array.isArray(sheets)) {
      return sheets;
    }
    return [];
  }

  function getSheetField(sheet, lang, field) {
    if (!sheet || !field) return '';
    if (lang === 'en') {
      const enKey = `${field}_en`;
      if (sheet[enKey]) return sheet[enKey];
    }
    return sheet[field] || '';
  }

  function collectLibraryExamples() {
    const lang = getPageLanguage();
    const t = getUiText();
    const allSheets = getAllSheets();
    const maqamCandidates = getCurrentMaqamCandidates(lang);
    if (!allSheets.length || !maqamCandidates.size) return [];

    const grouped = new Map();

    allSheets.forEach((sheet) => {
      if (!sheet || sheet.system !== 'arabic') return;
      const sheetMaqam = normalizeCompareValue(getSheetField(sheet, lang, 'maqam'));
      if (!sheetMaqam || !maqamCandidates.has(sheetMaqam)) return;

      const title = getSheetField(sheet, lang, 'title');
      const performer = getSheetField(sheet, lang, 'performer');
      const composer = getSheetField(sheet, lang, 'composer');
      const tonic = getSheetField(sheet, lang, 'tonic');
      const pdf = sheet.pdf || '';
      const groupKey = [normalizeCompareValue(title), normalizeCompareValue(performer), normalizeCompareValue(composer)].join('|');

      if (!grouped.has(groupKey)) {
        grouped.set(groupKey, {
          title,
          performer,
          composer,
          versions: [],
          type: sheet.type || ''
        });
      }

      const entry = grouped.get(groupKey);
      const versionKey = `${normalizeCompareValue(tonic)}|${pdf}`;
      const exists = entry.versions.some((v) => `${normalizeCompareValue(v.tonic)}|${v.sheet_url}` === versionKey);
      if (!exists && pdf) {
        entry.versions.push({ tonic, sheet_url: pdf, link_label: tonic || t.openSheet });
      }
    });

    return Array.from(grouped.values()).map((entry) => {
      const metaParts = [];
      if (entry.performer) {
        metaParts.push(`${t.singer}: ${entry.performer}`);
      } else if (entry.type === 'instrumental') {
        metaParts.push(t.instrumental);
      }
      if (entry.composer) metaParts.push(`${t.composer}: ${entry.composer}`);
      const tonicNames = entry.versions.map((v) => v.tonic).filter(Boolean);
      const note = tonicNames.length > 1
        ? `${t.tonics}: ${tonicNames.join(lang === 'en' ? ', ' : '، ')}`
        : '';
      return {
        title: entry.title,
        performer: metaParts.join(' — '),
        note,
        versions: entry.versions
      };
    });
  }

  function collectRelatedFigures() {
    const lang = getPageLanguage();
    const allSheets = getAllSheets();
    const maqamCandidates = getCurrentMaqamCandidates(lang);
    if (!allSheets.length || !maqamCandidates.size) return [];

    const figures = new Map();

    allSheets.forEach((sheet) => {
      if (!sheet || sheet.system !== 'arabic') return;
      const sheetMaqam = normalizeCompareValue(getSheetField(sheet, lang, 'maqam'));
      if (!sheetMaqam || !maqamCandidates.has(sheetMaqam)) return;

      [
        { name: getSheetField(sheet, lang, 'composer') || getSheetField(sheet, lang === 'en' ? 'ar' : 'en', 'composer'), role: getUiText().composer },
        { name: getSheetField(sheet, lang, 'performer') || getSheetField(sheet, lang === 'en' ? 'ar' : 'en', 'performer'), role: getUiText().singer }
      ].forEach((entry) => {
        const name = String(entry.name || '').trim();
        if (!name) return;
        const key = normalizeCompareValue(name);
        if (!figures.has(key)) {
          figures.set(key, { name, role: entry.role });
        }
      });
    });

    return Array.from(figures.values()).slice(0, 16);
  }

  function buildExampleActions(item) {
    const t = getUiText();
    const video = pickFirstUrl(item, ['video_url', 'video', 'youtube', 'youtube_url']);
    const audio = pickFirstUrl(item, ['audio_url', 'audio', 'recording_url']);
    const link = pickFirstUrl(item, ['url', 'link', 'href']);
    const actions = [];

    if (Array.isArray(item.versions) && item.versions.length) {
      item.versions.forEach((version) => {
        if (!version || !version.sheet_url) return;
        const label = version.tonic ? `${t.openSheet} (${version.tonic})` : t.openSheet;
        actions.push(`<a class="maqam-example-action" href="${escapeHtml(version.sheet_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`);
      });
    } else {
      const sheetUrl = pickFirstUrl(item, ['sheet_url', 'pdf']);
      if (sheetUrl) actions.push(`<a class="maqam-example-action" href="${escapeHtml(sheetUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.link_label || t.openSheet)}</a>`);
    }

    if (video) actions.push(`<a class="maqam-example-action" href="${escapeHtml(video)}" target="_blank" rel="noopener noreferrer">${t.video}</a>`);
    if (audio) actions.push(`<a class="maqam-example-action" href="${escapeHtml(audio)}" target="_blank" rel="noopener noreferrer">${t.audio}</a>`);
    if (link) actions.push(`<a class="maqam-example-action" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${t.link}</a>`);
    return actions.join('');
  }

  function createExamplesMarkup(items) {
    const v = normalizeExampleEntries(items);
    return v.length ? `<ul class="maqam-example-list">${v.map((item) => {
      const title = item.title || item.name || '';
      const perf = item.artist || item.performer || item.singer || '';
      const note = item.note || item.notes || item.description || '';
      const actions = buildExampleActions(item);
      return `<li class="maqam-example-item">${title ? `<span class="maqam-example-title">${escapeHtml(title)}</span>` : ''}${perf ? `<span class="maqam-example-meta">${escapeHtml(perf)}</span>` : ''}${note ? `<span class="maqam-example-note">${escapeHtml(note)}</span>` : ''}${actions ? `<div class="maqam-example-actions">${actions}</div>` : ''}</li>`;
    }).join('')}</ul>` : '';
  }

  function createRelatedFiguresMarkup(items) {
    const t = getUiText();
    const v = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!v.length) return createPlaceholderBody(t.relatedFiguresPlaceholder);
    const hrefBase = getPageLanguage() === 'en' ? 'person-en.html' : 'person.html';
    return `<div class="maqam-example-actions">${v.map((item) => {
      const label = item.role ? `${item.name} — ${item.role}` : item.name;
      return `<a class="maqam-example-action" href="${escapeHtml(hrefBase)}?name=${encodeURIComponent(item.name)}">${escapeHtml(label)}</a>`;
    }).join('')}</div>`;
  }

  function createExamplesAccordionCard(model) {
    const t = getUiText();
    const songsItems = model && (model.examples || model.listening_examples || model.repertoire_examples);
    const songsMarkup = createExamplesMarkup(songsItems) || createPlaceholderBody(t.songsPlaceholder);
    const libraryItems = collectLibraryExamples();
    const libraryMarkup = createExamplesMarkup(libraryItems) || createPlaceholderBody(t.librarySheetsPlaceholder);
    const figuresMarkup = createRelatedFiguresMarkup(collectRelatedFigures());
    const hasSongs = !!createExamplesMarkup(songsItems);
    const hasLibrary = !!createExamplesMarkup(libraryItems);

    const body = `<div class="maqam-acc-root" data-acc-root="examples">${[
      createAccordionItem('examples-songs', t.songs, songsMarkup, false, 'sub'),
      createAccordionItem('examples-library', t.librarySheets, libraryMarkup, true, 'sub'),
      createAccordionItem('examples-figures', t.relatedFigures, figuresMarkup, false, 'sub')
    ].join('')}</div>`;

    return `<section class="maqam-content-card ${(!hasSongs && !hasLibrary) ? 'maqam-content-card-placeholder' : ''}"><h3>${t.examplesBlock}</h3>${body}</section>`;
  }

  function createVideoExamplesCard(model) {
    const items = model && (model.video_examples || model.video_listening_examples);
    const markup = createExamplesMarkup(items);
    if (!markup) return '';
    const t = getUiText();
    return createContentCard(t.videos, markup, false);
  }

  function createReferencesCard(model) {
    const t = getUiText();
    const v = model && (model.reference_recordings || model.canonical_pieces || model.references);
    const body = Array.isArray(v) && v.length ? (typeof v[0] === 'object' ? createExamplesMarkup(v) : createBulletList(v)) : createPlaceholderBody(t.referencesPlaceholder);
    const ph = !(Array.isArray(v) && v.length);
    return `<section class="maqam-content-card ${ph ? 'maqam-content-card-placeholder' : ''} maqam-sources-footer-card"><details class="maqam-sources-accordion"><summary class="maqam-sources-summary">${t.references}</summary><div class="maqam-sources-body">${body}</div></details></section>`;
  }

  async function renderMaqamContentSections() {
    const c = document.getElementById('maqam-content-sections');
    const f = document.getElementById('maqam-sources-footer');
    if (!c || !f || !loader || typeof loader.buildMaqamContentModel !== 'function') return;

    try {
      const model = await loader.buildMaqamContentModel(ns.state.maqamId);
      c.innerHTML = [
        createDefinitionCard(model),
        createExamplesAccordionCard(model),
        createVideoExamplesCard(model)
      ].filter(Boolean).join('');
      f.innerHTML = createReferencesCard(model);
      bindExclusiveAccordions(c);
    } catch (e) {
      c.innerHTML = [
        createDefinitionCard(null),
        createExamplesAccordionCard(null),
        createVideoExamplesCard(null)
      ].filter(Boolean).join('');
      f.innerHTML = createReferencesCard(null);
      bindExclusiveAccordions(c);
    }
  }

  ns.rendererContent = {
    escapeHtml,
    renderMaqamContentSections,
    getPageLanguage,
    getUiText
  };
})();
