// assets/maqamat.js
// Renders the family-card grid on maqamat.html
// All families now point to the generic interactive maqam page.

const FAMILY_DESCRIPTIONS = {
  rast:       'عائلة الراست — أمّ المقامات. تقوم على جنس الراست في القرار وتتنوع في أجناسها العليا من الرصانة إلى البهجة والدراما.',
  bayati:     'عائلة بياتي — الأكثر حضوراً في الغناء العربي الشعبي والديني، تمتاز بالدفء والحمية وقابلية التعبير الصوتي العالي.',
  nahawand:   'عائلة نهاوند — قريبة من السلم الصغير، حزينة ورومانسية وتسمح بتنوع مقامي واسع عبر الطبقات والفروع.',
  ajam:       'عائلة عجم — مشرقة واحتفالية، قريبة من السلم الكبير، وتستخدم في الجو الرسمي والفرِح.',
  kurd:       'عائلة كرد — داكنة ومباشرة، وتُبنى على طابع واضح يسمح بالتصوير على طبقات متعددة مع أسماء تتغير أحياناً.',
  hijaz:      'عائلة حجاز — درامية وروحانية، ذات حضور قوي وتلوين شرقي واضح، وبعض أسمائها تتبدل حسب الطبقة.',
  sikah:      'عائلة سيكاه — عائلة ربع تونية حميمة وروحانية، وتتحرك على جذور نصف بيمول فقط.',
  saba:       'عائلة صبا — شديدة التأثير العاطفي، حزينة ومكثفة وتضم تفرعات خاصة مثل صبا جديد وزمزمة.',
  nawa_athar: 'عائلة نواأثر — عائلة مركبة وملونة، وبعض تسمياتها تتبدل بحسب الطبقة مثل حصار.'
};

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[\u064B-\u065F]/g, '')
    .trim();
}

function createEmptyState(msg) {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.textContent = msg;
  return el;
}

function getFamilyLink(mainMaqam) {
  return `interactive-scale.html?family=${mainMaqam.family}&maqam=${mainMaqam.id}`;
}

function getFamilyCount(mainMaqam) {
  const items = typeof getInteractiveFamily === 'function'
    ? getInteractiveFamily(mainMaqam.family)
    : maqamat.filter(m => m.family === mainMaqam.family && m.interactive);

  return items.length || 1;
}

function createFamilyCard(mainMaqam) {
  const familyId = mainMaqam.family;
  const page = getFamilyLink(mainMaqam);

  const desc = FAMILY_DESCRIPTIONS[familyId] || mainMaqam.description || '';
  const totalCount = getFamilyCount(mainMaqam);
  const subCount = Math.max(0, totalCount - 1);
  const color = mainMaqam.mood_color || '#c8a45a';

  const card = document.createElement('a');
  card.className = 'maqam-family-card';
  card.href = page;
  card.style.setProperty('--family-color', color);
  card.setAttribute('aria-label', `عائلة ${mainMaqam.name} — ${totalCount} مقامات`);

  card.innerHTML = `
    <h3>${mainMaqam.name}</h3>
    <span class="latin">${mainMaqam.latin} Family</span>
    <p class="desc">${desc}</p>

    <div class="meta">
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <span>المقام الرئيسي: <strong>${mainMaqam.name}</strong></span>
      </div>

      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
        <span>${getTonicLabelAr(mainMaqam.base_tonic || '')}</span>
      </div>
    </div>

    <div class="tonic-options">
      <span class="tonic-badge">${mainMaqam.tonic_mode === 'half_flat_only' ? 'أنصاف بيمول' : 'طبقات قياسية'}</span>
      <span class="tonic-badge">${totalCount} مقامات</span>
      ${subCount > 0 ? `<span class="tonic-badge">${subCount} فروع</span>` : ''}
    </div>

    <div class="sub-count">
      افتح العائلة التفاعلية
      <span style="float:left; color: var(--gold);">←</span>
    </div>
  `;

  return card;
}

const maqamatGrid = document.getElementById('maqamat-grid');
const maqamSearch = document.getElementById('maqam-search');

const mainMaqamat = typeof getInteractiveMainMaqamat === 'function'
  ? getInteractiveMainMaqamat()
  : maqamat.filter(m => m.is_main && m.interactive);

function renderFamilies(filter = '') {
  if (!maqamatGrid) return;

  maqamatGrid.innerHTML = '';
  const q = normalize(filter);

  const filtered = mainMaqamat.filter(m =>
    !q ||
    normalize(m.name).includes(q) ||
    normalize(m.latin).includes(q) ||
    normalize(FAMILY_DESCRIPTIONS[m.family] || '').includes(q)
  );

  if (!filtered.length) {
    maqamatGrid.appendChild(createEmptyState('لا توجد عائلات مطابقة'));
    return;
  }

  filtered.forEach(m => {
    maqamatGrid.appendChild(createFamilyCard(m));
  });
}

if (maqamSearch) {
  maqamSearch.addEventListener('input', e => {
    renderFamilies(e.target.value);
  });
}

renderFamilies('');
