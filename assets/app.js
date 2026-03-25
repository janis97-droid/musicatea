const list = document.getElementById('list');

const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');
const maqamSelect = document.getElementById('maqam');
const scaleSelect = document.getElementById('scale');
const tonicSelect = document.getElementById('tonic');
const searchInput = document.getElementById('search');

// ===== normalize Arabic text =====
function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ً|ٌ|ٍ|َ|ُ|ِ|ّ|ْ/g, "");
}

// ===== Render =====
function render(data) {
  list.innerHTML = '';

  data.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.composer}</p>
      <p>${s.system === 'arabic' ? (s.maqam || '') : (s.scale || '')}</p>
      <p>${s.tonic || ''}</p>
    `;

    list.appendChild(div);
  });
}

// ===== populate filters dynamically =====
function populateFilters() {
  maqamSelect.innerHTML = '<option value="">كل المقامات</option>';
  scaleSelect.innerHTML = '<option value="">All Scales</option>';
  tonicSelect.innerHTML = '<option value="">الدرجة</option>';

  const systemVal = systemSelect.value;

  let data = sheets;

  if (systemVal === 'نوتات شرقية') {
    data = sheets.filter(s => s.system === 'arabic');
  } else {
    data = sheets.filter(s => s.system === 'western');
  }

  const maqams = [...new Set(data.map(s => s.maqam).filter(Boolean))];
  const scales = [...new Set(data.map(s => s.scale).filter(Boolean))];
  const tonics = [...new Set(data.map(s => s.tonic).filter(Boolean))];

  maqams.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    maqamSelect.appendChild(opt);
  });

  scales.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    scaleSelect.appendChild(opt);
  });

  tonics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    tonicSelect.appendChild(opt);
  });
}

// ===== Filters =====
function applyFilters() {
  let filtered = sheets;

  const systemVal = systemSelect.value;
  const typeVal = typeSelect.value;
  const maqamVal = maqamSelect.value;
  const scaleVal = scaleSelect.value;
  const tonicVal = tonicSelect.value;
  const searchVal = normalize(searchInput.value);

  // system
  if (systemVal === 'نوتات شرقية') {
    filtered = filtered.filter(s => s.system === 'arabic');
    maqamSelect.style.display = 'inline';
    scaleSelect.style.display = 'none';
  } else {
    filtered = filtered.filter(s => s.system === 'western');
    maqamSelect.style.display = 'none';
    scaleSelect.style.display = 'inline';
  }

  // type
  if (typeVal === 'أغنية') {
    filtered = filtered.filter(s => s.type === 'song');
  } else if (typeVal === 'معزوفة') {
    filtered = filtered.filter(s => s.type === 'instrumental');
  }

  // maqam
  if (maqamVal) {
    filtered = filtered.filter(s => s.maqam === maqamVal);
  }

  // scale
  if (scaleVal) {
    filtered = filtered.filter(s => s.scale === scaleVal);
  }

  // tonic
  if (tonicVal) {
    filtered = filtered.filter(s => s.tonic === tonicVal);
  }

  // search (fixed)
  if (searchVal) {
    filtered = filtered.filter(s =>
      normalize(s.title).includes(searchVal) ||
      normalize(s.composer).includes(searchVal)
    );
  }

  render(filtered);
}

// ===== listeners =====
systemSelect.addEventListener('change', () => {
  populateFilters();
  applyFilters();
});

typeSelect.addEventListener('change', applyFilters);
maqamSelect.addEventListener('change', applyFilters);
scaleSelect.addEventListener('change', applyFilters);
tonicSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

// ===== init =====
populateFilters();
applyFilters();
