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

  function getLocalizedText(value, lang) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (value[lang]) return value[lang];
      if (value.ar) return value.ar;
      if (value.en) return value.en;
      return "";
    }
    return value || "";
  }

  function getLocalizedList(value, lang) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const localized = value[lang] || value.ar || value.en || [];
      return Array.isArray(localized) ? localized : [];
    }
    return Array.isArray(value) ? value : [];
  }

  function normalizeRhythmData(data) {
    return (Array.isArray(data) ? data : []).map((rhythm, index) => {
      const id = rhythm.id || slugify(getLocalizedText(rhythm.name, "en") || getLocalizedText(rhythm.name, "ar") || ("rhythm-" + index));
      const baseBpm = Number(rhythm.bpm) || 120;

      const nameAr = getLocalizedText(rhythm.name, "ar");
      const nameEn = getLocalizedText(rhythm.name, "en");
      const descAr = getLocalizedText(rhythm.description, "ar");
      const descEn = getLocalizedText(rhythm.description, "en");
      const usageAr = getLocalizedList(rhythm.usage, "ar");
      const usageEn = getLocalizedList(rhythm.usage, "en");

      return {
        ...rhythm,
        id,
        bpm: baseBpm,
        image: rhythm.image || "",
        audio: rhythm.audio || "",
        _localized: {
          ar: {
            name: nameAr,
            description: descAr,
            usage: usageAr
          },
          en: {
            name: nameEn,
            description: descEn,
            usage: usageEn
          }
        },
        _searchBlob: [
          nameAr,
          nameEn,
          descAr,
          descEn,
          usageAr.join(" "),
          usageEn.join(" "),
          rhythm.time_signature
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

  function createImageMarkup(rhythm, altText) {
    if (rhythm && rhythm.image) {
      return `
        <div class="rhythm-image-wrap">
          <img
            class="rhythm-image"
            src="${escapeHtml(rhythm.image)}"
            alt="${escapeHtml(altText || "")}"
            loading="lazy"
          >
        </div>
      `;
    }

    return `
      <div class="rhythm-image-wrap rhythm-image-fallback">
        <div class="rhythm-image-fallback-empty"></div>
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
    getLocalizedText,
    getLocalizedList,
    normalizeRhythmData,
    slugify,
    parseSignatureValue,
    fillTimeSignatureFilter,
    createImageMarkup,
    createEmptyRhythmState,
    createBpmRate,
    stopCurrentRhythmAudio,
    attachAudioControls,
    filterRhythms,
    renderRhythmGrid
  };
})();
