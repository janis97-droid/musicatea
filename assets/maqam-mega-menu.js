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
              <a href="${firstMain ? buildInteractiveLink(firstMain) : 'maqamat.html'}" class="maqam-mega-branch-family-link" id="maqam-mega-family-link">
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
    const triggerLink = [...navLinks.querySelectorAll('a')].find(link => link.getAttribute('href') === 'maqamat.html');
    if (!triggerLink || triggerLink.closest('.maqam-nav-item')) return;

    const mainFamilies = getOrderedMainFamilies();
    if (!mainFamilies.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'maqam-nav-item';
    triggerLink.parentNode.insertBefore(wrapper, triggerLink);
    wrapper.appendChild(triggerLink);
    wrapper.insertAdjacentHTML('beforeend', createMenuMarkup(mainFamilies));

    const menu = wrapper.querySelector('.maqam-mega-menu');
    const familyLink = wrapper.querySelector('#maqam-mega-family-link');
    const familyName = wrapper.querySelector('#maqam-mega-family-name');
    const branchesBox = wrapper.querySelector('#maqam-mega-branches');
    const mainItems = [...wrapper.querySelectorAll('.maqam-mega-main-item')];

    function setOpen(isOpen) {
      wrapper.classList.toggle('is-open', isOpen);
      menu.setAttribute('aria-hidden', String(!isOpen));
    }

    function setActiveFamily(familyId) {
      const main = mainFamilies.find(item => item.family === familyId);
      if (!main) return;

      mainItems.forEach(item => item.classList.toggle('active', item.dataset.family === familyId));
      familyLink.href = buildInteractiveLink(main);
      familyName.textContent = main.name;
      branchesBox.innerHTML = renderBranchItems(getDisplayBranches(main));
    }

    wrapper.addEventListener('mouseenter', () => setOpen(true));
    wrapper.addEventListener('mouseleave', () => setOpen(false));
    wrapper.addEventListener('focusin', () => setOpen(true));
    wrapper.addEventListener('focusout', (event) => {
      if (!wrapper.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });

    mainItems.forEach(item => {
      item.addEventListener('mouseenter', () => setActiveFamily(item.dataset.family));
      item.addEventListener('focus', () => setActiveFamily(item.dataset.family));
    });
  }

  function initMegaMenu() {
    const navGroups = document.querySelectorAll('.nav-links');
    navGroups.forEach(enhanceNavGroup);
  }

  initMegaMenu();
})();
