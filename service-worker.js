/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-794407b';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pasmo_002.html","./pasmo_005.html","./pasmo_006.html","./pasmo_007.html","./pasmo_008.html","./pasmo_009.html","./pasmo_010.html","./pasmo_011.html","./pasmo_012.html","./pasmo_013.html","./pasmo_014.html","./pasmo_015.html","./pasmo_016.html","./pasmo_017.html","./pasmo_018.html","./pasmo_019.html","./pasmo_020.html","./pasmo_021.html","./pasmo_022.html","./pasmo_023.html","./pasmo_024.html","./pasmo_025.html","./pasmo_026.html","./pasmo_027.html","./pasmo_028.html","./pasmo_029.html","./pasmo_030.html","./pasmo_031.html","./pasmo_032.html","./pasmo_033.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/b_18477_003.jpg","./resources/b_18477_004.jpg","./resources/b_18477_004b.jpg","./resources/b_18477_005.jpg","./resources/b_18477_005b.jpg","./resources/b_18477_005c.jpg","./resources/b_18477_006.jpg","./resources/b_18477_006b.jpg","./resources/b_18477_007.jpg","./resources/b_18477_007b.jpg","./resources/b_18477_008.jpg","./resources/b_18477_008b.jpg","./resources/b_18477_009.jpg","./resources/b_18477_009b.jpg","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
