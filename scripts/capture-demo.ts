/**
 * Captura pantallas de una demo publicada para su caso de estudio.
 *
 *   pnpm capture tallertrack
 *
 * Inicia sesión con las credenciales demo públicas (admin@demo.cu / demo1234),
 * recorre las pantallas definidas abajo y guarda WebP optimizados en
 * public/images/projects/<slug>/. Usa el Edge/Chrome instalado (PW_CHANNEL).
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright-core";
import sharp from "sharp";

type Shot = {
  file: string;
  device: "mobile" | "desktop";
  /** Ruta relativa a la demo o función que deja la página lista. */
  go: string | ((page: Page, base: string) => Promise<void>);
};

type DemoConfig = {
  base: string;
  login?: (page: Page, base: string) => Promise<void>;
  shots: Shot[];
};

const demos: Record<string, DemoConfig> = {
  tallertrack: {
    base: "https://tallertrack-five.vercel.app",
    login: async (page, base) => {
      await page.goto(`${base}/login`, { waitUntil: "networkidle" });
      await page.getByLabel(/correo/i).fill("admin@demo.cu");
      await page.getByLabel(/contraseña/i).fill("demo1234");
      await Promise.all([
        page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 30_000 }),
        page.getByRole("button", { name: "Entrar", exact: true }).click(),
      ]);
      await page.waitForLoadState("networkidle");
    },
    shots: [
      { file: "login", device: "mobile", go: "/login" },
      { file: "tablero", device: "desktop", go: "/" },
      {
        file: "detalle-orden",
        device: "desktop",
        go: async (page, base) => {
          await page.goto(`${base}/ordenes`, { waitUntil: "networkidle" });
          await page.locator('a[href^="/ordenes/"]:not([href$="/nueva"])').first().click();
          await page.waitForLoadState("networkidle");
        },
      },
      { file: "reportes", device: "desktop", go: "/reportes" },
      {
        file: "estado-publico",
        device: "mobile",
        go: async (page, base) => {
          // Toma el código de una orden real y abre su seguimiento público.
          await page.goto(`${base}/ordenes`, { waitUntil: "networkidle" });
          const text = (await page.locator("main").innerText()) ?? "";
          const code = text.match(/TF-[0-9A-Z]{4}-[0-9A-Z]{4}/)?.[0];
          if (!code) throw new Error("No se encontró un código de orden TF-XXXX-XXXX");
          await page.goto(`${base}/estado/${code}`, { waitUntil: "networkidle" });
        },
      },
    ],
  },
};

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1280, height: 800 },
} as const;

async function main() {
  const slug = process.argv[2] ?? "";
  const demo = demos[slug];
  if (!demo) {
    console.error(`Uso: pnpm capture <${Object.keys(demos).join("|")}>`);
    process.exit(1);
  }
  const dest = path.resolve("public/images/projects", slug);
  await mkdir(dest, { recursive: true });

  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
  try {
    for (const device of ["mobile", "desktop"] as const) {
      const shots = demo.shots.filter((s) => s.device === device);
      if (shots.length === 0) continue;
      const context = await browser.newContext({
        viewport: viewports[device],
        deviceScaleFactor: 1,
        locale: "es-CU",
        colorScheme: "light",
        isMobile: device === "mobile",
        hasTouch: device === "mobile",
      });
      const page = await context.newPage();

      // La pantalla de login se captura antes de iniciar sesión.
      for (const shot of shots.filter((s) => s.go === "/login"))
        await capture(page, demo.base, shot, dest);
      if (demo.login) await demo.login(page, demo.base);
      for (const shot of shots.filter((s) => s.go !== "/login"))
        await capture(page, demo.base, shot, dest);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function capture(page: Page, base: string, shot: Shot, dest: string) {
  if (typeof shot.go === "string")
    await page.goto(`${base}${shot.go}`, { waitUntil: "networkidle" });
  else await shot.go(page, base);
  await page.waitForTimeout(600); // fuentes y animaciones de entrada
  const png = await page.screenshot({ type: "png" });
  const out = path.join(dest, `${shot.file}.webp`);
  await sharp(png)
    .webp({ quality: shot.device === "mobile" ? 74 : 72, effort: 6 })
    .toFile(out);
  console.log("✓", path.relative(process.cwd(), out));
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
