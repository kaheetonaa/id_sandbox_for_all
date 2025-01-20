var GHPATH = 'id_for_all';
var APP_PREFIX = 'id_for_all';
var VERSION = 'version_0_0_1';
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/land_beta.html`,
  `${GHPATH}/index_beta.html`,
  `${GHPATH}/dist/iD_beta.css`,
  `${GHPATH}/dist/iD_beta.js`,
  `${GHPATH}/dist/iD.js`,
  `${GHPATH}/dist/iD_beta.css`,
  `${GHPATH}/land.html`,
  `${GHPATH}/index.html`,
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})