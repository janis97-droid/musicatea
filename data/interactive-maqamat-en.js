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

function getEnglishMaqamById(id) {
  return typeof getMaqamById === 'function' ? getMaqamById(id) : null;
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
  const normalizedFamilyId = mapEnFamilyIdToInteractive(familyId);
  return maqamat.filter(m => m.family === mapInteractiveFamilyIdToEn(normalizedFamilyId));
}

function getInteractiveMainMaqamatEn() {
  return maqamat.filter(m => m.is_main);
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
