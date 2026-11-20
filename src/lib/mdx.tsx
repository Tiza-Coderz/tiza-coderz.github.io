import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

/**
 * Compila el cuerpo MDX en el build (Server Component). No se envía JavaScript
 * al navegador: el resultado es HTML estático.
 */
const components: MDXComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
};

export async function renderMdx(source: string) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    format: "mdx",
  });
  return <Content components={components} />;
}
