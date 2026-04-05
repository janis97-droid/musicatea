const params = new URLSearchParams(window.location.search);
const familyId = params.get('family');
const maqamId = params.get('maqam') || params.get('id');
const appRoot = document.getElementById('interactive-en-root');

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

const familyNameMap = {
  rast: 'Rast',
  bayat: 'Bayati',
  nahawand: 'Nahawand',
  ajam: 'Ajam',
  kurd: 'Kurd',
  hijaz: 'Hijaz',
  sikah: 'Sikah',
  saba: 'Saba',
  nawa_athar: 'Nawa Athar'
};

function pill(text, className = 'tag') {
  const span = document.createElement('span');
  span.className = className;
  span.textContent = text;
  return span;
}

function getResolvedFamily() {
  if (familyId) return familyId;
  if (maqamId) {
    const maqam = getMaqamById(maqamId);
    return maqam ? maqam.family : null;
  }
  return null;
}

function familyRouteUrl(nextFamilyId, nextMaqamId = null) {
  const qs = new URLSearchParams();
  if (nextFamilyId) qs.set('family', nextFamilyId);
  if (nextMaqamId) qs.set('maqam', nextMaqamId);
  return `interactive-scale-en.html?${qs.toString()}`;
}

function renderFamilyView(resolvedFamilyId) {
  const familyMaqamat = getMaqamatByFamily(resolvedFamilyId);
  const mainMaqam = familyMaqamat.find(m => m.is_main) || familyMaqamat[0];

  if (!familyMaqamat.length || !mainMaqam) {
    appRoot.innerHTML = `
      <header class="family-hero">
        <div class="breadcrumbs">
          <a href="index-en.html">Home</a>
          <span>›</span>
          <a href="maqamat-en.html">Maqamat</a>
          <span>›</span>
          <span>Family not found</span>
        </div>
        <div class="family-title-row">
          <div class="family-title-block">
            <h1>Family not found</h1>
            <p>No data was found for this maqam family.</p>
          </div>
        </div>
      </header>
      <main class="family-content">
        <div class="family-empty">No family data is currently available for this route.</div>
      </main>
    `;
    return;
  }

  const totalExamples = familyMaqamat.reduce((sum, m) => sum + ((m.examples || []).length), 0);
  const lowerJinsName = mainMaqam.jins?.lower?.name || '—';
  const dominant = mainMaqam.dominant || '—';

  const summaryCards = [
    ['Parent maqam', mainMaqam.name],
    ['Shared lower jins', lowerJinsName],
    ['Dominant', dominant],
    ['Total examples', `${totalExamples} examples`]
  ].map(([label, value]) => `
    <div class="summary-card">
      <div class="summary-label">${label}</div>
      <div class="summary-value">${value}</div>
    </div>
  `).join('');

  const ordered = [
    ...familyMaqamat.filter(m => m.is_main),
    ...familyMaqamat.filter(m => !m.is_main)
  ];

  const cards = ordered.map(maqam => {
    const tonicHtml = (maqam.tonic_options || [])
      .map(t => `<span class="tonic-pill">${t}</span>`)
      .join('');

    const upperJins = maqam.jins?.upper?.map(j => `${j.name} on ${j.root}`).join(' / ') || '—';
    const lowerJins = maqam.jins?.lower ? `${maqam.jins.lower.name} on ${maqam.jins.lower.root}` : '—';

    return `
      <a class="family-maqam-card ${maqam.is_main ? 'main' : ''}" href="${familyRouteUrl(resolvedFamilyId, maqam.id)}" style="--maqam-color:${maqam.mood_color || 'var(--gold)'};">
        <div class="family-maqam-accent"></div>
        <div class="family-maqam-body">
          ${maqam.is_main ? `<div class="main-tag">Main maqam</div>` : ''}
          <div class="family-maqam-header">
            <h3>${maqam.name}</h3>
            <span class="family-maqam-latin">${maqam.latin || ''}</span>
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
      </a>
    `;
  }).join('');

  appRoot.innerHTML = `
    <header class="family-hero">
      <div class="breadcrumbs">
        <a href="index-en.html">Home</a>
        <span>›</span>
        <a href="maqamat-en.html">Maqamat</a>
        <span>›</span>
        <span>${mainMaqam.name} Family</span>
      </div>
      <div class="family-title-row">
        <div class="family-title-block">
          <h1>${mainMaqam.name} Family</h1>
          <p>${familyDescriptions[resolvedFamilyId] || mainMaqam.description || ''}</p>
        </div>
        <div class="family-badge-large">${familyMaqamat.length} maqamat</div>
      </div>
    </header>

    <main class="family-content">
      <section class="family-summary">${summaryCards}</section>
      <section>
        <div class="family-section-header">
          <h2>Family Maqamat</h2>
          <span>${familyMaqamat.length} in this family</span>
        </div>
        <div id="family-grid">${cards}</div>
      </section>
    </main>
  `;
}

function renderMaqamView(resolvedFamilyId, currentMaqamId) {
  const maqam = getMaqamById(currentMaqamId);

  if (!maqam) {
    appRoot.innerHTML = `
      <header class="maqam-hero">
        <div class="breadcrumbs">
          <a href="index-en.html">Home</a>
          <span>›</span>
          <a href="maqamat-en.html">Maqamat</a>
          <span>›</span>
          <span>Maqam not found</span>
        </div>
        <div class="maqam-title-row">
          <div class="maqam-title-block">
            <h1>Maqam not found</h1>
            <p>No data is available for this maqam.</p>
          </div>
        </div>
      </header>
    `;
    return;
  }

  document.title = `${maqam.name} | Musicatea`;

  const familyName = familyNameMap[maqam.family] || maqam.family;
  const lowerJins = maqam.jins?.lower
    ? `${maqam.jins.lower.name} on ${maqam.jins.lower.root}`
    : '—';
  const upperJins = maqam.jins?.upper?.length
    ? maqam.jins.upper.map(j => `${j.name} on ${j.root}`).join(' / ')
    : '—';

  const tonics = (maqam.tonic_options || []).map(t => `<span class="tag">${t}</span>`).join('');
  const feelings = (maqam.feeling || []).map(f => `<span class="tag">${f}</span>`).join('');

  const notesEntries = Object.entries(maqam.notes || {});
  const notesHtml = notesEntries.length
    ? notesEntries.map(([key, notes]) => `
        <div class="notes-variant">
          <h3>${key.replaceAll('_', ' ').toUpperCase()}</h3>
          <div class="notes-line">${notes.join(' — ')}</div>
        </div>
      `).join('')
    : '<div class="empty-state">No scale variants available.</div>';

  const examplesHtml = (maqam.examples || []).length
    ? maqam.examples.map(example => `<span class="example-pill">${example}</span>`).join('')
    : '<div class="empty-state">No examples listed yet.</div>';

  const subHtml = (maqam.sub_maqamat || []).length
    ? maqam.sub_maqamat.map(id => {
        const sub = getMaqamById(id);
        return `<a class="submaqam-link" href="${familyRouteUrl(resolvedFamilyId || maqam.family, id)}">${sub ? sub.name : id}</a>`;
      }).join('')
    : '<div class="empty-state">No sub-maqamat listed.</div>';

  const relatedHtml = (maqam.related_sheets || []).length
    ? '<a class="related-link" href="library-en.html">Open related sheets in library <span>→</span></a>'
    : '<div class="empty-state">No linked sheets yet.</div>';

  appRoot.innerHTML = `
    <header class="maqam-hero">
      <div class="breadcrumbs">
        <a href="index-en.html">Home</a>
        <span>›</span>
        <a href="maqamat-en.html">Maqamat</a>
        <span>›</span>
        <a href="${familyRouteUrl(resolvedFamilyId || maqam.family)}">${familyName} Family</a>
        <span>›</span>
        <span>${maqam.name}</span>
      </div>

      <div class="maqam-title-row">
        <div class="maqam-title-block">
          <h1>${maqam.name}</h1>
          <span class="maqam-latin">${maqam.latin || ''}</span>
          <p>${maqam.description || ''}</p>
        </div>
        <div class="maqam-badge">${familyName} Family</div>
      </div>
    </header>

    <main class="maqam-content">
      <div class="maqam-grid">
        <div>
          <section class="detail-card">
            <h2>Musical Identity</h2>
            <div class="meta-list">
              <div class="meta-row"><span class="meta-label">Sayr</span><span>${maqam.sayr || '—'}</span></div>
              <div class="meta-row"><span class="meta-label">Dominant</span><span>${maqam.dominant || '—'}</span></div>
              <div class="meta-row"><span class="meta-label">Tonic options</span><div class="tags">${tonics}</div></div>
              <div class="meta-row"><span class="meta-label">Character</span><div class="tags">${feelings}</div></div>
            </div>
          </section>

          <section class="detail-card">
            <h2>Jins Structure</h2>
            <div class="meta-list">
              <div class="meta-row"><span class="meta-label">Lower jins</span><span>${lowerJins}</span></div>
              <div class="meta-row"><span class="meta-label">Upper jins</span><span>${upperJins}</span></div>
            </div>
          </section>

          <section class="detail-card">
            <h2>Scale Variants</h2>
            <div class="notes-block">${notesHtml}</div>
          </section>
        </div>

        <div>
          <section class="detail-card">
            <h2>Examples</h2>
            <div class="examples-list">${examplesHtml}</div>
          </section>

          <section class="detail-card">
            <h2>Sub-maqamat</h2>
            <div class="submaqamat-list">${subHtml}</div>
          </section>

          <section class="detail-card">
            <h2>Related Library</h2>
            <div>${relatedHtml}</div>
          </section>
        </div>
      </div>
    </main>
  `;
}

function renderUnifiedEnglishInteractivePage() {
  const resolvedFamilyId = getResolvedFamily();

  if (maqamId) {
    renderMaqamView(resolvedFamilyId, maqamId);
    return;
  }

  if (resolvedFamilyId) {
    renderFamilyView(resolvedFamilyId);
    return;
  }

  appRoot.innerHTML = `
    <header class="family-hero">
      <div class="breadcrumbs">
        <a href="index-en.html">Home</a>
        <span>›</span>
        <a href="maqamat-en.html">Maqamat</a>
      </div>
      <div class="family-title-row">
        <div class="family-title-block">
          <h1>Maqamat</h1>
          <p>Select a maqam family from the maqamat landing page.</p>
        </div>
      </div>
    </header>
    <main class="family-content">
      <div class="family-empty">Open this page with a family or maqam query.</div>
    </main>
  `;
}

renderUnifiedEnglishInteractivePage();
