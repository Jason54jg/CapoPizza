import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InitialLoadingScreen } from "@/components/initial-loading-screen";
import { LocaleProvider } from "@/components/locale-provider";
import { BUSINESS } from "@/lib/business";
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return {
    title: {
      // absolute : sinon le template du layout racine s’ajoute une 2ᵉ fois
      absolute: dict.meta.title,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    openGraph: {
      locale: locale === "en" ? "en_GB" : "fr_FR",
      siteName: BUSINESS.name,
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      images: [
        {
          url: "/images/capo-logo.png",
          width: 512,
          height: 512,
          alt: "Capo Pizza Neufchâteau",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      languages: {
        fr: "/fr/",
        en: "/en/",
        "x-default": "/fr/",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <LocaleProvider locale={raw}>
      <InitialLoadingScreen />
      {children}
    </LocaleProvider>
  );
}
