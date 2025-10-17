// Simple offline-first service worker for Snake PWA
const CACHE_NAME = 'snake-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Network falling back to cache for navigation so reload works offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Cache-first for static assets
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(r => {
      // put a copy in cache
      const copy = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(req, copy));
      return r;
    }))
  );
});
