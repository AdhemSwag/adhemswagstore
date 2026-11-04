/* AdhemSwag shared sidebar categories.
   Include this file on every page that contains .sidebar.
   New links are automatically placed by pathname; unknown links go to MORE. */
(() => {
  "use strict";
  const groups = [
    { id:"general", label:"GENERAL", paths:["/dashboard/","/profile/"] },
    { id:"gaming", label:"CS2 GAMING", paths:["/config/","/skins/","/faceit/"] },
    { id:"rewards", label:"REWARDS", paths:["/missions/","/store/","/bonuses/","/giveaway/","/leaderboard/"] },
    { id:"community", label:"COMMUNITY", paths:["/donate/","/faq/"] },
    { id:"social", label:"SOCIAL", hosts:["twitch.tv","kick.com","instagram.com","t.me","x.com","tiktok.com","discord.gg","discord.com","youtube.com"] },
    { id:"more", label:"MORE", paths:[] }
  ];
  const getGroup = (link) => {
    let url;
    try { url = new URL(link.getAttribute("href"), location.origin); } catch (_) { return groups[5]; }
    const path = url.pathname.replace(/\\/+$/, "") + "/";
    const byPath = groups.find(group => group.paths.includes(path));
    if (byPath) return byPath;
    if (url.origin !== location.origin && groups[4].hosts.some(host => url.hostname === host || url.hostname.endsWith("." + host))) return groups[4];
    return groups[5];
  };
  function organizeSidebar(sidebar) {
    if (!sidebar || sidebar.dataset.categoriesReady === "true") return;
    const links = [...sidebar.querySelectorAll("a.sidebar-link")];
    if (!links.length) return;
    const brand = sidebar.querySelector(".sidebar-brand");
    const preserved = [...sidebar.children].filter(node =>
      node !== brand && !node.matches(".sidebar-divider") &&
      !node.matches("a.sidebar-link") && !node.classList.contains("sidebar-group")
    );
    const buckets = new Map(groups.map(group => [group.id, []]));
    links.forEach(link => buckets.get(getGroup(link).id).push(link));
    sidebar.replaceChildren();
    if (brand) sidebar.appendChild(brand);
    const topDivider = document.createElement("div");
    topDivider.className = "sidebar-divider";
    topDivider.setAttribute("aria-hidden", "true");
    sidebar.appendChild(topDivider);
    groups.forEach(group => {
      const items = buckets.get(group.id);
      if (!items.length) return;
      const section = document.createElement("section");
      section.className = "sidebar-group sidebar-group-" + group.id;
      section.setAttribute("aria-label", group.label);
      const label = document.createElement("div");
      label.className = "sidebar-section-label";
      label.textContent = group.label;
      section.appendChild(label);
      items.forEach(link => section.appendChild(link));
      sidebar.appendChild(section);
    });
    preserved.forEach(node => sidebar.appendChild(node));
    sidebar.dataset.categoriesReady = "true";
  }
  function init() {
    document.querySelectorAll(".sidebar").forEach(organizeSidebar);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
