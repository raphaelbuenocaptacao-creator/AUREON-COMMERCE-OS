'use client';

import { useEffect, useState } from 'react';

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const isSecure = window.location.protocol === 'https:' || isLocalhost;
    if (!isSecure || !('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });
        await registration.update();
      } catch (error) {
        console.error('Falha ao registrar o service worker do AUREON Commerce OS', error);
      }
    };

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    const onAppInstalled = () => setInstallPrompt(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    if (document.readyState === 'complete') {
      void register();
    } else {
      window.addEventListener('load', register, { once: true });
    }

    return () => {
      window.removeEventListener('load', register);
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  if (!installPrompt) return null;

  return (
    <button
      type="button"
      aria-label="Instalar AUREON Commerce OS"
      onClick={async () => {
        await installPrompt.prompt();
        await installPrompt.userChoice;
        setInstallPrompt(null);
      }}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 1000,
        border: 0,
        borderRadius: 12,
        padding: '12px 16px',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      Instalar app
    </button>
  );
}
