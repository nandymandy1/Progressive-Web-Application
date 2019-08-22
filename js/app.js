if ("serviceWorker" in navigator) {
  // register the service worker
  navigator.serviceWorker
    .register("./sw.js")
    .then(reg => {
      console.log(reg, "Service Worker Registered");
    })
    .catch(err => console.log(err, "Service Worker not registered"));
}
