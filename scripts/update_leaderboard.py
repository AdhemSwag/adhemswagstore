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
    Splits the page text on rank markers like "#1", "#2", ... and extracts
    the username (first word-like token in each chunk) and the points
    (last comma-formatted number in each chunk, before the next rank marker).
    Handles both:
      "#4\tphpkiller\t18,225"                      (single line)
      "#1\tyasosus_bibus\n🥇\n\t30,910"             (medal emoji breaks the line)
    """
    # Stop before the pagination/footer noise so we don't pick up junk numbers
    cutoff_markers = ["Previous", "Page 1", "© 2026 StreamElements"]
    cut_at = len(text)
    for marker in cutoff_markers:
        idx = text.find(marker)
        if idx != -1:
            cut_at = min(cut_at, idx)
    table_text = text[:cut_at]

    parts = re.split(r"#(\d+)", table_text)
    # parts looks like: [prefix, '1', chunk1, '2', chunk2, '3', chunk3, ...]

    entries = []
    for i in range(1, len(parts) - 1, 2):
        rank = int(parts[i])
        chunk = parts[i + 1]

        username_match = re.search(r"[A-Za-z0-9_]{2,25}", chunk)
        if not username_match:
            continue
        username = username_match.group(0)

        points_matches = re.findall(r"[\d]{1,3}(?:,\d{3})+|\d{3,}", chunk)
        if not points_matches:
            continue
        points = int(points_matches[-1].replace(",", ""))

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
