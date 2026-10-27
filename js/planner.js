/* ==========================================================================
   MIND MATTERS — planner.js
   Session planner on the contact page.

   Schools rarely have a free two-hour block, so this works out how many
   shorter sessions the workshop splits into, what each session covers, and
   roughly what it costs.

   Everything is derived from real figures:
     • workshop length and the six stages — see how-it-works content
     • pricing bands, booking fee and printing — MM.pricing in js/content.js
   Change a price in content.js and this updates with it.
   ========================================================================== */
(function () {
  'use strict';

  var WORKSHOP_MINUTES = 120;          // "approximately 2 hours"

  /* The six stages students move through, in order. */
  var STAGES = [
    'Understand — how emotions influence behaviour',
    'Recognise — spotting emotions escalating',
    'Regulate — strategies to calm down',
    'Communicate — expressing feelings and listening',
    'Resolve — working through a disagreement',
    'Knowing when to ask a trusted adult for help'
  ];

  var P = window.MM && MM.pricing;
  if (!P) return;

  function money(n) { return P.currencySymbol + Math.round(n).toLocaleString('en-AU'); }

  /* Which pricing band a group falls into. */
  function bandFor(students) {
    if (students <= 50)  return P.groups[0];
    if (students <= 100) return P.groups[1];
    return P.groups[2];
  }

  /* Spread the six stages as evenly as possible across N sessions. */
  function splitStages(sessions) {
    var out = [], per = STAGES.length / sessions, taken = 0;
    for (var i = 0; i < sessions; i++) {
      var end = (i === sessions - 1) ? STAGES.length : Math.round(per * (i + 1));
      out.push(STAGES.slice(taken, end));
      taken = end;
    }
    return out.filter(function (g) { return g.length; });
  }

  function plan(minutes, students, delivery, printed) {
    var sessions = Math.max(1, Math.ceil(WORKSHOP_MINUTES / minutes));
    var band = bandFor(students);
    var printing = printed ? P.printing.amount * students : 0;
    var subtotal = P.bookingFee.amount + band.amount + printing;
    var floor = (delivery === 'online' ? P.packages[1].minimum : P.packages[0].minimum);
    return {
      sessions: sessions,
      minutes: minutes,
      lastSession: WORKSHOP_MINUTES - (sessions - 1) * minutes,
      groups: splitStages(sessions),
      band: band,
      printing: printing,
      total: Math.max(subtotal, floor),
      belowFloor: subtotal < floor
    };
  }

  function render(r, delivery, printed, students) {
    var el = document.getElementById('planner-result');
    if (!el) return;

    var sessionLine = r.sessions === 1
      ? 'One session of about ' + WORKSHOP_MINUTES + ' minutes'
      : r.sessions + ' sessions of up to ' + r.minutes + ' minutes';

    var lastNote = (r.sessions > 1 && r.lastSession > 0 && r.lastSession < r.minutes)
      ? '<p class="small muted" style="margin-top:.5rem">The final session only needs about '
        + r.lastSession + ' minutes.</p>'
      : '';

    var stages = r.groups.map(function (g, i) {
      return '<li><strong>Session ' + (i + 1) + '</strong>'
           + '<ul style="margin:.35rem 0 0;padding-left:1.1rem">'
           + g.map(function (s) { return '<li class="small">' + s + '</li>'; }).join('')
           + '</ul></li>';
    }).join('');

    el.innerHTML =
      '<div class="planner__headline">' +
        '<p class="planner__figure">' + r.sessions + '</p>' +
        '<div>' +
          '<p class="planner__lead">' + sessionLine + '</p>' +
          '<p class="small muted">for ' + students + ' student' + (students === 1 ? '' : 's') +
            ', ' + (delivery === 'online' ? 'online' : 'in person') + '</p>' +
        '</div>' +
      '</div>' +
      lastNote +

      '<h4 style="margin:1.5rem 0 .6rem">What each session covers</h4>' +
      '<ol class="planner__stages">' + stages + '</ol>' +

      '<h4 style="margin:1.5rem 0 .6rem">Indicative cost</h4>' +
      '<table class="planner__costs">' +
        '<tr><th scope="row">Booking fee</th><td>' + money(P.bookingFee.amount) + '</td></tr>' +
        '<tr><th scope="row">Workshop component <span class="muted">(' + r.band.range + ')</span></th>' +
          '<td>' + money(r.band.amount) + '</td></tr>' +
        (printed
          ? '<tr><th scope="row">Printed resources <span class="muted">(' +
              money(P.printing.amount) + ' × ' + students + ')</span></th><td>' +
              money(r.printing) + '</td></tr>'
          : '<tr><th scope="row">Printed resources</th><td class="muted">not required</td></tr>') +
        '<tr class="planner__total"><th scope="row">Estimated total</th><td>' + money(r.total) + '</td></tr>' +
      '</table>' +
      (r.belowFloor
        ? '<p class="small muted" style="margin-top:.75rem">A minimum of ' + money(r.total) +
          ' applies for ' + (delivery === 'online' ? 'online' : 'in-person') + ' delivery.</p>'
        : '') +

      '<p class="small muted" style="margin-top:1rem">' +
        'An estimate based on current pricing, not a quote. Splitting the workshop across ' +
        'sessions doesn\'t change the cost. We\'ll confirm everything in writing before anything is booked.' +
      '</p>';
  }

  function current() {
    var mins = parseInt(document.getElementById('plan-minutes').value, 10);
    var studs = parseInt(document.getElementById('plan-students').value, 10);
    mins = Math.min(180, Math.max(20, isNaN(mins) ? 60 : mins));
    studs = Math.min(150, Math.max(1, isNaN(studs) ? 50 : studs));
    var delivery = (document.querySelector('input[name="plan-delivery"]:checked') || {}).value || 'in-person';
    var printed = document.getElementById('plan-printed').checked;
    return { mins: mins, studs: studs, delivery: delivery, printed: printed };
  }

  function update() {
    var c = current();
    render(plan(c.mins, c.studs, c.delivery, c.printed), c.delivery, c.printed, c.studs);
  }

  /* Drop the plan into the enquiry message so it reaches us with the enquiry. */
  function addToEnquiry() {
    var c = current();
    var r = plan(c.mins, c.studs, c.delivery, c.printed);
    var box = document.getElementById('message');
    if (!box) return;
    var text =
      'Session plan from the planner:\n' +
      '• ' + c.studs + ' students, ' + (c.delivery === 'online' ? 'online' : 'in person') + '\n' +
      '• ' + r.sessions + ' session' + (r.sessions === 1 ? '' : 's') +
        ' of up to ' + c.mins + ' minutes\n' +
      '• Printed resources: ' + (c.printed ? 'yes' : 'no') + '\n' +
      '• Indicative total: ' + money(r.total) + '\n';
    box.value = box.value ? box.value.replace(/\s*$/, '\n\n') + text : text;
    box.focus();
    box.setSelectionRange(box.value.length, box.value.length);
    var note = document.getElementById('planner-added');
    if (note) {
      note.textContent = 'Added to your message below.';
      window.setTimeout(function () { note.textContent = ''; }, 4000);
    }
  }

  function init() {
    if (!document.getElementById('planner-result')) return;
    ['plan-minutes', 'plan-students', 'plan-printed'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.addEventListener('input', update); el.addEventListener('change', update); }
    });
    document.querySelectorAll('input[name="plan-delivery"]').forEach(function (el) {
      el.addEventListener('change', function () {
        // printing is the norm in person, optional online
        document.getElementById('plan-printed').checked = (el.value !== 'online');
        update();
      });
    });
    var btn = document.getElementById('plan-add');
    if (btn) btn.addEventListener('click', addToEnquiry);
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
