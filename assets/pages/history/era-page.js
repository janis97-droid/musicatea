(async function () {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  const params = new URLSearchParams(window.location.search);
  const eraId = params.get('era') || '';

  const strings = isEnglish
    ? {
        home: 'Home',
        history: 'Arabic Music History',
        eraPage: 'Era Page',
        overview: 'Era overview',
        figures: 'Key figures in this era',
        relatedSheets: 'Related sheets from the library',
        relatedLinks: 'Continue exploring',
        sources: 'Sources used in this history material',
        noSheets: 'No directly linked sheets were found for this era yet.',
        noEra: 'The requested era was not found.',
        backToHistory: 'Back to history page',
        previousEra: 'Previous era',
        nextEra: 'Next era',
        openSheet: 'Open sheet',
        intro: 'Arabic Music Intro',
        maqamat: 'Maqamat',
        rhythms: 'Rhythms',
        library: 'Sheet Library',
        historyHref: 'history-en.html',
        introHref: 'arabic-music-intro.html',
        maqamatHref: 'maqamat-en.html',
        rhythmsHref: 'rhythms-en.html',
        libraryHref: 'library-en.html',
        counterpart: 'history-era.html'
      }
    : {
        home: 'الصفحة الرئيسية',
        history: 'تاريخ الموسيقى العربية',
        eraPage: 'صفحة الحقبة',
        overview: 'نظرة عامة على الحقبة',
        figures: 'أبرز الشخصيات في هذه الحقبة',
        relatedSheets: 'نوتات مرتبطة من مكتبة النوتات',
        relatedLinks: 'تابع التعلّم من هنا',
        sources: 'المراجع المستخدمة في مادة التاريخ',
        noSheets: 'لا توجد بعد نوتات مرتبطة مباشرة بهذه الحقبة.',
        noEra: 'لم يتم العثور على الحقبة المطلوبة.',
        backToHistory: 'العودة إلى صفحة التاريخ',
        previousEra: 'الحقبة السابقة',
        nextEra: 'الحقبة التالية',
        openSheet: 'فتح النوتة',
        intro: 'المدخل إلى الموسيقى العربية',
        maqamat: 'المقامات',
        rhythms: 'الإيقاعات',
        library: 'مكتبة النوتات',
        historyHref: 'history.html',
        introHref: 'arabic-music-intro.html',
        maqamatHref: 'maqamat.html',
        rhythmsHref: 'rhythms.html',
        libraryHref: 'library.html',
        counterpart: 'history-era-en.html'
      };

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[\-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function normalizeFigure(figure) {
    if (typeof figure === 'string') {
      return { name: figure, role: '', years: '', description: '' };
    }
    return {
      name: figure?.name || '',
      role: figure?.role || '',
      years: figure?.years || '',
      description: figure?.description || ''
    };
  }

  async function loadData(filePath, variableName) {
    const response = await fetch(filePath, { cache: 'no-store' });
    const source = await response.text();
    return new Function(`${source}; return typeof ${variableName} !== 'undefined' ? ${variableName} : [];`)();
  }

  function collectRelatedSheets(allSheets, era) {
    const names = (era.figures || []).map(normalizeFigure).map((f) => f.name).filter(Boolean);
    const wanted = new Set(names.map(normalize));
    const seen = new Set();

    return allSheets
      .filter((sheet) => sheet && sheet.system === 'arabic')
      .filter((sheet) => {
        const values = [sheet.composer, sheet.composer_en, sheet.performer, sheet.performer_en].filter(Boolean);
        return values.some((value) => wanted.has(normalize(value)));
      })
      .filter((sheet) => {
        const key = `${sheet.title || ''}|${sheet.pdf || ''}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 14);
  }

  function collectRelevantSources(allSources, era) {
    const names = (era.figures || []).map(normalizeFigure).map((f) => normalize(f.name));
    return allSources.filter((source) => {
      const usedFor = Array.isArray(source.usedFor) ? source.usedFor.map(normalize) : [];
      return usedFor.some((name) => names.includes(name));
    });
  }

  function buildFigureCards(figures) {
    return figures.map((figure) => {
      const meta = [figure.role, figure.years].filter(Boolean).join(' — ');
      return `
        <article class="history-era-figure-card">
          <h3>${escapeHtml(figure.name)}</h3>
          ${meta ? `<div class="history-era-figure-meta">${escapeHtml(meta)}</div>` : ''}
          ${figure.description ? `<p>${escapeHtml(figure.description)}</p>` : ''}
        </article>
      `;
    }).join('');
  }

  function buildSheetTags(sheets) {
    if (!sheets.length) {
      return `<p class="history-era-empty">${escapeHtml(strings.noSheets)}</p>`;
    }

    return `
      <div class="history-era-sheet-tags">
        ${sheets.map((sheet) => {
          const title = isEnglish ? (sheet.title_en || sheet.title || '') : (sheet.title || sheet.title_en || '');
          return `<a class="history-era-sheet-tag" href="${escapeHtml(sheet.pdf || '')}" target="_blank" rel="noopener noreferrer">${escapeHtml(title || strings.openSheet)}</a>`;
        }).join('')}
      </div>
    `;
  }

  function buildSourceCards(sources) {
    if (!sources.length) return '';
    return `
      <section class="history-era-block">
        <h2>${escapeHtml(strings.sources)}</h2>
        <div class="history-era-sources-grid">
          ${sources.map((source) => `
            <article class="history-era-source-card">
              <h3>${escapeHtml(source.name)}</h3>
              ${Array.isArray(source.notes) && source.notes.length ? `<p>${escapeHtml(source.notes.join(' • '))}</p>` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function buildRelatedNav(history, eraIndex) {
    const previous = history[eraIndex - 1] || null;
    const next = history[eraIndex + 1] || null;

    return `
      <section class="history-era-block">
        <h2>${escapeHtml(strings.relatedLinks)}</h2>
        <div class="history-era-links-grid">
          <article class="history-era-link-card">
            <h3>${escapeHtml(strings.history)}</h3>
            <p>${escapeHtml(strings.backToHistory)}</p>
            <a href="${escapeHtml(strings.historyHref)}">${escapeHtml(strings.backToHistory)}</a>
          </article>
          <article class="history-era-link-card">
            <h3>${escapeHtml(strings.intro)}</h3>
            <p>${isEnglish ? 'Use the beginner pages to strengthen your background before moving through history.' : 'استعمل صفحات المدخل لتقوية الأساس قبل الربط بين التاريخ والمقامات والإيقاعات.'}</p>
            <a href="${escapeHtml(strings.introHref)}">${escapeHtml(strings.intro)}</a>
          </article>
          <article class="history-era-link-card">
            <h3>${escapeHtml(strings.library)}</h3>
            <p>${isEnglish ? 'Move from historical context to actual notated works in the library.' : 'انتقل من السياق التاريخي إلى الأعمال المدوّنة فعليًا في المكتبة.'}</p>
            <a href="${escapeHtml(strings.libraryHref)}">${escapeHtml(strings.library)}</a>
          </article>
          <article class="history-era-link-card">
            <h3>${escapeHtml(isEnglish ? 'Era navigation' : 'التنقّل بين الحِقب')}</h3>
            <div class="history-era-nav">
              ${previous ? `<a href="?era=${encodeURIComponent(previous.id)}">${escapeHtml(strings.previousEra)}</a>` : ''}
              ${next ? `<a href="?era=${encodeURIComponent(next.id)}">${escapeHtml(strings.nextEra)}</a>` : ''}
            </div>
          </article>
        </div>
      </section>
    `;
  }

  try {
    const [historyData, historySources, sheetsData] = await Promise.all([
      loadData(isEnglish ? 'data/history-en.js' : 'data/history.js', 'history'),
      loadData(isEnglish ? 'data/history-en.js' : 'data/history.js', 'historySources'),
      loadData('data/sheets.js', 'sheets')
    ]);

    const eraIndex = historyData.findIndex((item) => item.id === eraId);
    const era = eraIndex >= 0 ? historyData[eraIndex] : historyData[0];
    const figures = (era?.figures || []).map(normalizeFigure);
    const relatedSheets = collectRelatedSheets(sheetsData, era);
    const relevantSources = collectRelevantSources(historySources, era);

    document.getElementById('history-era-root').innerHTML = era ? `
      <nav class="history-era-breadcrumbs" aria-label="${escapeHtml(strings.history)}">
        <a href="${escapeHtml(strings.historyHref)}">${escapeHtml(strings.history)}</a>
        <span>›</span>
        <span>${escapeHtml(era.title)}</span>
      </nav>

      <div class="history-era-shell">
        <header class="history-era-hero">
          <div class="history-era-period">${escapeHtml(era.period || '')}</div>
          <h1>${escapeHtml(era.title)}</h1>
          <p class="history-era-subtitle">${escapeHtml(era.subtitle || '')}</p>
          <p class="history-era-description">${escapeHtml(era.content || '')}</p>
          ${(era.highlights || []).length ? `<div class="history-era-highlights">${era.highlights.map((item) => `<span class="history-era-highlight">${escapeHtml(item)}</span>`).join('')}</div>` : ''}
        </header>

        <section class="history-era-block">
          <h2>${escapeHtml(strings.overview)}</h2>
          <p>${escapeHtml(era.content || '')}</p>
        </section>

        <section class="history-era-block">
          <h2>${escapeHtml(strings.figures)}</h2>
          <div class="history-era-figures-grid">
            ${buildFigureCards(figures)}
          </div>
        </section>

        <section class="history-era-block">
          <h2>${escapeHtml(strings.relatedSheets)}</h2>
          ${buildSheetTags(relatedSheets)}
        </section>

        ${buildRelatedNav(historyData, eraIndex >= 0 ? eraIndex : 0)}
        ${buildSourceCards(relevantSources)}
      </div>
    ` : `<p class="history-era-empty">${escapeHtml(strings.noEra)}</p>`;

    const title = era ? `${era.title} | ${strings.history}` : strings.history;
    document.title = title;

    const langToggle = document.getElementById('history-era-lang-toggle');
    if (langToggle && era) {
      langToggle.href = `${strings.counterpart}?era=${encodeURIComponent(era.id)}`;
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && era) {
      canonical.href = `${window.location.origin}/${isEnglish ? 'history-era-en.html' : 'history-era.html'}?era=${encodeURIComponent(era.id)}`;
    }
  } catch (error) {
    document.getElementById('history-era-root').innerHTML = `<p class="history-era-empty">${escapeHtml(strings.noEra)}</p>`;
    console.error(error);
  }
})();
