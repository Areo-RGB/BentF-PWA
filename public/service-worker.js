const CACHE_NAME = 'bentf-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://video-idea.fra1.cdn.digitaloceanspaces.com/sounds/victory-96688.mp3',
  'https://video-idea.fra1.cdn.digitaloceanspaces.com/sounds/beep-short.mp3',
  'https://video-idea.fra1.cdn.digitaloceanspaces.com/sounds/pro-only.gif',
  '/assets/icons/android/android-launchericon-192-192.png',
  '/assets/icons/android/android-launchericon-512-512.png',
  '/assets/icons/android/android-launchericon-144-144.png',
  '/assets/icons/android/android-launchericon-96-96.png',
  '/assets/icons/android/android-launchericon-72-72.png',
  '/assets/icons/android/android-launchericon-48-48.png',
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