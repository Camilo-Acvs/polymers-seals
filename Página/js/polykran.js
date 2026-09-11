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
    }, { threshold: 0.1, rootMargin: '0px 0px -14% 0px' });
    risers.forEach(function (el) { io.observe(el); });
  }

  /* ── 3. Franja de productos: loop continuo + arrastre con dedo/mouse ── */
  document.querySelectorAll('.pk2-dock').forEach(function (dock) {
    var track = dock.querySelector('.pk2-track');
    if (!track) return;
    var items = [].slice.call(track.children);
    if (!items.length) return;
    // duplicar una vez para cerrar el ciclo sin salto
    items.forEach(function (it) { track.appendChild(it.cloneNode(true)); });
    // matar el arrastre nativo de imágenes/enlaces (si no, el navegador se "lleva" la imagen)
    [].forEach.call(track.querySelectorAll('a, img'), function (el) { el.setAttribute('draggable', 'false'); });
    dock.addEventListener('dragstart', function (e) { e.preventDefault(); });

    if (reduce) {
      var r = dock.querySelector('.pk2-row');
      if (r) { r.style.overflowX = 'auto'; r.style.webkitMaskImage = 'none'; r.style.maskImage = 'none'; }
      return;
    }

    var half = 0;
    var secs = Math.max(50, items.length * 3); // segundos por vuelta (~20% más lento que antes)
    var offset = 0, vel = 0;
    var dragging = false, hovering = false, startX = 0, startOffset = 0, lastX = 0, lastT = 0, moved = 0;

    function measure() { var w = track.scrollWidth / 2; if (w > 20) half = w; }

    function frame() {
      requestAnimationFrame(frame);
      if (half < 20) { measure(); return; }
      var speed = half / (secs * 60);
      if (!dragging) {
        if (!hovering) offset -= speed;
        if (Math.abs(vel) > 0.05) { offset += vel; vel *= 0.9; } else { vel = 0; }
      }
      while (offset <= -half) offset += half;
      while (offset > 0) offset -= half;
      track.style.transform = 'translate3d(' + offset.toFixed(2) + 'px,0,0)';
    }

    dock.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault(); // evita el drag nativo y la selección
      dragging = true; moved = 0; vel = 0;
      startX = lastX = e.clientX; startOffset = offset; lastT = e.timeStamp;
      dock.classList.add('is-dragging');
      try { dock.setPointerCapture(e.pointerId); } catch (_) {}
    });
    dock.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > moved) moved = Math.abs(dx);
      offset = startOffset + dx;
      var dt = e.timeStamp - lastT;
      if (dt > 0) {
        var v = (e.clientX - lastX) / dt * 16;
        vel = Math.max(-46, Math.min(46, v));
      }
      lastX = e.clientX; lastT = e.timeStamp;
    });
    function end(e) {
      if (!dragging) return;
      dragging = false;
      dock.classList.remove('is-dragging');
      try { dock.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    dock.addEventListener('pointerup', end);
    dock.addEventListener('pointercancel', end);
    // si hubo arrastre, no dispares el enlace del chip
    dock.addEventListener('click', function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
      moved = 0;
    }, true);
    dock.addEventListener('mouseenter', function () { hovering = true; });
    dock.addEventListener('mouseleave', function () { hovering = false; });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    setTimeout(measure, 500);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(measure); }

    requestAnimationFrame(frame);
  });

  /* ── 4. Proceso interactivo: paneles + detalle sincronizado ── */
  document.querySelectorAll('.pk2-flow').forEach(function (flow) {
    var panels = [].slice.call(flow.querySelectorAll('.pk2-flow-panel'));
    var out = flow.querySelector('.pk2-flow-detail-text');
    if (!panels.length || !out) return;

    function activate(panel) {
      panels.forEach(function (p) {
        var on = p === panel;
        p.classList.toggle('is-active', on);
        p.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var title = panel.getAttribute('data-title') || '';
      var text = panel.getAttribute('data-text') || '';
      out.innerHTML = (title ? '<strong>' + title + '.</strong> ' : '') + text;
    }

    panels.forEach(function (p) {
      p.addEventListener('mouseenter', function () { activate(p); });
      p.addEventListener('focus', function () { activate(p); });
      p.addEventListener('click', function () { activate(p); });
    });
  });
})();
