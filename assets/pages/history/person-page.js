(async function () {
  const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
  const params = new URLSearchParams(window.location.search);
  const eraId = params.get('era') || '';
  const figureIndex = Number(params.get('figure') || 0);
  const requestedName = params.get('name') || '';

  const strings = isEnglish
    ? {
        history: 'Arabic Music History',
        eraPage: 'Era page',
        figurePage: 'Figure page',
        overview: 'Profile overview',
        context: 'Historical context',
        relatedSheets: 'Related sheets from the library',
        relatedCollaborators: 'Related collaborators',
        relatedMaqamat: 'Related maqamat in the linked works',
        continueExploring: 'Continue exploring',
        role: 'Role',
        years: 'Years',
        era: 'Era',
        noFigure: 'The requested figure was not found.',
        noSheets: 'No directly linked sheets were found for this figure yet.',
        noCollaborators: 'No collaborators were inferred from the current sheet data yet.',
        noMaqamat: 'No maqamat were inferred from the linked works yet.',
        backToEra: 'Back to era page',
        backToHistory: 'Back to history page',
        intro: 'Arabic Music Intro',
        library: 'Sheet Library',
        historyHref: 'history-en.html',
        eraHref: 'history-era-en.html',
        introHref: 'arabic-music-intro.html',
        libraryHref: 'library-en.html',
        collaboratorHref: 'person-en.html',
        counterpart: 'person.html'
      }
    : {
        history: 'تاريخ الموسيقى العربية',
        eraPage: 'صفحة الحقبة',
        figurePage: 'صفحة الشخصية',
        overview: 'نظرة عامة على الشخصية',
        context: 'السياق التاريخي',
        relatedSheets: 'نوتات مرتبطة من مكتبة النوتات',
        relatedCollaborators: 'شخصيات مرتبطة في الأعمال نفسها',
        relatedMaqamat: 'مقامات مرتبطة في الأعمال الموصولة',
        continueExploring: 'تابع التعلّم من هنا',
        role: 'الدور',
        years: 'السنوات',
        era: 'الحقبة',
        noFigure: 'لم يتم العثور على الشخصية المطلوبة.',
        noSheets: 'لا توجد بعد نوتات مرتبطة مباشرة بهذه الشخصية.',
        noCollaborators: 'لم تُستنتج بعد شخصيات متعاونة من بيانات النوتات الحالية.',
        noMaqamat: 'لم تُستنتج بعد مقامات مرتبطة من الأعمال الموصولة.',
        backToEra: 'العودة إلى صفحة الحقبة',
        backToHistory: 'العودة إلى صفحة التاريخ',
        intro: 'المدخل إلى الموسيقى العربية',
        library: 'مكتبة النوتات',
        historyHref: 'history.html',
        eraHref: 'history-era.html',
        introHref: 'arabic-music-intro.html',
        libraryHref: 'library.html',
        collaboratorHref: 'person.html',
        counterpart: 'person-en.html'
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

  function normalizeFigure(figure, fallbackDescription) {
    if (typeof figure === 'string') {
      return { name: figure, role: '', years: '', description: fallbackDescription };
    }
    return {
      name: figure?.name || '',
      role: figure?.role || '',
      years: figure?.years || '',
      description: figure?.description || fallbackDescription
    };
  }

  async function loadData(filePath, variableName) {
    const response = await fetch(filePath, { cache: 'no-store' });
    const source = await response.text();
    return new Function(`${source}; return typeof ${variableName} !== 'undefined' ? ${variableName} : [];`)();
  }

  function collectRelatedSheets(allSheets, figureName) {
    const wanted = normalize(figureName);
    const seen = new Set();

    return allSheets
      .filter((sheet) => sheet && sheet.system === 'arabic')
      .filter((sheet) => {
        const values = [sheet.composer, sheet.composer_en, sheet.performer, sheet.performer_en].filter(Boolean);
        return values.some((value) => normalize(value) === wanted);
      })
      .filter((sheet) => {
        const key = `${sheet.title || ''}|${sheet.pdf || ''}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 18);
  }

  function collectCollaborators(sheets, figureName) {
    const wanted = normalize(figureName);
    const map = new Map();

    sheets.forEach((sheet) => {
      const pairs = [
        { ar: sheet.composer, en: sheet.composer_en },
        { ar: sheet.performer, en: sheet.performer_en }
      ].filter((entry) => entry.ar || entry.en);

      pairs.forEach((entry) => {
        const baseName = entry.ar || entry.en || '';
        if (!baseName || normalize(baseName) === wanted) return;
        const key = normalize(baseName);
        if (!map.has(key)) {
          map.set(key, isEnglish ? (entry.en || entry.ar || '') : (entry.ar || entry.en || ''));
        }
      });
    });

    return [...map.values()].filter(Boolean).slice(0, 14);
  }

  function collectRelatedMaqamat(sheets) {
    const map = new Map();

    sheets.forEach((sheet) => {
      if (!sheet.maqam) return;
      const key = `${sheet.maqam}|${sheet.tonic || ''}`;
      if (!map.has(key)) {
        map.set(key, {
          maqamAr: sheet.maqam || '',
          maqamEn: sheet.maqam_en || sheet.maqam || '',
          tonicAr: sheet.tonic || '',
          tonicEn: sheet.tonic_en || sheet.tonic || ''
        });
      }
    });

    return [...map.values()].slice(0, 10);
  }

  function buildSheetTags(sheets) {
    if (!sheets.length) {
      return `<p class="history-person-empty">${escapeHtml(strings.noSheets)}</p>`;
    }
    return `
      <div class="history-person-sheet-tags">
        ${sheets.map((sheet) => {
          const title = isEnglish ? (sheet.title_en || sheet.title || '') : (sheet.title || sheet.title_en || '');
          return `<a class="history-person-sheet-tag" href="${escapeHtml(sheet.pdf || '')}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>`;
        }).join('')}
      </div>
    `;
  }

  function buildCollaboratorTags(names) {
    if (!names.length) {
      return `<p class="history-person-empty">${escapeHtml(strings.noCollaborators)}</p>`;
    }

    return `
      <div class="history-person-link-tags">
        ${names.map((name) => `<a class="history-person-link-tag" href="${escapeHtml(strings.collaboratorHref)}?name=${encodeURIComponent(name)}">${escapeHtml(name)}</a>`).join('')}
      </div>
    `;
  }

  function buildMaqamTags(items) {
    if (!items.length) {
      return `<p class="history-person-empty">${escapeHtml(strings.noMaqamat)}</p>`;
    }

    return `
      <div class="history-person-link-tags">
        ${items.map((item) => {
          const label = isEnglish
            ? [item.maqamEn, item.tonicEn].filter(Boolean).join(' · ')
            : [item.maqamAr, item.tonicAr].filter(Boolean).join(' · ');

          let href = isEnglish ? 'maqamat-en.html' : 'maqamat.html';
          if (typeof getMaqamRoute === 'function' && item.maqamAr) {
            href = getMaqamRoute(item.maqamAr, item.tonicAr) || href;
            if (isEnglish) href = href.replace('interactive-scale.html', 'interactive-scale-en.html');
          }

          return `<a class="history-person-link-tag" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
        }).join('')}
      </div>
    `;
  }

  try {
    const [historyData, sheetsData] = await Promise.all([
      loadData(isEnglish ? 'data/history-en.js' : 'data/history.js', 'history'),
      loadData('data/sheets.js', 'sheets')
    ]);

    const fallbackDescription = isEnglish ? 'A figure associated with this musical era.' : 'من الشخصيات المرتبطة بهذه الحقبة الموسيقية.';

    let era = historyData.find((item) => item.id === eraId) || null;
    let figure = era && Array.isArray(era.figures) ? normalizeFigure(era.figures[figureIndex], fallbackDescription) : null;

    if (requestedName) {
      const wanted = normalize(requestedName);
      outer:
      for (const eraItem of historyData) {
        const figures = Array.isArray(eraItem.figures) ? eraItem.figures : [];
        for (let i = 0; i < figures.length; i += 1) {
          const candidate = normalizeFigure(figures[i], fallbackDescription);
          if (normalize(candidate.name) === wanted) {
            era = eraItem;
            figure = candidate;
            break outer;
          }
        }
      }
    }

    if (!era || !figure || !figure.name) {
      document.getElementById('person-page-root').innerHTML = `<p class="history-person-empty">${escapeHtml(strings.noFigure)}</p>`;
      return;
    }

    const relatedSheets = collectRelatedSheets(sheetsData, figure.name);
    const collaborators = collectCollaborators(relatedSheets, figure.name);
    const relatedMaqamat = collectRelatedMaqamat(relatedSheets);

    document.getElementById('person-page-root').innerHTML = `
      <nav class="history-person-breadcrumbs" aria-label="${escapeHtml(strings.figurePage)}">
        <a href="${escapeHtml(strings.historyHref)}">${escapeHtml(strings.history)}</a>
        <span>›</span>
        <a href="${escapeHtml(strings.eraHref)}?era=${encodeURIComponent(era.id)}">${escapeHtml(era.title)}</a>
        <span>›</span>
        <span>${escapeHtml(figure.name)}</span>
      </nav>

      <div class="history-person-shell">
        <header class="history-person-hero">
          ${figure.role ? `<div class="history-person-role">${escapeHtml(figure.role)}</div>` : ''}
          <h1>${escapeHtml(figure.name)}</h1>
          ${figure.years ? `<p class="history-person-years">${escapeHtml(figure.years)}</p>` : ''}
          <p class="history-person-description">${escapeHtml(figure.description)}</p>
        </header>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.overview)}</h2>
          <div class="history-person-meta-list">
            ${figure.role ? `<div class="history-person-meta-item"><strong>${escapeHtml(strings.role)}:</strong> ${escapeHtml(figure.role)}</div>` : ''}
            ${figure.years ? `<div class="history-person-meta-item"><strong>${escapeHtml(strings.years)}:</strong> ${escapeHtml(figure.years)}</div>` : ''}
            <div class="history-person-meta-item"><strong>${escapeHtml(strings.era)}:</strong> ${escapeHtml(era.title)}</div>
          </div>
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.context)}</h2>
          <p>${escapeHtml(era.content || '')}</p>
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.relatedSheets)}</h2>
          ${buildSheetTags(relatedSheets)}
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.relatedCollaborators)}</h2>
          ${buildCollaboratorTags(collaborators)}
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.relatedMaqamat)}</h2>
          ${buildMaqamTags(relatedMaqamat)}
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.continueExploring)}</h2>
          <div class="history-person-nav">
            <a href="${escapeHtml(strings.eraHref)}?era=${encodeURIComponent(era.id)}">${escapeHtml(strings.backToEra)}</a>
            <a href="${escapeHtml(strings.historyHref)}">${escapeHtml(strings.backToHistory)}</a>
            <a href="${escapeHtml(strings.libraryHref)}">${escapeHtml(strings.library)}</a>
            <a href="${escapeHtml(strings.introHref)}">${escapeHtml(strings.intro)}</a>
          </div>
        </section>
      </div>
    `;

    document.title = `${figure.name} | ${strings.history}`;

    const langToggle = document.getElementById('person-lang-toggle');
    if (langToggle) {
      langToggle.href = `${strings.counterpart}?name=${encodeURIComponent(figure.name)}`;
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${window.location.origin}/${isEnglish ? 'person-en.html' : 'person.html'}?name=${encodeURIComponent(figure.name)}`;
    }
  } catch (error) {
    document.getElementById('person-page-root').innerHTML = `<p class="history-person-empty">${escapeHtml(strings.noFigure)}</p>`;
    console.error(error);
  }
})();
