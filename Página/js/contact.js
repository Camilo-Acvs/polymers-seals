/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS
   Formulario de contacto — FormSubmit
   ══════════════════════════════════════
   Usa window.FORM_CONFIG (js/form-config.js). El visitante pulsa
   "Enviar" y el mensaje llega al correo configurado, sin abrir nada y
   sin backend. Para cambiar el correo destino, ver js/form-config.js.
*/
(function () {
  var cfg = window.FORM_CONFIG || {};

  var form = document.getElementById('contactForm');
  if (!form) return;
  var submitBtn  = document.getElementById('cfSubmit');
  var successMsg = document.getElementById('cfSuccess');
  var errorMsg   = document.getElementById('cfError');

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var en = document.documentElement.lang === 'en';

    var prodSel  = document.getElementById('cfProducto');
    var producto = prodSel && prodSel.value ? prodSel.options[prodSel.selectedIndex].text : '';

    var btnText  = submitBtn.querySelector('.cf-submit-text');
    var origText = btnText ? btnText.textContent : '';
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = en ? 'Sending...' : 'Enviando...';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    var payload = {
      _subject:  cfg.subject || 'Nuevo mensaje desde la web',
      _template: 'table',
      _captcha:  'false',
      _replyto:  val('cfEmail'),
      'Nombre':   val('cfNombre'),
      'Empresa':  val('cfEmpresa'),
      'Correo':   val('cfEmail'),
      'Teléfono': val('cfTelefono') || '—',
      'Producto': producto || '—',
      'Mensaje':  val('cfMensaje'),
    };

    function finish(ok) {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = origText || (en ? 'Send Request' : 'Enviar Solicitud');
      (ok ? successMsg : errorMsg).style.display = 'flex';
      if (ok) form.reset();
    }

    // Si aún no se ha puesto el correo destino, avisar en lugar de fallar en silencio.
    if (!cfg.email || cfg.email.indexOf('REEMPLAZAR') === 0) {
      console.warn('FormSubmit sin configurar: edite js/form-config.js con el correo destino.');
      finish(false);
      return;
    }

    fetch('https://formsubmit.co/ajax/' + encodeURIComponent(cfg.email), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) { finish(String(data.success) === 'true'); })
      .catch(function (err) { console.error('FormSubmit error:', err); finish(false); });
  });
})();
