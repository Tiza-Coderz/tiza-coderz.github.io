/**
 * Genera los iconos de la PWA a partir de src/app/icon.svg:
 *
 *   public/icons/icon-192.png, icon-512.png, icon-maskable-512.png
 *   src/app/apple-icon.png (180×180)
 *   public/favicon.ico (32×32, para navegadores que no leen SVG)
 *
 *   pnpm icons
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const svgPath = path.join(ROOT, "src/app/icon.svg");

/** ICO con un único PNG embebido (formato admitido desde Windows Vista). */
function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: icono
  header.writeUInt16LE(1, 4); // nº de imágenes
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // paleta
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por píxel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);
  return Buffer.concat([header, entry, png]);
}

async function main() {
  const svg = await readFile(svgPath);
  const out = path.join(ROOT, "public/icons");
  await mkdir(out, { recursive: true });

  const png = (size: number) =>
    sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 });

  await png(192).toFile(path.join(out, "icon-192.png"));
  await png(512).toFile(path.join(out, "icon-512.png"));

  // Maskable: el logo ocupa el 70 % central sobre fondo de marca (zona segura de Android).
  const inner = await png(360).toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0f4c75" } })
    .composite([{ input: inner, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, "icon-maskable-512.png"));

  // Apple no respeta transparencias en el icono: fondo sólido.
  const apple = await png(150).toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0f4c75" } })
    .composite([{ input: apple, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, "src/app/apple-icon.png"));

  await writeFile(path.join(ROOT, "public/favicon.ico"), pngToIco(await png(32).toBuffer(), 32));
  console.log("✓ iconos generados en public/icons, src/app/apple-icon.png y public/favicon.ico");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
