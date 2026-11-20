/**
 * Normaliza una captura para el portafolio y la guarda en WebP.
 *
 *   pnpm img <entrada> <salida.webp> --mobile    → 390×844 (recorta desde arriba)
 *   pnpm img <entrada> <salida.webp> --desktop   → 1280×800 (16:10, desde arriba)
 *   pnpm img <entrada> <salida.webp> --cover     → 1200×750
 *
 * Las capturas de móvil muy largas (página completa) se recortan a la primera
 * pantalla: es lo que el visitante ve en el marco del teléfono.
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const presets = {
  "--mobile": { width: 390, height: 844, quality: 74 },
  "--desktop": { width: 1280, height: 800, quality: 72 },
  "--cover": { width: 1200, height: 750, quality: 78 },
} as const;

type PresetFlag = keyof typeof presets;

async function optimizeImage(input: string, output: string, flag: PresetFlag) {
  const { width, height, quality } = presets[flag];
  await mkdir(path.dirname(output), { recursive: true });
  const meta = await sharp(input).metadata();
  const srcW = meta.width ?? width;
  const srcH = meta.height ?? height;
  // Escala al ancho objetivo y recorta desde arriba si sobra altura.
  const scaledH = Math.round((srcH * width) / srcW);
  let img = sharp(input).resize({ width });
  if (scaledH > height) {
    img = sharp(await img.toBuffer()).extract({ left: 0, top: 0, width, height });
  } else if (scaledH < height) {
    img = sharp(input).resize({ width, height, fit: "cover", position: "top" });
  }
  await img.webp({ quality, effort: 6 }).toFile(output);
  const kb = Math.round((await stat(output)).size / 1024);
  console.log(`✓ ${path.relative(process.cwd(), output)} (${width}×${height}, ${kb} KB)`);
}

const [input, output, flag = "--desktop"] = process.argv.slice(2);
if (!input || !output || !(flag in presets)) {
  console.error("Uso: pnpm img <entrada> <salida.webp> --mobile|--desktop|--cover");
  process.exit(1);
}
optimizeImage(input, output, flag as PresetFlag).catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
