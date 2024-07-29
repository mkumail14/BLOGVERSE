// sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/index.html',
          'style.css',
          'app.js',
          'DevlopedByMKA-Logo.png',
          '/assets',
          'blogVerseLogo-icon.jpg',
          'blogVerseLogo.png',
          'authentication.js'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  