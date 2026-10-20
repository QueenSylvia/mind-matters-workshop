# Mind Matters — Website

**Learn Your Feelings, Find Your Voice.**

🔗 **Live site: <https://queensylvia.github.io/mind-matters-workshop/>**

A static website for Mind Matters, an educational wellbeing workshop for Year 3–6 students
covering emotional resilience, emotional regulation, communication and conflict resolution.

Built as plain HTML, CSS and JavaScript — no build step, no dependencies, no framework.

---

## Updating the live site

Edit any file, then run these two commands from this folder:

```bash
git add -A && git commit -m "Describe what changed"
```

```bash
git push
```

GitHub Pages rebuilds automatically. The change is live in about a minute.

If you don't see it, hard-refresh with **Cmd+Shift+R** — browsers cache CSS aggressively.

### Hosting details

| | |
|---|---|
| Repository | <https://github.com/QueenSylvia/mind-matters-workshop> (public) |
| Host | GitHub Pages, free tier |
| Branch | `main`, served from the repository root |
| Build time | ~1 minute after each push |

The repository is public because free GitHub Pages requires it. Commits use a private
GitHub noreply address rather than a personal email.

---

## Running the site locally

The site uses relative paths and works when opened directly from the file system, but a
local server is recommended (it matches how it will behave when hosted):

```bash
python3 -m http.server 8123
```

Then visit <http://localhost:8123>.

---

## Project disclaimer

Mind Matters is a concept created for a school assignment. It is not a registered
business and the workshop cannot be booked.

Because the site is publicly accessible and reads like a real organisation, a disclaimer
appears in **two places**:

1. **The footer of every page** — rendered by `js/site.js` from `MM.disclaimer` in
   `js/content.js`. Edit it there and it updates across the whole site.
2. **Directly above the enquiry form** on `contact.html`, where someone is most likely
   to try to make contact.

### The contact details are deliberately non-functional

| Detail | Value | Why it's safe |
|---|---|---|
| Email | `hello@mindmatters.com` | Placeholder — not a monitored inbox |
| Phone | `(07) 5550 1234` | The `5550` range is reserved in Australia for fictional use, so it cannot connect to a real person |
| Location | Brisbane, Queensland | General area only, no street address |

If Mind Matters ever became real, replace these in `MM.org` (`js/content.js`) and remove
`MM.disclaimer` plus the `.notice` block in `contact.html`.

## Folder structure

```
MindMattersWebsite/
├── index.html              Home — problem, approach, outcomes, feedback, call to action
├── workshop.html           The Workshop — what it covers, the six stages, structure, delivery
├── why-it-matters.html     Why It Matters — problem, audience, research, interviews, sources
├── prototype.html          Our Prototype — materials, testing, feedback, improvements
├── impact.html             Impact & Future — who benefits, and where this goes next
├── for-schools.html        For Schools — benefits, inclusions, pricing, booking, FAQs
├── contact.html            Contact / Book a Workshop
│
├── css/
│   ├── base.css            Design tokens, reset, typography, layout, motion
│   ├── components.css      Header, buttons, cards, steps, stats, forms, footer, jump nav
│   └── pages.css           Hero, page headers, pricing, prototype, contact
│
├── js/
│   ├── content.js          ⭐ EDIT THIS — nav, contact details, pricing, form options
│   ├── site.js             Renders the header/footer; scroll, menu and reveal behaviour
│   ├── pricing.js          Renders the pricing section from content.js
│   └── form.js             Enquiry form options + validation
│
└── assets/
    ├── illustrations/      Custom SVG characters and shapes (+ favicon)
    ├── logo/               ← put the real logo here
    ├── downloads/          ← put the flyer, brochure and infographic here
    ├── images/prototype/   Watermarked slides + worksheets (JPEG, web-optimised)
    └── reference/          The original workshop title slide
```

**Seven pages, six nav items.** Content that used to have its own page is now a section
inside a related one, reachable from the nav *and* from the jump-links under each page
heading:

| Was its own page | Now lives at |
|---|---|
| How It Works | `workshop.html#how-it-works` |
| Research & Evidence | `why-it-matters.html#research` |
| Pricing | `for-schools.html#pricing` |
| Our Vision | `impact.html#future` |

Old links still work as anchors, so nothing is orphaned.

---

## Common edits

### 1. Adding the real logo

The header and footer currently show a bordered placeholder reading
`[ Mind Matters Logo ]`. Space has been reserved so a real logo can drop straight in.

1. Save the logo to `assets/logo/` (SVG preferred; PNG at 2× also works).
2. Open `js/site.js` and find the comment `===== LOGO PLACEHOLDER =====`.
3. Replace the placeholder `<span>` with your image, and add `logo-slot--filled` to
   remove the dashed frame:

```js
'<span class="logo-slot logo-slot--filled">' +
  '<img src="assets/logo/mind-matters-logo.svg" alt="Mind Matters">' +
'</span>' +
```

4. Do the same for the footer placeholder further down the same file.

### 2. Updating pricing

**Edit `js/content.js` only.** Every figure on the pricing page — the cards, the group
table, the booking fee, printing, and the prices quoted in the FAQs on other pages — is
read from the `MM.pricing` object. Change a number there and it updates everywhere.

```js
MM.pricing = {
  bookingFee: { amount: 30, ... },
  printing:   { amount: 5,  ... },
  packages: [ { id: 'in-person', minimum: 405, ... }, ... ],
  groups:   [ { range: '1 – 50 participants', amount: 375 }, ... ],
  note: 'Pricing and workshop options may be customised…'
};
```

### 3. Adding contact details

In `js/content.js`, fill in the `MM.org` fields that are currently `null`:

```js
MM.org = {
  email: 'hello@example.com',
  phone: '(07) 1234 5678',
  location: 'Brisbane, Queensland',
  abn: 'ABN 00 000 000 000',
  social: [ { label: 'LinkedIn', url: 'https://…' } ]
};
```

Anything left as `null` renders as a clearly-marked placeholder rather than an invented
detail. Also update the three placeholder blocks in the sidebar of `contact.html`.

### 4. Connecting the enquiry form

The form validates but does not send anywhere yet. It shows an honest
"form not connected" notice rather than pretending an enquiry was submitted.

To connect it, add an `action` to the `<form id="enquiry-form">` tag in `contact.html`:

```html
<form class="form" id="enquiry-form" method="post" action="https://formspree.io/f/YOUR_ID" novalidate>
```

`js/form.js` detects the `action` attribute and lets the browser submit normally.

### 5. Adding prototype images

1. Put images in `assets/images/prototype/`.
2. In `prototype.html`, replace a placeholder block:

```html
<div class="placeholder placeholder--tall">…</div>
```

with a real media frame (the title slide near the top of that page is a working example):

```html
<figure class="media-frame">
  <img src="assets/images/prototype/worksheet-1.png"
       alt="Describe what the image shows, for screen reader users." loading="lazy">
  <figcaption><b>Worksheet title</b> — a short description.</figcaption>
</figure>
```

Always write meaningful `alt` text.

### 6. Adding interview quotes

`why-it-matters.html` has three quote slots marked `===== QUOTE SLOT =====`. Replace the
placeholder text with the real quotation and remove the `quote--empty` class:

```html
<figure class="quote">
  <blockquote class="quote__text">“The real quote goes here.”</blockquote>
  <figcaption class="quote__attrib">Senior teacher</figcaption>
</figure>
```

### 7. Changing navigation

Edit the `MM.nav` array in `js/content.js`. The header is rendered from it, and the
active page is highlighted automatically. Keep it to six or seven items — the nav
switches to a hamburger menu below 1180px.

On-page jump links (the pill row under each page heading) are plain HTML — look for
`<nav class="jumpnav">` near the top of a page.

---

## Status

**Every item on the project brief is written and live.** There are no placeholders left
on the site.

| Brief item | Where it lives |
|---|---|
| The problem | `index.html` and `why-it-matters.html#problem` |
| Target audience | `why-it-matters.html#audience` |
| Research and evidence | `why-it-matters.html#research` — the need now, the consequences later, and that the skills are teachable |
| Empathy interviews | `why-it-matters.html#interviews` |
| Feedback | `prototype.html#feedback` and `index.html#feedback` |
| Improvements | `prototype.html#improvements` |
| Our Impact | `impact.html` |
| Our Future | `impact.html#future` |
| Call to action | Every page, plus the closing section on `index.html` |

### Optional polish

**Print-quality promotional materials** — `assets/downloads/`
The flyer, brochure and infographic are live on `for-schools.html#materials`, but at
320–416px wide they're screen-only. Higher-resolution exports (≈2000px or PDF) would let
schools print them. Replace the files using the same names and the site picks them up.

Two fixes needed in the materials themselves, both now public: the brochure shows a
placeholder phone number (`+123-456-7890`), and the infographic a placeholder web address
(`www.mindmatter.com`).

### Deliberately not included

**Prototype testing** — no delivery to a class has taken place, so there's no testing
section. Feedback and Improvements cover the review that did happen.

**Session photos and video** — these were upload slots from the original design brief,
not items on the assessment task. They'd require having run the workshop with a class.
Removed rather than left as empty boxes.

**Safety and compliance** — a real school-facing provider would need a Working with
Children Check and public liability insurance; as a student project there was nothing
truthful to put there.

If the workshop is ever delivered to a class, photos would slot naturally into
`prototype.html` after the worksheets, using the same `.media-frame` markup as the slides.

## Prototype images

Eleven watermarked PNGs were supplied and converted to web-optimised JPEGs
(9.0 MB → 2.9 MB). Eight are live on `prototype.html`:

**Slides** — `slide-01-title`, `slide-03-regulating-emotions`,
`slide-06-match-the-cards`, `slide-07-communication-conflict-game`

**Worksheets** — `worksheet-how-am-i-feeling`, `worksheet-communication-challenge`,
`worksheet-conflict-detective`, `activity-matching-cards`

Three slides are converted and sitting in the folder but **not shown**, because they're
mostly body text and read poorly as thumbnails. Swap one in by changing the `src` on any
`.media-frame` in `prototype.html`:

- `slide-02-emotions.jpg` — what emotions are
- `slide-04-communication-conflict-skills.jpg` — definition of the skills
- `slide-05-conflict-role-play.jpg` — the group-work role play

To re-run the conversion on new images:

```bash
sips -s format jpeg -s formatOptions 82 -Z 1600 input.png --out output.jpg
```

Use `-Z 1600` for 16:9 slides and `-Z 1400` for portrait worksheets.

## Design system

Everything visual is controlled by CSS custom properties at the top of `css/base.css`.

### Brand palette

These are the six brand colours, used exactly as specified:

| Role | Colour | Token | Hex |
|---|---|---|---|
| Primary | Muted Teal | `--mm-teal` | `#477F7B` |
| Secondary | Dusty Rose | `--mm-rose` | `#E8899B` |
| Accent | Peach | `--mm-peach` | `#FAB7A7` |
| Background | Warm Cream | `--mm-canvas` | `#FAF7F2` |
| Dark text | Deep Teal | `--mm-deep` | `#263F3D` |
| Light text | Warm Cream | `--mm-light` | `#FAF7F2` |
| Border | Soft Rose-Grey | `--mm-border` | `#E5C7C5` |

### Text-safe variants

Muted Teal and Dusty Rose are too light to carry **small text** on a cream background,
so the site uses slightly deeper versions for links, labels, captions and icons. The
brand colours themselves are unchanged and still do all the visible colour work — fills,
borders, headings, illustrations and large display type.

| Token | Hex | Used for |
|---|---|---|
| `--mm-teal-deep` | `#3A6A66` | links, small teal text, button hover |
| `--mm-rose-ink` | `#A8465C` | rose used as text or an icon |
| `--mm-peach-ink` | `#A85232` | peach used as text or an icon |
| `--mm-muted` | `#54706E` | captions and secondary copy |
| `--mm-border-strong` | `#AD8482` | form input borders (must be perceivable) |

Surface tints derived from the brand colours: `--mm-teal-tint` `#E7EFEE`,
`--mm-rose-tint` `#FBEEF0`, `--mm-peach-tint` `#FDEFE9`, `--mm-cream-deep` `#F4EEE5`,
`--mm-surface` `#FFFFFF` (cards sit above the cream page).

### Two things worth knowing

1. **Light text never sits on Dusty Rose or Peach.** Warm Cream on Dusty Rose is only
   2.3:1 and on Peach only 1.6:1 — both well below the 4.5:1 minimum. Rose and peach
   surfaces therefore use **Deep Teal** text (4.6:1 and 6.7:1). Light text is used on
   teal surfaces only, as intended.
2. **Buttons and the call-to-action band use pure white, not cream.** Warm Cream on
   Muted Teal is 4.28:1, which just misses; pure white on the same teal is 4.58:1 and
   passes. The teal is unchanged — only the text colour differs, imperceptibly.

### How colour is used

Colour carries meaning on this site rather than just decorating it:

- **Warm (Dusty Rose, Peach)** — emotion, the problem, people. Used for the problem
  sections, what students gain, consequences, and the audience.
- **Cool (Muted Teal, Deep Teal)** — regulation, evidence, outcome, trust. Used for the
  research, the solution, and every call to action.

The four-step approach runs **warm to cool**, mirroring the journey it describes:
Recognise (peach — the feeling arrives) → Regulate (teal — calming) → Communicate
(rose — connection) → Resolve (deep teal — settled).

Section grounds alternate to keep warm and cool roughly even (currently 14 warm to 15
cool). Two tinted sections of the same colour never sit next to each other.

**Why teal leads rather than rose**, even though the print materials are pink-dominant:
teal reads as calm and trustworthy to the school staff who make the booking decision,
it *is* the colour of the regulation the workshop teaches, and a pink-dominant identity
risks reading as gendered for a workshop that every student in a year level attends.
Rose and peach do the warmth instead, which is why the balance matters.

### Colour variants

Four variants cycle through the palette: `--teal`, `--rose`, `--peach`, `--deep`.
They apply to `.card`, `.activity`, `.stat`, `.eyebrow`, `.journey__item` (`.j--*`),
`.page-head`, `.section` and `.horizon-card` (`.h--*`) — for example
`.card--rose`, `.section--peach`, `.eyebrow--deep`.

| Other tokens | Examples |
|---|---|
| Type | `--font-display` (Fredoka), `--font-body` (Inter), `--font-hand` (Caveat) |
| Scale | `--fs-display` … `--fs-tiny` (all fluid) |
| Spacing | `--sp-1` … `--sp-10`, `--section-y` |
| Radii | `--r-sm` … `--r-2xl`, `--r-pill`, `--r-blob` |
| Shadows | `--sh-xs` … `--sh-xl`, `--sh-teal` |

Change a token once and the whole site follows.

**Reusable components:** `.btn`, `.card`, `.step`, `.journey__item`, `.stat`, `.activity`,
`.price-card`, `.placeholder`, `.quote`, `.faq__item`, `.cta-band`, `.factgrid`, `.ticks`.

**Animation:** add `data-reveal` to any element to have it fade and slide in when scrolled
into view. Stagger with `style="--reveal-delay:80ms"`. All motion respects
`prefers-reduced-motion`.

## Accuracy notes

This site deliberately avoids invented content. There are no fabricated statistics,
testimonials, client schools, partnerships, awards or staff. Where information hasn't been
supplied it appears as a visible placeholder.

Every statistic on `why-it-matters.html` is attributed. Evidence about primary-aged
students is visually distinguished from broader evidence covering other age groups or
countries, so the two are never conflated — each card carries a scope pill, and the
broader ones carry an explicit note naming the age group they actually describe.

The page leads with the project's own research on the scale of the problem (ages 16–25,
teenagers, and UK 10–15 year olds), then narrows to two Australian findings about
primary-aged students, which are what justify targeting Years 3–6.

Copy uses Australian English throughout (behaviour, organisation, recognise, practise).

---

## Accessibility

- Semantic landmarks, skip link, and a logical heading hierarchy on every page
- Visible focus states on all interactive elements (3px outline)
- Form labels tied to inputs, errors announced via `role="alert"`
- Colour is never the only means of conveying meaning — evidence scope pills, step numbers
  and status messages all carry text
- Every text element on every page was checked against its real rendered background and
  meets WCAG AA (4.5:1 body text, 3:1 large text and UI)
- Tap targets are at least 44–52px high
- Decorative illustrations are `aria-hidden`; meaningful images have descriptive alt text
- Full keyboard navigation, including the mobile menu (closes on <kbd>Esc</kbd>)

---

© Mind Matters. Mind Matters is an educational skill-building workshop. It is not a
counselling, diagnostic or clinical mental health service.
