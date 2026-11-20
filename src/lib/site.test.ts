import { describe, expect, it } from "vitest";
import { DEFAULT_SITE_URL, isPreviewDeployment, resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("usa GitHub Pages si no hay variables", () => {
    expect(resolveSiteUrl({})).toBe(DEFAULT_SITE_URL);
  });

  it("toma el dominio de producción que expone Vercel", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "tiza-coderz.vercel.app" })).toBe(
      "https://tiza-coderz.vercel.app",
    );
  });

  it("NEXT_PUBLIC_SITE_URL manda sobre Vercel y se le quita la barra final", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://tizacoderz.com/",
        VERCEL_PROJECT_PRODUCTION_URL: "tiza-coderz.vercel.app",
      }),
    ).toBe("https://tizacoderz.com");
  });

  it("ignora variables vacías", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "  ", VERCEL_PROJECT_PRODUCTION_URL: "" })).toBe(
      DEFAULT_SITE_URL,
    );
  });
});

describe("isPreviewDeployment", () => {
  it("solo es true en las vistas previas de Vercel", () => {
    expect(isPreviewDeployment({ VERCEL_ENV: "preview" })).toBe(true);
    expect(isPreviewDeployment({ VERCEL_ENV: "production" })).toBe(false);
    expect(isPreviewDeployment({})).toBe(false);
  });
});
