const rhythms = [
  {
    id: "maqsum",
    name: { ar: "مقسوم", en: "Maqsum" },
    time_signature: "4/4",
    description: {
      ar: "إيقاع متوازن ومتعدد الاستخدامات، يُعتبر من أكثر الإيقاعات شيوعاً في الموسيقى العربية بمختلف أنواعها.",
      en: "A balanced and versatile rhythm, considered one of the most common rhythms in Arabic music across many styles."
    },
    usage: {
      ar: ["موسيقى شعبية", "فولكلور", "طرب", "أغاني عصرية"],
      en: ["Popular music", "Folklore", "Tarab", "Contemporary songs"]
    },
    examples: [],
    audio: "media/rhythms/maqsum.mp3",
    image: "media/rhythms/images/maqsum.svg"
  },
  {
    id: "baladi (masmudi saghir)",
    name: { ar: "بلدي (مصمودي صغير)", en: "baladi (masmudi saghir)" },
    time_signature: "4/4",
    description: {
      ar: "إيقاع مصري ثقيل ومتجذر، يتميز بضربات بداية قوية ويُستخدم بكثرة في الموسيقى الشعبية والرقص الشرقي.",
      en: "A rooted Egyptian rhythm with a heavy feel and strong opening strokes, widely used in folk music and belly dance."
    },
    usage: {
      ar: ["موسيقى شعبية", "رقص شرقي", "بلدي مصري"],
      en: ["Popular music", "Belly dance", "Egyptian baladi"]
    },
    examples: [],
    audio: "media/rhythms/baladi.mp3",
    image: "media/rhythms/images/baladi_masmoudi_saghir.svg"
  },
  {
    id: "saidi",
    name: { ar: "صعيدي", en: "Sa'idi" },
    time_signature: "4/4",
    description: {
      ar: "إيقاع قوي ومندفع من صعيد مصر، يُستخدم في الرقصات الشعبية والموسيقى الفولكلورية.",
      en: "A strong and driving rhythm from Upper Egypt, used in folk dances and folkloric music."
    },
    usage: {
      ar: ["رقص بالعصا", "موسيقى فولكلورية", "صعيد مصر"],
      en: ["Stick dance", "Folkloric music", "Upper Egypt"]
    },
    examples: [],
    audio: "media/rhythms/saidi.mp3",
    image: "media/rhythms/images/saidi.svg"
  },
  {
    id: "malfuf",
    name: { ar: "ملفوف", en: "Malfuf" },
    time_signature: "2/4",
    description: {
      ar: "إيقاع سريع ومفعم بالطاقة، يُستخدم غالباً في المقدمات والأغاني السريعة.",
      en: "A fast and energetic rhythm, often used in introductions and quick songs."
    },
    usage: {
      ar: ["مقدمات", "أغاني سريعة", "رقصات"],
      en: ["Introductions", "Fast songs", "Dances"]
    },
    examples: [],
    audio: "media/rhythms/malfuf.mp3",
    image: "media/rhythms/images/malfuf.svg"
  },
  {
    id: "ayyub",
    name: { ar: "أيّوب", en: "Ayoub" },
    time_signature: "2/4",
    description: {
      ar: "إيقاع تنويمي ومتكرر، يُستخدم في الموسيقى الصوفية والحالات التأملية.",
      en: "A repetitive, trance-like rhythm used in Sufi music and meditative settings."
    },
    usage: {
      ar: ["موسيقى صوفية", "تراث", "أناشيد"],
      en: ["Sufi music", "Heritage", "Chants"]
    },
    examples: [],
    audio: "media/rhythms/ayyub.mp3",
    image: "media/rhythms/images/ayyub.svg"
  },
  {
    id: "samai_thaqil",
    name: { ar: "سماعي ثقيل", en: "Sama'i Thaqil" },
    time_signature: "10/8",
    description: {
      ar: "إيقاع كلاسيكي معقّد، يُستخدم في الموشحات والقطع الآلية الراقية.",
      en: "A complex classical rhythm used in muwashshahat and refined instrumental compositions."
    },
    usage: {
      ar: ["موشحات", "قطع آلية", "موسيقى كلاسيكية"],
      en: ["Muwashshahat", "Instrumental pieces", "Classical music"]
    },
    examples: [],
    audio: "media/rhythms/samai_thaqil.mp3",
    image: "media/rhythms/images/samai_thaqil.svg"
  },
  {
    id: "samai_darij",
    name: { ar: " (فالس) سماعي دارج", en: "Sama'i Darij (Vals)" },
    time_signature: "3/4",
    description: {
      ar: "إيقاع أخف وأكثر انسيابية من السماعي الثقيل، يُستخدم في القوالب الأندلسية.",
      en: "A lighter and more flowing form than Sama'i Thaqil, used in Andalusian forms."
    },
    usage: {
      ar: ["قوالب أندلسية", "موشحات", "موسيقى كلاسيكية"],
      en: ["Andalusian forms", "Muwashshahat", "Classical music"]
    },
    examples: [],
    audio: "media/rhythms/samai_darij.mp3",
    image: "media/rhythms/images/samai_darij.svg"
  },
  {
    id: "yuruk_semai",
    name: { ar: "يورك سماعي", en: "Yürük Semai" },
    time_signature: "6/8",
    description: {
      ar: "نسخة سريعة من السماعي، تُستخدم في خواتيم القطع الآلية.",
      en: "A faster version of the samai, used in the endings of instrumental works."
    },
    usage: {
      ar: ["خواتيم آلية", "سماعي", "رقصات"],
      en: ["Instrumental endings", "Samai", "Dances"]
    },
    examples: [],
    audio: "media/rhythms/yuruk_semai.mp3",
    image: "media/rhythms/images/yuruk_semai.svg"
  },
  {
    id: "masmoudi_kabir",
    name: { ar: "مصمودي كبير", en: "Masmoudi Kabir" },
    time_signature: "8/4",
    description: {
      ar: "إيقاع ثقيل وممتد، يُستخدم في الغناء الكلاسيكي والقوالب الكبيرة.",
      en: "A heavy and extended rhythm used in classical singing and large-form compositions."
    },
    usage: {
      ar: ["غناء كلاسيكي", "موشحات", "طرب"],
      en: ["Classical singing", "Muwashshahat", "Tarab"]
    },
    examples: [],
    audio: "media/rhythms/masmoudi_kabir.mp3",
    image: "media/rhythms/images/masmoudi_kabir.svg"
  },
 
  {
    id: "wahda",
    name: { ar: " وحدة صغيرة", en: "Wahda saghira" },
    time_signature: "2/4",
    description: {
      ar: "إيقاع بطيء ورحب، مثالي للارتجال الصوتي والتقاسيم.",
      en: "A slow and spacious rhythm, ideal for vocal improvisation and taqasim."
    },
    usage: {
      ar: ["ارتجال صوتي", "تقاسيم", "أغاني بطيئة"],
      en: ["Vocal improvisation", "Taqasim", "Slow songs"]
    },
    examples: [],
    audio: "media/rhythms/wahda.mp3",
    image: "media/rhythms/images/wahda.svg"
  },
  {
    id: "wahda_kabira",
    name: { ar: "وحدة كبيرة", en: "Wahda Kabira" },
    time_signature: "4/4",
    description: {
      ar: "إيقاع كلاسيكي بطيء جداً، يُستخدم في الطرب والموشحات.",
      en: "A very slow classical rhythm used in tarab and muwashshahat."
    },
    usage: {
      ar: ["طرب", "موشحات", "غناء كلاسيكي"],
      en: ["Tarab", "Muwashshahat", "Classical singing"]
    },
    examples: [],
    audio: "media/rhythms/wahda_kabira.mp3",
    image: "media/rhythms/images/wahda_kabira.svg"
  },
  {
    id: "fox",
    name: { ar: "فوكس", en: "Fox" },
    time_signature: "2/4",
    description: {
      ar: "إيقاع متأثر بالموسيقى الغربية، يُستخدم في الأغاني العربية العصرية.",
      en: "A rhythm influenced by Western music, used in contemporary Arabic songs."
    },
    usage: {
      ar: ["أغاني عصرية", "بوب عربي"],
      en: ["Contemporary songs", "Arabic pop"]
    },
    examples: [],
    audio: "media/rhythms/fox.mp3",
    image: "media/rhythms/images/fox.svg"
  },
  {
    id: "karachi",
    name: { ar: "كراتشي", en: "Karachi" },
    time_signature: "4/8",
    description: {
      ar: "إيقاع شامي سريع، يُستخدم في الدبكة والموسيقى الشعبية.",
      en: "A fast Levantine rhythm used in dabke and folk music."
    },
    usage: {
      ar: ["دبكة", "فولكلور شامي"],
      en: ["Dabke", "Levantine folklore"]
    },
    examples: [],
    audio: "media/rhythms/karachi.mp3",
    image: "media/rhythms/images/karachi.svg"
  },
  {
    id: "fallahi",
    name: { ar: "فلّاحي", en: "Fallahi" },
    time_signature: "4/8",
    description: {
      ar: "إيقاع ريفي مفعم بالطاقة من الريف المصري.",
      en: "An energetic rural rhythm from the Egyptian countryside."
    },
    usage: {
      ar: ["ريف مصري", "موسيقى شعبية"],
      en: ["Egyptian countryside", "Popular music"]
    },
    examples: [],
    audio: "media/rhythms/fallahi.mp3",
    image: "media/rhythms/images/fallahi.svg"
  },
  {
    id: "ciftetelli",
    name: { ar: "شفته تلّي", en: "Ciftetelli" },
    time_signature: "8/8",
    description: {
      ar: "إيقاع انسيابي وحسي، يُستخدم بكثرة في الرقص الشرقي.",
      en: "A flowing and sensual rhythm, widely used in belly dance."
    },
    usage: {
      ar: ["رقص شرقي", "تقاسيم"],
      en: ["Belly dance", "Taqasim"]
    },
    examples: [],
    audio: "media/rhythms/ciftetelli.mp3",
    image: "media/rhythms/images/ciftetelli.svg"
  },
  {
    id: "jurjina",
    name: { ar: "جرجينا", en: "Jurjina" },
    time_signature: "10/8",
    description: {
      ar: "إيقاع مرح ومتقطع، يُستخدم في الموسيقى العراقية والخليجية.",
      en: "A lively, segmented rhythm used in Iraqi and Gulf music."
    },
    usage: {
      ar: ["موسيقى عراقية", "خليجية"],
      en: ["Iraqi music", "Gulf music"]
    },
    examples: [],
    audio: "media/rhythms/jurjina.mp3",
    image: "media/rhythms/images/jurjina.svg"
  },
  {
    id: "aqsaq",
    name: { ar: "أقساق", en: "Aqsaq" },
    time_signature: "9/8",
    description: {
      ar: "إيقاع غير متماثل، من التراث العثماني.",
      en: "An asymmetrical rhythm from the Ottoman tradition."
    },
    usage: {
      ar: ["تراث عثماني", "موسيقى تركية"],
      en: ["Ottoman heritage", "Turkish music"]
    },
    examples: [],
    audio: "media/rhythms/aqsaq.mp3",
    image: "media/rhythms/images/aqsaq.svg"
  },
  {
    id: "dawr_hindi",
    name: { ar: "دور هندي", en: "Dawr Hindi" },
    time_signature: "7/8",
    description: {
      ar: "إيقاع معقّد ومعبّر، يُستخدم في القوالب الكلاسيكية.",
      en: "A complex and expressive rhythm used in classical vocal forms."
    },
    usage: {
      ar: ["قوالب كلاسيكية", "دور"],
      en: ["Classical forms", "Dawr"]
    },
    examples: [],
    audio: "media/rhythms/dawr_hindi.mp3",
    image: "media/rhythms/images/dawr_hindi.svg"
  },
  {
    id: "sudasi",
    name: { ar: "سداسي", en: "Sudasi" },
    time_signature: "6/8",
    description: {
      ar: "إيقاع انسيابي وسلس، مناسب للصوت والآلات.",
      en: "A smooth and flowing rhythm suitable for both voice and instruments."
    },
    usage: {
      ar: ["غناء", "موسيقى آلية"],
      en: ["Singing", "Instrumental music"]
    },
    examples: [],
    audio: "media/rhythms/sudasi.mp3",
    image: "media/rhythms/images/sudasi.svg"
  },
  {
    id: "mukhammas",
    name: { ar: "مخمّس", en: "Mukhammas" },
    time_signature: "16/8",
    description: {
      ar: "دورة ممتدة، تُستخدم في الغناء الكلاسيكي.",
      en: "An extended cycle used in classical singing."
    },
    usage: {
      ar: ["غناء كلاسيكي", "موشحات"],
      en: ["Classical singing", "Muwashshahat"]
    },
    examples: [],
    audio: "media/rhythms/mukhammas.mp3",
    image: "media/rhythms/images/mukhammas.svg"
  },
  {
    id: "murabbaa",
    name: { ar: "مربّع", en: "Murabba'" },
    time_signature: "13/8",
    description: {
      ar: "إيقاع غير منتظم ومتوازن، يُستخدم في الموشحات.",
      en: "An irregular yet balanced rhythm used in muwashshahat."
    },
    usage: {
      ar: ["موشحات", "موسيقى كلاسيكية"],
      en: ["Muwashshahat", "Classical music"]
    },
    examples: [],
    audio: "media/rhythms/murabbaa.mp3",
    image: "media/rhythms/images/murabbaa.svg"
  },
  {
    id: "nawakht",
    name: { ar: "نواخت", en: "Nawakht" },
    time_signature: "7/8",
    description: {
      ar: "إيقاع منظّم غير منتظم، يُستخدم في المؤلفات الكلاسيكية.",
      en: "A structured asymmetrical rhythm used in classical compositions."
    },
    usage: {
      ar: ["مؤلفات كلاسيكية", "موشحات"],
      en: ["Classical compositions", "Muwashshahat"]
    },
    examples: [],
    audio: "media/rhythms/nawakht.mp3",
    image: "media/rhythms/images/nawakht.svg"
  },
  {
    id: "nawakht_hindi",
    name: { ar: "نواخت هندي", en: "Nawakht Hindi" },
    time_signature: "16/8",
    description: {
      ar: "دورة معقدة وممتدة، تُستخدم في التراث المتقدم.",
      en: "A complex and extended cycle used in advanced traditional repertoire."
    },
    usage: {
      ar: ["تراث متقدم", "موسيقى كلاسيكية"],
      en: ["Advanced heritage repertoire", "Classical music"]
    },
    examples: [],
    audio: "media/rhythms/nawakht_hindi.mp3",
    image: "media/rhythms/images/nawakht_hindi.svg"
  },
  {
    id: "muhajjar",
    name: { ar: "محجّر", en: "Muhajjar" },
    time_signature: "14/8",
    description: {
      ar: "إيقاع بطيء ومزخرف، يُستخدم في الموسيقى الكلاسيكية.",
      en: "A slow and ornamented rhythm used in classical music."
    },
    usage: {
      ar: ["موسيقى كلاسيكية", "موشحات"],
      en: ["Classical music", "Muwashshahat"]
    },
    examples: [],
    audio: "media/rhythms/muhajjar.mp3",
    image: "media/rhythms/images/muhajjar.svg"
  },
  {
    id: "thurayya",
    name: { ar: "ثريّا", en: "Thurayya" },
    time_signature: "5/8",
    description: {
      ar: "إيقاع غير منتظم ومعبّر، يُستخدم في الموشحات.",
      en: "An irregular and expressive rhythm used in muwashshahat."
    },
    usage: {
      ar: ["موشحات", "موسيقى كلاسيكية"],
      en: ["Muwashshahat", "Classical music"]
    },
    examples: [],
    audio: "media/rhythms/thurayya.mp3",
    image: "media/rhythms/images/thurayya.svg"
  },
  {
    id: "zaffa",
    name: { ar: "زفّة", en: "Zaffa" },
    time_signature: "8/8",
    description: {
      ar: "إيقاع احتفالي وشعائري، يُستخدم في الأعراس.",
      en: "A festive ceremonial rhythm used in weddings."
    },
    usage: {
      ar: ["أعراس", "احتفالات"],
      en: ["Weddings", "Celebrations"]
    },
    examples: [],
    audio: "media/rhythms/zaffa.mp3",
    image: "media/rhythms/images/zaffa.svg"
  },
  {
    id: "nawari",
    name: { ar: "نواري", en: "Nawari" },
    time_signature: "8/8",
    description: {
      ar: "إيقاع خفيف ومتكرر، من التقاليد الشعبية.",
      en: "A light and repetitive rhythm from popular tradition."
    },
    usage: {
      ar: ["تقاليد شعبية", "فولكلور"],
      en: ["Popular traditions", "Folklore"]
    },
    examples: [],
    audio: "media/rhythms/nawari.mp3",
    image: "media/rhythms/images/nawari.svg"
  },
  {
    id: "rumba",
    name: { ar: "رومبا عربي", en: "Rumba (Arabic)" },
    time_signature: "8/8",
    description: {
      ar: "إيقاع متأثر بالموسيقى اللاتينية، يُستخدم في البوب العربي الحديث.",
      en: "A rhythm influenced by Latin music, used in modern Arabic pop."
    },
    usage: {
      ar: ["بوب عربي", "موسيقى حديثة"],
      en: ["Arabic pop", "Modern music"]
    },
    examples: [],
    audio: "media/rhythms/rumba.mp3",
    image: "media/rhythms/images/rumba.svg"
  },
  {
    id: "khosh_rang",
    name: { ar: "خوش رنك", en: "Khosh Rang" },
    time_signature: "8/8",
    description: {
      ar: "تنويع إيقاعي زخرفي، يُستخدم في الموسيقى الآلية.",
      en: "An ornamental rhythmic variation used in instrumental music."
    },
    usage: {
      ar: ["موسيقى آلية", "تنويعات"],
      en: ["Instrumental music", "Variations"]
    },
    examples: [],
    audio: "media/rhythms/khosh_rang.mp3",
    image: "media/rhythms/images/khosh_rang.svg"
  },
  {
    id: "dharafat",
    name: { ar: "ظرافات", en: "Dharafat" },
    time_signature: "8/8",
    description: {
      ar: "إيقاع كلاسيكي خفيف، من التراث التقليدي.",
      en: "A light classical rhythm from the traditional repertoire."
    },
    usage: {
      ar: ["تراث تقليدي", "موسيقى كلاسيكية"],
      en: ["Traditional heritage", "Classical music"]
    },
    examples: [],
    audio: "media/rhythms/dharafat.mp3",
    image: "media/rhythms/images/dharafat.svg"
  }
];

window.rhythms = rhythms;
