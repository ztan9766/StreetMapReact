let CACHE_NAME = "app_cache";
let urlsToCache = [
  "/",
  "/static/"
];

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Open cache");
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      const cache = await caches.open(CACHE_NAME);
      const networkResponse = await fetch(event.request);
      event.waitUntil(
        cache.put(event.request, networkResponse.clone())
      );
      return networkResponse;
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});