const params = new URLSearchParams(window.location.search);
const targetParams = new URLSearchParams();
const maqamId = params.get('id') || params.get('maqam');
const familyId = params.get('family');
const tonic = params.get('tonic');

if (familyId) targetParams.set('family', familyId);
if (maqamId) targetParams.set('maqam', maqamId);
if (tonic) targetParams.set('tonic', tonic);

window.location.replace(
  'interactive-scale-en.html' + (targetParams.toString() ? ('?' + targetParams.toString()) : '')
);
