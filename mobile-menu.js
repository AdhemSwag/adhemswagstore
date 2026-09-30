/* AdhemSwag — one shared mobile menu controller for all pages */
(()=> {
  const mobileQuery='(max-width:700px)';
  const getMenu=()=>document.querySelector('[data-mobile-menu]');
  const getScrim=()=>document.querySelector('[data-mobile-scrim]');
  const getDrawer=()=>document.querySelector('.sidebar,.admin-nav,.mobile-fallback-drawer');
  let previousOverflow='';

  function setOpen(open){
    const drawer=getDrawer(), scrim=getScrim(), menu=getMenu();
    if(!drawer) return;
    if(open && !window.matchMedia(mobileQuery).matches) return;
    if(open){
      previousOverflow=document.body.style.overflow;
      drawer.classList.add('mobile-open');
      scrim?.classList.add('open');
      menu?.setAttribute('aria-expanded','true');
      drawer.setAttribute('aria-hidden','false');
      document.body.classList.add('mobile-menu-open');
    }else{
      drawer.classList.remove('mobile-open');
      scrim?.classList.remove('open');
      menu?.setAttribute('aria-expanded','false');
      drawer.setAttribute('aria-hidden','true');
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow=previousOverflow;
    }
  }

  document.addEventListener('click',(event)=>{
    const menu=event.target.closest('[data-mobile-menu]');
    if(menu){
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
      return;
    }
    if(event.target.closest('[data-mobile-scrim],.mobile-drawer-close')){
      event.preventDefault();
      setOpen(false);
      return;
    }
    if(event.target.closest('.sidebar a,.admin-nav a,.mobile-fallback-drawer a')){
      setOpen(false);
    }
  },true);

  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape') setOpen(false);
  });

  window.addEventListener('resize',()=>{
    if(window.innerWidth>700) setOpen(false);
  });

  document.addEventListener('DOMContentLoaded',()=>{
    const drawer=getDrawer();
    if(drawer) drawer.setAttribute('aria-hidden','true');
  });
})();