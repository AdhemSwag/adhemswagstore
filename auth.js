/* AdhemSwag viewer authentication + profile layer */
(function(){
  const SUPABASE_URL = 'https://lpmocfdfpebcaseffugg.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_vNkDqYd81b2krZAisUhb2g_c_uwyvRp';
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  window.adhemSupabase = client;

  async function getTwitchIdentity(user){
    const { data, error } = await client.auth.getUserIdentities();
    if(error || !data || !data.identities) return null;
    return data.identities.find(function(i){ return i.provider === 'twitch'; }) || null;
  }

  async function ensureProfile(user){
    const { data: existing } = await client.from('users')
      .select('id,twitch_user_id,twitch_username,email,steam_id,steam_profile_url,steam_trade_url,profile_complete,fnc_points,xp,level,total_watch_minutes,is_blocked')
      .eq('id', user.id).maybeSingle();

    if(existing) return existing;

    const twitch = await getTwitchIdentity(user);
    if(!twitch) return null;

    const twitchId = twitch.provider_id || (twitch.identity_data && (twitch.identity_data.sub || twitch.identity_data.id));
    const twitchName = twitch.identity_data && (twitch.identity_data.preferred_username || twitch.identity_data.user_name || twitch.identity_data.login || twitch.identity_data.name);

    if(!twitchId || !twitchName) return null;

    const { data, error } = await client.from('users').insert({
      id: user.id,
      twitch_user_id: String(twitchId),
      twitch_username: String(twitchName)
    }).select('id,twitch_user_id,twitch_username,email,steam_id,steam_profile_url,steam_trade_url,profile_complete,fnc_points,xp,level,total_watch_minutes,is_blocked').single();

    if(error) {
      console.error('AdhemSwag profile creation failed', error);
      return null;
    }
    return data;
  }

  async function refreshAccountUI(){
    const { data:{ session } } = await client.auth.getSession();
    if(!session || !session.user){
      window.dispatchEvent(new CustomEvent('adhem:viewer', {detail:null}));
      return null;
    }

    const user = session.user;
    const profile = await ensureProfile(user);
    const twitch = await getTwitchIdentity(user);
    const meta = (twitch && twitch.identity_data) || {};
    const viewer = {
      id: user.id,
      twitchUsername: (profile && profile.twitch_username) || meta.preferred_username || meta.user_name || meta.login || user.user_metadata?.user_name || user.user_metadata?.preferred_username || 'Viewer',
      avatarUrl: meta.avatar_url || meta.profile_image_url || user.user_metadata?.avatar_url || ''
    };
    if(window.setAdhemViewer) window.setAdhemViewer(viewer);
    window.dispatchEvent(new CustomEvent('adhem:viewer', {detail:{user:user,profile:profile}}));
    return {user:user,profile:profile};
  }

  async function loginTwitch(){
    const status=document.getElementById('loginStatus');
    if(status) status.textContent='CONNECTING TO TWITCH…';
    const redirectTo = window.location.origin + '/profile/';
    const { error } = await client.auth.signInWithOAuth({
      provider:'twitch',
      options:{ redirectTo:redirectTo }
    });
    if(error && status) status.textContent='TWITCH LOGIN ERROR: ' + error.message;
  }

  async function logout(){
    await client.auth.signOut();
    window.location.href='/login/';
  }

  function bindAccountMenu(){
    const root=document.getElementById('adhemAccount');
    if(!root)return;
    const connect=document.getElementById('adhemAccountConnect');
    const user=document.getElementById('adhemAccountUser');
    const menu=document.getElementById('adhemAccountMenu');
    const avatar=document.getElementById('adhemAccountAvatar');
    const name=document.getElementById('adhemAccountName');
    const disconnect=document.getElementById('adhemAccountDisconnect');
    function setViewer(viewer){
      if(!viewer || !viewer.twitchUsername)return;
      name.textContent=viewer.twitchUsername;
      if(viewer.avatarUrl){ avatar.src=viewer.avatarUrl; avatar.hidden=false; }
      avatar.alt=viewer.twitchUsername;
      connect.hidden=true;
      user.hidden=false;
    }
    window.setAdhemViewer=setViewer;
    user.addEventListener('click',function(e){
      e.stopPropagation();
      const open=!menu.hidden;
      menu.hidden=open;
      user.setAttribute('aria-expanded',String(!open));
    });
    document.addEventListener('click',function(){menu.hidden=true;user.setAttribute('aria-expanded','false');});
    menu.addEventListener('click',function(e){e.stopPropagation();});
    if(disconnect) disconnect.addEventListener('click',logout);
  }

  document.addEventListener('DOMContentLoaded', function(){
    bindAccountMenu();
    document.querySelectorAll('[data-provider="twitch"]').forEach(function(button){
      button.addEventListener('click', loginTwitch);
    });
    document.querySelectorAll('[data-provider="kick"]').forEach(function(button){
      button.addEventListener('click', function(){
        const status=document.getElementById('loginStatus');
        if(status) status.textContent='KICK CONNECTION WILL BE ADDED AFTER THE TWITCH PROFILE FOUNDATION.';
      });
    });
    const disconnect=document.getElementById('adhemAccountDisconnect');
    if(disconnect) disconnect.addEventListener('click', logout);

    refreshAccountUI();
  });

  window.adhemAuth = {
    client:client,
    refresh:refreshAccountUI,
    logout:logout,
    getTwitchIdentity:getTwitchIdentity
  };
})();