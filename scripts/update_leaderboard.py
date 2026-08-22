"""
Fetches the FULL loyalty leaderboard from StreamElements (paginated) and
writes it to leaderboard/data.json for the page's client-side table to consume.

Requires two environment variables (set as GitHub Actions secrets):
  STREAMELEMENTS_JWT         - your JWT token (Dashboard > Account > Channels > Show secrets)
  STREAMELEMENTS_CHANNEL_ID  - your channel's guid (same page as the JWT)
"""

import os
import sys
import json
import requests

JWT = os.environ.get("STREAMELEMENTS_JWT")
CHANNEL_ID = os.environ.get("STREAMELEMENTS_CHANNEL_ID")
OUT_PATH = "leaderboard/data.json"
PAGE_SIZE = 100          # how many to request per API call
MAX_ENTRIES = 1000       # safety cap so a run can't loop forever

if not JWT or not CHANNEL_ID:
    print("Missing STREAMELEMENTS_JWT or STREAMELEMENTS_CHANNEL_ID secret.")
    sys.exit(1)

headers = {"Authorization": f"Bearer {JWT}", "Accept": "application/json"}

all_entries = []
seen_usernames = set()
offset = 0

while offset < MAX_ENTRIES:
    resp = requests.get(
        f"https://api.streamelements.com/kappa/v2/points/{CHANNEL_ID}/leaderboard",
        params={"limit": PAGE_SIZE, "offset": offset},
        headers=headers,
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    batch = data.get("leaderboard", data if isinstance(data, list) else [])

    if not batch:
        break

    new_in_batch = 0
    for entry in batch:
        uname = entry.get("username") or entry.get("user")
        if uname and uname not in seen_usernames:
            seen_usernames.add(uname)
            all_entries.append(entry)
            new_in_batch += 1

    # If a full page came back but none of it was new, the API is likely
    # ignoring "offset" and repeating the same page — stop here to avoid looping forever.
    if new_in_batch == 0:
        break

    offset += PAGE_SIZE

    if len(batch) < PAGE_SIZE:
        break

if not all_entries:
    print("No leaderboard entries returned — aborting without changes.")
    sys.exit(0)

output = []
for i, entry in enumerate(all_entries[:MAX_ENTRIES], start=1):
    username = entry.get("username") or entry.get("user") or "unknown"
    points = entry.get("points", 0)
    output.append({"rank": i, "username": username, "points": points})

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(output)} entries to {OUT_PATH}.")
