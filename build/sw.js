console.warn(" sw from public folder");

let cacheData = "todoApp";
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(["/static/js/bundle.js", "/index.html", "/"]);
    })
  );
});

this.addEventListener("fetch", (e) => {
    if(!navigator.onLine){
        e.respondWith(
            caches.match(e.request).then((result) => {
              if(result){
                  return result
              }
            })
          );
    }
   
  });
  