(() => {
  if (typeof document === 'undefined') return;

  const pathname = window.location.pathname;
  const fileName = pathname.split('/').pop() || 'index.html';
  const isHomePage = fileName === 'index.html' || fileName === 'index-en.html' || pathname === '/' || pathname.endsWith('/');
  const isLibraryPage = fileName === 'library.html' || fileName === 'library-en.html';
  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  if (isHomePage) document.body.classList.add('home-page');
  if (isLibraryPage) document.body.classList.add('mt-library-mobile');

  const style = document.createElement('style');
  style.textContent = `
    .mt-mobile-more-nav { position: relative; display: none; }
    .mt-mobile-more-toggle {
      color: var(--text-muted);
      font: inherit;
      font-size: 0.8rem;
      font-weight: 800;
      padding: 6px 11px;
      border-radius: 9px;
      border: 1px solid rgba(200,164,90,0.2);
      background: rgba(200,164,90,0.08);
      white-space: nowrap;
    }
    .mt-mobile-more-toggle[aria-expanded="true"] {
      color: var(--gold-light);
      border-color: rgba(200,164,90,0.38);
      background: rgba(200,164,90,0.15);
    }
    .mt-mobile-more-menu {
      position: absolute;
      top: calc(100% + 8px);
      inset-inline-end: 0;
      z-index: 500;
      min-width: 190px;
      padding: 8px;
      border-radius: 14px;
      border: 1px solid rgba(200,164,90,0.2);
      background: rgba(12,12,15,0.985);
      box-shadow: 0 18px 34px rgba(0,0,0,0.36);
      display: grid;
      gap: 4px;
    }
    .mt-mobile-more-menu a,
    .mt-mobile-more-menu .maqam-nav-item > a {
      width: 100%;
      text-align: start;
      justify-content: flex-start;
    }
    @media (max-width: 640px) {
      body:not(.home-page) .site-nav .nav-top,
      body:not(.home-page) .site-nav .nav-top-home {
        min-height: auto;
        padding: 7px 0 8px;
      }
      body:not(.home-page) .site-nav .nav-main-group {
        gap: 7px;
      }
      body:not(.home-page) .site-nav .nav-logo {
        font-size: 1.55rem;
        gap: 7px;
      }
      body:not(.home-page) .site-nav .nav-logo-mark {
        width: 28px;
        height: 28px;
      }
      body:not(.home-page) .site-nav .nav-links {
        gap: 4px;
        align-items: center;
      }
      body:not(.home-page) .site-nav .nav-links > a {
        padding: 6px 9px;
        font-size: 0.78rem;
      }
      body:not(.home-page) .site-nav .mt-mobile-more-nav {
        display: inline-flex;
      }
      body.mt-library-mobile .filters {
        position: static !important;
        top: auto !important;
        z-index: 1 !important;
      }
    }
  `;
  document.head.appendChild(style);

  function isVisiblePrimaryLink(link) {
    const href = link.getAttribute('href') || '';
    const text = (link.textContent || '').trim().toLowerCase();
    return link.hasAttribute('data-home-link')
      || href === 'index.html'
      || href === 'index-en.html'
      || href.includes('library.html')
      || href.includes('library-en.html')
      || text.includes('الصفحة الرئيسية')
      || text.includes('home')
      || text.includes('مكتبة النوتات')
      || text.includes('sheet library')
      || text === 'library';
  }

  function compactMobileNav() {
    if (!isMobile || isHomePage) return;

    const navLinks = document.querySelector('.site-nav .nav-links');
    if (!navLinks || navLinks.dataset.mobileCompactReady === 'true') return;

    const directItems = Array.from(navLinks.children);
    const moreItems = directItems.filter((item) => {
      const link = item.matches('a') ? item : item.querySelector('a');
      return link && !isVisiblePrimaryLink(link);
    });

    if (!moreItems.length) return;

    const isArabic = (document.documentElement.lang || '').toLowerCase().startsWith('ar') || document.documentElement.dir === 'rtl';
    const wrapper = document.createElement('div');
    wrapper.className = 'mt-mobile-more-nav';
    wrapper.innerHTML = `
      <button type="button" class="mt-mobile-more-toggle" aria-expanded="false">${isArabic ? 'للمزيد' : 'More'}</button>
      <div class="mt-mobile-more-menu" hidden></div>
    `;

    const menu = wrapper.querySelector('.mt-mobile-more-menu');
    moreItems.forEach((item) => menu.appendChild(item));
    navLinks.appendChild(wrapper);
    navLinks.dataset.mobileCompactReady = 'true';

    const toggle = wrapper.querySelector('.mt-mobile-more-toggle');
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.hidden = isOpen;
    });

    document.addEventListener('click', (event) => {
      if (!wrapper.contains(event.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', compactMobileNav);
  } else {
    compactMobileNav();
  }
})();
