(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const loader = window.MaqamContentLoader || null;

  function escapeHtml(v) {
    return String(v || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function createContentCard(title, body, ph = false) {
    return `<section class="maqam-content-card ${ph ? "maqam-content-card-placeholder" : ""}"><h3>${title}</h3>${body}</section>`;
  }

  function createBulletList(items) {
    const v = Array.isArray(items) ? items.filter(Boolean) : [];
    return v.length ? `<ul class="maqam-content-list">${v.map((i) => `<li>${escapeHtml(String(i))}</li>`).join("")}</ul>` : "";
  }

  function createPlaceholderBody(m) {
    return `<p class="maqam-content-copy">${escapeHtml(m)}</p>`;
  }

  function createAccordionItem(id, title, body, open = false, level = "sub") {
    return `<div class="maqam-acc-item ${open ? "is-open" : ""}" data-acc-item="${id}" data-acc-level="${level}"><button type="button" class="maqam-acc-trigger" data-acc-trigger="${id}" aria-expanded="${open ? "true" : "false"}"><span>${title}</span></button><div class="maqam-acc-panel" data-acc-panel="${id}" ${open ? "" : "hidden"}>${body}</div></div>`;
  }

  function createDefinitionCard(model) {
    const sayr = model && model.sayr ? model.sayr : null;
    if (!sayr) {
      return `<section class="maqam-content-card maqam-content-card-placeholder maqam-definition-card"><div class="maqam-acc-root" data-acc-root="definition">${createAccordionItem("def-main", "تعريف المقام", createPlaceholderBody("سيُضاف تعريف هذا المقام لاحقًا."), true, "main")}</div></section>`;
    }

    const summary = sayr.summary
      ? `<p class="maqam-content-copy">${escapeHtml(sayr.summary)}</p>`
      : createPlaceholderBody("سيُضاف تعريف هذا المقام لاحقًا.");
    const path = createBulletList(sayr.common_path);
    const rest = createBulletList(sayr.resting_tones);
    const motion = createBulletList(sayr.motion_notes);
    const mods = createBulletList(model && (model.common_modulations || model.modulations || model.modulation_paths));

    const subItems = [
      path ? createAccordionItem("def-path", "كيف يسير المقام", path, false, "sub") : "",
      rest ? createAccordionItem("def-rest", "درجات الارتكاز", rest, false, "sub") : "",
      motion ? createAccordionItem("def-motion", "درجات الحركة", motion, false, "sub") : "",
      mods ? createAccordionItem("def-mods", "أين يذهب المقام", mods, false, "sub") : "",
    ]
      .filter(Boolean)
      .join("");

    const mainBody = `<div class="maqam-definition-summary">${summary}</div>${subItems ? `<div class="maqam-sub-accordion" data-acc-group="definition-sub">${subItems}</div>` : ""}`;
    return `<section class="maqam-content-card maqam-definition-card"><div class="maqam-acc-root" data-acc-root="definition">${createAccordionItem("def-main", "تعريف المقام", mainBody, true, "main")}</div></section>`;
  }

  function bindExclusiveAccordions(scope) {
    scope.querySelectorAll("[data-acc-trigger]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.accTrigger;
        const item = scope.querySelector(`[data-acc-item="${id}"]`);
        const level = item ? item.dataset.accLevel : "sub";
        const group = level === "main" ? scope.querySelector('[data-acc-root="definition"]') : item && item.parentElement;
        if (!item || !group) return;

        const willOpen = !item.classList.contains("is-open");
        group.querySelectorAll(":scope > .maqam-acc-item").forEach((other) => {
          other.classList.remove("is-open");
          const p = other.querySelector(":scope > [data-acc-panel]");
          const t = other.querySelector(":scope > [data-acc-trigger]");
          if (p) p.hidden = true;
          if (t) t.setAttribute("aria-expanded", "false");
        });

        if (willOpen) {
          item.classList.add("is-open");
          const panel = item.querySelector(":scope > [data-acc-panel]");
          if (panel) panel.hidden = false;
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function normalizeExampleEntries(items) {
    return (Array.isArray(items) ? items : []).filter(Boolean).map((i) => (typeof i === "string" ? { title: i } : i));
  }

  function pickFirstUrl(item, keys) {
    for (const k of keys) {
      const v = item && item[k];
      if (v && String(v).trim()) return String(v).trim();
    }
    return "";
  }

  function buildExampleActions(item) {
    const video = pickFirstUrl(item, ["video_url", "video", "youtube", "youtube_url"]);
    const audio = pickFirstUrl(item, ["audio_url", "audio", "recording_url"]);
    const link = pickFirstUrl(item, ["url", "link", "href"]);
    const a = [];
    if (video) a.push(`<a class="maqam-example-action" href="${escapeHtml(video)}" target="_blank" rel="noopener noreferrer">فيديو</a>`);
    if (audio) a.push(`<a class="maqam-example-action" href="${escapeHtml(audio)}" target="_blank" rel="noopener noreferrer">صوت</a>`);
    if (link) a.push(`<a class="maqam-example-action" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">رابط</a>`);
    return a.join("");
  }

  function createExamplesMarkup(items) {
    const v = normalizeExampleEntries(items);
    return v.length
      ? `<ul class="maqam-example-list">${v
          .map((item) => {
            const title = item.title || item.name || "";
            const perf = item.artist || item.performer || item.singer || "";
            const note = item.note || item.notes || item.description || "";
            const actions = buildExampleActions(item);
            return `<li class="maqam-example-item">${title ? `<span class="maqam-example-title">${escapeHtml(title)}</span>` : ""}${perf ? `<span class="maqam-example-meta">${escapeHtml(perf)}</span>` : ""}${note ? `<span class="maqam-example-note">${escapeHtml(note)}</span>` : ""}${actions ? `<div class="maqam-example-actions">${actions}</div>` : ""}</li>`;
          })
          .join("")}</ul>`
      : "";
  }

  function createExamplesCard(model) {
    const items = model && (model.examples || model.listening_examples || model.repertoire_examples);
    const m = createExamplesMarkup(items);
    const body = m || createPlaceholderBody("ستُضاف أمثلة الأغاني والقطع لهذا المقام لاحقًا.");
    return createContentCard("أغاني وقطع", body, !m);
  }

  function createVideoExamplesCard(model) {
    const items = model && (model.video_examples || model.video_listening_examples);
    const m = createExamplesMarkup(items);
    const body = m || createPlaceholderBody("ستُضاف أمثلة الفيديو لهذا المقام لاحقًا.");
    return createContentCard("أمثلة مرئية / فيديو", body, !m);
  }

  function createReferencesCard(model) {
    const v = model && (model.reference_recordings || model.canonical_pieces || model.references);
    const body =
      Array.isArray(v) && v.length
        ? typeof v[0] === "object"
          ? createExamplesMarkup(v)
          : createBulletList(v)
        : createPlaceholderBody("ستُضاف المصادر والمراجع لهذا المقام لاحقًا.");
    const ph = !(Array.isArray(v) && v.length);
    return `<section class="maqam-content-card ${ph ? "maqam-content-card-placeholder" : ""} maqam-sources-footer-card"><details class="maqam-sources-accordion"><summary class="maqam-sources-summary">مصادر ومراجع</summary><div class="maqam-sources-body">${body}</div></details></section>`;
  }

  async function renderMaqamContentSections() {
    const c = document.getElementById("maqam-content-sections");
    const f = document.getElementById("maqam-sources-footer");
    if (!c || !f || !loader || typeof loader.buildMaqamContentModel !== "function") return;

    try {
      const model = await loader.buildMaqamContentModel(ns.state.maqamId);
      c.innerHTML = [createDefinitionCard(model), createExamplesCard(model), createVideoExamplesCard(model)].filter(Boolean).join("");
      f.innerHTML = createReferencesCard(model);
      bindExclusiveAccordions(c);
    } catch (e) {
      c.innerHTML = [createDefinitionCard(null), createExamplesCard(null), createVideoExamplesCard(null)].filter(Boolean).join("");
      f.innerHTML = createReferencesCard(null);
      bindExclusiveAccordions(c);
    }
  }

  ns.rendererContent = {
    escapeHtml,
    renderMaqamContentSections,
  };
})();