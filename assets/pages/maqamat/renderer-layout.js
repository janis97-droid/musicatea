(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const { renderTonicSelector, renderStaff, renderKeys } = ns.rendererScale;
  const { renderMaqamContentSections } = ns.rendererContent;

  function injectAccordionStyles() {
    if (document.getElementById("maqam-accordion-theme-inline")) return;
    const s = document.createElement("style");
    s.id = "maqam-accordion-theme-inline";
    s.textContent = `.maqam-definition-card{padding:14px 16px!important}.maqam-definition-card>h3{display:none!important}.maqam-acc-root,.maqam-sub-accordion{display:grid!important;gap:10px!important}.maqam-acc-item{border:1px solid rgba(200,164,90,.14)!important;border-radius:12px!important;background:rgba(255,255,255,.02)!important;overflow:hidden!important;transition:border-color .22s ease,background .22s ease,box-shadow .22s ease!important}.maqam-acc-item.is-open{border-color:rgba(200,164,90,.34)!important;background:rgba(200,164,90,.06)!important;box-shadow:0 10px 24px rgba(0,0,0,.16)!important}.maqam-acc-trigger{appearance:none!important;-webkit-appearance:none!important;width:100%!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:14px 16px!important;border:none!important;outline:none!important;background:transparent!important;color:#e2c47e!important;font-family:'Cairo',sans-serif!important;font-size:1rem!important;font-weight:900!important;line-height:1.4!important;text-align:right!important;cursor:pointer!important}.maqam-acc-trigger span{color:inherit!important;font:inherit!important}.maqam-acc-trigger:hover{background:rgba(255,255,255,.03)!important;color:#f3ddab!important}.maqam-acc-trigger::before{content:'▾'!important;color:#c8a45a!important;font-size:.92rem!important;flex-shrink:0!important;transition:transform .22s ease,color .22s ease!important}.maqam-acc-item.is-open>.maqam-acc-trigger::before{transform:rotate(180deg)!important;color:#e2c47e!important}.maqam-acc-item[data-acc-level="sub"]>.maqam-acc-trigger{font-size:.95rem!important;font-weight:850!important;color:#ead19a!important;padding:12px 14px!important}.maqam-acc-panel{padding:0 16px 16px!important}.maqam-acc-item[data-acc-level="sub"]>.maqam-acc-panel{padding:0 14px 14px!important}.maqam-definition-summary{margin-bottom:10px!important}@media(max-width:768px){.maqam-acc-trigger{font-size:.94rem!important;padding:12px 14px!important}.maqam-acc-item[data-acc-level="sub"]>.maqam-acc-trigger{font-size:.88rem!important;padding:11px 12px!important}.maqam-acc-panel{padding:0 14px 14px!important}.maqam-acc-item[data-acc-level="sub"]>.maqam-acc-panel{padding:0 12px 12px!important}}`;
    document.head.appendChild(s);
  }

  function renderSidebar() {
    const { sidebar } = ns.refs;
    const s = ns.state;
    const fam = getInteractiveFamily(s.familyId);
    const main = getFamilyMainMaqam(s.familyId);
    const familyName = main ? main.name : "";
    const mains = getInteractiveMainMaqamat();

    sidebar.innerHTML = `<div class="sidebar-header"><div class="sidebar-family-label">تنقّل بين العائلات</div><div class="family-switcher" id="family-switcher">${mains.map((i) => `<button class="family-switch-btn ${i.family === s.familyId ? "active" : ""}" data-maqam-id="${i.id}">${ns.engine.getMaqamDisplayTitle(i)}</button>`).join("")}</div><div class="sidebar-family-label sidebar-family-label-spaced">العائلة الموسيقية</div><div class="sidebar-family-name">${familyName}</div><div class="sidebar-family-sub">${fam.length} مقامات</div></div><ul class="sidebar-list">${fam.map((i) => `<li class="sidebar-item"><button class="sidebar-btn ${i.id === s.maqamId ? "active" : ""} ${i.is_main ? "main-maqam" : ""}" data-maqam-id="${i.id}"><span class="sidebar-dot"></span>${ns.engine.getMaqamDisplayTitle(i)}${i.is_main ? '<span class="sidebar-main-tag">أساسي</span>' : ""}</button></li>`).join("")}</ul>`;

    sidebar.querySelectorAll(".sidebar-btn,.family-switch-btn").forEach((b) => b.addEventListener("click", () => ns.actions.setActiveMaqam(b.dataset.maqamId)));
  }

  function renderPageShell() {
    const { root, breadcrumbLabel } = ns.refs;
    const s = ns.state;
    const m = getMaqamById(s.maqamId);
    const displayName = ns.engine.getDisplayNameForTonicSafe(s.maqamId, s.tonic);
    const latin = typeof getLatinDisplayNameForTonic === "function" ? getLatinDisplayNameForTonic(s.maqamId, s.tonic) : m ? m.latin || "" : "";
    const tonic = getTonicLabelAr(s.tonic);
    const notes = ns.engine.buildScaleNotes(s.maqamId, s.tonic);

    if (!m || !notes.length) {
      root.innerHTML = '<section class="maqam-body"><div class="staff-scale-box"><div class="sec-title">غير متاح</div><p class="maqam-desc">هذا المقام لا يملك بيانات تفاعلية جاهزة بعد.</p></div></section>';
      if (breadcrumbLabel) breadcrumbLabel.textContent = m ? ns.engine.getMaqamDisplayTitle(m) : "";
      return;
    }

    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    root.innerHTML = `<section class="maqam-hero" data-name="${displayName}"><div class="maqam-hero-inner"><div class="maqam-name-wrap"><h1 class="maqam-name" id="maqam-title">${displayName}</h1><span class="maqam-latin">${latin}</span></div><p class="maqam-desc" id="maqam-subtitle">الطبقة الحالية: ${tonic}</p></div></section><section class="maqam-body"><div class="sec-title">السلّم التفاعلي</div><div class="staff-scale-box"><div class="staff-scale-header"><div class="staff-scale-title">${ns.engine.getScaleSectionLabel(s.maqamId)}</div><div class="tonic-selector" id="tonic-selector-current"></div></div><div class="staff-wrap"><svg class="staff-svg" id="staff-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 250"></svg></div><div class="note-keys-row" id="keys-current"></div><div class="playbar"><button class="play-btn" id="playbtn-current"><svg id="playicon-current" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"></polygon></svg><span id="playlabel-current">${ns.engine.getPlayButtonLabel(s.maqamId)}</span></button><div class="status-bar" id="status-current"></div></div></div><div class="maqam-content-sections" id="maqam-content-sections"><div class="maqam-content-card maqam-content-card-placeholder"><h3>يتم تحميل مادة المقام…</h3><p>سيظهر هنا تعريف المقام، وأمثلة الفيديو، والأغاني أو القطع.</p></div></div><div class="maqam-sources-footer" id="maqam-sources-footer"><section class="maqam-content-card maqam-content-card-placeholder maqam-sources-footer-card"><details class="maqam-sources-accordion"><summary class="maqam-sources-summary">مصادر ومراجع</summary><div class="maqam-sources-body"><p class="maqam-content-copy">سيتم تحميل المصادر والمراجع…</p></div></details></section></div></section>`;

    renderTonicSelector();
    renderStaff();
    renderKeys();
    ns.actions.bindPageEvents();
    void renderMaqamContentSections();
  }

  function updateDisplayedName() {
    const { root, breadcrumbLabel } = ns.refs;
    const m = getMaqamById(ns.state.maqamId);
    const title = document.getElementById("maqam-title");
    const subtitle = document.getElementById("maqam-subtitle");
    const displayName = ns.engine.getDisplayNameForTonicSafe(ns.state.maqamId, ns.state.tonic);
    const latin = typeof getLatinDisplayNameForTonic === "function" ? getLatinDisplayNameForTonic(ns.state.maqamId, ns.state.tonic) : m ? m.latin || "" : "";
    const tonic = getTonicLabelAr(ns.state.tonic);

    if (title) title.textContent = displayName;
    if (subtitle) subtitle.textContent = `الطبقة الحالية: ${tonic}`;
    if (breadcrumbLabel) breadcrumbLabel.textContent = displayName;

    const hero = root.querySelector(".maqam-hero");
    if (hero) hero.setAttribute("data-name", displayName);

    const lat = root.querySelector(".maqam-latin");
    if (lat) lat.textContent = latin;

    const playLabel = document.getElementById("playlabel-current");
    if (playLabel && !ns.state.isPlaying) playLabel.textContent = ns.engine.getPlayButtonLabel(ns.state.maqamId);

    const header = root.querySelector(".staff-scale-title");
    if (header) header.textContent = ns.engine.getScaleSectionLabel(ns.state.maqamId);
  }

  function renderAll() {
    injectAccordionStyles();
    renderSidebar();
    renderPageShell();
    ns.actions.syncUrl();
  }

  ns.rendererLayout = {
    renderAll,
    renderSidebar,
    renderPageShell,
    updateDisplayedName,
  };
})();