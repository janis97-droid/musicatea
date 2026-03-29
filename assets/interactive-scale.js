// assets/interactive-scale.js
// Repo-compatible interactive maqam page controller
// Depends on:
// - data/maqamat.js
// - data/interactive-maqamat.js
//
// This version adds:
// - canonical note token rendering
// - mp3 note playback layer
// - graceful fallback when note audio files are missing
//
// Expected note audio path pattern:
// assets/audio/notes/<TOKEN>.mp3
//
// Example filenames:
// Do.mp3
// Dob.mp3
// Do#.mp3
// Do-#.mp3 is NOT used
// Do-/#.mp3 is NOT used
// Use exact token names from NOTE_AUDIO_FILE_MAP below.

(function () {
  const root = document.getElementById("interactive-page-root");
  const sidebar = document.getElementById("sidebar");
  const breadcrumbLabel = document.getElementById("current-maqam-label");

  if (!root || !sidebar) return;

  const URL_PARAMS = new URLSearchParams(window.location.search);
  const SVG_NS = "http://www.w3.org/2000/svg";
  const ACCIDENTAL_COLOR_IDLE = "#f0d28a";
  const ACCIDENTAL_COLOR_ACTIVE = "#fff0bf";

  const NATURAL_BASE = {
    C: 0,
    D: 4,
    E: 8,
    F: 10,
    G: 14,
    A: 18,
    B: 22
  };

  const TONIC_TO_BASE_QT = {
    do: 0,
    re: 4,
    mi_flat: 6,
    fa: 10,
    sol: 14,
    la_flat: 16,
    la: 18,
    si_flat: 20,
    si: 22,
    mi_half_flat: 7,
    la_half_flat: 17,
    si_half_flat: 21
  };

  const LOWER_OCTAVE_TONICS = new Set([
    "sol", "la_flat", "la", "si_flat", "si", "la_half_flat", "si_half_flat"
  ]);

  const Y_MAP = {
    C3: 208, D3: 201, E3: 194, F3: 187, G3: 180, A3: 173, B3: 166,
    C4: 152, D4: 145, E4: 138, F4: 131, G4: 124, A4: 117, B4: 110,
    C5: 103, D5: 96, E5: 89, F5: 82, G5: 75, A5: 68, B5: 61
  };

  // ==========================================================
  // MP3 note playback layer
  // ==========================================================

  const NOTE_AUDIO_BASE_PATH = "assets/audio/notes/";

  const NOTE_AUDIO_FILE_MAP = {
    "Do": "Do.mp3",
    "Dob": "Dob.mp3",
    "Do#": "DoSharp.mp3",
    "Do/#": "DoHalfSharp.mp3",

    "Re": "Re.mp3",
    "Reb": "Reb.mp3",
    "Re/b": "ReHalfFlat.mp3",
    "Re#": "ReSharp.mp3",

    "Mi": "Mi.mp3",
    "Mib": "Mib.mp3",
    "Mi/b": "MiHalfFlat.mp3",

    "Fa": "Fa.mp3",
    "Fa#": "FaSharp.mp3",
    "Fa/#": "FaHalfSharp.mp3",

    "Sol": "Sol.mp3",
    "Solb": "Solb.mp3",
    "Sol#": "SolSharp.mp3",

    "La": "La.mp3",
    "Lab": "Lab.mp3",
    "La/b": "LaHalfFlat.mp3",

    "Si": "Si.mp3",
    "Sib": "Sib.mp3",
    "Si/b": "SiHalfFlat.mp3"
  };

  const audioCache = new Map();

  let state = {
    familyId: null,
    maqamId: null,
    tonic: null,
    activeNotes: new Set(),
    isPlaying: false,
    stopRequested: false,
    lastAudioErrorToken: null
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
    const formula = getInteractiveFormula(state.maqamId);

    if (!maqam || !formula) {
      root.innerHTML = `
        <section class="maqam-body">
          <div class="staff-scale-box">
            <div class="sec-title">غير متاح</div>
            <p class="maqam-desc">هذا المقام لا يملك بيانات تفاعلية جاهزة بعد.</p>
          </div>
        </section>
      `;
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
    style.textContent = `
      .family-switcher { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
      .family-switch-btn {
        border:1px solid rgba(255,255,255,0.08);
        background:rgba(255,255,255,0.03);
        color:var(--text-dim);
        border-radius:999px;
        padding:4px 10px;
        font-family:inherit;
        font-size:.72rem;
        font-weight:700;
        cursor:pointer;
        transition:all .2s ease;
      }
      .family-switch-btn:hover { color:var(--text-muted); border-color:rgba(200,164,90,.25); }
      .family-switch-btn.active {
        color:var(--gold-light);
        background:rgba(200,164,90,.10);
        border-color:rgba(200,164,90,.35);
      }
    `;
    document.head.appendChild(style);
  }

  function renderTonicSelector() {
    const container = document.getElementById("tonic-selector-current");
    if (!container) return;

    const tonics = getInteractiveTonicsForMaqam(state.maqamId);
    container.innerHTML = tonics.map(tonic => `
      <button class="tonic-btn ${tonic === state.tonic ? "active" : ""}" data-tonic="${tonic}">
        ${getTonicLabelAr(tonic)}
      </button>
    `).join("");

    container.querySelectorAll(".tonic-btn").forEach(btn => {
      btn.addEventListener("click", () => setActiveTonic(btn.dataset.tonic));
    });
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
      <div class="info-card">
        <div class="info-label">الاسم الظاهر</div>
        <div class="info-value gold">${displayName}</div>
      </div>
      <div class="info-card">
        <div class="info-label">الطبقة الحالية</div>
        <div class="info-value">${currentTonic}</div>
      </div>
      <div class="info-card">
        <div class="info-label">الطبقة الأساسية</div>
        <div class="info-value">${baseTonic}</div>
      </div>
      <div class="info-card">
        <div class="info-label">النوتة المرجعية</div>
        <div class="info-value" dir="ltr">${baseNote}</div>
      </div>
      <div class="info-card">
        <div class="info-label">النوتة الحالية</div>
        <div class="info-value" dir="ltr">${currentCanonical}</div>
      </div>
      <div class="info-card">
        <div class="info-label">العائلة</div>
        <div class="info-value">${familyMain ? familyMain.name : maqam.family}</div>
      </div>
      ${otherNames ? `
      <div class="info-card" style="grid-column:1 / -1;">
        <div class="info-label">أسماء أخرى بحسب الطبقة</div>
        <div class="info-value">${otherNames}</div>
      </div>` : ""}
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
    state.activeNotes.clear();
    state.isPlaying = false;
    state.stopRequested = false;
    state.lastAudioErrorToken = null;

    renderAll();
    scrollMainToTop();
  }

  function setActiveTonic(tonic) {
    stopAllAudio();

    state.tonic = tonic;
    state.activeNotes.clear();
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
      svg.appendChild(svgEl("line", {
        x1: "0", y1: String(y), x2: "820", y2: String(y),
        stroke: "#5a5038", "stroke-width": "1.4"
      }));
    });

    drawClef(svg);

    const xStart = 82;
    const xGap = (820 - xStart - 16) / 8;

    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const y = note.staff_y;
      const active = state.activeNotes.has(i);
      const color = active ? "#e2c47e" : (i < 4 ? "#c8a45a" : "#7ba8d4");
      const stemColor = active ? color : (i < 4 ? "#8a6020" : "#3a6090");
      const accidentalColor = active ? ACCIDENTAL_COLOR_ACTIVE : ACCIDENTAL_COLOR_IDLE;

      const g = svgEl("g", {
        class: `note-btn ${active ? "active" : ""}`,
        "data-note-idx": String(i),
        role: "button",
        tabindex: "0",
        style: "cursor:pointer"
      }, svg);

      drawLedgerLines(g, x, y);

      const up = y >= 110;
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
        fill: color,
        transform: `rotate(-18,${x},${y})`
      }, g);
    });

    svg.querySelectorAll(".note-btn").forEach(node => {
      node.addEventListener("click", async () => {
        const idx = Number(node.dataset.noteIdx);
        toggleNote(idx);
        const notes = buildScaleNotes(state.maqamId, state.tonic);
        if (notes[idx]) await playSingleNote(notes[idx].token);
      });
      node.addEventListener("keydown", async e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const idx = Number(node.dataset.noteIdx);
          toggleNote(idx);
          const notes = buildScaleNotes(state.maqamId, state.tonic);
          if (notes[idx]) await playSingleNote(notes[idx].token);
        }
      });
    });
  }

  function renderKeys() {
    const row = document.getElementById("keys-current");
    if (!row) return;

    const notes = buildScaleNotes(state.maqamId, state.tonic);
    row.innerHTML = notes.map((note, i) => {
      const isTonic = i === 0 || i === 7;
      const active = state.activeNotes.has(i);
      return `
        <div class="note-key ${active ? "active" : ""} ${isTonic ? "is-tonic" : ""}" data-note-idx="${i}">
          <div class="note-key-face">
            <span dir="ltr">${note.token}</span>
            ${note.acc_label ? `<span class="acc">${note.acc_label}</span>` : ""}
          </div>
        </div>
      `;
    }).join("");

    row.querySelectorAll(".note-key").forEach(node => {
      node.addEventListener("click", async () => {
        const idx = Number(node.dataset.noteIdx);
        toggleNote(idx);
        const notes = buildScaleNotes(state.maqamId, state.tonic);
        if (notes[idx]) await playSingleNote(notes[idx].token);
      });
    });
  }

  function toggleNote(idx) {
    if (state.activeNotes.has(idx)) state.activeNotes.delete(idx);
    else state.activeNotes.add(idx);
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

      state.activeNotes.clear();
      state.activeNotes.add(i);
      renderStaff();
      renderKeys();

      if (status) status.textContent = `▶ ${notes[i].token}`;
      await playSingleNote(notes[i].token);
      await wait(120);
    }

    state.activeNotes.clear();
    renderStaff();
    renderKeys();

    if (status) {
      status.textContent = state.lastAudioErrorToken
        ? `ملف الصوت غير موجود: ${state.lastAudioErrorToken}`
        : "";
      status.className = state.lastAudioErrorToken ? "status-bar on" : "status-bar";
    }
    if (playIcon) playIcon.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
    if (playLabel) playLabel.textContent = "تشغيل السلّم";
    if (playBtn) playBtn.classList.remove("is-playing");

    state.isPlaying = false;
    state.stopRequested = false;
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function buildScaleNotes(maqamId, tonic) {
    const formula = getInteractiveFormula(maqamId);
    const tonicMeta = INTERACTIVE_TONIC_META[tonic];
    if (!formula || !tonicMeta) return [];

    const tonicQt = TONIC_TO_BASE_QT[tonic];
    const tonicOctave = LOWER_OCTAVE_TONICS.has(tonic) ? 3 : 4;

    return formula.map((offsetQt, idx) => {
      const absoluteQt = tonicQt + offsetQt;
      return quarterToneToScaleNote(absoluteQt, idx, tonicOctave);
    });
  }

  function quarterToneToScaleNote(quarterToneValue, degreeIdx, tonicOctave) {
    const absQt = quarterToneValue;
    const mod24 = ((absQt % 24) + 24) % 24;
    const octaveOffset = Math.floor(absQt / 24);

    const candidates = [
      { ar: "دو", en: "C", base: NATURAL_BASE.C },
      { ar: "ري", en: "D", base: NATURAL_BASE.D },
      { ar: "مي", en: "E", base: NATURAL_BASE.E },
      { ar: "فا", en: "F", base: NATURAL_BASE.F },
      { ar: "صول", en: "G", base: NATURAL_BASE.G },
      { ar: "لا", en: "A", base: NATURAL_BASE.A },
      { ar: "سي", en: "B", base: NATURAL_BASE.B }
    ];

    let best = candidates[0];
    let bestDiff = 999;

    candidates.forEach(c => {
      let diff = mod24 - c.base;
      while (diff > 12) diff -= 24;
      while (diff < -12) diff += 24;
      const abs = Math.abs(diff);
      if (abs < bestDiff) {
        bestDiff = abs;
        best = { ...c, diff };
      }
    });

    let accLabel = "";
    if (best.diff === -2) accLabel = "♭";
    if (best.diff === -1) accLabel = "½♭";
    if (best.diff === 1) accLabel = "½#";
    if (best.diff === 2) accLabel = "#";

    const token = chooseCanonicalToken(mod24, best.en);
    const octave = tonicOctave + octaveOffset;
    const staffY = Y_MAP[`${best.en}${octave}`] || 110;

    return {
      degree_index: degreeIdx,
      quarter_tone_value: mod24,
      token,
      label_ar: best.ar,
      acc_label: accLabel,
      staff_y: staffY
    };
  }

  function chooseCanonicalToken(mod24, naturalEn) {
    const allowed = getAllowedCanonicalSpellingsForQuarter(mod24);
    if (allowed && allowed.length) return allowed[0];

    const fallbackMap = {
      C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si"
    };
    return fallbackMap[naturalEn] || "Do";
  }

  function getAudioUrlForToken(token) {
    const filename = NOTE_AUDIO_FILE_MAP[token];
    return filename ? `${NOTE_AUDIO_BASE_PATH}${filename}` : null;
  }

  async function playSingleNote(token) {
    const url = getAudioUrlForToken(token);
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
      fill: ACCIDENTAL_COLOR_IDLE,
      stroke: "none"
    }, g);
  }

  function drawLedgerLines(parent, x, y) {
    [152, 166, 180, 194, 208, 75, 61].forEach(lineY => {
      if (Math.abs(y - lineY) < 0.1) {
        svgEl("line", {
          x1: String(x - 13), y1: String(lineY),
          x2: String(x + 13), y2: String(lineY),
          stroke: "#6a6048", "stroke-width": "1.4"
        }, parent);
      }
    });
  }

  function drawAccidental(parent, x, y, accLabel, color) {
    if (!accLabel) return;
    if (accLabel === "♭") return drawFlat(parent, x, y, color);
    if (accLabel === "½♭") return drawHalfFlat(parent, x, y, color);
    if (accLabel === "#") return drawSharp(parent, x, y, color);
    if (accLabel === "½#") return drawHalfSharp(parent, x, y, color);
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
    svgEl("path", {
      d: "m 0.5,1037.831 0,14.0625",
      fill: "none",
      stroke: color,
      "stroke-width": "1.8",
      "stroke-linecap": "square",
      "stroke-linejoin": "miter"
    }, g);
    svgEl("path", {
      d: "m -2.1200719,1048.4823 5.2401438,-2.0686",
      fill: "none",
      stroke: color,
      "stroke-width": "2.6",
      "stroke-linecap": "square",
      "stroke-linejoin": "miter"
    }, g);
    svgEl("path", {
      d: "m 3.1200719,1041.2421 -5.2401438,2.0686",
      fill: "none",
      stroke: color,
      "stroke-width": "2.6",
      "stroke-linecap": "square",
      "stroke-linejoin": "miter"
    }, g);
  }

  bootstrap();
})();
