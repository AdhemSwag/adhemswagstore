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
  const showViewer=()=>{
    preview.hidden=true;viewer.hidden=false;
    if(!CS2INSPECT_PUBLIC_KEY){
      viewer.innerHTML='<div class="skin-viewer-help"><strong>3D VIEWER — SETUP REQUIRED</strong><p>Le viewer 3D est prêt à être activé. Il manque uniquement ta clé publique CS2Inspect.</p><ol><li>Ouvre <a href="https://cs2inspect.skin" target="_blank" rel="noopener">cs2inspect.skin</a> et connecte-toi.</li><li>Dans ton compte, ouvre <strong>API → New key</strong>.</li><li>Autorise le domaine <strong>adhemswag.com</strong> (ajoute aussi <strong>www.adhemswag.com</strong> si proposé).</li><li>Envoie-moi la clé publique qui commence par <strong>pk_live_</strong>. Ne donne jamais de mot de passe ni de clé privée.</li></ol></div>';
      return;
    }
    const src='https://cs2inspect.skin/embed?'+new URLSearchParams({key:CS2INSPECT_PUBLIC_KEY,name:title.textContent,spin:'6',controls:'1',interactive:'1',accent:'11D9F7',logo:'minimal'});
    const frame=document.createElement('iframe');
    frame.src=src;frame.title=title.textContent+' — 3D skin viewer';frame.loading='lazy';
    frame.allow='accelerometer; gyroscope; fullscreen';frame.referrerPolicy='strict-origin';
    viewer.appendChild(frame);
  };
  document.getElementById('skinGrid')?.addEventListener('click',event=>{
    if(event.target.closest('a,button')) return;
    const card=event.target.closest('.skin-card');if(!card) return;
    const name=card.dataset.skinName||card.querySelector('.skin-name')?.textContent||'CS2 Skin';
    title.textContent=name;
    const source=card.querySelector('.skin-image img');
    image.src=source?.src||'';image.alt=name;
    preview.hidden=false;viewer.hidden=true;viewer.replaceChildren();
    backdrop.classList.add('open');backdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  });
  inspect?.addEventListener('click',showViewer);
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