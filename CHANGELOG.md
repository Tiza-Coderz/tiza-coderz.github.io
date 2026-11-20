# Changelog

Todos los cambios relevantes de este proyecto. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versiones con
[SemVer](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido

- Despliegue en Vercel listo: URL pública detectada con `VERCEL_PROJECT_PRODUCTION_URL`, redirección de `/` según el idioma del navegador, cabeceras de seguridad y guía paso a paso en el README.
- Las vistas previas de Vercel salen con `noindex` y `robots.txt` bloqueado.

### Cambiado

- Node 22.x fijado en `engines`.

## [1.0.0] - 2026-11-20

Primera versión pública de la web corporativa de Tiza Coderz.

### Añadido

- Portada con propuesta de valor, cifras, servicios y casos destacados, proceso, preguntas frecuentes y llamada a la acción.
- Página de servicios con 7 paquetes, precios desde USD y equivalente en CUP con tasa editable y fechada.
- Portafolio filtrable por sector y 8 casos de estudio en MDX (ES/EN): CajaFácil, ComboYa, NegocioClaro, TallerTrack, BYS, QTB, portafolio de Kamila Aiguesvives y ReelBridge.
- Capturas optimizadas en WebP, portadas con mockups e imágenes Open Graph generadas con Playwright.
- Páginas de proceso, nosotros (con CV en PDF) y contacto con formulario (Formspree, WhatsApp o mailto).
- Internacionalización ES/EN con diccionarios tipados, modo oscuro y botón flotante de WhatsApp.
- SEO técnico: metadata, canonical, hreflang, Open Graph, sitemap.xml, robots.txt y JSON-LD.
- PWA instalable con service worker.
- CI (lint, tipos, formato, tests, build) y despliegue automático a GitHub Pages; configuración para Vercel.

[Sin publicar]: https://github.com/Tiza-Coderz/tiza-coderz.github.io/compare/v1.0.0...develop
[1.0.0]: https://github.com/Tiza-Coderz/tiza-coderz.github.io/releases/tag/v1.0.0
