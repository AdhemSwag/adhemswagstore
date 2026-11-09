/* AdhemSwag global sponsor display: rotates active RIGHT/LEFT campaigns every 15 seconds. */
(function(){
  'use strict';
  if (window.__adhemSponsorRotationStarted) return;
  window.__adhemSponsorRotationStarted = true;
  const SUPABASE_URL = 'https://lpmocfdfpebcaseffugg.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_vNkDqYd81b2krZAisUhb2g_c_uwyvRp';
  const INTERVAL = 15000;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const now = Date.now();
  let campaigns = [], index = 0, timer = null, dismissed = false, host = null;
  const headers = {'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY};
  async function rpc(name,id){
    try { await fetch(SUPABASE_URL+'/rest/v1/rpc/'+name,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({p_sponsor_id:id}),keepalive:true}); } catch(_) {}
  }
  function eligible(s){
    const t=Date.now();
    return s.enabled && s.show_all_pages !== false && (!s.start_at || new Date(s.start_at).getTime()<=t) && (!s.end_at || new Date(s.end_at).getTime()>t);
  }
  function ensureHost(){
    if(host) return host;
    host=document.createElement('aside');host.id='adhemswag-sponsor-rotation';host.setAttribute('aria-label','Sponsors');
    const style=document.createElement('style');
    style.textContent=`
      #adhemswag-sponsor-rotation{position:fixed;right:14px;top:50%;transform:translateY(-50%);z-index:9000;width:min(190px,24vw);min-width:130px;max-width:190px;padding:9px;border:1px solid rgba(17,217,247,.35);border-radius:12px;background:rgba(5,10,14,.94);box-shadow:0 8px 30px rgba(0,0,0,.42),0 0 18px rgba(17,217,247,.09);backdrop-filter:blur(12px);color:#eaf6f8;font-family:Inter,Arial,sans-serif}
      #adhemswag-sponsor-rotation .adhem-sponsor-head{display:flex;align-items:center;justify-content:space-between;gap:6px;margin:0 0 7px;color:#11d9f7;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase}
      #adhemswag-sponsor-rotation .adhem-sponsor-close{border:0;background:transparent;color:#91a5ac;font-size:17px;line-height:1;cursor:pointer;padding:0 2px}
      #adhemswag-sponsor-rotation a{display:block;color:inherit;text-decoration:none}
      #adhemswag-sponsor-rotation img{display:block;width:100%;height:auto;max-height:150px;object-fit:contain;border-radius:6px}
      #adhemswag-sponsor-rotation .adhem-sponsor-name{margin-top:7px;text-align:center;font-size:12px;font-weight:800;letter-spacing:.04em}
      #adhemswag-sponsor-rotation .adhem-sponsor-code{margin-top:4px;text-align:center;color:#11d9f7;font:700 10px 'JetBrains Mono',monospace}
      @media(max-width:700px){#adhemswag-sponsor-rotation{right:8px;top:auto;bottom:calc(94px + env(safe-area-inset-bottom,0px));transform:none;width:116px;min-width:116px;max-width:116px;padding:7px;border-radius:9px}#adhemswag-sponsor-rotation img{max-height:84px}#adhemswag-sponsor-rotation .adhem-sponsor-head{font-size:8px}#adhemswag-sponsor-rotation .adhem-sponsor-name{font-size:10px}#adhemswag-sponsor-rotation .adhem-sponsor-code{font-size:9px}}
      html.adhem-lang-ar #adhemswag-sponsor-rotation{right:auto;left:14px}
      @media(max-width:700px){html.adhem-lang-ar #adhemswag-sponsor-rotation{left:8px;right:auto}}
    `;
    document.head.appendChild(style);document.body.appendChild(host);return host;
  }
  function render(){
    if(dismissed || !campaigns.length) return;
    const s=campaigns[index%campaigns.length], box=ensureHost();
    const image=s.image_url ? '<img src="'+esc(s.image_url)+'" alt="'+esc(s.name)+'" loading="lazy">' : '';
    const content='<div class="adhem-sponsor-head"><span>SPONSORED</span>'+(s.closeable?'<button class="adhem-sponsor-close" type="button" aria-label="Close sponsor">×</button>':'')+'</div><a href="'+esc(s.target_url||'#')+'" target="_blank" rel="noopener sponsored" data-sponsor-click="'+esc(s.id)+'">'+image+'<div class="adhem-sponsor-name">'+esc(s.name)+'</div>'+(s.promo_code?'<div class="adhem-sponsor-code">'+esc(s.promo_code)+'</div>':'')+'</a>';
    box.innerHTML=content;
    box.querySelector('[data-sponsor-click]')?.addEventListener('click',()=>rpc('record_sponsor_click',s.id));
    box.querySelector('.adhem-sponsor-close')?.addEventListener('click',()=>{dismissed=true;box.remove();if(timer)clearInterval(timer)});
    rpc('record_sponsor_impression',s.id);
  }
  async function init(){
    try{
      const res=await fetch(SUPABASE_URL+'/rest/v1/sponsors?select=id,name,image_url,target_url,promo_code,position,enabled,show_all_pages,closeable,start_at,end_at&enabled=eq.true&position=eq.right&order=created_at.asc',{headers,cache:'no-store'});
      if(!res.ok) return;
      campaigns=(await res.json()).filter(eligible);
      if(!campaigns.length) return;
      render();
      if(campaigns.length>1) timer=setInterval(()=>{index=(index+1)%campaigns.length;render()},INTERVAL);
    }catch(err){console.warn('Sponsor rotation unavailable',err)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();