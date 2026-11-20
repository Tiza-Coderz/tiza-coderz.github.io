/**
 * Genera las imágenes de marketing a partir de las capturas reales:
 *
 *   public/images/projects/<slug>/cover.webp   1200×750  portada del caso
 *   public/og/<slug>.jpg                        1200×630  vista previa al compartir el caso
 *   public/og/tiza-coderz-<es|en>.png           1200×630  vista previa del sitio
 *
 *   pnpm marketing            # todo
 *   pnpm marketing comboya    # solo un proyecto
 *   pnpm marketing --site     # solo las imágenes del sitio
 *
 * Las plantillas son HTML + CSS renderizados con Playwright (Edge/Chrome local).
 */
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser } from "playwright-core";
import sharp from "sharp";
import { getAllProjects, type Project } from "../src/lib/projects";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

const mimeTypes: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

async function dataUri(file: string): Promise<string> {
  const buf = await readFile(file);
  return `data:${mimeTypes[path.extname(file)] ?? "application/octet-stream"};base64,${buf.toString("base64")}`;
}

const publicFile = (src: string) => path.join(PUBLIC, src);

const logoMark = `<svg viewBox="0 0 64 64" width="44" height="44"><rect width="64" height="64" rx="14" fill="#0f4c75"/><rect x="4" y="4" width="56" height="56" rx="11" fill="none" stroke="#f8f6f0" stroke-opacity=".25" stroke-width="2"/><g fill="none" stroke="#f8f6f0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 21 12 32l10 11"/><path d="M42 21l10 11-10 11"/><path d="M36 17 28 47"/></g></svg>`;

const baseCss = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,system-ui,sans-serif;color:#f8f6f0;overflow:hidden;
    background:
      radial-gradient(circle at 15% 15%, rgba(255,255,255,.10), transparent 40%),
      radial-gradient(circle at 90% 90%, rgba(245,200,76,.12), transparent 42%),
      linear-gradient(155deg,#0f4c75 0%,#0a2f49 70%,#061d2e 100%);}
  .brand{position:absolute;left:56px;top:48px;display:flex;align-items:center;gap:12px;font-weight:800;font-size:22px;letter-spacing:-.01em}
  .brand b{color:#7db4d8}
  .kicker{font-size:15px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#afd2ea}
  .chip{display:inline-block;border:1.5px solid rgba(248,246,240,.35);border-radius:999px;padding:6px 14px;font-size:17px;font-weight:600;color:rgba(248,246,240,.9);margin:0 8px 8px 0}
  .phone{position:absolute;border-radius:38px;background:#0b1622;padding:9px;box-shadow:0 30px 60px rgba(0,0,0,.45),0 0 0 1.5px rgba(255,255,255,.12) inset}
  .phone img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:30px}
  .laptop{position:absolute}
  .laptop .screen{background:#0b1622;border-radius:18px 18px 4px 4px;padding:12px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .laptop .screen img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;border-radius:6px}
  .laptop .base{height:16px;margin:0 -40px;background:linear-gradient(#c9d3dc,#8c99a5);border-radius:0 0 18px 18px}
`;

const fontsLink = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">`;

function page(width: number, height: number, body: string, extraCss = "") {
  return `<!doctype html><html><head><meta charset="utf-8">${fontsLink}<style>${baseCss}body{width:${width}px;height:${height}px;position:relative}${extraCss}</style></head><body>${body}</body></html>`;
}

type Shots = { mobile: string[]; desktop: string[] };

async function shotsFor(project: Project): Promise<Shots> {
  const mobile = await Promise.all(
    project.screenshots.filter((s) => s.device === "mobile").map((s) => dataUri(publicFile(s.src))),
  );
  const desktop = await Promise.all(
    project.screenshots
      .filter((s) => s.device === "desktop")
      .map((s) => dataUri(publicFile(s.src))),
  );
  return { mobile, desktop };
}

/** Ilustraciones para trabajos sin capturas públicas (código privado del cliente). */
async function illustration(project: Project, h: number): Promise<string> {
  const s = h / 750; // escala respecto a la portada
  switch (project.slug) {
    case "bys": {
      const logo = await dataUri(path.join(ROOT, "scripts/assets/bys-logo-blanco.png"));
      const card = (title: string, price: string, tone: string) =>
        `<div style="background:#fff;color:#1b1b1b;border-radius:16px;padding:14px 16px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;font-size:15px"><div><div style="font-weight:700">${title}</div><div style="color:#777;font-size:13px;margin-top:3px">★ 4.8 · 2,1 km</div></div><div style="background:${tone};color:#fff;font-weight:700;border-radius:999px;padding:6px 12px">${price}</div></div>`;
      return `
        <div style="position:absolute;right:${120 * s}px;top:${70 * s}px;transform:scale(${s});transform-origin:top right">
          <div class="phone" style="position:relative;width:300px;height:620px">
            <div style="width:100%;height:100%;border-radius:30px;background:linear-gradient(#f7f3ee,#efe8df);padding:26px 18px;color:#1b1b1b">
              <div style="background:#ff7a1a;border-radius:18px;padding:16px;color:#fff;margin-bottom:18px">
                <img src="${logo}" style="height:26px;width:auto;display:block;margin-bottom:10px">
                <div style="font-weight:800;font-size:19px">Plomería · Baño</div>
                <div style="opacity:.85;font-size:13px;margin-top:4px">3 ofertas nuevas</div>
              </div>
              ${card("Servicios Rivas", "$35", "#ff7a1a")}
              ${card("Mantenimiento JM", "$42", "#0f4c75")}
              ${card("TecnoHogar", "$38", "#0f4c75")}
              <div style="background:#1b1b1b;color:#fff;text-align:center;border-radius:999px;padding:13px;font-weight:700;margin-top:18px">Aceptar y pagar</div>
            </div>
          </div>
        </div>`;
    }
    case "qtb-vinilos": {
      const vinyl = (size: number, label: string) =>
        `<div style="width:${size}px;height:${size}px;border-radius:50%;background:repeating-radial-gradient(circle,#111 0 2px,#1d1d1d 2px 4px);display:grid;place-items:center;box-shadow:0 25px 50px rgba(0,0,0,.5)"><div style="width:${size * 0.34}px;height:${size * 0.34}px;border-radius:50%;background:${label};display:grid;place-items:center;font-weight:800;color:#050505;font-size:${size * 0.07}px">qtb</div></div>`;
      return `
        <div style="position:absolute;right:${60 * s}px;top:${90 * s}px;transform:scale(${s});transform-origin:top right;display:flex;align-items:center;gap:0">
          <div style="margin-right:-120px;z-index:0">${vinyl(400, "#f5c84c")}</div>
          <div class="phone" style="position:relative;width:270px;height:560px;z-index:1">
            <div style="width:100%;height:100%;border-radius:30px;background:#f5f2ed;color:#050505;padding:22px 16px">
              <div style="font-weight:900;font-size:26px;letter-spacing:-.03em">qtb</div>
              <div style="font-size:12px;color:#666;margin-bottom:14px">Discos y vinilos</div>
              ${["Buena Vista Social Club", "Silvio Rodríguez", "Los Van Van"].map((t, i) => `<div style="display:flex;gap:12px;align-items:center;margin-bottom:14px"><div style="width:64px;height:64px;border-radius:8px;background:${["#c2410c", "#0f4c75", "#a16207"][i]}"></div><div><div style="font-weight:700;font-size:14px">${t}</div><div style="font-size:12px;color:#666">LP · 180 g</div><div style="font-weight:800;font-size:14px;margin-top:2px">$${[38, 32, 29][i]}</div></div></div>`).join("")}
              <div style="background:#050505;color:#f5f2ed;text-align:center;border-radius:999px;padding:12px;font-weight:700;margin-top:10px">Ver carrito (2)</div>
            </div>
          </div>
        </div>`;
    }
    case "reelbridge": {
      const bubble = (html: string, me = false) =>
        `<div style="max-width:80%;margin:${me ? "0 0 12px auto" : "0 auto 12px 0"};background:${me ? "#effdde" : "#fff"};color:#1b1b1b;border-radius:16px;padding:10px 13px;font-size:14px;line-height:1.35;box-shadow:0 1px 1px rgba(0,0,0,.08)">${html}</div>`;
      const pill = (t: string, c: string) =>
        `<div style="background:${c};color:#fff;border-radius:999px;padding:12px 22px;font-weight:800;font-size:20px;box-shadow:0 15px 30px rgba(0,0,0,.35)">${t}</div>`;
      return `
        <div style="position:absolute;right:${70 * s}px;top:${80 * s}px;transform:scale(${s});transform-origin:top right;display:flex;align-items:center;gap:34px">
          <div style="display:flex;flex-direction:column;gap:18px;align-items:flex-end">
            ${pill("Instagram Reel", "linear-gradient(90deg,#f58529,#dd2a7b,#8134af)")}
            <div style="font-size:34px;color:#f5c84c;margin-right:60px">↓</div>
            ${pill("YouTube Shorts", "#e62117")}
            ${pill("TikTok", "#111")}
          </div>
          <div class="phone" style="position:relative;width:290px;height:600px">
            <div style="width:100%;height:100%;border-radius:30px;background:#cfe0ec;padding:0;overflow:hidden">
              <div style="background:#2b6ca3;color:#fff;padding:20px 16px 12px;font-weight:700">ReelBridge 🤖<div style="font-weight:500;font-size:12px;opacity:.85">bot</div></div>
              <div style="padding:14px">
                ${bubble("instagram.com/reel/C9x…", true)}
                ${bubble("📥 Reel descargado.<br><b>Título:</b> Nuevo combo de fin de semana 🛒")}
                ${bubble('<div style="display:flex;gap:8px"><span style="background:#2b6ca3;color:#fff;border-radius:8px;padding:6px 10px;font-weight:700">✅ Publicar</span><span style="background:#e9eef2;border-radius:8px;padding:6px 10px">✏️ Editar</span></div>')}
                ${bubble("✅ Publicado en YouTube Shorts.<br>🎬 Video y texto listos para TikTok.")}
              </div>
            </div>
          </div>
        </div>`;
    }
    default:
      return "";
  }
}

async function mockups(project: Project, h: number): Promise<string> {
  const s = h / 750;
  const { mobile, desktop } = await shotsFor(project);
  if (mobile.length === 0 && desktop.length === 0) return illustration(project, h);

  const laptop = desktop[0]
    ? `<div class="laptop" style="right:${40 * s}px;top:${150 * s}px;width:${660 * s}px"><div class="screen"><img src="${desktop[0]}"></div><div class="base"></div></div>`
    : "";
  const phones = mobile.slice(0, desktop[0] ? 1 : 2).map((src, i) => {
    const w = 250 * s;
    const left = desktop[0] ? 500 * s : (560 + i * 270) * s;
    const top = desktop[0] ? 250 * s : (i === 0 ? 120 : 70) * s;
    return `<div class="phone" style="left:${left}px;top:${top}px;width:${w}px;height:${w * (844 / 390)}px"><img src="${src}"></div>`;
  });
  return laptop + phones.join("");
}

async function render(browser: Browser, html: string, width: number, height: number) {
  const pageObj = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await pageObj.setContent(html, { waitUntil: "networkidle" });
  await pageObj.evaluate(() => document.fonts.ready);
  const png = await pageObj.screenshot({ type: "png" });
  await pageObj.close();
  return png;
}

async function projectImages(browser: Browser, project: Project) {
  for (const [kind, width, height] of [
    ["cover", 1200, 750],
    ["og", 1200, 630],
  ] as const) {
    const s = height / 750;
    const textWidth = 470;
    const body = `
      <div class="brand">${logoMark}<span>Tiza <b>Coderz</b></span></div>
      <div style="position:absolute;left:56px;top:${190 * s}px;width:${textWidth}px">
        <div class="kicker" style="font-size:${15 * s}px">${project.platforms.map((p) => ({ web: "Web", android: "Android", ios: "iOS", pwa: "PWA", telegram: "Telegram" })[p]).join(" · ")}</div>
        <h1 style="font-size:${(project.title.length > 16 ? 58 : 76) * s}px;line-height:1.02;font-weight:800;letter-spacing:-.03em;margin-top:${10 * s}px">${project.title}</h1>
        <div style="height:${26 * s}px"></div>
        <div>${project.stack
          .slice(0, 4)
          .map((t) => `<span class="chip" style="font-size:${17 * s}px">${t}</span>`)
          .join("")}</div>
      </div>
      ${await mockups(project, height)}
      <div style="position:absolute;left:56px;bottom:${40 * s}px;font-size:${18 * s}px;color:rgba(248,246,240,.7);font-weight:600">tiza-coderz.github.io</div>`;
    const png = await render(browser, page(width, height, body), width, height);
    if (kind === "cover") {
      const out = path.join(PUBLIC, "images/projects", project.slug, "cover.webp");
      await mkdir(path.dirname(out), { recursive: true });
      await sharp(png).webp({ quality: 80, effort: 6 }).toFile(out);
      console.log("✓", path.relative(ROOT, out));
    } else {
      const out = path.join(PUBLIC, "og", `${project.slug}.jpg`);
      await mkdir(path.dirname(out), { recursive: true });
      await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
      console.log("✓", path.relative(ROOT, out));
    }
  }
}

const siteCopy = {
  es: {
    kicker: "Diseño y desarrollo · La Habana",
    title: "Diseño, apps, webs y sistemas para mipymes cubanas",
    sub: "Software a la medida · Funciona aunque la conexión sea mala",
  },
  en: {
    kicker: "Design & development · Havana, Cuba",
    title: "Design, apps, websites and systems for Cuban small businesses",
    sub: "Custom software · Built for slow connections",
  },
} as const;

async function siteImages(browser: Browser) {
  const phones = await Promise.all(
    [
      "/images/projects/cajafacil/pos.webp",
      "/images/projects/comboya/movil-inicio.webp",
      "/images/projects/negocioclaro/dashboard-movil.webp",
    ].map((p) => dataUri(publicFile(p))),
  );
  for (const locale of ["es", "en"] as const) {
    const t = siteCopy[locale];
    const body = `
      <div class="brand">${logoMark}<span>Tiza <b>Coderz</b></span></div>
      <div style="position:absolute;left:56px;top:150px;width:560px">
        <div class="kicker">${t.kicker}</div>
        <h1 style="font-size:54px;line-height:1.05;font-weight:800;letter-spacing:-.03em;margin-top:10px">${t.title}</h1>
        <div style="height:22px"></div>
        <p style="font-size:21px;color:rgba(248,246,240,.82);font-weight:500">${t.sub}</p>
      </div>
      ${phones
        .map(
          (src, i) =>
            `<div class="phone" style="left:${700 + i * 160}px;top:${[150, 90, 30][i]}px;width:215px;height:${215 * (844 / 390)}px;transform:rotate(${[-6, 0, 6][i]}deg)"><img src="${src}"></div>`,
        )
        .join("")}`;
    const png = await render(browser, page(1200, 630, body), 1200, 630);
    const out = path.join(PUBLIC, "og", `tiza-coderz-${locale}.png`);
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(png).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out);
    console.log("✓", path.relative(ROOT, out));
  }
}

async function main() {
  const only = process.argv[2];
  const siteOnly = only === "--site";
  const projects = siteOnly ? [] : getAllProjects("es").filter((p) => !only || p.slug === only);
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
  try {
    for (const project of projects) await projectImages(browser, project);
    if (!only || siteOnly) await siteImages(browser);
  } finally {
    await browser.close();
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
