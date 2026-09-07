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
    }, { threshold: 0.06, rootMargin: '0px 0px -5% 0px' });
    risers.forEach(function (el) { io.observe(el); });
  }

  /* ── 2. Scrollytelling de ventajas ── */
  var scene = document.querySelector('.pk2-scene');
  if (scene) {
    var steps = [].slice.call(scene.querySelectorAll('.pk2-step'));
    var bars = [].slice.call(scene.querySelectorAll('.pk2-scene-progress i b'));
    var sceneHead = scene.querySelector('.pk2-scene-head');
    var sticky = scene.querySelector('.pk2-scene-sticky');
    var desktop = window.matchMedia('(min-width: 861px)');
    var current = -1;

    function setActive(idx) {
      if (idx === current) return;
      current = idx;
      steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    }

    var ticking = false;
    function update() {
      ticking = false;
      var rect = scene.getBoundingClientRect();
      var headH = sceneHead ? sceneHead.offsetHeight : 0;
      var span = scene.offsetHeight - sticky.offsetHeight - headH;
      if (span <= 0) return;
      var p = Math.min(1, Math.max(0, (-rect.top - headH) / span));
      var n = steps.length;
      /* los cambios de paso ocurren en el primer 82% del recorrido;
         el resto mantiene fijo el último paso antes de soltar el sticky */
      var t = Math.min(0.999999, p / 0.82);
      setActive(Math.floor(t * n));
      bars.forEach(function (b, i) {
        b.style.width = (Math.min(1, Math.max(0, t * n - i)) * 100) + '%';
      });
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    var mobObs = null;
    function enableDesktop() {
      if (mobObs) { mobObs.disconnect(); mobObs = null; }
      steps.forEach(function (s, i) { s.classList.toggle('active', i === 0); });
      current = 0;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    }
    function enableMobile() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mobObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('active'); });
      }, { threshold: 0.12, rootMargin: '0px 0px -12% 0px' });
      steps.forEach(function (s) { mobObs.observe(s); });
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
