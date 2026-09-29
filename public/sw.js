const CACHE_NAME = "cash-app-v1";

const STATIC_ASSETS = ["/",];

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
        })
    );
});