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

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const swUrl = `${basePath}/sw.js?v=shell-v11-private-vary-range-safe`;
    const scope = `${basePath}/` || '/';
    const hadController = Boolean(navigator.serviceWorker.controller);
    let registration: ServiceWorkerRegistration | null = null;
    let reloading = false;

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register(swUrl, {
          scope,
          updateViaCache: 'none',
        });
        await registration.update();
      } catch (error) {
        console.error('Falha ao registrar o service worker do AUREON Commerce OS', error);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && registration) {
        void registration.update();
      }
    };

    const onControllerChange = () => {
      if (!hadController || reloading) return;
      reloading = true;
      window.location.reload();
    };

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    const onAppInstalled = () => setInstallPrompt(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);
    document.addEventListener('visibilitychange', onVisibilityChange);
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    if (document.readyState === 'complete') void register();
    else window.addEventListener('load', register, { once: true });

    return () => {
      window.removeEventListener('load', register);
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
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
        position: 'fixed', right: 16, bottom: 16, zIndex: 1000, border: 0,
        borderRadius: 12, padding: '12px 16px', fontWeight: 700, cursor: 'pointer',
      }}
    >
      Instalar app
    </button>
  );
}
