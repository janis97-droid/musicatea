(function () {
  if (typeof window.renderRhythmDetailPage !== "function") return;

  window.renderRhythmDetailPage({
    lang: "en",
    labels: {
      pageTitle: "Rhythm Detail",
      fallbackTitle: "Rhythm",
      bpm: "BPM",
      play: "Play Sample",
      pause: "Pause Sample",
      unavailable: "Sample Unavailable",
      sourceContextOrOrigin: "Source context or origin",
      otherNames: "Other names",
      examples: "Examples in songs, pieces, or instrumental works",
      exampleBy: "Performed by:",
      relatedRhythms: "Related rhythms",
      placeholder: "You can now add the source context or origin, other names if there are any, examples, and related rhythms for this page.",
      notFound: "This rhythm could not be found."
    }
  });
})();
