// assets/maqamat.js
// Renders the family-card grid on maqamat.html
// Each family card links to its dedicated family page.

// ─── FAMILY PAGE MAP ─────────────────────────────────────────────────────────
// Add an entry here for each family page as you build them.
const FAMILY_PAGES = {
  rast:       'rast-family.html',
  bayat:      'bayat-family.html',
  nahawand:   'nahawand-family.html',
  ajam:       'ajam-family.html',
  kurd:       'kurd-family.html',
  hijaz:      'hijaz-family.html',
  sikah:      'sikah-family.html',
  saba:       'saba-family.html',
  nawa_athar: 'nawa-athar-family.html',
};

// ─── FAMILY DESCRIPTIONS ─────────────────────────────────────────────────────
// Short blurb shown on the main grid card (different from the full page desc).
const FAMILY_DESCRIPTIONS = {
  rast:       'عائلة الراست — أمّ المقامات. تقوم على جنس الراست في القرار وتتنوع في أجناسها العليا من الرصانة إلى البهجة والدراما.',
  bayat:      'عائلة بيات — الأكثر حضوراً في الغناء العربي الشعبي والديني، تمتاز بالدفء والحمية وقابلية التعبير الصوتي العالي.',
  nahawand:   'عائلة نهاوند — الأقرب إلى السلّم الصغير في الموسيقى الغربية، حزينة ورومانسية وتُستخدم بكثرة في الأغاني السينمائية.',
  ajam:       'عائلة عجم — مشرقة واحتفالية، شبيهة بالسلّم الكبير، تُستخدم في المقطوعات الرسمية والأوركسترالية.',
  kurd:       'عائلة كرد — مباشرة وداكنة بلا ربع بيمول، واسعة الانتشار في الألوان الشعبية والعاطفية.',
  hijaz:      'عائلة حجاز — درامية وروحانية، تتميز بزيادة الثانية المعززة وحضورها القوي في الموسيقى الدينية والمقدسة.',
  sikah:      'عائلة سيكاه — مقام حميمي وروحاني يبدأ من درجة ربع تون، مرتبط بالتلاوة والذكر وأعمق التعبير الصوفي.',
  saba:       'عائلة صبا — الأشد تعبيراً عن الحزن في الموسيقى العربية، عاطفة قوية وألوان مقامية نادرة.',
  nawa_athar: 'عائلة نوى أثر — معقدة وملوّنة، تجمع أجناساً متباينة لتخلق توتراً عاطفياً قوياً يُناسب التأليف الكلاسيكي.',
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function normalize(str) {
  return (str || '').toLowerCase()
    .replace(/[\u064B-\u065F]/g, '') // strip Arabic diacritics
    .trim();
}

function createEmptyState(msg) {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.textContent = msg;
  return el;
}

// ─── CARD BUILDER ─────────────────────────────────────────────────────────────
function createFamilyCard(mainMaqam) {
  const familyId    = mainMaqam.family;
  const page        = FAMILY_PAGES[familyId] || '#';
  const desc        = FAMILY_DESCRIPTIONS[familyId] || mainMaqam.description;
  const subCount    = (mainMaqam.sub_maqamat || []).length;
  const totalCount  = subCount + 1; // main + subs
  const color       = mainMaqam.mood_color || '#c8a45a';

  const card = document.createElement('a');
  card.className  = 'maqam-family-card';
  card.href       = page;
  card.style.setProperty('--family-color', color);
  card.setAttribute('aria-label', `عائلة ${mainMaqam.name} — ${totalCount} مقامات`);

  card.innerHTML = `
    <h3>${mainMaqam.name}</h3>
    <span class="latin">${mainMaqam.latin} Family</span>
    <p class="desc">${desc}</p>

    <div class="meta">
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>
        <span>الغالب: <strong>${mainMaqam.dominant || '—'}</strong></span>
      </div>
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
        <span>${mainMaqam.tonic_options?.join(' · ') || '—'}</span>
      </div>
    </div>

    <div class="tonic-options">
      ${(mainMaqam.feeling || []).map(f => `<span class="tonic-badge">${f}</span>`).join('')}
    </div>

    <div class="sub-count">
      ${totalCount} مقامات في العائلة
      ${subCount > 0 ? `· ${subCount} فروع` : ''}
      <span style="float:left; color: var(--gold);">←</span>
    </div>
  `;

  return card;
}

// ─── RENDER ────────────────────────────────────────────────────────────────────
const maqamatGrid   = document.getElementById('maqamat-grid');
const maqamSearch   = document.getElementById('maqam-search');

// Only render main (family-head) maqamat on this page
const mainMaqamat = maqamat.filter(m => m.is_main);

function renderFamilies(filter) {
  maqamatGrid.innerHTML = '';
  const q = normalize(filter);

  const filtered = mainMaqamat.filter(m =>
    !q ||
    normalize(m.name).includes(q) ||
    normalize(m.latin).includes(q) ||
    normalize(FAMILY_DESCRIPTIONS[m.family] || '').includes(q) ||
    (m.feeling || []).some(f => normalize(f).includes(q))
  );

  if (!filtered.length) {
    maqamatGrid.appendChild(createEmptyState('لا توجد عائلات مطابقة'));
    return;
  }

  filtered.forEach(m => maqamatGrid.appendChild(createFamilyCard(m)));
}

if (maqamSearch) {
  maqamSearch.addEventListener('input', e => renderFamilies(e.target.value));
}

renderFamilies('');
