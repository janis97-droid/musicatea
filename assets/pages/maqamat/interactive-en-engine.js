// English wrappers over the interactive maqam engine.
// Keeps the musical math and audio compatibility from the base engine,
// but localizes visible labels and note role descriptions.

(function () {
  const ns = window.InteractiveScaleApp = window.InteractiveScaleApp || {};
  const originalEngine = ns.engine || {};
  const NOTE_TOKEN_META_EN = (ns.constants && ns.constants.NOTE_TOKEN_META) || {};

  function getEnglishDisplayLabel(token, slotKey) {
    const meta = NOTE_TOKEN_META_EN[token] || {};
    const base = meta.en || token;
    const octaveMatch = String(slotKey || '').match(/(\d+)$/);
    const octave = octaveMatch ? Number(octaveMatch[1]) : 4;

    if (octave <= 3) return `${base} low`;
    if (octave >= 5) return `${base} high`;
    return base;
  }

  function getEnglishRoleDescription(idx, totalCount, displayLabel, jinsZone, isJinsStart) {
    if (idx === 0) return `${displayLabel}: tonic / root`;
    if (idx === totalCount - 1) return `${displayLabel}: octave`;
    if (jinsZone === 'upper' && isJinsStart) return `${displayLabel}: dominant and start of upper jins`;
    if (jinsZone === 'lower' && isJinsStart) return `${displayLabel}: start of lower jins`;
    if (jinsZone === 'lower') return `${displayLabel}: within lower jins`;
    if (jinsZone === 'upper') return `${displayLabel}: within upper jins`;
    return `${displayLabel}: maqam scale note`;
  }

  function buildScaleNotesEn(maqamId, tonic) {
    const interactiveId = mapEnMaqamIdToInteractive(maqamId);
    const rawNotes = typeof originalEngine.buildScaleNotes === 'function'
      ? originalEngine.buildScaleNotes(interactiveId, tonic)
      : [];

    return rawNotes.map((note, idx) => {
      const displayLabel = getEnglishDisplayLabel(note.token, note.slot_key);
      return {
        ...note,
        display_label: displayLabel,
        role_description: getEnglishRoleDescription(
          idx,
          rawNotes.length,
          displayLabel,
          note.jins_zone,
          note.is_jins_start
        )
      };
    });
  }

  function getMaqamDisplayTitleEn(maqam) {
    return maqam ? (maqam.name || maqam.latin || '') : '';
  }

  function getDisplayNameForTonicSafeEn(maqamId, tonic) {
    const maqam = getEnglishMaqamById(maqamId);
    if (!maqam) return '';
    return getDisplayNameForTonicEn(maqamId, tonic) || maqam.name;
  }

  function getScaleSectionLabelEn(maqamId) {
    return (typeof originalEngine.getMaqamDirection === 'function' && originalEngine.getMaqamDirection(mapEnMaqamIdToInteractive(maqamId)) === 'descending')
      ? 'Interactive scale (descending view)'
      : 'Tap a note or button to hear the maqam';
  }

  function getPlayButtonLabelEn(maqamId) {
    return (typeof originalEngine.getMaqamDirection === 'function' && originalEngine.getMaqamDirection(mapEnMaqamIdToInteractive(maqamId)) === 'descending')
      ? 'Play descending path'
      : 'Play scale';
  }

  ns.engine = {
    ...originalEngine,
    buildScaleNotes: buildScaleNotesEn,
    getMaqamDisplayTitle: getMaqamDisplayTitleEn,
    getDisplayNameForTonicSafe: getDisplayNameForTonicSafeEn,
    getScaleSectionLabel: getScaleSectionLabelEn,
    getPlayButtonLabel: getPlayButtonLabelEn
  };
})();
