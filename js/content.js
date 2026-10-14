/* ==========================================================================
   MIND MATTERS — content.js
   SINGLE SOURCE OF TRUTH for details that change often.
   Edit this file to update navigation, contact details and pricing
   everywhere on the site. No other files need to change.
   ========================================================================== */

window.MM = window.MM || {};

/* --------------------------------------------------------------------------
   ORGANISATION DETAILS
   Replace the `null` values below once real details are available.
   Anything left as null renders as a clearly-marked placeholder.
   -------------------------------------------------------------------------- */
MM.org = {
  name: 'Mind Matters',
  slogan: 'Learn Your Feelings, Find Your Voice',
  description:
    'An educational wellbeing workshop giving Year 3–6 students practical tools to ' +
    'understand their emotions, regulate their reactions and navigate conflict with confidence.',

  // --- Contact details: add real values when confirmed ---
  email: null,          // e.g. 'hello@mindmatters.com.au'
  phone: null,          // e.g. '(07) 1234 5678'
  location: null,       // e.g. 'Brisbane, Queensland'
  abn: null,            // e.g. 'ABN 00 000 000 000'

  // --- Social: leave as an empty array until accounts exist ---
  social: []            // e.g. [{ label: 'LinkedIn', url: 'https://...' }]
};

/* --------------------------------------------------------------------------
   NAVIGATION
   Order here is the order shown in the header.
   -------------------------------------------------------------------------- */
MM.nav = [
  { label: 'Home',           href: 'index.html' },
  { label: 'The Workshop',   href: 'workshop.html' },
  { label: 'Why It Matters', href: 'why-it-matters.html' },
  { label: 'Our Prototype',  href: 'prototype.html' },
  { label: 'Impact & Future',href: 'impact.html' },
  { label: 'For Schools',    href: 'for-schools.html' }
];

MM.cta = {
  label: 'Bring This Workshop to Your School',
  shortLabel: 'Book a Workshop',
  href: 'contact.html'
};

/* Secondary links shown in the footer only */
MM.footerLinks = {
  explore: [
    { label: 'The Workshop',        href: 'workshop.html' },
    { label: 'How It Works',        href: 'workshop.html#how-it-works' },
    { label: 'Why It Matters',      href: 'why-it-matters.html' },
    { label: 'Research & Evidence', href: 'why-it-matters.html#research' },
    { label: 'Our Prototype',       href: 'prototype.html' }
  ],
  schools: [
    { label: 'For Schools',     href: 'for-schools.html' },
    { label: 'Pricing',         href: 'for-schools.html#pricing' },
    { label: 'Our Impact',      href: 'impact.html' },
    { label: 'Our Future',      href: 'impact.html#future' },
    { label: 'Flyer & Brochure', href: 'for-schools.html#materials' },
    { label: 'Book a Workshop', href: 'contact.html' }
  ]
};

/* --------------------------------------------------------------------------
   PRICING
   ⚠️  EDIT PRICES HERE ONLY. The pricing page reads every figure from this
   object, so a single change updates the cards, the table and the summary.
   Amounts are in AUD and are written as plain numbers.
   -------------------------------------------------------------------------- */
MM.pricing = {
  currency: 'AUD',
  currencySymbol: '$',

  bookingFee: {
    amount: 30,
    label: 'Booking fee',
    note: 'Applies to every confirmed workshop booking.'
  },

  printing: {
    amount: 5,
    unit: 'per participant',
    note: 'Applies where printed worksheets and activity resources are required.'
  },

  packages: [
    {
      id: 'in-person',
      name: 'In-person workshop',
      blurb: 'Delivered on site at your school, in a classroom, library or hall.',
      minimum: 405,
      featured: true,
      badge: 'Most requested',
      includes: [
        'Approximately 2-hour facilitated workshop',
        'Presentation-based learning',
        'Interactive games and activities',
        'Printed worksheets and activity resources',
        'Realistic conflict scenarios and discussion'
      ],
      footnote: 'Minimum workshop cost. Printing charged separately at $5 per participant.'
    },
    {
      id: 'online',
      name: 'Online workshop',
      blurb: 'Delivered live via your school’s preferred video platform.',
      minimum: 290,
      featured: false,
      badge: null,
      includes: [
        'Approximately 2-hour facilitated workshop',
        'Presentation-based learning',
        'Interactive activities adapted for online delivery',
        'Digital worksheets and activity resources',
        'Realistic conflict scenarios and discussion'
      ],
      footnote: 'Minimum workshop cost. Printing only applies if your school requests printed resources.'
    }
  ],

  groups: [
    { range: '1 – 50 participants',    amount: 375  },
    { range: '51 – 100 participants',  amount: 750  },
    { range: '101 – 150 participants', amount: 1250 }
  ],

  note:
    'Pricing and workshop options may be customised depending on school requirements.'
};

/* --------------------------------------------------------------------------
   ENQUIRY FORM OPTIONS
   -------------------------------------------------------------------------- */
MM.form = {
  roles: [
    'Principal / Deputy Principal',
    'Wellbeing Coordinator',
    'Teacher',
    'Student Support Staff',
    'Head of Year / Head of Department',
    'Parent / Carer',
    'Other'
  ],
  yearLevels: ['Year 3', 'Year 4', 'Year 5', 'Year 6', 'Mixed / Multiple year levels'],
  timeframes: [
    'As soon as possible',
    'This term',
    'Next term',
    'Next semester',
    'Next school year',
    'Still exploring options'
  ]
};
