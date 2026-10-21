import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { RestaurantJsonLd } from "@/components/json-ld";
import { SeasonalAmbience } from "@/components/seasonal-ambience";
import { ThemeProvider } from "@/components/theme-provider";
import { withBasePath } from "@/lib/base-path";
import { BUSINESS } from "@/lib/business";
import { getActiveSeasonalTheme } from "@/lib/site-theme";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteDescription =
  "Capo Pizza, pizzeria à Neufchâteau (88300) : pizzas artisanales, burgers, tacos et pâtes. Commander pizza Neufchâteau — à emporter et livraison. Appelez le 03 55 01 67 39.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.GITHUB_PAGES === "true"
    ? "https://jason54jg.github.io/CapoPizza"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Capo Pizza | Pizzeria Neufchâteau (88300)",
    template: "%s | Capo Pizza Neufchâteau",
  },
  description: siteDescription,
  keywords: [
    "Pizzeria Neufchâteau",
    "Pizza Neufchâteau",
    "Commander pizza Neufchâteau 88300",
    "Capo Pizza",
    "livraison pizza Neufchâteau",
  ],
  icons: {
    icon: [{ url: withBasePath("/images/capo-logo.png"), type: "image/png" }],
    apple: [
      { url: withBasePath("/images/capo-logo-192.png"), type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: BUSINESS.name,
    title: "Capo Pizza — Pizzeria à Neufchâteau",
    description: siteDescription,
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
    title: "Capo Pizza | Pizzeria Neufchâteau",
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seasonal = getActiveSeasonalTheme();

  return (
    <html
      lang="fr"
      className={`${sourceSans.variable} ${displaySerif.variable} dark h-full`}
      data-seasonal-theme={seasonal}
      suppressHydrationWarning
    >
      <body className="relative min-h-full antialiased">
        <ThemeProvider seasonal={seasonal}>
          <SeasonalAmbience seasonal={seasonal} />
          <RestaurantJsonLd />
          <div className="relative z-[2]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
