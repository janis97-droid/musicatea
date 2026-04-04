// assets/interactive-scale-fix.js
// Restores tempo control and provides a synth fallback when note audio files are missing.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};

  function injectTempoStyles() {
    if (document.getElementById('interactive-tempo-fix-style')) return;
    const style = document.createElement('style');
    style.id = 'interactive-tempo-fix-style';
    style.textContent = `
      .tempo-control {
        display:flex;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
        margin-inline-start: 8px;
      }
      .tempo-label {
        font-size:.74rem;
        color:var(--text-muted);
        font-weight:700;
        white-space:nowrap;
      }
      .tempo-label span {
        color:var(--gold-light);
      }
      .tempo-slider {
        width:140px;
        accent-color: var(--gold);
      }
      @media(max-width:768px) {
        .playbar { flex-wrap:wrap; }
        .tempo-control {
          order:2;
          width:100%;
          margin-inline-start:0;
          justify-content:space-between;
        }
        .tempo-slider { width:100%; }
        .status-bar {
          width:100%;
          margin-right:0;
          order:3;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureTempoState() {
    if (!ns.state) return;
    if (!Number.isFinite(Number(ns.state.tempo))) ns.state.tempo = 96;
  }

  function injectTempoControl() {
    ensureTempoState();
    const playbar = document.querySelector('.playbar');
    if (!playbar || document.getElementById('tempo-current')) return;

    const status = document.getElementById('status-current');
    const wrap = document.createElement('div');
    wrap.className = 'tempo-control';
    wrap.innerHTML = `
      <label class="tempo-label" for="tempo-current">السرعة <span id="tempo-value-current">${ns.state.tempo}</span> BPM</label>
      <input class="tempo-slider" id="tempo-current" type="range" min="50" max="180" step="1" value="${ns.state.tempo}">
    `;

    if (status) {
      playbar.insertBefore(wrap, status);
    } else {
      playbar.appendChild(wrap);
    }

    const slider = wrap.querySelector('#tempo-current');
    const value = wrap.querySelector('#tempo-value-current');
    const syncTempo = () => {
      ns.state.tempo = Number(slider.value) || 96;
      value.textContent = String(ns.state.tempo);
    };
    slider.addEventListener('input', syncTempo);
    slider.addEventListener('change', syncTempo);
    syncTempo();
  }

  let audioContext = null;

  function getAudioContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContext) audioContext = new AudioCtx();
    return audioContext;
  }

  async function unlockAudioContext() {
    const ctx = getAudioContext();
    if (!ctx) return null;
    if (ctx.state === 'suspended') {
      try { await ctx.resume(); } catch (e) {}
    }
    return ctx;
  }

  function getBeatMs() {
    ensureTempoState();
    return Math.max(180, Math.round(60000 / (Number(ns.state.tempo) || 96)));
  }

  function getFrequency(noteOrToken) {
    const metaMap = ns.constants && ns.constants.NOTE_TOKEN_META;
    if (!metaMap) return null;

    const token = typeof noteOrToken === 'string' ? noteOrToken : noteOrToken && noteOrToken.token;
    const slotKey = typeof noteOrToken === 'object' && noteOrToken ? noteOrToken.slot_key : '';
    const meta = token ? metaMap[token] : null;
    if (!meta) return null;

    const octaveMatch = String(slotKey || '').match(/(\d+)$/);
    const octave = octaveMatch ? Number(octaveMatch[1]) : 4;
    const c4 = 261.625565;
    const quarterStepsFromC4 = meta.qt + ((octave - 4) * 24);
    return c4 * Math.pow(2, quarterStepsFromC4 / 24);
  }

  async function synthNote(noteOrToken) {
    const ctx = await unlockAudioContext();
    const frequency = getFrequency(noteOrToken);
    if (!ctx || !frequency) return false;

    const now = ctx.currentTime;
    const duration = Math.min(1.05, Math.max(0.18, getBeatMs() * 0.72 / 1000));

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    gain.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(frequency, now);
    osc1.connect(gain);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, now);
    osc2.detune.setValueAtTime(3, now);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.024, now);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);

    await new Promise(resolve => setTimeout(resolve, Math.round(duration * 1000)));
    return true;
  }

  async function waitForAudioResult(audio) {
    return new Promise(resolve => {
      let settled = false;
      const finish = ok => {
        if (settled) return;
        settled = true;
        audio.removeEventListener('ended', onEnd);
        audio.removeEventListener('error', onError);
        clearTimeout(timeoutId);
        resolve(ok);
      };
      const onEnd = () => finish(true);
      const onError = () => finish(false);
      const timeoutId = setTimeout(() => finish(false), 1800);
      audio.addEventListener('ended', onEnd, { once: true });
      audio.addEventListener('error', onError, { once: true });
    });
  }

  function patchAudio() {
    if (!ns.audio || ns.audio.__tempoAndSynthPatched) return;
    const originalPlaySingleNote = ns.audio.playSingleNote;
    const originalStopAllAudio = ns.audio.stopAllAudio;

    ns.audio.playSingleNote = async function (noteOrToken) {
      const token = typeof noteOrToken === 'string' ? noteOrToken : noteOrToken && noteOrToken.token;
      let fileWorked = false;

      if (typeof originalPlaySingleNote === 'function' && token) {
        try {
          fileWorked = await originalPlaySingleNote(token);
        } catch (e) {
          fileWorked = false;
        }
      }

      if (fileWorked) {
        ns.state.lastAudioErrorToken = null;
        return true;
      }

      const synthWorked = await synthNote(noteOrToken || token);
      ns.state.lastAudioErrorToken = synthWorked ? null : token || null;
      return synthWorked;
    };

    ns.audio.playScale = async function () {
      if (ns.state.isPlaying) {
        ns.state.stopRequested = true;
        if (typeof originalStopAllAudio === 'function') originalStopAllAudio();
        return;
      }

      const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
      const status = document.getElementById('status-current');
      const playIcon = document.getElementById('playicon-current');
      const playLabel = document.getElementById('playlabel-current');
      const playBtn = document.getElementById('playbtn-current');
      const beatMs = getBeatMs();

      ns.state.isPlaying = true;
      ns.state.stopRequested = false;

      if (playIcon) playIcon.innerHTML = '<rect x="5" y="3" width="4" height="18"></rect><rect x="15" y="3" width="4" height="18"></rect>';
      if (playLabel) playLabel.textContent = 'إيقاف التشغيل';
      if (playBtn) playBtn.classList.add('is-playing');
      if (status) {
        status.className = 'status-bar on';
        status.textContent = `السرعة: ${ns.state.tempo} BPM`;
      }

      for (let i = 0; i < notes.length; i++) {
        if (ns.state.stopRequested) break;
        ns.state.activeNoteIndex = i;
        ns.renderer.renderStaff();
        ns.renderer.renderKeys();
        if (status) status.textContent = `▶ ${notes[i].display_label} — ${ns.state.tempo} BPM`;
        await ns.audio.playSingleNote(notes[i]);
        await new Promise(resolve => setTimeout(resolve, Math.max(18, Math.round(beatMs * 0.14))));
      }

      ns.state.activeNoteIndex = null;
      ns.renderer.renderStaff();
      ns.renderer.renderKeys();

      if (status) {
        status.textContent = ns.state.lastAudioErrorToken ? `تعذر تشغيل: ${ns.state.lastAudioErrorToken}` : '';
        status.className = ns.state.lastAudioErrorToken ? 'status-bar on' : 'status-bar';
      }
      if (playIcon) playIcon.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
      if (playLabel) playLabel.textContent = ns.engine.getPlayButtonLabel(ns.state.maqamId);
      if (playBtn) playBtn.classList.remove('is-playing');

      ns.state.isPlaying = false;
      ns.state.stopRequested = false;
    };

    ns.audio.__tempoAndSynthPatched = true;
  }

  function patchRenderer() {
    if (!ns.renderer || ns.renderer.__tempoControlPatched) return;
    const originalRenderPageShell = ns.renderer.renderPageShell;
    ns.renderer.renderPageShell = function () {
      originalRenderPageShell();
      injectTempoStyles();
      injectTempoControl();
    };
    ns.renderer.__tempoControlPatched = true;
  }

  function init() {
    injectTempoStyles();
    ensureTempoState();
    patchAudio();
    patchRenderer();
    injectTempoControl();
  }

  init();
})();
