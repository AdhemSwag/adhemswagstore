/* ADHEMSWAG AUTH - Twitch OAuth + Supabase */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://lpmocfdfpebcaseffugg.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_vNkDqYd81b2krZAisUhb2g_c_uwyvRp';
  const PRODUCTION_REDIRECT = 'https://adhemswag.com/profile/';

  if (!window.supabase) {
    console.error('[AdhemSwag] Supabase CDN not loaded');
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
      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'twitch',
        options: {
          redirectTo: getOAuthRedirect(),
          skipBrowserRedirect: false
        }
      });

      if (error) {
        console.error('[AdhemSwag] Twitch OAuth error:', error);
        const status = document.getElementById('loginStatus');
        if (status) status.textContent = 'Erreur Twitch : ' + error.message;
        return false;
      }

      if (data && data.url) {
        window.location.assign(data.url);
      }
      return true;
    } catch (error) {
      console.error('[AdhemSwag] Twitch login exception:', error);
      const status = document.getElementById('loginStatus');
      if (status) status.textContent = 'Impossible de se connecter avec Twitch.';
      return false;
    }
  }

  async function ensureProfile() {
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError || !sessionData?.session?.user) return null;

    const authUser = sessionData.session.user;
    const meta = authUser.user_metadata || {};
    const twitchUserId =
      meta.provider_id || meta.sub || meta.user_id || null;
    const twitchUsername =
      meta.user_name || meta.preferred_username || meta.name || null;

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

  function updateAccountMenu(viewer) {
    document.querySelectorAll('[data-adhem-login]').forEach(el => {
      el.style.display = viewer ? 'none' : '';
    });
    document.querySelectorAll('[data-adhem-account]').forEach(el => {
      el.style.display = viewer ? '' : 'none';
    });
    document.querySelectorAll('[data-adhem-logout]').forEach(el => {
      el.style.display = viewer ? '' : 'none';
    });
    document.querySelectorAll('[data-adhem-username]').forEach(el => {
      el.textContent = viewer?.twitchUsername || '';
    });
    document.querySelectorAll('[data-adhem-avatar]').forEach(el => {
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
        twitchUsername: meta.user_name || meta.preferred_username || meta.name || null,
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

  function bindAuthButtons() {
    document.querySelectorAll('[data-adhem-login]').forEach(button => {
      if (button.dataset.authBound === '1') return;
      button.dataset.authBound = '1';
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        button.disabled = true;
        await loginWithTwitch();
        button.disabled = false;
      });
    });

    document.querySelectorAll('[data-adhem-logout]').forEach(button => {
      if (button.dataset.authBound === '1') return;
      button.dataset.authBound = '1';
      button.addEventListener('click', event => {
        event.preventDefault();
        logout();
      });
    });
  }

  async function init() {
    bindAuthButtons();
    await refreshAccountUI();
    client.auth.onAuthStateChange(() => {
      setTimeout(refreshAccountUI, 0);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})()
  function dispatchViewer(viewer) {
    window.dispatchEvent(new CustomEvent('adhem:viewer', { detail: viewer }));
  }

  function updateAccountMenu(viewer) {
    document.querySelectorAll('[data-adhem-login]').forEach(el => {
      el.style.display = viewer ? 'none' : '';
    });
    document.querySelectorAll('[data-adhem-account]').forEach(el => {
      el.style.display = viewer ? '' : 'none';
    });
    document.querySelectorAll('[data-adhem-username]').forEach(el => {
      el.textContent = viewer?.twitchUsername || '';
    });
    document.querySelectorAll('[data-adhem-avatar]').forEach(el => {
      if (viewer?.avatar) { el.src = viewer.avatar; el.hidden = false; }
      else { el.hidden = true; }
    });
  }

  function bindAuthButtons() {
    document.querySelectorAll('[data-provider="twitch"]').forEach(button => {
      if (button.dataset.adhemBound) return;
      button.dataset.adhemBound = '1';
      button.addEventListener('click', loginWithTwitch);
    });

    document.querySelectorAll('[data-provider="kick"]').forEach(button => {
      if (button.dataset.adhemBound) return;
      button.dataset.adhemBound = '1';
      button.addEventListener('click', () => {
        const status = document.getElementById('loginStatus');
        if (status) status.textContent = 'KICK CONNECTION WILL BE ADDED LATER.';
      });
    });

    document.querySelectorAll('[data-adhem-logout]').forEach(button => {
      if (button.dataset.adhemBound) return;
      button.dataset.adhemBound = '1';
      button.addEventListener('click', logout);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    bindAuthButtons();
    await refreshAccountUI();
  });

  client.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      updateAccountMenu(null);
      dispatchViewer(null);
      return;
    }
    setTimeout(() => refreshAccountUI(), 0);
  });

  window.AdhemSwagAuth = {
    client,
    loginWithTwitch,
    logout,
    getTwitchIdentity,
    ensureProfile,
    refreshAccountUI
  };

  window.adhemAuth = window.AdhemSwagAuth;
})();
