(() => {
  const backdrop = document.getElementById('skinDetailBackdrop');
  if (!backdrop) return;
  const title = document.getElementById('skinDetailTitle');
  const image = document.getElementById('skinDetailImage');
  const inspect = document.getElementById('skinDetailInspect');
  const close = () => { backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
  const slug = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/™/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const inspectUrl = name => { const parts=String(name).split('|'); return 'https://cs2inspect.skin/'+encodeURIComponent(slug(parts[0]||''))+'/'+encodeURIComponent(slug(parts.slice(1).join('|')||'')); };
  document.getElementById('skinGrid')?.addEventListener('click', event => {
    if (event.target.closest('a,button')) return;
    const card=event.target.closest('.skin-card');
    if (!card) return;
    const name=card.dataset.skinName || card.querySelector('.skin-name')?.textContent || 'CS2 Skin';
    title.textContent=name;
    const cardImage=card.querySelector('.skin-image img');
    image.src=cardImage?.src || '';
    image.alt=name;
    inspect.href=inspectUrl(name);
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
  close && document.getElementById('skinDetailClose')?.addEventListener('click',close);
  backdrop.addEventListener('click',event=>{if(event.target===backdrop)close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&backdrop.classList.contains('open'))close();});
})();