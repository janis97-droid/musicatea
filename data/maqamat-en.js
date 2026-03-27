const maqamat = [
  {
    id: "rast",
    family: "rast",
    name: "Rast",
    latin: "Rast",
    is_main: true,
    tonic_options: ["C", "D", "F"],
    description: "Often called the father of maqamat, Rast is stable, balanced, and foundational in Arabic music.",
    sayr: "Begins on the tonic through lower Rast and rises toward the upper jins.",
    dominant: "G",
    feeling: ["Balance", "Dignity", "Strength", "Stability"],
    mood_color: "#c8a45a",
    jins: {
      lower: { name: "Rast", root: "C", notes: ["C", "D", "E half-flat", "F"] },
      upper: [{ name: "Rast", root: "G", notes: ["G", "A", "B half-flat", "C"] }]
    },
    notes: {
      c: ["C", "D", "E half-flat", "F", "G", "A", "B half-flat", "C"],
      d: ["D", "E", "F# half-flat", "G", "A", "B", "C# half-flat", "D"],
      f: ["F", "G", "A half-flat", "Bb", "C", "D", "E half-flat", "F"]
    },
    examples: ["Al Rozana", "Ya Tayra Tiri", "Biladi Biladi"],
    related_sheets: ["rast"],
    sub_maqamat: ["suzidil", "nairuz", "yakah"]
  },
  {
    id: "bayat",
    family: "bayat",
    name: "Bayati",
    latin: "Bayati",
    is_main: true,
    tonic_options: ["D", "G", "A"],
    description: "One of the warmest and most expressive Arabic maqamat, widely used in vocal, folk, and devotional music.",
    sayr: "Begins with Bayati on the tonic and often rises toward Nahawand on the fifth.",
    dominant: "A",
    feeling: ["Warmth", "Emotion", "Longing", "Depth"],
    mood_color: "#9b7ec8",
    jins: {
      lower: { name: "Bayati", root: "D", notes: ["D", "E half-flat", "F", "G"] },
      upper: [{ name: "Nahawand", root: "A", notes: ["A", "Bb", "C", "D"] }]
    },
    notes: {
      d: ["D", "E half-flat", "F", "G", "A", "Bb", "C", "D"],
      g: ["G", "A half-flat", "Bb", "C", "D", "Eb", "F", "G"],
      a: ["A", "B half-flat", "C", "D", "E", "F", "G", "A"]
    },
    examples: ["W Minin Abda Ya Qalbi", "Ala Modak Enta W Bas", "Sahhak El Shoq"],
    related_sheets: ["bayat"],
    sub_maqamat: ["husayni", "bayat_shuri"]
  },
  {
    id: "nahawand",
    family: "nahawand",
    name: "Nahawand",
    latin: "Nahawand",
    is_main: true,
    tonic_options: ["C", "D", "F"],
    description: "Comparable to the minor scale in mood, Nahawand is lyrical, reflective, and often associated with melancholy and romance.",
    sayr: "Begins with Nahawand on the tonic and often expands through upper Nahawand or related ajnas.",
    dominant: "G",
    feeling: ["Sadness", "Romance", "Nostalgia", "Reflection"],
    mood_color: "#7b9cce",
    jins: {
      lower: { name: "Nahawand", root: "C", notes: ["C", "D", "Eb", "F"] },
      upper: [{ name: "Nahawand", root: "G", notes: ["G", "Ab", "B", "C"] }]
    },
    notes: {
      c: ["C", "D", "Eb", "F", "G", "Ab", "B", "C"],
      d: ["D", "E", "F", "G", "A", "Bb", "C#", "D"],
      f: ["F", "G", "Ab", "Bb", "C", "Db", "E", "F"]
    },
    examples: ["Samai Nahawand", "Sajer El Bunn"],
    related_sheets: ["nahawand"],
    sub_maqamat: ["nahawand_kabir", "nahawand_murassa", "farahfaza"]
  },
  {
    id: "ajam",
    family: "ajam",
    name: "Ajam",
    latin: "Ajam",
    is_main: true,
    tonic_options: ["C", "F", "G"],
    description: "Bright and open in character, Ajam resembles the major scale and is often used in formal, festive, and orchestral settings.",
    sayr: "Built from Ajam on the tonic and often Ajam on the fifth.",
    dominant: "G",
    feeling: ["Brightness", "Joy", "Clarity", "Grandeur"],
    mood_color: "#c8c45a",
    jins: {
      lower: { name: "Ajam", root: "C", notes: ["C", "D", "E", "F"] },
      upper: [{ name: "Ajam", root: "G", notes: ["G", "A", "B", "C"] }]
    },
    notes: {
      c: ["C", "D", "E", "F", "G", "A", "B", "C"],
      f: ["F", "G", "A", "Bb", "C", "D", "E", "F"],
      g: ["G", "A", "B", "C", "D", "E", "F#", "G"]
    },
    examples: ["Ana Albi Dalili", "Wehyat Albi"],
    related_sheets: ["ajam"],
    sub_maqamat: ["ajam_ushayran", "mahur"]
  },
  {
    id: "kurd",
    family: "kurd",
    name: "Kurd",
    latin: "Kurd",
    is_main: true,
    tonic_options: ["D", "G", "A"],
    description: "A dark and direct maqam without quarter tones, Kurd is widely heard in folk, modern, and emotionally straightforward melodies.",
    sayr: "Built on lower Kurd and often upper Kurd on the fifth.",
    dominant: "A",
    feeling: ["Darkness", "Simplicity", "Sadness", "Folk color"],
    mood_color: "#7ec89b",
    jins: {
      lower: { name: "Kurd", root: "D", notes: ["D", "Eb", "F", "G"] },
      upper: [{ name: "Kurd", root: "A", notes: ["A", "Bb", "C", "D"] }]
    },
    notes: {
      d: ["D", "Eb", "F", "G", "A", "Bb", "C", "D"],
      g: ["G", "Ab", "Bb", "C", "D", "Eb", "F", "G"],
      a: ["A", "Bb", "C", "D", "E", "F", "G", "A"]
    },
    examples: ["Shukran", "Ana W Leila"],
    related_sheets: ["kurd"],
    sub_maqamat: ["athar_kurd"]
  },
  {
    id: "hijaz",
    family: "hijaz",
    name: "Hijaz",
    latin: "Hijaz",
    is_main: true,
    tonic_options: ["D", "G", "A"],
    description: "Highly expressive and dramatic, Hijaz is known for its distinctive augmented second and strong emotional pull.",
    sayr: "Begins with Hijaz on the tonic and often moves to Rast or Nahawand in the upper range.",
    dominant: "A",
    feeling: ["Drama", "Spirituality", "Intensity", "Expression"],
    mood_color: "#c86060",
    jins: {
      lower: { name: "Hijaz", root: "D", notes: ["D", "Eb", "F#", "G"] },
      upper: [{ name: "Rast", root: "A", notes: ["A", "B", "C half-flat", "D"] }]
    },
    notes: {
      d: ["D", "Eb", "F#", "G", "A", "Bb", "C", "D"],
      g: ["G", "Ab", "B", "C", "D", "Eb", "F", "G"],
      a: ["A", "Bb", "C#", "D", "E", "F", "G", "A"]
    },
    examples: ["Sacred melodies", "Adhan", "Muwashahat"],
    related_sheets: [],
    sub_maqamat: ["hijazkar", "shahnaz", "suznak"]
  },
  {
    id: "sikah",
    family: "sikah",
    name: "Sikah",
    latin: "Sikah",
    is_main: true,
    tonic_options: ["E half-flat"],
    description: "An intimate and inward maqam with strong ties to recitation, devotional music, and subtle quarter-tone expression.",
    sayr: "Built on Sikah on the tonic and developed through related upper ajnas.",
    dominant: "B half-flat",
    feeling: ["Intimacy", "Spirituality", "Reflection", "Mysticism"],
    mood_color: "#a89b7e",
    jins: {
      lower: { name: "Sikah", root: "E half-flat", notes: ["E half-flat", "F", "G", "A"] },
      upper: [{ name: "Sikah", root: "B half-flat", notes: ["B half-flat", "C", "D", "E half-flat"] }]
    },
    notes: {
      e_half_flat: ["E half-flat", "F", "G", "A", "B half-flat", "C", "D", "E half-flat"]
    },
    examples: ["Devotional music", "Dhikr"],
    related_sheets: [],
    sub_maqamat: ["huzam", "sikah_baladi", "rahat_arwah"]
  },
  {
    id: "saba",
    family: "saba",
    name: "Saba",
    latin: "Saba",
    is_main: true,
    tonic_options: ["D", "G", "A"],
    description: "One of the most poignant Arabic maqamat, Saba is deeply sorrowful and emotionally charged.",
    sayr: "Begins with Jins Saba and develops through complex upper movement.",
    dominant: "A",
    feeling: ["Deep sorrow", "Pain", "Intensity", "Lament"],
    mood_color: "#8b7ec8",
    jins: {
      lower: { name: "Saba", root: "D", notes: ["D", "E half-flat", "F", "Gb"] },
      upper: [{ name: "Hijaz", root: "A", notes: ["A", "Bb", "C#", "D"] }]
    },
    notes: {
      d: ["D", "E half-flat", "F", "Gb", "A", "Bb", "C", "D"]
    },
    examples: ["Expressive vocal forms", "Sad muwashahat"],
    related_sheets: [],
    sub_maqamat: ["saba_zamzam", "saba_dalanshin"]
  },
  {
    id: "nawa_athar",
    family: "nawa_athar",
    name: "Nawa Athar",
    latin: "Nawa Athar",
    is_main: true,
    tonic_options: ["D", "C"],
    description: "A complex and color-rich maqam, often used in advanced composition and dramatic melodic movement.",
    sayr: "Combines distinct lower and upper ajnas to produce a tense and colorful modal atmosphere.",
    dominant: "A",
    feeling: ["Complexity", "Color", "Drama", "Expression"],
    mood_color: "#a88ec8",
    jins: {
      lower: { name: "Bayati", root: "D", notes: ["D", "E half-flat", "F", "G"] },
      upper: [{ name: "Hijaz", root: "A", notes: ["A", "Bb", "C#", "D"] }]
    },
    notes: {
      d: ["D", "E half-flat", "F", "G", "A", "Bb", "C#", "D"],
      c: ["C", "D half-flat", "Eb", "F", "G", "Ab", "B", "C"]
    },
    examples: [],
    related_sheets: [],
    sub_maqamat: ["nikriz"]
  }
];

function getMaqamatByFamily(familyId) {
  return maqamat.filter(m => m.family === familyId);
}

function getMainMaqamat() {
  return maqamat.filter(m => m.is_main === true);
}

function getMaqamById(id) {
  return maqamat.find(m => m.id === id);
}

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