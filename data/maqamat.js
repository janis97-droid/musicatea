// COMPREHENSIVE ARABIC MAQAMAT DATABASE
// Organized by families with proper jins (tetrachord) structure

const maqamat = [
  // ========================================
  // RAST FAMILY (عائلة راست)
  // ========================================
  {
    id: "rast",
    family: "rast",
    name: "راست",
    latin: "Rast",
    is_main: true,
    tonic_options: ["دو", "ري", "فا"],
    description: "يُلقّب بـ'أبو المقامات' وهو مقام مستقر وأساسي، يرتبط بالتوازن والرصانة والقوة. من أكثر المقامات استخداماً في الموسيقى العربية الكلاسيكية.",
    sayr: "يبدأ من القرار ويصعد عبر جنس راست السفلي ثم جنس راست العلوي إلى الجواب",
    dominant: "صول",
    feeling: ["توازن", "رصانة", "قوة", "استقرار"],
    mood_color: "#c8a45a",
    jins: {
      lower: {
        name: "راست",
        root: "دو",
        notes: ["دو", "ري", "مي نصف♭", "فا"]
      },
      upper: [
        {
          name: "راست",
          root: "صول",
          notes: ["صول", "لا", "سي نصف♭", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي نصف♭", "فا", "صول", "لا", "سي نصف♭", "دو"],
      re: ["ري", "مي", "فا# نصف♭", "صول", "لا", "سي", "دو# نصف♭", "ري"],
      fa: ["فا", "صول", "لا نصف♭", "سي♭", "دو", "ري", "مي نصف♭", "فا"]
    },
    examples: ["عالروزانا", "يا طيرة طيري", "بلادي بلادي"],
    related_sheets: ["rast"],
    sub_maqamat: ["suzidil", "nairuz", "yakah"]
  },
  {
    id: "suzidil",
    family: "rast",
    name: "سوزدلارا",
    latin: "Suzidil",
    is_main: false,
    tonic_options: ["دو", "صول"],
    description: "مقام من عائلة راست، يتميز بجنس حجاز في الأعلى مما يضفي عليه طابعاً مختلطاً بين القوة والدرامية",
    sayr: "يبدأ براست ثم يصعد إلى جنس حجاز على الدرجة الخامسة",
    dominant: "صول",
    feeling: ["قوة", "درامية", "تنوع"],
    mood_color: "#d4a574",
    jins: {
      lower: {
        name: "راست",
        root: "دو",
        notes: ["دو", "ري", "مي نصف♭", "فا"]
      },
      upper: [
        {
          name: "حجاز",
          root: "صول",
          notes: ["صول", "لا♭", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي نصف♭", "فا", "صول", "لا♭", "سي", "دو"],
      sol: ["صول", "لا", "سي نصف♭", "دو", "ري", "مي♭", "فا#", "صول"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "nairuz",
    family: "rast",
    name: "نيروز",
    latin: "Nairuz",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "مقام احتفالي ومبهج من عائلة راست، يُستخدم في المناسبات السعيدة",
    sayr: "راست مع تنويعات على الدرجات العليا تضفي طابعاً احتفالياً",
    dominant: "صول",
    feeling: ["بهجة", "احتفال", "نشاط"],
    mood_color: "#e8b86d",
    jins: {
      lower: {
        name: "راست",
        root: "دو",
        notes: ["دو", "ري", "مي نصف♭", "فا"]
      },
      upper: [
        {
          name: "نهاوند",
          root: "صول",
          notes: ["صول", "لا♭", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي نصف♭", "فا", "صول", "لا♭", "سي", "دو"],
      re: ["ري", "مي", "فا# نصف♭", "صول", "لا", "سي♭", "دو#", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "yakah",
    family: "rast",
    name: "يكاه",
    latin: "Yakah",
    is_main: false,
    tonic_options: ["صول"],
    description: "مقام راسخ ومستقر، يبدأ من درجة صول ويُعتبر امتداداً لعائلة راست",
    sayr: "جنس راست على صول مع تطوير في الأعلى",
    dominant: "ري",
    feeling: ["استقرار", "رصانة", "عمق"],
    mood_color: "#b8974a",
    jins: {
      lower: {
        name: "راست",
        root: "صول",
        notes: ["صول", "لا", "سي نصف♭", "دو"]
      },
      upper: [
        {
          name: "راست",
          root: "ري",
          notes: ["ري", "مي", "فا# نصف♭", "صول"]
        }
      ]
    },
    notes: {
      sol: ["صول", "لا", "سي نصف♭", "دو", "ري", "مي", "فا# نصف♭", "صول"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // BAYATI FAMILY (عائلة بيات)
  // ========================================
  {
    id: "bayat",
    family: "bayat",
    name: "بيات",
    latin: "Bayati",
    is_main: true,
    tonic_options: ["ري", "صول", "لا"],
    description: "من أعمق المقامات العربية وأكثرها استخداماً، دافئ وعاطفي. يُستخدم في الموسيقى الشعبية والدينية والصوتية بكثرة.",
    sayr: "يبدأ من القرار بجنس بيات ويصعد إلى جنس نهاوند على الخامسة",
    dominant: "لا",
    feeling: ["دفء", "عاطفة", "شوق", "عمق"],
    mood_color: "#9b7ec8",
    jins: {
      lower: {
        name: "بيات",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول"]
      },
      upper: [
        {
          name: "نهاوند",
          root: "لا",
          notes: ["لا", "سي♭", "دو", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول", "لا", "سي♭", "دو", "ري"],
      sol: ["صول", "لا نصف♭", "سي♭", "دو", "ري", "مي♭", "فا", "صول"],
      la: ["لا", "سي نصف♭", "دو", "ري", "مي", "فا", "صول", "لا"]
    },
    examples: ["ومنين أبدأ يا قلبي", "على مودك انت وبس", "صحاك الشوق"],
    related_sheets: ["bayat"],
    sub_maqamat: ["husayni", "bayat_shuri"]
  },
  {
    id: "husayni",
    family: "bayat",
    name: "حسيني",
    latin: "Husayni",
    is_main: false,
    tonic_options: ["ري", "لا"],
    description: "مقام ناعم وغنائي من عائلة بيات، يُستخدم في الموسيقى الشعبية والروحانية",
    sayr: "بيات مع تنويعات لحنية تضفي رقّة وحنيناً",
    dominant: "لا",
    feeling: ["نعومة", "حنين", "روحانية"],
    mood_color: "#a888d4",
    jins: {
      lower: {
        name: "بيات",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول"]
      },
      upper: [
        {
          name: "نهاوند",
          root: "لا",
          notes: ["لا", "سي♭", "دو", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول", "لا", "سي♭", "دو", "ري"],
      la: ["لا", "سي نصف♭", "دو", "ري", "مي", "فا", "صول", "لا"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "bayat_shuri",
    family: "bayat",
    name: "بيات شوري",
    latin: "Bayati Shuri",
    is_main: false,
    tonic_options: ["ري"],
    description: "تنويع على مقام بيات مع لمسات شرقية خاصة",
    sayr: "بيات مع استكشاف درجات مختلفة في القرار",
    dominant: "صول",
    feeling: ["شرقي", "أصيل", "تقليدي"],
    mood_color: "#8e72bb",
    jins: {
      lower: {
        name: "بيات",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول"]
      },
      upper: [
        {
          name: "بيات",
          root: "صول",
          notes: ["صول", "لا نصف♭", "سي♭", "دو"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول", "لا نصف♭", "سي♭", "دو", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // NAHAWAND FAMILY (عائلة نهاوند)
  // ========================================
  {
    id: "nahawand",
    family: "nahawand",
    name: "نهاوند",
    latin: "Nahawand",
    is_main: true,
    tonic_options: ["دو", "ري", "فا"],
    description: "مقام شبيه بالسلّم الصغير (مينور)، حزين ورومانسي. يُستخدم بكثرة في الأغاني السينمائية والحديثة.",
    sayr: "يبدأ من القرار بجنس نهاوند ويصعد إلى جنس نهاوند على الخامسة",
    dominant: "صول",
    feeling: ["حزن", "رومانسية", "حنين", "تأمل"],
    mood_color: "#7b9cce",
    jins: {
      lower: {
        name: "نهاوند",
        root: "دو",
        notes: ["دو", "ري", "مي♭", "فا"]
      },
      upper: [
        {
          name: "نهاوند",
          root: "صول",
          notes: ["صول", "لا♭", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي♭", "فا", "صول", "لا♭", "سي", "دو"],
      re: ["ري", "مي", "فا", "صول", "لا", "سي♭", "دو#", "ري"],
      fa: ["فا", "صول", "لا♭", "سي♭", "دو", "ري♭", "مي", "فا"]
    },
    examples: ["سماعي نهاوند", "سجر البن", "أنشودة الفن"],
    related_sheets: ["nahawand"],
    sub_maqamat: ["nahawand_kabir", "nahawand_murassa", "farahfaza"]
  },
  {
    id: "nahawand_kabir",
    family: "nahawand",
    name: "نهاوند كبير",
    latin: "Nahawand Kabir",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "نسخة موسّعة من نهاوند مع تطوير في الجواب",
    sayr: "نهاوند مع امتداد إلى الجواب بجنس حجاز",
    dominant: "صول",
    feeling: ["حزن عميق", "فخامة", "رومانسية"],
    mood_color: "#6a8bc4",
    jins: {
      lower: {
        name: "نهاوند",
        root: "دو",
        notes: ["دو", "ري", "مي♭", "فا"]
      },
      upper: [
        {
          name: "حجاز",
          root: "صول",
          notes: ["صول", "لا♭", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي♭", "فا", "صول", "لا♭", "سي", "دو"],
      re: ["ري", "مي", "فا", "صول", "لا", "سي♭", "دو#", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "nahawand_murassa",
    family: "nahawand",
    name: "نهاوند مرصّع",
    latin: "Nahawand Murassa'",
    is_main: false,
    tonic_options: ["دو"],
    description: "نهاوند مزيّن ومرصّع بدرجات إضافية",
    sayr: "نهاوند مع زخارف لحنية متقنة",
    dominant: "صول",
    feeling: ["فخامة", "زخرفة", "جمال"],
    mood_color: "#8daad8",
    jins: {
      lower: {
        name: "نهاوند",
        root: "دو",
        notes: ["دو", "ري", "مي♭", "فا"]
      },
      upper: [
        {
          name: "راست",
          root: "صول",
          notes: ["صول", "لا", "سي نصف♭", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي♭", "فا", "صول", "لا", "سي نصف♭", "دو"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "farahfaza",
    family: "nahawand",
    name: "فرح فزا",
    latin: "Farahfaza",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "مقام بهيج رغم انتمائه لعائلة نهاوند، يجمع بين الحزن والفرح",
    sayr: "نهاوند مع تنويعات تضفي لمسة من البهجة",
    dominant: "صول",
    feeling: ["بهجة مختلطة", "تعقيد", "جمال"],
    mood_color: "#95b3df",
    jins: {
      lower: {
        name: "نهاوند",
        root: "دو",
        notes: ["دو", "ري", "مي♭", "فا"]
      },
      upper: [
        {
          name: "عجم",
          root: "صول",
          notes: ["صول", "لا", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي♭", "فا", "صول", "لا", "سي", "دو"],
      re: ["ري", "مي", "فا", "صول", "لا", "سي", "دو#", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // AJAM FAMILY (عائلة عجم)
  // ========================================
  {
    id: "ajam",
    family: "ajam",
    name: "عجم",
    latin: "Ajam",
    is_main: true,
    tonic_options: ["دو", "فا", "صول"],
    description: "مقام مشرق شبيه بالسلّم الكبير الغربي (ماجور)، يُستخدم في الموسيقى الرسمية والأوركسترالية.",
    sayr: "جنس عجم على القرار وجنس عجم على الخامسة",
    dominant: "صول",
    feeling: ["إشراق", "بهجة", "رسمي", "واضح"],
    mood_color: "#c8c45a",
    jins: {
      lower: {
        name: "عجم",
        root: "دو",
        notes: ["دو", "ري", "مي", "فا"]
      },
      upper: [
        {
          name: "عجم",
          root: "صول",
          notes: ["صول", "لا", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي", "فا", "صول", "لا", "سي", "دو"],
      fa: ["فا", "صول", "لا", "سي♭", "دو", "ري", "مي", "فا"],
      sol: ["صول", "لا", "سي", "دو", "ري", "مي", "فا#", "صول"]
    },
    examples: ["أنا قلبي دليلي", "وحياة قلبي"],
    related_sheets: ["ajam"],
    sub_maqamat: ["ajam_ushayran", "mahur"]
  },
  {
    id: "ajam_ushayran",
    family: "ajam",
    name: "عجم عشيران",
    latin: "Ajam Ushayran",
    is_main: false,
    tonic_options: ["سي♭", "دو"],
    description: "تنويع على عجم مع لمسات خاصة في القرار",
    sayr: "عجم مع استكشاف درجات القرار بشكل مميز",
    dominant: "فا",
    feeling: ["نبل", "فخامة", "رسمي"],
    mood_color: "#d4cf6a",
    jins: {
      lower: {
        name: "عجم",
        root: "سي♭",
        notes: ["سي♭", "دو", "ري", "مي♭"]
      },
      upper: [
        {
          name: "عجم",
          root: "فا",
          notes: ["فا", "صول", "لا", "سي♭"]
        }
      ]
    },
    notes: {
      sib: ["سي♭", "دو", "ري", "مي♭", "فا", "صول", "لا", "سي♭"],
      do: ["دو", "ري", "مي", "فا", "صول", "لا", "سي", "دو"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "mahur",
    family: "ajam",
    name: "ماهور",
    latin: "Mahur",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "مقام فارسي الأصل من عائلة عجم، يتميز بطابع فخم وملكي",
    sayr: "عجم مع تأثيرات فارسية في الأداء",
    dominant: "صول",
    feeling: ["فخامة", "ملكي", "فارسي"],
    mood_color: "#e0d870",
    jins: {
      lower: {
        name: "عجم",
        root: "دو",
        notes: ["دو", "ري", "مي", "فا"]
      },
      upper: [
        {
          name: "عجم",
          root: "صول",
          notes: ["صول", "لا", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري", "مي", "فا", "صول", "لا", "سي", "دو"],
      re: ["ري", "مي", "فا#", "صول", "لا", "سي", "دو#", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // KURD FAMILY (عائلة كرد)
  // ========================================
  {
    id: "kurd",
    family: "kurd",
    name: "كرد",
    latin: "Kurd",
    is_main: true,
    tonic_options: ["ري", "صول", "لا"],
    description: "مقام داكن وبسيط بدون ربع تونات، يُستخدم في الموسيقى الشعبية والكردية.",
    sayr: "جنس كرد على القرار وجنس كرد على الخامسة",
    dominant: "لا",
    feeling: ["ظلام", "بساطة", "حزن", "شعبي"],
    mood_color: "#7ec89b",
    jins: {
      lower: {
        name: "كرد",
        root: "ري",
        notes: ["ري", "مي♭", "فا", "صول"]
      },
      upper: [
        {
          name: "كرد",
          root: "لا",
          notes: ["لا", "سي♭", "دو", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي♭", "فا", "صول", "لا", "سي♭", "دو", "ري"],
      sol: ["صول", "لا♭", "سي♭", "دو", "ري", "مي♭", "فا", "صول"],
      la: ["لا", "سي♭", "دو", "ري", "مي", "فا", "صول", "لا"]
    },
    examples: ["شكراً", "أنا وليلى", "خسرت كل الناس", "توبة"],
    related_sheets: ["kurd"],
    sub_maqamat: ["athar_kurd"]
  },
  {
    id: "athar_kurd",
    family: "kurd",
    name: "أثر كرد",
    latin: "Athar Kurd",
    is_main: false,
    tonic_options: ["ري", "صول"],
    description: "مقام مظلم ومتوتر من عائلة كرد، يتميز بجنس حجاز في الأعلى",
    sayr: "كرد في القرار وحجاز في الأعلى مما يخلق توتراً عاطفياً",
    dominant: "لا",
    feeling: ["توتر", "ظلام", "درامية"],
    mood_color: "#6ab588",
    jins: {
      lower: {
        name: "كرد",
        root: "ري",
        notes: ["ري", "مي♭", "فا", "صول"]
      },
      upper: [
        {
          name: "حجاز",
          root: "لا",
          notes: ["لا", "سي♭", "دو#", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي♭", "فا", "صول", "لا", "سي♭", "دو#", "ري"],
      sol: ["صول", "لا♭", "سي♭", "دو", "ري", "مي♭", "فا#", "صول"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // HIJAZ FAMILY (عائلة حجاز)
  // ========================================
  {
    id: "hijaz",
    family: "hijaz",
    name: "حجاز",
    latin: "Hijaz",
    is_main: true,
    tonic_options: ["ري", "صول", "لا"],
    description: "مقام درامي وروحاني يتميز بفاصل زائد (ثانية زائدة)، يُستخدم في الموسيقى الدينية والأغاني التعبيرية.",
    sayr: "جنس حجاز على القرار وجنس راست أو نهاوند في الأعلى",
    dominant: "لا",
    feeling: ["درامية", "روحانية", "تعبير", "انفعال"],
    mood_color: "#c86060",
    jins: {
      lower: {
        name: "حجاز",
        root: "ري",
        notes: ["ري", "مي♭", "فا#", "صول"]
      },
      upper: [
        {
          name: "راست",
          root: "لا",
          notes: ["لا", "سي", "دو نصف♭", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي♭", "فا#", "صول", "لا", "سي♭", "دو", "ري"],
      sol: ["صول", "لا♭", "سي", "دو", "ري", "مي♭", "فا", "صول"],
      la: ["لا", "سي♭", "دو#", "ري", "مي", "فا", "صول", "لا"]
    },
    examples: ["موسيقى دينية", "أذان", "موشحات"],
    related_sheets: [],
    sub_maqamat: ["hijazkar", "shahnaz", "suznak"]
  },
  {
    id: "hijazkar",
    family: "hijaz",
    name: "حجاز كار",
    latin: "Hijazkar",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "امتداد غني ودرامي لمقام حجاز، يُستخدم في التأليف المتقدم",
    sayr: "حجاز مع تطوير درامي في الجواب",
    dominant: "صول",
    feeling: ["درامية عالية", "فخامة", "تعبير"],
    mood_color: "#d47070",
    jins: {
      lower: {
        name: "حجاز",
        root: "دو",
        notes: ["دو", "ري♭", "مي", "فا"]
      },
      upper: [
        {
          name: "نهاوند",
          root: "صول",
          notes: ["صول", "لا♭", "سي", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري♭", "مي", "فا", "صول", "لا♭", "سي", "دو"],
      re: ["ري", "مي♭", "فا#", "صول", "لا", "سي♭", "دو#", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "shahnaz",
    family: "hijaz",
    name: "شهناز",
    latin: "Shahnaz",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "مقام مشرق وقوي من عائلة حجاز",
    sayr: "حجاز مع لمسات مشرقة في الأعلى",
    dominant: "صول",
    feeling: ["إشراق", "قوة", "درامية"],
    mood_color: "#e08080",
    jins: {
      lower: {
        name: "حجاز",
        root: "دو",
        notes: ["دو", "ري♭", "مي", "فا"]
      },
      upper: [
        {
          name: "راست",
          root: "صول",
          notes: ["صول", "لا", "سي نصف♭", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري♭", "مي", "فا", "صول", "لا", "سي نصف♭", "دو"],
      re: ["ري", "مي♭", "فا#", "صول", "لا", "سي", "دو# نصف♭", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "suznak",
    family: "hijaz",
    name: "سوزناك",
    latin: "Suznak",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "مقام مشرق لكن عاطفي، يجمع بين قوة حجاز ونعومة راست",
    sayr: "حجاز مع امتداد عاطفي في الأعلى",
    dominant: "فا#",
    feeling: ["إشراق", "عاطفة", "جمال"],
    mood_color: "#ec9090",
    jins: {
      lower: {
        name: "حجاز",
        root: "دو",
        notes: ["دو", "ري♭", "مي", "فا#"]
      },
      upper: [
        {
          name: "راست",
          root: "صول",
          notes: ["صول", "لا", "سي نصف♭", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري♭", "مي", "فا#", "صول", "لا", "سي نصف♭", "دو"],
      re: ["ري", "مي♭", "فا#", "صول#", "لا", "سي", "دو# نصف♭", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // SIKAH FAMILY (عائلة سيكاه)
  // ========================================
  {
    id: "sikah",
    family: "sikah",
    name: "سيكاه",
    latin: "Sikah",
    is_main: true,
    tonic_options: ["مي نصف♭"],
    description: "مقام حميمي وروحاني، يبدأ من درجة مي نصف منخفض. يُستخدم في الموسيقى الدينية والصوفية.",
    sayr: "جنس سيكاه على القرار وجنس سيكاه على الخامسة",
    dominant: "سي نصف♭",
    feeling: ["حميمية", "روحانية", "تأمل", "صوفي"],
    mood_color: "#a89b7e",
    jins: {
      lower: {
        name: "سيكاه",
        root: "مي نصف♭",
        notes: ["مي نصف♭", "فا", "صول", "لا"]
      },
      upper: [
        {
          name: "سيكاه",
          root: "سي نصف♭",
          notes: ["سي نصف♭", "دو", "ري", "مي نصف♭"]
        }
      ]
    },
    notes: {
      "مي نصف♭": ["مي نصف♭", "فا", "صول", "لا", "سي نصف♭", "دو", "ري", "مي نصف♭"]
    },
    examples: ["موسيقى دينية", "أذكار"],
    related_sheets: [],
    sub_maqamat: ["huzam", "sikah_baladi", "rahat_arwah"]
  },
  {
    id: "huzam",
    family: "sikah",
    name: "هُزام",
    latin: "Huzam",
    is_main: false,
    tonic_options: ["مي نصف♭"],
    description: "تنويع عاطفي على سيكاه",
    sayr: "سيكاه مع تنويعات عاطفية في الأعلى",
    dominant: "سي نصف♭",
    feeling: ["عاطفة", "روحانية", "حزن خفيف"],
    mood_color: "#b4a688",
    jins: {
      lower: {
        name: "سيكاه",
        root: "مي نصف♭",
        notes: ["مي نصف♭", "فا", "صول", "لا♭"]
      },
      upper: [
        {
          name: "حجاز",
          root: "سي نصف♭",
          notes: ["سي نصف♭", "دو", "ري", "مي نصف♭"]
        }
      ]
    },
    notes: {
      "مي نصف♭": ["مي نصف♭", "فا", "صول", "لا♭", "سي نصف♭", "دو", "ري", "مي نصف♭"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "sikah_baladi",
    family: "sikah",
    name: "سيكاه بلدي",
    latin: "Sikah Baladi",
    is_main: false,
    tonic_options: ["مي نصف♭"],
    description: "نسخة شعبية من سيكاه",
    sayr: "سيكاه مع لمسات شعبية مبسّطة",
    dominant: "لا",
    feeling: ["شعبي", "بساطة", "أصالة"],
    mood_color: "#c0b294",
    jins: {
      lower: {
        name: "سيكاه",
        root: "مي نصف♭",
        notes: ["مي نصف♭", "فا", "صول", "لا"]
      },
      upper: [
        {
          name: "راست",
          root: "سي نصف♭",
          notes: ["سي نصف♭", "دو", "ري نصف♭", "مي نصف♭"]
        }
      ]
    },
    notes: {
      "مي نصف♭": ["مي نصف♭", "فا", "صول", "لا", "سي نصف♭", "دو", "ري نصف♭", "مي نصف♭"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "rahat_arwah",
    family: "sikah",
    name: "راحة الأرواح",
    latin: "Rahat al-Arwah",
    is_main: false,
    tonic_options: ["مي نصف♭"],
    description: "مقام روحاني وهادئ من عائلة سيكاه، اسمه يعني 'راحة الأرواح'",
    sayr: "سيكاه مع مسار هادئ ومريح",
    dominant: "سي نصف♭",
    feeling: ["هدوء", "سلام", "روحانية", "راحة"],
    mood_color: "#ccc0a0",
    jins: {
      lower: {
        name: "سيكاه",
        root: "مي نصف♭",
        notes: ["مي نصف♭", "فا", "صول", "لا"]
      },
      upper: [
        {
          name: "عجم",
          root: "سي نصف♭",
          notes: ["سي نصف♭", "دو", "ري", "مي نصف♭"]
        }
      ]
    },
    notes: {
      "مي نصف♭": ["مي نصف♭", "فا", "صول", "لا", "سي نصف♭", "دو", "ري", "مي نصف♭"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // SABA FAMILY (عائلة صبا)
  // ========================================
  {
    id: "saba",
    family: "saba",
    name: "صبا",
    latin: "Saba",
    is_main: true,
    tonic_options: ["ري", "صول", "لا"],
    description: "مقام عاطفي عميق وحزين جداً، يُعتبر من أكثر المقامات تعبيراً عن الحزن في الموسيقى العربية.",
    sayr: "جنس صبا على القرار مع تطوير معقّد في الأعلى",
    dominant: "لا",
    feeling: ["حزن عميق", "عاطفة قوية", "تعبير", "ألم"],
    mood_color: "#8b7ec8",
    jins: {
      lower: {
        name: "صبا",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول♭"]
      },
      upper: [
        {
          name: "حجاز",
          root: "لا",
          notes: ["لا", "سي♭", "دو#", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول♭", "لا", "سي♭", "دو", "ري"],
      sol: ["صول", "لا نصف♭", "سي♭", "دو♭", "ري", "مي♭", "فا", "صول"],
      la: ["لا", "سي نصف♭", "دو", "ري♭", "مي", "فا", "صول", "لا"]
    },
    examples: ["غناء تعبيري", "موشحات حزينة"],
    related_sheets: [],
    sub_maqamat: ["saba_zamzam", "saba_dalanshin"]
  },
  {
    id: "saba_zamzam",
    family: "saba",
    name: "صبا زمزم",
    latin: "Saba Zamzam",
    is_main: false,
    tonic_options: ["ري"],
    description: "نسخة أعمق من صبا مع حزن أكثر كثافة",
    sayr: "صبا مع تعميق في المشاعر الحزينة",
    dominant: "لا",
    feeling: ["حزن عميق جداً", "كآبة", "تأمل"],
    mood_color: "#7a6db4",
    jins: {
      lower: {
        name: "صبا",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول♭"]
      },
      upper: [
        {
          name: "صبا",
          root: "لا",
          notes: ["لا", "سي نصف♭", "دو", "ري♭"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول♭", "لا", "سي نصف♭", "دو", "ري♭"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },
  {
    id: "saba_dalanshin",
    family: "saba",
    name: "صبا دلنشين",
    latin: "Saba Dalanshin",
    is_main: false,
    tonic_options: ["ري"],
    description: "تنويع على صبا بتأثيرات فارسية",
    sayr: "صبا مع لمسات فارسية في الأداء",
    dominant: "لا",
    feeling: ["حزن", "فارسي", "رقّة"],
    mood_color: "#9580d0",
    jins: {
      lower: {
        name: "صبا",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول♭"]
      },
      upper: [
        {
          name: "كرد",
          root: "لا",
          notes: ["لا", "سي♭", "دو", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول♭", "لا", "سي♭", "دو", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  },

  // ========================================
  // NAWA ATHAR FAMILY (عائلة نوى أثر)
  // ========================================
  {
    id: "nawa_athar",
    family: "nawa_athar",
    name: "نوى أثر",
    latin: "Nawa Athar",
    is_main: true,
    tonic_options: ["ري", "دو"],
    description: "مقام معقّد ومعبّر، يُستخدم في التأليف الكلاسيكي",
    sayr: "بيات في القرار وحجاز في الأعلى",
    dominant: "لا",
    feeling: ["تعقيد", "تعبير", "درامية"],
    mood_color: "#a88ec8",
    jins: {
      lower: {
        name: "بيات",
        root: "ري",
        notes: ["ري", "مي نصف♭", "فا", "صول"]
      },
      upper: [
        {
          name: "حجاز",
          root: "لا",
          notes: ["لا", "سي♭", "دو#", "ري"]
        }
      ]
    },
    notes: {
      re: ["ري", "مي نصف♭", "فا", "صول", "لا", "سي♭", "دو#", "ري"],
      do: ["دو", "ري نصف♭", "مي♭", "فا", "صول", "لا♭", "سي", "دو"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: ["nikriz"]
  },
  {
    id: "nikriz",
    family: "nawa_athar",
    name: "نكريز",
    latin: "Nikriz",
    is_main: false,
    tonic_options: ["دو", "ري"],
    description: "مقام ملوّن ومتوتر، يخلق توتراً عاطفياً قوياً",
    sayr: "حجاز على القرار وراست في الأعلى",
    dominant: "صول",
    feeling: ["توتر", "ألوان", "تعبير"],
    mood_color: "#b89ad4",
    jins: {
      lower: {
        name: "حجاز",
        root: "دو",
        notes: ["دو", "ري♭", "مي", "فا"]
      },
      upper: [
        {
          name: "راست",
          root: "صول",
          notes: ["صول", "لا", "سي نصف♭", "دو"]
        }
      ]
    },
    notes: {
      do: ["دو", "ري♭", "مي", "فا", "صول", "لا", "سي نصف♭", "دو"],
      re: ["ري", "مي♭", "فا#", "صول", "لا", "سي", "دو# نصف♭", "ري"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: []
  }
];

// Helper function to get maqamat by family
function getMaqamatByFamily(familyId) {
  return maqamat.filter(m => m.family === familyId);
}

// Helper function to get main maqamat only
function getMainMaqamat() {
  return maqamat.filter(m => m.is_main === true);
}

// Helper function to get a single maqam by id
function getMaqamById(id) {
  return maqamat.find(m => m.id === id);
}

// Get list of all families
function getFamilies() {
  const families = {};
  maqamat.forEach(m => {
    if (m.is_main) {
      families[m.family] = {
        id: m.family,
        name: m.name,
        latin: m.latin,
        color: m.mood_color
      };
    }
  });
  return Object.values(families);
}
