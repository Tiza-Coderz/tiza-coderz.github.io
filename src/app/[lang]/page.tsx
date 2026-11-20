import { Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return <Section as="h1" title={dict.meta.defaultTitle} intro={dict.meta.defaultDescription} />;
}
