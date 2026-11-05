(() => {
  if (document.documentElement.dataset.adhemSkinsNav === '1') return;
  document.documentElement.dataset.adhemSkinsNav = '1';

  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 8 5v10l-8 5-8-5V7l8-5Z"/><path d="m4 7 8 5 8-5M12 12v10"/></svg>';

  function addMobileFallbackLink(nav) {
    if (!nav || nav.querySelector('[data-adhem-skins-link]')) return;

    // The shared sidebar organizer owns desktop and regular mobile sidebars.
    // Only handle the legacy fallback drawer, and only inside its CS2 group.
    const cs2Group = nav.querySelector('.sidebar-group-cs2');
    if (!cs2Group) return;

    const link = document.createElement('a');
    link.href = '/skins/';
    link.setAttribute('data-adhem-skins-link', '1');
    link.setAttribute('aria-label', 'CS2 Skins');
    link.className = 'sidebar-link';
    link.innerHTML = icon + '<span>CS2 Skins</span>';
    link.style.setProperty('display', 'flex');
    link.style.setProperty('align-items', 'center');
    link.style.setProperty('gap', '12px');

    if (location.pathname.replace(/\/$/, '') === '/skins') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }

    cs2Group.appendChild(link);
  }

  function apply() {
    document.querySelectorAll('.mobile-fallback-drawer').forEach(addMobileFallbackLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();