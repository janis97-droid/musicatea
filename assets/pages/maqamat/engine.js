// assets/maqamat/engine.js
// Interactive maqam engine: musical models, note spelling, display labels, and scale generation.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};

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
    "Re/#": { letter: "D", acc_label: "𝄲",  ar: "ري",  en: "Re𝄲", qt: 5  },
    "Mi":   { letter: "E", acc_label: "",   ar: "مي",  en: "Mi",  qt: 8  },
    "Mib":  { letter: "E", acc_label: "♭",  ar: "مي",  en: "Mi♭", qt: 6  },
    "Mi/b": { letter: "E", acc_label: "𝄳",  ar: "مي",  en: "Mi𝄳", qt: 7  },
    "Fa":   { letter: "F", acc_label: "",   ar: "فا",  en: "Fa",  qt: 10 },
    "Fa#":  { letter: "F", acc_label: "♯",  ar: "فا",  en: "Fa♯", qt: 12 },
    "Fa/#": { letter: "F", acc_label: "𝄲",  ar: "فا",  en: "Fa𝄲", qt: 11 },
    "Sol":   { letter: "G", acc_label: "",   ar: "صول", en: "Sol",  qt: 14 },
    "Solb":  { letter: "G", acc_label: "♭",  ar: "صول", en: "Sol♭", qt: 12 },
    "Sol/#": { letter: "G", acc_label: "𝄲",  ar: "صول", en: "Sol𝄲", qt: 15 },
    "Sol#":  { letter: "G", acc_label: "♯",  ar: "صول", en: "Sol♯", qt: 16 },
    "La":   { letter: "A", acc_label: "",   ar: "لا",  en: "La",  qt: 18 },
    "Lab":  { letter: "A", acc_label: "♭",  ar: "لا",  en: "La♭", qt: 16 },
    "La/b": { letter: "A", acc_label: "𝄳",  ar: "لا",  en: "La𝄳", qt: 17 },
    "La#":  { letter: "A", acc_label: "♯",  ar: "لا",  en: "La♯", qt: 20 },
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
  const SVG_NS = "http://www.w3.org/2000/svg";

  const LOWER_OCTAVE_TONICS = new Set([
    "sol", "la_flat", "la", "si_flat", "si", "la_half_flat", "si_half_flat"
  ]);

  const MAQAM_MODELS = {
    rast:             { base_spelling: ["Do","Re","Mi/b","Fa","Sol","La","Si/b","Do"], intervals: [4,3,3,4,4,3,3] },
    suznak:           { base_spelling: ["Do","Re","Mi/b","Fa","Sol","Lab","Si","Do"], intervals: [4,3,3,4,2,6,2] },
    mahur:            { base_spelling: ["Do","Re","Mi/b","Fa","Sol","La","Si","Do"], intervals: [4,3,3,4,4,4,2] },
    nairuz:           { base_spelling: ["Do","Re","Mi/b","Fa","Sol","La/b","Sib","Do"], intervals: [4,3,3,4,3,3,4] },
    bashayer:         { base_spelling: ["Do","Re","Mi/b","Fa","Sol","Lab","Sib","Do"], intervals: [4,3,3,4,2,4,4] },
    sazkar:           { base_spelling: ["Do","Re/#","Mi/b","Fa","Sol","La","Si/b","Do"], intervals: [5,2,3,4,4,3,3] },
    dalanshin:        { base_spelling: ["Do","Re","Mi/b","Fa","Sol","La","Si/b","Do","Reb"], intervals: [4,3,3,4,4,3,3,2] },
    bayati:           { base_spelling: ["Re","Mi/b","Fa","Sol","La","Sib","Do","Re"], intervals: [3,3,4,4,2,4,4] },
    bayati_shuri:     { base_spelling: ["Re","Mi/b","Fa","Sol","Lab","Si","Do","Re"], intervals: [3,3,4,2,6,2,4] },
    husayni:          { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    muhayyar:         { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    bayatin:          { base_spelling: ["Re","Mi/b","Fa","Sol","La","Si/b","Do","Re"], intervals: [3,3,4,4,3,3,4] },
    nahuft:           { base_spelling: ["La","Si/b","Do","Re","Mi","Fa#","Sol","La"], intervals: [3,3,4,4,4,2,4] },
    ajam:             { base_spelling: ["Do","Re","Mi","Fa","Sol","La","Si","Do"], intervals: [4,4,2,4,4,4,2] },
    ajam_ushayran:    { base_spelling: ["Sib","Do","Re","Mib","Fa","Sol","La","Sib"], intervals: [4,4,2,4,4,4,2] },
    shawq_afza:       { base_spelling: ["Sib","Do","Re","Mib","Fa","Solb","La","Sib"], intervals: [4,4,2,4,2,6,2] },
    suznal:           { base_spelling: ["Do","Re","Mi","Fa","Sol","Lab","Si","Do"], intervals: [4,4,2,4,2,6,2] },
    ajam_murassa:     { base_spelling: ["Sib","Do","Re","Mi/b","Fa","Sol","La","Sib"], intervals: [4,4,3,3,4,4,2] },
    jaharkah:         { base_spelling: ["Fa","Sol","La","Sib","Do","Re","Mi/b","Fa"], intervals: [4,4,2,4,4,3,3] },
    hijaz:            { base_spelling: ["Re","Mib","Fa#","Sol","La","Si/b","Do","Re"], intervals: [2,6,2,4,3,3,4] },
    hijazkar:         { base_spelling: ["Do","Reb","Mi","Fa","Sol","Lab","Si","Do"], intervals: [2,6,2,4,2,6,2] },
    shadd_araban:     { base_spelling: ["Sol","Lab","Si","Do","Re","Mib","Fa#","Sol"], intervals: [2,6,2,4,2,6,2] },
    suzdil:           { base_spelling: ["La","Sib","Do#","Re","Mi","Fa","Sol#","La"], intervals: [2,6,2,4,2,6,2] },
    shahnaz:          { base_spelling: ["Re","Mib","Fa#","Sol","La","Sib","Do#","Re"], intervals: [2,6,2,4,2,6,2] },
    hijazayn:         { base_spelling: ["Re","Mib","Fa#","Sol","Lab","Si","Do","Re"], intervals: [2,6,2,2,6,2,4] },
    zanjaran:         { base_spelling: ["Do","Reb","Mi","Fa","Sol","La","Sib","Do"], intervals: [2,6,2,4,4,2,4] },
    hijaz_ajami:      { base_spelling: ["Re","Mib","Fa#","Sol","La","Si/b","Do","Re"], intervals: [2,6,2,4,2,4,4] },
    nahawand:         { base_spelling: ["Do","Re","Mib","Fa","Sol","Lab","Si","Do"], intervals: [4,2,4,4,2,6,2] },
    nahawand_murassa: { base_spelling: ["Do","Re","Mib","Fa","Solb","La","Sib","Do"], intervals: [4,2,4,2,6,2,4] },
    ushshaq_masri:    { base_spelling: ["Do","Re","Mib","Fa","Sol","La/b","Sib","Do"], intervals: [4,2,4,4,3,3,4] },
    tarz_jadid:       { base_spelling: ["Do","Re","Mib","Fa","Sol","La","Si","Do"], intervals: [4,2,4,4,4,4,2] },
    nahawand_kabir:   { base_spelling: ["Do","Re","Mib","Fa","Sol","La","Sib","Do"], intervals: [4,2,4,4,4,2,4] },
    nahawand_kurdi:   { base_spelling: ["Do","Re","Mib","Fa","Sol","Lab","Sib","Do"], intervals: [4,2,4,4,2,4,4] },
    kurd:             { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do","Re"], intervals: [2,4,4,4,2,4,4] },
    tarz_nawin:       { base_spelling: ["Do","Reb","Mib","Fa","Solb","La","Sib","Do"], intervals: [2,4,4,2,6,2,4] },
    shahnaz_kurdi:    { base_spelling: ["Re","Mib","Fa","Sol","La","Sib","Do#","Re"], intervals: [2,4,4,4,2,6,2] },
    lami:             { base_spelling: ["Re","Mib","Fa","Sol","Lab","Sib","Do","Re"], intervals: [2,4,4,2,4,4,4] },
    athar_kurd:       { base_spelling: ["Do","Reb","Mib","Fa#","Sol","Lab","Si","Do"], intervals: [2,4,6,2,2,6,2] },
    sikah:            { base_spelling: ["Mi/b","Fa","Sol","La","Si/b","Do","Re","Mi/b"], intervals: [3,4,4,3,3,4,3] },
    huzam:            { base_spelling: ["Mi/b","Fa","Sol","Lab","Si","Do","Re","Mi/b"], intervals: [3,4,2,6,2,4,3] },
    rahat_al_arwah:   { base_spelling: ["Si/b","Do","Re","Mib","Fa#","Sol","La","Si/b"], intervals: [3,4,2,6,2,4,3] },
    iraq:             { base_spelling: ["Si/b","Do","Re","Mi/b","Fa","Sol","La","Si/b"], intervals: [3,4,3,3,4,4,3] },
    awj_iraq:         { base_spelling: ["Si/b","Do","Re","Mib","Fa#","Sol","La#","Si/b"], intervals: [3,4,2,6,2,6,1] },
    basta_nikar:      { base_spelling: ["Si/b","Do","Re","Mi/b","Fa","Solb","La","Si/b"], intervals: [3,4,3,3,2,6,3] },
    mustaar:          { base_spelling: ["Mi/b","Fa#","Sol","La","Sib","Do","Re","Mi/b"], intervals: [5,2,4,2,4,4,3] },
    farahnak:         { base_spelling: ["Si/b","Do","Re","Mi","Fa#","Sol","La","Si/b"], intervals: [3,4,4,4,2,4,3] },
    shaar:            { base_spelling: ["Mi/b","Fa","Sol","La","Sib","Do","Re","Mi/b"], intervals: [3,4,4,2,4,4,3] },
    rahat_faza:       { base_spelling: ["Mi/b","Fa","Sol","Lab","Sib","Do","Re","Mi/b"], intervals: [3,4,2,4,4,4,3] },
    saba:             { base_spelling: ["Re","Mi/b","Fa","Solb","La","Sib","Do","Reb","Mi","Fa"], intervals: [3,3,2,6,2,4,2,6,2] },
    saba_jadid:       { base_spelling: ["Re","Mi/b","Fa","Solb","La","Sib","Do#","Re"], intervals: [3,3,2,6,2,6,2] },
    zamzama:          { base_spelling: ["Re","Mib","Fa","Solb","La","Sib","Do","Reb","Mi","Fa"], intervals: [2,4,2,6,2,4,2,6,2] },
    nawa_athar:       { base_spelling: ["Do","Re","Mib","Fa#","Sol","Lab","Si","Do"], intervals: [4,2,6,2,2,6,2] },
    nikriz:           { base_spelling: ["Do","Re","Mib","Fa#","Sol","Lab","Sib","Do"], intervals: [4,2,6,2,2,4,4] },
    basandida:        { base_spelling: ["Do","Re","Mib","Fa#","Sol","La","Si/b","Do"], intervals: [4,2,6,2,4,3,3] }
  };

  const MAQAM_DISPLAY_LABELS_AR = { hijaz: "حجاز (مصري)" };
  const MAQAM_DESCENDING_CONFIG = {
    awj_iraq: {
      direction: "descending",
      display_tokens: ["Re","Do","Si/b","La#","Sol","Fa#","Mib","Re","Do","Si/b"]
    }
  };

  function getQuarterForToken(token) {
    const meta = NOTE_TOKEN_META[token];
    return meta ? meta.qt : null;
  }

  function spellQuarterWithExpectedLetter(absQuarter, expectedLetter) {
    const q = ((absQuarter % 24) + 24) % 24;
    const token = Object.keys(NOTE_TOKEN_META).find(key => {
      const meta = NOTE_TOKEN_META[key];
      return meta.letter === expectedLetter && meta.qt === q;
    });
    if (token) return token;
    const fallback = getAllowedCanonicalSpellingsForQuarter(q);
    if (fallback && fallback.length) return fallback[0];
    return "Do";
  }

  function getArabicDisplayLabel(base, octave) {
    if (octave <= 3) return `${base} قرار`;
    if (octave >= 5) return `${base} جواب`;
    return base;
  }

  function getMaqamDisplayTitle(maqam) {
    if (!maqam) return "";
    return MAQAM_DISPLAY_LABELS_AR[maqam.id] || maqam.name || "";
  }

  function getDisplayNameForTonicSafe(maqamId, tonic) {
    const maqam = getMaqamById(maqamId);
    if (!maqam) return "";
    if (MAQAM_DISPLAY_LABELS_AR[maqamId]) return MAQAM_DISPLAY_LABELS_AR[maqamId];
    if (typeof getDisplayNameForTonic === "function") {
      try {
        return getDisplayNameForTonic(maqamId, tonic) || maqam.name;
      } catch (e) {
        return maqam.name;
      }
    }
    return maqam.name;
  }

  function getMaqamDirection(maqamId) {
    return (MAQAM_DESCENDING_CONFIG[maqamId] && MAQAM_DESCENDING_CONFIG[maqamId].direction) || "ascending";
  }

  function getScaleSectionLabel(maqamId) {
    return getMaqamDirection(maqamId) === "descending"
      ? "السلم التفاعلي (عرض هابط)"
      : "اضغط على نوتة أو زر للاستماع";
  }

  function getPlayButtonLabel(maqamId) {
    return getMaqamDirection(maqamId) === "descending"
      ? "تشغيل المسار الهابط"
      : "تشغيل السلّم";
  }

  function getLowerJinsCount(maqamId) {
    if (maqamId === "sikah") return 3;
    if (maqamId === "nawa_athar") return 5;
    return 4;
  }

  function normalizeDegreeRange(range) {
    const start = Math.max(0, (range[0] || 1) - 1);
    const end = Math.max(start, (range[1] || 8) - 1);
    return { start, end };
  }

  function getJinsInfo(maqamId) {
    const lowerCount = getLowerJinsCount(maqamId);
    return {
      lower: normalizeDegreeRange([1, lowerCount]),
      upper: normalizeDegreeRange([lowerCount + 1, 8])
    };
  }

  function getJinsZone(idx, jinsInfo) {
    if (idx >= jinsInfo.upper.start && idx <= jinsInfo.upper.end) return "upper";
    return "lower";
  }

  function isJinsStart(idx, jinsInfo) {
    return idx === jinsInfo.lower.start || idx === jinsInfo.upper.start;
  }

  function getGenericNoteRoleDescription(idx, totalCount, displayLabel, jinsInfo) {
    if (idx === 0) return `${displayLabel}: قرار المقام / الجذر`;
    if (idx === totalCount - 1) return `${displayLabel}: جواب المقام`;
    if (idx === jinsInfo.upper.start) return `${displayLabel}: غمّاز المقام وبداية الجنس العلوي`;
    if (idx === jinsInfo.lower.start) return `${displayLabel}: بداية الجنس الأساسي`;
    if (idx > jinsInfo.lower.start && idx <= jinsInfo.lower.end) return `${displayLabel}: ضمن الجنس الأساسي`;
    if (idx > jinsInfo.upper.start && idx <= jinsInfo.upper.end) return `${displayLabel}: ضمن الجنس العلوي`;
    return `${displayLabel}: نغمة ضمن البناء المقامي`;
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

  function buildScaleNotes(maqamId, tonic) {
    const descendingConfig = MAQAM_DESCENDING_CONFIG[maqamId];
    if (descendingConfig && descendingConfig.direction === "descending") {
      return buildDescendingDisplayNotes(maqamId, tonic, descendingConfig);
    }
    return buildAscendingModelNotes(maqamId, tonic);
  }

  function buildAscendingModelNotes(maqamId, tonic) {
    const model = MAQAM_MODELS[maqamId];
    const tonicToken = getCanonicalInteractiveNoteForTonic(tonic);
    if (!model || !tonicToken) return [];

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
      const displayLabel = getArabicDisplayLabel(meta.ar, octave);

      return {
        token,
        slot_key: slotKey,
        acc_label: meta.acc_label,
        display_label: displayLabel,
        jins_zone: getJinsZone(idx, jinsInfo),
        is_jins_start: isJinsStart(idx, jinsInfo),
        role_description: getGenericNoteRoleDescription(idx, absoluteQuarterValues.length, displayLabel, jinsInfo)
      };
    });
  }

  function buildDescendingDisplayNotes(maqamId, tonic, config) {
    const displayTokens = Array.isArray(config.display_tokens) ? config.display_tokens : [];
    if (!displayTokens.length) return buildAscendingModelNotes(maqamId, tonic);

    const targetRootOctave = LOWER_OCTAVE_TONICS.has(tonic) ? 3 : 4;
    const jinsInfo = getJinsInfo(maqamId);

    return displayTokens.map((token, idx) => {
      const meta = NOTE_TOKEN_META[token] || NOTE_TOKEN_META["Do"];
      const slotKey = getDescendingSlotKey(meta.letter, idx, targetRootOctave);
      const octave = getOctaveFromSlotKey(slotKey);
      const displayLabel = getArabicDisplayLabel(meta.ar, octave);

      return {
        token,
        slot_key: slotKey,
        acc_label: meta.acc_label,
        display_label: displayLabel,
        jins_zone: getJinsZone(Math.min(idx, jinsInfo.upper.end), jinsInfo),
        is_jins_start: isJinsStart(idx, jinsInfo),
        role_description: getGenericNoteRoleDescription(idx, displayTokens.length, displayLabel, jinsInfo)
      };
    });
  }

  function getDescendingSlotKey(letter, idx, rootOctave) {
    const sequence = ["D5","C5","B4","A4","G4","F4","E4","D4","C4","B3"];
    const fallbackLetterMap = {
      C: rootOctave >= 4 ? "C4" : "C3",
      D: rootOctave >= 4 ? "D4" : "D3",
      E: rootOctave >= 4 ? "E4" : "E3",
      F: rootOctave >= 4 ? "F4" : "F3",
      G: rootOctave >= 4 ? "G4" : "G3",
      A: rootOctave >= 4 ? "A4" : "A3",
      B: rootOctave >= 4 ? "B4" : "B3"
    };
    return sequence[idx] || fallbackLetterMap[letter] || "E4";
  }

  function getOctaveFromSlotKey(slotKey) {
    const match = String(slotKey || "").match(/(\d+)$/);
    return match ? Number(match[1]) : 4;
  }

  ns.constants = {
    COLORS,
    NOTE_TOKEN_META,
    SLOT_MAP,
    STAFF_LINES_Y,
    SVG_NS,
    MAQAM_MODELS
  };

  ns.engine = {
    getPaletteForNote,
    buildScaleNotes,
    getDisplayNameForTonicSafe,
    getMaqamDisplayTitle,
    getMaqamDirection,
    getScaleSectionLabel,
    getPlayButtonLabel,
    MAQAM_MODELS
  };
})();
