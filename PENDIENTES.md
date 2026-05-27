# Pendientes — Polymers Seals Solutions

Cosas que **dependen de ti** (cuentas, claves o datos que no se pueden hacer desde el código).
Marca con [x] lo que vayas completando.

---

## 1. 🔴 Claves de EmailJS (activar el formulario de contacto)
El formulario está listo, solo faltan las claves. Edita el archivo:
**`Página/js/emailjs-config.js`** y reemplaza estos 3 valores:

```js
window.EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',   // ← pega aquí la Public Key
  serviceId:  'YOUR_SERVICE_ID',   // ← pega aquí el Service ID
  templateId: 'YOUR_TEMPLATE_ID',  // ← pega aquí el Template ID
};
```

Cómo obtenerlas (una sola vez, gratis):
1. Crear cuenta en https://www.emailjs.com
2. **Email Services** → conectar Gmail/Outlook → copiar el **Service ID**.
3. **Email Templates** → nueva plantilla con las variables `{{from_name}}`, `{{from_company}}`,
   `{{reply_to}}`, `{{phone}}`, `{{message}}` y destinatario `info@polymers-seals.com` → copiar el **Template ID**.
4. **Account → API Keys** → copiar la **Public Key**.

> Las **mismas 3 claves** sirven para este sitio y para Rubbercav (ambos usan el mismo `emailjs-config.js`).
> Nota: el formulario de Rubbercav tampoco está conectado hoy — al poner las claves, quedan activos los dos.

Cuando las tengas, pásamelas y las dejo puestas, o edítalas tú directamente en el archivo.

**Claves (pégalas aquí cuando las tengas, para no perderlas):**
- Public Key: `__________________`
- Service ID: `__________________`
- Template ID: `__________________`

---

## 2. Indexación en buscadores (lo #1 para que te encuentren)
- [ ] **Google Search Console** (search.google.com/search-console): verificar el dominio y **enviar `sitemap.xml`** (`https://polymers-seals.com/sitemap.xml`).
- [ ] **Bing Webmaster Tools** (bing.com/webmasters): verificar y enviar el sitemap (puede importar desde Search Console). Bing alimenta a varios buscadores fuera de Google.
- [ ] (Opcional) **Yandex Webmaster** para Rusia/Asia central.

## 3. Analítica
- [ ] **Cloudflare Web Analytics**: activarlo en el panel de Cloudflare Pages (1 clic, sin cookies).
  *(Indicaste que crees que ya está conectado — confírmalo entrando a Cloudflare → Analytics & Logs → Web Analytics.)*

## 4. Presencia y autoridad (descubrimiento sin buscar el nombre)
- [ ] **Google Business Profile** (perfil de empresa, Bogotá) → aparece en Maps y búsquedas locales.
- [ ] **LinkedIn de empresa** activo, enlazando al sitio.
- [ ] Alta en **directorios del sector**: Oil & Gas Online, Energy Dais, etc.
- [ ] Perfiles en **marketplaces B2B** (Alibaba, Made-in-China) donde ya están los competidores.

## 5. Certificaciones y prueba social (cuando estén disponibles)
- [ ] Logos de **certificaciones reales** (ISO 9001, API 6A/16A/Q1…) → agregar sección de confianza.
- [ ] **Logos de clientes** y/o países donde operan → prueba social.
- *(De momento no hay certificaciones; cuando estén, se agregan.)*

## 6. Contenido — siguiente salto de tráfico
- [x] Páginas individuales por producto (generadas a partir del catálogo — ver `Página/productos/`).
- [ ] **Perfeccionar los datos** de las páginas de producto (presión/temperatura/material exactos por ítem).
- [ ] **Blog técnico** (artículos tipo "NBR vs HNBR vs FKM", "cómo elegir el oil saver", etc.).
- [ ] **Fichas técnicas descargables** (PDF) por producto → captan correos como leads.

## 7. Idea futura
- [ ] **Chatbot con IA** (como Nyxel) para pre-calificar técnicamente y capturar leads 24/7 en cualquier idioma. Requiere API key de Anthropic y una función serverless en Cloudflare Workers.

---
*Última actualización: 26 de mayo de 2026.*
