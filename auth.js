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

  async function loginWithTwitch() {
    try {
      setStatus('Connecting to Twitch...');

      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'twitch',
        options: {
          redirectTo: getOAuthRedirect(),
          skipBrowserRedirect: true
        }
      });

      if (error) {
        console.error('[AdhemSwag] Twitch OAuth error:', error);
        setStatus('Twitch error: ' + error.message);
        return false;
      }

      if (!data || !data.url) {
        console.error('[AdhemSwag] Twitch OAuth returned no URL:', data);
        setStatus('Twitch did not provide a login link.');
        return false;
      }

      window.location.assign(data.url);
      return true;
    } catch (error) {
      console.error('[AdhemSwag] Twitch login exception:', error);
      setStatus('Unable to connect to Twitch.');
      return false;
    }
  }

  async function ensureProfile() {
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError || !sessionData?.session?.user) return null;

    const authUser = sessionData.session.user;
    const meta = authUser.user_metadata || {};
    const twitchUserId = meta.provider_id || meta.sub || meta.user_id || null;
    const twitchUsername = meta.user_name || meta.preferred_username || meta.name || null;

    let { data: profile, error } = await client
      .from('users')
      .select('id,twitch_user_id,twitch_username,email,email_verified,steam_id,steam_profile_url,steam_trade_url,profile_complete,fnc_points,xp,level,total_watch_minutes,monthly_xp,streak,is_blocked,total_fnc_earned')
      .eq('id', authUser.id)
      .maybeSingle();

    if (error) {
      console.error('[AdhemSwag] Profile read error:', error);
      return null;
    }

    if (!profile) {
      const result = await client
        .from('users')
        .insert({
          id: authUser.id,
          twitch_user_id: twitchUserId,
          twitch_username: twitchUsername
        })
        .select('id,twitch_user_id,twitch_username,email,email_verified,steam_id,steam_profile_url,steam_trade_url,profile_complete,fnc_points,xp,level,total_watch_minutes,monthly_xp,streak,is_blocked,total_fnc_earned')
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
      box.innerHTML = '<div class="adhem-avatar-fnc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9.5c.8-1 5.2-1 6 0 .8 1-1 2-3 2s-3.1 1-3 2.1c.1 1.4 5.1 1.5 6 .2M12 4v2M12 18v2"/></svg><span class="shared-account-fnc">0</span> FNC</div><div class="adhem-avatar-xp"><div class="adhem-avatar-xp-track"><i class="shared-account-xp-bar"></i></div><span class="adhem-avatar-xp-label">Level <strong class="shared-account-level">1</strong> · <span class="shared-account-xp-progress">0 / 750 XP</span></span></div>';
      button.appendChild(box);
    });

    if (!document.getElementById('adhemSharedRewardsStyle')) {
      const style = document.createElement('style');
      style.id = 'adhemSharedRewardsStyle';
      style.textContent = `
        .adhem-account-menu{min-width:230px;padding:4px 0 5px}
        .adhem-account-user{flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;padding:8px 12px!important;min-width:150px!important}
        .adhem-account-user .adhem-account-avatar{width:38px!important;height:38px!important;margin-bottom:2px}
        .adhem-account-user .adhem-account-name{font-size:11px!important;line-height:1.2}
        .adhem-account-user .adhem-account-chevron{display:none!important}
        .adhem-avatar-rewards{width:100%;margin-top:4px}
        .adhem-avatar-fnc{display:flex;align-items:center;justify-content:center;gap:5px;font:700 11px 'JetBrains Mono',monospace;color:#11D9F7}
        .adhem-avatar-fnc svg{width:13px;height:13px}
        .adhem-avatar-xp{width:100%;margin-top:4px}
        .adhem-avatar-xp-track{height:4px;background:#11191d;overflow:hidden}
        .adhem-avatar-xp-track i{display:block;width:0;height:100%;background:#11D9F7;box-shadow:0 0 7px rgba(17,217,247,.5)}
        .adhem-avatar-xp-label{display:block;text-align:center;margin-top:3px;font:9px 'JetBrains Mono',monospace;color:#87979d}
        .adhem-account-menu .account-rewards{display:none!important}
        .adhem-account-menu .account-rewards{padding:13px 14px 12px;margin-bottom:6px;border-bottom:1px solid rgba(17,217,247,.12)}
        .adhem-account-menu .account-rewards-title{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#52636a;text-transform:uppercase;margin-bottom:9px}
        .adhem-account-menu .account-rewards-grid{display:grid;grid-template-columns:1fr;gap:6px}
        .adhem-account-menu .account-rewards-grid>div{padding:8px 9px;background:rgba(17,217,247,.035);border:1px solid rgba(17,217,247,.08);text-align:left}
        .adhem-account-menu .reward-inline{display:flex!important;align-items:center;gap:7px}
        .adhem-account-menu .reward-icon{width:16px;height:16px;display:inline-flex!important;align-items:center;justify-content:center;color:#11D9F7;margin:0!important}
        .adhem-account-menu .reward-icon svg{width:16px;height:16px;display:block}
        .adhem-account-menu .reward-inline-text{display:flex!important;align-items:baseline;gap:5px;margin:0!important}
        .adhem-account-menu .account-rewards-grid span{display:inline!important;font:10px 'JetBrains Mono',monospace;color:#617177;margin:0}
        .adhem-account-menu .account-rewards-grid strong{display:inline!important;font:700 15px 'JetBrains Mono',monospace;color:#11D9F7}
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
        updateAccountMenu(null);
        dispatchViewer(null);
        return null;
      }

      const user = data.session.user;
      const meta = user.user_metadata || {};

      const viewer = {
        authId: user.id,
        twitchUserId: meta.provider_id || meta.sub || meta.user_id || null,
        twitchUsername: meta.user_name || meta.preferred_username || meta.name || meta.full_name || null,
        email: user.email || null,
        avatar: meta.avatar_url || meta.picture || null,
        profile: await ensureProfile()
      };

      updateAccountMenu(viewer);
      dispatchViewer(viewer);
      return viewer;
    } catch (error) {
      console.error('[AdhemSwag] refreshAccountUI error:', error);
      return null;
    }
  }

  async function logout() {
    await client.auth.signOut({ scope: 'local' });
    window.location.href = '/';
  }

  window.AdhemSwagAuth = {
    client,
    loginWithTwitch,
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
          await loginWithTwitch();
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

    client.auth.onAuthStateChange(() => {
      setTimeout(refreshAccountUI, 0);
    });
  }

  window.AdhemSwagAuthReady = true;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
