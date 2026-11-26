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
  // Diagnostics stay internal: never expose developer logs in public skin details.
  const diagnostics={prices:new Map(),history:'Not checked',runtime:[],marketConfig:'Steam only by default'};
  const updateDiagnostics=()=>{};
  const setPriceDiagnostic=(item,patch)=>{
    const current=diagnostics.prices.get(item)||{openSkin:'Not checked',result:'Pending'};
    diagnostics.prices.set(item,{...current,...patch});
  };
  window.addEventListener('error',event=>{diagnostics.runtime.push(event.message||'Uncaught JavaScript error');});
  window.addEventListener('unhandledrejection',event=>{diagnostics.runtime.push(String(event.reason?.message||event.reason||'Unhandled promise rejection'));});
  const historyChart=document.getElementById('skinPriceChart'),historySource=document.getElementById('skinHistorySource'),currencySelect=document.getElementById('skinCurrencySelect');
  const rangeButtons=[...document.querySelectorAll('#skinHistoryRanges button')],wears=['Factory New','Minimal Wear','Field-Tested','Well-Worn','Battle-Scarred'];
  const labels={steam:'Steam',skinport:'Skinport',buff:'BUFF163',youpin:'YouPin',csfloat:'CSFloat'};
  let activeSkinName='',activeMarketHashName='',activeItemType='weapon',activeWear='Factory New',priceRequest=0,historyRequest=0,historyRange=30,variantPrices={},variantSources={},variantErrors={},displayCurrency='USD',eurUsdRate=null;
  try{const v=localStorage.getItem('adhem_skins_currency');if(v==='USD'||v==='EUR')displayCurrency=v;}catch(_){}
  if(currencySelect)currencySelect.value=displayCurrency;
  const selectedMarkets=()=>marketChecks.filter(x=>x.checked).map(x=>x.value).filter(x=>labels[x]);
  const refreshMarketButton=()=>{const n=marketChecks.filter(x=>x.checked).map(x=>x.parentElement.textContent.trim());if(marketPickerButton)marketPickerButton.innerHTML=(n.length?n.join(', '):'No market selected')+' <span>⌃</span>';};
  const getRate=async()=>{if(eurUsdRate)return eurUsdRate;const r=await fetch('https://api.frankfurter.app/latest?from=EUR&to=USD');if(!r.ok)throw Error('FX unavailable');const d=await r.json();eurUsdRate=Number(d?.rates?.USD);if(!Number.isFinite(eurUsdRate)||eurUsdRate<=0)throw Error('FX unavailable');return eurUsdRate;};
  const money=n=>new Intl.NumberFormat(undefined,{style:'currency',currency:displayCurrency,maximumFractionDigits:2}).format(displayCurrency==='EUR'?Number(n)/(eurUsdRate||1):Number(n));
  class PriceRequestError extends Error {
    constructor(message,status=0,code='request_failed'){super(message);this.name='PriceRequestError';this.status=status;this.code=code;}
  }
  const fetchJson=async(url,options={})=>{
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
    try{
      let response;
      try{response=await fetch(url,{...options,cache:'no-store',signal:controller.signal,headers:{Accept:'application/json',...(options.headers||{})}});}
      catch(error){throw new PriceRequestError(error?.name==='AbortError'?'Request timed out':'Network request failed',0,error?.name==='AbortError'?'timeout':'network_error');}
      const raw=await response.text();
      let data=null;
      try{data=raw?JSON.parse(raw):null;}catch(_){throw new PriceRequestError('Provider returned invalid JSON (HTTP '+response.status+')',response.status,'invalid_json');}
      if(!response.ok){
        const code=data?.error==='openskin_network_error'?'network_error'
          :data?.error==='openskin_timeout'?'timeout'
          :data?.error==='openskin_invalid_json'?'invalid_json'
          :data?.error==='openskin_invalid_schema'?'invalid_schema'
          :response.status===404?'item_not_found'
          :response.status===429?'rate_limited'
          :response.status>=500?'provider_unavailable':'provider_rejected';
        throw new PriceRequestError(data?.message||data?.details||data?.error||('HTTP '+response.status),response.status,code);
      }
      return data;
    }finally{clearTimeout(timer);}
  };
  const steamFallbackCache=new Map();
  const fetchSteamFallback=async(name,req)=>{
    const cached=steamFallbackCache.get(name);
    if(cached&&Date.now()-cached.at<300000)return cached.data;
    const client=window.AdhemAuth;
    if(!client?.functions?.invoke)throw Error('Steam price fallback is unavailable');
    const {data,error}=await client.functions.invoke('cs2-market-prices',{body:{market_hash_name:name}});
    if(error)throw error;
    if(req!==priceRequest)return null;
    if(!data||data.error)throw Error(data?.error||'Steam price lookup failed');
    const ask=Number(data.lowest_price_value),median=Number(data.median_price_value);
    const prices={steam:{ask:Number.isFinite(ask)&&ask>0?ask:null,median:Number.isFinite(median)&&median>0?median:null,bid:null}};
    const history=Array.isArray(data.history)?data.history:[];
    steamFallbackCache.set(name,{at:Date.now(),data:{item:name,prices},history});
    if(!prices.steam.ask&&!prices.steam.median)throw Error('Steam has no current price for this item');
    return {item:name,prices};
  };
  const hasPositiveQuote=value=>['ask','median','bid'].some(key=>typeof value?.[key]==='number'&&Number.isFinite(value[key])&&value[key]>0);
  const fetchPrices=async(name,req)=>{
    setPriceDiagnostic(name,{openSkin:'Checking OpenSkin V1',result:'Pending'});
    let openSkinData=null,openSkinError=null;
    try{
      openSkinData=await fetchJson('/api/cs2-skins-market?kind=prices&item='+encodeURIComponent(name));
      if(req!==priceRequest)return null;
      if(!openSkinData||typeof openSkinData!=='object'||!openSkinData.prices||typeof openSkinData.prices!=='object'||Array.isArray(openSkinData.prices)){
        throw new PriceRequestError('OpenSkin response has an invalid prices object',200,'invalid_schema');
      }
      setPriceDiagnostic(name,{openSkin:'OpenSkin V1 response received',result:'Validating selected marketplace quotes'});
    }catch(error){
      openSkinError=error;
      const message=error.code==='item_not_found'?'Item not listed by OpenSkin'
        :error.code==='invalid_schema'||error.code==='invalid_json'?'OpenSkin response parsing error'
        :error.code==='rate_limited'?'OpenSkin rate limited'
        :error.code==='provider_unavailable'?'OpenSkin temporarily unavailable'
        :error.code==='network_error'?'Server could not reach OpenSkin'
        :error.code==='timeout'?'OpenSkin request timed out':'OpenSkin request failed';
      setPriceDiagnostic(name,{openSkin:message,result:error.message||message});
    }
    if(req!==priceRequest)return null;
    const markets=selectedMarkets();
    const prices={...(openSkinData?.prices||{})};
    const openSkinHasQuote=markets.some(m=>hasPositiveQuote(prices[m]));
    let fallbackUsed=false;
    if(markets.includes('steam')&&!hasPositiveQuote(prices.steam)){
      try{
        const fallback=await fetchSteamFallback(name,req);
        if(req!==priceRequest)return null;
        if(hasPositiveQuote(fallback?.prices?.steam)){
          prices.steam=fallback.prices.steam;
          fallbackUsed=true;
        }
      }catch(_){}
    }
    const anyQuote=markets.some(m=>hasPositiveQuote(prices[m]));
    if(anyQuote){
      const source=fallbackUsed?(openSkinHasQuote?'mixed':'supabase'):'openskin';
      setPriceDiagnostic(name,{result:source==='supabase'?'Steam backup quote':source==='mixed'?'OpenSkin plus Steam backup':'OpenSkin V1 quote'});
      return {item:name,prices,source};
    }
    if(openSkinData){
      setPriceDiagnostic(name,{result:'OpenSkin responded successfully but no positive quote exists for the selected marketplace'});
      throw new PriceRequestError('No current quote is listed for this item on the selected marketplace',200,'item_unpriced');
    }
    if(openSkinError?.code==='item_not_found')throw new PriceRequestError('This item is not listed by OpenSkin',404,'item_not_found');
    throw openSkinError||new PriceRequestError('No current market data is available',0,'no_data');
  };
  const normalizeHistoryPoint=point=>{
    if(!point||typeof point!=='object')return null;
    const rawDate=point.timestamp??point.observed_at??point.date??point.time;
    const rawPrice=point.price??point.price_value??point.median_price;
    const date=typeof rawDate==='number'||(typeof rawDate==='string'&&/^\d+$/.test(rawDate))
      ?new Date(Number(rawDate)<1e12?Number(rawDate)*1000:Number(rawDate))
      :new Date(rawDate);
    const price=Number(rawPrice);
    return Number.isFinite(date.getTime())&&Number.isFinite(price)&&price>0?{timestamp:date.toISOString(),price}:null;
  };
  const fetchHistory=async(name,market,req)=>{
    const to=new Date(),from=new Date(Date.now()-historyRange*86400000),fmt=d=>d.toISOString().slice(0,10);
    let points=[],openSkinHistoryError=null;
    try{
      const data=await fetchJson('/api/cs2-skins-market?kind=history',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({item:name,marketplace:market,from:fmt(from),to:fmt(to),interval:'daily'})
      });
      if(req!==priceRequest)return [];
      if(!Array.isArray(data?.data))throw new PriceRequestError('History response does not contain a data array',200,'invalid_schema');
      points=data.data.map(normalizeHistoryPoint).filter(Boolean);
      diagnostics.history=points.length?'OpenSkin V1 · '+points.length+' usable points':'OpenSkin V1 · no history points for this range';
      updateDiagnostics();
    }catch(error){
      openSkinHistoryError=error;
      diagnostics.history='OpenSkin history unavailable: '+(error.message||error.code||'request failed');
      updateDiagnostics();
    }
    if(req!==priceRequest)return [];
    if(points.length)return points;
    if(market==='steam'){
      let cached=steamFallbackCache.get(name);
      if(!cached){try{await fetchSteamFallback(name,req);}catch(_){}cached=steamFallbackCache.get(name);}
      if(req!==priceRequest)return [];
      const cutoff=Date.now()-historyRange*86400000;
      const fallbackPoints=(cached?.history||[]).map(normalizeHistoryPoint).filter(point=>point&&new Date(point.timestamp).getTime()>=cutoff);
      if(fallbackPoints.length){
        diagnostics.history='Supabase backup · '+fallbackPoints.length+' usable points (not an OpenSkin quote)';
        updateDiagnostics();
      }else if(openSkinHistoryError){
        diagnostics.history='OpenSkin unavailable; no usable Supabase backup history';
        updateDiagnostics();
      }
      return fallbackPoints;
    }
    return [];
  };
  const renderHistory=async()=>{
    if(!historyChart)return;
    const req=priceRequest,historyReq=++historyRequest,markets=selectedMarkets(),market=markets.includes('steam')?'steam':markets[0];
    if(!market){historyChart.textContent='Select a marketplace to view history.';if(historySource)historySource.textContent='';return;}
    historyChart.textContent='Loading '+labels[market]+' history…';
    try{
      const name=activeMarketHashName+(activeItemType==='weapon'?' ('+activeWear+')':'');
      const pts=await fetchHistory(name,market,req);
      if(req!==priceRequest||historyReq!==historyRequest)return;
      if(displayCurrency==='EUR')await getRate();
      if(req!==priceRequest||historyReq!==historyRequest)return;
      const p=pts.map(normalizeHistoryPoint).filter(Boolean).sort((a,b)=>new Date(a.timestamp)-new Date(b.timestamp));
      const source=diagnostics.history.includes('Supabase backup')?'Supabase backup':'OpenSkin V1';
      if(historySource)historySource.textContent=source+' · '+labels[market]+' · '+p.length+' usable data points · '+displayCurrency;
      if(!p.length){historyChart.textContent='No historical records are available for this item and marketplace in the selected period.';return;}
      if(p.length<2){historyChart.textContent='Only one valid historical price is available. A price trend needs at least two points.';return;}
      const vals=p.map(x=>x.price),min=Math.min(...vals),max=Math.max(...vals),span=max-min||1,w=760,h=170,pad=18;
      const xy=vals.map((v,i)=>[pad+i*(w-2*pad)/(vals.length-1),h-pad-(v-min)/span*(h-2*pad)]);
      const poly=xy.map(v=>v.join(',')).join(' '),fmt=n=>money(n),first=new Date(p[0].timestamp),last=new Date(p[p.length-1].timestamp);
      const dateFmt=d=>d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
      historyChart.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+labels[market]+' daily price history"><line x1="0" y1="'+h/2+'" x2="'+w+'" y2="'+h/2+'" stroke="#30363b" stroke-dasharray="3 5"/><polyline points="'+poly+'" fill="none" stroke="#55c8f4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="4" y="12" fill="#9da6ad" font-size="10">'+fmt(max)+'</text><text x="4" y="'+(h-17)+'" fill="#9da6ad" font-size="10">'+fmt(min)+'</text><text x="'+pad+'" y="'+(h-2)+'" fill="#718994" font-size="10">'+dateFmt(first)+'</text><text x="'+(w-pad)+'" y="'+(h-2)+'" text-anchor="end" fill="#718994" font-size="10">'+dateFmt(last)+'</text></svg>';
      if(historySource)historySource.textContent=source+' · '+labels[market]+' · '+p.length+' daily data points · '+dateFmt(first)+' – '+dateFmt(last)+' · '+displayCurrency;
    }catch(_){
      if(req===priceRequest&&historyReq===historyRequest){historyChart.textContent='Price history is temporarily unavailable. Please try again shortly.';if(historySource)historySource.textContent='History provider unavailable';}
    }
  };
  const formatPrices=(p,source='openskin')=>selectedMarkets().map(m=>{
    const v=p?.[m],n=[v?.ask,v?.median,v?.bid].find(x=>typeof x==='number'&&Number.isFinite(x)&&x>0);
    return n?labels[m]+' '+money(n)+(m==='steam'&&(source==='supabase'||source==='mixed')?' · backup':''):null;
  }).filter(Boolean).join(' · ')||'Not listed on selected markets';
  const loadVariantPrices=async()=>{if(!activeSkinName||!variantList)return;const req=++priceRequest;variantPrices={};variantSources={};variantErrors={};const skin=activeItemType==='weapon';if(!skin){const label=activeItemType==='agent'?'Agent':activeItemType==='sticker'?'Sticker':activeItemType==='case'?'Case':'Collection';if(activeItemType==='collection'){variantList.innerHTML='<div class="skin-variant-row"><span>Collection</span><strong>—</strong></div>';marketStatus.textContent='Collections are not individually tradable.';historyChart.textContent='No direct market history for a collection.';return;}variantList.innerHTML='<div class="skin-variant-row selected" data-wear="base"><span>'+label+'</span><strong>Loading…</strong></div>';}else variantList.innerHTML=wears.map(w=>'<button type="button" class="skin-variant-row" data-wear="'+w+'"><span>'+w+'</span><strong>Loading…</strong></button>').join('');marketStatus.textContent='Loading marketplace prices…';if(!selectedMarkets().length){marketStatus.textContent='Select a supported marketplace.';return;}if(displayCurrency==='EUR'){try{await getRate();}catch(_){marketStatus.textContent='EUR conversion is temporarily unavailable. USD prices can still be viewed; switch to USD and try again later.';return;}}const list=skin?wears:['base'];await Promise.all(list.map(async wear=>{try{const name=skin?activeMarketHashName+' ('+wear+')':activeMarketHashName,d=await fetchPrices(name,req);if(req!==priceRequest||!d)return;variantPrices[wear]=d.prices;variantSources[wear]=d.source||'openskin';const el=variantList.querySelector('[data-wear="'+wear+'"] strong');if(el)el.textContent=formatPrices(d.prices,d.source);}catch(error){if(req!==priceRequest)return;variantPrices[wear]={};variantErrors[wear]=error?.code||'request_failed';const el=variantList.querySelector('[data-wear="'+wear+'"] strong');if(el)el.textContent='Unavailable';}}));if(req!==priceRequest)return;const requestedMarkets=selectedMarkets();const hasAnyPrice=Object.values(variantPrices).some(prices=>requestedMarkets.some(m=>hasPositiveQuote(prices?.[m])));const allUnlisted=list.every(w=>['item_unpriced','item_not_found'].includes(variantErrors[w]));const failedCount=list.filter(w=>variantErrors[w]).length;
    const usedBackup=Object.values(variantSources).some(source=>source==='supabase'||source==='mixed');
    marketStatus.textContent=hasAnyPrice
      ?(usedBackup?'Steam backup data is being used where OpenSkin has no quote. ':'OpenSkin market data loaded. ')+'Prices are indicative and are not guaranteed trade quotes.'
      :allUnlisted?'No current quote is listed for this item on the selected marketplace.':failedCount===list.length?'Market data is temporarily unavailable. Please try again shortly.':'Some marketplace prices are unavailable for this item.';renderHistory();};
  const renderMarketRows=()=>{if(!variantList)return;variantList.querySelectorAll('[data-wear]').forEach(row=>{const el=row.querySelector('strong');if(el)el.textContent=variantPrices[row.dataset.wear]?formatPrices(variantPrices[row.dataset.wear],variantSources[row.dataset.wear]):'—';});marketStatus.textContent=selectedMarkets().length?'Showing available prices for the selected marketplace.':'Select at least one supported marketplace.';};
  marketPickerButton?.addEventListener('click',()=>{marketMenu.hidden=!marketMenu.hidden;marketPickerButton.setAttribute('aria-expanded',String(!marketMenu.hidden));});
  document.addEventListener('click',e=>{if(marketMenu&&!e.target.closest('#skinMarketPicker')){marketMenu.hidden=true;marketPickerButton?.setAttribute('aria-expanded','false');}});
  marketChecks.forEach(x=>x.addEventListener('change',()=>{refreshMarketButton();loadVariantPrices();}));
  currencySelect?.addEventListener('change',async()=>{displayCurrency=currencySelect.value==='USD'?'USD':'EUR';try{localStorage.setItem('adhem_skins_currency',displayCurrency);}catch(_){}if(displayCurrency==='EUR'){try{await getRate();}catch(_){marketStatus.textContent='EUR conversion is temporarily unavailable. Prices are available in USD; switch currency to continue.';return;}}renderMarketRows();renderHistory();});
  variantList?.addEventListener('click',e=>{const row=e.target.closest('[data-wear]');if(!row)return;activeWear=row.dataset.wear;variantList.querySelectorAll('[data-wear]').forEach(x=>x.classList.toggle('selected',x===row));renderHistory();});
  rangeButtons.forEach(b=>b.addEventListener('click',()=>{historyRange=Number(b.dataset.range)||30;rangeButtons.forEach(x=>x.classList.toggle('active',x===b));const h=document.querySelector('.skin-history-head strong');if(h)h.textContent='PRICE HISTORY · '+(historyRange===180?'6 MONTHS':historyRange===365?'1 YEAR':historyRange+' DAYS');renderHistory();}));
  marketChecks.forEach(check=>{check.checked=check.value==='steam';});
  refreshMarketButton();
  updateDiagnostics();
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