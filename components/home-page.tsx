"use client";

import { useCallback, useState } from "react";
import type { MenuCategoryId } from "@/lib/menu-types";
import { FloatingCallButton } from "./floating-call-button";
import { HeroSection } from "./hero-section";
import { InfoSection } from "./info-section";
import { MenuExplorer } from "./menu-explorer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuCategory, setMenuCategory] = useState<MenuCategoryId>("pizzas-tomate");

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
        <MenuExplorer
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={menuCategory}
          onCategoryChange={setMenuCategory}
        />
        <InfoSection />
        <SiteFooter />
      </main>
      <FloatingCallButton />
    </>
  );
}
