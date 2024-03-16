const CACHE_NAME = "movie-ratings-cache-v1.8"
const filesToCache = [
  "/offline.html",
  "/siteIcons/mRatings.png"
]

// * Handle Events
// self is how to reference the sw, think of document in our js env
// just like our all events, we have arg1 = Event TO Listen and arg2 = callback
self.addEventListener("install", (event) => {
  // This will let us handle what to do when installing a sw
  console.log("Service Worker Installed!");

  event.waitUntil(
    // Open Cache (promise)
    caches.open(CACHE_NAME)
      // Use returned cache from promise
      .then(cache => {
        console.log('files cached');
        return cache.addAll(filesToCache)
      })
      .catch(error => console.error("On SW Install, caching error: ", error))
  );

  // Demo then add
  self.skipWaiting()
})


self.addEventListener("activate", event => {
  // This will let us handle what to do once it is active and being used
  console.log("Service worker activated");
  
  event.waitUntil(
    caches
        .keys()
        .then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("Deleting Key: ", key);
                        return caches.delete(key);
                    }
                })
            )
        })
        .catch(err => console.log("On SW Activation, key delete error: ", err))
)
});


self.addEventListener('fetch', (e) => {
  console.log("Fetch Listener Intercept: ", e.request);
  // console.log();
  e.respondWith(
      caches
          .match(e.request)
          .then(response => {
            console.log(response);
              return response || (
                  // We can return just this fetch req. I added the .then() so I can see the log of the server response
                  fetch(e.request)
                      .then(serverResponse => {
                          console.log("Fetch Listener Server Response: ", serverResponse);
                          return serverResponse
                      })
              )
          })
          .catch(err => {
              console.log("On SW Fetch Intercept, response error: ", err);
            
              return caches.match('/offline.html')
          })
  )
});