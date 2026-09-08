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

    var payload = {
      name:    val('cfNombre'),
      company: val('cfEmpresa'),
      email:   val('cfEmail'),
      phone:   val('cfTelefono'),
      product: producto,
      message: val('cfMensaje'),
    };

    // Siempre mostramos la confirmación: el visitante nunca ve un error.
    // Si el backend aún no está configurado, el envío se registra en los
    // logs de Cloudflare y el visitante tiene igual WhatsApp / correo / teléfono a la vista.
    function finish() {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = origText || (en ? 'Send Request' : 'Enviar Solicitud');
      successMsg.style.display = 'flex';
      form.reset();
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function () { finish(); })
      .catch(function () { finish(); });
  });
})();
