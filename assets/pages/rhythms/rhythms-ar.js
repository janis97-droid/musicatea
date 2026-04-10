(function () {
  const core = window.rhythmsCore;

  if (!core) return;

  const grid = document.getElementById("rhythms-grid");
  const searchInput = document.getElementById("rhythm-search");
  const timeFilter = document.getElementById("time-filter");

  if (!grid || !searchInput || !timeFilter) return;

  const data = core.normalizeRhythmData(core.getRhythmsSource());

  const labels = {
    allSignatures: "زمن الإيقاع",
    empty: "لا توجد نتائج مطابقة",
    bpm: "BPM",
    play: "تشغيل",
    pause: "إيقاف",
    unavailable: "لا يوجد ملف صوتي"
  };

  core.fillTimeSignatureFilter(timeFilter, data, labels.allSignatures);

  const state = {
    query: "",
    timeSignature: ""
  };

  function createCard(rhythm) {
    const localized = rhythm._localized && rhythm._localized.ar ? rhythm._localized.ar : {};
    const card = document.createElement("article");
    card.className = "rhythm-card";
    card.innerHTML = `
      <div class="rhythm-card-header">
        <div class="rhythm-card-title-wrap">
          <h3>${escapeHtml(localized.name || "")}</h3>
        </div>
        <span class="time-sig">${escapeHtml(rhythm.time_signature || "—")}</span>
      </div>

      ${core.createImageMarkup(rhythm, localized.name || "")}

      <p class="desc">${escapeHtml(localized.description || "")}</p>

      <div class="rhythm-bpm-row">
        <span class="rhythm-bpm-value">${Number(rhythm.bpm) || 120} BPM</span>
        <input
          class="rhythm-bpm-slider"
          type="range"
          min="60"
          max="200"
          step="1"
          value="${Number(rhythm.bpm) || 120}"
          aria-label="${labels.bpm}"
        >
        <span class="rhythm-bpm-label">${labels.bpm}</span>
      </div>

      <div class="rhythm-actions">
        <button type="button" class="rhythm-play-btn">${labels.play}</button>
        <audio class="rhythm-audio" preload="none"></audio>
      </div>
    `;

    core.attachAudioControls(card, rhythm, labels);
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
