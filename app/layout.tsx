import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { RestaurantJsonLd } from "@/components/json-ld";
import { SeasonalAmbience } from "@/components/seasonal-ambience";
import { ThemeProvider } from "@/components/theme-provider";
import { BUSINESS } from "@/lib/business";
import { getActiveSeasonalTheme } from "@/lib/site-theme";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteDescription =
  "Capo Pizza, pizzeria à Neufchâteau (88300) : pizzas artisanales, burgers, tacos et pâtes. Commander pizza Neufchâteau — à emporter et livraison. Appelez le 03 55 01 67 39.";

const githubPagesUrl =
  process.env.GITHUB_PAGES === "true"
    ? "https://jason54jg.github.io/CapoPizza"
    : undefined;

export const metadata: Metadata = {
  ...(githubPagesUrl ? { metadataBase: new URL(githubPagesUrl) } : {}),
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
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: BUSINESS.name,
    title: "Capo Pizza — Pizzeria à Neufchâteau",
    description: siteDescription,
    images: [
      {
        url: "https://images.unsplash.com/photo-1604384847932-cff2a0b4cb64?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Pizza artisanale Capo Pizza Neufchâteau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capo Pizza | Pizzeria Neufchâteau",
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d0c" },
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
      className={`${dmSans.variable} ${outfit.variable} dark h-full`}
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
