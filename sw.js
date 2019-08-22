// Service Worker (Global Scope)
// console.log(self);

const staticCacheName = "site-static-v2";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/vue.js",
  "/js/materialize.min.js",
  "/js/axios.js",
  "/css/materialize.min.css",
  "/css/style.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// Listen to Install Event by the browser
self.addEventListener("install", event => {
  // console.log("Service worker has been installed", event)
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      // Get Single Resource
      // cache.add()
      // Get all the resources
      console.log("Caching shell assets");
      cache.addAll(assets);
    })
  );
});

// Service Worker becomes active
// Listen to the active event Activate Event
self.addEventListener("activate", event => {
  // console.log("Service worker has been activated", event);
  // Delete the Previous Cache in the memory
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Events Intercept
self.addEventListener("fetch", event => {
  console.log("Fetch Event Called", event);
  // Intercept the fetch request then check if that
  // item exists in cache then cancel that request
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes;
    })
  );
});

// Recieving message from the client
self.addEventListener("message", async event => {
  console.log("SW Received Message: " + event.data);
  event.ports[0].postMessage("SW Says 'Hello back!'");

  // let data = await fetch(
  //   "https://jsonplaceholder.typicode.com/posts?_limit=15"
  // ).then(res => res.json());
  // console.log(data, "Data In Service worker.");
});
