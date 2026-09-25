/* ADHEMSWAG AUTH - Twitch OAuth + Supabase */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://lpmocfdfpebcaseffugg.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_vNkDqYd81b2krZAisUhb2g_c_uwyvRp';
  const PRODUCTION_REDIRECT = 'https://adhemswag.com/profile/';

  function setStatus(message) {
    const status = document.getElementById('loginStatus');
    if (status) status.textContent = message || '';
  }

  if (!window.supabase) {
    console.error('[AdhemSwag] Supabase CDN not loaded');
    setStatus('Connection service unavailable. Please reload the page.');
    return;
  }

  const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'adhemswag-auth'
      }
    }
  );

  window.AdhemAuth = client;

  function getOAuthRedirect() {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return window.location.origin + '/profile/';
    }
    return PRODUCTION_REDIRECT;
  }

  async function loginWithProvider(provider = 'twitch') {
    if (provider !== 'twitch') { setStatus('Only Twitch sign-in is available.'); return false; }
    try {
      setStatus('Connecting to Twitch...');
      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'twitch',
        options: { redirectTo: getOAuthRedirect(), skipBrowserRedirect: true, queryParams: { force_verify: 'true' } }
      });
      if (error) { console.error('[AdhemSwag] Twitch OAuth error:', error); setStatus('Twitch error: ' + error.message); return false; }
      if (!data?.url) { console.error('[AdhemSwag] Twitch OAuth returned no URL:', data); setStatus('Twitch did not provide a login link.'); return false; }
      window.location.assign(data.url);
      return true;
    } catch (error) {
      console.error('[AdhemSwag] Twitch login exception:', error);
      setStatus('Unable to connect to Twitch.');
      return false;
    }
  }

  async function loginWithTwitch() { return loginWithProvider('twitch'); }

  async function linkTwitch() {
    try {
      const { data: sessionData, error: sessionError } = await client.auth.getSession();
      if (sessionError || !sessionData?.session?.user) { setStatus('Connect Twitch first.'); return false; }
      const { data, error } = await client.auth.linkIdentity({
        provider: 'twitch',
        options: { redirectTo: getOAuthRedirect(), skipBrowserRedirect: true }
      });
      if (error) { console.error('[AdhemSwag] Twitch link error:', error); setStatus('Twitch link error: ' + error.message); return false; }
      if (!data?.url) { setStatus('Twitch did not provide a connection link.'); return false; }
      window.location.assign(data.url);
      return true;
    } catch (error) {
      console.error('[AdhemSwag] Twitch link exception:', error);
      setStatus('Unable to connect Twitch.');
      return false;
    }
  }

  async function ensureProfile() {
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError || !sessionData?.session?.user) return null;

    const authUser = sessionData.session.user;
    const meta = authUser.user_metadata || {};
    const identity = authUser.identities?.find(i => i.provider === 'twitch') || authUser.identities?.[0] || null;
    const identityData = identity?.identity_data || {};
    const externalUserId = identity?.provider_id || identityData.provider_id || identityData.sub || meta.provider_id || meta.sub || null;
    const externalUsername = identityData.preferred_username || identityData.name || identityData.nickname || meta.user_name || meta.preferred_username || meta.name || meta.full_name || null;

    let { data: profile, error } = await client
      .from('users')
      .select('id,twitch_user_id,twitch_username,email,email_verified,steam_id,steam_profile_url,steam_trade_url,discord_username,profile_complete,fnc_points,xp,level,total_watch_minutes,monthly_xp,streak,is_blocked,total_fnc_earned')
      .eq('id', authUser.id)
      .maybeSingle();

    if (error) {
      console.error('[AdhemSwag] Profile read error:', error);
      return null;
    }

    if (!profile) {
      const result = await client
        .from('users')
        .insert({ id: authUser.id, twitch_user_id: externalUserId, twitch_username: externalUsername })
        .select('id,twitch_user_id,twitch_username,email,email_verified,steam_id,steam_profile_url,steam_trade_url,discord_username,profile_complete,fnc_points,xp,level,total_watch_minutes,monthly_xp,streak,is_blocked,total_fnc_earned')
        .single();
      if (result.error) {
        console.error('[AdhemSwag] Profile creation error:', result.error);
        return null;
      }
      profile = result.data;
    }

    return profile;
  }

  function injectAccountRewards() {
    const menus = document.querySelectorAll('#adhemAccountMenu');
    if (!menus.length) return;

    document.querySelectorAll('#adhemAccountUser').forEach(button => {
      if (button.querySelector('.adhem-avatar-rewards')) return;
      const box = document.createElement('div');
      box.className = 'adhem-avatar-rewards';
      box.innerHTML = '<div class="adhem-avatar-reward-row"><span>FNC <strong class="shared-account-fnc">0</strong></span><span>LEVEL <strong class="shared-account-level">1</strong></span></div><div class="adhem-avatar-xp"><div class="adhem-avatar-xp-track"><i class="shared-account-xp-bar"></i></div><span class="shared-account-xp-progress">0 / 750 XP</span></div>';
      button.appendChild(box);
    });

    
    /* Shared sidebar icon color — all pages */
    const sidebarStyle = document.createElement('style');
    sidebarStyle.id = 'adhemSharedSidebarIconStyle';
    sidebarStyle.textContent = '.sidebar .sidebar-link[href^="/"] svg{color:#11D9F7!important;stroke:#11D9F7!important}.sidebar .sidebar-link[href^="/"] svg[fill="currentColor"]{fill:#11D9F7!important;stroke:none!important}.sidebar .sidebar-link img[alt="Faceit"]{filter:none!important}';
    document.head.appendChild(sidebarStyle);

    if (!document.getElementById('adhemSharedRewardsStyle')) {
      const style = document.createElement('style');
      style.id = 'adhemSharedRewardsStyle';
      style.textContent = `
        .adhem-topbar{position:fixed!important;top:0!important;left:200px!important;right:0!important;height:78px!important;min-height:78px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:8px 24px!important;background:rgba(5,7,10,.94)!important;border-bottom:1px solid rgba(17,217,247,.14)!important;backdrop-filter:blur(8px)!important;z-index:1000!important;box-sizing:border-box!important}
        .adhem-account-connect{display:inline-flex;align-items:center!important;justify-content:center!important;gap:0!important;min-height:38px!important;padding:0 18px!important;border:1px solid rgba(17,217,247,.28)!important;border-radius:8px!important;background:rgba(17,217,247,.035)!important;color:#d9faff!important;text-decoration:none!important;font:700 11px 'JetBrains Mono',monospace!important;letter-spacing:.12em!important;box-shadow:0 0 10px rgba(17,217,247,.07),inset 0 0 10px rgba(17,217,247,.025)!important;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease,color .2s ease!important}
        .adhem-account-connect span:first-child{display:none!important}
        .adhem-account-connect:hover{border-color:rgba(17,217,247,.72)!important;background:rgba(17,217,247,.08)!important;color:#fff!important;box-shadow:0 0 18px rgba(17,217,247,.22),inset 0 0 12px rgba(17,217,247,.04)!important}
        .adhem-topbar-left{display:flex!important;align-items:center!important;gap:9px!important;min-width:0!important}
        .adhem-topbar-mark{width:7px!important;height:7px!important;border-radius:50%!important;background:#ff3b3b!important;box-shadow:0 0 8px rgba(255,59,59,.65)!important;flex:none!important}
        .adhem-topbar-brand{font:600 10px 'JetBrains Mono',monospace!important;letter-spacing:.12em!important;color:#b9c9cd!important;white-space:nowrap!important}
        .adhem-topbar-brand span{color:#11D9F7!important}
        .adhem-topbar .adhem-account{margin-left:auto!important;position:relative!important}
        .adhem-account-menu{min-width:240px!important;padding:5px 0 6px!important;z-index:1100!important;top:calc(100% + 8px)!important}
        .adhem-account-user{display:inline-flex!important;align-items:center!important;gap:9px!important;padding:5px 10px 5px 5px!important;min-width:0!important;min-height:38px!important;border-radius:22px!important}
        .adhem-account-user .adhem-account-avatar{width:28px!important;height:28px!important;border-radius:50%!important;margin:0!important;flex:none!important}
        .adhem-account-user .adhem-account-name{font-size:10px!important;line-height:1.2;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .adhem-account-user{display:grid!important;grid-template-columns:28px minmax(120px,1fr) 12px!important;grid-template-rows:auto auto auto!important;column-gap:8px!important;align-items:center!important;padding:5px 9px 5px 5px!important;min-width:190px!important}
        .adhem-account-user .adhem-account-avatar{grid-column:1;grid-row:1 / 4;width:28px!important;height:28px!important}
        .adhem-account-user .adhem-account-name{grid-column:2;grid-row:1}
        .adhem-account-user .adhem-account-chevron{grid-column:3;grid-row:1}
        .adhem-avatar-rewards{grid-column:2;grid-row:2 / 4;width:100%;margin-top:1px}
        .adhem-avatar-reward-row{display:flex;align-items:center;gap:12px;font:600 9px 'JetBrains Mono',monospace;line-height:1;color:#617177;white-space:nowrap}
        .adhem-avatar-reward-row strong{font:600 9px 'JetBrains Mono',monospace;color:#617177}
        .adhem-avatar-xp{width:100%;margin-top:5px}
        .adhem-avatar-xp-track{height:3px;width:100%;background:#11191d;overflow:hidden}
        .adhem-avatar-xp-track i{display:block;width:0;height:100%;background:#11D9F7;box-shadow:0 0 6px rgba(17,217,247,.45);transition:width .25s ease}
        .adhem-avatar-xp .shared-account-xp-progress{display:block;margin-top:2px;font:8px 'JetBrains Mono',monospace;color:#52636a;white-space:nowrap}
        .adhem-account-menu .account-rewards{display:block!important;padding:12px 14px 11px;margin:0 0 6px;border-bottom:1px solid rgba(17,217,247,.12)}
        @media(max-width:1024px){.adhem-topbar{left:64px!important;padding:8px 16px!important}}
        @media(max-width:640px){.adhem-topbar{left:52px!important;right:0!important;height:78px!important;min-height:78px!important;padding:8px!important}.adhem-topbar-brand{display:none!important}.adhem-topbar-left{gap:6px!important}.adhem-account-user{min-width:0!important;padding:4px!important;border-radius:28px!important}.adhem-account-user .adhem-account-avatar{width:48px!important;height:48px!important}.adhem-account-user .adhem-account-name{display:none!important}.adhem-avatar-rewards{min-width:105px!important}.adhem-avatar-reward-row{gap:8px!important;font-size:8px!important}.adhem-avatar-reward-row strong{font-size:8px!important}.adhem-avatar-xp{margin-top:4px!important}.adhem-account-menu{right:4px!important;top:calc(100% + 6px)!important;min-width:220px!important;max-width:calc(100vw - 62px)!important}.sidebar{width:52px!important;padding:14px 5px!important;gap:1px!important}.sidebar-brand{padding:7px 2px 12px!important}.sidebar-brand a{display:none!important}.sidebar-link{justify-content:center!important;gap:0!important;padding:10px 0!important}.sidebar-link span{display:none!important}.sidebar-divider{margin:8px 5px!important}main{width:auto!important;max-width:none!important;padding-left:12px!important;padding-right:12px!important}}
        .adhem-account-menu .account-rewards-title{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#52636a;text-transform:uppercase;margin-bottom:9px}
        .adhem-account-menu .account-rewards-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
        .adhem-account-menu .account-rewards-grid>div{padding:8px 9px;background:rgba(17,217,247,.035);border:1px solid rgba(17,217,247,.08);text-align:left}
        .adhem-account-menu .reward-inline{display:flex!important;align-items:center;gap:7px}
        .adhem-account-menu .reward-icon{width:16px;height:16px;display:inline-flex!important;align-items:center;justify-content:center;color:#11D9F7;margin:0!important}
        .adhem-account-menu .reward-icon svg{width:16px;height:16px;display:block}
        .adhem-account-menu .reward-inline-text{display:flex!important;align-items:baseline;gap:5px;margin:0!important}
        .adhem-account-menu .account-rewards-grid span{display:inline!important;font:10px 'JetBrains Mono',monospace;color:#617177;margin:0}
        .adhem-account-menu .account-rewards-grid strong{display:inline!important;font:600 10px 'JetBrains Mono',monospace;line-height:1;color:#617177}
        .adhem-account-menu .account-xp-card{grid-column:1/-1;text-align:left!important;padding:8px 9px!important}
        .adhem-account-menu .account-xp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
        .adhem-account-menu .account-xp-head span{font:10px 'JetBrains Mono',monospace;color:#617177;margin:0}
        .adhem-account-menu .account-xp-head small{margin:0!important}
        .adhem-account-menu .account-xp-card .account-xp-track{height:5px;background:#11191d;margin:1px 0 4px;overflow:hidden}
        .adhem-account-menu .account-xp-track i{display:block;width:0;height:100%;background:#11D9F7;box-shadow:0 0 8px rgba(17,217,247,.5);transition:width .25s ease}
        .adhem-account-menu .account-xp-card small{display:block;font:10px 'JetBrains Mono',monospace;color:#52636a;white-space:nowrap}
      `;
      document.head.appendChild(style);
    }

    menus.forEach(menu => {
      if (menu.querySelector('.account-rewards')) return;
      const rewards = document.createElement('div');
      rewards.className = 'account-rewards';
      rewards.innerHTML = `
        <div class="account-rewards-title">MY REWARDS</div>
        <div class="account-rewards-grid">
          <div class="reward-inline"><span class="reward-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9.5c.8-1 5.2-1 6 0 .8 1-1 2-3 2s-3.1 1-3 2.1c.1 1.4 5.1 1.5 6 .2M12 4v2M12 18v2"/></svg></span><span class="reward-inline-text"><span>FNC</span><strong class="shared-account-fnc">0</strong></span></div>
          <div class="reward-inline"><span class="reward-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8l1 5c0 3-2 5-5 6v3h4v2H8v-2h4v-3c-3-1-5-3-5-6l1-5Z"/><path d="M7 7H4v1c0 2 1 3 4 3M17 7h3v1c0 2-1 3-4 3"/></svg></span><span class="reward-inline-text"><span>LEVEL</span><strong class="shared-account-level">1</strong></span></div>
          <div class="account-xp-card"><div class="account-xp-head"><span>XP</span><small class="shared-account-xp-progress">0 / 750 XP</small></div><div class="account-xp-track"><i class="shared-account-xp-bar"></i></div></div>
        </div>`;
      const firstLink = menu.querySelector('a');
      menu.insertBefore(rewards, firstLink || menu.firstChild);
    });
  }

  function updateAccountRewards(viewer) {
    const profile = viewer?.profile;
    const xp = Number(profile?.xp || 0);
    const level = Number(profile?.level || 1);
    const fnc = Number(profile?.fnc_points || 0);
    const thresholds = {1:0,2:750,3:1750,4:3000,5:4500,6:6250,7:8250,8:10500,9:13000,10:15750,11:18750,12:22000,13:25500,14:29250,15:33250,20:57000,25:87500,30:128250,40:223500,50:348750};
    const next = Object.keys(thresholds).map(Number).sort((a,b)=>a-b).find(l => l > level);
    const currentThreshold = thresholds[level] ?? 0;
    const nextThreshold = next ? thresholds[next] : currentThreshold;
    const progress = next && nextThreshold > currentThreshold
      ? Math.max(0, Math.min(100, ((xp-currentThreshold)/(nextThreshold-currentThreshold))*100))
      : 100;

    document.querySelectorAll('.shared-account-level, #adhemAccountLevel').forEach(el => el.textContent = level.toLocaleString());
    document.querySelectorAll('.shared-account-fnc, #adhemAccountFnc').forEach(el => el.textContent = fnc.toLocaleString());
    document.querySelectorAll('.shared-account-xp, #adhemAccountXp').forEach(el => el.textContent = xp.toLocaleString());
    document.querySelectorAll('.shared-account-xp-progress, #adhemAccountXpProgress').forEach(el => el.textContent = xp.toLocaleString() + ' / ' + nextThreshold.toLocaleString() + ' XP');
    document.querySelectorAll('.shared-account-xp-bar, #adhemAccountXpBar').forEach(el => el.style.width = progress + '%');
  }

  function updateAccountMenu(viewer) {
    injectAccountRewards();
    updateAccountRewards(viewer);
    const loggedIn = !!viewer;

    document.querySelectorAll('[data-adhem-login], #adhemAccountConnect').forEach(el => {
      el.style.display = loggedIn ? 'none' : '';
      if ('hidden' in el) el.hidden = loggedIn;
    });

    document.querySelectorAll('[data-adhem-account], #adhemAccountUser').forEach(el => {
      el.style.display = loggedIn ? '' : 'none';
      if ('hidden' in el) el.hidden = !loggedIn;
    });

    document.querySelectorAll('[data-adhem-logout], #adhemAccountDisconnect').forEach(el => {
      el.style.display = loggedIn ? '' : 'none';
      if ('hidden' in el) el.hidden = !loggedIn;
    });
    document.querySelectorAll('[data-adhem-username], #adhemAccountName').forEach(el => {
      el.textContent = viewer?.twitchUsername || '';
    });
    document.querySelectorAll('[data-adhem-avatar], #adhemAccountAvatar').forEach(el => {
      if (viewer?.avatar) {
        el.src = viewer.avatar;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  function dispatchViewer(viewer) {
    window.dispatchEvent(new CustomEvent('adhem:viewer', { detail: viewer }));
  }

  async function refreshAccountUI() {
    try {
      const { data, error } = await client.auth.getSession();

      if (error || !data?.session) {
        stopWatchTracking();
        updateAccountMenu(null);
        dispatchViewer(null);
        return null;
      }

      const user = data.session.user;
      const meta = user.user_metadata || {};
      const twitchIdentity = user.identities?.find(i => i.provider === 'twitch') || null;
      const twitchData = twitchIdentity?.identity_data || {};
      const viewer = {
        authId: user.id,
        provider: 'twitch',
        twitchUserId: twitchIdentity?.provider_id || null,
        twitchUsername: twitchData.name || twitchData.preferred_username || twitchData.nickname || meta.user_name || meta.preferred_username || meta.name || null,
        email: user.email || null,
        avatar: meta.avatar_url || meta.picture || meta.profile_picture || meta.profile_image_url || twitchData.avatar_url || twitchData.picture || null,
        profile: await ensureProfile()
      };
      updateAccountMenu(viewer);
      dispatchViewer(viewer);
      startWatchTracking(viewer);
      return viewer;
    } catch (error) {
      console.error('[AdhemSwag] refreshAccountUI error:', error);
      return null;
    }
  }

  let watchHeartbeatTimer = null;
  let watchHeartbeatInFlight = false;
  let watchVisibilityBound = false;

  async function sendWatchHeartbeat() {
    if (document.visibilityState !== 'visible' || watchHeartbeatInFlight) return;
    watchHeartbeatInFlight = true;
    try {
      const { data: sessionData } = await client.auth.getSession();
      if (!sessionData?.session) return;
      const accessToken = sessionData.session.access_token;
      const { data, error } = await client.functions.invoke('watch-heartbeat', {
        body: {},
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (error) console.warn('[AdhemSwag] Watch heartbeat:', error.message || error);
      else if (data?.live === false) stopWatchTracking();
    } catch (error) {
      console.warn('[AdhemSwag] Watch heartbeat failed:', error);
    } finally {
      watchHeartbeatInFlight = false;
    }
  }

  function stopWatchTracking() {
    if (watchHeartbeatTimer) {
      clearInterval(watchHeartbeatTimer);
      watchHeartbeatTimer = null;
    }
  }

  function startWatchTracking(viewer) {
    stopWatchTracking();
    if (!viewer?.authId) return;
    sendWatchHeartbeat();
    watchHeartbeatTimer = setInterval(sendWatchHeartbeat, 60000);
    if (!watchVisibilityBound) {
      document.addEventListener('visibilitychange', handleWatchVisibility, { passive: true });
      watchVisibilityBound = true;
    }
  }

  function handleWatchVisibility() {
    if (document.visibilityState === 'visible') sendWatchHeartbeat();
  }

  async function logout() {
    stopWatchTracking();
    await client.auth.signOut({ scope: 'local' });
    window.location.href = '/';
  }

  async function beginTwitchWatchAuthorization() {
    try {
      localStorage.setItem('adhem_twitch_watch_connect', '1');
      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'twitch',
        options: {
          redirectTo: getOAuthRedirect(),
          skipBrowserRedirect: true,
          scopes: 'moderator:read:chatters',
          queryParams: { force_verify: 'true' }
        }
      });
      if (error || !data?.url) {
        localStorage.removeItem('adhem_twitch_watch_connect');
        console.error('[AdhemSwag] Twitch watch authorization error:', error);
        return false;
      }
      window.location.assign(data.url);
      return true;
    } catch (error) {
      localStorage.removeItem('adhem_twitch_watch_connect');
      console.error('[AdhemSwag] Twitch watch authorization exception:', error);
      return false;
    }
  }

  async function captureTwitchWatchProviderToken() {
    if (localStorage.getItem('adhem_twitch_watch_connect') !== '1') return;
    const { data } = await client.auth.getSession();
    const session = data?.session;
    if (!session?.provider_token) return;
    try {
      const result = await client.rpc('admin_store_twitch_watch_credentials', {
        p_access_token: session.provider_token,
        p_refresh_token: session.provider_refresh_token || null
      });
      if (result.error) throw result.error;
      localStorage.removeItem('adhem_twitch_watch_connect');
      window.location.href = '/admin/?twitch_watch=connected';
    } catch (error) {
      console.error('[AdhemSwag] Unable to store Twitch watch credentials:', error);
    }
  }

  window.AdhemSwagAuth = {
    client,
    loginWithTwitch,
    linkTwitch,
    loginWithProvider,
    beginTwitchWatchAuthorization,
    captureTwitchWatchProviderToken,
    logout,
    ensureProfile,
    refreshAccountUI
  };

  function bindAccountMenu() {
    document.querySelectorAll('#adhemAccountUser').forEach(userButton => {
      if (userButton.dataset.accountBound === '1') return;

      const root = userButton.closest('#adhemAccount') || userButton.parentElement;
      const menu = root?.querySelector('#adhemAccountMenu');
      if (!menu) return;

      userButton.dataset.accountBound = '1';
      userButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        menu.hidden = !menu.hidden;
        userButton.setAttribute('aria-expanded', String(!menu.hidden));

        if (!menu.hidden) {
          const rect = userButton.getBoundingClientRect();
          menu.style.position = 'fixed';
          menu.style.top = Math.round(rect.bottom + 8) + 'px';
          menu.style.right = Math.max(4, Math.round(window.innerWidth - rect.right)) + 'px';
          menu.style.left = 'auto';
        }
      });

      menu.addEventListener('click', event => event.stopPropagation());
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('#adhemAccountMenu').forEach(menu => {
        menu.hidden = true;
      });
      document.querySelectorAll('#adhemAccountUser').forEach(button => {
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function bindAuthButtons() {
    document.querySelectorAll('[data-adhem-login], #adhemAccountConnect').forEach(button => {
      if (button.dataset.authBound === '1') return;

      button.dataset.authBound = '1';
      button.addEventListener('click', async event => {
        event.preventDefault();
        if (button.disabled) return;

        button.disabled = true;
        try {
          const provider = button.dataset.provider || 'twitch';
          await loginWithProvider(provider);
        } finally {
          button.disabled = false;
        }
      });
    });

    document.querySelectorAll('[data-adhem-logout], #adhemAccountDisconnect').forEach(button => {
      if (button.dataset.authBound === '1') return;

      button.dataset.authBound = '1';
      button.addEventListener('click', event => {
        event.preventDefault();
        logout();
      });
    });
  }

  async function init() {
    injectAccountRewards();
    bindAccountMenu();
    bindAuthButtons();
    await refreshAccountUI();
    await captureTwitchWatchProviderToken();

    // Admin OAuth returns through the existing approved /profile/ redirect.
    // Once the session is established, send the user back to the Admin Panel.
    const returnTarget = new URLSearchParams(window.location.search).get('return');
    if (returnTarget === 'admin') {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.assign('/admin/');
      return;
    }

    client.auth.onAuthStateChange(() => {
      setTimeout(async () => {
        await refreshAccountUI();
        await captureTwitchWatchProviderToken();
      }, 0);
    });
  }

  window.AdhemSwagAuthReady = true;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
