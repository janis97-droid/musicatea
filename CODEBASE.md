# Musicatea – Codebase Snapshot (HTML + CSS + Core JS)

**Site:** musicatea.com | **Repo:** janis97-droid/musicatea | **Branch:** main

Arabic (RTL) + English (LTR) static GitHub Pages site.

**Data files** (not included here, in `/data/` folder): `sheets.js`, `history.js`, `history-en.js`, `maqamat.js`, `maqamat-en.js`, `rhythms.js`, `rhythms-en.js`

---

## index.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>موسيقتي | Musicatea - الموسوعة الموسيقية العربية</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    .hero {
      padding: 100px 5% 80px;
      text-align: center;
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 50%);
      border-bottom: 1px solid var(--border);
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(200,164,90,0.05) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero-tag {
      font-size: 1.5rem;
      letter-spacing: 0.15em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 10px;
      display: inline-block;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 900;
      margin-bottom: 12px;
      background: linear-gradient(135deg, var(--text), var(--gold-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero .subtitle {
      font-size: clamp(1rem, 2vw, 1.3rem);
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto 40px;
      line-height: 1.8;
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .cta-btn {
      padding: 14px 32px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      transition: all 0.3s var(--ease);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .cta-primary {
      background: var(--gold);
      color: var(--bg);
      border: 2px solid var(--gold);
    }

    .cta-primary:hover {
      background: var(--gold-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(200,164,90,0.3);
    }

    .cta-secondary {
      background: transparent;
      color: var(--text);
      border: 2px solid var(--border2);
    }

    .cta-secondary:hover {
      border-color: var(--gold);
      color: var(--gold-light);
      transform: translateY(-2px);
    }

    .pillars {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      padding: 80px 5%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .pillar {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 40px 32px;
      text-align: center;
      transition: all 0.4s var(--ease);
      animation: fadeInUp 0.6s var(--ease) backwards;
    }

    .pillar:nth-child(1) { animation-delay: 0.1s; }
    .pillar:nth-child(2) { animation-delay: 0.2s; }
    .pillar:nth-child(3) { animation-delay: 0.3s; }
    .pillar:nth-child(4) { animation-delay: 0.4s; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pillar:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      border-color: rgba(200,164,90,0.4);
    }

    .pillar-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      display: block;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .pillar h3 {
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 12px;
      color: var(--gold-light);
    }

    .pillar p {
      color: var(--text-muted);
      line-height: 1.7;
      font-size: 0.95rem;
    }

    .about {
      padding: 60px 5%;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .about h2 {
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 20px;
      color: var(--text);
    }

    .about p {
      color: var(--text-muted);
      line-height: 1.9;
      font-size: 1.05rem;
    }
  </style>
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">موسيقتي</a>
        </div>

        <div class="nav-top-left">
          <a href="index-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html" class="active">الصفحة الرئيسية</a>
          <a href="library.html">مكتبة النوتات</a>
          <a href="maqamat.html">مقاماتي</a>
          <a href="rhythms.html">إيقاعاتي</a>
          <a href="history.html">تاريخ الموسيقى</a>
          <a href="ensemble.html">إنسامبل الأنغام</a>
        </div>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <span class="hero-tag">الموسوعة الموسيقية العربية</span>
      <h1>موسيقتي</h1>
      <p class="subtitle">
        منصّة موسيقية شاملة للموسيقى العربية - مكتبة نوتات واسعة, كل ما تريد أن تعرفه عن المقامات والايقاعات الشرقية وعلى تاريخ الموسيقى وروّادها
      </p>
      <div class="hero-cta">
        <a href="library.html" class="cta-btn cta-primary">
          استكشف النوتات
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="maqamat.html" class="cta-btn cta-secondary">
          تعلّم المقامات
        </a>
      </div>
    </div>
  </section>

  <section class="pillars">
    <div class="pillar">
      <span class="pillar-icon">♩</span>
      <h3>نوتات عربية وغربية</h3>
      <p>مكتبة متنامية من النوتات مصنّفة بحسب المقام ودرجاته, المطربين, الملحنين والمستوى.</p>
    </div>

    <div class="pillar">
      <span class="pillar-icon">𝄞</span>
      <h3>المقامات الشرقية</h3>
      <p>دليل شامل لكل مقام: درجاته، طابعه وأبرز الأعمال الموسيقية فيه.</p>
    </div>

    <div class="pillar">
      <span class="pillar-icon">📜</span>
      <h3>تاريخ الموسيقى</h3>
      <p>من العصر العباسي والأندلس حتى النهضة الموسيقية العربية الحديثة.</p>
    </div>

    <div class="pillar">
      <span class="pillar-icon">⬇</span>
      <h3>تحميل مجاني</h3>
      <p>جميع النوتات متاحة للتحميل المباشر بصيغة PDF.</p>
    </div>
  </section>

  <section class="about">
    <h2>عن المشروع</h2>
    <p>
      موسيقتي مشروع يهدف إلى توثيق وتبسيط الموسيقى العربية, تراثها, نظرياتها, موسيقييها وجعلها متاحة للجميع: المتعلم والمعلم والباحث والمستمع. المحتوى يُضاف ويُحدَّث باستمرار.
    </p>
  </section>

  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

</body>
</html>
```

## library.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مكتبة النوتات — موسيقتي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">موسيقتي</a>
        </div>

        <div class="nav-top-left">
          <a href="index-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html">الصفحة الرئيسية</a>
          <a href="library.html" class="active">مكتبة النوتات</a>
          <a href="maqamat.html">مقاماتي</a>
          <a href="rhythms.html">إيقاعاتي</a>
          <a href="history.html">تاريخ الموسيقى</a>
          <a href="ensemble.html">إنسامبل الأنغام</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="page-hero">
    <h1>مكتبة النوتات</h1>
    <p>نوتات موسيقية عربية وغربية — قابلة للتصفية والتحميل المجاني.</p>
  </header>

  <div class="filters">
    <select id="system">
      <option>نوتات شرقية</option>
      <option>نوتات غربية</option>
    </select>

    <select id="type">
      <option>الكل</option>
      <option>أغنية</option>
      <option>معزوفة</option>
    </select>

    <select id="maqam">
      <option value="">كل المقامات</option>
    </select>

    <select id="scale" style="display:none;">
      <option value="">All Scales</option>
    </select>

    <select id="tonic">
      <option value="">الدرجة</option>
    </select>

    <input id="search" type="text" placeholder="بحث بالاسم أو الملحن...">
  </div>

  <div id="list" class="grid"></div>

  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/sheets.js"></script>
  <script src="data/maqamat.js"></script>
  <script src="assets/ui.js"></script>
  <script src="assets/app.js"></script>

</body>
</html>
```

## ensemble.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إنسامبل الأنغام — موسيقتي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .ensemble-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
      text-align: center;
    }

    .ensemble-badge {
      display: inline-block;
      font-size: 0.7rem;
      letter-spacing: 0.14em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 16px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.2);
      padding: 6px 16px;
      border-radius: 100px;
    }

    .ensemble-hero h1 {
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 900;
      margin-bottom: 16px;
      background: linear-gradient(135deg, var(--text), var(--text-muted));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ensemble-hero .subtitle {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto 28px;
      line-height: 1.8;
    }

    .ensemble-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px 5% 80px;
    }

    .section-block {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 36px;
      margin-bottom: 32px;
      transition: all 0.4s var(--ease);
    }

    .section-block:hover {
      border-color: rgba(200,164,90,0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }

    .section-block h2 {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 18px;
      color: var(--gold-light);
    }

    .section-block p {
      color: var(--text-muted);
      line-height: 1.95;
      font-size: 1rem;
      margin-bottom: 14px;
    }

    .section-block p:last-child {
      margin-bottom: 0;
    }

    .goals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
      margin-top: 24px;
    }

    .goal-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      border-right: 3px solid var(--gold-dim);
      transition: all 0.3s var(--ease);
    }

    .goal-item:hover {
      background: var(--surface2);
      border-right-color: var(--gold);
      transform: translateX(-4px);
    }

    .goal-item::before {
      content: '✓';
      display: inline-block;
      width: 24px;
      height: 24px;
      background: var(--gold-dim);
      color: var(--gold);
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      font-weight: 900;
      margin-left: 10px;
      font-size: 0.85rem;
    }

    .goal-item p {
      font-size: 0.92rem;
      margin: 0;
      color: var(--text);
    }

    .instruments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
      margin-top: 24px;
    }

    .instrument-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 24px 18px;
      text-align: center;
      transition: all 0.3s var(--ease);
    }

    .instrument-card:hover {
      background: var(--gold-dim);
      border-color: rgba(200,164,90,0.3);
      transform: translateY(-4px);
    }

    .instrument-card .icon {
      font-size: 2.2rem;
      margin-bottom: 10px;
      display: block;
    }

    .instrument-card .name {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text);
    }

    .contact-section {
      background: linear-gradient(135deg, var(--bg3), var(--bg2));
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 40px;
      text-align: center;
    }

    .contact-section h2 {
      font-size: 1.6rem;
      font-weight: 900;
      margin-bottom: 12px;
      color: var(--text);
    }

    .contact-section p {
      color: var(--text-muted);
      margin-bottom: 28px;
      font-size: 1rem;
    }

    .contact-methods {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .contact-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.25);
      color: var(--gold-light);
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.3s var(--ease);
      direction: ltr;
    }

    .contact-btn:hover {
      background: rgba(200,164,90,0.2);
      border-color: rgba(200,164,90,0.45);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(200,164,90,0.2);
    }

    .contact-btn svg {
      transition: transform 0.3s var(--ease);
    }

    .contact-btn:hover svg {
      transform: scale(1.1);
    }

    .director-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 32px;
      margin-top: 24px;
      display: flex;
      align-items: start;
      gap: 24px;
    }

    .director-avatar {
      width: 80px;
      height: 80px;
      background: var(--gold-dim);
      border: 2px solid rgba(200,164,90,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--gold-light);
      font-weight: 900;
      flex-shrink: 0;
    }

    .director-info h3 {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 6px;
      color: var(--text);
    }

    .director-info .title {
      font-size: 0.9rem;
      color: var(--gold);
      margin-bottom: 14px;
      display: block;
    }

    .director-info p {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.8;
      margin: 0;
    }

    @media (max-width: 640px) {
      .ensemble-content {
        padding: 40px 4% 60px;
      }

      .section-block {
        padding: 28px 20px;
      }

      .goals-grid,
      .instruments-grid {
        grid-template-columns: 1fr;
      }

      .contact-methods {
        flex-direction: column;
        align-items: stretch;
      }

      .director-card {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav class="site-nav">
    <a href="index.html" class="nav-logo">موسيقتي</a>
    <div class="nav-links">
      <a href="index.html">الصفحة الرئيسية</a>
      <a href="library.html">مكتبة النوتات</a>
      <a href="maqamat.html">مقاماتي</a>
      <a href="rhythms.html">إيقاعاتي</a>
      <a href="history.html">تاريخ الموسيقى</a>
      <a href="ensemble.html" class="active">إنسامبل الأنغام</a>
    </div>
  </nav>

  <!-- HERO -->
  <header class="ensemble-hero">
    <span class="ensemble-badge">برنامج معتمد — رقم 53576</span>
    <h1>إنسامبل الأنغام</h1>
    <p class="subtitle">برنامج تعليمي موسيقي معتمد لنشر الثقافة الموسيقية العربية بين الأجيال الناشئة</p>
  </header>

  <!-- CONTENT -->
  <div class="ensemble-content">

    <!-- About -->
    <div class="section-block">
      <h2>عن البرنامج</h2>
      <p>
        إنسامبل الأنغام هو برنامج تعليمي موسيقي معتمد ومرخّص، يهدف إلى نشر الثقافة الموسيقية العربية بين الأجيال الناشئة من خلال منهجية تعليمية حديثة تجمع بين الأصالة والإبداع.
      </p>
      <p>
        يعمل البرنامج ضمن إطار تربوي شامل يؤمن بأن الموسيقى حقّ لكل طفل وطالب، وأنها أداة فعّالة لبناء الشخصية وتنمية الذكاء العاطفي والاجتماعي.
      </p>
    </div>

    <!-- Goals -->
    <div class="section-block">
      <h2>أهداف البرنامج</h2>
      <div class="goals-grid">
        <div class="goal-item">
          <p>نشر الثقافة الموسيقية العربية وتعزيز الانتماء للهوية الموسيقية</p>
        </div>
        <div class="goal-item">
          <p>تعليم العزف على الآلات الموسيقية بأسلوب تربوي حديث</p>
        </div>
        <div class="goal-item">
          <p>تطوير مهارات قراءة النوتة والسمع الموسيقي</p>
        </div>
        <div class="goal-item">
          <p>التعريف بالمقامات والإيقاعات الشرقية</p>
        </div>
        <div class="goal-item">
          <p>بناء ثقة الطلاب عبر العروض الموسيقية</p>
        </div>
        <div class="goal-item">
          <p>تنمية مهارات العمل الجماعي والإصغاء</p>
        </div>
      </div>
    </div>

    <!-- Instruments -->
    <div class="section-block">
      <h2>الآلات الموسيقية</h2>
      <p>الآلات الشرقية والغربية التي يتعلمها طلابنا في البرنامج</p>
      <div class="instruments-grid">
        <div class="instrument-card">
          <span class="icon">🎵</span>
          <span class="name">العود</span>
        </div>
        <div class="instrument-card">
          <span class="icon">🎻</span>
          <span class="name">الكمان</span>
        </div>
        <div class="instrument-card">
          <span class="icon">🎹</span>
          <span class="name">البيانو</span>
        </div>
        <div class="instrument-card">
          <span class="icon">🎼</span>
          <span class="name">القانون</span>
        </div>
        <div class="instrument-card">
          <span class="icon">🥁</span>
          <span class="name">الإيقاع</span>
        </div>
        <div class="instrument-card">
          <span class="icon">🎺</span>
          <span class="name">آلات النفخ</span>
        </div>
      </div>
    </div>

    <!-- Director -->
    <div class="section-block">
      <h2>المؤسس والمدير</h2>
      <div class="director-card">
        <div class="director-avatar">ج.أ</div>
        <div class="director-info">
          <h3>جواد أبو يونس</h3>
          <span class="title">عازف عود ومربّي موسيقي</span>
          <p>
            يحمل شهادة البكالوريوس والماجستير في الموسيقى من أكاديمية الموسيقى والرقص في القدس، ويتمتع بخبرة تمتد لأكثر من خمسة عشر عاماً في التعليم الموسيقي. أسّس إنسامبل الأنغام انطلاقاً من إيمانه بأن كل طفل يستحق تعليماً موسيقياً عالي الجودة.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="contact-section">
      <h2>تواصل معنا</h2>
      <p>للاستفسارات والتسجيل في البرنامج</p>
      <div class="contact-methods">
        <a href="tel:+972545046911" class="contact-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          054-504-6911
        </a>
        <a href="mailto:contact.musicatea@gmail.com" class="contact-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          contact.musicatea@gmail.com
        </a>
      </div>
    </div>

  </div>

  <!-- FOOTER -->
  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

</body>
</html>
```

## history.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تاريخ الموسيقى العربية — موسيقتي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    /* ─ History page styles ───── */
    .history-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }
    .history-hero-tag {
      font-size: 0.72rem; letter-spacing: 0.14em; color: var(--gold);
      text-transform: uppercase; font-weight: 700; margin-bottom: 10px;
      display: block;
    }
    .history-hero h1 {
      font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900;
      margin-bottom: 12px; line-height: 1.2;
    }
    .history-hero p {
      color: var(--text-muted); font-size: 1rem;
      max-width: 540px; line-height: 1.7;
    }

    /* ─ History accordion ─┐ ──────*/
    .history-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 60px 5% 100px;
    }

    #history-list {
      display: flex; flex-direction: column; gap: 2px;
    }

    .history-item {
      border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
      transition: all 0.3s var(--ease);
    }
    .history-item:hover {
      border-color: rgba(200,164,90,0.2);
    }

    .history-toggle {
      width: 100%; display: flex; align-items: center;
      justify-content: space-between; gap: 16px;
      background: var(--bg2); padding: 20px 22px;
      border: none; cursor: pointer; text-align: start;
      color: var(--text); font-family: inherit;
      transition: background 0.3s;
    }
    .history-toggle:hover { background: var(--bg3); }
    .history-toggle[aria-expanded="true"] { background: var(--bg3); }

    .history-toggle-left { display: flex; align-items: center; gap: 16px; }
    .history-index {
      font-size: 1.4rem; font-weight: 900; color: var(--gold);
      opacity: 0.5; min-width: 32px; font-family: 'Cairo', sans-serif;
    }
    .history-titles { display: flex; flex-direction: column; gap: 2px; }
    .history-title { font-size: 1rem; font-weight: 700; }
    .history-subtitle { font-size: 0.8rem; color: var(--text-muted); }

    .history-toggle-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .history-period { font-size: 0.75rem; color: var(--text-dim); white-space: nowrap; }
    .history-chevron { color: var(--text-dim); transition: transform 0.3s ease; }

    .history-content {
      padding: 24px 22px; border-top: 1px solid var(--border);
      background: var(--bg);
    }
    .history-text {
      color: var(--text-muted); line-height: 1.85;
      font-size: 0.92rem; margin-bottom: 16px;
    }
    .history-highlights { display: flex; flex-wrap: wrap; gap: 8px; }
    .history-highlight {
      font-size: 0.78rem; padding: 5px 12px; border-radius: 100px;
      background: var(--gold-dim); border: 1px solid rgba(200,164,90,0.2);
      color: var(--gold-light);
    }

    @media (max-width: 600px) {
      .history-period { display: none; }
      .history-container { padding: 40px 4% 80px; }
    }
  </style>
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">موسيقتي</a>
        </div>
        <div class="nav-top-left">
          <a href="index-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html">الصفحة الرئيسية</a>
          <a href="library.html">مكتبة النوتات</a>
          <a href="maqamat.html">مقاماتي</a>
          <a href="rhythms.html">إيقاعاتي</a>
          <a href="history.html" class="active">تاريخ الموسيقى</a>
          <a href="ensemble.html">إنسامبل الأنغام</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="history-hero">
    <span class="history-hero-tag">تاريخ</span>
    <h1>الموسيقى العربية</h1>
    <p>رحلة عبر العصور — من جذورها حتى اليوم</p>
  </header>

  <div class="history-container">
    <div id="history-list"></div>
  </div>

  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/history.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    function renderHistory() {
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = '';
      history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));
    }
    renderHistory();
  </script>
</body>
</html>
```

## maqamat.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>المقامات العربية | Musicatea</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    .maqamat-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .maqamat-hero h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .maqamat-hero p {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 640px;
      line-height: 1.8;
      margin-bottom: 0;
    }

    .maqamat-content {
      max-width: 1300px;
      margin: 0 auto;
      padding: 40px 5% 100px;
    }

    .maqamat-search {
      padding: 0 0 40px;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px 20px;
      max-width: 520px;
      transition: all 0.3s var(--ease);
    }

    .search-bar:focus-within {
      border-color: rgba(200,164,90,0.5);
      box-shadow: 0 0 0 4px rgba(200,164,90,0.08);
    }

    .search-bar svg {
      flex-shrink: 0;
      color: var(--text-dim);
    }

    .search-bar input {
      background: none;
      border: none;
      outline: none;
      color: var(--text);
      font-family: inherit;
      font-size: 1rem;
      width: 100%;
    }

    .search-bar input::placeholder {
      color: var(--text-dim);
    }

    #maqamat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
    }

    .maqam-family-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      transition: all 0.4s var(--ease);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .maqam-family-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--family-color);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s var(--ease);
    }

    .maqam-family-card:hover::before {
      transform: scaleX(1);
      transform-origin: left;
    }

    .maqam-family-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.45);
      border-color: rgba(200,164,90,0.35);
    }

    .maqam-family-card h3 {
      font-size: 1.6rem;
      font-weight: 900;
      color: var(--gold-light);
      margin: 0 0 8px 0;
    }

    .maqam-family-card .latin {
      font-size: 0.9rem;
      color: var(--text-dim);
      font-style: italic;
      margin-bottom: 16px;
      display: block;
    }

    .maqam-family-card .desc {
      font-size: 0.94rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 18px;
    }

    .maqam-family-card .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 14px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      color: var(--text-dim);
    }

    .meta-item svg {
      width: 14px;
      height: 14px;
    }

    .tonic-options {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .tonic-badge {
      background: var(--surface);
      border: 1px solid var(--border2);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .family-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.25);
    }

    .sub-count {
      font-size: 0.82rem;
      color: var(--text-dim);
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border2);
    }

    @media (max-width: 768px) {
      #maqamat-grid {
        grid-template-columns: 1fr;
      }

      .maqamat-content {
        padding: 30px 4% 80px;
      }
    }
  </style>
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">موسيقتي</a>
        </div>
        <div class="nav-top-left">
          <a href="maqamat-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html">الصفحة الرئيسية</a>
          <a href="library.html">مكتبة النوتات</a>
          <a href="maqamat.html" class="active">مقاماتي</a>
          <a href="rhythms.html">إيقاعاتي</a>
          <a href="history.html">تاريخ الموسيقى</a>
          <a href="ensemble.html">إنسامبل الأنغام</a>
        </div>
      </div>
    </div>
  </nav>

  <div class="maqamat-hero">
    <h1>المقامات العربية</h1>
    <p>
      المقامات هي أساس الموسيقى العربية — كل مقام يتميز بسلم موسيقي خاص وطابع عاطفي مميز.
      تبنى المقامات من أجناس (tetrachords) وتتوزع على عائلات, وكل عائلة تشترك في جنس القرار.
      استكشف التسع عائلات الرئيسية وفروعها.
    </p>
  </div>

  <div class="maqamat-content">
    <div class="maqamat-search">
      <div class="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="maqam-search" type="text" placeholder="ابحث عن مقام أو عائلة...">
      </div>
    </div>

    <div id="maqamat-grid"></div>
  </div>

  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/maqamat.js"></script>
  <script src="assets/ui.js"></script>
  <script src="assets/maqamat.js"></script>

</body>
</html>
```

## rhythms.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إيقاعاتي — موسيقتي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .rhythms-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }
    .rhythms-hero-tag {
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 10px;
      display: block;
    }
    .rhythms-hero h1 {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 900;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .rhythms-hero p {
      color: var(--text-muted);
      font-size: 1rem;
      max-width: 540px;
      line-height: 1.7;
    }
    .rhythms-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 5% 100px;
    }
    .rhythms-search-wrap {
      padding: 20px 0 40px;
    }
    .rhythms-search-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 18px;
      max-width: 480px;
      transition: all 0.3s var(--ease);
    }
    .rhythms-search-bar:focus-within {
      border-color: rgba(200,164,90,0.45);
      box-shadow: 0 0 0 3px rgba(200,164,90,0.07);
    }
    .rhythms-search-bar svg {
      flex-shrink: 0;
      color: var(--text-dim);
    }
    .rhythms-search-bar input {
      background: none;
      border: none;
      outline: none;
      color: var(--text);
      font-family: inherit;
      font-size: 0.95rem;
      width: 100%;
    }
    .rhythms-search-bar input::placeholder {
      color: var(--text-dim);
    }
    #rhythms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }
    .rhythm-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      transition: all 0.4s var(--ease);
      cursor: pointer;
    }
    .rhythm-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.4);
      border-color: rgba(200,164,90,0.3);
    }
    .rhythm-card-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 12px;
    }
    .rhythm-card h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--gold-light);
      margin: 0;
    }
    .rhythm-card .time-sig {
      font-size: 0.9rem;
      color: var(--text-dim);
      font-weight: 600;
      background: var(--surface);
      padding: 4px 10px;
      border-radius: 6px;
      white-space: nowrap;
      direction: ltr;
    }
    .rhythm-card .latin {
      font-size: 0.85rem;
      color: var(--text-dim);
      font-style: italic;
      margin-bottom: 14px;
      display: block;
    }
    .rhythm-card .pattern {
      font-family: monospace;
      font-size: 0.95rem;
      color: var(--text);
      background: var(--surface);
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 14px;
      direction: ltr;
      text-align: center;
      border: 1px solid var(--border2);
    }
    .rhythm-card .desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 12px;
    }
    .rhythm-card .tempo {
      display: inline-block;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 100px;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.2);
      margin-top: 4px;
    }
    @media (max-width: 640px) {
      #rhythms-grid { grid-template-columns: 1fr; }
      .rhythms-content { padding: 30px 4% 80px; }
    }
  </style>
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">موسيقتي</a>
        </div>
        <div class="nav-top-left">
          <a href="rhythms-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html">الصفحة الرئيسية</a>
          <a href="library.html">مكتبة النوتات</a>
          <a href="maqamat.html">مقاماتي</a>
          <a href="rhythms.html" class="active">إيقاعاتي</a>
          <a href="history.html">تاريخ الموسيقى</a>
          <a href="ensemble.html">إنسامبل الأنغام</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="rhythms-hero">
    <span class="rhythms-hero-tag">موسوعة</span>
    <h1>الإيقاعات العربية</h1>
    <p>دليل شامل للإيقاعات الموسيقية العربية</p>
  </header>

  <div class="rhythms-content">
    <div class="rhythms-search-wrap">
      <div class="rhythms-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="rhythm-search" type="text" placeholder="ابحث عن إيقاع...">
      </div>
    </div>

    <div id="rhythms-grid"></div>
  </div>

  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/rhythms.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const rhythmsGrid = document.getElementById('rhythms-grid');
    const searchInput = document.getElementById('rhythm-search');

    function createRhythmCard(r) {
      const card = document.createElement('div');
      card.className = 'rhythm-card';
      card.innerHTML = `
        <div class="rhythm-card-header">
          <h3>${r.name}</h3>
          <span class="time-sig">${r.time_signature}</span>
        </div>
        <span class="latin">${r.latin}</span>
        <div class="pattern">${r.pattern}</div>
        <p class="desc">${r.description}</p>
        <span class="tempo">السرعة: ${r.tempo}</span>
      `;
      return card;
    }

    function renderRhythms(filter) {
      rhythmsGrid.innerHTML = '';
      const q = normalize(filter || '');
      const filtered = rhythms.filter(r =>
        !q ||
        normalize(r.name).includes(q) ||
        normalize(r.latin).includes(q) ||
        normalize(r.description).includes(q)
      );

      if (!filtered.length) {
        rhythmsGrid.appendChild(createEmptyState('لا توجد إيقاعات مطابقة'));
        return;
      }

      filtered.forEach(r => rhythmsGrid.appendChild(createRhythmCard(r)));
    }

    searchInput.addEventListener('input', e => renderRhythms(e.target.value));
    renderRhythms();
  </script>

</body>
</html>
```

## maqam.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مقاماتي Ҵ موسيقتي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .maqamat-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }
    .maqamat-hero-tag {
      font-size: 0.72rem; letter-spacing: 0.14em; color: var(--gold);
      text-transform: uppercase; font-weight: 700; margin-bottom: 10px;
      display: block;
    }
    .maqamat-hero h1 {
      font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900;
      margin-bottom: 12px; line-height: 1.2;
    }
    .maqamat-hero p {
      color: var(--text-muted); font-size: 1rem;
      max-width: 540px; line-height: 1.7;
    }

    .maqamat-search-wrap {
      padding: 28px 5% 0;
    }
    .maqamat-search-bar {
      display: flex; align-items: center; gap: 10px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 12px 18px; max-width: 480px;
      transition: all 0.3s var(--ease);
    }
    .maqamat-search-bar:focus-within {
      border-color: rgba(200,164,90,0.45);
      box-shadow: 0 0 0 3px rgba(200,164,90,0.07);
    }
    .maqamat-search-bar svg { flex-shrink: 0; color: var(--text-dim); }
    .maqamat-search-bar input {
      background: none; border: none; outline: none;
      color: var(--text); font-family: inherit; font-size: 0.95rem;
      width: 100%;
    }
    .maqamat-search-bar input::placeholder { color: var(--text-dim); }

    .maqamat-section {
      padding: 56px 5% 80px;
    }
    .maqamat-section-header {
      display: flex; align-items: baseline; gap: 14px;
      margin-bottom: 28px; padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }
    .maqamat-section-header h2 { font-size: 1.3rem; font-weight: 800; }
    .maqamat-section-header span { font-size: 0.8rem; color: var(--text-dim); }

    #maqamat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 18px;
      padding-bottom: 8px;
    }
    .maqam-card {
      background: var(--bg2); border: 1px solid var(--border);
      border-radius: 14px; overflow: hidden; display: block;
      text-decoration: none; color: inherit; position: relative;
      transition: all 0.4s var(--ease);
    }
    .maqam-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      border-color: rgba(200,164,90,0.25);
    }
    .maqam-card-accent { height: 4px; border-bottom: 1px solid transparent; }
    .maqam-card-body { padding: 22px; }
    .maqam-name-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
    .maqam-name { font-size: 1.25rem; font-weight: 800; }
    .maqam-latin { font-size: 0.8rem; color: var(--text-dim); font-style: italic; }
    .maqam-desc {
      font-size: 0.86rem; color: var(--text-muted);
      line-height: 1.6; margin-bottom: 12px;
    }
    .maqam-feelings { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .feeling-tag {
      font-size: 0.72rem; padding: 3px 10px; border-radius: 100px;
      background: var(--surface2); color: var(--text-dim);
      border: 1px solid var(--border);
    }
    .maqam-footer { display: flex; justify-content: space-between; align-items: center; }
    .maqam-examples-count { font-size: 0.78rem; color: var(--text-dim); }
    .maqam-arrow {
      color: var(--gold); font-size: 0.9rem;
      transition: transform 0.3s;
    }
    .maqam-card:hover .maqam-arrow { transform: translateX(-4px); }

    @media (max-width: 600px) {
      #maqamat-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">معيقتي</a>
        </div>
        <div class="nav-top-left">
          <a href="index-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html">الصفحة الرئيسية</a>
          <a href="library.html">مكتبة النوتااة</a>
          <a href="ensemble.html">مسامبل الأنغام</a>
          <a href="history.html">تاريخ المعتية</a>
          <a href="maqamat.html" class="active">مؘلماماتي</a>
          <a href="rhythms.html">إؙ�قاعاتي</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="maqamat-hero">
    <span class="maqamat-hero-tag">م؈سوعا؊</span>
    <h1>المقامات الم؈سيقية</h1>
    <p>دالي شامل لمقالات الموسيقة العربية — درجاتها وطاباعها كمشاقق.</p>
  </header>

  <div class="maqamat-search-wrap">
    <div class="maqamat-search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input id="maqam-search" type="text" placeholder="ابحث عا مقام ، طابع ، اسم...">
    </div>
  </div>

  <section class="maqamat-section">
    <div class="maqamat-section-header">
      <h2>المؘلمامات الم؈سيقية</h2>
      <span id="maqam-count"></span>
    </div>
    <div id="maqamat-grid"></div>
  </section>

  <footer class="site-footer">
    <span class="footer-logo">موسيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/maqamat.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const maqamSearchInput = document.getElementById('maqam-search');
    const maqamatGrid = document.getElementById('maqamat-grid');

    function renderMaqamat(filter) {
      maqamatGrid.innerHTML = '';
      const q = normalize(filter || '');
      const filtered = maqamat.filter(m =>
        !q ||
        normalize(m.name).includes(q) ||
        normalize(m.latin).includes(q) ||
        m.feeling.some(f => normalize(f).includes(q))
      );

      if (!filtered.length) {
        maqamatGrid.appendChild(createEmptyState('لا أوجد مقالات مطابقة'));
        return;
      }

      filtered.forEach(m => maqamatGrid.appendChild(createMaqamCard(m)));
    }

    if (maqamSearchInput) {
      maqamSearchInput.addEventListener('input', e => renderMaqamat(e.target.value));
    }

    renderMaqamat();
    document.getElementById('maqam-count').textContent = maqamat.length + ' مقالات';
  </script>
</body>
</html>
```

## maqam-family.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>عائلة المقام | موسيقتي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css" />
  <style>
    .family-hero {
      padding: 56px 5% 38px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
      font-size: 0.86rem;
      color: var(--text-dim);
    }

    .breadcrumbs a {
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.25s ease;
    }

    .breadcrumbs a:hover {
      color: var(--gold);
    }

    .family-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .family-title-block h1 {
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 900;
      margin-bottom: 10px;
      line-height: 1.2;
    }

    .family-title-block p {
      max-width: 760px;
      color: var(--text-muted);
      line-height: 1.9;
      font-size: 1rem;
      margin: 0;
    }

    .family-badge-large {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 999px;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.22);
      font-size: 0.86rem;
      font-weight: 800;
      white-space: nowrap;
    }

    .family-content {
      padding: 42px 5% 90px;
      max-width: 1300px;
      margin: 0 auto;
    }

    .family-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 34px;
    }

    .summary-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
    }

    .summary-label {
      font-size: 0.8rem;
      color: var(--text-dim);
      margin-bottom: 8px;
    }

    .summary-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
      line-height: 1.7;
    }

    .family-section-header {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
    }

    .family-section-header h2 {
      font-size: 1.28rem;
      font-weight: 800;
      margin: 0;
    }

    .family-section-header span {
      font-size: 0.82rem;
      color: var(--text-dim);
    }

    #family-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 20px;
    }

    .family-maqam-card {
      display: block;
      text-decoration: none;
      color: inherit;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      transition: all 0.35s var(--ease);
    }

    .family-maqam-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      border-color: rgba(200,164,90,0.28);
    }

    .family-maqam-card.main {
      border-color: rgba(200,164,90,0.3);
      box-shadow: 0 0 0 1px rgba(200,164,90,0.08) inset;
    }

    .family-maqam-accent {
      height: 4px;
      background: var(--maqam-color, var(--gold));
    }

    .family-maqam-body {
      padding: 22px;
    }

    .main-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.2);
      color: var(--gold);
      font-size: 0.76rem;
      font-weight: 800;
    }

    .family-maqam-header {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .family-maqam-header h3 {
      font-size: 1.28rem;
      font-weight: 900;
      margin: 0;
      color: var(--text);
    }

    .family-maqam-latin {
      font-size: 0.84rem;
      color: var(--text-dim);
      font-style: italic;
    }

    .family-maqam-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.8;
      margin-bottom: 14px;
    }

    .family-maqam-meta {
      display: grid;
      gap: 10px;
      margin-bottom: 14px;
    }

    .family-meta-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.88rem;
      color: var(--text-dim);
      line-height: 1.7;
    }

    .family-meta-label {
      min-width: 78px;
      color: var(--text);
      font-weight: 700;
    }

    .tonic-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tonic-pill {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border2);
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 700;
    }

    .family-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding-top: 14px;
      border-top: 1px solid var(--border2);
      font-size: 0.82rem;
      color: var(--text-dim);
    }

    .family-card-arrow {
      color: var(--gold);
      font-size: 1rem;
      transition: transform 0.25s ease;
    }

    .family-maqam-card:hover .family-card-arrow {
      transform: translateX(-4px);
    }

    .family-empty {
      background: var(--bg2);
      border: 1px dashed var(--border2);
      border-radius: 16px;
      padding: 28px;
      text-align: center;
      color: var(--text-dim);
    }

    @media (max-width: 700px) {
      .family-title-row {
        flex-direction: column;
        align-items: flex-start;
      }

      #family-grid {
        grid-template-columns: 1fr;
      }

      .family-content {
        padding: 32px 4% 80px;
      }
    }
  </style>
</head>
<body>

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index.html" class="nav-logo">معيقتي</a>
        </div>
        <div class="nav-top-left">
          <a href="index-en.html" class="lang-toggle" aria-label="Switch to English">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>EN</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index.html">الصفحة الرئيسية</a>
          <a href="library.html">مكتبة النوتااة</a>
          <a href="ensemble.html">مسامبل الأنغام</a>
          <a href="history.html">تاريخ المعتية</a>
          <a href="maqamat.html" class="active">مؘلماماتي</a>
          <a href="rhythms.html">إؙ�قاعاتي</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="family-hero">
    <div class="breadcrumbs">
      <a href="index.html">الرئيسية</a>
      <span>›</span>
      <a href="maqamat.html">المقامات�/a>
      <span>›</span>
      <span id="breadcrumb-family">عائلة المقام</span>
    </div>

    <div class="family-title-row">
      <div class="family-title-block">
        <h1 id="family-title">عائلة المقام</h1>
        <p id="family-description">جاري ت٭ميل معلومات العائلة...</p>
      </div>
      <div class="family-badge-large" id="family-count-badge">0 مقاماة</div>
    </div>
  </header>

  <main class="family-content">
    <section class="family-summary" id="family-summary"></section>

    <section>
      <div class="family-section-header">
        <h2>مقالات العائلة</h2>
        <span id="family-section-count"></span>
      </div>
      <div id="family-grid"></div>
    </section>
  </main>

  <footer class="site-footer">
    <span class="footer-logo">معيقتي</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/maqamat.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const params = new URLSearchParams(window.location.search);
    const familyId = params.get('family');

    const familyTitle = document.getElementById('family-title');
    const familyDescription = document.getElementById('family-description');
    const familyCountBadge = document.getElementById('family-count-badge');
    const familySectionCount = document.getElementById('family-section-count');
    const breadcrumbFamily = document.getElementById('breadcrumb-family');
    const familyGrid = document.getElementById('family-grid');
    const familySummary = document.getElementById('family-summary');

    const familyDescriptions = {
      rast: "عائلة راست من أهم العائلات في الموسيق؉ العربية, وتميزاز بالاستقرار والرصانة وثراء الت֭ويلات الل٭نية. تشتر؃ مقالاتها في جنس القرار لنهاي الراست, ثم ت٪نوع في الأجناس العليا.",
      bayat: "عائلة بيات من أكثر العائلات حضورا في الوغناء العار٨ي الشعبي كل والديني، وتمتاز بالدفء والحمية وقابلية التعبير الصوتي العالي.(���Z]�[���.v)�)�a6*H6a�a�)�b6a�+�6*�+6av.H6*6b�a�6)�a6+v,�a�6b6)�a6,vb6av+�,�b�*K6b6*�,�*�k�+�,�6`�*�b�,v)�b�6`vb�6)�a6`�"6)�a6*6)�a6.�a�)�)�b�*H6)�a6+v+�b�*�*H6b6)�a6`�a6)�,�b�`�b�#6av.H6)vav`�)�a�b�)�*�6.�a�b�*H6a6a6*�a6b6b�a�6b6)�a6*�-v.vb�+ˈ��Z�[N��.v)�)�a6*H6.v+6aH6.v)�)�a6*H6av-6f,v`�*H6b6)�-�+v*H6)�a6*6a�)�(K6`�,vb�b�*H6ava�6)�a6,�a6aH6)�a6`�*6b�,H6)�a6.�,v*6b�6b6*�a�)�,�*6)�a6(�.vav)�a:)�6,v`vb�)�6b6)�a6)�+v*�`v)�a6b�*H6b6)�a6(�b6,v`�,�*�,v)�a6b�*K����\���.v)�)�a6*H0����*�)�,v+�6,6)�*�6-�)�*6.H6*6,�b�-�av*6b6av*6)�-6,H6b6+�)�a6c6aH6a�6(�,v*6)�.H6)�a6b�.va�a6#6b6*�,�*�+�*�aH6*6`�*�,v*H6`vb�6)�a6(�)�+v)�a�6)�a6-6.v*6b�*H6b6)�a6b6+6+�)�a�b�*K���Z�^���.v)�)�a6*H6+v+6)�,�6ava�6(�`�*�,H6)�a6.v)�)�a6)�*�6*�avb�,�)�b�6+�,v)�avb�)�b6b�)�6b6,vb6+v)�a�b�*K6b6*�.v,v+�6*6`�`vl�*�a�)�6)�a6a6kva�b�*H6)�a6av!vb�,�*H6b6av)�6*�ava�+va�aH6a�6-6+va�*H6*�.v*6b�,vb�*H6`�b6b�*K���
�Z�Z��.v)�)�a6*H6,�b�`�)�a�6,6)�*�6-�)�*6.H6,�a6b6`�b�)�6b6+�)�+�a6b�#6b6*�a�*�a6+v)� �`�a�)�-6)�*6b6)�a6*�a6)�b6*H6b6)�a6+6b6)�a6-vb6`vb�6b6*�.v*�av+�6.va6bH6(�,v*6)�.H6)�a6*�b6a�6*6-6`�a6(�,�)�,�b����
�X�N��.v)�)�a6*H6-v*6)�6ava�6(�`�*�,H6)�a6.v)�)�a6)�*�6)�a6.v,v*6b�*H6*�.v*6b�,v)�6.va�6)�a6+v,�a�6b6)�a6(�a6aH6b6)�a6(�a�b�a�6b6*�.v*�*6.H6+v,�)�,�b�*H6.v)�a6b�*H6`vb�6)�a6(�+�)�(H6b6)�a6-vb�)�.�*K����]�W�]\���.v)�)�a6*H6a�b6bH6(�*�,H6.v)�)�a6*H6av,v`�*6*H6b6a6b6a�*K6*�+6av.H6*6b�a�6(�a6b6)�a�6a6kva�b�*H6+�)�-v*H6b6*�av*�a�6)�a6av)6a6`va�6av+6)�a6)�6b6)�,�.v)�6a6a6+�,6+�,v)�av)�*�6`�a6)�+v`v)�*K���N��[��[ۈܙX]T�[[X\�P�\�
X�[

�[
YJH
�ۜ��\�H��[Y[�
�ܙX]Q[[Y[�
	�]��N�\�
��\�Ә[YHH	��[[X\�KX�\�	��\�
�[��\�SH�]��\��H��[[X\�K[X�[��
�X�[O
�]���]��\��H��[[X\�K]�[
YH��
ݘ[
Y_O
�]���
�]
\���\�B���[��[ۈܙX]Q�[Z[
SX\X[P�\�
X\X[JH
�ۜ��\�H��[Y[�
�ܙX]Q[[Y[�
	�I�N�\�
��\�Ә[YHH	٘[Z[
K[X\X[KX�\�	�
�
X\X[K�\��XZ[��	�XZ[���	��N�\�
�
�Y�HX\X[K�
[�YI
�X\X[K�YX�\�
��
[K��]
��\�
J	�K[X\X[KX��܉�X\X[K�[�����܈	ݘ\�
KY��
I�N��ۜ�
ۚX�
[H
X\X[K�ۚX���
[ۜ��JB�
�X\

O�
�[��\��H�ۚX�\[��
�O
��[��
B�
���[�	��N��ۜ�
\
\��[��HX\X[K��[��˝\
\�˛X\
�O�
ڋ��[Y_H6.v)�a6bH
ڋ����X
K���[�	�
�	�H	��%	��ۜ���\��[��HX\X[K��[��˛��\��
�X\X[K��[�˛��\���[Y_H6.va6bH
�X\X[K��[�˛��\�����X�	��%	���\�
�[��\�SH�]��\��H��[Z[
K[X\X[KXX��[���
�]���]��\��H��[Z[
K[X\X[KX��
H���
�X\X[K�\��XZ[��]��\��H�XZ[�]Yȏ�*�a6av`�)�aH6)�a6,v)�b�,�b���F�c��rwТ�F�b6�73�&f֖ǒ���ֆVFW"#�ƃ3�G������W����3��7�6�73�&f֖ǒ�����F��#�G�����F�����7����F�cࠢ�6�73�&f֖ǒ����FW62#�G����FW67&�F�����rw���ࠢ�F�b6�73�&f֖ǒ�����WF#��F�b6�73�&f֖ǒ��WF�&�r#��7�6�73�&f֖ǒ��WF��&V�#�}�M�-�
�}���7���F�b6�73�'F��2�Ɨ7B#�G�F��4�F����s�7�6�73�'F��2����#�(	D��7��r���F�c���F�c��F�b6�73�&f֖ǒ��WF�&�r#��7�6�73�&f֖ǒ��WF��&V�#튭���m�2
�}�M�=�
�M��������(������������������������ݕ�)����������(������������𽑥��(�������������؁�����􉙅���䵵�ф�ɽ܈�(�������������������������􉙅���䵵�ф��������b�b�fb̃b�fb�ff#f(</span>
              <span>${upperJins}</span>
            </div>
          </div>

          <div class="family-card-footer">
            <span>${(maqam.examples || []).length} أمثلة</span>
            <span class="family-card-arrow">←</span>
          </div>
        </div>
      `;

      return card;
    }

    function renderFamilyPage() {
      if (!familyId) {
        familyTitle.textContent = 'عائلة ن+b� مغلٌ';
        breadcrumbFamily.textContent = 'عائلة غير مغدلة';
        familyDescription.textContent = 'لم يتم تحدام фلعائلة المطلوبة في الرابط.';
        familyGrid.innerHTML = '<div class="family-empty">آ�fb�f+ff$�b�b�fb�fb�b�b��b�b�fb�b�b�p�b�f+băffb�ff���—�b�b�b��b�fff
b�fb�b��f#b�b�b�băb�b�b�b�b�b��𽑥����(��������������Mյ���久�����
������ɕ�ѕMյ����
�ɐ��b�fb�b�fb�����b�fb�b�b��b�b�fb�jn0����(��������ɕ��ɸ�(�������((����������Ё������5�Ņ��Ѐ􁝕�5�Ņ���	�����䡙�����%���(����������Ё����5�Ņ��􁙅����5�Ņ��й��������������}���������������5�Ņ���l�t�((�����������������5�Ņ���̹����Ѡ���������5�Ņ����(��������������Q�ѱ��ѕ��
��ѕ�Ѐ�b�fb�b�b�fb��b�f+băff#b�b�b���(���������ɕ����յ������ѕ��
��ѕ�Ѐ�b�f+băff#b�b�b���(���������������͍ɥ�ѥ���ѕ��
��ѕ�Ѐ�ff�f+b�f�b�fb�J�f#băb�b�ff'b�b�f(�fb�ff#fb�b��ffb��b�fb�b�b�fb����(��������������
ɥ�������!Q50���؁�����􉙅���䵕�����fb��b�f#b�b��b�f+b�fb�b��fb�b�b�b��ffb�f
�b�fb�b�b�fb��b�b�ff+b��𽑥����(��������������Mյ���久�����
������ɕ�ѕMյ����
�ɐ��b�fb�b�fb�����fb��b�f#b�b��b�f+b�fb�b�����(��������ɕ��ɸ�(�������((������������Q�ѱ��ѕ��
��ѕ�Ѐ�b�b�b�fb��������5�Ņ���������(�������ɕ����յ������ѕ��
��ѕ�Ѐ�b�b�b�fb��������5�Ņ���������(�������������͍ɥ�ѥ���ѕ��
��ѕ�Ѐ􁙅�����͍ɥ�ѥ���m������%�t��������5�Ņ����͍ɥ�ѥ���������(������������
�չ�	�����ѕ��
��ѕ�Ѐ􁀑홅����5�Ņ���̹����ѡ�fb
b�fb�b���(������������M��ѥ��
�չйѕ��
��ѕ�Ѐ􁀑홅����5�Ņ���̹����ѡ�b�fb��fb�f
�b�fb�b�b�fb���((����������Ёѽх�ᅵ���̀􁙅����5�Ņ���̹ɕ�Ս����մ���������մ��������ᅵ���́���mt������Ѡ������(����������Ё��ݕ�)���9����􁵅��5�Ņ����������ݕ�������������P��(����������Ё�������Ѐ􁵅��5�Ņ���������Ё�����P��((������������Mյ���久�����
������ɕ�ѕMյ����
�ɐ��b�fff
b�f�b�fb�f�������5�Ņ���������(������������Mյ���久�����
������ɕ�ѕMյ����
�ɐ��b�fb̃b�ff
b�b�băb�ffb�b�fF�
�����ݕ�)���9������(������������Mյ���久�����
������ɕ�ѕMյ����
�ɐ��b�b�b�b��b�ff#ff����������Ф��(������������Mյ���久�����
������ɕ�ѕMյ����
�ɐ��b�fb�ff(�b�fb�fb�fb�������ѽх�ᅵ�����b�fffb����(����������Ё�ɑ�ɕ���l(�����������������5�Ņ��й���ѕȡ���������}������(�����������������5�Ņ��й���ѕȡ����������}�����(������t�((�������ɑ�ɕ���������������(��������������
ɥ��������
������ɕ�ѕ�����5�Ņ�
�ɐ�����(���������(�����((����ɕ���������A������(���͍ɥ���(𽉽���(�ѵ��(
```

## index-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Musicatea | The Arabic Music Encyclopedia</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .hero {
      padding: 100px 5% 80px;
      text-align: center;
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 50%);
      border-bottom: 1px solid var(--border);
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(200,164,90,0.05) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero-tag {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 16px;
      display: inline-block;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 900;
      margin-bottom: 12px;
      background: linear-gradient(135deg, var(--text), var(--gold-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero .subtitle {
      font-size: clamp(1rem, 2vw, 1.3rem);
      color: var(--text-muted);
      max-width: 760px;
      margin: 0 auto 40px;
      line-height: 1.8;
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .cta-btn {
      padding: 14px 32px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      transition: all 0.3s var(--ease);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .cta-primary {
      background: var(--gold);
      color: var(--bg);
      border: 2px solid var(--gold);
    }

    .cta-primary:hover {
      background: var(--gold-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(200,164,90,0.3);
    }

    .cta-secondary {
      background: transparent;
      color: var(--text);
      border: 2px solid var(--border2);
    }

    .cta-secondary:hover {
      border-color: var(--gold);
      color: var(--gold-light);
      transform: translateY(-2px);
    }

    .pillars {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      padding: 80px 5%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .pillar {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 40px 32px;
      text-align: center;
      transition: all 0.4s var(--ease);
      animation: fadeInUp 0.6s var(--ease) backwards;
    }

    .pillar:nth-child(1) { animation-delay: 0.1s; }
    .pillar:nth-child(2) { animation-delay: 0.2s; }
    .pillar:nth-child(3) { animation-delay: 0.3s; }
    .pillar:nth-child(4) { animation-delay: 0.4s; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pillar:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      border-color: rgba(200,164,90,0.4);
    }

    .pillar-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      display: block;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .pillar h3 {
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 12px;
      color: var(--gold-light);
    }

    .pillar p {
      color: var(--text-muted);
      line-height: 1.7;
      font-size: 0.95rem;
    }

    .about {
      padding: 60px 5%;
      max-width: 820px;
      margin: 0 auto;
      text-align: center;
    }

    .about h2 {
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 20px;
      color: var(--text);
    }

    .about p {
      color: var(--text-muted);
      line-height: 1.9;
      font-size: 1.05rem;
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 640px) {
      .hero {
        padding: 84px 4% 64px;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>

        <div class="nav-top-left">
          <a href="index.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html" class="active">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <span class="hero-tag">Arabic Music Encyclopedia</span>
      <h1>Musicatea</h1>
      <p class="subtitle">
        A comprehensive platform for Arabic music — a growing sheet music library, guides to maqamat and rhythms, and curated content on music history and its leading figures.
      </p>
      <div class="hero-cta">
        <a href="library-en.html" class="cta-btn cta-primary">
          Explore Sheets
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="maqamat-en.html" class="cta-btn cta-secondary">
          Learn Maqamat
        </a>
      </div>
    </div>
  </section>

  <section class="pillars">
    <div class="pillar">
      <span class="pillar-icon">♩</span>
      <h3>Arabic & Western Sheets</h3>
      <p>A growing collection of sheet music organized by maqam, scale, singer, composer, and difficulty level.</p>
    </div>

    <div class="pillar">
      <span class="pillar-icon">𝄞</span>
      <h3>Arabic Maqamat</h3>
      <p>A clear guide to each maqam: its scale, emotional character, and notable musical examples.</p>
    </div>

    <div class="pillar">
      <span class="pillar-icon">📜</span>
      <h3>Music History</h3>
      <p>From the Abbasid and Andalusian eras to the modern Arab musical renaissance.</p>
    </div>

    <div class="pillar">
      <span class="pillar-icon">⬇</span>
      <h3>Free Downloads</h3>
      <p>All available sheet files can be downloaded directly in PDF format.</p>
    </div>
  </section>

  <section class="about">
    <h2>About the Project</h2>
    <p>
      Musicatea is a project dedicated to documenting and simplifying Arabic music — its heritage, theory, musicians, and educational value — and making it accessible to students, teachers, researchers, and listeners alike. The content is continuously expanded and updated.
    </p>
  </section>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

</body>
</html>
```

## library-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sheet Music Library — Musicatea</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .page-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .page-hero h1 {
      font-size: clamp(1.9rem, 4vw, 3rem);
      font-weight: 900;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .page-hero p {
      color: var(--text-muted);
      font-size: 1rem;
      max-width: 720px;
      line-height: 1.8;
      margin: 0;
    }

    .filters {
      max-width: 1280px;
      margin: 0 auto;
      padding: 30px 5% 22px;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 14px;
      align-items: stretch;
    }

    .filters select,
    .filters input {
      width: 100%;
      min-width: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 14px;
      color: var(--text);
      font-family: inherit;
      font-size: 0.94rem;
      outline: none;
      transition: all 0.25s var(--ease);
    }

    .filters select:focus,
    .filters input:focus {
      border-color: rgba(200,164,90,0.45);
      box-shadow: 0 0 0 3px rgba(200,164,90,0.07);
    }

    #list.grid {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 5% 100px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 22px;
    }

    .card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: all 0.35s var(--ease);
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 42px rgba(0,0,0,0.38);
      border-color: rgba(200,164,90,0.28);
    }

    .card-header {
      display: grid;
      gap: 8px;
    }

    .card-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .card-title {
      margin: 0;
      font-size: 1.12rem;
      font-weight: 800;
      line-height: 1.4;
      color: var(--text);
    }

    .card-composer,
    .card-performer {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 800;
      border: 1px solid transparent;
    }

    .badge-song {
      background: var(--gold-dim);
      color: var(--gold);
      border-color: rgba(200,164,90,0.2);
    }

    .badge-inst {
      background: var(--surface);
      color: var(--text-dim);
      border-color: var(--border2);
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .card-maqam,
    .card-tonic {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border2);
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 700;
      text-decoration: none;
    }

    .maqam-link {
      text-decoration: none;
      color: var(--gold-light);
      font-weight: 700;
    }

    .download-btn {
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      background: var(--gold);
      color: var(--bg);
      border: 2px solid var(--gold);
      border-radius: 12px;
      padding: 12px 16px;
      font-weight: 800;
      transition: all 0.25s var(--ease);
    }

    .download-btn:hover {
      background: var(--gold-light);
      transform: translateY(-1px);
      box-shadow: 0 8px 22px rgba(200,164,90,0.25);
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 1100px) {
      .filters {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 700px) {
      .filters {
        grid-template-columns: 1fr;
        padding: 24px 4% 18px;
      }

      #list.grid {
        padding: 0 4% 80px;
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>
        <div class="nav-top-left">
          <a href="library.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html" class="active">Sheet Library</a>
          <a href="maqamat-en.html">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="page-hero">
    <h1>Sheet Music Library</h1>
    <p>Arabic and Western sheet music with searchable filters and direct PDF download.</p>
  </header>

  <div class="filters">
    <select id="system">
      <option value="arabic">Eastern Notation</option>
      <option value="western">Western Notation</option>
    </select>

    <select id="type">
      <option value="">All Types</option>
      <option value="song">Song</option>
      <option value="instrumental">Instrumental</option>
    </select>

    <select id="maqam">
      <option value="">All Maqamat</option>
    </select>

    <select id="scale" style="display:none;">
      <option value="">All Scales</option>
    </select>

    <select id="tonic">
      <option value="">All Tonics</option>
    </select>

    <input id="search" type="text" placeholder="Search by title, composer, or performer...">
  </div>

  <div id="list" class="grid"></div>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/sheets.js"></script>
  <script src="data/maqamat-en.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    function createSheetCard(s) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.system = s.system;
      card.dataset.maqam = s.maqam || '';

      const maqamDisplay = s.system === 'arabic' && s.maqam
        ? `<a href="maqam-en.html?id=${slugify(s.maqam)}" class="maqam-link" onclick="event.stopPropagation()">${s.maqam}</a>`
        : (s.scale || '');

      const performerLine = s.performer
        ? `<p class="card-performer">${s.performer}</p>`
        : '';

      const badge = s.type === 'song'
        ? `<span class="badge badge-song">Song</span>`
        : `<span class="badge badge-inst">Instrumental</span>`;

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title-row">
            <h3 class="card-title">${s.title}</h3>
            ${badge}
          </div>
          <p class="card-composer">${s.composer || ''}</p>
          ${performerLine}
        </div>
        <div class="card-meta">
          ${maqamDisplay ? `<span class="card-maqam">${maqamDisplay}</span>` : ''}
          ${s.tonic ? `<span class="card-tonic">${s.tonic}</span>` : ''}
        </div>
        <a href="${s.pdf}" target="_blank" class="download-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Sheet
        </a>
      `;

      return card;
    }
  </script>
  <script src="assets/app-en.js"></script>
</body>
</html>
```

## ensemble-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Melodies Ensemble — Musicatea</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .ensemble-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
      text-align: center;
    }

    .ensemble-badge {
      display: inline-block;
      font-size: 0.9rem;
      letter-spacing: 0.14em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 16px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.2);
      padding: 6px 16px;
      border-radius: 100px;
    }

    .ensemble-hero h1 {
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 900;
      margin-bottom: 16px;
      background: linear-gradient(135deg, var(--text), var(--text-muted));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ensemble-hero .subtitle {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 760px;
      margin: 0 auto 28px;
      line-height: 1.8;
    }

    .ensemble-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px 5% 80px;
    }

    .section-block {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 36px;
      margin-bottom: 32px;
      transition: all 0.4s var(--ease);
    }

    .section-block:hover {
      border-color: rgba(200,164,90,0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }

    .section-block h2 {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 18px;
      color: var(--gold-light);
    }

    .section-block p {
      color: var(--text-muted);
      line-height: 1.95;
      font-size: 1rem;
      margin-bottom: 14px;
    }

    .section-block p:last-child {
      margin-bottom: 0;
    }

    .goals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
      margin-top: 24px;
    }

    .goal-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      border-left: 3px solid var(--gold-dim);
      transition: all 0.3s var(--ease);
    }

    .goal-item:hover {
      background: var(--surface2);
      border-left-color: var(--gold);
      transform: translateX(4px);
    }

    .goal-item::before {
      content: '✓';
      display: inline-block;
      width: 24px;
      height: 24px;
      background: var(--gold-dim);
      color: var(--gold);
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      font-weight: 900;
      margin-right: 10px;
      font-size: 0.85rem;
    }

    .goal-item p {
      font-size: 0.92rem;
      margin: 0;
      color: var(--text);
    }

    .instruments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
      margin-top: 24px;
    }

    .instrument-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 24px 18px;
      text-align: center;
      transition: all 0.3s var(--ease);
    }

    .instrument-card:hover {
      background: var(--gold-dim);
      border-color: rgba(200,164,90,0.3);
      transform: translateY(-4px);
    }

    .instrument-card .icon {
      font-size: 2.2rem;
      margin-bottom: 10px;
      display: block;
    }

    .instrument-card .name {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text);
    }

    .contact-section {
      background: linear-gradient(135deg, var(--bg3), var(--bg2));
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 40px;
      text-align: center;
    }

    .contact-section h2 {
      font-size: 1.6rem;
      font-weight: 900;
      margin-bottom: 12px;
      color: var(--text);
    }

    .contact-section p {
      color: var(--text-muted);
      margin-bottom: 28px;
      font-size: 1rem;
    }

    .contact-methods {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .contact-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.25);
      color: var(--gold-light);
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.3s var(--ease);
    }

    .contact-btn:hover {
      background: rgba(200,164,90,0.2);
      border-color: rgba(200,164,90,0.45);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(200,164,90,0.2);
    }

    .director-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 32px;
      margin-top: 24px;
      display: flex;
      align-items: start;
      gap: 24px;
    }

    .director-avatar {
      width: 80px;
      height: 80px;
      background: var(--gold-dim);
      border: 2px solid rgba(200,164,90,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      color: var(--gold-light);
      font-weight: 900;
      flex-shrink: 0;
    }

    .director-info h3 {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 6px;
      color: var(--text);
    }

    .director-info .title {
      font-size: 0.9rem;
      color: var(--gold);
      margin-bottom: 14px;
      display: block;
    }

    .director-info p {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.8;
      margin: 0;
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 640px) {
      .ensemble-content {
        padding: 40px 4% 60px;
      }

      .section-block {
        padding: 28px 20px;
      }

      .goals-grid,
      .instruments-grid {
        grid-template-columns: 1fr;
      }

      .contact-methods {
        flex-direction: column;
        align-items: stretch;
      }

      .director-card {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>
        <div class="nav-top-left">
          <a href="ensemble.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html" class="active">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="ensemble-hero">
    <span class="ensemble-badge">Program No. 53576</span>
    <h1>Melodies Ensemble</h1>
    <p class="subtitle">An accredited music education program for spreading Arabic musical culture among the next generation.</p>
  </header>

  <div class="ensemble-content">

    <div class="section-block">
      <h2>About the Program</h2>
      <p>
        Melodies Ensemble is an accredited and licensed music education program aimed at spreading Arabic musical culture among the next generation through a modern educational methodology that combines authenticity and creativity.
      </p>
      <p>
        The program operates within a comprehensive educational framework that believes music is a right for every child and student, and that it is an effective tool for building character and developing emotional and social intelligence.
      </p>
    </div>

    <div class="section-block">
      <h2>Program Goals</h2>
      <div class="goals-grid">
        <div class="goal-item"><p>Spreading Arabic musical culture and strengthening musical identity.</p></div>
        <div class="goal-item"><p>Teaching instrument playing through modern educational methods.</p></div>
        <div class="goal-item"><p>Developing sheet music reading and ear-training skills.</p></div>
        <div class="goal-item"><p>Introducing students to maqamat and Eastern rhythms.</p></div>
        <div class="goal-item"><p>Building students’ confidence through musical performance.</p></div>
        <div class="goal-item"><p>Developing teamwork, listening, and ensemble skills.</p></div>
      </div>
    </div>

    <div class="section-block">
      <h2>Musical Instruments</h2>
      <p>Eastern and Western instruments taught to our students in the program.</p>
      <div class="instruments-grid">
        <div class="instrument-card"><span class="icon">🎵</span><span class="name">Oud</span></div>
        <div class="instrument-card"><span class="icon">🎻</span><span class="name">Violin</span></div>
        <div class="instrument-card"><span class="icon">🎹</span><span class="name">Piano</span></div>
        <div class="instrument-card"><span class="icon">🎼</span><span class="name">Qanun</span></div>
        <div class="instrument-card"><span class="icon">🥁</span><span class="name">Percussion</span></div>
        <div class="instrument-card"><span class="icon">🎺</span><span class="name">Wind Instruments</span></div>
      </div>
    </div>

    <div class="section-block">
      <h2>Founder &amp; Director</h2>
      <div class="director-card">
        <div class="director-avatar">J.A</div>
        <div class="director-info">
          <h3>Jawad Abu Younes</h3>
          <span class="title">Oud Player &amp; Music Educator</span>
          <p>
            He holds a Bachelor's and Master's degree in Music from the Academy of Music and Dance in Jerusalem, with more than fifteen years of experience in music education. He founded Melodies Ensemble from the belief that every child deserves access to serious, high-quality music education.
          </p>
        </div>
      </div>
    </div>

    <div class="contact-section">
      <h2>Contact Us</h2>
      <p>For inquiries and registration.</p>
      <div class="contact-methods">
        <a href="tel:+972545046911" class="contact-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          054-504-6911
        </a>
        <a href="mailto:contact.musicatea@gmail.com" class="contact-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          contact.musicatea@gmail.com
        </a>
      </div>
    </div>

  </div>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

</body>
</html>
```

## history-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music History | Musicatea</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .history-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .history-hero-tag {
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 10px;
      display: block;
    }

    .history-hero h1 {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 900;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .history-hero p {
      color: var(--text-muted);
      font-size: 1rem;
      max-width: 640px;
      line-height: 1.8;
      margin: 0;
    }

    .history-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 60px 5% 100px;
    }

    #history-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .history-item {
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s var(--ease);
    }

    .history-item:hover {
      border-color: rgba(200,164,90,0.2);
    }

    .history-toggle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: var(--bg2);
      padding: 20px 22px;
      border: none;
      cursor: pointer;
      text-align: left;
      color: var(--text);
      font-family: inherit;
      transition: background 0.3s;
    }

    .history-toggle:hover,
    .history-toggle[aria-expanded="true"] {
      background: var(--bg3);
    }

    .history-toggle-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .history-index {
      font-size: 1.4rem;
      font-weight: 900;
      color: var(--gold);
      opacity: 0.5;
      min-width: 32px;
    }

    .history-titles {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .history-title {
      font-size: 1rem;
      font-weight: 700;
    }

    .history-subtitle {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .history-toggle-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .history-period {
      font-size: 0.75rem;
      color: var(--text-dim);
      white-space: nowrap;
    }

    .history-chevron {
      color: var(--text-dim);
      transition: transform 0.3s ease;
    }

    .history-content {
      padding: 24px 22px;
      border-top: 1px solid var(--border);
      background: var(--bg);
    }

    .history-text {
      color: var(--text-muted);
      line-height: 1.85;
      font-size: 0.92rem;
      margin-bottom: 16px;
    }

    .history-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .history-highlight {
      font-size: 0.78rem;
      padding: 5px 12px;
      border-radius: 100px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.2);
      color: var(--gold-light);
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 600px) {
      .history-period {
        display: none;
      }

      .history-container {
        padding: 40px 4% 80px;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>

        <div class="nav-top-left">
          <a href="history.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html" class="active">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="history-hero">
    <span class="history-hero-tag">History</span>
    <h1>History of Arabic Music</h1>
    <p>
      A concise historical journey through Arabic music — from early foundations to major modern transformations.
    </p>
  </header>

  <div class="history-container">
    <div id="history-list"></div>
  </div>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/history-en.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    function renderHistory() {
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = '';
      history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));
    }

    renderHistory();
  </script>
</body>
</html>
```

## maqamat-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maqamatea | Musicatea</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .maqamat-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .maqamat-hero h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .maqamat-hero p {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 700px;
      line-height: 1.8;
      margin-bottom: 0;
    }

    .maqamat-content {
      max-width: 1300px;
      margin: 0 auto;
      padding: 40px 5% 100px;
    }

    .maqamat-search {
      padding: 0 0 40px;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px 20px;
      max-width: 520px;
      transition: all 0.3s var(--ease);
    }

    .search-bar:focus-within {
      border-color: rgba(200,164,90,0.5);
      box-shadow: 0 0 0 4px rgba(200,164,90,0.08);
    }

    .search-bar svg {
      flex-shrink: 0;
      color: var(--text-dim);
    }

    .search-bar input {
      background: none;
      border: none;
      outline: none;
      color: var(--text);
      font-family: inherit;
      font-size: 1rem;
      width: 100%;
    }

    .search-bar input::placeholder {
      color: var(--text-dim);
    }

    #maqamat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
    }

    .maqam-family-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      transition: all 0.4s var(--ease);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .maqam-family-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--family-color);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s var(--ease);
    }

    .maqam-family-card:hover::before {
      transform: scaleX(1);
      transform-origin: right;
    }

    .maqam-family-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.45);
      border-color: rgba(200,164,90,0.35);
    }

    .maqam-family-card h3 {
      font-size: 1.6rem;
      font-weight: 900;
      color: var(--gold-light);
      margin: 0 0 8px 0;
    }

    .maqam-family-card .latin {
      font-size: 0.9rem;
      color: var(--text-dim);
      font-style: italic;
      margin-bottom: 16px;
      display: block;
    }

    .maqam-family-card .desc {
      font-size: 0.94rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 18px;
    }

    .maqam-family-card .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 14px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      color: var(--text-dim);
    }

    .meta-item svg {
      width: 14px;
      height: 14px;
    }

    .tonic-options {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .tonic-badge {
      background: var(--surface);
      border: 1px solid var(--border2);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .family-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.25);
    }

    .sub-count {
      font-size: 0.82rem;
      color: var(--text-dim);
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border2);
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 768px) {
      #maqamat-grid {
        grid-template-columns: 1fr;
      }

      .maqamat-content {
        padding: 30px 4% 80px;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>

        <div class="nav-top-left">
          <a href="maqamat.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html" class="active">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <div class="maqamat-hero">
    <h1>Arabic Maqamat</h1>
    <p>
      Maqamat are the modal foundation of Arabic music. Each maqam has its own scale, tonal center, emotional character, and melodic pathway. Explore the principal maqam families and their branches.
    </p>
  </div>

  <div class="maqamat-content">
    <div class="maqamat-search">
      <div class="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="maqam-search" type="text" placeholder="Search for a maqam or family...">
      </div>
    </div>

    <div id="maqamat-grid"></div>
  </div>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/maqamat-en.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const maqamatGrid = document.getElementById('maqamat-grid');
    const searchInput = document.getElementById('maqam-search');

    function createFamilyCard(maqam) {
      const card = document.createElement('div');
      card.className = 'maqam-family-card';
      card.style.setProperty('--family-color', maqam.mood_color);

      const subCount = maqam.sub_maqamat ? maqam.sub_maqamat.length : 0;
      const totalInFamily = subCount + 1;

      card.innerHTML = `
        <h3>${maqam.name}</h3>
        <span class="latin">${maqam.latin}</span>

        <p class="desc">${maqam.description}</p>

        <div class="meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18V5l12-2v13M9 13l12-2"/>
            </svg>
            <div class="tonic-options">
              ${(maqam.tonic_options || []).map(t => `<span class="tonic-badge">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="family-badge">
          Family: ${maqam.name}
        </div>

        ${subCount > 0 ? `<div class="sub-count">${totalInFamily} maqamat in this family</div>` : ''}
      `;

      card.addEventListener('click', () => {
        window.location.href = `maqam-family-en.html?family=${maqam.family}`;
      });

      return card;
    }

    function renderMaqamat(filter) {
      maqamatGrid.innerHTML = '';
      const q = normalize(filter || '');

      const mainMaqamat = getMainMaqamat();
      const filtered = mainMaqamat.filter(m =>
        !q ||
        normalize(m.name).includes(q) ||
        normalize(m.latin).includes(q) ||
        normalize(m.description).includes(q) ||
        normalize(m.family).includes(q)
      );

      if (!filtered.length) {
        maqamatGrid.appendChild(createEmptyState('No matching maqamat found'));
        return;
      }

      filtered.forEach(m => maqamatGrid.appendChild(createFamilyCard(m)));
    }

    searchInput.addEventListener('input', e => renderMaqamat(e.target.value));
    renderMaqamat();
  </script>
</body>
</html>
```

## rhythms-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iqaatea | Musicatea</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .rhythms-hero {
      padding: 60px 5% 48px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .rhythms-hero-tag {
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      color: var(--gold);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 10px;
      display: block;
    }

    .rhythms-hero h1 {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 900;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .rhythms-hero p {
      color: var(--text-muted);
      font-size: 1rem;
      max-width: 700px;
      line-height: 1.8;
      margin: 0;
    }

    .rhythms-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 5% 100px;
    }

    .rhythms-search-wrap {
      padding: 20px 0 40px;
    }

    .rhythms-search-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 18px;
      max-width: 480px;
      transition: all 0.3s var(--ease);
    }

    .rhythms-search-bar:focus-within {
      border-color: rgba(200,164,90,0.45);
      box-shadow: 0 0 0 3px rgba(200,164,90,0.07);
    }

    .rhythms-search-bar svg {
      flex-shrink: 0;
      color: var(--text-dim);
    }

    .rhythms-search-bar input {
      background: none;
      border: none;
      outline: none;
      color: var(--text);
      font-family: inherit;
      font-size: 0.95rem;
      width: 100%;
    }

    .rhythms-search-bar input::placeholder {
      color: var(--text-dim);
    }

    #rhythms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .rhythm-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      transition: all 0.4s var(--ease);
      cursor: pointer;
    }

    .rhythm-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.4);
      border-color: rgba(200,164,90,0.3);
    }

    .rhythm-card-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 12px;
    }

    .rhythm-card h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--gold-light);
      margin: 0;
    }

    .rhythm-card .time-sig {
      font-size: 0.9rem;
      color: var(--text-dim);
      font-weight: 600;
      background: var(--surface);
      padding: 4px 10px;
      border-radius: 6px;
      white-space: nowrap;
      direction: ltr;
    }

    .rhythm-card .latin {
      font-size: 0.85rem;
      color: var(--text-dim);
      font-style: italic;
      margin-bottom: 14px;
      display: block;
    }

    .rhythm-card .pattern {
      font-family: monospace;
      font-size: 0.95rem;
      color: var(--text);
      background: var(--surface);
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 14px;
      direction: ltr;
      text-align: center;
      border: 1px solid var(--border2);
    }

    .rhythm-card .desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 12px;
    }

    .rhythm-card .tempo {
      display: inline-block;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 100px;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.2);
      margin-top: 4px;
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 640px) {
      #rhythms-grid {
        grid-template-columns: 1fr;
      }

      .rhythms-content {
        padding: 30px 4% 80px;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>

        <div class="nav-top-left">
          <a href="rhythms.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html">Maqamatea</a>
          <a href="rhythms-en.html" class="active">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="rhythms-hero">
    <span class="rhythms-hero-tag">Rhythm</span>
    <h1>Arabic Rhythms</h1>
    <p>
      A practical guide to common Arabic rhythmic cycles, their basic patterns, time signatures, and musical character.
    </p>
  </header>

  <div class="rhythms-content">
    <div class="rhythms-search-wrap">
      <div class="rhythms-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="rhythm-search" type="text" placeholder="Search for a rhythm...">
      </div>
    </div>

    <div id="rhythms-grid"></div>
  </div>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/rhythms-en.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const rhythmsGrid = document.getElementById('rhythms-grid');
    const searchInput = document.getElementById('rhythm-search');

    function createRhythmCard(r) {
      const card = document.createElement('div');
      card.className = 'rhythm-card';
      card.innerHTML = `
        <div class="rhythm-card-header">
          <h3>${r.name}</h3>
          <span class="time-sig">${r.time_signature}</span>
        </div>
        <span class="latin">${r.latin}</span>
        <div class="pattern">${r.pattern}</div>
        <p class="desc">${r.description}</p>
        <span class="tempo">Tempo: ${r.tempo}</span>
      `;
      return card;
    }

    function renderRhythms(filter) {
      rhythmsGrid.innerHTML = '';
      const q = normalize(filter || '');
      const filtered = rhythms.filter(r =>
        !q ||
        normalize(r.name).includes(q) ||
        normalize(r.latin).includes(q) ||
        normalize(r.description).includes(q)
      );

      if (!filtered.length) {
        rhythmsGrid.appendChild(createEmptyState('No matching rhythms found'));
        return;
      }

      filtered.forEach(r => rhythmsGrid.appendChild(createRhythmCard(r)));
    }

    searchInput.addEventListener('input', e => renderRhythms(e.target.value));
    renderRhythms();
  </script>
</body>
</html>
```

## maqam-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maqam | Musicatea</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css" />
  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .maqam-hero {
      padding: 56px 5% 38px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
      font-size: 0.86rem;
      color: var(--text-dim);
    }

    .breadcrumbs a {
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.25s ease;
    }

    .breadcrumbs a:hover {
      color: var(--gold);
    }

    .maqam-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .maqam-title-block h1 {
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 900;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .maqam-latin {
      display: block;
      font-size: 1rem;
      color: var(--text-dim);
      font-style: italic;
      margin-bottom: 14px;
    }

    .maqam-title-block p {
      max-width: 760px;
      color: var(--text-muted);
      line-height: 1.9;
      font-size: 1rem;
      margin: 0;
    }

    .maqam-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 999px;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.22);
      font-size: 0.86rem;
      font-weight: 800;
      white-space: nowrap;
    }

    .maqam-content {
      padding: 42px 5% 90px;
      max-width: 1300px;
      margin: 0 auto;
    }

    .maqam-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 22px;
      align-items: start;
    }

    .detail-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
    }

    .detail-card h2 {
      font-size: 1.2rem;
      font-weight: 800;
      margin: 0 0 16px 0;
      color: var(--gold-light);
    }

    .meta-list {
      display: grid;
      gap: 12px;
    }

    .meta-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      line-height: 1.7;
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    .meta-label {
      min-width: 120px;
      font-weight: 700;
      color: var(--text);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      font-size: 0.78rem;
      padding: 5px 12px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border2);
      color: var(--text-muted);
      font-weight: 700;
    }

    .notes-block {
      display: grid;
      gap: 14px;
    }

    .notes-variant {
      background: var(--surface);
      border: 1px solid var(--border2);
      border-radius: 12px;
      padding: 16px;
    }

    .notes-variant h3 {
      font-size: 0.95rem;
      font-weight: 800;
      margin: 0 0 10px 0;
      color: var(--text);
    }

    .notes-line {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.8;
    }

    .examples-list,
    .submaqamat-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .example-pill,
    .submaqam-link {
      display: inline-flex;
      align-items: center;
      padding: 7px 12px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 700;
    }

    .example-pill {
      background: var(--surface);
      border: 1px solid var(--border2);
      color: var(--text-muted);
    }

    .submaqam-link {
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.22);
      color: var(--gold);
    }

    .related-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--gold-light);
      font-weight: 700;
      transition: transform 0.25s ease;
    }

    .related-link:hover {
      transform: translateX(4px);
    }

    .empty-state {
      color: var(--text-dim);
      font-size: 0.95rem;
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 900px) {
      .maqam-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 700px) {
      .maqam-title-row {
        flex-direction: column;
        align-items: flex-start;
      }

      .maqam-content {
        padding: 32px 4% 80px;
      }

      .meta-row {
        flex-direction: column;
        gap: 4px;
      }

      .meta-label {
        min-width: 0;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>

        <div class="nav-top-left">
          <a href="maqam.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html" class="active">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="maqam-hero">
    <div class="breadcrumbs">
      <a href="index-en.html">Home</a>
      <span>›</span>
      <a href="maqamat-en.html">Maqamatea</a>
      <span>›</span>
      <a href="#" id="breadcrumb-family-link">Family</a>
      <span>›</span>
      <span id="breadcrumb-maqam">Maqam</span>
    </div>

    <div class="maqam-title-row">
      <div class="maqam-title-block">
        <h1 id="maqam-name">Maqam</h1>
        <span class="maqam-latin" id="maqam-latin">Loading...</span>
        <p id="maqam-description">Loading maqam details...</p>
      </div>
      <div class="maqam-badge" id="maqam-family-badge">Family</div>
    </div>
  </header>

  <main class="maqam-content">
    <div class="maqam-grid">
      <div>
        <section class="detail-card">
          <h2>Musical Identity</h2>
          <div class="meta-list">
            <div class="meta-row">
              <span class="meta-label">Sayr</span>
              <span id="maqam-sayr">—</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Dominant</span>
              <span id="maqam-dominant">—</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Tonic options</span>
              <div class="tags" id="maqam-tonics"></div>
            </div>
            <div class="meta-row">
              <span class="meta-label">Character</span>
              <div class="tags" id="maqam-feelings"></div>
            </div>
          </div>
        </section>

        <section class="detail-card">
          <h2>Jins Structure</h2>
          <div class="meta-list">
            <div class="meta-row">
              <span class="meta-label">Lower jins</span>
              <span id="maqam-lower-jins">—</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Upper jins</span>
              <span id="maqam-upper-jins">—</span>
            </div>
          </div>
        </section>

        <section class="detail-card">
          <h2>Scale Variants</h2>
          <div class="notes-block" id="maqam-notes"></div>
        </section>
      </div>

      <div>
        <section class="detail-card">
          <h2>Examples</h2>
          <div class="examples-list" id="maqam-examples"></div>
        </section>

        <section class="detail-card">
          <h2>Sub-maqamat</h2>
          <div class="submaqamat-list" id="maqam-submaqamat"></div>
        </section>

        <section class="detail-card">
          <h2>Related Library</h2>
          <div id="maqam-related"></div>
        </section>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/maqamat-en.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const params = new URLSearchParams(window.location.search);
    const maqamId = params.get('id');

    const familyNameMap = {
      rast: 'Rast',
      bayat: 'Bayati',
      nahawand: 'Nahawand',
      ajam: 'Ajam',
      kurd: 'Kurd',
      hijaz: 'Hijaz',
      sikah: 'Sikah',
      saba: 'Saba',
      nawa_athar: 'Nawa Athar'
    };

    function pill(text, className = 'tag') {
      const span = document.createElement('span');
      span.className = className;
      span.textContent = text;
      return span;
    }

    function renderMaqamPage() {
      const maqam = getMaqamById(maqamId);

      if (!maqam) {
        document.getElementById('maqam-name').textContent = 'Maqam not found';
        document.getElementById('maqam-latin').textContent = '';
        document.getElementById('maqam-description').textContent = 'No data is available for this maqam.';
        return;
      }

      document.title = `${maqam.name} | Musicatea`;

      document.getElementById('maqam-name').textContent = maqam.name;
      document.getElementById('maqam-latin').textContent = maqam.latin || '';
      document.getElementById('maqam-description').textContent = maqam.description || '';
      document.getElementById('breadcrumb-maqam').textContent = maqam.name;

      const familyName = familyNameMap[maqam.family] || maqam.family;
      const familyLink = document.getElementById('breadcrumb-family-link');
      familyLink.textContent = `${familyName} Family`;
      familyLink.href = `maqam-family-en.html?family=${maqam.family}`;

      document.getElementById('maqam-family-badge').textContent = `${familyName} Family`;

      document.getElementById('maqam-sayr').textContent = maqam.sayr || '—';
      document.getElementById('maqam-dominant').textContent = maqam.dominant || '—';

      const tonics = document.getElementById('maqam-tonics');
      tonics.innerHTML = '';
      (maqam.tonic_options || []).forEach(t => tonics.appendChild(pill(t)));

      const feelings = document.getElementById('maqam-feelings');
      feelings.innerHTML = '';
      (maqam.feeling || []).forEach(f => feelings.appendChild(pill(f)));

      const lowerJins = maqam.jins?.lower
        ? `${maqam.jins.lower.name} on ${maqam.jins.lower.root}`
        : '—';
      const upperJins = maqam.jins?.upper?.length
        ? maqam.jins.upper.map(j => `${j.name} on ${j.root}`).join(' / ')
        : '—';

      document.getElementById('maqam-lower-jins').textContent = lowerJins;
      document.getElementById('maqam-upper-jins').textContent = upperJins;

      const notesBlock = document.getElementById('maqam-notes');
      notesBlock.innerHTML = '';
      const notesEntries = Object.entries(maqam.notes || {});
      if (!notesEntries.length) {
        notesBlock.innerHTML = '<div class="empty-state">No scale variants available.</div>';
      } else {
        notesEntries.forEach(([key, notes]) => {
          const box = document.createElement('div');
          box.className = 'notes-variant';
          const title = key.replaceAll('_', ' ').toUpperCase();
          box.innerHTML = `
            <h3>${title}</h3>
            <div class="notes-line">${notes.join(' — ')}</div>
          `;
          notesBlock.appendChild(box);
        });
      }

      const examples = document.getElementById('maqam-examples');
      examples.innerHTML = '';
      if ((maqam.examples || []).length) {
        maqam.examples.forEach(example => {
          examples.appendChild(pill(example, 'example-pill'));
        });
      } else {
        examples.innerHTML = '<div class="empty-state">No examples listed yet.</div>';
      }

      const submaqamat = document.getElementById('maqam-submaqamat');
      submaqamat.innerHTML = '';
      if ((maqam.sub_maqamat || []).length) {
        maqam.sub_maqamat.forEach(id => {
          const sub = getMaqamById(id);
          const a = document.createElement('a');
          a.className = 'submaqam-link';
          a.href = `maqam-en.html?id=${id}`;
          a.textContent = sub ? sub.name : id;
          submaqamat.appendChild(a);
        });
      } else {
        submaqamat.innerHTML = '<div class="empty-state">No sub-maqamat listed.</div>';
      }

      const related = document.getElementById('maqam-related');
      related.innerHTML = '';
      if ((maqam.related_sheets || []).length) {
        const a = document.createElement('a');
        a.className = 'related-link';
        a.href = 'library-en.html';
        a.innerHTML = 'Open related sheets in library <span>→</span>';
        related.appendChild(a);
      } else {
        related.innerHTML = '<div class="empty-state">No linked sheets yet.</div>';
      }
    }

    renderMaqamPage();
  </script>
</body>
</html>
```

## maqam-family-en.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maqam Family | Musicatea</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css" />
  <style>
    body[dir="ltr"] {
      direction: ltr;
      text-align: left;
    }

    .family-hero {
      padding: 56px 5% 38px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
      font-size: 0.86rem;
      color: var(--text-dim);
    }

    .breadcrumbs a {
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.25s ease;
    }

    .breadcrumbs a:hover {
      color: var(--gold);
    }

    .family-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .family-title-block h1 {
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 900;
      margin-bottom: 10px;
      line-height: 1.2;
    }

    .family-title-block p {
      max-width: 760px;
      color: var(--text-muted);
      line-height: 1.9;
      font-size: 1rem;
      margin: 0;
    }

    .family-badge-large {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 999px;
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(200,164,90,0.22);
      font-size: 0.86rem;
      font-weight: 800;
      white-space: nowrap;
    }

    .family-content {
      padding: 42px 5% 90px;
      max-width: 1300px;
      margin: 0 auto;
    }

    .family-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 34px;
    }

    .summary-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
    }

    .summary-label {
      font-size: 0.8rem;
      color: var(--text-dim);
      margin-bottom: 8px;
    }

    .summary-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
      line-height: 1.7;
    }

    .family-section-header {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
    }

    .family-section-header h2 {
      font-size: 1.28rem;
      font-weight: 800;
      margin: 0;
    }

    .family-section-header span {
      font-size: 0.82rem;
      color: var(--text-dim);
    }

    #family-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 20px;
    }

    .family-maqam-card {
      display: block;
      text-decoration: none;
      color: inherit;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      transition: all 0.35s var(--ease);
    }

    .family-maqam-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      border-color: rgba(200,164,90,0.28);
    }

    .family-maqam-card.main {
      border-color: rgba(200,164,90,0.3);
      box-shadow: 0 0 0 1px rgba(200,164,90,0.08) inset;
    }

    .family-maqam-accent {
      height: 4px;
      background: var(--maqam-color, var(--gold));
    }

    .family-maqam-body {
      padding: 22px;
    }

    .main-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--gold-dim);
      border: 1px solid rgba(200,164,90,0.2);
      color: var(--gold);
      font-size: 0.76rem;
      font-weight: 800;
    }

    .family-maqam-header {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .family-maqam-header h3 {
      font-size: 1.28rem;
      font-weight: 900;
      margin: 0;
      color: var(--text);
    }

    .family-maqam-latin {
      font-size: 0.84rem;
      color: var(--text-dim);
      font-style: italic;
    }

    .family-maqam-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.8;
      margin-bottom: 14px;
    }

    .family-maqam-meta {
      display: grid;
      gap: 10px;
      margin-bottom: 14px;
    }

    .family-meta-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.88rem;
      color: var(--text-dim);
      line-height: 1.7;
    }

    .family-meta-label {
      min-width: 92px;
      color: var(--text);
      font-weight: 700;
    }

    .tonic-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tonic-pill {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border2);
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 700;
    }

    .family-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding-top: 14px;
      border-top: 1px solid var(--border2);
      font-size: 0.82rem;
      color: var(--text-dim);
    }

    .family-card-arrow {
      color: var(--gold);
      font-size: 1rem;
      transition: transform 0.25s ease;
    }

    .family-maqam-card:hover .family-card-arrow {
      transform: translateX(4px);
    }

    .family-empty {
      background: var(--bg2);
      border: 1px dashed var(--border2);
      border-radius: 16px;
      padding: 28px;
      text-align: center;
      color: var(--text-dim);
    }

    html[dir="ltr"] .nav-top {
      flex-direction: row;
    }

    html[dir="ltr"] .nav-bottom {
      justify-content: flex-start;
    }

    html[dir="ltr"] .nav-links {
      flex-direction: row;
    }

    @media (max-width: 700px) {
      .family-title-row {
        flex-direction: column;
        align-items: flex-start;
      }

      #family-grid {
        grid-template-columns: 1fr;
      }

      .family-content {
        padding: 32px 4% 80px;
      }
    }
  </style>
</head>
<body dir="ltr">

  <nav class="site-nav">
    <div class="nav-shell">
      <div class="nav-top">
        <div class="nav-top-right">
          <a href="index-en.html" class="nav-logo">Musicatea</a>
        </div>

        <div class="nav-top-left">
          <a href="maqam-family.html" class="lang-toggle" aria-label="Switch to Arabic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>AR</span>
          </a>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-links">
          <a href="index-en.html">Home</a>
          <a href="library-en.html">Sheet Library</a>
          <a href="maqamat-en.html" class="active">Maqamatea</a>
          <a href="rhythms-en.html">Iqaatea</a>
          <a href="history-en.html">Music History</a>
          <a href="ensemble-en.html">Melodies Ensemble</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="family-hero">
    <div class="breadcrumbs">
      <a href="index-en.html">Home</a>
      <span>›</span>
      <a href="maqamat-en.html">Maqamatea</a>
      <span>›</span>
      <span id="breadcrumb-family">Maqam Family</span>
    </div>

    <div class="family-title-row">
      <div class="family-title-block">
        <h1 id="family-title">Maqam Family</h1>
        <p id="family-description">Loading family information...</p>
      </div>
      <div class="family-badge-large" id="family-count-badge">0 maqamat</div>
    </div>
  </header>

  <main class="family-content">
    <section class="family-summary" id="family-summary"></section>

    <section>
      <div class="family-section-header">
        <h2>Family Maqamat</h2>
        <span id="family-section-count"></span>
      </div>
      <div id="family-grid"></div>
    </section>
  </main>

  <footer class="site-footer">
    <span class="footer-logo">Musicatea</span>
    <span>© 2025 Musicatea</span>
  </footer>

  <script src="data/maqamat-en.js"></script>
  <script src="assets/ui.js"></script>
  <script>
    const params = new URLSearchParams(window.location.search);
    const familyId = params.get('family');

    const familyTitle = document.getElementById('family-title');
    const familyDescription = document.getElementById('family-description');
    const familyCountBadge = document.getElementById('family-count-badge');
    const familySectionCount = document.getElementById('family-section-count');
    const breadcrumbFamily = document.getElementById('breadcrumb-family');
    const familyGrid = document.getElementById('family-grid');
    const familySummary = document.getElementById('family-summary');

    const familyDescriptions = {
      rast: "The Rast family is one of the most central families in Arabic music, known for balance, stability, dignity, and rich possibilities of modulation.",
      bayat: "The Bayati family is among the most widely used in Arabic vocal, devotional, and folk traditions, known for warmth and intimate expression.",
      nahawand: "The Nahawand family combines lyricism, melancholy, and romance, and appears frequently in both classical and modern repertoires.",
      ajam: "The Ajam family is bright, open, and structurally clear, often associated with festive, formal, and orchestral musical settings.",
      kurd: "The Kurd family has a direct and dark character, without quarter tones, and is common in folk-oriented and emotionally straightforward melodies.",
      hijaz: "The Hijaz family is dramatic and spiritually charged, recognized by its characteristic intervallic shape and strong emotional pull.",
      sikah: "The Sikah family is intimate and inward, deeply connected to recitation, spirituality, and quarter-tone sensitivity.",
      saba: "The Saba family is one of the most sorrowful and emotionally intense maqam families in Arabic music.",
      nawa_athar: "The Nawa Athar family is complex and color-rich, offering dramatic tension and advanced melodic possibilities."
    };

    function createSummaryCard(label, value) {
      const card = document.createElement('div');
      card.className = 'summary-card';
      card.innerHTML = `
        <div class="summary-label">${label}</div>
        <div class="summary-value">${value}</div>
      `;
      return card;
    }

    function createFamilyMaqamCard(maqam) {
      const card = document.createElement('a');
      card.className = 'family-maqam-card' + (maqam.is_main ? ' main' : '');
      card.href = `maqam-en.html?id=${maqam.id}`;
      card.style.setProperty('--maqam-color', maqam.mood_color || 'var(--gold)');

      const tonicHtml = (maqam.tonic_options || [])
        .map(t => `<span class="tonic-pill">${t}</span>`)
        .join('');

      const upperJins = maqam.jins?.upper?.map(j => `${j.name} on ${j.root}`).join(' / ') || '—';
      const lowerJins = maqam.jins?.lower ? `${maqam.jins.lower.name} on ${maqam.jins.lower.root}` : '—';

      card.innerHTML = `
        <div class="family-maqam-accent"></div>
        <div class="family-maqam-body">
          ${maqam.is_main ? `<div class="main-tag">Main maqam</div>` : ''}
          <div class="family-maqam-header">
            <h3>${maqam.name}</h3>
            <span class="family-maqam-latin">${maqam.latin}</span>
          </div>

          <p class="family-maqam-desc">${maqam.description || ''}</p>

          <div class="family-maqam-meta">
            <div class="family-meta-row">
              <span class="family-meta-label">Tonic</span>
              <div class="tonic-list">${tonicHtml || '<span class="tonic-pill">—</span>'}</div>
            </div>
            <div class="family-meta-row">
              <span class="family-meta-label">Lower jins</span>
              <span>${lowerJins}</span>
            </div>
            <div class="family-meta-row">
              <span class="family-meta-label">Upper jins</span>
              <span>${upperJins}</span>
            </div>
          </div>

          <div class="family-card-footer">
            <span>${(maqam.examples || []).length} examples</span>
            <span class="family-card-arrow">→</span>
          </div>
        </div>
      `;

      return card;
    }

    function renderFamilyPage() {
      if (!familyId) {
        familyTitle.textContent = 'Unspecified family';
        breadcrumbFamily.textContent = 'Unspecified family';
        familyDescription.textContent = 'No family was specified in the page URL.';
        familyGrid.innerHTML = '<div class="family-empty">The link is incomplete. Return to the maqamat page and select a family.</div>';
        familySummary.appendChild(createSummaryCard('Status', 'Invalid link'));
        return;
      }

      const familyMaqamat = getMaqamatByFamily(familyId);
      const mainMaqam = familyMaqamat.find(m => m.is_main) || familyMaqamat[0];

      if (!familyMaqamat.length || !mainMaqam) {
        familyTitle.textContent = 'Family not found';
        breadcrumbFamily.textContent = 'Not found';
        familyDescription.textContent = 'No data was found for this maqam family.';
        familyGrid.innerHTML = '<div class="family-empty">No data is currently available for this family.</div>';
        familySummary.appendChild(createSummaryCard('Status', 'No data available'));
        return;
      }

      familyTitle.textContent = `${mainMaqam.name} Family`;
      breadcrumbFamily.textContent = `${mainMaqam.name} Family`;
      familyDescription.textContent = familyDescriptions[familyId] || mainMaqam.description || '';
      familyCountBadge.textContent = `${familyMaqamat.length} maqamat`;
      familySectionCount.textContent = `${familyMaqamat.length} in this family`;

      const totalExamples = familyMaqamat.reduce((sum, m) => sum + ((m.examples || []).length), 0);
      const lowerJinsName = mainMaqam.jins?.lower?.name || '—';
      const dominant = mainMaqam.dominant || '—';

      familySummary.appendChild(createSummaryCard('Parent maqam', mainMaqam.name));
      familySummary.appendChild(createSummaryCard('Shared lower jins', lowerJinsName));
      familySummary.appendChild(createSummaryCard('Dominant', dominant));
      familySummary.appendChild(createSummaryCard('Total examples', `${totalExamples} examples`));

      const ordered = [
        ...familyMaqamat.filter(m => m.is_main),
        ...familyMaqamat.filter(m => !m.is_main)
      ];

      ordered.forEach(m => {
        familyGrid.appendChild(createFamilyMaqamCard(m));
      });
    }

    renderFamilyPage();
  </script>
</body>
</html>
```

## assets/style.css
```css
/* ============================================================
   style.css — Musicatea Enhanced
   Premium dark theme with smooth UX
   Font: Cairo (Arabic-first)
*============================================================= */

/* ── Variables ─┐ ──────────────────*/
:root {
  --bg:         #09090b;
  --bg2:        #0f0f12;
  --bg3:        #141418;
  --surface:    rgba(255,255,255,0.035);
  --surface2:   rgba(255,255,255,0.06);
  --border:     rgba(255,255,255,0.07);
  --border2:     rgba(255,255,255,0.12);
  --gold:       #c8a45a;
  --gold-light: #e2c07a;
  --gold-dim:   rgba(200,164,90,0.12);
  --text:       #ede8dc;
  --text-muted: rgba(237,232,220,0.55);
  --text-dim:   rgba(237,232,220,0.28);
  --red:        #c46060;
  --green:      #7ecfa0;
  --radius:     12px;
  --ease:       cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ─┐ Reset ──────────────────*/
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html {
  font-size: 16px;
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
body {
  font-family: 'Cairo', sans-serif;
  background: var(--bg);
  color: var(--text);
  direction: rtl;
  min-height: 100vh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s var(--ease);
}
img { display: block; max-width: 100%; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
:::-webkit-scrollbar-thumb {
  background: rgba(200,164,90,0.3);
  border-radius: 3px;
  transition: background 0.3s;
}
:::-webkit-scrollbar-thumb:hover { background: rgba(200,164,90,0.5); }
::selection { background: var(--gold-dim); color: var(--gold-light); }

/* ── Navigation ──────────────────*/
.site-nav {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(9,9,11,0.92);
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
  transition: all 0.3s var(--ease);
}

.site-nav.scrolled {
  background: rgba(9,9,11,0.96);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.nav-shell {
  padding: 0 5%;
}

.nav-top {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.nav-top-right,
.nav-top-left {
  display: flex;
  align-items: center;
}

.nav-logo {
  font-size: 1.95rem;
  font-weight: 900;
  color: var(--gold-light);
  letter-spacing: 0.02em;
  transition: transform 0.3s var(--ease);
}

.nav-logo:hover {
  transform: scale(1.04);
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
  transition: all 0.3s var(--ease);
  cursor: pointer;
  text-decoration: none;
}

.lang-toggle:hover {
  background: var(--surface2);
  border-color: rgba(200,164,90,0.35);
  color: var(--gold);
}

.lang-toggle svg {
  width: 14px;
  height: 14px;
}

.nav-bottom {
  min-height: 58px;
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.nav-links a {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 9px;
  transition: all 0.3s var(--ease);
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: var(--gold);
  transition: transform 0.3s var(--ease);
}

.nav-links a:hover {
  color: var(--text);
  background: var(--surface2);
}

.nav-links a.active {
  color: var(--gold-light);
  background: var(--gold-dim);
}

.nav-links a.active::after {
  transform: translateX(-50%) scaleX(1);
}

html[dir="rtl"] .nav-top,
html[dir="ltr"] .nav-top {
  flex-direction: row;
}

html[dir="rtl"] .nav-bottom,
html[dir="ltr"] .nav-bottom {
  justify-content: flex-start;
}

/* ── Page hero areas ─┐ ────────────────*/
.page-hero {
  padding: 60px 5% 48px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%);
  animation: fadeInUp 0.6s var(--ease);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-hero h1 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 900;
  margin-bottom: 10px;
  background: linear-gradient(135deg, var(--text), var(--text-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-hero p {
  color: var(--text-muted);
  max-width: 580px;
  font-size: 1rem;
  line-height: 1.8;
}

/* ── Filters bar ────────────────── */
.filters {
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  padding: 20px 5%; border-bottom: 1px solid var(--border);
  background: var(--bg); position: sticky; top: 70px; z-index: 100;
  transition: all 0.3s var(--ease);
}

.filters select,
.filters input[type="text"] {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 16px;
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s var(--ease);
  -webkit-appearance: none;
}

.filters select:hover,
.filters input[type="text"]:hover {
  border-color: rgba(200,164,90,0.3);
  background: var(--surface2);
}

.filters select:focus,
.filters input[type="text"]:focus {
  border-color: rgba(200,164,90,0.5);
  box-shadow: 0 0 0 4px rgba(200,164,90,0.08);
  transform: translateY(-1px);
}

.filters select option { background: var(--bg3); }

/* ── List / grid ─┐ ─────────────────*/
#list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 32px 5%;
}

/* ── Card ──────────────────*/
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all 0.4s var(--ease);
  animation: fadeInScale 0.5s var(--ease) backwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border-color: rgba(200,164,90,0.3);
}

.card-header { margin-bottom: 14px; }

.card-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--text);
  transition: color 0.3s;
}

.card:hover .card-title {
  color: var(--gold-light);
}

.card-composer {
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: color 0.3s;
}

.card:hover .card-composer {
  color: var(--text);
}

.card-performer {
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 3px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.card-maqam {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.card-tonic {
  font-size: 0.76rem;
  padding: 3px 10px;
  border-radius: 100px;
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text-dim);
  transition: all 0.3s;
}

.card:hover .card-tonic {
  background: var(--gold-dim);
  border-color: rgba(200,164,90,0.3);
  color: var(--gold);
}

/* Maqam link in cards */
.maqam-link {
  color: var(--gold);
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
}

.maqam-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: 0;
  width: 0;
  height: 1px;
  background: var(--gold-light);
  transition: width 0.3s var(--ease);
}

.maqam-link:hover {
  color: var(--gold-light);
}

.maqam-link:hover::after {
  width: 100%;
}

/* Badges */
.badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.04em;
  transition: all 0.3s var(--ease);
}

.badge-song {
  background: rgba(200,164,90,0.12);
  color: var(--gold);
  border: 1px solid rgba(200,164,90,0.22);
}

.card:hover .badge-song {
  background: rgba(200,164,90,0.2);
  border-color: rgba(200,164,90,0.4);
}

.badge-inst {
  background: rgba(126,207,160,0.1);
  color: var(--green);
  border: 1px solid rgba(126,207,160,0.2);
}

.card:hover .badge-inst {
  background: rgba(126,207,160,0.15);
  border-color: rgba(126,207,160,0.3);
}

/* Download button */
.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 11px 0;
  background: var(--gold-dim);
  border: 1px solid rgba(200,164,90,0.22);
  border-radius: 10px;
  color: var(--gold-light);
  font-size: 0.88rem;
  font-weight: 600;
  font-family: inherit;
  text-decoration: none;
  transition: all 0.3s var(--ease);
}

.download-btn:hover {
  background: rgba(200,164,90,0.22);
  border-color: rgba(200,164,90,0.45);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(200,164,90,0.2);
}

.download-btn svg {
  transition: transform 0.3s var(--ease);
}

.download-btn:hover svg {
  transform: translateY(2px);
}

/* Legacy download class */
a.download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
  padding: 11px 0;
  background: var(--gold-dim);
  border: 1px solid rgba(200,164,90,0.22);
  border-radius: 10px;
  color: var(--gold-light);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s var(--ease);
}

a.download:hover {
  background: rgba(200,164,90,0.22);
  border-color: rgba(200,164,90,0.45);
  transform: translateY(-2px);
}

/* ─┐ Empty state ──────────────────*/
.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 20px;
  color: var(--text-dim);
  font-size: 0.95rem;
  text-align: center;
  animation: fadeIn 0.5s var(--ease);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── System toggle ──────────────────*/
.system-toggle {
  display: flex;
  gap: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 5px;
}

.system-toggle-btn {
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--text-muted);
  transition: all 0.3s var(--ease);
  cursor: pointer;
  border: none;
  background: none;
}

.system-toggle-btn:hover {
  color: var(--text);
  background: var(--surface2);
}

.system-toggle-btn.active {
  background: var(--gold-dim);
  color: var(--gold-light);
  border: 1px solid rgba(200,164,90,0.25);
  transform: scale(1.02);
}

/* ── Footer ─┐ ──────────────────*/
.site-footer {
  border-top: 1px solid var(--border);
  padding: 40px 5%;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--text-dim);
  font-size: 0.85rem;
  background: var(--bg2);
}

.footer-logo {
  font-weight: 900;
  font-size: 1.1rem;
  color: var(--gold-light);
}

/* ─┐ Responsive ─┐ ─────────────────*/
@media (max-width: 640px) {
  #list {
    grid-template-columns: 1fr;
    padding: 24px 4%;
    gap: 16px;
  }
  .filters {
    padding: 16px 4%;
    top: 64px;
    gap: 10px;
  }
  .site-nav {
    padding: 0;
  }
  .nav-shell {
    padding: 0 4%;
  }
  .nav-top {
    min-height: 70px;
  }
  .nav-bottom {
    min-height: 54px;
    padding: 8px 0;
  }
  .nav-logo {
    font-size: 1.7rem;
  }
  .lang-toggle {
    font-size: 0.75rem;
    padding: 6px 10px;
  }
  .nav-links a {
    padding: 7px 10px;
    font-size: 0.82rem;
  }
}

/* ─┐ Smooth scroll animations ────────────────── */
@media (prefers-reduced-motion: no-preference) {
  .card {
    animation-delay: calc(var(--card-index, 0) * 0.05s);
  }
}
```

## assets/app.js
```javascript
const list = document.getElementById('list');

const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');
const maqamSelect = document.getElementById('maqam');
const scaleSelect = document.getElementById('scale');
const tonicSelect = document.getElementById('tonic');
const searchInput = document.getElementById('search');

// ===== Render =====
function render(data) {
  list.innerHTML = '';

  if (data.length === 0) {
    list.appendChild(createEmptyState('لا توجد نوتات مطابقة للفلتر'));
    return;
  }

  data.forEach((s, index) => {
    const card = createSheetCard(s);
    card.style.setProperty('--card-index', index);
    list.appendChild(card);
  });
}

// ===== populate filters dynamically =====
function populateFilters() {
  maqamSelect.innerHTML = '<option value="">كل المقامات</option>';
  scaleSelect.innerHTML = '<option value="">All Scales</option>';
  tonicSelect.innerHTML = '<option value="">الدرجة</option>';

  const systemVal = systemSelect.value;

  let data = sheets;

  if (systemVal === 'نوتات شرقية') {
    data = sheets.filter(s => s.system === 'arabic');
  } else {
    data = sheets.filter(s => s.system === 'western');
  }

  const maqams = [...new Set(data.map(s => s.maqam).filter(Boolean))];
  const scales = [...new Set(data.map(s => s.scale).filter(Boolean))];
  const tonics = [...new Set(data.map(s => s.tonic).filter(Boolean))];

  maqams.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    maqamSelect.appendChild(opt);
  });

  scales.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    scaleSelect.appendChild(opt);
  });

  tonics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    tonicSelect.appendChild(opt);
  });
}

// ===== Filters =====
function applyFilters() {
  let filtered = sheets;

  const systemVal = systemSelect.value;
  const typeVal = typeSelect.value;
  const maqamVal = maqamSelect.value;
  const scaleVal = scaleSelect.value;
  const tonicVal = tonicSelect.value;
  const searchVal = normalize(searchInput.value);

  // system
  if (systemVal === 'نوتات شرقية') {
    filtered = filtered.filter(s => s.system === 'arabic');
    maqamSelect.style.display = 'inline';
    scaleSelect.style.display = 'none';
  } else {
    filtered = filtered.filter(s => s.system === 'western');
    maqamSelect.style.display = 'none';
    scaleSelect.style.display = 'inline';
  }

  // type
  if (typeVal === 'أغنية') {
    filtered = filtered.filter(s => s.type === 'song');
  } else if (typeVal === 'معزوفة') {
    filtered = filtered.filter(s => s.type === 'instrumental');
  }

  // maqam
  if (maqamVal) {
    filtered = filtered.filter(s => s.maqam === maqamVal);
  }

  // scale
  if (scaleVal) {
    filtered = filtered.filter(s => s.scale === scaleVal);
  }

  // tonic
  if (tonicVal) {
    filtered = filtered.filter(s => s.tonic === tonicVal);
  }

  // search
  if (searchVal) {
    filtered = filtered.filter(s =>
      normalize(s.title).includes(searchVal) ||
      normalize(s.composer).includes(searchVal)
    );
  }

  render(filtered);
}

// ===== listeners =====
systemSelect.addEventListener('change', () => {
  populateFilters();
  applyFilters();
});

typeSelect.addEventListener('change', applyFilters);
maqamSelect.addEventListener('change', applyFilters);
scaleSelect.addEventListener('change', applyFilters);
tonicSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

// ===== init =====
populateFilters();
applyFilters();
```

## assets/app-en.js
```javascript
const list = document.getElementById('list');

const systemSelect = document.getElementById('system');
const typeSelect = document.getElementById('type');
const maqamSelect = document.getElementById('maqam');
const scaleSelect = document.getElementById('scale');
const tonicSelect = document.getElementById('tonic');
const searchInput = document.getElementById('search');

function render(data) {
  list.innerHTML = '';

  if (data.length === 0) {
    list.appendChild(createEmptyState('No sheets match the current filters'));
    return;
  }

  data.forEach((s, index) => {
    const card = createSheetCard(s);
    card.style.setProperty('--card-index', index);
    list.appendChild(card);
  });
}

function populateFilters() {
  maqamSelect.innerHTML = '<option value="">All Maqamat</option>';
  scaleSelect.innerHTML = '<option value="">All Scales</option>';
  tonicSelect.innerHTML = '<option value="">All Tonics</option>';

  const systemVal = systemSelect.value;
  let data = sheets;

  if (systemVal === 'arabic') {
    data = sheets.filter(s => s.system === 'arabic');
  } else {
    data = sheets.filter(s => s.system === 'western');
  }

  const maqams = [...new Set(data.map(s => s.maqam).filter(Boolean))];
  const scales = [...new Set(data.map(s => s.scale).filter(Boolean))];
  const tonics = [...new Set(data.map(s => s.tonic).filter(Boolean))];

  maqams.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    maqamSelect.appendChild(opt);
  });

  scales.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    scaleSelect.appendChild(opt);
  });

  tonics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    tonicSelect.appendChild(opt);
  });
}

function applyFilters() {
  let filtered = sheets;

  const systemVal = systemSelect.value;
  const typeVal = typeSelect.value;
  const maqamVal = maqamSelect.value;
  const scaleVal = scaleSelect.value;
  const tonicVal = tonicSelect.value;
  const searchVal = normalize(searchInput.value);

  if (systemVal === 'arabic') {
    filtered = filtered.filter(s => s.system === 'arabic');
    maqamSelect.style.display = 'inline';
    scaleSelect.style.display = 'none';
  } else {
    filtered = filtered.filter(s => s.system === 'western');
    maqamSelect.style.display = 'none';
    scaleSelect.style.display = 'inline';
  }

  if (typeVal) {
    filtered = filtered.filter(s => s.type === typeVal);
  }

  if (maqamVal) {
    filtered = filtered.filter(s => s.maqam === maqamVal);
  }

  if (scaleVal) {
    filtered = filtered.filter(s => s.scale === scaleVal);
  }

  if (tonicVal) {
    filtered = filtered.filter(s => s.tonic === tonicVal);
  }

  if (searchVal) {
    filtered = filtered.filter(s =>
      normalize(s.title).includes(searchVal) ||
      normalize(s.composer).includes(searchVal) ||
      normalize(s.performer).includes(searchVal)
    );
  }

  render(filtered);
}

systemSelect.addEventListener('change', () => {
  populateFilters();
  applyFilters();
});

typeSelect.addEventListener('change', applyFilters);
maqamSelect.addEventListener('change', applyFilters);
scaleSelect.addEventListener('change', applyFilters);
tonicSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

populateFilters();
applyFilters();
```

## assets/ui.js
```javascript
// ============================================================
//  ui.js — Shared UI helpers for Musicatea
//  Used by: app.js, wiki.js
// ============================================================

/**
 * Creates a sheet music card element
 * @param {Object} s - sheet object from sheets.js
 * @returns {HTMLElement}
 */
function createSheetCard(s) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.system = s.system;
  card.dataset.maqam = s.maqam || '';

  // Maqam link or scale text
  const maqamDisplay = s.system === 'arabic' && s.maqam
    ? `<a href="maqam.html?id=${slugify(s.maqam)}" class="maqam-link" onclick="event.stopPropagation()">${s.maqam}</a>`
    : (s.scale || '');

  // Performer line only if exists
  const performerLine = s.performer
    ? `<p class="card-performer">${s.performer}</p>`
    : '';

  // Badge
  const badge = s.type === 'song'
    ? `<span class="badge badge-song">أغنية</span>`
    : `<span class="badge badge-inst">معزوفة</span>`;

  card.innerHTML = `
    <div class="card-header">
      <div class="card-title-row">
        <h3 class="card-title">${s.title}</h3>
        ${badge}
      </div>
      <p class="card-composer">${s.composer}</p>
      ${performerLine}
    </div>
    <div class="card-meta">
      <span class="card-maqam">${maqamDisplay}</span>
      ${s.tonic ? `<span class="card-tonic">${s.tonic}</span>` : ''}
    </div>
    <a href="${s.pdf}" target="_blank" class="download-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      تحميل النوتة
    </a>`;

  return card;
}

/**
 * Creates a maqam wiki card element
 * @param {Object} m - maqam object from maqamat.js
 * @returns {HTMLElement}
 */
function createMaqamCard(m) {
  const card = document.createElement('a');
  card.className = 'maqam-card';
  card.href = `maqam.html?id=${m.id}`;

  const feelings = m.feeling.slice(0, 3).map(f =>
    `<span class="feeling-tag">${f}</span>`
  ).join('');

  card.innerHTML = `
    <div class="maqam-card-accent" style="background:${m.mood_color}22;border-color:${m.mood_color}44"></div>
    <div class="maqam-card-body">
      <div class="maqam-name-row">
        <h3 class="maqam-name">${m.name}</h3>
        <span class="maqam-latin">${m.latin}</span>
      </div>
      <p class="maqam-desc">${m.description.slice(0, 100)}...</p>
      <div class="maqam-feelings">${feelings}</div>
      <div class="maqam-footer">
        <span class="maqam-examples-count">${m.examples.length} أمثلة</span>
        <span class="maqam-arrow">←</span>
      </div>
    </div>`;

  return card;
}

/**
 * Creates an expandable history section element
 * @param {Object} h - history object from history.js
 * @param {number} index - position index
 * @returns {HTMLElement}
 */
function createHistorySection(h, index) {
  const section = document.createElement('div');
  section.className = 'history-item';
  section.dataset.id = h.id;

  const highlights = h.highlights.map(hl =>
    `<span class="history-highlight">${hl}</span>`
  ).join('');

  section.innerHTML = `
    <button class="history-toggle" aria-expanded="false" onclick="toggleHistory(this)">
      <div class="history-toggle-left">
        <span class="history-index">${String(index + 1).padStart(2, '0')}</span>
        <div class="history-titles">
          <span class="history-title">${h.title}</span>
          <span class="history-subtitle">${h.subtitle}</span>
        </div>
      </div>
      <div class="history-toggle-right">
        <span class="history-period">${h.period}</span>
        <svg class="history-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </button>
    <div class="history-content" hidden>
      <p class="history-text">${h.content}</p>
      <div class="history-highlights">${highlights}</div>
    </div>`;

  return section;
}

/**
 * Toggle history accordion
 * @param {HTMLElement} btn
 */
function toggleHistory(btn) {
  const content = btn.nextElementSibling;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  content.hidden = isOpen;
  btn.querySelector('.history-chevron').style.transform = isOpen ? '' : 'rotate(180deg)';
}

/**
 * Convert Arabic maqam name to URL-safe id
 * Falls back to latin id lookup in maqamat array
 * @param {string} name - Arabic maqam name
 * @returns {string} id
 */
function slugify(name) {
  if (typeof maqamat === 'undefined') return name;
  const found = maqamat.find(m => m.name === name);
  return found ? found.id : name;
}

/**
 * Creates an empty state message
 * @param {string} message
 * @returns {HTMLElement}
 */
function createEmptyState(message) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <p>${message}</p>`;
  return div;
}

/**
 * Normalizes Arabic text for search
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u065F]/g, '');
}
```

## assets/maqamat.js
```javascript
// MAQAMAT INDEX PAGE LOGIC

const maqamatGrid = document.getElementById('maqamat-grid');
const searchInput = document.getElementById('maqam-search');

function createFamilyCard(maqam) {
  const card = document.createElement('div');
  card.className = 'maqam-family-card';
  card.style.setProperty('--family-color', maqam.mood_color);

  const subCount = maqam.sub_maqamat ? maqam.sub_maqamat.length : 0;
  const totalInFamily = subCount + 1;

  card.innerHTML = `
    <h3>${maqam.name}</h3>
    <span class="latin">${maqam.latin}</span>
    <p class="desc">${maqam.description}</p>
    <div class="meta">
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13M9 13l12-2"/>
        </svg>
        <div class="tonic-options">
          ${(maqam.tonic_options || []).map(t => `<span class="tonic-badge">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="family-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      عائلة ${maqam.name}
    </div>
    ${subCount > 0 ? `<div class="sub-count">${totalInFamily} مقامات في هذه العائلة</div>` : ''}
  `;

  card.addEventListener('click', () => {
    window.location.href = `maqam-family.html?family=${maqam.family}`;
  });

  return card;
}

function renderMaqamat(filter = '') {
  if (!maqamatGrid) return;
  maqamatGrid.innerHTML = '';
  const q = normalize(filter);

  const mainMaqamat = getMainMaqamat();
  const filtered = mainMaqamat.filter(m =>
    !q ||
    normalize(m.name).includes(q) ||
    normalize(m.latin).includes(q) ||
    normalize(m.description).includes(q) ||
    normalize(m.family).includes(q)
  );

  if (!filtered.length) {
    maqamatGrid.appendChild(createEmptyState('لا توجد مقامات مطابقة'));
    return;
  }

  filtered.forEach(m => maqamatGrid.appendChild(createFamilyCard(m)));
}

if (searchInput) {
  searchInput.addEventListener('input', e => renderMaqamat(e.target.value));
}

renderMaqamat();
```

## assets/wiki.js
```javascript
// ============================================================
//  wiki.js — Wiki page logic for Musicatea
//  Depends on: data/maqamat.js, data/history.js, assets/ui.js
// ============================================================

// ===== Maqam search =====
const wikiSearchInput = document.getElementById('wiki-search');
const maqamatGrid = document.getElementById('maqamat-grid');
const historyList  = document.getElementById('history-list');

function renderMaqamat(filter) {
  maqamatGrid.innerHTML = '';
  const q = normalize(filter || '');
  const filtered = maqamat.filter(m =>
    !q ||
    normalize(m.name).includes(q) ||
    normalize(m.latin).includes(q) ||
    m.feeling.some(f => normalize(f).includes(q))
  );

  if (!filtered.length) {
    maqamatGrid.appendChild(createEmptyState('لا توجد مقامات مطابقة'));
    return;
  }

  filtered.forEach(m => maqamatGrid.appendChild(createMaqamCard(m)));
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));
}

// ===== Init =====
if (wikiSearchInput) {
  wikiSearchInput.addEventListener('input', e => renderMaqamat(e.target.value));
}

renderMaqamat();
renderHistory();
```

