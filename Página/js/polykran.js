/* ══════════════════════════════════════
   POLYKRAN — reveal · scrollytelling · franja
   ══════════════════════════════════════ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Reveal al entrar en viewport ── */
  var risers = document.querySelectorAll('.pk2-rise');
  if (risers.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    risers.forEach(function (el) { io.observe(el); });
  }

  /* ── 2. Scrollytelling de ventajas ── */
  var scene = document.querySelector('.pk2-scene');
  if (scene) {
    var steps = [].slice.call(scene.querySelectorAll('.pk2-step'));
    var bars = [].slice.call(scene.querySelectorAll('.pk2-scene-progress i b'));
    var desktop = window.matchMedia('(min-width: 861px)');

    function setActive(idx) {
      steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    }

    var ticking = false;
    function update() {
      ticking = false;
      var rect = scene.getBoundingClientRect();
      var span = rect.height - window.innerHeight;
      var p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      var n = steps.length;
      var idx = Math.min(n - 1, Math.floor(p * n + 0.00001));
      setActive(idx);
      bars.forEach(function (b, i) {
        var seg = Math.min(1, Math.max(0, p * n - i));
        b.style.width = (seg * 100) + '%';
      });
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    var mobileObs = null;
    function enableDesktop() {
      if (mobileObs) { mobileObs.disconnect(); mobileObs = null; }
      steps.forEach(function (s) { s.classList.remove('active'); });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    }
    function enableMobile() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mobileObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('active'); });
      }, { threshold: 0.25 });
      steps.forEach(function (s) { mobileObs.observe(s); });
    }

    function apply() { if (desktop.matches) enableDesktop(); else enableMobile(); }
    apply();
    (desktop.addEventListener ? desktop.addEventListener('change', apply) : desktop.addListener(apply));
  }

  /* ── 3. Franja de productos: duplicar para loop continuo ── */
  document.querySelectorAll('.pk2-track').forEach(function (track) {
    var items = [].slice.call(track.children);
    if (!items.length) return;
    items.forEach(function (it) { track.appendChild(it.cloneNode(true)); });
    if (!reduce) {
      track.style.setProperty('--dur', Math.max(40, items.length * 2.4) + 's');
    }
  });
})();
