self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('iDSandbox4All').then((cache) => cache.addAll([
        '/id_sandbox_for_all/',
        '/id_sandbox_for_all/index.html',
        '/id_sandbox_for_all/land.html',
        '/id_sandbox_for_all/icon/icon.png',
        '/id_sandbox_for_all/dist/iD.js',
        '/id_sandbox_for_all/dist/iD.css',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });