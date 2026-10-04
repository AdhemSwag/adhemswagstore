-- Idempotent repair for legacy StreamElements FNC ledger entries.
insert into public.transactions
  (user_id,type,amount,source,external_event_id,metadata,platform,created_at)
select
  fi.claimed_user_id,
  'import',
  greatest(fi.old_fnc,0),
  'streamelements_legacy',
  'streamelements:' || fi.id::text,
  jsonb_build_object(
    'legacy_username', fi.legacy_username,
    'old_fnc', fi.old_fnc,
    'source_import_id', fi.id,
    'match_method', case when fi.twitch_user_id is not null then 'twitch_user_id' else 'twitch_username' end,
    'ledger_repair', true
  ),
  'twitch',
  fi.claimed_at
from public.fnc_imports fi
where fi.claimed_at is not null
  and fi.claimed_user_id is not null
  and fi.source='streamelements'
  and not exists (
    select 1 from public.transactions t
    where t.type='import'
      and t.external_event_id='streamelements:' || fi.id::text
  );

revoke execute on function public.claim_legacy_streamelements_fnc(uuid) from public, anon, authenticated;
drop index if exists public.fnc_reward_ticks_user_session_minute_uidx;
