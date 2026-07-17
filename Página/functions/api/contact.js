/* ══════════════════════════════════════════════════════════════
   POLYMERS SEALS SOLUTIONS — Cloudflare Pages Function
   Recibe el formulario de contacto y lo envía por Resend.
   ══════════════════════════════════════════════════════════════

   CÓMO ACTIVARLO (una sola vez):
   1. Crear cuenta en https://resend.com
   2. Domains → Add Domain → polymers-seals.com → agregar los registros
      DNS (SPF/DKIM) que indique Resend en el DNS de Cloudflare del dominio.
   3. API Keys → crear una → copiarla.
   4. En el dashboard de Cloudflare Pages de este proyecto:
      Settings → Environment variables → agregar RESEND_API_KEY (Encrypt) = esa clave.
   5. Volver a publicar. Listo, sin tocar más código.
   ────────────────────────────────────────────────────────────── */

const FROM = 'Polymers Seals Solutions <contacto@polymers-seals.com>';
const TO = 'info@polymers-seals.com';
const SUBJECT_PREFIX = 'Nuevo mensaje desde Polymers-Seals.com';

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json({ success: false, error: 'invalid_body' }, 400);
  }

  // Honeypot: si el campo oculto viene lleno, es un bot — respondemos éxito sin enviar nada.
  if ((data.honey || '').trim()) {
    return json({ success: true });
  }

  const name    = (data.name || '').trim();
  const email   = (data.email || '').trim();
  const message = (data.message || '').trim();
  const company = (data.company || '').trim();
  const phone   = (data.phone || '').trim();
  const product = (data.product || '').trim();

  if (!name || !email || !message) {
    return json({ success: false, error: 'missing_fields' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ success: false, error: 'not_configured' }, 500);
  }

  const rows = [
    ['Nombre', name],
    ['Empresa', company || '—'],
    ['Correo', email],
    ['Teléfono', phone || '—'],
  ];
  if (product) rows.push(['Producto', product]);
  rows.push(['Mensaje', message.replace(/\n/g, '<br>')]);

  const html = `<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${k === 'Mensaje' ? v : escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `${SUBJECT_PREFIX} — ${name}`,
      html,
    }),
  });

  if (!resp.ok) {
    return json({ success: false, error: 'send_failed' }, 502);
  }

  return json({ success: true });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
