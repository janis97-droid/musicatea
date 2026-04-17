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

    const style = document.createElement("style");
    style.id = ENHANCER_STYLE_ID;
    style.textContent = `
      .maqam-hero-inner .maqam-reference-intro {
        display: none !important;
      }

      .maqam-hero .maqam-name {
        font-size: clamp(2.9rem, 6.4vw, 5.25rem);
      }

      .maqam-hero .maqam-latin {
        font-size: 1.28rem;
        color: var(--text-muted);
      }

      .maqam-hero #maqam-subtitle {
        display: none !important;
      }

      .maqam-body > .sec-title:first-of-type {
        display: none;
      }

      .staff-scale-box .staff-scale-header {
        justify-content: flex-start;
        margin-bottom: 16px;
      }

      .staff-scale-box .staff-scale-title {
        display: none !important;
      }

      .maqam-tonic-controls {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        width: 100%;
        direction: rtl;
      }

      .maqam-tonic-helper {
        color: var(--text-muted);
        font-size: 0.94rem;
        font-weight: 800;
        line-height: 1.35;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .maqam-tonic-controls .tonic-selector {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .maqam-scale-helper-row {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        flex: 0 1 auto;
        min-width: 0;
      }

      .maqam-scale-helper-text {
        color: var(--text-muted);
        font-size: 0.94rem;
        font-weight: 800;
        line-height: 1.4;
        white-space: nowrap;
      }

      .staff-scale-box .playbar {
        margin-top: 10px;
        padding-top: 12px;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
      }

      .staff-scale-box .status-bar {
        min-height: 0;
        line-height: 1.5;
      }

      .maqam-jins-guide {
        display: grid;
        gap: 6px;
        margin-top: 12px;
        direction: ltr;
      }

      .maqam-jins-guide-seg {
        min-height: 36px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 7px 10px;
        font-size: 0.75rem;
        font-weight: 850;
        line-height: 1.2;
        border: 1px solid transparent;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
      }

      .maqam-jins-guide-seg.lower {
        background: rgba(200,164,90,0.10);
        border-color: rgba(200,164,90,0.32);
        color: #f0d28a;
      }

      .maqam-jins-guide-seg.upper {
        background: rgba(123,168,212,0.10);
        border-color: rgba(123,168,212,0.34);
        color: #c8e4ff;
      }

      .maqam-jins-guide-seg span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        letter-spacing: 0.01em;
      }

      @media (max-width: 700px) {
        .maqam-tonic-controls {
          gap: 8px;
        }

        .maqam-tonic-helper {
          font-size: 0.88rem;
          white-space: normal;
        }

        .staff-scale-box .playbar {
          gap: 8px;
        }

        .maqam-scale-helper-text {
          white-space: normal;
          font-size: 0.88rem;
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

  function injectHeroSummary(heroInner) {
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
    const splitGuideRow = document.getElementById("jins-current");
    if (splitGuideRow) {
      const oldGuideRow = document.getElementById(JINS_GUIDE_ROW_ID);
      if (oldGuideRow) oldGuideRow.remove();
      return;
    }

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
      const maqamModel = await window.MaqamContentLoader.buildMaqamContentModel(state.maqamId);
      pageRoot.setAttribute(ENHANCED_ATTR, state.maqamId);

      injectHeroSummary(heroInner);
      cleanupInitialInfoSection();

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