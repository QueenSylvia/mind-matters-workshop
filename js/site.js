/* ==========================================================================
   MIND MATTERS — site.js
   Renders the shared header and footer, and runs the site's interactions.
   Depends on: js/content.js (must load first).
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  window.MM = window.MM || {};

  var org  = (window.MM && MM.org)  || {};
  var nav  = (window.MM && MM.nav)  || [];
  var cta  = (window.MM && MM.cta)  || { label: 'Contact', href: 'contact.html' };
  var fLinks = (window.MM && MM.footerLinks) || { explore: [], schools: [] };
  var disc = (window.MM && MM.disclaimer) || null;

  var ARROW =
    '<svg class="btn__arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>';

  /* ---------------------------------------------------------------------
     Work out which nav item matches the current page
     --------------------------------------------------------------------- */
  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return (!path || path === '') ? 'index.html' : path;
  }

  /* ---------------------------------------------------------------------
     HEADER
     --------------------------------------------------------------------- */
  function buildHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;

    var here = currentPage();
    var links = nav.map(function (item) {
      var active = item.href === here ? ' aria-current="page"' : '';
      return '<li><a class="nav__link" href="' + item.href + '"' + active + '>' + item.label + '</a></li>';
    }).join('');

    host.className = 'site-header';
    host.innerHTML =
      '<div class="wrap wrap--wide">' +
        '<nav class="nav" aria-label="Main">' +

          '<a class="nav__brand" href="index.html" aria-label="' + org.name + ' — home">' +
            /* Horizontal lockup: the hand-and-heart mark, then the name and
               slogan as live text — far more readable at header size than the
               circular badge, whose ring text disappears when small. */
            '<img class="brand__mark" src="assets/logo/mind-matters-mark.png" ' +
                 'alt="" width="294" height="262">' +
            '<span class="brand__text">' +
              '<span class="brand__name">' + org.name + '</span>' +
              '<span class="brand__slogan">' + org.slogan + '</span>' +
            '</span>' +
          '</a>' +

          '<div class="nav__menu" id="nav-menu">' +
            '<ul class="nav__links">' + links + '</ul>' +
            '<div class="nav__cta">' +
              '<a class="btn btn--primary btn--sm" href="' + cta.href + '">' +
                '<span class="nav__cta-full">' + cta.label + '</span>' +
                '<span class="nav__cta-short">' + cta.shortLabel + '</span>' + ARROW +
              '</a>' +
            '</div>' +
          '</div>' +

          '<button class="nav__toggle" type="button" id="nav-toggle" ' +
                  'aria-expanded="false" aria-controls="nav-menu">' +
            '<span class="visually-hidden">Menu</span>' +
            '<span class="nav__toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>' +
          '</button>' +

        '</nav>' +
      '</div>';

    setupNavToggle();
    setupStickyHeader(host);
  }

  function setupNavToggle() {
    var toggle = document.getElementById('nav-toggle');
    var menu   = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1180) close();
    });
  }

  function setupStickyHeader(host) {
    var ticking = false;
    function update() {
      host.classList.toggle('is-stuck', window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------
     FOOTER
     --------------------------------------------------------------------- */
  function linkList(items) {
    return items.map(function (i) {
      return '<li><a href="' + i.href + '">' + i.label + '</a></li>';
    }).join('');
  }

  function contactLine(label, value, href) {
    var body = value
      ? (href ? '<a href="' + href + value + '">' + value + '</a>' : value)
      : '<span class="footer__placeholder">' + label + ' to be confirmed</span>';
    return '<li>' + body + '</li>';
  }

  function buildFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;

    var year = new Date().getFullYear();

    var social = (org.social && org.social.length)
      ? '<ul class="footer__list">' + linkList(org.social) + '</ul>'
      : '<span class="footer__placeholder">Social channels coming soon</span>';

    host.className = 'site-footer';
    host.innerHTML =
      '<div class="wrap wrap--wide">' +
        '<div class="footer__top">' +

          '<div>' +
            '<div class="footer__logo-slot footer__logo-slot--filled">' +
              '<img src="assets/logo/mind-matters-logo.png" ' +
                   'alt="' + org.name + '" width="506" height="535">' +
            '</div>' +
            '<p class="footer__slogan">' + org.slogan + '</p>' +
            '<p class="footer__desc">' + org.description + '</p>' +
          '</div>' +

          '<div>' +
            '<h2 class="footer__heading">Explore</h2>' +
            '<ul class="footer__list">' + linkList(fLinks.explore) + '</ul>' +
          '</div>' +

          '<div>' +
            '<h2 class="footer__heading">For schools</h2>' +
            '<ul class="footer__list">' + linkList(fLinks.schools) + '</ul>' +
          '</div>' +

          '<div>' +
            '<h2 class="footer__heading">Get in touch</h2>' +
            '<ul class="footer__list">' +
              contactLine('Email address', org.email, 'mailto:') +
              contactLine('Phone number', org.phone, 'tel:') +
              contactLine('Location', org.location, null) +
            '</ul>' +
            '<p style="margin-top:1.25rem">' +
              '<a class="btn btn--primary btn--sm" href="' + cta.href + '">' +
                cta.shortLabel + ARROW +
              '</a>' +
            '</p>' +
            '<div style="margin-top:1.25rem">' + social + '</div>' +
          '</div>' +

        '</div>' +

        (disc ?
          '<div class="footer__notice" role="note">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
                 'stroke-linecap="round" aria-hidden="true">' +
              '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>' +
              '<path d="M12 9v4M12 17h.01"/>' +
            '</svg>' +
            '<p><strong>' + disc.short + '</strong> ' + disc.full + '</p>' +
          '</div>'
        : '') +

        '<div class="footer__bottom">' +
          '<p>© ' + year + ' ' + org.name + '. ' +
            (org.abn ? org.abn + '. ' : '') +
            'All rights reserved.</p>' +
          '<p>Mind Matters is an educational skill-building workshop. It is not a ' +
            'counselling, diagnostic or clinical mental health service.</p>' +
        '</div>' +
      '</div>';
  }

  /* ---------------------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------------------- */
  var revealObserver = null;

  function setupReveal() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduce && 'IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });
    }

    MM.revealScan();

    // Safety net: anything already within the viewport shortly after load is
    // shown regardless, so content is never left invisible on screen.
    window.setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
      });
    }, 900);
  }

  /* Public: call after inserting new [data-reveal] elements into the page,
     so dynamically rendered content animates in like the rest of the site. */
  MM.revealScan = function (root) {
    var items = (root || document).querySelectorAll('[data-reveal]:not(.is-visible)');
    if (!revealObserver) {
      // Reduced motion, or no IntersectionObserver: show everything immediately.
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    items.forEach(function (el) { revealObserver.observe(el); });
  };

  /* ---------------------------------------------------------------------
     ANIMATED STATISTICS
     Usage: <span data-count-to="56" data-count-suffix="%">56%</span>
     --------------------------------------------------------------------- */
  function setupCounters(root) {
    var nodes = (root || document).querySelectorAll('[data-count-to]');
    if (!nodes.length) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    nodes.forEach(function (n) { io.observe(n); });

    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count-to'));
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      var dur = 1100;
      var start = performance.now();

      function frame(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  }

  /* ---------------------------------------------------------------------
     INIT
     --------------------------------------------------------------------- */
  function init() {
    buildHeader();
    buildFooter();
    setupReveal();
    setupCounters();
    MM.countersScan = setupCounters;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
