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
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
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

// ── LANGUAGE TOGGLE ──
let currentLang = localStorage.getItem('pss-lang') || 'es';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('pss-lang', lang);
  applyLang();
}

function applyLang() {
  const elements = document.querySelectorAll('[data-es][data-en]');
  elements.forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) el.textContent = text;
  });
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === currentLang);
  });
  // Update html lang attr
  document.documentElement.lang = currentLang;
}

// Apply on load
document.addEventListener('DOMContentLoaded', applyLang);

// ── CONTACT WIDGET ──
const contactWidget = document.getElementById('contactWidget');

function toggleWidget() {
  contactWidget.classList.toggle('open');
}

function submitWidget(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  const mailtoLink = `mailto:info@polymers-seals.com?subject=Consulta rápida de ${name}&body=Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${message}`;
  window.location.href = mailtoLink;

  // Reset
  form.reset();
  toggleWidget();
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
