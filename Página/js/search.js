/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS
   Buscador de productos tolerante a errores (fuzzy)
   Sin dependencias. Funciona igual en ES y EN
   porque indexa el texto visible de cada tarjeta.
   ══════════════════════════════════════ */
(function () {
  const input = document.getElementById('productSearch');
  if (!input) return;

  const clearBtn = document.getElementById('searchClear');
  const meta = document.getElementById('searchMeta');
  const noResults = document.getElementById('searchNoResults');
  const sections = Array.from(document.querySelectorAll('.product-section'));
  const cards = Array.from(document.querySelectorAll('.product-card'));
  const isEN = document.documentElement.lang === 'en';

  // ── Normalización: minúsculas + sin acentos ──
  const norm = (s) => (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[®™]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Índice: texto + palabras únicas por tarjeta
  const index = cards.map((card) => {
    const name = card.querySelector('.pc-name')?.textContent || '';
    const desc = card.querySelector('.pc-desc')?.textContent || '';
    const mats = Array.from(card.querySelectorAll('.pc-materials span'))
      .map((s) => s.textContent).join(' ');
    const hay = norm(name + ' ' + desc + ' ' + mats);
    const words = Array.from(new Set(hay.split(/[^a-z0-9]+/).filter((w) => w.length > 1)));
    return { card, hay, words };
  });

  // ── Distancia de Levenshtein con tope ──
  function lev(a, b, max) {
    const al = a.length, bl = b.length;
    if (Math.abs(al - bl) > max) return max + 1;
    let prev = Array.from({ length: bl + 1 }, (_, i) => i);
    let curr = new Array(bl + 1);
    for (let i = 1; i <= al; i++) {
      curr[0] = i;
      let rowMin = curr[0];
      for (let j = 1; j <= bl; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
        if (curr[j] < rowMin) rowMin = curr[j];
      }
      if (rowMin > max) return max + 1; // poda temprana
      [prev, curr] = [curr, prev];
    }
    return prev[bl];
  }

  // ¿El término coincide con la tarjeta? (substring o typo cercano)
  function termMatches(term, item) {
    if (item.hay.includes(term)) return true;     // exacto / substring
    if (term.length < 3) return false;             // muy corto para fuzzy
    const max = term.length <= 5 ? 1 : 2;          // tolerancia por longitud
    for (const w of item.words) {
      if (w.includes(term) || term.includes(w)) return true;
      if (lev(term, w, max) <= max) return true;   // typo
    }
    return false;
  }

  function run(query) {
    const q = norm(query);
    clearBtn.classList.toggle('show', q.length > 0);

    if (!q) {
      cards.forEach((c) => c.classList.remove('is-hidden'));
      sections.forEach((s) => s.classList.remove('is-hidden'));
      noResults.classList.remove('show');
      meta.innerHTML = '';
      return;
    }

    const terms = q.split(' ').filter(Boolean);
    let visible = 0;
    index.forEach((item) => {
      const ok = terms.every((t) => termMatches(t, item));
      item.card.classList.toggle('is-hidden', !ok);
      if (ok) visible++;
    });

    // Ocultar secciones sin resultados visibles
    sections.forEach((sec) => {
      const any = sec.querySelectorAll('.product-card:not(.is-hidden)').length > 0;
      sec.classList.toggle('is-hidden', !any);
    });

    noResults.classList.toggle('show', visible === 0);
    if (visible === 0) {
      meta.innerHTML = '';
    } else {
      const label = isEN
        ? `<strong>${visible}</strong> result${visible === 1 ? '' : 's'}`
        : `<strong>${visible}</strong> resultado${visible === 1 ? '' : 's'}`;
      meta.innerHTML = label;
    }
  }

  let timer = 0;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => run(input.value), 80);
  });
  clearBtn.addEventListener('click', () => {
    input.value = '';
    run('');
    input.focus();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) { input.value = ''; run(''); }
  });
})();
