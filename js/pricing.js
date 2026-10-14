/* ==========================================================================
   MIND MATTERS — pricing.js
   Renders the pricing page from MM.pricing (js/content.js).
   To change a price, edit js/content.js — not this file.
   ========================================================================== */
(function () {
  'use strict';

  var P = window.MM && MM.pricing;
  if (!P) return;

  var cta = (window.MM && MM.cta) || { href: 'contact.html' };

  function money(n) {
    return P.currencySymbol + n.toLocaleString('en-AU');
  }

  var ARROW =
    '<svg class="btn__arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>';

  /* ---- Package cards ---- */
  function renderPackages() {
    var host = document.getElementById('price-packages');
    if (!host) return;

    host.innerHTML = P.packages.map(function (pkg) {
      var cls = 'price-card' +
        (pkg.featured ? ' price-card--featured' : '') +
        (pkg.id === 'online' ? ' price-card--rose' : '');
      var badge = pkg.badge ? ' data-badge="' + pkg.badge + '"' : '';

      return '' +
        '<article class="' + cls + '"' + badge + ' data-reveal>' +
          '<h3 class="price-card__type">' + pkg.name + '</h3>' +
          '<p class="price-card__blurb">' + pkg.blurb + '</p>' +
          '<p class="price-card__amount">' +
            '<span class="price-card__from">From</span>' +
            '<span class="price-card__value">' + money(pkg.minimum) + '</span>' +
          '</p>' +
          '<p class="price-card__unit">Minimum workshop cost, ' + P.currency + '</p>' +
          '<div class="price-card__divider"></div>' +
          '<ul class="ticks ticks--purple">' +
            pkg.includes.map(function (i) { return '<li>' + i + '</li>'; }).join('') +
          '</ul>' +
          '<p class="small muted" style="margin-bottom:1.5rem">' + pkg.footnote + '</p>' +
          '<a class="btn ' + (pkg.featured ? 'btn--primary' : 'btn--secondary') + ' btn--block" ' +
             'href="' + cta.href + '">Discuss Your Workshop' + ARROW + '</a>' +
        '</article>';
    }).join('');
  }

  /* ---- Group pricing table ---- */
  function renderGroups() {
    var host = document.getElementById('price-groups');
    if (!host) return;

    host.innerHTML = P.groups.map(function (g) {
      return '<tr><th scope="row">' + g.range + '</th>' +
             '<td><span class="amount">' + money(g.amount) + '</span></td></tr>';
    }).join('');
  }

  /* ---- Additional costs ---- */
  function renderExtras() {
    var host = document.getElementById('price-extras');
    if (!host) return;

    host.innerHTML = '' +
      '<article class="card card--compact card--teal card--topbar" data-reveal>' +
        '<h3>' + P.bookingFee.label + '</h3>' +
        '<p class="price-card__amount" style="margin:.5rem 0">' +
          '<span class="price-card__value" style="font-size:2.2rem">' + money(P.bookingFee.amount) + '</span>' +
        '</p>' +
        '<p class="small muted">' + P.bookingFee.note + '</p>' +
      '</article>' +
      '<article class="card card--compact card--rose card--topbar" data-reveal>' +
        '<h3>Printed resources</h3>' +
        '<p class="price-card__amount" style="margin:.5rem 0">' +
          '<span class="price-card__value" style="font-size:2.2rem;color:var(--mm-rose-ink)">' +
            money(P.printing.amount) +
          '</span>' +
          '<span class="price-card__unit">' + P.printing.unit + '</span>' +
        '</p>' +
        '<p class="small muted">' + P.printing.note + '</p>' +
      '</article>';
  }

  /* ---- Inline figures used in prose (data-price="bookingFee") ---- */
  function renderInline() {
    document.querySelectorAll('[data-price]').forEach(function (el) {
      var key = el.getAttribute('data-price');
      if (key === 'bookingFee') el.textContent = money(P.bookingFee.amount);
      if (key === 'printing')   el.textContent = money(P.printing.amount);
      if (key === 'inPerson')   el.textContent = money(P.packages[0].minimum);
      if (key === 'online')     el.textContent = money(P.packages[1].minimum);
    });
  }

  function renderNote() {
    var host = document.getElementById('price-note-text');
    if (host) host.textContent = P.note;
  }

  function init() {
    renderPackages();
    renderGroups();
    renderExtras();
    renderInline();
    renderNote();

    // These cards were inserted after site.js set up its scroll observer,
    // so ask it to pick them up (otherwise they'd stay faded out).
    if (window.MM && typeof MM.revealScan === 'function') MM.revealScan();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
