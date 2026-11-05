/* AdhemSwag sidebar categories — desktop and mobile-safe grouping */
(() => {
  "use strict";
  const groups = [
    {id:"general",label:"GENERAL",match:u=>u.pathname==="/dashboard/"||u.pathname==="/profile/"},
    {id:"cs2",label:"CS2",match:u=>["/config/","/skins/","/faceit/"].includes(u.pathname)},
    {id:"rewards",label:"REWARDS",match:u=>["/missions/","/store/","/bonuses/","/giveaway/","/leaderboard/"].includes(u.pathname)},
    {id:"community",label:"COMMUNITY",match:u=>["/donate/","/faq/"].includes(u.pathname)},
    {id:"social",label:"SOCIAL",match:u=>["twitch.tv","kick.com","instagram.com","t.me","x.com","tiktok.com","discord.gg","discord.com","youtube.com"].some(h=>u.hostname===h||u.hostname.endsWith("."+h))},
    {id:"more",label:"MORE",match:()=>true}
  ];
  const canonical = href => { try { const u=new URL(href,location.origin); u.pathname=u.pathname.replace(/\/+$/,"")+"/"; return u; } catch(e){return null;} };
  function organize(sidebar){
    if(!sidebar) return;
    const brand=sidebar.querySelector(".sidebar-brand");
    const all=[...sidebar.querySelectorAll("a.sidebar-link")];
    const unique=new Map();
    all.forEach(a=>{
      const u=canonical(a.getAttribute("href"));
      if(!u)return;
      const key=u.origin+u.pathname;
      if(!unique.has(key)) unique.set(key,a);
      else a.remove();
    });
    const ensure=(path,label)=>{
      const u=canonical(path),key=u.origin+u.pathname;
      if(!unique.has(key)){
        const a=document.createElement("a");a.className="sidebar-link";a.href=path;
        const span=document.createElement("span");span.textContent=label;a.appendChild(span);
        unique.set(key,a);
      }
    };
    ensure("/skins/","CS2 SKINS"); ensure("/faq/","FAQ");
    const buckets=new Map(groups.map(g=>[g.id,[]]));
    unique.forEach(a=>{
      const u=canonical(a.getAttribute("href"));
      let g=groups.find(x=>x.id!=="more"&&x.match(u))||groups[5];
      buckets.get(g.id).push(a);
    });
    sidebar.replaceChildren();
    if(brand)sidebar.appendChild(brand);
    const divider=document.createElement("div");divider.className="sidebar-divider";sidebar.appendChild(divider);
    groups.forEach(g=>{
      const section=document.createElement("section");section.className="sidebar-group sidebar-group-"+g.id;
      const heading=document.createElement("div");heading.className="sidebar-section-label";heading.textContent=g.label;section.appendChild(heading);
      buckets.get(g.id).forEach(a=>section.appendChild(a));
      if(buckets.get(g.id).length||g.id!=="more")sidebar.appendChild(section);
    });
    sidebar.dataset.categoriesReady="true";
  }
  function boot(){
    document.querySelectorAll(".sidebar").forEach(organize);
    // Run after page scripts that may append or replace links.
    setTimeout(()=>document.querySelectorAll(".sidebar").forEach(organize),250);
    const observer=new MutationObserver(ms=>{
      if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.("a.sidebar-link,.sidebar")||n.querySelector?.("a.sidebar-link"))))){
        document.querySelectorAll(".sidebar").forEach(organize);
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();