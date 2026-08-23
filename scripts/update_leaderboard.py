"""
Scrapes the PUBLIC StreamElements leaderboard page (the real page a visitor sees)
using a headless browser, and writes the result to leaderboard/data.json.

No API token needed — this just visits the public page like a normal visitor,
waits for it to load, and reads the rendered text.

Requires ONE environment variable (GitHub Actions secret or repo variable):
  STREAMELEMENTS_CHANNEL_NAME   - e.g. "adhemswag" (your StreamElements URL slug)
"""

import os
import re
import sys
import json
from playwright.sync_api import sync_playwright

CHANNEL_NAME = os.environ.get("STREAMELEMENTS_CHANNEL_NAME", "adhemswag")
OUT_PATH = "leaderboard/data.json"
DEBUG_PATH = "leaderboard/debug_snapshot.txt"
URL = f"https://streamelements.com/{CHANNEL_NAME}/leaderboard"


def parse_entries(text: str):
    """
    Looks for repeating patterns like:
      #1
      werdef_xd
      ...
      96,954
    Falls back to a looser rank/username/points scan if the exact layout differs.
    """
    entries = []

    # Pattern: "#<rank>" then a username-looking line then a number with commas somewhere nearby
    pattern = re.compile(
        r"#(\d+)\s*\n\s*([A-Za-z0-9_]{2,25})\b.*?([\d,]{2,10})\s*(?:PTS|POINTS|pts|points)?",
        re.S,
    )

    for match in pattern.finditer(text):
        rank = int(match.group(1))
        username = match.group(2)
        points_str = match.group(3).replace(",", "")
        if not points_str.isdigit():
            continue
        points = int(points_str)
        entries.append({"rank": rank, "username": username, "points": points})

    # De-duplicate by rank, keep first occurrence, sort by rank
    seen_ranks = {}
    for e in entries:
        if e["rank"] not in seen_ranks:
            seen_ranks[e["rank"]] = e

    return [seen_ranks[r] for r in sorted(seen_ranks)]


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(4000)  # extra buffer for client-side rendering

    body_text = page.inner_text("body")
    browser.close()

# Always save a raw debug snapshot so we can inspect what the page actually
# showed if parsing fails or looks wrong.
os.makedirs(os.path.dirname(DEBUG_PATH), exist_ok=True)
with open(DEBUG_PATH, "w", encoding="utf-8") as f:
    f.write(body_text)

entries = parse_entries(body_text)

if not entries:
    print("Could not parse any leaderboard entries. Check leaderboard/debug_snapshot.txt")
    sys.exit(1)

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(entries)} entries to {OUT_PATH}.")
