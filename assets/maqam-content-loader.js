// assets/maqam-content-loader.js
// Shared content loader for maqam/family JSON content.
// Repo-compatible for static GitHub Pages usage.

(function () {
  const CONTENT_ROOT = "data/maqam-content";
  const cache = new Map();

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
    return fetchJson(`${CONTENT_ROOT}/families/${familyId}.json`);
  }

  async function loadMaqamContent(maqamId) {
    if (!maqamId) {
      throw new Error("Missing maqamId.");
    }
    return fetchJson(`${CONTENT_ROOT}/maqamat/${maqamId}.json`);
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
    loadBibliography,
    loadFamilyContent,
    loadMaqamContent,
    getReferenceById,
    getReferencesByIds,
    buildFamilyContentModel,
    buildMaqamContentModel,
    clearContentCache
  };
})();
