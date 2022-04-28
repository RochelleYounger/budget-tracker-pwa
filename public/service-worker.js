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


// for future reference, inside the manifest.json the "type" property of the icon object should be 'image/png'  NOT  'image.png'!!!!!!!!!!