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
  const DESKTOP_MAIN_LIST_WIDTH = 220;
  const DESKTOP_BRANCH_PANEL_WIDTH = 340;
  const VIEWPORT_BREAKPOINT_QUERY = '(max-width: 980px)';
  const RESIZE_REINIT_DELAY_MS = 120;
  const COMPACT_ITEM_HEIGHT = 52;

  let resizeReinitTimer = null;

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
        gap: 6px;
        padding: 12px 10px;
        overflow: visible;
        align-content: stretch;
        border-left: 1px solid rgba(255,255,255,0.06);
      }

      .maqam-nav-item .maqam-mega-main-item {
        min-height: ${COMPACT_ITEM_HEIGHT}px;
        height: ${COMPACT_ITEM_HEIGHT}px;
        padding: 6px 10px;
        align-items: flex-start;
        justify-content: center;
        gap: 1px;
        border-radius: 11px;
      }

      .maqam-nav-item .maqam-mega-main-name {
        font-size: 0.9rem;
        line-height: 1.15;
      }

      .maqam-nav-item .maqam-mega-main-latin {
        font-size: 0.68rem;
        line-height: 1.1;
      }

      .maqam-nav-item .maqam-mega-branch-panel {
        flex: 0 0 ${DESKTOP_BRANCH_PANEL_WIDTH}px;
        width: ${DESKTOP_BRANCH_PANEL_WIDTH}px;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        padding: 12px;
        gap: 10px;
      }

      .maqam-nav-item .maqam-mega-branch-kicker {
        font-size: 0.86rem;
        font-weight: 900;
      }

      .maqam-nav-item .maqam-mega-branch-family-link {
        font-size: 1.08rem;
      }

      .maqam-nav-item .maqam-mega-branch-name {
        font-size: 0.84rem;
        line-height: 1.15;
      }

      .maqam-nav-item .maqam-mega-branch-latin {
        font-size: 0.68rem;
        line-height: 1.1;
      }

      .maqam-nav-item .maqam-mega-branches {
        overflow: visible;
        padding-left: 2px;
        flex: 1 1 auto;
        gap: 6px;
      }

      .maqam-nav-item .maqam-mega-branch-item {
        min-height: ${COMPACT_ITEM_HEIGHT}px;
        height: ${COMPACT_ITEM_HEIGHT}px;
        padding: 6px 10px;
        justify-content: center;
        gap: 1px;
        border-radius: 11px;
      }

      .maqam-nav-item .maqam-mega-empty {
        min-height: ${COMPACT_ITEM_HEIGHT}px;
        display: flex;
        align-items: center;
        padding: 8px 10px;
        font-size: 0.78rem;
        line-height: 1.5;
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
    return window.matchMedia(VIEWPORT_BREAKPOINT_QUERY).matches;
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

  function getTriggerLink(navLinks) {
    return navLinks.querySelector('[data-nav-maqamat="true"]')
      || [...navLinks.querySelectorAll('a')].find(link => link.getAttribute('href') === 'maqamat.html')
      || null;
  }

  function destroyEnhancedNavGroup(navLinks) {
    const wrapper = navLinks.querySelector('.maqam-nav-item');
    if (!wrapper) return;

    if (typeof wrapper._maqamMegaCleanup === 'function') {
      wrapper._maqamMegaCleanup();
    }

    const triggerLink = wrapper.firstElementChild && wrapper.firstElementChild.tagName === 'A'
      ? wrapper.firstElementChild
      : wrapper.querySelector('a');
    if (triggerLink) {
      const cleanTriggerLink = triggerLink.cloneNode(true);
      wrapper.parentNode.insertBefore(cleanTriggerLink, wrapper);
    }

    wrapper.remove();
  }

  function enhanceNavGroup(navLinks) {
    const triggerLink = getTriggerLink(navLinks);
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
      menu.style.width = 'min(600px, calc(100vw - 40px))';
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

    const handleWrapperMouseEnter = () => {
      clearCloseTimer();
      setOpen(true);
    };

    const handleWrapperMouseLeave = () => {
      scheduleClose();
    };

    const handleWrapperFocusIn = () => {
      clearCloseTimer();
      setOpen(true);
    };

    const handleWrapperFocusOut = (event) => {
      if (!wrapper.contains(event.relatedTarget)) {
        setOpen(false);
      }
    };

    const handleTriggerClick = (event) => {
      event.preventDefault();
      clearCloseTimer();
      setOpen(!wrapper.classList.contains('is-open'));
      setActiveFamily(activeFamilyId);
    };

    const handleDocumentClick = (event) => {
      if (!wrapper.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleDocumentKeydown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleMenuShellClick = (event) => {
      const branchLink = event.target.closest('.maqam-mega-branch-item, .maqam-mega-branch-family-link');
      if (branchLink) {
        setOpen(false);
      }
    };

    wrapper.addEventListener('mouseenter', handleWrapperMouseEnter);
    wrapper.addEventListener('mouseleave', handleWrapperMouseLeave);
    wrapper.addEventListener('focusin', handleWrapperFocusIn);
    wrapper.addEventListener('focusout', handleWrapperFocusOut);

    menu.addEventListener('mouseenter', clearCloseTimer);
    menu.addEventListener('mouseleave', scheduleClose);

    triggerLink.addEventListener('click', handleTriggerClick);

    const mainItemListeners = mainItems.map(item => {
      const handleItemEnter = () => setActiveFamily(item.dataset.family);
      const handleItemFocus = () => setActiveFamily(item.dataset.family);
      const handleItemClick = () => {
        setOpen(false);
      };

      item.addEventListener('mouseenter', handleItemEnter);
      item.addEventListener('focus', handleItemFocus);
      item.addEventListener('click', handleItemClick);

      return {
        item,
        handleItemEnter,
        handleItemFocus,
        handleItemClick
      };
    });

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeydown);

    if (menuShell) {
      menuShell.addEventListener('click', handleMenuShellClick);
    }

    wrapper._maqamMegaCleanup = function () {
      clearCloseTimer();
      setOpen(false);

      wrapper.removeEventListener('mouseenter', handleWrapperMouseEnter);
      wrapper.removeEventListener('mouseleave', handleWrapperMouseLeave);
      wrapper.removeEventListener('focusin', handleWrapperFocusIn);
      wrapper.removeEventListener('focusout', handleWrapperFocusOut);

      menu.removeEventListener('mouseenter', clearCloseTimer);
      menu.removeEventListener('mouseleave', scheduleClose);

      triggerLink.removeEventListener('click', handleTriggerClick);

      mainItemListeners.forEach(({ item, handleItemEnter, handleItemFocus, handleItemClick }) => {
        item.removeEventListener('mouseenter', handleItemEnter);
        item.removeEventListener('focus', handleItemFocus);
        item.removeEventListener('click', handleItemClick);
      });

      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeydown);

      if (menuShell) {
        menuShell.removeEventListener('click', handleMenuShellClick);
      }
    };
  }

  function syncMegaMenuToViewport() {
    injectMegaMenuOverrides();

    const navGroups = document.querySelectorAll('.nav-links');

    if (isCompactViewport()) {
      navGroups.forEach(destroyEnhancedNavGroup);
      return;
    }

    navGroups.forEach(enhanceNavGroup);
  }

  function scheduleViewportSync() {
    if (resizeReinitTimer) {
      window.clearTimeout(resizeReinitTimer);
    }

    resizeReinitTimer = window.setTimeout(() => {
      syncMegaMenuToViewport();
    }, RESIZE_REINIT_DELAY_MS);
  }

  syncMegaMenuToViewport();
  window.addEventListener('resize', scheduleViewportSync);
  window.addEventListener('orientationchange', scheduleViewportSync);
})();
