workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerNavigationRoute("dist/index.html", {
  blacklist: [/signin-google/,/login/],
});

workbox.routing.registerRoute(/api/, workbox.strategies.networkOnly(), 'GET');

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Life';
  const options = {
    body: 'Yay it works!',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});