/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS
   Formulario de contacto — Cloudflare Pages Function + Resend
   ══════════════════════════════════════
   Envía un POST a /api/contact (functions/api/contact.js), que reenvía
   el correo vía Resend con el dominio verificado. Ver ese archivo para
   la configuración de RESEND_API_KEY.
*/
(function () {
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

    if (val('cfHoney')) return; // honeypot: descartar en silencio

    var prodSel  = document.getElementById('cfProducto');
    var producto = prodSel && prodSel.value ? prodSel.options[prodSel.selectedIndex].text : '';

    var btnText  = submitBtn.querySelector('.cf-submit-text');
    var origText = btnText ? btnText.textContent : '';
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = en ? 'Sending...' : 'Enviando...';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    var payload = {
      name:    val('cfNombre'),
      company: val('cfEmpresa'),
      email:   val('cfEmail'),
      phone:   val('cfTelefono'),
      product: producto,
      message: val('cfMensaje'),
    };

    function finish(ok) {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = origText || (en ? 'Send Request' : 'Enviar Solicitud');
      (ok ? successMsg : errorMsg).style.display = 'flex';
      if (ok) form.reset();
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) { finish(data.success === true); })
      .catch(function (err) { console.error('Contact form error:', err); finish(false); });
  });
})();
