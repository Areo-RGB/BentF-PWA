const CACHE_NAME = 'bentf-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/audio/victory.mp3',
  '/assets/audio/beep-short.mp3',
  '/assets/audio/pro-only.gif',
  '/assets/icons/android/android-launchericon-192-192.png',
  '/assets/icons/android/android-launchericon-512-512.png',
  '/assets/icons/android/android-launchericon-144-144.png',
  '/assets/icons/android/android-launchericon-96-96.png',
  '/assets/icons/android/android-launchericon-72-72.png',
  '/assets/icons/android/android-launchericon-48-48.png',
  '/assets/icons/ios/1024.png',
  '/assets/icons/ios/512.png',
  '/assets/icons/ios/256.png',
  '/assets/icons/ios/192.png',
  '/assets/icons/ios/180.png',
  '/assets/icons/ios/167.png',
  '/assets/icons/ios/152.png',
  '/assets/icons/ios/144.png',
  '/assets/icons/ios/128.png',
  '/assets/icons/ios/120.png',
  '/assets/icons/ios/114.png',
  '/assets/icons/ios/100.png',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});