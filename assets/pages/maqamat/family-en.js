const params = new URLSearchParams(window.location.search);
const targetParams = new URLSearchParams();
const familyId = params.get('family');

if (familyId) targetParams.set('family', familyId);

window.location.replace(
  'interactive-scale-en.html' + (targetParams.toString() ? ('?' + targetParams.toString()) : '')
);
