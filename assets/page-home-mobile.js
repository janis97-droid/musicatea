// assets/page-home-mobile.js
// Homepage-only mobile adjustments that should not affect desktop.

(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const body = document.body;
  const pillars = Array.from(document.querySelectorAll('.pillars .pillar'));
  if (!body || !pillars.length) return;

  const mobileQuery = window.matchMedia('(max-width: 760px)');
  const firstPillar = pillars[0] || null;
  const fourthPillar = pillars[3] || null;

  const firstTitleNode = firstPillar
    ? (firstPillar.querySelector('.pillar-title-desktop') || firstPillar.querySelector('h3'))
    : null;

  const firstIconNode = firstPillar ? firstPillar.querySelector('.pillar-icon') : null;

  if (firstTitleNode && !firstTitleNode.dataset.originalText) {
    firstTitleNode.dataset.originalText = firstTitleNode.textContent.trim();
  }

  if (firstIconNode && !firstIconNode.dataset.originalText) {
    firstIconNode.dataset.originalText = firstIconNode.textContent.trim();
  }

  function applyMobileHomepageState() {
    const isMobile = mobileQuery.matches;

    body.classList.toggle('is-home-mobile-layout', isMobile);

    if (firstTitleNode) {
      firstTitleNode.textContent = isMobile
        ? 'تحميل مجاني'
        : (firstTitleNode.dataset.originalText || firstTitleNode.textContent);
    }

    if (firstIconNode) {
      firstIconNode.textContent = isMobile
        ? '♩'
        : (firstIconNode.dataset.originalText || firstIconNode.textContent);
    }

    if (fourthPillar) {
      fourthPillar.classList.toggle('pillar-mobile-hidden', isMobile);

      if (isMobile) {
        fourthPillar.setAttribute('hidden', '');
        fourthPillar.setAttribute('aria-hidden', 'true');
      } else {
        fourthPillar.removeAttribute('hidden');
        fourthPillar.removeAttribute('aria-hidden');
      }
    }
  }

  applyMobileHomepageState();

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', applyMobileHomepageState);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(applyMobileHomepageState);
  }

  window.addEventListener('pageshow', applyMobileHomepageState);
})();
