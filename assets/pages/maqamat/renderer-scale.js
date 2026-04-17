(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const { SLOT_MAP, STAFF_LINES_Y } = ns.constants;
  const { svgEl, drawClef, drawLedgerLines, drawAccidental, shadowColorForBorder } = ns.rendererSvg;
  const { escapeHtml } = ns.rendererContent;

  function renderTonicSelector() {
    const c = document.getElementById("tonic-selector-current");
    if (!c) return;
    const tonics = getInteractiveTonicsForMaqam(ns.state.maqamId);
    c.innerHTML = tonics
      .map((t) => `<button class="tonic-btn ${t === ns.state.tonic ? "active" : ""}" data-tonic="${t}">${getTonicLabelAr(t)}</button>`)
      .join("");
    c.querySelectorAll(".tonic-btn").forEach((b) => b.addEventListener("click", () => ns.actions.setActiveTonic(b.dataset.tonic)));
  }

  function renderStaff() {
    const svg = document.getElementById("staff-current");
    if (!svg) return;
    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    svg.innerHTML = "";

    STAFF_LINES_Y.forEach((y) => {
      svgEl("line", { x1: "0", y1: String(y), x2: "820", y2: String(y), stroke: "#8a7440", "stroke-width": "1.6" }, svg);
    });

    drawClef(svg);

    const xStart = 82;
    const count = Math.max(notes.length, 1);
    const xGap = (820 - xStart - 16) / count;

    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const p = ns.engine.getPaletteForNote(note);
      const active = ns.state.activeNoteIndex === i;
      const slot = SLOT_MAP[note.slot_key] || SLOT_MAP["E4"];
      const y = slot.y;
      const g = svgEl(
        "g",
        {
          class: `note-btn ${active ? "active" : ""}`,
          "data-note-idx": String(i),
          role: "button",
          tabindex: "0",
          title: note.role_description,
          "aria-label": note.role_description,
        },
        svg,
      );

      drawLedgerLines(g, x, slot.ledger);

      const noteColor = active ? p.active : p.idle;
      const stemColor = active ? p.active : p.stem;
      const accColor = active ? p.active_acc : p.acc;
      const up = y >= 138;

      svgEl(
        "line",
        {
          x1: String(up ? x + 7 : x - 7),
          y1: String(y),
          x2: String(up ? x + 7 : x - 7),
          y2: String(up ? y - 38 : y + 38),
          stroke: stemColor,
          "stroke-width": "1.8",
        },
        g,
      );

      drawAccidental(g, x - 22, y, note.acc_label, accColor);
      svgEl("ellipse", { cx: String(x), cy: String(y), rx: "8", ry: "5.5", fill: noteColor, transform: `rotate(-18,${x},${y})` }, g);
    });

    svg.querySelectorAll(".note-btn").forEach((n) =>
      n.addEventListener("click", async () => {
        const idx = Number(n.dataset.noteIdx);
        ns.actions.setActiveNote(idx);
        const now = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
        if (now[idx]) await ns.audio.playSingleNote(now[idx]);
      }),
    );
  }

  function renderKeys() {
    const row = document.getElementById("keys-current");
    if (!row) return;
    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);

    row.innerHTML = notes
      .map((note, i) => {
        const p = ns.engine.getPaletteForNote(note);
        const active = ns.state.activeNoteIndex === i;
        const bg = active ? p.box_bg_active : p.box_bg;
        const border = active ? p.box_border_active : p.box_border;
        const text = active ? p.box_text_active : p.box_text;
        return `<div class="note-key ${active ? "active" : ""}" data-note-idx="${i}" title="${escapeHtml(note.role_description)}" aria-label="${escapeHtml(note.role_description)}"><div class="note-key-face note-key-face-colored" style="background:${bg};border-color:${border};color:${text};box-shadow:${active ? `0 10px 24px ${shadowColorForBorder(border)}` : "none"};"><span>${note.display_label}</span></div></div>`;
      })
      .join("");

    row.querySelectorAll(".note-key").forEach((n) =>
      n.addEventListener("click", async () => {
        const idx = Number(n.dataset.noteIdx);
        ns.actions.setActiveNote(idx);
        const now = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
        if (now[idx]) await ns.audio.playSingleNote(now[idx]);
      }),
    );
  }

  ns.rendererScale = {
    renderTonicSelector,
    renderStaff,
    renderKeys,
  };
})();