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
  const inspectUrl=name=>{const params=new URLSearchParams({key:CS2INSPECT_PUBLIC_KEY,name:String(name||''),spin:'6',bg:'transparent',accent:'11D9F7',controls:'1',logo:'minimal'});return 'https://cs2inspect.skin/embed?'+params.toString();};
  const variantList=document.getElementById('skinVariantList');
  const marketPickerButton=document.getElementById('skinMarketPickerButton');
  const marketMenu=document.getElementById('skinMarketMenu');
  const marketChecks=[...(marketMenu?.querySelectorAll('input[type="checkbox"]')||[])];
  const marketStatus=document.getElementById('skinMarketStatus');
  const historyChart=document.getElementById('skinPriceChart'),historySource=document.getElementById('skinHistorySource'),currencySelect=document.getElementById('skinCurrencySelect');
  const rangeButtons=[...document.querySelectorAll('#skinHistoryRanges button')],wears=['Factory New','Minimal Wear','Field-Tested','Well-Worn','Battle-Scarred'];
  const labels={steam:'Steam',skinport:'Skinport',buff:'BUFF163',youpin:'YouPin',csfloat:'CSFloat'};
  let activeSkinName='',activeMarketHashName='',activeItemType='weapon',activeWear='Factory New',priceRequest=0,historyRange=30,variantPrices={},displayCurrency='USD',eurUsdRate=null;
  try{const v=localStorage.getItem('adhem_skins_currency');if(v==='USD'||v==='EUR')displayCurrency=v;}catch(_){}
  if(currencySelect)currencySelect.value=displayCurrency;
  const selectedMarkets=()=>marketChecks.filter(x=>x.checked).map(x=>x.value).filter(x=>labels[x]);
  const refreshMarketButton=()=>{const n=marketChecks.filter(x=>x.checked).map(x=>x.parentElement.textContent.trim());if(marketPickerButton)marketPickerButton.innerHTML=(n.length?n.join(', '):'No market selected')+' <span>⌃</span>';};
  const getRate=async()=>{if(eurUsdRate)return eurUsdRate;const r=await fetch('https://api.frankfurter.app/latest?from=EUR&to=USD');if(!r.ok)throw Error('FX unavailable');const d=await r.json();eurUsdRate=Number(d?.rates?.USD);if(!Number.isFinite(eurUsdRate)||eurUsdRate<=0)throw Error('FX unavailable');return eurUsdRate;};
  const money=n=>new Intl.NumberFormat(undefined,{style:'currency',currency:displayCurrency,maximumFractionDigits:2}).format(displayCurrency==='EUR'?Number(n)/(eurUsdRate||1):Number(n));
  const fetchPrices=async(name,req)=>{const r=await fetch('https://api.openskin.dev/v1/prices?item='+encodeURIComponent(name));const d=await r.json();if(req!==priceRequest)return null;if(!r.ok||!d?.prices)throw Error('Price data unavailable');return d;};
  const fetchHistory=async(name,market,req)=>{const to=new Date(),from=new Date(Date.now()-historyRange*86400000),fmt=d=>d.toISOString().slice(0,10);const r=await fetch('https://api.openskin.dev/v1/history',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({item:name,marketplace:market,from:fmt(from),to:fmt(to),interval:'daily'})});const d=await r.json();if(req!==priceRequest)return [];if(!r.ok)throw Error(d?.error||'History unavailable');return Array.isArray(d.data)?d.data:[];};
  const renderHistory=async()=>{if(!historyChart)return;const req=priceRequest,markets=selectedMarkets(),market=markets.includes('steam')?'steam':markets[0];if(!market){historyChart.textContent='Select a marketplace to view history.';return;}historyChart.textContent='Loading '+labels[market]+' history…';try{const name=activeMarketHashName+(activeItemType==='weapon'?' ('+activeWear+')':'');const pts=await fetchHistory(name,market,req);if(req!==priceRequest)return;if(displayCurrency==='EUR')await getRate();if(req!==priceRequest)return;const toDate=value=>{const numeric=typeof value==='number'||(typeof value==='string'&&/^\\d+$/.test(value));const n=Number(value);return numeric?new Date(n<1e12?n*1000:n):new Date(value);};const p=pts.filter(x=>x.timestamp&&Number.isFinite(Number(x.price))).sort((a,b)=>toDate(a.timestamp)-toDate(b.timestamp));if(!p.length){historyChart.textContent='No historical records found for this item on '+labels[market]+' in this date range. Try another marketplace or a longer period.';return;}if(p.length<2){historyChart.textContent='Only one recorded price is available for this period. A trend needs at least two daily records.';return;}const vals=p.map(x=>Number(x.price)),min=Math.min(...vals),max=Math.max(...vals),span=max-min||1,w=760,h=170,pad=18,xy=vals.map((v,i)=>[pad+i*(w-2*pad)/(vals.length-1),h-pad-(v-min)/span*(h-2*pad)]),poly=xy.map(v=>v.join(',')).join(' '),fmt=n=>money(n),first=toDate(p[0].timestamp),last=toDate(p[p.length-1].timestamp),dateFmt=d=>d.toLocaleDateString(undefined,{month:'short',day:'numeric'});historyChart.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+labels[market]+' daily price history"><line x1="0" y1="'+h/2+'" x2="'+w+'" y2="'+h/2+'" stroke="#30363b" stroke-dasharray="3 5"/><polyline points="'+poly+'" fill="none" stroke="#55c8f4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="4" y="12" fill="#9da6ad" font-size="10">'+fmt(max)+'</text><text x="4" y="'+(h-17)+'" fill="#9da6ad" font-size="10">'+fmt(min)+'</text><text x="'+pad+'" y="'+(h-2)+'" fill="#718994" font-size="10">'+dateFmt(first)+'</text><text x="'+(w-pad)+'" y="'+(h-2)+'" text-anchor="end" fill="#718994" font-size="10">'+dateFmt(last)+'</text></svg>';historySource.textContent='OpenSkin · '+labels[market]+' · '+p.length+' daily data points · '+dateFmt(first)+' – '+dateFmt(last)+' · '+displayCurrency;}catch(e){if(req===priceRequest)historyChart.textContent='Price history could not load right now. Please try again shortly or select another marketplace.';}};
  const formatPrices=p=>selectedMarkets().map(m=>{const v=p?.[m],n=[v?.ask,v?.median,v?.bid].map(Number).find(x=>Number.isFinite(x)&&x>0);return n?labels[m]+' '+money(n):null;}).filter(Boolean).join(' · ')||'Not listed on selected markets';
  const loadVariantPrices=async()=>{if(!activeSkinName||!variantList)return;const req=++priceRequest;variantPrices={};const skin=activeItemType==='weapon';if(!skin){const label=activeItemType==='agent'?'Agent':activeItemType==='sticker'?'Sticker':activeItemType==='case'?'Case':'Collection';if(activeItemType==='collection'){variantList.innerHTML='<div class="skin-variant-row"><span>Collection</span><strong>—</strong></div>';marketStatus.textContent='Collections are not individually tradable.';historyChart.textContent='No direct market history for a collection.';return;}variantList.innerHTML='<div class="skin-variant-row selected" data-wear="base"><span>'+label+'</span><strong>Loading…</strong></div>';}else variantList.innerHTML=wears.map(w=>'<button type="button" class="skin-variant-row" data-wear="'+w+'"><span>'+w+'</span><strong>Loading…</strong></button>').join('');marketStatus.textContent='Loading free OpenSkin marketplace prices…';if(!selectedMarkets().length){marketStatus.textContent='Select a supported marketplace.';return;}if(displayCurrency==='EUR'){try{await getRate();}catch(_){marketStatus.textContent='EUR conversion is temporarily unavailable. USD prices can still be viewed; switch to USD and try again later.';return;}}const list=skin?wears:['base'];await Promise.all(list.map(async wear=>{try{const name=skin?activeMarketHashName+' ('+wear+')':activeMarketHashName,d=await fetchPrices(name,req);if(req!==priceRequest||!d)return;variantPrices[wear]=d.prices;const el=variantList.querySelector('[data-wear="'+wear+'"] strong');if(el)el.textContent=formatPrices(d.prices);}catch(_){if(req!==priceRequest)return;variantPrices[wear]={};const el=variantList.querySelector('[data-wear="'+wear+'"] strong');if(el)el.textContent='Unavailable';}}));if(req!==priceRequest)return;const requestedMarkets=selectedMarkets();const hasAnyPrice=Object.values(variantPrices).some(prices=>requestedMarkets.some(m=>{const v=prices?.[m];return [v?.ask,v?.median,v?.bid].some(value=>Number.isFinite(Number(value))&&Number(value)>0);}));const failedCount=list.filter(w=>!variantPrices[w]).length;marketStatus.textContent=hasAnyPrice?'OpenSkin prices loaded. Values are indicative and are not guaranteed trade quotes.':failedCount===list.length?'OpenSkin could not return price data right now. Please try again later.':'No prices are currently listed for this item on the selected marketplaces.';renderHistory();};
  const renderMarketRows=()=>{if(!variantList)return;variantList.querySelectorAll('[data-wear]').forEach(row=>{const el=row.querySelector('strong');if(el)el.textContent=variantPrices[row.dataset.wear]?formatPrices(variantPrices[row.dataset.wear]):'—';});marketStatus.textContent=selectedMarkets().length?'Showing available OpenSkin prices.':'Select at least one supported marketplace.';};
  marketPickerButton?.addEventListener('click',()=>{marketMenu.hidden=!marketMenu.hidden;marketPickerButton.setAttribute('aria-expanded',String(!marketMenu.hidden));});
  document.addEventListener('click',e=>{if(marketMenu&&!e.target.closest('#skinMarketPicker')){marketMenu.hidden=true;marketPickerButton?.setAttribute('aria-expanded','false');}});
  marketChecks.forEach(x=>x.addEventListener('change',()=>{refreshMarketButton();renderMarketRows();renderHistory();}));
  currencySelect?.addEventListener('change',async()=>{displayCurrency=currencySelect.value==='USD'?'USD':'EUR';try{localStorage.setItem('adhem_skins_currency',displayCurrency);}catch(_){}if(displayCurrency==='EUR'){try{await getRate();}catch(_){marketStatus.textContent='EUR conversion is temporarily unavailable. Prices are available in USD; switch currency to continue.';return;}}renderMarketRows();renderHistory();});
  variantList?.addEventListener('click',e=>{const row=e.target.closest('[data-wear]');if(!row)return;activeWear=row.dataset.wear;variantList.querySelectorAll('[data-wear]').forEach(x=>x.classList.toggle('selected',x===row));renderHistory();});
  rangeButtons.forEach(b=>b.addEventListener('click',()=>{historyRange=Number(b.dataset.range)||30;rangeButtons.forEach(x=>x.classList.toggle('active',x===b));const h=document.querySelector('.skin-history-head strong');if(h)h.textContent='PRICE HISTORY · '+(historyRange===180?'6 MONTHS':historyRange===365?'1 YEAR':historyRange+' DAYS');renderHistory();}));
  refreshMarketButton();
  const showViewer=()=>{
    if(!viewer||!activeSkinName)return;
    preview.hidden=true;viewer.hidden=false;viewer.replaceChildren();
    const frame=document.createElement('iframe');
    frame.src=inspectUrl(activeMarketHashName||activeSkinName);
    frame.title='3D inspection — '+activeSkinName;
    frame.loading='lazy';frame.allow='fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.style.cssText='display:block;width:100%;height:100%;min-height:360px;border:0;background:transparent';
    viewer.appendChild(frame);
  };
  document.getElementById('skinGrid')?.addEventListener('click',event=>{
    const card=event.target.closest('.skin-card');if(!card) return;
    const name=card.dataset.skinName||card.querySelector('.skin-name')?.textContent||'CS2 Skin';
    title.textContent=name;
    activeSkinName=name;
    window.dispatchEvent(new CustomEvent('adhem:skin-recent',{detail:{name}}));
    activeMarketHashName=card.dataset.marketHashName||name;
    activeItemType=card.dataset.itemType||'weapon';
    activeWear='Factory New';
    const isWeapon=activeItemType==='weapon';
    const marketTitle=document.getElementById('skinMarketTitle');
    if(marketTitle)marketTitle.textContent=(activeItemType==='weapon'?'SKIN':activeItemType.toUpperCase())+' MARKET PRICES';
    const variantsTitle=document.querySelector('.skin-variants-title');
    if(variantsTitle)variantsTitle.textContent=isWeapon?'ALL WEAR VARIANTS ⓘ':activeItemType==='sticker'?'STICKER MARKET ITEM':'ITEM MARKET PRICE';
    if(inspect){inspect.style.display=isWeapon?'':'none';inspect.href='#';inspect.textContent='INSPECT IN 3D';}
    loadVariantPrices();
    const buy=document.querySelector('.skin-detail-action.buy');
    if(buy)buy.style.display=activeItemType==='collection'?'none':'';
    const source=card.querySelector('.skin-image img');
    image.src=source?.src||'';image.alt=name;
    preview.hidden=false;viewer.hidden=true;viewer.replaceChildren();
    backdrop.classList.add('open');backdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  });
  inspect?.addEventListener('click',event=>{event.preventDefault();showViewer();});
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