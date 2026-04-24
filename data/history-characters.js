// data/history-characters.js
// Central registry helpers for figures used by the Arabic music history pages.
// The registry intentionally supports both older inline `figures` entries in
// data/history*.js and newer data-driven `figure_ids` entries.

const historyCharacterOverrides = [
  {
    id: "umm-kulthum",
    name: { ar: "أم كلثوم", en: "Umm Kulthum" },
    aliases: ["ام كلثوم", "Oum Kalthoum", "Om Kalthoum", "Umm Kulthum", "Umm Kalthum"]
  },
  {
    id: "mohamed-el-qasabgi",
    name: { ar: "محمد القصبجي", en: "Mohamed El Qasabgi" },
    aliases: ["محمد القصبجي", "محمد القصبجي", "Mohamed El Qasabgi", "Muhammad al-Qasabji", "Muhammad al-Qasabgi"]
  },
  {
    id: "farid-al-atrash",
    name: { ar: "فريد الأطرش", en: "Farid al-Atrash" },
    aliases: ["فريد الاطرش", "Farid al-Atrash", "Farid Al Atrash"]
  },
  {
    id: "mohamed-abdel-wahab",
    name: { ar: "محمد عبد الوهاب", en: "Mohammed Abdel Wahab" },
    aliases: ["محمد عبدالوهاب", "Mohamed Abdel Wahab", "Muhammad Abd al-Wahhab", "Mohammed Abdel Wahab"]
  },
  {
    id: "riyad-al-sunbati",
    name: { ar: "رياض السنباطي", en: "Riyad al-Sunbati" },
    aliases: ["رياض السنباطي", "رياض السنباطى", "Riad al-Sunbati", "Riyad al-Sunbati", "Riad Sombati"]
  },
  {
    id: "fairuz",
    name: { ar: "فيروز", en: "Fairuz" },
    aliases: ["فيروز", "Fayrouz", "Fairuz", "Fairouz"]
  },
  {
    id: "rahbani-brothers",
    name: { ar: "الأخوان رحباني", en: "Rahbani Brothers" },
    aliases: ["الأخوين رحباني", "اخوين رحباني", "الاخوان رحباني", "الرحابنة", "الرحابنه", "Rahbani Brothers", "Assi and Mansour Rahbani", "Asi Rahbani", "Mansour Rahbani"]
  },
  {
    id: "wadih-al-safi",
    name: { ar: "وديع الصافي", en: "Wadih al-Safi" },
    aliases: ["وديع الصافي", "Wadih El Safi", "Wadih al-Safi"]
  },
  {
    id: "melhem-barakat",
    name: { ar: "ملحم بركات", en: "Melhem Barakat" },
    aliases: ["ملحم بركات", "Melhem Barakat", "Melhem Barkat"]
  },
  {
    id: "sabah-fakhri",
    name: { ar: "صباح فخري", en: "Sabah Fakhri" },
    aliases: ["صباح فخري", "Sabah Fakhri"]
  },
  {
    id: "george-wassouf",
    name: { ar: "جورج وسوف", en: "George Wassouf" },
    aliases: ["جورج وسوف", "George Wassouf", "Georges Wassouf"]
  },
  {
    id: "sayed-darwish",
    name: { ar: "سيد درويش", en: "Sayyid Darwish" },
    aliases: ["سيد درويش", "سيد درويش", "Sayyid Darwish", "Sayed Darwish"]
  },
  {
    id: "zakariyya-ahmad",
    name: { ar: "زكريا أحمد", en: "Zakariyya Ahmad" },
    aliases: ["زكريا احمد", "Zakariyya Ahmad", "Zakaria Ahmed"]
  },
  {
    id: "asmahan",
    name: { ar: "أسمهان", en: "Asmahan" },
    aliases: ["اسمهان", "أسمهان", "Asmahan"]
  },
  {
    id: "layla-murad",
    name: { ar: "ليلى مراد", en: "Layla Murad" },
    aliases: ["ليلى مراد", "ليلي مراد", "Layla Murad", "Laila Murad"]
  },
  {
    id: "abdel-halim-hafez",
    name: { ar: "عبد الحليم حافظ", en: "Abd al-Halim Hafiz" },
    aliases: ["عبد الحليم حافظ", "Abdel Halim Hafez", "Abd al-Halim Hafiz"]
  },
  {
    id: "othman-al-mawsili",
    name: { ar: "عثمان الموصلي", en: "Othman al-Mawsili" },
    aliases: ["عثمان الموصلي", "Othman el Mosley", "Uthman al-Mawsili", "Othman al-Mawsili"]
  },
  {
    id: "safi-al-din-al-urmawi",
    name: { ar: "صفي الدين الأرموي", en: "Safi al-Din al-Urmawi" },
    aliases: ["صفي الدين الأرموي", "صفي الدين الارموي", "Safi al-Din al-Urmawi"]
  },
  {
    id: "mikhail-mishaqa",
    name: { ar: "ميخائيل مشاقة", en: "Mikhail Mishaqa" },
    aliases: ["ميخائيل مشاقة", "Mikhail Mishaqa", "Mikha'il Mishaqa"]
  },
  {
    id: "ziryab",
    name: { ar: "أبو الحسن علي بن نافع زرياب", en: "Abu al-Hasan Ali ibn Nafi' Ziryab" },
    aliases: ["زرياب", "أبو الحسن علي بن نافع زرياب", "Abu al-Hasan Ali ibn Nafi' Ziryab", "Ziryab"]
  },
  {
    id: "ibrahim-al-mawsili",
    name: { ar: "إبراهيم الموصلي", en: "Ibrahim al-Mawsili" },
    aliases: ["ابراهيم الموصلي", "إبراهيم الموصلي", "Ibrahim al-Mawsili"]
  },
  {
    id: "ishaq-al-mawsili",
    name: { ar: "إسحاق الموصلي", en: "Ishaq al-Mawsili" },
    aliases: ["اسحاق الموصلي", "إسحاق الموصلي", "Ishaq al-Mawsili"]
  },
  {
    id: "al-farabi",
    name: { ar: "أبو نصر الفارابي", en: "Abu Nasr al-Farabi" },
    aliases: ["ابو نصر الفارابي", "أبو نصر الفارابي", "Al-Farabi", "Abu Nasr al-Farabi"]
  },
  {
    id: "ibn-sina",
    name: { ar: "الحسين بن عبد الله ابن سينا", en: "Al-Husayn ibn Abd Allah Ibn Sina" },
    aliases: ["ابن سينا", "Ibn Sina", "Avicenna", "Al-Husayn ibn Abd Allah Ibn Sina"]
  },
  {
    id: "abu-al-faraj-al-isfahani",
    name: { ar: "أبو الفرج الأصفهاني", en: "Abu al-Faraj al-Isfahani" },
    aliases: ["ابو الفرج الاصفهاني", "أبو الفرج الأصفهاني", "Abu al-Faraj al-Isfahani"]
  },
  {
    id: "cairo-congress-1932",
    name: { ar: "مؤتمر القاهرة للموسيقى العربية 1932", en: "Cairo Congress of Arab Music 1932" },
    aliases: ["مؤتمر القاهرة 1932", "Cairo Congress of Arab Music", "Cairo Congress 1932"]
  }
];

function normalizeHistoryCharacterValue(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/طُوَيْس/g, 'طويس')
    .replace(/[\-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function historyCharacterSlug(value) {
  const normalized = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’'`]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return normalized || 'history-figure';
}

function getHistoryFigureName(figure) {
  if (typeof figure === 'string') return figure;
  return figure?.name || '';
}

function createHistoryCharacterRegistry(historyData, options = {}) {
  const isEnglish = options.isEnglish === true;
  const fallbackDescription = isEnglish
    ? 'A figure associated with this musical era.'
    : 'من الشخصيات المرتبطة بهذه الحقبة الموسيقية.';
  const overrides = Array.isArray(options.overrides) ? options.overrides : historyCharacterOverrides;
  const list = [];
  const byId = new Map();
  const byKey = new Map();
  const byEra = new Map();

  function keysFor(item) {
    const values = [
      item.id,
      item.slug,
      item.name,
      item.name_ar,
      item.name_en,
      item.name?.ar,
      item.name?.en,
      ...(Array.isArray(item.aliases) ? item.aliases : [])
    ].filter(Boolean);
    return [...new Set(values.map(normalizeHistoryCharacterValue).filter(Boolean))];
  }

  function findOverrideForFigure(figure) {
    const name = getHistoryFigureName(figure);
    const key = normalizeHistoryCharacterValue(name);
    if (!key) return null;
    return overrides.find((item) => keysFor(item).includes(key)) || null;
  }

  function indexCharacter(character) {
    byId.set(character.id, character);
    keysFor(character).forEach((key) => byKey.set(key, character));
  }

  function mergeIntoCharacter(existing, incoming) {
    const merged = existing || { id: incoming.id };
    merged.slug = incoming.slug || merged.slug || incoming.id;
    merged.name_ar = incoming.name_ar || merged.name_ar || '';
    merged.name_en = incoming.name_en || merged.name_en || '';
    merged.role = incoming.role || merged.role || '';
    merged.years = incoming.years || merged.years || '';
    merged.description = incoming.description || merged.description || fallbackDescription;
    merged.aliases = [...new Set([...(merged.aliases || []), ...(incoming.aliases || [])].filter(Boolean))];
    merged.era_ids = [...new Set([...(merged.era_ids || []), ...(incoming.era_ids || [])].filter(Boolean))];
    merged.era_entries = [...(merged.era_entries || []), ...(incoming.era_entries || [])];
    return merged;
  }

  function addCharacter(incoming) {
    const id = incoming.id || historyCharacterSlug(incoming.name_en || incoming.name_ar || incoming.name || 'history-figure');
    const existing = byId.get(id) || byKey.get(normalizeHistoryCharacterValue(incoming.name_ar)) || byKey.get(normalizeHistoryCharacterValue(incoming.name_en));
    const character = mergeIntoCharacter(existing, { ...incoming, id });

    if (!existing) list.push(character);
    indexCharacter(character);
    return character;
  }

  overrides.forEach((override) => {
    addCharacter({
      id: override.id,
      slug: override.slug || override.id,
      name_ar: override.name?.ar || override.name_ar || '',
      name_en: override.name?.en || override.name_en || '',
      aliases: override.aliases || []
    });
  });

  (Array.isArray(historyData) ? historyData : []).forEach((era) => {
    const figures = Array.isArray(era?.figures) ? era.figures : [];
    const figureIds = Array.isArray(era?.figure_ids) ? era.figure_ids : [];
    const eraCharacters = [];

    figureIds.forEach((figureId, index) => {
      const character = byId.get(figureId) || addCharacter({ id: figureId, slug: figureId });
      character.era_ids = [...new Set([...(character.era_ids || []), era.id].filter(Boolean))];
      character.era_entries = [...(character.era_entries || []), { era_id: era.id, era_title: era.title, era_period: era.period, figure_index: index }];
      eraCharacters.push(character);
    });

    figures.forEach((figure, index) => {
      const override = findOverrideForFigure(figure);
      const rawName = getHistoryFigureName(figure);
      const name_ar = isEnglish ? (override?.name?.ar || '') : rawName;
      const name_en = isEnglish ? rawName : (override?.name?.en || '');
      const id = figure?.id || override?.id || historyCharacterSlug(override?.name?.en || rawName);
      const character = addCharacter({
        id,
        slug: id,
        name_ar,
        name_en,
        role: typeof figure === 'string' ? '' : (figure?.role || ''),
        years: typeof figure === 'string' ? '' : (figure?.years || ''),
        description: typeof figure === 'string' ? fallbackDescription : (figure?.description || fallbackDescription),
        aliases: [rawName, ...(override?.aliases || [])].filter(Boolean),
        era_ids: era?.id ? [era.id] : [],
        era_entries: era?.id ? [{ era_id: era.id, era_title: era.title, era_period: era.period, figure_index: index }] : []
      });
      eraCharacters.push(character);
    });

    if (era?.id) byEra.set(era.id, eraCharacters);
  });

  return { list, byId, byKey, byEra, isEnglish };
}

function findHistoryCharacter(registry, value) {
  if (!registry || !value) return null;
  const key = normalizeHistoryCharacterValue(value);
  return registry.byId?.get(value) || registry.byKey?.get(key) || null;
}

function getHistoryCharactersForEra(registry, era) {
  if (!registry || !era) return [];
  if (Array.isArray(era.figure_ids) && era.figure_ids.length) {
    return era.figure_ids.map((id) => registry.byId?.get(id)).filter(Boolean);
  }
  return registry.byEra?.get(era.id) || [];
}

function displayHistoryCharacter(character, isEnglish) {
  if (!character) return { id: '', name: '', role: '', years: '', description: '', aliases: [] };
  return {
    id: character.id || '',
    name: isEnglish ? (character.name_en || character.name_ar || '') : (character.name_ar || character.name_en || ''),
    role: character.role || '',
    years: character.years || '',
    description: character.description || '',
    aliases: character.aliases || [],
    source_era_id: character.era_entries?.[0]?.era_id || '',
    source_figure_index: character.era_entries?.[0]?.figure_index ?? 0
  };
}

(function exposeHistoryCharacterRegistry(global) {
  global.historyCharacterOverrides = historyCharacterOverrides;
  global.normalizeHistoryCharacterValue = normalizeHistoryCharacterValue;
  global.createHistoryCharacterRegistry = createHistoryCharacterRegistry;
  global.findHistoryCharacter = findHistoryCharacter;
  global.getHistoryCharactersForEra = getHistoryCharactersForEra;
  global.displayHistoryCharacter = displayHistoryCharacter;

  if (Array.isArray(global.history)) {
    const isEnglish = document.documentElement.lang === 'en' || document.body?.dir === 'ltr';
    global.historyCharacters = createHistoryCharacterRegistry(global.history, { isEnglish });
  }
})(window);
