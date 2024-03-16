# PWA

## What is PWA

- Visit twitter and explore the Dev Tools => Application => Manifest

- Install Twitter

## How Do We Make Do This

### The Ways of Old

Nearly every framework will have some level of PWA integration to use within their toolset. Lets first see how this can be done with just HTML and JS

1. Write out service worker registration in in index.html
   1. Run App
2. Write out service-worker.js

 ```js
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed!");
})


self.addEventListener("activate", event => {
  console.log("Service worker activated");
});
```

3. Add Cacheing to Install event
   1. Demo the waiting to activate in Application



