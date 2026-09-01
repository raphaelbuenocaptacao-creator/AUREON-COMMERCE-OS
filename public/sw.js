const CACHE_PREFIX = 'aureon-commerce-';
const CACHE_NAME = `${CACHE_PREFIX}shell-v5-safe`;
const APP_SHELL = [
  '/',
  '/manifest.webmanifest',
  '/icon-192.svg',
  '/icon-512.svg',
  '/icon-512-maskable.svg',
];
const PRIVATE_PATH = /\/(api|auth|login|logout|admin|session|sessions|token|tokens|account|profile|me)(\/|$)/i;
const PRIVATE_QUERY_KEYS = new Set([
  'token', 'access_token', 'refresh_token', 'password', 'secret', 'session',
  'session_id', 'auth', 'authorization', 'api_key', 'apikey', 'code',
  'credential', 'credentials',
]);

function hasPrivateQuery(url) {
  for (const key of url.searchParams.keys()) {
    if (PRIVATE_QUERY_KEYS.has(key.toLowerCase())) return true;
  }
  return false;
}

function isCacheSafe(request) {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (request.headers.has('authorization') || request.headers.has('cookie')) return false;
  if (PRIVATE_PATH.test(url.pathname) || hasPrivateQuery(url)) return false;
  return true;
}

function isSafeResponse(response) {
  if (!response || !response.ok || response.type !== 'basic') return false;
  const cacheControl = response.headers.get('cache-control') || '';
  if (/\b(private|no-store)\b/i.test(cacheControl)) return false;
  if (response.headers.has('set-cookie')) return false;
  return true;
}

async function precacheShell() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(APP_SHELL.map(async (path) => {
    try {
      const request = new Request(path, { credentials: 'omit', cache: 'reload' });
      const response = await fetch(request);
      if (isSafeResponse(response)) await cache.put(request, response.clone());
    } catch (_) {}
  }));
}

self.addEventListener('install', (event) => {
  event.waitUntil(precacheShell());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (!isCacheSafe(request)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(new Request(request, { cache: 'no-store' }))
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match('/')) || Response.error();
        }),
    );
    return;
  }

  const url = new URL(request.url);
  if (url.search || !APP_SHELL.includes(url.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request, { cache: 'no-store', credentials: 'omit' });
    if (isSafeResponse(response)) {
      event.waitUntil(cache.put(request, response.clone()));
    }
    return response;
  })());
});
