(function () {
  const core = window.rhythmsCore;

  if (!core) return;

  const grid = document.getElementById("rhythms-grid");
  const searchInput = document.getElementById("rhythm-search");
  const timeFilter = document.getElementById("time-filter");

  if (!grid || !searchInput || !timeFilter) return;

  const data = core.normalizeRhythmData(core.getRhythmsSource());

  const labels = {
    allSignatures: "All signatures",
    empty: "No matching rhythms found",
    openPage: "Rhythm page"
  };

  core.fillTimeSignatureFilter(timeFilter, data, labels.allSignatures);

  const state = {
    query: "",
    timeSignature: ""
  };

  function createCard(rhythm) {
    const localized = rhythm._localized && rhythm._localized.en ? rhythm._localized.en : {};
    const card = document.createElement("a");
    card.className = "rhythm-card rhythm-card-link";
    card.href = core.getDetailPageHref(rhythm.id, "en");
    card.setAttribute("aria-label", `Open ${localized.name || "rhythm"} page`);
    card.innerHTML = `
      <div class="rhythm-card-header">
        <div class="rhythm-card-title-wrap">
          <h3>${escapeHtml(localized.name || "")}</h3>
        </div>
        <span class="time-sig">${escapeHtml(rhythm.time_signature || "—")}</span>
      </div>

      ${core.createImageMarkup(rhythm, localized.name || "")}

      <div class="rhythm-card-footer">
        <span class="rhythm-card-cta">
          <span>${labels.openPage}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="M13 6l6 6-6 6"></path>
          </svg>
        </span>
      </div>
    `;

    return card;
  }

  function render() {
    const filtered = core.filterRhythms(data, state);
    core.renderRhythmGrid(grid, filtered, createCard, labels.empty);
  }

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value || "";
    render();
  });

  timeFilter.addEventListener("change", (event) => {
    state.timeSignature = event.target.value || "";
    render();
  });

  render();
})();
