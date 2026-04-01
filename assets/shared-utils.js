// assets/shared-utils.js
// Shared utility helpers for Musicatea pages.

function slugify(name) {
  if (typeof maqamat === 'undefined') return name;
  const found = maqamat.find(m => m.name === name);
  return found ? found.id : name;
}

function getMaqamObject(maqamRef) {
  if (typeof maqamat === 'undefined' || !maqamRef) return null;
  return maqamat.find(m => m.id === maqamRef || m.name === maqamRef) || null;
}

function getMaqamRoute(maqamRef) {
  const maqam = getMaqamObject(maqamRef);
  if (!maqam) return null;

  const params = new URLSearchParams();
  if (maqam.family) params.set('family', maqam.family);
  params.set('maqam', maqam.id);
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
