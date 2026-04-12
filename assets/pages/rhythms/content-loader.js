// assets/pages/rhythms/content-loader.js
(function () {
  const CONTENT_ROOT = "data/rhythm-content/rhythms";
  const cache = new Map();

  function getPageLanguage() {
    const lang = (document.documentElement.getAttribute("lang") || "ar").toLowerCase();
    return lang.startsWith("en") ? "en" : "ar";
  }

  function isLocalizedMap(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const keys = Object.keys(value);
    if (!keys.length) return false;
    return keys.every(key => key === "ar" || key === "en");
  }

  function resolveLocalizedValue(value, lang) {
    if (Array.isArray(value)) {
      return value
        .map(item => resolveLocalizedValue(item, lang))
        .filter(item => item !== null && item !== undefined && item !== "");
    }

    if (isLocalizedMap(value)) {
      return value[lang] || value.ar || value.en || "";
    }

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, resolveLocalizedValue(item, lang)])
      );
    }

    return value;
  }

  async function fetchJson(path) {
    const normalizedPath = String(path || "").replace(/^\.\//, "");
    if (!normalizedPath) {
      throw new Error("Missing JSON path.");
    }

    if (cache.has(normalizedPath)) {
      return cache.get(normalizedPath);
    }

    const promise = fetch(normalizedPath, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(async response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${normalizedPath} (${response.status})`);
      }
      return response.json();
    });

    cache.set(normalizedPath, promise);
    return promise;
  }

  async function loadRhythmContent(rhythmId) {
    if (!rhythmId) {
      throw new Error("Missing rhythmId.");
    }

    return fetchJson(`${CONTENT_ROOT}/${rhythmId}.json`);
  }

  async function loadRhythmContentSafe(rhythmId) {
    try {
      return await loadRhythmContent(rhythmId);
    } catch (error) {
      return null;
    }
  }

  window.RhythmContentLoader = {
    CONTENT_ROOT,
    getPageLanguage,
    fetchJson,
    loadRhythmContent,
    loadRhythmContentSafe,
    resolveLocalizedValue
  };
})();
