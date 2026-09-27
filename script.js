/* =========================================================
   AVENUE MEDICAL — DEMO SCRIPT
   Navigation • Reveal • Counters • Parallax •
   Specialty Preview • Journey • Technology •
   Doctor Reveal • Appointment Form • Back To Top
   ========================================================= */

(function () {
  'use strict';

  /* ========================================================
     1. MOTION PREFERENCE
     ======================================================== */

  var reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  /* ========================================================
     2. HEADER — HIDE ON SCROLL
     ======================================================== */

  var header = document.getElementById('siteHeader');
  var lastScroll = window.scrollY;

  if (header) {
    window.addEventListener(
      'scroll',
      function () {
        var current = window.scrollY;

        if (current > 140 && current > lastScroll) {
          header.classList.add('hide');
        } else {
          header.classList.remove('hide');
        }

        lastScroll = current;
      },
      { passive: true }
    );
  }


  /* ========================================================
     3. MOBILE MENU
     ======================================================== */

  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen =
        menuToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  document.querySelectorAll('[data-nav]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });


  /* ========================================================
     4. ACTIVE NAVIGATION
     ======================================================== */

  var navLinks = document.querySelectorAll(
    '.primary-nav a[data-nav]'
  );

  var sections = Array.prototype.slice
    .call(navLinks)
    .map(function (link) {
      return document.querySelector(
        link.getAttribute('href')
      );
    })
    .filter(Boolean);

  function setActiveNav() {
    if (!sections.length) return;

    var position =
      window.scrollY + window.innerHeight * 0.3;

    var activeIndex = 0;

    sections.forEach(function (section, index) {
      if (section.offsetTop <= position) {
        activeIndex = index;
      }
    });

    navLinks.forEach(function (link, index) {
      link.classList.toggle(
        'active',
        index === activeIndex
      );
    });
  }

  window.addEventListener(
    'scroll',
    setActiveNav,
    { passive: true }
  );

  setActiveNav();


  /* ========================================================
     5. SCROLL REVEAL
     ======================================================== */

  var revealTargets = document.querySelectorAll(
    '.section-head, ' +
    '.trust-item, ' +
    '.specialty-row, ' +
    '.journey-step, ' +
    '.technology-copy, ' +
    '.technology-visual, ' +
    '.insight, ' +
    '.appointment-copy, ' +
    '.appointment-form'
  );

  revealTargets.forEach(function (element) {
    element.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {

          if (entry.isIntersecting) {
            entry.target.classList.add('in');

            revealObserver.unobserve(
              entry.target
            );
          }

        });
      },
      {
        threshold: 0.15
      }
    );

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });

  } else {

    revealTargets.forEach(function (element) {
      element.classList.add('in');
    });

  }


  /* ========================================================
     6. ANIMATED COUNTERS
     ======================================================== */

  var counters = document.querySelectorAll(
    '.trust-number'
  );

  function animateCounter(element) {

    var target = parseInt(
      element.getAttribute('data-count'),
      10
    );

    var suffix =
      element.getAttribute('data-suffix') || '';

    if (isNaN(target)) return;

    if (reduceMotion) {
      element.textContent =
        target + suffix;

      return;
    }

    var duration = 1100;
    var start = null;

    function step(timestamp) {

      if (!start) {
        start = timestamp;
      }

      var progress = Math.min(
        (timestamp - start) / duration,
        1
      );

      var eased =
        1 - Math.pow(1 - progress, 3);

      element.textContent =
        Math.round(eased * target) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {

    var counterObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              animateCounter(entry.target);

              counterObserver.unobserve(
                entry.target
              );
            }

          });
        },
        {
          threshold: 0.6
        }
      );

    counters.forEach(function (element) {
      counterObserver.observe(element);
    });

  } else {

    counters.forEach(animateCounter);

  }


  /* ========================================================
     7. HERO 3D PARALLAX
     ======================================================== */

  var visualFrame =
    document.getElementById('visualFrame');

  var heroVisual =
    document.getElementById('heroVisual');

  if (
    visualFrame &&
    heroVisual &&
    !reduceMotion &&
    window.matchMedia('(pointer: fine)').matches
  ) {

    heroVisual.addEventListener(
      'mousemove',
      function (event) {

        var rect =
          heroVisual.getBoundingClientRect();

        var x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        var y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;

        visualFrame.style.transform =
          'rotateY(' +
          (x * 14 - 6) +
          'deg) rotateX(' +
          (-y * 10 + 2) +
          'deg)';
      }
    );

    heroVisual.addEventListener(
      'mouseleave',
      function () {

        visualFrame.style.transform =
          'rotateY(-6deg) rotateX(2deg)';
      }
    );
  }


  /* ========================================================
     8. SPECIALTY HOVER PREVIEW
     ======================================================== */

  var specialtyIndex =
    document.getElementById('specialtyIndex');

  var preview =
    document.getElementById('specialtyPreview');

  var previewIcons = {

    cardiology:
      'M12 21s-7-4.6-9.5-9.1C.7 8.7 2 5 5.4 5c2 0 3.3 1.2 4.1 2.4C10.3 6.2 11.6 5 13.6 5 17 5 18.3 8.7 16.5 11.9 14 16.4 12 21 12 21z',

    neurology:
      'M12 2a4 4 0 014 4c0 1-1 2-1 3s2 1 2 3a3 3 0 01-3 3c0 2 0 5-2 7-2-2-2-5-2-7a3 3 0 01-3-3c0-2 2-2 2-3s-1-2-1-3a4 4 0 014-4z',

    orthopaedics:
      'M6 6l3 3-1.5 1.5L4.5 7.5 3 9l6 6 1.5-1.5L9 12l1.5-1.5L15 15l-1.5 1.5L15 18l1.5-1.5 1.5 1.5 3-3-1.5-1.5L21 13.5 15 7.5 13.5 9 10.5 6 12 4.5 9 1.5 6 4.5z',

    oncology:
      'M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9',

    gastroenterology:
      'M8 3c-3 2-4 5-4 8a8 8 0 0016 0c0-2-1-3-2-3s-1 2-3 2-2-4-5-4-2 3-4 3-1-3 2-6z',

    'womens-health':
      'M12 3a5 5 0 015 5c0 3-2 5-4 6v3h2v2h-2v2h-2v-2H9v-2h2v-3c-2-1-4-3-4-6a5 5 0 015-5z'
  };

  if (specialtyIndex && preview) {

    var rows =
      specialtyIndex.querySelectorAll(
        '.specialty-row'
      );

    rows.forEach(function (row) {

      var key =
        row.getAttribute('data-img');

      row.addEventListener(
        'mouseenter',
        function () {

          preview.innerHTML =
            '<svg viewBox="0 0 24 24" ' +
            'fill="none" ' +
            'stroke="var(--charcoal)" ' +
            'stroke-width="0.8">' +
            '<path d="' +
            (previewIcons[key] || '') +
            '"/>' +
            '</svg>';

          preview.classList.add('visible');
        }
      );

      row.addEventListener(
        'mousemove',
        function (event) {

          var offsetX = 28;
          var offsetY = -100;

          var px =
            event.clientX + offsetX;

          var py =
            event.clientY + offsetY;

          var maxX =
            window.innerWidth - 300;

          px = Math.min(px, maxX);

          preview.style.left =
            px + 'px';

          preview.style.top =
            py + 'px';
        }
      );

      row.addEventListener(
        'mouseleave',
        function () {

          preview.classList.remove(
            'visible'
          );
        }
      );

      var trigger =
        row.querySelector(
          '.specialty-trigger'
        );

      if (trigger) {

        trigger.addEventListener(
          'focus',
          function () {

            row.dispatchEvent(
              new Event('mouseenter')
            );
          }
        );

        trigger.addEventListener(
          'blur',
          function () {

            row.dispatchEvent(
              new Event('mouseleave')
            );
          }
        );
      }
    });
  }


  /* ========================================================
     9. PATIENT JOURNEY PROGRESS
     ======================================================== */

  var journeyLine =
    document.getElementById('journeyLine');

  var journeyFill =
    document.getElementById('journeyFill');

  function updateJourney() {

    if (!journeyLine || !journeyFill) {
      return;
    }

    var rect =
      journeyLine.getBoundingClientRect();

    var winH =
      window.innerHeight;

    var total =
      rect.height + winH * 0.5;

    var progressed =
      winH * 0.8 - rect.top;

    var percentage =
      Math.max(
        0,
        Math.min(
          1,
          progressed / total
        )
      );

    journeyFill.style.width =
      percentage * 100 + '%';
  }

  window.addEventListener(
    'scroll',
    updateJourney,
    { passive: true }
  );

  updateJourney();


  /* ========================================================
     10. TECHNOLOGY SVG DOT GRID
     ======================================================== */

  var techGrid =
    document.getElementById('techGrid');

  if (techGrid) {

    var svgNamespace =
      'http://www.w3.org/2000/svg';

    for (var i = 0; i < 8; i++) {

      for (var j = 0; j < 8; j++) {

        var dot =
          document.createElementNS(
            svgNamespace,
            'circle'
          );

        dot.setAttribute(
          'cx',
          40 + i * 32
        );

        dot.setAttribute(
          'cy',
          40 + j * 32
        );

        dot.setAttribute(
          'r',
          (i + j) % 5 === 0
            ? 2.4
            : 1.1
        );

        dot.setAttribute(
          'fill',
          (i + j) % 7 === 0
            ? 'var(--accent)'
            : 'var(--stone)'
        );

        dot.setAttribute(
          'opacity',
          (i + j) % 7 === 0
            ? '0.8'
            : '0.3'
        );

        techGrid.appendChild(dot);
      }
    }
  }


  /* ========================================================
     11. MAGNETIC BUTTONS
     ======================================================== */

  if (
    !reduceMotion &&
    window.matchMedia('(pointer: fine)').matches
  ) {

    document
      .querySelectorAll('.btn-primary')
      .forEach(function (button) {

        button.addEventListener(
          'mousemove',
          function (event) {

            var rect =
              button.getBoundingClientRect();

            var x =
              event.clientX -
              rect.left -
              rect.width / 2;

            var y =
              event.clientY -
              rect.top -
              rect.height / 2;

            button.style.transform =
              'translate(' +
              x * 0.18 +
              'px,' +
              y * 0.35 +
              'px)';
          }
        );

        button.addEventListener(
          'mouseleave',
          function () {

            button.style.transform =
              'translate(0, 0)';
          }
        );
      });
  }


  /* ========================================================
     12. DOCTOR IMAGE REVEAL
     ======================================================== */

  var doctorCards =
    document.querySelectorAll(
      '.doctor-card'
    );

  if (
    doctorCards.length &&
    'IntersectionObserver' in window
  ) {

    var doctorObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'doctor-visible'
              );

              doctorObserver.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.2
        }
      );

    doctorCards.forEach(function (card) {
      doctorObserver.observe(card);
    });

  } else {

    doctorCards.forEach(function (card) {
      card.classList.add('doctor-visible');
    });

  }


  /* ========================================================
     13. APPOINTMENT FORM
     ======================================================== */

  var form =
    document.getElementById(
      'appointmentForm'
    );

  var successPanel =
    document.getElementById(
      'appointmentSuccess'
    );

  var resetBtn =
    document.getElementById(
      'resetForm'
    );


  var validators = {

    name: function (value) {
      return value.trim().length >= 2;
    },

    phone: function (value) {
      return /^[0-9+\-()\s]{7,20}$/.test(
        value.trim()
      );
    },

    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        value.trim()
      );
    },

    specialty: function (value) {
      return value.trim().length > 0;
    },

    date: function (value) {
      return value.trim().length > 0;
    },

    time: function (value) {
      return value.trim().length > 0;
    }
  };


  var messages = {

    name:
      'Please enter your full name.',

    phone:
      'Enter a valid phone number.',

    email:
      'Enter a valid email address.',

    specialty:
      'Please select a specialty.',

    date:
      'Please choose a preferred date.',

    time:
      'Please choose a preferred time.'
  };


  function validateField(field) {

    var name = field.name;

    var errorElement =
      document.getElementById(
        'err-' + name
      );

    var valid =
      validators[name]
        ? validators[name](field.value)
        : true;

    field.classList.toggle(
      'invalid',
      !valid
    );

    if (errorElement) {

      errorElement.textContent =
        valid
          ? ''
          : messages[name];
    }

    return valid;
  }


  if (form) {

    Array.prototype.forEach.call(
      form.elements,
      function (field) {

        if (!field.name) return;

        field.addEventListener(
          'blur',
          function () {
            validateField(field);
          }
        );
      }
    );


    form.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();

        var allValid = true;

        Array.prototype.forEach.call(
          form.elements,
          function (field) {

            if (!field.name) return;

            if (!validateField(field)) {
              allValid = false;
            }
          }
        );


        if (!allValid) {

          var firstInvalid =
            form.querySelector(
              '.invalid'
            );

          if (firstInvalid) {
            firstInvalid.focus();
          }

          return;
        }


        form.hidden = true;

        if (successPanel) {

          successPanel.hidden = false;

          successPanel.setAttribute(
            'tabindex',
            '-1'
          );

          successPanel.focus();
        }
      }
    );
  }


  /* ========================================================
     14. RESET APPOINTMENT FORM
     ======================================================== */

  if (resetBtn) {

    resetBtn.addEventListener(
      'click',
      function () {

        if (!form || !successPanel) {
          return;
        }

        form.reset();

        Array.prototype.forEach.call(
          form.elements,
          function (field) {

            field.classList.remove(
              'invalid'
            );
          }
        );

        document
          .querySelectorAll(
            '.field-error'
          )
          .forEach(function (element) {

            element.textContent = '';
          });

        successPanel.hidden = true;

        form.hidden = false;

        form.scrollIntoView({
          behavior: reduceMotion
            ? 'auto'
            : 'smooth',
          block: 'center'
        });
      }
    );
  }


  /* ========================================================
     15. BACK TO TOP
     ======================================================== */

  var backToTop =
    document.getElementById(
      'backToTop'
    );

  if (backToTop) {

    window.addEventListener(
      'scroll',
      function () {

        backToTop.classList.toggle(
          'visible',
          window.scrollY > 700
        );

      },
      { passive: true }
    );


    backToTop.addEventListener(
      'click',
      function () {

        window.scrollTo({
          top: 0,
          behavior: reduceMotion
            ? 'auto'
            : 'smooth'
        });

      }
    );
  }


  /* ========================================================
     16. INITIALIZE
     ======================================================== */

  document.documentElement.classList.add(
    'js-ready'
  );

})();