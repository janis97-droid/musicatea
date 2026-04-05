const params = new URLSearchParams(window.location.search);
const familyId = params.get('family');

const familyTitle = document.getElementById('family-title');
const familyDescription = document.getElementById('family-description');
const familyCountBadge = document.getElementById('family-count-badge');
const familySectionCount = document.getElementById('family-section-count');
const breadcrumbFamily = document.getElementById('breadcrumb-family');
const familyGrid = document.getElementById('family-grid');
const familySummary = document.getElementById('family-summary');

const familyDescriptions = {
  rast: "The Rast family is one of the most central families in Arabic music, known for balance, stability, dignity, and rich possibilities of modulation.",
  bayat: "The Bayati family is among the most widely used in Arabic vocal, devotional, and folk traditions, known for warmth and intimate expression.",
  nahawand: "The Nahawand family combines lyricism, melancholy, and romance, and appears frequently in both classical and modern repertoires.",
  ajam: "The Ajam family is bright, open, and structurally clear, often associated with festive, formal, and orchestral musical settings.",
  kurd: "The Kurd family has a direct and dark character, without quarter tones, and is common in folk-oriented and emotionally straightforward melodies.",
  hijaz: "The Hijaz family is dramatic and spiritually charged, recognized by its characteristic intervallic shape and strong emotional pull.",
  sikah: "The Sikah family is intimate and inward, deeply connected to recitation, spirituality, and quarter-tone sensitivity.",
  saba: "The Saba family is one of the most sorrowful and emotionally intense maqam families in Arabic music.",
  nawa_athar: "The Nawa Athar family is complex and color-rich, offering dramatic tension and advanced melodic possibilities."
};

function createSummaryCard(label, value) {
  const card = document.createElement('div');
  card.className = 'summary-card';
  card.innerHTML = `
    <div class="summary-label">${label}</div>
    <div class="summary-value">${value}</div>
  `;
  return card;
}

function createFamilyMaqamCard(maqam) {
  const card = document.createElement('a');
  card.className = 'family-maqam-card' + (maqam.is_main ? ' main' : '');
  card.href = familyId === 'rast'
    ? `interactive-scale.html?maqam=${maqam.id}`
    : `maqam-en.html?id=${maqam.id}`;
  card.style.setProperty('--maqam-color', maqam.mood_color || 'var(--gold)');

  const tonicHtml = (maqam.tonic_options || [])
    .map(t => `<span class="tonic-pill">${t}</span>`)
    .join('');

  const upperJins = maqam.jins?.upper?.map(j => `${j.name} on ${j.root}`).join(' / ') || '—';
  const lowerJins = maqam.jins?.lower ? `${maqam.jins.lower.name} on ${maqam.jins.lower.root}` : '—';

  card.innerHTML = `
    <div class="family-maqam-accent"></div>
    <div class="family-maqam-body">
      ${maqam.is_main ? `<div class="main-tag">Main maqam</div>` : ''}
      <div class="family-maqam-header">
        <h3>${maqam.name}</h3>
        <span class="family-maqam-latin">${maqam.latin}</span>
      </div>

      <p class="family-maqam-desc">${maqam.description || ''}</p>

      <div class="family-maqam-meta">
        <div class="family-meta-row">
          <span class="family-meta-label">Tonic</span>
          <div class="tonic-list">${tonicHtml || '<span class="tonic-pill">—</span>'}</div>
        </div>
        <div class="family-meta-row">
          <span class="family-meta-label">Lower jins</span>
          <span>${lowerJins}</span>
        </div>
        <div class="family-meta-row">
          <span class="family-meta-label">Upper jins</span>
          <span>${upperJins}</span>
        </div>
      </div>

      <div class="family-card-footer">
        <span>${(maqam.examples || []).length} examples</span>
        <span class="family-card-arrow">→</span>
      </div>
    </div>
  `;

  return card;
}

function renderFamilyPage() {
  if (!familyId) {
    familyTitle.textContent = 'Unspecified family';
    breadcrumbFamily.textContent = 'Unspecified family';
    familyDescription.textContent = 'No family was specified in the page URL.';
    familyGrid.innerHTML = '<div class="family-empty">The link is incomplete. Return to the maqamat page and select a family.</div>';
    familySummary.appendChild(createSummaryCard('Status', 'Invalid link'));
    return;
  }

  const familyMaqamat = getMaqamatByFamily(familyId);
  const mainMaqam = familyMaqamat.find(m => m.is_main) || familyMaqamat[0];

  if (!familyMaqamat.length || !mainMaqam) {
    familyTitle.textContent = 'Family not found';
    breadcrumbFamily.textContent = 'Not found';
    familyDescription.textContent = 'No data was found for this maqam family.';
    familyGrid.innerHTML = '<div class="family-empty">No data is currently available for this family.</div>';
    familySummary.appendChild(createSummaryCard('Status', 'No data available'));
    return;
  }

  familyTitle.textContent = `${mainMaqam.name} Family`;
  breadcrumbFamily.textContent = `${mainMaqam.name} Family`;
  familyDescription.textContent = familyDescriptions[familyId] || mainMaqam.description || '';
  familyCountBadge.textContent = `${familyMaqamat.length} maqamat`;
  familySectionCount.textContent = `${familyMaqamat.length} in this family`;

  const totalExamples = familyMaqamat.reduce((sum, m) => sum + ((m.examples || []).length), 0);
  const lowerJinsName = mainMaqam.jins?.lower?.name || '—';
  const dominant = mainMaqam.dominant || '—';

  familySummary.appendChild(createSummaryCard('Parent maqam', mainMaqam.name));
  familySummary.appendChild(createSummaryCard('Shared lower jins', lowerJinsName));
  familySummary.appendChild(createSummaryCard('Dominant', dominant));
  familySummary.appendChild(createSummaryCard('Total examples', `${totalExamples} examples`));

  const ordered = [
    ...familyMaqamat.filter(m => m.is_main),
    ...familyMaqamat.filter(m => !m.is_main)
  ];

  ordered.forEach(m => {
    familyGrid.appendChild(createFamilyMaqamCard(m));
  });
}

renderFamilyPage();
