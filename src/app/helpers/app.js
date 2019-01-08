/* global __BASENAME__ */

// Registrace service-workeru, který se stará o cacheování a je základní podmínkou Progressive Web App.
export function _initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: __BASENAME__ }).then(registration => {
            console.log('Service worker successfully registered on scope:', registration.scope);
        }, (error) => {
            console.log('Service worker failed to register: ', error);
        });
    }
}

export function _removeCachedData() {
    if (navigator.onLine) {
        try {
            caches.keys().then(cacheKeys => {
                cacheKeys.forEach(cacheName => {
                    caches.delete(cacheName);

                    console.log('Cache removed.');
                });
            }).then(() => {
                navigator.serviceWorker.getRegistrations()
                    .then(registrations => {
                        registrations.forEach(registration => {
                            registration.unregister();

                            console.log('Service worker unregistered.');
                        });
                    });

                window.location.reload(true);
            });
        } catch (error) {
            console.log('Service worker - Unable to clear the cache.', error);
        }
    } else {
        alert('Pro update aplikace se prosím přípojte k internetu a poté akci zopakujte.');
    }
}
