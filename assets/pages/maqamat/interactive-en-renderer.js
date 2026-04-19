// English interactive maqam renderer aligned with the Arabic maqam page structure.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};

  function renderAll() {
    renderSidebar();
    renderPageShell();
    ns.actions.syncUrl();
  }

  function renderSidebar() {
    const { sidebar } = ns.refs;
    const state = ns.state;
    const familyItems = getInteractiveFamilyEn(state.familyId);
    const familyMain = getFamilyMainMaqamEn(state.familyId);
    const familyName = familyMain ? familyMain.name : '';
    const mainFamilies = getInteractiveMainMaqamatEn();

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-family-label">Browse families</div>
        <div class="family-switcher" id="family-switcher">
          ${mainFamilies.map(item => `
            <button class="family-switch-btn ${item.family === state.familyId ? 'active' : ''}" data-maqam-id="${item.id}">
              ${ns.engine.getMaqamDisplayTitle(item)}
            </button>
          `).join('')}
        </div>
        <div class="sidebar-family-label sidebar-family-label-spaced">Current family</div>
        <div class="sidebar-family-name">${familyName}</div>
        <div class="sidebar-family-sub">${familyItems.length} maqamat</div>
      </div>
      <ul class="sidebar-list">
        ${familyItems.map(item => `
          <li class="sidebar-item">
            <button class="sidebar-btn ${item.id === state.maqamId ? 'active' : ''} ${item.is_main ? 'main-maqam' : ''}" data-maqam-id="${item.id}">
              <span class="sidebar-dot"></span>
              ${ns.engine.getMaqamDisplayTitle(item)}
              ${item.is_main ? '<span class="sidebar-main-tag">Main</span>' : ''}
            </button>
          </li>
        `).join('')}
      </ul>
    `;

    sidebar.querySelectorAll('.sidebar-btn,.family-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => ns.actions.setActiveMaqam(btn.dataset.maqamId));
    });
  }

  function renderPageShell() {
    const { root, breadcrumbLabel } = ns.refs;
    const state = ns.state;
    const maqam = getEnglishMaqamById(state.maqamId);
    const displayName = ns.engine.getDisplayNameForTonicSafe(state.maqamId, state.tonic);
    const latinDisplayName = typeof getLatinDisplayNameForTonicEn === 'function'
      ? getLatinDisplayNameForTonicEn(state.maqamId, state.tonic)
      : (maqam ? maqam.latin || '' : '');
    const tonicLabel = typeof getTonicLabelEn === 'function' ? getTonicLabelEn(state.tonic) : state.tonic;
    const notes = ns.engine.buildScaleNotes(state.maqamId, state.tonic);

    if (!maqam || !notes.length) {
      root.innerHTML = `<section class="maqam-body"><div class="staff-scale-box"><div class="sec-title">Unavailable</div><p class="maqam-desc">This maqam does not have interactive data yet.</p></div></section>`;
      if (breadcrumbLabel) breadcrumbLabel.textContent = maqam ? ns.engine.getMaqamDisplayTitle(maqam) : '';
      return;
    }

    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    root.innerHTML = `
      <section class="maqam-hero" data-name="${displayName}">
        <div class="maqam-hero-inner">
          <div class="maqam-name-wrap">
            <h1 class="maqam-name" id="maqam-title">${displayName}</h1>
            <span class="maqam-latin">${latinDisplayName}</span>
          </div>
          <p class="maqam-desc" id="maqam-subtitle">Current tonic: ${tonicLabel}</p>
        </div>
      </section>

      <section class="maqam-body">
        <div class="sec-title">Interactive scale</div>
        <div class="staff-scale-box">
          <div class="staff-scale-header">
            <div class="staff-scale-title">${ns.engine.getScaleSectionLabel(state.maqamId)}</div>
            <div class="tonic-selector" id="tonic-selector-current"></div>
          </div>
          <div class="staff-wrap">
            <svg class="staff-svg" id="staff-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 250"></svg>
          </div>
          <div class="note-keys-row" id="keys-current"></div>
          <div class="jins-row" id="jins-current"></div>
          <div class="playbar">
            <button class="play-btn" id="playbtn-current">
              <svg id="playicon-current" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
              <span id="playlabel-current">${ns.engine.getPlayButtonLabel(state.maqamId)}</span>
            </button>
            <div class="status-bar" id="status-current"></div>
          </div>
        </div>

        <div class="maqam-content-sections" id="maqam-content-sections">
          <div class="maqam-content-card maqam-content-card-placeholder">
            <h3>Loading maqam content…</h3>
            <p>Definition, videos, and repertoire examples will appear here.</p>
          </div>
        </div>

        <div class="maqam-sources-footer" id="maqam-sources-footer">
          <section class="maqam-content-card maqam-content-card-placeholder maqam-sources-footer-card">
            <details class="maqam-sources-accordion">
              <summary class="maqam-sources-summary">Sources and references</summary>
              <div class="maqam-sources-body"><p class="maqam-content-copy">References will load here.</p></div>
            </details>
          </section>
        </div>
      </section>
    `;

    if (ns.rendererScale) {
      ns.rendererScale.renderTonicSelector();
      ns.rendererScale.renderStaff();
      ns.rendererScale.renderKeys();
      ns.rendererScale.renderJinsRow();
    }
    ns.actions.bindPageEvents();
    if (ns.rendererContent && typeof ns.rendererContent.renderMaqamContentSections === 'function') {
      void ns.rendererContent.renderMaqamContentSections();
    }
  }

  function renderTonicSelector() {
    if (ns.rendererScale && typeof ns.rendererScale.renderTonicSelector === 'function') {
      ns.rendererScale.renderTonicSelector();
    }
  }

  function renderInfoGrid() {
    return;
  }

  function renderStaff() {
    if (ns.rendererScale && typeof ns.rendererScale.renderStaff === 'function') {
      ns.rendererScale.renderStaff();
    }
  }

  function renderKeys() {
    if (ns.rendererScale && typeof ns.rendererScale.renderKeys === 'function') {
      ns.rendererScale.renderKeys();
    }
  }

  function updateDisplayedName() {
    const { root, breadcrumbLabel } = ns.refs;
    const maqam = getEnglishMaqamById(ns.state.maqamId);
    const title = document.getElementById('maqam-title');
    const subtitle = document.getElementById('maqam-subtitle');
    const displayName = ns.engine.getDisplayNameForTonicSafe(ns.state.maqamId, ns.state.tonic);
    const latinDisplayName = typeof getLatinDisplayNameForTonicEn === 'function'
      ? getLatinDisplayNameForTonicEn(ns.state.maqamId, ns.state.tonic)
      : (maqam ? maqam.latin || '' : '');
    const tonicLabel = typeof getTonicLabelEn === 'function' ? getTonicLabelEn(ns.state.tonic) : ns.state.tonic;

    if (title) title.textContent = displayName;
    if (subtitle) subtitle.textContent = `Current tonic: ${tonicLabel}`;
    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    const hero = root.querySelector('.maqam-hero');
    if (hero) hero.setAttribute('data-name', displayName);

    const latin = root.querySelector('.maqam-latin');
    if (latin) latin.textContent = latinDisplayName;

    const playLabel = document.getElementById('playlabel-current');
    if (playLabel && !ns.state.isPlaying) playLabel.textContent = ns.engine.getPlayButtonLabel(ns.state.maqamId);

    const header = root.querySelector('.staff-scale-title');
    if (header) header.textContent = ns.engine.getScaleSectionLabel(ns.state.maqamId);
  }

  ns.renderer = {
    renderAll,
    renderSidebar,
    renderPageShell,
    renderTonicSelector,
    renderInfoGrid,
    renderStaff,
    renderKeys,
    updateDisplayedName
  };
})();