# Polymers Seals Solutions — Contexto del Proyecto

## URL
https://polymers-seals.com

## Estado
En producción.

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
