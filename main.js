/* =============================================
   POPPIES MOBILE DETAILING SERVICES
   main.js — Interactive Behaviours
   ============================================= */

(function () {
  'use strict';

  /* ---- Dynamic copyright year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header scroll behaviour ---- */
  const header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- Mobile navigation toggle ---- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  function openNav() {
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeNav(); else openNav();
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Intersection Observer – fade-in on scroll ---- */
  const fadeTargets = document.querySelectorAll(
    '.service-card, .why-us-image, .why-us-content, .gallery-item, .testimonial-card, .contact-card, .contact-form'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeTargets.forEach(function (el, i) {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Contact form handling ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple client-side validation
      const name  = form.querySelector('#name');
      const phone = form.querySelector('#phone');
      let valid = true;

      [name, phone].forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#d93025';
          valid = false;
        }
      });

      if (!valid) {
        const firstInvalid = form.querySelector('[style*="d93025"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate submission (no backend)
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        successMsg.hidden = false;
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 900);
    });

    // Live validation reset on input
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  }

})();

/* ---- CSS for fade-in animation (injected via JS to keep CSS clean) ---- */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .nav-link.active {
      color: #fff;
      background: rgba(255,255,255,.12);
    }
  `;
  document.head.appendChild(style);
})();
