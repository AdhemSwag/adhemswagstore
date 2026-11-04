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
  const variantList=document.getElementById('skinVariantList');
  const marketPickerButton=document.getElementById('skinMarketPickerButton');
  const marketMenu=document.getElementById('skinMarketMenu');
  const marketChecks=[...(marketMenu?.querySelectorAll('input[type="checkbox"]')||[])];
  const marketStatus=document.getElementById('skinMarketStatus');
  const historyChart=document.getElementById('skinPriceChart');
  const historySource=document.getElementById('skinHistorySource');
  const rangeButtons=[...(document.querySelectorAll('#skinHistoryRanges button'))];
  const wears=['Factory New','Minimal Wear','Field-Tested','Well-Worn','Battle-Scarred'];
  const wearCodes={'Factory New':'FN','Minimal Wear':'MW','Field-Tested':'FT','Well-Worn':'WW','Battle-Scarred':'BS'};
  let activeSkinName='';
  let activeMarketHashName='';
  let activeItemType='weapon';
  let activeWear='Factory New';
  let priceRequest=0;
  let historyRange=30;
  let steamSnapshots=[];
  let variantPrices={};
  const selectedMarkets=()=>marketChecks.filter(x=>x.checked).map(x=>x.value);
  const refreshMarketButton=()=>{
    const names=marketChecks.filter(x=>x.checked).map(x=>x.parentElement.textContent.trim());
    if(marketPickerButton)marketPickerButton.innerHTML=(names.length?names.join(', '):'No market selected')+' <span>⌃</span>';
  };
  marketPickerButton?.addEventListener('click',()=>{marketMenu.hidden=!marketMenu.hidden;marketPickerButton.setAttribute('aria-expanded',String(!marketMenu.hidden));});
  document.addEventListener('click',e=>{if(marketMenu&&!e.target.closest('#skinMarketPicker')){marketMenu.hidden=true;marketPickerButton?.setAttribute('aria-expanded','false');}});
  marketChecks.forEach(x=>x.addEventListener('change',()=>{refreshMarketButton();renderMarketRows();}));
  const fetchSteam=async(hashName,request)=>{
    const response=await fetch('https://lpmocfdfpebcaseffugg.supabase.co/functions/v1/cs2-market-prices',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({market_hash_name:hashName})
    });
    const data=await response.json();
    if(request!==priceRequest)return null;
    if(!response.ok||data.error)throw new Error(data.error||'Steam price unavailable');
    return data;
  };
  const renderHistory=()=>{
    if(!historyChart)return;
    const cutoff=Date.now()-historyRange*86400000;
    const points=steamSnapshots.filter(x=>new Date(x.observed_at).getTime()>=cutoff).sort((a,b)=>new Date(a.observed_at)-new Date(b.observed_at));
    if(points.length<2){historyChart.textContent=points.length?'One verified price snapshot saved. More checks are needed to draw a price trend.':'No verified price history in this period yet. It will build from real Steam price checks.';return;}
    const vals=points.map(x=>Number(x.price)).filter(Number.isFinite);
    if(vals.length<2){historyChart.textContent='Not enough numeric price history yet.';return;}
    const min=Math.min(...vals),max=Math.max(...vals),span=max-min||1;
    const w=760,h=170,pad=12;
    const coords=vals.map((v,i)=>[pad+i*(w-2*pad)/(vals.length-1),h-pad-(v-min)/span*(h-2*pad)]);
    const poly=coords.map(p=>p.join(',')).join(' ');
    const fmt=n=>'€'+n.toFixed(2);
    historyChart.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Steam verified price history"><line x1="0" y1="'+(h/2)+'" x2="'+w+'" y2="'+(h/2)+'" stroke="#30363b" stroke-dasharray="3 5"/><polyline points="'+poly+'" fill="none" stroke="#55c8f4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="4" y="12" fill="#9da6ad" font-size="10">'+fmt(max)+'</text><text x="4" y="'+(h-2)+'" fill="#9da6ad" font-size="10">'+fmt(min)+'</text></svg>';
  };
  const loadVariantPrices=async()=>{
    if(!activeSkinName||!variantList)return;
    const request=++priceRequest;
    variantPrices={};steamSnapshots=[];
    const isSkin=activeItemType==='weapon';
    if(!isSkin){
      const label=activeItemType==='agent'?'Agent':activeItemType==='sticker'?'Sticker':activeItemType==='case'?'Case':'Collection';
      if(activeItemType==='collection'){
        variantList.innerHTML='<div class="skin-variant-row"><span>Collection</span><strong>—</strong></div>';
        marketStatus.textContent='Collections are drop pools, not individually tradable market items. Open a skin from this collection to see its market price.';
        if(historyChart)historyChart.textContent='No direct market history exists for a collection itself.';
        return;
      }
      variantList.innerHTML='<div class="skin-variant-row selected" data-wear="base"><span>'+label+'</span><strong>Loading…</strong></div>';
      marketStatus.textContent='Loading live Steam Market price…';
    }else{
      variantList.innerHTML=wears.map(w=>'<button type="button" class="skin-variant-row" data-wear="'+w+'"><span>'+w+'</span><strong>Loading…</strong></button>').join('');
      marketStatus.textContent='Loading live prices from Steam. Other selected marketplaces are waiting for API access.';
    }
    marketStatus.textContent='Loading live prices from Steam. Other selected marketplaces are waiting for API access.';
    const active=selectedMarkets();
    if(!active.includes('steam')){marketStatus.textContent='Select Steam to load its verified prices. Other marketplace APIs are not connected yet.';variantList.querySelectorAll('strong').forEach(x=>x.textContent='Not connected');return;}
    const variants=isSkin?wears:['base'];
    await Promise.all(variants.map(async wear=>{
      const hashName=isSkin?activeMarketHashName+' ('+wear+')':activeMarketHashName;
      try{
        const data=await fetchSteam(hashName,request);
        if(request!==priceRequest||!data)return;
        variantPrices[wear]=data.lowest_price||'Not listed';
        if((wear===activeWear||wear==='base')&&Array.isArray(data.history))steamSnapshots=data.history;
        const row=variantList.querySelector('[data-wear="'+wear+'"] strong');
        if(row)row.textContent=data.lowest_price||'Not listed';
      }catch(error){
        if(request!==priceRequest)return;
        variantPrices[wear]='Unavailable';
        const row=variantList.querySelector('[data-wear="'+wear+'"] strong');
        if(row)row.textContent='Unavailable';
      }
    }));
    if(request!==priceRequest)return;
    marketStatus.textContent='Live source: Steam Community Market · EUR. Other markets will show prices after their provider access is connected.';
    renderHistory();
  };
  const renderMarketRows=()=>{
    if(!variantList)return;
    const active=selectedMarkets();
    if(!active.includes('steam')){
      variantList.querySelectorAll('strong').forEach(x=>x.textContent='Not connected');
      marketStatus.textContent='Steam is disabled. Selected third-party marketplaces require API connections before prices can be displayed.';
    }else{
      const list=activeItemType==='weapon'?wears:['base'];
      list.forEach(w=>{const row=variantList.querySelector('[data-wear="'+w+'"] strong');if(row)row.textContent=variantPrices[w]||'—';});
      marketStatus.textContent='Showing verified Steam prices. Third-party sources are selectable but not connected yet.';
    }
  };
  variantList?.addEventListener('click',e=>{
    const row=e.target.closest('[data-wear]');if(!row)return;
    activeWear=row.dataset.wear;
    variantList.querySelectorAll('[data-wear]').forEach(x=>x.classList.toggle('selected',x===row));
    const request=priceRequest;
    if(activeItemType!=='weapon')return;
    const hashName=activeMarketHashName+' ('+activeWear+')';
    fetchSteam(hashName,request).then(data=>{if(data&&request===priceRequest){steamSnapshots=data.history||[];renderHistory();}}).catch(()=>{});
  });
  rangeButtons.forEach(button=>button.addEventListener('click',()=>{
    historyRange=Number(button.dataset.range)||30;
    rangeButtons.forEach(x=>x.classList.toggle('active',x===button));
    const heading=document.querySelector('.skin-history-head strong');
    if(heading)heading.textContent='PRICE HISTORY · '+(historyRange===180?'6 MONTHS':historyRange===365?'1 YEAR':historyRange+' DAYS');
    renderHistory();
  }));
  refreshMarketButton();
  const showViewer=()=>{window.open(inspectUrl(title.textContent),'_blank','noopener,noreferrer');};
  document.getElementById('skinGrid')?.addEventListener('click',event=>{
    const card=event.target.closest('.skin-card');if(!card) return;
    const name=card.dataset.skinName||card.querySelector('.skin-name')?.textContent||'CS2 Skin';
    title.textContent=name;
    activeSkinName=name;
    activeMarketHashName=card.dataset.marketHashName||name;
    activeItemType=card.dataset.itemType||'weapon';
    activeWear='Factory New';
    const isWeapon=activeItemType==='weapon';
    const marketTitle=document.getElementById('skinMarketTitle');
    if(marketTitle)marketTitle.textContent=(activeItemType==='weapon'?'SKIN':activeItemType.toUpperCase())+' MARKET PRICES';
    const variantsTitle=document.querySelector('.skin-variants-title');
    if(variantsTitle)variantsTitle.textContent=isWeapon?'ALL WEAR VARIANTS ⓘ':activeItemType==='sticker'?'STICKER MARKET ITEM':'ITEM MARKET PRICE';
    if(inspect){inspect.style.display=isWeapon?'':'none';}
    if(inspect) inspect.href=inspectUrl(name);
    loadVariantPrices();
    const buy=document.querySelector('.skin-detail-action.buy');
    if(buy)buy.style.display=activeItemType==='collection'?'none':'';
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