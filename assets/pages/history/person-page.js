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
        fullBiography: 'Extended profile',
        keyContributions: 'Key contributions',
        selectedWorks: 'Selected related works',
        connectedFigures: 'Related figures',
        relatedSheets: 'Related sheets from the library',
        relatedCollaborators: 'Related collaborators',
        relatedMaqamat: 'Related maqamat in the linked works',
        continueExploring: 'Continue exploring',
        role: 'Role',
        years: 'Years',
        era: 'Era',
        relation: 'Relation',
        noFigure: 'The requested figure was not found.',
        noSheets: 'No directly linked sheets were found for this figure yet.',
        noCollaborators: 'No collaborators were inferred from the current sheet data yet.',
        noMaqamat: 'No maqamat were inferred from the linked works yet.',
        noWorks: 'No curated related works were added for this figure yet.',
        noContributions: 'No structured contributions were added for this figure yet.',
        noConnectedFigures: 'No manually linked related figures were added for this figure yet.',
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
        fullBiography: 'نبذة موسعة',
        keyContributions: 'إسهامات أساسية',
        selectedWorks: 'أعمال مرتبطة',
        connectedFigures: 'شخصيات مرتبطة',
        relatedSheets: 'نوتات مرتبطة من مكتبة النوتات',
        relatedCollaborators: 'شخصيات مرتبطة في الأعمال نفسها',
        relatedMaqamat: 'مقامات مرتبطة في الأعمال الموصولة',
        continueExploring: 'تابع التعلّم من هنا',
        role: 'الدور',
        years: 'السنوات',
        era: 'الحقبة',
        relation: 'العلاقة',
        noFigure: 'لم يتم العثور على الشخصية المطلوبة.',
        noSheets: 'لا توجد بعد نوتات مرتبطة مباشرة بهذه الشخصية.',
        noCollaborators: 'لم تُستنتج بعد شخصيات متعاونة من بيانات النوتات الحالية.',
        noMaqamat: 'لم تُستنتج بعد مقامات مرتبطة من الأعمال الموصولة.',
        noWorks: 'لا توجد بعد أعمال مرتبطة مضافة لهذه الشخصية.',
        noContributions: 'لا توجد بعد إسهامات مهيكلة مضافة لهذه الشخصية.',
        noConnectedFigures: 'لا توجد بعد شخصيات مرتبطة مضافة لهذه الشخصية.',
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
    if (!response.ok) return [];
    const source = await response.text();
    return new Function(`${source}; return typeof ${variableName} !== 'undefined' ? ${variableName} : [];`)();
  }

  function findCharacterDetails(allCharacters, figure) {
    const wanted = normalize(figure?.name || '');
    return (Array.isArray(allCharacters) ? allCharacters : []).find((item) => {
      return [item?.name_ar, item?.name_en, item?.slug, item?.id].some((value) => normalize(value) === wanted);
    }) || null;
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

  function buildContributionList(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) {
      return `<p class="history-person-empty">${escapeHtml(strings.noContributions)}</p>`;
    }
    return `<ul class="history-person-bullets">${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function buildWorks(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) {
      return `<p class="history-person-empty">${escapeHtml(strings.noWorks)}</p>`;
    }
    return `
      <div class="history-person-work-grid">
        ${values.map((item) => `
          <article class="history-person-work-card">
            <h3>${escapeHtml(item.title || '')}</h3>
            ${item.relation ? `<div class="history-person-work-meta"><strong>${escapeHtml(strings.relation)}:</strong> ${escapeHtml(item.relation)}</div>` : ''}
            ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ''}
          </article>
        `).join('')}
      </div>
    `;
  }

  function buildManualRelatedFigures(names) {
    const values = Array.isArray(names) ? names.filter(Boolean) : [];
    if (!values.length) {
      return `<p class="history-person-empty">${escapeHtml(strings.noConnectedFigures)}</p>`;
    }
    return `
      <div class="history-person-link-tags">
        ${values.map((name) => `<a class="history-person-link-tag" href="${escapeHtml(strings.collaboratorHref)}?name=${encodeURIComponent(name)}">${escapeHtml(name)}</a>`).join('')}
      </div>
    `;
  }

  try {
    const [historyData, sheetsData, characterDataMain, characterDataLebanon, characterDataSyria] = await Promise.all([
      loadData(isEnglish ? 'data/history-en.js' : 'data/history.js', 'history'),
      loadData('data/sheets.js', 'sheets'),
      loadData('data/characters.js', 'characters'),
      loadData('data/characters-lebanon.js', 'charactersLebanon'),
      loadData('data/characters-syria.js', 'charactersSyria')
    ]);

    const characterData = [
      ...(Array.isArray(characterDataMain) ? characterDataMain : []),
      ...(Array.isArray(characterDataLebanon) ? characterDataLebanon : []),
      ...(Array.isArray(characterDataSyria) ? characterDataSyria : [])
    ];

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

    const character = findCharacterDetails(characterData, figure);
    const displayName = character ? (isEnglish ? (character.name_en || character.name_ar || figure.name) : (character.name_ar || character.name_en || figure.name)) : figure.name;
    const displayRole = character?.role || figure.role || '';
    const displayYears = character?.years || figure.years || '';
    const shortIntro = character?.intro_short || figure.description || fallbackDescription;
    const fullBio = character?.intro_long || '';
    const relatedSheets = collectRelatedSheets(sheetsData, displayName);
    const collaborators = collectCollaborators(relatedSheets, displayName);
    const relatedMaqamat = collectRelatedMaqamat(relatedSheets);

    document.getElementById('person-page-root').innerHTML = `
      <nav class="history-person-breadcrumbs" aria-label="${escapeHtml(strings.figurePage)}">
        <a href="${escapeHtml(strings.historyHref)}">${escapeHtml(strings.history)}</a>
        <span>›</span>
        <a href="${escapeHtml(strings.eraHref)}?era=${encodeURIComponent(era.id)}">${escapeHtml(era.title)}</a>
        <span>›</span>
        <span>${escapeHtml(displayName)}</span>
      </nav>

      <div class="history-person-shell">
        <header class="history-person-hero">
          ${displayRole ? `<div class="history-person-role">${escapeHtml(displayRole)}</div>` : ''}
          <h1>${escapeHtml(displayName)}</h1>
          ${displayYears ? `<p class="history-person-years">${escapeHtml(displayYears)}</p>` : ''}
          <p class="history-person-description">${escapeHtml(shortIntro)}</p>
        </header>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.overview)}</h2>
          <div class="history-person-meta-list">
            ${displayRole ? `<div class="history-person-meta-item"><strong>${escapeHtml(strings.role)}:</strong> ${escapeHtml(displayRole)}</div>` : ''}
            ${displayYears ? `<div class="history-person-meta-item"><strong>${escapeHtml(strings.years)}:</strong> ${escapeHtml(displayYears)}</div>` : ''}
            <div class="history-person-meta-item"><strong>${escapeHtml(strings.era)}:</strong> ${escapeHtml(era.title)}</div>
            ${character?.era_note ? `<div class="history-person-meta-item">${escapeHtml(character.era_note)}</div>` : ''}
          </div>
        </section>

        ${fullBio ? `
        <section class="history-person-block">
          <h2>${escapeHtml(strings.fullBiography)}</h2>
          <p>${escapeHtml(fullBio)}</p>
        </section>
        ` : ''}

        <section class="history-person-block">
          <h2>${escapeHtml(strings.keyContributions)}</h2>
          ${buildContributionList(character?.key_contributions)}
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.selectedWorks)}</h2>
          ${buildWorks(character?.related_works)}
        </section>

        <section class="history-person-block">
          <h2>${escapeHtml(strings.connectedFigures)}</h2>
          ${buildManualRelatedFigures(character?.related_figures)}
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

    document.title = `${displayName} | ${strings.history}`;

    const langToggle = document.getElementById('person-lang-toggle');
    if (langToggle) {
      langToggle.href = `${strings.counterpart}?name=${encodeURIComponent(displayName)}`;
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${window.location.origin}/${isEnglish ? 'person-en.html' : 'person.html'}?name=${encodeURIComponent(displayName)}`;
    }
  } catch (error) {
    document.getElementById('person-page-root').innerHTML = `<p class="history-person-empty">${escapeHtml(strings.noFigure)}</p>`;
    console.error(error);
  }
})();
