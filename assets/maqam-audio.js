// assets/maqam-audio.js
// Interactive maqam audio playback: note playback, stop logic, and scale playback state.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const audioCache = new Map();

  function getToken(noteOrToken) {
    return typeof noteOrToken === "string" ? noteOrToken : noteOrToken && noteOrToken.token;
  }

  function getPlaybackRate() {
    const tempo = Number(ns.state && ns.state.tempo) || 96;
    return Math.max(0.65, Math.min(1.8, tempo / 96));
  }

  function getGapMs() {
    const tempo = Number(ns.state && ns.state.tempo) || 96;
    return Math.max(30, Math.round(60000 / tempo * 0.16));
  }

  async function playSingleNote(noteOrToken) {
    const token = getToken(noteOrToken);

    if (typeof getNoteAudioUrl !== "function") {
      ns.state.lastAudioErrorToken = token;
      return false;
    }

    const url = getNoteAudioUrl(token);
    if (!url) {
      ns.state.lastAudioErrorToken = token;
      return false;
    }

    try {
      let audio = audioCache.get(token);
      if (!audio) {
        audio = new Audio(url);
        audio.preload = "auto";
        audioCache.set(token, audio);
      }

      audio.pause();
      audio.currentTime = 0;
      audio.playbackRate = getPlaybackRate();
      await audio.play();
      ns.state.lastAudioErrorToken = null;

      await new Promise(resolve => {
        const done = () => {
          audio.removeEventListener("ended", done);
          audio.removeEventListener("error", done);
          resolve();
        };
        audio.addEventListener("ended", done, { once: true });
        audio.addEventListener("error", done, { once: true });
      });

      return true;
    } catch (err) {
      ns.state.lastAudioErrorToken = token;
      return false;
    }
  }

  function stopAllAudio() {
    audioCache.forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    });
  }

  async function playScale() {
    if (ns.state.isPlaying) {
      ns.state.stopRequested = true;
      stopAllAudio();
      return;
    }

    const notes = ns.engine.buildScaleNotes(ns.state.maqamId, ns.state.tonic);
    const status = document.getElementById("status-current");
    const playIcon = document.getElementById("playicon-current");
    const playLabel = document.getElementById("playlabel-current");
    const playBtn = document.getElementById("playbtn-current");
    const tempo = Number(ns.state && ns.state.tempo) || 96;

    ns.state.isPlaying = true;
    ns.state.stopRequested = false;

    if (playIcon) playIcon.innerHTML = '<rect x="5" y="3" width="4" height="18"></rect><rect x="15" y="3" width="4" height="18"></rect>';
    if (playLabel) playLabel.textContent = "إيقاف التشغيل";
    if (playBtn) playBtn.classList.add("is-playing");
    if (status) {
      status.className = "status-bar on";
      status.textContent = `السرعة: ${tempo} BPM`;
    }

    for (let i = 0; i < notes.length; i++) {
      if (ns.state.stopRequested) break;
      ns.state.activeNoteIndex = i;
      ns.renderer.renderStaff();
      ns.renderer.renderKeys();

      if (status) status.textContent = `▶ ${notes[i].display_label} — ${tempo} BPM`;

      await playSingleNote(notes[i]);
      await new Promise(resolve => setTimeout(resolve, getGapMs()));
    }

    ns.state.activeNoteIndex = null;
    ns.renderer.renderStaff();
    ns.renderer.renderKeys();

    if (status) {
      status.textContent = ns.state.lastAudioErrorToken ? `ملف الصوت غير موجود: ${ns.state.lastAudioErrorToken}` : "";
      status.className = ns.state.lastAudioErrorToken ? "status-bar on" : "status-bar";
    }
    if (playIcon) playIcon.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
    if (playLabel) playLabel.textContent = ns.engine.getPlayButtonLabel(ns.state.maqamId);
    if (playBtn) playBtn.classList.remove("is-playing");

    ns.state.isPlaying = false;
    ns.state.stopRequested = false;
  }

  ns.audio = {
    playSingleNote,
    stopAllAudio,
    playScale
  };
})();
