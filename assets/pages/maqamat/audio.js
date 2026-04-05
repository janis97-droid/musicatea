// assets/maqamat/audio.js
// Interactive maqam audio playback: note playback, stop logic, and scale playback state.
// Matched to current file naming style:
// - LowLa.mp3
// - La.mp3
// - HighDo.mp3
// - HighMiFlat.mp3
// - HighMiHalfFlat.mp3
//
// This version prefers the visible musical register first:
// - notes labeled "قرار" => Low...
// - notes labeled "جواب" => High...
// Then it falls back to slot_key octave and finally to the plain filename.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const audioCache = new Map();

  const TOKEN_TO_STEM = {
    "Do": "Do",
    "Dob": "DoFlat",
    "Do#": "DoSharp",
    "Do/#": "DoHalfSharp",

    "Re": "Re",
    "Reb": "ReFlat",
    "Re/b": "ReHalfFlat",
    "Re#": "ReSharp",
    "Re/#": "ReHalfSharp",

    "Mi": "Mi",
    "Mib": "MiFlat",
    "Mi/b": "MiHalfFlat",

    "Fa": "Fa",
    "Fa#": "FaSharp",
    "Fa/#": "FaHalfSharp",

    "Sol": "Sol",
    "Solb": "SolFlat",
    "Sol#": "SolSharp",
    "Sol/#": "SolHalfSharp",

    "La": "La",
    "Lab": "LaFlat",
    "La/b": "LaHalfFlat",
    "La#": "LaSharp",

    "Si": "Si",
    "Sib": "SiFlat",
    "Si/b": "SiHalfFlat"
  };

  function getToken(noteOrToken) {
    return typeof noteOrToken === "string" ? noteOrToken : noteOrToken && noteOrToken.token;
  }

  function getSlotKey(noteOrToken) {
    return typeof noteOrToken === "object" && noteOrToken ? noteOrToken.slot_key || "" : "";
  }

  function getDisplayLabel(noteOrToken) {
    return typeof noteOrToken === "object" && noteOrToken ? String(noteOrToken.display_label || "") : "";
  }

  function getOctaveFromSlotKey(slotKey) {
    const match = String(slotKey || "").match(/(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  function getPreferredRegister(noteOrToken) {
    const displayLabel = getDisplayLabel(noteOrToken);

    if (displayLabel.includes("جواب")) return "high";
    if (displayLabel.includes("قرار")) return "low";

    const octave = getOctaveFromSlotKey(getSlotKey(noteOrToken));
    if (octave !== null) {
      if (octave <= 3) return "low";
      if (octave >= 5) return "high";
    }

    return "mid";
  }

  function getPlaybackRate() {
    const tempo = Number(ns.state && ns.state.tempo) || 96;
    return Math.max(0.65, Math.min(1.8, tempo / 96));
  }

  function getGapMs() {
    const tempo = Number(ns.state && ns.state.tempo) || 96;
    return Math.max(30, Math.round((60000 / tempo) * 0.16));
  }

  function getBasePath() {
    return typeof NOTE_AUDIO_BASE_PATH === "string"
      ? NOTE_AUDIO_BASE_PATH
      : "assets/audio/notes/";
  }

  function getLegacyFilename(token) {
    if (typeof getNoteAudioFilename === "function") {
      return getNoteAudioFilename(token);
    }
    return null;
  }

  function buildCandidateUrls(noteOrToken) {
    const token = getToken(noteOrToken);
    const slotKey = getSlotKey(noteOrToken);
    const octave = getOctaveFromSlotKey(slotKey);
    const basePath = getBasePath();

    if (!token) return [];

    const stem = TOKEN_TO_STEM[token];
    const legacyFilename = getLegacyFilename(token);
    const urls = [];
    const preferredRegister = getPreferredRegister(noteOrToken);

    if (stem) {
      // First: visible register priority from label / musical role
      if (preferredRegister === "low") {
        urls.push(`${basePath}Low${stem}.mp3`);
      } else if (preferredRegister === "high") {
        urls.push(`${basePath}High${stem}.mp3`);
      } else {
        urls.push(`${basePath}${stem}.mp3`);
      }

      // Second: octave-derived candidate as backup
      if (octave !== null) {
        if (octave <= 3) {
          urls.push(`${basePath}Low${stem}.mp3`);
        } else if (octave >= 5) {
          urls.push(`${basePath}High${stem}.mp3`);
        } else {
          urls.push(`${basePath}${stem}.mp3`);
        }
      }

      // Third: plain / low / high generic fallbacks
      urls.push(`${basePath}${stem}.mp3`);
      urls.push(`${basePath}Low${stem}.mp3`);
      urls.push(`${basePath}High${stem}.mp3`);

      // Optional numeric-octave fallback if you add those later
      if (octave !== null) {
        urls.push(`${basePath}${stem}${octave}.mp3`);
      }
    }

    // Keep compatibility with old map-based filenames too
    if (legacyFilename) {
      urls.push(`${basePath}${legacyFilename}`);
    }

    return [...new Set(urls)];
  }

  function getCacheKey(url) {
    return url;
  }

  function getOrCreateAudio(url) {
    const key = getCacheKey(url);
    let audio = audioCache.get(key);

    if (!audio) {
      audio = new Audio(url);
      audio.preload = "auto";
      audioCache.set(key, audio);
    }

    return audio;
  }

  async function tryPlayUrl(url) {
    try {
      const audio = getOrCreateAudio(url);
      audio.pause();
      audio.currentTime = 0;
      audio.playbackRate = getPlaybackRate();
      await audio.play();

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
      return false;
    }
  }

  async function playSingleNote(noteOrToken) {
    const token = getToken(noteOrToken);
    const candidateUrls = buildCandidateUrls(noteOrToken);

    if (!candidateUrls.length) {
      ns.state.lastAudioErrorToken = token;
      return false;
    }

    for (const url of candidateUrls) {
      const ok = await tryPlayUrl(url);
      if (ok) {
        ns.state.lastAudioErrorToken = null;
        return true;
      }
    }

    ns.state.lastAudioErrorToken = token;
    return false;
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

    if (playIcon) {
      playIcon.innerHTML = '<rect x="5" y="3" width="4" height="18"></rect><rect x="15" y="3" width="4" height="18"></rect>';
    }
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

      if (status) {
        status.textContent = `▶ ${notes[i].display_label} — ${tempo} BPM`;
      }

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

    if (playIcon) {
      playIcon.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
    }
    if (playLabel) {
      playLabel.textContent = ns.engine.getPlayButtonLabel(ns.state.maqamId);
    }
    if (playBtn) {
      playBtn.classList.remove("is-playing");
    }

    ns.state.isPlaying = false;
    ns.state.stopRequested = false;
  }

  ns.audio = {
    playSingleNote,
    stopAllAudio,
    playScale
  };
})();
