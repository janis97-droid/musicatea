// assets/interactive-scale.js
// Generic interactive maqam page controller
// Depends on:
// - data/maqamat.js
// - data/interactive-maqamat.js
//
// This file:
// - reads family + maqam from URL
// - builds sidebar dynamically
// - builds hero/info dynamically
// - renders tonic buttons dynamically
// - computes scale notes from formula data
// - updates displayed maqam name when tonic changes
// - updates URL without page reload
//
// Notes:
// - Audio playback is left as a placeholder for now.
// - Arabic note spelling here is a practical UI layer, not a full notation engine.
// - You can refine note naming later without changing the generic structure.

(function () {
  const root = document.getElementById("interactive-page-root");
  const sidebar = document.getElementById("sidebar");
  const breadcrumbLabel = document.getElementById("current-maqam-label");

  if (!root || !sidebar) return;

  const URL_PARAMS = new URLSearchParams(window.location.search);

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

  const DEGREE_LABELS_AR = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨"];

  let state = {
    familyId: null,
    maqamId: null,
    tonic: null,
    activeNotes: new Set(),
    isPlaying: false,
    stopRequested: false
  };

  function bootstrap() {
    const requestedFamily = URL_PARAMS.get("family");
    const requestedMaqam = URL_PARAMS.get("maqam");

    const resolved = resolveInitialSelection(requestedFamily, requestedMaqam);
    state.familyId = resolved.familyId;
    state.maqamId = resolved.maqamId;
    state.tonic = resolved.tonic;

    renderAll();
    bindGlobalEvents();
  }

  function resolveInitialSelection(familyId, maqamId) {
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

    if (!resolvedMaqam || !getInteractiveMaqamById(resolvedMaqam)) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const maqamObj = getMaqamById(resolvedMaqam);
    if (!maqamObj || maqamObj.family !== resolvedFamily) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const defaultTonic = getInteractiveDefaultTonic(resolvedMaqam);
    return {
      familyId: resolvedFamily,
      maqamId: resolvedMaqam,
      tonic: defaultTonic
    };
  }

  function renderAll() {
    renderSidebar();
    renderPageShell();
    syncUrl();
  }

  function renderSidebar() {
    const items = getInteractiveFamily(state.familyId);
    const familyMain = getFamilyMainMaqam(state.familyId);
    const familyName = familyMain ? familyMain.name : "";

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-family-label">العائلة الموسيقية</div>
        <div class="sidebar-family-name">${familyName}</div>
        <div class="sidebar-family-sub">${items.length} مقامات</div>
      </div>
      <ul class="sidebar-list">
        ${items.map(item => `
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
      btn.addEventListener("click", () => {
        const maqamId = btn.dataset.maqamId;
        setActiveMaqam(maqamId);
      });
    });
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
            <svg class="staff-svg" id="staff-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 170"></svg>
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
      btn.addEventListener("click", () => {
        setActiveTonic(btn.dataset.tonic);
      });
    });
  }

  function renderInfoGrid() {
    const maqam = getMaqamById(state.maqamId);
    const grid = document.getElementById("maqam-info-grid");
    if (!maqam || !grid) return;

    const displayName = getDisplayNameForTonic(state.maqamId, state.tonic);
    const baseTonic = getTonicLabelAr(maqam.base_tonic);
    const currentTonic = getTonicLabelAr(state.tonic);
    const tonicMode = maqam.tonic_mode === "half_flat_only" ? "أنصاف بيمول فقط" : "طبقات قياسية";
    const familyMain = getFamilyMainMaqam(maqam.family);

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
        <div class="info-label">العائلة</div>
        <div class="info-value">${familyMain ? familyMain.name : maqam.family}</div>
      </div>
      <div class="info-card">
        <div class="info-label">نمط الطبقات</div>
        <div class="info-value">${tonicMode}</div>
      </div>
      <div class="info-card">
        <div class="info-label">عدد الطبقات المتاحة</div>
        <div class="info-value">${(maqam.available_tonics || []).length}</div>
      </div>
    `;
  }

  function bindPageEvents() {
    const playBtn = document.getElementById("playbtn-current");
    if (playBtn) {
      playBtn.addEventListener("click", playScale);
    }
  }

  function bindGlobalEvents() {
    // reserved for later if needed
  }

  function setActiveMaqam(maqamId) {
    const maqam = getMaqamById(maqamId);
    if (!maqam) return;

    state.maqamId = maqamId;
    state.familyId = maqam.family;
    state.tonic = getInteractiveDefaultTonic(maqamId);
    state.activeNotes.clear();
    state.isPlaying = false;
    state.stopRequested = false;

    renderAll();
    scrollMainToTop();
  }

  function setActiveTonic(tonic) {
    state.tonic = tonic;
    state.activeNotes.clear();
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

    const staffLines = [138, 124, 110, 96, 82];
    staffLines.forEach(y => {
      svg.insertAdjacentHTML("beforeend", `<line x1="0" y1="${y}" x2="820" y2="${y}" stroke="#5a5038" stroke-width="1.4"></line>`);
    });

    const xStart = 82;
    const xGap = (820 - xStart - 16) / 8;
    const yPositions = [152, 145, 138, 131, 124, 117, 110, 103];

    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const y = yPositions[i] || 110;
      const active = state.activeNotes.has(i);
      const color = active ? "#e2c47e" : (i < 4 ? "#c8a45a" : "#7ba8d4");

      svg.insertAdjacentHTML("beforeend", `
        <g class="note-btn ${active ? "active" : ""}" data-note-idx="${i}" role="button" tabindex="0" style="cursor:pointer">
          <line x1="${x + 7}" y1="${y}" x2="${x + 7}" y2="${y - 38}" stroke="${color}" stroke-width="1.8"></line>
          <ellipse cx="${x}" cy="${y}" rx="8" ry="5.5" fill="${color}" transform="rotate(-18,${x},${y})"></ellipse>
          <text x="${x}" y="${y + 48}" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="700" fill="${color}">
            ${DEGREE_LABELS_AR[i] || ""}
          </text>
        </g>
      `);
    });

    svg.querySelectorAll(".note-btn").forEach(node => {
      node.addEventListener("click", () => toggleNote(Number(node.dataset.noteIdx)));
      node.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleNote(Number(node.dataset.noteIdx));
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
            <span>${note.label_ar}</span>
            ${note.acc_label ? `<span class="acc">${note.acc_label}</span>` : ""}
          </div>
          <div class="note-key-deg">${DEGREE_LABELS_AR[i] || ""}</div>
        </div>
      `;
    }).join("");

    row.querySelectorAll(".note-key").forEach(node => {
      node.addEventListener("click", () => toggleNote(Number(node.dataset.noteIdx)));
    });
  }

  function toggleNote(idx) {
    if (state.activeNotes.has(idx)) {
      state.activeNotes.delete(idx);
    } else {
      state.activeNotes.add(idx);
    }
    renderStaff();
    renderKeys();
  }

  async function playScale() {
    if (state.isPlaying) {
      state.stopRequested = true;
      return;
    }

    const notes = buildScaleNotes(state.maqamId, state.tonic);
    const status = document.getElementById("status-current");
    const playIcon = document.getElementById("playicon-current");
    const playLabel = document.getElementById("playlabel-current");
    const playBtn = document.getElementById("playbtn-current");

    state.isPlaying = true;
    state.stopRequested = false;

    if (playIcon) {
      playIcon.innerHTML = '<rect x="5" y="3" width="4" height="18"></rect><rect x="15" y="3" width="4" height="18"></rect>';
    }
    if (playLabel) playLabel.textContent = "إيقاف التشغيل";
    if (playBtn) playBtn.classList.add("is-playing");
    if (status) status.className = "status-bar on";

    for (let i = 0; i < notes.length; i++) {
      if (state.stopRequested) break;

      state.activeNotes.clear();
      state.activeNotes.add(i);
      renderStaff();
      renderKeys();

      if (status) {
        status.textContent = `▶ ${notes[i].label_ar} — درجة ${DEGREE_LABELS_AR[i] || ""}`;
      }

      await wait(560);
    }

    state.activeNotes.clear();
    renderStaff();
    renderKeys();

    if (status) {
      status.textContent = "";
      status.className = "status-bar";
    }
    if (playIcon) {
      playIcon.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
    }
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
    return formula.map((offsetQt, idx) => {
      const absoluteQt = tonicQt + offsetQt;
      return quarterToneToArabicNote(absoluteQt, idx);
    });
  }

  function quarterToneToArabicNote(quarterToneValue, degreeIdx) {
    const mod24 = ((quarterToneValue % 24) + 24) % 24;

    const candidates = [
      { ar: "دو", base: NATURAL_BASE.C },
      { ar: "ري", base: NATURAL_BASE.D },
      { ar: "مي", base: NATURAL_BASE.E },
      { ar: "فا", base: NATURAL_BASE.F },
      { ar: "صول", base: NATURAL_BASE.G },
      { ar: "لا", base: NATURAL_BASE.A },
      { ar: "سي", base: NATURAL_BASE.B }
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

    const labelAr = accLabel ? `${best.ar}` : best.ar;

    return {
      degree_index: degreeIdx,
      quarter_tone_value: mod24,
      base_name_ar: best.ar,
      label_ar: labelAr,
      acc_label: accLabel
    };
  }

  bootstrap();
})();
