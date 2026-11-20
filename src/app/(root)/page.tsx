import { basePath } from "@/lib/site";

/**
 * GitHub Pages no admite redirecciones de servidor: `/` elige el idioma en el
 * navegador (inglés si el navegador no está en español) y, sin JavaScript,
 * el meta refresh lleva a la versión en español.
 */
const script = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"es";location.replace("${basePath}/"+(/^es\b/i.test(l)?"es":"en")+"/");})();`;

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`1; url=${basePath}/es/`} />
      <link rel="canonical" href={`${basePath}/es/`} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <main className="grid min-h-dvh place-items-center p-6 text-center">
        <p>
          <a href={`${basePath}/es/`} className="underline">
            Entrar a Tiza Coderz
          </a>{" "}
          ·{" "}
          <a href={`${basePath}/en/`} className="underline">
            Enter Tiza Coderz
          </a>
        </p>
      </main>
    </>
  );
}
