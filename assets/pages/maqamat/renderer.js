// assets/pages/maqamat/renderer.js
// Interactive maqam rendering: sidebar, page shell, SVG staff, note keys, and page UI updates.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const { SVG_NS, SLOT_MAP, STAFF_LINES_Y } = ns.constants;
  const maqamContentLoader = window.MaqamContentLoader || null;

  function renderAll() {
    renderSidebar();
    renderPageShell();
    ns.actions.syncUrl();
  }

  function renderSidebar() {
    const { sidebar } = ns.refs;
    const state = ns.state;
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
              ${ns.engine.getMaqamDisplayTitle(item)}
            </button>
          `).join("")}
        </div>
        <div class="sidebar-family-label sidebar-family-label-spaced">العائلة الموسيقية</div>
        <div class="sidebar-family-name">${familyName}</div>
        <div class="sidebar-family-sub">${familyItems.length} مقامات</div>
      </div>

      <ul class="sidebar-list">
        ${familyItems.map(item => `
          <li class="sidebar-item">
            <button class="sidebar-btn ${item.id === state.maqamId ? "active" : ""} ${item.is_main ? "main-maqam" : ""}" data-maqam-id="${item.id}">
              <span class="sidebar-dot"></span>
              ${ns.engine.getMaqamDisplayTitle(item)}
              ${item.is_main ? '<span class="sidebar-main-tag">أساسي</span>' : ""}
            </button>
          </li>
        `).join("")}
      </ul>
    `;

    sidebar.querySelectorAll(".sidebar-btn").forEach(btn => btn.addEventListener("click", () => ns.actions.setActiveMaqam(btn.dataset.maqamId)));
    sidebar.querySelectorAll(".family-switch-btn").forEach(btn => btn.addEventListener("click", () => ns.actions.setActiveMaqam(btn.dataset.maqamId)));
  }

  function renderPageShell() {
    const { root, breadcrumbLabel } = ns.refs;
    const state = ns.state;
    const maqam = getMaqamById(state.maqamId);
    const displayName = ns.engine.getDisplayNameForTonicSafe(state.maqamId, state.tonic);
    const latinDisplayName = typeof getLatinDisplayNameForTonic === 'function'
      ? getLatinDisplayNameForTonic(state.maqamId, state.tonic)
      : (maqam ? maqam.latin || '' : '');
    const tonicLabel = getTonicLabelAr(state.tonic);
    const notes = ns.engine.buildScaleNotes(state.maqamId, state.tonic);

    if (!maqam || !notes.length) {
      root.innerHTML = `<section class="maqam-body"><div class="staff-scale-box"><div class="sec-title">غير متاح</div><p class="maqam-desc">هذا المقام لا يملك بيانات تفاعلية جاهزة بعد.</p></div></section>`;
      if (breadcrumbLabel) breadcrumbLabel.textContent = maqam ? ns.engine.getMaqamDisplayTitle(maqam) : "";
      return;
    }

    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    root.innerHTML = `
      <section class="maqam-hero" data-name="${displayName}">
        <div class="maqam-hero-inner">
          <div class="maqam-name-wrap">
            <h1 class="maqam-name" id="maqam-title">${displayName}</h1>
            <span class="maqam-latin">${latinDisplayName}</span>
          </div>
          <p class="maqam-desc" id="maqam-subtitle">الطبقة الحالية: ${tonicLabel}</p>
        </div>
      </section>

      <section class="maqam-body">
        <div class="sec-title">السلّم التفاعلي</div>
        <div class="staff-scale-box">
          <div class="staff-scale-header">
            <div class="staff-scale-title">${ns.engine.getScaleSectionLabel(state.maqamId)}</div>
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
              <span id="playlabel-current">${ns.engine.getPlayButtonLabel(state.maqamId)}</span>
            </button>
            <div class="status-bar" id="status-current"></div>
          </div>
        </div>

        <div class="sec-title">معلومات المقام</div>
        <div class="info-grid" id="maqam-info-grid"></div>

        <div class="sec-title">البنية والسير والأمثلة</div>
        <div class="maqam-content-sections" id="maqam-content-sections">
          <div class="maqam-content-card maqam-content-card-placeholder">
            <h3>يتم تحميل مادة المقام…</h3>
            <p>سيظهر هنا السير، وأمثلة الفيديو، والتسجيلات المرجعية، والأغاني أو القطع عندما تكون متاحة في ملف المقام.</p>
          </div>
        </div>
      </section>
    `;

    renderTonicSelector();
    renderInfoGrid();
    renderStaff();
    renderKeys();
    ns.actions.bindPageEvents();
    void renderMaqamContentSections();
  }

  async function renderMaqamContentSections() {
    const container = document.getElementById("maqam-content-sections");
    if (!container || !maqamContentLoader || typeof maqamContentLoader.buildMaqamContentModel !== "function") return;

    try {
      const model = await maqamContentLoader.buildMaqamContentModel(ns.state.maqamId);
      const cards = [
        createSayrCard(model),
        createVideoExamplesCard(model),
        createReferencesCard(model),
        createExamplesCard(model)
      ].filter(Boolean);

      if (!cards.length) {
        container.innerHTML = `
          <div class="maqam-content-card maqam-content-card-placeholder">
            <h3>القسم جاهز للتوسعة</h3>
            <p>هذه الصفحة أصبحت مهيأة لإضافة السير، وأمثلة الفيديو، والتسجيلات المرجعية، والأغاني أو القطع من المصادر الأكاديمية لكل مقام.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = cards.join("");
    } catch (error) {
      container.innerHTML = `
        <div class="maqam-content-card maqam-content-card-placeholder">
          <h3>القسم جاهز للتوسعة</h3>
          <p>البنية الجديدة جاهزة، لكن ملف هذا المقام لا يحتوي بعد على جميع الحقول الإضافية المطلوبة.</p>
        </div>
      `;
    }
  }

  function createContentCard(title, bodyHtml) {
    if (!bodyHtml) return "";
    return `
      <section class="maqam-content-card">
        <h3>${title}</h3>
        ${bodyHtml}
      </section>
    `;
  }

  function createBulletList(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return "";
    return `<ul class="maqam-content-list">${values.map(item => `<li>${escapeHtml(String(item))}</li>`).join("")}</ul>`;
  }

  function createLinkedReferenceList(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return "";
    return `<ul class="maqam-content-list">${values.map(item => {
      const title = item.title || item.name || item.id || "مرجع";
      const author = item.author ? ` — ${item.author}` : "";
      return `<li>${escapeHtml(title + author)}</li>`;
    }).join("")}</ul>`;
  }

  function createSayrCard(model) {
    const sayr = model && model.sayr ? model.sayr : null;
    if (!sayr) return "";

    const summary = sayr.summary ? `<p class="maqam-content-copy">${escapeHtml(sayr.summary)}</p>` : "";
    const path = createBulletList(sayr.common_path);
    const resting = createBulletList(sayr.resting_tones);
    const motion = createBulletList(sayr.motion_notes);
    const modulations = createBulletList(model && (model.common_modulations || model.modulations || model.modulation_paths));

    const body = [
      summary,
      path ? `<div class="maqam-content-subsection"><h4>المسار الغالب</h4>${path}</div>` : "",
      resting ? `<div class="maqam-content-subsection"><h4>درجات الارتكاز</h4>${resting}</div>` : "",
      motion ? `<div class="maqam-content-subsection"><h4>درجات الحركة</h4>${motion}</div>` : "",
      modulations ? `<div class="maqam-content-subsection"><h4>التحويلات الشائعة</h4>${modulations}</div>` : ""
    ].filter(Boolean).join("");

    return createContentCard("السير", body);
  }

  function normalizeExampleEntries(items) {
    return (Array.isArray(items) ? items : []).filter(Boolean).map(item => {
      if (typeof item === "string") return { title: item };
      return item;
    });
  }

  function pickFirstUrl(item, keys) {
    for (const key of keys) {
      const value = item && item[key];
      if (value && String(value).trim()) return String(value).trim();
    }
    return "";
  }

  function buildExampleActions(item) {
    const videoUrl = pickFirstUrl(item, ["video_url", "video", "youtube", "youtube_url"]);
    const audioUrl = pickFirstUrl(item, ["audio_url", "audio", "recording_url"]);
    const linkUrl = pickFirstUrl(item, ["url", "link", "href"]);

    const actions = [];
    if (videoUrl) {
      actions.push(`<a class="maqam-example-action" href="${escapeHtml(videoUrl)}" target="_blank" rel="noopener noreferrer">فيديو</a>`);
    }
    if (audioUrl) {
      actions.push(`<a class="maqam-example-action" href="${escapeHtml(audioUrl)}" target="_blank" rel="noopener noreferrer">صوت</a>`);
    }
    if (linkUrl) {
      actions.push(`<a class="maqam-example-action" href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener noreferrer">رابط</a>`);
    }
    return actions.join("");
  }

  function createExamplesMarkup(items) {
    const values = normalizeExampleEntries(items);
    if (!values.length) return "";
    return `
      <ul class="maqam-example-list">
        ${values.map(item => {
          const title = item.title || item.name || "";
          const performer = item.artist || item.performer || item.singer || "";
          const note = item.note || item.notes || item.description || "";
          const actions = buildExampleActions(item);
          return `
            <li class="maqam-example-item">
              ${title ? `<span class="maqam-example-title">${escapeHtml(title)}</span>` : ""}
              ${performer ? `<span class="maqam-example-meta">${escapeHtml(performer)}</span>` : ""}
              ${note ? `<span class="maqam-example-note">${escapeHtml(note)}</span>` : ""}
              ${actions ? `<div class="maqam-example-actions">${actions}</div>` : ""}
            </li>
          `;
        }).join("")}
      </ul>
    `;
  }

  function createExamplesCard(model) {
    const items = (model && (model.examples || model.listening_examples || model.repertoire_examples)) || [];
    const body = createExamplesMarkup(items);
    return createContentCard("أغاني وقطع", body);
  }

  function createVideoExamplesCard(model) {
    const items = (model && (model.video_examples || model.video_listening_examples)) || [];
    const body = createExamplesMarkup(items);
    return createContentCard("أمثلة مرئية / فيديو", body);
  }

  function createReferencesCard(model) {
    const values = (model && (model.reference_recordings || model.canonical_pieces || model.references)) || [];
    const body = Array.isArray(values) && values.length && typeof values[0] === "object"
      ? createExamplesMarkup(values)
      : createBulletList(values);
    return createContentCard("تسجيلات / مراجع أساسية", body);
  }

  function renderTonicSelector() {
    const container = document.getElementById("tonic-selector-current");
    if (!container) return;
    const tonics = getInteractiveTonicsForMaqam(ns.state.maqamId);
    container.innerHTML = tonics.map(tonic => `<button class="tonic-btn ${tonic === ns.state.tonic ? "active" : ""}" data-tonic="${tonic}">${getTonicLabelAr(tonic)}</button>`).join("");
    container.querySelectorAll(".tonic-btn").forEach(btn => btn.addEventListener("click", () => ns.actions.setActiveTonic(btn.dataset.tonic)));
  }

  function renderInfoGrid() {
    const maqam = getMaqamById(ns.state.maqamId);
    const grid = document.getElementById("maqam-info-grid");
    if (!maqam || !grid) return;

    const model = ns.engine.MAQAM_MODELS[ns.state.maqamId];
    const displayName = ns.engine.getDisplayNameForTonicSafe(ns.state.maqamId, ns.state.tonic);
    const direction = ns.engine.getMaqamDirection(ns.state.maqamId);

    grid.innerHTML = `
      <div class="info-card"><div class="info-label">الاسم الظاهر</div><div class="info-value gold">${displayName}</div></div>
      <div class="info-card"><div class="info-label">الطبقة الحالية</div><div class="info-value">${getTonicLabelAr(ns.state.tonic)}</div></div>
      <div class="info-card"><div class="info-label">النموذج الأساسي</div><div class="info-value" dir="ltr">${model ? model.base_spelling.join(" - ") : ""}</div></div>
      <div class="info-card"><div class="info-label">الفواصل</div><div class="info-value" dir="ltr">${model ? model.intervals.join(" / ") : ""}</div></div>
      <div class="info-card"><div class="info-label">اتجاه العرض</div><div class="info-value">${direction === "descending" ? "هابط" : "صاعد"}</div></div>
    `;
  }

  function renderStaff() {
    const svg = document.getElementById("staff-current");
    if (!svg) return;

    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    svg.innerHTML = "";

    STAFF_LINES_Y.forEach(y => {
      svgEl("line", {
        x1: "0", y1: String(y), x2: "820", y2: String(y),
        stroke: "#8a7440", "stroke-width": "1.6"
      }, svg);
    });

    drawClef(svg);

    const xStart = 82;
    const count = Math.max(notes.length, 1);
    const xGap = (820 - xStart - 16) / count;

    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const palette = ns.engine.getPaletteForNote(note);
      const active = ns.state.activeNoteIndex === i;
      const slot = SLOT_MAP[note.slot_key] || SLOT_MAP["E4"];
      const y = slot.y;

      const g = svgEl("g", {
        class: `note-btn ${active ? "active" : ""}`,
        "data-note-idx": String(i),
        role: "button",
        tabindex: "0",
        title: note.role_description,
        "aria-label": note.role_description
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
        ns.actions.setActiveNote(idx);
        const notesNow = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
        if (notesNow[idx]) await ns.audio.playSingleNote(notesNow[idx]);
      });
    });
  }

  function renderKeys() {
    const row = document.getElementById("keys-current");
    if (!row) return;

    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    row.innerHTML = notes.map((note, i) => {
      const palette = ns.engine.getPaletteForNote(note);
      const active = ns.state.activeNoteIndex === i;
      const bg = active ? palette.box_bg_active : palette.box_bg;
      const border = active ? palette.box_border_active : palette.box_border;
      const text = active ? palette.box_text_active : palette.box_text;

      return `
        <div class="note-key ${active ? "active" : ""}" data-note-idx="${i}" title="${escapeHtml(note.role_description)}" aria-label="${escapeHtml(note.role_description)}">
          <div class="note-key-face note-key-face-colored" style="background:${bg};border-color:${border};color:${text};box-shadow:${active ? `0 10px 24px ${shadowColorForBorder(border)}` : "none"};">
            <span>${note.display_label}</span>
          </div>
        </div>
      `;
    }).join("");

    row.querySelectorAll(".note-key").forEach(node => {
      node.addEventListener("click", async () => {
        const idx = Number(node.dataset.noteIdx);
        ns.actions.setActiveNote(idx);
        const notesNow = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
        if (notesNow[idx]) await ns.audio.playSingleNote(notesNow[idx]);
      });
    });
  }

  function updateDisplayedName() {
    const { root, breadcrumbLabel } = ns.refs;
    const maqam = getMaqamById(ns.state.maqamId);
    const title = document.getElementById("maqam-title");
    const subtitle = document.getElementById("maqam-subtitle");
    const displayName = ns.engine.getDisplayNameForTonicSafe(ns.state.maqamId, ns.state.tonic);
    const latinDisplayName = typeof getLatinDisplayNameForTonic === 'function'
      ? getLatinDisplayNameForTonic(ns.state.maqamId, ns.state.tonic)
      : (maqam ? maqam.latin || '' : '');
    const tonicLabel = getTonicLabelAr(ns.state.tonic);

    if (title) title.textContent = displayName;
    if (subtitle) subtitle.textContent = `الطبقة الحالية: ${tonicLabel}`;
    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    const hero = root.querySelector(".maqam-hero");
    if (hero) hero.setAttribute("data-name", displayName);

    const latin = root.querySelector(".maqam-latin");
    if (latin) latin.textContent = latinDisplayName;

    const playLabel = document.getElementById("playlabel-current");
    if (playLabel && !ns.state.isPlaying) {
      playLabel.textContent = ns.engine.getPlayButtonLabel(ns.state.maqamId);
    }

    const headerLabel = root.querySelector(".staff-scale-title");
    if (headerLabel) {
      headerLabel.textContent = ns.engine.getScaleSectionLabel(ns.state.maqamId);
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
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
    if (accLabel === "♭")  return drawFlat(parent, x + 8, y, color);
    if (accLabel === "𝄳") return drawHalfFlat(parent, x + 8, y, color);
    if (accLabel === "♯")  return drawSharp(parent, x + 1, y, color);
    if (accLabel === "𝄲") return drawHalfSharp(parent, x + 2, y, color);
  }

  function drawFlat(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x - 19.5},${y - 21}) scale(0.060,0.060)` }, parent);
    svgEl("path", { d: "M200.438,214.712V0h-71.18v512c0,0,170.389-50.606,236.182-162.99C424.052,248.893,324.927,139.024,200.438,214.712z M300.508,302.609c-6.37,82.823-100.117,126.984-100.117,126.984v-156.27C239.449,239.14,305.394,239.14,300.508,302.609z", fill: color }, g);
  }

  function drawHalfFlat(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x - 19.5},${y - 21}) scale(0.060,0.060)` }, parent);
    svgEl("path", { d: "M200.438,214.712V0h-71.18v512c0,0,170.389-50.606,236.182-162.99C424.052,248.893,324.927,139.024,200.438,214.712z M300.508,302.609c-6.37,82.823-100.117,126.984-100.117,126.984v-156.27C239.449,239.14,305.394,239.14,300.508,302.609z", fill: color }, g);
    svgEl("rect", { x: "40", y: "90", width: "300", height: "26", rx: "20", fill: color }, g);
  }

  function drawSharp(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x - 7.5},${y - 12.5}) scale(0.046,0.046)` }, parent);
    svgEl("path", { d: "M418.562,173.34c5.999-1.291,10.281-6.582,10.281-12.724V103.86c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.425-10.912-2.6l-51.621,11.093V30.884c0-3.856-1.713-7.515-4.672-9.99c-2.964-2.475-6.869-3.507-10.662-2.816l-38.686,7.013c-6.192,1.121-10.694,6.51-10.694,12.805v78.242l-80.658,17.333V64.117c0-3.856-1.713-7.514-4.672-9.99c-2.958-2.475-6.864-3.506-10.662-2.816l-38.69,7.004c-6.192,1.12-10.693,6.511-10.693,12.806v76.25l-57.948,12.456c-5.999,1.282-10.281,6.59-10.281,12.724v56.756c0,3.927,1.776,7.649,4.834,10.124c3.062,2.466,7.07,3.426,10.917,2.601l52.478-11.281v108.39l-57.948,12.456c-5.999,1.282-10.281,6.582-10.281,12.715v56.737c0,3.928,1.776,7.649,4.834,10.125c3.062,2.466,7.07,3.425,10.917,2.6l52.478-11.281v76.492c0,3.856,1.712,7.515,4.672,9.99c2.959,2.476,6.864,3.507,10.662,2.816l38.686-6.995c6.192-1.12,10.698-6.51,10.698-12.805v-83.397l80.658-17.334v74.502c0,3.865,1.712,7.524,4.672,9.99c2.96,2.475,6.865,3.506,10.662,2.815l38.686-7.004c6.192-1.121,10.694-6.51,10.694-12.805V377.35l57.087-12.267c5.999-1.291,10.281-6.582,10.281-12.724v-56.729c0-3.927-1.775-7.649-4.834-10.124c-3.058-2.466-7.07-3.426-10.912-2.6l-51.621,11.093v-108.39L418.562,173.34z M296.761,307.906l-80.658,17.326V216.85l80.658-17.334V307.906z", fill: color }, g);
  }

  function drawHalfSharp(parent, x, y, color) {
    const g = svgEl("g", { transform: `translate(${x - 1},${y - 0.5})` }, parent);
    svgEl("line", { x1: "0", y1: "-10", x2: "0", y2: "10", stroke: color, "stroke-width": "3.1", "stroke-linecap": "round" }, g);
    svgEl("line", { x1: "-7", y1: "-4", x2: "8", y2: "-7", stroke: color, "stroke-width": "3.1", "stroke-linecap": "round" }, g);
    svgEl("line", { x1: "-7", y1: "6", x2: "7", y2: "3", stroke: color, "stroke-width": "3.1", "stroke-linecap": "round" }, g);
  }

  ns.renderer = {
    renderAll,
    renderSidebar,
    renderPageShell,
    renderTonicSelector,
    renderInfoGrid,
    renderStaff,
    renderKeys,
    updateDisplayedName
  };
})();
