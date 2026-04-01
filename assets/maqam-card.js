// assets/maqam-card.js
// Shared maqam card helper.

function createMaqamCard(m) {
  const card = document.createElement('a');
  card.className = 'maqam-card';
  card.href = getMaqamRoute(m.id) || 'maqamat.html';

  const feelings = m.feeling.slice(0, 3).map(f =>
    `<span class="feeling-tag">${f}</span>`
  ).join('');

  card.innerHTML = `
    <div class="maqam-card-accent" style="background:${m.mood_color}22;border-color:${m.mood_color}44"></div>
    <div class="maqam-card-body">
      <div class="maqam-name-row">
        <h3 class="maqam-name">${m.name}</h3>
        <span class="maqam-latin">${m.latin}</span>
      </div>
      <p class="maqam-desc">${m.description.slice(0, 100)}...</p>
      <div class="maqam-feelings">${feelings}</div>
      <div class="maqam-footer">
        <span class="maqam-examples-count">${m.examples.length} أمثلة</span>
        <span class="maqam-arrow">←</span>
      </div>
    </div>`;

  return card;
}
