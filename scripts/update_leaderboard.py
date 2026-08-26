"""
Fetches the full loyalty leaderboard from StreamElements' public "top" endpoint
(discovered via browser DevTools) and writes it to leaderboard/data.json.

No login, no token needed — this endpoint is public (CORS: Access-Control-Allow-Origin: *).

CHANNEL_ID is AdhemSwag's StreamElements channel id, found via DevTools Network tab.
"""

import os
import sys
import json
import requests

CHANNEL_ID = "5cc027b175a5900b421ca6e5"
OUT_PATH = "leaderboard/data.json"
DEBUG_PATH = "leaderboard/debug_snapshot.txt"
PAGE_SIZE = 100          # entries requested per page
MAX_PAGES = 20           # safety cap

BASE_URL = f"https://api.streamelements.com/kappa/v2/points/{CHANNEL_ID}/top"

all_entries = []
seen_usernames = set()
debug_dump = []

for page_num in range(1, MAX_PAGES + 1):
    offset = (page_num - 1) * PAGE_SIZE
    resp = requests.get(
        BASE_URL,
        params={"offset": offset, "page": page_num, "limit": PAGE_SIZE},
        headers={"Accept": "application/json"},
        timeout=15,
    )
    debug_dump.append(f"--- PAGE {page_num} (status {resp.status_code}) ---\n{resp.text[:3000]}")

    if resp.status_code != 200:
        break

    try:
        data = resp.json()
    except ValueError:
        break

    # The response shape isn't confirmed yet — try common key names, fall back to raw list.
    batch = None
    if isinstance(data, list):
        batch = data
    elif isinstance(data, dict):
        for key in ("top", "leaderboard", "users", "data", "items"):
            if key in data and isinstance(data[key], list):
                batch = data[key]
                break

    if not batch:
        break

    new_in_batch = 0
    for entry in batch:
        uname = (
            entry.get("username")
            or entry.get("user")
            or entry.get("displayName")
            or entry.get("name")
        )
        points = entry.get("points", entry.get("amount", 0))
        if uname and uname not in seen_usernames:
            seen_usernames.add(uname)
            all_entries.append({"username": uname, "points": points})
            new_in_batch += 1

    if new_in_batch == 0 or len(batch) < PAGE_SIZE:
        break

# Save raw debug output regardless of outcome, for troubleshooting
os.makedirs(os.path.dirname(DEBUG_PATH), exist_ok=True)
with open(DEBUG_PATH, "w", encoding="utf-8") as f:
    f.write("\n\n".join(debug_dump))

if not all_entries:
    print("No leaderboard entries parsed. Check leaderboard/debug_snapshot.txt")
    sys.exit(1)

# Sort by points descending and assign ranks
all_entries.sort(key=lambda e: e["points"], reverse=True)
output = [
    {"rank": i, "username": e["username"], "points": e["points"]}
    for i, e in enumerate(all_entries, start=1)
]

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(output)} entries to {OUT_PATH}.")
