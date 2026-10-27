#!/usr/bin/env python3
"""
Stamp a version onto every CSS and JS link in the site's HTML.

GitHub Pages serves assets with `cache-control: max-age=600`, so after a deploy a
visitor's browser can keep using an old stylesheet or script for ten minutes —
which looks exactly like the site being broken. A changing `?v=` makes each
deploy a new URL, so the browser always fetches the current file.

Run this before committing a change:

    python3 tools/bump-assets.py
"""
import re, glob, os, time, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
version = time.strftime("%Y%m%d%H%M")

pattern = re.compile(r'((?:href|src)=")((?:css|js)/[^"?]+)(?:\?v=\d+)?(")')
changed = []

for path in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
    src = open(path, encoding="utf-8").read()
    out = pattern.sub(lambda m: f'{m.group(1)}{m.group(2)}?v={version}{m.group(3)}', src)
    if out != src:
        open(path, "w", encoding="utf-8").write(out)
        changed.append(os.path.basename(path))

print(f"version {version} stamped on {len(changed)} page(s)")
for c in changed:
    print("   ", c)
