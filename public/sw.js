const CACHE_NAME = 'aureon-commerce-shell-v3';
const APP_SHELL = [
  '/',
  '/manifest.webmanifest',
  '/icon-192.svg',
  '/icon-512.svg',
  '/icon-512-maskable.svg',
];
const PRIVATE_PATH = /\/(api|auth|login|logout|admin|session|sessions|token|tokens|account|profile|me)(\/|$)/i;
const PRIVATE_QUERY = /(token|access_token|refresh_token|password|secret|session|auth)=/i;

function isCacheSafe(request) {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (request.headers.has('authorization') || request.headers.has('cookie')) return false;
  if (PRIVATE_PATH.test(url.pathname) || PRIVATE_QUERY.test(url.search)) return false;
  return true;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (!isCacheSafe(request)) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/')));
    return;
  }

  const url = new URL(request.url);
  if (!APP_SHELL.includes(url.pathname)) return;

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
