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
        videos: 'Video examples',
        videosPlaceholder: 'Video examples for this maqam will be added here later.',
        references: 'Sources and references',
        referencesPlaceholder: 'Sources and references for this maqam will be added here later.',
        video: 'Video',
        audio: 'Audio',
        link: 'Link',
        openSheet: 'Open sheet',
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
      videos: 'أمثلة مرئية / فيديو',
      videosPlaceholder: 'ستُضاف أمثلة الفيديو لهذا المقام لاحقًا.',
      references: 'مصادر ومراجع',
      referencesPlaceholder: 'ستُضاف المصادر والمراجع لهذا المقام لاحقًا.',
      video: 'فيديو',
      audio: 'صوت',
      link: 'رابط',
      openSheet: 'فتح النوتة',
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
          tonics: [],
          pdf,
          type: sheet.type || ''
        });
      }

      const entry = grouped.get(groupKey);
      if (tonic && !entry.tonics.includes(tonic)) entry.tonics.push(tonic);
      if (!entry.pdf && pdf) entry.pdf = pdf;
    });

    return Array.from(grouped.values()).map((entry) => {
      const metaParts = [];
      if (entry.performer) {
        metaParts.push(`${t.singer}: ${entry.performer}`);
      } else if (entry.type === 'instrumental') {
        metaParts.push(t.instrumental);
      }
      if (entry.composer) metaParts.push(`${t.composer}: ${entry.composer}`);
      const note = entry.tonics.length
        ? `${t.tonics}: ${entry.tonics.join(lang === 'en' ? ', ' : '، ')}`
        : '';
      return {
        title: entry.title,
        performer: metaParts.join(' — '),
        note,
        sheet_url: entry.pdf,
        link_label: t.openSheet
      };
    });
  }

  function buildExampleActions(item) {
    const t = getUiText();
    const video = pickFirstUrl(item, ['video_url', 'video', 'youtube', 'youtube_url']);
    const audio = pickFirstUrl(item, ['audio_url', 'audio', 'recording_url']);
    const sheetUrl = pickFirstUrl(item, ['sheet_url', 'pdf']);
    const link = pickFirstUrl(item, ['url', 'link', 'href']);
    const a = [];
    if (video) a.push(`<a class="maqam-example-action" href="${escapeHtml(video)}" target="_blank" rel="noopener noreferrer">${t.video}</a>`);
    if (audio) a.push(`<a class="maqam-example-action" href="${escapeHtml(audio)}" target="_blank" rel="noopener noreferrer">${t.audio}</a>`);
    if (sheetUrl) a.push(`<a class="maqam-example-action" href="${escapeHtml(sheetUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.link_label || t.openSheet)}</a>`);
    if (link) a.push(`<a class="maqam-example-action" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${t.link}</a>`);
    return a.join('');
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

  function createExamplesAccordionCard(model) {
    const t = getUiText();
    const songsItems = model && (model.examples || model.listening_examples || model.repertoire_examples);
    const songsMarkup = createExamplesMarkup(songsItems) || createPlaceholderBody(t.songsPlaceholder);
    const libraryItems = collectLibraryExamples();
    const libraryMarkup = createExamplesMarkup(libraryItems) || createPlaceholderBody(t.librarySheetsPlaceholder);
    const hasSongs = !!createExamplesMarkup(songsItems);
    const hasLibrary = !!createExamplesMarkup(libraryItems);

    const body = `<div class="maqam-acc-root" data-acc-root="examples">${[
      createAccordionItem('examples-songs', t.songs, songsMarkup, false, 'sub'),
      createAccordionItem('examples-library', t.librarySheets, libraryMarkup, true, 'sub')
    ].join('')}</div>`;

    return `<section class="maqam-content-card ${(!hasSongs && !hasLibrary) ? 'maqam-content-card-placeholder' : ''}"><h3>${t.examplesBlock}</h3>${body}</section>`;
  }

  function createVideoExamplesCard(model) {
    const t = getUiText();
    const items = model && (model.video_examples || model.video_listening_examples);
    const m = createExamplesMarkup(items);
    const body = m || createPlaceholderBody(t.videosPlaceholder);
    return createContentCard(t.videos, body, !m);
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