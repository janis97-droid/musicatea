// assets/maqam-name-overrides.js
// Sidebar visibility and tonic-based alternate maqam naming overrides.

(function () {
  if (typeof maqamat === 'undefined') return;

  function patchMaqam(id, patch) {
    const maqam = getMaqamById(id);
    if (!maqam) return;
    Object.assign(maqam, patch);
  }

  patchMaqam('shahnaz', {
    display_name_by_tonic: {
      ...(getMaqamById('shahnaz')?.display_name_by_tonic || {}),
      re: 'شهناز',
      do: 'حجازكار',
      sol: 'شد عربان',
      la: 'سوزدل'
    },
    latin_display_name_by_tonic: {
      re: 'Shahnaz',
      do: 'Hijazkar',
      sol: 'Shadd Araban',
      la: 'Suzdil'
    }
  });

  patchMaqam('huzam', {
    display_name_by_tonic: {
      ...(getMaqamById('huzam')?.display_name_by_tonic || {}),
      mi_half_flat: 'هزام',
      si_half_flat: 'راحة الأرواح'
    },
    latin_display_name_by_tonic: {
      mi_half_flat: 'Huzam',
      si_half_flat: 'Rahat al-Arwah'
    }
  });

  patchMaqam('nawa_athar', {
    latin_display_name_by_tonic: {
      do: 'Nawa Athar',
      re: 'Husar'
    }
  });

  [
    ['hijazkar', 'shahnaz'],
    ['shadd_araban', 'shahnaz'],
    ['suzdil', 'shahnaz'],
    ['rahat_al_arwah', 'huzam']
  ].forEach(([id, representativeId]) => {
    patchMaqam(id, {
      sidebar_hidden: true,
      representative_maqam_id: representativeId
    });
  });

  const originalGetInteractiveFamily = getInteractiveFamily;
  window.getInteractiveFamily = function (familyId) {
    return originalGetInteractiveFamily(familyId).filter(m => !m.sidebar_hidden);
  };

  window.resolveInteractiveRepresentativeSelection = function (maqamId, tonic) {
    const maqam = getMaqamById(maqamId);
    if (!maqam) {
      return { maqamId, tonic };
    }

    if (!maqam.representative_maqam_id) {
      return { maqamId, tonic };
    }

    return {
      maqamId: maqam.representative_maqam_id,
      tonic: tonic || maqam.base_tonic
    };
  };

  window.getLatinDisplayNameForTonic = function (maqamId, tonic) {
    const maqam = getMaqamById(maqamId);
    if (!maqam) return '';
    if (maqam.latin_display_name_by_tonic && maqam.latin_display_name_by_tonic[tonic]) {
      return maqam.latin_display_name_by_tonic[tonic];
    }
    return maqam.latin || '';
  };
})();

(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const isHomePage = document.querySelector('.nav-top-home') && document.querySelector('.hero-cta-home-menu');
  if (!isHomePage) return;

  if (!document.getElementById('page-home-mobile-only-css')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/page-home-mobile-only.css';
    link.id = 'page-home-mobile-only-css';
    document.head.appendChild(link);
  }

  if (document.querySelector('script[data-page-home-mobile-script="true"]')) return;

  const script = document.createElement('script');
  script.src = 'assets/page-home-mobile.js';
  script.defer = true;
  script.dataset.pageHomeMobileScript = 'true';
  document.body.appendChild(script);
})();
