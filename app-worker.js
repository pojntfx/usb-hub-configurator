const cacheName = "app-" + "c34fe3a6fcdbdecf535b7b8f6e8f35885121bda9";

self.addEventListener("install", event => {
  console.log("installing app worker c34fe3a6fcdbdecf535b7b8f6e8f35885121bda9");

  event.waitUntil(
    caches.open(cacheName).
      then(cache => {
        return cache.addAll([
          "/papilio",
          "/papilio/app.css",
          "/papilio/app.js",
          "/papilio/manifest.webmanifest",
          "/papilio/wasm_exec.js",
          "/papilio/web/app.wasm",
          "/papilio/web/default.png",
          "/papilio/web/large.png",
          "/papilio/web/main.css",
          
        ]);
      }).
      then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker c34fe3a6fcdbdecf535b7b8f6e8f35885121bda9 is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
