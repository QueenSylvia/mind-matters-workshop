# Logo

| File | Size | Use |
|---|---|---|
| `mind-matters-logo.png` | 506 × 535 | **In use** — header and footer |
| `mind-matters-logo@512.png` | 484 × 512 | Spare, for social or favicon work |
| `mind-matters-logo-original.png` | 918 × 796 | Untouched master as supplied |

## What was changed

The original had a large empty cream margin — the artwork occupied only 486 × 515 of a
918 × 796 canvas, so **63% of the file was blank space**. At a usable header size that
would have shrunk the logo to roughly half the height it should be.

`mind-matters-logo.png` is cropped to the artwork with a 10px breathing margin.

## How it's placed

**Header** — sized by height (58px, shrinking to 46px when the page is scrolled, 48px on
mobile) with `width: auto`, so it can never distort. The logo's own cream ground is
`#FAF7F3`, effectively identical to the site's `#FAF7F2`, so it blends invisibly.

**Footer** — the footer is deep teal, and the logo carries its own cream background. It
therefore sits inside a cream rounded badge, which reads as a deliberate lockup rather
than a stray pale rectangle. If you ever get a version with a transparent background and
light-coloured text, the badge can be removed.

Both are rendered from `js/site.js`, so the markup lives in one place.
