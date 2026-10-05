-- Keep internal rate-limit state in the private schema without an unnecessary exposed-schema RLS lint.
alter table private.security_rate_limits disable row level security;
