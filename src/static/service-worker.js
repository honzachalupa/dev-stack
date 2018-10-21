/* eslint-disable no-restricted-globals, consistent-return, array-callback-return */

// Set a name for the current cache
const cacheName = 'cache';

const absolutePath = '.';

// Default files to always cache
const cacheFiles = [
    `${absolutePath}/`,
    `${absolutePath}/?pwa=true`,
    `${absolutePath}/index.html`,
    `${absolutePath}/index.html?pwa=true`,
    `${absolutePath}/bundle.js`,
    `${absolutePath}/images/favicons/manifest.json`,
    `${absolutePath}/images/favicons/browserconfig.xml`,
    `${absolutePath}/images/favicons/favicon.ico`,
    `${absolutePath}/images/favicons/favicon-16x16.png`,
    `${absolutePath}/images/favicons/favicon-32x32.png`,
    `${absolutePath}/images/favicons/android-chrome-36x36.png`,
    `${absolutePath}/images/favicons/android-chrome-48x48.png`,
    `${absolutePath}/images/favicons/android-chrome-72x72.png`,
    `${absolutePath}/images/favicons/android-chrome-96x96.png`,
    `${absolutePath}/images/favicons/android-chrome-144x144.png`,
    `${absolutePath}/images/favicons/android-chrome-192x192.png`,
    `${absolutePath}/images/favicons/android-chrome-256x256.png`,
    `${absolutePath}/images/favicons/android-chrome-384x384.png`,
    `${absolutePath}/images/favicons/android-chrome-512x512.png`,
    `${absolutePath}/images/favicons/apple-touch-icon.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-precomposed.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-57x57.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-60x60.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-72x72.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-76x76.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-114x114.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-120x120.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-144x144.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-152x152.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-167x167.png`,
    `${absolutePath}/images/favicons/apple-touch-icon-180x180.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-320x460.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-640x920.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-640x1096.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-748x1024.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-750x1294.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-768x1004.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-1182x2208.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-1242x2148.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-1496x2048.png`,
    `${absolutePath}/images/favicons/apple-touch-startup-image-1536x2008.png`,
    `${absolutePath}/images/favicons/firefox_app_60x60.png`,
    `${absolutePath}/images/favicons/firefox_app_128x128.png`,
    `${absolutePath}/images/favicons/firefox_app_512x512.png`,
    `${absolutePath}/images/favicons/mstile-70x70.png`,
    `${absolutePath}/images/favicons/mstile-144x144.png`,
    `${absolutePath}/images/favicons/mstile-150x150.png`,
    `${absolutePath}/images/favicons/mstile-310x150.png`,
    `${absolutePath}/images/favicons/mstile-310x310.png`,
];

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            // Add all the default files to the cache
            console.log('[ServiceWorker] Caching cacheFiles');

            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(
        // Get all the cache keys (cacheName)
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(prevCacheName => {
                // If a cached item is saved under a previous cacheName
                if (prevCacheName !== cacheName) {
                    // Delete that cached file
                    console.log(`[ServiceWorker] Removing Cached Files from Cache - ${prevCacheName}`);

                    return caches.delete(prevCacheName);
                }
            }));
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url);

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

/* eslint-enable */
