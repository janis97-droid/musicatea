// Android install button

(function () {
  const installWrap = document.getElementById('androidInstallWrap');
  const installBtn = document.getElementById('androidInstallBtn');

  if (!installWrap || !installBtn) return;

  let deferredPrompt = null;

  const isAndroid = /Android/i.test(window.navigator.userAgent);
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (!isAndroid || isStandalone) {
    installWrap.hidden = true;
    return;
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installWrap.hidden = false;
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    installBtn.disabled = true;
    deferredPrompt.prompt();

    try {
      await deferredPrompt.userChoice;
    } catch (error) {
      console.warn('Install prompt failed:', error);
    }

    deferredPrompt = null;
    installWrap.hidden = true;
    installBtn.disabled = false;
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    installWrap.hidden = true;
  });
})(); 

