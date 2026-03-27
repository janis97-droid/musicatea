# Musicatea – Maqamat Pages Snapshot

**Repo:** janis97-droid/musicatea | **Branch:** main

Files included: Arabic maqamat pages + English maqamat pages + maqamat data/JS.

---

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

## data/maqamat.js
```javascript
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
```

## data/maqamat-en.js
```javascript
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
```

