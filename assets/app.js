const list = document.getElementById('list');
const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');

function render(data) {
  list.innerHTML = '';

  data.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.composer}</p>
      <p>${s.system === 'arabic' ? (s.maqam || '') : (s.scale || '')}</p>
    `;

    list.appendChild(div);
  });
}

function applyFilters() {
  let filtered = sheets;

  // system filter
  const systemVal = systemSelect.value;

  if (systemVal === 'نوتات شرقية') {
    filtered = filtered.filter(s => s.system === 'arabic');
  } else {
    filtered = filtered.filter(s => s.system === 'western');
  }

  // type filter
  const typeVal = typeSelect.value;

  if (typeVal === 'أغنية') {
    filtered = filtered.filter(s => s.type === 'song');
  } else if (typeVal === 'معزوفة') {
    filtered = filtered.filter(s => s.type === 'instrumental');
  }

  render(filtered);
}

// listeners
systemSelect.addEventListener('change', applyFilters);
typeSelect.addEventListener('change', applyFilters);

// initial load
applyFilters();
