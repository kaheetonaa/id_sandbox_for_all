self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('iDSandbox4All').then((cache) => cache.addAll([
        'index.html',
        'land.html',
        'icon/icon.png',
        'dist/iD.js',
        'dist/iD.css',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });