// assets/interactive-scale.js
// Repo-compatible interactive maqam page controller
// Depends on:
// - data/maqamat.js
// - data/interactive-maqamat.js
// - data/note-audio-map.js
//
// This version fixes:
// - exact root transposition from base maqam templates
// - exact canonical note spelling preservation after transposition
// - rendering from exact tokens instead of re-guessing from pitch
// - note box accidental glyphs
// - jins-based color logic
// - single active note behavior

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
    "Do":   { letter: "C", acc_label: "",    ar: "دو",  display: "Do" },
    "Dob":  { letter: "C", acc_label: "♭",   ar: "دو",  display: "Do♭" },
    "Do#":  { letter: "C", acc_label: "♯",   ar: "دو",  display: "Do♯" },
    "Do/#": { letter: "C", acc_label: "𝄲",   ar: "دو",  display: "Do𝄲" },
    "Re":   { letter: "D", acc_label: "",    ar: "ري",  display: "Re" },
    "Reb":  { letter: "D", acc_label: "♭",   ar: "ري",  display: "Re♭" },
    "Re/b": { letter: "D", acc_label: "𝄳",   ar: "ري",  display: "Re𝄳" },
    "Re#":  { letter: "D", acc_label: "♯",   ar: "ري",  display: "Re♯" },
    "Mi":   { letter: "E", acc_label: "",    ar: "مي",  display: "Mi" },
    "Mib":  { letter: "E", acc_label: "♭",   ar: "مي",  display: "Mi♭" },
    "Mi/b": { letter: "E", acc_label: "𝄳",   ar: "مي",  display: "Mi𝄳" },
    "Fa":   { letter: "F", acc_label: "",    ar: "فا",  display: "Fa" },
    "Fa#":  { letter: "F", acc_label: "♯",   ar: "فا",  display: "Fa♯" },
    "Fa/#": { letter: "F", acc_label: "𝄲",   ar: "فا",  display: "Fa𝄲" },
    "Sol":  { letter: "G", acc_label: "",    ar: "صول", display: "Sol" },
    "Solb": { letter: "G", acc_label: "♭",   ar: "صول", display: "Sol♭" },
    "Sol#": { letter: "G", acc_label: "♯",   ar: "صول", display: "Sol♯" },
    "La":   { letter: "A", acc_label: "",    ar: "لا",  display: "La" },
    "Lab":  { letter: "A", acc_label: "♭",   ar: "لا",  display: "La♭" },
    "La/b": { letter: "A", acc_label: "𝄳",   ar: "لا",  display: "La𝄳" },
    "Si":   { letter: "B", acc_label: "",    ar: "سي",  display: "Si" },
    "Sib":  { letter: "B", acc_label: "♭",   ar: "سي",  display: "Si♭" },
    "Si/b": { letter: "B", acc_label: "𝄳",   ar: "سي",  display: "Si𝄳" }
  };

  const LETTER_BASE_STEPS = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
  const STEP_TO_LETTER = ["C", "D", "E", "F", "G", "A", "B"];

  const Y_MAP = {
    C3: 208, D3: 201, E3: 194, F3: 187, G3: 180, A3: 173, B3: 166,
    C4: 152, D4: 145, E4: 138, F4: 131, G4: 124, A4: 117, B4: 110,
    C5: 103, D5: 96,  E5: 89,  F5: 82,  G5: 75,  A5: 68,  B5: 61
  };

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

  const MAQAM_SCALE_TEMPLATES = {
    rast:             ["Do", "Re", "Mi/b", "Fa", "Sol", "La", "Si/b", "Do"],
    suznak:           ["Do", "Re", "Mi/b", "Fa", "Sol", "Lab", "Sib", "Do"],
    mahur:            ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"],
    nairuz:           ["Do", "Re", "Mi/b", "Fa", "Sol", "Lab", "Sib", "Do"],
    bashayer:         ["Do", "Re", "Mi/b", "Fa", "Sol", "La", "Sib", "Do"],
    sazkar:           ["Do", "Re", "Mi/b", "Fa", "Sol", "Lab", "Sib", "Do"],
    dalanshin:        ["Do", "Re", "Mi/b", "Fa", "Sol", "Lab", "Si/b", "Do"],

    bayati:           ["Re", "Mi/b", "Fa", "Sol", "La", "Si/b", "Do", "Re"],
    bayati_shuri:     ["Re", "Mi/b", "Fa", "Sol", "La", "Sib", "Do", "Re"],
    husayni:          ["Re", "Mi/b", "Fa", "Sol", "La", "Si/b", "Do", "Re"],
    muhayyar:         ["Re", "Mi/b", "Fa", "Sol", "La", "Si/b", "Do", "Re"],
    bayatin:          ["Re", "Mi/b", "Fa", "Sol", "La", "Si/b", "Do", "Re"],
    nahuft:           ["La", "Si", "Do", "Re", "Mi", "Fa", "Sol", "La"],

    ajam:             ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"],
    ajam_ushayran:    ["Sib", "Do", "Re", "Mib", "Fa", "Sol", "La", "Sib"],
    shawq_afza:       ["Sib", "Do", "Re", "Mib", "Fa", "Sol", "La", "Sib"],
    suznal:           ["Do", "Re", "Mi", "Fa", "Sol", "Lab", "Sib", "Do"],
    ajam_murassa:     ["Sib", "Do", "Re", "Mib", "Fa", "Sol", "La/b", "Sib"],
    jaharkah:         ["Fa", "Sol", "La", "Sib", "Do", "Re", "Mi", "Fa"],

    hijaz:            ["Re", "Mib", "Fa#", "Sol", "La", "Sib", "Do", "Re"],
    hijazkar:         ["Do", "Reb", "Mi", "Fa", "Sol", "La", "Si", "Do"],
    shadd_araban:     ["Sol", "Lab", "Si", "Do", "Re", "Mib", "Fa", "Sol"],
    suzdil:           ["La", "Sib", "Do#", "Re", "Mi", "Fa", "Sol", "La"],
    shahnaz:          ["Re", "Mib", "Fa#", "Sol", "La", "Sib", "Do", "Re"],
    hijazayn:         ["Re", "Mib", "Fa#", "Sol", "La", "Sib", "Do", "Re"],
    zanjaran:         ["Re", "Mib", "Fa#", "Sol", "La", "Sib", "Do", "Re"],
    hijaz_ajami:      ["Re", "Mib", "Fa#", "Sol", "La", "Si", "Do#", "Re"],

    nahawand:         ["Do", "Re", "Mib", "Fa", "Sol", "Lab", "Sib", "Do"],
    nahawand_murassa: ["Do", "Re", "Mib", "Fa", "Sol", "La/b", "Si/b", "Do"],
    ushshaq_masri:    ["Do", "Re", "Mib", "Fa", "Sol", "La/b", "Si/b", "Do"],
    tarz_jadid:       ["Do", "Re", "Mib", "Fa", "Sol", "Lab", "Sib", "Do"],
    nahawand_kabir:   ["Do", "Re", "Mib", "Fa", "Sol", "La", "Si", "Do"],
    nahawand_kurdi:   ["Do", "Reb", "Mib", "Fa", "Sol", "Lab", "Sib", "Do"],

    kurd:             ["Re", "Mib", "Fa", "Sol", "La", "Sib", "Do", "Re"],
    tarz_nawin:       ["Re", "Mib", "Fa", "Sol", "La", "Sib", "Do", "Re"],
    shahnaz_kurdi:    ["Re", "Mib", "Fa", "Sol", "La", "Sib", "Do", "Re"],
    lami:             ["Re", "Mib", "Fa", "Sol", "La", "Sib", "Do", "Re"],
    athar_kurd:       ["Re", "Mib", "Fa", "Sol", "La", "Sib", "Do", "Re"],

    sikah:            ["Mi/b", "Fa/#", "Sol", "La/b", "Si/b", "Do", "Re", "Mi/b"],
    huzam:            ["Mi/b", "Fa/#", "Sol", "La/b", "Si/b", "Do", "Re", "Mi/b"],
    rahat_al_arwah:   ["Si/b", "Do/#", "Re", "Mi/b", "Fa/#", "Sol", "La", "Si/b"],
    iraq:             ["Si/b", "Do/#", "Re", "Mi/b", "Fa/#", "Sol", "La", "Si/b"],
    awj_iraq:         ["Si/b", "Do/#", "Re", "Mi/b", "Fa/#", "Sol", "La", "Si/b"],
    basta_nikar:      ["Si/b", "Do/#", "Re", "Mi/b", "Fa/#", "Sol", "La", "Si/b"],
    mustaar:          ["Mi/b", "Fa/#", "Sol", "La/b", "Si/b", "Do", "Re", "Mi/b"],
    farahnak:         ["Si/b", "Do/#", "Re", "Mi/b", "Fa/#", "Sol", "La", "Si/b"],
    shaar:            ["Mi/b", "Fa/#", "Sol", "La/b", "Si/b", "Do", "Re", "Mi/b"],
    rahat_faza:       ["Mi/b", "Fa/#", "Sol", "La/b", "Si/b", "Do", "Re", "Mi/b"],

    saba:             ["Re", "Mi/b", "Fa", "Solb", "La", "Sib", "Do", "Re"],
    saba_jadid:       ["Re", "Mi/b", "Fa", "Solb", "La", "Sib", "Do", "Re"],
    zamzama:          ["Re", "Mib", "Fa", "Solb", "La", "Sib", "Do", "Re"],

    nawa_athar:       ["Do", "Re", "Mib", "Fa#", "Sol", "Lab", "Sib", "Do"],
    nikriz:           ["Do", "Re", "Mib", "Fa#", "Sol", "Lab", "Sib", "Do"],
    basandida:        ["Do", "Re", "Mib", "Fa#", "Sol", "Lab", "Sib", "Do"]
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

    const allowedTonics = getInteractiveTonicsForMaqam(resolvedMaqam);
    const defaultTonic = getInteractiveDefaultTonic(resolvedMaqam);
    const resolvedTonic = allowedTonics.includes(tonic) ? tonic : defaultTonic;

    return { familyId: resolvedFamily, maqamId: resolvedMaqam, tonic: resolvedTonic };
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

    sidebar.querySelectorAll(".sidebar-btn").forEach(btn => {
      btn.addEventListener("click", () => setActiveMaqam(btn.dataset.maqamId));
    });

    sidebar.querySelectorAll(".family-switch-btn").forEach(btn => {
      btn.addEventListener("click", () => setActiveMaqam(btn.dataset.maqamId));
    });

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
            <svg class="staff-svg" id="staff-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 220"></svg>
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
    style.textContent = `.family-switcher { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; } .family-switch-btn { border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); color:var(--text-dim); border-radius:999px; padding:4px 10px; font-family:inherit; font-size:.72rem; font-weight:700; cursor:pointer; transition:all .2s ease; } .family-switch-btn:hover { color:var(--text-muted); border-color:rgba(200,164,90,.25); } .family-switch-btn.active { color:var(--gold-light); background:rgba(200,164,90,.10); border-color:rgba(200,164,90,.35); } .note-key-face.note-key-face-colored { min-height:58px; border-width:1.5px; }`;
    document.head.appendChild(style);
  }

  function renderTonicSelector() {
    const container = document.getElementById("tonic-selector-current");
    if (!container) return;

    const tonics = getInteractiveTonicsForMaqam(state.maqamId);
    container.innerHTML = tonics.map(tonic => `<button class="tonic-btn ${tonic === state.tonic ? "active" : ""}" data-tonic="${tonic}">${getTonicLabelAr(tonic)}</button>`).join("");
    container.querySelectorAll(".tonic-btn").forEach(btn => btn.addEventListener("click", () => setActiveTonic(btn.dataset.tonic)));
  }

  function renderInfoGrid() {
    const maqam = getMaqamById(state.maqamId);
    const grid = document.getElementById("maqam-info-grid");
    if (!maqam || !grid) return;

    const displayName = getDisplayNameForTonic(state.maqamId, state.tonic);
    const baseTonic = getTonicLabelAr(maqam.base_tonic);
    const currentTonic = getTonicLabelAr(state.tonic);
    const baseNote = maqam.base_note || getCanonicalNoteForTonic(maqam.base_tonic) || "";
    const currentCanonical = getCanonicalInteractiveNoteForTonic(state.tonic) || "";
    const familyMain = getFamilyMainMaqam(maqam.family);
    const otherNames = buildOtherNamesByTonic(maqam);

    grid.innerHTML = `
      <div class="info-card"><div class="info-label">الاسم الظاهر</div><div class="info-value gold">${displayName}</div></div>
      <div class="info-card"><div class="info-label">الطبقة الحالية</div><div class="info-value">${currentTonic}</div></div>
      <div class="info-card"><div class="info-label">الطبقة الأساسية</div><div class="info-value">${baseTonic}</div></div>
      <div class="info-card"><div class="info-label">النوتة المرجعية</div><div class="info-value" dir="ltr">${baseNote}</div></div>
      <div class="info-card"><div class="info-label">النوتة الحالية</div><div class="info-value" dir="ltr">${currentCanonical}</div></div>
      <div class="info-card"><div class="info-label">العائلة</div><div class="info-value">${familyMain ? familyMain.name : maqam.family}</div></div>
      ${otherNames ? `<div class="info-card" style="grid-column:1 / -1;"><div class="info-label">أسماء أخرى بحسب الطبقة</div><div class="info-value">${otherNames}</div></div>` : ""}
    `;
  }

  function buildOtherNamesByTonic(maqam) {
    const map = maqam.display_name_by_tonic || {};
    const entries = Object.entries(map).filter(([tonic, name]) => tonic !== maqam.base_tonic && name && name !== maqam.name);
    if (!entries.length) return "";
    return entries.map(([tonic, name]) => `${getTonicLabelAr(tonic)} = ${name}`).join(" · ");
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

    [138, 124, 110, 96, 82].forEach(y => {
      svg.appendChild(svgEl("line", { x1: "0", y1: String(y), x2: "820", y2: String(y), stroke: "#5a5038", "stroke-width": "1.4" }));
    });

    drawClef(svg);

    const xStart = 82;
    const xGap = (820 - xStart - 16) / 8;

    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const y = note.staff_y;
      const palette = getPaletteForNote(note);
      const active = state.activeNoteIndex === i;
      const noteColor = active ? palette.active : palette.idle;
      const stemColor = active ? palette.active : palette.stem;
      const accidentalColor = active ? palette.active_acc : palette.acc;

      const g = svgEl("g", { class: `note-btn ${active ? "active" : ""}`, "data-note-idx": String(i), role: "button", tabindex: "0", style: "cursor:pointer" }, svg);
      drawLedgerLines(g, x, y);

      const up = y >= 110;
      svgEl("line", { x1: String(up ? x + 7 : x - 7), y1: String(y), x2: String(up ? x + 7 : x - 7), y2: String(up ? y - 38 : y + 38), stroke: stemColor, "stroke-width": "1.8" }, g);
      drawAccidental(g, x - 22, y, note.acc_label, accidentalColor);
      svgEl("ellipse", { cx: String(x), cy: String(y), rx: "8", ry: "5.5", fill: noteColor, transform: `rotate(-18,${x},${y})` }, g);
    });

    svg.querySelectorAll(".note-btn").forEach(node => {
      node.addEventListener("click", async () => {
        const idx = Number(node.dataset.noteIdx);
        setActiveNote(idx);
        const notesNow = buildScaleNotes(state.maqamId, state.tonic);
        if (notesNow[idx]) await playSingleNote(notesNow[idx].token);
      });
      node.addEventListener("keydown", async e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const idx = Number(node.dataset.noteIdx);
          setActiveNote(idx);
          const notesNow = buildScaleNotes(state.maqamId, state.tonic);
          if (notesNow[idx]) await playSingleNote(notesNow[idx].token);
        }
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
          <div class="note-key-face note-key-face-colored" style="background:${bg};border-color:${border};color:${text};box-shadow:${active ? `0 10px 24px ${toShadowColor(border)}` : "none"};">
            <span dir="ltr" style="font-weight:800">${note.display_label}</span>
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
    const baseTemplate = MAQAM_SCALE_TEMPLATES[maqamId];
    const tonicCanonical = getCanonicalInteractiveNoteForTonic(tonic);
    if (!baseTemplate || !tonicCanonical) return [];

    const tonicOctave = LOWER_OCTAVE_TONICS.has(tonic) ? 3 : 4;
    const transposedTokens = transposeTemplateToTonic(baseTemplate, tonicCanonical);
    const rootLetter = NOTE_TOKEN_META[transposedTokens[0]] ? NOTE_TOKEN_META[transposedTokens[0]].letter : "C";
    const jinsInfo = getJinsInfo(maqamId);

    return transposedTokens.map((token, idx) => {
      const spelled = buildSpelledScaleNote(token, idx, tonicOctave, rootLetter);
      return {
        degree_index: idx,
        quarter_tone_value: getQuarterForCanonicalNote(token),
        token,
        display_label: getDisplayLabel(token),
        label_ar: spelled.label_ar,
        acc_label: spelled.acc_label,
        staff_y: spelled.staff_y,
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

  function getDisplayLabel(token) {
    return NOTE_TOKEN_META[token] ? NOTE_TOKEN_META[token].display : token;
  }

  function transposeTemplateToTonic(baseTemplate, targetTonicToken) {
    const sourceTonic = baseTemplate[0];
    const sourceQt = getQuarterForCanonicalNote(sourceTonic);
    const targetQt = getQuarterForCanonicalNote(targetTonicToken);
    if (sourceQt === null || targetQt === null) return baseTemplate.slice();

    const delta = ((targetQt - sourceQt) % 24 + 24) % 24;
    const sourceRootLetter = NOTE_TOKEN_META[sourceTonic].letter;
    const targetRootLetter = NOTE_TOKEN_META[targetTonicToken].letter;
    const sourceRootStep = LETTER_BASE_STEPS[sourceRootLetter];
    const targetRootStep = LETTER_BASE_STEPS[targetRootLetter];
    const letterShift = ((targetRootStep - sourceRootStep) % 7 + 7) % 7;

    return baseTemplate.map(token => transposeToken(token, delta, letterShift));
  }

  function transposeToken(token, quarterDelta, letterShift) {
    const sourceMeta = NOTE_TOKEN_META[token];
    if (!sourceMeta) return token;

    const sourceQt = getQuarterForCanonicalNote(token);
    if (sourceQt === null) return token;

    const targetQt = ((sourceQt + quarterDelta) % 24 + 24) % 24;
    const sourceStep = LETTER_BASE_STEPS[sourceMeta.letter];
    const targetStep = (sourceStep + letterShift) % 7;
    const targetLetter = STEP_TO_LETTER[targetStep];

    const targetToken = findTokenForLetterAndQuarter(targetLetter, targetQt);
    if (targetToken) return targetToken;

    const allowed = getAllowedCanonicalSpellingsForQuarter(targetQt);
    if (allowed && allowed.length) return allowed[0];

    return token;
  }

  function findTokenForLetterAndQuarter(letter, targetQt) {
    const entry = Object.entries(NOTE_TOKEN_META).find(([token, meta]) => {
      if (meta.letter !== letter) return false;
      const qt = getQuarterForCanonicalNote(token);
      return qt === targetQt;
    });
    return entry ? entry[0] : null;
  }

  function buildSpelledScaleNote(token, degreeIdx, tonicOctave, rootLetter) {
    const meta = NOTE_TOKEN_META[token];
    if (!meta) return { label_ar: "", acc_label: "", staff_y: 110 };
    const octave = resolveDisplayOctave(degreeIdx, tonicOctave, rootLetter);
    const staffY = Y_MAP[`${meta.letter}${octave}`] || 110;
    return { label_ar: meta.ar, acc_label: meta.acc_label, staff_y: staffY };
  }

  function resolveDisplayOctave(degreeIdx, tonicOctave, rootLetter) {
    const rootStep = LETTER_BASE_STEPS[rootLetter];
    return tonicOctave + Math.floor((rootStep + degreeIdx) / 7);
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

  function toShadowColor(borderColor) {
    return borderColor.replace(/rgba?\(([^)]+)\)/, "rgba($1,0.16)");
  }

  function svgEl(tag, attrs, parent) {
    const e = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => e.setAttribute(k, v));
    if (parent) parent.appendChild(e);
    return e;
  }

  function drawClef(svg) {
    const g = svgEl("g", { transform: "translate(18,62) scale(2.15,2.15)" }, svg);
    svgEl("path", {
      d: "m12.049 3.5296c0.305 3.1263-2.019 5.6563-4.0772 7.7014-0.9349 0.897-0.155 0.148-0.6437 0.594-0.1022-0.479-0.2986-1.731-0.2802-2.11 0.1304-2.6939 2.3198-6.5875 4.2381-8.0236 0.309 0.5767 0.563 0.6231 0.763 1.8382zm0.651 16.142c-1.232-0.906-2.85-1.144-4.3336-0.885-0.1913-1.255-0.3827-2.51-0.574-3.764 2.3506-2.329 4.9066-5.0322 5.0406-8.5394 0.059-2.232-0.276-4.6714-1.678-6.4836-1.7004 0.12823-2.8995 2.156-3.8019 3.4165-1.4889 2.6705-1.1414 5.9169-0.57 8.7965-0.8094 0.952-1.9296 1.743-2.7274 2.734-2.3561 2.308-4.4085 5.43-4.0046 8.878 0.18332 3.334 2.5894 6.434 5.8702 7.227 1.2457 0.315 2.5639 0.346 3.8241 0.099 0.2199 2.25 1.0266 4.629 0.0925 6.813-0.7007 1.598-2.7875 3.004-4.3325 2.192-0.5994-0.316-0.1137-0.051-0.478-0.252 1.0698-0.257 1.9996-1.036 2.26-1.565 0.8378-1.464-0.3998-3.639-2.1554-3.358-2.262 0.046-3.1904 3.14-1.7356 4.685 1.3468 1.52 3.833 1.312 5.4301 0.318 1.8125-1.18 2.0395-3.544 1.8325-5.562-0.07-0.678-0.403-2.67-0.444-3.387 0.697-0.249 0.209-0.059 1.193-0.449 2.66-1.053 4.357-4.259 3.594-7.122-0.318-1.469-1.044-2.914-2.302-3.792zm0.561 5.757c0.214 1.991-1.053 4.321-3.079 4.96-0.136-0.795-0.172-1.011-0.2626-1.475-0.4822-2.46-0.744-4.987-1.116-7.481 1.6246-0.168 3.4576 0.543 4.0226 2.184 0.244 0.577 0.343 1.197 0.435 1.812zm-5.1486 5.196c-2.5441 0.141-4.9995-1.595-5.6343-4.081-0.749-2.153-0.5283-4.63 0.8207-6.504 1.1151-1.702 2.6065-3.105 4.0286-4.543 0.183 1.127 0.366 2.254 0.549 3.382-2.9906 0.782-5.0046 4.725-3.215 7.451 0.5324 0.764 1.9765 2.223 2.7655 1.634-1.102-0.683-2.0033-1.859-1.8095-3.227-0.0821-1.282 1.3699-2.911 2.6513-3.198 0.4384 2.869 0.9413 6.073 1.3797 8.943-0.5054 0.1-1.0211 0.143-1.536 0.143z",
      fill: "#f0d28a",
      stroke: "none"
    }, g);
  }

  function drawLedgerLines(parent, x, y) {
    [152, 166, 180, 194, 208, 75, 61].forEach(lineY => {
      if (Math.abs(y - lineY) < 0.1) {
        svgEl("line", { x1: String(x - 13), y1: String(lineY), x2: String(x + 13), y2: String(lineY), stroke: "#6a6048", "stroke-width": "1.4" }, parent);
      }
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
    const g = svgEl("g", { transform: `translate(${x},${y}) scale(0.62,0.62)` }, parent);
    svgEl("path", { d: "m 0.5,1037.831 0,14.0625", fill: "none", stroke: color, "stroke-width": "1.8", "stroke-linecap": "square", "stroke-linejoin": "miter" }, g);
    svgEl("path", { d: "m -2.1200719,1048.4823 5.2401438,-2.0686", fill: "none", stroke: color, "stroke-width": "2.6", "stroke-linecap": "square", "stroke-linejoin": "miter" }, g);
    svgEl("path", { d: "m 3.1200719,1041.2421 -5.2401438,2.0686", fill: "none", stroke: color, "stroke-width": "2.6", "stroke-linecap": "square", "stroke-linejoin": "miter" }, g);
  }

  bootstrap();
})();
