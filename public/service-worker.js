const APP_NAME = 'Budget_Tracker-';
const VERSION = 'v_01';
const CACHE_NAME = APP_NAME + VERSION;
const FILES_TO_CACHE = [
  './index.html',
  './js/idb.js',
  './js/index.js',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  './css/styles.css'
];


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(FILES_TO_CACHE)
    })
  )
});

// on cach activation, delete any obsolete caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_NAME)
      })
      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cacheKeeplist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i]);
          return caches.delete(keyList[i]);
        }
      }));
    })
  )
});

// when a request is made offline, the app will respond with the files and data it has cached
self.addEventListener('fetch', function (event) {
  console.log('fetch request : ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function (request) {
      if (request) {
        console.log('responding with cache : ' + event.request.url)
        return request;
      } else {
        console.log('file is not cached, fetching : ' + event.request.url)
        return fetch(event.request)
      }
      // return request || fetch(event.request) --------> play with this later
    })
  )
});

// For future reference, the manifest.json file should be made first
// ref: https://www.youtube.com/watch?v=AlEdGOLhuM8&ab_channel=TheNetNinja

// for future reference, inside the manifest.json the "type" property of the icon object should be 'image/png'  NOT  'image.png'!!!!!!!!!!