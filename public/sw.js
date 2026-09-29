const CACHE_NAME = "artos-v1";

self.addEventListener("install", (event) => {
    console.log("[SW] Installing...");

    event.waitUntil(
        self.skipWaiting()
    );
});

self.addEventListener("activate", (event) => {
    console.log("[SW] Activating...");

    event.waitUntil(
        self.clients.claim()
    );
});