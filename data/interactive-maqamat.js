// data/interactive-maqamat.js
// Repo-compatible interactive maqam layer
// Aligned with data/maqamat.js
//
// Quarter-tone math:
// octave = 24
// whole tone = 4
// semitone = 2
// half-flat / half-sharp = 1

const INTERACTIVE_TONIC_ORDER_STANDARD = [
  "do",
  "re",
  "mi_flat",
  "fa",
  "sol",
  "la_flat",
  "la",
  "si_flat",
  "si"
];

const INTERACTIVE_TONIC_ORDER_HALF_FLAT = [
  "mi_half_flat",
  "la_half_flat",
  "si_half_flat"
];

const INTERACTIVE_TONIC_META = {
  do:            { label_ar: "دو",           label_en: "Do",   canonical_note: "Do",   quarter_base: 0,  accidental: null,        family_mode: "standard" },
  re:            { label_ar: "ري",           label_en: "Re",   canonical_note: "Re",   quarter_base: 4,  accidental: null,        family_mode: "standard" },
  mi_flat:       { label_ar: "مي بيمول",     label_en: "Mib",  canonical_note: "Mib",  quarter_base: 6,  accidental: "flat",      family_mode: "standard" },
  fa:            { label_ar: "فا",           label_en: "Fa",   canonical_note: "Fa",   quarter_base: 10, accidental: null,        family_mode: "standard" },
  sol:           { label_ar: "صول",          label_en: "Sol",  canonical_note: "Sol",  quarter_base: 14, accidental: null,        family_mode: "standard" },
  la_flat:       { label_ar: "لا بيمول",     label_en: "Lab",  canonical_note: "Lab",  quarter_base: 16, accidental: "flat",      family_mode: "standard" },
  la:            { label_ar: "لا",           label_en: "La",   canonical_note: "La",   quarter_base: 18, accidental: null,        family_mode: "standard" },
  si_flat:       { label_ar: "سي بيمول",     label_en: "Sib",  canonical_note: "Sib",  quarter_base: 20, accidental: "flat",      family_mode: "standard" },
  si:            { label_ar: "سي",           label_en: "Si",   canonical_note: "Si",   quarter_base: 22, accidental: null,        family_mode: "standard" },

  mi_half_flat:  { label_ar: "مي نصف بيمول", label_en: "Mi/b", canonical_note: "Mi/b", quarter_base: 7,  accidental: "half_flat", family_mode: "half_flat_only" },
  la_half_flat:  { label_ar: "لا نصف بيمول", label_en: "La/b", canonical_note: "La/b", quarter_base: 17, accidental: "half_flat", family_mode: "half_flat_only" },
  si_half_flat:  { label_ar: "سي نصف بيمول", label_en: "Si/b", canonical_note: "Si/b", quarter_base: 21, accidental: "half_flat", family_mode: "half_flat_only" }
};

/* ============================================================
   Canonical pitch classes in quarter-tones (mod 24)
============================================================ */

const CANONICAL_NOTE_TO_QUARTER = {
  "Do": 0,
  "Dob": 22,
  "Do#": 2,
  "Do/#": 1,

  "Re": 4,
  "Reb": 2,
  "Re/b": 3,
  "Re#": 6,

  "Mi": 8,
  "Mib": 6,
  "Mi/b": 7,

  "Fa": 10,
  "Fa#": 12,
  "Fa/#": 11,

  "Sol": 14,
  "Solb": 12,
  "Sol#": 16,

  "La": 18,
  "Lab": 16,
  "La/b": 17,

  "Si": 22,
  "Sib": 20,
  "Si/b": 21
};

const QUARTER_TO_ALLOWED_NOTES = {
  0: ["Do"],
  1: ["Do/#"],
  2: ["Do#", "Reb"],
  3: ["Re/b"],
  4: ["Re"],
  5: [],
  6: ["Re#", "Mib"],
  7: ["Mi/b"],
  8: ["Mi"],
  9: [],
  10: ["Fa"],
  11: ["Fa/#"],
  12: ["Fa#", "Solb"],
  13: [],
  14: ["Sol"],
  15: [],
  16: ["Sol#", "Lab"],
  17: ["La/b"],
  18: ["La"],
  19: [],
  20: ["Sib"],
  21: ["Si/b"],
  22: ["Si", "Dob"],
  23: []
};

/* ============================================================
   Core ajnas / formulas
============================================================ */

const INTERACTIVE_FORMULA_LIBRARY = {
  // main families
  rast:                 [0, 4, 7, 10, 14, 18, 21, 24],
  bayati:               [0, 3, 6, 10, 14, 17, 21, 24],
  ajam:                 [0, 4, 8, 10, 14, 18, 22, 24],
  hijaz:                [0, 2, 8, 10, 14, 16, 20, 24],
  nahawand:             [0, 4, 6, 10, 14, 16, 20, 24],
  kurd:                 [0, 2, 6, 10, 14, 16, 20, 24],
  sikah:                [0, 3, 7, 10, 14, 17, 20, 24],
  saba:                 [0, 3, 6, 8, 14, 16, 20, 24],
  nawa_athar:           [0, 4, 6, 12, 14, 16, 20, 24],

  // rast family branches
  suznak:               [0, 4, 7, 10, 14, 16, 20, 24],
  mahur:                [0, 4, 8, 10, 14, 18, 22, 24],
  nairuz:               [0, 4, 7, 10, 14, 16, 20, 24],
  bashayer:             [0, 4, 7, 10, 14, 18, 20, 24],
  sazkar:               [0, 4, 7, 10, 14, 16, 20, 24],
  dalanshin:            [0, 4, 7, 10, 14, 16, 21, 24],

  // bayati family branches
  bayati_shuri:         [0, 3, 6, 10, 14, 16, 20, 24],
  husayni:              [0, 3, 6, 10, 14, 17, 21, 24],
  muhayyar:             [0, 3, 6, 10, 14, 17, 21, 24],
  bayatin:              [0, 3, 6, 10, 14, 17, 21, 24],
  nahuft:               [0, 4, 6, 10, 14, 16, 20, 24],

  // ajam family branches
  ajam_ushayran:        [0, 4, 8, 10, 14, 18, 22, 24],
  shawq_afza:           [0, 4, 8, 10, 14, 18, 22, 24],
  suznal:               [0, 4, 8, 10, 14, 16, 20, 24],
  ajam_murassa:         [0, 4, 8, 10, 14, 17, 21, 24],
  jaharkah:             [0, 4, 8, 10, 14, 18, 22, 24],

  // hijaz family branches
  hijazkar:             [0, 2, 8, 10, 14, 18, 22, 24],
  shadd_araban:         [0, 2, 8, 10, 14, 16, 20, 24],
  suzdil:               [0, 2, 8, 10, 14, 16, 20, 24],
  shahnaz:              [0, 2, 8, 10, 14, 16, 20, 24],
  hijazayn:             [0, 2, 8, 10, 14, 16, 20, 24],
  zanjaran:             [0, 2, 8, 10, 14, 16, 20, 24],
  hijaz_ajami:          [0, 2, 8, 10, 14, 18, 22, 24],

  // nahawand family branches
  nahawand_murassa:     [0, 4, 6, 10, 14, 17, 21, 24],
  ushshaq_masri:        [0, 4, 6, 10, 14, 17, 21, 24],
  tarz_jadid:           [0, 4, 6, 10, 14, 16, 20, 24],
  nahawand_kabir:       [0, 4, 6, 10, 14, 18, 22, 24],
  nahawand_kurdi:       [0, 2, 6, 10, 14, 16, 20, 24],

  // kurd family branches
  tarz_nawin:           [0, 2, 6, 10, 14, 16, 20, 24],
  shahnaz_kurdi:        [0, 2, 6, 10, 14, 16, 20, 24],
  lami:                 [0, 2, 6, 10, 14, 16, 20, 24],
  athar_kurd:           [0, 2, 6, 10, 14, 16, 20, 24],

  // sikah family branches
  huzam:                [0, 3, 7, 10, 14, 17, 20, 24],
  rahat_al_arwah:       [0, 3, 7, 10, 14, 17, 20, 24],
  iraq:                 [0, 3, 7, 10, 14, 17, 20, 24],
  awj_iraq:             [0, 3, 7, 10, 14, 17, 20, 24],
  basta_nikar:          [0, 3, 7, 10, 14, 17, 20, 24],
  mustaar:              [0, 3, 7, 10, 14, 17, 20, 24],
  farahnak:             [0, 3, 7, 10, 14, 17, 20, 24],
  shaar:                [0, 3, 7, 10, 14, 17, 20, 24],
  rahat_faza:           [0, 3, 7, 10, 14, 17, 20, 24],

  // saba family branches
  saba_jadid:           [0, 3, 6, 8, 14, 16, 20, 24],
  zamzama:              [0, 2, 6, 8, 14, 16, 20, 24],

  // nawa athar family branches
  nikriz:               [0, 4, 6, 12, 14, 16, 20, 24],
  basandida:            [0, 4, 6, 12, 14, 16, 20, 24]
};

/* ============================================================
   Per-maqam interactive config
============================================================ */

const INTERACTIVE_MAQAM_DATA = {
  // rast
  rast:                 maqamConfig("rast", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  suznak:               maqamConfig("suznak", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  mahur:                maqamConfig("mahur", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  nairuz:               maqamConfig("nairuz", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  bashayer:             maqamConfig("bashayer", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  sazkar:               maqamConfig("sazkar", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  dalanshin:            maqamConfig("dalanshin", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // bayati
  bayati:               maqamConfig("bayati", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  bayati_shuri:         maqamConfig("bayati_shuri", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  husayni:              maqamConfig("husayni", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  muhayyar:             maqamConfig("muhayyar", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  bayatin:              maqamConfig("bayatin", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  nahuft:               maqamConfig("nahuft", "standard", "la", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // ajam
  ajam:                 maqamConfig("ajam", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  ajam_ushayran:        maqamConfig("ajam_ushayran", "standard", "si_flat", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  shawq_afza:           maqamConfig("shawq_afza", "standard", "si_flat", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  suznal:               maqamConfig("suznal", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  ajam_murassa:         maqamConfig("ajam_murassa", "standard", "si_flat", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  jaharkah:             maqamConfig("jaharkah", "standard", "fa", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // hijaz
  hijaz:                maqamConfig("hijaz", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  hijazkar:             maqamConfig("hijazkar", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  shadd_araban:         maqamConfig("shadd_araban", "standard", "sol", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  suzdil:               maqamConfig("suzdil", "standard", "la", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  shahnaz:              maqamConfig("shahnaz", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  hijazayn:             maqamConfig("hijazayn", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  zanjaran:             maqamConfig("zanjaran", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  hijaz_ajami:          maqamConfig("hijaz_ajami", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // nahawand
  nahawand:             maqamConfig("nahawand", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  nahawand_murassa:     maqamConfig("nahawand_murassa", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  ushshaq_masri:        maqamConfig("ushshaq_masri", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  tarz_jadid:           maqamConfig("tarz_jadid", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  nahawand_kabir:       maqamConfig("nahawand_kabir", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  nahawand_kurdi:       maqamConfig("nahawand_kurdi", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // kurd
  kurd:                 maqamConfig("kurd", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  tarz_nawin:           maqamConfig("tarz_nawin", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  shahnaz_kurdi:        maqamConfig("shahnaz_kurdi", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  lami:                 maqamConfig("lami", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  athar_kurd:           maqamConfig("athar_kurd", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // sikah
  sikah:                maqamConfig("sikah", "half_flat_only", "mi_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  huzam:                maqamConfig("huzam", "half_flat_only", "mi_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  rahat_al_arwah:       maqamConfig("rahat_al_arwah", "half_flat_only", "si_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  iraq:                 maqamConfig("iraq", "half_flat_only", "si_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  awj_iraq:             maqamConfig("awj_iraq", "half_flat_only", "si_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  basta_nikar:          maqamConfig("basta_nikar", "half_flat_only", "si_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  mustaar:              maqamConfig("mustaar", "half_flat_only", "mi_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  farahnak:             maqamConfig("farahnak", "half_flat_only", "si_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  shaar:                maqamConfig("shaar", "half_flat_only", "mi_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),
  rahat_faza:           maqamConfig("rahat_faza", "half_flat_only", "mi_half_flat", [...INTERACTIVE_TONIC_ORDER_HALF_FLAT], [1, 3], [4, 8], 4),

  // saba
  saba:                 maqamConfig("saba", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  saba_jadid:           maqamConfig("saba_jadid", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),
  zamzama:              maqamConfig("zamzama", "standard", "re", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 4], [5, 8], 4),

  // nawa athar
  nawa_athar:           maqamConfig("nawa_athar", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 5], [5, 8], 4),
  nikriz:               maqamConfig("nikriz", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 5], [5, 8], 4),
  basandida:            maqamConfig("basandida", "standard", "do", [...INTERACTIVE_TONIC_ORDER_STANDARD], [1, 5], [5, 8], 4)
};

function maqamConfig(formula_key, tonic_mode, default_tonic, available_tonics, lower_jins_degree_range, upper_jins_degree_range, playback_octave_base) {
  return {
    formula_key,
    tonic_mode,
    default_tonic,
    available_tonics,
    lower_jins_degree_range,
    upper_jins_degree_range,
    playback_octave_base
  };
}

/* ============================================================
   Helpers
============================================================ */

function getInteractiveFormulaKey(maqamId) {
  const config = INTERACTIVE_MAQAM_DATA[maqamId];
  return config ? config.formula_key : null;
}

function getInteractiveFormula(maqamId) {
  const formulaKey = getInteractiveFormulaKey(maqamId);
  return formulaKey ? (INTERACTIVE_FORMULA_LIBRARY[formulaKey] || null) : null;
}

function getInteractiveConfig(maqamId) {
  return INTERACTIVE_MAQAM_DATA[maqamId] || null;
}

function getInteractiveTonicsForMaqam(maqamId) {
  const config = getInteractiveConfig(maqamId);
  return config ? config.available_tonics : [];
}

function getInteractiveDefaultTonic(maqamId) {
  const config = getInteractiveConfig(maqamId);
  return config ? config.default_tonic : null;
}

function getQuarterBaseForTonic(tonic) {
  return INTERACTIVE_TONIC_META[tonic] ? INTERACTIVE_TONIC_META[tonic].quarter_base : null;
}

function getCanonicalInteractiveNoteForTonic(tonic) {
  return INTERACTIVE_TONIC_META[tonic] ? INTERACTIVE_TONIC_META[tonic].canonical_note : null;
}

function getAllowedCanonicalSpellingsForQuarter(mod24) {
  const key = ((mod24 % 24) + 24) % 24;
  return QUARTER_TO_ALLOWED_NOTES[key] || [];
}

function getQuarterForCanonicalNote(note) {
  return Object.prototype.hasOwnProperty.call(CANONICAL_NOTE_TO_QUARTER, note)
    ? CANONICAL_NOTE_TO_QUARTER[note]
    : null;
}
