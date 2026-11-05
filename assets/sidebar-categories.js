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
  function boot(){document.querySelectorAll(".sidebar").forEach(organize);}
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();