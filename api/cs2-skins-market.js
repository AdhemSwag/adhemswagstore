// Public OpenSkin V1 proxy for the CS2 skins catalogue.
// Fixed endpoints only: no arbitrary URL forwarding and no browser-side CORS dependency.
const OPEN_SKIN_BASE = 'https://api.openskin.dev';
const ALLOWED_MARKETS = new Set(['steam', 'skinport', 'buff', 'youpin', 'csfloat']);
const MAX_ITEM_LENGTH = 220;

function send(res, status, body, cacheControl = 'no-store') {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cacheControl);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function validDate(value) {
  return typeof value === 'string' && /^\\d{4}-\\d{2}-\\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value + 'T00:00:00Z'));
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'method_not_allowed' });
  }

  let kind = 'prices';
  let item = '';
  let target = '';
  let body = null;

  if (req.method === 'GET') {
    kind = String(req.query?.kind || 'prices');
    item = String(req.query?.item || '').trim();
    if (kind !== 'prices') return send(res, 400, { error: 'invalid_kind' });
    if (!item || item.length > MAX_ITEM_LENGTH) return send(res, 400, { error: 'invalid_item' });
    target = OPEN_SKIN_BASE + '/v1/prices?item=' + encodeURIComponent(item);
  } else {
    body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (_) { return send(res, 400, { error: 'invalid_json' }); }
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'invalid_body' });
    kind = String(body.kind || 'history');
    item = String(body.item || '').trim();
    const marketplace = String(body.marketplace || 'steam');
    const interval = String(body.interval || 'daily');
    if (kind !== 'history') return send(res, 400, { error: 'invalid_kind' });
    if (!item || item.length > MAX_ITEM_LENGTH) return send(res, 400, { error: 'invalid_item' });
    if (!ALLOWED_MARKETS.has(marketplace)) return send(res, 400, { error: 'invalid_marketplace' });
    if (interval !== 'daily' && interval !== 'hourly') return send(res, 400, { error: 'invalid_interval' });
    if ((body.from && !validDate(body.from)) || (body.to && !validDate(body.to))) return send(res, 400, { error: 'invalid_date_range' });
    if (body.from && body.to && body.from > body.to) return send(res, 400, { error: 'invalid_date_range' });
    target = OPEN_SKIN_BASE + '/v1/history';
    body = { item, marketplace, interval, ...(body.from ? { from: body.from } : {}), ...(body.to ? { to: body.to } : {}) };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    let upstream;
    try {
      upstream = await fetch(target, {
        method: kind === 'history' ? 'POST' : 'GET',
        headers: { Accept: 'application/json', ...(kind === 'history' ? { 'Content-Type': 'application/json' } : {}) },
        ...(kind === 'history' ? { body: JSON.stringify(body) } : {}),
        signal: controller.signal
      });
    } catch (error) {
      return send(res, error?.name === 'AbortError' ? 504 : 502, {
        error: error?.name === 'AbortError' ? 'openskin_timeout' : 'openskin_network_error',
        message: error?.name === 'AbortError' ? 'OpenSkin did not respond before the timeout.' : 'The server could not reach OpenSkin V1.'
      });
    }

    const raw = await upstream.text();
    let data;
    try { data = raw ? JSON.parse(raw) : null; }
    catch (_) { return send(res, 502, { error: 'openskin_invalid_json', upstream_status: upstream.status }); }

    if (!upstream.ok) {
      const status = upstream.status;
      const code = status === 404 ? 'item_not_found' : status === 429 ? 'openskin_rate_limited' : status >= 500 ? 'openskin_unavailable' : 'openskin_rejected';
      return send(res, status, { error: code, upstream_status: status, details: data?.error || data?.message || null });
    }

    if (kind === 'prices' && (!data || typeof data !== 'object' || !data.prices || typeof data.prices !== 'object' || Array.isArray(data.prices))) {
      return send(res, 502, { error: 'openskin_invalid_schema', message: 'Expected an object in the prices field.' });
    }
    if (kind === 'history' && (!data || !Array.isArray(data.data))) {
      return send(res, 502, { error: 'openskin_invalid_schema', message: 'Expected a data array in the history response.' });
    }

    return send(res, 200, data, kind === 'prices' ? 'public, s-maxage=45, stale-while-revalidate=120' : 'public, s-maxage=300, stale-while-revalidate=600');
  } finally {
    clearTimeout(timeout);
  }
}
