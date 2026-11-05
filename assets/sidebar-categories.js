/* AdhemSwag sidebar categories — ordered, deduplicated, with complete link icons */
(() => {
  "use strict";
  const groups = [
    {id:"general",label:"GENERAL",match:u=>["/dashboard/","/profile/"].includes(u.pathname)},
    {id:"rewards",label:"REWARDS",match:u=>["/missions/","/store/","/bonuses/","/giveaway/","/leaderboard/"].includes(u.pathname)},
    {id:"community",label:"COMMUNITY",match:u=>["/donate/","/faq/"].includes(u.pathname)},
    {id:"cs2",label:"CS2",match:u=>["/config/","/skins/","/faceit/"].includes(u.pathname)},
    {id:"social",label:"SOCIAL",match:u=>["twitch.tv","kick.com","instagram.com","t.me","x.com","tiktok.com","discord.gg","discord.com","youtube.com"].some(h=>u.hostname===h||u.hostname.endsWith("."+h))},
    {id:"more",label:"MORE",match:()=>true}
  ];
  const icons = {
    "/skins/": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.3 7.6 7.7 4.5 7.7-4.5M12 21v-9"/></svg>',
    "/faq/": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.3 1.7c-1.1 1-1.9 1.3-1.9 2.8M12 17h.01"/></svg>'
  };
  const canonical = href => {
    try { const u=new URL(href,location.origin); u.pathname=u.pathname.replace(/\/+$/,"")+"/"; return u; }
    catch(e){return null;}
  };
  function addLinkIcon(a,path){
    if(a.querySelector("svg,img")) return;
    if(icons[path]) a.insertAdjacentHTML("afterbegin",icons[path]);
  }
  function organize(sidebar){
    if(!sidebar || sidebar.dataset.categoriesReady==="true") return;
    const brand=sidebar.querySelector(".sidebar-brand");
    const unique=new Map();
    [...sidebar.querySelectorAll("a.sidebar-link")].forEach(a=>{
      const u=canonical(a.getAttribute("href"));
      if(!u)return;
      const key=u.origin+u.pathname;
      if(!unique.has(key)) unique.set(key,a); else a.remove();
    });
    const ensure=(path,label)=>{
      const u=canonical(path),key=u.origin+u.pathname;
      let a=unique.get(key);
      if(!a){
        a=document.createElement("a");a.className="sidebar-link";a.href=path;
        const span=document.createElement("span");span.textContent=label;a.appendChild(span);
        unique.set(key,a);
      }
      addLinkIcon(a,u.pathname);
    };
    ensure("/skins/","CS2 SKINS");
    ensure("/faq/","FAQ");
    const buckets=new Map(groups.map(g=>[g.id,[]]));
    unique.forEach(a=>{
      const u=canonical(a.getAttribute("href"));
      const g=groups.find(x=>x.id!=="more"&&x.match(u))||groups[5];
      buckets.get(g.id).push(a);
    });
    sidebar.replaceChildren();
    if(brand)sidebar.appendChild(brand);
    const divider=document.createElement("div");divider.className="sidebar-divider";sidebar.appendChild(divider);
    groups.forEach(g=>{
      const links=buckets.get(g.id);
      if(!links.length && g.id==="more") return;
      const section=document.createElement("section");section.className="sidebar-group sidebar-group-"+g.id;
      const heading=document.createElement("div");heading.className="sidebar-section-label";heading.textContent=g.label;section.appendChild(heading);
      links.forEach(a=>section.appendChild(a));
      sidebar.appendChild(section);
    });
    sidebar.dataset.categoriesReady="true";
  }

  // One shared mobile menu controller for every page that loads this sidebar asset.
  // Capture early and stop legacy per-page handlers from forcing the drawer open.
  if (!window.__adhemMobileMenuToggleInstalled) {
    window.__adhemMobileMenuToggleInstalled = true;
    const getSide = () => document.querySelector(".sidebar") || document.querySelector(".admin-nav") || document.querySelector(".mobile-fallback-drawer");
    const getScrim = () => document.querySelector("[data-mobile-scrim],.mobile-nav-scrim");
    const getButton = () => document.querySelector("[data-mobile-menu]");
    const closeMenu = () => {
      const side = getSide(), scrim = getScrim(), button = getButton();
      if (side) {
        side.classList.remove("mobile-open");
        side.style.removeProperty("transform");
        side.style.removeProperty("visibility");
        side.style.removeProperty("pointer-events");
        side.style.removeProperty("z-index");
      }
      document.body.classList.remove("mobile-menu-open");
      if (scrim) {
        scrim.classList.remove("open");
        scrim.style.removeProperty("visibility");
        scrim.style.removeProperty("opacity");
        scrim.style.removeProperty("pointer-events");
        scrim.style.removeProperty("z-index");
      }
      if (button) button.setAttribute("aria-expanded", "false");
    };
    const openMenu = () => {
      if (!window.matchMedia("(max-width:700px)").matches) return;
      const side = getSide(), scrim = getScrim(), button = getButton();
      if (!side) return;
      side.classList.add("mobile-open");
      side.style.setProperty("transform", "translate3d(0,0,0)", "important");
      side.style.setProperty("visibility", "visible", "important");
      side.style.setProperty("pointer-events", "auto", "important");
      side.style.setProperty("z-index", "2147483001", "important");
      document.body.classList.add("mobile-menu-open");
      if (scrim) {
        scrim.classList.add("open");
        scrim.style.setProperty("visibility", "visible", "important");
        scrim.style.setProperty("opacity", "1", "important");
        scrim.style.setProperty("pointer-events", "auto", "important");
        scrim.style.setProperty("z-index", "2147483000", "important");
      }
      if (button) button.setAttribute("aria-expanded", "true");
    };
    document.addEventListener("click", event => {
      const menu = event.target.closest("[data-mobile-menu]");
      const close = event.target.closest("[data-mobile-scrim],.mobile-nav-scrim,.mobile-drawer-close");
      if (menu) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const side = getSide();
        if (document.body.classList.contains("mobile-menu-open") || (side && side.classList.contains("mobile-open"))) closeMenu();
        else openMenu();
        return;
      }
      if (close) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeMenu();
        return;
      }
      if (event.target.closest(".sidebar a,.admin-nav a,.mobile-fallback-drawer a")) closeMenu();
    }, true);
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  function boot(){document.querySelectorAll(".sidebar").forEach(organize);}
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();