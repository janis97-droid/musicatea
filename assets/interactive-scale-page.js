// assets/interactive-scale-page.js
// Interactive maqam page bootstrap: refs, state, URL sync, selection changes, and initial boot.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};

  const root = document.getElementById("interactive-page-root");
  const sidebar = document.getElementById("sidebar");
  const breadcrumbLabel = document.getElementById("current-maqam-label");
  const mainPanel = document.getElementById("main-panel");

  if (!root || !sidebar) return;

  const URL_PARAMS = new URLSearchParams(window.location.search);

  ns.refs = {
    root,
    sidebar,
    breadcrumbLabel,
    mainPanel
  };

  ns.state = {
    familyId: null,
    maqamId: null,
    tonic: null,
    activeNoteIndex: null,
    isPlaying: false,
    stopRequested: false,
    lastAudioErrorToken: null
  };

  function resolveInitialSelection(familyId, maqamId, tonic) {
    let resolvedFamily = familyId;
    let resolvedMaqam = maqamId;
    let resolvedTonic = tonic;

    if (resolvedMaqam && typeof resolveInteractiveRepresentativeSelection === 'function') {
      const representative = resolveInteractiveRepresentativeSelection(resolvedMaqam, resolvedTonic);
      resolvedMaqam = representative.maqamId;
      resolvedTonic = representative.tonic;
    }

    if (!resolvedFamily && resolvedMaqam) {
      const maqam = getMaqamById(resolvedMaqam);
      resolvedFamily = maqam ? maqam.family : null;
    }

    if (!resolvedFamily) {
      const firstMain = getInteractiveMainMaqamat()[0];
      resolvedFamily = firstMain ? firstMain.family : "rast";
    }

    const familyItems = getInteractiveFamily(resolvedFamily);
    const familyMain = getFamilyMainMaqam(resolvedFamily);

    if (!resolvedMaqam) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const maqamObj = getMaqamById(resolvedMaqam);
    if (!maqamObj || maqamObj.family !== resolvedFamily || !getInteractiveMaqamById(resolvedMaqam)) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const allowedTonics = getInteractiveTonicsForMaqam(resolvedMaqam);
    const defaultTonic = getInteractiveDefaultTonic(resolvedMaqam);
    resolvedTonic = allowedTonics.includes(resolvedTonic) ? resolvedTonic : defaultTonic;

    return { familyId: resolvedFamily, maqamId: resolvedMaqam, tonic: resolvedTonic };
  }

  function bindPageEvents() {
    const playBtn = document.getElementById("playbtn-current");
    if (playBtn) playBtn.addEventListener("click", ns.audio.playScale);
  }

  function scrollMainToTop() {
    if (mainPanel) mainPanel.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("family", ns.state.familyId);
    url.searchParams.set("maqam", ns.state.maqamId);
    url.searchParams.set("tonic", ns.state.tonic);
    window.history.replaceState({}, "", url.toString());
  }

  function setActiveNote(idx) {
    ns.state.activeNoteIndex = idx;
    ns.renderer.renderStaff();
    ns.renderer.renderKeys();
  }

  function setActiveMaqam(maqamId) {
    const representative = typeof resolveInteractiveRepresentativeSelection === 'function'
      ? resolveInteractiveRepresentativeSelection(maqamId, null)
      : { maqamId, tonic: null };

    const resolvedMaqamId = representative.maqamId;
    const maqam = getMaqamById(resolvedMaqamId);
    if (!maqam) return;

    ns.audio.stopAllAudio();
    ns.state.maqamId = resolvedMaqamId;
    ns.state.familyId = maqam.family;
    ns.state.tonic = representative.tonic || getInteractiveDefaultTonic(resolvedMaqamId);
    ns.state.activeNoteIndex = null;
    ns.state.isPlaying = false;
    ns.state.stopRequested = false;
    ns.state.lastAudioErrorToken = null;
    ns.renderer.renderAll();
    scrollMainToTop();
  }

  function setActiveTonic(tonic) {
    ns.audio.stopAllAudio();
    ns.state.tonic = tonic;
    ns.state.activeNoteIndex = null;
    ns.state.isPlaying = false;
    ns.state.stopRequested = false;
    ns.state.lastAudioErrorToken = null;
    ns.renderer.updateDisplayedName();
    ns.renderer.renderTonicSelector();
    ns.renderer.renderInfoGrid();
    ns.renderer.renderStaff();
    ns.renderer.renderKeys();
    syncUrl();
  }

  function bootstrap() {
    const requestedFamily = URL_PARAMS.get("family");
    const requestedMaqam = URL_PARAMS.get("maqam");
    const requestedTonic = URL_PARAMS.get("tonic");
    const resolved = resolveInitialSelection(requestedFamily, requestedMaqam, requestedTonic);

    ns.state.familyId = resolved.familyId;
    ns.state.maqamId = resolved.maqamId;
    ns.state.tonic = resolved.tonic;

    ns.renderer.renderAll();
  }

  ns.actions = {
    bindPageEvents,
    scrollMainToTop,
    syncUrl,
    setActiveNote,
    setActiveMaqam,
    setActiveTonic
  };

  bootstrap();
})();
