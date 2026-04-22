// assets/maqam-content-loader.js
// Shared content loader for maqam/family JSON content.
// Supports localized content files:
// - *.ar.json for Arabic pages
// - *.en.json for English pages
// Falls back to plain *.json when localized files do not exist.

(function () {
  const CONTENT_ROOT = "data/maqam-content";
  const cache = new Map();

  const MAQAM_ID_ALIASES = {
    bayat: "bayati"
  };

  const FAMILY_ID_ALIASES = {
    bayat: "bayati"
  };

  function getPageLanguage() {
    const lang = (document.documentElement.getAttribute("lang") || "ar").toLowerCase();
    return lang.startsWith("en") ? "en" : "ar";
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

  async function fetchJsonWithFallback(paths) {
    const normalized = Array.isArray(paths) ? paths.filter(Boolean) : [];
    if (!normalized.length) {
      throw new Error("Missing JSON path candidates.");
    }

    let lastError = null;

    for (const path of normalized) {
      try {
        return await fetchJson(path);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Failed to load any candidate JSON path.");
  }

  function buildLocalizedCandidates(relativePathWithoutExtension) {
    const lang = getPageLanguage();
    return [
      `${CONTENT_ROOT}/${relativePathWithoutExtension}.${lang}.json`,
      `${CONTENT_ROOT}/${relativePathWithoutExtension}.json`
    ];
  }

  function resolveMaqamContentId(maqamId) {
    return MAQAM_ID_ALIASES[maqamId] || maqamId;
  }

  function resolveFamilyContentId(familyId) {
    return FAMILY_ID_ALIASES[familyId] || familyId;
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function normalizeObject(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  }

  async function loadBibliography() {
    return fetchJson(`${CONTENT_ROOT}/bibliography.json`);
  }

  async function loadFamilyContent(familyId) {
    if (!familyId) {
      throw new Error("Missing familyId.");
    }
    const resolvedFamilyId = resolveFamilyContentId(familyId);
    return fetchJsonWithFallback(buildLocalizedCandidates(`families/${resolvedFamilyId}`));
  }

  async function loadMaqamContent(maqamId) {
    if (!maqamId) {
      throw new Error("Missing maqamId.");
    }
    const resolvedMaqamId = resolveMaqamContentId(maqamId);
    return fetchJsonWithFallback(buildLocalizedCandidates(`maqamat/${resolvedMaqamId}`));
  }

  async function getReferenceById(referenceId) {
    const bibliography = await loadBibliography();
    return bibliography[referenceId] || null;
  }

  async function getReferencesByIds(referenceIds) {
    const bibliography = await loadBibliography();
    return normalizeArray(referenceIds)
      .map(id => bibliography[id] || null)
      .filter(Boolean);
  }

  async function buildFamilyContentModel(familyId) {
    const [family, bibliography] = await Promise.all([
      loadFamilyContent(familyId),
      loadBibliography()
    ]);

    const model = deepClone(family);
    model.members = normalizeArray(model.members);
    model.member_cards = normalizeArray(model.member_cards);
    model.family_logic = normalizeArray(model.family_logic);
    model.historical_notes = normalizeArray(model.historical_notes);
    model.references = normalizeArray(model.references)
      .map(id => bibliography[id] || null)
      .filter(Boolean);

    return model;
  }

  async function buildMaqamContentModel(maqamId) {
    const [maqam, bibliography] = await Promise.all([
      loadMaqamContent(maqamId),
      loadBibliography()
    ]);

    const model = deepClone(maqam);
    model.quick_facts = normalizeObject(model.quick_facts);
    model.jins_architecture = normalizeObject(model.jins_architecture);
    model.sayr = normalizeObject(model.sayr);
    model.historical_notes = normalizeArray(model.historical_notes);
    model.school_differences = normalizeArray(model.school_differences);
    model.related_maqamat = normalizeArray(model.related_maqamat);
    model.common_confusions = normalizeArray(model.common_confusions);
    model.listening_notes = normalizeArray(model.listening_notes);
    model.references = normalizeArray(model.references)
      .map(id => bibliography[id] || null)
      .filter(Boolean);

    return model;
  }

  function clearContentCache() {
    cache.clear();
  }

  window.MaqamContentLoader = {
    CONTENT_ROOT,
    fetchJson,
    fetchJsonWithFallback,
    loadBibliography,
    loadFamilyContent,
    loadMaqamContent,
    getReferenceById,
    getReferencesByIds,
    buildFamilyContentModel,
    buildMaqamContentModel,
    clearContentCache,
    getPageLanguage,
    resolveMaqamContentId,
    resolveFamilyContentId
  };
})();