const CACHE_NAME = 'antonebsen-info-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/en/',
    '/en/index.html',
    '/de/',
    '/de/index.html',
    '/fr/',
    '/fr/index.html',
    '/style.css',
    '/favicon.svg',
    '/site.webmanifest',
    '/humans.txt',
    '/robots.txt'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    // Optional: Clean up old caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
