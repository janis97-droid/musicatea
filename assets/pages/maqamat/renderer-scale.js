(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const { SLOT_MAP, STAFF_LINES_Y } = ns.constants;
  const { svgEl, drawClef, drawLedgerLines, drawAccidental, shadowColorForBorder } = ns.rendererSvg;
  const { escapeHtml } = ns.rendererContent;

  const JINS_LABELS_AR = {
    rast: { lower: "جنس الراست", upper: "جنس الراست" },
    suznak: { lower: "جنس الراست", upper: "جنس الحجاز" },
    mahur: { lower: "جنس الراست", upper: "جنس العجم" },
    nairuz: { lower: "جنس الراست", upper: "جنس البيات" },
    bashayer: { lower: "جنس الراست", upper: "جنس العجم" },
    sazkar: { lower: "جنس الراست", upper: "جنس الحجاز" },
    dalanshin: { lower: "جنس الراست", upper: "جنس النهاوند" },
    bayati: { lower: "جنس البيات", upper: "جنس النهاوند" },
    bayati_shuri: { lower: "جنس البيات", upper: "جنس الحجاز" },
    husayni: { lower: "جنس البيات", upper: "جنس الحسيني" },
    muhayyar: { lower: "جنس البيات", upper: "جنس المحيّر" },
    bayatin: { lower: "جنس البيات", upper: "جنس البياتين" },
    nahuft: { lower: "جنس البيات", upper: "جنس النهاوند" },
    ajam: { lower: "جنس العجم", upper: "جنس العجم" },
    ajam_ushayran: { lower: "جنس العجم", upper: "جنس العجم" },
    shawq_afza: { lower: "جنس العجم", upper: "جنس العجم" },
    suznal: { lower: "جنس العجم", upper: "جنس الحجاز" },
    ajam_murassa: { lower: "جنس العجم", upper: "جنس العجم" },
    jaharkah: { lower: "جنس العجم", upper: "جنس العجم" },
    hijaz: { lower: "جنس الحجاز", upper: "جنس الحجاز" },
    hijazkar: { lower: "جنس الحجاز", upper: "جنس العجم" },
    shadd_araban: { lower: "جنس الحجاز", upper: "جنس الكرد" },
    suzdil: { lower: "جنس الحجاز", upper: "جنس الكرد" },
    shahnaz: { lower: "جنس الحجاز", upper: "جنس الشهناز" },
    hijazayn: { lower: "جنس الحجاز", upper: "جنس الحجازين" },
    zanjaran: { lower: "جنس الحجاز", upper: "جنس الزنجران" },
    hijaz_ajami: { lower: "جنس الحجاز", upper: "جنس العجم" },
    nahawand: { lower: "جنس النهاوند", upper: "جنس النهاوند" },
    nahawand_murassa: { lower: "جنس النهاوند", upper: "جنس البيات" },
    ushshaq_masri: { lower: "جنس النهاوند", upper: "جنس البيات" },
    tarz_jadid: { lower: "جنس النهاوند", upper: "جنس الحجاز" },
    nahawand_kabir: { lower: "جنس النهاوند", upper: "جنس العجم" },
    nahawand_kurdi: { lower: "جنس النهاوند", upper: "جنس الكرد" },
    kurd: { lower: "جنس الكرد", upper: "جنس الكرد" },
    tarz_nawin: { lower: "جنس الكرد", upper: "جنس الحجاز" },
    shahnaz_kurdi: { lower: "جنس الكرد", upper: "جنس الحجاز" },
    lami: { lower: "جنس الكرد", upper: "جنس الكرد" },
    athar_kurd: { lower: "جنس أثر كرد", upper: "جنس النوى أثر" },
    sikah: { lower: "جنس السيكاه", upper: "جنس السيكاه" },
    huzam: { lower: "جنس السيكاه", upper: "جنس الحجاز" },
    rahat_al_arwah: { lower: "جنس السيكاه", upper: "جنس الراحة الأرواح" },
    iraq: { lower: "جنس السيكاه", upper: "جنس البيات" },
    awj_iraq: { lower: "جنس السيكاه", upper: "جنس الأوج عراق" },
    basta_nikar: { lower: "جنس السيكاه", upper: "جنس الصبا" },
    mustaar: { lower: "جنس المستعار", upper: "جنس النهاوند" },
    farahnak: { lower: "جنس السيكاه", upper: "جنس العجم" },
    shaar: { lower: "جنس السيكاه", upper: "جنس النهاوند" },
    rahat_faza: { lower: "جنس السيكاه", upper: "جنس الكرد" },
    saba: { lower: "جنس صبا", upper: "جنس حجاز" },
    saba_jadid: { lower: "جنس الصبا", upper: "جنس الصبا الجديد" },
    zamzama: { lower: "جنس الصبا", upper: "جنس الزمزمة" },
    nawa_athar: { lower: "جنس النوى أثر", upper: "جنس النوى أثر" },
    nikriz: { lower: "جنس النوى أثر", upper: "جنس النكريز" },
    basandida: { lower: "جنس النوى أثر", upper: "جنس البسنديدة" }
  };

  const NOTE_ROLE_STYLES = {
    lower: { bg: 'rgba(200,164,90,0.10)', border: 'rgba(200,164,90,0.30)', text: '#d8bb74', shadow: 'rgba(200,164,90,0.20)' },
    upper: { bg: 'rgba(123,168,212,0.10)', border: 'rgba(123,168,212,0.30)', text: '#8dbde4', shadow: 'rgba(123,168,212,0.20)' },
    shared: { bg: 'rgba(112,170,96,0.12)', border: 'rgba(112,170,96,0.34)', text: '#9fd68a', shadow: 'rgba(112,170,96,0.22)' }
  };

  function renderTonicSelector() {
    const c = document.getElementById('tonic-selector-current');
    if (!c) return;
    const tonics = getInteractiveTonicsForMaqam(ns.state.maqamId);
    c.innerHTML = tonics.map((t) => `<button class="tonic-btn ${t === ns.state.tonic ? 'active' : ''}" data-tonic="${t}">${getTonicLabelAr(t)}</button>`).join('');
    c.querySelectorAll('.tonic-btn').forEach((b) => b.addEventListener('click', () => ns.actions.setActiveTonic(b.dataset.tonic)));
  }

  function clampDegree(value, degreeCount) {
    const num = Number(value);
    if (!Number.isFinite(num)) return 1;
    return Math.min(Math.max(Math.round(num), 1), degreeCount);
  }

  function buildJinsSegments(maqamId, degreeCount) {
    const labels = JINS_LABELS_AR[maqamId] || { lower: 'الجنس الأول', upper: 'الجنس الثاني' };
    const config = typeof getInteractiveConfig === 'function' ? getInteractiveConfig(maqamId) : null;
    const lowerRange = Array.isArray(config?.lower_jins_degree_range) ? config.lower_jins_degree_range : [1, Math.min(4, degreeCount)];
    const upperRange = Array.isArray(config?.upper_jins_degree_range) ? config.upper_jins_degree_range : [Math.min(5, degreeCount), degreeCount];
    const lowerStart = clampDegree(lowerRange[0], degreeCount);
    const lowerEnd = clampDegree(lowerRange[1], degreeCount);
    const upperStart = clampDegree(upperRange[0], degreeCount);
    const upperEnd = clampDegree(upperRange[1], degreeCount);
    const overlapStart = Math.max(lowerStart, upperStart);
    const overlapEnd = Math.min(lowerEnd, upperEnd);
    const hasOverlap = overlapStart <= overlapEnd;

    if (!hasOverlap) {
      return [
        { role: 'lower', label: labels.lower, start: lowerStart, end: lowerEnd, key: 'lower' },
        { role: 'upper', label: labels.upper, start: upperStart, end: upperEnd, key: 'upper' }
      ];
    }

    const segments = [];
    if (lowerStart < overlapStart) segments.push({ role: 'lower', label: labels.lower, start: lowerStart, end: overlapStart - 1, key: 'lower' });
    segments.push({ role: 'shared', label: '', start: overlapStart, end: overlapEnd, title: 'نغمة مشتركة', key: 'shared' });
    if (upperEnd > overlapEnd) segments.push({ role: 'upper', label: labels.upper, start: overlapEnd + 1, end: upperEnd, key: 'upper' });
    if (!segments.some((segment) => segment.role === 'lower')) segments.unshift({ role: 'lower', label: labels.lower, start: lowerStart, end: overlapEnd, key: 'lower' });
    return segments.filter((segment) => segment.start <= segment.end);
  }

  function getDegreeRoleMap(segments, degreeCount) {
    const map = {};
    for (let degree = 1; degree <= degreeCount; degree += 1) {
      const hit = segments.find((segment) => degree >= segment.start && degree <= segment.end);
      map[degree] = hit ? hit.role : null;
    }
    return map;
  }

  function getBaseNoteStyle(role, palette) {
    const roleStyle = NOTE_ROLE_STYLES[role];
    if (roleStyle) return roleStyle;
    return { bg: palette.box_bg, border: palette.box_border, text: palette.box_text, shadow: shadowColorForBorder(palette.box_border) };
  }

  function renderStaff() {
    const svg = document.getElementById('staff-current');
    if (!svg) return;
    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    svg.innerHTML = '';
    STAFF_LINES_Y.forEach((y) => { svgEl('line', { x1: '0', y1: String(y), x2: '820', y2: String(y), stroke: '#8a7440', 'stroke-width': '1.6' }, svg); });
    drawClef(svg);
    const xStart = 82;
    const count = Math.max(notes.length, 1);
    const xGap = (820 - xStart - 16) / count;
    notes.forEach((note, i) => {
      const x = xStart + i * xGap + xGap * 0.4;
      const p = ns.engine.getPaletteForNote(note);
      const active = ns.state.activeNoteIndex === i;
      const slot = SLOT_MAP[note.slot_key] || SLOT_MAP['E4'];
      const y = slot.y;
      const g = svgEl('g', { class: `note-btn ${active ? 'active' : ''}`, 'data-note-idx': String(i), role: 'button', tabindex: '0', title: note.role_description, 'aria-label': note.role_description }, svg);
      drawLedgerLines(g, x, slot.ledger);
      const noteColor = active ? p.active : p.idle;
      const stemColor = active ? p.active : p.stem;
      const accColor = active ? p.active_acc : p.acc;
      const up = y >= 138;
      svgEl('line', { x1: String(up ? x + 7 : x - 7), y1: String(y), x2: String(up ? x + 7 : x - 7), y2: String(up ? y - 38 : y + 38), stroke: stemColor, 'stroke-width': '1.8' }, g);
      drawAccidental(g, x - 22, y, note.acc_label, accColor);
      svgEl('ellipse', { cx: String(x), cy: String(y), rx: '8', ry: '5.5', fill: noteColor, transform: `rotate(-18,${x},${y})` }, g);
    });
    svg.querySelectorAll('.note-btn').forEach((n) => n.addEventListener('click', async () => {
      const idx = Number(n.dataset.noteIdx);
      ns.actions.setActiveNote(idx);
      const now = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
      if (now[idx]) await ns.audio.playSingleNote(now[idx]);
    }));
  }

  function renderKeys() {
    const row = document.getElementById('keys-current');
    if (!row) return;
    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    const degreeCount = Math.max(notes.length, 1);
    const segments = buildJinsSegments(ns.state.maqamId, degreeCount);
    const roleMap = getDegreeRoleMap(segments, degreeCount);
    row.style.direction = 'ltr';
    row.innerHTML = notes.map((note, i) => {
      const degree = i + 1;
      const p = ns.engine.getPaletteForNote(note);
      const active = ns.state.activeNoteIndex === i;
      const role = roleMap[degree];
      const baseStyle = getBaseNoteStyle(role, p);
      const bg = active ? p.box_bg_active : baseStyle.bg;
      const border = active ? p.box_border_active : baseStyle.border;
      const text = active ? p.box_text_active : baseStyle.text;
      const shadow = active ? `0 10px 24px ${shadowColorForBorder(border)}` : 'none';
      return `<div class="note-key ${active ? 'active' : ''} jins-role-${role || 'none'}" data-note-idx="${i}" data-degree="${degree}" title="${escapeHtml(note.role_description)}" aria-label="${escapeHtml(note.role_description)}"><div class="note-key-face note-key-face-colored" style="background:${bg};border-color:${border};color:${text};box-shadow:${shadow};"><span>${note.display_label}</span></div></div>`;
    }).join('');
    row.querySelectorAll('.note-key').forEach((n) => n.addEventListener('click', async () => {
      const idx = Number(n.dataset.noteIdx);
      ns.actions.setActiveNote(idx);
      const now = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
      if (now[idx]) await ns.audio.playSingleNote(now[idx]);
    }));
  }

  function applyJinsSelection(segment, allSegments) {
    const row = document.getElementById('jins-current');
    const keysRow = document.getElementById('keys-current');
    if (!row || !keysRow) return;
    row.querySelectorAll('.jins-pill').forEach((pill) => {
      const selected = segment && pill.dataset.segmentKey === segment.key;
      pill.classList.toggle('is-selected', !!selected);
    });
    const sharedSegments = Array.isArray(allSegments) ? allSegments.filter((item) => item.role === 'shared') : [];
    keysRow.querySelectorAll('.note-key').forEach((key) => {
      const degree = Number(key.dataset.degree);
      const inSelected = !!(segment && degree >= segment.start && degree <= segment.end);
      const inShared = sharedSegments.some((shared) => degree >= shared.start && degree <= shared.end);
      const shouldLight = segment ? (inSelected || ((segment.role === 'lower' || segment.role === 'upper') && inShared)) : false;
      key.classList.toggle('jins-highlight', shouldLight);
      key.classList.toggle('jins-highlight-lower', shouldLight && segment?.role === 'lower' && !inShared);
      key.classList.toggle('jins-highlight-upper', shouldLight && segment?.role === 'upper' && !inShared);
      key.classList.toggle('jins-highlight-shared', shouldLight && inShared);
    });
  }

  function renderJinsRow() {
    const row = document.getElementById('jins-current');
    if (!row) return;
    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    const degreeCount = Math.max(notes.length, 1);
    const segments = buildJinsSegments(ns.state.maqamId, degreeCount);
    const visibleSegments = segments.filter((segment) => segment.role !== 'shared');
    row.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
    row.style.direction = 'ltr';
    row.innerHTML = visibleSegments.map((segment) => {
      const className = `jins-pill jins-pill-${segment.role}`;
      return `<div class="${className}" data-segment-key="${segment.key}"><span>${escapeHtml(segment.label)}</span></div>`;
    }).join('');
    row.querySelectorAll('.jins-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const segment = visibleSegments.find((item) => item.key === pill.dataset.segmentKey);
        const isAlreadySelected = pill.classList.contains('is-selected');
        applyJinsSelection(isAlreadySelected ? null : segment, segments);
      });
    });
    applyJinsSelection(null, segments);
  }

  ns.rendererScale = { renderTonicSelector, renderStaff, renderKeys, renderJinsRow };
})();