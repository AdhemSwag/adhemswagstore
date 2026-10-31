(() => {
  if (document.documentElement.dataset.adhemSkinsNav === '1') return;
  document.documentElement.dataset.adhemSkinsNav = '1';
  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 8 5v10l-8 5-8-5V7l8-5Z"/><path d="m4 7 8 5 8-5M12 12v10"/></svg>';
  function addLink(nav, mobile) {
    if (!nav || nav.querySelector('[data-adhem-skins-link]')) return;
    const store = nav.querySelector('a[href="/store/"],a[href="/store"]');
    if (!store) return;
    const link = document.createElement('a');
    link.href = '/skins/';
    link.setAttribute('data-adhem-skins-link', '1');
    link.setAttribute('aria-label', 'CS2 Skins');
    link.className = store.className || (mobile ? '' : 'sidebar-link');
    link.innerHTML = icon + '<span>CS2 Skins</span>';
    link.style.setProperty('display','flex');
    link.style.setProperty('align-items','center');
    link.style.setProperty('gap','12px');
    if (!link.className) {
      link.style.setProperty('padding','12px 13px');
      link.style.setProperty('border-radius','10px');
      link.style.setProperty('color','inherit');
      link.style.setProperty('text-decoration','none');
      link.style.setProperty('font-size','13px');
    }
    if (location.pathname.replace(/\/$/, '') === '/skins') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
    store.insertAdjacentElement('afterend', link);
  }
  function apply() {
    document.querySelectorAll('.sidebar,.mobile-fallback-drawer').forEach(nav => addLink(nav, false));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
})();