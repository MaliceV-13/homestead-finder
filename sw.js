const C='hf-v4';const CORE=['./','index.html','styles.css','app.js','manifest.json','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 const cacheable=u.origin===location.origin||/unpkg\.com|openfreemap|arcgisonline|elevation-tiles/.test(u.host);
 if(!cacheable)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl))}return r}).catch(()=>caches.match(e.request)))});
