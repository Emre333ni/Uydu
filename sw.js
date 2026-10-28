/* Bozkurt Uydu: sayfa kabuğunu çevrimdışı açmak için */
const C='uydu-kabuk-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin&&u.hostname!=='unpkg.com')return;
  e.respondWith(
    fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res})
      .catch(()=>caches.match(r,{ignoreSearch:true}))
  );
});
