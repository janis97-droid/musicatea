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
      missingSummary: "A fuller summary for this rhythm will be added soon.",
      whatIsIt: "What is this rhythm",
      counting: "Counting and feel",
      otherNames: "Other names",
      sourceContext: "Context and usage",
      whereUsed: "Where it appears",
      examples: "Examples",
      exampleBy: "Performed by:",
      practiceTip: "Practice tip",
      relatedRhythms: "Related rhythms",
      placeholder: "The page structure is ready. Detailed content for this rhythm can now be added in its JSON file.",
      notFound: "This rhythm could not be found."
    }
  });
})();
