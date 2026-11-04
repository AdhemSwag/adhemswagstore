(() => {
  const backdrop=document.getElementById('skinDetailBackdrop');
  if(!backdrop) return;
  const title=document.getElementById('skinDetailTitle');
  const image=document.getElementById('skinDetailImage');
  const preview=document.getElementById('skinDetailPreview');
  const viewer=document.getElementById('skinDetailViewer');
  const inspect=document.getElementById('skinDetailInspect');
  const close=()=>{
    backdrop.classList.remove('open');backdrop.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    viewer.replaceChildren();viewer.hidden=true;preview.hidden=false;
  };
  // Public, domain-restricted key from cs2inspect.skin. Add adhemswag.com to its allowed origins.
  // This is intentionally blank until the site owner creates and supplies the publishable key.
  const CS2INSPECT_PUBLIC_KEY='pk_live_BsWeF9Rm-O7g2VPLwHowgA';
  const slug=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/™/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const inspectUrl=name=>{const parts=String(name||'').split('|');return 'https://cs2inspect.skin/'+slug(parts[0]||'')+'/'+slug(parts.slice(1).join('|')||'');};
  const wearSelect=document.getElementById('skinWearSelect');
  const priceEl=document.getElementById('skinSteamPrice');
  const medianEl=document.getElementById('skinSteamMedian');
  const volumeEl=document.getElementById('skinSteamVolume');
  const statusEl=document.getElementById('skinMarketStatus');
  const historyEl=document.getElementById('skinPriceHistory');
  let activeSkinName='';
  let priceRequest=0;
  const loadSteamPrice=async()=>{
    if(!activeSkinName||!priceEl)return;
    const request=++priceRequest;
    const wear=wearSelect?.value||'';
    const hashName=activeSkinName+(wear?' ('+wear+')':'');
    priceEl.textContent='Loading…';medianEl.textContent='—';volumeEl.textContent='—';
    statusEl.textContent='Checking Steam Community Market…';
    historyEl.textContent='Loading recorded price history…';
    try{
      const response=await fetch('https://lpmocfdfpebcaseffugg.supabase.co/functions/v1/cs2-market-prices',{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({market_hash_name:hashName})
      });
      const data=await response.json();
      if(request!==priceRequest)return;
      if(!response.ok||data.error)throw new Error(data.error||'Steam price unavailable');
      priceEl.textContent=data.lowest_price||'Not listed';
      medianEl.textContent=data.median_price||'—';
      volumeEl.textContent=data.volume||'—';
      statusEl.textContent='Source: Steam Community Market · '+new Date(data.fetched_at).toLocaleString();
      const rows=Array.isArray(data.history)?data.history:[];
      historyEl.replaceChildren();
      if(!rows.length){historyEl.textContent='History will build from real price checks. No historical values are fabricated.';}
      else{
        const list=document.createElement('div');list.style.cssText='display:grid;gap:8px;width:100%';
        rows.slice(-10).reverse().forEach(row=>{
          const line=document.createElement('div');line.className='skin-market-row';
          const date=document.createElement('span');date.textContent=new Date(row.observed_at).toLocaleDateString();
          const value=document.createElement('strong');value.className='skin-market-value';value.textContent=Number(row.price).toFixed(2)+' '+(row.currency||'USD');
          line.append(date,value);list.append(line);
        });
        historyEl.append(list);
      }
    }catch(error){
      if(request!==priceRequest)return;
      priceEl.textContent='Unavailable';statusEl.textContent=error.message||'Steam price lookup failed';
      historyEl.textContent='No verified price history is available for this item yet.';
    }
  };
  wearSelect?.addEventListener('change',loadSteamPrice);
  const showViewer=()=>{window.open(inspectUrl(title.textContent),'_blank','noopener,noreferrer');};
  document.getElementById('skinGrid')?.addEventListener('click',event=>{
    const card=event.target.closest('.skin-card');if(!card) return;
    const name=card.dataset.skinName||card.querySelector('.skin-name')?.textContent||'CS2 Skin';
    title.textContent=name;
    activeSkinName=name;
    if(wearSelect)wearSelect.value='';
    if(inspect) inspect.href=inspectUrl(name);
    loadSteamPrice();
    const source=card.querySelector('.skin-image img');
    image.src=source?.src||'';image.alt=name;
    preview.hidden=false;viewer.hidden=true;viewer.replaceChildren();
    backdrop.classList.add('open');backdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  });
  inspect?.addEventListener('click',event=>{if(!event.isTrusted)return;});
  document.getElementById('skinGrid')?.addEventListener('keydown',event=>{const card=event.target.closest('.skin-card');if(card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();card.click();}});
  document.getElementById('skinDetailClose')?.addEventListener('click',close);
  backdrop.addEventListener('click',event=>{if(event.target===backdrop)close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&backdrop.classList.contains('open'))close();});
  const category=document.getElementById('categoryFilter');
  document.querySelectorAll('[data-skin-category]').forEach(tab=>tab.addEventListener('click',()=>{
    if(!category)return;category.value=tab.dataset.skinCategory;
    category.dispatchEvent(new Event('change',{bubbles:true}));
    document.querySelectorAll('[data-skin-category]').forEach(x=>x.classList.toggle('active',x===tab));
  }));
  category?.addEventListener('change',()=>document.querySelectorAll('[data-skin-category]').forEach(tab=>tab.classList.toggle('active',tab.dataset.skinCategory===category.value)));
})();