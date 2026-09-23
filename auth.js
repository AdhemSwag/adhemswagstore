```javascript
/* =========================================================
   ADHEMSWAG AUTH
   Twitch OAuth + Supabase
   Production: https://adhemswag.com
   ========================================================= */

(() => {
  'use strict';

  /* =========================
     SUPABASE CONFIG
     ========================= */

  const SUPABASE_URL =
    'https://lpmocfdfpebcaseffugg.supabase.co';

  const SUPABASE_ANON_KEY =
    'sb_publishable_vNkDqYd81b2krZAisUhb2g_c_uwyvRp';

  /* =========================
     PRODUCTION CONFIG
     ========================= */

  const PRODUCTION_ORIGIN =
    'https://adhemswag.com';

  const PRODUCTION_REDIRECT =
    PRODUCTION_ORIGIN + '/profile/';

  /* =========================
     SUPABASE CLIENT
     ========================= */

  if (!window.supabase) {
    console.error(
      '[AdhemSwag] Supabase CDN is not loaded.'
    );
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

  /* =========================
     OAUTH REDIRECT
     ========================= */

  function getOAuthRedirect() {
    const host = window.location.hostname;

    /*
      Local development:
      http://localhost:3000/profile/

      Production:
      https://adhemswag.com/profile/
    */

    if (
      host === 'localhost' ||
      host === '127.0.0.1'
    ) {
      return window.location.origin + '/profile/';
    }

    return PRODUCTION_REDIRECT;
  }

  /* =========================
     TWITCH LOGIN
     ========================= */

  async function loginWithTwitch() {
    try {
      const redirectTo = getOAuthRedirect();

      console.log(
        '[AdhemSwag] Twitch OAuth redirect:',
        redirectTo
      );

      const { data, error } =
        await client.auth.signInWithOAuth({
          provider: 'twitch',

          options: {
            redirectTo: redirectTo,
            skipBrowserRedirect: false
          }
        });

      if (error) {
        console.error(
          '[AdhemSwag] Twitch login error:',
          error
        );

        alert(
          'Erreur de connexion Twitch : ' +
          error.message
        );

        return false;
      }

      /*
        Supabase normally redirects automatically.
        This fallback handles cases where the browser
        does not navigate automatically.
      */

      if (
        data &&
        data.url &&
        window.location.href !== data.url
      ) {
        window.location.assign(data.url);
      }

      return true;

    } catch (error) {
      console.error(
        '[AdhemSwag] Twitch login exception:',
        error
      );

      alert(
        'Impossible de se connecter avec Twitch.'
      );

      return false;
    }
  }

  /* =========================
     LOGOUT
     ========================= */

  async function logout() {
    try {
      const { error } =
        await client.auth.signOut({
          scope: 'local'
        });

      if (error) {
        console.error(
          '[AdhemSwag] Logout error:',
          error
        );
      }

      window.location.href = '/';

    } catch (error) {
      console.error(
        '[AdhemSwag] Logout exception:',
        error
      );

      window.location.href = '/';
    }
  }

  /* =========================
     GET TWITCH IDENTITY
     ========================= */

  async function getTwitchIdentity() {
    try {
      const {
        data,
        error
      } = await client.auth.getUser();

      if (error || !data || !data.user) {
        return null;
      }

      const user = data.user;

      const metadata =
        user.user_metadata || {};

      return {
        authId: user.id,

        twitchUserId:
          metadata.provider_id ||
          metadata.sub ||
          metadata.user_id ||
          null,

        twitchUsername:
          metadata.user_name ||
          metadata.preferred_username ||
          metadata.name ||
          null,

        email:
          user.email || null,

        avatar:
          metadata.avatar_url ||
          metadata.picture ||
          null,

        metadata: metadata
      };

    } catch (error) {
      console.error(
        '[AdhemSwag] Twitch identity error:',
        error
      );

      return null;
    }
  }

  /* =========================
     ENSURE USER PROFILE
     ========================= */

  async function ensureProfile() {
    try {
      const {
        data: sessionData,
        error: sessionError
      } = await client.auth.getSession();

      if (
        sessionError ||
        !sessionData ||
        !sessionData.session
      ) {
        return null;
      }

      const authUser =
        sessionData.session.user;

      if (!authUser) {
        return null;
      }

      /* =========================
         GET TWITCH DATA
         ========================= */

      const twitch =
        await getTwitchIdentity();

      if (!twitch) {
        return null;
      }

      /* =========================
         FIND EXISTING PROFILE
         ========================= */

      const {
        data: existingProfile,
        error: selectError
      } = await client
        .from('users')
        .select(`
          id,
          twitch_user_id,
          twitch_username,
          email,
          email_verified,
          steam_id,
          steam_profile_url,
          steam_trade_url,
          profile_complete,
          fnc_points,
          xp,
          level,
          total_watch_minutes,
          monthly_xp,
          streak,
          is_blocked,
          total_fnc_earned
        `)
        .eq('id', authUser.id)
        .maybeSingle();

      if (selectError) {
        console.error(
          '[AdhemSwag] Profile read error:',
          selectError
        );

        return null;
      }

      /* =========================
         PROFILE EXISTS
         ========================= */

      if (existingProfile) {
        return existingProfile;
      }

      /* =========================
         CREATE PROFILE
         ========================= */

      const newProfile = {
        id: authUser.id,

        twitch_user_id:
          twitch.twitchUserId,

        twitch_username:
          twitch.twitchUsername
      };

      const {
        data: createdProfile,
        error: insertError
      } = await client
        .from('users')
        .insert(newProfile)
        .select(`
          id,
          twitch_user_id,
          twitch_username,
          email,
          email_verified,
          steam_id,
          steam_profile_url,
          steam_trade_url,
          profile_complete,
          fnc_points,
          xp,
          level,
          total_watch_minutes,
          monthly_xp,
          streak,
          is_blocked,
          total_fnc_earned
        `)
        .single();

      if (insertError) {
        /*
          A second tab may have created the profile
          at the same time. Try reading it again.
        */

        console.warn(
          '[AdhemSwag] Profile creation warning:',
          insertError
        );

        const {
          data: retryProfile
        } = await client
          .from('users')
          .select(`
            id,
            twitch_user_id,
            twitch_username,
            email,
            email_verified,
            steam_id,
            steam_profile_url,
            steam_trade_url,
            profile_complete,
            fnc_points,
            xp,
            level,
            total_watch_minutes,
            monthly_xp,
            streak,
            is_blocked,
            total_fnc_earned
          `)
          .eq('id', authUser.id)
          .maybeSingle();

        return retryProfile || null;
      }

      return createdProfile;

    } catch (error) {
      console.error(
        '[AdhemSwag] ensureProfile exception:',
        error
      );

      return null;
    }
  }

  /* =========================
     REFRESH ACCOUNT UI
     ========================= */

  async function refreshAccountUI() {
    try {
      const {
        data,
        error
      } = await client.auth.getSession();

      if (error) {
        console.error(
          '[AdhemSwag] Session error:',
          error
        );

        return null;
      }

      const session = data.session;

      if (!session) {
        dispatchViewer(null);
        updateAccountMenu(null);
        return null;
      }

      const profile =
        await ensureProfile();

      const twitch =
        await getTwitchIdentity();

      if (!twitch) {
        dispatchViewer(null);
        updateAccountMenu(null);
        return null;
      }

      const viewer = {
        authId: twitch.authId,

        twitchUserId:
          twitch.twitchUserId,

        twitchUsername:
          twitch.twitchUsername,

        email:
          twitch.email,

        avatar:
          twitch.avatar,

        profile:
          profile || null
      };

      updateAccountMenu(viewer);
      dispatchViewer(viewer);

      return viewer;

    } catch (error) {
      console.error(
        '[AdhemSwag] refreshAccountUI error:',
        error
      );

      return null;
    }
  }

  /* =========================
     ACCOUNT MENU
     ========================= */

  function updateAccountMenu(viewer) {
    const loginButtons =
      document.querySelectorAll(
        '[data-adhem-login]'
      );

    const accountButtons =
      document.querySelectorAll(
        '[data-adhem-account]'
      );

    const logoutButtons =
      document.querySelectorAll(
        '[data-adhem-logout]'
      );

    const accountNames =
      document.querySelectorAll(
        '[data-adhem-username]'
      );

    const accountAvatars =
      document.querySelectorAll(
        '[data-adhem-avatar]'
      );

    if (!viewer) {
      loginButtons.forEach((element) => {
        element.style.display = '';
      });

      accountButtons.forEach((element) => {
        element.style.display = 'none';
      });

      logoutButtons.forEach((element) => {
        e
```
