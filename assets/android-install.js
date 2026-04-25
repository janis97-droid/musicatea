// assets/android-install.js
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.site-footer .footer-links a[href="arabic-music-intro.html"]').forEach((link) => {
    link.remove();
  });

  const installWrap = document.getElementById('androidInstallWrap');
  const installBtn = document.getElementById('androidInstallBtn');
  const installNote = document.querySelector('.android-install-note');

  if (installWrap && installBtn && installNote && !document.querySelector('.android-install-main')) {
    const actions = installWrap.querySelector('.android-install-actions');
    const main = document.createElement('div');
    main.className = 'android-install-main';
    main.style.display = 'flex';
    main.style.flexDirection = 'column';
    main.style.alignItems = 'center';
    main.style.justifyContent = 'center';
    main.style.gap = '8px';

    installNote.style.margin = '0';
    installNote.style.textAlign = 'center';
    installNote.style.width = '100%';
    installNote.style.lineHeight = '1.35';

    actions.insertBefore(main, installBtn);
    main.appendChild(installBtn);
    main.appendChild(installNote);
  }

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
