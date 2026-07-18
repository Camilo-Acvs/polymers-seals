# Polymers Seals Solutions — Contexto del Proyecto

## URL
https://polymers-seals.com

## Estado
En producción.

## Relación con Rubbercav
Rubbercav S.A.S. es el nombre anterior de esta misma empresa (Polymers Seals Solutions
S.A.S. es la marca actual). El dominio rubbercav.com se conserva por su SEO histórico
(~11 años de tráfico) y nunca se reestructura. El catálogo técnico de este proyecto
(`Catalogo_Tecnico_Polymers_Seals_Solutions.docx`) es válido también para las fichas
de producto Oil & Gas de Rubbercav (mismos materiales, misma fabricación) — no para
sus líneas ajenas a Oil & Gas (automotriz, construcción, etc.). Ver CLAUDE.md de
Rubbercav para el detalle completo.

## Stack
HTML + CSS + Vanilla JS

## Hosting
Cloudflare Pages → polymers-seals.com
Deploy: git push → auto-deploy en ~15s

## Formularios
Cloudflare Pages Function + Resend (`Página/functions/api/contact.js`),
desde 2026-07-16. La API key de Resend vive en Cloudflare Pages →
Settings → Environment variables (RESEND_API_KEY), no en el código.
No cambiar de tecnología sin autorización.
