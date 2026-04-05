// assets/maqam-page.js
// Non-invasive content/theory enhancer for interactive-scale.html
// Keeps the existing scale, root-transpose, staff, and playback logic untouched.

(function () {
  const PAGE_ROOT_ID = "interactive-page-root";
  const ENHANCER_STYLE_ID = "maqam-page-enhancer-style";
  const ENHANCED_ATTR = "data-maqam-enhanced";
  const STAFF_NOTE_BOUND_ATTR = "data-staff-hover-bound";
  const JINS_GUIDE_ROW_ID = "maqam-jins-guide-row";
  const SCALE_HELPER_ROW_ID = "maqam-scale-helper-row";
  const TONIC_HELPER_ID = "maqam-tonic-helper";
  const ROLE_FLASH_MS = 950;
  let staffObserver = null;
  let scaleKeyRoleFlashBound = false;

  function injectStyles() {
    if (document.getElementById(ENHANCER_STYLE_ID)) return;

    const link = document.createElement("link");
    link.id = ENHANCER_STYLE_ID;
    link.rel = "stylesheet";
    link.href = "assets/page-maqam-enhancer.css";
    document.head.appendChild(link);
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
    if (!heroInner) return;
    const existing = heroInner.querySelector(".maqam-reference-intro");
    if (existing) existing.remove();
  }

  function cleanupInitialInfoSection() {
    document.querySelectorAll(".maqam-quickfacts").forEach(node => node.remove());
    const infoGrid = document.getElementById("maqam-info-grid");
    if (infoGrid) infoGrid.remove();
    document.querySelectorAll(".sec-title").forEach(node => {
      if (String(node.textContent || "").trim() === "معلومات المقام") {
        node.remove();
      }
    });
  }

  function shouldShowFamilyContext(maqamId, familyId, modelFamilyId) {
    const resolvedMaqamId = String(maqamId || "").trim();
    const resolvedFamilyId = String(familyId || modelFamilyId || "").trim();
    if (!resolvedMaqamId || !resolvedFamilyId) return false;
    return resolvedMaqamId === resolvedFamilyId;
  }

  function ensureTonicHelperLabel() {
    const header = document.querySelector(".staff-scale-header");
    const tonicSelector = document.getElementById("tonic-selector-current");
    if (!header || !tonicSelector) return;

    let controls = header.querySelector(".maqam-tonic-controls");
    if (!controls) {
      controls = createEl("div", "maqam-tonic-controls");
      header.appendChild(controls);
    }

    let helper = document.getElementById(TONIC_HELPER_ID);
    if (!helper) {
      helper = createEl("div", "maqam-tonic-helper", "تغيير طبقة المقام");
      helper.id = TONIC_HELPER_ID;
    }

    if (helper.parentElement !== controls) {
      controls.appendChild(helper);
    }

    if (tonicSelector.parentElement !== controls) {
      controls.appendChild(tonicSelector);
    }

    if (controls.firstElementChild !== helper) {
      controls.insertBefore(helper, controls.firstChild);
    }
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
      window.clearTimeout(noteBtn.__roleHideTimer);
      hoverLabel.style.opacity = "1";
    };

    const hide = () => {
      window.clearTimeout(noteBtn.__roleHideTimer);
      hoverLabel.style.opacity = "0";
    };

    noteBtn.__roleLabelNode = hoverLabel;
    noteBtn.__showRoleLabel = show;
    noteBtn.__hideRoleLabel = hide;

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

  function flashStaffRoleLabel(noteIndex) {
    const noteBtn = document.querySelector(`#staff-current .note-btn[data-note-idx="${noteIndex}"]`);
    if (!noteBtn || typeof noteBtn.__showRoleLabel !== "function") return;

    noteBtn.__showRoleLabel();
    window.clearTimeout(noteBtn.__roleHideTimer);
    noteBtn.__roleHideTimer = window.setTimeout(() => {
      if (typeof noteBtn.__hideRoleLabel === "function") {
        noteBtn.__hideRoleLabel();
      }
    }, ROLE_FLASH_MS);
  }

  function handleScaleKeyRoleFlash(event) {
    if (!(event.target instanceof Element)) return;

    const keyBtn = event.target.closest("#keys-current .note-key");
    if (!keyBtn) return;

    const keysRow = document.getElementById("keys-current");
    if (!keysRow) return;

    const keyButtons = Array.from(keysRow.querySelectorAll(".note-key"));
    const noteIndex = keyButtons.indexOf(keyBtn);
    if (noteIndex < 0) return;

    window.requestAnimationFrame(() => {
      flashStaffRoleLabel(noteIndex);
    });
  }

  function ensureScaleKeyRoleFlashBinding() {
    if (scaleKeyRoleFlashBound) return;
    document.addEventListener("click", handleScaleKeyRoleFlash);
    scaleKeyRoleFlashBound = true;
  }

  function getLowerJinsSpan(maqamId, noteCount) {
    if (typeof getInteractiveConfig === "function") {
      const config = getInteractiveConfig(maqamId);
      const range = config && Array.isArray(config.lower_jins_degree_range)
        ? config.lower_jins_degree_range
        : null;
      const endDegree = range && range.length > 1 ? Number(range[1]) : NaN;
      if (Number.isFinite(endDegree) && endDegree > 0) {
        return Math.max(1, Math.min(endDegree, Math.max(1, noteCount - 1)));
      }
    }
    return Math.max(1, Math.min(4, Math.max(1, noteCount - 1)));
  }

  function isNawaAtharFamily(familyId, maqamId) {
    if (String(familyId || "") === "nawa_athar") return true;
    return ["nawa_athar", "nikriz", "basandida"].includes(String(maqamId || ""));
  }

  function formatGuideJinsLabel(name) {
    const text = textOrFallback(name, "الجنس");
    if (!text || text === "—") return "الجنس";
    if (text.startsWith("جنس ")) return text;
    if (text.startsWith("المنطقة العليا") || text.startsWith("منطقة ")) return text;
    return `جنس ${text}`;
  }

  function ensureJinsGuide(model, maqamId, familyId) {
    const keysRow = document.getElementById("keys-current");
    if (!keysRow) return;

    const noteCount = keysRow.querySelectorAll(".note-key").length;
    if (!noteCount) return;

    const lowerName = isNawaAtharFamily(familyId || model?.family, maqamId)
      ? "عقد نوا أثر"
      : formatGuideJinsLabel(model?.jins_architecture?.lower?.name);
    const upperName = formatGuideJinsLabel(model?.jins_architecture?.upper?.name);
    const lowerCount = getLowerJinsSpan(maqamId, noteCount);
    const upperCount = Math.max(1, noteCount - lowerCount);

    let guideRow = document.getElementById(JINS_GUIDE_ROW_ID);
    if (!guideRow) {
      guideRow = createEl("div", "maqam-jins-guide");
      guideRow.id = JINS_GUIDE_ROW_ID;
      keysRow.insertAdjacentElement("afterend", guideRow);
    }

    guideRow.style.gridTemplateColumns = `repeat(${noteCount}, minmax(0,1fr))`;
    guideRow.innerHTML = `
      <div class="maqam-jins-guide-seg lower" style="grid-column:1 / span ${lowerCount}">
        <span>${lowerName}</span>
      </div>
      <div class="maqam-jins-guide-seg upper" style="grid-column:${lowerCount + 1} / span ${upperCount}">
        <span>${upperName}</span>
      </div>
    `;
  }

  function ensurePlaybackHelperRow() {
    const staffBox = document.querySelector(".staff-scale-box");
    if (!staffBox) return;

    const headerTitle = staffBox.querySelector(".staff-scale-title");
    const playbar = staffBox.querySelector(".playbar");
    const playBtn = playbar ? playbar.querySelector(".play-btn") : null;
    if (!headerTitle || !playbar || !playBtn) return;

    const helperText = String(headerTitle.textContent || "").trim();
    const isHelperSentence = helperText.includes("اضغط") || helperText.includes("للاستماع");
    let helperRow = document.getElementById(SCALE_HELPER_ROW_ID);

    if (!isHelperSentence) {
      if (helperRow) helperRow.remove();
      return;
    }

    if (!helperRow) {
      helperRow = createEl("div", "maqam-scale-helper-row");
      helperRow.id = SCALE_HELPER_ROW_ID;
      playBtn.insertAdjacentElement("afterend", helperRow);
    } else if (helperRow.parentElement !== playbar || helperRow.previousElementSibling !== playBtn) {
      playBtn.insertAdjacentElement("afterend", helperRow);
    }

    helperRow.innerHTML = `<div class="maqam-scale-helper-text">${helperText}</div>`;
    headerTitle.textContent = "السلم التفاعلي";
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
      cleanupInitialInfoSection();

      if (familyModel && shouldShowFamilyContext(state.maqamId, state.familyId, maqamModel?.family)) {
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
        setTimeout(() => {
          ensureTonicHelperLabel();
          ensureScaleKeyRoleFlashBinding();
          enhanceStaffHoverLabels();
          ensureJinsGuide(maqamModel, state.maqamId, state.familyId);
          ensurePlaybackHelperRow();
        }, 40);
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
      setTimeout(() => {
        ensureTonicHelperLabel();
        ensureScaleKeyRoleFlashBinding();
        enhanceStaffHoverLabels();
        ensurePlaybackHelperRow();
      }, 40);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
