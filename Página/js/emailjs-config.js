/* ══════════════════════════════════════
   POLYMERS SEALS SOLUTIONS — EmailJS
   ══════════════════════════════════════
   Misma cuenta/configuración que Rubbercav (es la misma empresa).

   CÓMO ACTIVAR EL FORMULARIO (una sola vez):
   1. Crear cuenta gratis en https://www.emailjs.com
   2. Add Email Service (Gmail/Outlook) → copiar el Service ID.
   3. Email Templates → crear plantilla con estas variables:
      {{from_name}}, {{from_company}}, {{reply_to}}, {{phone}}, {{message}}
      y poner como destinatario: info@polymers-seals.com → copiar el Template ID.
   4. Account → API Keys → copiar la Public Key.
   5. Reemplazar los 3 valores de abajo. Las MISMAS claves sirven
      para este sitio y para Rubbercav (mismo emailjs-config.js).
*/
window.EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',
  serviceId:  'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
};
