# Promotional materials

Live on the site at `for-schools.html#materials`.

| File | Size | Used as |
|---|---|---|
| `flyer.png` | 320 × 460 | Card preview + "View full size" link |
| `brochure.png` | 416 × 292 | Card preview + "View full size" link |
| `infographic.png` | 384 × 732 | Card preview + "View full size" link |

## If you want these to be printable

These are fine on screen but too small to print. At 320px wide, the flyer prints at
about 1 inch. If a school wants to print one for a noticeboard, export higher-resolution
versions (around 2000px on the long edge, or PDF) from wherever you designed them, then
replace these files — keep the same filenames and the site picks them up automatically.

Once you have print-quality versions, change the button label in `for-schools.html`
from "View full size" to "Download" and add the `download` attribute to the link.

## Two things to fix in the materials themselves

- **The brochure shows `+123-456-7890`** — a placeholder number. Anyone reading it on
  the site may try to call it.
- **The infographic shows `www.mindmatter.com`** — a placeholder address, and singular
  ("mindmatter", not "mindmatters").

Worth correcting before anyone sees them, since both are now public on the site.
