// assets/pages/arabic-music-intro/intro-hub.js
// Renders a clean hub for the Arabic music intro section.
(function () {
  const root = document.getElementById('intro-page-root');
  const symbols = window.MUSICATEA_INTRO_SYMBOLS;
  if (!root) return;

  function icon(type) {
    const span = document.createElement('span');
    span.className = 'intro-ui-icon';
    const drawer = symbols && symbols.drawers && symbols.drawers[type];
    if (drawer && symbols.svgEl) {
      const svg = symbols.svgEl('svg', { viewBox: '0 0 52 52', role: 'img', 'aria-hidden': 'true' }, span);
      drawer(svg, symbols);
    } else {
      span.innerHTML = '<span class="intro-ui-icon-fallback">♪</span>';
    }
    return span.outerHTML;
  }

  root.innerHTML = `
    <header class="intro-hero">
      <span class="intro-tag">مدخل تعليمي</span>
      <h1>المدخل إلى الموسيقى العربية</h1>
      <p>ابدأ من صفحة واضحة واحدة، ثم انتقل إلى مسار قصير حسب حاجتك: قراءة النوتة، فهم المقام، أو قراءة الإيقاع. كل مسار يحتوي على مصطلحات، رموز، ومثال من الموقع.</p>
    </header>

    <section class="intro-section-map intro-primary-choices" aria-labelledby="intro-section-map-title">
      <div class="intro-map-head">
        <h2 id="intro-section-map-title">اختر مسارك التعليمي</h2>
        <p>لا تقرأ كل شيء دفعة واحدة. اختر الباب الذي تحتاجه الآن، ثم طبّق مباشرة على صفحات Musicatea.</p>
      </div>
      <div class="intro-map-grid intro-map-grid-primary">
        <a href="learn-notation.html" class="intro-map-card">
          ${icon('treble-clef')}
          <div><strong>تعلّم قراءة النوتة</strong><span>المدرج، مفتاح صول، الميزان، النغمات، السكتات، والرموز الأساسية.</span></div>
        </a>
        <a href="learn-maqam.html" class="intro-map-card">
          ${icon('notation')}
          <div><strong>تعلّم ما هو المقام</strong><span>المقام، الجنس، القرار، الغمّاز، السير، وعلامات الربع صوت.</span></div>
        </a>
        <a href="learn-rhythm.html" class="intro-map-card">
          ${icon('meter-44')}
          <div><strong>تعلّم قراءة الإيقاع</strong><span>الدوم، التك، السكتة، النبض، الميزان، والدورة الإيقاعية.</span></div>
        </a>
      </div>
    </section>

    <section class="intro-learning-path intro-apply-links" aria-labelledby="intro-after-title">
      <div class="intro-learning-head">
        <span class="intro-kicker">بعد المسارات</span>
        <h2 id="intro-after-title">طبّق داخل الموقع</h2>
        <p>بعد فهم الأساسيات، انتقل إلى الصفحات المرجعية والتطبيقية حتى ترى المفاهيم داخل أعمال ومقامات وإيقاعات حقيقية.</p>
      </div>
      <div class="intro-path-grid">
        <a class="intro-path-card" href="library.html">${icon('apply')}<span class="intro-step">01</span><h3>مكتبة النوتات</h3><p>طبّق القراءة على أعمال حقيقية من خلال البطاقات والملفات.</p></a>
        <a class="intro-path-card" href="maqamat.html">${icon('notation')}<span class="intro-step">02</span><h3>المقامات</h3><p>انتقل من التعريف المختصر إلى صفحات المقامات التفصيلية.</p></a>
        <a class="intro-path-card" href="rhythms.html">${icon('meter-44')}<span class="intro-step">03</span><h3>الإيقاعات</h3><p>اقرأ الإيقاعات كدورات من الدوم والتك والسكتات.</p></a>
        <a class="intro-path-card" href="history.html">${icon('card-reading')}<span class="intro-step">04</span><h3>تاريخ الموسيقى</h3><p>اربط المفاهيم بالسياق التاريخي والشخصيات والمدارس.</p></a>
      </div>
    </section>
  `;
})();
