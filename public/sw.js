const CACHE_NAME = "cash-app-v1";

const STATIC_ASSETS = ["/",];

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    self.clients.claim();
});