/*
 * Service worker de Tiza Coderz.
 *
 * - Páginas: red primero; si no hay conexión, la copia guardada o la portada.
 * - Recursos estáticos (_next/static, imágenes, fuentes): caché primero.
 *
 * Cambie VERSION para invalidar las cachés en el próximo despliegue.
 */
const VERSION = "v1";
const PAGES = `tz-pages-${VERSION}`;
const ASSETS = `tz-assets-${VERSION}`;
const scope = new URL(self.registration.scope).pathname; // "/" o "/<basePath>/"
const PRECACHE = [`${scope}es/`, `${scope}en/`];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGES).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const lang = url.pathname.startsWith(`${scope}en/`) ? "en" : "es";
          return (await caches.match(`${scope}${lang}/`)) ?? Response.error();
        }),
    );
    return;
  }

  if (/\/_next\/static\/|\/images\/|\/icons\/|\.(?:woff2|webp|png|svg|jpg)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(ASSETS).then((cache) => cache.put(request, copy));
            }
            return res;
          }),
      ),
    );
  }
});
