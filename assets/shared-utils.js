// assets/shared-utils.js
// Shared utility helpers for Musicatea pages.

const MAQAM_NAME_ALIASES = {
  'بيات': 'bayati',
  'بياتي': 'bayati',
  'سيكا': 'sikah',
  'سيكاه': 'sikah'
};

const ARABIC_TONIC_TO_ID = {
  'دو': 'do',
  'ري': 're',
  'مي': 'mi',
  'مي بيمول': 'mi_flat',
  'فا': 'fa',
  'صول': 'sol',
  'لا بيمول': 'la_flat',
  'لا': 'la',
  'سي بيمول': 'si_flat',
  'سي': 'si',
  'مي نصف بيمول': 'mi_half_flat',
  'لا نصف بيمول': 'la_half_flat',
  'سي نصف بيمول': 'si_half_flat'
};

function slugify(name) {
  if (typeof maqamat === 'undefined') return name;
  const found = maqamat.find(m => m.name === name);
  return found ? found.id : name;
}

function getMaqamAliasId(maqamRef) {
  const normalizedRef = String(maqamRef || '').trim();
  return MAQAM_NAME_ALIASES[normalizedRef] || null;
}

function getMaqamObject(maqamRef) {
  if (typeof maqamat === 'undefined' || !maqamRef) return null;

  const directMatch = maqamat.find(m => m.id === maqamRef || m.name === maqamRef);
  if (directMatch) return directMatch;

  const aliasId = getMaqamAliasId(maqamRef);
  if (!aliasId) return null;

  return maqamat.find(m => m.id === aliasId) || null;
}

function getInteractiveTonicIdFromArabic(tonicLabel) {
  return ARABIC_TONIC_TO_ID[String(tonicLabel || '').trim()] || null;
}

function buildInteractiveMaqamTagLabel(maqamLabel, tonicLabel) {
  const maqamText = String(maqamLabel || '').trim();
  const tonicText = String(tonicLabel || '').trim();
  if (!maqamText) return tonicText;
  if (!tonicText) return maqamText;
  return `${maqamText} · ${tonicText}`;
}

function getMaqamRoute(maqamRef, tonicLabel) {
  const maqam = getMaqamObject(maqamRef);
  if (!maqam) return null;

  const params = new URLSearchParams();
  if (maqam.family) params.set('family', maqam.family);
  params.set('maqam', maqam.id);

  const tonicId = getInteractiveTonicIdFromArabic(tonicLabel);
  if (tonicId && Array.isArray(maqam.available_tonics) && maqam.available_tonics.includes(tonicId)) {
    params.set('tonic', tonicId);
  }

  return `interactive-scale.html?${params.toString()}`;
}

function createEmptyState(message) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <p>${message}</p>`;
  return div;
}

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u065F]/g, '');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
