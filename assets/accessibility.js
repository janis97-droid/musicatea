(() => {
  if (typeof document === 'undefined' || document.getElementById('mt-accessibility-root')) return;

  const doc = document.documentElement;
  const isArabic = (doc.lang || '').toLowerCase().startsWith('ar') || (doc.dir || '').toLowerCase() === 'rtl';
  const storageKey = 'musicatea-accessibility-settings';
  const labels = isArabic
    ? {
        button: 'إعدادات الوصول',
        title: 'إعدادات الوصول',
        subtitle: 'خيارات بسيطة لتحسين القراءة والتصفح',
        largeText: 'تكبير الخط',
        highContrast: 'تباين عالٍ',
        underlineLinks: 'إبراز الروابط',
        reduceMotion: 'تقليل الحركة',
        reset: 'إعادة الضبط',
        close: 'إغلاق'
      }
    : {
        button: 'Accessibility settings',
        title: 'Accessibility',
        subtitle: 'Simple options to improve reading and navigation',
        largeText: 'Larger text',
        highContrast: 'High contrast',
        underlineLinks: 'Underline links',
        reduceMotion: 'Reduce motion',
        reset: 'Reset',
        close: 'Close'
      };

  const style = document.createElement('style');
  style.textContent = `
    .mt-accessibility-launcher {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 1200;
      width: 52px;
      height: 52px;
      border-radius: 999px;
      border: 1px solid rgba(200,164,90,0.34);
      background: rgba(15,15,18,0.96);
      color: var(--gold-light, #e2c07a);
      box-shadow: 0 16px 36px rgba(0,0,0,0.28);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform .2s ease, background .2s ease, border-color .2s ease;
      backdrop-filter: blur(12px);
    }
    .mt-accessibility-launcher:hover {
      transform: translateY(-1px);
      background: rgba(22,22,26,0.98);
      border-color: rgba(200,164,90,0.5);
    }
    .mt-accessibility-launcher svg { width: 22px; height: 22px; }
    .mt-accessibility-panel {
      position: fixed;
      right: 18px;
      bottom: 82px;
      z-index: 1200;
      width: min(320px, calc(100vw - 28px));
      border-radius: 18px;
      border: 1px solid rgba(200,164,90,0.18);
      background: rgba(15,15,18,0.98);
      color: var(--text, #ede8dc);
      box-shadow: 0 24px 48px rgba(0,0,0,0.34);
      padding: 18px;
      display: none;
      direction: ${isArabic ? 'rtl' : 'ltr'};
      text-align: ${isArabic ? 'right' : 'left'};
    }
    .mt-accessibility-panel.is-open { display: block; }
    .mt-accessibility-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .mt-accessibility-head h2 { margin:0 0 4px; font-size:1rem; color: var(--gold-light, #e2c07a); }
    .mt-accessibility-head p { margin:0; font-size:.82rem; color: var(--text-muted, #ebe9ce); line-height:1.7; }
    .mt-accessibility-close {
      width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03); color: var(--text-muted, #ebe9ce); display:inline-flex; align-items:center; justify-content:center;
    }
    .mt-accessibility-options { display:grid; gap:10px; }
    .mt-accessibility-option {
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      padding: 10px 12px; border-radius: 12px; border:1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02);
    }
    .mt-accessibility-option span { font-size:.92rem; }
    .mt-switch {
      position: relative; width: 46px; height: 26px; border-radius: 999px; border:1px solid rgba(200,164,90,0.24); background: rgba(255,255,255,0.08);
      cursor: pointer; flex-shrink: 0;
    }
    .mt-switch::after {
      content:''; position:absolute; top:3px; left:3px; width:18px; height:18px; border-radius:999px; background: var(--gold-light, #e2c07a); transition: transform .2s ease;
    }
    .mt-switch[aria-checked="true"] { background: rgba(200,164,90,0.18); }
    .mt-switch[aria-checked="true"]::after { transform: translateX(20px); }
    html[dir="rtl"] .mt-switch[aria-checked="true"]::after { transform: translateX(-20px); }
    .mt-accessibility-reset {
      margin-top: 14px; width:100%; min-height:42px; border-radius: 12px; border:1px solid rgba(200,164,90,0.22);
      background: rgba(200,164,90,0.12); color: var(--gold-light, #e2c07a); font-weight: 800;
    }
    .mt-large-text { font-size: 18px; }
    .mt-large-text body { font-size: 1.08rem; }
    .mt-large-text p, .mt-large-text li, .mt-large-text a, .mt-large-text button, .mt-large-text input, .mt-large-text textarea, .mt-large-text select { font-size: 1.05em; }
    .mt-high-contrast {
      --bg: #000000;
      --bg2: #050505;
      --bg3: #0a0a0a;
      --surface: rgba(255,255,255,0.09);
      --surface2: rgba(255,255,255,0.14);
      --border: rgba(255,255,255,0.18);
      --border2: rgba(255,255,255,0.28);
      --text: #ffffff;
      --text-muted: #f6f1db;
      --text-dim: rgba(255,255,255,0.7);
      --gold: #f0c96a;
      --gold-light: #ffe4a3;
      --gold-dim: rgba(240,201,106,0.2);
    }
    .mt-underline-links a { text-decoration: underline !important; text-underline-offset: 3px; }
    .mt-reduce-motion *, .mt-reduce-motion *::before, .mt-reduce-motion *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    @media (max-width: 640px) {
      .mt-accessibility-launcher { right: 14px; bottom: 14px; width: 48px; height: 48px; }
      .mt-accessibility-panel { right: 14px; bottom: 72px; width: min(320px, calc(100vw - 20px)); }
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'mt-accessibility-root';
  root.innerHTML = `
    <button type="button" class="mt-accessibility-launcher" aria-label="${labels.button}" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="4" r="1.5"></circle>
        <path d="M12 6.5v5"></path>
        <path d="M8 10h8"></path>
        <path d="M9.5 21l1.5-6"></path>
        <path d="M14.5 21L13 15"></path>
        <path d="M8.5 13l3.5 2 3.5-2"></path>
      </svg>
    </button>
    <section class="mt-accessibility-panel" aria-hidden="true">
      <div class="mt-accessibility-head">
        <div>
          <h2>${labels.title}</h2>
          <p>${labels.subtitle}</p>
        </div>
        <button type="button" class="mt-accessibility-close" aria-label="${labels.close}">×</button>
      </div>
      <div class="mt-accessibility-options"></div>
      <button type="button" class="mt-accessibility-reset">${labels.reset}</button>
    </section>
  `;
  document.body.appendChild(root);

  const launcher = root.querySelector('.mt-accessibility-launcher');
  const panel = root.querySelector('.mt-accessibility-panel');
  const closeBtn = root.querySelector('.mt-accessibility-close');
  const optionsWrap = root.querySelector('.mt-accessibility-options');
  const resetBtn = root.querySelector('.mt-accessibility-reset');

  const options = [
    { key: 'largeText', className: 'mt-large-text', label: labels.largeText },
    { key: 'highContrast', className: 'mt-high-contrast', label: labels.highContrast },
    { key: 'underlineLinks', className: 'mt-underline-links', label: labels.underlineLinks },
    { key: 'reduceMotion', className: 'mt-reduce-motion', label: labels.reduceMotion }
  ];

  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  })();

  const controls = {};

  function applySettings() {
    options.forEach(option => {
      const enabled = !!saved[option.key];
      doc.classList.toggle(option.className, enabled);
      if (controls[option.key]) controls[option.key].setAttribute('aria-checked', String(enabled));
    });
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }

  options.forEach(option => {
    const row = document.createElement('div');
    row.className = 'mt-accessibility-option';
    row.innerHTML = `<span>${option.label}</span><button type="button" class="mt-switch" role="switch" aria-checked="false" aria-label="${option.label}"></button>`;
    const switchBtn = row.querySelector('.mt-switch');
    switchBtn.addEventListener('click', () => {
      saved[option.key] = !saved[option.key];
      persist();
      applySettings();
    });
    controls[option.key] = switchBtn;
    optionsWrap.appendChild(row);
  });

  function openPanel(force) {
    const willOpen = typeof force === 'boolean' ? force : !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', willOpen);
    panel.setAttribute('aria-hidden', String(!willOpen));
    launcher.setAttribute('aria-expanded', String(willOpen));
  }

  launcher.addEventListener('click', () => openPanel());
  closeBtn.addEventListener('click', () => openPanel(false));
  resetBtn.addEventListener('click', () => {
    options.forEach(option => { delete saved[option.key]; });
    persist();
    applySettings();
  });
  document.addEventListener('click', event => {
    if (!root.contains(event.target) && panel.classList.contains('is-open')) openPanel(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.classList.contains('is-open')) openPanel(false);
  });

  applySettings();
})();
