const DEBUG = false;
const CACHE_NAME = 'inferno-starter-cache';

self.addEventListener('install', e => {
    function onCacheOpen(cache) {
        DEBUG && console.debug('Service cache');
        return cache.addAll([
            '/',
            '/build/bundle.js',
            '/build/bundle.css'
        ]);
    }
    e.waitUntil([caches.open(CACHE_NAME).then(onCacheOpen), self.skipWaiting()]);
});

self.addEventListener('activate', e => {
    e.waitUntil([
        self.clients.claim().then(() => DEBUG && console.debug('Service listener - clients.claim')),
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(cacheName) {
                if (cacheName !== CACHE_NAME) {
                    DEBUG && console.debug('deleting', cacheName);
                    return caches.delete(cacheName);
                }
            }));
        })
    ]);
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            // Cache hit - return response
            if (response) {
                DEBUG && console.debug(`Cache hit (${CACHE_NAME})`, e.request.url);
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            let fetchRequest = e.request.clone();

            DEBUG && console.debug('fetch: ', fetchRequest.url);

            function cachedResponse(response) {
                // Check if we received a valid response
                const isInvalid = !response || response.status !== 200 || response.type !== 'basic';
                if (isInvalid) {
                    DEBUG && console.debug('Cache excluded:', e.request.url)
                    return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                let responseToCache = response.clone();

                caches.open(CACHE_NAME)
                      .then(function (cache) {
                          DEBUG && console.debug('caching: ', e.request.url);
                          cache.put(e.request, responseToCache);
                      });

                return response;
            }

            return fetch(fetchRequest).then(cachedResponse).catch(cachedResponse);
        })
    );
});
