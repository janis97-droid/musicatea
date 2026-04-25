// assets/pages/arabic-music-intro/intro-hub-en.js
// Renders the English LTR hub for the Arabic Music Intro section.
(function () {
  const root = document.getElementById('intro-page-root');
  const symbols = window.MUSICATEA_INTRO_SYMBOLS;
  if (!root) return;

  function icon(type) {
    const span = document.createElement('span');
    span.className = 'intro-ui-icon';
    const drawer = symbols && symbols.drawers && symbols.drawers[type];
    if (drawer && symbols.svgEl) {
      const svg = symbols.svgEl('svg', { viewBox: '0 0 52 52', role: 'img', 'aria-hidden': 'true' }, span);
      drawer(svg, symbols);
    } else {
      span.innerHTML = '<span class="intro-ui-icon-fallback">♪</span>';
    }
    return span.outerHTML;
  }

  root.innerHTML = `
    <header class="intro-hero">
      <span class="intro-tag">Learning Guide</span>
      <h1>Arabic Music Intro</h1>
      <p>Start from one clear page, then choose the learning path you need: reading notation, understanding maqam, or reading rhythm. Each path is organized with terms, symbols, and examples from Musicatea.</p>
    </header>

    <section class="intro-section-map intro-primary-choices" aria-labelledby="intro-section-map-title">
      <div class="intro-map-head">
        <h2 id="intro-section-map-title">Choose your learning path</h2>
        <p>Do not read everything at once. Choose the topic you need now, then apply it directly inside Musicatea.</p>
      </div>
      <div class="intro-map-grid intro-map-grid-primary">
        <a href="learn-notation.html" class="intro-map-card">
          ${icon('treble-clef')}
          <div><strong>Learn to read notation</strong><span>Staff, G clef, meter, note values, rests, and basic notation symbols.</span></div>
        </a>
        <a href="learn-maqam.html" class="intro-map-card">
          ${icon('notation')}
          <div><strong>Learn what maqam is</strong><span>Maqam, jins, tonic, ghammaz, melodic path, and quarter-tone notation.</span></div>
        </a>
        <a href="learn-rhythm.html" class="intro-map-card">
          ${icon('meter-44')}
          <div><strong>Learn to read rhythm</strong><span>Dum, tak, rests, pulse, meter, and rhythmic cycles.</span></div>
        </a>
      </div>
    </section>

    <section class="intro-learning-path intro-apply-links" aria-labelledby="intro-after-title">
      <div class="intro-learning-head">
        <span class="intro-kicker">After the paths</span>
        <h2 id="intro-after-title">Apply it inside the site</h2>
        <p>After the basics, move to the reference and practice pages so you can see the concepts inside real pieces, maqamat, and rhythms.</p>
      </div>
      <div class="intro-path-grid">
        <a class="intro-path-card" href="library-en.html">${icon('apply')}<span class="intro-step">01</span><h3>Sheet Library</h3><p>Apply reading skills to real pieces through cards and sheet files.</p></a>
        <a class="intro-path-card" href="maqamat-en.html">${icon('notation')}<span class="intro-step">02</span><h3>Maqamat</h3><p>Move from the short definition to detailed maqam reference pages.</p></a>
        <a class="intro-path-card" href="rhythms-en.html">${icon('meter-44')}<span class="intro-step">03</span><h3>Rhythms</h3><p>Read rhythms as cycles of dum, tak, rests, and pulse.</p></a>
        <a class="intro-path-card" href="history-en.html">${icon('card-reading')}<span class="intro-step">04</span><h3>Music History</h3><p>Connect the concepts to historical context, figures, and schools.</p></a>
      </div>
    </section>
  `;
})();
