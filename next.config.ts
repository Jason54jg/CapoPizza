import type { NextConfig } from "next";

/** Dépôt GitHub Pages : https://jason54jg.github.io/CapoPizza/ */
const GITHUB_PAGES = process.env.GITHUB_PAGES === "true";
const REPO_NAME = "CapoPizza";
const basePath = GITHUB_PAGES ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  // Export statique uniquement pour GitHub Pages ; en local, le serveur Next
  // permet /api/google-reviews (rafraîchissement sans redémarrer).
  ...(GITHUB_PAGES ? { output: "export" as const } : {}),
  ...(basePath ? { basePath } : {}),
  // Exposé au client pour préfixer les assets de public/ (voir lib/base-path.ts)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: GITHUB_PAGES ? "true" : "false",
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
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
