// data/arabic-music-intro/index.js
// Modular data entry point for the beginner Arabic music intro page.
window.ARABIC_MUSIC_INTRO_DATA = {
  showExercises: false,
  hero: {
    tag: 'مدخل تعليمي',
    title: 'المدخل إلى الموسيقى العربية',
    description: 'مدخل عملي للمبتدئ: اقرأ الرموز، افهم المقام، اسمع الإيقاع، ثم طبّق مباشرة على النوتات.'
  },
  quickLinks: [
    { href: '#beginner-path-section', label: 'مسار التعلّم' },
    { href: '#symbols-section', label: 'رموز النوتة' },
    { href: '#maqam-section', label: 'المقام' },
    { href: '#rhythm-section', label: 'الإيقاع' },
    { href: '#practice-section', label: 'التطبيق' }
  ],
  goal: {
    title: 'طريقة القراءة:',
    text: 'لا تحفظ كل شيء دفعة واحدة. افتح القسم الذي تحتاجه، افهم الرمز أو المصطلح، ثم ارجع إلى نوتة حقيقية وشاهد كيف يظهر داخل العمل.'
  },
  learningPath: [
    {
      step: '01',
      icon: 'notation',
      title: 'ابدأ من الرموز',
      text: 'تعرّف على المدرج، المفتاح، النغمة، السكتة، وعلامات الرفع والخفض.',
      href: '#symbols-section'
    },
    {
      step: '02',
      icon: 'maqam',
      title: 'افهم لغة المقام',
      text: 'اقرأ معنى القرار، الجنس، السير، والربع صوت قبل الدخول إلى صفحات المقامات.',
      href: '#maqam-section'
    },
    {
      step: '03',
      icon: 'rhythm',
      title: 'اسمع الإيقاع كدورة',
      text: 'فرّق بين الدوم، التك، السكتة، النبض، والدورة الإيقاعية.',
      href: '#rhythm-section'
    },
    {
      step: '04',
      icon: 'apply',
      title: 'طبّق على نوتة',
      text: 'افتح عملًا من المكتبة ولاحظ المقام والإيقاع واسم الملحن والمؤدي.',
      href: '#practice-section'
    }
  ],
  sectionMap: [
    {
      icon: 'notation',
      title: 'رموز النوتة',
      text: 'المدرج، مفتاح صول، الربع، الثمن، السكتات، وعلامات المقام.',
      href: '#symbols-section'
    },
    {
      icon: 'maqam',
      title: 'المقام للمبتدئ',
      text: 'المقام، الجنس، القرار، السير، والطابع السمعي.',
      href: '#maqam-section'
    },
    {
      icon: 'rhythm',
      title: 'الإيقاع للمبتدئ',
      text: 'الدوم، التك، السكتة، الدورة، والعدّ العملي.',
      href: '#rhythm-section'
    },
    {
      icon: 'apply',
      title: 'التطبيق العملي',
      text: 'كيف تقرأ بطاقة النوتة، ثم تدخل إلى ملف PDF بوعي.',
      href: '#practice-section'
    }
  ],
  sections: [],
  nextCards: [
    {
      title: 'تابع إلى المقامات',
      description: 'بعد فهم العلامات الأساسية، انتقل إلى صفحات المقامات لتتعرف على الراست، البياتي، النهاوند، الكرد، الحجاز وغيرها.',
      href: 'maqamat.html',
      cta: 'افتح المقامات'
    },
    {
      title: 'تابع إلى الإيقاعات',
      description: 'ادرس المقسوم، الملفوف، الوحدة، السماعي الثقيل وغيرها من الإيقاعات التي تظهر في الأعمال العربية.',
      href: 'rhythms.html',
      cta: 'افتح الإيقاعات'
    },
    {
      title: 'طبّق في مكتبة النوتات',
      description: 'اربط المفاهيم النظرية بأعمال حقيقية من خلال النوتات، أسماء الملحنين، المقامات، والإيقاعات المرتبطة بكل عمل.',
      href: 'library.html',
      cta: 'افتح مكتبة النوتات'
    }
  ]
};
