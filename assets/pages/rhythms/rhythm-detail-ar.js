(function () {
  if (typeof window.renderRhythmDetailPage !== "function") return;

  window.renderRhythmDetailPage({
    lang: "ar",
    labels: {
      pageTitle: "تفاصيل الإيقاع",
      fallbackTitle: "الإيقاع",
      bpm: "BPM",
      play: "تشغيل",
      pause: "إيقاف",
      unavailable: "لا يوجد ملف صوتي",
      sourceContextOrOrigin: "المصدر أو السياق أو الأصل",
      otherNames: "أسماء أخرى",
      examples: "أمثلة في الأغاني أو القطع أو الأعمال الآلية",
      exampleBy: "الأداء:",
      relatedRhythms: "إيقاعات مرتبطة",
      placeholder: "يمكن الآن إضافة المصدر أو السياق أو الأصل، وأسماء أخرى إن وجدت، والأمثلة، والإيقاعات المرتبطة لهذا الإيقاع.",
      notFound: "تعذر العثور على هذا الإيقاع."
    }
  });
})();
