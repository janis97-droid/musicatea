// assets/maqam-page.js
// Non-invasive content/theory enhancer for interactive-scale.html
// Keeps the existing scale, root-transpose, staff, and playback logic untouched.

(function () {
  const PAGE_ROOT_ID = "interactive-page-root";
  const ENHANCER_STYLE_ID = "maqam-page-enhancer-style";
  const ENHANCED_ATTR = "data-maqam-enhanced";
  const STAFF_NOTE_BOUND_ATTR = "data-staff-hover-bound";
  let staffObserver = null;

  function injectStyles() {
    if (document.getElementById(ENHANCER_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = ENHANCER_STYLE_ID;
    style.textContent = `
      .maqam-hero-inner .maqam-reference-intro {
        margin-top: 12px;
        max-width: 760px;
        color: var(--text-muted);
        font-size: 0.98rem;
        line-height: 1.95;
      }

      .maqam-quickfacts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: 12px;
        margin: 0 0 28px;
      }

      .maqam-qf-card {
        background: linear-gradient(180deg, rgba(200,164,90,0.06) 0%, rgba(255,255,255,0.02) 100%);
        border: 1px solid rgba(200,164,90,0.12);
        border-radius: 14px;
        padding: 14px 16px;
      }

      .maqam-qf-label {
        font-size: 0.68rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--gold);
        font-weight: 800;
        margin-bottom: 6px;
      }

      .maqam-qf-value {
        color: var(--text);
        font-size: 0.93rem;
        line-height: 1.75;
        font-weight: 700;
      }

      .maqam-theory-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-bottom: 28px;
      }

      .maqam-theory-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 18px;
      }

      .maqam-theory-card.blue {
        border-color: rgba(123,168,212,0.22);
        background: linear-gradient(180deg, rgba(123,168,212,0.05) 0%, rgba(255,255,255,0.015) 100%);
      }

      .maqam-theory-card.gold {
        border-color: rgba(200,164,90,0.2);
        background: linear-gradient(180deg, rgba(200,164,90,0.06) 0%, rgba(255,255,255,0.015) 100%);
      }

      .maqam-theory-card h3 {
        font-size: 1rem;
        color: var(--text);
        font-weight: 900;
        margin-bottom: 8px;
      }

      .maqam-theory-card .sub {
        color: var(--gold-light);
        font-size: 0.82rem;
        font-weight: 800;
        margin-bottom: 10px;
      }

      .maqam-theory-card p,
      .maqam-theory-card li {
        color: var(--text-muted);
        line-height: 1.9;
        font-size: 0.94rem;
      }

      .maqam-theory-card ul {
        padding-right: 18px;
      }

      .maqam-long-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 20px 20px 18px;
        margin-bottom: 28px;
      }

      .maqam-long-card p,
      .maqam-long-card li {
        color: var(--text-muted);
        line-height: 1.95;
        font-size: 0.95rem;
      }

      .maqam-long-card ul {
        padding-right: 18px;
      }

      .maqam-section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.08rem;
        font-weight: 900;
        color: var(--text);
        margin-bottom: 12px;
      }

      .maqam-section-title .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--gold);
        flex-shrink: 0;
      }

      .maqam-related-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 12px;
        margin-top: 8px;
      }

      .maqam-related-card {
        display: block;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 14px 14px 12px;
        transition: all .22s var(--ease);
      }

      .maqam-related-card:hover {
        transform: translateY(-3px);
        border-color: rgba(200,164,90,0.24);
        background: var(--surface2);
      }

      .maqam-related-card .name {
        color: var(--text);
        font-size: 0.97rem;
        font-weight: 900;
        margin-bottom: 4px;
      }

      .maqam-related-card .meta {
        color: var(--text-dim);
        font-size: 0.78rem;
        font-weight: 700;
      }

      .maqam-ref-list {
        display: grid;
        gap: 10px;
      }

      .maqam-ref-item {
        background: rgba(255,255,255,0.02);
        border: 1px solid var(--border2);
        border-radius: 12px;
        padding: 12px 14px;
      }

      .maqam-ref-item .title {
        color: var(--gold-light);
        font-size: 0.9rem;
        font-weight: 900;
        margin-bottom: 4px;
      }

      .maqam-ref-item .note {
        color: var(--text-muted);
        font-size: 0.87rem;
        line-height: 1.8;
      }

      .maqam-inline-note {
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(200,164,90,0.15);
        background: rgba(200,164,90,0.05);
        color: var(--text-muted);
        line-height: 1.85;
        font-size: 0.9rem;
      }

      @media (max-width: 900px) {
        .maqam-theory-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getUrlState() {
    const params = new URLSearchParams(window.location.search);
    return {
      maqamId: params.get("maqam"),
      familyId: params.get("family"),
      tonic: params.get("tonic")
    };
  }

  function getPageRoot() {
    return document.getElementById(PAGE_ROOT_ID);
  }

  function createEl(tag, className, html) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof html === "string") el.innerHTML = html;
    return el;
  }

  function textOrFallback(value, fallback = "—") {
    return value && String(value).trim() ? String(value).trim() : fallback;
  }

  function normalizeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function getMaqamNameAr(maqamId) {
    if (typeof getMaqamById === "function") {
      const maqam = getMaqamById(maqamId);
      if (maqam && maqam.name) return maqam.name;
    }
    return maqamId || "";
  }

  function getDefaultTonicForMaqam(maqamId) {
    if (typeof getInteractiveDefaultTonic === "function") {
      return getInteractiveDefaultTonic(maqamId);
    }
    return "do";
  }

  function buildMaqamLink(maqamId, familyId) {
    const tonic = getDefaultTonicForMaqam(maqamId);
    const params = new URLSearchParams();
    if (familyId) params.set("family", familyId);
    if (maqamId) params.set("maqam", maqamId);
    if (tonic) params.set("tonic", tonic);
    return `interactive-scale.html?${params.toString()}`;
  }

  function renderQuickFacts(model) {
    const facts = model.quick_facts || {};
    const entries = [
      ["القرار", facts.karar],
      ["الغمّاز", facts.ghammaz],
      ["الجنس الأساسي", facts.lower_jins],
      ["الجنس العلوي", facts.upper_jins],
      ["الطابع", facts.character],
      ["بداية السير", facts.common_start]
    ];

    const wrap = createEl("section", "maqam-quickfacts");
    entries.forEach(([label, value]) => {
      const card = createEl("div", "maqam-qf-card");
      card.appendChild(createEl("div", "maqam-qf-label", label));
      card.appendChild(createEl("div", "maqam-qf-value", textOrFallback(value)));
      wrap.appendChild(card);
    });
    return wrap;
  }

  function renderJinsCards(model) {
    const jins = model.jins_architecture || {};
    const lower = jins.lower || {};
    const upper = jins.upper || {};

    const section = document.createDocumentFragment();

    section.appendChild(createEl("div", "sec-title", "بنية الأجناس"));

    const grid = createEl("section", "maqam-theory-grid");

    const lowerCard = createEl("article", "maqam-theory-card gold");
    lowerCard.appendChild(createEl("h3", "", "الجنس الأساسي"));
    lowerCard.appendChild(createEl("div", "sub", `${textOrFallback(lower.name)} — يبدأ من ${textOrFallback(lower.starts_on)}`));
    lowerCard.appendChild(createEl("p", "", textOrFallback(lower.description)));

    const upperCard = createEl("article", "maqam-theory-card blue");
    upperCard.appendChild(createEl("h3", "", "المنطقة العليا"));
    upperCard.appendChild(createEl("div", "sub", `${textOrFallback(upper.name)} — يبدأ من ${textOrFallback(upper.starts_on)}`));
    upperCard.appendChild(createEl("p", "", textOrFallback(upper.description)));

    grid.appendChild(lowerCard);
    grid.appendChild(upperCard);
    section.appendChild(grid);

    if (jins.transition_note) {
      section.appendChild(createEl("div", "maqam-inline-note", `<strong>ملاحظة انتقال:</strong> ${jins.transition_note}`));
    }

    return section;
  }

  function renderLongSection(title, bodyHtml) {
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(createEl("div", "sec-title", title));
    const card = createEl("section", "maqam-long-card");
    card.appendChild(createEl("div", "maqam-section-title", `<span class="dot"></span><span>${title}</span>`));
    card.appendChild(createEl("div", "", bodyHtml));
    wrapper.appendChild(card);
    return wrapper;
  }

  function renderSayrSection(model) {
    const sayr = model.sayr || {};
    const restTones = normalizeArray(sayr.resting_tones);
    const motionNotes = normalizeArray(sayr.motion_notes);
    const pathNotes = normalizeArray(sayr.common_path);

    const html = `
      <p>${textOrFallback(sayr.summary)}</p>
      ${restTones.length ? `<h4 style="margin:14px 0 6px;color:var(--gold-light);font-size:.9rem;">نغمات الارتكاز</h4><ul>${restTones.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
      ${motionNotes.length ? `<h4 style="margin:14px 0 6px;color:var(--gold-light);font-size:.9rem;">نقاط الحركة</h4><ul>${motionNotes.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
      ${pathNotes.length ? `<h4 style="margin:14px 0 6px;color:var(--gold-light);font-size:.9rem;">المسار الشائع</h4><ul>${pathNotes.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
    `;
    return renderLongSection("السير اللحني", html);
  }

  function renderRelatedSection(model) {
    const ids = normalizeArray(model.related_maqamat);
    const links = ids.map(id => {
      return {
        id,
        name: getMaqamNameAr(id),
        href: buildMaqamLink(id, model.family)
      };
    });

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(createEl("div", "sec-title", "مقامات ذات صلة"));

    const card = createEl("section", "maqam-long-card");
    card.appendChild(createEl("div", "maqam-section-title", `<span class="dot"></span><span>ضمن العائلة نفسها</span>`));

    if (!links.length) {
      card.appendChild(createEl("p", "", "لا توجد مقامات مرتبطة مضبوطة لهذه الصفحة بعد."));
    } else {
      const grid = createEl("div", "maqam-related-grid");
      links.forEach(item => {
        const a = createEl("a", "maqam-related-card");
        a.href = item.href;
        a.innerHTML = `<div class="name">${item.name}</div><div class="meta">فتح صفحة المقام</div>`;
        grid.appendChild(a);
      });
      card.appendChild(grid);
    }

    wrapper.appendChild(card);
    return wrapper;
  }

  function renderReferencesSection(model) {
    const refs = normalizeArray(model.references);
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(createEl("div", "sec-title", "المراجع"));

    const card = createEl("section", "maqam-long-card");
    card.appendChild(createEl("div", "maqam-section-title", `<span class="dot"></span><span>مراجع أساسية</span>`));

    if (!refs.length) {
      card.appendChild(createEl("p", "", "لم يتم ربط مراجع بهذه الصفحة بعد."));
    } else {
      const list = createEl("div", "maqam-ref-list");
      refs.forEach(ref => {
        const item = createEl("div", "maqam-ref-item");
        item.appendChild(createEl("div", "title", textOrFallback(ref.public_label || ref.title)));
        item.appendChild(createEl("div", "note", textOrFallback(ref.notes)));
        list.appendChild(item);
      });
      card.appendChild(list);
    }

    wrapper.appendChild(card);
    return wrapper;
  }

  function renderSimpleBulletsSection(sectionTitle, cardTitle, items) {
    const normalizedItems = normalizeArray(items);
    if (!normalizedItems.length) return document.createDocumentFragment();

    const html = `<ul>${normalizedItems.map(item => `<li>${item}</li>`).join("")}</ul>`;
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(createEl("div", "sec-title", sectionTitle));

    const card = createEl("section", "maqam-long-card");
    card.appendChild(createEl("div", "maqam-section-title", `<span class="dot"></span><span>${cardTitle}</span>`));
    card.appendChild(createEl("div", "", html));
    wrapper.appendChild(card);

    return wrapper;
  }

  function renderFamilyContextSection(familyModel) {
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(createEl("div", "sec-title", "سياق العائلة"));

    const card = createEl("section", "maqam-long-card");
    card.appendChild(createEl("div", "maqam-section-title", `<span class="dot"></span><span>${textOrFallback(familyModel.title_ar)}</span>`));
    card.appendChild(createEl("p", "", textOrFallback(familyModel.overview)));
    card.appendChild(createEl("div", "maqam-inline-note", `<strong>منطق العائلة:</strong> ${textOrFallback(familyModel.family_identity)}`));

    wrapper.appendChild(card);
    return wrapper;
  }

  function injectHeroSummary(heroInner, maqamModel) {
    if (!heroInner || heroInner.querySelector(".maqam-reference-intro")) return;
    const p = createEl("p", "maqam-reference-intro", textOrFallback(maqamModel.hero_summary));
    heroInner.appendChild(p);
  }

  function getStaffRoleLabel(description) {
    const text = String(description || "");
    if (!text) return "";
    if (text.includes("قرار المقام")) return "قرار";
    if (text.includes("جواب المقام")) return "جواب";
    if (text.includes("غمّاز المقام")) return "غمّاز";
    return "";
  }

  function getStaffHoverPalette(label) {
    if (label === "غمّاز") {
      return {
        bg: "rgba(123,168,212,0.15)",
        border: "rgba(123,168,212,0.52)",
        text: "#c8e4ff"
      };
    }
    return {
      bg: "rgba(200,164,90,0.14)",
      border: "rgba(200,164,90,0.5)",
      text: "#f0d28a"
    };
  }

  function buildStaffHoverLabel(noteBtn, label) {
    if (!noteBtn || !label) return null;

    const ellipse = noteBtn.querySelector("ellipse");
    if (!ellipse) return null;

    const x = Number(ellipse.getAttribute("cx")) || 0;
    const y = Number(ellipse.getAttribute("cy")) || 0;
    const width = label === "غمّاز" ? 66 : 58;
    const labelY = Math.min(214, y + 30);
    const palette = getStaffHoverPalette(label);
    const svgNs = "http://www.w3.org/2000/svg";

    const g = document.createElementNS(svgNs, "g");
    g.setAttribute("class", "staff-hover-label");
    g.setAttribute("style", "pointer-events:none;opacity:0;transition:opacity .14s ease");

    const rect = document.createElementNS(svgNs, "rect");
    rect.setAttribute("x", String(x - width / 2));
    rect.setAttribute("y", String(labelY - 12));
    rect.setAttribute("width", String(width));
    rect.setAttribute("height", "24");
    rect.setAttribute("rx", "12");
    rect.setAttribute("fill", palette.bg);
    rect.setAttribute("stroke", palette.border);
    rect.setAttribute("stroke-width", "1.1");
    g.appendChild(rect);

    const text = document.createElementNS(svgNs, "text");
    text.setAttribute("x", String(x));
    text.setAttribute("y", String(labelY + 4));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-weight", "800");
    text.setAttribute("fill", palette.text);
    text.setAttribute("font-family", "Cairo, sans-serif");
    text.textContent = label;
    g.appendChild(text);

    return g;
  }

  function bindStaffHoverNote(noteBtn) {
    if (!noteBtn || noteBtn.getAttribute(STAFF_NOTE_BOUND_ATTR) === "1") return;

    const description = noteBtn.getAttribute("aria-label") || noteBtn.getAttribute("title") || "";
    const label = getStaffRoleLabel(description);

    noteBtn.removeAttribute("title");
    noteBtn.setAttribute(STAFF_NOTE_BOUND_ATTR, "1");

    if (!label) return;

    const hoverLabel = buildStaffHoverLabel(noteBtn, label);
    if (!hoverLabel) return;

    noteBtn.appendChild(hoverLabel);

    const show = () => {
      hoverLabel.style.opacity = "1";
    };

    const hide = () => {
      hoverLabel.style.opacity = "0";
    };

    noteBtn.addEventListener("mouseenter", show);
    noteBtn.addEventListener("mouseleave", hide);
    noteBtn.addEventListener("focus", show);
    noteBtn.addEventListener("blur", hide);
  }

  function enhanceStaffHoverLabels() {
    const svg = document.getElementById("staff-current");
    if (!svg) return;

    svg.querySelectorAll(".note-btn").forEach(bindStaffHoverNote);

    if (staffObserver) {
      staffObserver.disconnect();
    }

    staffObserver = new MutationObserver(() => {
      svg.querySelectorAll(".note-btn").forEach(bindStaffHoverNote);
    });

    staffObserver.observe(svg, {
      childList: true,
      subtree: true
    });
  }

  async function enhancePage() {
    injectStyles();

    const pageRoot = getPageRoot();
    if (!pageRoot) return;

    const maqamBody = pageRoot.querySelector(".maqam-body");
    const heroInner = pageRoot.querySelector(".maqam-hero-inner");
    const staffBox = pageRoot.querySelector(".staff-scale-box");
    if (!maqamBody || !staffBox) return;

    const state = getUrlState();
    if (!state.maqamId || !window.MaqamContentLoader) return;

    if (pageRoot.getAttribute(ENHANCED_ATTR) === state.maqamId) return;

    try {
      const [maqamModel, familyModel] = await Promise.all([
        window.MaqamContentLoader.buildMaqamContentModel(state.maqamId),
        state.familyId ? window.MaqamContentLoader.buildFamilyContentModel(state.familyId) : Promise.resolve(null)
      ]);

      pageRoot.setAttribute(ENHANCED_ATTR, state.maqamId);

      injectHeroSummary(heroInner, maqamModel);

      const infoGrid = pageRoot.querySelector("#maqam-info-grid");
      const quickFacts = renderQuickFacts(maqamModel);

      if (infoGrid && infoGrid.parentNode) {
        infoGrid.parentNode.insertBefore(quickFacts, infoGrid);
      } else {
        maqamBody.insertBefore(quickFacts, staffBox.nextSibling);
      }

      if (familyModel) {
        maqamBody.appendChild(renderFamilyContextSection(familyModel));
      }

      maqamBody.appendChild(renderLongSection("ما هو هذا المقام؟", `<p>${textOrFallback(maqamModel.what_is_it)}</p>`));
      maqamBody.appendChild(renderJinsCards(maqamModel));
      maqamBody.appendChild(renderSayrSection(maqamModel));
      maqamBody.appendChild(renderLongSection("التحويل على الجذور", `<p>${textOrFallback(maqamModel.transpose_explainer)}</p>`));
      maqamBody.appendChild(renderSimpleBulletsSection("ملاحظات تاريخية", "إضاءة تاريخية", maqamModel.historical_notes));
      maqamBody.appendChild(renderSimpleBulletsSection("اختلافات مدرسية", "بين المدارس", maqamModel.school_differences));
      maqamBody.appendChild(renderSimpleBulletsSection("ملاحظات سمعية", "كيف تستمع إلى المقام", maqamModel.listening_notes));
      maqamBody.appendChild(renderSimpleBulletsSection("التباسات شائعة", "ما الذي يجب الانتباه له", maqamModel.common_confusions));
      maqamBody.appendChild(renderRelatedSection(maqamModel));
      maqamBody.appendChild(renderReferencesSection(maqamModel));

      window.requestAnimationFrame(() => {
        setTimeout(enhanceStaffHoverLabels, 40);
      });
    } catch (error) {
      console.warn("Maqam page enhancement skipped:", error);
    }
  }

  function setupObserver() {
    const pageRoot = getPageRoot();
    if (!pageRoot) return;

    const observer = new MutationObserver(() => {
      pageRoot.removeAttribute(ENHANCED_ATTR);
      window.requestAnimationFrame(() => {
        setTimeout(enhancePage, 40);
      });
    });

    observer.observe(pageRoot, {
      childList: true,
      subtree: false
    });
  }

  function init() {
    enhancePage();
    setupObserver();

    window.requestAnimationFrame(() => {
      setTimeout(enhanceStaffHoverLabels, 40);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
