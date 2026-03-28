// data/maqamat.js
// Generic maqamat structure for the interactive maqam system
// This file contains:
// - families
// - main maqamat
// - real branch maqamat
// - tonic rules
// - display-name changes by tonic only where explicitly needed

const STANDARD_TONICS = [
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

const HALF_FLAT_TONICS = [
  "mi_half_flat",
  "la_half_flat",
  "si_half_flat"
];

const TONIC_LABELS_AR = {
  do: "دو",
  re: "ري",
  mi_flat: "مي بيمول",
  fa: "فا",
  sol: "صول",
  la_flat: "لا بيمول",
  la: "لا",
  si_flat: "سي بيمول",
  si: "سي",
  mi_half_flat: "مي نصف بيمول",
  la_half_flat: "لا نصف بيمول",
  si_half_flat: "سي نصف بيمول"
};

const maqamat = [
  // ========================================
  // RAST FAMILY
  // ========================================
  {
    id: "rast",
    family: "rast",
    family_main_id: "rast",
    family_order: 1,
    name: "راست",
    latin: "Rast",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      do: "راست"
    },
    branch_ids: ["suzdilara", "nairuz", "yakah"],
    description: ""
  },
  {
    id: "suzdilara",
    family: "rast",
    family_main_id: "rast",
    family_order: 2,
    name: "سوزدلارا",
    latin: "Suzdilara",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "nairuz",
    family: "rast",
    family_main_id: "rast",
    family_order: 3,
    name: "نيروز",
    latin: "Nairuz",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "yakah",
    family: "rast",
    family_main_id: "rast",
    family_order: 4,
    name: "يكاه",
    latin: "Yakah",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "sol",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // BAYATI FAMILY
  // ========================================
  {
    id: "bayati",
    family: "bayati",
    family_main_id: "bayati",
    family_order: 1,
    name: "بياتي",
    latin: "Bayati",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      re: "بياتي"
    },
    branch_ids: ["bayati_shuri", "husayni", "muhayyar", "bayatin", "nahuft"],
    description: ""
  },
  {
    id: "bayati_shuri",
    family: "bayati",
    family_main_id: "bayati",
    family_order: 2,
    name: "بياتي شوري",
    latin: "Bayati Shuri",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "husayni",
    family: "bayati",
    family_main_id: "bayati",
    family_order: 3,
    name: "حسيني",
    latin: "Husayni",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "muhayyar",
    family: "bayati",
    family_main_id: "bayati",
    family_order: 4,
    name: "محيّر",
    latin: "Muhayyar",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "bayatin",
    family: "bayati",
    family_main_id: "bayati",
    family_order: 5,
    name: "بياتين",
    latin: "Bayatin",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "nahuft",
    family: "bayati",
    family_main_id: "bayati",
    family_order: 6,
    name: "نهوفت",
    latin: "Nahuft",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "la",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // AJAM FAMILY
  // ========================================
  {
    id: "ajam",
    family: "ajam",
    family_main_id: "ajam",
    family_order: 1,
    name: "عجم",
    latin: "Ajam",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      do: "عجم"
    },
    branch_ids: ["ajam_ushayran", "shawq_afza", "suznal", "ajam_murassa", "jaharkah"],
    description: ""
  },
  {
    id: "ajam_ushayran",
    family: "ajam",
    family_main_id: "ajam",
    family_order: 2,
    name: "عجم عشيران",
    latin: "Ajam Ushayran",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "si_flat",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "shawq_afza",
    family: "ajam",
    family_main_id: "ajam",
    family_order: 3,
    name: "شوق افزا",
    latin: "Shawq Afza",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "si_flat",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "suznal",
    family: "ajam",
    family_main_id: "ajam",
    family_order: 4,
    name: "سوزنال",
    latin: "Suznal",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "ajam_murassa",
    family: "ajam",
    family_main_id: "ajam",
    family_order: 5,
    name: "عجم مرصّع",
    latin: "Ajam Murassa",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "si_flat",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "jaharkah",
    family: "ajam",
    family_main_id: "ajam",
    family_order: 6,
    name: "جهاركاه",
    latin: "Jaharkah",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "fa",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // HIJAZ FAMILY
  // ========================================
  {
    id: "hijaz",
    family: "hijaz",
    family_main_id: "hijaz",
    family_order: 1,
    name: "حجاز",
    latin: "Hijaz",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      re: "شهناز",
      do: "حجازكار",
      sol: "شد عربان",
      la: "سوزدل"
    },
    branch_ids: ["hijazayn", "zanjaran", "hijaz_ajami"],
    description: ""
  },
  {
    id: "hijazayn",
    family: "hijaz",
    family_main_id: "hijaz",
    family_order: 2,
    name: "حجازين",
    latin: "Hijazayn",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "zanjaran",
    family: "hijaz",
    family_main_id: "hijaz",
    family_order: 3,
    name: "زنجران",
    latin: "Zanjaran",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "hijaz_ajami",
    family: "hijaz",
    family_main_id: "hijaz",
    family_order: 4,
    name: "حجاز عجمي",
    latin: "Hijaz Ajami",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // NAHAWAND FAMILY
  // ========================================
  {
    id: "nahawand",
    family: "nahawand",
    family_main_id: "nahawand",
    family_order: 1,
    name: "نهاوند",
    latin: "Nahawand",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      do: "نهاوند",
      sol: "سلطاني يكاه",
      re: "بوسليك جديد"
    },
    branch_ids: ["nahawand_murassa", "ushshaq_masri", "tarz_jadid", "nahawand_kabir", "nahawand_kurdi"],
    description: ""
  },
  {
    id: "nahawand_murassa",
    family: "nahawand",
    family_main_id: "nahawand",
    family_order: 2,
    name: "نهاوند مرصّع",
    latin: "Nahawand Murassa",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "ushshaq_masri",
    family: "nahawand",
    family_main_id: "nahawand",
    family_order: 3,
    name: "عشّاق مصري",
    latin: "Ushshaq Masri",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "tarz_jadid",
    family: "nahawand",
    family_main_id: "nahawand",
    family_order: 4,
    name: "طرز جديد",
    latin: "Tarz Jadid",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "nahawand_kabir",
    family: "nahawand",
    family_main_id: "nahawand",
    family_order: 5,
    name: "نهاوند كبير",
    latin: "Nahawand Kabir",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "nahawand_kurdi",
    family: "nahawand",
    family_main_id: "nahawand",
    family_order: 6,
    name: "نهاوند كردي",
    latin: "Nahawand Kurdi",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      do: "نهاوند كردي",
      re: "بوسليك",
      sol: "فرحفزا"
    },
    branch_ids: [],
    description: ""
  },

  // ========================================
  // KURD FAMILY
  // ========================================
  {
    id: "kurd",
    family: "kurd",
    family_main_id: "kurd",
    family_order: 1,
    name: "كرد",
    latin: "Kurd",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      re: "كرد",
      do: "كاركرد"
    },
    branch_ids: ["tarz_nawin", "shahnaz_kurdi", "lami", "athar_kurd"],
    description: ""
  },
  {
    id: "tarz_nawin",
    family: "kurd",
    family_main_id: "kurd",
    family_order: 2,
    name: "طرزنوين",
    latin: "Tarz Nawin",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "shahnaz_kurdi",
    family: "kurd",
    family_main_id: "kurd",
    family_order: 3,
    name: "شهناز كردي",
    latin: "Shahnaz Kurdi",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "lami",
    family: "kurd",
    family_main_id: "kurd",
    family_order: 4,
    name: "لامي",
    latin: "Lami",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "athar_kurd",
    family: "kurd",
    family_main_id: "kurd",
    family_order: 5,
    name: "أثركرد",
    latin: "Athar Kurd",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // SIKAH FAMILY
  // ========================================
  {
    id: "sikah",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 1,
    name: "سيكاه",
    latin: "Sikah",
    is_main: true,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "mi_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {
      mi_half_flat: "سيكاه"
    },
    branch_ids: [
      "huzam",
      "rahat_al_arwah",
      "iraq",
      "awj_iraq",
      "basta_nikar",
      "mustaar",
      "farahnak",
      "shaar",
      "rahat_faza"
    ],
    description: ""
  },
  {
    id: "huzam",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 2,
    name: "هزام",
    latin: "Huzam",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "mi_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "rahat_al_arwah",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 3,
    name: "راحة الأرواح",
    latin: "Rahat al-Arwah",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "si_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "iraq",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 4,
    name: "عراق",
    latin: "Iraq",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "si_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "awj_iraq",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 5,
    name: "أوج عراق",
    latin: "Awj Iraq",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "si_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "basta_nikar",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 6,
    name: "بسته نكار",
    latin: "Basta Nikar",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "si_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "mustaar",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 7,
    name: "مستعار",
    latin: "Mustaar",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "mi_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "farahnak",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 8,
    name: "فرحناك",
    latin: "Farahnak",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "si_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "shaar",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 9,
    name: "شعّار",
    latin: "Shaar",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "mi_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "rahat_faza",
    family: "sikah",
    family_main_id: "sikah",
    family_order: 10,
    name: "راحة فزا",
    latin: "Rahat Faza",
    is_main: false,
    interactive: true,
    tonic_mode: "half_flat_only",
    base_tonic: "mi_half_flat",
    available_tonics: [...HALF_FLAT_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // SABA FAMILY
  // ========================================
  {
    id: "saba",
    family: "saba",
    family_main_id: "saba",
    family_order: 1,
    name: "صبا",
    latin: "Saba",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      re: "صبا"
    },
    branch_ids: ["saba_jadid", "zamzama"],
    description: ""
  },
  {
    id: "saba_jadid",
    family: "saba",
    family_main_id: "saba",
    family_order: 2,
    name: "صبا جديد",
    latin: "Saba Jadid",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "zamzama",
    family: "saba",
    family_main_id: "saba",
    family_order: 3,
    name: "زمزمة",
    latin: "Zamzama",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "re",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },

  // ========================================
  // NAWA ATHAR FAMILY
  // ========================================
  {
    id: "nawa_athar",
    family: "nawa_athar",
    family_main_id: "nawa_athar",
    family_order: 1,
    name: "نواأثر",
    latin: "Nawa Athar",
    is_main: true,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {
      do: "نواأثر",
      re: "حصار"
    },
    branch_ids: ["nikriz", "basandida"],
    description: ""
  },
  {
    id: "nikriz",
    family: "nawa_athar",
    family_main_id: "nawa_athar",
    family_order: 2,
    name: "نكريز",
    latin: "Nikriz",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  },
  {
    id: "basandida",
    family: "nawa_athar",
    family_main_id: "nawa_athar",
    family_order: 3,
    name: "بصنديده",
    latin: "Basandida",
    is_main: false,
    interactive: true,
    tonic_mode: "standard",
    base_tonic: "do",
    available_tonics: [...STANDARD_TONICS],
    display_name_by_tonic: {},
    branch_ids: [],
    description: ""
  }
];

// ========================================
// Helpers
// ========================================

function getMaqamatByFamily(familyId) {
  return maqamat
    .filter(m => m.family === familyId)
    .sort((a, b) => (a.family_order || 999) - (b.family_order || 999));
}

function getInteractiveFamily(familyId) {
  return maqamat
    .filter(m => m.family === familyId && m.interactive)
    .sort((a, b) => (a.family_order || 999) - (b.family_order || 999));
}

function getMainMaqamat() {
  return maqamat.filter(m => m.is_main === true);
}

function getInteractiveMainMaqamat() {
  return maqamat.filter(m => m.is_main === true && m.interactive);
}

function getMaqamById(id) {
  return maqamat.find(m => m.id === id);
}

function getInteractiveMaqamById(id) {
  const maqam = getMaqamById(id);
  return maqam && maqam.interactive ? maqam : null;
}

function getFamilyMainMaqam(familyId) {
  return maqamat.find(m => m.family === familyId && m.is_main);
}

function getFamilyMainId(familyId) {
  const main = getFamilyMainMaqam(familyId);
  return main ? main.id : null;
}

function getFamilies() {
  return getMainMaqamat().map(m => ({
    id: m.family,
    maqam_id: m.id,
    name: m.name,
    latin: m.latin,
    interactive: m.interactive,
    tonic_mode: m.tonic_mode
  }));
}

function getAvailableTonicsForMaqam(maqamId) {
  const maqam = getMaqamById(maqamId);
  return maqam ? maqam.available_tonics : [];
}

function getDisplayNameForTonic(maqamId, tonic) {
  const maqam = getMaqamById(maqamId);
  if (!maqam) return "";

  if (maqam.display_name_by_tonic && maqam.display_name_by_tonic[tonic]) {
    return maqam.display_name_by_tonic[tonic];
  }

  return maqam.name;
}

function getTonicLabelAr(tonic) {
  return TONIC_LABELS_AR[tonic] || tonic;
}

function isHalfFlatOnlyMaqam(maqamId) {
  const maqam = getMaqamById(maqamId);
  return maqam ? maqam.tonic_mode === "half_flat_only" : false;
}

function isStandardTonicMaqam(maqamId) {
  const maqam = getMaqamById(maqamId);
  return maqam ? maqam.tonic_mode === "standard" : false;
}
