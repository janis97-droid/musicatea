(function () {
  const ACTIVE_STATE = {
    audio: null,
    button: null,
    labelPlay: "Play",
    labelPause: "Pause"
  };

  function fallbackNormalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[أإآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/[ً-ٟ]/g, "")
      .trim();
  }

  function normalizeText(value) {
    if (typeof window.normalize === "function") {
      return window.normalize(value || "");
    }
    return fallbackNormalize(value);
  }

  function getRhythmsSource() {
    if (Array.isArray(window.rhythms)) return window.rhythms;
    if (typeof rhythms !== "undefined" && Array.isArray(rhythms)) return rhythms;
    return [];
  }

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function parseSignatureValue(signature) {
    const parts = String(signature || "").split("/").map(Number);
    if (parts.length !== 2 || parts.some(Number.isNaN)) return Number.MAX_SAFE_INTEGER;
    return (parts[0] * 100) + parts[1];
  }

  function normalizeRhythmData(data) {
    return (Array.isArray(data) ? data : []).map((rhythm, index) => {
      const id = rhythm.id || slugify(rhythm.latin || rhythm.name || ("rhythm-" + index));
      const baseBpm = Number(rhythm.bpm) || 120;
      return {
        ...rhythm,
        id,
        bpm: baseBpm,
        tempo: rhythm.tempo || rhythm.tempo_label || "",
        tempo_label: rhythm.tempo_label || rhythm.tempo || "",
        image: rhythm.image || "",
        audio: rhythm.audio || "",
        _searchBlob: [
          rhythm.name,
          rhythm.latin,
          rhythm.description,
          rhythm.pattern,
          rhythm.time_signature,
          rhythm.tempo,
          rhythm.tempo_label
        ]
          .map(normalizeText)
          .filter(Boolean)
          .join(" ")
      };
    });
  }

  function fillTimeSignatureFilter(selectEl, data, firstOptionLabel) {
    if (!selectEl) return;
    const previousValue = selectEl.value;
    const signatures = [...new Set(
      (Array.isArray(data) ? data : [])
        .map(item => item.time_signature)
        .filter(Boolean)
    )].sort((a, b) => parseSignatureValue(a) - parseSignatureValue(b));

    selectEl.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = firstOptionLabel;
    selectEl.appendChild(firstOption);

    signatures.forEach(signature => {
      const option = document.createElement("option");
      option.value = signature;
      option.textContent = signature;
      selectEl.appendChild(option);
    });

    if (previousValue && signatures.includes(previousValue)) {
      selectEl.value = previousValue;
    }
  }

  function createPatternFallbackSvg(pattern) {
    const tokens = String(pattern || "")
      .replace(/\u2014/g, "-")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!tokens.length) return "";

    const pad = 12;
    const cellW = 40;
    const gap = 8;
    const width = (pad * 2) + (tokens.length * cellW) + ((tokens.length - 1) * gap);
    const height = 96;

    const cells = tokens.map((token, index) => {
      const normalized = token.toUpperCase();
      const kind = normalized === "D"
        ? "dum"
        : normalized === "T"
        ? "tek"
        : "rest";

      const x = pad + (index * (cellW + gap));
      const y = kind === "dum" ? 18 : kind === "tek" ? 28 : 38;
      const h = kind === "dum" ? 42 : kind === "tek" ? 32 : 20;
      const fill = kind === "dum"
        ? "#c8a45a"
        : kind === "tek"
        ? "#7ba8d4"
        : "rgba(255,255,255,0.08)";
      const stroke = kind === "rest" ? "rgba(255,255,255,0.12)" : "transparent";
      const label = kind === "rest" ? "–" : normalized;
      const textFill = kind === "rest" ? "#b9c0cf" : "#09101a";

      return `
        <g>
          <rect x="${x}" y="${y}" width="${cellW}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" />
          <text x="${x + (cellW / 2)}" y="${y + (h / 2) + 5}" text-anchor="middle" font-family="Cairo, sans-serif" font-size="14" font-weight="800" fill="${textFill}">${label}</text>
        </g>
      `;
    }).join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Rhythm pattern">
        <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="18" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)" />
        ${cells}
      </svg>
    `;
  }

  function createImageMarkup(rhythm, altText) {
    const fallbackSvg = createPatternFallbackSvg(rhythm ? rhythm.pattern : "");

    if (rhythm && rhythm.image) {
      return `
        <div class="rhythm-image-wrap">
          <img
            class="rhythm-image"
            src="${escapeHtml(rhythm.image)}"
            alt="${escapeHtml(altText || rhythm.name || "")}"
            loading="lazy"
            onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';"
          >
          <div class="rhythm-image-fallback" style="display:none;">
            ${fallbackSvg}
          </div>
        </div>
      `;
    }

    return `
      <div class="rhythm-image-wrap rhythm-image-fallback">
        ${fallbackSvg}
      </div>
    `;
  }

  function createEmptyRhythmState(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "empty-state";
    wrapper.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <p>${escapeHtml(message || "")}</p>
    `;
    return wrapper;
  }

  function createBpmRate(baseBpm, selectedBpm) {
    const base = Number(baseBpm) || 120;
    const selected = Number(selectedBpm) || base;
    return selected / base;
  }

  function stopCurrentRhythmAudio() {
    if (ACTIVE_STATE.audio) {
      ACTIVE_STATE.audio.pause();
      ACTIVE_STATE.audio.currentTime = 0;
    }

    if (ACTIVE_STATE.button) {
      ACTIVE_STATE.button.classList.remove("is-playing");
      ACTIVE_STATE.button.textContent = ACTIVE_STATE.labelPlay;
    }

    ACTIVE_STATE.audio = null;
    ACTIVE_STATE.button = null;
  }

  function attachAudioControls(card, rhythm, labels) {
    const button = card.querySelector(".rhythm-play-btn");
    const audio = card.querySelector(".rhythm-audio");
    const slider = card.querySelector(".rhythm-bpm-slider");
    const value = card.querySelector(".rhythm-bpm-value");

    const playLabel = labels && labels.play ? labels.play : "Play";
    const pauseLabel = labels && labels.pause ? labels.pause : "Pause";
    const unavailableLabel = labels && labels.unavailable ? labels.unavailable : "Unavailable";

    if (!button || !audio || !slider || !value) return;

    const baseBpm = Number(rhythm && rhythm.bpm) || 120;

    function syncSlider() {
      const selectedBpm = Number(slider.value) || baseBpm;
      value.textContent = `${selectedBpm} BPM`;
      audio.playbackRate = createBpmRate(baseBpm, selectedBpm);
    }

    slider.value = String(baseBpm);
    syncSlider();

    slider.addEventListener("input", syncSlider);

    if (!rhythm || !rhythm.audio) {
      button.disabled = true;
      button.textContent = unavailableLabel;
      return;
    }

    audio.src = rhythm.audio;

    button.addEventListener("click", () => {
      if (ACTIVE_STATE.audio && ACTIVE_STATE.audio !== audio) {
        stopCurrentRhythmAudio();
      }

      if (audio.paused) {
        syncSlider();
        audio.play()
          .then(() => {
            ACTIVE_STATE.audio = audio;
            ACTIVE_STATE.button = button;
            ACTIVE_STATE.labelPlay = playLabel;
            ACTIVE_STATE.labelPause = pauseLabel;
            button.classList.add("is-playing");
            button.textContent = pauseLabel;
          })
          .catch(() => {
            button.textContent = unavailableLabel;
          });
      } else {
        stopCurrentRhythmAudio();
      }
    });

    audio.addEventListener("ended", () => {
      if (ACTIVE_STATE.audio === audio) {
        stopCurrentRhythmAudio();
      }
    });
  }

  function filterRhythms(data, state) {
    const q = normalizeText(state && state.query ? state.query : "");
    const timeSignature = state && state.timeSignature ? state.timeSignature : "";

    return (Array.isArray(data) ? data : []).filter(rhythm => {
      const matchesQuery = !q || (rhythm._searchBlob || "").includes(q);
      const matchesTime = !timeSignature || rhythm.time_signature === timeSignature;
      return matchesQuery && matchesTime;
    });
  }

  function renderRhythmGrid(container, data, createCard, emptyMessage) {
    if (!container) return;
    container.innerHTML = "";

    if (!Array.isArray(data) || !data.length) {
      container.appendChild(createEmptyRhythmState(emptyMessage || ""));
      return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach((rhythm, index) => {
      const card = createCard(rhythm, index);
      if (!card) return;
      card.style.setProperty("--card-index", index);
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  }

  window.rhythmsCore = {
    normalizeText,
    getRhythmsSource,
    normalizeRhythmData,
    slugify,
    parseSignatureValue,
    fillTimeSignatureFilter,
    createPatternFallbackSvg,
    createImageMarkup,
    createEmptyRhythmState,
    createBpmRate,
    stopCurrentRhythmAudio,
    attachAudioControls,
    filterRhythms,
    renderRhythmGrid
  };
})();
