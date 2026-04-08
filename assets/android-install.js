// assets/android-install.js
window.addEventListener('DOMContentLoaded', () => {
  const installWrap = document.getElementById('androidInstallWrap');
  const installBtn = document.getElementById('androidInstallBtn');

  if (!installWrap || !installBtn) {
    console.warn('Android install UI not found in DOM.');
    return;
  }

  let deferredPrompt = null;

  const isAndroid = /Android/i.test(window.navigator.userAgent);
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  // Hide by default unless Android browser mode.
  installWrap.hidden = true;

  if (!isAndroid || isStandalone) {
    console.log('Install button disabled: not Android or already installed.');
    return;
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    installWrap.hidden = false;
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
      console.warn('Install prompt not available.');
      return;
    }

    installBtn.disabled = true;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      console.log('Install choice:', choice.outcome);
    } catch (error) {
      console.warn('Install prompt failed:', error);
    }

    deferredPrompt = null;
    installWrap.hidden = true;
    installBtn.disabled = false;
  });

  window.addEventListener('appinstalled', () => {
    console.log('App installed');
    deferredPrompt = null;
    installWrap.hidden = true;
  });
});
