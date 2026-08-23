"""
Scrapes the PUBLIC StreamElements leaderboard page (the real page a visitor sees)
using a headless browser, clicking through "Next" to gather multiple pages,
and writes the combined result to leaderboard/data.json.

No API token needed — this just visits the public page like a normal visitor,
waits for it to load, and reads the rendered text.

Requires ONE environment variable (GitHub Actions env var):
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

MAX_PAGES = 20  # safety cap — stop after this many "Next" clicks no matter what


def parse_entries(text: str):
    """
    Splits the page text on rank markers like "#1", "#2", ... and extracts
    the username (first word-like token in each chunk) and the points
    (last comma-formatted number in each chunk, before the next rank marker).
    Handles both:
      "#4\tphpkiller\t18,225"                      (single line)
      "#1\tyasosus_bibus\n🥇\n\t30,910"             (medal emoji breaks the line)
    """
    cutoff_markers = [r"Previous", r"Page\s+\d+", r"©\s*2026\s*StreamElements"]
    cut_at = len(text)
    for marker in cutoff_markers:
        m = re.search(marker, text)
        if m:
            cut_at = min(cut_at, m.start())
    table_text = text[:cut_at]

    parts = re.split(r"#(\d+)", table_text)

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

    seen_ranks = {}
    for e in entries:
        if e["rank"] not in seen_ranks:
            seen_ranks[e["rank"]] = e

    return [seen_ranks[r] for r in sorted(seen_ranks)]


all_entries = {}
debug_pages = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(3000)

    for page_num in range(1, MAX_PAGES + 1):
        body_text = page.inner_text("body")
        debug_pages.append(f"--- PAGE {page_num} ---\n{body_text}")

        page_entries = parse_entries(body_text)
        new_count = 0
        for e in page_entries:
            if e["rank"] not in all_entries:
                all_entries[e["rank"]] = e
                new_count += 1

        if new_count == 0:
            break

        # Try to find and click "Next"
        next_btn = page.get_by_text("Next", exact=True).first
        if next_btn.count() == 0:
            break

        try:
            if next_btn.is_disabled():
                break
        except Exception:
            pass

        try:
            next_btn.click()
            page.wait_for_timeout(2000)
        except Exception:
            break

    browser.close()

os.makedirs(os.path.dirname(DEBUG_PATH), exist_ok=True)
with open(DEBUG_PATH, "w", encoding="utf-8") as f:
    f.write("\n\n".join(debug_pages))

entries = [all_entries[r] for r in sorted(all_entries)]

if not entries:
    print("Could not parse any leaderboard entries. Check leaderboard/debug_snapshot.txt")
    sys.exit(1)

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(entries)} entries to {OUT_PATH} across up to {MAX_PAGES} pages.")
