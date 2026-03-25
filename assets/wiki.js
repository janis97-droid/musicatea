// ============================================================
//  wiki.js — Wiki page logic for Musicatea
//  Depends on: data/maqamat.js, data/history.js, assets/ui.js
// ============================================================
 
// ===== Maqam search =====
const wikiSearchInput = document.getElementById('wiki-search');
const maqamatGrid = document.getElementById('maqamat-grid');
const historyList  = document.getElementById('history-list');
 
function renderMaqamat(filter) {
  maqamatGrid.innerHTML = '';
  const q = normalize(filter || '');
  const filtered = maqamat.filter(m =>
    !q ||
    normalize(m.name).includes(q) ||
    normalize(m.latin).includes(q) ||
    m.feeling.some(f => normalize(f).includes(q))
  );
 
  if (!filtered.length) {
    maqamatGrid.appendChild(createEmptyState('لا توجد مقامات مطابقة'));
    return;
  }
 
  filtered.forEach(m => maqamatGrid.appendChild(createMaqamCard(m)));
}
 
function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));
}
 
// ===== Init =====
if (wikiSearchInput) {
  wikiSearchInput.addEventListener('input', e => renderMaqamat(e.target.value));
}
 
renderMaqamat();
renderHistory();
