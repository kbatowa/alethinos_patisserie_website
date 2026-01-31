const CACHE = "alethinos-pwa-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./menu.html",
  "./cart.html",
  "./checkout.html",
  "./order.html",
  "./app.css",
  "./cart.js",
  "./menu.json",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./events.html",
  "./contact.html",
  "./assets/logo.png",
  "./icons/icon-96.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
