// ==========================================================================
// NPILRK Portfolio — Interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile hamburger nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is tapped (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- Scroll reveal (fade + slide up) ---------- */
  const fadeEls = document.querySelectorAll('.fade-section');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  fadeEls.forEach(el => revealObserver.observe(el));

  /* ---------- Navbar background on scroll ---------- */
  const navbar = document.getElementById('navbar');

  function updateNavbarState() {
    if (window.scrollY > 24) {
      navbar.style.background = 'rgba(11, 11, 26, 0.55)';
      navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.35)';
    } else {
      navbar.style.background = '';
      navbar.style.boxShadow = '';
    }
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    updateNavbarState();
    updateBackToTop();
  }, { passive: true });

  updateNavbarState();
  updateBackToTop();

  /* ---------- Contact form (front-end only demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = 'Please fill in all fields before sending.';
      formStatus.style.color = '#f87171';
      return;
    }

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulated send — replace with a real endpoint when ready.
    setTimeout(() => {
      formStatus.textContent = 'Thanks for reaching out! I\'ll get back to you soon.';
      formStatus.style.color = '#7dd3fc';
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 900);
  });

});
