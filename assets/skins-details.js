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
  const showViewer=()=>{window.open(inspectUrl(title.textContent),'_blank','noopener,noreferrer');};
  document.getElementById('skinGrid')?.addEventListener('click',event=>{
    const card=event.target.closest('.skin-card');if(!card) return;
    const name=card.dataset.skinName||card.querySelector('.skin-name')?.textContent||'CS2 Skin';
    title.textContent=name;
    if(inspect) inspect.href=inspectUrl(name);
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