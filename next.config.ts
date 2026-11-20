import type { NextConfig } from "next";

/**
 * Sitio 100 % estático (output: 'export'): se publica en GitHub Pages o Vercel
 * sin servidor. `NEXT_PUBLIC_BASE_PATH` solo hace falta si el repo NO se llama
 * `<org>.github.io` (p. ej. se publica en /tiza-web).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
