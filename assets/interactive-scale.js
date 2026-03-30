// assets/interactive-scale.js
// Interval-first maqam engine
// Depends on:
// - data/maqamat.js
// - data/interactive-maqamat.js
// - data/note-audio-map.js
//
// Focus of this version:
// - maqam/root generation from quartertone interval patterns
// - exact token generation from cumulative pitch positions
// - Arabic labels in Arabic page
// - current jins colors preserved
// - visual grid fixed to the confirmed 7px spacing

(function () {
  const root = document.getElementById("interactive-page-root");
  const sidebar = document.getElementById("sidebar");
  const breadcrumbLabel = document.getElementById("current-maqam-label");

  if (!root || !sidebar) return;

  const URL_PARAMS = new URLSearchParams(window.location.search);
  const SVG_NS = "http://www.w3.org/2000/svg";

  const COLORS = {
    lower: {
      note: "#c8a45a",
      note_bright: "#e2c47e",
      stem: "#8a6020",
      acc: "#f0d28a",
      active: "#f7dc94",
      active_acc: "#fff0bf",
      box_bg: "rgba(200,164,90,0.08)",
      box_border: "rgba(200,164,90,0.25)",
      box_text: "#d8bb74",
      box_bg_bright: "rgba(200,164,90,0.14)",
      box_border_bright: "rgba(200,164,90,0.5)",
      box_text_bright: "#f0d28a",
      box_bg_active: "rgba(247,220,148,0.18)",
      box_border_active: "rgba(247,220,148,0.75)",
      box_text_active: "#fff0bf"
    },
    upper: {
      note: "#7ba8d4",
      note_bright: "#a8ccee",
      stem: "#3a6090",
      acc: "#a8ccee",
      active: "#8fd1ff",
      active_acc: "#cdeaff",
      box_bg: "rgba(123,168,212,0.08)",
      box_border: "rgba(123,168,212,0.25)",
      box_text: "#8dbde4",
      box_bg_bright: "rgba(123,168,212,0.15)",
      box_border_bright: "rgba(123,168,212,0.52)",
      box_text_bright: "#c8e4ff",
      box_bg_active: "rgba(143,209,255,0.18)",
      box_border_active: "rgba(143,209,255,0.78)",
      box_text_active: "#e9f7ff"
    }
  };

  const NOTE_TOKEN_META = {
    "Do":   { letter: "C", acc_label: "",   ar: "دو",  en: "Do",  qt: 0  },
    "Dob":  { letter: "C", acc_label: "♭",  ar: "دو",  en: "Do♭", qt: 22 },
    "Do#":  { letter: "C", acc_label: "♯",  ar: "دو",  en: "Do♯", qt: 2  },
    "Do/#": { letter: "C", acc_label: "𝄲",  ar: "دو",  en: "Do𝄲", qt: 1  },

    "Re":   { letter: "D", acc_label: "",   ar: "ري",  en: "Re",  qt: 4  },
    "Reb":  { letter: "D", acc_label: "♭",  ar: "ري",  en: "Re♭", qt: 2  },
    "Re/b": { letter: "D", acc_label: "𝄳",  ar: "ري",  en: "Re𝄳", qt: 3  },
    "Re#":  { letter: "D", acc_label: "♯",  ar: "ري",  en: "Re♯", qt: 6  },

    "Mi":   { letter: "E", acc_label: "",   ar: "مي",  en: "Mi",  qt: 8  },
    "Mib":  { letter: "E", acc_label: "♭",  ar: "مي",  en: "Mi♭", qt: 6  },
    "Mi/b": { letter: "E", acc_label: "𝄳",  ar: "مي",  en: "Mi𝄳", qt: 7  },

    "Fa":   { letter: "F", acc_label: "",   ar: "فا",  en: "Fa",  qt: 10 },
    "Fa#":  { letter: "F", acc_label: "♯",  ar: "فا",  en: "Fa♯", qt: 12 },
    "Fa/#": { letter: "F", acc_label: "𝄲",  ar: "فا",  en: "Fa𝄲", qt: 11 },

    "Sol":  { letter: "G", acc_label: "",   ar: "صول", en: "Sol", qt: 14 },
    "Solb": { letter: "G", acc_label: "♭",  ar: "صول", en: "Sol♭",qt: 12 },
    "Sol#": { letter: "G", acc_label: "♯",  ar: "صول", en: "Sol♯",qt: 16 },

    "La":   { letter: "A", acc_label: "",   ar: "لا",  en: "La",  qt: 18 },
    "Lab":  { letter: "A", acc_label: "♭",  ar: "لا",  en: "La♭", qt: 16 },
    "La/b": { letter: "A", acc_label: "𝄳",  ar: "لا",  en: "La𝄳", qt: 17 },

    "Si":   { letter: "B", acc_label: "",   ar: "سي",  en: "Si",  qt: 22 },
    "Sib":  { letter: "B", acc_label: "♭",  ar: "سي",  en: "Si♭", qt: 20 },
    "Si/b": { letter: "B", acc_label: "𝄳",  ar: "سي",  en: "Si𝄳", qt: 21 }
  };

  const LETTER_SEQUENCE = ["C", "D", "E", "F", "G", "A", "B"];
  const LETTER_TO_INDEX = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };

  const SLOT_MAP = {
    G3: { y: 187, ledger: [180, 166] },
    A3: { y: 180, ledger: [180, 166] },
    B3: { y: 173, ledger: [166] },
    C4: { y: 166, ledger: [166] },
    D4: { y: 159, ledger: [] },
    E4: { y: 152, ledger: [] },
    F4: { y: 145, ledger: [] },
    G4: { y: 138, ledger: [] },
    A4: { y: 131, ledger: [] },
    B4: { y: 124, ledger: [] },
    C5: { y: 117, ledger: [] },
    D5: { y: 110, ledger: [] },
    E5: { y: 103, ledger: [] },
    F5: { y: 96,  ledger: [] },
    G5: { y: 89,  ledger: [96] }
  };

  const STAFF_LINES_Y = [152, 138, 124, 110, 96];

  const LOWER_OCTAVE_TONICS = new Set([
    "sol", "la_flat", "la", "si_flat", "si", "la_half_flat", "si_half_flat"
  ]);

  const audioCache = new Map();

  let state = {
    familyId: null,
    maqamId: null,
    tonic: null,
    activeNoteIndex: null,
    isPlaying: false,
    stopRequested: false,
    lastAudioErrorToken: null
  };

  const MAQAM_MODELS = {
    rast:             { base_spelling: ["Do","Re","Mi/b","Fa","Sol","La","Si/b","Do"], intervals: [4,3,3,4,4,3,3] },
    suznak:           { base_spelling: ["Do","Re","Mi/b","Fa","Sol","Lab","Sib","Do"], intervals: [4,3,3,4,2,2,6] },
    mahur:            { base_spelling: ["Do","Re","Mi","Fa","Sol","La","Si","Do"], intervals: [4,4,2,4,4,4,2] },
    nairuz:           { base_spelling: ["Do","Re","Mi/b","Fa","Sol","Lab","Sib","Do"], intervals: [4,3,3,4,2,4,4] },
    bashayer:         { base_spelling: ["Do","Re","Mi/b","Fa","Sol","La","Sib","Do"], intervals: [4,3,3,4,4,2,4] },
    sazkar:           { base_spelling: ["Do","Re","Mi/b","Fa","Sol","Lab","Sib","Do"], intervals: [4,3,3,4,2,4,4] },
    dalanshin:        { base_spelling: ["Do","Re","Mi/b","Fa","Sol","Lab","Si/b","Do"], intervals: [4,3,3,4,2,5,3] },

    bayati:           { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    bayati_shuri:     { base_spelling: ["Re","Mi/b","Fa","Sol","La","Sib","Do","Re"], intervals: [3,3,4,4,2,4,4] },
    husayni:          { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    muhayyar:         { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    bayatin:          { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    nahuft:           { base_spelling: ["La","Si","Do","Re","Mi","Fa","Sol","La"], intervals: [4,2,4,4,2,4,4] },

    ajam:             { base_spelling: ["Do","Re","Mi","Fa","Sol","La","Si","Do"], intervals: [4,4,2,4,4,4,2] },
    ajam_ushayran:    { base_spelling: ["Sib","Do","Re","Mib","Fa","Sol","La","Sib"], intervals: [4,4,2,4,4,4,2] },
    shawq_afza:       { base_spelling: ["Sib","Do","Re","Mib","Fa","Sol","La","Sib"], intervals: [4,4,2,4,4,4,2] },
    suznal:           { base_spelling: ["Do","Re","Mi","Fa","Sol","Lab","Sib","Do"], intervals: [4,4,2,4,2,4,4] },
    ajam_murassa:     { base_spelling: ["Sib","Do","Re","Mib","Fa","Sol","La/b","Sib"], intervals: [4,4,2,4,4,3,3] },
    jaharkah:         { base_spelling: ["Fa","Sol","La","Sib","Do","Re","Mi","Fa"], intervals: [4,4,2,4,4,4,2] },

    hijaz:            { base_spelling: ["Re","Mib","Fa#","Sol","La","Sib","Do","Re"], intervals: [2,6,2,4,2,4,4] },
    hijazkar:         { base_spelling: ["Do","Reb","Mi","Fa","Sol","La","Si","Do"], intervals: [2,6,2,4,4,4,2] },
    shadd_araban:     { base_spelling: ["Sol","Lab","Si","Do","Re","Mib","Fa","Sol"], intervals: [2,6,2,4,2,2,6] },
    suzdil:           { base_spelling: ["La","Sib","Do#","Re","Mi","Fa","Sol","La"], intervals: [2,6,2,4,2,4,4] },
    shahnaz:          { base_spelling: ["Re","Mib","Fa#","Sol","La","Sib","Do","Re"], intervals: [2,6,2,4,2,4,4] },
    hijazayn:         { base_spelling: ["Re","Mib","Fa#","Sol","La","Sib","Do","Re"], intervals: [2,6,2,4,2,4,4] },
    zanjaran:         { base_spelling: ["Re","Mib","Fa#","Sol","La","Sib","Do","Re"], intervals: [2,6,2,4,2,4,4] },
    hijaz_ajami:      { base_spelling: ["Re","Mib","Fa#","Sol","La","Si","Do#","Re"], intervals: [2,6,2,4,4,4,2] },

    nahawand:         { base_spelling: ["Do","Re","Mib","Fa","Sol","Lab","Sib","Do"], intervals: [4,2,4,4,2,4,4] },
    nahawand_murassa: { base_spelling: ["Do","Re","Mib","Fa","Sol","La/b","Si/b","Do"], intervals: [4,2,4,4,3,4,3] },
    ushshaq_masri:    { base_spelling: ["Do","Re","Mib","Fa","Sol","La/b","Si/b","Do"], intervals: [4,2,4,4,3,4,3] },
    tarz_jadid:       { base_spelling: ["Do","Re","Mib","Fa","Sol","Lab","Sib","Do"], intervals: [4,2,4,4,2,4,4] },
    nahawand_kabir:   { base_spelling: ["Do","Re","Mib","Fa","Sol","La","Si","Do"], intervals: [4,2,4,4,4,4,2] },
    nahawand_kurdi:   { base_spelling: ["Do","Reb","Mib","Fa","Sol","Lab","Sib","Do"], intervals: [2,4,4,4,2,4,4] },

    kurd:             { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do","Re"], intervals: [2,4,4,4,2,4,4] },
    tarz_nawin:       { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do","Re"], intervals: [2,4,4,4,2,4,4] },
    shahnaz_kurdi:    { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do","Re"], intervals: [2,4,4,4,2,4,4] },
    lami:             { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do","Re"], intervals: [2,4,4,4,2,4,4] },
    athar_kurd:       { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do","Re"], intervals: [2,4,4,4,2,4,4] },

    sikah:            { base_spelling: ["Mi/b","Fa/#","Sol","La/b","Si/b","Do","Re","Mi/b"], intervals: [4,3,3,4,3,4,3] },
    huzam:            { base_spelling: ["Mi/b","Fa/#","Sol","La/b","Si/b","Do","Re","Mi/b"], intervals: [4,3,3,4,3,4,3] },
    rahat_al_arwah:   { base_spelling: ["Si/b","Do/#","Re","Mi/b","Fa/#","Sol","La","Si/b"], intervals: [4,3,3,4,3,4,3] },
    iraq:             { base_spelling: ["Si/b","Do/#","Re","Mi/b","Fa/#","Sol","La","Si/b"], intervals: [4,3,3,4,3,4,3] },
    awj_iraq:         { base_spelling: ["Si/b","Do/#","Re","Mi/b","Fa/#","Sol","La","Si/b"], intervals: [4,3,3,4,3,4,3] },
    basta_nikar:      { base_spelling: ["Si/b","Do/#","Re","Mi/b","Fa/#","Sol","La","Si/b"], intervals: [4,3,3,4,3,4,3] },
    mustaar:          { base_spelling: ["Mi/b","Fa/#","Sol","La/b","Si/b","Do","Re","Mi/b"], intervals: [4,3,3,4,3,4,3] },
    farahnak:         { base_spelling: ["Si/b","Do/#","Re","Mi/b","Fa/#","Sol","La","Si/b"], intervals: [4,3,3,4,3,4,3] },
    shaar:            { base_spelling: ["Mi/b","Fa/#","Sol","La/b","Si/b","Do","Re","Mi/b"], intervals: [4,3,3,4,3,4,3] },
    rahat_faza:       { base_spelling: ["Mi/b","Fa/#","Sol","La/b","Si/b","Do","Re","Mi/b"], intervals: [4,3,3,4,3,4,3] },

    saba:             { base_spelling: ["Re","Mi/b","Fa","Solb","La","Sib","Do","Re"], intervals: [3,3,2,6,2,4,4] },
    saba_jadid:       { base_spelling: ["Re","Mi/b","Fa","Solb","La","Sib","Do","Re"], intervals: [3,3,2,6,2,4,4] },
    zamzama:          { base_spelling: ["Re","Mib","Fa","Solb","La","Sib","Do","Re"], intervals: [2,4,2,6,2,4,4] },

    nawa_athar:       { base_spelling: ["Do","Re","Mib","Fa#","Sol","Lab","Sib","Do"], intervals: [4,2,6,2,2,4,4] },
    nikriz:           { base_spelling: ["Do","Re","Mib","Fa#","Sol","Lab","Sib","Do"], intervals: [4,2,6,2,2,4,4] },
    basandida:        { base_spelling: ["Do","Re","Mib","Fa#","Sol","Lab","Sib","Do"], intervals: [4,2,6,2,2,4,4] }
  };

  function bootstrap() {
    const requestedFamily = URL_PARAMS.get("family");
    const requestedMaqam = URL_PARAMS.get("maqam");
    const requestedTonic = URL_PARAMS.get("tonic");
    const resolved = resolveInitialSelection(requestedFamily, requestedMaqam, requestedTonic);
    state.familyId = resolved.familyId;
    state.maqamId = resolved.maqamId;
    state.tonic = resolved.tonic;
    renderAll();
  }

  function resolveInitialSelection(familyId, maqamId, tonic) {
    let resolvedFamily = familyId;
    let resolvedMaqam = maqamId;

    if (!resolvedFamily && resolvedMaqam) {
      const maqam = getMaqamById(resolvedMaqam);
      resolvedFamily = maqam ? maqam.family : null;
    }

    if (!resolvedFamily) {
      const firstMain = getInteractiveMainMaqamat()[0];
      resolvedFamily = firstMain ? firstMain.family : "rast";
    }

    const familyItems = getInteractiveFamily(resolvedFamily);
    const familyMain = getFamilyMainMaqam(resolvedFamily);

    if (!resolvedMaqam) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const maqamObj = getMaqamById(resolvedMaqam);
    if (!maqamObj || maqamObj.family !== resolvedFamily || !getInteractiveMaqamById(resolvedMaqam)) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const allowedTonics = getRenderableTonicsForMaqam(resolvedMaqam);
    const defaultTonicRaw = getInteractiveDefaultTonic(resolvedMaqam);
    const defaultTonic = allowedTonics.includes(defaultTonicRaw) ? defaultTonicRaw : (allowedTonics[0] || defaultTonicRaw);
    const resolvedTonic = allowedTonics.includes(tonic) ? tonic : defaultTonic;

    return { familyId: resolvedFamily, maqamId: resolvedMaqam, tonic: resolvedTonic };
  }


  function getRenderableTonicsForMaqam(maqamId) {
    const tonics = getInteractiveTonicsForMaqam(maqamId);
    return tonics.filter(tonic => isRenderableScaleForTonic(maqamId, tonic));
  }

  function isRenderableScaleForTonic(maqamId, tonic) {
    const model = MAQAM_MODELS[maqamId];
    const tonicToken = getCanonicalInteractiveNoteForTonic(tonic);
    if (!model || !tonicToken) return false;

    const tonicQt = getQuarterForToken(tonicToken);
    const targetLetter = NOTE_TOKEN_META[tonicToken].letter;
    if (tonicQt === null || !targetLetter) return false;

    const absoluteQuarterValues = [tonicQt];
    let running = tonicQt;
    model.intervals.forEach(interval => {
      running += interval;
      absoluteQuarterValues.push(running);
    });

    return absoluteQuarterValues.every((absQt, idx) => {
      const targetLetterIdx = (LETTER_TO_INDEX[targetLetter] + idx) % 7;
      const expectedLetter = LETTER_SEQUENCE[targetLetterIdx];
      return !!spellQuarterWithExpectedLetter(absQt, expectedLetter, true);
    });
  }

  function renderAll() {
    renderSidebar();
    renderPageShell();
    syncUrl();
  }

  function renderSidebar() {
    const familyItems = getInteractiveFamily(state.familyId);
    const familyMain = getFamilyMainMaqam(state.familyId);
    const familyName = familyMain ? familyMain.name : "";
    const mainFamilies = getInteractiveMainMaqamat();

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-family-label">تنقّل بين العائلات</div>
        <div class="family-switcher" id="family-switcher">
          ${mainFamilies.map(item => `
            <button class="family-switch-btn ${item.family === state.familyId ? "active" : ""}" data-maqam-id="${item.id}">
              ${item.name}
            </button>
          `).join("")}
        </div>
        <div class="sidebar-family-label" style="margin-top:12px;">العائلة الموسيقية</div>
        <div class="sidebar-family-name">${familyName}</div>
        <div class="sidebar-family-sub">${familyItems.length} مقامات</div>
      </div>

      <ul class="sidebar-list">
        ${familyItems.map(item => `
          <li class="sidebar-item">
            <button class="sidebar-btn ${item.id === state.maqamId ? "active" : ""} ${item.is_main ? "main-maqam" : ""}" data-maqam-id="${item.id}">
              <span class="sidebar-dot"></span>
              ${item.name}
              ${item.is_main ? '<span class="sidebar-main-tag">أساسي</span>' : ""}
            </button>
          </li>
        `).join("")}
      </ul>
    `;

    sidebar.querySelectorAll(".sidebar-btn").forEach(btn => btn.addEventListener("click", () => setActiveMaqam(btn.dataset.maqamId)));
    sidebar.querySelectorAll(".family-switch-btn").forEach(btn => btn.addEventListener("click", () => setActiveMaqam(btn.dataset.maqamId)));
    injectFamilySwitcherStyles();
  }

  function renderPageShell() {
    const maqam = getMaqamById(state.maqamId);
    const displayName = getDisplayNameForTonic(state.maqamId, state.tonic);
    const tonicLabel = getTonicLabelAr(state.tonic);
    const notes = buildScaleNotes(state.maqamId, state.tonic);

    if (!maqam || !notes.length) {
      root.innerHTML = `<section class="maqam-body"><div class="staff-scale-box"><div class="sec-title">غير متاح</div><p class="maqam-desc">هذا المقام لا يملك بيانات تفاعلية جاهزة بعد.</p></div></section>`;
      if (breadcrumbLabel) breadcrumbLabel.textContent = maqam ? maqam.name : "";
      return;
    }

    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    root.innerHTML = `
      <section class="maqam-hero" data-name="${displayName}">
        <div class="maqam-hero-inner">
          <div class="maqam-name-wrap">
            <h1 class="maqam-name" id="maqam-title">${displayName}</h1>
            <span class="maqam-latin">${maqam.latin || ""}</span>
          </div>
          <p class="maqam-desc" id="maqam-subtitle">الطبقة الحالية: ${tonicLabel}</p>
        </div>
      </section>

      <section class="maqam-body">
        <div class="sec-title">السلّم التفاعلي</div>
        <div class="staff-scale-box">
          <div class="staff-scale-header">
            <div class="staff-scale-title">اضغط على نوتة أو زر للاستماع</div>
            <div class="tonic-selector" id="tonic-selector-current"></div>
          </div>
          <div class="staff-wrap">
            <svg class="staff-svg" id="staff-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 250"></svg>
          </div>
          <div class="note-keys-row" id="keys-current"></div>
          <div class="playbar">
            <button class="play-btn" id="playbtn-current">
              <svg id="playicon-current" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
              <span id="playlabel-current">تشغيل السلّم</span>
            </button>
            <div class="status-bar" id="status-current"></div>
          </div>
        </div>

        <div class="sec-title">معلومات المقام</div>
        <div class="info-grid" id="maqam-info-grid"></div>
      </section>
    `;

    renderTonicSelector();
    renderInfoGrid();
    renderStaff();
    renderKeys();
    bindPageEvents();
  }

  function injectFamilySwitcherStyles() {
    if (document.getElementById("family-switcher-style")) return;
    const style = document.createElement("style");
    style.id = "family-switcher-style";
    style.textContent = `.family-switcher{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.family-switch-btn{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:var(--text-dim);border-radius:999px;padding:4px 10px;font-family:inherit;font-size:.72rem;font-weight:700;cursor:pointer;transition:all .2s ease}.family-switch-btn:hover{color:var(--text-muted);border-color:rgba(200,164,90,.25)}.family-switch-btn.active{color:var(--gold-light);background:rgba(200,164,90,.10);border-color:rgba(200,164,90,.35)}.note-key-face.note-key-face-colored{min-height:58px;border-width:1.5px}`;
    document.head.appendChild(style);
  }

  function renderTonicSelector() {
    const container = document.getElementById("tonic-selector-current");
    if (!container) return;
    const tonics = getRenderableTonicsForMaqam(state.maqamId);
    container.innerHTML = tonics.map(tonic => `<button class="tonic-btn ${tonic === state.tonic ? "active" : ""}" data-tonic="${tonic}">${getTonicLabelAr(tonic)}</button>`).join("");
    container.querySelectorAll(".tonic-btn").forEach(btn => btn.addEventListener("click", () => setActiveTonic(btn.dataset.tonic)));
  }

  function renderInfoGrid() {
    const maqam = getMaqamById(state.maqamId);
    const grid = document.getElementById("maqam-info-grid");
    if (!maqam || !grid) return;

    const model = MAQAM_MODELS[state.maqamId];
    const displayName = getDisplayNameForTonic(state.maqamId, state.tonic);

    grid.innerHTML = `
      <div class="info-card"><div class="info-label">الاسم الظاهر</div><div class="info-value gold">${displayName}</div></div>
      <div class="info-card"><div class="info-label">الطبقة الحالية</div><div class="info-value">${getTonicLabelAr(state.tonic)}</div></div>
      <div class="info-card"><div class="info-label">النموذج الأساسي</div><div class="info-value" dir="ltr">${model ? model.base_spelling.join(" - ") : ""}</div></div>
      <div class="info-card"><div class="info-label">الفواصل</div><div class="info-value" dir="ltr">${model ? model.intervals.join(" / ") : ""}</div></div>
    `;
  }

  function bindPageEvents() {
    const playBtn = document.getElementById("playbtn-current");
    if (playBtn) playBtn.addEventListener("click", playScale);
  }

  function setActiveMaqam(maqamId) {
    const maqam = getMaqamById(maqamId);
    if (!maqam) return;
    stopAllAudio();
    state.maqamId = maqamId;
    state.familyId = maqam.family;
    state.tonic = getInteractiveDefaultTonic(maqamId);
    state.activeNoteIndex = null;
    state.isPlaying = false;
    state.stopRequested = false;
    state.lastAudioErrorToken = null;
    renderAll();
    scrollMainToTop();
  }

  function setActiveTonic(tonic) {
    if (!getRenderableTonicsForMaqam(state.maqamId).includes(tonic)) return;
    stopAllAudio();
    state.tonic = tonic;
    state.activeNoteIndex = null;
    state.isPlaying = false;
    state.stopRequested = false;
    state.lastAudioErrorToken = null;
    updateDisplayedName();
    renderTonicSelector();
    renderInfoGrid();
    renderStaff();
    renderKeys();
    syncUrl();
  }

  function updateDisplayedName() {
    const maqam = getMaqamById(state.maqamId);
    const title = document.getElementById("maqam-title");
    const subtitle = document.getElementById("maqam-subtitle");
    const displayName = getDisplayNameForTonic(state.maqamId, state.tonic);
    const tonicLabel = getTonicLabelAr(state.tonic);

    if (title) title.textContent = displayName;
    if (subtitle) subtitle.textContent = `الطبقة الحالية: ${tonicLabel}`;
    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    const hero = root.querySelector(".maqam-hero");
    if (hero) hero.setAttribute("data-name", displayName);

    if (maqam && maqam.latin) {
      const latin = root.querySelector(".maqam-latin");
      if (latin) latin.textContent = maqam.latin;
    }
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("family", state.familyId);
    url.searchParams.set("maqam", state.maqamId);
    url.searchParams.set("tonic", state.tonic);
    window.history.replaceState({}, "", url.toString());
  }

  function scrollMainToTop() {
    const panel = document.getElementById("main-panel");
    if (panel) panel.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderStaff() {
    const svg = document.getElementById("staff-current");
    if (!svg) return;

    const notes = buildScaleNotes(state.maqamId, state.tonic);
    svg.innerHTML = "";

    STAFF_LINES_Y.forEach(y => {
      svg.appendChild(svgEl("line", {
        x1: "0", y1: String(y), x2: "820", y2: String(y),
        stroke: "#8a7440", "stroke-width": "1.6"
      }));
    });

    drawClef(svg);

    const xStart = 82;
    const xGap = (820 - xStart - 16) / 8;

    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const palette = getPaletteForNote(note);
      const active = state.activeNoteIndex === i;
      const slot = SLOT_MAP[note.slot_key] || SLOT_MAP["E4"];
      const y = slot.y;

      const g = svgEl("g", {
        class: `note-btn ${active ? "active" : ""}`,
        "data-note-idx": String(i),
        role: "button",
        tabindex: "0",
        style: "cursor:pointer"
      }, svg);

      drawLedgerLines(g, x, slot.ledger);

      const noteColor = active ? palette.active : palette.idle;
      const stemColor = active ? palette.active : palette.stem;
      const accidentalColor = active ? palette.active_acc : palette.acc;
      const up = y >= 138;

      svgEl("line", {
        x1: String(up ? x + 7 : x - 7),
        y1: String(y),
        x2: String(up ? x + 7 : x - 7),
        y2: String(up ? y - 38 : y + 38),
        stroke: stemColor,
        "stroke-width": "1.8"
      }, g);

      drawAccidental(g, x - 22, y, note.acc_label, accidentalColor);

      svgEl("ellipse", {
        cx: String(x),
        cy: String(y),
        rx: "8",
        ry: "5.5",
        fill: noteColor,
        transform: `rotate(-18,${x},${y})`
      }, g);
    });

    svg.querySelectorAll(".note-btn").forEach(node => {
      node.addEventListener("click", async () => {
        const idx = Number(node.dataset.noteIdx);
        setActiveNote(idx);
        const notesNow = buildScaleNotes(state.maqamId, state.tonic);
        if (notesNow[idx]) await playSingleNote(notesNow[idx].token);
      });
    });
  }

  function renderKeys() {
    const row = document.getElementById("keys-current");
    if (!row) return;

    const notes = buildScaleNotes(state.maqamId, state.tonic);
    row.innerHTML = notes.map((note, i) => {
      const palette = getPaletteForNote(note);
      const active = state.activeNoteIndex === i;
      const bg = active ? palette.box_bg_active : palette.box_bg;
      const border = active ? palette.box_border_active : palette.box_border;
      const text = active ? palette.box_text_active : palette.box_text;

      return `
        <div class="note-key ${active ? "active" : ""}" data-note-idx="${i}">
          <div class="note-key-face note-key-face-colored" style="background:${bg};border-color:${border};color:${text};box-shadow:${active ? `0 10px 24px ${shadowColorForBorder(border)}` : "none"};">
            <span>${note.display_label}</span>
          </div>
        </div>
      `;
    }).join("");

    row.querySelectorAll(".note-key").forEach(node => {
      node.addEventListener("click", async () => {
        const idx = Number(node.dataset.noteIdx);
        setActiveNote(idx);
        const notesNow = buildScaleNotes(state.maqamId, state.tonic);
        if (notesNow[idx]) await playSingleNote(notesNow[idx].token);
      });
    });
  }

  function setActiveNote(idx) {
    state.activeNoteIndex = idx;
    renderStaff();
    renderKeys();
  }

  async function playScale() {
    if (state.isPlaying) {
      state.stopRequested = true;
      stopAllAudio();
      return;
    }

    const notes = buildScaleNotes(state.maqamId, state.tonic);
    const status = document.getElementById("status-current");
    const playIcon = document.getElementById("playicon-current");
    const playLabel = document.getElementById("playlabel-current");
    const playBtn = document.getElementById("playbtn-current");

    state.isPlaying = true;
    state.stopRequested = false;

    if (playIcon) playIcon.innerHTML = '<rect x="5" y="3" width="4" height="18"></rect><rect x="15" y="3" width="4" height="18"></rect>';
    if (playLabel) playLabel.textContent = "إيقاف التشغيل";
    if (playBtn) playBtn.classList.add("is-playing");
    if (status) status.className = "status-bar on";

    for (let i = 0; i < notes.length; i++) {
      if (state.stopRequested) break;
      state.activeNoteIndex = i;
      renderStaff();
      renderKeys();
      if (status) status.textContent = `▶ ${notes[i].display_label}`;
      await playSingleNote(notes[i].token);
      await new Promise(resolve => setTimeout(resolve, 120));
    }

    state.activeNoteIndex = null;
    renderStaff();
    renderKeys();

    if (status) {
      status.textContent = state.lastAudioErrorToken ? `ملف الصوت غير موجود: ${state.lastAudioErrorToken}` : "";
      status.className = state.lastAudioErrorToken ? "status-bar on" : "status-bar";
    }
    if (playIcon) playIcon.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
    if (playLabel) playLabel.textContent = "تشغيل السلّم";
    if (playBtn) playBtn.classList.remove("is-playing");

    state.isPlaying = false;
    state.stopRequested = false;
  }

  function buildScaleNotes(maqamId, tonic) {
    const model = MAQAM_MODELS[maqamId];
    const tonicToken = getCanonicalInteractiveNoteForTonic(tonic);
    if (!model || !tonicToken) return [];
    if (!isRenderableScaleForTonic(maqamId, tonic)) return [];

    const tonicQt = getQuarterForToken(tonicToken);
    const targetLetter = NOTE_TOKEN_META[tonicToken].letter;
    const targetRootOctave = LOWER_OCTAVE_TONICS.has(tonic) ? 3 : 4;
    const jinsInfo = getJinsInfo(maqamId);

    const absoluteQuarterValues = [tonicQt];
    let running = tonicQt;
    model.intervals.forEach(interval => {
      running += interval;
      absoluteQuarterValues.push(running);
    });

    return absoluteQuarterValues.map((absQt, idx) => {
      const targetLetterIdx = (LETTER_TO_INDEX[targetLetter] + idx) % 7;
      const expectedLetter = LETTER_SEQUENCE[targetLetterIdx];
      const token = spellQuarterWithExpectedLetter(absQt, expectedLetter);
      const octave = targetRootOctave + Math.floor((LETTER_TO_INDEX[targetLetter] + idx) / 7);
      const slotKey = `${expectedLetter}${octave}`;
      const meta = NOTE_TOKEN_META[token] || NOTE_TOKEN_META[tonicToken];

      return {
        token,
        slot_key: slotKey,
        acc_label: meta.acc_label,
        display_label: getArabicDisplayLabel(meta.ar, octave),
        jins_zone: getJinsZone(idx, jinsInfo),
        is_jins_start: isJinsStart(idx, jinsInfo)
      };
    });
  }

  function getJinsInfo(maqamId) {
    const config = getInteractiveConfig(maqamId) || {};
    return {
      lower: normalizeDegreeRange(config.lower_jins_degree_range || [1, 4]),
      upper: normalizeDegreeRange(config.upper_jins_degree_range || [5, 8])
    };
  }

  function normalizeDegreeRange(range) {
    const start = Math.max(0, (range[0] || 1) - 1);
    const end = Math.max(start, (range[1] || 8) - 1);
    return { start, end };
  }

  function getJinsZone(idx, jinsInfo) {
    if (idx >= jinsInfo.upper.start && idx <= jinsInfo.upper.end) return "upper";
    return "lower";
  }

  function isJinsStart(idx, jinsInfo) {
    return idx === jinsInfo.lower.start || idx === jinsInfo.upper.start;
  }

  function getPaletteForNote(note) {
    const zone = note.jins_zone === "upper" ? "upper" : "lower";
    const colorSet = COLORS[zone];
    const isStart = !!note.is_jins_start;
    return {
      idle: isStart ? colorSet.note_bright : colorSet.note,
      stem: colorSet.stem,
      acc: colorSet.acc,
      active: colorSet.active,
      active_acc: colorSet.active_acc,
      box_bg: isStart ? colorSet.box_bg_bright : colorSet.box_bg,
      box_border: isStart ? colorSet.box_border_bright : colorSet.box_border,
      box_text: isStart ? colorSet.box_text_bright : colorSet.box_text,
      box_bg_active: colorSet.box_bg_active,
      box_border_active: colorSet.box_border_active,
      box_text_active: colorSet.box_text_active
    };
  }

  function getQuarterForToken(token) {
    const meta = NOTE_TOKEN_META[token];
    return meta ? meta.qt : null;
  }

  function spellQuarterWithExpectedLetter(absQuarter, expectedLetter, strict = false) {
    const q = ((absQuarter % 24) + 24) % 24;
    const token = Object.keys(NOTE_TOKEN_META).find(key => {
      const meta = NOTE_TOKEN_META[key];
      return meta.letter === expectedLetter && meta.qt === q;
    });
    if (token) return token;
    if (strict) return null;

    const fallback = getAllowedCanonicalSpellingsForQuarter(q);
    if (fallback && fallback.length) return fallback[0];
    return "Do";
  }

  function getArabicDisplayLabel(base, octave) {
    if (octave <= 3) return `${base} قرار`;
    if (octave >= 5) return `${base} جواب`;
    return base;
  }

  async function playSingleNote(token) {
    if (typeof getNoteAudioUrl !== "function") {
      state.lastAudioErrorToken = token;
      return false;
    }
    const url = getNoteAudioUrl(token);
    if (!url) {
      state.lastAudioErrorToken = token;
      return false;
    }

    try {
      let audio = audioCache.get(token);
      if (!audio) {
        audio = new Audio(url);
        audio.preload = "auto";
        audioCache.set(token, audio);
      }
      audio.pause();
      audio.currentTime = 0;
      await audio.play();
      state.lastAudioErrorToken = null;

      await new Promise(resolve => {
        const done = () => {
          audio.removeEventListener("ended", done);
          audio.removeEventListener("error", done);
          resolve();
        };
        audio.addEventListener("ended", done, { once: true });
        audio.addEventListener("error", done, { once: true });
      });

      return true;
    } catch (err) {
      state.lastAudioErrorToken = token;
      return false;
    }
  }

  function stopAllAudio() {
    audioCache.forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    });
  }

  function shadowColorForBorder(borderColor) {
    if (borderColor.startsWith("rgba(")) {
      return borderColor.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/, "rgba($1,$2,$3,0.16)");
    }
    return "rgba(0,0,0,0.16)";
  }

  function svgEl(tag, attrs, parent) {
    const e = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => e.setAttribute(k, v));
    if (parent) parent.appendChild(e);
    return e;
  }

  function drawClef(svg) {
    const g = svgEl("g", { transform: "translate(18,78) scale(2.15,2.15)" }, svg);
    svgEl("path", {
      d: "m12.049 3.5296c0.305 3.1263-2.019 5.6563-4.0772 7.7014-0.9349 0.897-0.155 0.148-0.6437 0.594-0.1022-0.479-0.2986-1.731-0.2802-2.11 0.1304-2.6939 2.3198-6.5875 4.2381-8.0236 0.309 0.5767 0.563 0.6231 0.763 1.8382zm0.651 16.142c-1.232-0.906-2.85-1.144-4.3336-0.885-0.1913-1.255-0.3827-2.51-0.574-3.764 2.3506-2.329 4.9066-5.0322 5.0406-8.5394 0.059-2.232-0.276-4.6714-1.678-6.4836-1.7004 0.12823-2.8995 2.156-3.8019 3.4165-1.4889 2.6705-1.1414 5.9169-0.57 8.7965-0.8094 0.952-1.9296 1.743-2.7274 2.734-2.3561 2.308-4.4085 5.43-4.0046 8.878 0.18332 3.334 2.5894 6.434 5.8702 7.227 1.2457 0.315 2.5639 0.346 3.8241 0.099 0.2199 2.25 1.0266 4.629 0.0925 6.813-0.7007 1.598-2.7875 3.004-4.3325 2.192-0.5994-0.316-0.1137-0.051-0.478-0.252 1.0698-0.257 1.9996-1.036 2.26-1.565 0.8378-1.464-0.3998-3.639-2.1554-3.358-2.262 0.046-3.1904 3.14-1.7356 4.685 1.3468 1.52 3.833 1.312 5.4301 0.318 1.8125-1.18 2.0395-3.544 1.8325-5.562-0.07-0.678-0.403-2.67-0.444-3.387 0.697-0.249 0.209-0.059 1.193-0.449 2.66-1.053 4.357-4.259 3.594-7.122-0.318-1.469-1.044-2.914-2.302-3.792zm0.561 5.757c0.214 1.991-1.053 4.321-3.079 4.96-0.136-0.795-0.172-1.011-0.2626-1.475-0.4822-2.46-0.744-4.987-1.116-7.481 1.6246-0.168 3.4576 0.543 4.0226 2.184 0.244 0.577 0.343 1.197 0.435 1.812zm-5.1486 5.196c-2.5441 0.141-4.9995-1.595-5.6343-4.081-0.749-2.153-0.5283-4.63 0.8207-6.504 1.1151-1.702 2.6065-3.105 4.0286-4.543 0.183 1.127 0.366 2.254 0.549 3.382-2.9906 0.782-5.0046 4.725-3.215 7.451 0.5324 0.764 1.9765 2.223 2.7655 1.634-1.102-0.683-2.0033-1.859-1.8095-3.227-0.0821-1.282 1.3699-2.911 2.6513-3.198 0.4384 2.869 0.9413 6.073 1.3797 8.943-0.5054 0.1-1.0211 0.143-1.536 0.143z",
      fill: "#f0d28a",
      stroke: "none"
    }, g);
  }

  function drawLedgerLines(parent, x, ledgers) {
    (ledgers || []).forEach(lineY => {
      svgEl("line", {
        x1: String(x - 13),
        y1: String(lineY),
        x2: String(x + 13),
        y2: String(lineY),
        stroke: "#9a844a",
        "stroke-width": "1.6"
      }, parent);
    });
  }

  function drawAccidental(parent, x, y, accLabel, color) {
    if (!accLabel) return;
    if (accLabel === "♭") return drawFlat(parent, x, y, color);
    if (accLabel === "𝄳") return drawHalfFlat(parent, x, y, color);
    if (accLabel === "♯") return drawSharp(parent, x, y, color);
    if (accLabel === "𝄲") return drawHalfSharp(parent, x, y, color);
  }

  function drawFlat(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x},${y - 6})` }, parent);
    svgEl("rect", { x: "-1.2", y: "-14", width: "2.4", height: "20", fill: color, rx: "0.6" }, g);
    svgEl("path", { d: "M 1 -3 C 8 0 8 5 8 6 C 8 12 4 14 1 14 L 1 14 L -1 14 L -1 -3 Z", fill: color }, g);
  }

  function drawHalfFlat(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x},${y - 6})` }, parent);
    svgEl("rect", { x: "-1.2", y: "-13", width: "2.4", height: "21", fill: color, rx: "0.6" }, g);
    svgEl("path", { d: "M 1 -2 C 8 0 8 5 8 6 C 8 12 4 13 1 13 L 1 13 L -1 13 L -1 -2 Z", fill: color }, g);
    svgEl("rect", { x: "-5", y: "-5.5", width: "11", height: "2.4", fill: color, rx: "0.8" }, g);
  }

  function drawSharp(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x},${y})` }, parent);
    svgEl("rect", { x: "-4.2", y: "-9", width: "2.2", height: "18", fill: color }, g);
    svgEl("rect", { x: "2.2", y: "-9", width: "2.2", height: "18", fill: color }, g);
    svgEl("rect", { x: "-6", y: "-4.8", width: "13", height: "2.2", fill: color, transform: "rotate(-8)" }, g);
    svgEl("rect", { x: "-6", y: "1.4", width: "13", height: "2.2", fill: color, transform: "rotate(-8)" }, g);
  }

function drawHalfSharp(parent, x, y, color) {
  const visibleColor = "#fff0bf";

  const g = svgEl("g", {
    transform: `translate(${x - 6.5},${y - 0.5}) scale(-1.35,1.35) translate(-0.5,-1044.8)`
  }, parent);

  svgEl("path", {
    d: "m 0.5,1037.831 0,14.0625",
    fill: "none",
    stroke: visibleColor,
    "stroke-width": "1.9",
    "stroke-linecap": "square",
    "stroke-linejoin": "miter",
    "stroke-miterlimit": "4",
    "stroke-opacity": "1",
    "stroke-dasharray": "none"
  }, g);

  svgEl("path", {
    d: "m -2.1200719,1048.4823 5.2401438,-2.0686",
    fill: "none",
    stroke: visibleColor,
    "stroke-width": "3.1",
    "stroke-linecap": "square",
    "stroke-linejoin": "miter",
    "stroke-miterlimit": "4",
    "stroke-opacity": "1",
    "stroke-dasharray": "none"
  }, g);

  svgEl("path", {
    d: "m 3.1200719,1041.2421 -5.2401438,2.0686",
    fill: "none",
    stroke: visibleColor,
    "stroke-width": "3.1",
    "stroke-linecap": "square",
    "stroke-linejoin": "miter",
    "stroke-miterlimit": "4",
    "stroke-opacity": "1",
    "stroke-dasharray": "none"
  }, g);
}

  bootstrap();
})();
