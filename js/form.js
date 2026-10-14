/* ==========================================================================
   MIND MATTERS — form.js
   Populates the enquiry form's option lists and handles client-side
   validation and the submitted state.

   ⚠️  CONNECTING THE FORM
   This form does not yet send anywhere. Choose one of these when ready:
     1. Set the <form> action to a form service (e.g. Formspree, Netlify Forms)
        and delete the `handleSubmit` interception below.
     2. Point it at your own backend endpoint.
   Until then, the form validates and shows a clear "not yet connected" notice
   rather than pretending an enquiry was sent.
   ========================================================================== */
(function () {
  'use strict';

  var CONFIG = window.MM && MM.form;

  /* ---- Populate select fields from js/content.js ---- */
  function fillSelect(id, options, placeholder) {
    var el = document.getElementById(id);
    if (!el || !options) return;
    el.innerHTML =
      '<option value="">' + placeholder + '</option>' +
      options.map(function (o) { return '<option value="' + o + '">' + o + '</option>'; }).join('');
  }

  function fillCheckboxes(id, options) {
    var el = document.getElementById(id);
    if (!el || !options) return;
    el.innerHTML = options.map(function (o, i) {
      var value = o.replace(/\s+/g, '-').toLowerCase();
      return '' +
        '<label class="radio-chip">' +
          '<input type="checkbox" name="year-levels" value="' + value + '" id="yl-' + i + '">' +
          '<span>' + o + '</span>' +
        '</label>';
    }).join('');
  }

  /* ---- Validation ---- */
  function fieldWrap(input) { return input.closest('.field') || input.closest('.fieldset'); }

  function showError(input, message) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.add('has-error');
    var err = wrap.querySelector('.field__error');
    if (err) err.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;

    form.querySelectorAll('[required]').forEach(function (input) {
      var value = (input.value || '').trim();
      var valid = true;
      var message = 'This field is required.';

      if (!value) {
        valid = false;
      } else if (input.type === 'email') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        if (!valid) message = 'Please enter a valid email address.';
      }

      if (valid) {
        clearError(input);
      } else {
        showError(input, message);
        ok = false;
        if (!firstBad) firstBad = input;
      }
    });

    if (firstBad) {
      firstBad.focus();
      firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return ok;
  }

  /* ---- Submit ---- */
  function handleSubmit(e) {
    var form = e.target;
    var status = document.getElementById('form-status');

    if (!validate(form)) {
      e.preventDefault();
      return;
    }

    // If a real action URL has been set, let the browser submit normally.
    if (form.getAttribute('action')) return;

    e.preventDefault();
    if (status) {
      status.className = 'form__status form__status--warn is-visible';
      status.innerHTML =
        '<strong>Form not connected yet.</strong> Your details were not sent. ' +
        'This enquiry form is ready to be connected to an email service or inbox — ' +
        'see the instructions at the top of <code>js/form.js</code>.';
      status.setAttribute('role', 'status');
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function init() {
    var form = document.getElementById('enquiry-form');
    if (!form || !CONFIG) return;

    fillSelect('role', CONFIG.roles, 'Select your role…');
    fillSelect('timeframe', CONFIG.timeframes, 'Select a timeframe…');
    fillCheckboxes('year-levels', CONFIG.yearLevels);

    form.addEventListener('submit', handleSubmit);

    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.hasAttribute('required') && (input.value || '').trim()) clearError(input);
      });
      input.addEventListener('input', function () {
        if (fieldWrap(input) && fieldWrap(input).classList.contains('has-error') && (input.value || '').trim()) {
          clearError(input);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
