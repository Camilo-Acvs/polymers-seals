/* ══════════════════════════════════════
   INICIO — reveal (.hm-rise) + rotación de miniaturas en líneas de producto
   ══════════════════════════════════════ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── reveal al entrar en viewport ── */
  var risers = document.querySelectorAll('.hm-rise');
  if (risers.length) {
    if (reduce) {
      risers.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -12% 0px' });
      risers.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── líneas de producto: la miniatura rota entre los productos de cada línea.
        Las 4 líneas cambian a la vez. ── */
  if (!reduce) {
    var sets = [].slice.call(document.querySelectorAll('.hm-line-fig[data-rotate]'))
      .map(function (fig) { return [].slice.call(fig.querySelectorAll('img')); })
      .filter(function (imgs) { return imgs.length > 1; });

    if (sets.length) {
      var count = Math.min.apply(null, sets.map(function (s) { return s.length; }));
      var i = 0;
      setInterval(function () {
        if (document.hidden) return;
        var next = (i + 1) % count;
        var from = i;
        sets.forEach(function (imgs) {
          // la nueva aparece de inmediato (opaca, encima); la anterior se desvanece por debajo
          imgs[from].classList.remove('on');
          imgs[from].classList.add('prev');
          imgs[next].classList.remove('prev');
          imgs[next].classList.add('on');
        });
        setTimeout(function () {
          sets.forEach(function (imgs) { imgs[from].classList.remove('prev'); });
        }, 500);
        i = next;
      }, 4800); // ~40% más lento que antes (3400 ms)
    }
  }
})();
