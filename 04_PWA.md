# PWA

## What is PWA

- Visit twitter and explore the Dev Tools => Application => Manifest
- Install Twitter

## How Do We Make Do This

### The Ways of Old

Nearly every framework will have some level of PWA integration to use within their toolset. Lets first see how this can be done with just HTML and JS

1. Let’s add our icons
    1. Go to [favicon.io](https://favicon.io/favicon-converter/)
    2. Upload PNG
    3. download file and add to repo
    4. Add to index header
        1. update rotues
        2. Add start url
        3. Add shortcuts
    5. inspect in dev tools manifest
    
2. Notice that we can now install the app!

3. Write out service worker registration in in index.html
    
    ```js
      <script>
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator
              .serviceWorker
              .register('/service-worker.js')
              .then(registration => {
                console.log("Successfully Registered Service Worker: ", registration)
              })
              .catch(err => console.log("Service Worker Registration Error: ", err))
          })
        }
      </script>
    ```
    
4. Write out service-worker.js
    
    ```js
    const CACHE_NAME = "movie-ratings-cache-v1.5"
    const filesToCache = [
      "/offline.html",
    ]
    
    self.addEventListener("install", (event) => {
     console.log("Service Worker Installed!");
    })
    
    self.addEventListener("activate", event => {
     console.log("Service worker activated");
    });
    
    ```
    
5. Add Caching to Install event

    
    ```js
    event.waitUntil(
        // Open Cache (promise)
        caches.open(CACHE_NAME)
        // Use returned cache from promise
        .then(cache => {
          console.log('files cached');
          return cache.addAll(filesToCache)
        })
        .catch(error => console.error("On SW Install, caching error: ", error))
    ```
    
    1. Demo the waiting to activate in Application by closing tab
    2. then add `self.skipWaiting()`
    
6. Add fetch listener

7. Add img icon to offline.html
    1. Notice that we are not getting it. That’s because our cache hasn’t been updated
    
8. Add delete key to ‘activate listener’ 
9. change Cache_name
10. Demo that Icon is the but img is not
    1. ask why
    
11. Add img to filesToCache

12. Review Vite PWA Docs
    1. When you have all your pages available in cache, we can also start caching our api routes
    2. https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
        
        ```js
         if (e.request.url.includes("/api")) {
                return e.respondWith(
                    caches
                        .open(cachedDataFile)
                        .then(dataCache => {
                           return fetch(e.request)
                            .then(res => {
                                if (res.status === 200) {
        		                        // We can only cosnume/read the responce body once
        		                        // So we use the .clone() from res to make
        		                        // a copy
                                    dataCache.put(e.request.url, res.clone());
                                }
                                return res;
                            })
                            .catch(err => {
                                console.log("On SW Fetch API Intercept, response error: ", err);
                                return dataCache.match(e.request);
                            })
                        })
                        .catch(err => console.log("On SW API Open Cache Error: ", err))
                )
            }
        ```
        
13.