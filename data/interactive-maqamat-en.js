// data/interactive-maqamat-en.js
// English adapter for the interactive maqam layer.
// Keeps Arabic interactive formulas/audio math, while exposing English IDs and labels.

const EN_TO_INTERACTIVE_MAQAM_ID = {
  bayat: 'bayati'
};

const EN_TO_INTERACTIVE_FAMILY_ID = {
  bayat: 'bayati'
};

const INTERACTIVE_TO_EN_MAQAM_ID = {
  bayati: 'bayat'
};

const INTERACTIVE_TO_EN_FAMILY_ID = {
  bayati: 'bayat'
};

const CANONICAL_INTERACTIVE_MAQAM_META_EN = [
  { id: 'rast', family: 'rast', family_order: 1, is_main: true, name: 'Rast', latin: 'Rast' },
  { id: 'suznak', family: 'rast', family_order: 2, is_main: false, name: 'Suznak', latin: 'Suznak' },
  { id: 'mahur', family: 'rast', family_order: 3, is_main: false, name: 'Mahur', latin: 'Mahur' },
  { id: 'nairuz', family: 'rast', family_order: 4, is_main: false, name: 'Nairuz', latin: 'Nairuz' },
  { id: 'bashayer', family: 'rast', family_order: 5, is_main: false, name: 'Bashayer', latin: 'Bashayer' },
  { id: 'sazkar', family: 'rast', family_order: 6, is_main: false, name: 'Sazkar', latin: 'Sazkar' },
  { id: 'dalanshin', family: 'rast', family_order: 7, is_main: false, name: 'Dalanshin', latin: 'Dalanshin' },

  { id: 'bayat', family: 'bayat', family_order: 1, is_main: true, name: 'Bayati', latin: 'Bayati' },
  { id: 'bayati_shuri', family: 'bayat', family_order: 2, is_main: false, name: 'Bayati Shuri', latin: 'Bayati Shuri' },
  { id: 'husayni', family: 'bayat', family_order: 3, is_main: false, name: 'Husayni', latin: 'Husayni' },
  { id: 'muhayyar', family: 'bayat', family_order: 4, is_main: false, name: 'Muhayyar', latin: 'Muhayyar' },
  { id: 'bayatin', family: 'bayat', family_order: 5, is_main: false, name: 'Bayatin', latin: 'Bayatin' },
  { id: 'nahuft', family: 'bayat', family_order: 6, is_main: false, name: 'Nahuft', latin: 'Nahuft' },

  { id: 'ajam', family: 'ajam', family_order: 1, is_main: true, name: 'Ajam', latin: 'Ajam' },
  { id: 'ajam_ushayran', family: 'ajam', family_order: 2, is_main: false, name: 'Ajam Ushayran', latin: 'Ajam Ushayran' },
  { id: 'shawq_afza', family: 'ajam', family_order: 3, is_main: false, name: 'Shawq Afza', latin: 'Shawq Afza' },
  { id: 'suznal', family: 'ajam', family_order: 4, is_main: false, name: 'Suznal', latin: 'Suznal' },
  { id: 'ajam_murassa', family: 'ajam', family_order: 5, is_main: false, name: 'Ajam Murassa', latin: 'Ajam Murassa' },
  { id: 'jaharkah', family: 'ajam', family_order: 6, is_main: false, name: 'Jaharkah', latin: 'Jaharkah' },

  { id: 'hijaz', family: 'hijaz', family_order: 1, is_main: true, name: 'Hijaz', latin: 'Hijaz' },
  { id: 'hijazkar', family: 'hijaz', family_order: 2, is_main: false, name: 'Hijazkar', latin: 'Hijazkar' },
  { id: 'shadd_araban', family: 'hijaz', family_order: 3, is_main: false, name: 'Shadd Araban', latin: 'Shadd Araban' },
  { id: 'suzdil', family: 'hijaz', family_order: 4, is_main: false, name: 'Suzdil', latin: 'Suzdil' },
  { id: 'shahnaz', family: 'hijaz', family_order: 5, is_main: false, name: 'Shahnaz', latin: 'Shahnaz' },
  { id: 'hijazayn', family: 'hijaz', family_order: 6, is_main: false, name: 'Hijazayn', latin: 'Hijazayn' },
  { id: 'zanjaran', family: 'hijaz', family_order: 7, is_main: false, name: 'Zanjaran', latin: 'Zanjaran' },
  { id: 'hijaz_ajami', family: 'hijaz', family_order: 8, is_main: false, name: 'Hijaz Ajami', latin: 'Hijaz Ajami' },

  { id: 'nahawand', family: 'nahawand', family_order: 1, is_main: true, name: 'Nahawand', latin: 'Nahawand' },
  { id: 'nahawand_murassa', family: 'nahawand', family_order: 2, is_main: false, name: 'Nahawand Murassa', latin: 'Nahawand Murassa' },
  { id: 'ushshaq_masri', family: 'nahawand', family_order: 3, is_main: false, name: 'Ushshaq Masri', latin: 'Ushshaq Masri' },
  { id: 'tarz_jadid', family: 'nahawand', family_order: 4, is_main: false, name: 'Tarz Jadid', latin: 'Tarz Jadid' },
  { id: 'nahawand_kabir', family: 'nahawand', family_order: 5, is_main: false, name: 'Nahawand Kabir', latin: 'Nahawand Kabir' },
  { id: 'nahawand_kurdi', family: 'nahawand', family_order: 6, is_main: false, name: 'Nahawand Kurdi', latin: 'Nahawand Kurdi' },

  { id: 'kurd', family: 'kurd', family_order: 1, is_main: true, name: 'Kurd', latin: 'Kurd' },
  { id: 'tarz_nawin', family: 'kurd', family_order: 2, is_main: false, name: 'Tarz Nawin', latin: 'Tarz Nawin' },
  { id: 'shahnaz_kurdi', family: 'kurd', family_order: 3, is_main: false, name: 'Shahnaz Kurdi', latin: 'Shahnaz Kurdi' },
  { id: 'lami', family: 'kurd', family_order: 4, is_main: false, name: 'Lami', latin: 'Lami' },
  { id: 'athar_kurd', family: 'kurd', family_order: 5, is_main: false, name: 'Athar Kurd', latin: 'Athar Kurd' },

  { id: 'sikah', family: 'sikah', family_order: 1, is_main: true, name: 'Sikah', latin: 'Sikah' },
  { id: 'huzam', family: 'sikah', family_order: 2, is_main: false, name: 'Huzam', latin: 'Huzam' },
  { id: 'rahat_al_arwah', family: 'sikah', family_order: 3, is_main: false, name: 'Rahat al-Arwah', latin: 'Rahat al-Arwah' },
  { id: 'iraq', family: 'sikah', family_order: 4, is_main: false, name: 'Iraq', latin: 'Iraq' },
  { id: 'awj_iraq', family: 'sikah', family_order: 5, is_main: false, name: 'Awj Iraq', latin: 'Awj Iraq' },
  { id: 'basta_nikar', family: 'sikah', family_order: 6, is_main: false, name: 'Basta Nikar', latin: 'Basta Nikar' },
  { id: 'mustaar', family: 'sikah', family_order: 7, is_main: false, name: 'Mustaar', latin: 'Mustaar' },
  { id: 'farahnak', family: 'sikah', family_order: 8, is_main: false, name: 'Farahnak', latin: 'Farahnak' },
  { id: 'shaar', family: 'sikah', family_order: 9, is_main: false, name: 'Shaar', latin: 'Shaar' },
  { id: 'rahat_faza', family: 'sikah', family_order: 10, is_main: false, name: 'Rahat Faza', latin: 'Rahat Faza' },

  { id: 'saba', family: 'saba', family_order: 1, is_main: true, name: 'Saba', latin: 'Saba' },
  { id: 'saba_jadid', family: 'saba', family_order: 2, is_main: false, name: 'Saba Jadid', latin: 'Saba Jadid' },
  { id: 'zamzama', family: 'saba', family_order: 3, is_main: false, name: 'Zamzama', latin: 'Zamzama' },

  { id: 'nawa_athar', family: 'nawa_athar', family_order: 1, is_main: true, name: 'Nawa Athar', latin: 'Nawa Athar' },
  { id: 'nikriz', family: 'nawa_athar', family_order: 2, is_main: false, name: 'Nikriz', latin: 'Nikriz' },
  { id: 'basandida', family: 'nawa_athar', family_order: 3, is_main: false, name: 'Basandida', latin: 'Basandida' }
];

function mapEnMaqamIdToInteractive(maqamId) {
  return EN_TO_INTERACTIVE_MAQAM_ID[maqamId] || maqamId;
}

function mapInteractiveMaqamIdToEn(maqamId) {
  return INTERACTIVE_TO_EN_MAQAM_ID[maqamId] || maqamId;
}

function mapEnFamilyIdToInteractive(familyId) {
  return EN_TO_INTERACTIVE_FAMILY_ID[familyId] || familyId;
}

function mapInteractiveFamilyIdToEn(familyId) {
  return INTERACTIVE_TO_EN_FAMILY_ID[familyId] || familyId;
}

function getTonicLabelEn(tonic) {
  return INTERACTIVE_TONIC_META[tonic] ? INTERACTIVE_TONIC_META[tonic].label_en : tonic;
}

function getCanonicalInteractiveMetaEn(id) {
  return CANONICAL_INTERACTIVE_MAQAM_META_EN.find(m => m.id === id) || null;
}

function getEnglishMaqamById(id) {
  return (typeof getMaqamById === 'function' ? getMaqamById(id) : null) || getCanonicalInteractiveMetaEn(id);
}

function getInteractiveConfigEn(maqamId) {
  return getInteractiveConfig(mapEnMaqamIdToInteractive(maqamId));
}

function getInteractiveFormulaEn(maqamId) {
  return getInteractiveFormula(mapEnMaqamIdToInteractive(maqamId));
}

function getInteractiveTonicsForMaqamEn(maqamId) {
  return getInteractiveTonicsForMaqam(mapEnMaqamIdToInteractive(maqamId));
}

function getInteractiveDefaultTonicEn(maqamId) {
  return getInteractiveDefaultTonic(mapEnMaqamIdToInteractive(maqamId));
}

function getInteractiveFamilyEn(familyId) {
  return CANONICAL_INTERACTIVE_MAQAM_META_EN
    .filter(m => m.family === familyId)
    .sort((a, b) => (a.family_order || 999) - (b.family_order || 999));
}

function getInteractiveMainMaqamatEn() {
  return CANONICAL_INTERACTIVE_MAQAM_META_EN.filter(m => m.is_main === true);
}

function getFamilyMainMaqamEn(familyId) {
  return getInteractiveFamilyEn(familyId).find(m => m.is_main) || null;
}

function resolveInteractiveRepresentativeSelectionEn(maqamId, tonic) {
  const resolvedMaqamId = mapInteractiveMaqamIdToEn(mapEnMaqamIdToInteractive(maqamId));
  const resolvedTonic = tonic || getInteractiveDefaultTonicEn(resolvedMaqamId);
  return {
    maqamId: resolvedMaqamId,
    tonic: resolvedTonic
  };
}

function getDisplayNameForTonicEn(maqamId, tonic) {
  const maqam = getEnglishMaqamById(maqamId);
  if (!maqam) return '';
  const tonicLabel = getTonicLabelEn(tonic);
  return tonicLabel ? `${maqam.name} on ${tonicLabel}` : maqam.name;
}

function getLatinDisplayNameForTonicEn(maqamId, tonic) {
  const maqam = getEnglishMaqamById(maqamId);
  if (!maqam) return '';
  const tonicLabel = getTonicLabelEn(tonic);
  return tonicLabel ? `${maqam.latin || maqam.name} — ${tonicLabel}` : (maqam.latin || maqam.name || '');
}
