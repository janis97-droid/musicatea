(() => {
  if (typeof document === 'undefined') return;

  const doc = document.documentElement;
  const isArabic = (doc.lang || '').toLowerCase().startsWith('ar') || (doc.dir || '').toLowerCase() === 'rtl';
  const path = window.location.pathname;
  const fileName = path.split('/').pop() || 'index.html';
  const isLibraryPage = fileName === 'library.html' || fileName === 'library-en.html';

  if (isLibraryPage) document.body.classList.add('mt-library-mobile');

  const style = document.createElement('style');
  style.textContent = `
    .mt-accessibility-launcher{position:fixed;right:18px;bottom:18px;z-index:1200;width:52px;height:52px;border-radius:999px;border:1px solid rgba(200,164,90,.34);background:rgba(15,15,18,.96);color:var(--gold-light,#e2c07a);box-shadow:0 16px 36px rgba(0,0,0,.28);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(12px)}
    .mt-accessibility-launcher svg{width:22px;height:22px}.mt-accessibility-panel{position:fixed;right:18px;bottom:82px;z-index:1200;width:min(320px,calc(100vw - 28px));border-radius:18px;border:1px solid rgba(200,164,90,.18);background:rgba(15,15,18,.98);color:var(--text,#ede8dc);box-shadow:0 24px 48px rgba(0,0,0,.34);padding:18px;display:none;direction:${isArabic ? 'rtl' : 'ltr'};text-align:${isArabic ? 'right' : 'left'}}
    .mt-accessibility-panel.is-open{display:block}.mt-accessibility-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}.mt-accessibility-head h2{margin:0 0 4px;font-size:1rem;color:var(--gold-light,#e2c07a)}.mt-accessibility-head p{margin:0;font-size:.82rem;color:var(--text-muted,#ebe9ce);line-height:1.7}.mt-accessibility-close{width:34px;height:34px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:var(--text-muted,#ebe9ce)}.mt-accessibility-options{display:grid;gap:10px}.mt-accessibility-option{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02)}.mt-switch{position:relative;width:46px;height:26px;border-radius:999px;border:1px solid rgba(200,164,90,.24);background:rgba(255,255,255,.08);cursor:pointer;flex-shrink:0}.mt-switch::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:999px;background:var(--gold-light,#e2c07a);transition:transform .2s ease}.mt-switch[aria-checked=true]::after{transform:translateX(20px)}html[dir=rtl] .mt-switch[aria-checked=true]::after{transform:translateX(-20px)}.mt-accessibility-reset{margin-top:14px;width:100%;min-height:42px;border-radius:12px;border:1px solid rgba(200,164,90,.22);background:rgba(200,164,90,.12);color:var(--gold-light,#e2c07a);font-weight:800}.mt-large-text body{font-size:1.08rem}.mt-large-text p,.mt-large-text li,.mt-large-text a,.mt-large-text button,.mt-large-text input,.mt-large-text textarea,.mt-large-text select{font-size:1.05em}.mt-high-contrast{--bg:#000;--bg2:#050505;--bg3:#0a0a0a;--surface:rgba(255,255,255,.09);--surface2:rgba(255,255,255,.14);--border:rgba(255,255,255,.18);--border2:rgba(255,255,255,.28);--text:#fff;--text-muted:#f6f1db;--text-dim:rgba(255,255,255,.7);--gold:#f0c96a;--gold-light:#ffe4a3;--gold-dim:rgba(240,201,106,.2)}.mt-underline-links a{text-decoration:underline!important;text-underline-offset:3px}.mt-reduce-motion *,.mt-reduce-motion *::before,.mt-reduce-motion *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
    .mt-mobile-more-nav{position:relative;display:inline-flex;align-items:center}.mt-mobile-more-toggle{color:var(--text-muted);font:inherit;font-size:.92rem;font-weight:900;padding:8px 15px;border-radius:10px;border:1px solid rgba(200,164,90,.22);background:rgba(200,164,90,.08);white-space:nowrap}.mt-mobile-more-toggle[aria-expanded=true]{color:var(--gold-light);border-color:rgba(200,164,90,.42);background:rgba(200,164,90,.16)}.mt-mobile-more-menu{position:absolute;top:calc(100% + 10px);inset-inline-end:0;z-index:500;min-width:220px;padding:8px;border-radius:15px;border:1px solid rgba(200,164,90,.2);background:rgba(12,12,15,.985);box-shadow:0 18px 34px rgba(0,0,0,.36);display:grid;gap:4px}.mt-mobile-more-menu[hidden]{display:none!important}.mt-mobile-more-menu a,.mt-mobile-more-menu .maqam-nav-item>a{width:100%;text-align:start;justify-content:flex-start}.site-nav .nav-links{align-items:center}.site-nav .nav-links>a{font-size:1rem;font-weight:800;padding:9px 16px}.site-nav .nav-main-group{flex-direction:row!important;align-items:center!important}.site-nav .nav-top,.site-nav .nav-top-home{min-height:82px;display:flex;align-items:center;justify-content:space-between}.site-nav .nav-top-left{margin-inline-start:auto;display:flex;align-items:center;justify-content:flex-end;flex-shrink:0}.site-nav .lang-toggle{white-space:nowrap}.site-nav .nav-logo{font-size:2.7rem}.site-nav .nav-logo-mark{width:46px;height:46px}
    @media(max-width:980px){.site-nav .nav-top,.site-nav .nav-top-home{min-height:auto;padding:8px 0}.site-nav .nav-main-group{flex-direction:row!important;align-items:center!important;gap:12px}.site-nav .nav-logo{font-size:1.85rem}.site-nav .nav-logo-mark{width:32px;height:32px}.site-nav .nav-links{gap:4px}.site-nav .nav-links>a{font-size:.84rem;padding:7px 10px}.site-nav .mt-mobile-more-toggle{font-size:.82rem;padding:7px 11px}.site-nav .mt-mobile-more-menu{min-width:190px}.site-nav .lang-toggle{padding:6px 10px;font-size:.75rem}}
    @media(max-width:640px){.mt-accessibility-launcher{right:14px;bottom:14px;width:48px;height:48px}.mt-accessibility-panel{right:14px;bottom:72px;width:min(320px,calc(100vw - 20px))}.site-nav .nav-top,.site-nav .nav-top-home{min-height:auto;padding:7px 0 8px}.site-nav .nav-main-group{gap:7px}.site-nav .nav-logo{font-size:1.55rem;gap:7px}.site-nav .nav-logo-mark{width:28px;height:28px}.site-nav .nav-links{gap:4px;align-items:center}.site-nav .nav-links>a{padding:6px 9px;font-size:.78rem}.site-nav .mt-mobile-more-toggle{padding:6px 10px;font-size:.78rem}.site-nav .nav-top-left{position:absolute;inset-inline-start:4%;top:8px}.site-nav .lang-toggle{padding:6px 10px;font-size:.75rem}body.mt-library-mobile .filters{position:static!important;top:auto!important;z-index:1!important}}
  `;
  document.head.appendChild(style);

  function initAccessibility() {
    if (document.getElementById('mt-accessibility-root')) return;
    const labels = isArabic
      ? { button:'إعدادات الوصول', title:'إعدادات الوصول', subtitle:'خيارات بسيطة لتحسين القراءة والتصفح', largeText:'تكبير الخط', highContrast:'تباين عالٍ', underlineLinks:'إبراز الروابط', reduceMotion:'تقليل الحركة', reset:'إعادة الضبط', close:'إغلاق' }
      : { button:'Accessibility settings', title:'Accessibility', subtitle:'Simple options to improve reading and navigation', largeText:'Larger text', highContrast:'High contrast', underlineLinks:'Underline links', reduceMotion:'Reduce motion', reset:'Reset', close:'Close' };

    const root = document.createElement('div');
    root.id = 'mt-accessibility-root';
    root.innerHTML = `<button type="button" class="mt-accessibility-launcher" aria-label="${labels.button}" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="4" r="1.5"></circle><path d="M12 6.5v5"></path><path d="M8 10h8"></path><path d="M9.5 21l1.5-6"></path><path d="M14.5 21L13 15"></path><path d="M8.5 13l3.5 2 3.5-2"></path></svg></button><section class="mt-accessibility-panel" aria-hidden="true"><div class="mt-accessibility-head"><div><h2>${labels.title}</h2><p>${labels.subtitle}</p></div><button type="button" class="mt-accessibility-close" aria-label="${labels.close}">×</button></div><div class="mt-accessibility-options"></div><button type="button" class="mt-accessibility-reset">${labels.reset}</button></section>`;
    document.body.appendChild(root);

    const storageKey = 'musicatea-accessibility-settings';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch {}

    const opts = [
      ['largeText','mt-large-text',labels.largeText],
      ['highContrast','mt-high-contrast',labels.highContrast],
      ['underlineLinks','mt-underline-links',labels.underlineLinks],
      ['reduceMotion','mt-reduce-motion',labels.reduceMotion]
    ];
    const controls = {};
    function apply(){opts.forEach(([k,c])=>{doc.classList.toggle(c,!!saved[k]);if(controls[k])controls[k].setAttribute('aria-checked',String(!!saved[k]));});}
    function persist(){localStorage.setItem(storageKey,JSON.stringify(saved));}
    const wrap = root.querySelector('.mt-accessibility-options');
    opts.forEach(([k,,label])=>{const row=document.createElement('div');row.className='mt-accessibility-option';row.innerHTML=`<span>${label}</span><button type="button" class="mt-switch" role="switch" aria-checked="false" aria-label="${label}"></button>`;const btn=row.querySelector('.mt-switch');btn.addEventListener('click',()=>{saved[k]=!saved[k];persist();apply();});controls[k]=btn;wrap.appendChild(row);});

    const launcher = root.querySelector('.mt-accessibility-launcher');
    const panel = root.querySelector('.mt-accessibility-panel');
    function open(force){const will=typeof force==='boolean'?force:!panel.classList.contains('is-open');panel.classList.toggle('is-open',will);panel.setAttribute('aria-hidden',String(!will));launcher.setAttribute('aria-expanded',String(will));}
    launcher.addEventListener('click',()=>open());
    root.querySelector('.mt-accessibility-close').addEventListener('click',()=>open(false));
    root.querySelector('.mt-accessibility-reset').addEventListener('click',()=>{opts.forEach(([k])=>delete saved[k]);persist();apply();});
    document.addEventListener('click',e=>{if(!root.contains(e.target)&&panel.classList.contains('is-open'))open(false);});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')open(false);});
    apply();
  }

  function alternateHref() {
    const target = isArabic ? 'en' : 'ar';
    const alt = document.querySelector(`link[rel="alternate"][hreflang="${target}"]`);
    if (alt && alt.href) return alt.href;

    const map = {
      'index.html': isArabic ? 'index-en.html' : 'index.html',
      '': isArabic ? 'index-en.html' : 'index.html',
      'arabic-music-intro.html': 'arabic-music-intro-en.html',
      'arabic-music-intro-en.html': 'arabic-music-intro.html',
      'library.html': 'library-en.html',
      'library-en.html': 'library.html',
      'maqamat.html': 'maqamat-en.html',
      'maqamat-en.html': 'maqamat.html',
      'rhythms.html': 'rhythms-en.html',
      'rhythms-en.html': 'rhythms.html',
      'history.html': 'history-en.html',
      'history-en.html': 'history.html',
      'about.html': 'about-en.html',
      'about-en.html': 'about.html',
      'contact.html': 'contact-en.html',
      'contact-en.html': 'contact.html',
      'privacy.html': 'privacy-en.html',
      'privacy-en.html': 'privacy.html',
      'ensemble.html': 'ensemble-en.html',
      'ensemble-en.html': 'ensemble.html'
    };
    return map[fileName] || (isArabic ? 'index-en.html' : 'index.html');
  }

  function ensureLangToggle() {
    const navTop = document.querySelector('.site-nav .nav-top');
    if (!navTop) return;

    let left = navTop.querySelector('.nav-top-left');
    if (!left) {
      left = document.createElement('div');
      left.className = 'nav-top-left';
      navTop.appendChild(left);
    }

    if (left.querySelector('.lang-toggle')) return;

    const link = document.createElement('a');
    link.href = alternateHref();
    link.className = 'lang-toggle';
    link.setAttribute('aria-label', isArabic ? 'Switch to English' : 'التبديل إلى العربية');
    link.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg><span>${isArabic ? 'EN' : 'عربي'}</span>`;
    left.appendChild(link);
  }

  function primaryLink(link) {
    const href = link.getAttribute('href') || '';
    const text = (link.textContent || '').trim().toLowerCase();
    return link.hasAttribute('data-home-link')
      || link.hasAttribute('data-nav-maqamat')
      || href === 'index.html'
      || href === 'index-en.html'
      || href.includes('library.html')
      || href.includes('library-en.html')
      || href.includes('maqamat.html')
      || href.includes('maqamat-en.html')
      || text.includes('الصفحة الرئيسية')
      || text.includes('home')
      || text.includes('مكتبة النوتات')
      || text.includes('sheet library')
      || text.includes('مقاماتي')
      || text.includes('maqamat')
      || text === 'library';
  }

  function compactNav() {
    const navLinks = document.querySelector('.site-nav .nav-links');
    if (!navLinks || navLinks.dataset.mobileCompactReady === 'true') return;

    const items = Array.from(navLinks.children);
    const more = items.filter(item => {
      const link = item.matches('a') ? item : item.querySelector('a');
      return link && !primaryLink(link);
    });
    if (!more.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'mt-mobile-more-nav';
    wrapper.innerHTML = `<button type="button" class="mt-mobile-more-toggle" aria-expanded="false">${isArabic ? 'للمزيد' : 'More'}</button><div class="mt-mobile-more-menu" hidden></div>`;
    const menu = wrapper.querySelector('.mt-mobile-more-menu');
    more.forEach(item => menu.appendChild(item));
    navLinks.appendChild(wrapper);
    navLinks.dataset.mobileCompactReady = 'true';

    const toggle = wrapper.querySelector('.mt-mobile-more-toggle');
    function closeMenu(){toggle.setAttribute('aria-expanded','false');menu.hidden=true;}
    function openMenu(){toggle.setAttribute('aria-expanded','true');menu.hidden=false;}
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu(); else openMenu();
    });
    menu.addEventListener('click', event => event.stopPropagation());
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  function init(){ensureLangToggle();initAccessibility();compactNav();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
