// data/interactive-maqamat.js
// Corrected generic interactive maqam data layer
// Aligned with the corrected data/maqamat.js structure.
//
// Purpose:
// - hold transposition-ready maqam formulas
// - define which maqam uses which interval model
// - support dynamic display names by tonic through data/maqamat.js
//
// Notes:
// 1) This file is formula-based, not hardcoded tonic-by-tonic note lists.
// 2) Quarter-tone math:
//    whole tone = 4
//    semitone   = 2
//    half-flat / half-sharp adjustment = 1
//    octave     = 24
// 3) Exact branch formulas can be refined later when you send the final note data.
// 4) Right now this file is corrected structurally to match the new families.

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
  do:            { label_ar: "دو",           label_en: "C",    pitch_class: 0,  accidental: null,         family_mode: "standard" },
  re:            { label_ar: "ري",           label_en: "D",    pitch_class: 2,  accidental: null,         family_mode: "standard" },
  mi_flat:       { label_ar: "مي بيمول",     label_en: "Eb",   pitch_class: 3,  accidental: "flat",       family_mode: "standard" },
  fa:            { label_ar: "فا",           label_en: "F",    pitch_class: 5,  accidental: null,         family_mode: "standard" },
  sol:           { label_ar: "صول",          label_en: "G",    pitch_class: 7,  accidental: null,         family_mode: "standard" },
  la_flat:       { label_ar: "لا بيمول",     label_en: "Ab",   pitch_class: 8,  accidental: "flat",       family_mode: "standard" },
  la:            { label_ar: "لا",           label_en: "A",    pitch_class: 9,  accidental: null,         family_mode: "standard" },
  si_flat:       { label_ar: "سي بيمول",     label_en: "Bb",   pitch_class: 10, accidental: "flat",       family_mode: "standard" },
  si:            { label_ar: "سي",           label_en: "B",    pitch_class: 11, accidental: null,         family_mode: "standard" },

  mi_half_flat:  { label_ar: "مي نصف بيمول", label_en: "E♭½",  pitch_class: 4,  accidental: "half_flat",  family_mode: "half_flat_only" },
  la_half_flat:  { label_ar: "لا نصف بيمول", label_en: "A♭½",  pitch_class: 9,  accidental: "half_flat",  family_mode: "half_flat_only" },
  si_half_flat:  { label_ar: "سي نصف بيمول", label_en: "B♭½",  pitch_class: 11, accidental: "half_flat",  family_mode: "half_flat_only" }
};

// Formula library in quarter-tone offsets from tonic
// degree 1 = 0
// degree 8 = 24
const INTERACTIVE_FORMULA_LIBRARY = {
  // Main core families
  rast:                 [0, 4, 7, 10, 14, 18, 21, 24],
  bayati:               [0, 3, 7, 10, 14, 17, 21, 24],
  ajam:                 [0, 4, 8, 10, 14, 18, 22, 24],
  hijaz:                [0, 2, 6, 10, 14, 16, 20, 24],
  nahawand:             [0, 4, 6, 10, 14, 16, 20, 24],
  kurd:                 [0, 2, 6, 10, 14, 16, 20, 24],
  sikah:                [0, 3, 6, 10, 14, 17, 20, 24],
  saba:                 [0, 3, 6, 8, 14, 16, 20, 24],
  nawa_athar:           [0, 4, 6, 10, 12, 16, 20, 24],

  // Rast family branches
  suznak:               [0, 4, 7, 10, 14, 16, 20, 24],
  mahur:                [0, 4, 8, 10, 14, 18, 22, 24],
  nairuz:               [0, 4, 7, 10, 14, 16, 20, 24],
  bashayer:             [0, 4, 7, 10, 14, 18, 20, 24],
  sazkar:               [0, 4, 7, 10, 14, 16, 20, 24],
  dalanshin:            [0, 4, 7, 10, 14, 16, 21, 24],

  // Bayati family branches
  bayati_shuri:         [0, 3, 7, 10, 14, 16, 20, 24],
  husayni:              [0, 3, 7, 10, 14, 17, 21, 24],
  muhayyar:             [0, 3, 7, 10, 14, 17, 21, 24],
  bayatin:              [0, 3, 7, 10, 14, 17, 21, 24],
  nahuft:               [0, 4, 6, 10, 14, 16, 20, 24],

  // Ajam family branches
  ajam_ushayran:        [0, 4, 8, 10, 14, 18, 22, 24],
  shawq_afza:           [0, 4, 8, 10, 14, 18, 22, 24],
  suznal:               [0, 4, 8, 10, 14, 16, 20, 24],
  ajam_murassa:         [0, 4, 8, 10, 14, 17, 21, 24],
  jaharkah:             [0, 4, 8, 10, 14, 18, 22, 24],

  // Hijaz family branches
  hijazkar:             [0, 2, 6, 10, 14, 18, 22, 24],
  shadd_araban:         [0, 2, 6, 10, 14, 16, 20, 24],
  suzdil:               [0, 2, 6, 10, 14, 16, 20, 24],
  shahnaz:              [0, 2, 6, 10, 14, 16, 20, 24],
  hijazayn:             [0, 2, 6, 10, 14, 16, 20, 24],
  zanjaran:             [0, 2, 6, 10, 14, 16, 20, 24],
  hijaz_ajami:          [0, 2, 6, 10, 14, 18, 22, 24],

  // Nahawand family branches
  nahawand_murassa:     [0, 4, 6, 10, 14, 17, 21, 24],
  ushshaq_masri:        [0, 4, 6, 10, 14, 17, 21, 24],
  tarz_jadid:           [0, 4, 6, 10, 14, 16, 20, 24],
  nahawand_kabir:       [0, 4, 6, 10, 14, 18, 22, 24],
  nahawand_kurdi:       [0, 2, 6, 10, 14, 16, 20, 24],

  // Kurd family branches
  tarz_nawin:           [0, 2, 6, 10, 14, 16, 20, 24],
  shahnaz_kurdi:        [0, 2, 6, 10, 14, 16, 20, 24],
  lami:                 [0, 2, 6, 10, 14, 16, 20, 24],
  athar_kurd:           [0, 2, 6, 10, 14, 16, 20, 24],

  // Sikah family branches
  huzam:                [0, 3, 6, 10, 14, 17, 20, 24],
  rahat_al_arwah:       [0, 3, 6, 10, 14, 17, 20, 24],
  iraq:                 [0, 3, 6, 10, 14, 17, 20, 24],
  awj_iraq:             [0, 3, 6, 10, 14, 17, 20, 24],
  basta_nikar:          [0, 3, 6, 10, 14, 17, 20, 24],
  mustaar:              [0, 3, 6, 10, 14, 17, 20, 24],
  farahnak:             [0, 3, 6, 10, 14, 17, 20, 24],
  shaar:                [0, 3, 6, 10, 14, 17, 20, 24],
  rahat_faza:           [0, 3, 6, 10, 14, 17, 20, 24],

  // Saba family branches
  saba_jadid:           [0, 3, 6, 8, 14, 16, 20, 24],
  zamzama:              [0, 2, 6, 8, 14, 16, 20, 24],

  // Nawa Athar family branches
  nikriz:               [0, 4, 6, 10, 12, 16, 20, 24],
  basandida:            [0, 4, 6, 10, 12, 16, 20, 24]
};

const INTERACTIVE_MAQAM_DATA = {
  // Rast family
  rast: {
    formula_key: "rast",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  suznak: {
    formula_key: "suznak",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  mahur: {
    formula_key: "mahur",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  nairuz: {
    formula_key: "nairuz",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  bashayer: {
    formula_key: "bashayer",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  sazkar: {
    formula_key: "sazkar",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  dalanshin: {
    formula_key: "dalanshin",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Bayati family
  bayati: {
    formula_key: "bayati",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  bayati_shuri: {
    formula_key: "bayati_shuri",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  husayni: {
    formula_key: "husayni",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  muhayyar: {
    formula_key: "muhayyar",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  bayatin: {
    formula_key: "bayatin",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  nahuft: {
    formula_key: "nahuft",
    tonic_mode: "standard",
    default_tonic: "la",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Ajam family
  ajam: {
    formula_key: "ajam",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  ajam_ushayran: {
    formula_key: "ajam_ushayran",
    tonic_mode: "standard",
    default_tonic: "si_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  shawq_afza: {
    formula_key: "shawq_afza",
    tonic_mode: "standard",
    default_tonic: "si_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  suznal: {
    formula_key: "suznal",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  ajam_murassa: {
    formula_key: "ajam_murassa",
    tonic_mode: "standard",
    default_tonic: "si_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  jaharkah: {
    formula_key: "jaharkah",
    tonic_mode: "standard",
    default_tonic: "fa",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Hijaz family
  hijaz: {
    formula_key: "hijaz",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  hijazkar: {
    formula_key: "hijazkar",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  shadd_araban: {
    formula_key: "shadd_araban",
    tonic_mode: "standard",
    default_tonic: "sol",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  suzdil: {
    formula_key: "suzdil",
    tonic_mode: "standard",
    default_tonic: "la",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  shahnaz: {
    formula_key: "shahnaz",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  hijazayn: {
    formula_key: "hijazayn",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  zanjaran: {
    formula_key: "zanjaran",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  hijaz_ajami: {
    formula_key: "hijaz_ajami",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Nahawand family
  nahawand: {
    formula_key: "nahawand",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  nahawand_murassa: {
    formula_key: "nahawand_murassa",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  ushshaq_masri: {
    formula_key: "ushshaq_masri",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  tarz_jadid: {
    formula_key: "tarz_jadid",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  nahawand_kabir: {
    formula_key: "nahawand_kabir",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  nahawand_kurdi: {
    formula_key: "nahawand_kurdi",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Kurd family
  kurd: {
    formula_key: "kurd",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  tarz_nawin: {
    formula_key: "tarz_nawin",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  shahnaz_kurdi: {
    formula_key: "shahnaz_kurdi",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  lami: {
    formula_key: "lami",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  athar_kurd: {
    formula_key: "athar_kurd",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Sikah family
  sikah: {
    formula_key: "sikah",
    tonic_mode: "half_flat_only",
    default_tonic: "mi_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  huzam: {
    formula_key: "huzam",
    tonic_mode: "half_flat_only",
    default_tonic: "mi_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  rahat_al_arwah: {
    formula_key: "rahat_al_arwah",
    tonic_mode: "half_flat_only",
    default_tonic: "si_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  iraq: {
    formula_key: "iraq",
    tonic_mode: "half_flat_only",
    default_tonic: "si_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  awj_iraq: {
    formula_key: "awj_iraq",
    tonic_mode: "half_flat_only",
    default_tonic: "si_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  basta_nikar: {
    formula_key: "basta_nikar",
    tonic_mode: "half_flat_only",
    default_tonic: "si_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  mustaar: {
    formula_key: "mustaar",
    tonic_mode: "half_flat_only",
    default_tonic: "mi_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  farahnak: {
    formula_key: "farahnak",
    tonic_mode: "half_flat_only",
    default_tonic: "si_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  shaar: {
    formula_key: "shaar",
    tonic_mode: "half_flat_only",
    default_tonic: "mi_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },
  rahat_faza: {
    formula_key: "rahat_faza",
    tonic_mode: "half_flat_only",
    default_tonic: "mi_half_flat",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_HALF_FLAT],
    lower_jins_degree_range: [1, 3],
    upper_jins_degree_range: [4, 8],
    playback_octave_base: 4
  },

  // Saba family
  saba: {
    formula_key: "saba",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  saba_jadid: {
    formula_key: "saba_jadid",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  zamzama: {
    formula_key: "zamzama",
    tonic_mode: "standard",
    default_tonic: "re",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 4],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },

  // Nawa Athar family
  nawa_athar: {
    formula_key: "nawa_athar",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 5],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  nikriz: {
    formula_key: "nikriz",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 5],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  },
  basandida: {
    formula_key: "basandida",
    tonic_mode: "standard",
    default_tonic: "do",
    available_tonics: [...INTERACTIVE_TONIC_ORDER_STANDARD],
    lower_jins_degree_range: [1, 5],
    upper_jins_degree_range: [5, 8],
    playback_octave_base: 4
  }
};

function getInteractiveFormulaKey(maqamId) {
  const config = INTERACTIVE_MAQAM_DATA[maqamId];
  return config ? config.formula_key : null;
}

function getInteractiveFormula(maqamId) {
  const formulaKey = getInteractiveFormulaKey(maqamId);
  return formulaKey ? INTERACTIVE_FORMULA_LIBRARY[formulaKey] || null : null;
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
