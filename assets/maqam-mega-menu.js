// assets/maqam-mega-menu.js
// Shared mega-menu for Arabic maqam families in the main navigation.

(function () {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  if (typeof getInteractiveMainMaqamat !== 'function' || typeof getInteractiveFamily !== 'function') return;

  const FAMILY_ORDER = [
    'saba',
    'nahawand',
    'ajam',
    'bayati',
    'sikah',
    'hijaz',
    'rast',
    'kurd',
    'nawa_athar'
  ];

  const CLOSE_DELAY_MS = 180;
  const DESKTOP_MAIN_LIST_WIDTH = 240;
  const DESKTOP_BRANCH_PANEL_WIDTH = 360;

  function injectMegaMenuOverrides() {
    if (document.getElementById('maqam-mega-menu-overrides')) return;

    const style = document.createElement('style');
    style.id = 'maqam-mega-menu-overrides';
    style.textContent = `
      .maqam-nav-item .maqam-mega-menu {
        box-sizing: border-box;
      }

      .maqam-nav-item .maqam-mega-shell {
        display: flex;
        flex-direction: row;
        align-items: stretch;
      }

      .maqam-nav-item .maqam-mega-main-grid {
        width: ${DESKTOP_MAIN_LIST_WIDTH}px;
        flex: 0 0 ${DESKTOP_MAIN_LIST_WIDTH}px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px 14px;
        overflow: visible;
        align-content: stretch;
        border-left: 1px solid rgba(255,255,255,0.06);
      }

      .maqam-nav-item .maqam-mega-main-item {
        min-height: 0;
        padding: 10px 12px;
        align-items: flex-start;
        justify-content: center;
      }

      .maqam-nav-item .maqam-mega-main-name {
        font-size: 0.98rem;
        line-height: 1.2;
      }

      .maqam-nav-item .maqam-mega-main-latin {
        font-size: 0.73rem;
      }

      .maqam-nav-item .maqam-mega-branch-panel {
        flex: 0 0 ${DESKTOP_BRANCH_PANEL_WIDTH}px;
        width: ${DESKTOP_BRANCH_PANEL_WIDTH}px;
        align-self: stretch;
        display: flex;
        flex-direction: column;
      }

      .maqam-nav-item .maqam-mega-branch-kicker {
        font-size: 0.92rem;
        font-weight: 900;
      }

      .maqam-nav-item .maqam-mega-branch-family-link {
        font-size: 1.26rem;
      }

      .maqam-nav-item .maqam-mega-branch-name {
        font-size: 0.86rem;
      }

      .maqam-nav-item .maqam-mega-branches {
        overflow: visible;
        padding-left: 2px;
        flex: 1 1 auto;
      }

      @media (max-width: 980px) {
        .nav-links a[href="index.html"],
        .nav-links a[data-home-link="true"] {
          display: none;
        }

        .nav-bottom {
          min-height: 48px;
          padding: 6px 0;
        }

        .nav-links {
          gap: 0;
        }

        .nav-links a,
        .maqam-nav-item > a {
          font-size: 0.74rem;
          padding: 6px 8px;
        }

        .lang-toggle {
          font-size: 0.72rem;
          padding: 5px 8px;
          gap: 6px;
        }

        .nav-logo {
          font-size: 1.82rem;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function isCompactViewport() {
    return window.matchMedia('(max-width: 980px)').matches;
  }

  function buildInteractiveLink(maqam) {
    return `interactive-scale.html?family=${maqam.family}&maqam=${maqam.id}`;
  }

  function getOrderedMainFamilies() {
    const raw = getInteractiveMainMaqamat();
    return FAMILY_ORDER.map(familyId => raw.find(item => item.family === familyId)).filter(Boolean);
  }

  function getDisplayBranches(mainMaqam) {
    return getInteractiveFamily(mainMaqam.family).filter(item => item.id !== mainMaqam.id);
  }

  function createMenuMarkup(mainFamilies) {
    const firstMain = mainFamilies[0];
    const firstBranches = firstMain ? getDisplayBranches(firstMain) : [];

    return `
      <div class="maqam-mega-menu" aria-hidden="true">
        <div class="maqam-mega-shell">
          <div class="maqam-mega-main-grid" id="maqam-mega-main-grid">
            ${mainFamilies.map((item, index) => `
              <a href="${buildInteractiveLink(item)}"
                 class="maqam-mega-main-item ${index === 0 ? 'active' : ''}"
                 data-family="${item.family}"
                 data-maqam-id="${item.id}">
                <span class="maqam-mega-main-name">${item.name}</span>
                <span class="maqam-mega-main-latin">${item.latin}</span>
              </a>
            `).join('')}
          </div>

          <div class="maqam-mega-branch-panel">
            <div class="maqam-mega-branch-head">
              <span class="maqam-mega-branch-kicker">فروع العائلة</span>
              <a href="${firstMain ? buildInteractiveLink(firstMain) : 'interactive-scale.html'}" class="maqam-mega-branch-family-link" id="maqam-mega-family-link">
                <span id="maqam-mega-family-name">${firstMain ? firstMain.name : ''}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"/>
                  <path d="M13 6l6 6-6 6"/>
                </svg>
              </a>
            </div>

            <div class="maqam-mega-branches" id="maqam-mega-branches">
              ${renderBranchItems(firstBranches)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderBranchItems(branches) {
    if (!branches.length) {
      return `<div class="maqam-mega-empty">لا توجد تفرعات إضافية ظاهرة لهذه العائلة.</div>`;
    }

    return branches.map(item => `
      <a href="${buildInteractiveLink(item)}" class="maqam-mega-branch-item">
        <span class="maqam-mega-branch-name">${item.name}</span>
        <span class="maqam-mega-branch-latin">${item.latin}</span>
      </a>
    `).join('');
  }

  function enhanceNavGroup(navLinks) {
    const triggerLink = navLinks.querySelector('[data-nav-maqamat="true"]') || [...navLinks.querySelectorAll('a')].find(link => link.getAttribute('href') === 'maqamat.html');
    if (!triggerLink || triggerLink.closest('.maqam-nav-item')) return;

    const mainFamilies = getOrderedMainFamilies();
    if (!mainFamilies.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'maqam-nav-item';
    triggerLink.parentNode.insertBefore(wrapper, triggerLink);
    wrapper.appendChild(triggerLink);
    wrapper.insertAdjacentHTML('beforeend', createMenuMarkup(mainFamilies));

    const menu = wrapper.querySelector('.maqam-mega-menu');
    const menuShell = wrapper.querySelector('.maqam-mega-shell');
    const familyLink = wrapper.querySelector('#maqam-mega-family-link');
    const familyName = wrapper.querySelector('#maqam-mega-family-name');
    const branchesBox = wrapper.querySelector('#maqam-mega-branches');
    const mainItems = [...wrapper.querySelectorAll('.maqam-mega-main-item')];

    let closeTimer = null;
    let activeFamilyId = mainFamilies[0].family;

    function clearCloseTimer() {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    function scheduleClose() {
      clearCloseTimer();
      closeTimer = window.setTimeout(() => {
        setOpen(false);
      }, CLOSE_DELAY_MS);
    }

    function applyMenuPlacement() {
      menu.style.display = 'block';
      menu.style.position = 'absolute';
      menu.style.top = '100%';
      menu.style.right = '0';
      menu.style.left = '';
      menu.style.width = 'min(640px, calc(100vw - 40px))';
      menu.style.paddingTop = '14px';
      menu.style.maxHeight = '';
      menu.style.overflow = '';
      menu.style.zIndex = '';
    }

    function setOpen(isOpen) {
      if (isOpen) {
        applyMenuPlacement();
      }

      wrapper.classList.toggle('is-open', isOpen);
      menu.setAttribute('aria-hidden', String(!isOpen));

      if (!isOpen) {
        clearCloseTimer();
      }
    }

    function setActiveFamily(familyId) {
      const main = mainFamilies.find(item => item.family === familyId);
      if (!main) return;

      activeFamilyId = familyId;
      mainItems.forEach(item => item.classList.toggle('active', item.dataset.family === familyId));
      familyLink.href = buildInteractiveLink(main);
      familyName.textContent = main.name;
      branchesBox.innerHTML = renderBranchItems(getDisplayBranches(main));
    }

    wrapper.addEventListener('mouseenter', () => {
      clearCloseTimer();
      setOpen(true);
    });

    wrapper.addEventListener('mouseleave', () => {
      scheduleClose();
    });

    wrapper.addEventListener('focusin', () => {
      clearCloseTimer();
      setOpen(true);
    });

    wrapper.addEventListener('focusout', (event) => {
      if (!wrapper.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });

    menu.addEventListener('mouseenter', clearCloseTimer);
    menu.addEventListener('mouseleave', scheduleClose);

    triggerLink.addEventListener('click', (event) => {
      event.preventDefault();
      clearCloseTimer();
      setOpen(!wrapper.classList.contains('is-open'));
      setActiveFamily(activeFamilyId);
    });

    mainItems.forEach(item => {
      item.addEventListener('mouseenter', () => setActiveFamily(item.dataset.family));
      item.addEventListener('focus', () => setActiveFamily(item.dataset.family));
      item.addEventListener('click', () => {
        setOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!wrapper.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });

    if (menuShell) {
      menuShell.addEventListener('click', (event) => {
        const branchLink = event.target.closest('.maqam-mega-branch-item, .maqam-mega-branch-family-link');
        if (branchLink) {
          setOpen(false);
        }
      });
    }
  }

  function initMegaMenu() {
    injectMegaMenuOverrides();

    if (isCompactViewport()) {
      return;
    }

    const navGroups = document.querySelectorAll('.nav-links');
    navGroups.forEach(enhanceNavGroup);
  }

  initMegaMenu();
})();
