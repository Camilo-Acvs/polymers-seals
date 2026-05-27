/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS
   Formulario de contacto — EmailJS
   ══════════════════════════════════════
   Usa window.EMAILJS_CONFIG (js/emailjs-config.js) — mismo método y
   mismos parámetros que Rubbercav, para que una sola cuenta sirva a ambos.
   Variables de plantilla: from_name, from_company, reply_to, phone, message
*/
(function () {
  var cfg = window.EMAILJS_CONFIG || {};

  // Cargar el SDK de EmailJS
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = function () { if (cfg.publicKey) { try { emailjs.init({ publicKey: cfg.publicKey }); } catch (e) {} } };
  document.head.appendChild(s);

  var form = document.getElementById('contactForm');
  if (!form) return;
  var submitBtn  = document.getElementById('cfSubmit');
  var successMsg = document.getElementById('cfSuccess');
  var errorMsg   = document.getElementById('cfError');

  function isConfigured() {
    return typeof emailjs !== 'undefined' &&
      cfg.publicKey && cfg.serviceId && cfg.templateId &&
      cfg.publicKey.indexOf('YOUR_') !== 0;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var en = document.documentElement.lang === 'en';

    var nombre   = document.getElementById('cfNombre').value.trim();
    var empresa  = document.getElementById('cfEmpresa').value.trim();
    var email    = document.getElementById('cfEmail').value.trim();
    var telefono = document.getElementById('cfTelefono').value.trim();
    var prodSel  = document.getElementById('cfProducto');
    var producto = prodSel && prodSel.value ? prodSel.options[prodSel.selectedIndex].text : '';
    var mensaje  = document.getElementById('cfMensaje').value.trim();

    submitBtn.disabled = true;
    submitBtn.querySelector('.cf-submit-text').textContent = en ? 'Sending...' : 'Enviando...';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    var fullMessage =
      (producto ? ((en ? 'Product/application of interest: ' : 'Producto/aplicación de interés: ') + producto + '\n\n') : '') +
      mensaje;

    var params = {
      from_name:    nombre,
      from_company: empresa,
      reply_to:     email,
      phone:        telefono || '—',
      message:      fullMessage,
    };

    function finish(ok) {
      submitBtn.disabled = false;
      submitBtn.querySelector('.cf-submit-text').textContent = en ? 'Send Request' : 'Enviar Solicitud';
      (ok ? successMsg : errorMsg).style.display = 'flex';
      if (ok) form.reset();
    }

    if (isConfigured()) {
      emailjs.send(cfg.serviceId, cfg.templateId, params)
        .then(function () { finish(true); })
        .catch(function (err) { console.error('EmailJS error:', err); finish(false); });
    } else {
      // EmailJS aún sin claves → mostrar mensaje de error que guía al correo directo
      console.warn('EmailJS no configurado: edite js/emailjs-config.js con las claves reales.');
      finish(false);
    }
  });
})();
