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
