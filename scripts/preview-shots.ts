/**
 * Sirve `out/` y hace capturas de las rutas indicadas (móvil + escritorio,
 * claro + oscuro) en `.screenshots-tmp/`. Sirve para revisar el diseño sin
 * abrir el navegador.
 *
 *   pnpm build && pnpm shots /es/ /es/servicios/
 *
 * Usa el Chrome o Edge instalado (playwright-core no descarga navegadores).
 * Elija el canal con PW_CHANNEL=chrome|msedge (por defecto msedge).
 */
import { mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";
import handler from "serve-handler";

const OUT = path.resolve("out");
const DEST = path.resolve(".screenshots-tmp");
const PORT = 4173;

const routes = process.argv.slice(2).filter((a) => a.startsWith("/"));
const full = process.argv.includes("--full");
if (routes.length === 0) routes.push("/es/");

const viewports = [
  { name: "movil", width: 390, height: 844 },
  { name: "escritorio", width: 1440, height: 900 },
] as const;

async function main() {
  const server = http.createServer((req, res) =>
    handler(req, res, { public: OUT, trailingSlash: true, directoryListing: false }),
  );
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  await mkdir(DEST, { recursive: true });

  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
  try {
    for (const route of routes) {
      for (const vp of viewports) {
        for (const scheme of ["light", "dark"] as const) {
          const page = await browser.newPage({
            viewport: { width: vp.width, height: vp.height },
            deviceScaleFactor: 1,
            colorScheme: scheme,
          });
          await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
          // Las animaciones de scroll dejan secciones a medio aparecer en una captura de página entera.
          await page.addStyleTag({ content: ".reveal{animation:none!important}" });
          const slug = route.replace(/\//g, "_").replace(/^_|_$/g, "") || "root";
          const file = path.join(DEST, `${slug}-${vp.name}-${scheme}.png`);
          await page.screenshot({ path: file, fullPage: full });
          console.log("✓", path.relative(process.cwd(), file));
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
