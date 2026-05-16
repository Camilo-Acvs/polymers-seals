/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS
   Contact Form — EmailJS Integration
   ══════════════════════════════════════
   
   SETUP INSTRUCTIONS:
   1. Create a free account at https://www.emailjs.com
   2. Create an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template with these variables:
      {{from_name}}, {{from_email}}, {{company}},
      {{phone}}, {{product}}, {{message}}
   4. Replace the three placeholders below with your IDs
*/

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // From EmailJS Account > API Keys
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // From EmailJS Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // From EmailJS Email Templates

// Load EmailJS
(function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  document.head.appendChild(script);
})();

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('cfSubmit');
const successMsg = document.getElementById('cfSuccess');
const errorMsg = document.getElementById('cfError');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre   = document.getElementById('cfNombre').value.trim();
    const empresa  = document.getElementById('cfEmpresa').value.trim();
    const email    = document.getElementById('cfEmail').value.trim();
    const telefono = document.getElementById('cfTelefono').value.trim();
    const producto = document.getElementById('cfProducto').value;
    const mensaje  = document.getElementById('cfMensaje').value.trim();

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.cf-submit-text').textContent =
      document.documentElement.lang === 'en' ? 'Sending...' : 'Enviando...';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    const templateParams = {
      from_name: nombre,
      from_email: email,
      company: empresa,
      phone: telefono || '—',
      product: producto || '—',
      message: mensaje,
      reply_to: email,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      successMsg.style.display = 'flex';
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      errorMsg.style.display = 'flex';
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.cf-submit-text').textContent =
        document.documentElement.lang === 'en' ? 'Send Request' : 'Enviar Solicitud';
    }
  });
}
