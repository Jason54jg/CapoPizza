"use client";

import { useCallback, useEffect, useState } from "react";
import type { MenuCategoryId } from "@/lib/menu-types";
import { FloatingCallButton } from "./floating-call-button";
import { HeroSection } from "./hero-section";
import { InfoSection } from "./info-section";
import { MenuExplorer } from "./menu-explorer";
import { OffersSection } from "./offers-section";
import { ReviewsSection } from "./reviews-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuCategory, setMenuCategory] = useState<MenuCategoryId>("pizzas-tomate");

  // Toujours démarrer en tête de page (évite le restore / effets menu)
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, []);

  const scrollToMenu = useCallback(() => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navigateCategory = useCallback((category: MenuCategoryId) => {
    setMenuCategory(category);
    requestAnimationFrame(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <>
      <SiteHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateCategory={navigateCategory}
      />
      <main className="pb-24 md:pb-8">
        <HeroSection
          onDiscoverPizzas={() => {
            setMenuCategory("pizzas-tomate");
            scrollToMenu();
          }}
        />
        <OffersSection />
        <MenuExplorer
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={menuCategory}
          onCategoryChange={setMenuCategory}
        />
        <ReviewsSection />
        <InfoSection />
        <SiteFooter />
      </main>
      <FloatingCallButton />
    </>
  );
}
