const rhythms = [
  {
    id: "maqsum",
    name: { ar: "مقسوم", en: "Maqsum" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/maqsum.mp3",
    image: "media/rhythms/images/maqsum.svg"
  },
  {
    id: "baladi_masmoudi_saghir",
    name: { ar: "بلدي (مصمودي صغير)", en: "Baladi (Masmoudi Saghir)" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/baladi.mp3",
    image: "media/rhythms/images/baladi_masmoudi_saghir.svg"
  },
  {
    id: "saidi",
    name: { ar: "صعيدي", en: "Sa'idi" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/saidi.mp3",
    image: "media/rhythms/images/saidi.svg"
  },
  {
    id: "malfuf",
    name: { ar: "ملفوف", en: "Malfuf" },
    time_signature: "2/4",
    examples: [],
    audio: "media/rhythms/malfuf.mp3",
    image: "media/rhythms/images/malfuf.svg"
  },
  {
    id: "ayyub",
    name: { ar: "أيّوب", en: "Ayoub" },
    time_signature: "2/4",
    examples: [],
    audio: "media/rhythms/ayyub.mp3",
    image: "media/rhythms/images/ayyub.svg"
  },
  {
    id: "samai_thaqil",
    name: { ar: "سماعي ثقيل", en: "Sama'i Thaqil" },
    time_signature: "10/8",
    examples: [],
    audio: "media/rhythms/samai_thaqil.mp3",
    image: "media/rhythms/images/samai_thaqil.svg"
  },
  {
    id: "samai_darij",
    name: { ar: "سماعي دارج (فالس)", en: "Sama'i Darij (Vals)" },
    time_signature: "3/4",
    examples: [],
    audio: "media/rhythms/samai_darij.mp3",
    image: "media/rhythms/images/samai_darij.svg"
  },
  {
    id: "yuruk_semai",
    name: { ar: "يورك سماعي", en: "Yürük Semai" },
    time_signature: "6/8",
    examples: [],
    audio: "media/rhythms/yuruk_semai.mp3",
    image: "media/rhythms/images/yuruk_semai.svg"
  },
  {
    id: "wahda",
    name: { ar: "وحدة صغيرة", en: "Wahda Saghira" },
    time_signature: "2/4",
    examples: [],
    audio: "media/rhythms/wahda.mp3",
    image: "media/rhythms/images/wahda.svg"
  },
  {
    id: "wahda_kabira",
    name: { ar: "وحدة كبيرة", en: "Wahda Kabira" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/wahda_kabira.mp3",
    image: "media/rhythms/images/wahda_kabira.svg"
  },
  {
    id: "fox",
    name: { ar: "فوكس", en: "Fox" },
    time_signature: "2/4",
    examples: [],
    audio: "media/rhythms/fox.mp3",
    image: "media/rhythms/images/fox.svg"
  },
  {
    id: "karachi",
    name: { ar: "كراتشي", en: "Karachi" },
    time_signature: "2/4",
    examples: [],
    audio: "media/rhythms/karachi.mp3",
    image: "media/rhythms/images/karachi.svg"
  },
  {
    id: "fallahi",
    name: { ar: "فلّاحي", en: "Fallahi" },
    time_signature: "2/4",
    examples: [],
    audio: "media/rhythms/fallahi.mp3",
    image: "media/rhythms/images/fallahi.svg"
  },
  {
    id: "ciftetelli",
    name: { ar: "شفته تلّي", en: "Ciftetelli" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/ciftetelli.mp3",
    image: "media/rhythms/images/ciftetelli.svg"
  },
  {
    id: "jurjina",
    name: { ar: "جرجينا", en: "Jurjina" },
    time_signature: "10/16",
    examples: [],
    audio: "media/rhythms/jurjina.mp3",
    image: "media/rhythms/images/jurjina.svg"
  },
  {
    id: "aqsaq",
    name: { ar: "أقساق", en: "Aqsaq" },
    time_signature: "9/8",
    examples: [],
    audio: "media/rhythms/aqsaq.mp3",
    image: "media/rhythms/images/aqsaq.svg"
  },
  {
    id: "dawr_hindi",
    name: { ar: "دور هندي", en: "Dawr Hindi" },
    time_signature: "7/8",
    examples: [],
    audio: "media/rhythms/dawr_hindi.mp3",
    image: "media/rhythms/images/dawr_hindi.svg"
  },
  {
    id: "sudasi",
    name: { ar: "سداسي", en: "Sudasi" },
    time_signature: "6/4",
    examples: [],
    audio: "media/rhythms/sudasi.mp3",
    image: "media/rhythms/images/sudasi.svg"
  },
  {
    id: "thurayya",
    name: { ar: "ثريّا", en: "Thurayya" },
    time_signature: "5/8",
    examples: [],
    audio: "media/rhythms/thurayya.mp3",
    image: "media/rhythms/images/thurayya.svg"
  },
  {
    id: "zaffa",
    name: { ar: "زفّة", en: "Zaffa" },
    time_signature: "8/8",
    examples: [],
    audio: "media/rhythms/zaffa.mp3",
    image: "media/rhythms/images/zaffa.svg"
  },
  {
    id: "nawari",
    name: { ar: "نواري", en: "Nawari" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/nawari.mp3",
    image: "media/rhythms/images/nawari.svg"
  },
  {
    id: "rumba",
    name: { ar: "رومبا عربي", en: "Rumba (Arabic)" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/rumba.mp3",
    image: "media/rhythms/images/rumba.svg"
  },
  {
    id: "hajaa",
    name: { ar: "هجع", en: "Hajaa" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/hajaa.mp3",
    image: "media/rhythms/images/hajaa.svg"
  },
  {
    id: "bambi",
    name: { ar: "بامبي", en: "Bambi" },
    time_signature: "8/4",
    examples: [],
    audio: "media/rhythms/bambi.mp3",
    image: "media/rhythms/images/bambi.svg"
  },
  {
    id: "wahda_ghayr_mulaaba",
    name: { ar: "وحدة غير ملعّبة", en: "Wahda Ghayr Mulaaba" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/wahda_ghayr_mulaaba.mp3",
    image: "media/rhythms/images/wahda_ghayr_mulaaba.svg"
  },
  {
    id: "conga",
    name: { ar: "كونجا", en: "Conga" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/conga.mp3",
    image: "media/rhythms/images/conga.svg"
  },
  {
    id: "lebanese_dabke",
    name: { ar: "دبكة لبنانية", en: "Lebanese Dabke" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/lebanese_dabke.mp3",
    image: "media/rhythms/images/lebanese_dabke.svg"
  },
  {
    id: "sawt_shami",
    name: { ar: "الصوت الشامي", en: "Sawt Shami" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/sawt_shami.mp3",
    image: "media/rhythms/images/sawt_shami.svg"
  },
  {
    id: "sumbati",
    name: { ar: "سمباطي", en: "Sumbati" },
    time_signature: "4/4",
    examples: [],
    audio: "media/rhythms/sumbati.mp3",
    image: "media/rhythms/images/sumbati.svg"
  },
  {
    id: "joobi_iraqi",
    name: { ar: "جوبي عراقي", en: "Joobi Iraqi" },
    time_signature: "8/8",
    examples: [],
    audio: "media/rhythms/joobi_iraqi.mp3",
    image: "media/rhythms/images/joobi_iraqi.svg"
  },

  {
    id: "masmoudi_nisfi",
    name: { ar: "مصمودي نصفي", en: "Masmoudi Nisfi" },
    time_signature: "8/4",
    examples: [],
    audio: "media/rhythms/masmoudi_nisfi.mp3",
    image: "media/rhythms/images/masmoudi_nisfi.svg"
  },
  {
    id: "mudawwar",
    name: { ar: "مدوّر", en: "Mudawwar" },
    time_signature: "12/4",
    examples: [],
    audio: "media/rhythms/mudawwar.mp3",
    image: "media/rhythms/images/mudawwar.svg"
  },
  {
    id: "murabbaa",
    name: { ar: "مربّع", en: "Murabba'" },
    time_signature: "13/8",
    examples: [],
    audio: "media/rhythms/murabbaa.mp3",
    image: "media/rhythms/images/murabbaa.svg"
  },
  {
    id: "dharafat",
    name: { ar: "ظرافات", en: "Dharafat" },
    time_signature: "13/8",
    examples: [],
    audio: "media/rhythms/dharafat.mp3",
    image: "media/rhythms/images/dharafat.svg"
  },
  {
    id: "muhajjar",
    name: { ar: "محجّر", en: "Muhajjar" },
    time_signature: "14/4",
    examples: [],
    audio: "media/rhythms/muhajjar.mp3",
    image: "media/rhythms/images/muhajjar.svg"
  },
  {
    id: "mukhammas",
    name: { ar: "مخمّس", en: "Mukhammas" },
    time_signature: "16/4",
    examples: [],
    audio: "media/rhythms/mukhammas.mp3",
    image: "media/rhythms/images/mukhammas.svg"
  }
];

window.rhythms = rhythms;
