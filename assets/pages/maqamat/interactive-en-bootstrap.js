// English interactive maqam page bootstrap: refs, state, URL sync, selection changes, and initial boot.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};

  const root = document.getElementById('interactive-page-root-en');
  const sidebar = document.getElementById('sidebar-en');
  const breadcrumbLabel = document.getElementById('current-maqam-label-en');
  const mainPanel = document.getElementById('main-panel-en');

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
    tempo: 96,
    activeNoteIndex: null,
    isPlaying: false,
    stopRequested: false,
    lastAudioErrorToken: null
  };

  function ensureTempoStyles() {
    if (document.getElementById('interactive-tempo-style-en')) return;

    const style = document.createElement('style');
    style.id = 'interactive-tempo-style-en';
    style.textContent = `
      .tempo-control {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-inline-start: 8px;
      }

      .tempo-label {
        font-size: .74rem;
        color: var(--text-muted);
        font-weight: 700;
        white-space: nowrap;
      }

      .tempo-label span {
        color: var(--gold-light);
      }

      .tempo-slider {
        width: 140px;
        accent-color: var(--gold);
      }

      @media (max-width: 768px) {
        .playbar {
          flex-wrap: wrap;
        }

        .tempo-control {
          order: 2;
          width: 100%;
          margin-inline-start: 0;
          justify-content: space-between;
        }

        .tempo-slider {
          width: 100%;
        }

        .status-bar {
          width: 100%;
          margin-right: 0;
          order: 3;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureTempoControl() {
    ensureTempoStyles();

    const playbar = document.querySelector('.playbar');
    if (!playbar || document.getElementById('tempo-current-en')) return;

    const status = document.getElementById('status-current');
    const wrap = document.createElement('div');
    wrap.className = 'tempo-control';
    wrap.innerHTML = `
      <label class="tempo-label" for="tempo-current-en">Tempo <span id="tempo-value-current-en">${ns.state.tempo}</span> BPM</label>
      <input class="tempo-slider" id="tempo-current-en" type="range" min="50" max="180" step="1" value="${ns.state.tempo}">
    `;

    if (status) {
      playbar.insertBefore(wrap, status);
    } else {
      playbar.appendChild(wrap);
    }
  }

  function resolveInitialSelection(familyId, maqamId, tonic) {
    let resolvedFamily = familyId;
    let resolvedMaqam = maqamId;
    let resolvedTonic = tonic;

    if (resolvedMaqam) {
      const representative = resolveInteractiveRepresentativeSelectionEn(resolvedMaqam, resolvedTonic);
      resolvedMaqam = representative.maqamId;
      resolvedTonic = representative.tonic;
    }

    if (!resolvedFamily && resolvedMaqam) {
      const maqam = getEnglishMaqamById(resolvedMaqam);
      resolvedFamily = maqam ? maqam.family : null;
    }

    if (!resolvedFamily) {
      const firstMain = getInteractiveMainMaqamatEn()[0];
      resolvedFamily = firstMain ? firstMain.family : 'rast';
    }

    const familyItems = getInteractiveFamilyEn(resolvedFamily);
    const familyMain = getFamilyMainMaqamEn(resolvedFamily);

    if (!resolvedMaqam) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const maqamObj = getEnglishMaqamById(resolvedMaqam);
    if (!maqamObj || maqamObj.family !== resolvedFamily) {
      resolvedMaqam = familyMain ? familyMain.id : (familyItems[0] ? familyItems[0].id : null);
    }

    const allowedTonics = getInteractiveTonicsForMaqamEn(resolvedMaqam);
    const defaultTonic = getInteractiveDefaultTonicEn(resolvedMaqam);
    resolvedTonic = allowedTonics.includes(resolvedTonic) ? resolvedTonic : defaultTonic;

    return { familyId: resolvedFamily, maqamId: resolvedMaqam, tonic: resolvedTonic };
  }

  function bindPageEvents() {
    ensureTempoControl();

    const playBtn = document.getElementById('playbtn-current');
    const tempoSlider = document.getElementById('tempo-current-en');
    const tempoValue = document.getElementById('tempo-value-current-en');

    if (playBtn && !playBtn.dataset.boundPlay) {
      playBtn.addEventListener('click', ns.audio.playScale);
      playBtn.dataset.boundPlay = 'true';
    }

    if (tempoSlider && !tempoSlider.dataset.boundTempo) {
      const syncTempo = () => {
        ns.state.tempo = Number(tempoSlider.value) || 96;
        if (tempoValue) tempoValue.textContent = String(ns.state.tempo);
      };

      tempoSlider.addEventListener('input', syncTempo);
      tempoSlider.addEventListener('change', syncTempo);
      tempoSlider.dataset.boundTempo = 'true';
      syncTempo();
    }
  }

  function scrollMainToTop() {
    if (mainPanel) mainPanel.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('family', ns.state.familyId);
    url.searchParams.set('maqam', ns.state.maqamId);
    url.searchParams.set('tonic', ns.state.tonic);
    window.history.replaceState({}, '', url.toString());
  }

  function setActiveNote(idx) {
    ns.state.activeNoteIndex = idx;
    ns.renderer.renderStaff();
    ns.renderer.renderKeys();
  }

  function setActiveMaqam(maqamId) {
    const representative = resolveInteractiveRepresentativeSelectionEn(maqamId, null);
    const resolvedMaqamId = representative.maqamId;
    const maqam = getEnglishMaqamById(resolvedMaqamId);
    if (!maqam) return;

    ns.audio.stopAllAudio();
    ns.state.maqamId = resolvedMaqamId;
    ns.state.familyId = maqam.family;
    ns.state.tonic = representative.tonic || getInteractiveDefaultTonicEn(resolvedMaqamId);
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
    const requestedFamily = URL_PARAMS.get('family');
    const requestedMaqam = URL_PARAMS.get('maqam');
    const requestedTonic = URL_PARAMS.get('tonic');
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
