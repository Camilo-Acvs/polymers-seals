/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS
   Main JavaScript
   ══════════════════════════════════════ */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});
// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 880 && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ── FADE IN ON SCROLL ──
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => observer.observe(el));

// ── LANGUAGE (URL-based: español en / · inglés en /en/) ──
// Cada idioma es una página real e indexable. El botón ES/EN navega
// a la versión correspondiente (mejor para SEO internacional que el swap JS).
const isEN = location.pathname.replace(/\\/g, '/').toLowerCase().includes('/en/');

function setLang(lang) {
  let page = location.pathname.split('/').pop();
  if (!page) page = 'index.html';
  if (lang === 'en' && !isEN) {
    window.location.href = 'en/' + page;
  } else if (lang === 'es' && isEN) {
    window.location.href = '../' + page;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = isEN ? 'en' : 'es';
  document.querySelectorAll('.lang-btn, .footer-lang-btn').forEach(btn => {
    const t = btn.textContent.trim().toLowerCase();
    btn.classList.toggle('active', (t === 'en') === isEN);
  });
});

// ── CONTACT WIDGET ──
const contactWidget = document.getElementById('contactWidget');

function toggleWidget() {
  contactWidget.classList.toggle('open');
}

function submitWidget(e) {
  e.preventDefault();
  var form = e.target;
  var en = document.documentElement.lang === 'en';

  var nombre  = form.querySelector('input[type="text"]').value.trim();
  var correo  = form.querySelector('input[type="email"]').value.trim();
  var mensaje = form.querySelector('textarea').value.trim();

  var btn  = form.querySelector('.widget-submit');
  var orig = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = en ? 'Sending...' : 'Enviando...'; }

  function restore(text) {
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = text;
    setTimeout(function () { btn.textContent = orig; }, 3000);
  }

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nombre, email: correo, message: mensaje })
  })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.success === true) { form.reset(); restore(en ? 'Sent ✓' : 'Enviado ✓'); }
      else { restore(en ? 'Error, try again' : 'Error, reintenta'); }
    })
    .catch(function () { restore(en ? 'Error, try again' : 'Error, reintenta'); });
}

// Close widget on click outside
document.addEventListener('click', (e) => {
  if (contactWidget.classList.contains('open')) {
    if (!e.target.closest('.contact-widget') && !e.target.closest('.fab-contact')) {
      contactWidget.classList.remove('open');
    }
  }
});

// ── ACTIVE NAV LINK ──
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPath);
});
