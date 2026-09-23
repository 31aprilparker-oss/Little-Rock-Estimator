const C='azteca-v482';
const A=['./','./index.html','./manifest.webmanifest?v=ae2','./ae-icon.png?v=ae2'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(A)));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);

  if(e.request.mode==='navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(res=>{
          if(res.ok){
            const cp=res.clone();
            caches.open(C).then(c=>c.put('./index.html',cp));
          }
          return res;
        })
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }

  if(url.pathname.endsWith('/manifest.webmanifest') || url.pathname.endsWith('/ae-icon.png')){
    e.respondWith(
      fetch(e.request,{cache:'reload'}).then(res=>{
        if(res.ok){
          const cp=res.clone();
          caches.open(C).then(c=>c.put(e.request,cp));
        }
        return res;
      }).catch(()=>caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r=>r || fetch(e.request).then(res=>{
      if(res.ok && url.origin===self.location.origin){
        const cp=res.clone();
        caches.open(C).then(c=>c.put(e.request,cp));
      }
      return res;
    }))
  );
});
