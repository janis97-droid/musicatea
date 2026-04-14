// assets/pages/rhythms/rhythm-detail-core.js
(function () {
  const core = window.rhythmsCore;
  const loader = window.RhythmContentLoader;
  const DEFAULT_BPM = 120;
  const EXAMPLES_BY_RHYTHM = {
    maqsum: {
      ar: ["يانا يانا", "قلب يعشق كل جميل", "دارت الأيام", "قارئة الفنجان"],
      en: ["Yana Yana", "Alb Ya’shaq Koll Gamil", "Darat al-Ayyam", "Qari’at al-Finjan"]
    },
    baladi_masmoudi_saghir: {
      ar: ["مدد يا نبي", "البلبل نغّغ"],
      en: ["Midad Ya Nabi", "El Bulbul Naghgha"]
    },
    saidi: {
      ar: ["أديك تقول ماخدتش", "يا بهية", "تفرق الحلاوة", "سلّم عليّ"],
      en: ["Adik Ti’oul Makhadtish", "Ya Bahiyya", "Tfarrak al-Halawa", "Sallam Alay"]
    },
    malfuf: {
      ar: ["يا دارا دوري فينا", "أمل حياتي", "يا ساهي الصبر واهامني", "طلبة"],
      en: ["Ya Dara Douri Fina", "Amal Hayati", "Ya Sahi al-Sabr Wahaminni", "Tulbah"]
    },
    ayyub: {
      ar: ["قف بخشوع"],
      en: ["Qif Bi-Khushu‘"]
    },
    samai_thaqil: {
      ar: ["لما بدا يتثنى", "سماعي بياتي"],
      en: ["Lamma Bada Yatathanna", "Samai Bayati"]
    },
    samai_darij: {
      ar: ["قلّيلي يا صحبي تيجان الربا"],
      en: ["Kallili Ya Suhbi Tijan al-Ruba"]
    },
    yuruk_semai: { ar: [], en: [] },
    wahda: {
      ar: ["كلّي ده كان ليه"],
      en: ["Kulli Da Kan Leh"]
    },
    wahda_kabira: {
      ar: ["حبيبي يسعد أوقاته", "اللي جرى"],
      en: ["Habibi Yis‘ad Awqatu", "Alli Garra"]
    },
    wahda_wa_noss: {
      ar: ["أمل حياتي"],
      en: ["Amal Hayati"]
    },
    fox: {
      ar: ["يا دنيا يا غرامي"],
      en: ["Ya Dunya Ya Gharami"]
    },
    karachi: {
      ar: ["فكروني"],
      en: ["Fakkarouni"]
    },
    fallahi: {
      ar: ["سلامتها أم حسن", "سلّم عليّ"],
      en: ["Salametha Umm Hassan", "Sallam Alay"]
    },
    ciftetelli: { ar: [], en: [] },
    jurjina: {
      ar: ["مهنّة"],
      en: ["Mihanna"]
    },
    aqsaq: {
      ar: ["هات أيها الساقي"],
      en: ["Hat Ayyuha al-Saqi"]
    },
    dawr_hindi: {
      ar: ["شاغلي بالحسن بدر"],
      en: ["Shaghili Bil Husni Badrun"]
    },
    sudasi: { ar: [], en: [] },
    thurayya: { ar: [], en: [] },
    zaffa: {
      ar: ["دقّوا المظاهر", "ألف ليلة وليلة", "اتمخطري يا حلوة يا زينة"],
      en: ["Daqqu al-Mazahir", "Alf Leila wa Leila", "Etmakhtari Ya Helwa Ya Zeina"]
    },
    nawari: { ar: [], en: [] },
    rumba: {
      ar: ["علشان ماليش غيرك"],
      en: ["Alashan Mallish Gherak"]
    },
    hajaa: {
      ar: ["طلع البدر علينا"],
      en: ["Tala‘ al-Badru ‘Alayna"]
    },
    bambi: { ar: [], en: [] },
    wahda_ghayr_mulaaba: { ar: [], en: [] },
    conga: { ar: [], en: [] },
    lebanese_dabke: { ar: [], en: [] },
    sawt_shami: {
      ar: ["مرّ ضبي سباني"],
      en: ["Marr Zabi Sabani"]
    },
    sumbati: { ar: [], en: [] },
    joobi_iraqi: {
      ar: ["والله ولا والله"],
      en: ["Wallah Wala Wallah"]
    },
    masmoudi_nisfi: {
      ar: ["بنت البلد"],
      en: ["Bint el-Balad"]
    },
    mudawwar: { ar: [], en: [] },
    murabbaa: { ar: [], en: [] },
    dharafat: { ar: [], en: [] },
    muhajjar: { ar: [], en: [] },
    mukhammas: { ar: [], en: [] }
  };

  if (!core || !loader) return;

  function getRhythmIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || "";
  }

  function getAllRhythms() {
    return core.normalizeRhythmData(core.getRhythmsSource());
  }

  function getRhythmById(rhythmId) {
    const rhythms = getAllRhythms();
    if (!rhythmId) return rhythms[0] || null;
    return rhythms.find(item => item.id === rhythmId) || rhythms[0] || null;
  }

  function setDocumentState(rhythm, lang, labels) {
    const currentLabel = document.getElementById("rhythm-current-label");
    const toggle = document.getElementById("detail-lang-toggle");
    const localizedName = rhythm && rhythm._localized && rhythm._localized[lang]
      ? rhythm._localized[lang].name
      : "";

    if (currentLabel) {
      currentLabel.textContent = localizedName || labels.fallbackTitle;
    }

    document.title = `${localizedName || labels.fallbackTitle} | ${labels.pageTitle}`;

    if (toggle && rhythm) {
      const targetPage = lang === "ar" ? "rhythm-en.html" : "rhythm.html";
      toggle.href = `${targetPage}?id=${encodeURIComponent(rhythm.id)}`;
    }
  }

  function createLargeImageMarkup(rhythm, altText) {
    if (rhythm && rhythm.image) {
      return `
        <div class="rhythm-large-image-wrap">
          <img
            class="rhythm-large-image"
            src="${escapeHtml(rhythm.image)}"
            alt="${escapeHtml(altText || "")}" 
            loading="eager"
          >
        </div>
      `;
    }

    return `
      <div class="rhythm-large-image-wrap">
        <div class="rhythm-image-fallback-empty"></div>
      </div>
    `;
  }

  function createSectionCard(title, content) {
    if (!content) return "";
    return `
      <section class="rhythm-info-card">
        <h2>${escapeHtml(title)}</h2>
        ${content}
      </section>
    `;
  }

  function createParagraphSection(title, text) {
    if (!text) return "";
    return createSectionCard(title, `<p class="rhythm-section-copy">${escapeHtml(text)}</p>`);
  }

  function createChipSection(title, items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return "";
    const markup = values
      .map(item => `<span class="rhythm-chip">${escapeHtml(String(item))}</span>`)
      .join("");
    return createSectionCard(title, `<div class="rhythm-chip-list">${markup}</div>`);
  }

  function getResolvedExamples(rhythmId, detailContent, lang) {
    const localizedExamples = detailContent && Array.isArray(detailContent.examples)
      ? detailContent.examples.filter(Boolean)
      : [];

    if (localizedExamples.length) return localizedExamples;

    const mapped = EXAMPLES_BY_RHYTHM[rhythmId];
    if (!mapped) return [];
    if (Array.isArray(mapped[lang]) && mapped[lang].length) return mapped[lang];
    if (Array.isArray(mapped.en)) return mapped.en;
    return [];
  }

  function createExamplesSection(title, items, labels) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return "";

    const markup = values.map(item => {
      if (typeof item === "string") {
        return `
          <li class="rhythm-example-item">
            <span class="rhythm-example-title">${escapeHtml(item)}</span>
          </li>
        `;
      }

      const titleText = item.title || item.name || "";
      const artistText = item.artist || item.performer || "";
      const noteText = item.note || item.notes || "";
      return `
        <li class="rhythm-example-item">
          ${titleText ? `<span class="rhythm-example-title">${escapeHtml(titleText)}</span>` : ""}
          ${artistText ? `<span class="rhythm-example-meta">${escapeHtml(labels.exampleBy)} ${escapeHtml(artistText)}</span>` : ""}
          ${noteText ? `<span class="rhythm-example-note">${escapeHtml(noteText)}</span>` : ""}
        </li>
      `;
    }).join("");

    return createSectionCard(title, `<ul class="rhythm-example-list">${markup}</ul>`);
  }

  function createRelatedRhythmsSection(title, relatedIds, lang) {
    const ids = Array.isArray(relatedIds) ? relatedIds.filter(Boolean) : [];
    if (!ids.length) return "";

    const all = getAllRhythms();
    const items = ids
      .map(id => all.find(item => item.id === id))
      .filter(Boolean);

    if (!items.length) return "";

    const targetPage = lang === "ar" ? "rhythm.html" : "rhythm-en.html";
    const markup = items.map(item => {
      const localized = item._localized && item._localized[lang] ? item._localized[lang] : {};
      return `<a class="related-rhythm-link" href="${targetPage}?id=${encodeURIComponent(item.id)}">${escapeHtml(localized.name || item.id)}</a>`;
    }).join("");

    return `
      <section class="related-rhythms-card">
        <h2>${escapeHtml(title)}</h2>
        <div class="rhythm-related-grid">${markup}</div>
      </section>
    `;
  }

  function createEmptyInfoCard(message) {
    return `
      <section class="rhythm-empty-card">
        <p class="rhythm-placeholder-message">${escapeHtml(message)}</p>
      </section>
    `;
  }

  function createHeroMarkup(rhythm, detailContent, lang, labels) {
    const localized = rhythm && rhythm._localized && rhythm._localized[lang] ? rhythm._localized[lang] : {};
    const summary = detailContent && detailContent.hero_summary ? detailContent.hero_summary : "";
    const bpm = Number(rhythm && rhythm.bpm) || DEFAULT_BPM;

    return `
      <section class="rhythm-hero">
        <article class="rhythm-hero-card rhythm-hero-copy rhythm-hero-single-card">
          <div class="rhythm-title-row">
            <h1>${escapeHtml(localized.name || labels.fallbackTitle)}</h1>
            <span class="rhythm-time-chip">${escapeHtml(rhythm.time_signature || "—")}</span>
          </div>

          ${summary ? `<p class="rhythm-hero-summary">${escapeHtml(summary)}</p>` : ""}

          <div class="rhythm-hero-visual-block">
            ${createLargeImageMarkup(rhythm, localized.name || labels.fallbackTitle)}
          </div>

          <div class="rhythm-controls-card">
            <div class="rhythm-bpm-row">
              <span class="rhythm-bpm-value">${bpm} BPM</span>
              <input
                class="rhythm-bpm-slider"
                type="range"
                min="60"
                max="200"
                step="1"
                value="${bpm}"
                aria-label="${escapeHtml(labels.bpm)}"
              >
              <span class="rhythm-bpm-label">${escapeHtml(labels.bpm)}</span>
            </div>

            <div class="rhythm-actions">
              <button type="button" class="rhythm-play-btn">${escapeHtml(labels.play)}</button>
              <audio class="rhythm-audio" preload="none"></audio>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  async function renderPage(config) {
    const root = document.getElementById("rhythm-detail-root");
    if (!root) return;

    const lang = config && config.lang === "en" ? "en" : "ar";
    const labels = config && config.labels ? config.labels : {};
    const rhythm = getRhythmById(getRhythmIdFromUrl());

    if (!rhythm) {
      root.innerHTML = createEmptyInfoCard(labels.notFound || "Rhythm not found.");
      return;
    }

    setDocumentState(rhythm, lang, labels);

    const rawContent = await loader.loadRhythmContentSafe(rhythm.id);
    const detailContent = rawContent ? loader.resolveLocalizedValue(rawContent, lang) : null;
    const resolvedExamples = getResolvedExamples(rhythm.id, detailContent, lang);

    const sectionsMarkup = [
      createParagraphSection(labels.sourceContextOrOrigin, detailContent && (detailContent.source_context_or_origin || detailContent.source_context || detailContent.origin)),
      ...(lang === "ar" ? [createChipSection(labels.otherNames, detailContent && detailContent.other_names)] : []),
      createExamplesSection(labels.examples, resolvedExamples, labels)
    ].filter(Boolean).join("");

    root.innerHTML = `
      ${createHeroMarkup(rhythm, detailContent, lang, labels)}
      ${sectionsMarkup ? `<div class="rhythm-sections">${sectionsMarkup}</div>` : createEmptyInfoCard(labels.placeholder)}
      ${createRelatedRhythmsSection(labels.relatedRhythms, detailContent && detailContent.related_rhythms, lang)}
    `;

    const heroCard = root.querySelector(".rhythm-hero-copy");
    if (heroCard) {
      core.attachAudioControls(heroCard, rhythm, labels);
    }
  }

  window.renderRhythmDetailPage = renderPage;
})();
