# Informe de Competencia, SEO y Mejoras — Polymers Seals Solutions
**Fecha:** 26 de mayo de 2026
**Objetivo:** crecer en visitantes a nivel mundial (México, USA, China, Arabia, Brasil…), que descubran la marca **sin buscar el nombre**, y subir la tasa de conversión.

---

## 0. Resumen ejecutivo

La página está bien diseñada y es rápida (HTML/CSS/JS vanilla en Cloudflare). Pero hoy es prácticamente **invisible para los buscadores fuera de quien ya conoce la marca**, por tres razones de fondo:

1. **No tenía SEO técnico** (sin Open Graph, sin datos estructurados, sin sitemap, sin canonical). → **Ya lo implementé hoy** (ver §2).
2. **El contenido en inglés solo existe en JavaScript** (botón ES/EN). Google indexa lo que ve por defecto = **español**. Para vender en USA, Arabia o China, donde el idioma técnico es el inglés, esto es el mayor freno. → Requiere crear versiones reales en inglés (ver §5.3).
3. **El formulario de contacto NO está conectado** — las claves de EmailJS son `YOUR_PUBLIC_KEY`. Hoy un cliente que llena el formulario recibe un error. → **Bloqueante de conversión #1** (ver §6.1).

El crecimiento de tráfico en este sector es real pero **lento** (3–6 meses para ver ranking, 6–12 para tráfico serio). No hay atajos mágicos: se gana con contenido técnico + autoridad + estar indexado en todos los buscadores correctos.

---

## 1. Competencia — quiénes son y qué hacen

### 1.1 Competencia directa (mismo nicho: sellos de caucho para campo petrolero)

| Empresa | País | Qué hacen bien | Web |
|---|---|---|---|
| **Global Elastomeric Products** | USA | El competidor más parecido. Catálogo con **números de parte** (ej. `E7WIRELINE1555`), tablas de especificaciones, "Get a Quote" en todas las páginas, sello ISO 9001:2015 visible, "100% Made in USA". | globaleee.com |
| **Seals Eastern** | USA | Pioneros en packer elements HT/HP de fluorocarbono. Foco en desempeño y materiales. | sealseastern.com |
| **McClain Oil Tools** | USA | 40+ años, especializados en stuffing box packing wireline/coil. Catálogo de repuestos. | mcclainoiltools.com |
| **SPT Seals / Hongyu / Sunwell / WS-Seals / JST** | China | Vee packing y empaques de aramida (Kevlar) a bajo costo. Catálogos enormes, muchísimas páginas de producto = mucho SEO de cola larga. | varias |
| **Parveen Industries** | India | Equipo de wireline + stuffing box hasta 15.000 psi. | parveenoilfield.com |

### 1.2 Gigantes (referencia de "cómo se ve lo mejor", no competencia directa)

| Empresa | Qué aprender |
|---|---|
| **Trelleborg Sealing Solutions** | Sitio dedicado `oilandgas-seals.com`, selector de aplicación, contenido técnico profundo, multilenguaje real. |
| **James Walker** | Autoridad de marca, fichas técnicas descargables, casos de aplicación subsea/land. |
| **Parker (O-Ring & Engineered Seals)** | Buscador de producto, materiales por condición de operación. |
| **SLB (Schlumberger)** | Integración con catálogo de wellhead, lenguaje de "integridad de pozo". |

### 1.3 Conclusiones de la competencia

Lo que **todos los buenos** tienen y nosotros NO (todavía):

- **Páginas individuales por producto** con specs, no solo tarjetas en una página larga. Esto es lo que les da volumen de tráfico de cola larga ("aramid vee packing 15000 psi", "oil saver rubber BJ type", etc.).
- **Certificaciones visibles** (ISO 9001, API 6A/16A/Q1) como señal de confianza.
- **"Request a Quote" / "Get a Quote"** repetido y siempre visible.
- **Fichas técnicas / catálogos descargables** (captan correos = leads).
- **Números de parte y tablas de especificaciones** indexables.
- Los chinos ganan por **volumen de páginas**; los premium ganan por **profundidad técnica y autoridad**. Nosotros debemos ir por **profundidad técnica + nicho POLYKRAN®** (diferenciación real).

---

## 2. Lo que YA implementé hoy (SEO técnico base)

Aplicado en las **5 páginas** (`index`, `productos`, `polykran`, `nosotros`, `contacto`):

- ✅ **Favicon adaptable al tema** del navegador: azul (full color) en modo claro, blanco en modo oscuro. Renombré los archivos a `favicon-fc.png` y `favicon-white.png` (sin espacios, URL-safe).
- ✅ **Open Graph + Twitter Cards** → al compartir el enlace en WhatsApp, LinkedIn, Facebook, X, aparece una tarjeta profesional.
- ✅ **Imagen de compartición** generada: `images/og-cover.jpg` (1200×630, 63 KB) con logo + tagline. Reemplazable cuando quieras un diseño propio.
- ✅ **Canonical URLs** (evita contenido duplicado).
- ✅ **Datos estructurados JSON-LD** (`Organization`, `WebSite`, `BreadcrumbList`) → habilita resultados enriquecidos y "knowledge" en Google.
- ✅ **`theme-color`** (color de marca en la barra del móvil).
- ✅ **`robots.txt`** y **`sitemap.xml`** en la raíz del sitio.
- ✅ **Títulos y descripciones optimizados** con palabras clave del sector (wireline, vee packing, oilfield seals, POLYKRAN®).

> Nota técnica: el favicon por tema usa `media="(prefers-color-scheme)"`, soportado por Chrome, Edge, Firefox y Safari actuales.

---

## 3. Diagnóstico de la página actual

### Fortalezas
- Diseño limpio, profesional, mobile-first.
- Rápida (vanilla, WebP, preload del hero).
- Buen catálogo visual de productos.
- WhatsApp directo + widget de contacto flotante.

### Debilidades (orden de impacto)
1. **Formulario sin conectar** (EmailJS placeholder) — se pierden todos los leads del formulario principal. **CRÍTICO.**
2. **Inglés solo en JS** — invisible para SEO internacional.
3. **Sin páginas de producto individuales** — poca superficie indexable.
4. **Sin certificaciones / sellos de confianza** visibles.
5. **Sin fichas técnicas descargables** (no se capturan leads "fríos").
6. **Sin blog / contenido técnico** — nada con qué rankear consultas informativas.
7. **Sin Google Business Profile ni presencia en directorios** del sector.
8. **Sin analítica** (no se puede medir nada hoy).

---

## 4. Acción URGENTE para que Google empiece a encontrarte (esta semana)

Esto no es código, es configuración — **sin esto, nada del SEO sirve porque Google ni se entera de que existes:**

1. **Google Search Console** (search.google.com/search-console): verificar el dominio y **enviar `sitemap.xml`**. Es lo #1.
2. **Bing Webmaster Tools** (bing.com/webmasters): igual. Bing alimenta también a buscadores de China y otros. Tiene importador directo desde Search Console.
3. **Google Analytics 4** o **Cloudflare Web Analytics** (gratis, sin cookies): instalar para medir visitas/conversiones.
4. **Google Business Profile**: crear el perfil de empresa (Bogotá). Aparece en Maps y en "packs locales".
5. **Yandex Webmaster** (Rusia/Asia central) y, para China, considerar **Baidu Ziyuan** (requiere ICP/servidor; ver §5.4).

---

## 5. SEO para crecer en todo el mundo

### 5.1 On-page (parcialmente hecho)
- ✅ Títulos, descripciones, canonical, structured data, OG.
- ⬜ **Una `<h1>` por página** y jerarquía H2/H3 con palabras clave (revisar que cada página tenga una sola H1).
- ⬜ **Texto alternativo descriptivo** en todas las imágenes de producto (hoy varias dicen genérico). Ej: "Oil saver rubber para wireline 2 pulgadas" en vez de "Oil & Gas Operations".
- ⬜ **Enlazado interno**: cada producto debe enlazar a su línea y a POLYKRAN®.

### 5.2 Contenido — la palanca #1 de crecimiento (la que más mueve la aguja)
La página crece **exponencialmente** solo si hay **más superficie indexable** y mejor que la de los competidores:

- **Página por producto** (no solo tarjetas). 20–30 productos = 20–30 páginas nuevas que rankean por su nombre exacto en inglés. Cada una con: descripción, materiales, rango de presión/temperatura, aplicaciones, imagen, CTA de cotización.
- **Blog técnico** (4–6 artículos para arrancar): "NBR vs HNBR vs FKM para sellos de pozo", "Cómo elegir el oil saver correcto", "Qué es la pulpa de aramida y por qué importa en sellos HP/HT", "Fallas comunes en stuffing box y cómo evitarlas". Esto captura las búsquedas de los ingenieros **antes** de que sepan que existes — exactamente "que la descubran sin buscar el nombre".
- **Página de caso/aplicación** por industria (subsea, land, well intervention).
- **Glosario técnico** (genera muchísima cola larga con poco esfuerzo).

### 5.3 SEO internacional (clave para USA/Arabia/China/Brasil) — la decisión más importante
Hoy el inglés vive en `data-en` (JavaScript) sobre **una sola URL**, que rinde en español. Para el mundo necesitas **URLs reales por idioma**:

- **Recomendado:** estructura `polymers-seals.com/` (español) + `polymers-seals.com/en/` (inglés) con páginas HTML reales, más `hreflang` (`es`, `en`, `x-default`).
- Para Brasil, valorar `pt` (portugués) — alto potencial en Oil & Gas (Petrobras, pré-sal).
- Para Arabia, el inglés cubre el B2B del Golfo; árabe es opcional fase 2.
- Esto es un **mini-proyecto** (duplicar y traducir páginas, no solo un botón). **Puedo construirlo cuando me lo indiques** — es la inversión de mayor retorno para el alcance mundial.

### 5.4 China (caso especial)
- China bloquea/penaliza sitios sin presencia local. Para rankear en **Baidu** se suele necesitar servidor en China + licencia **ICP**, lo cual es costoso. **Recomendación realista:** no priorizar Baidu al inicio; llegar a compradores chinos vía **inglés + LinkedIn + Bing + plataformas B2B** (Alibaba, Made-in-China, donde ya están tus competidores chinos). Cloudflare ya da buena velocidad global, pero la red china es el cuello de botella, no el hosting.

### 5.5 Off-page / autoridad (lo que te hace descubrible sin buscar el nombre)
- **LinkedIn de empresa** activo (publicar productos, casos). Enlaza al sitio.
- **Directorios del sector**: Oil & Gas Online, Energy Dais, listados de proveedores.
- **Asociaciones**: un backlink de **SPE** (Society of Petroleum Engineers) o referencias **API** vale más que cientos de enlaces genéricos.
- **Perfiles en marketplaces B2B** (los compradores internacionales buscan ahí primero).

### 5.6 Rendimiento (Core Web Vitals)
- Ya hay WebP y preload. Pendiente: añadir `loading="lazy"` y `width/height` a **todas** las imágenes de producto (evita saltos de layout = CLS), y servir la fuente Montserrat con `font-display: swap` (ya viene en el `&display=swap`). Medir con PageSpeed Insights.

---

## 6. Conversión (CRO) — convertir visitas en cotizaciones

### 6.1 🔴 BLOQUEANTE: conectar el formulario (EmailJS)
En `js/contact.js` las 3 claves son placeholders. **Hay que reemplazarlas** con tu cuenta real de EmailJS:
```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← reemplazar
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← reemplazar
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← reemplazar
```
Pásame las 3 claves (o créalas en emailjs.com con la plantilla que usa `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{phone}}`, `{{product}}`, `{{message}}`) y lo dejo funcionando. **Sin esto, todo lead del formulario se pierde.**

### 6.2 Otras mejoras de conversión
- **Fichas técnicas descargables** a cambio del correo (lead magnet).
- **Sellos de certificación visibles** (ISO/API) en home y footer.
- **Prueba social**: logos de clientes, países donde operan, proyectos.
- **CTA "Request a Quote" pegajoso** también en desktop (hoy el flotante es móvil-friendly; reforzar en escritorio).
- **Tiempo de respuesta "<24 h"** — ya lo tienen, subirlo al home.
- **Página de producto con botón "Cotizar este producto"** que prellene el formulario.

---

## 7. IA / Chatbot (como en Nyxel)

Sí, encaja muy bien aquí. Un asistente entrenado con el catálogo y datos técnicos puede:
- Responder en **cualquier idioma** (resuelve parte del problema internacional 24/7).
- Hacer **pre-calificación técnica**: preguntar presión, temperatura, fluido, diámetro → sugerir línea de producto y compuesto (NBR/HNBR/FKM/POLYKRAN®).
- **Capturar el lead** (nombre + correo + necesidad) y enviarlo por correo/CRM.

**Opciones de implementación:**
| Opción | Cómo | Costo/Complejidad |
|---|---|---|
| **A. Widget tipo Nyxel** (recomendado) | Botón flotante con chat conectado a la API de Claude, con el contexto del catálogo en el prompt. | Medio. Requiere una función serverless (Cloudflare Workers, que ya usas) para no exponer la API key. |
| **B. Chatbot de reglas** | Flujo guiado de preguntas → recomienda producto. Sin IA generativa. | Bajo. Menos "inteligente" pero gratis y simple. |
| **C. Servicio externo** | Tidio, Intercom, etc. | Bajo esfuerzo, cuota mensual, menos a medida. |

**Recomendación:** Opción A con Cloudflare Workers (encaja con tu stack y hosting). Lo puedo construir como módulo aparte cuando definas que avanzamos — necesitaré una API key de Anthropic y luz verde sobre el alcance.

---

## 8. Mejoras generales de UX / diseño
- **Migas de pan visibles** (ya puse el structured data; falta el componente visual).
- **Buscador de producto** (filtro por línea / aplicación) cuando haya páginas individuales.
- **Selector de idioma más claro** (cuando existan URLs reales por idioma).
- **Sección de FAQ** (también ayuda al SEO con structured data `FAQPage`).
- **Footer con enlaces a fichas técnicas y certificaciones.**

---

## 9. Plan priorizado

### 🟢 Quick wins (esta semana)
1. Conectar EmailJS (§6.1). ← lo más urgente.
2. Google Search Console + Bing + enviar sitemap (§4).
3. Instalar analítica (§4).
4. Crear Google Business Profile y LinkedIn de empresa.
5. Mejorar `alt` de imágenes (§5.1).

### 🟡 Mediano plazo (1–2 meses)
6. Páginas individuales de producto (§5.2).
7. Versión real en inglés con hreflang (§5.3). ← mayor impacto internacional.
8. Sellos de certificación + fichas descargables (§6.2).
9. Chatbot IA (§7).

### 🔵 Largo plazo (3–6 meses)
10. Blog técnico continuo (§5.2).
11. Portugués para Brasil (§5.3).
12. Construcción de backlinks (SPE/API, directorios) (§5.5).
13. Presencia en marketplaces B2B (§5.5).

---

## 10. Qué medir (KPIs)
- **Impresiones y clics** en Search Console (¿para qué términos aparecemos?).
- **Páginas indexadas** (deben crecer con cada producto/artículo).
- **Tráfico orgánico por país** (Analytics).
- **Conversiones**: envíos de formulario + clics a WhatsApp + descargas de ficha.
- **Core Web Vitals** (PageSpeed).

---

### Lo que necesito de ti para seguir avanzando
1. **Claves de EmailJS** → dejo el formulario funcionando ya.
2. **¿Avanzamos con la versión en inglés (URLs reales)?** Es el cambio de mayor retorno mundial.
3. **¿Construimos el chatbot IA?** (necesito API key de Anthropic).
4. **Certificaciones reales** que tengan (ISO/API) y logos de clientes para prueba social.
